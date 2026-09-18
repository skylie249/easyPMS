"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { generateShareCode } from "@/lib/share-code";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const STRINGS = {
  ko: {
    back: "← 뒤로",
    title: "새 프로젝트 만들기",
    subtitle: "SI 실무 체크리스트 10개 카테고리, 약 60개 항목이 자동으로 준비됩니다.",
    nameLabel: "프로젝트명 *",
    namePlaceholder: "예: OO시 통합정보시스템 구축",
    clientLabel: "발주처 (선택)",
    clientPlaceholder: "예: OO시청",
    startLabel: "착수일",
    endLabel: "종료(예정)일",
    submit: "체크리스트 생성하기",
    submitting: "생성 중...",
    errorNameRequired: "프로젝트명을 입력해주세요.",
    errorNotConfigured:
      "Supabase 연결이 설정되지 않았습니다. 환경변수(.env.local)를 설정해주세요.",
    errorGeneric: "프로젝트 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
  },
  en: {
    back: "← Back",
    title: "Create a New Project",
    subtitle:
      "10 categories and about 60 items from the SI checklist template are set up automatically.",
    nameLabel: "Project name *",
    namePlaceholder: "e.g. City Integrated Information System",
    clientLabel: "Client (optional)",
    clientPlaceholder: "e.g. City Hall",
    startLabel: "Start date",
    endLabel: "End (planned) date",
    submit: "Create checklist",
    submitting: "Creating...",
    errorNameRequired: "Please enter a project name.",
    errorNotConfigured:
      "Supabase is not configured. Please set the environment variables (.env.local).",
    errorGeneric: "Something went wrong while creating the project. Please try again.",
  },
} as const;

export function NewProjectClient({ lang }: { lang: Locale }) {
  const t = STRINGS[lang];
  const prefix = lang === "en" ? "/en" : "";
  const router = useRouter();
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(t.errorNameRequired);
      return;
    }
    if (!isSupabaseConfigured) {
      setError(t.errorNotConfigured);
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();

    try {
      // 1. 공유 코드 중복 확인 후 프로젝트 생성
      let shareCode = generateShareCode();
      for (let i = 0; i < 5; i++) {
        const { data: existing } = await supabase
          .from("projects")
          .select("id")
          .eq("share_code", shareCode)
          .maybeSingle();
        if (!existing) break;
        shareCode = generateShareCode();
      }

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          name: name.trim(),
          client_name: clientName.trim() || null,
          start_date: startDate || null,
          end_date: endDate || null,
          share_code: shareCode,
        })
        .select()
        .single();

      if (projectError || !project) throw projectError;

      // 2. 템플릿 카테고리/항목 조회 (현재 언어의 템플릿만)
      const { data: templateCategories, error: tcError } = await supabase
        .from("template_categories")
        .select("*")
        .eq("locale", lang)
        .order("sort_order");
      if (tcError) throw tcError;

      const { data: templateItems, error: tiError } = await supabase
        .from("template_items")
        .select("*")
        .eq("locale", lang)
        .order("sort_order");
      if (tiError) throw tiError;

      // 3. 프로젝트 전용 카테고리 복제
      const categoryRows = (templateCategories ?? []).map((c) => ({
        project_id: project.id,
        name: c.name,
        sort_order: c.sort_order,
        is_custom: false,
      }));

      const { data: newCategories, error: catInsertError } = await supabase
        .from("checklist_categories")
        .insert(categoryRows)
        .select();
      if (catInsertError) throw catInsertError;

      // 템플릿 카테고리 id -> 새 카테고리 id 매핑
      const catIdMap = new Map<string, string>();
      (templateCategories ?? []).forEach((tc, idx) => {
        const newCat = newCategories?.[idx];
        if (newCat) catIdMap.set(tc.id, newCat.id);
      });

      // 4. 프로젝트 전용 항목 복제
      const itemRows = (templateItems ?? [])
        .map((ti) => {
          const newCategoryId = catIdMap.get(ti.category_id);
          if (!newCategoryId) return null;
          return {
            category_id: newCategoryId,
            project_id: project.id,
            title: ti.title,
            description: ti.description,
            sort_order: ti.sort_order,
            is_custom: false,
            source: "template" as const,
          };
        })
        .filter(Boolean);

      if (itemRows.length > 0) {
        const { error: itemInsertError } = await supabase
          .from("checklist_items")
          .insert(itemRows as never[]);
        if (itemInsertError) throw itemInsertError;
      }

      router.push(`${prefix}/p/${project.share_code}`);
    } catch (err) {
      console.error(err);
      setError(t.errorGeneric);
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 px-5 py-6 max-w-sm mx-auto w-full">
      <Link href={`${prefix}/`} className="text-sm text-slate-500">
        {t.back}
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-1">{t.title}</h1>
      <p className="text-sm text-slate-500 mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t.nameLabel}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t.clientLabel}
          </label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder={t.clientPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t.startLabel}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t.endLabel}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 text-white font-semibold py-3.5 shadow-sm active:scale-[0.98] transition disabled:opacity-60"
        >
          {loading ? t.submitting : t.submit}
        </button>
      </form>
    </main>
  );
}
