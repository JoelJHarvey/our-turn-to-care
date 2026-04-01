import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "Memory Care: The Complete Guide for Families (2026) | OurTurnToCare",
  description:
    "The complete guide to memory care — what it is, what it costs, when it's time, and how to choose the right community. Free care assessment included.",
  openGraph: {
    title: "Memory Care: The Complete Guide for Families (2026)",
    description:
      "The complete guide to memory care — what it is, what it costs, when it's time, and how to choose the right community.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/",
  },
};

// ── FAQ data ───────────────────────────────────────────────────────────────

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Understanding Memory Care",
    items: [
      {
        q: "What is memory care?",
        a: "Memory care is a specialized form of long-term residential care designed for people with Alzheimer's disease, dementia, and other cognitive conditions. It provides 24-hour supervision in a secured environment with staff trained specifically in dementia care techniques, structured daily routines, and therapeutic activities tailored to residents' cognitive abilities.",
      },
      {
        q: "What is the difference between memory care and assisted living?",
        a: "Assisted living provides help with daily activities in a community setting where residents maintain significant independence. Memory care includes all of that plus a secured environment to prevent wandering, staff trained in dementia-specific care, higher caregiver-to-resident ratios (typically 1:5 or 1:6 vs. 1:8), and activities designed for cognitive engagement. Memory care typically costs 20–30% more than assisted living.",
      },
      {
        q: "What is the difference between memory care and a nursing home?",
        a: "Nursing homes provide medical care — wound care, IV therapy, rehabilitation — with licensed nurses on-site 24/7. Memory care focuses on cognitive and behavioral support in a more homelike environment. Nursing homes are more expensive and more medically intensive; memory care is more specialized for the specific needs of dementia.",
      },
      {
        q: "Is memory care the same as dementia care?",
        a: '"Dementia care" is a broad term that includes any type of care for someone with dementia. "Memory care" is a specific type of residential community designed exclusively for people with cognitive impairment. All memory care is dementia care, but not all dementia care is memory care.',
      },
      {
        q: "What types of dementia does memory care serve?",
        a: "Memory care communities serve people with Alzheimer's disease, vascular dementia, Lewy body dementia, frontotemporal dementia, mixed dementia, and other conditions that cause cognitive decline. The type of dementia matters when choosing a community — ask about the staff's experience with your loved one's specific diagnosis.",
      },
      {
        q: "Can someone with mild dementia go to memory care?",
        a: "Yes. Research suggests that transitioning earlier — while the person can still adjust to the new environment and participate in activities — leads to better outcomes than waiting until a crisis forces the move. That said, many families find in-home care or assisted living sufficient in the early stages.",
      },
      {
        q: "What does a memory care facility look like?",
        a: "Modern memory care communities are designed to feel homelike. They typically feature circular or loop floor plans, smaller dining rooms, secured outdoor spaces, color-coded hallways and personal memory boxes outside rooms to help residents find their way, and calm décor that reduces overstimulation.",
      },
      {
        q: "What do they do in memory care all day?",
        a: "A well-run program follows a structured daily schedule: personal care assistance, meals, cognitive stimulation activities, physical exercise, creative activities (art, music), outdoor time, and social interaction. Activities are adapted to different cognitive levels. Ask any community to show you their actual daily schedule.",
      },
    ],
  },
  {
    category: "Timing and Signs",
    items: [
      {
        q: "When is it time for memory care?",
        a: "The most common indicators include safety issues (wandering, leaving the stove on, getting lost), care needs that exceed what the current caregiver or setting can provide, behavioral symptoms (agitation, aggression, sundowning) overwhelming the household, and quality of life decline. If several of these are present, it's time to explore options.",
      },
      {
        q: "What stage of dementia requires memory care?",
        a: "Memory care becomes appropriate for most families around Stage 5 of the Global Deterioration Scale (moderate dementia), when the person needs daily assistance and can no longer be safely left alone. It becomes strongly recommended at Stage 6 when wandering, incontinence, and personality changes emerge.",
      },
      {
        q: "How do you know when a dementia patient needs 24-hour care?",
        a: "Key signs: wandering at night, inability to be safely left alone, falling due to disorientation, not recognizing the need for help in an emergency, incontinence, and requiring assistance with most daily activities. If a family caregiver is sleeping with 'one eye open,' 24-hour care is needed.",
      },
      {
        q: "When should someone move from assisted living to memory care?",
        a: "When the assisted living staff express safety concerns, when wandering or elopement attempts become an issue, when behavioral symptoms exceed what the environment can manage, or when the person is no longer participating in activities because the environment is too overstimulating.",
      },
      {
        q: "What if my parent refuses to go to memory care?",
        a: "This is extremely common. A person with dementia often lacks awareness of their own decline (a condition called anosognosia). Strategies include having their physician recommend the move, framing it as temporary, involving a geriatric care manager, and focusing on the positives. In some cases, the move needs to happen over the person's objection for their safety.",
      },
      {
        q: "Can a person with dementia refuse care?",
        a: "Legally, this depends on whether the person has been determined to lack capacity. If capacity has been lost and a health care power of attorney is in place, the designated agent makes decisions. This is one of the most important reasons to establish powers of attorney early.",
      },
    ],
  },
  {
    category: "Costs and Payment",
    items: [
      {
        q: "How much does memory care cost per month?",
        a: "The national median is approximately $7,908 per month (2025 data). Costs range from about $5,000/month in lower-cost markets to over $12,000/month in major metro areas. Most communities also charge level-of-care fees that increase as needs progress, adding $500–$2,000+ per month.",
      },
      {
        q: "How much does memory care cost per year?",
        a: "At the national median, approximately $94,896 per year. With level-of-care fees and extras, many families pay $100,000 to $120,000+ annually.",
      },
      {
        q: "Does Medicare pay for memory care?",
        a: "No. Medicare covers short-term skilled nursing (up to 100 days after a qualifying hospital stay), some home health services, and hospice care — but not ongoing residential memory care.",
      },
      {
        q: "Does Medicaid pay for memory care?",
        a: "In many states, yes — through optional waiver programs, not as a standard benefit. Coverage varies significantly by state. Eligibility typically requires limited income and assets. Many states have waitlists. An elder law attorney can help navigate your state's specifics.",
      },
      {
        q: "Does VA pay for memory care?",
        a: "The VA's Aid & Attendance pension benefit can provide up to $2,431/month for a veteran who needs help with daily activities and served during a qualifying wartime period. It's significantly underutilized — most families don't know it exists.",
      },
      {
        q: "Does long-term care insurance cover memory care?",
        a: "Most policies cover memory care, but amounts and terms vary. A typical policy provides $150–$300/day for 2–5 years, with a waiting period before benefits begin. Contact the carrier for specifics.",
      },
      {
        q: "How do people afford memory care?",
        a: "Most families use a combination: Medicaid, personal savings and retirement funds, long-term care insurance, VA benefits, sale of real estate, and sometimes reverse mortgages or life insurance conversions. An elder law attorney and financial advisor can help structure a plan.",
      },
      {
        q: "Why is memory care so expensive?",
        a: "Higher staffing ratios, specialized staff training, secured building design, structured therapeutic programming, and 24-hour supervision. The intensive, around-the-clock nature of dementia care drives the cost.",
      },
      {
        q: "Are memory care costs tax deductible?",
        a: "Potentially. Memory care costs that qualify as medical expenses may be deductible if they exceed 7.5% of adjusted gross income. Consult a tax professional.",
      },
    ],
  },
  {
    category: "Choosing and Evaluating",
    items: [
      {
        q: "How do I choose a memory care facility?",
        a: "Focus on staffing (ratios, training, turnover), the physical environment, activity programming, safety measures, cost transparency, and the overall feel when you visit. Visit in person — unannounced if possible.",
      },
      {
        q: "What questions should I ask when touring memory care?",
        a: "The most important questions cover staff-to-resident ratios, dementia-specific training hours, staff turnover rate, daily schedule, how exits are secured, how sundowning is managed, whether residents can age in place, what triggers cost increases, and the discharge policy. See our complete 56-question checklist at /memory-care/questions-to-ask/.",
      },
      {
        q: "What are the red flags in a memory care facility?",
        a: "A strong pervasive odor of urine, residents sitting idle, high staff turnover, reluctance to allow unannounced visits, vague answers about costs, no structured activity program, recent state citations, and inattentive staff.",
      },
      {
        q: "How do I check a memory care facility's ratings?",
        a: "For nursing homes, use CMS Care Compare at medicare.gov/care-compare. For standalone memory care, check your state's licensing agency database for inspection reports and deficiencies.",
      },
    ],
  },
  {
    category: "After Placement",
    items: [
      {
        q: "What is the adjustment period for memory care?",
        a: "Most new residents experience increased confusion, emotional distress, or behavioral changes for the first 2 to 6 weeks. This is normal. It typically improves significantly after 4 to 6 weeks as new routines become familiar.",
      },
      {
        q: "How often should I visit my parent in memory care?",
        a: "Consistency matters more than frequency. Regular visits at predictable times help your loved one feel secure. During adjustment, follow the community's guidance. Over time, find a rhythm that works for your family.",
      },
      {
        q: "What do I do if I think my parent is being neglected?",
        a: "Document your concerns, speak with the director of nursing, and request a care plan meeting. If unresolved, contact your state's long-term care ombudsman. In cases of suspected abuse, contact adult protective services.",
      },
      {
        q: "Can memory care facilities kick residents out?",
        a: "Yes. Most have discharge policies allowing them to ask a resident to leave if care needs exceed capacity, if the resident poses an unmanageable safety risk, or if payment is not maintained. Ask about discharge policies upfront and get them in writing.",
      },
      {
        q: "What happens when dementia gets worse in memory care?",
        a: "Good communities adjust their approach as the disease advances. Ask whether they can provide care through late-stage dementia or whether a transfer to skilled nursing would eventually be required.",
      },
      {
        q: "Does memory care include hospice?",
        a: "Memory care and hospice are complementary. When comfort-focused care becomes appropriate, a hospice team provides services within the memory care community. Medicare covers hospice at no additional cost in most cases.",
      },
    ],
  },
  {
    category: "Medical and Research",
    items: [
      {
        q: "Is there a cure for dementia?",
        a: "No. As of 2026, there is no cure. However, there are medications that manage symptoms and two newer medications (lecanemab/Leqembi and donanemab/Kisunla) that can slow early-stage Alzheimer's progression by approximately 27–29%. The clinical trial pipeline is larger than ever.",
      },
      {
        q: "What are the new Alzheimer's drugs?",
        a: "Lecanemab (Leqembi), approved 2023, and donanemab (Kisunla), approved 2024, are the first treatments targeting the underlying biology of Alzheimer's by clearing amyloid plaques. Both are only for early-stage Alzheimer's and cost approximately $26,500 per year.",
      },
      {
        q: "Do memory care facilities provide medical care?",
        a: "Memory care provides personal care and medication management, but they are not medical facilities. Most have nurses on-site during some hours and coordinate with residents' physicians. For emergencies, they call 911.",
      },
      {
        q: "Can dementia patients take the new Alzheimer's medications in memory care?",
        a: "The new disease-modifying treatments are only for early-stage Alzheimer's — most memory care residents are in moderate to severe stages. However, symptom-management medications (Aricept, Namenda) are commonly used in memory care.",
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
  { label: "What Is Memory Care?", id: "what-is-memory-care" },
  { label: "Types of Dementia", id: "types-of-dementia" },
  { label: "How Memory Care Communities Are Designed", id: "facility-design" },
  { label: "What a Typical Day Looks Like", id: "daily-life" },
  { label: "The 7 Stages of Dementia", id: "stages" },
  { label: "When Is It Time?", id: "when-is-it-time" },
  { label: "Statistics Every Family Should Know", id: "statistics" },
  { label: "What Does Memory Care Cost?", id: "costs" },
  { label: "How to Pay for Memory Care", id: "how-to-pay" },
  { label: "Memory Care vs. Assisted Living", id: "vs-assisted-living" },
  { label: "Memory Care vs. Nursing Home", id: "vs-nursing-home" },
  { label: "Memory Care vs. In-Home Care", id: "vs-home-care" },
  { label: "How to Choose a Community", id: "how-to-choose" },
  { label: "Questions to Ask When Touring", id: "questions-to-ask" },
  { label: "Red Flags and Warning Signs", id: "red-flags" },
  { label: "After Placement", id: "after-placement" },
  { label: "Treatments & Research", id: "treatments" },
  { label: "The Emotional Side", id: "emotional-side" },
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

function SubPageLink({ href, children }: { href: string; children: React.ReactNode }) {
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
            { label: "Types of Dementia", href: "/memory-care/types-of-dementia/" },
            { label: "The 7 Stages", href: "/memory-care/stages/" },
            { label: "Signs It's Time", href: "/memory-care/signs/" },
            { label: "Memory Care Costs", href: "/memory-care/costs/" },
            { label: "How to Pay", href: "/memory-care/paying-for/" },
            { label: "vs. Assisted Living", href: "/memory-care/vs-assisted-living/" },
            { label: "vs. Nursing Home", href: "/memory-care/vs-nursing-home/" },
            { label: "vs. In-Home Care", href: "/memory-care/vs-home-care/" },
            { label: "How to Choose", href: "/memory-care/how-to-choose/" },
            { label: "56 Questions to Ask", href: "/memory-care/questions-to-ask/" },
            { label: "Red Flags", href: "/memory-care/red-flags/" },
            { label: "Daily Life", href: "/memory-care/daily-life/" },
            { label: "Facility Design", href: "/memory-care/facility-design/" },
            { label: "After Placement", href: "/memory-care/after-placement/" },
            { label: "Treatments & Research", href: "/memory-care/treatments/" },
            { label: "Statistics & Data", href: "/memory-care/statistics/" },
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

export default function MemoryCarePage() {
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
            <span className="text-slate-700 font-medium">Memory Care</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care: The Complete Guide for Families (2026)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What it is, what it costs, when it&rsquo;s time, and how to choose the
            right community. Everything you need in one place.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-teal-700 py-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "7.2 million", label: "Americans living with Alzheimer's" },
              { stat: "$7,908/mo", label: "Median memory care cost (2025)" },
              { stat: "12 million", label: "Unpaid dementia caregivers in the U.S." },
              { stat: "1 in 9", label: "People over 65 affected by Alzheimer's" },
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
            Source: Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report; CareScout 2025 Cost of Care Survey
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

              {/* ── Section 1: What Is Memory Care ────────────────────── */}
              <section aria-labelledby="what-is-memory-care">
                <SectionHeading id="what-is-memory-care">
                  What Is Memory Care?
                </SectionHeading>
                <P>
                  Memory care is a specialized type of long-term residential care
                  designed for people living with Alzheimer&rsquo;s disease,
                  dementia, or other forms of cognitive decline. Unlike standard
                  assisted living, memory care communities are built from the ground
                  up around the unique needs of residents with memory loss.
                </P>
                <P>
                  That means secured environments so residents can&rsquo;t wander
                  into unsafe situations, staff trained specifically in dementia care
                  techniques, structured daily routines that reduce confusion and
                  anxiety, and therapeutic activities designed to engage cognitive
                  function rather than just pass time.
                </P>
                <P>
                  Most memory care communities are either standalone facilities or
                  dedicated wings within larger assisted living or nursing home
                  campuses. The distinction matters &mdash; a dedicated memory care
                  community typically offers more specialized programming and higher
                  staff-to-resident ratios than a memory care &ldquo;unit&rdquo;
                  attached to a general assisted living facility.
                </P>

                <H3>Memory Care vs. Assisted Living: What&rsquo;s the Difference?</H3>
                <P>
                  The most common question families ask is whether their loved one
                  needs memory care or whether assisted living is enough. The short
                  answer: if cognitive decline is the primary concern, memory care is
                  usually the better fit. If physical care needs are the main issue
                  and cognition is mostly intact, assisted living may be sufficient.
                </P>
                <P>
                  Assisted living helps with daily activities like bathing, dressing,
                  and medication management in a community setting. Residents
                  generally come and go freely, make their own choices about meals and
                  activities, and maintain a high degree of independence. Staff are
                  trained in personal care but not necessarily in dementia-specific
                  techniques.
                </P>
                <P>
                  Memory care provides all of that daily assistance plus a layer of
                  cognitive support and safety that assisted living doesn&rsquo;t
                  offer. The environment is designed to minimize confusion &mdash;
                  consistent layouts, visual cues, secured exits. Activities are
                  tailored to cognitive ability levels. Staff are trained to handle
                  sundowning, agitation, wandering, and the behavioral changes that
                  often accompany dementia. And the staff-to-resident ratio is
                  typically much higher (1:5 or 1:6 in memory care vs. 1:8 or more in
                  assisted living).
                </P>
                <P>
                  The practical question for most families comes down to safety and
                  quality of life. If your loved one is wandering, getting lost,
                  leaving the stove on, not recognizing family members, or showing
                  significant personality changes, those are signals that the
                  cognitive support structure of memory care will serve them better
                  than the more independent environment of assisted living.
                </P>

                <div className="flex flex-wrap gap-3 mt-2 mb-6">
                  <SubPageLink href="/memory-care/vs-assisted-living/">
                    Memory care vs. assisted living: full comparison
                  </SubPageLink>
                  <SubPageLink href="/memory-care/vs-nursing-home/">
                    Memory care vs. nursing homes
                  </SubPageLink>
                  <SubPageLink href="/memory-care/vs-home-care/">
                    Memory care vs. home care
                  </SubPageLink>
                </div>

                <CTACard
                  title="Not sure which level of care is right?"
                  description="Our Care Assessment evaluates your loved one's specific situation and gives you a personalized recommendation in about 4 minutes."
                  buttonText="Take the Free Assessment"
                  href="/tools/care-assessment"
                />
              </section>

              <SectionDivider />

              {/* ── Section 2: Types of Dementia ──────────────────────── */}
              <section aria-labelledby="types-of-dementia">
                <SectionHeading id="types-of-dementia">
                  Types of Dementia Memory Care Serves
                </SectionHeading>
                <P>
                  &ldquo;Dementia&rdquo; is an umbrella term, not a single disease.
                  Memory care communities serve people with several distinct
                  diagnoses, and the type of dementia matters when evaluating
                  communities &mdash; some staff have more experience with
                  Lewy body dementia or frontotemporal dementia than others.
                </P>
                <P>
                  <strong>Alzheimer&rsquo;s disease</strong> accounts for
                  60&ndash;80% of all dementia cases. It progresses in stages,
                  beginning with memory lapses and advancing to loss of language,
                  recognition, and eventually basic functions. Most memory care
                  communities are designed primarily around Alzheimer&rsquo;s
                  presentation.
                </P>
                <P>
                  <strong>Vascular dementia</strong>, the second most common form,
                  results from reduced blood flow to the brain, often following a
                  stroke. Symptoms can come on suddenly and may include step-wise
                  progression (getting worse in discrete episodes rather than
                  gradually).
                </P>
                <P>
                  <strong>Lewy body dementia</strong> is distinguished by visual
                  hallucinations, fluctuating alertness, and movement problems
                  similar to Parkinson&rsquo;s disease. Managing Lewy body requires
                  specific expertise &mdash; certain medications used in other forms
                  of dementia can be dangerous for LBD patients.
                </P>
                <P>
                  <strong>Frontotemporal dementia (FTD)</strong> typically strikes
                  earlier (40s&ndash;60s) and presents with personality changes,
                  disinhibited behavior, and language problems rather than memory
                  loss in its early stages. FTD patients often have very different
                  needs than Alzheimer&rsquo;s patients.
                </P>
                <P>
                  <strong>Mixed dementia</strong> is a combination of two or more
                  types &mdash; most commonly Alzheimer&rsquo;s plus vascular
                  dementia. It&rsquo;s more common than was previously recognized,
                  especially in people over 80.
                </P>

                <SubPageLink href="/memory-care/types-of-dementia/">
                  Read the complete guide to types of dementia
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: Facility Design ───────────────────────────── */}
              <section aria-labelledby="facility-design">
                <SectionHeading id="facility-design">
                  How Memory Care Communities Are Designed
                </SectionHeading>
                <P>
                  The physical environment of a memory care community is not incidental &mdash; it is part of the care. Good design reduces confusion, supports independence, prevents accidents, and calms behavioral symptoms. Poor design does the opposite.
                </P>
                <P>
                  Modern memory care communities are built around a few core principles: <strong>safety</strong> (secured exits, monitored outdoor spaces, no wandering hazards), <strong>wayfinding</strong> (circular floor plans, color-coded hallways, personal memory boxes outside rooms so residents can find their own spaces), and <strong>sensory calibration</strong> (natural light, calm color palettes, reduced ambient noise).
                </P>
                <P>
                  Small-scale neighborhoods within a community &mdash; groups of 10&ndash;15 residents sharing a common living and dining area &mdash; consistently outperform large institutional wings in resident outcomes. The smaller the unit, the more familiar the faces, the more manageable the environment for someone with dementia.
                </P>
                <P>
                  When you tour a community, look beyond the lobby. How does the resident wing feel? Is there natural light? Outdoor access? A calm common area? Or does it feel like a hospital corridor?
                </P>
                <SubPageLink href="/memory-care/facility-design/">
                  Read the detailed guide: how memory care communities are designed
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: Daily Life ────────────────────────────────── */}
              <section aria-labelledby="daily-life">
                <SectionHeading id="daily-life">
                  What a Typical Day Looks Like in Memory Care
                </SectionHeading>
                <P>
                  Routine is medicine for people with dementia. Predictable daily schedules reduce anxiety, minimize behavioral symptoms, and create a sense of security that supports quality of life. A well-run memory care community builds its entire day around this principle.
                </P>
                <P>
                  A typical day begins with assistance for morning hygiene and breakfast, followed by a structured activity period &mdash; cognitive stimulation exercises, music, reminiscence activities, or light physical movement. Lunch is a social event. Afternoons often include therapeutic programming, 1-on-1 time, family visits, and outdoor time when weather permits. Evenings wind down with dinner, relaxation activities, and preparation for sleep.
                </P>
                <P>
                  Importantly, good communities personalize this structure. Staff learn each resident&rsquo;s life history, preferences, and former routines. Incorporating familiar music, familiar foods, and activities connected to a person&rsquo;s past life &mdash; gardening, woodworking, cooking, prayer &mdash; sustains identity and dignity even as cognitive capacity declines.
                </P>
                <SubPageLink href="/memory-care/daily-life/">
                  Read the full day-in-the-life guide: daily life in memory care
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 3: When Is It Time ────────────────────────── */}
              <section aria-labelledby="when-is-it-time">
                <SectionHeading id="when-is-it-time">
                  When Is It Time for Memory Care?
                </SectionHeading>
                <P>
                  There&rsquo;s rarely a single moment when the answer becomes
                  obvious. For most families, it&rsquo;s a gradual accumulation of
                  incidents and concerns that eventually tips the balance. But there
                  are specific signs that experienced geriatric care professionals
                  look for.
                </P>

                <H3>Safety Indicators</H3>
                <P>
                  Safety concerns are often the tipping point. Wandering outside the
                  home &mdash; especially at night. Leaving the stove or oven on.
                  Falls that happen because of disorientation rather than physical
                  frailty. Getting lost while driving or walking in familiar
                  neighborhoods. These aren&rsquo;t just inconveniences &mdash;
                  they&rsquo;re situations where someone can get seriously hurt.
                </P>

                <H3>Care Needs Exceeding Current Capacity</H3>
                <P>
                  If a family caregiver is providing round-the-clock supervision, if
                  the person can no longer be safely left alone for any period of
                  time, or if the behavioral symptoms of dementia (agitation,
                  aggression, sundowning) are overwhelming the household &mdash;
                  those are signals that professional memory care staff and a
                  purpose-built environment may be necessary.
                </P>

                <H3>Quality of Life Decline</H3>
                <P>
                  Sometimes harder to measure but equally important. Social
                  withdrawal, loss of interest in activities they once enjoyed,
                  increasing anxiety or confusion in their current setting &mdash;
                  these can indicate that the person would actually thrive in a
                  structured memory care environment where activities, social
                  interaction, and daily routines are designed around their cognitive
                  level.
                </P>
                <P>
                  The hardest part for most families isn&rsquo;t recognizing these
                  signs. It&rsquo;s accepting what they mean. If you&rsquo;re
                  noticing several of these patterns, it&rsquo;s worth having a
                  conversation with your loved one&rsquo;s doctor and exploring
                  memory care options &mdash; even if you&rsquo;re not ready to make
                  a decision today.
                </P>

                <SubPageLink href="/memory-care/signs/">
                  Read: Early warning signs of dementia
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: Statistics ───────────────────────────────── */}
              <section aria-labelledby="statistics">
                <SectionHeading id="statistics">
                  Statistics Every Family Should Know
                </SectionHeading>
                <P>
                  The numbers help put the challenge in context &mdash; and reveal how many families are navigating the same decisions you are right now.
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li><strong>7.2 million</strong> Americans age 65 and older are living with Alzheimer&rsquo;s disease (2025).</li>
                  <li><strong>1 in 9</strong> people over 65 have Alzheimer&rsquo;s; 1 in 3 over 85.</li>
                  <li><strong>12 million</strong> unpaid caregivers provide an estimated 18.4 billion hours of care annually.</li>
                  <li>The number of Americans living with Alzheimer&rsquo;s is projected to nearly double to <strong>13 million</strong> by 2050.</li>
                  <li>Women are disproportionately affected &mdash; nearly <strong>two-thirds</strong> of Americans with Alzheimer&rsquo;s are women.</li>
                  <li>Early-onset Alzheimer&rsquo;s (under age 65) affects an estimated <strong>200,000</strong> Americans.</li>
                  <li>The lifetime cost of care for a person with dementia averages <strong>$350,000+</strong>, most of which is not covered by insurance.</li>
                </ul>
                <P>
                  These figures come from the Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report, the most comprehensive annual data source on dementia in the United States.
                </P>
                <SubPageLink href="/memory-care/statistics/">
                  Read the full statistics and data report
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 4: Stages ─────────────────────────────────── */}
              <section aria-labelledby="stages">
                <SectionHeading id="stages">
                  The 7 Stages of Dementia
                </SectionHeading>
                <P>
                  Understanding where your loved one falls on the dementia
                  progression helps predict care needs and plan ahead. The
                  Global Deterioration Scale (GDS) is the most widely used
                  framework, with 7 stages:
                </P>

                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="px-4 py-3 text-left font-semibold">Stage</th>
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Key Signs</th>
                        <th className="px-4 py-3 text-left font-semibold">Memory Care?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          stage: "1",
                          name: "No impairment",
                          signs: "Normal function, no memory problems",
                          mc: "No",
                          highlight: false,
                        },
                        {
                          stage: "2",
                          name: "Very mild decline",
                          signs: "Forgetting names, misplacing objects",
                          mc: "No",
                          highlight: false,
                        },
                        {
                          stage: "3",
                          name: "Mild decline (MCI)",
                          signs: "Difficulty with complex tasks, word-finding",
                          mc: "Rarely",
                          highlight: false,
                        },
                        {
                          stage: "4",
                          name: "Moderate decline",
                          signs: "Forgets recent events, needs help with finances",
                          mc: "Sometimes",
                          highlight: false,
                        },
                        {
                          stage: "5",
                          name: "Moderately severe",
                          signs: "Needs daily assistance, gets lost, forgets address",
                          mc: "Often yes",
                          highlight: true,
                        },
                        {
                          stage: "6",
                          name: "Severe decline",
                          signs: "Wandering, incontinence, personality changes",
                          mc: "Strongly recommended",
                          highlight: true,
                        },
                        {
                          stage: "7",
                          name: "Very severe",
                          signs: "Loss of speech, swallowing difficulty, bed-bound",
                          mc: "Memory care or skilled nursing",
                          highlight: true,
                        },
                      ].map((row) => (
                        <tr
                          key={row.stage}
                          className={
                            row.highlight
                              ? "bg-teal-50"
                              : "bg-white"
                          }
                        >
                          <td className="px-4 py-3 font-semibold text-slate-700 border-t border-slate-100">
                            {row.stage}
                          </td>
                          <td className="px-4 py-3 text-slate-700 border-t border-slate-100 font-medium">
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600 border-t border-slate-100">
                            {row.signs}
                          </td>
                          <td
                            className={[
                              "px-4 py-3 border-t border-slate-100 font-medium",
                              row.highlight ? "text-teal-700" : "text-slate-500",
                            ].join(" ")}
                          >
                            {row.mc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Shaded rows indicate stages where memory care is most commonly
                  appropriate. Duration varies widely by individual.
                </p>

                <SubPageLink href="/memory-care/stages/">
                  Read the complete guide to dementia stages
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 5: Costs ──────────────────────────────────── */}
              <section aria-labelledby="costs">
                <SectionHeading id="costs">
                  What Does Memory Care Cost?
                </SectionHeading>
                <P>
                  Memory care is one of the more expensive forms of long-term care,
                  primarily because of the specialized staffing and secured
                  environment it requires.
                </P>
                <P>
                  The <strong>national median cost for memory care is approximately
                  $7,908 per month</strong>, or about $264 per day. That translates
                  to roughly <strong>$94,896 per year</strong>. Actual costs range
                  from approximately $5,000 per month in the lowest-cost markets to
                  over $12,000 per month in the most expensive areas.
                </P>
                <P>
                  Memory care typically costs <strong>20 to 30 percent more</strong>{" "}
                  than standard assisted living in the same market.
                </P>

                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">
                          Care Type
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">
                          Monthly Cost
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">
                          Annual Cost
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          type: "Adult day care",
                          monthly: "$1,750–$2,000",
                          annual: "$21,000–$24,000",
                          notes: "Daytime only, no overnight care",
                          highlight: false,
                        },
                        {
                          type: "In-home aide (44 hrs/week)",
                          monthly: "$5,720",
                          annual: "$68,640",
                          notes: "Non-medical personal care",
                          highlight: false,
                        },
                        {
                          type: "Assisted living",
                          monthly: "$5,511–$6,200",
                          annual: "$66,000–$74,400",
                          notes: "Not dementia-specialized",
                          highlight: false,
                        },
                        {
                          type: "Memory care",
                          monthly: "$7,908",
                          annual: "$94,896",
                          notes: "Dementia-specialized, 24/7",
                          highlight: true,
                        },
                        {
                          type: "Nursing home (semi-private)",
                          monthly: "$9,197",
                          annual: "$110,364",
                          notes: "Skilled medical care",
                          highlight: false,
                        },
                        {
                          type: "Nursing home (private)",
                          monthly: "$10,326",
                          annual: "$123,912",
                          notes: "Skilled medical care",
                          highlight: false,
                        },
                        {
                          type: "In-home care (24/7)",
                          monthly: "$15,000–$20,000+",
                          annual: "$180,000–$240,000+",
                          notes: "Requires multiple caregivers in shifts",
                          highlight: false,
                        },
                      ].map((row) => (
                        <tr
                          key={row.type}
                          className={row.highlight ? "bg-teal-50 font-semibold" : ""}
                        >
                          <td
                            className={[
                              "px-4 py-3 border-t border-slate-100",
                              row.highlight ? "text-teal-800" : "text-slate-700",
                            ].join(" ")}
                          >
                            {row.type}
                          </td>
                          <td
                            className={[
                              "px-4 py-3 border-t border-slate-100",
                              row.highlight ? "text-teal-800" : "text-slate-600",
                            ].join(" ")}
                          >
                            {row.monthly}
                          </td>
                          <td
                            className={[
                              "px-4 py-3 border-t border-slate-100",
                              row.highlight ? "text-teal-800" : "text-slate-600",
                            ].join(" ")}
                          >
                            {row.annual}
                          </td>
                          <td
                            className={[
                              "px-4 py-3 border-t border-slate-100",
                              row.highlight ? "text-teal-700" : "text-slate-500",
                            ].join(" ")}
                          >
                            {row.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Source: CareScout/Genworth 2025 Cost of Care Survey
                </p>

                <Callout>
                  Round-the-clock in-home care for a dementia patient &mdash; which
                  is what Stages 5 and 6 typically require &mdash; costs two to three
                  times more than memory care, while providing a less specialized
                  environment. This is often the data point that changes the
                  conversation.
                </Callout>

                <P>
                  The sticker shock is real, but financial help may be available.
                  Many families don&rsquo;t realize that programs like Medicaid, VA
                  Aid &amp; Attendance benefits, and long-term care insurance can
                  cover a significant portion of memory care costs. Our{" "}
                  <ILink href="/tools/care-assessment">Care Assessment</ILink>{" "}
                  screens for potential financial assistance as part of the
                  evaluation.
                </P>

                <SubPageLink href="/memory-care/costs/">
                  Read the deep dive: Memory care costs by state and what&rsquo;s included
                </SubPageLink>

                <CTACard
                  title="See what care costs in your area"
                  description="Enter a zip code and get side-by-side cost comparisons for all types of senior care in your specific market."
                  buttonText="Use the Cost Calculator"
                  href="/tools/cost-calculator"
                  secondary
                />
              </section>

              <SectionDivider />

              {/* ── Section 6: How to Pay ──────────────────────────────── */}
              <section aria-labelledby="how-to-pay">
                <SectionHeading id="how-to-pay">
                  How to Pay for Memory Care
                </SectionHeading>
                <P>
                  Most families don&rsquo;t pay for memory care with a single
                  funding source. A typical plan combines two or three sources,
                  often shifting over time as one resource is depleted and
                  eligibility for others is established.
                </P>

                <H3>Medicaid</H3>
                <P>
                  Medicaid is the single largest payer of long-term care in the
                  United States. Eligibility varies by state, but generally requires
                  limited income and assets. Many states have Medicaid waiver programs
                  specifically for memory care. If your loved one isn&rsquo;t
                  currently eligible, they may qualify after a period of
                  &ldquo;spending down&rdquo; assets. This process needs careful
                  legal guidance &mdash; there&rsquo;s a 5-year look-back period that
                  can create complications if assets were transferred without proper
                  planning.
                </P>

                <H3>VA Aid &amp; Attendance</H3>
                <P>
                  The VA&rsquo;s Aid &amp; Attendance pension benefit can provide up
                  to <strong>$2,431 per month</strong> for wartime veterans who need
                  help with daily activities. Most families don&rsquo;t know this
                  benefit exists. Eligibility requires: wartime service period,
                  honorable or general discharge, and demonstrated need for help with
                  daily activities. The surviving spouse of a qualifying veteran may
                  also be eligible for up to $1,318 per month.
                </P>

                <H3>Long-Term Care Insurance</H3>
                <P>
                  Policies purchased before the onset of dementia often cover memory
                  care. A typical policy provides $150&ndash;$300 per day for 2&ndash;5
                  years, with an elimination period (like a deductible waiting period)
                  of 60&ndash;90 days. Contact the insurance carrier directly with
                  your claim &mdash; the process can take several weeks.
                </P>

                <H3>What Medicare Does and Doesn&rsquo;t Cover</H3>
                <P>
                  <strong>Medicare does not cover long-term memory care.</strong> This
                  is one of the most common and most expensive misconceptions. Medicare
                  will pay for up to 100 days of skilled nursing after a qualifying
                  hospital stay, and it covers some home health and hospice services.
                  But ongoing residential memory care &mdash; the monthly bill for a
                  memory care community &mdash; is not covered.
                </P>

                <div className="flex flex-wrap gap-3 mt-4 mb-6">
                  <SubPageLink href="/memory-care/paying-for/">
                    Complete guide to paying for memory care
                  </SubPageLink>
                  <SubPageLink href="/tools/medicaid-screener">
                    Check Medicaid eligibility
                  </SubPageLink>
                  <SubPageLink href="/tools/va-benefits">
                    Check VA Aid &amp; Attendance eligibility
                  </SubPageLink>
                </div>
              </section>

              <SectionDivider />

              {/* ── Section: vs. Assisted Living ─────────────────────── */}
              <section aria-labelledby="vs-assisted-living">
                <SectionHeading id="vs-assisted-living">
                  Memory Care vs. Assisted Living
                </SectionHeading>
                <P>
                  Assisted living is often the right choice in the early stages of cognitive decline, when the person still has significant independence and the main need is help with daily activities. Memory care becomes necessary when cognitive decline creates safety risks that an assisted living environment isn&rsquo;t designed to manage.
                </P>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Factor</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Assisted Living</th>
                        <th className="px-4 py-3 text-left font-semibold text-teal-700">Memory Care</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Monthly cost", "$5,511–$6,200", "$7,908 (median)"],
                        ["Staff dementia training", "General personal care", "Dementia-specific required"],
                        ["Secured environment", "No", "Yes — secured exits"],
                        ["Staff-to-resident ratio", "~1:8", "~1:5 or 1:6"],
                        ["Activities", "General programming", "Cognitive & therapeutic"],
                        ["Medication management", "Yes", "Yes + behavioral support"],
                      ].map(([factor, al, mc]) => (
                        <tr key={factor} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-medium text-slate-700">{factor}</td>
                          <td className="px-4 py-3 text-slate-600">{al}</td>
                          <td className="px-4 py-3 text-teal-700 font-medium">{mc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <SubPageLink href="/memory-care/vs-assisted-living/">
                  Read the full comparison: memory care vs. assisted living
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: vs. Nursing Home ─────────────────────────── */}
              <section aria-labelledby="vs-nursing-home">
                <SectionHeading id="vs-nursing-home">
                  Memory Care vs. Nursing Home
                </SectionHeading>
                <P>
                  Nursing homes (skilled nursing facilities) provide a higher level of medical care than memory care &mdash; 24/7 licensed nurses, wound care, IV therapy, physical therapy. They cost more and are more institutionally oriented. For someone with dementia whose primary needs are cognitive rather than medical, a memory care community is usually the better environment. Nursing home care becomes necessary when complex medical needs are added to dementia.
                </P>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Factor</th>
                        <th className="px-4 py-3 text-left font-semibold text-teal-700">Memory Care</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Nursing Home</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Primary focus", "Cognitive & behavioral", "Medical & skilled nursing"],
                        ["Monthly cost", "$7,908 (median)", "$9,197–$10,326"],
                        ["24/7 licensed nurses", "Varies (often no)", "Yes — required by law"],
                        ["Dementia specialization", "Core mission", "One unit among many"],
                        ["Environment", "Homelike, smaller-scale", "More clinical"],
                        ["Rehab services", "Rarely", "PT/OT/ST standard"],
                      ].map(([factor, mc, nh]) => (
                        <tr key={factor} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-medium text-slate-700">{factor}</td>
                          <td className="px-4 py-3 text-teal-700 font-medium">{mc}</td>
                          <td className="px-4 py-3 text-slate-600">{nh}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <SubPageLink href="/memory-care/vs-nursing-home/">
                  Read the full comparison: memory care vs. nursing homes
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: vs. Home Care ─────────────────────────────── */}
              <section aria-labelledby="vs-home-care">
                <SectionHeading id="vs-home-care">
                  Memory Care vs. In-Home Care
                </SectionHeading>
                <P>
                  In-home care keeps your loved one in a familiar environment and often feels less disruptive in the early stages of dementia. But as dementia progresses to Stage 5 or 6, providing safe care at home requires round-the-clock supervision &mdash; multiple caregivers in shifts, at a cost of $15,000 to $20,000+ per month. That&rsquo;s two to three times the cost of memory care, in a setting that isn&rsquo;t purpose-built for dementia.
                </P>
                <Callout>
                  The cost crossover point &mdash; where memory care becomes more affordable than 24/7 in-home care &mdash; typically arrives in Stage 5, when constant supervision is needed. Most families reach this point sooner than they expect.
                </Callout>
                <SubPageLink href="/memory-care/vs-home-care/">
                  Read the full comparison: memory care vs. in-home care
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 8: How to Choose ──────────────────────────── */}
              <section aria-labelledby="how-to-choose">
                <SectionHeading id="how-to-choose">
                  How to Choose a Memory Care Community
                </SectionHeading>
                <P>
                  Choosing a memory care community is one of the most consequential
                  decisions a family can make. The right community extends quality of
                  life, reduces behavioral symptoms, and gives family caregivers
                  peace of mind. The wrong one does the opposite.
                </P>

                <H3>What to Look for First</H3>
                <P>
                  <strong>Staffing</strong> is the single most important variable.
                  Ask specifically: What is the caregiver-to-resident ratio during
                  day shifts? Evening shifts? Overnight? How many hours of
                  dementia-specific training do caregivers receive? What is the staff
                  turnover rate? High turnover &mdash; which is common in this
                  industry &mdash; means residents are constantly adjusting to new
                  faces, which is particularly destabilizing for people with dementia.
                </P>
                <P>
                  <strong>The physical environment</strong> should be calm, not
                  institutional. Look for natural light, outdoor spaces, and a layout
                  that residents can navigate independently. Circular floor plans
                  (no dead ends) reduce agitation in wandering residents.
                </P>

                <H3>The 10 AM Test</H3>
                <P>
                  Visit at 10 AM on a weekday, unannounced. This is the window
                  between morning care (breakfast, bathing, dressing) and lunch
                  &mdash; what&rsquo;s happening in the community right now? Are
                  residents engaged in activities or sitting idle? Are staff
                  interacting warmly with residents or clustered together at the
                  nurses&rsquo; station? The 10 AM test tells you more than any
                  scheduled tour.
                </P>

                <H3>Red Flags</H3>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li>Strong pervasive odor of urine</li>
                  <li>Residents sitting idle with no programming visible</li>
                  <li>High staff turnover (ask directly)</li>
                  <li>Reluctance to allow unannounced visits</li>
                  <li>Vague or evasive answers about pricing and level-of-care fees</li>
                  <li>No structured daily activity schedule</li>
                  <li>Recent state citations or deficiencies</li>
                </ul>

                <SubPageLink href="/memory-care/how-to-choose/">
                  Complete guide to choosing memory care
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: Questions to Ask ─────────────────────────── */}
              <section aria-labelledby="questions-to-ask">
                <SectionHeading id="questions-to-ask">
                  Questions to Ask When Touring Memory Care
                </SectionHeading>
                <P>
                  Most families feel underprepared when they tour memory care communities. Having a structured list of questions changes that. Our 56-question checklist covers every aspect of a community&rsquo;s operation &mdash; organized by category so you can compare multiple communities side by side.
                </P>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { category: "Dementia Care & Programs", count: "8–10 questions" },
                    { category: "Staff & Training", count: "8–10 questions" },
                    { category: "Safety & Environment", count: "8–10 questions" },
                    { category: "Daily Routine & Quality of Life", count: "6–8 questions" },
                    { category: "Medical & Medication Management", count: "6–8 questions" },
                    { category: "Finances & Contracts", count: "4–6 questions" },
                  ].map(({ category, count }) => (
                    <div key={category} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <p className="text-sm font-semibold text-slate-700">{category}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{count}</p>
                    </div>
                  ))}
                </div>
                <SubPageLink href="/memory-care/questions-to-ask/">
                  Get the complete 56-question touring checklist
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section: Red Flags ────────────────────────────────── */}
              <section aria-labelledby="red-flags">
                <SectionHeading id="red-flags">
                  Red Flags and Warning Signs
                </SectionHeading>
                <P>
                  Knowing what to look for protects your loved one. The best way to spot red flags is to visit unannounced &mdash; specifically at 10 AM on a weekday. This window, between morning care and lunch, shows you what &ldquo;normal operations&rdquo; look like without the polish of a scheduled tour.
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li>Strong pervasive odor of urine or feces in common areas</li>
                  <li>Residents sitting idle with no activities or engagement visible</li>
                  <li>High staff turnover &mdash; ask directly; over 50% annually is a red flag</li>
                  <li>Reluctance to allow unannounced visits at any time</li>
                  <li>Vague or evasive answers about pricing and level-of-care fee increases</li>
                  <li>Staff who can&rsquo;t answer basic questions about dementia care approaches</li>
                  <li>Recent state citations, deficiency notices, or enforcement actions</li>
                  <li>Residents who appear frightened, confused, or visibly distressed</li>
                </ul>
                <SubPageLink href="/memory-care/red-flags/">
                  Read the complete guide to memory care red flags
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 9: After Placement ────────────────────────── */}
              <section aria-labelledby="after-placement">
                <SectionHeading id="after-placement">
                  After Placement: What to Expect
                </SectionHeading>
                <P>
                  The first few weeks after a loved one moves into memory care are
                  often the hardest &mdash; for the resident and for the family. Most
                  new residents experience increased confusion or agitation during the
                  adjustment period. This is normal and typically improves after 4
                  to 6 weeks as new routines become familiar.
                </P>
                <P>
                  Stay in close communication with the care team during this period.
                  Ask to be notified of any significant behavioral changes. Your
                  loved one may ask to go home &mdash; sometimes persistently &mdash;
                  which is heartbreaking but very common. The care staff have
                  experience managing this and can advise on how to respond in a way
                  that minimizes distress.
                </P>
                <P>
                  As the disease progresses, advocate actively. Review care plans at
                  every update meeting. Know your state&rsquo;s ombudsman program in
                  case concerns arise that the community won&rsquo;t address. And
                  when the time comes, hospice care can be provided within the memory
                  care community &mdash; Medicare covers hospice services, so
                  end-of-life care doesn&rsquo;t require a hospital transfer in most
                  cases.
                </P>

                <SubPageLink href="/memory-care/after-placement/">
                  Read: After placement &mdash; adjustment, visiting, advocacy, and end-of-life
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 10: Treatments ────────────────────────────── */}
              <section aria-labelledby="treatments">
                <SectionHeading id="treatments">
                  Treatments and Research
                </SectionHeading>
                <P>
                  There is no cure for Alzheimer&rsquo;s or most other forms of
                  dementia as of 2026. But there has been meaningful progress in
                  recent years.
                </P>
                <P>
                  Two medications now approved by the FDA &mdash;{" "}
                  <strong>lecanemab (Leqembi)</strong> approved 2023 and{" "}
                  <strong>donanemab (Kisunla)</strong> approved 2024 &mdash; can slow
                  the progression of early-stage Alzheimer&rsquo;s by approximately
                  27&ndash;29% by clearing amyloid plaques from the brain. They are
                  not cures, they are not for everyone (only early-stage Alzheimer&rsquo;s,
                  not other dementia types), and they carry serious risks including
                  brain swelling and bleeding. But they represent the first class of
                  drugs to target the underlying biology of Alzheimer&rsquo;s rather
                  than just managing symptoms.
                </P>
                <P>
                  Non-drug approaches have strong evidence behind them as well.
                  Cognitive Stimulation Therapy (CST), music therapy, reminiscence
                  therapy, and structured physical exercise all show meaningful
                  benefits for quality of life and slowing behavioral decline.
                  A good memory care community incorporates all of these.
                </P>

                <SubPageLink href="/memory-care/treatments/">
                  Read: Current treatments, new FDA medications, and clinical trials
                </SubPageLink>
              </section>

              <SectionDivider />

              {/* ── Section 11: Emotional Side ────────────────────────── */}
              <section aria-labelledby="emotional-side">
                <SectionHeading id="emotional-side">
                  The Emotional Side
                </SectionHeading>
                <P>
                  If you&rsquo;re considering memory care for someone you love, you
                  almost certainly feel guilty about it. You may feel like
                  you&rsquo;re abandoning them, breaking a promise, or giving up.
                  Here&rsquo;s the truth: choosing professional memory care is not
                  the absence of caring. It is a form of caring &mdash; one that
                  recognizes the reality of a disease that exceeds what any one
                  person or family can safely manage alone.
                </P>
                <P>
                  Dementia also forces families to grieve someone who is still alive.
                  Your parent is here &mdash; you can touch their hand, hear their
                  voice &mdash; but the person you knew is disappearing in slow
                  motion. Psychologists call this &ldquo;ambiguous grief,&rdquo; and
                  it is one of the most painful forms of loss precisely because there
                  is no clear beginning, no defined ending, and no social ritual to
                  mark it.
                </P>
                <P>
                  If your family is in conflict about care decisions &mdash; siblings
                  who disagree, long-distance relatives who don&rsquo;t see the daily
                  reality &mdash; know that this is nearly universal. The sibling
                  closest to the situation typically has the most accurate picture. A
                  family meeting facilitated by a geriatric care manager or social
                  worker can help align everyone.
                </P>
                <P>
                  You are doing the right thing by researching this. The fact that
                  you&rsquo;re here, reading this, is evidence that you care deeply.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 12: FAQ ───────────────────────────────────── */}
              <section aria-labelledby="faq">
                <SectionHeading id="faq">
                  Frequently Asked Questions
                </SectionHeading>
                <FAQAccordion groups={FAQ_GROUPS} />
              </section>

              <SectionDivider />

              {/* ── Take the Next Step ────────────────────────────────── */}
              <section>
                <SectionHeading id="next-steps">
                  Take the Next Step
                </SectionHeading>
                <P>
                  If you&rsquo;re exploring memory care for someone you love,
                  you&rsquo;re already doing the right thing by researching your
                  options. Here&rsquo;s where to start:
                </P>
                <ul className="space-y-3 mb-6">
                  {[
                    {
                      text: "Take the free Care Assessment →",
                      href: "/tools/care-assessment",
                      desc: "Answer a few questions and get a personalized recommendation, cost estimates for your area, and a screening for financial assistance.",
                    },
                    {
                      text: "Use the Cost of Care Calculator →",
                      href: "/tools/cost-calculator",
                      desc: "Get local pricing for memory care and all other care types by zip code.",
                    },
                    {
                      text: "Check Medicaid eligibility →",
                      href: "/tools/medicaid-screener",
                      desc: "A quick initial assessment if you think Medicaid might help pay for care.",
                    },
                    {
                      text: "Check VA benefits eligibility →",
                      href: "/tools/va-benefits",
                      desc: "If your loved one is a veteran, estimate what Aid & Attendance benefits they may qualify for.",
                    },
                  ].map(({ text, href, desc }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-teal-700 hover:text-teal-900 font-semibold text-sm underline underline-offset-2 transition-colors"
                      >
                        {text}
                      </Link>{" "}
                      <span className="text-sm text-slate-500">{desc}</span>
                    </li>
                  ))}
                </ul>
                <P>
                  The assessment takes about 4 minutes. No login required. No sales
                  calls unless you ask for them.
                </P>
              </section>

              {/* ── Sources ───────────────────────────────────────────── */}
              <p className="text-xs text-slate-400 leading-relaxed mb-10 border-t border-slate-100 pt-6">
                <em>
                  Sources: Statistics and data in this guide are drawn from the
                  Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report,
                  CareScout (formerly Genworth) 2025 Cost of Care Survey, the Global
                  Deterioration Scale (Reisberg, 1982), FDA drug approval records,
                  and the National Institute on Aging. Cost figures are approximate
                  medians and may vary. This guide is for informational purposes only
                  and does not constitute medical, legal, or financial advice.
                </em>
              </p>

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

      {/* ── Bottom CTA Banner ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Free Care Assessment
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized recommendation for your loved one&rsquo;s specific
            situation. Takes about 4 minutes. No login required.
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
