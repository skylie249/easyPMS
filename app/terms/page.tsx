import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관 | Easy PMS 체크리스트",
  description: "Easy PMS 체크리스트 서비스의 이용약관입니다.",
};

const EFFECTIVE_DATE = "2026-09-18";

export default function TermsPage() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← 홈으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">이용약관</h1>
        <p className="mt-2 text-sm text-slate-500">시행일: {EFFECTIVE_DATE}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <Section title="제1조 (목적)">
            <p>
              본 약관은 Easy PMS 체크리스트(이하 &ldquo;서비스&rdquo;)를
              이용함에 있어 서비스와 이용자의 권리·의무 및 책임사항을
              정함을 목적으로 합니다.
            </p>
          </Section>

          <Section title="제2조 (정의)">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                &ldquo;서비스&rdquo;란 회원가입 없이 6자리 공유 코드로
                프로젝트를 구분하여 SI 프로젝트 체크리스트를 관리할 수
                있도록 제공되는 웹 애플리케이션을 말합니다.
              </li>
              <li>
                &ldquo;공유 코드&rdquo;란 특정 프로젝트의 체크리스트
                데이터에 접근하기 위해 서비스가 발급하는 고유 코드를
                말합니다.
              </li>
              <li>
                &ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는
                모든 사람을 말합니다.
              </li>
            </ul>
          </Section>

          <Section title="제3조 (약관의 효력 및 변경)">
            <p>
              본 약관은 서비스 화면에 게시함으로써 효력이 발생하며, 관련
              법령을 위배하지 않는 범위에서 개정될 수 있습니다. 약관이
              변경되는 경우 서비스 내 공지를 통해 고지합니다.
            </p>
          </Section>

          <Section title="제4조 (서비스의 제공 및 변경)">
            <p>
              서비스는 별도의 회원가입 절차 없이 무료로 제공됩니다.
              서비스는 운영상·기술상 필요에 따라 제공하는 서비스의 내용을
              변경하거나 중단할 수 있습니다.
            </p>
          </Section>

          <Section title="제5조 (이용자의 의무)">
            <p>이용자는 서비스 이용 시 다음 행위를 하지 않아야 합니다.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>타인의 정보를 도용하거나 허위 정보를 입력하는 행위</li>
              <li>
                법령이나 공서양속에 반하는 정보(음란물, 명예훼손성 정보
                등)를 게시하는 행위
              </li>
              <li>
                서비스의 정상적인 운영을 방해하거나 타인의 공유 코드에
                무단으로 접근하는 행위
              </li>
              <li>서비스를 이용해 얻은 정보를 무단으로 복제·배포하는 행위</li>
            </ul>
          </Section>

          <Section title="제6조 (데이터 관리 및 책임)">
            <p>
              공유 코드는 별도의 로그인 절차 없이 해당 코드를 아는 누구나
              프로젝트 데이터에 접근·수정할 수 있는 구조입니다. 공유 코드의
              관리 책임은 이용자에게 있으며, 코드 유출로 인해 발생하는
              문제에 대해 서비스는 책임을 지지 않습니다. 이용자가 입력한
              데이터의 내용에 대한 법적 책임은 해당 데이터를 입력한
              이용자에게 있습니다.
            </p>
          </Section>

          <Section title="제7조 (광고 게재)">
            <p>
              서비스는 운영을 위해 Google AdSense 등 제3자 광고를 게재할
              수 있습니다. 광고 관련 쿠키 및 데이터 처리에 관한 사항은{" "}
              <Link href="/privacy" className="underline">
                개인정보처리방침
              </Link>
              을 따릅니다.
            </p>
          </Section>

          <Section title="제8조 (면책조항)">
            <p>
              서비스는 무료로 제공되며, 천재지변, 시스템 장애 등 불가항력적
              사유로 인한 서비스 중단이나 데이터 손실에 대해 책임을 지지
              않습니다. 이용자는 중요한 데이터를 별도로 백업하는 것을
              권장합니다.
            </p>
          </Section>

          <Section title="제9조 (준거법 및 관할)">
            <p>
              본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과
              관련하여 분쟁이 발생할 경우 관련 법령이 정한 절차에 따릅니다.
            </p>
          </Section>

          <Section title="제10조 (문의처)">
            <p>
              이메일:{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
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
