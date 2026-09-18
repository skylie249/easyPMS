import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Easy PMS Checklist",
  description: "Terms of service for the Easy PMS Checklist service.",
};

const EFFECTIVE_DATE = "2026-09-18";

export default function TermsPageEn() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <Link href="/en" className="text-sm text-slate-500 hover:text-slate-700">
            ← Home
          </Link>
          <Link href="/terms" className="text-sm text-slate-500 underline hover:text-slate-700">
            한국어
          </Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Effective date: {EFFECTIVE_DATE}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <Section title="Article 1 (Purpose)">
            <p>
              These Terms govern the rights, obligations, and
              responsibilities of Easy PMS Checklist (&ldquo;the
              Service&rdquo;) and its users.
            </p>
          </Section>

          <Section title="Article 2 (Definitions)">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                &ldquo;Service&rdquo; means the web application that lets
                users manage SI project checklists, with each project
                identified by a 6-character share code, without sign-up.
              </li>
              <li>
                &ldquo;Share code&rdquo; means the unique code issued by the
                Service to access a specific project&apos;s checklist data.
              </li>
              <li>
                &ldquo;User&rdquo; means anyone who uses the Service under
                these Terms.
              </li>
            </ul>
          </Section>

          <Section title="Article 3 (Effect and amendment of the Terms)">
            <p>
              These Terms take effect upon being posted within the Service
              and may be amended within the scope permitted by applicable
              law. Changes will be announced within the Service.
            </p>
          </Section>

          <Section title="Article 4 (Provision and modification of the Service)">
            <p>
              The Service is provided free of charge and requires no sign-up.
              The Service may modify or discontinue features as needed for
              operational or technical reasons.
            </p>
          </Section>

          <Section title="Article 5 (User obligations)">
            <p>Users must not engage in any of the following while using the Service:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Impersonating others or entering false information</li>
              <li>
                Posting content that violates law or public order (obscene
                material, defamatory content, etc.)
              </li>
              <li>
                Disrupting normal operation of the Service or accessing
                another user&apos;s share code without authorization
              </li>
              <li>Reproducing or distributing information obtained through the Service without authorization</li>
            </ul>
          </Section>

          <Section title="Article 6 (Data management and responsibility)">
            <p>
              Because the Service uses share codes instead of login, anyone
              who knows a project&apos;s share code can access and modify its
              data. Users are responsible for safeguarding their share codes,
              and the Service is not liable for issues arising from a leaked
              code. Legal responsibility for the content of any data entered
              lies with the user who entered it.
            </p>
          </Section>

          <Section title="Article 7 (Advertising)">
            <p>
              The Service may display third-party advertising, including
              Google AdSense, to support its operation. Cookies and data
              processing related to advertising are governed by the{" "}
              <Link href="/en/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="Article 8 (Disclaimer)">
            <p>
              The Service is provided free of charge and is not liable for
              service interruptions or data loss caused by force majeure,
              system failures, or other events beyond its reasonable control.
              Users are encouraged to back up important data separately.
            </p>
          </Section>

          <Section title="Article 9 (Governing law and jurisdiction)">
            <p>
              These Terms are governed by the laws of the Republic of Korea.
              Any disputes arising from use of the Service will follow the
              procedures set out by applicable law.
            </p>
          </Section>

          <Section title="Article 10 (Contact)">
            <p>
              Email:{" "}
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
