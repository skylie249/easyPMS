import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Easy PMS 체크리스트",
  description: "Easy PMS 체크리스트 서비스의 개인정보처리방침입니다.",
};

const EFFECTIVE_DATE = "2026-09-18";

export default function PrivacyPage() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← 홈으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          개인정보처리방침
        </h1>
        <p className="mt-2 text-sm text-slate-500">시행일: {EFFECTIVE_DATE}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <p>
              Easy PMS 체크리스트(이하 &ldquo;서비스&rdquo;)는 이용자의 개인정보를
              소중히 다루며, 관련 법령을 준수하기 위해 다음과 같이
              개인정보처리방침을 수립·공개합니다.
            </p>
          </section>

          <Section title="1. 수집하는 정보 및 수집 방법">
            <p>
              서비스는 로그인 없이 6자리 공유 코드만으로 이용하는 구조이며,
              이메일·비밀번호 등 회원 식별 정보를 수집하지 않습니다. 다만
              서비스 이용 과정에서 다음 정보가 수집될 수 있습니다.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                이용자가 직접 입력하는 정보: 프로젝트명, 고객사명, 시작/종료일,
                메모, 체크리스트 항목 제목·설명 등 (이용자가 입력한 범위 내에서
                고객사 담당자명 등이 포함될 수 있음)
              </li>
              <li>
                서비스 이용 과정에서 자동으로 생성·수집되는 정보: 접속 로그,
                접속 IP, 브라우저 정보, 쿠키
              </li>
            </ul>
          </Section>

          <Section title="2. 개인정보의 수집 및 이용 목적">
            <ul className="list-disc space-y-1 pl-5">
              <li>체크리스트 생성·조회·수정 등 핵심 서비스 제공</li>
              <li>공유 코드를 통한 프로젝트 데이터 식별 및 접근</li>
              <li>서비스 장애 대응 및 부정 이용 방지</li>
            </ul>
          </Section>

          <Section title="3. 개인정보의 보유 및 이용 기간">
            <p>
              이용자가 입력한 프로젝트·체크리스트 데이터는 공유 코드가
              유효한 동안 계속 보관됩니다. 현재 서비스는 프로젝트 삭제
              기능을 제공하지 않으며, 삭제를 원하시는 경우 아래 문의처로
              요청하시면 지체 없이 삭제 조치합니다.
            </p>
          </Section>

          <Section title="4. 개인정보의 제3자 제공 및 처리 위탁">
            <p>서비스는 안정적인 운영을 위해 아래 외부 서비스를 이용합니다.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Supabase</strong> (데이터베이스 호스팅) — 이용자가
                입력한 프로젝트·체크리스트 데이터 저장. 서버가 국외
                리전에 위치할 수 있습니다.
              </li>
              <li>
                <strong>Vercel</strong> (웹 호스팅) — 서비스 배포 및 접속
                로그 처리
              </li>
            </ul>
          </Section>

          <Section title="5. 쿠키 및 광고 서비스">
            <p>
              서비스는 광고 게재를 위해 Google AdSense를 사용할 수
              있습니다. Google을 포함한 제3자 광고 서비스 제공업체는
              쿠키를 사용하여 이용자의 관심사에 기반한 광고를 게재할 수
              있습니다.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Google은 DART 쿠키를 이용하여 이용자가 이 사이트와 다른
                사이트에 방문한 이력을 바탕으로 광고를 게재합니다.
              </li>
              <li>
                이용자는{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Google 광고 설정
                </a>
                에서 맞춤 광고를 거부할 수 있습니다.
              </li>
              <li>
                이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수
                있으며, 이 경우 광고 게재 등 일부 기능 이용에 제한이
                있을 수 있습니다.
              </li>
              <li>
                자세한 내용은{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Google 광고 정책
                </a>
                을 참고하시기 바랍니다.
              </li>
            </ul>
          </Section>

          <Section title="6. 이용자의 권리">
            <p>
              이용자는 자신이 입력한 정보의 열람, 정정, 삭제를 언제든지
              요청할 수 있습니다. 아래 문의처로 연락 주시면 신속히
              처리하겠습니다.
            </p>
          </Section>

          <Section title="7. 개인정보 보호책임자 및 문의처">
            <p>
              이메일: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </Section>

          <Section title="8. 고지의 의무">
            <p>
              본 개인정보처리방침의 내용은 관련 법령 및 서비스 변경사항에
              따라 수정될 수 있으며, 변경 시 이 페이지를 통해 고지합니다.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
