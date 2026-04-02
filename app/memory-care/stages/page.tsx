import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 7 Stages of Dementia: When Memory Care Is Needed | OurTurnToCare",
  description:
    "Understand all 7 stages of dementia (GDS scale), what care is needed at each stage, and when memory care becomes appropriate. Data-backed guide for families.",
  openGraph: {
    title: "The 7 Stages of Dementia: When Memory Care Is Needed",
    description:
      "Understand all 7 stages of dementia and when memory care becomes appropriate.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/stages/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/stages/",
  },
};

// ── Reusable sub-components ────────────────────────────────────────────────

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold text-slate-800 mb-5 leading-snug scroll-mt-24"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-slate-800 mt-7 mb-3 leading-snug">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1.0625rem] leading-[1.75] text-slate-600 mb-5">
      {children}
    </p>
  );
}

function ILink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors"
    >
      {children}
    </Link>
  );
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

// ── Stage Card ─────────────────────────────────────────────────────────────

interface StageData {
  stage: number;
  name: string;
  altName: string;
  duration: string;
  symptoms: string[];
  careNeeds: string[];
  memoryCareFit: string;
  highlight: boolean;
}

const STAGES: StageData[] = [
  {
    stage: 1,
    name: "No Cognitive Impairment",
    altName: "Normal",
    duration: "Variable",
    symptoms: [
      "No memory complaints",
      "Normal function in all areas",
      "No evidence of cognitive decline on clinical interview",
    ],
    careNeeds: ["No care needs related to cognition", "Preventive health maintenance"],
    memoryCareFit: "Not applicable",
    highlight: false,
  },
  {
    stage: 2,
    name: "Very Mild Cognitive Decline",
    altName: "Age-Associated Memory Impairment",
    duration: "Variable — may persist for years",
    symptoms: [
      "Forgetting names of familiar people or objects",
      "Misplacing items like keys or glasses",
      "Subjective memory complaints with no objective evidence on testing",
      "No interference with work or social activities",
    ],
    careNeeds: [
      "No formal care typically needed",
      "Establish healthcare proxy and power of attorney while capacity is clear",
      "May benefit from cognitive engagement activities",
    ],
    memoryCareFit: "No — this stage is consistent with normal aging",
    highlight: false,
  },
  {
    stage: 3,
    name: "Mild Cognitive Decline",
    altName: "Mild Cognitive Impairment (MCI)",
    duration: "2–7 years",
    symptoms: [
      "Difficulty with complex tasks at work or home",
      "Getting lost when traveling to new locations",
      "Word-finding difficulty noticeable to family",
      "Decreased ability to remember names of newly introduced people",
      "Losing or misplacing valuable objects",
      "Decreased performance on objective cognitive testing",
    ],
    careNeeds: [
      "Support with complex financial and logistical tasks",
      "Supervision while driving may be warranted",
      "Medication reminders may be needed",
      "Evaluation and monitoring by a physician",
    ],
    memoryCareFit: "Rarely — most people at Stage 3 are still in the community",
    highlight: false,
  },
  {
    stage: 4,
    name: "Moderate Cognitive Decline",
    altName: "Mild / Early Dementia",
    duration: "2–10 years",
    symptoms: [
      "Decreased knowledge of recent events",
      "Memory of personal history may be impaired",
      "Difficulty managing finances, complex decisions",
      "Cannot perform complex tasks like cooking elaborate meals",
      "May deny memory problems (anosognosia begins)",
      "Personality changes: withdrawal, flat affect",
    ],
    careNeeds: [
      "Daily assistance with complex tasks",
      "Driving cessation typically recommended",
      "Help managing medications and finances",
      "Home health aide or adult day program may be appropriate",
      "Family caregiver often takes over major decisions",
    ],
    memoryCareFit: "Sometimes — often manageable at home or in assisted living at this stage",
    highlight: false,
  },
  {
    stage: 5,
    name: "Moderately Severe Cognitive Decline",
    altName: "Mid-Stage / Moderate Dementia",
    duration: "1.5–4 years",
    symptoms: [
      "Cannot recall major aspects of current life (address, phone number)",
      "Cannot recall basic personal history (high school attended)",
      "Disoriented to time and place",
      "Gets lost in familiar locations",
      "Cannot manage daily activities without substantial assistance",
      "May not recognize major family members",
    ],
    careNeeds: [
      "Cannot be safely left alone",
      "Needs help with bathing, dressing, meals",
      "24-hour supervision required",
      "Structured daily routine essential",
      "Wandering prevention measures needed",
    ],
    memoryCareFit: "Often yes — this is the most common stage for memory care transition",
    highlight: true,
  },
  {
    stage: 6,
    name: "Severe Cognitive Decline",
    altName: "Mid-to-Late Stage Dementia",
    duration: "2–5 years",
    symptoms: [
      "May not recognize spouse or other close family members",
      "Largely unaware of recent experiences and surroundings",
      "Requires supervision and personal assistance for all activities",
      "Incontinence develops",
      "Significant personality and behavioral changes (wandering, suspiciousness, agitation)",
      "Sleep disturbances, sundowning common",
      "Compulsive behaviors may emerge",
    ],
    careNeeds: [
      "Full personal care assistance",
      "Secured environment to prevent wandering",
      "Behavioral management expertise",
      "Incontinence care",
      "24/7 supervision by trained staff",
    ],
    memoryCareFit: "Strongly recommended — home care at this stage typically costs 2-3x memory care",
    highlight: true,
  },
  {
    stage: 7,
    name: "Very Severe Cognitive Decline",
    altName: "Late Stage / Advanced Dementia",
    duration: "1.5–2.5 years (highly variable)",
    symptoms: [
      "Loss of verbal ability (may speak only a few words or phrases)",
      "Loss of ability to walk without assistance",
      "Loss of ability to sit up without support",
      "Loss of ability to smile",
      "Loss of ability to hold head up",
      "Swallowing difficulties",
      "Frequent infections, particularly pneumonia",
    ],
    careNeeds: [
      "Total care for all activities",
      "Specialized feeding assistance or feeding tube decisions",
      "Skin care to prevent pressure wounds",
      "Pain management and comfort care",
      "Hospice care typically appropriate",
    ],
    memoryCareFit: "Memory care or skilled nursing — hospice care is typically appropriate",
    highlight: true,
  },
];

function StageCard({ data }: { data: StageData }) {
  return (
    <div
      className={[
        "rounded-2xl border p-6 mb-8",
        data.highlight
          ? "border-teal-200 bg-teal-50"
          : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={[
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base font-bold",
            data.highlight
              ? "bg-teal-600 text-white"
              : "bg-slate-200 text-slate-600",
          ].join(" ")}
        >
          {data.stage}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 leading-snug">
            Stage {data.stage}: {data.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">{data.altName}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Symptoms
          </p>
          <ul className="space-y-1">
            {data.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-teal-400 mt-1 flex-shrink-0">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Care Needs
          </p>
          <ul className="space-y-1">
            {data.careNeeds.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-teal-400 mt-1 flex-shrink-0">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 flex items-start gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex-shrink-0 mt-0.5">
          Memory care fit:
        </span>
        <span
          className={[
            "text-sm font-medium",
            data.highlight ? "text-teal-700" : "text-slate-500",
          ].join(" ")}
        >
          {data.memoryCareFit}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Typical duration:
        </span>
        <span className="text-sm text-slate-500">{data.duration}</span>
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure which stage your loved one is in?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment evaluates their specific situation and recommends
          the right level of care.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "Types of dementia", href: "/memory-care/types-of-dementia/" },
            { label: "Memory care costs", href: "/memory-care/costs/" },
            { label: "How to pay", href: "/memory-care/paying-for/" },
            { label: "How to choose", href: "/memory-care/how-to-choose/" },
            { label: "56 questions to ask", href: "/memory-care/questions-to-ask/" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Cost calculator
        </p>
        <p className="text-sm text-slate-500 mb-3 leading-relaxed">
          See memory care pricing in your specific area.
        </p>
        <Link
          href="/tools/cost-calculator"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Open Calculator →
        </Link>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DementiaStagesPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 py-14 sm:py-20"
        style={{ background: "linear-gradient(to bottom, #f0fdfa, #ffffff)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/memory-care/" className="hover:text-teal-700 transition-colors">
              Memory Care
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">Stages of Dementia</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            The 7 Stages of Dementia: A Complete Guide for Families
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What to expect at each stage, what care is needed, and when memory
            care becomes the right choice.
          </p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            {/* ── Main article ─────────────────────────────────── */}
            <article className="lg:flex-1 min-w-0">

              {/* Mobile sidebar */}
              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              <H2 id="overview">Understanding the GDS Stages</H2>
              <P>
                The Global Deterioration Scale (GDS), developed by Dr. Barry
                Reisberg in 1982, is the most widely used framework for
                describing the progression of Alzheimer&rsquo;s disease and
                other dementias. It divides the journey from normal cognition to
                advanced dementia into 7 stages, each with distinct symptoms,
                care needs, and typical duration.
              </P>
              <P>
                Two important caveats. First, dementia doesn&rsquo;t progress
                on a fixed timeline &mdash; some people move through stages
                quickly, others plateau for years. The durations listed here are
                averages and ranges from clinical literature, not predictions.
                Second, staging is a framework for communication and planning,
                not a precise diagnosis. The same person might show signs of
                multiple stages simultaneously.
              </P>

              <Callout>
                Stages 5, 6, and 7 &mdash; highlighted in teal below &mdash;
                are the stages where memory care is most commonly appropriate
                and most strongly recommended. If your loved one is at Stage 4
                or transitioning to Stage 5, now is the time to begin exploring
                options.
              </Callout>

              {/* ── Quick Summary Table ───────────────────────── */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-10">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Stage</th>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Key Characteristics</th>
                      <th className="px-4 py-3 text-left font-semibold">Duration</th>
                      <th className="px-4 py-3 text-left font-semibold">Memory Care</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAGES.map((s) => (
                      <tr key={s.stage} className={s.highlight ? "bg-teal-50" : ""}>
                        <td className="px-4 py-3 border-t border-slate-100 font-semibold text-slate-700">
                          {s.stage}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">
                          {s.name}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">
                          {s.symptoms[0]}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-500">
                          {s.duration}
                        </td>
                        <td className={[
                          "px-4 py-3 border-t border-slate-100 font-medium",
                          s.highlight ? "text-teal-700" : "text-slate-400",
                        ].join(" ")}>
                          {s.highlight ? "Yes / recommended" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider />

              {/* ── Individual Stage Cards ────────────────────── */}
              <H2 id="stage-detail">Each Stage in Detail</H2>
              <P>
                Below you&rsquo;ll find a detailed breakdown of each stage,
                including specific symptoms, care needs, and guidance on whether
                memory care is appropriate.
              </P>

              {STAGES.map((stage) => (
                <StageCard key={stage.stage} data={stage} />
              ))}

              <Divider />

              {/* ── When to Make the Move ────────────────────── */}
              <H2 id="when-to-move">When to Transition to Memory Care</H2>
              <P>
                For most families, the transition to memory care happens during
                Stage 5. This is when the person can no longer be safely left
                alone, when 24-hour supervision becomes necessary, and when the
                care demands typically exceed what a family caregiver or standard
                assisted living can provide.
              </P>
              <P>
                Stage 6 brings wandering, incontinence, and significant
                behavioral changes &mdash; all of which memory care communities
                are specifically designed to manage. At this stage, home care
                becomes both extremely expensive (often $15,000&ndash;$20,000+
                per month for 24/7 coverage) and less safe than a specialized
                environment.
              </P>

              <H3>Planning Ahead from Stage 4</H3>
              <P>
                The families who have the best experience with memory care
                transitions are the ones who started researching and visiting
                communities during Stage 4 &mdash; before a crisis made the
                decision urgent. If your loved one is currently at Stage 4,
                consider this a planning window. Tour communities. Get on
                waitlists if needed. Talk to an elder law attorney about
                Medicaid planning. Have the hard conversations with your family
                now, when there&rsquo;s still time to be thoughtful.
              </P>

              <H3>The Overlap Problem</H3>
              <P>
                One challenge families face is that staging isn&rsquo;t always
                clean. A person might be Stage 4 on most dimensions but show
                Stage 6 wandering behavior. The behavioral presentation &mdash;
                especially safety-relevant behaviors &mdash; should drive the
                care decision more than a stage number. If someone is wandering
                and at risk of harm, that&rsquo;s a Stage 6 safety need even if
                other functions are at Stage 4.
              </P>

              <Divider />

              {/* ── Late Stage / Hospice ──────────────────────── */}
              <H2 id="late-stage">Late Stage Dementia and Hospice Care</H2>
              <P>
                Stage 7 dementia is a terminal condition. At this stage, comfort
                and dignity become the primary care goals. Hospice care &mdash;
                which focuses on pain management and quality of life rather than
                curative treatment &mdash; can be provided within a memory care
                community in most cases.
              </P>
              <P>
                Medicare covers hospice services (including nursing visits,
                medications for comfort, aide services, and spiritual support)
                at no additional cost to the family. To qualify, two physicians
                must certify that the person has a life expectancy of 6 months
                or less if the disease runs its normal course. Hospice can be
                extended if the person lives longer than expected.
              </P>
              <P>
                Early hospice referral &mdash; when the person still has some
                quality of life &mdash; consistently leads to better comfort and
                better family experience than waiting until the final days. Ask
                the memory care community and the person&rsquo;s physician
                about hospice eligibility when Stage 7 symptoms appear.
              </P>

              <Divider />

              {/* ── CTA ──────────────────────────────────────── */}
              <div className="bg-teal-600 rounded-2xl p-7 text-center">
                <h2 className="text-xl font-bold text-white mb-2">
                  Not sure which stage your loved one is in?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Our Care Assessment walks through your loved one&rsquo;s
                  specific symptoms and needs to help identify the right level
                  of care and check for financial assistance.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Take the Free Assessment →
                </Link>
              </div>

              {/* ── Sources ──────────────────────────────────── */}
              <p className="text-xs text-slate-400 leading-relaxed mt-10 border-t border-slate-100 pt-6">
                <em>
                  Sources: Reisberg B, Ferris SH, de Leon MJ, Crook T (1982).
                  &ldquo;The Global Deterioration Scale for assessment of primary
                  degenerative dementia.&rdquo; American Journal of Psychiatry.
                  Alzheimer&rsquo;s Association 2025 Facts &amp; Figures. National
                  Institute on Aging dementia staging resources. Duration estimates
                  are ranges from published clinical literature and vary
                  significantly by individual. This guide is for informational
                  purposes only and does not constitute medical advice.
                </em>
              </p>

            </article>

            {/* ── Desktop sidebar ───────────────────────────── */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SidebarCTA />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Free Care Assessment
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized care recommendation based on your loved one&rsquo;s
            specific situation. Takes about 4 minutes. No login required.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Start the Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
