import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Admission Process: Step by Step | OurTurnToCare",
  description:
    "Everything you need to know about the nursing home admission process — from timing and PASARR screening to the admission agreement, move-in day, and the first care plan meeting.",
  openGraph: {
    title: "Nursing Home Admission Process: Step by Step",
    description:
      "From timing and PASARR screening to the admission agreement and first care plan meeting — a clear guide to the nursing home admission process.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/admission-process/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/admission-process/",
  },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-slate-800 mb-5 leading-snug scroll-mt-24">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold text-slate-800 mt-7 mb-3 leading-snug">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.0625rem] leading-[1.75] text-slate-600 mb-5">{children}</p>;
}

function Divider() {
  return <hr className="my-10 border-slate-100" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Check Medicaid eligibility</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          If your parent may eventually need Medicaid, start the screening process now — before admission.
        </p>
        <Link
          href="/tools/medicaid-screener"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Medicaid Screener →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "How to Evaluate Quality", href: "/nursing-homes/how-to-evaluate/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
            { label: "How to Pay for Care", href: "/nursing-homes/paying-for/" },
            { label: "The Transition Guide", href: "/nursing-homes/transition-guide/" },
            { label: "Back to Nursing Homes Hub", href: "/nursing-homes/" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AdmissionProcessPage() {
  return (
    <>
      <section
        className="px-4 sm:px-6 py-14 sm:py-20"
        style={{ background: "linear-gradient(to bottom, #f0fdfa, #ffffff)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/nursing-homes/" className="hover:text-teal-700 transition-colors">Nursing Homes</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">Admission Process</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            The Nursing Home Admission Process: Step by Step
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Whether the admission is planned or follows an unexpected hospitalization,
            understanding the process helps you handle it with more confidence.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Admissions happen in two scenarios: after a hospitalization (often with
                only 24–48 hours notice) or as a planned transition. Either way, the basic
                process is the same — but the time pressure is very different. If you&rsquo;re
                reading this before a crisis, use that advantage. If you&rsquo;re in the middle of
                one, focus on what you can control right now.
              </P>

              <H2 id="step1">Step 1: Timing and Facility Selection</H2>
              <P>
                <strong className="text-slate-800">After a hospitalization:</strong> Hospital discharge planners will typically
                begin discussing post-acute placement options within the first day or two of
                admission. They&rsquo;ll provide a list of nursing homes in the area, but the
                choice is yours — you are not required to accept their first recommendation
                or any facility on their list.
              </P>
              <P>
                Ask the discharge planner for all available options that can accept your
                parent with their specific needs and insurance. Then use Medicare Care
                Compare to quickly review the star ratings of options on the list. Even
                with limited time, you can usually narrow to two or three reasonable
                options and make a brief in-person visit before committing.
              </P>
              <P>
                <strong className="text-slate-800">Planned transition:</strong> You have more time to do thorough research and
                visit multiple facilities. See our guides on{" "}
                <Link href="/nursing-homes/how-to-evaluate/" className="text-teal-700 underline hover:text-teal-900">
                  how to evaluate quality
                </Link>{" "}
                and the{" "}
                <Link href="/nursing-homes/questions-to-ask/" className="text-teal-700 underline hover:text-teal-900">
                  40 questions to ask on a tour
                </Link>.
              </P>

              <Divider />

              <H2 id="step2">Step 2: The PASARR Screening</H2>
              <P>
                Federal law requires a Pre-Admission Screening and Resident Review (PASARR)
                before admission to any Medicaid-certified nursing home. The PASARR
                screens for serious mental illness and intellectual disability to ensure
                the nursing home is the appropriate level of care and to identify any
                specialized services the resident needs.
              </P>
              <P>
                PASARR is a two-level process. Level I is a brief questionnaire completed
                for every applicant. If Level I identifies potential mental illness or
                intellectual disability, a more detailed Level II evaluation is required.
                In most cases, PASARR is completed quickly and doesn&rsquo;t significantly delay
                admission.
              </P>

              <Divider />

              <H2 id="step3">Step 3: Gather Your Documents</H2>
              <P>
                Have these ready before or at admission:
              </P>
              <H3>Medical Documents</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Hospital discharge summary (if coming from a hospital)",
                  "Physician orders for medications and treatments",
                  "List of all current medications with dosages",
                  "Recent lab results, imaging reports, and specialist notes",
                  "Immunization records",
                  "Primary care physician and specialist contact information",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>Legal Documents</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Healthcare Power of Attorney or Healthcare Proxy",
                  "Living Will or Advance Directive",
                  "POLST or MOLST form (if one exists)",
                  "General Durable Power of Attorney (for financial decisions)",
                  "Court guardianship order (if applicable)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>Financial and Insurance Documents</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Medicare card and Medicare Supplement (Medigap) card if applicable",
                  "Medicaid card (if already enrolled)",
                  "Long-term care insurance policy information",
                  "VA identification and benefits information (if applicable)",
                  "List of financial accounts and assets (for Medicaid planning purposes)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="step4">Step 4: The Admission Agreement</H2>
              <P>
                The admission agreement is a legally binding contract between you and the
                nursing home. Read it carefully before signing — and if possible, have an
                elder law attorney review it before you do.
              </P>
              <Warning>
                <strong>Critical things to watch for in the admission agreement:</strong>
                <br /><br />
                <strong>Arbitration clauses</strong> — Many agreements include a mandatory arbitration
                clause that waives your right to sue in court. These are often buried in
                the document. You can and should ask to have the arbitration clause
                removed — a nursing home cannot refuse admission based solely on your
                refusal to sign an arbitration agreement.
                <br /><br />
                <strong>Responsible party vs. guarantor language</strong> — The facility will ask
                you to sign as a &ldquo;responsible party,&rdquo; which is appropriate. But if the
                agreement asks you to sign as a &ldquo;guarantor&rdquo; of payment, you are personally
                guaranteeing the bill. A nursing home cannot legally require a third party
                to guarantee a resident&rsquo;s bills as a condition of admission. Cross out or
                refuse any guarantor language.
                <br /><br />
                <strong>Discharge and transfer policies</strong> — Understand the circumstances under
                which the facility can ask your parent to leave.
              </Warning>
              <P>
                Also confirm in writing: what services are included in the daily rate, what
                will be billed separately, the billing cycle, and how rate increases are
                communicated.
              </P>

              <Divider />

              <H2 id="step5">Step 5: Move-In Day</H2>
              <P>
                Move-in day is emotionally significant for both you and your parent. Some
                practical guidance:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Bring familiar items from home — a favorite blanket, photographs, a clock, personal décor — to make the room feel less institutional",
                  "Label every personal item clearly with your parent's name",
                  "Arrive early enough to get settled before a meal, which gives staff a chance to meet your parent in a social context",
                  "Create a brief 'About Me' document — one page that tells staff who your parent is: their career, family, preferences, routines, and what brings them comfort. This humanizes your parent to every caregiver who works with them.",
                  "Introduce yourself to the charge nurse and CNA on duty and exchange contact information",
                  "Plan to spend a few hours on move-in day, then step out — long stays can delay adjustment",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="step6">Step 6: The First Care Plan Meeting</H2>
              <P>
                Within the first 14 days of admission (required by federal law), the
                facility must complete a full assessment of your parent and develop
                an individualized care plan. A care plan meeting is held to review the
                assessment and plan — and family members have the right to attend.
              </P>
              <P>
                The care plan covers your parent&rsquo;s medical conditions and treatments,
                functional abilities and limitations, personal preferences and routines,
                rehabilitation goals, social and psychological needs, and discharge
                planning (if applicable).
              </P>
              <Callout>
                Attend this meeting. Ask questions. Push back if the care plan doesn&rsquo;t
                reflect your parent&rsquo;s preferences, values, or goals. This meeting sets the
                tone for your parent&rsquo;s entire experience at the facility, and your
                engagement signals to staff that this resident has an involved family.
              </Callout>
              <P>
                After the first care plan meeting, care plan reviews are typically held
                quarterly or whenever there is a significant change in your parent&rsquo;s
                condition. Request to be notified of all care plan meetings and to
                participate.
              </P>

            </article>

            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24"><SidebarCTA /></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Planning Ahead Makes a Difference
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            If you&rsquo;re planning ahead rather than reacting to a crisis, you have time to
            check Medicaid eligibility, review finances, and consult an elder law attorney
            — all of which can protect your parent&rsquo;s assets and ensure better care options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/medicaid-screener"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Check Medicaid Eligibility →
            </Link>
            <Link
              href="/tools/care-assessment"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Take the Care Assessment →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
