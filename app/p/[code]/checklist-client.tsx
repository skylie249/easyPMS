"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import type { CategoryWithItems, ChecklistItem, Project } from "@/lib/types";
import { ProgressBar } from "@/components/progress-ring";

export default function ChecklistClient({ shareCode }: { shareCode: string }) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const [configError, setConfigError] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    const supabase = createClient();
    setLoading(true);

    const { data: proj } = await supabase
      .from("projects")
      .select("*")
      .eq("share_code", shareCode)
      .maybeSingle();

    if (!proj) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setProject(proj);

    const { data: cats } = await supabase
      .from("checklist_categories")
      .select("*")
      .eq("project_id", proj.id)
      .order("sort_order");

    const { data: items } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("project_id", proj.id)
      .order("sort_order");

    const merged: CategoryWithItems[] = (cats ?? []).map((c) => ({
      ...c,
      items: (items ?? []).filter((i) => i.category_id === c.id),
    }));

    setCategories(merged);
    setLoading(false);
  }, [shareCode]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await load();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const { totalCount, checkedCount, overallPercent } = useMemo(() => {
    const all = categories.flatMap((c) => c.items);
    const total = all.length;
    const checked = all.filter((i) => i.is_checked).length;
    return {
      totalCount: total,
      checkedCount: checked,
      overallPercent: total === 0 ? 0 : Math.round((checked / total) * 100),
    };
  }, [categories]);

  async function toggleItem(item: ChecklistItem) {
    const nextChecked = !item.is_checked;
    setCategories((prev) =>
      prev.map((c) => ({
        ...c,
        items: c.items.map((i) =>
          i.id === item.id
            ? { ...i, is_checked: nextChecked, checked_at: nextChecked ? new Date().toISOString() : null }
            : i
        ),
      }))
    );
    const supabase = createClient();
    await supabase
      .from("checklist_items")
      .update({
        is_checked: nextChecked,
        checked_at: nextChecked ? new Date().toISOString() : null,
      })
      .eq("id", item.id);
  }

  async function addItem(categoryId: string) {
    const title = newItemTitle.trim();
    if (!title || !project) return;
    const supabase = createClient();
    const category = categories.find((c) => c.id === categoryId);
    const nextOrder = (category?.items.length ?? 0) + 1;

    const { data, error } = await supabase
      .from("checklist_items")
      .insert({
        category_id: categoryId,
        project_id: project.id,
        title,
        is_custom: true,
        source: "custom",
        sort_order: nextOrder,
      })
      .select()
      .single();

    if (!error && data) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, items: [...c.items, data] } : c
        )
      );
    }
    setNewItemTitle("");
    setAddingTo(null);
  }

  async function deleteItem(item: ChecklistItem) {
    setCategories((prev) =>
      prev.map((c) => ({
        ...c,
        items: c.items.filter((i) => i.id !== item.id),
      }))
    );
    const supabase = createClient();
    await supabase.from("checklist_items").delete().eq("id", item.id);
  }

  async function saveEdit(item: ChecklistItem) {
    const title = editTitle.trim();
    if (!title) {
      setEditingItem(null);
      return;
    }
    setCategories((prev) =>
      prev.map((c) => ({
        ...c,
        items: c.items.map((i) => (i.id === item.id ? { ...i, title } : i)),
      }))
    );
    setEditingItem(null);
    const supabase = createClient();
    await supabase.from("checklist_items").update({ title }).eq("id", item.id);
  }

  function toggleCollapse(categoryId: string) {
    setCollapsed((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  }

  if (configError) {
    return (
      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">Supabase 설정이 필요합니다</p>
          <p className="text-sm text-slate-500">
            .env.local에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
            를 설정한 뒤 다시 시도해주세요.
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-sm text-slate-400">불러오는 중...</p>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3">
        <p className="text-lg font-semibold">프로젝트를 찾을 수 없습니다</p>
        <p className="text-sm text-slate-500">코드: {shareCode}</p>
        <Link href="/" className="text-sm text-slate-900 underline">
          홈으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-5 pt-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <Link href="/" className="text-sm text-slate-500">
            ← 홈
          </Link>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(project.share_code);
            }}
            className="text-xs font-mono tracking-widest bg-slate-100 rounded-full px-3 py-1 text-slate-600 active:scale-95 transition"
            title="탭하여 코드 복사"
          >
            코드 {project.share_code}
          </button>
        </div>
        <h1 className="text-lg font-bold text-slate-900 truncate">{project.name}</h1>
        {project.client_name && (
          <p className="text-xs text-slate-500 mt-0.5">{project.client_name}</p>
        )}
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar percent={overallPercent} />
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            {checkedCount}/{totalCount} ({overallPercent}%)
          </span>
        </div>
        <label className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
            className="w-4 h-4 rounded accent-slate-900"
          />
          완료 항목 숨기기
        </label>
      </div>

      {/* 카테고리 목록 */}
      <div className="px-4 pt-3 space-y-3">
        {categories.map((cat) => {
          const catTotal = cat.items.length;
          const catChecked = cat.items.filter((i) => i.is_checked).length;
          const catPercent = catTotal === 0 ? 0 : Math.round((catChecked / catTotal) * 100);
          const isCollapsed = collapsed[cat.id];
          const visibleItems = hideDone
            ? cat.items.filter((i) => !i.is_checked)
            : cat.items;

          return (
            <div key={cat.id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleCollapse(cat.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 active:bg-slate-50"
              >
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {cat.name}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="w-20">
                      <ProgressBar percent={catPercent} />
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {catChecked}/{catTotal}
                    </span>
                  </div>
                </div>
                <span
                  className={`ml-3 text-slate-400 transition-transform ${
                    isCollapsed ? "" : "rotate-180"
                  }`}
                >
                  ▾
                </span>
              </button>

              {!isCollapsed && (
                <div className="border-t border-slate-100">
                  {visibleItems.length === 0 && (
                    <p className="px-4 py-3 text-xs text-slate-400">
                      {hideDone ? "모든 항목을 완료했습니다 🎉" : "항목이 없습니다"}
                    </p>
                  )}
                  {visibleItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleItem(item)}
                        className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition ${
                          item.is_checked
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {item.is_checked && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path
                              fillRule="evenodd"
                              d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        {editingItem === item.id ? (
                          <div className="flex gap-2">
                            <input
                              autoFocus
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(item);
                                if (e.key === "Escape") setEditingItem(null);
                              }}
                              className="flex-1 min-w-0 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                            />
                            <button
                              onClick={() => saveEdit(item)}
                              className="text-xs font-semibold text-slate-900 px-2"
                            >
                              저장
                            </button>
                          </div>
                        ) : (
                          <>
                            <p
                              className={`text-sm leading-snug ${
                                item.is_checked
                                  ? "text-slate-400 line-through"
                                  : "text-slate-800"
                              }`}
                            >
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {editingItem !== item.id && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingItem(item.id);
                              setEditTitle(item.title);
                            }}
                            className="text-slate-300 active:text-slate-600 p-1 text-xs"
                            aria-label="수정"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => deleteItem(item)}
                            className="text-slate-300 active:text-red-500 p-1 text-xs"
                            aria-label="삭제"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* 항목 추가 */}
                  {addingTo === cat.id ? (
                    <div className="flex gap-2 px-4 py-3 bg-slate-50">
                      <input
                        autoFocus
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addItem(cat.id);
                          if (e.key === "Escape") setAddingTo(null);
                        }}
                        placeholder="새 체크 항목 입력"
                        className="flex-1 min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => addItem(cat.id)}
                        className="text-xs font-semibold text-white bg-slate-900 rounded-lg px-3"
                      >
                        추가
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAddingTo(cat.id);
                        setNewItemTitle("");
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-400 active:bg-slate-50"
                    >
                      + 항목 추가
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
