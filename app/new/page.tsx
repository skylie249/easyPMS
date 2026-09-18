"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { generateShareCode } from "@/lib/share-code";
import Link from "next/link";

export default function NewProjectPage() {
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
      setError("프로젝트명을 입력해주세요.");
      return;
    }
    if (!isSupabaseConfigured) {
      setError(
        "Supabase 연결이 설정되지 않았습니다. 환경변수(.env.local)를 설정해주세요."
      );
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

      // 2. 템플릿 카테고리/항목 조회
      const { data: templateCategories, error: tcError } = await supabase
        .from("template_categories")
        .select("*")
        .order("sort_order");
      if (tcError) throw tcError;

      const { data: templateItems, error: tiError } = await supabase
        .from("template_items")
        .select("*")
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

      router.push(`/p/${project.share_code}`);
    } catch (err) {
      console.error(err);
      setError("프로젝트 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 px-5 py-6 max-w-sm mx-auto w-full">
      <Link href="/" className="text-sm text-slate-500">
        ← 뒤로
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-1">새 프로젝트 만들기</h1>
      <p className="text-sm text-slate-500 mb-6">
        SI 실무 체크리스트 10개 카테고리, 약 60개 항목이 자동으로 준비됩니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            프로젝트명 *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: OO시 통합정보시스템 구축"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            발주처 (선택)
          </label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="예: OO시청"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              착수일
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
              종료(예정)일
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
          {loading ? "생성 중..." : "체크리스트 생성하기"}
        </button>
      </form>
    </main>
  );
}
