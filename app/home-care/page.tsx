import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "Home Care for Aging Parents: Complete Guide (2026) | OurTurnToCare",
  description:
    "The complete guide to home care — costs ($35/hr median), how to pay (Medicaid, VA, insurance), how to hire, what to expect, and when it's time. Free tools to help you decide.",
  openGraph: {
    title: "Home Care for Aging Parents: Complete Guide (2026)",
    description:
      "The complete guide to home care — costs ($35/hr median), how to pay (Medicaid, VA, insurance), how to hire, what to expect, and when it's time.",
    type: "article",
    url: "https://ourturntocare.org/home-care/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/home-care/",
  },
};

// ── FAQ data ───────────────────────────────────────────────────────────────

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Common Questions About Home Care",
    items: [
      {
        q: "How many hours of home care per week should I start with?",
        a: "Most families start with 12–20 hours per week, focused on the times of day when help is most needed (usually mornings for personal care and evenings for meal preparation). You can always increase hours as needs change. Some agencies require a minimum of 3–4 hours per visit.",
      },
      {
        q: "Can a home care aide drive my parent to appointments?",
        a: "Yes, most agencies offer transportation as part of their services. If hiring privately, confirm the caregiver has a valid driver's license, auto insurance, and a clean driving record. Clarify whether they'll use their car or your parent's, and who covers gas and mileage.",
      },
      {
        q: "What's the difference between a CNA, HHA, and PCA?",
        a: "A Certified Nursing Assistant (CNA) has completed a state-approved training program (typically 75–120 hours) and passed a competency exam. CNAs can perform a wider range of tasks, including some clinical duties under nurse supervision. A Home Health Aide (HHA) has similar training and works under the supervision of a nurse or therapist, typically in a Medicare-certified home health setting. A Personal Care Aide (PCA) provides non-medical personal care and may have less formal training, depending on the state. Training requirements vary significantly by state — from 40 hours in some states to 120+ in others.",
      },
      {
        q: "Can I use home care just for weekends or nights?",
        a: "Yes. Many agencies offer flexible scheduling including evenings, overnights, and weekends. Night-only or weekend-only shifts may come with a higher hourly rate (typically 10–20% more). This arrangement works well for families where an adult child provides care during the week but needs coverage on weekends, or where the primary concern is nighttime safety.",
      },
      {
        q: "How long does it take to find and start home care?",
        a: "With an agency, you can often have a caregiver in place within 1–2 weeks. In high-demand areas or during workforce shortages, it may take longer. If hiring privately, the process typically takes 2–4 weeks including posting the position, screening, interviewing, background checks, and a trial period. Start looking before you're in crisis — rushed decisions rarely produce the best outcomes.",
      },
      {
        q: "What if my parent and the caregiver don't get along?",
        a: "This happens, and it's not a failure. Personality fit matters enormously in caregiving. If you hired through an agency, contact them immediately and request a different caregiver — this is one of the key advantages of agency care. If you hired privately, have an honest conversation with the caregiver. If the fit can't be improved, part ways respectfully and start a new search. Your parent's comfort and safety come first.",
      },
      {
        q: "Is home care regulated?",
        a: "Regulation varies dramatically by state. Medicare-certified home health agencies are federally regulated by CMS. Non-medical home care agencies are regulated at the state level, and standards vary widely. Some states require licensing, background checks, and minimum training hours. Others have minimal requirements. This is why your own due diligence in vetting agencies and caregivers is so important — you can't rely solely on state oversight.",
      },
      {
        q: "Can home care be combined with adult day care?",
        a: "Absolutely, and this is an underused strategy. Adult day care provides supervised activities, meals, and socialization during daytime hours (typically 7am–6pm, Monday–Friday) for $1,800–$2,500/month. A home care aide covers mornings and evenings. This combination costs significantly less than full-time home care while providing both socialization (which home care alone may lack) and personal care support.",
      },
      {
        q: "How do I coordinate home care with my parent's doctors?",
        a: "Share the care plan with your parent's primary care physician. Give the caregiver permission to communicate directly with the doctor's office about observations and concerns (you may need to sign a HIPAA release). Include a section in the daily care log for health observations that you can share at medical appointments. Some families bring the caregiver to doctor's appointments — they often notice changes in your parent that you might miss.",
      },
      {
        q: "What happens to home care during a natural disaster or emergency?",
        a: "Ask your agency about their emergency and disaster preparedness plan. Good agencies have protocols for checking on clients during emergencies, deploying backup caregivers, and coordinating with emergency services. If you hire privately, build an emergency plan with your caregiver that includes backup contacts, evacuation routes, a 72-hour supply kit, and a plan for continued care if the caregiver can't get to your parent's home.",
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
  { label: "What Is Home Care?", id: "what-is-home-care" },
  { label: "Types of Home Care Services", id: "types-of-home-care" },
  { label: "What Aides Do (and Can't Do)", id: "what-aides-do" },
  { label: "When Is It Time?", id: "when-is-it-time" },
  { label: "Talking to Your Parent", id: "how-to-talk" },
  { label: "When Your Parent Refuses", id: "parent-refuses" },
  { label: "What Does Home Care Cost?", id: "home-care-costs" },
  { label: "Home Care Costs by State", id: "costs-by-state" },
  { label: "How to Pay", id: "how-to-pay" },
  { label: "Getting Paid as a Family Caregiver", id: "paid-caregiver" },
  { label: "Agency vs. Private Hire", id: "agency-vs-private" },
  { label: "How to Find and Vet an Agency", id: "find-vet-agency" },
  { label: "How to Interview a Caregiver", id: "interview-caregiver" },
  { label: "Creating a Care Plan", id: "care-plan" },
  { label: "Quality, Safety & Monitoring", id: "quality-safety" },
  { label: "Red Flags & Warning Signs", id: "red-flags" },
  { label: "Managing Caregiver Turnover", id: "turnover" },
  { label: "Home Care for Specific Conditions", id: "specific-conditions" },
  { label: "Home Care vs. Other Options", id: "vs-other-options" },
  { label: "The Home Care Workforce", id: "workforce" },
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

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-base font-bold text-slate-800 mt-5 mb-2 leading-snug">
      {children}
    </h4>
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

function StoryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 my-8">
      <p className="text-sm font-semibold italic text-slate-500 mb-3">{title}</p>
      <div className="text-[1.0rem] leading-[1.75] text-slate-600">{children}</div>
    </div>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[1.0rem] text-slate-600 leading-relaxed">
          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="list-none space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[1.0rem] text-slate-600 leading-relaxed">
          <span className="flex-shrink-0 font-bold text-teal-600 text-sm mt-0.5 w-5 text-right">{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
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
          On this page
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
          Related tools
        </p>
        <ul className="space-y-2">
          {[
            { label: "Cost of Care Calculator", href: "/tools/cost-calculator" },
            { label: "Medicaid Eligibility Screener", href: "/tools/medicaid-screener" },
            { label: "VA Benefits Calculator", href: "/tools/va-benefits" },
            { label: "Care Assessment", href: "/tools/care-assessment" },
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

export default function HomeCarePage() {
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
            <span className="text-slate-700 font-medium">Home Care</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Home Care for Aging Parents: The Complete Guide (2026)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[680px]">
            Everything families need to know about in-home care &mdash; what it
            is, what it costs, how to pay, how to hire, and how to ensure
            quality. The most complete, honest home care resource available.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-teal-700 py-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: "$35/hour", label: "National median cost of home care (CareScout 2025)" },
              { stat: "$80,080/yr", label: "Annual cost at 44 hours per week" },
              { stat: "4.3 million", label: "Home care aides working in the US (BLS, 2024)" },
              { stat: "63 million", label: "Americans serving as family caregivers (AARP, 2025)" },
              { stat: "75%", label: "Seniors who want to age at home (AARP, 2024)" },
              { stat: "600,000+", label: "People on Medicaid home care waiting lists (KFF, 2025)" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {stat}
                </span>
                <span className="text-sm text-teal-100 leading-snug max-w-[160px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-teal-300 mt-6">
            Sources: CareScout 2025 Cost of Care Survey; Bureau of Labor Statistics 2024; AARP Caregiving in the U.S. 2025; Kaiser Family Foundation 2025
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
              <div className="mb-10">
                <P>
                  You&rsquo;ve noticed your mom struggling to get out of bed in
                  the morning. Your dad&rsquo;s kitchen is getting a little
                  messier. They&rsquo;re still sharp, still mostly
                  themselves&mdash;they just need a hand. If you&rsquo;re
                  considering home care, you&rsquo;re not alone. More than 63
                  million Americans are caring for a loved one right now, and
                  the decision to bring in professional help is one of the most
                  loving choices you can make.
                </P>
                <P>
                  This guide is designed to be the most complete, honest
                  resource available on home care. We&rsquo;ll cover
                  everything: what home care actually is, what it costs (with
                  real numbers, not vague ranges), how to pay for it, how to
                  hire trustworthy caregivers, what to watch out for, and how
                  to handle the situations nobody warns you
                  about&mdash;like what to do when your parent refuses help,
                  or how to spot the signs that home care is no longer enough.
                </P>
                <P>
                  Bookmark this page. Share it with your siblings. Come back
                  to it as your parent&rsquo;s needs change. That&rsquo;s
                  what it&rsquo;s here for.
                </P>
              </div>

              {/* ── Table of Contents ─────────────────────────────────── */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-6 mb-12">
                <h2 className="text-base font-bold text-teal-800 mb-4 uppercase tracking-wide">
                  On this page:
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

              {/* ── Section 1: What Is Home Care ──────────────────────── */}
              <section aria-labelledby="what-is-home-care">
                <SectionHeading id="what-is-home-care">
                  What Is Home Care?
                </SectionHeading>
                <P>
                  Let&rsquo;s start with something that confuses a lot of
                  families: the difference between home care, home health care,
                  and hospice. They sound similar, but they&rsquo;re different
                  services with different costs, different coverage, and
                  different people providing them.
                </P>
                <P>
                  <strong>Home care</strong> (also called non-medical home care
                  or personal care) is assistance with daily living provided by
                  trained aides who are not nurses or therapists. A home care
                  aide helps your parent with things like bathing, dressing,
                  grooming, toileting, meal preparation, light housekeeping,
                  laundry, transportation to appointments, medication reminders,
                  and companionship. Home care is not prescribed by a doctor.
                  It is almost never covered by Medicare. It is paid for out of
                  pocket, through Medicaid waiver programs, VA benefits, or
                  long-term care insurance.
                </P>
                <P>
                  <strong>Home health care</strong> is skilled medical care
                  provided in the home by licensed professionals&mdash;registered
                  nurses, physical therapists, occupational therapists,
                  speech-language pathologists, or medical social workers. Home
                  health is prescribed by a doctor and is typically covered by
                  Medicare Part A. A visiting nurse might come several times a
                  week to monitor a chronic condition, manage wound care after
                  surgery, or supervise physical therapy after a stroke. Home
                  health care is usually short-term&mdash;weeks or months, not
                  years.
                </P>
                <P>
                  <strong>Hospice care</strong> is comfort-focused care for
                  people with a terminal illness who have a life expectancy of
                  six months or less. Hospice can be provided at home and is
                  covered by Medicare Part A. It includes pain management,
                  emotional and spiritual support for the patient and family,
                  and help with daily needs. Hospice does not try to cure the
                  illness; it focuses on quality of life.
                </P>
                <Callout>
                  This distinction matters enormously when you&rsquo;re planning
                  care and thinking about what insurance might cover. Many
                  families assume Medicare will pay for the home care aide who
                  helps Mom shower and makes her lunch. It won&rsquo;t.
                  Understanding this early saves heartbreak and financial
                  surprises later.
                </Callout>

                <H3>
                  Activities of Daily Living (ADLs) and Instrumental ADLs (IADLs)
                </H3>
                <P>
                  You&rsquo;ll hear these terms constantly when researching
                  care. They&rsquo;re the standard way healthcare professionals
                  measure how much help someone needs.
                </P>
                <P>
                  <strong>Activities of Daily Living (ADLs)</strong> are the
                  basic self-care tasks: bathing, dressing, eating, toileting,
                  transferring (moving from bed to chair), and maintaining
                  continence. When someone struggles with ADLs, they typically
                  need hands-on personal care assistance.
                </P>
                <P>
                  <strong>Instrumental Activities of Daily Living (IADLs)</strong>{" "}
                  are the more complex tasks of independent living: managing
                  finances, handling medications, shopping, preparing meals,
                  using the telephone, doing housework, doing laundry, and
                  arranging transportation. When someone struggles with IADLs
                  but can still handle basic ADLs, they may need less intensive
                  help&mdash;sometimes just a few hours of support per week.
                </P>
                <P>
                  Most home care assessments and insurance eligibility criteria
                  are built around ADLs. Medicaid typically requires that a
                  person need help with at least two ADLs to qualify for home
                  care coverage. Long-term care insurance policies usually have
                  similar thresholds. Knowing where your parent falls on this
                  spectrum helps you determine the right level of care and what
                  funding options may be available.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 2: Types of Home Care ─────────────────────── */}
              <section aria-labelledby="types-of-home-care">
                <SectionHeading id="types-of-home-care">
                  Types of Home Care Services
                </SectionHeading>
                <P>
                  Home care isn&rsquo;t one-size-fits-all. There are several
                  distinct types, and understanding the differences helps you
                  match the right service to your parent&rsquo;s needs.
                </P>

                <H3>Companion Care</H3>
                <P>
                  The lightest level of service. A companion provides social
                  interaction, light housekeeping, meal preparation,
                  transportation to appointments or errands, and general
                  supervision. Companions generally do not help with personal
                  care tasks like bathing or toileting. This is ideal for a
                  parent who is still fairly independent but shouldn&rsquo;t
                  be alone for long stretches&mdash;perhaps because of fall
                  risk, mild cognitive decline, or loneliness after losing a
                  spouse.
                </P>

                <H3>Personal Care (Home Care Aides)</H3>
                <P>
                  This is what most people mean when they say &ldquo;home
                  care.&rdquo; A personal care aide helps with ADLs: bathing,
                  dressing, grooming, toileting, mobility assistance, and
                  transfers. They also typically handle meal preparation,
                  medication reminders, light housekeeping, and transportation.
                  Personal care aides are trained but not licensed medical
                  professionals. They cannot administer medications (though
                  they can remind your parent to take them), perform medical
                  procedures, or provide clinical assessments.
                </P>

                <H3>Skilled Home Health</H3>
                <P>
                  Licensed medical professionals providing doctor-prescribed
                  care in the home. This includes wound care, IV therapy,
                  injections, physical/occupational/speech therapy, chronic
                  disease management, and post-surgical care. This is the type
                  of home care Medicare covers, and it&rsquo;s typically
                  short-term.
                </P>

                <H3>Hourly Care</H3>
                <P>
                  The most common arrangement. You hire a caregiver for a set
                  number of hours per day or week. Most families start with
                  12&ndash;20 hours per week and adjust from there. Hourly care
                  works well when your parent needs help during specific parts
                  of the day&mdash;mornings for bathing and breakfast, or
                  afternoons for medication management and meal prep.
                </P>

                <H3>Live-In Care</H3>
                <P>
                  A caregiver lives in your parent&rsquo;s home, typically
                  working a set schedule (often 10&ndash;12 active hours per
                  day) with designated sleep time. Live-in care costs
                  significantly less per hour than standard hourly care because
                  the caregiver receives room and board as part of the
                  arrangement. This is a good option when your parent needs
                  someone present around the clock but doesn&rsquo;t require
                  active assistance during the night.
                </P>
                <Callout>
                  <strong>Important distinction:</strong> Live-in care is not
                  the same as 24-hour care. A live-in caregiver is entitled to
                  sleep time (usually 8 hours) and breaks. If your parent needs
                  active assistance during the night&mdash;for example, if they
                  wander due to dementia or need help using the bathroom
                  multiple times&mdash;you need 24-hour care, not live-in care.
                </Callout>

                <H3>24-Hour Care</H3>
                <P>
                  Two or more caregivers work in shifts to provide continuous
                  awake care around the clock. This is the most expensive home
                  care arrangement and is typically needed when a parent has
                  advanced dementia, significant fall risk at night, or complex
                  medical needs. At $35/hour nationally, true 24-hour care
                  costs roughly $25,000+ per month&mdash;which is why many
                  families at this level of need consider whether a residential
                  care facility might be more sustainable.
                </P>

                <H3>Respite Care</H3>
                <P>
                  Short-term care that gives family caregivers a break. Respite
                  care might be a few hours a week so you can run errands and
                  recharge, a weekend so you can attend a family event, or a
                  week or two so you can take a vacation. Many families
                  don&rsquo;t realize respite care exists, or they feel guilty
                  using it. Don&rsquo;t. Caregiver burnout is real, and respite
                  care helps you sustain your caregiving over the long haul.
                  Some Medicaid waiver programs and VA programs cover respite
                  care.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 3: What Aides Do ───────────────────────────── */}
              <section aria-labelledby="what-aides-do">
                <SectionHeading id="what-aides-do">
                  What Home Care Aides Actually Do (and Can&rsquo;t Do)
                </SectionHeading>
                <P>
                  A good home care aide becomes part of your parent&rsquo;s
                  routine and, often, part of your family. Here&rsquo;s what a
                  typical day might look like:
                </P>
                <P>
                  Your aide arrives in the morning and helps your parent shower
                  and get dressed. They might prepare a balanced breakfast, set
                  up medications in the pill organizer (reminding your parent
                  when to take them), and check in on how your parent slept.
                  Throughout the day, they might prepare lunch, do dishes, tidy
                  up the living areas, and help with laundry. They listen to
                  your parent&rsquo;s stories, watch TV together, go for walks,
                  or help with hobbies like gardening or reading.
                </P>
                <P>
                  If your parent has a doctor&rsquo;s appointment, the aide
                  provides transportation and waits with them. They might help
                  with light meal preparation for that evening, check that the
                  home is safe before leaving, and report back to you about how
                  your parent is doing. Some aides develop such strong
                  relationships with their clients that they become trusted
                  confidants, noticing changes in mood or health that family
                  members might miss.
                </P>

                <H3>What Home Care Aides Typically Cannot Do</H3>
                <P>
                  This is important to understand upfront, because it prevents
                  mismatched expectations:
                </P>
                <BulletList
                  items={[
                    "Administer medications. They can remind your parent to take pills and hand them the pill bottle, but in most states they cannot put pills in your parent's mouth, give injections, or manage IVs. (Rules vary by state—some states allow trained aides to administer medications under certain conditions.)",
                    "Perform medical procedures. Wound care, catheter care, blood pressure monitoring, and other clinical tasks require a licensed nurse or therapist.",
                    "Provide medical diagnoses or advice. If your parent's health changes, the aide should report it to you and the healthcare team, not try to treat it.",
                    "Heavy lifting beyond safe limits. Most aides can assist with transfers using proper technique, but if your parent requires a mechanical lift or is completely immobile, you may need additional equipment or a second person.",
                    "Major housework or home maintenance. Light housekeeping is standard; deep cleaning, yard work, and home repairs are not.",
                  ]}
                />
                <P>
                  Understanding these boundaries helps you set up the right
                  combination of services. Many families use a home care aide
                  for daily personal care while also having a visiting nurse
                  come once or twice a week for medical oversight.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 4: When Is It Time ────────────────────────── */}
              <section aria-labelledby="when-is-it-time">
                <SectionHeading id="when-is-it-time">
                  When Is It Time for Home Care?
                </SectionHeading>
                <P>
                  Figuring out when to bring in help is deeply personal, and
                  there&rsquo;s rarely a single obvious moment. More often,
                  it&rsquo;s a gradual accumulation of signs. Here are the ones
                  that matter most:
                </P>

                <H3>Changes in personal hygiene</H3>
                <P>
                  Your parent isn&rsquo;t bathing as often, wearing the same
                  clothes repeatedly, or has noticeable body odor. This is
                  often one of the first signs because bathing is physically
                  demanding&mdash;it requires balance, strength, and range of
                  motion that can decline quietly.
                </P>

                <H3>The kitchen tells a story</H3>
                <P>
                  Expired food in the fridge. Scorched pots on the stove.
                  Unchanged dishes in the sink. Weight loss. These signal that
                  meal preparation has become difficult or that your parent is
                  forgetting to eat.
                </P>

                <H3>Medication issues</H3>
                <P>
                  Missed doses, double doses, confused about which pill is
                  which, or prescription bottles that aren&rsquo;t being
                  refilled on schedule. Medication mismanagement is one of the
                  leading causes of preventable hospitalizations in older adults.
                </P>

                <H3>Falls or near-falls</H3>
                <P>
                  Any fall is a red flag. If your parent has fallen in the past
                  six months, or if you notice them gripping furniture when they
                  walk, home care should be on the table. Falls are the leading
                  cause of injury-related death in people over 65.
                </P>

                <H3>Increasing isolation</H3>
                <P>
                  Your parent has stopped attending activities they used to
                  enjoy, isn&rsquo;t answering the phone, or seems withdrawn.
                  Social isolation in older adults is associated with increased
                  risk of dementia, heart disease, and depression.
                </P>

                <H3>Caregiver burnout in the family</H3>
                <P>
                  If you or your siblings are calling in sick to work, skipping
                  your own medical appointments, losing sleep, or feeling
                  resentful about caregiving duties, that&rsquo;s a signal.
                  Home care isn&rsquo;t about replacing family love; it&rsquo;s
                  about preventing family caregiver exhaustion.
                </P>

                <H3>A hospitalization or surgery</H3>
                <P>
                  Even a successful surgery can leave an older adult needing
                  weeks or months of extra support. Home care during recovery
                  can be temporary, giving your parent the help they need while
                  staying in a familiar environment.
                </P>

                <H3>Your parent says they want to stay home</H3>
                <P>
                  For many older adults, home is irreplaceable. The familiar
                  furniture, the view from their window, their garden, their
                  memories&mdash;these things matter deeply. Home care makes it
                  possible to honor that wish.
                </P>

                <CTACard
                  title="Not sure if it's time?"
                  description="Our Care Assessment evaluates your parent's specific situation and recommends the most appropriate level of care. Takes about 3 minutes."
                  buttonText="Take the Care Assessment"
                  href="/tools/care-assessment"
                />
              </section>

              <SectionDivider />

              {/* ── Section 5: How to Talk ────────────────────────────── */}
              <section aria-labelledby="how-to-talk">
                <SectionHeading id="how-to-talk">
                  How to Talk to Your Parent About Home Care
                </SectionHeading>
                <P>
                  This conversation is one of the hardest things you&rsquo;ll
                  do. Your parent may hear &ldquo;you need help&rdquo; as
                  &ldquo;you&rsquo;re failing&rdquo; or &ldquo;I&rsquo;m
                  taking away your independence.&rdquo; Handled well, though,
                  this conversation can actually strengthen your relationship.
                </P>

                <H3>Timing Matters</H3>
                <P>
                  Don&rsquo;t bring it up during a crisis&mdash;after a fall,
                  in the ER, or right after a difficult day. Choose a calm
                  moment when you&rsquo;re both relaxed. If possible, have the
                  conversation at your parent&rsquo;s home, where they feel
                  most in control.
                </P>

                <H3>Frame It as Partnership, Not Takeover</H3>
                <P>
                  Instead of &ldquo;I think you need a caregiver,&rdquo; try
                  &ldquo;I&rsquo;ve been thinking about ways to make things
                  easier for both of us.&rdquo; Instead of &ldquo;You
                  can&rsquo;t do this alone anymore,&rdquo; try &ldquo;I want
                  to make sure you can stay in this house as long as possible,
                  and I think some extra help would make that more
                  realistic.&rdquo;
                </P>

                <H3>Lead with Their Goals</H3>
                <P>
                  Ask what matters most to them. Staying in their home?
                  Maintaining their routines? Being able to see their
                  grandchildren without worrying about their energy? Position
                  home care as the thing that makes those goals possible, not
                  as a sign that those goals are slipping away.
                </P>

                <H3>Start Small</H3>
                <P>
                  Suggest starting with just a few hours a week for tasks your
                  parent would rather not do&mdash;laundry, grocery shopping,
                  meal prep. Many parents who resist the idea of a
                  &ldquo;caregiver&rdquo; are open to a &ldquo;helper&rdquo;
                  who handles the chores they find tiring. Once they experience
                  the relief, they&rsquo;re often willing to expand.
                </P>

                <H3>Include Siblings</H3>
                <P>
                  If you have siblings, get aligned before the conversation. A
                  unified family message is much more effective than one child
                  pushing for care while another says Mom is &ldquo;fine.&rdquo;
                  If siblings disagree, work that out privately first.
                </P>

                <StoryCard title="Maria's Story: The Gradual Start">
                  <p>
                    Maria noticed her 78-year-old mother Rosa was losing weight
                    and leaving the stove on. Instead of leading with her
                    concerns, Maria asked Rosa what was hardest about her day.
                    Rosa admitted she was exhausted by cooking and grocery
                    shopping. Maria suggested hiring someone for just those
                    tasks&mdash;12 hours a week. Rosa agreed reluctantly but
                    within a month was asking the aide to stay for lunch and
                    help with laundry. Six months later, the aide was coming 20
                    hours a week and Rosa described her as &ldquo;like a
                    daughter.&rdquo; The key was starting with what Rosa saw as
                    a problem, not what Maria saw.
                  </p>
                </StoryCard>
              </section>

              <SectionDivider />

              {/* ── Section 6: When Parent Refuses ───────────────────── */}
              <section aria-labelledby="parent-refuses">
                <SectionHeading id="parent-refuses">
                  What If Your Parent Refuses Help?
                </SectionHeading>
                <P>
                  This is incredibly common. Your parent may refuse home care
                  out of pride (&ldquo;I don&rsquo;t need a babysitter&rdquo;),
                  fear of strangers (&ldquo;I don&rsquo;t want someone I
                  don&rsquo;t know in my house&rdquo;), financial anxiety
                  (&ldquo;I can&rsquo;t afford that&rdquo;), denial
                  (&ldquo;I&rsquo;m fine&rdquo;), or a desire to protect you
                  (&ldquo;I don&rsquo;t want to be a burden&rdquo;).
                </P>

                <BulletList
                  items={[
                    "Respect their autonomy. Unless your parent has been declared legally incapacitated, they have the right to refuse care. This is painful when you can see they need help, but pushing too hard can damage trust and make them dig in harder.",
                    "Address the real fear. If the objection is about strangers, offer to be present for the first few visits. If it's about cost, show them the numbers and what insurance or Medicaid might cover. If it's about pride, reframe it: 'Getting help isn't giving up. It's being smart about staying independent longer.'",
                    "Try a different door. If 'home care aide' sounds too clinical, call it a 'house helper' or 'companion.' If personal care is a bridge too far, start with housekeeping or transportation and build from there.",
                    "Use a crisis as a catalyst (carefully). After a fall, a hospitalization, or a driving incident, your parent may be more open to discussing help. Don't weaponize the crisis, but do use it as a natural conversation opener.",
                    "Bring in a trusted third party. Sometimes a parent's doctor, a clergy member, or a trusted friend can suggest help in a way that lands differently than when it comes from a child.",
                  ]}
                />

                <P>
                  <strong>Know the line.</strong> If your parent is genuinely
                  unsafe&mdash;leaving the stove on, wandering, unable to get
                  up after a fall, or neglecting their health to a dangerous
                  degree&mdash;you may need to involve their doctor or, in
                  extreme cases, consider whether Adult Protective Services or
                  guardianship conversations are necessary. This is rare,
                  painful, and should involve an elder law attorney.
                </P>

                <StoryCard title="The Chen Family: When Refusal Turns to Acceptance">
                  <p>
                    David&rsquo;s father Henry, 82, insisted he was
                    &ldquo;perfectly fine&rdquo; after his second fall in three
                    months. He refused all suggestions of help. David changed
                    his approach: instead of pushing home care, he asked his
                    father to &ldquo;help him out&rdquo; by trying a medical
                    alert pendant &ldquo;just so I don&rsquo;t worry at work.&rdquo;
                    Henry agreed. When Henry fell again and used the pendant, the
                    response team came within minutes. That experience opened the
                    door. Henry admitted he&rsquo;d been scared of falling and
                    not being able to get up. Within a week, he agreed to try a
                    home care aide for mornings. He never looked back.
                  </p>
                </StoryCard>
              </section>

              <SectionDivider />

              {/* ── Section 7: Costs ─────────────────────────────────── */}
              <section aria-labelledby="home-care-costs">
                <SectionHeading id="home-care-costs">
                  What Does Home Care Cost?
                </SectionHeading>
                <P>
                  This is the question every family asks first, and you deserve
                  real numbers&mdash;not vague ranges with asterisks.
                </P>

                <H3>The National Picture (2025 Data)</H3>
                <P>
                  According to the CareScout Cost of Care Survey (formerly
                  Genworth), released March 2026:
                </P>
                <BulletList
                  items={[
                    "National median hourly rate: $35/hour for non-medical home care",
                    "Annual cost at 44 hours/week: $80,080",
                    "Year-over-year increase: 3% from 2024 to 2025",
                    "Range across states: $24/hour (least expensive) to $43/hour (most expensive)",
                  ]}
                />

                <P>
                  I know those numbers can be hard to look at. Take a breath.
                  Most families start with far fewer hours than they think they'll need
                  and adjust from there.
                </P>

                <H3>What Different Levels of Care Actually Cost</H3>
                <P>
                  Here&rsquo;s what those hourly rates translate to in real
                  family budgets, using the $35/hour national median:
                </P>
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="text-left px-4 py-3 font-semibold">Level of Care</th>
                        <th className="text-left px-4 py-3 font-semibold">Hours/Week</th>
                        <th className="text-left px-4 py-3 font-semibold">Monthly Cost</th>
                        <th className="text-left px-4 py-3 font-semibold">Annual Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Light help (errands, companionship)", "8–12", "$1,120–$1,680", "$13,440–$20,160"],
                        ["Part-time personal care", "16–20", "$2,240–$2,800", "$26,880–$33,600"],
                        ["Substantial daily help", "30–40", "$4,200–$5,600", "$50,400–$67,200"],
                        ["Full-time (44 hrs/week)", "44", "$6,160", "$73,920"],
                        ["Live-in care", "Live-in", "$8,000–$15,000", "$96,000–$180,000"],
                        ["24-hour care (shift-based)", "168", "$20,000–$27,000", "$240,000–$324,000"],
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-slate-700 border-t border-slate-100">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <P>
                  Most families start at the part-time level (12&ndash;20 hours
                  per week) and increase over time as needs change. The average
                  family uses home care for about 2&ndash;4 years.
                </P>

                <H3>Why Agencies Cost More Than Private Caregivers</H3>
                <P>
                  When you hire through an agency, you typically pay 20&ndash;40%
                  more per hour than hiring a caregiver directly. That premium
                  covers real things: background checks, liability insurance,
                  workers&rsquo; compensation, payroll taxes, caregiver
                  training, scheduling and backup coverage, and management
                  oversight. Whether the premium is worth it depends on your
                  situation&mdash;we cover this in detail in the Agency vs.
                  Private Hire section below.
                </P>

                <H3>Hidden Costs to Budget For</H3>
                <P>
                  Beyond the hourly rate, home care comes with costs families
                  often don&rsquo;t anticipate: home modifications (grab bars,
                  ramp, stairlift) can run $2,000&ndash;$20,000+; medical
                  supplies and incontinence products average $200&ndash;$400/month;
                  transportation costs for medical appointments; additional
                  food and meal costs; and the economic impact on family
                  caregivers. According to AARP&rsquo;s 2025 caregiving report,
                  family caregivers spend an average of $7,200 per year out of
                  pocket on caregiving-related expenses&mdash;about 26% of
                  their personal income.
                </P>
                <P>
                  For home modification guidance, see our{" "}
                  <ILink href="/aging-in-place/">Aging in Place</ILink> hub.
                </P>

                <CTACard
                  title="See what home care costs in your area"
                  description="Our Cost of Care Calculator shows you real median costs by zip code for home care, assisted living, and other care types."
                  buttonText="Use the Cost Calculator"
                  href="/tools/cost-calculator"
                />
              </section>

              <SectionDivider />

              {/* ── Section 8: Costs by State ─────────────────────────── */}
              <section aria-labelledby="costs-by-state">
                <SectionHeading id="costs-by-state">
                  Home Care Costs by State
                </SectionHeading>
                <P>
                  Home care costs vary dramatically by geography. The difference
                  between the cheapest and most expensive states is nearly
                  double. Here&rsquo;s the 2025 data from the CareScout Cost of
                  Care Survey:
                </P>
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="text-left px-4 py-3 font-semibold">State</th>
                        <th className="text-left px-4 py-3 font-semibold">Median Hourly Rate</th>
                        <th className="text-left px-4 py-3 font-semibold">Est. Annual Cost (44 hrs/wk)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Alabama", "$25", "$57,200"],
                        ["Alaska", "$38", "$86,944"],
                        ["Arizona", "$33", "$75,504"],
                        ["Arkansas", "$26", "$59,488"],
                        ["California", "$39", "$89,232"],
                        ["Colorado", "$36", "$82,368"],
                        ["Connecticut", "$35", "$80,080"],
                        ["Delaware", "$33", "$75,504"],
                        ["Florida", "$32", "$73,216"],
                        ["Georgia", "$28", "$64,064"],
                        ["Hawaii", "$38", "$86,944"],
                        ["Idaho", "$34", "$77,792"],
                        ["Illinois", "$33", "$75,504"],
                        ["Indiana", "$32", "$73,216"],
                        ["Iowa", "$32", "$73,216"],
                        ["Kansas", "$31", "$70,928"],
                        ["Kentucky", "$28", "$64,064"],
                        ["Louisiana", "$24", "$54,912"],
                        ["Maine", "$38", "$86,944"],
                        ["Maryland", "$33", "$75,504"],
                        ["Massachusetts", "$37", "$84,656"],
                        ["Michigan", "$33", "$75,504"],
                        ["Minnesota", "$41", "$93,808"],
                        ["Mississippi", "$26", "$59,488"],
                        ["Missouri", "$30", "$68,640"],
                        ["Montana", "$35", "$80,080"],
                        ["Nebraska", "$34", "$77,792"],
                        ["Nevada", "$33", "$75,504"],
                        ["New Hampshire", "$40", "$91,520"],
                        ["New Jersey", "$34", "$77,792"],
                        ["New Mexico", "$31", "$70,928"],
                        ["New York", "$35", "$80,080"],
                        ["North Carolina", "$29", "$66,352"],
                        ["North Dakota", "$38", "$86,944"],
                        ["Ohio", "$30", "$68,640"],
                        ["Oklahoma", "$27", "$61,776"],
                        ["Oregon", "$38", "$86,944"],
                        ["Pennsylvania", "$32", "$73,216"],
                        ["Rhode Island", "$35", "$80,080"],
                        ["South Carolina", "$27", "$61,776"],
                        ["South Dakota", "$40", "$91,520"],
                        ["Tennessee", "$27", "$61,776"],
                        ["Texas", "$28", "$64,064"],
                        ["Utah", "$34", "$77,792"],
                        ["Vermont", "$40", "$91,520"],
                        ["Virginia", "$30", "$68,640"],
                        ["Washington", "$43", "$98,384"],
                        ["West Virginia", "$26", "$59,488"],
                        ["Wisconsin", "$33", "$75,504"],
                        ["Wyoming", "$43", "$98,384"],
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-slate-700 border-t border-slate-100">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 italic mb-6">
                  Source: CareScout 2025 Cost of Care Survey. Annual estimates
                  assume 44 hours per week, 52 weeks per year. Actual costs vary
                  by metro area and level of care. Rates shown are median &mdash;
                  your area may be higher or lower.
                </p>
                <P>
                  <strong>Key takeaway:</strong> If your parent lives in
                  Minnesota, Washington, or Wyoming, home care costs roughly 75%
                  more than in Louisiana, Arkansas, or Mississippi. Geography
                  alone can mean a $40,000/year difference. For families with
                  flexibility about where a parent lives, this is worth
                  considering.
                </P>

                <CTACard
                  title="Get a precise estimate for your zip code"
                  description="Our Cost of Care Calculator shows local median rates and compares home care to other options side by side."
                  buttonText="Use the Cost Calculator"
                  href="/tools/cost-calculator"
                  secondary
                />
              </section>

              <SectionDivider />

              {/* ── Section 9: How to Pay ─────────────────────────────── */}
              <section aria-labelledby="how-to-pay">
                <SectionHeading id="how-to-pay">
                  How to Pay for Home Care
                </SectionHeading>
                <P>
                  Most families use a combination of payment sources. Here&rsquo;s
                  every major option, with honest information about what each one
                  actually covers.
                </P>

                <H3>Medicare: What It Does and Doesn&rsquo;t Cover</H3>
                <P>
                  <strong>Medicare does not cover non-medical home care.</strong>{" "}
                  This confuses more families than almost anything else in senior
                  care. Medicare covers home <em>health</em> care&mdash;skilled
                  nursing, physical therapy, and other medical services prescribed
                  by a doctor&mdash;but it does not pay for the personal care
                  aide who helps your parent bathe, dress, and eat.
                </P>
                <P>
                  Medicare Part A covers home health care when all of these
                  conditions are met: a doctor certifies that your parent needs
                  skilled care, your parent is &ldquo;homebound&rdquo; (leaving
                  home requires considerable effort), and a Medicare-certified
                  home health agency provides the care. When covered, there&rsquo;s
                  no copay or deductible for home health services.
                </P>
                <P>
                  But when the skilled care need ends&mdash;after your parent
                  recovers from surgery, for example&mdash;the Medicare coverage
                  ends too. The ongoing, daily personal care that most families
                  need is not covered.
                </P>

                <H3>Medicaid Home and Community-Based Services (HCBS) Waivers</H3>
                <P>
                  Medicaid is the single largest payer for long-term home care
                  in America. Through HCBS waiver programs, Medicaid allows
                  eligible older adults to receive home care services instead of
                  moving to a nursing home. These programs cover personal care,
                  homemaker services, adult day care, respite care, and sometimes
                  home modifications and assistive technology.
                </P>
                <P>
                  <strong>The catch:</strong> Eligibility requirements are strict
                  and vary by state. Generally, your parent must have limited
                  income (often under $2,901/month for an individual in 2025)
                  and limited assets (typically under $2,000, though some states
                  are higher). They must also demonstrate a need for a
                  nursing-home level of care&mdash;typically needing help with
                  at least two ADLs.
                </P>
                <P>
                  <strong>The bigger catch:</strong> 41 states have waiting lists
                  for HCBS waivers, with more than 600,000 people waiting
                  nationwide as of 2025 (Kaiser Family Foundation). In some
                  states, the wait is months. In others, it&rsquo;s years.
                  Apply as early as possible&mdash;even if your parent
                  doesn&rsquo;t need services yet, getting on the waitlist
                  secures their place.
                </P>

                <CTACard
                  title="Check Medicaid eligibility"
                  description="Our Medicaid Eligibility Screener helps you assess whether your parent might qualify based on income, assets, and care needs."
                  buttonText="Use the Medicaid Screener"
                  href="/tools/medicaid-screener"
                />

                <H3>Veterans Aid &amp; Attendance</H3>
                <P>
                  If your parent (or their spouse) served in the military during
                  a wartime period and needs help with ADLs, they may qualify for
                  the VA Aid &amp; Attendance pension benefit. This is one of the
                  most underused benefits in senior care.
                </P>
                <P>
                  <strong>2026 monthly benefit amounts</strong> (effective
                  December 1, 2025):
                </P>
                <BulletList
                  items={[
                    "Single veteran: up to $2,424/month",
                    "Married veteran: up to $2,874/month",
                    "Surviving spouse: up to $1,558/month",
                  ]}
                />
                <P>
                  These amounts can cover a significant portion of home care
                  costs. Eligibility requires wartime service, honorable or
                  general discharge, limited income and assets (after deducting
                  medical expenses), and a medical need for assistance with daily
                  activities. The application process can take 6&ndash;12 months,
                  so start early.
                </P>

                <CTACard
                  title="Estimate VA benefits"
                  description="Our VA Benefits Calculator gives you an initial estimate of eligibility and potential benefit amount based on service history and care needs."
                  buttonText="Use the VA Benefits Calculator"
                  href="/tools/va-benefits"
                  secondary
                />

                <H3>Long-Term Care Insurance</H3>
                <P>
                  If your parent purchased a long-term care insurance policy, it
                  likely covers home care services. Most policies require the
                  insured to need help with at least two ADLs or to have a
                  cognitive impairment. Benefits typically have a daily or monthly
                  maximum, an elimination period (waiting period before benefits
                  kick in, often 30&ndash;90 days), and a lifetime maximum.
                </P>
                <P>
                  Review the policy carefully&mdash;or have an elder law attorney
                  review it. If your parent has a policy, file a claim as soon
                  as they qualify. These benefits are what the policy was
                  purchased for.
                </P>

                <H3>Tax Deductions for Home Care</H3>
                <P>
                  Home care expenses may be tax-deductible as medical expenses,
                  but the rules are specific. Under IRS guidelines, you can
                  deduct medical expenses that exceed 7.5% of your adjusted gross
                  income&mdash;but only if you itemize deductions. For home care
                  to qualify, the care must be primarily for medical reasons, and
                  the person receiving care must generally be unable to perform
                  at least two ADLs without assistance for a period expected to
                  last at least 90 days. Consult a tax professional&mdash;the
                  rules are complex but the savings can be meaningful. (Source:
                  IRS Publication 502)
                </P>

                <H3>Area Agencies on Aging and Free Resources</H3>
                <P>
                  Every community in America has an Area Agency on Aging
                  (AAA)&mdash;a local organization funded under the Older
                  Americans Act that connects older adults with services. Your
                  local AAA may provide or connect you with: free or subsidized
                  meals (Meals on Wheels), transportation to medical appointments,
                  respite care for family caregivers, homemaker services,
                  caregiver support groups, and health insurance counseling
                  (SHIP program).
                </P>
                <Callout>
                  To find your local AAA, call the{" "}
                  <strong>Eldercare Locator at 1-800-677-1116</strong> or visit{" "}
                  <strong>eldercare.acl.gov</strong>. This is a free government
                  service.
                </Callout>

                <H3>Other Funding Sources</H3>
                <P>
                  Reverse mortgages can provide income from home equity to pay
                  for care, but involve significant costs and risks. Consult a
                  HUD-approved counselor before pursuing this option. Life
                  insurance conversions allow some policyholders to convert or
                  sell a life insurance policy for cash to pay for care. Nonprofit
                  assistance programs vary by community&mdash;churches, civic
                  organizations, and local nonprofits sometimes provide financial
                  assistance or volunteer caregiving support.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 10: Can You Get Paid ─────────────────────── */}
              <section aria-labelledby="paid-caregiver">
                <SectionHeading id="paid-caregiver">
                  Can You Get Paid as a Family Caregiver?
                </SectionHeading>
                <P>
                  This is one of the most-searched questions in
                  caregiving&mdash;and the answer is yes, in many cases.
                </P>

                <H3>Medicaid Self-Directed Care Programs</H3>
                <P>
                  Most states offer Medicaid programs that allow the care
                  recipient to hire their own caregiver, including family
                  members. These are often called &ldquo;consumer-directed&rdquo;
                  or &ldquo;self-directed&rdquo; personal assistance programs.
                  Under these arrangements, your parent (or their representative)
                  recruits, hires, trains, and manages their own
                  caregiver&mdash;and that caregiver can be you, a spouse (in
                  some states), or another family member.
                </P>
                <P>
                  The pay is typically Medicaid&rsquo;s hourly rate for personal
                  care aides in your state (usually $12&ndash;$20/hour). Contact
                  your state Medicaid office or your local Area Agency on Aging
                  to ask about consumer-directed programs in your state.
                </P>

                <H3>VA Caregiver Support Programs</H3>
                <P>
                  The VA offers two caregiver support programs. The{" "}
                  <strong>
                    Program of Comprehensive Assistance for Family Caregivers
                    (PCAFC)
                  </strong>{" "}
                  provides a monthly stipend, health insurance (if you don&rsquo;t
                  have it), respite care, mental health counseling, and training.
                  Eligibility requires the veteran to have a serious injury or
                  illness incurred or aggravated in the line of duty. The{" "}
                  <strong>
                    Program of General Caregiver Support Services (PGCSS)
                  </strong>{" "}
                  is available to caregivers of veterans of all eras and provides
                  education, training, respite care, and support&mdash;but not
                  a stipend.
                </P>

                <H3>State Paid Family Leave Programs</H3>
                <P>
                  A growing number of states have paid family and medical leave
                  laws that include caregiving. As of 2026, states with some
                  form of paid family leave that covers eldercare include
                  California, Colorado, Connecticut, Delaware, Maine, Maryland,
                  Massachusetts, Minnesota, New Jersey, New York, Oregon, Rhode
                  Island, and Washington, plus Washington D.C. Benefits and
                  eligibility vary. Check your state&rsquo;s labor department.
                </P>

                <H3>Personal Care Agreements</H3>
                <P>
                  Even without Medicaid or VA involvement, families can create a{" "}
                  <strong>Personal Care Agreement</strong> (also called a
                  Caregiver Contract)&mdash;a formal written agreement between
                  the care recipient and the family caregiver that specifies
                  duties, schedule, and compensation. This is paid from the
                  parent&rsquo;s personal funds.
                </P>
                <P>
                  A Personal Care Agreement serves several important purposes:
                  it compensates the family caregiver fairly, it prevents
                  conflict among siblings about who&rsquo;s doing the work, and
                  critically, it can be part of a Medicaid spend-down strategy
                  if designed with an elder law attorney. Payments under a
                  legitimate Personal Care Agreement are considered payment for
                  services, not gifts&mdash;which means they&rsquo;re not
                  subject to Medicaid&rsquo;s look-back period. Get legal advice
                  before setting this up.
                </P>

                <CTACard
                  title="Check Medicaid and VA eligibility"
                  description="Use our free screeners to find out whether your parent qualifies for Medicaid home care funding or VA benefits."
                  buttonText="Medicaid Screener"
                  href="/tools/medicaid-screener"
                  secondary
                />
              </section>

              <SectionDivider />

              {/* ── Section 11: Agency vs. Private ───────────────────── */}
              <section aria-labelledby="agency-vs-private">
                <SectionHeading id="agency-vs-private">
                  Agency vs. Private Hire: How to Decide
                </SectionHeading>
                <P>
                  This is one of the first practical decisions you&rsquo;ll
                  make, and it has real implications for cost, quality, and your
                  own liability.
                </P>

                <H3>Hiring Through a Home Care Agency</H3>
                <H4>Advantages</H4>
                <BulletList
                  items={[
                    "Background checks and screening are handled for you",
                    "The agency carries liability insurance and workers' compensation",
                    "If a caregiver is sick or quits, the agency provides a replacement",
                    "You have a point of contact for problems",
                    "Some agencies provide supervision and care plan management",
                  ]}
                />
                <H4>Disadvantages</H4>
                <BulletList
                  items={[
                    "Higher cost (typically 20–40% more than private hire)",
                    "Less control over which specific caregiver is assigned",
                    "Caregiver turnover can mean your parent sees different faces",
                    "The agency takes a significant cut of what the caregiver earns",
                  ]}
                />
                <P>
                  <strong>Best for:</strong> Families who want convenience and
                  reduced liability, families new to home care, families managing
                  care from a distance, and situations requiring specialized care
                  (dementia, for example).
                </P>
                <P>
                  <strong>Major national agencies</strong> (listed for reference,
                  not as endorsements): Home Instead, Visiting Angels, Comfort
                  Keepers, BrightSpring Health Services, and Amedisys are among
                  the largest franchises. Quality varies by individual office and
                  caregiver, not by brand name. Always vet any agency using the
                  process described in the next section.
                </P>

                <H3>Hiring a Private (Independent) Caregiver</H3>
                <H4>Advantages</H4>
                <BulletList
                  items={[
                    "Lower hourly rate (typically $18–$28/hour vs. $30–$45 through an agency)",
                    "More control over who provides care",
                    "Continuity — the same person shows up every day",
                    "Potential for a stronger personal relationship",
                    "The caregiver earns more of what you pay",
                  ]}
                />
                <H4>Disadvantages</H4>
                <BulletList
                  items={[
                    "You are the employer — with legal obligations",
                    "You must handle background checks, scheduling, and backup coverage",
                    "No agency safety net if the caregiver is sick or leaves",
                  ]}
                />

                <H3>Your Legal Obligations as a Private Employer</H3>
                <P>
                  If you hire a caregiver directly and pay them more than
                  $2,700/year (2025 threshold), the IRS considers you a
                  household employer. Your responsibilities include:
                </P>
                <BulletList
                  items={[
                    "Payroll taxes. You must withhold and pay Social Security and Medicare taxes (FICA), and pay federal and state unemployment taxes (FUTA/SUTA).",
                    "Form I-9. You must verify the caregiver's identity and work authorization.",
                    "Form W-4. The caregiver must fill out a W-4 for income tax withholding.",
                    "Employer Identification Number (EIN). You need one from the IRS.",
                    "Workers' compensation insurance. Required in most states.",
                    "Quarterly tax filings. Schedule H with your annual return, plus state payroll filings.",
                  ]}
                />
                <P>
                  Household payroll services (like HomePay, SurePayroll, or
                  Paychex) handle most of it for $50&ndash;$100/month. The real
                  risk is ignoring these obligations&mdash;unpaid
                  &ldquo;nanny taxes&rdquo; can result in IRS penalties, and
                  lack of workers&rsquo; comp can expose you to lawsuits. See
                  IRS Publication 926 (&ldquo;Household Employer&rsquo;s Tax
                  Guide&rdquo;) for full details.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 12: Find and Vet Agency ──────────────────── */}
              <section aria-labelledby="find-vet-agency">
                <SectionHeading id="find-vet-agency">
                  How to Find and Vet a Home Care Agency
                </SectionHeading>
                <P>
                  You&rsquo;re inviting someone into your parent&rsquo;s home,
                  often to help with intimate personal care. Getting this right
                  matters deeply. Here is a systematic process.
                </P>

                <H3>Step 1: Build a Short List</H3>
                <P>
                  Start with 3&ndash;5 agencies. Sources include your
                  parent&rsquo;s doctor or hospital discharge planner, your
                  local Area Agency on Aging (call the Eldercare Locator:
                  1-800-677-1116), Medicare&rsquo;s Care Compare tool at
                  medicare.gov/care-compare (for home health agencies specifically),
                  recommendations from friends or family who&rsquo;ve used home
                  care, and online reviews (but read them critically).
                </P>

                <H3>Step 2: Verify Licensing and Insurance</H3>
                <P>
                  Ask each agency: Are you licensed in this state? Are you
                  bonded? Do you carry liability insurance? Do you carry
                  workers&rsquo; compensation insurance?
                </P>
                <Callout>
                  <strong>What &ldquo;licensed, bonded, and insured&rdquo; actually means:</strong>{" "}
                  <em>Licensed</em> means the agency has met state requirements to operate.{" "}
                  <em>Bonded</em> means a surety bond is in place that pays you if a
                  caregiver commits theft or fraud. <em>Insured</em> means the agency
                  carries general liability insurance and workers&rsquo; compensation.
                  All three are important.
                </Callout>

                <H3>Step 3: Understand Their Screening Process</H3>
                <P>
                  Ask how they screen caregivers. At minimum, a good agency
                  conducts: criminal background checks (federal and state),
                  reference checks from previous employers, verification of
                  certifications and training, drug testing, driving record check,
                  and verification of legal work authorization.
                </P>

                <H3>Step 4: Ask the Right Questions</H3>
                <P>
                  Here are 20 questions to ask any home care agency you&rsquo;re
                  considering. A good agency will answer all of these willingly
                  and specifically:
                </P>
                <NumberedList
                  items={[
                    "How long have you been in business?",
                    "Are you licensed, bonded, and insured? (Can I see proof?)",
                    "What background checks do you run on caregivers?",
                    "What training do your caregivers receive? How many hours? In what topics?",
                    "Do you provide specialized training for dementia care? For fall prevention?",
                    "How do you match caregivers with clients?",
                    "Can we meet the caregiver before they start? Can we request a different one?",
                    "What happens if our caregiver calls in sick or quits? How quickly can you provide a replacement?",
                    "What is your caregiver turnover rate?",
                    "How do you supervise caregivers? Does a nurse or care manager visit the home?",
                    "How often do you update the care plan?",
                    "What are your rates? Are there minimums (hours per visit, visits per week)?",
                    "Do you charge extra for weekends, holidays, or overnight care?",
                    "What is your cancellation policy?",
                    "Do you accept Medicaid, VA benefits, or long-term care insurance?",
                    "How do you handle complaints or concerns?",
                    "Can you provide references from current clients with similar needs?",
                    "What happens if my parent's needs change — can you increase or adjust services quickly?",
                    "Do you have a written service agreement? (Can I review it before signing?)",
                    "Are your caregivers employees or independent contractors? (Employees are better — it means the agency handles taxes, insurance, and liability.)",
                  ]}
                />

                <H3>Step 5: Use Medicare Care Compare for Home Health Agencies</H3>
                <P>
                  If your parent needs skilled home health care (nursing,
                  therapy), Medicare&rsquo;s <strong>Care Compare</strong> tool
                  at <strong>medicare.gov/care-compare</strong> provides quality
                  ratings for Medicare-certified home health agencies. Ratings
                  are on a 1&ndash;5 star scale based on quality of patient care
                  outcomes and patient experience surveys. Look for agencies
                  with 4+ stars in both categories.
                </P>
                <P>
                  Note: Care Compare only covers Medicare-certified home{" "}
                  <em>health</em> agencies, not non-medical home care agencies.
                  For non-medical home care, you&rsquo;ll rely on state licensing
                  databases, online reviews, and your own due diligence.
                </P>

                <H3>Step 6: Do a Trial Run</H3>
                <P>
                  Most good agencies allow a trial period&mdash;a few shifts
                  before you commit to a longer arrangement. Use this time to
                  observe: Is the caregiver punctual? Do they follow the care
                  plan? Do they communicate well with you and your parent? Does
                  your parent seem comfortable? Trust your parent&rsquo;s
                  instincts&mdash;and your own.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 13: Interview a Caregiver ────────────────── */}
              <section aria-labelledby="interview-caregiver">
                <SectionHeading id="interview-caregiver">
                  How to Interview a Caregiver
                </SectionHeading>
                <P>
                  Whether you&rsquo;re hiring privately or meeting a caregiver
                  assigned by an agency, an in-person interview is essential.
                  Here are 15 questions that go beyond the basics:
                </P>
                <NumberedList
                  items={[
                    "Tell me about your experience caring for older adults. What's the most challenging situation you've handled?",
                    "Have you cared for someone with [your parent's specific condition — dementia, Parkinson's, post-stroke, etc.]?",
                    "How would you handle it if my parent refused to take their medication?",
                    "How would you handle it if my parent fell?",
                    "What would you do if you noticed a sudden change in my parent's behavior or health?",
                    "Are you comfortable with [specific tasks: bathing, toileting, transfers, meal preparation]?",
                    "How do you handle personal boundaries — for example, if my parent says something rude or hurtful?",
                    "Do you have CPR and first aid certification?",
                    "Are you comfortable with pets? (If applicable)",
                    "What is your approach to communicating with families? How often would you update me?",
                    "Are you comfortable with technology? (Medication reminder apps, video calls with family, medical alert systems)",
                    "What are your availability and scheduling preferences? Can you accommodate occasional schedule changes?",
                    "Do you have reliable transportation?",
                    "Why did you leave your last caregiving position?",
                    "Can you provide references from previous clients or employers?",
                  ]}
                />
                <P>
                  <strong>What to observe beyond the answers:</strong> Does
                  the caregiver listen carefully, or interrupt? Do they make
                  eye contact? Do they speak about past clients with warmth and
                  respect? Are they comfortable with your parent
                  specifically&mdash;some caregivers are better with certain
                  personalities or conditions? If your parent is present, how
                  do they interact? A caregiver who naturally engages your
                  parent in conversation during the interview is showing you how
                  they&rsquo;ll behave on the job.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 14: Care Plan ─────────────────────────────── */}
              <section aria-labelledby="care-plan">
                <SectionHeading id="care-plan">
                  Creating a Care Plan
                </SectionHeading>
                <P>
                  A care plan is a written document that outlines exactly what
                  care your parent needs, when, and how. Think of it as the
                  instruction manual for everyone involved in your parent&rsquo;s
                  care. Without one, you&rsquo;re relying on verbal communication
                  and memory&mdash;which breaks down fast when multiple people
                  are involved.
                </P>

                <H3>What a Care Plan Should Include</H3>
                <BulletList
                  items={[
                    "Personal information: full name, date of birth, address, emergency contacts, primary care physician and specialists, pharmacy information.",
                    "Health information: current diagnoses and conditions, medication list with dosages and timing, allergies, recent hospitalizations or surgeries, mobility limitations and fall risk.",
                    "Daily routine and preferences: wake/sleep times, bathing preferences, meal preferences and dietary restrictions, activities they enjoy, TV shows or routines that comfort them, religious or cultural practices to respect.",
                    "Care tasks and schedule: which ADLs and IADLs need assistance and when, specific instructions for each task, medication schedule, appointment schedule.",
                    "Communication plan: how the caregiver should communicate updates to the family, what constitutes an emergency, where to log daily notes.",
                    "Goals of care: what is the family working toward? Maintaining independence at home? Recovery from illness? Comfort and quality of life during end of life?",
                  ]}
                />

                <H3>Updating the Care Plan</H3>
                <P>
                  A care plan is a living document. Review it monthly for the
                  first three months, then quarterly&mdash;or whenever your
                  parent&rsquo;s health changes significantly (hospitalization,
                  new diagnosis, noticeable cognitive decline, a fall). Involve
                  the caregiver, your parent (when possible), and any healthcare
                  professionals in updates.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 15: Quality, Safety, Monitoring ───────────── */}
              <section aria-labelledby="quality-safety">
                <SectionHeading id="quality-safety">
                  Quality, Safety, and Monitoring
                </SectionHeading>
                <P>
                  Once care is underway, your job shifts from hiring to
                  monitoring. Here&rsquo;s how to ensure quality stays high.
                </P>

                <H3>Signs of Good Care</H3>
                <P>
                  Your parent is clean, well-groomed, and dressed appropriately.
                  They seem comfortable with the caregiver. The home is tidy and
                  safe. Medications are being taken on schedule. Your parent&rsquo;s
                  mood and engagement are stable or improving. The caregiver
                  communicates proactively&mdash;updating you about small concerns
                  before they become big ones. Care plan tasks are being completed
                  consistently.
                </P>

                <H3>Should You Use Cameras?</H3>
                <P>
                  This is a personal and sometimes legal question. Many families
                  install cameras in common areas (living room, kitchen,
                  entrances) to monitor care remotely. This is legal in most
                  states as long as cameras are in common areas (not bathrooms
                  or bedrooms), the caregiver is informed, and you comply with
                  your state&rsquo;s recording laws (some states require
                  all-party consent for audio recording).
                </P>
                <Callout>
                  If you choose to use cameras: tell the caregiver upfront,
                  before they start. Put it in writing. Frame it as &ldquo;for
                  everyone&rsquo;s safety,&rdquo; not as surveillance. Most
                  professional caregivers are comfortable with cameras&mdash;it
                  protects them, too.
                </Callout>

                <H3>Record-Keeping</H3>
                <P>
                  Keep a care log&mdash;either a physical notebook in the home
                  or a shared digital document. Each shift, the caregiver should
                  note: tasks completed, meals eaten, medications taken, mood
                  and behavior observations, any concerns or incidents, and
                  vitals if being monitored. This log is extremely useful for tracking
                  changes over time, communicating with healthcare providers, and
                  resolving disputes about quality of care.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 16: Red Flags ─────────────────────────────── */}
              <section aria-labelledby="red-flags">
                <SectionHeading id="red-flags">
                  Red Flags and Warning Signs of Abuse
                </SectionHeading>
                <P>
                  This section is difficult but necessary. Elder abuse by
                  caregivers is real, and knowing the signs can protect your
                  parent.
                </P>

                <H3>Red Flags When Hiring an Agency</H3>
                <P>
                  Be cautious if an agency won&rsquo;t provide proof of
                  licensing, bonding, or insurance; can&rsquo;t clearly explain
                  their screening and training process; has a high volume of
                  negative online reviews with consistent themes; pressures you
                  to sign a long-term contract immediately; can&rsquo;t or
                  won&rsquo;t provide references; has caregivers classified as
                  independent contractors rather than employees; or gives vague
                  answers to the 20 questions listed above.
                </P>

                <H3>Warning Signs of Caregiver Abuse or Neglect</H3>
                <P>
                  According to the National Institute on Aging and the National
                  Center on Elder Abuse, warning signs include:
                </P>
                <H4>Physical abuse</H4>
                <P>
                  Unexplained bruises, cuts, burns, or welts&mdash;especially
                  in unusual locations. Broken bones or sprains. Overmedication
                  or undermedication. Restraint marks on wrists or ankles.
                </P>
                <H4>Emotional abuse</H4>
                <P>
                  Sudden changes in behavior or mood. Withdrawal from activities
                  or people. Fearfulness, especially around the caregiver. The
                  caregiver isolates your parent from family or friends. Your
                  parent seems hesitant to speak openly when the caregiver is
                  present.
                </P>
                <H4>Neglect</H4>
                <P>
                  Bedsores. Weight loss or dehydration. Poor hygiene. Unsanitary
                  living conditions. Unchanged adult diapers. Missed medical
                  appointments. Unrefilled prescriptions.
                </P>
                <H4>Financial exploitation</H4>
                <P>
                  Unexplained withdrawals from bank accounts. Missing valuables
                  or cash. Changes to wills or financial documents. The caregiver
                  accompanies your parent to the bank. New &ldquo;friends&rdquo;
                  taking unusual interest in your parent&rsquo;s finances.
                </P>

                <H3>What to Do If You Suspect Abuse</H3>
                <P>
                  Trust your instincts. You do not need proof to report&mdash;trained
                  investigators will handle that. Your options include: contact
                  the home care agency (if applicable); contact Adult Protective
                  Services in your state (find your local APS at
                  eldercare.acl.gov); call the Eldercare Locator at
                  1-800-677-1116; contact local law enforcement if there&rsquo;s
                  immediate danger; and consult an elder law attorney about your
                  legal options. If your parent is in immediate danger, call 911.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 17: Caregiver Turnover ───────────────────── */}
              <section aria-labelledby="turnover">
                <SectionHeading id="turnover">
                  Managing Caregiver Turnover
                </SectionHeading>
                <P>
                  Here&rsquo;s an uncomfortable truth about home care: caregiver
                  turnover in the industry is extremely high. The Home Care
                  Association of America reported a turnover rate of nearly 80%
                  in 2024. That means if an agency has 100 caregivers in
                  January, roughly 80 of those positions will turn over by
                  December.
                </P>

                <H3>Why Turnover Is So High</H3>
                <P>
                  The core issue is economics. The median annual wage for home
                  care aides is $34,900 (BLS, 2024)&mdash;well below the
                  national median of $49,500 for all workers. Many aides work
                  part-time and don&rsquo;t receive benefits. The work is
                  physically and emotionally demanding. This isn&rsquo;t a
                  reflection of the caregivers as individuals&mdash;many are
                  deeply dedicated. It&rsquo;s a structural problem.
                </P>

                <H3>How to Reduce Turnover and Retain Good Caregivers</H3>
                <BulletList
                  items={[
                    "If hiring through an agency: ask about their retention rate. Agencies that invest in training, pay above-market wages, and offer benefits tend to retain better.",
                    "Pay fairly — above the local market rate if you can afford it. Even $2–$3 more per hour can make the difference between keeping a great caregiver and losing them.",
                    "Offer consistent hours. Scheduling unpredictability is a major driver of turnover.",
                    "Treat the caregiver with respect — they're a professional, not 'the help.'",
                    "Provide paid time off if you can. Be flexible with reasonable schedule requests.",
                    "Express appreciation regularly.",
                  ]}
                />

                <StoryCard title="The Williams Family: Keeping a Great Caregiver">
                  <p>
                    When the Williams family hired Patricia to care for their
                    father James, they knew she was special. Patricia had
                    experience with Parkinson&rsquo;s patients, a gentle
                    demeanor, and a dry sense of humor that James loved. After
                    three months, Patricia mentioned she&rsquo;d been offered a
                    position elsewhere that paid $3 more per hour. The Williams
                    family matched it immediately and added two paid personal
                    days per quarter. Patricia stayed for four years&mdash;until
                    James passed away&mdash;and the family considers her part of
                    their family to this day. Their investment of $120/week extra
                    saved them the disruption, stress, and risk of cycling
                    through multiple caregivers.
                  </p>
                </StoryCard>
              </section>

              <SectionDivider />

              {/* ── Section 18: Specific Conditions ──────────────────── */}
              <section aria-labelledby="specific-conditions">
                <SectionHeading id="specific-conditions">
                  Home Care for Specific Conditions
                </SectionHeading>
                <P>
                  Different conditions require different approaches to home care.
                  Here&rsquo;s what you should know about the most common ones.
                </P>

                <H3>Dementia and Alzheimer&rsquo;s Disease</H3>
                <P>
                  Home care for someone with dementia is fundamentally different
                  from care for someone who is cognitively intact. The caregiver
                  needs specialized training in: redirecting challenging behaviors
                  (rather than arguing or correcting), managing wandering risk,
                  handling sundowning, maintaining routines and familiar
                  environments, communicating effectively when language skills
                  decline, and managing safety without being controlling.
                </P>
                <P>
                  Ask any agency or caregiver specifically about their dementia
                  training. General home care training is not sufficient. Look
                  for certifications like the Alzheimer&rsquo;s
                  Association&rsquo;s essentiALZ or Dementia Capable Care
                  training.
                </P>
                <P>
                  As dementia progresses, care needs increase significantly.
                  Families often start with a few hours of daytime supervision
                  and gradually increase to full-time or 24-hour care. At some
                  point, home care may no longer be safe or sustainable. This is
                  when many families consider{" "}
                  <ILink href="/memory-care/">memory care facilities</ILink>.
                </P>

                <H3>After a Stroke</H3>
                <P>
                  Post-stroke home care typically combines skilled home health
                  (physical therapy, occupational therapy, speech therapy&mdash;covered
                  by Medicare) with non-medical personal care (help with bathing,
                  dressing, and mobility&mdash;not covered by Medicare). The
                  first three months after a stroke are the most critical
                  recovery period.
                </P>

                <H3>After Surgery (Hip Replacement, Heart Surgery, etc.)</H3>
                <P>
                  Post-surgical home care is often temporary&mdash;4 to 12
                  weeks&mdash;and may be partially covered by Medicare if skilled
                  home health is involved. The caregiver helps with: getting in
                  and out of bed safely, bathing while protecting surgical sites,
                  medication management, preparing meals, and transportation to
                  follow-up appointments. Many families who hire home care for
                  post-surgical recovery discover the ongoing benefits and want
                  to continue even after recovery is complete.
                </P>

                <H3>Parkinson&rsquo;s Disease</H3>
                <P>
                  Parkinson&rsquo;s creates unique home care challenges because
                  symptoms fluctuate throughout the day. Caregivers need to
                  understand medication timing (Parkinson&rsquo;s medications
                  must be taken on a precise schedule), how to assist with
                  mobility during &ldquo;off&rdquo; periods, fall prevention
                  strategies, communication strategies when speech is affected,
                  and swallowing safety during meals.
                </P>

                <H3>End of Life: Home Care Combined with Hospice</H3>
                <P>
                  Many families want their loved one to die at home, surrounded
                  by family and comfort. Home care aides and hospice teams work
                  together in this scenario: hospice provides pain management,
                  symptom control, and emotional and spiritual support (covered
                  by Medicare Part A). The home care aide provides the personal
                  daily care&mdash;bathing, dressing, positioning,
                  feeding&mdash;that hospice staff don&rsquo;t have time for in
                  their visits. This combined approach allows a person to receive
                  both comfort care and personal attention in their own home
                  during their final weeks or months.
                </P>
              </section>

              <SectionDivider />

              {/* ── Section 19: Home Care vs. Other Options ───────────── */}
              <section aria-labelledby="vs-other-options">
                <SectionHeading id="vs-other-options">
                  Home Care vs. Other Care Options
                </SectionHeading>
                <P>
                  Understanding how home care compares to other options helps
                  you make the right choice&mdash;and know when it might be time
                  to transition.
                </P>

                <H3>Side-by-Side Comparison (2025 Costs)</H3>
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="text-left px-4 py-3 font-semibold"></th>
                        <th className="text-left px-4 py-3 font-semibold">Home Care</th>
                        <th className="text-left px-4 py-3 font-semibold">Assisted Living</th>
                        <th className="text-left px-4 py-3 font-semibold">Nursing Home</th>
                        <th className="text-left px-4 py-3 font-semibold">Adult Day Care</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Median Monthly Cost", "$6,160 (44 hrs/wk)", "$5,900", "$9,200–$10,300", "$1,800–$2,500"],
                        ["Setting", "Your parent's home", "Residential community", "Medical facility", "Day program"],
                        ["Medical Care", "No (separate home health)", "Limited", "24/7 nursing", "Varies"],
                        ["Supervision", "Scheduled hours only", "Staff available 24/7", "Staff available 24/7", "During program hours"],
                        ["Social Interaction", "Limited (caregiver + visits)", "Built-in community", "Built-in community", "Built-in during day"],
                        ["Personalization", "Fully customized", "Some customization", "Structured", "Structured"],
                        ["Independence", "Highest", "Moderate", "Lowest", "High (at home after hours)"],
                        ["Best For", "ADL help, strong home preference", "Moderate care needs, social benefit", "Complex medical needs", "Caregiver working during day"],
                        ["Medicare Coverage", "Skilled home health only", "No", "Short-term rehab only", "Limited"],
                        ["Medicaid Coverage", "HCBS waivers (waitlists)", "Some states, limited", "Yes (primary payer)", "Varies by state"],
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-700 border-t border-slate-100 min-w-[140px]">
                            {row[0]}
                          </td>
                          {row.slice(1).map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-slate-600 border-t border-slate-100 min-w-[130px]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 italic mb-6">
                  Sources: CareScout 2025 Cost of Care Survey, Genworth 2025
                  data. Nursing home costs reflect semi-private to private room
                  range.
                </p>

                <H3>When Home Care Is No Longer Enough</H3>
                <P>
                  Home care works beautifully for many families, sometimes for
                  years. But there comes a point for some families when it&rsquo;s
                  no longer the safest or most sustainable option. Signs include:
                  your parent needs active supervision 24 hours a day (the cost
                  of round-the-clock home care often exceeds $20,000/month),
                  wandering has become frequent and dangerous, the caregiver is
                  unable to safely manage your parent&rsquo;s physical needs,
                  your parent&rsquo;s medical needs require nursing supervision
                  that can&rsquo;t be provided intermittently, or caregiver
                  turnover has created an unstable and distressing environment.
                </P>
                <P>
                  Transitioning from home care to a facility is not a failure.
                  Many families use home care to extend the time their parent
                  can stay home, and then transition to{" "}
                  <ILink href="/assisted-living/">assisted living</ILink> or{" "}
                  <ILink href="/memory-care/">memory care</ILink> when the time
                  is right. Our{" "}
                  <ILink href="/nursing-homes/">nursing homes guide</ILink> can
                  also help you understand when skilled nursing is appropriate.
                </P>

                <CTACard
                  title="Not sure which level of care is right?"
                  description="Our Care Assessment evaluates your parent's specific situation and recommends the most appropriate level of care. Takes about 3 minutes."
                  buttonText="Take the Care Assessment"
                  href="/tools/care-assessment"
                />
              </section>

              <SectionDivider />

              {/* ── Section 20: Workforce ─────────────────────────────── */}
              <section aria-labelledby="workforce">
                <SectionHeading id="workforce">
                  The Home Care Workforce: What Families Should Know
                </SectionHeading>
                <P>
                  Understanding the realities facing home care workers helps you
                  be a better employer, set realistic expectations, and make
                  choices that lead to better care for your parent.
                </P>

                <H3>The Scale of the Workforce</H3>
                <P>
                  Home health and personal care aides are the single largest
                  occupation in America&mdash;4.3 million workers as of 2024
                  (Bureau of Labor Statistics). The BLS projects 17% job growth
                  over the next decade, far faster than average, with 765,800
                  job openings per year. This is driven by the aging of the baby
                  boomer generation: 10,000 Americans turn 65 every day, and
                  that pace won&rsquo;t slow until the mid-2030s.
                </P>

                <H3>The Pay Problem</H3>
                <P>
                  Despite the critical nature of the work, the median annual
                  wage for home care aides is $34,900&mdash;about 30% below the
                  national median for all workers. Nearly half work part-time,
                  and many don&rsquo;t receive employer-sponsored health
                  insurance. This creates a painful paradox: the people we trust
                  with our parents&rsquo; most intimate care are among the
                  lowest-paid workers in the economy. It also explains why
                  turnover is so high and why finding good caregivers can be
                  difficult.
                </P>

                <H3>What This Means for You</H3>
                <P>
                  You may experience difficulty finding available caregivers,
                  especially in rural areas. Wait times with agencies can be
                  weeks. Quality varies widely. And the caregiver you love may
                  leave for a job that pays better. This isn&rsquo;t a reason to
                  despair&mdash;it&rsquo;s a reason to be proactive. Start your
                  search early, be willing to pay fairly, treat caregivers with
                  the professionalism and respect they deserve, and have backup
                  plans in place.
                </P>

                <H3>The CARE Act</H3>
                <P>
                  The CARE (Caregiver Advise, Record, Enable) Act has been
                  adopted by 44 states and territories. It requires hospitals to
                  record the name of the family caregiver in the patient&rsquo;s
                  medical record, inform the family caregiver when the patient is
                  being discharged, and provide education and instruction to the
                  family caregiver on medical tasks they&rsquo;ll need to perform
                  at home. If your parent is hospitalized, make sure the hospital
                  knows you&rsquo;re the family caregiver and insist on proper
                  discharge training. This is your legal right in most states.
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

              <SectionDivider />

              {/* ── Section 22: Take the Next Step ───────────────────── */}
              <section className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-800 mb-5 leading-snug">
                  Take the Next Step
                </h2>
                <P>
                  This guide has covered a lot of ground&mdash;from what home
                  care is and what it costs, to how to hire, how to pay, and how
                  to ensure quality. If you&rsquo;re still working through the
                  decision, here are three things you can do right now:
                </P>

                <div className="grid sm:grid-cols-3 gap-4 my-8">
                  <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-teal-700 font-bold text-sm">1</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-2">
                      Assess your parent&rsquo;s needs
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                      Our Care Assessment walks you through a guided evaluation
                      and recommends the most appropriate level of care. Takes
                      about 3 minutes.
                    </p>
                    <Link
                      href="/tools/care-assessment"
                      className="text-sm font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2"
                    >
                      Take the Assessment →
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-teal-700 font-bold text-sm">2</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-2">
                      Understand costs in your area
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                      Our Cost of Care Calculator shows what home care, assisted
                      living, and other options cost in your specific zip code.
                    </p>
                    <Link
                      href="/tools/cost-calculator"
                      className="text-sm font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2"
                    >
                      Use the Calculator →
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5 bg-white">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-teal-700 font-bold text-sm">3</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-2">
                      Check financial assistance options
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                      Our{" "}
                      <ILink href="/tools/medicaid-screener">
                        Medicaid Screener
                      </ILink>{" "}
                      and{" "}
                      <ILink href="/tools/va-benefits">
                        VA Benefits Calculator
                      </ILink>{" "}
                      can tell you whether your parent may qualify for coverage.
                    </p>
                    <Link
                      href="/tools/medicaid-screener"
                      className="text-sm font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2"
                    >
                      Check Medicaid Eligibility →
                    </Link>
                  </div>
                </div>

                <P>
                  The decision to bring in home care is an act of love&mdash;for
                  your parent and for yourself. It acknowledges that aging
                  happens, that asking for help is strength, and that your parent
                  deserves dignity, comfort, and connection in their own home.
                  They took care of you. Now it&rsquo;s your turn. We&rsquo;ll
                  help you do it right.
                </P>

                {/* Source attribution */}
                <p className="text-xs text-slate-400 italic mt-8 leading-relaxed">
                  This guide was last updated in March 2026. Cost data is from
                  the CareScout 2025 Cost of Care Survey. Workforce data is from
                  the Bureau of Labor Statistics (2024). Caregiver statistics
                  are from AARP&rsquo;s Caregiving in the U.S. 2025 report.
                  Medicaid waitlist data is from the Kaiser Family Foundation
                  (2025). VA benefit rates are effective December 1, 2025. We
                  update this guide regularly as new data becomes available.{" "}
                  Have a question we didn&rsquo;t cover?{" "}
                  <Link
                    href="/contact"
                    className="text-teal-600 hover:text-teal-800 underline underline-offset-2"
                  >
                    Contact us
                  </Link>{" "}
                  and we&rsquo;ll add it.
                </p>
              </section>

            </article>

            {/* ── Desktop sticky sidebar ─────────────────────────── */}
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
            Get a personalized recommendation for your loved one&apos;s specific
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
