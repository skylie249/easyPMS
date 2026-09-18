# Easy PMS 체크리스트 - TASKS

Claude(Cowork)에서 초기 구현 후, VSCode + Claude Code로 이어서 작업하기 위한 진행 상황 기록입니다.

## 프로젝트 개요

- SI 프로젝트 준비사항/PMP 실무 체크리스트를 모바일에서 관리·참고하는 웹앱
- 로그인 없이 6자리 공유 코드로 프로젝트 구분
- Next.js(App Router) + Tailwind + Supabase(anon key) + Vercel 배포

## 완료된 작업

- [x] Next.js 프로젝트 초기 세팅 (`app/`, `lib/`, `components/`)
- [x] Supabase 스키마 설계 (`supabase/schema.sql`)
  - `projects`, `checklist_categories`, `checklist_items`, `template_categories`, `template_items`
  - RLS 활성화 + anon 전체 CRUD 정책 포함되어 있음 (단, 실제 적용 시 오류 발생 중 — 아래 이슈 참고)
- [x] SI 실무 체크리스트 템플릿 시드 데이터 (`supabase/seed_template.sql`) — 10개 카테고리, 약 60개 항목
- [x] 홈 화면 (`app/page.tsx`) — 코드 입력 / 새 프로젝트 만들기
- [x] 새 프로젝트 생성 화면 (`app/new/page.tsx`) — 템플릿 복제 로직 포함
  - 생성 완료 후 공유 코드를 보여주는 확인 화면 추가 (복사 버튼 + 이동 버튼)
  - Supabase 에러 메시지를 그대로 노출하도록 개선
- [x] 체크리스트 상세 화면 (`components/checklist-client.tsx`)
  - 카테고리별 진행률, 접기/펼치기, 완료 항목 숨기기
  - 항목 체크/해제, 추가/수정/삭제
  - 로드 실패 시 실제 Supabase 에러 메시지 노출 + 재시도 버튼 추가
- [x] `npm run build`, `npm run lint` 통과 확인 (컨테이너 환경 기준)
- [x] 파비콘 추가 — 기본 Next.js 플레이스홀더 제거, `app/icon.tsx`(32x32) / `app/apple-icon.tsx`(180x180)로 브랜드 컬러(#0f172a) + 체크마크 아이콘 생성
- [x] 영어(en) 다국어 지원 — 코드 완료, DB 반영은 수동 필요 (아래 이슈 #3 참고)
  - `/en` 접두사 라우트 전체(홈, 새 프로젝트, 체크리스트 상세, 가이드, 소개, 개인정보처리방침, 이용약관) 영어 버전 추가, 한국어는 기존 URL 그대로 유지
  - 인터랙티브 페이지는 `components/home-client.tsx`, `components/new-project-client.tsx`, `components/checklist-client.tsx`로 공용화하고 `lang` prop으로 문구 전환
  - 체크리스트 템플릿(10개 카테고리·60여개 항목)도 영어로 번역해 `template_categories`/`template_items`에 `locale` 컬럼으로 구분 저장, `/en/new`은 `locale='en'` 템플릿을 조회해서 복제
  - 각 페이지 하단/상단에 언어 전환 링크(한국어 ↔ English) 추가
  - `robots.ts`/`sitemap.ts`에 `/en/*` 반영, `sitemap.ts`는 ko/en 페이지 간 `alternates.languages` 상호 연결
  - 루트 레이아웃이 `<html lang="ko">`로 고정되어 있어 `/en/*`에서는 `components/html-lang-sync.tsx`(클라이언트 컴포넌트)로 `document.documentElement.lang`을 보정

## 진행 중 이슈 (다음 세션에서 우선 해결)

### 1. Supabase RLS 정책 문제 (최우선) — 코드 수정 완료, DB 반영은 수동 필요

- 원인 확인됨: `schema.sql`의 정책이 role 지정 없이 생성되어(`for all using (true) with check (true)`)
  Supabase 프로젝트 설정에 따라 `anon` role에 적용되지 않는 문제였음
- 조치 완료:
  - `supabase/schema.sql`의 정책 5개에 `to anon` 명시 추가 (신규 프로젝트 생성 시 기본으로 올바르게 적용됨)
  - `supabase/fix_rls_policies.sql` 신규 작성 — 기존에 이미 생성된 Supabase 프로젝트의 정책을 안전하게(데이터 변경 없이) 재생성하는 마이그레이션 스크립트
- **사용자 조치 필요** (에이전트는 DB 자격증명이 없어 직접 실행 불가):
  1. [Supabase SQL Editor](https://supabase.com/dashboard/project/gqghggwmanllfdsqzdap/sql/new)를 열고 `supabase/fix_rls_policies.sql` 내용을 붙여넣어 실행
  2. 실행 후 파일 하단 주석의 확인용 쿼리(`select ... from pg_policies ...`)로 각 정책의 `roles` 컬럼에 `{anon}`이 포함되는지 확인
  3. 브라우저에서 프로젝트 생성 → 상세 화면(`/p/[code]`) 진입까지 재현하여 정상 동작 확인

### 2. 검증 필요 (RLS 수정 후)

- [ ] 새 프로젝트 생성 → 완료 화면에서 코드 정상 표시 확인
- [ ] "체크리스트로 이동" 클릭 → 상세 화면 정상 진입 확인
- [ ] 홈에서 코드 입력 → 동일 프로젝트 재접속 확인
- [ ] 항목 체크/해제가 새로고침 후에도 유지되는지 확인
- [ ] 항목 추가/수정/삭제 정상 동작 확인
- [ ] 모바일 브라우저(또는 크롬 개발자도구 모바일 뷰)에서 레이아웃 확인

### 3. 영어 템플릿 시드 DB 반영 필요 (다국어 지원) — 완료

- [x] `supabase/add_english_template.sql` 실행 완료. Supabase REST API(anon key)로 직접 조회해 확인함:
  `template_categories` ko 10개 / en 10개, `template_items` ko 64개 / en 64개, 영어 카테고리명 정상 삽입, anon 조회 정상 동작
- [ ] 배포된 사이트에서 `/en/new`으로 실제 프로젝트 생성까지 사용자 확인 필요 (DB 데이터는 검증됨, UI 플로우는 미확인)

## 향후 개선 아이디어 (선택)

- [ ] 프로젝트 목록 화면 (현재는 코드를 알아야만 접근 가능 — 브라우저 로컬에 최근 접속 코드 저장해서 홈에 "최근 프로젝트" 목록 보여주면 편의성 향상)
- [ ] 카테고리 자체 추가/삭제 기능 (현재는 항목만 추가/수정/삭제 가능)
- [ ] 프로젝트 삭제 기능
- [ ] 카테고리 순서 변경(드래그 정렬)
- [x] PWA 매니페스트 추가해서 "홈 화면에 추가" 시 아이콘/스플래시 적용 (`app/manifest.ts`, `app/pwa-icon-192/route.tsx`, `app/pwa-icon-512/route.tsx`, 아이콘 드로잉 로직은 `lib/brand-icon.tsx`로 공용화하여 `icon.tsx`/`apple-icon.tsx`와 함께 재사용)

## AdSense 심사 준비 체크리스트

이 웹앱(easyPMS)에 Google AdSense 광고를 게재하려면 심사를 통과해야 합니다. 아래는 심사 통과를 위해 준비해야 할 항목들입니다.

### 필수 정책 페이지

- [x] 개인정보처리방침(Privacy Policy) 페이지 추가 — AdSense 필수 요건. 수집하는 정보(공유 코드, Supabase 저장 데이터 등)와 쿠키/광고 관련 고지 포함 (`app/privacy/page.tsx`, 홈 화면 하단에 링크 추가)
- [x] 이용약관(Terms of Service) 페이지 추가 (권장) (`app/terms/page.tsx`, 홈 화면 하단에 링크 추가)
- [x] 소개(About) / 문의(Contact) 페이지 추가 — 사이트 운영 주체를 명확히 하면 심사에 유리 (`app/about/page.tsx`)

### 사이트 구조 & 기술 요건

- [ ] 헤더/푸터 등 사이트 전역 내비게이션 정비 (현재는 코드 입력 기반 단일 플로우라 페이지 간 이동 경로가 약함)
- [x] `robots.txt`, `sitemap.xml` 추가 (`app/robots.ts`, `app/sitemap.ts` — `/p/[code]`는 공유코드 기반 비공개 데이터라 크롤링 제외, 도메인은 `NEXT_PUBLIC_SITE_URL` 환경변수로 관리)
- [x] 커스텀 도메인 연결 확인 (Vercel 기본 `*.vercel.app` 서브도메인은 AdSense 승인이 제한되는 경우가 있어 커스텀 도메인 권장) — `easypms.nexalab.app`으로 확정, `lib/site.ts` 기본값 및 `env.local.example`의 `NEXT_PUBLIC_SITE_URL` 갱신. Vercel 프로젝트에 실제 도메인 연결은 별도 확인 필요
- [ ] 모바일 반응형 — 이미 반응형으로 구현되어 있음 (완료로 판단)
- [ ] Google Search Console에 사이트 등록 및 색인 확인

### 콘텐츠 요건 (주의 필요)

- [x] "고유하고 가치 있는 콘텐츠(valuable content)" 정책 대응 — SI 프로젝트 10단계 실무 가이드 + 앱 사용법 + FAQ로 구성된 `app/guide/page.tsx` 추가, 홈/소개 페이지에서 링크, sitemap.ts에 등록
- [ ] 사이트가 "공사 중" 상태가 아니라 실제로 작동하는 서비스여야 함 (현재 핵심 기능은 동작하므로 충족 가능성 높음, 단 RLS 이슈 해결 필요 — 위 이슈 #1 참고)
- [ ] 금지 콘텐츠(성인물, 폭력, 저작권 침해 등) 없음 확인 — 해당 사항 없음

### AdSense 신청 절차

- [ ] AdSense 계정 생성 후 사이트 소유권 인증 (사이트에 인증 메타태그 또는 스니펫 삽입)
- [ ] 심사 신청 및 대기 (통상 며칠~수 주 소요, 공식적인 최소 트래픽/사이트 운영 기간 기준은 없으나 실사용 이력이 있으면 유리)
- [ ] 승인 후 `public/ads.txt`에 발급받은 퍼블리셔 ID로 `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` 형식의 항목 추가

## 참고 파일 위치

- 스키마: `supabase/schema.sql`
- 템플릿 시드: `supabase/seed_template.sql`(한국어), `supabase/seed_template_en.sql`(영어)
- RLS 수정 마이그레이션: `supabase/fix_rls_policies.sql`
- 영어 템플릿 마이그레이션: `supabase/add_english_template.sql`
- 홈: `app/page.tsx`(ko), `app/en/page.tsx`(en) → `components/home-client.tsx`
- 생성: `app/new/page.tsx`(ko), `app/en/new/page.tsx`(en) → `components/new-project-client.tsx`
- 상세: `app/p/[code]/page.tsx`(ko), `app/en/p/[code]/page.tsx`(en) → `components/checklist-client.tsx`
- 콘텐츠 페이지: `app/{about,privacy,terms,guide}/page.tsx`(ko), `app/en/{about,privacy,terms,guide}/page.tsx`(en)
- 다국어 설정: `lib/i18n.ts`
- Supabase 클라이언트: `lib/supabase.ts`
- 타입: `lib/types.ts`
