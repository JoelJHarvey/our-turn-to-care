import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "Nursing Homes: The Complete Guide for Families (2026) | OurTurnToCare",
  description:
    "Everything you need to know about nursing home care — what it costs, how to evaluate quality, how to pay, and how to choose the right facility for your loved one.",
  openGraph: {
    title: "Nursing Homes: The Complete Guide for Families (2026)",
    description:
      "Everything you need to know about nursing home care — what it costs, how to evaluate quality, how to pay, and how to choose the right facility.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/",
  },
};

// ── FAQ data ───────────────────────────────────────────────────────────────

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Understanding Nursing Homes",
    items: [
      {
        q: "What is the difference between 'skilled nursing' and 'custodial care'?",
        a: "Skilled nursing care involves services that require the expertise of licensed medical professionals — RNs, LPNs, therapists. This includes wound care, IV therapy, injections, rehabilitation, and medical monitoring. Custodial care is assistance with daily activities like bathing, dressing, eating, and mobility — tasks that don't require medical training. This distinction matters primarily for insurance purposes: Medicare covers skilled nursing care (short-term) but not custodial care. Medicaid covers both. Most nursing home residents receive a combination of both types of care.",
      },
      {
        q: "How long does the average nursing home stay last?",
        a: "The average length of stay is approximately 835 days (about 2.3 years), but this varies enormously. Short-stay rehabilitation patients may stay for 20–30 days. Long-stay residents may live in a nursing home for years or even decades. About 20% of admissions result in stays of less than 30 days (mostly rehabilitation), while roughly 14% of residents stay five years or longer.",
      },
      {
        q: "What is 'observation status' and why does it matter?",
        a: "When your parent is in the hospital, they may be classified as either 'admitted' (inpatient) or under 'observation' (outpatient). This classification matters enormously because Medicare only covers skilled nursing facility care if the hospital stay was an inpatient admission of at least three consecutive days. If your parent was under observation for three days, that does not count. Always ask the hospital: 'Is my parent admitted as an inpatient or under observation?' and if they're under observation, ask the doctor to change the status to inpatient if medically appropriate.",
      },
      {
        q: "How do I compare nursing homes in my area?",
        a: "Start with Medicare Care Compare (medicare.gov/care-compare), where you can search by zip code and compare facilities side by side on star ratings, inspection results, staffing data, and quality measures. Then visit your top choices in person, talk to families of current residents, and use the 40 questions checklist at /nursing-homes/questions-to-ask/.",
      },
    ],
  },
  {
    category: "Costs and Payment",
    items: [
      {
        q: "What happens when my parent runs out of money?",
        a: "This is the most common financial fear families have, and the answer is that Medicaid is designed for exactly this situation. When a private-pay resident's assets are depleted to Medicaid-qualifying levels, they apply for Medicaid, and if approved, Medicaid takes over payment. A nursing home cannot discharge a resident solely because they've transitioned from private pay to Medicaid — this is explicitly prohibited by federal law.",
      },
      {
        q: "Can a nursing home require a deposit?",
        a: "This depends on the payment source. For Medicaid-eligible residents, nursing homes cannot require a deposit. For private-pay residents, some facilities do require a deposit or advance payment. The amount varies. Read the admission agreement carefully, and never sign as a personal financial guarantor.",
      },
    ],
  },
  {
    category: "Visiting and Daily Life",
    items: [
      {
        q: "Can I visit my parent at any time?",
        a: "Nursing homes must allow visits at any reasonable time for family members and other visitors. While facilities may have preferred visiting hours, they cannot prohibit visits during other times except in specific circumstances (such as a facility-wide infection lockdown). Immediate family and the resident's physician must be granted access at any time.",
      },
      {
        q: "Do nursing homes allow pets?",
        a: "Policies vary by facility. Many nursing homes allow pet visits and have pet therapy programs. Some have resident animals (cats, birds, fish). Very few allow residents to keep personal pets due to safety and hygiene concerns, but it's worth asking if this is important to your parent.",
      },
      {
        q: "Can my parent leave the nursing home for visits or outings?",
        a: "Yes. Residents have the right to leave the facility, and many nursing homes actively encourage outings with family for holidays, family events, or simple trips out. The process typically involves notifying the nursing staff, signing out, ensuring medications are managed during the absence, and signing back in upon return. Extended absences (called 'therapeutic leave' or 'bed hold') have specific rules about whether the facility holds the resident's bed, and who pays for it during the absence.",
      },
    ],
  },
  {
    category: "Legal Rights and Protections",
    items: [
      {
        q: "Can my parent be forced out of a nursing home?",
        a: "Federal law strictly limits when a nursing home can discharge or transfer a resident against their will. Valid reasons include: the facility can't meet their needs, their health has improved enough that they no longer need nursing home care, the safety of others is at risk, they've failed to pay after proper notice, or the facility is closing. The facility must provide 30 days written notice and inform the resident of their right to appeal. If you believe a discharge is improper, contact your state's Long-Term Care Ombudsman immediately.",
      },
      {
        q: "What happens if my parent has dementia and can't make decisions?",
        a: "If your parent has been diagnosed with dementia or another condition that impairs their decision-making ability, a court-appointed guardian or a person named in their healthcare power of attorney (or healthcare proxy) makes healthcare decisions on their behalf. If no legal representative has been designated and your parent lacks decision-making capacity, you may need to pursue legal guardianship through the courts — which is time-consuming and costly. This is why establishing a healthcare power of attorney while your parent still has capacity is so important.",
      },
    ],
  },
  {
    category: "Special Situations",
    items: [
      {
        q: "Are there nursing homes specifically for veterans?",
        a: "Yes. The VA operates State Veterans Homes in every state — nursing homes specifically for eligible veterans that are partially funded by the VA and operated by the state. These facilities often cost less than private nursing homes, and VA benefits can cover most or all of the expense. Ask your local VA medical center about State Veterans Homes in your area.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

// ── Table of Contents ──────────────────────────────────────────────────────

const TOC = [
  { label: "What Is a Nursing Home?", id: "what-is" },
  { label: "Nursing Home vs. Other Care Options", id: "vs-other-care" },
  { label: "When Is a Nursing Home the Right Choice?", id: "when-right" },
  { label: "How Much Do Nursing Homes Cost?", id: "costs" },
  { label: "How to Pay for Nursing Home Care", id: "paying-for" },
  { label: "The Five-Star Rating System", id: "five-star" },
  { label: "How to Evaluate Nursing Home Quality", id: "how-to-evaluate" },
  { label: "40 Questions to Ask When Touring", id: "questions-to-ask" },
  { label: "The Admission Process", id: "admission-process" },
  { label: "What to Expect: Daily Life", id: "daily-life" },
  { label: "Specialized Care", id: "specialized-care" },
  { label: "Understanding Staffing", id: "staffing" },
  { label: "Helping Your Parent Adjust", id: "transition-guide" },
  { label: "Resident Rights", id: "resident-rights" },
  { label: "Red Flags and Warning Signs", id: "red-flags" },
  { label: "Abuse and Neglect", id: "abuse-and-neglect" },
  { label: "How Nursing Homes Are Regulated", id: "regulation" },
  { label: "End-of-Life Care and Advance Planning", id: "end-of-life" },
  { label: "Nursing Home Statistics and Data", id: "statistics" },
  { label: "State-by-State Medicaid Rules", id: "medicaid-by-state" },
  { label: "Frequently Asked Questions", id: "faq" },
];

// ── Reusable sub-components ────────────────────────────────────────────────

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
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

function SectionDivider() {
  return <hr className="my-12 border-slate-100" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function SubPageLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors"
    >
      {children} →
    </Link>
  );
}

function CTACard({
  title,
  description,
  buttonText,
  href,
  secondary,
}: {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  secondary?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl p-5 my-8",
        secondary
          ? "bg-slate-50 border border-slate-200"
          : "bg-teal-600 text-white",
      ].join(" ")}
    >
      <p
        className={[
          "text-sm font-bold mb-1",
          secondary ? "text-slate-700" : "text-white",
        ].join(" ")}
      >
        {title}
      </p>
      <p
        className={[
          "text-sm leading-relaxed mb-4",
          secondary ? "text-slate-500" : "text-teal-100",
        ].join(" ")}
      >
        {description}
      </p>
      <Link
        href={href}
        className={[
          "inline-block text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors",
          secondary
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : "bg-white text-teal-700 hover:bg-teal-50",
        ].join(" ")}
      >
        {buttonText} →
      </Link>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure which care is right?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Answer a few questions and get a personalized recommendation in about
          4 minutes.
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
          In this guide
        </p>
        <ol className="space-y-1.5">
          {TOC.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors leading-snug flex items-start gap-1.5"
              >
                <span className="font-semibold text-teal-400 flex-shrink-0 w-4 text-right text-xs mt-0.5">
                  {i + 1}.
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          In-depth guides
        </p>
        <ul className="space-y-2">
          {[
            { label: "Nursing Home Costs", href: "/nursing-homes/costs/" },
            { label: "How to Pay", href: "/nursing-homes/paying-for/" },
            { label: "Five-Star Ratings", href: "/nursing-homes/five-star-ratings/" },
            { label: "How to Evaluate", href: "/nursing-homes/how-to-evaluate/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
            { label: "The Admission Process", href: "/nursing-homes/admission-process/" },
            { label: "Daily Life", href: "/nursing-homes/daily-life/" },
            { label: "Specialized Care", href: "/nursing-homes/specialized-care/" },
            { label: "Staffing", href: "/nursing-homes/staffing/" },
            { label: "Transition Guide", href: "/nursing-homes/transition-guide/" },
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "Red Flags", href: "/nursing-homes/red-flags/" },
            { label: "Abuse & Neglect", href: "/nursing-homes/abuse-and-neglect/" },
            { label: "Regulation", href: "/nursing-homes/regulation/" },
            { label: "End-of-Life Care", href: "/nursing-homes/end-of-life/" },
            { label: "Statistics & Data", href: "/nursing-homes/statistics/" },
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
    </div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────

export default function NursingHomesPage() {
  return (
    <>
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 py-14 sm:py-20"
        style={{ background: "linear-gradient(to bottom, #f0fdfa, #ffffff)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">Nursing Homes</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Homes and Skilled Nursing Facilities: The Complete Guide for Families
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Everything you need to know about nursing home care — what it is, what it
            costs, how to evaluate quality, and how to choose the right facility for your
            loved one.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-teal-700 py-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "1.24 million", label: "Americans living in nursing homes" },
              { stat: "$7,908/mo", label: "Average cost, semi-private room (2025)" },
              { stat: "14,742", label: "Certified nursing facilities in the U.S." },
              { stat: "66%", label: "Of residents covered by Medicaid" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {stat}
                </span>
                <span className="text-sm text-teal-100 leading-snug max-w-[140px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-teal-300 mt-6">
            Source: CMS, Genworth Cost of Care Survey
          </p>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            {/* ── Main article ──────────────────────────────────────────── */}
            <article className="lg:flex-1 min-w-0">

              {/* Mobile sidebar */}
              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              {/* ── Intro ─────────────────────────────────────────────── */}
              <P>
                Choosing a nursing home for a parent or aging loved one is one of the
                most difficult decisions an adult child will ever face.                   You&rsquo;re likely
                feeling a mix of things: concern about their health, guilt about not
                being able to provide care yourself, uncertainty about what a nursing home
                actually offers, and worry about whether you&rsquo;re making the right choice.
                This guide exists to help you work through that decision with clarity, real
                data, and compassion.
              </P>
              <P>
                Use the table of contents below to jump to what matters most to you right
                now, and come back for the rest when you&rsquo;re ready.
              </P>

              {/* ── Table of Contents ─────────────────────────────────── */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-6 mb-12">
                <h2 className="text-base font-bold text-teal-800 mb-4 uppercase tracking-wide">
                  In this guide
                </h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {TOC.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors leading-snug flex items-start gap-2"
                      >
                        <span className="text-teal-400 font-semibold flex-shrink-0 w-5 text-right text-xs mt-0.5">
                          {i + 1}.
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── Section 1: What Is a Nursing Home ─────────────────── */}
              <section aria-labelledby="what-is">
                <SectionHeading id="what-is">
                  What Is a Nursing Home? Understanding Skilled Nursing Facilities
                </SectionHeading>
                <P>
                  A nursing home, formally called a skilled nursing facility (SNF), is a
                  residential medical care facility that provides 24-hour nursing care,
                  rehabilitation services, and personal assistance for people who can no
                  longer safely live at home or in a less intensive care setting. Unlike
                  other senior living options, nursing homes employ registered nurses (RNs)
                  and licensed practical nurses (LPNs) on-site around the clock, making
                  them the highest level of ongoing care available outside a hospital.
                </P>
                <P>
                  The term &ldquo;skilled nursing facility&rdquo; specifically refers to the medical
                  expertise available on-site. The &ldquo;skilled&rdquo; part means that trained medical
                  professionals (not just personal care aides) are present and available
                  at all hours. This is a fundamental difference from other senior living
                  settings, where medical staff may visit periodically but aren&rsquo;t there when
                  something goes wrong at 2 a.m.
                </P>
                <P>
                  Nursing homes serve two distinct populations, and understanding this
                  distinction matters for your planning:
                </P>
                <H3>Short-Stay Residents</H3>
                <P>
                  Short-stay residents are people recovering from a surgery, hospitalization,
                  or acute medical event. They come to the nursing home for rehabilitation —
                  physical therapy, occupational therapy, speech therapy — with the goal of
                  recovering enough to return home or move to a less intensive care setting.
                  The average short stay lasts about 26 days.
                </P>
                <H3>Long-Stay Residents</H3>
                <P>
                  Long-stay residents are people whose medical and personal care needs are
                  too complex to be met in any other setting on an ongoing basis. They may
                  be managing advanced dementia with medical complications, progressive
                  neurological conditions like ALS or advanced Parkinson&rsquo;s, multiple
                  chronic conditions requiring constant monitoring, or recovery from a
                  stroke that left them needing 24-hour assistance. For long-stay residents,
                  the nursing home becomes their home, and quality of daily life matters as
                  much as quality of medical care.
                </P>
                <P>
                  About 1.24 million Americans currently live in nursing homes, and roughly
                  66% of them rely on Medicaid to pay for their care. The average nursing
                  home resident is 79 years old, and approximately 70% are women —
                  reflecting both longer female life expectancy and the fact that women are
                  more likely to outlive a caregiving spouse.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 2: Nursing Home vs. Other Care ────────────── */}
              <section aria-labelledby="vs-other-care">
                <SectionHeading id="vs-other-care">
                  Nursing Home vs. Assisted Living vs. Other Care Options
                </SectionHeading>
                <P>
                  One of the most common sources of confusion for families is understanding
                  the differences between the various types of senior care. Each serves a
                  different level of need, and choosing the wrong level — either too much or
                  too little — can be costly, disruptive, or even dangerous.
                </P>
                <H3>Nursing Home vs. Assisted Living</H3>
                <P>
                  The central difference comes down to medical complexity. Assisted living
                  facilities employ caregivers who help residents with activities of daily
                  living — bathing, dressing, eating, managing medications — and may have a
                  nurse available during business hours or on call. A nursing home has
                  registered nurses on the premises 24 hours a day, 7 days a week, plus
                  certified nursing assistants providing hands-on care around the clock.
                </P>
                <P>
                  This distinction matters most when your loved one needs IV medications
                  administered, wound care performed, catheter management, feeding tube care,
                  ventilator support, or immediate medical assessment when their condition
                  changes. Assisted living facilities are not staffed or equipped to provide
                  these services.
                </P>
                <P>
                  The cost difference is significant. Assisted living averages $4,500 to
                  $6,000 per month nationally, while nursing homes average $7,900 to $10,500
                  per month. For a deeper look at assisted living, see our{" "}
                  <ILink href="/assisted-living">complete guide to assisted living</ILink>.
                </P>
                <H3>Nursing Home vs. Home Care</H3>
                <P>
                  Home care brings caregivers into your parent&rsquo;s home to provide personal
                  assistance, companionship, and sometimes skilled nursing visits. It&rsquo;s
                  appropriate when someone needs help with daily activities but is medically
                  stable enough to live at home safely. Home care becomes insufficient when
                  your parent needs medical interventions around the clock, needs
                  rehabilitation equipment a home can&rsquo;t accommodate, or when total hours of
                  home care needed exceed 12–16 hours per day (at which point a nursing home
                  often costs less). Learn more in our{" "}
                  <ILink href="/home-care">home care guide</ILink>.
                </P>
                <H3>Nursing Home vs. Memory Care</H3>
                <P>
                  Memory care facilities are specialized assisted living communities
                  designed for people with Alzheimer&rsquo;s and other dementias. The distinction
                  becomes critical with advanced dementia accompanied by serious medical
                  complications — severe swallowing difficulties, feeding tubes, recurrent
                  infections, pressure wounds, or IV medications. About 15% of nursing homes
                  operate specialized dementia care units. For more, see our{" "}
                  <ILink href="/memory-care">memory care guide</ILink>.
                </P>
                <H3>Nursing Home vs. Hospice</H3>
                <P>
                  Hospice is a philosophy of care, not a place. It provides comfort-focused
                  care for people with a terminal illness and a life expectancy of six months
                  or less. Hospice can be provided in a nursing home, at home, in a hospital,
                  or in a dedicated hospice facility. Many nursing home residents receive
                  hospice services within the nursing home when curative treatment is no
                  longer the goal.
                </P>

                {/* Quick Comparison Table */}
                <H3>Quick Comparison Table</H3>
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="px-4 py-3 font-semibold">Feature</th>
                        <th className="px-4 py-3 font-semibold">Home Care</th>
                        <th className="px-4 py-3 font-semibold">Assisted Living</th>
                        <th className="px-4 py-3 font-semibold">Memory Care</th>
                        <th className="px-4 py-3 font-semibold">Nursing Home</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["24-hour nursing staff", "No", "No (on call)", "No (on call)", "Yes"],
                        ["Rehabilitation services", "Limited", "No", "No", "Yes (PT, OT, speech)"],
                        ["Complex medical care", "No", "No", "No", "Yes"],
                        ["Dementia-specific programming", "Sometimes", "Sometimes", "Yes", "Some facilities"],
                        ["Average monthly cost", "$4,000–$6,000+", "$4,500–$6,000", "$5,000–$8,000", "$7,900–$10,500"],
                        ["Medicare coverage", "Limited", "No", "No", "Yes (short-term rehab)"],
                        ["Medicaid coverage", "Varies by state", "Varies by state", "Varies by state", "Yes (if eligible)"],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={[
                                "px-4 py-3 text-slate-700 leading-snug",
                                j === 0 ? "font-semibold text-slate-800" : "",
                              ].join(" ")}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 3: When Is It Right ───────────────────────── */}
              <section aria-labelledby="when-right">
                <SectionHeading id="when-right">
                  When Is a Nursing Home the Right Choice?
                </SectionHeading>
                <P>
                  The question isn&rsquo;t whether nursing homes are good or bad — it&rsquo;s whether
                  one is right for your parent&rsquo;s specific situation right now.
                </P>
                <H3>Medical Indicators</H3>
                <P>
                  Your loved one likely needs a nursing home if they have complex medical
                  needs that require professional nursing oversight. Specific indicators
                  include: needing wound care, IV therapy, or catheter management on an
                  ongoing basis; requiring physical rehabilitation after a hospitalization,
                  surgery, or stroke; managing multiple chronic conditions that interact;
                  having a progressive neurological condition like ALS, advanced
                  Parkinson&rsquo;s, or advanced multiple sclerosis; needing a feeding tube or
                  ventilator support; or experiencing frequent infections or hospitalizations
                  that suggest their current care setting isn&rsquo;t adequate.
                </P>
                <H3>Functional Indicators</H3>
                <P>
                  If your parent needs substantial help with most activities of daily living —
                  bathing, dressing, eating, toileting, transferring, and walking — and those
                  needs are combined with medical complexity, a nursing home is often the
                  safest option. The key word is &ldquo;combined.&rdquo; Needing help with daily
                  activities alone might be managed through assisted living or home care.
                  It&rsquo;s when functional needs overlap with medical needs that nursing home
                  care becomes necessary.
                </P>
                <H3>Safety Indicators</H3>
                <P>
                  Sometimes the clearest sign is repeated safety incidents. If your parent
                  has fallen multiple times despite interventions, wandered away from their
                  current residence, experienced medication errors, been hospitalized
                  repeatedly for preventable complications, or had emergency situations where
                  there wasn&rsquo;t adequate help available — these patterns suggest their current
                  level of care isn&rsquo;t keeping them safe.
                </P>
                <H3>The &ldquo;Tipping Point&rdquo; Moments Families Describe</H3>
                <P>
                  Many adult children describe a specific moment when they realized a nursing
                  home was necessary: a second or third serious fall, a hospitalization that
                  revealed how much their parent&rsquo;s condition had declined, a caregiver who
                  could no longer manage safely, a dementia diagnosis that progressed to the
                  point of danger, or caregiver burnout, health problems, or a family crisis.
                  These aren&rsquo;t signs of failure. They&rsquo;re signs that care needs have evolved
                  beyond what a less intensive setting can safely provide.
                </P>
                <CTACard
                  title="Not sure which care is right?"
                  description="Our care assessment evaluates your loved one's medical conditions, daily care needs, cognitive status, and safety concerns to identify the most appropriate level of care. Takes about 5 minutes."
                  buttonText="Take the Care Assessment"
                  href="/tools/care-assessment"
                />
              </section>

              <SectionDivider />

              {/* ── Section 4: Costs ──────────────────────────────────── */}
              <section aria-labelledby="costs">
                <SectionHeading id="costs">
                  How Much Do Nursing Homes Cost?
                </SectionHeading>
                <P>
                  Cost is often the first concrete question after the emotional weight
                  settles. The answer varies dramatically by geography, but understanding
                  the numbers helps you plan.
                </P>
                <H3>National Averages</H3>
                <P>
                  A semi-private room averages approximately{" "}
                  <strong className="text-slate-800">$7,908 per month</strong> ($260/day)
                  across the United States. A private room averages approximately{" "}
                  <strong className="text-slate-800">$9,034 per month</strong> ($297/day).
                  These figures translate to annual costs of roughly $94,900 for a
                  semi-private room and $108,405 for a private room.
                </P>
                <H3>Cost by Region</H3>
                <P>
                  Nursing home costs can differ by 300% or more depending on where you live.
                  The highest-cost states include Alaska ($30,000+/mo), Connecticut
                  ($14,000–$16,000), New York ($13,000–$15,000), Massachusetts
                  ($13,000–$14,500), and New Jersey ($11,000–$13,000). The lowest-cost
                  states include Oklahoma, Louisiana, Texas, Missouri, and Mississippi
                  ($5,000–$7,000/mo for a private room).
                </P>
                <CTACard
                  title="See costs in your area"
                  description="Enter your zip code to see side-by-side costs for all care types — nursing home, assisted living, memory care, and home care — in your region."
                  buttonText="Open the Cost Calculator"
                  href="/tools/cost-calculator"
                  secondary
                />
                <H3>What&rsquo;s Included (and What Isn&rsquo;t)</H3>
                <P>
                  The base rate at most nursing homes covers room and board, 24-hour nursing
                  care and personal assistance, standard medications, routine medical
                  supplies, and activities programming. What may cost extra includes therapy
                  beyond insurance coverage, specialty medications, dental/vision/hearing
                  services, personal items like cable TV and haircuts, and specialized wound
                  care supplies.
                </P>
                <H3>The Total Cost of a Nursing Home Stay</H3>
                <P>
                  The average length of a nursing home stay is approximately 835 days (about
                  2.3 years). At an average semi-private room rate of $7,908 per month, a
                  2.3-year stay costs approximately $218,000. A five-year stay exceeds
                  $474,000. These numbers make clear why financial planning — ideally well
                  before nursing home care is needed — is so important.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/costs/">
                    Read the deep dive: Nursing Home Costs by State
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 5: Paying For ─────────────────────────────── */}
              <section aria-labelledby="paying-for">
                <SectionHeading id="paying-for">
                  How to Pay for Nursing Home Care
                </SectionHeading>
                <P>
                  Understanding payment options helps you avoid panic-driven decisions and
                  plan more strategically. Most families use a combination of payment
                  sources, often transitioning from one to another as savings are spent and
                  eligibility changes.
                </P>
                <H3>Medicare: Short-Term Coverage Only</H3>
                <P>
                  Medicare covers skilled nursing care for one specific purpose: recovery
                  following a qualifying hospitalization. To qualify, your parent must have
                  been admitted as an inpatient (not under &ldquo;observation status&rdquo;) for at least
                  three consecutive days. Days 1–20: Medicare pays 100%. Days 21–100: you
                  pay $204/day coinsurance (2024 rate). After day 100: Medicare coverage
                  stops completely. This is the cliff that catches many families by surprise.
                </P>
                <Callout>
                  Always ask the hospital: &ldquo;Is my parent admitted as an inpatient or under
                  observation?&rdquo; This single question can mean the difference between $0 and
                  $10,000+ per month in nursing home costs. Only inpatient admissions count
                  toward the 3-day requirement for Medicare SNF coverage.
                </Callout>
                <H3>Medicaid: The Primary Long-Term Payer</H3>
                <P>
                  Medicaid covers approximately two-thirds of all nursing home residents and
                  will pay for care indefinitely if your parent qualifies. The income limit
                  in most states is approximately $2,829/month; the asset limit is $2,000 in
                  countable assets. Most middle-class families don&rsquo;t initially qualify — they
                  enter paying privately and &ldquo;spend down&rdquo; to Medicaid over time. Medicaid
                  reviews all financial transactions from the five years before application
                  (the look-back period), so asset transfers need professional planning.
                </P>
                <CTACard
                  title="Check Medicaid eligibility"
                  description="Our Medicaid screener provides a quick preliminary assessment of whether your parent might qualify, and can connect you with an elder law attorney."
                  buttonText="Take the Medicaid Screener"
                  href="/tools/medicaid-screener"
                />
                <H3>VA Benefits: Aid &amp; Attendance</H3>
                <P>
                  If your parent served in the military during a wartime period, they may be
                  eligible for the VA&rsquo;s Aid &amp; Attendance benefit: up to $2,431/month for a
                  veteran, $2,884/month for a veteran with a dependent, or $1,318/month for
                  a surviving spouse. This won&rsquo;t cover the full cost of nursing home care,
                  but $1,300–$2,900/month can meaningfully extend how long savings last.
                </P>
                <CTACard
                  title="Check VA benefit eligibility"
                  description="Our VA Benefits Calculator checks eligibility and estimates potential monthly benefit amounts based on service history and care needs."
                  buttonText="Use the VA Benefits Calculator"
                  href="/tools/va-benefits"
                  secondary
                />
                <H3>Long-Term Care Insurance and Private Pay</H3>
                <P>
                  If your parent purchased a long-term care insurance policy, it may cover a
                  significant portion of costs. Check the daily benefit amount (many older
                  policies have limits of $100–$200/day, which won&rsquo;t fully cover today&rsquo;s
                  costs), the benefit period, the elimination period, and whether it includes
                  an inflation rider. For families paying privately, options include personal
                  savings, selling or renting the family home, life insurance conversions,
                  reverse mortgages, and family contributions.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/paying-for/">
                    Read the deep dive: How to Pay for Nursing Home Care
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 6: Five-Star Rating ───────────────────────── */}
              <section aria-labelledby="five-star">
                <SectionHeading id="five-star">
                  The Five-Star Rating System Explained
                </SectionHeading>
                <P>
                  CMS publishes a Five-Star Quality Rating System for every Medicare and
                  Medicaid-certified nursing home in the United States. Every facility
                  receives an overall rating of 1 to 5 stars, calculated from three
                  component ratings:
                </P>
                <ul className="list-none space-y-3 mb-5">
                  {[
                    ["Health Inspection Rating", "Based on the three most recent annual inspections. Hardest to game — it reflects what government inspectors actually observed."],
                    ["Staffing Rating", "Based on nursing staff hours per resident per day, adjusted for the medical complexity of the resident population."],
                    ["Quality Measures (QM) Rating", "Based on 15 clinical quality measures tracking outcomes like falls with injuries, pressure ulcers, and emergency department visits."],
                  ].map(([title, desc]) => (
                    <li key={title as string} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <span className="font-semibold text-slate-800">{title}</span>
                        <span className="text-slate-600"> — {desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Callout>
                  Look beyond the overall rating. A facility might have 4 stars overall but
                  only 2 stars on health inspections — meaning staffing and quality measures
                  pulled up the average. That gap is a warning sign. Search any facility at{" "}
                  <a
                    href="https://www.medicare.gov/care-compare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    Medicare Care Compare
                  </a>.
                </Callout>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/five-star-ratings/">
                    Read the deep dive: The Five-Star Rating System &amp; All 15 Quality Measures
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 7: How to Evaluate ────────────────────────── */}
              <section aria-labelledby="how-to-evaluate">
                <SectionHeading id="how-to-evaluate">
                  How to Evaluate Nursing Home Quality
                </SectionHeading>
                <P>
                  Star ratings give you a starting point. Here&rsquo;s how to go deeper and truly
                  assess whether a facility will provide good care for your parent.
                </P>
                <ul className="list-none space-y-3 mb-5">
                  {[
                    ["Step 1: Research Before You Visit", "Look up the facility on Medicare Care Compare and read the actual inspection reports — not just the star rating. Look for patterns: Are the same problems cited repeatedly?"],
                    ["Step 2: Visit — More Than Once, and Unannounced", "Your most informative visit will be unannounced. Stop by during a meal, in the evening, or on a weekend. Use all your senses."],
                    ["Step 3: Talk to People Already There", "Ask to speak with family members of current residents. Talk to residents themselves if possible."],
                    ["Step 4: Evaluate the Care Plan Process", "A good nursing home develops an individualized care plan for every resident within the first few weeks. Ask how often meetings are held and whether family can attend."],
                    ["Step 5: Assess Administration and Culture", "Quality is heavily influenced by leadership. Meet the administrator and director of nursing. Ask how long they&rsquo;ve been in their roles."],
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <div>
                        <span className="font-semibold text-slate-800">{title}</span>
                        <span className="text-slate-600"> — {desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/how-to-evaluate/">
                    Read the deep dive: How to Evaluate Nursing Home Quality
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 8: Questions to Ask ───────────────────────── */}
              <section aria-labelledby="questions-to-ask">
                <SectionHeading id="questions-to-ask">
                  40 Questions to Ask When Touring a Nursing Home
                </SectionHeading>
                <P>
                  Print this list and bring it with you. The full list covers six categories:
                </P>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {["Staffing", "Medical Care", "Daily Life & Activities", "Safety & Quality", "Family Involvement", "Financial"].map((cat) => (
                    <div key={cat} className="bg-teal-50 rounded-xl px-3 py-2 text-sm font-semibold text-teal-800 text-center border border-teal-100">
                      {cat}
                    </div>
                  ))}
                </div>
                <P>
                  Key questions include: How many RNs are on duty during each shift? What is
                  the nurse-to-resident ratio on the night shift? What was your most recent
                  state inspection rating and what deficiencies were cited? What is the daily
                  rate, and what&rsquo;s included vs. what costs extra? How does the facility handle
                  a transition from private pay to Medicaid?
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/questions-to-ask/">
                    Get the full 40-question touring checklist
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 9: Admission Process ──────────────────────── */}
              <section aria-labelledby="admission-process">
                <SectionHeading id="admission-process">
                  The Admission Process: Step by Step
                </SectionHeading>
                <P>
                  Nursing home admissions happen in two scenarios: after a hospitalization
                  (often with only 24–48 hours notice) or as a planned transition. Either
                  way, the process involves six key steps:
                </P>
                <ol className="list-none space-y-2 mb-5">
                  {[
                    "Determine the right timing and identify facilities",
                    "Complete the PASARR screening (required by federal law for Medicaid-certified facilities)",
                    "Gather your documents (medical, legal, financial/insurance, personal)",
                    "Read the admission agreement carefully — watch for arbitration clauses and responsible party language",
                    "Move-in day — bring familiar items and create an 'About Me' document for staff",
                    "Attend the first care plan meeting (within 14 days of admission)",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-[1.0625rem] leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 bg-slate-100 text-slate-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/admission-process/">
                    Read the deep dive: The Admission Process Step by Step
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 10: Daily Life ────────────────────────────── */}
              <section aria-labelledby="daily-life">
                <SectionHeading id="daily-life">
                  What to Expect: Daily Life in a Nursing Home
                </SectionHeading>
                <P>
                  A typical day in a nursing home follows a structured schedule: morning
                  care (6:30–9:00 AM), therapy sessions and activities (9:00–11:30 AM),
                  lunch (11:30 AM–1:00 PM), afternoon activities and therapy (1:00–4:30 PM),
                  dinner and evening (4:30–8:00 PM), and night care. Three meals per day
                  plus snacks are provided, overseen by a registered dietitian.
                </P>
                <P>
                  Federal regulations require an activities program. Good facilities offer
                  exercise, creative activities, social events, educational programs,
                  religious services, outings, and pet therapy. Research consistently shows
                  that residents with frequent family involvement receive better care and
                  have better health outcomes — your presence matters.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/daily-life/">
                    Read more: What to Expect — Daily Life in a Nursing Home
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 11: Specialized Care ──────────────────────── */}
              <section aria-labelledby="specialized-care">
                <SectionHeading id="specialized-care">
                  Specialized Care in Nursing Homes
                </SectionHeading>
                <P>
                  Beyond standard nursing care, many facilities offer specialized services
                  that serve specific populations:
                </P>
                <ul className="list-none space-y-2 mb-5">
                  {[
                    ["Short-Stay Rehabilitation", "Physical therapy, occupational therapy, and speech therapy — usually covered by Medicare (first 20–100 days after a qualifying hospital stay)."],
                    ["Dementia and Alzheimer's Care", "Only about 15% of nursing homes have dedicated dementia care units. Ask about staff training, behavioral management, and antipsychotic medication use rates."],
                    ["Wound Care", "Chronic and complex wounds require specialized nursing care. Ask about protocols and outcomes."],
                    ["Ventilator and Respiratory Care", "A smaller subset of nursing homes provides care for ventilator-dependent residents."],
                    ["Dialysis", "Some facilities provide on-site dialysis or coordinate transportation."],
                    ["IV Therapy", "One of the primary reasons someone needs nursing home care rather than assisted living or home care."],
                    ["Palliative Care", "Comfort-focused care alongside curative treatment. Ask whether the facility has a formal palliative care program."],
                  ].map(([title, desc]) => (
                    <li key={title as string} className="flex gap-3">
                      <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                      <div>
                        <span className="font-semibold text-slate-800">{title}</span>
                        <span className="text-slate-600"> — {desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <P>
                  If your parent has dementia and needs nursing home-level medical care, see
                  our <ILink href="/memory-care">memory care guide</ILink> for how these two
                  care types intersect.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/specialized-care/">
                    Read the deep dive: Specialized Care in Nursing Homes
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 12: Staffing ──────────────────────────────── */}
              <section aria-labelledby="staffing">
                <SectionHeading id="staffing">
                  Understanding Staffing and Why It Matters
                </SectionHeading>
                <P>
                  Staffing is the single most important predictor of nursing home quality.
                  Research consistently shows that facilities with more nurses and aides per
                  resident have lower rates of pressure ulcers, fewer infections, fewer
                  falls, fewer hospitalizations, and better overall outcomes.
                </P>
                <P>
                  Ask any facility for their nurse-to-resident ratios. If they hedge or
                  can&rsquo;t give you a number, that&rsquo;s your answer.
                </P>
                <P>
                  A nursing home staff includes Registered Nurses (RNs), Licensed Practical
                  Nurses (LPNs), Certified Nursing Assistants (CNAs), plus physicians/nurse
                  practitioners, therapists, social workers, dietitians, and activity
                  directors.
                </P>
                <Callout>
                  In 2024, CMS finalized new minimum staffing requirements: 24/7 RN
                  presence and at least 3.48 total nursing hours per resident per day. These
                  are minimums — the best facilities exceed them significantly. CMS now also
                  publishes staff turnover data on Medicare Care Compare. The national
                  average annual turnover for nursing staff is approximately 46%.
                </Callout>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/staffing/">
                    Read the deep dive: Nursing Home Staffing — Why It Matters &amp; What to Look For
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 13: Transition Guide ──────────────────────── */}
              <section aria-labelledby="transition-guide">
                <SectionHeading id="transition-guide">
                  Helping Your Parent Adjust: The Transition Guide
                </SectionHeading>
                <P>
                  The first two weeks after move-in are typically the hardest. An adjustment
                  reaction — sometimes called &ldquo;transfer trauma&rdquo; — is well-documented and
                  usually temporary. Your parent may be confused, upset, or withdrawn. This
                  is normal. Visit frequently, encourage participation in activities, and be
                  patient. It typically improves significantly after 4–6 weeks as new
                  routines become familiar.
                </P>
                <P>
                  Nearly every adult child who places a parent experiences guilt. It&rsquo;s
                  normal. It&rsquo;s not evidence you made the wrong decision. Ensuring your parent
                  receives skilled medical care they need — care you couldn&rsquo;t safely provide
                  at home — is an act of love, not abandonment.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/transition-guide/">
                    Read the full guide: Moving a Parent to a Nursing Home
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 14: Resident Rights ───────────────────────── */}
              <section aria-labelledby="resident-rights">
                <SectionHeading id="resident-rights">
                  Nursing Home Resident Rights
                </SectionHeading>
                <P>
                  Nursing home residents have extensive federally protected rights under the
                  Nursing Home Reform Act of 1987. Key rights include:
                </P>
                <ul className="list-none space-y-2 mb-5">
                  {[
                    "The right to dignity, respect, and self-determination — choose their own physician, participate in care planning, refuse treatment, manage finances",
                    "The right to be free from all forms of abuse, involuntary seclusion, physical restraints (unless medically necessary), and chemical restraints",
                    "The right to be fully informed about their health status and access medical records",
                    "The right to voice complaints without fear of retaliation",
                    "Transfer and discharge protections — limited circumstances, 30 days written notice, and appeal rights",
                  ].map((right, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span className="text-slate-600 leading-relaxed">{right}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/resident-rights/">
                    Read the full guide: Nursing Home Resident Rights
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 15: Red Flags ─────────────────────────────── */}
              <section aria-labelledby="red-flags">
                <SectionHeading id="red-flags">
                  Red Flags and Warning Signs of Poor Care
                </SectionHeading>
                <P>
                  Know what to watch for when visiting or after placement.
                </P>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {[
                    {
                      category: "Environmental",
                      signs: ["Persistent strong odors", "Dirty common areas", "Residents in soiled clothing", "Broken or missing equipment"],
                    },
                    {
                      category: "Staffing",
                      signs: ["Rushed or stressed staff", "Condescending tone toward residents", "High use of agency staff", "Evasiveness about ratios"],
                    },
                    {
                      category: "Care Quality",
                      signs: ["Unexplained weight loss", "New pressure ulcers", "Frequent falls or injuries", "Over-sedation"],
                    },
                    {
                      category: "From Your Parent",
                      signs: ["Fear of certain staff", "Reluctance to speak freely", "Sudden behavior changes", "Reports of rough treatment"],
                    },
                  ].map(({ category, signs }) => (
                    <div key={category} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <p className="text-sm font-bold text-slate-700 mb-2">{category} Red Flags</p>
                      <ul className="space-y-1">
                        {signs.map((s) => (
                          <li key={s} className="text-sm text-slate-600 flex gap-2">
                            <span className="text-red-400 flex-shrink-0">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <P>
                  If you see red flags, raise concerns with the nurse on duty, then the
                  director of nursing, then the administrator. If unresolved, contact your
                  state&rsquo;s Long-Term Care Ombudsman (1-800-677-1116). Document everything.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/red-flags/">
                    Read the deep dive: Red Flags and Warning Signs of Poor Care
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 16: Abuse and Neglect ─────────────────────── */}
              <section aria-labelledby="abuse-and-neglect">
                <SectionHeading id="abuse-and-neglect">
                  Abuse and Neglect: What Families Need to Know
                </SectionHeading>
                <P>
                  An estimated 1 in 10 nursing home residents experience some form of abuse
                  in a given year. Only about 1 in 24 cases are ever reported. Types of
                  abuse include physical, emotional/psychological, sexual, neglect (active or
                  passive), and financial exploitation.
                </P>
                <P>
                  Signs include unexplained bruises or injuries, sudden withdrawal or
                  fearfulness, agitation, weight loss, poor hygiene, and unsanitary
                  conditions. If you suspect abuse:
                </P>
                <ol className="list-none space-y-2 mb-5">
                  {[
                    "Call 911 if there is immediate danger",
                    "Report to facility administrator in writing",
                    "Contact the Long-Term Care Ombudsman (1-800-677-1116)",
                    "File a complaint with your state health department",
                    "Contact Adult Protective Services",
                    "Contact law enforcement for suspected criminal conduct",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <P>Document everything throughout the process.</P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/abuse-and-neglect/">
                    Read the deep dive: Nursing Home Abuse &amp; Neglect
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 17: Regulation ────────────────────────────── */}
              <section aria-labelledby="regulation">
                <SectionHeading id="regulation">
                  How Nursing Homes Are Regulated and Inspected
                </SectionHeading>
                <P>
                  CMS sets minimum federal standards; state agencies conduct unannounced
                  inspections every 12–15 months, typically lasting 3–5 days. Complaint
                  investigations can happen at any time. When violations are found, nursing
                  homes must submit plans of correction. More serious violations can result
                  in civil money penalties, denial of payment, temporary management, or
                  program termination.
                </P>
                <P>
                  Inspection results are public. You can access them on Medicare Care Compare,
                  your state health department&rsquo;s website, and they must be posted in the
                  facility itself. Every state also has a Long-Term Care Ombudsman program —
                  independent advocates who investigate complaints, mediate disputes, and
                  provide information about residents&rsquo; rights, free of charge.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/regulation/">
                    Read the deep dive: How Nursing Homes Are Regulated
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 18: End-of-Life ───────────────────────────── */}
              <section aria-labelledby="end-of-life">
                <SectionHeading id="end-of-life">
                  End-of-Life Care and Advance Planning
                </SectionHeading>
                <P>
                  Planning for end of life — while emotionally difficult — is one of the
                  most important things you can do for your parent and your family. Key
                  documents include a Living Will, Healthcare Power of Attorney, POLST/MOLST
                  Form, and a DNR Order if appropriate.
                </P>
                <P>
                  Hospice care can be provided within a nursing home when comfort-focused
                  end-of-life care becomes appropriate. It is covered by Medicare, Medicaid,
                  and most insurance at no additional cost to the resident. Research shows
                  hospice improves quality of life and, in some cases, extends life.
                  Establishing these documents while your parent still has capacity is
                  critically important — waiting until a crisis makes it much harder.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/end-of-life/">
                    Read the full guide: End-of-Life Care and Advance Planning
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 19: Statistics ────────────────────────────── */}
              <section aria-labelledby="statistics">
                <SectionHeading id="statistics">
                  Nursing Home Statistics and Data
                </SectionHeading>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {[
                    { label: "Certified nursing facilities", value: "~14,742" },
                    { label: "Total residents", value: "~1.24 million" },
                    { label: "Average occupancy rate", value: "~77%" },
                    { label: "Average resident age", value: "79 years" },
                    { label: "Female residents", value: "~70%" },
                    { label: "Medicaid-funded residents", value: "~66%" },
                    { label: "Residents with dementia", value: "~47%" },
                    { label: "Annual staff turnover", value: "~46%" },
                    { label: "Semi-private room cost", value: "~$7,908/mo" },
                    { label: "Private room cost", value: "~$9,034/mo" },
                    { label: "Health citations issued (2023)", value: "94,499" },
                    { label: "COVID-19 resident deaths", value: "~172,000" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline gap-2 py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">{label}</span>
                      <span className="text-sm font-bold text-slate-800 flex-shrink-0">{value}</span>
                    </div>
                  ))}
                </div>
                <P>
                  The 85+ population is projected to double by 2060, and nursing home
                  demand is expected to increase approximately 75% by 2030.
                </P>
                <div className="mt-2">
                  <SubPageLink href="/nursing-homes/statistics/">
                    Read the full statistics page
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section 20: Medicaid by State ─────────────────────── */}
              <section aria-labelledby="medicaid-by-state">
                <SectionHeading id="medicaid-by-state">
                  State-by-State Medicaid Rules for Nursing Homes
                </SectionHeading>
                <P>
                  Because Medicaid is a joint federal-state program, eligibility rules vary
                  significantly by state. Key variations include income limits, asset limits,
                  home equity limits, the look-back period (60 months in most states, 30
                  months in California), estate recovery aggressiveness, Community Spouse
                  Resource Allowance ($30,828 to $154,140), and waiver programs that may
                  cover home and community-based services.
                </P>
                <P>
                  To find your state&rsquo;s rules: search &ldquo;[your state] Medicaid nursing home
                  eligibility,&rdquo; consult an elder law attorney (naela.org), or contact your
                  local Area Agency on Aging (eldercare.acl.gov or 1-800-677-1116). Our{" "}
                  <ILink href="/tools/medicaid-screener">Medicaid Eligibility Screener</ILink>{" "}
                  provides a quick preliminary assessment and can connect you with an elder
                  law attorney in your area.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 21: FAQ ───────────────────────────────────── */}
              <section aria-labelledby="faq">
                <SectionHeading id="faq">
                  Frequently Asked Questions
                </SectionHeading>
                <FAQAccordion groups={FAQ_GROUPS} />
              </section>

            </article>

            {/* ── Desktop sticky sidebar ─────────────────────────────── */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SidebarCTA />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Next Step
          </h2>
          <p className="text-teal-100 leading-relaxed mb-10 max-w-[640px] mx-auto">
            Choosing a nursing home for a loved one is an act of responsibility and,
            ultimately, an act of love. You don&rsquo;t have to make this decision alone.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Care Assessment",
                description: "Get a personalized care recommendation in 5 minutes",
                href: "/tools/care-assessment",
                cta: "Start Assessment",
              },
              {
                title: "Cost Calculator",
                description: "See real costs for all care types in your zip code",
                href: "/tools/cost-calculator",
                cta: "See Costs",
              },
              {
                title: "Medicaid Screener",
                description: "Find out if your parent may qualify for Medicaid",
                href: "/tools/medicaid-screener",
                cta: "Check Eligibility",
              },
              {
                title: "VA Benefits",
                description: "Estimate potential VA benefit amounts for veterans",
                href: "/tools/va-benefits",
                cta: "Calculate Benefits",
              },
            ].map(({ title, description, href, cta }) => (
              <div
                key={href}
                className="bg-white/10 rounded-2xl p-5 text-left border border-white/20"
              >
                <p className="text-sm font-bold text-white mb-1">{title}</p>
                <p className="text-sm text-teal-100 leading-snug mb-4">{description}</p>
                <Link
                  href={href}
                  className="inline-block text-sm font-semibold px-4 py-2.5 rounded-xl bg-white text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
