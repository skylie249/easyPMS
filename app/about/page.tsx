import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개 및 문의 | Easy PMS 체크리스트",
  description:
    "Easy PMS 체크리스트 서비스 소개와 문의처를 안내합니다.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← 홈으로
          </Link>
          <Link href="/en/about" className="text-sm text-slate-500 underline hover:text-slate-700">
            English
          </Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          소개 및 문의
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              서비스 소개
            </h2>
            <p>
              Easy PMS 체크리스트는 SI 프로젝트 준비사항과 PMP(프로젝트
              관리) 실무에서 자주 누락되는 항목들을 모바일에서 빠르게
              확인하고 관리할 수 있도록 만든 무료 웹 도구입니다.
            </p>
            <p className="mt-2">
              회원가입이나 로그인 없이 6자리 공유 코드만으로 프로젝트를
              구분하며, 팀원과 코드만 공유하면 같은 체크리스트를 함께
              확인할 수 있습니다. 프로젝트 착수 전 준비사항부터 진행 중
              단계별 점검 항목까지, 실제 SI 현장에서 쓰이는 체크리스트
              템플릿을 기본으로 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              주요 기능
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>SI 실무 체크리스트 템플릿 자동 생성 (카테고리별 항목)</li>
              <li>카테고리별 진행률 확인, 항목 체크/해제</li>
              <li>프로젝트별 맞춤 항목 추가·수정·삭제</li>
              <li>공유 코드로 팀원과 동일한 체크리스트 실시간 공유</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              운영 및 문의
            </h2>
            <p>
              본 서비스는 개인이 운영하는 비상업 목적의 무료 도구로
              시작되었습니다. 서비스 이용 중 불편사항, 오류 신고,
              기능 제안, 데이터 삭제 요청 등은 아래 이메일로 연락해
              주시면 확인 후 답변드립니다.
            </p>
            <p className="mt-2">
              이메일:{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              관련 문서
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <Link href="/guide" className="underline">
                  SI 프로젝트 체크리스트 가이드
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="underline">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="underline">
                  이용약관
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
