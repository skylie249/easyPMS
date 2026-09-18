import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Easy PMS Checklist",
  description: "Privacy policy for the Easy PMS Checklist service.",
};

const EFFECTIVE_DATE = "2026-09-18";

export default function PrivacyPageEn() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <Link href="/en" className="text-sm text-slate-500 hover:text-slate-700">
            ← Home
          </Link>
          <Link href="/privacy" className="text-sm text-slate-500 underline hover:text-slate-700">
            한국어
          </Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Effective date: {EFFECTIVE_DATE}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <p>
              Easy PMS Checklist (&ldquo;the Service&rdquo;) values your
              privacy and publishes this policy to comply with applicable
              data protection laws.
            </p>
          </section>

          <Section title="1. Information we collect">
            <p>
              The Service works without login, identifying each project only
              by a 6-character share code, and does not collect member
              identifiers such as email or password. The following
              information may still be collected while you use the Service.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Information you enter directly: project name, client name,
                start/end dates, notes, and checklist item titles/descriptions
                (which may incidentally include names of client-side contacts
                if you choose to enter them)
              </li>
              <li>
                Information generated automatically while using the Service:
                access logs, IP address, browser information, cookies
              </li>
            </ul>
          </Section>

          <Section title="2. Purpose of collection and use">
            <ul className="list-disc space-y-1 pl-5">
              <li>Providing core functionality: creating, viewing, and editing checklists</li>
              <li>Identifying and accessing project data via the share code</li>
              <li>Responding to service outages and preventing abuse</li>
            </ul>
          </Section>

          <Section title="3. Retention period">
            <p>
              Project and checklist data you enter is retained as long as the
              share code remains valid. The Service does not currently offer
              a self-service project deletion feature; if you&apos;d like your
              data deleted, contact us at the address below and we will
              delete it promptly.
            </p>
          </Section>

          <Section title="4. Third-party services and processors">
            <p>The Service relies on the following third-party providers to operate reliably.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Supabase</strong> (database hosting) — stores the
                project and checklist data you enter. Servers may be located
                outside your country.
              </li>
              <li>
                <strong>Vercel</strong> (web hosting) — deployment and access
                log processing
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies and advertising">
            <p>
              The Service may use Google AdSense to display ads. Google and
              other third-party ad providers may use cookies to serve ads
              based on your interests.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Google uses the DART cookie to serve ads based on your visits
                to this site and others.
              </li>
              <li>
                You can opt out of personalized ads via{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                You can disable cookies in your browser settings; doing so may
                limit some features, including ad delivery.
              </li>
              <li>
                See{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Google&apos;s advertising policy
                </a>{" "}
                for more details.
              </li>
            </ul>
          </Section>

          <Section title="6. Your rights">
            <p>
              You may request access to, correction of, or deletion of your
              data at any time. Contact us at the address below and we will
              handle your request promptly.
            </p>
          </Section>

          <Section title="7. Privacy contact">
            <p>
              Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              This privacy policy may be revised to reflect changes in
              applicable law or the Service itself. Any changes will be
              announced on this page.
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
