import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Easy PMS Checklist",
  description: "About Easy PMS Checklist and how to contact us.",
};

export default function AboutPageEn() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <Link href="/en" className="text-sm text-slate-500 hover:text-slate-700">
            ← Home
          </Link>
          <Link href="/about" className="text-sm text-slate-500 underline hover:text-slate-700">
            한국어
          </Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          About & Contact
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              About the service
            </h2>
            <p>
              Easy PMS Checklist is a free web tool that helps you quickly
              check and manage the items that are most often missed in SI
              (systems integration) project readiness and PMP (project
              management) practice, right from your phone.
            </p>
            <p className="mt-2">
              There is no sign-up or login — each project is identified by a
              6-character share code. Share the code with your team and
              everyone sees the same checklist. It ships with a built-in
              template covering everything from pre-kickoff preparation to
              phase-by-phase checkpoints used in real SI projects.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              Key features
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Automatic SI checklist template generation (by category)</li>
              <li>Per-category progress tracking, check/uncheck items</li>
              <li>Add, edit, and delete custom items per project</li>
              <li>Share the same live checklist with your team via a code</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              Operation & contact
            </h2>
            <p>
              This service is run by an individual as a free, non-commercial
              tool. For issues, bug reports, feature requests, or data
              deletion requests, please email us below and we&apos;ll get
              back to you.
            </p>
            <p className="mt-2">
              Email:{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-slate-900">
              Related documents
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <Link href="/en/guide" className="underline">
                  SI Project Checklist Guide
                </Link>
              </li>
              <li>
                <Link href="/en/privacy" className="underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/en/terms" className="underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
