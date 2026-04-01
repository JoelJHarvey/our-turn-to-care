import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/aging-in-place/FAQAccordion";

export const metadata: Metadata = {
  title:
    "Aging in Place: The Complete Guide to Helping Your Parent Stay Home Safely | OurTurnToCare",
  description:
    "A complete guide to aging in place. Room-by-room safety checklist, costs, fall prevention, dementia care, technology, legal planning, and how to pay for it all.",
};

// ── FAQ data (also used for JSON-LD schema) ────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How much does it cost to age in place?",
    a: "It depends on the level of support needed. Light support (medical alert, meal delivery, minimal home care) might cost $500–$850 per month. Moderate support with daily help runs $2,800–$5,250 per month. Full-time care at home costs $6,000–$9,000+ per month. Home modifications are a separate one-time cost ranging from $2,000–$30,000 for most families. Even with significant support, aging in place typically costs less than facility care until 24/7 supervision is needed.",
  },
  {
    q: "Is aging in place cheaper than assisted living?",
    a: "In most cases, yes — often significantly cheaper. Assisted living averages $4,500–$6,000 per month nationally. Aging in place with moderate support typically costs $2,500–$4,000 per month. However, if your parent needs 24/7 care, facility care may be more cost-effective.",
  },
  {
    q: "What percentage of seniors want to age in place?",
    a: "About 75% of adults age 50+ and 90% of those age 65+ prefer to age in their own home, according to AARP research.",
  },
  {
    q: "At what age should you start planning for aging in place?",
    a: "Ideally, in your 50s or early 60s — before any health crisis forces rushed decisions. At minimum, start planning when you first notice your parent slowing down or having difficulty with any daily activities.",
  },
  {
    q: "Does Medicare pay for home modifications?",
    a: "Medicare does not cover home modifications like grab bars, ramps, or bathroom remodels. However, Medicare does cover durable medical equipment (walkers, wheelchairs, hospital beds) when prescribed by a doctor. Medicaid HCBS waivers, VA grants, and other programs may cover home modifications.",
  },
  {
    q: "What are the most important home modifications for aging in place?",
    a: "The highest-impact modifications are bathroom grab bars and a walk-in shower, improved lighting throughout the home, removal of trip hazards, a medical alert system, and stove safety devices. These address the most common accidents and are relatively affordable.",
  },
  {
    q: "How much does it cost to make a home accessible for a senior?",
    a: "A basic safety package (grab bars, lighting, trip hazard removal) costs $500–$2,000. A moderate package runs $5,000–$15,000. Comprehensive accessibility renovation can cost $30,000–$100,000+. Most families fall in the $2,000–$10,000 range.",
  },
  {
    q: "Are home modifications for seniors tax deductible?",
    a: "Some modifications may qualify as medical expense deductions if medically necessary and prescribed by a doctor. The deductible amount is the cost minus any increase in home value. Medical expenses must exceed 7.5% of AGI. Consult a tax professional.",
  },
  {
    q: "What is the PACE program?",
    a: "PACE (Program of All-Inclusive Care for the Elderly) is a full-service care program for people age 55+ who qualify for nursing home care but can live safely at home with support. It provides medical care, adult day services, transportation, home care, prescriptions, and more — often at no cost for those who qualify for both Medicare and Medicaid. Visit NationalPACEAssociation.org to find programs near you.",
  },
  {
    q: "Does Medicaid cover aging in place?",
    a: "Yes, through Home and Community-Based Services (HCBS) waivers. These cover in-home care, home modifications, adult day programs, medical alert systems, and other services for qualifying seniors. Eligibility and covered services vary by state.",
  },
  {
    q: "Can I use my parent's long-term care insurance for aging in place?",
    a: "Most long-term care insurance policies cover in-home care, adult day programs, and sometimes home modifications. Benefits are typically triggered when the insured cannot perform two or more activities of daily living independently or has a cognitive impairment.",
  },
  {
    q: "What VA benefits help with aging in place?",
    a: "The VA's Aid and Attendance benefit provides up to $2,431/month for eligible veterans who need help with daily activities. HISA grants cover up to $6,800 in home modifications for veterans with service-connected disabilities. The VA also provides home health care and homemaker services.",
  },
  {
    q: "What's the difference between a home care aide and a home health aide?",
    a: "A home care aide helps with non-medical tasks: bathing, dressing, meal preparation, housekeeping, companionship. A home health aide has additional medical training and can perform basic health monitoring under nursing supervision, typically as part of a Medicare-covered plan prescribed by a doctor.",
  },
  {
    q: "How do I find a good caregiver?",
    a: "Start with your Area Agency on Aging for referrals, or contact home care agencies in your area. Always conduct thorough background checks, check references, and do a trial period before committing. The most important qualities are reliability, patience, genuine warmth, and good communication.",
  },
  {
    q: "What is an Area Agency on Aging?",
    a: "Area Agencies on Aging (AAAs) are local organizations funded by the federal Older Americans Act. They coordinate meals, transportation, caregiver support, benefits counseling, home repair programs, and much more for seniors. Find yours by calling 1-800-677-1116 or visiting eldercare.acl.gov.",
  },
  {
    q: "How do I prevent falls at home for an elderly parent?",
    a: "Combine multiple strategies: remove tripping hazards and install grab bars, improve lighting, have medications reviewed for fall-risk side effects, encourage balance-building exercise (Tai Chi is evidence-based), update vision and hearing prescriptions, ensure proper footwear, and install a medical alert system.",
  },
  {
    q: "Can someone with dementia age in place?",
    a: "It depends on the stage. Early-stage dementia can often be managed at home with daily check-ins, medication management, and safety modifications. Mid-stage requires daily in-home care and thorough safety measures. Late-stage usually requires 24/7 care, which is often more practical in a memory care facility.",
  },
  {
    q: "How do I know when aging in place is no longer safe?",
    a: "Key warning signs: multiple falls, safety incidents (leaving the stove on, wrong medications, letting strangers in), wandering, severe caregiver burnout, increasing isolation, refusal to accept needed care, or any situation requiring constant supervision that isn't being provided.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// ── TOC entries ────────────────────────────────────────────────────────────

const TOC = [
  { label: "What Aging in Place Means", id: "what-it-means" },
  { label: "Aging in Place by the Numbers", id: "by-the-numbers" },
  { label: "Is Aging in Place Right for Your Loved One?", id: "is-it-right" },
  { label: "Aging in Place vs. Other Care Options", id: "vs-other-options" },
  { label: "Room-by-Room Home Safety Checklist", id: "room-by-room" },
  { label: "Fall Prevention: The #1 Safety Priority", id: "fall-prevention" },
  { label: "Aging in Place with Dementia", id: "dementia" },
  { label: "Technology That Makes Aging in Place Safer", id: "technology" },
  { label: "Support Services for Aging in Place", id: "support-services" },
  { label: "How to Hire and Manage In-Home Care", id: "hire-manage-care" },
  { label: "Community Resources Most Families Don't Know About", id: "community-resources" },
  { label: "Caregiver Support: Taking Care of Yourself Too", id: "caregiver-support" },
  { label: "What Does Aging in Place Cost?", id: "costs" },
  { label: "How to Pay for Aging in Place", id: "how-to-pay" },
  { label: "Legal and Advance Planning", id: "legal-planning" },
  { label: "Emergency Planning for Aging in Place", id: "emergency-planning" },
  { label: "When Aging in Place Is No Longer Enough", id: "when-no-longer-enough" },
  { label: "Aging in Place with Specific Health Conditions", id: "specific-conditions" },
  { label: "Frequently Asked Questions", id: "faq" },
];

// ── Reusable sub-components ────────────────────────────────────────────────

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
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
    <p className="text-[1.0625rem] leading-[1.75] text-slate-600 mb-5">{children}</p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 mb-5 pl-1">{children}</ul>;
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[1.0625rem] leading-[1.75] text-slate-600">
      <span className="text-teal-500 flex-shrink-0 mt-1">•</span>
      <span>{children}</span>
    </li>
  );
}

function ILink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
      {children}
    </Link>
  );
}

function ResponsiveTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
      <table className="w-full text-sm min-w-[400px]">{children}</table>
    </div>
  );
}

function TH({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-slate-700 bg-slate-100 first:rounded-tl-xl last:rounded-tr-xl">
      {children}
    </th>
  );
}

function TD({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-slate-600 border-t border-slate-100">{children}</td>;
}

function SectionDivider() {
  return <hr className="my-12 border-slate-100" />;
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure what care is right?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Answer a few questions and get a personalized recommendation in about 4 minutes.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">Free planning tools</p>
        <ul className="space-y-2">
          {[
            { label: "Cost Calculator", href: "/tools/cost-calculator/" },
            { label: "Medicaid Screener", href: "/tools/medicaid-screener/" },
            { label: "VA Benefits Calculator", href: "/tools/va-benefits/" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors"
              >
                {label} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────

export default function AgingInPlacePage() {
  return (
    <>
      {/* FAQ JSON-LD structured data */}
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
            <span className="text-slate-700 font-medium">Aging in Place</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Aging in Place: The Complete Guide to Helping Your Parent Stay Home Safely
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[640px]">
            Room-by-room safety checklist, fall prevention, dementia care, technology,
            how to pay for it all — and how to know when it&rsquo;s time for something different.
          </p>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            {/* ── Main article ──────────────────────────────────────────── */}
            <article className="lg:flex-1 min-w-0">

              {/* Intro */}
              <div className="prose-content mb-10">
                <P>
                  When your parent or loved one starts needing more help, the big question
                  often isn&rsquo;t &ldquo;what care do they need?&rdquo; but rather
                  &ldquo;where should they receive it?&rdquo; For many adult children, the
                  answer is clear: at home. Aging in place, the ability to continue living
                  in one&rsquo;s own home while receiving the care and support needed, has
                  become the preference for the vast majority of seniors and their families.
                  It&rsquo;s often less expensive than moving to a facility, allows your loved
                  one to remain in familiar surroundings with family and friends nearby, and
                  frequently leads to better emotional and physical outcomes.
                </P>
                <P>
                  But aging in place isn&rsquo;t automatic. It requires thoughtful planning,
                  the right modifications, and a coordinated support system. And it requires
                  honesty about what&rsquo;s working, what isn&rsquo;t, and when the plan
                  needs to change.
                </P>
                <P>
                  This guide covers everything you need to know: whether aging in place is
                  realistic for your situation, exactly what changes your home might need
                  (room by room), how to find and pay for services, what technology can help,
                  how to handle the legal side, and how to recognize when it&rsquo;s time for
                  something different. We wrote it to be the only resource you need.
                </P>
              </div>

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
                        <span className="font-semibold text-teal-400 flex-shrink-0 w-5 text-right">
                          {i + 1}.
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── Section 1 ─────────────────────────────────────────── */}
              <SectionHeading id="what-it-means">
                What Does &ldquo;Aging in Place&rdquo; Mean?
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Aging in place means your parent or loved one continues living in their own
                  home (whether that&rsquo;s a house, apartment, or condo) while receiving
                  the modifications, equipment, and services they need to do so safely.
                  It&rsquo;s not about managing completely independently. Rather, it&rsquo;s
                  about creating an environment where they can maintain their dignity,
                  independence, and quality of life with the right support system around them.
                </P>
                <P>
                  The &ldquo;support system&rdquo; is key. Aging in place works when you
                  combine home modifications (like grab bars or improved lighting), adaptive
                  equipment (walkers, medical alert systems), and services (part-time caregivers,
                  meal delivery, transportation). The combination depends entirely on your loved
                  one&rsquo;s needs, your family&rsquo;s capacity, and your budget.
                </P>
                <P>
                  It also aligns with how modern healthcare is evolving. More medical care can
                  be delivered at home now than ever before: telehealth visits, remote patient
                  monitoring, home-based physical therapy, and even hospital-at-home programs.
                  The technology and service infrastructure supporting aging in place in 2026 is
                  dramatically better than it was even five years ago.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 2 ─────────────────────────────────────────── */}
              <SectionHeading id="by-the-numbers">
                Aging in Place by the Numbers
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Understanding the scale of aging in place helps put your family&rsquo;s
                  situation in context. You are far from alone in this.
                </P>
                <P>
                  <strong className="text-slate-800">The preference is overwhelming.</strong>{" "}
                  According to AARP&rsquo;s 2024 Home and Community Preferences Survey, 75%
                  of adults age 50 and older want to remain in their current home as they age.
                  Among those 65 and older, that number rises to 90%. This isn&rsquo;t a trend.
                  It&rsquo;s the dominant preference.
                </P>
                <P>
                  <strong className="text-slate-800">But most homes aren&rsquo;t ready.</strong>{" "}
                  Only about 10% of U.S. housing stock is currently equipped to fully accommodate
                  the needs of older adults. Fewer than one in five homes have a no-step entry.
                  The gap between where people want to age and how prepared their homes are is
                  enormous. It&rsquo;s an opportunity for families who plan ahead.
                </P>
                <P>
                  <strong className="text-slate-800">Falls are the biggest threat.</strong>{" "}
                  The CDC reports approximately 14 million adults age 65 and older fall each
                  year — roughly 1 in 4. Of those, 3 million are treated in emergency
                  departments and approximately 39,000 die from fall-related injuries annually.
                  Falling once doubles your risk of falling again. The total annual cost of
                  fall-related injuries exceeds $80 billion.
                </P>
                <P>
                  <strong className="text-slate-800">The financial picture favors staying home.</strong>{" "}
                  The 2025 CareScout Cost of Care Survey puts the national median cost of
                  non-medical home care at approximately $35 per hour. For many families, aging
                  in place with moderate support costs a fraction of assisted living
                  ($4,500–$6,000/month) or nursing home care ($8,000–$12,000+/month).
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 3 ─────────────────────────────────────────── */}
              <SectionHeading id="is-it-right">
                Is Aging in Place Right for Your Loved One?
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Aging in place isn&rsquo;t suitable for everyone, and recognizing that early
                  can save your family from frustration, safety risks, and unnecessary expense.
                  The right fit depends on several factors worth going through honestly.
                </P>
                <H3>Physical ability</H3>
                <P>
                  If your parent can walk (even with a walker), use the bathroom with minimal
                  assistance, and doesn&rsquo;t require constant monitoring, aging in place
                  becomes much more feasible. Homes can be modified to accommodate mobility
                  challenges. However, if your parent is bedbound, requires two-person
                  transfers, or has unpredictable medical needs that demand immediate
                  professional response, a facility with 24/7 clinical staffing may be safer.
                </P>
                <H3>Cognitive status</H3>
                <P>
                  Early-stage memory loss or mild cognitive impairment can often be managed
                  at home with proper oversight. But if your parent has moderate to advanced
                  dementia, wanders, or poses a safety risk to themselves, aging in place
                  becomes dangerous without 24/7 supervision — which is expensive and often
                  unsustainable. We cover this in detail in the{" "}
                  <a href="#dementia" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">
                    Aging in Place with Dementia
                  </a>{" "}
                  section.
                </P>
                <H3>Home layout and accessibility</H3>
                <P>
                  A single-story home or one with a bedroom and full bathroom on the main
                  floor is far easier to adapt than a multi-story house. Homes with narrow
                  doorways, multiple flights of stairs, or poor lighting pose bigger
                  challenges. Some homes simply can&rsquo;t be adapted affordably. And that
                  matters.
                </P>
                <H3>Your family&rsquo;s capacity</H3>
                <P>
                  Aging in place often requires family involvement. If you live far away,
                  work full-time, or already feel stretched thin, you need to plan for paid
                  services to fill those gaps. Pretending family will provide care you
                  can&rsquo;t actually sustain leads to unsafe situations and caregiver
                  burnout.
                </P>
                <H3>Your parent&rsquo;s own wishes</H3>
                <P>
                  Don&rsquo;t assume your parent wants to stay home just because most seniors
                  do. Ask them directly. Some are fiercely independent; others would thrive in
                  a community setting with built-in activities and friendships.
                </P>
              </div>
              <div className="bg-teal-50 rounded-xl px-5 py-4 mb-12">
                <p className="text-sm text-teal-800 leading-relaxed">
                  Our{" "}
                  <ILink href="/tools/care-assessment">free Care Assessment</ILink> can help
                  you evaluate whether aging in place is realistic and identify where
                  you&rsquo;ll need support.
                </p>
              </div>

              <SectionDivider />

              {/* ── Section 4 ─────────────────────────────────────────── */}
              <SectionHeading id="vs-other-options">
                Aging in Place vs. Other Care Options
              </SectionHeading>
              <div className="prose-content">
                <H3>Aging in Place vs. Assisted Living</H3>
                <P>
                  Assisted living provides a private apartment, meals, social activities, and
                  help with daily activities. The national median is $4,500–$6,000 per month.
                  Aging in place typically costs less, especially if your parent needs only
                  moderate support. But if your parent needs 12+ hours per day of home care,
                  the math can flip: at $35/hour, that quickly exceeds what assisted living
                  costs, and your parent still doesn&rsquo;t get a built-in social life.
                </P>
                <P>
                  Where aging in place wins: cost (for moderate needs), independence,
                  familiarity, keeping pets, maintaining community ties. Where assisted living
                  wins: 24/7 staff, no home maintenance, structured activities that prevent
                  isolation, better outcomes for people who are already significantly isolated.
                </P>
                <H3>Aging in Place vs. Moving In with Family</H3>
                <P>
                  Moving a parent in with an adult child can work beautifully, or it can strain
                  relationships to the breaking point. The key factors are physical space,
                  realistic expectations about caregiving duties, financial arrangements, and
                  explicit conversations about boundaries and an exit strategy if it stops
                  working. The hidden costs are significant: home modifications, potential
                  reduced income for a family caregiver, and relationship stress.
                </P>
                <H3>Aging in Place vs. Independent Living Communities</H3>
                <P>
                  Independent living (55+ communities) is for seniors who don&rsquo;t need
                  help with daily activities but want a maintenance-free lifestyle with social
                  opportunities. Costs range from $1,500–$5,000+ per month. Worth considering
                  if isolation is the primary concern with aging in place, or if maintaining a
                  house is becoming too much.
                </P>
                <H3>Aging in Place vs. CCRCs</H3>
                <P>
                  Continuing care retirement communities offer a continuum from independent
                  living through skilled nursing on one campus. The advantage is never having
                  to relocate as needs change. The disadvantage is cost: large upfront entrance
                  fees ($100,000–$500,000+) plus monthly fees ($3,000–$6,000+). Works best as
                  a proactive plan made while your parent is still healthy.
                </P>
              </div>
              <div className="bg-slate-50 rounded-xl px-5 py-4 mb-12">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get costs specific to your area with our{" "}
                  <ILink href="/tools/cost-calculator">Cost Calculator →</ILink>
                </p>
              </div>

              <SectionDivider />

              {/* ── Section 5 ─────────────────────────────────────────── */}
              <SectionHeading id="room-by-room">
                Room-by-Room Home Safety Checklist
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Safe aging in place starts with a thorough assessment of every room your
                  parent uses regularly. Walk through their home with fresh eyes and this
                  checklist.
                </P>

                <H3>Bathroom</H3>
                <P>
                  The bathroom is where the most serious fall injuries happen among seniors.
                  Wet, slippery surfaces combined with transitions (stepping in and out of a
                  tub) and hard surfaces make this the highest-priority room.
                </P>
                <UL>
                  <LI>
                    <strong>Grab bars</strong> near the toilet and in the shower — mounted
                    into wall studs, not just drywall. $20–$50 per bar plus $100–$200
                    professional installation.
                  </LI>
                  <LI>
                    <strong>Walk-in shower conversion</strong> — replace a standard tub with
                    a curbless or low-threshold walk-in shower with a bench and handheld
                    showerhead. This single modification prevents more fall injuries than
                    almost anything else. Cost: $3,000–$8,000.
                  </LI>
                  <LI>
                    <strong>Non-slip flooring</strong> and adhesive strips on the floor and
                    inside the shower. Avoid bath mats that can bunch up.
                  </LI>
                  <LI>
                    <strong>Raised toilet seat</strong> or comfort-height toilet (17–19
                    inches). A raised seat attachment costs $30–$80; a new toilet is
                    $200–$500 installed.
                  </LI>
                  <LI>
                    <strong>Bright lighting</strong> — well-lit with no shadows, especially
                    around the toilet and shower. Night light for middle-of-the-night trips.
                  </LI>
                  <LI>
                    <strong>Non-locking door</strong> or one that can be unlocked from outside
                    in case of a fall.
                  </LI>
                  <LI>
                    <strong>Lever-style faucet handles</strong> that don&rsquo;t require grip
                    strength to turn.
                  </LI>
                </UL>

                <H3>Kitchen</H3>
                <UL>
                  <LI>
                    Reorganize storage so frequently used items are between waist and shoulder
                    height — no overhead reaching or bending to floor-level cabinets for
                    everyday items.
                  </LI>
                  <LI>
                    <strong>Auto-shutoff stove guard</strong> (StoveGuard, FireAvert) — detects
                    unattended cooking and shuts off the stove. Non-negotiable for any senior
                    with cognitive decline. Cost: $200–$400.
                  </LI>
                  <LI>
                    Good <strong>task lighting</strong> under cabinets and over the stove and
                    sink. Aging eyes need 2–3× more light than younger eyes.
                  </LI>
                  <LI>
                    <strong>Anti-scald valve</strong> on faucets and water heater (set to
                    120°F or below).
                  </LI>
                  <LI>
                    <strong>Lightweight pots, pans, and dishes</strong> — heavy cast iron
                    becomes dangerous when grip strength declines.
                  </LI>
                  <LI>
                    <strong>Electric kettle</strong> instead of stovetop — auto-shutoff
                    eliminates a common burn risk.
                  </LI>
                </UL>

                <H3>Bedroom</H3>
                <UL>
                  <LI>
                    <strong>Bed height</strong> should be 17–23 inches from floor to top of
                    mattress (roughly knee height). Too low is hard to rise from; too high
                    risks sliding off. Adjustable bed risers: $15–$30.
                  </LI>
                  <LI>
                    <strong>Bed rail or assist handle</strong> for the sit-to-stand transition.
                    $40–$100.
                  </LI>
                  <LI>
                    Clear, unobstructed <strong>path from bed to bathroom</strong> — minimum
                    36 inches wide if using a walker. No rugs, cords, or shoes.
                  </LI>
                  <LI>
                    <strong>Motion-activated nightlights</strong> along the bed-to-bathroom
                    path. Middle-of-the-night bathroom trips are a high-risk fall time.
                    $10–$20 each.
                  </LI>
                  <LI>
                    <strong>Lamp or light switch within arm&rsquo;s reach</strong> of the
                    bed — never walk in the dark to a light switch.
                  </LI>
                  <LI>
                    <strong>Phone and medical alert device</strong> within reach from the bed.
                  </LI>
                </UL>

                <H3>Living Room</H3>
                <UL>
                  <LI>
                    <strong>Wide, clear pathways</strong> — at least 36 inches for walker use,
                    48 inches for wheelchair. Remove furniture that creates navigation obstacles.
                  </LI>
                  <LI>
                    <strong>Lift chair</strong> (motorized recliner that tilts forward to help
                    standing) if low, soft sofas are a problem. Cost: $800–$2,000.
                  </LI>
                  <LI>
                    <strong>Secure all electrical cords</strong> against walls. No cords
                    crossing walkways.
                  </LI>
                  <LI>
                    Remove or secure all <strong>area rugs</strong>. The number of falls caused
                    by loose rugs is staggering.
                  </LI>
                </UL>

                <H3>Entryway, Stairs & Garage</H3>
                <UL>
                  <LI>
                    <strong>Ramp or zero-step entry</strong> if there are steps at the door.
                    Proper slope ratio is 1:12. Cost: $1,000–$8,000 depending on length.
                  </LI>
                  <LI>
                    <strong>Handrails on both sides</strong> of any exterior steps, extending
                    beyond the top and bottom step.
                  </LI>
                  <LI>
                    <strong>Motion-sensor exterior lighting</strong> that illuminates the full
                    path from the driveway to the front door.
                  </LI>
                  <LI>
                    <strong>Keyless entry</strong> — eliminates fumbling with keys in the dark
                    or with arthritic hands. Cost: $100–$300.
                  </LI>
                  <LI>
                    <strong>Stairlift</strong> if interior stairs are regularly used. Straight
                    staircase: $3,000–$5,000. Curved: $8,000–$15,000+.
                  </LI>
                  <LI>
                    <strong>High-contrast strip</strong> on each step edge — critical for
                    seniors with depth perception issues. Self-adhesive tape costs $10–$20 per
                    stairway.
                  </LI>
                </UL>

                <H3>Whole-Home Modifications</H3>
                <UL>
                  <LI>
                    <strong>Lever door handles</strong> replacing round knobs throughout.
                    $10–$30 per handle.
                  </LI>
                  <LI>
                    <strong>Widen doorways</strong> to at least 32 inches. Offset hinges
                    ($15–$30 per door) add 2 inches of clearance without construction.
                  </LI>
                  <LI>
                    <strong>Smoke and CO detectors</strong> on every level with your phone
                    alerts enabled.
                  </LI>
                  <LI>
                    <strong>Phone or medical alert device</strong> accessible from every room.
                    Your parent should never be more than a few steps from a way to call for help.
                  </LI>
                </UL>
              </div>

              <SectionDivider />

              {/* ── Section 6 ─────────────────────────────────────────── */}
              <SectionHeading id="fall-prevention">
                Fall Prevention: The #1 Safety Priority
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Falls are the single most common and most dangerous threat to aging in
                  place. The CDC&rsquo;s data is sobering: roughly 1 in 4 adults age 65+
                  fall each year. Falls are the leading cause of traumatic brain injury and
                  hip fracture in older adults, resulting in approximately 39,000 deaths
                  annually. Once a senior falls, their risk of falling again doubles.
                </P>
                <P>
                  That last statistic should change how you think about every room in the house.
                </P>
                <H3>The biggest risk factors</H3>
                <P>
                  Falls are almost always the result of multiple factors combining:
                </P>
                <UL>
                  <LI>
                    <strong>Medications:</strong> Seniors taking four or more prescriptions
                    have significantly higher fall rates. Blood pressure medications, sedatives,
                    sleep aids, antidepressants, and antihistamines are particularly risky. Ask
                    your parent&rsquo;s doctor or pharmacist for a full medication
                    review focused on fall risk.
                  </LI>
                  <LI>
                    <strong>Muscle weakness and balance problems</strong> — Especially if your
                    parent is sedentary. Loss of lower-body strength is one of the strongest
                    predictors of falls. The good news: strength and balance can be improved at
                    any age.
                  </LI>
                  <LI>
                    <strong>Vision problems</strong> — Aging eyes need more light, have reduced
                    depth perception, and adapt slowly to lighting changes. Bifocal and
                    progressive lenses can distort depth perception on stairs. Annual eye exams
                    matter.
                  </LI>
                  <LI>
                    <strong>Hearing loss:</strong> The inner ear plays a role in balance. Mild
                    hearing loss has been associated with increased fall risk. Hearing aids may
                    improve balance as well as communication.
                  </LI>
                  <LI>
                    <strong>Footwear</strong> — Socks on smooth floors, bare feet, or worn-out
                    shoes are dangerous. The safest footwear is a well-fitting, non-slip shoe
                    with a low heel and firm heel counter.
                  </LI>
                </UL>
                <H3>What actually reduces falls</H3>
                <UL>
                  <LI>
                    <strong>Exercise, especially Tai Chi:</strong> Multiple clinical trials
                    show Tai Chi reduces falls by 20–40% in older adults. It improves balance,
                    strength, and confidence simultaneously. Many senior centers offer classes
                    specifically for fall prevention.
                  </LI>
                  <LI>
                    <strong>Physical therapy</strong> — Appropriate for seniors who have already
                    fallen or who have specific balance or gait problems. Medicare covers PT when
                    prescribed by a doctor.
                  </LI>
                  <LI>
                    <strong>Medication review:</strong> Asking &ldquo;can we reduce or change
                    any of these medications to lower fall risk?&rdquo; is one of the most
                    effective single interventions.
                  </LI>
                  <LI>
                    <strong>Home modifications</strong> addressing the specific hazards in your
                    parent&rsquo;s home (see the room-by-room checklist above).
                  </LI>
                  <LI>
                    <strong>Vision correction</strong> — Updated prescriptions and cataract
                    surgery when appropriate.
                  </LI>
                </UL>
                <P>
                  The most effective approach combines multiple strategies. No single
                  intervention works as well as combining several of them together.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 7 ─────────────────────────────────────────── */}
              <SectionHeading id="dementia">
                Aging in Place with Dementia
              </SectionHeading>
              <div className="prose-content">
                <P>
                  If your parent has been diagnosed with Alzheimer&rsquo;s disease or another
                  form of dementia, the question of aging in place becomes more complex — but
                  not impossible, especially in the earlier stages.
                </P>
                <H3>When can someone with dementia safely age in place?</H3>
                <P>
                  <strong>Early-stage</strong>: Your parent may have memory lapses and
                  difficulty with complex tasks, but can manage basic daily activities and
                  follow safety instructions. Aging in place is generally feasible with daily
                  check-ins, medication management assistance, driving assessment, and safety
                  modifications. This is also the time to plan ahead.
                </P>
                <P>
                  <strong>Mid-stage</strong>: Your parent needs help with daily activities,
                  may not recognize familiar people consistently, and may begin wandering.
                  Aging in place is possible but requires substantially more support —
                  typically daily in-home care and thorough safety modifications.
                </P>
                <P>
                  <strong>Late-stage</strong>: Round-the-clock care at home typically costs
                  $15,000–$25,000+ per month. For most families, memory care ($5,000–$8,000/month)
                  becomes more practical and often provides better specialized care.
                </P>
                <H3>Dementia-specific home safety modifications</H3>
                <UL>
                  <LI>
                    <strong>Wandering prevention:</strong> Deadbolts placed high or low (out
                    of usual sight line), door alarms, GPS tracking devices (watch, pendant, or
                    shoe insert). Register with the Alzheimer&rsquo;s Association&rsquo;s
                    MedicAlert + Wandering Support program.
                  </LI>
                  <LI>
                    <strong>Kitchen safety:</strong> Automatic stove shutoff, locked or
                    removed knobs when not in use, picture labels on cabinets, remove
                    poisonous cleaning products.
                  </LI>
                  <LI>
                    <strong>Simplify the environment</strong> — Remove unnecessary furniture,
                    simplify décor, ensure a clear path between bedroom, bathroom, and main
                    living area. Consistency reduces confusion.
                  </LI>
                  <LI>
                    <strong>Secure medications:</strong> All medications should be locked
                    and dispensed by a caregiver or automated medication dispenser.
                  </LI>
                  <LI>
                    <strong>Manage sundowning</strong> — Keep the home well-lit in the
                    evening, close curtains at dusk to reduce shadows, maintain a calm and
                    predictable evening routine.
                  </LI>
                </UL>
                <P>
                  Aging in place with dementia requires ongoing, honest reassessment. The
                  disease progresses, and what worked six months ago may not work today.
                  Transitioning to memory care is not failure — it&rsquo;s recognition that
                  your parent&rsquo;s needs have outpaced what home can safely provide.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 8 ─────────────────────────────────────────── */}
              <SectionHeading id="technology">
                Technology That Makes Aging in Place Safer
              </SectionHeading>
              <div className="prose-content">
                <H3>Medical alert systems</H3>
                <P>
                  A wearable device (pendant, wristband, or smartwatch) allows your parent
                  to press a button to reach emergency services or designated contacts. Modern
                  systems include automatic fall detection (reaching 98% accuracy in 2026
                  models), GPS tracking, two-way communication, cellular connectivity, and
                  waterproof designs for use in the shower. Monitored systems cost $25–$50
                  per month; self-monitored systems that alert family directly cost $10–$20.
                </P>
                <H3>Passive fall detection</H3>
                <P>
                  Wall-mounted radar sensors detect falls, movement patterns, and changes in
                  activity levels without cameras — preserving privacy while providing
                  continuous monitoring. These systems can also detect changes in daily
                  patterns (sleeping later than usual, reduced activity) that may indicate
                  health decline before a crisis occurs.
                </P>
                <H3>Remote patient monitoring</H3>
                <P>
                  Blood pressure monitors, heart rate monitors, continuous glucose monitors,
                  pulse oximeters, and smart scales now sync with apps and can share readings
                  with healthcare providers in real time. Many can be configured to alert both
                  your parent&rsquo;s doctor and family members when readings fall outside
                  safe ranges.
                </P>
                <H3>Smart medication management</H3>
                <P>
                  Automated pill dispensers pre-load medications and dispense the correct dose
                  at the correct time with audible/visual reminders. If a dose isn&rsquo;t
                  taken, the system alerts a caregiver. Basic models: $30–$80. Wi-Fi-connected
                  dispensers with adherence reports: $50–$100+ per month.
                </P>
                <H3>Voice assistants and smart speakers</H3>
                <P>
                  Amazon Echo, Google Nest, and Apple HomePod have become surprisingly useful
                  aging-in-place tools: setting medication reminders, making hands-free calls,
                  controlling lights and thermostats by voice, and playing music or audiobooks.
                  In 2026, some models can detect specific distress phrases and automatically
                  alert emergency contacts. After the initial device cost ($30–$100), ongoing
                  costs are zero.
                </P>
                <H3>Home safety sensors</H3>
                <P>
                  Stove safety devices (StoveGuard, FireAvert) detect unattended cooking and
                  auto-shutoff. Water leak sensors can cut off supply automatically. Smart
                  smoke and CO detectors send phone alerts. Adaptive lighting turns on
                  automatically by motion or time of day.
                </P>
                <P>
                  A note on dignity: technology should give your parent more independence, not make them feel
                  surveilled. Involve them in choosing what to use. The goal is safety with
                  dignity, not control.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 9 ─────────────────────────────────────────── */}
              <SectionHeading id="support-services">
                Support Services for Aging in Place
              </SectionHeading>
              <div className="prose-content">
                <H3>In-home care aides</H3>
                <P>
                  In-home care aides provide non-medical assistance: help with bathing,
                  dressing, grooming, toileting, meal preparation, medication reminders, light
                  housekeeping, and companionship. The 2025 national median is approximately
                  $35 per hour, with most agencies requiring a 3–4 hour minimum per visit.
                  You don&rsquo;t need full-time care — many families start with a few hours
                  a few days per week and scale up as needs change.
                </P>
                <H3>Home health care (medical)</H3>
                <P>
                  Home health care is skilled medical care (registered nurses, physical
                  therapists, occupational therapists) provided in the home. Medicare covers
                  it when ordered by a doctor for a homebound patient who needs intermittent
                  skilled care. There&rsquo;s no copay for Medicare-covered home health
                  services, and it&rsquo;s one of the most underused Medicare benefits.
                </P>
                <H3>Meal delivery</H3>
                <P>
                  Meals on Wheels delivers hot meals to homebound seniors, often at no cost.
                  Beyond nutrition, the daily visit serves as a welfare check. Find local
                  programs at MealsOnWheelsAmerica.org. Commercial services (Mom&rsquo;s Meals,
                  Silver Cuisine) deliver frozen senior-friendly meals for $7–$12 each.
                  Budget $150–$300 per month for daily delivery.
                </P>
                <H3>Adult day programs</H3>
                <P>
                  Adult day programs provide supervised care, social activities, meals, and
                  sometimes health services during daytime hours (typically 7 AM–6 PM,
                  M–F). They serve two functions: social engagement for your parent and
                  respite for family caregivers. Costs average $50–$100 per day, and Medicaid
                  or VA benefits may cover part or all of the cost.
                </P>
                <H3>Transportation</H3>
                <P>
                  When your parent can no longer drive, losing transportation can be
                  devastating. Options include: your local Area Agency on Aging (often
                  coordinates subsidized senior transportation), non-emergency medical
                  transport (sometimes covered by Medicaid), ride-sharing services (Uber and
                  Lyft both offer senior-accessible options), and volunteer driver programs
                  through churches and community organizations.
                </P>
                <H3>Telehealth</H3>
                <P>
                  Telehealth allows your parent to see doctors via video call from home,
                  which is valuable for routine check-ups, medication management, mental health,
                  and specialist consultations. Most Medicare Advantage plans and many original
                  Medicare beneficiaries now have broad telehealth access.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 10 ────────────────────────────────────────── */}
              <SectionHeading id="hire-manage-care">
                How to Hire and Manage In-Home Care
              </SectionHeading>
              <div className="prose-content">
                <H3>Agency vs. private hire</H3>
                <P>
                  Home care agencies employ caregivers, handle background checks, payroll,
                  taxes, insurance, and scheduling. If a caregiver calls in sick, the agency
                  sends a replacement. You pay the agency ($30–$45/hour typically). Hiring
                  privately is cheaper ($18–$28/hour) but makes you the employer, responsible
                  for background checks, payroll, taxes, workers&rsquo; compensation, and
                  backup coverage. For most families new to home care, starting with an agency
                  is simpler and safer.
                </P>
                <H3>Understanding care levels</H3>
                <P>
                  Not all in-home caregivers do the same thing. At the lightest end, companion
                  and homemaker aides offer companionship, housekeeping, meal preparation, and
                  errands — no personal care. <strong>Home care aides</strong> (also called
                  personal care aides) go a step further: bathing, dressing, grooming, toileting,
                  and transfers. These are the aides most families use for aging in place. They
                  can provide medication reminders, but they cannot administer medications.
                </P>
                <P>
                  <strong>Home health aides (HHAs)</strong> have additional certification and
                  can perform basic health monitoring under nursing supervision.
                </P>
                <P>
                  <strong>Private-duty nurses (RNs or LPNs)</strong> provide skilled medical
                  care: medication administration, wound care, IV management. Cost: $60–$90+/hour.
                </P>
                <H3>What to look for in a caregiver</H3>
                <P>
                  Your caregiver will spend intimate time with your parent. Personal fit
                  matters as much as qualifications. Key qualities: patience, reliability,
                  genuine warmth, strong communication, initiative.
                </P>
                <P>
                  In interviews, ask: How would you handle my parent refusing to bathe? What
                  would you do if my parent fell? Tell me about a difficult situation with a
                  previous client. Can you provide references?
                </P>
                <H3>Managing care remotely</H3>
                <P>
                  If you live far from your parent: use a shared caregiving app (CareZone,
                  Lotsa Helping Hands) for daily updates, build a local support network with a
                  neighbor or nearby family member who can do in-person check-ins, create a
                  care binder kept in your parent&rsquo;s home with medical information,
                  medication list, doctor contacts, insurance cards, and emergency contacts.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 11 ────────────────────────────────────────── */}
              <SectionHeading id="community-resources">
                Community Resources Most Families Don&rsquo;t Know About
              </SectionHeading>
              <div className="prose-content">
                <H3>Area Agencies on Aging (AAAs)</H3>
                <P>
                  Area Agencies on Aging are the single most valuable resource most families
                  have never heard of. There are 622 AAAs across the country, funded by the
                  federal Older Americans Act, and they serve as the local hub for senior
                  services. They can help with home-delivered meals, transportation,
                  caregiver support, home repair programs, legal assistance, benefits
                  counseling, and referrals to local providers.
                </P>
                <P>
                  How to find yours: call the Eldercare Locator at{" "}
                  <strong>1-800-677-1116</strong> or visit eldercare.acl.gov and enter your
                  parent&rsquo;s zip code. This should be your first call when starting to
                  plan for aging in place.
                </P>
                <H3>PACE Programs</H3>
                <P>
                  PACE (Program of All-Inclusive Care for the Elderly) provides a complete
                  package of medical care, social services, and support services designed to
                  keep nursing-home-eligible seniors living safely at home. It includes
                  primary care, prescription medications, adult day services, transportation,
                  home care, hospital care when needed, and physical/occupational/speech
                  therapy. For those who qualify for both Medicare and Medicaid, PACE is
                  typically free. Visit NationalPACEAssociation.org to find programs.
                </P>
                <H3>The 211 Helpline</H3>
                <P>
                  Dial <strong>2-1-1</strong> from any phone to reach a community resource
                  specialist who can connect you with local services: food assistance, utility
                  help, transportation, housing, health services, and more. It&rsquo;s free,
                  confidential, and available 24/7 in most areas. Think of it as 911 for
                  social services.
                </P>
                <H3>Senior Centers</H3>
                <P>
                  Local senior centers offer social activities, fitness classes, educational
                  programs, meals, and sometimes health screenings — all at little or no cost.
                  For a parent aging in place, a senior center can be a lifeline against
                  isolation.
                </P>
                <H3>Faith-Based and Volunteer Programs</H3>
                <P>
                  Many churches, synagogues, mosques, and other faith communities operate
                  volunteer programs: friendly visitor programs, transportation to appointments,
                  minor home repairs, meal delivery, and companionship. Your parent
                  doesn&rsquo;t need to be a member to benefit from many of these programs.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 12 ────────────────────────────────────────── */}
              <SectionHeading id="caregiver-support">
                Caregiver Support: Taking Care of Yourself Too
              </SectionHeading>
              <div className="prose-content">
                <P>
                  If you&rsquo;re managing your parent&rsquo;s aging-in-place plan, or
                  providing hands-on care yourself, you are a caregiver. And caregiver
                  burnout is one of the most common reasons aging in place fails.
                </P>
                <H3>Recognizing burnout</H3>
                <P>
                  Warning signs include: constant fatigue that doesn&rsquo;t improve with
                  rest, withdrawing from friends and activities, feeling hopeless, trapped, or
                  resentful, getting sick more frequently, losing patience in ways that
                  frighten you, difficulty sleeping, neglecting your own health, and feeling
                  like caregiving is consuming your entire identity. If several of these
                  resonate: you&rsquo;re not weak or failing. You&rsquo;re overextended, and
                  you need support.
                </P>
                <H3>Respite care</H3>
                <P>
                  Respite care is temporary relief for caregivers. Options include in-home
                  respite (a care aide comes so you can leave), adult day programs (daytime
                  respite), and short-term facility stays (a few days to a few weeks). Some
                  Medicaid HCBS waivers, VA caregiver support programs, and Area Agencies on
                  Aging provide subsidized or free respite care.
                </P>
                <H3>The sibling dynamic</H3>
                <P>
                  If siblings aren&rsquo;t sharing the caregiving load equally, practical
                  approaches include: holding a family meeting to explicitly divide tasks,
                  dividing by strengths (one sibling handles finances, another does hands-on
                  care), and having remote siblings contribute through research, scheduling,
                  and financial contributions toward paid care. Accept that it may never be
                  perfectly equal.
                </P>
                <H3>Resources</H3>
                <UL>
                  <LI>Caregiver support groups through the Alzheimer&rsquo;s Association, AARP, local hospitals</LI>
                  <LI>AARP Caregiver Resource Center (aarp.org/caregiving)</LI>
                  <LI>Family Medical Leave Act (FMLA): up to 12 weeks of unpaid, job-protected leave per year to care for a parent</LI>
                  <LI>National Alliance for Caregiving (caregiving.org)</LI>
                </UL>
              </div>

              <SectionDivider />

              {/* ── Section 13 ────────────────────────────────────────── */}
              <SectionHeading id="costs">
                What Does Aging in Place Cost?
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Aging in place offers cost flexibility — you pay only for what&rsquo;s
                  needed and adjust as circumstances change. I know the numbers below can be
                  hard to look at. Most families start at the low end and scale up only when
                  they have to.
                </P>
              </div>

              {/* Cost tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    tier: "Light support",
                    desc: "Fairly independent",
                    items: [
                      "Medical alert system: $25–$50/mo",
                      "Weekly meal delivery: $150–$200/mo",
                      "A few hours home care/week: $300–$600/mo",
                    ],
                    total: "$500–$850/month",
                    color: "border-teal-200 bg-teal-50",
                    totalColor: "text-teal-700",
                  },
                  {
                    tier: "Moderate support",
                    desc: "Daily help with some activities",
                    items: [
                      "Daily home care aide (3–4 hrs): $2,100–$3,500/mo",
                      "Meal delivery: $200–$300/mo",
                      "Adult day program 2–3×/wk: $400–$1,200/mo",
                      "Medical alert + transport: $130–$250/mo",
                    ],
                    total: "$2,800–$5,250/month",
                    color: "border-amber-200 bg-amber-50",
                    totalColor: "text-amber-700",
                  },
                  {
                    tier: "Significant support",
                    desc: "Help with most daily activities",
                    items: [
                      "Full-time home care aide (8+ hrs): $5,600–$8,400/mo",
                      "Meals + medical alert: $230–$450/mo",
                      "Medication management: $50–$100/mo",
                    ],
                    total: "$6,000–$9,000/month",
                    color: "border-orange-200 bg-orange-50",
                    totalColor: "text-orange-700",
                  },
                  {
                    tier: "24/7 care",
                    desc: "Cannot be safely left alone",
                    items: [
                      "Live-in care: $10,000–$18,000/mo",
                      "Rotating shifts: $15,000–$25,000+/mo",
                    ],
                    total: "$10,000–$25,000+/month",
                    color: "border-slate-200 bg-slate-50",
                    totalColor: "text-slate-700",
                  },
                ].map((c) => (
                  <div key={c.tier} className={`rounded-2xl border px-5 py-5 ${c.color}`}>
                    <p className="font-bold text-slate-800 mb-0.5">{c.tier}</p>
                    <p className="text-xs text-slate-500 mb-3">{c.desc}</p>
                    <ul className="space-y-1 mb-3">
                      {c.items.map((item) => (
                        <li key={item} className="text-xs text-slate-600 leading-snug flex items-start gap-1.5">
                          <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className={`text-sm font-bold ${c.totalColor}`}>Total: {c.total}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-8">
                Plus one-time home modification costs — typically $2,000–$30,000 depending on the scope of changes needed.
              </p>

              <div className="prose-content">
                <H3>One-time home modification costs</H3>
              </div>
              <ResponsiveTable>
                <thead>
                  <tr>
                    <TH>Modification</TH>
                    <TH>Typical Cost</TH>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Grab bars (bathroom, hallways)", "$100–$500"],
                    ["Non-slip flooring treatments", "$200–$800"],
                    ["Stairlift (straight)", "$3,000–$5,000"],
                    ["Stairlift (curved)", "$8,000–$15,000"],
                    ["Walk-in shower conversion", "$3,000–$8,000"],
                    ["Wheelchair ramp", "$1,000–$8,000"],
                    ["Doorway widening (per door)", "$300–$1,000"],
                    ["Smart home technology package", "$200–$1,000"],
                    ["Stove safety device", "$200–$400"],
                    ["Comfort-height toilet (installed)", "$200–$500"],
                    ["Lever door handles (whole house)", "$200–$500"],
                    ["Improved lighting (whole house)", "$300–$1,000"],
                    ["Modest modifications package", "$2,000–$5,000"],
                    ["Comprehensive modifications", "$10,000–$30,000"],
                    ["Full accessibility renovation", "$30,000–$100,000+"],
                  ].map(([mod, cost]) => (
                    <tr key={mod}>
                      <TD>{mod}</TD>
                      <TD>{cost}</TD>
                    </tr>
                  ))}
                </tbody>
              </ResponsiveTable>

              <div className="prose-content">
                <H3>How aging in place compares to facility care</H3>
              </div>
              <ResponsiveTable>
                <thead>
                  <tr>
                    <TH>Care Type</TH>
                    <TH>Median Monthly Cost (2025)</TH>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Aging in Place (light support)", "$500–$850"],
                    ["Aging in Place (moderate support)", "$2,800–$5,250"],
                    ["Adult Day Care (5 days/week)", "$1,500–$2,200"],
                    ["Assisted Living", "$4,500–$6,000"],
                    ["Memory Care", "$5,500–$8,000"],
                    ["Nursing Home (semi-private)", "$7,500–$9,500"],
                    ["Nursing Home (private room)", "$8,500–$12,000+"],
                  ].map(([type, cost]) => (
                    <tr key={type}>
                      <TD>{type}</TD>
                      <TD>{cost}</TD>
                    </tr>
                  ))}
                </tbody>
              </ResponsiveTable>
              <div className="bg-slate-50 rounded-xl px-5 py-4 mb-12">
                <p className="text-sm text-slate-600">
                  Get costs specific to your zip code with our{" "}
                  <ILink href="/tools/cost-calculator">Cost Calculator →</ILink>
                </p>
              </div>

              <SectionDivider />

              {/* ── Section 14 ────────────────────────────────────────── */}
              <SectionHeading id="how-to-pay">
                How to Pay for Aging in Place
              </SectionHeading>
              <div className="prose-content">
                <H3>Medicaid Home and Community-Based Services (HCBS) Waivers</H3>
                <P>
                  Medicaid HCBS waivers allow Medicaid to pay for services and modifications
                  that help your parent stay at home instead of moving to a nursing facility.
                  Covered services typically include: in-home care aides, home modifications,
                  adult day programs, respite care, medical alert systems, and care
                  management. Eligibility requires Medicaid qualification and meeting
                  nursing-facility level of care. Each state designs its own waiver programs,
                  so coverage varies. Many states have waiting lists.
                </P>
                <P>
                  Use our{" "}
                  <ILink href="/tools/medicaid-screener">Medicaid Eligibility Screener</ILink>{" "}
                  to get a quick sense of whether your parent may qualify.
                </P>
                <H3>Medicare Coverage</H3>
                <P>
                  Medicare covers: <strong>home health care</strong> (skilled nursing, PT,
                  OT, speech therapy) when ordered by a doctor for a homebound patient who
                  needs intermittent skilled care (no copay); and{" "}
                  <strong>durable medical equipment</strong> prescribed by a doctor (walkers,
                  wheelchairs, hospital beds — Medicare typically covers 80%).
                </P>
                <P>
                  Medicare does NOT cover: personal care aides, home modifications, meal
                  delivery, or medical alert systems. This is one of the most common
                  misconceptions.
                </P>
                <H3>Veterans Benefits</H3>
                <P>
                  <strong>Aid and Attendance (A&amp;A)</strong> is a pension benefit for
                  veterans and surviving spouses who need help with daily activities: up to
                  $2,431/month for a veteran, $1,318/month for a surviving spouse, and
                  $2,884/month for a veteran with a dependent spouse (2025 rates).
                </P>
                <P>
                  <strong>HISA grants</strong> help eligible veterans pay for home
                  modifications: up to $6,800 for service-connected disabilities, $2,000 for
                  non-service-connected conditions.
                </P>
                <P>
                  Use our{" "}
                  <ILink href="/tools/va-benefits">VA Benefits Calculator</ILink> to estimate
                  eligibility.
                </P>
                <H3>Long-Term Care Insurance</H3>
                <P>
                  Most long-term care insurance policies cover in-home care, adult day
                  programs, and sometimes home modifications. Benefits are triggered when the
                  insured can&rsquo;t perform 2+ ADLs independently or has cognitive
                  impairment. If your parent has a policy, review it carefully and file a
                  claim as soon as they qualify — many families wait too long and miss months
                  of benefits.
                </P>
                <H3>Tax Benefits for Home Modifications</H3>
                <P>
                  Some modification costs may be tax-deductible as medical expenses if
                  medically necessary and prescribed by a doctor. The deductible amount is the
                  cost minus any increase in home value. Medical expenses are deductible only
                  above 7.5% of AGI. Consult a tax professional.
                </P>
                <H3>Grants and Charitable Programs</H3>
                <UL>
                  <LI>Rebuilding Together (rebuildingtogether.org): free home repairs for low-income seniors and veterans</LI>
                  <LI>USDA Rural Development: grants and low-interest loans for home repairs in rural areas</LI>
                  <LI>Disease-specific organizations (Parkinson&rsquo;s Foundation, American Heart Association)</LI>
                  <LI>Local nonprofits: Lions Club, Rotary, Habitat for Humanity</LI>
                </UL>
                <H3>Home Equity Options</H3>
                <P>
                  A <strong>HELOC</strong> lets your parent borrow against home equity at
                  favorable rates, keeping ownership and repaying over time. A{" "}
                  <strong>reverse mortgage (HECM)</strong> is available to homeowners 62+ and
                  allows borrowing against equity without monthly payments — repaid when
                  selling, moving out, or passing away. High fees and reduces inheritance.
                  Consider a HUD-approved housing counselor (free) at 1-800-569-4287 before
                  proceeding.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 15 ────────────────────────────────────────── */}
              <SectionHeading id="legal-planning">
                Legal and Advance Planning
              </SectionHeading>
              <div className="prose-content">
                <H3>The 5 essential legal documents</H3>
                <P>
                  Get these done while your parent still has legal capacity. Once
                  incapacitated, it&rsquo;s too late. The family then faces a costly court
                  guardianship process.
                </P>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  {
                    n: "1",
                    title: "Durable Power of Attorney (Financial)",
                    body: "Names someone to make financial decisions on your parent's behalf if they become unable to.",
                  },
                  {
                    n: "2",
                    title: "Healthcare Power of Attorney (Healthcare Proxy)",
                    body: "Names someone to make medical decisions when your parent can't.",
                  },
                  {
                    n: "3",
                    title: "Living Will (Advance Directive)",
                    body: "Spells out your parent's wishes regarding end-of-life medical care.",
                  },
                  {
                    n: "4",
                    title: "HIPAA Authorization",
                    body: "Allows medical providers to share your parent's health information with you.",
                  },
                  {
                    n: "5",
                    title: "Will or Trust",
                    body: "Governs what happens to assets and property after death.",
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4">
                    <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {n}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm mb-1">{title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="prose-content">
                <P>
                  An elder law attorney can prepare all five documents for $1,500–$3,500. For
                  families who can&rsquo;t afford an attorney: many states offer free advance
                  directive forms; legal aid societies provide free or reduced-cost services for
                  seniors; NAELA (naela.org) can help find an attorney.
                </P>
                <H3>The driving conversation</H3>
                <P>
                  Warning signs your parent should stop driving: getting lost on familiar
                  routes, difficulty judging distances, slow reaction time, new dents on the
                  car, anxiety about driving, near-misses, traffic citations. Many AAAs offer
                  driving assessment programs. Have this conversation proactively, before an
                  incident forces it.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 16 ────────────────────────────────────────── */}
              <SectionHeading id="emergency-planning">
                Emergency Planning for Aging in Place
              </SectionHeading>
              <div className="prose-content">
                <H3>Create an emergency information sheet</H3>
                <P>
                  Post a clearly visible sheet (on the refrigerator door, next to the phone)
                  with: parent&rsquo;s full name, date of birth, and address; all current
                  medications with dosages; known allergies; primary care doctor and
                  specialists; health insurance information; emergency contacts (at least 3);
                  nearest and preferred hospital; advance directive status and any DNR orders.
                </P>
                <H3>Hospital-to-home transition planning</H3>
                <P>
                  Post-hospitalization is the most vulnerable moment in aging in place. Before
                  discharge, insist on: a clear understanding of all new medications, a
                  follow-up appointment within 7 days, a home health care referral if
                  appropriate, and a written discharge plan. In the first week home: fill all
                  new prescriptions immediately, ensure daily check-ins (in person preferred),
                  watch for warning signs, and attend the follow-up appointment.
                </P>
                <H3>Natural disaster preparedness</H3>
                <P>
                  Register with local emergency management for special needs assistance.
                  Maintain a 7-day medication supply and a go-bag. Ensure backup power for
                  essential medical equipment. Have a specific evacuation plan. Register with
                  your utility company as a life-support customer if applicable.
                </P>
              </div>

              <SectionDivider />

              {/* ── Section 17 ────────────────────────────────────────── */}
              <SectionHeading id="when-no-longer-enough">
                When Aging in Place Is No Longer Enough
              </SectionHeading>
              <div className="prose-content">
                <P>
                  Aging in place isn&rsquo;t forever. Recognizing when it&rsquo;s no longer
                  working is one of the hardest but most important decisions.
                </P>
                <H3>Warning signs</H3>
                <UL>
                  <LI>Increasing falls despite modifications and fall prevention strategies</LI>
                  <LI>
                    Caregiver exhaustion: missing work, neglecting your own health, losing
                    patience in frightening ways
                  </LI>
                  <LI>Increasing isolation despite active efforts to prevent it</LI>
                  <LI>
                    Behavioral changes: wandering, sundowning, aggression, resistance to all
                    care
                  </LI>
                  <LI>
                    Safety incidents: leaving the stove on, wrong medications, letting
                    strangers in, getting lost, unexplained injuries
                  </LI>
                  <LI>
                    Your parent is unhappy: lonely, frightened, withdrawn, or expressing
                    preference for a community setting
                  </LI>
                </UL>
                <H3>It&rsquo;s not failure</H3>
                <P>
                  Reassessing doesn&rsquo;t mean you failed. It means you&rsquo;re paying
                  attention. Aging in place worked until it didn&rsquo;t — and that&rsquo;s
                  success. The goal was always your parent&rsquo;s safety and dignity,
                  whether achieved at home or in a facility.
                </P>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-2xl px-5 py-5 mb-12">
                <p className="text-sm text-teal-800 leading-relaxed">
                  Our{" "}
                  <ILink href="/tools/care-assessment">Care Assessment</ILink> can help you
                  evaluate what level of care your parent now needs and whether a transition
                  makes sense.
                </p>
              </div>

              <SectionDivider />

              {/* ── Section 18 ────────────────────────────────────────── */}
              <SectionHeading id="specific-conditions">
                Aging in Place with Specific Health Conditions
              </SectionHeading>
              <div className="space-y-5 mb-12">
                {[
                  {
                    condition: "After a Stroke",
                    body: "Focus on one-sided adaptations (lever handles on the strong side, grab bars for the functioning hand, one-handed kitchen tools, transfer bench). Physical and occupational therapy at home is typically Medicare-covered. Fall risk is significantly elevated post-stroke. Treat it as the primary safety priority.",
                  },
                  {
                    condition: "With Parkinson's Disease",
                    body: "Visual cues like tape lines on the floor help with doorway transitions (reduces freezing). Remove all threshold transitions and rugs. Extra-wide pathways, raised toilet seats, handheld showerheads, and adaptive clothing all help. Good, consistent lighting is especially critical, as shadows and dim areas trigger freezing.",
                  },
                  {
                    condition: "With Diabetes",
                    body: "Reliable medication and insulin management matters more than almost anything else here — smart dispensers help. Regular monitoring equipment should be accessible. Foot care awareness is critical (neuropathy significantly increases fall risk). Telehealth is particularly valuable for ongoing glucose and medication management.",
                  },
                  {
                    condition: "After Hip or Knee Replacement",
                    body: "A raised toilet seat is a must for the first 6–12 weeks. Add grab bars, a shower bench, a reacher/grabber tool, and leg lifts for bed. Remove trip hazards throughout. Physical therapy at home (Medicare-covered) is standard. Many of these modifications are worth keeping permanently.",
                  },
                  {
                    condition: "With Vision Loss",
                    body: "High-contrast markings on stairs, countertops, and light switches. Bright, consistent lighting throughout. Tactile cues for room transitions. Large-print labels, magnification devices, talking watches and blood pressure monitors. Voice-controlled smart home devices. Low-vision rehabilitation therapy (often Medicare-covered) can significantly improve function and safety.",
                  },
                  {
                    condition: "With Heart Failure",
                    body: "Daily weight monitoring is critical — a 2+ pound overnight gain means call the doctor immediately. Blood pressure monitoring, medication adherence, reduced sodium diet, and activity pacing. A smart scale and Bluetooth blood pressure cuff with app reporting can keep the care team informed in real time.",
                  },
                ].map(({ condition, body }) => (
                  <div key={condition} className="bg-white border border-slate-200 rounded-xl px-5 py-5">
                    <h3 className="font-bold text-slate-800 mb-2">{condition}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <SectionDivider />

              {/* ── Section 19: FAQ ───────────────────────────────────── */}
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>
              <FAQAccordion items={FAQ_ITEMS} />

              <SectionDivider />

              {/* ── Final CTA ─────────────────────────────────────────── */}
              <section className="bg-teal-50 border border-teal-100 rounded-2xl px-6 py-8 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  Ready to build a plan?
                </h2>
                <p className="text-[1.0625rem] text-slate-600 leading-relaxed mb-5">
                  Start with an honest assessment of where your parent stands today. Our free
                  Care Assessment walks you through the key questions and gives you a
                  personalized recommendation in about 4 minutes.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    { text: "Take the free Care Assessment →", href: "/tools/care-assessment" },
                    { text: "Compare care costs near you →", href: "/tools/cost-calculator" },
                    { text: "Check Medicaid eligibility →", href: "/tools/medicaid-screener" },
                    { text: "Check VA benefits eligibility →", href: "/tools/va-benefits" },
                  ].map(({ text, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-teal-700 hover:text-teal-900 font-semibold text-sm underline underline-offset-2 transition-colors"
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500 leading-relaxed">
                  The right combination of modifications, services, technology, and family
                  involvement can let your parent stay home safely — maintaining independence,
                  preserving dignity, and staying connected to the life they&rsquo;ve built.
                </p>
              </section>

            </article>

            {/* ── Desktop sticky sidebar ───────────────────────────── */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SidebarCTA />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Free Care Assessment
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized recommendation for your loved one&rsquo;s specific situation.
            Takes about 4 minutes. No login required.
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
