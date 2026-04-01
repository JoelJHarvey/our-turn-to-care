import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Specialized Nursing Home Care: Rehab, Dementia & More | OurTurnToCare",
  description:
    "Short-stay rehabilitation, dementia care, wound care, ventilator support, dialysis, IV therapy, and palliative care in nursing homes — what each type involves and what to ask.",
  openGraph: {
    title: "Specialized Nursing Home Care: Rehab, Dementia & More",
    description:
      "Rehabilitation, dementia care, wound care, ventilator support, dialysis, IV therapy, and palliative care in nursing homes — explained for families.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/specialized-care/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/specialized-care/",
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

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Does your parent need specialized care?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment helps identify the right type and level of care based on your parent&apos;s specific medical and functional needs.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Care Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "Memory Care Guide", href: "/memory-care/" },
            { label: "Nursing Home Staffing", href: "/nursing-homes/staffing/" },
            { label: "Five-Star Ratings", href: "/nursing-homes/five-star-ratings/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
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

export default function SpecializedCarePage() {
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
            <span className="text-slate-700 font-medium">Specialized Care</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Specialized Care in Nursing Homes: Rehab, Dementia, and More
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Nursing homes offer far more than basic custodial care. Here&rsquo;s what each
            type of specialized care involves and what to ask when your parent needs it.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="rehab">Short-Stay Rehabilitation</H2>
              <P>
                The most common reason for a nursing home admission is short-stay
                rehabilitation following a hospitalization. Physical therapy, occupational
                therapy, and speech therapy are provided to help residents recover function
                and return home or transition to a less intensive care setting.
              </P>
              <H3>What Rehab Involves</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Physical therapy (PT) — focuses on mobility, strength, balance, and walking after fractures, strokes, joint replacements, or deconditioning",
                  "Occupational therapy (OT) — focuses on daily activities like dressing, bathing, and cooking; also addresses home safety and adaptive equipment needs",
                  "Speech therapy (ST) — addresses speech, language, cognition, and swallowing difficulties (common after strokes)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                Medicare covers short-stay rehabilitation following a qualifying
                hospitalization — 100% for the first 20 days, then with coinsurance
                through day 100. Coverage requires daily skilled care and measurable
                progress. See our{" "}
                <Link href="/nursing-homes/paying-for/" className="text-teal-700 underline hover:text-teal-900">
                  payment guide
                </Link>{" "}
                for full details on Medicare SNF coverage.
              </Callout>
              <H3>Questions to Ask for Rehabilitation</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Are therapists employed by the facility or contracted?",
                  "How many hours of therapy does my parent typically receive per day?",
                  "What is your successful community discharge rate (residents who return home)?",
                  "What is your rehospitalization rate?",
                  "How do you communicate therapy progress to family?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed text-sm">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-slate-300 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="dementia">Dementia and Alzheimer&rsquo;s Care</H2>
              <P>
                Advanced dementia with serious medical complications — severe swallowing
                difficulties, recurrent infections, pressure wounds, or the need for IV
                medications — often requires nursing home care rather than memory care.
                About 47% of nursing home long-stay residents have dementia.
              </P>
              <P>
                Only about 15% of nursing homes have dedicated dementia care units —
                specialized wings or floors with secured access, dementia-trained staff,
                structured programming, and environmental modifications. If your parent
                has dementia, ask whether the facility has a dedicated unit or whether
                residents with dementia are integrated with the general population.
              </P>
              <H3>What to Look for in Dementia Care</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Staff training specific to dementia care techniques and behavioral management",
                  "Low antipsychotic medication use rates (check on Medicare Care Compare)",
                  "Low physical restraint use",
                  "Structured daily routines that reduce agitation and confusion",
                  "Secured environment with safe outdoor space for wandering",
                  "Activity programming adapted for different cognitive levels",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                For context on how dementia care in nursing homes compares to dedicated
                memory care communities, see our{" "}
                <Link href="/memory-care/" className="text-teal-700 underline hover:text-teal-900">
                  memory care guide
                </Link>.
              </P>

              <Divider />

              <H2 id="wound-care">Wound Care</H2>
              <P>
                Chronic and complex wounds — pressure ulcers, diabetic foot ulcers,
                surgical wounds, venous or arterial ulcers — require specialized nursing
                care. Wound care is one of the clinical services that distinguishes
                nursing homes from other care settings.
              </P>
              <P>
                Ask whether the facility has a certified wound care nurse (CWCN) or
                wound care team, what wound treatment protocols they use, how wound
                outcomes are tracked, and what their rate of new or worsening pressure
                ulcers is (available on Medicare Care Compare as a quality measure). High
                pressure ulcer rates are a significant red flag.
              </P>

              <Divider />

              <H2 id="ventilator">Ventilator and Respiratory Care</H2>
              <P>
                A smaller subset of nursing homes provides specialized care for
                ventilator-dependent residents — people who require mechanical breathing
                support. This is highly specialized care requiring respiratory therapists
                and specially trained nursing staff on every shift.
              </P>
              <P>
                If your parent requires ventilator support, ask specifically whether the
                facility has experience with ventilator-dependent patients, the number of
                ventilator patients currently in residence, respiratory therapist
                availability and coverage hours, and the facility&rsquo;s approach to
                ventilator weaning if that is a goal.
              </P>

              <Divider />

              <H2 id="dialysis">Dialysis</H2>
              <P>
                For residents with kidney failure requiring dialysis, some nursing homes
                provide on-site dialysis (hemodialysis or peritoneal dialysis), while
                others coordinate transportation to outpatient dialysis centers three
                times per week. Either approach can work, but on-site dialysis reduces
                the fatigue and logistical burden of transport for medically fragile
                residents.
              </P>
              <P>
                Ask whether the facility has an established relationship with a dialysis
                provider, whether dialysis is on-site or requires transport, and how
                dialysis scheduling is coordinated with meals and nursing care.
              </P>

              <Divider />

              <H2 id="iv-therapy">IV Therapy and Complex Medication Management</H2>
              <P>
                Intravenous (IV) therapy — IV antibiotics, hydration, chemotherapy,
                pain management — is one of the primary reasons someone needs nursing
                home care rather than assisted living or home care. Nursing homes with
                skilled nurses on-site 24 hours a day can manage IV lines, monitor for
                complications, and adjust treatment in real time.
              </P>
              <P>
                Complex medication management — multiple medications with narrow
                therapeutic windows, anticoagulation monitoring, insulin management —
                is similarly a core nursing home capability. Ask about the pharmacy
                relationship, medication review processes, and how medication errors are
                prevented and tracked.
              </P>

              <Divider />

              <H2 id="palliative">Palliative Care</H2>
              <P>
                Palliative care is specialized medical care focused on relief from pain,
                symptoms, and stress — provided alongside curative or life-prolonging
                treatment, not instead of it. It is not the same as hospice, which is
                end-of-life focused.
              </P>
              <P>
                Not all nursing homes have formal palliative care programs, but all should
                be able to address comfort, pain management, and symptom relief for
                residents with serious illness. Ask whether the facility has a designated
                palliative care team or social worker, how they approach pain management
                and comfort care, and how they communicate with family about a resident&rsquo;s
                prognosis and goals of care.
              </P>
              <P>
                For end-of-life care specifically — including hospice in nursing homes and
                advance directive planning — see our{" "}
                <Link href="/nursing-homes/end-of-life/" className="text-teal-700 underline hover:text-teal-900">
                  end-of-life care guide
                </Link>.
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
            Find the Right Level of Care
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Understanding what type of specialized care your parent needs helps you
            identify which facilities can actually serve them. Our care assessment
            guides you through the key clinical and functional factors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/care-assessment"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Take the Care Assessment →
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Compare Care Costs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
