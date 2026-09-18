"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleGo(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) {
      setError("공유 코드를 정확히 입력해주세요.");
      return;
    }
    router.push(`/p/${trimmed}`);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white text-2xl mb-4">
            ✅
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Easy PMS 체크리스트</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            SI 프로젝트 준비사항과 PMP 필수 항목을
            <br />
            모바일에서 언제든 확인하고 체크하세요
          </p>
        </div>

        <Link
          href="/new"
          className="block w-full text-center rounded-xl bg-slate-900 text-white font-semibold py-3.5 shadow-sm active:scale-[0.98] transition"
        >
          + 새 프로젝트 체크리스트 만들기
        </Link>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">또는</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleGo} className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            기존 프로젝트 코드로 접속
          </label>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="예: A1B2C9"
              maxLength={8}
              className="flex-1 min-w-0 rounded-xl border border-slate-300 px-4 py-3 text-base tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-100 text-slate-900 font-semibold px-5 active:scale-[0.98] transition"
            >
              이동
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          로그인 없이 코드만으로 팀원과 공유할 수 있어요
        </p>

        <Link
          href="/guide"
          className="mt-4 block text-center text-xs font-medium text-slate-500 underline hover:text-slate-700"
        >
          SI 프로젝트 체크리스트 가이드 보기 →
        </Link>

        <p className="mt-4 text-center text-xs text-slate-400">
          <Link href="/about" className="underline hover:text-slate-500">
            소개
          </Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="underline hover:text-slate-500">
            개인정보처리방침
          </Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="underline hover:text-slate-500">
            이용약관
          </Link>
        </p>
      </div>
    </main>
  );
}
