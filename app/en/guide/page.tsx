import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SI Project Checklist Guide | Easy PMS",
  description:
    "Phase-by-phase checkpoints that are easy to miss in SI projects, from kickoff to closeout, plus how to use Easy PMS Checklist.",
};

export default function GuidePageEn() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <Link href="/en" className="text-sm text-slate-500 hover:text-slate-700">
            ← Home
          </Link>
          <Link href="/guide" className="text-sm text-slate-500 underline hover:text-slate-700">
            한국어
          </Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          SI Project Checklist Guide
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          From kickoff to closeout, here are the items most often missed on
          real SI projects, organized phase by phase. Easy PMS Checklist
          turns this exact flow into a ready-to-use template.
        </p>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Why use a checklist
            </h2>
            <p>
              SI projects involve many stakeholders — the client, the vendor,
              subcontractors, and business departments — and each phase, from
              contracting to requirements, design, development, testing, and
              go-live, has its own documents and approval steps to track.
              Especially on smaller projects run by one or two PMs/PLs across
              multiple phases at once, it&apos;s common for something
              everyone assumed &ldquo;someone else handled&rdquo; to slip
              through with no one actually owning it.
            </p>
            <p className="mt-2">
              A checklist is the simplest, most effective way to prevent this
              kind of gap. The 10 phases below reflect a flow that repeats
              across real SI projects, and map one-to-one to Easy PMS&apos;s
              built-in template.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Phase-by-phase checkpoints
            </h2>

            <div className="space-y-6">
              <Stage
                number="01"
                title="Kickoff Preparation"
                body="This phase spans from contract signing to the actual start of work. Documenting purpose, scope, and stakeholders in a kickoff report and project charter gives you a paper trail if disputes arise later. Lock down the PM/PL's reporting line and emergency contacts before the kickoff meeting to reduce early miscommunication. Dev environment account requests often take a while to process, so start those first."
              />
              <Stage
                number="02"
                title="Contract & Scope Management"
                body="If you don't clearly separate the RFP and contract scope in writing, arguments about 'is this in scope or not' are almost guaranteed mid-project. Agreeing early on a change management process — who approves changes and how they flow into schedule/cost — sets you up to handle change requests (CRs) systematically. Liquidated damages and warranty terms are the first things to check in the contract."
              />
              <Stage
                number="03"
                title="Requirements Definition & Analysis"
                body="Defining requirements without an as-is analysis of the current system tends to produce designs that clash with existing business processes. Building a requirements traceability matrix (RTM) early lets you trace any requirement forward into design and test later. Non-functional requirements like performance, security, and availability rarely come up in business interviews, so track them separately."
              />
              <Stage
                number="04"
                title="Design"
                body="Screen designs, ERDs, API specs, and architecture documents all need client review before development starts. Starting development before design sign-off turns any later design change into rework. Security design (auth, encryption, access control) depends on whether personal data is involved, so confirm that scope early."
              />
              <Stage
                number="05"
                title="Development"
                body="Coding conventions and a branching strategy are cheaper to agree on before multiple developers are on board. Setting up CI/CD early means you get the benefits of automated deployment by the time testing starts. Weekly progress reports should compare actual progress against the WBS so schedule slips get caught early."
              />
              <Stage
                number="06"
                title="Testing & Quality"
                body="Integration testing and UAT serve different purposes: integration testing catches issues between modules, while UAT confirms the business side can actually use the system for real scenarios. Without a defect log tracked by severity, it's hard to know how many unresolved defects remain right before go-live. If the system handles personal data, confirm whether a security vulnerability check (e.g. penetration testing) is required."
              />
              <Stage
                number="07"
                title="Go-live & Transition"
                body="Every go-live plan needs a rollback plan. Data migration should include a post-migration validation step (record counts, spot-checking sample data), and a go-live rehearsal lets you verify the actual scenario beforehand. Run a hyper-care period of focused monitoring right after launch to respond quickly to early incidents."
              />
              <Stage
                number="08"
                title="Deliverable Management"
                body="Kickoff/interim/completion reports, final design documents, test results, manuals, and source code are all evidence for the client's acceptance review. Maintaining a deliverable baseline list from the start avoids scrambling to find missing deliverables at closeout."
              />
              <Stage
                number="09"
                title="Closeout, Acceptance & Handover"
                body="Agree on acceptance criteria with the client in advance — the project isn't officially closed without a signed acceptance certificate. Share system architecture and issue history when handing off to the operations/maintenance team to reduce early confusion. Revoking dev accounts and transferring ops accounts is a security step that also belongs in this phase."
              />
              <Stage
                number="10"
                title="Risk, Issue & Communication Management"
                body="A risk register and issue log only add value if they're kept up throughout the project, not just at the start. Regular status meetings and minutes become the record of accountability with the client, so keep writing them even when it feels like a formality."
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              How to use Easy PMS Checklist
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                From the home screen, tap{" "}
                <strong>&ldquo;Create a new project checklist&rdquo;</strong>{" "}
                and enter basic info like project name, client, and dates —
                the 10-phase template above (about 60 items) is copied in
                automatically.
              </li>
              <li>
                Once created, you get a 6-character <strong>share code</strong>.
                Send it to your team and they can access the same checklist
                without logging in.
              </li>
              <li>
                On the checklist screen, track progress per category and
                check off or hide completed items.
              </li>
              <li>
                If the template is missing something specific to your
                project, add, edit, or delete items freely.
              </li>
              <li>
                Next time, just enter the share code on the home screen to
                jump straight back into the same project.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              FAQ
            </h2>
            <div className="space-y-4">
              <Faq
                q="What if I lose my share code?"
                a="There's currently no way to recover a lost code, so please save it somewhere safe when you create the project."
              />
              <Faq
                q="Is my data safe without a login?"
                a="Anyone who knows the share code can access and edit the data — it's not access-controlled beyond the code itself. Manage who you share the code with carefully if the project shouldn't be public. See the Privacy Policy for details."
              />
              <Faq
                q="Can I adapt the template items to our company's process?"
                a="Yes. You can freely add, edit, or delete items per project — the template is just a starting point, not something you have to follow exactly."
              />
            </div>
          </section>

          <section>
            <p>
              Have more questions? Reach out via the{" "}
              <Link href="/en/about" className="underline">
                About & Contact
              </Link>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stage({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-semibold text-slate-400">{number}</span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-2 text-slate-600">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-semibold text-slate-900">Q. {q}</p>
      <p className="mt-1 text-slate-600">A. {a}</p>
    </div>
  );
}
