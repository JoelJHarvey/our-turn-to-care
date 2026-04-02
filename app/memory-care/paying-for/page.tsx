import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Pay for Memory Care: Medicaid, VA, LTC Insurance & More | OurTurnToCare",
  description:
    "Complete guide to paying for memory care — Medicaid spend-down, VA Aid & Attendance, long-term care insurance, Medicare limits, and other funding sources.",
  openGraph: {
    title: "How to Pay for Memory Care: Medicaid, VA, Insurance & More",
    description:
      "Complete guide to every funding source for memory care — Medicaid, VA benefits, LTC insurance, and what Medicare actually covers.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/paying-for/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/paying-for/",
  },
};

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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

const TOC = [
  { label: "Overview: How Most Families Pay", id: "overview" },
  { label: "Medicaid: The Largest Payer", id: "medicaid" },
  { label: "VA Aid & Attendance", id: "va-benefits" },
  { label: "Long-Term Care Insurance", id: "ltc-insurance" },
  { label: "What Medicare Covers (and Doesn't)", id: "medicare" },
  { label: "Personal Savings & Assets", id: "personal-savings" },
  { label: "Life Insurance & Reverse Mortgages", id: "other-sources" },
  { label: "Building a Multi-Source Plan", id: "planning" },
];

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Check Medicaid eligibility
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our screener gives you an initial assessment of whether your loved one
          may qualify for Medicaid long-term care coverage.
        </p>
        <Link
          href="/tools/medicaid-screener"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Check Medicaid Eligibility →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Check VA benefits
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          If your loved one is a veteran, estimate what Aid &amp; Attendance
          benefits they may qualify for.
        </p>
        <Link
          href="/tools/va-benefits"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Check VA Benefits →
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
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "Memory care costs", href: "/memory-care/costs/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
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

export default function PayingForMemoryCarePage() {
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
            <span className="text-slate-700 font-medium">How to Pay</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How to Pay for Memory Care: Every Funding Source Explained
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Medicaid, VA benefits, long-term care insurance, Medicare, and
            everything else &mdash; what they cover, what they don&rsquo;t,
            and how to build a plan.
          </p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              {/* Mobile sidebar */}
              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              {/* ── TOC ────────────────────────────────────────────── */}
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

              {/* ── Overview ──────────────────────────────────────── */}
              <H2 id="overview">How Most Families Pay for Memory Care</H2>
              <P>
                The national median cost of memory care is $7,908 per month.
                Very few families pay that entirely from a single source. In
                practice, most families piece together a plan from two or three
                funding sources, often shifting over time as one is depleted and
                eligibility for others is established.
              </P>
              <P>
                The most important planning insight: the sources that provide the
                most help &mdash; Medicaid and VA benefits &mdash; are also the
                ones families are least likely to know about or pursue. Starting
                the planning process early, before a crisis, significantly
                improves outcomes.
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Funding Source</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Coverage Potential</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Key Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { source: "Medicaid", coverage: "Potentially 100% (varies by state)", req: "Low income & assets" },
                      { source: "VA Aid & Attendance", coverage: "Up to $2,431/month", req: "Wartime veteran, ADL needs" },
                      { source: "LTC Insurance", coverage: "$150–$300/day for 2–5 years", req: "Policy purchased before diagnosis" },
                      { source: "Medicare", coverage: "Limited (NOT ongoing care)", req: "Qualifying hospital stay" },
                      { source: "Personal savings/retirement", coverage: "As much as you have", req: "None" },
                      { source: "Life insurance conversion", coverage: "Varies by policy value", req: "Existing life insurance policy" },
                      { source: "Reverse mortgage", coverage: "Up to ~$1M depending on equity", req: "Home ownership, age 62+" },
                    ].map((row) => (
                      <tr key={row.source}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">
                          {row.source}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">
                          {row.coverage}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-500">
                          {row.req}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider />

              {/* ── Medicaid ──────────────────────────────────────── */}
              <H2 id="medicaid">Medicaid: The Largest Payer of Long-Term Care</H2>
              <P>
                Medicaid is the single largest source of long-term care funding
                in the United States. In many states, Medicaid covers memory
                care either in dedicated memory care communities or in nursing
                facilities that accept Medicaid patients.
              </P>
              <P>
                The key challenge: Medicaid eligibility for long-term care
                requires having very limited income and assets &mdash; most
                states require less than $2,000 in countable assets for a
                single person. Many families who aren&rsquo;t eligible today
                will become eligible after spending down their assets on care.
                This is where careful legal planning becomes critical.
              </P>

              <H3>The 5-Year Look-Back Rule</H3>
              <P>
                When applying for Medicaid long-term care, the government reviews
                all financial transactions going back 5 years. If assets were
                given away or transferred during that period, Medicaid can impose
                a penalty period during which it won&rsquo;t pay for care.
                This is why Medicaid planning needs to happen well in advance
                &mdash; ideally 5+ years before you expect to need benefits.
              </P>

              <WarningBox>
                Never transfer assets to family members in an attempt to qualify
                for Medicaid without first consulting an elder law attorney. What
                looks like simple generosity can trigger a penalty of months or
                years of ineligibility, during which the family is still
                responsible for paying for care.
              </WarningBox>

              <H3>Medicaid Waiver Programs</H3>
              <P>
                Standard Medicaid covers nursing home care. For assisted living
                and memory care communities, most states offer coverage through
                Home and Community Based Services (HCBS) waiver programs,
                sometimes called 1915(c) waivers. These programs are optional
                for states, coverage and eligibility rules vary, and many states
                have waitlists that can run months or years.
              </P>

              <H3>The Spend-Down Process</H3>
              <P>
                If your loved one has too many assets to qualify for Medicaid
                today, the spend-down path involves paying for care until assets
                are reduced to the eligible level, then applying. An elder law
                attorney can advise on which assets count (countable) and which
                are exempt (typically: the primary home if a spouse still lives
                there, one car, personal belongings, and prepaid funeral plans).
              </P>
              <P>
                For a married couple, Medicaid has special rules designed to
                protect the &ldquo;community spouse&rdquo; (the spouse who does
                not need care) from complete impoverishment. The Community
                Spouse Resource Allowance (CSRA) protects a portion of the
                couple&rsquo;s assets for the spouse at home.
              </P>

              <Callout>
                The Medicaid rules are complex and vary by state. An elder law
                attorney is not a luxury for this process &mdash; it&rsquo;s an
                investment that can protect tens or hundreds of thousands of
                dollars in family assets.
              </Callout>

              <div className="my-6">
                <Link
                  href="/tools/medicaid-screener"
                  className="inline-block bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Check Medicaid Eligibility →
                </Link>
              </div>

              <Divider />

              {/* ── VA Benefits ───────────────────────────────────── */}
              <H2 id="va-benefits">VA Aid &amp; Attendance: The Most Underused Benefit</H2>
              <P>
                The VA&rsquo;s Aid &amp; Attendance (A&amp;A) pension is one of
                the most valuable and underutilized senior care benefits
                available. If your loved one is a wartime veteran &mdash; or the
                surviving spouse of a wartime veteran &mdash; they may qualify
                for a substantial monthly benefit to help pay for memory care.
              </P>

              <H3>Benefit Amounts (2025)</H3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm min-w-[380px]">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Recipient</th>
                      <th className="px-4 py-3 text-left font-semibold">Maximum Monthly Benefit</th>
                      <th className="px-4 py-3 text-left font-semibold">Annual Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { who: "Veteran (single or married)", max: "$2,431/month", yr: "$29,172" },
                      { who: "Surviving spouse of veteran", max: "$1,318/month", yr: "$15,816" },
                      { who: "Veteran with dependent spouse", max: "$2,884/month", yr: "$34,608" },
                    ].map((row) => (
                      <tr key={row.who}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">
                          {row.who}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700">
                          {row.max}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-teal-700 font-medium">
                          {row.yr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <H3>Eligibility Requirements</H3>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Served at least 90 days of active duty, with at least one day during a qualifying wartime period (WWII, Korean War, Vietnam, Gulf War)</li>
                <li>Received an honorable or general (under honorable conditions) discharge</li>
                <li>Requires help with at least two Activities of Daily Living (bathing, dressing, eating, toileting, transferring), or is legally blind, or is a patient in a nursing home</li>
                <li>Meets income and asset limits (current net worth limit is approximately $159,240, not counting the primary home)</li>
              </ul>

              <H3>How to Apply</H3>
              <P>
                The application process can be complex and takes several months.
                Working with a VA-accredited claims agent is strongly recommended
                &mdash; they&rsquo;re authorized to help with the application
                at no charge (by law, VA benefits claims agents cannot charge
                fees upfront). Avoid third-party companies that charge large
                upfront fees to help with VA claims.
              </P>

              <div className="my-6">
                <Link
                  href="/tools/va-benefits"
                  className="inline-block bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Check VA Aid &amp; Attendance Eligibility →
                </Link>
              </div>

              <Divider />

              {/* ── LTC Insurance ─────────────────────────────────── */}
              <H2 id="ltc-insurance">Long-Term Care Insurance</H2>
              <P>
                Long-term care (LTC) insurance is a private insurance product
                designed specifically to cover the costs of long-term care,
                including memory care. Policies purchased before the onset of
                a dementia diagnosis almost always cover memory care.
              </P>

              <H3>How LTC Insurance Works</H3>
              <P>
                A typical LTC policy provides a daily or monthly benefit amount
                (commonly $150&ndash;$300/day) for a benefit period (typically
                2&ndash;5 years). Before benefits begin, you must meet the
                policy&rsquo;s &ldquo;trigger&rdquo; criteria &mdash; usually
                needing help with 2 or more ADLs, or having a cognitive
                impairment &mdash; and complete the elimination period (typically
                60&ndash;90 days of qualifying care that you pay for yourself).
              </P>
              <P>
                Many policies include an inflation protection rider that increases
                the benefit amount each year. If the policy was purchased 10 or
                20 years ago, the inflation-adjusted benefit may be significantly
                higher than the original amount.
              </P>

              <H3>How to File a Claim</H3>
              <P>
                Contact the insurance carrier directly &mdash; not through a
                broker or agent. Request the claims forms and provide the
                required medical documentation (usually a physician&rsquo;s
                statement and care plan). The carrier will assess whether the
                trigger criteria are met. Once approved, benefits begin after the
                elimination period is satisfied.
              </P>
              <P>
                This process can take 4&ndash;8 weeks. Start early &mdash;
                before the care cost bills are due. Document everything in writing
                and keep copies of all submissions.
              </P>

              <WarningBox>
                If the LTC insurance carrier denies your claim, don&rsquo;t
                accept the first denial without pushing back. Many claims are
                initially denied due to incomplete documentation. An elder law
                attorney or insurance advocate can help navigate an appeal.
              </WarningBox>

              <Divider />

              {/* ── Medicare ──────────────────────────────────────── */}
              <H2 id="medicare">What Medicare Covers (and What It Doesn&rsquo;t)</H2>
              <P>
                This is the most common and most expensive misconception in
                senior care planning:{" "}
                <strong>
                  Medicare does not cover ongoing residential memory care.
                </strong>{" "}
                Period. No exceptions.
              </P>
              <P>
                What Medicare does cover that&rsquo;s relevant to dementia:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>
                  <strong>Short-term skilled nursing:</strong> Up to 100 days
                  after a qualifying hospital stay (3+ inpatient nights) for
                  skilled care like physical therapy or IV medications. Days
                  21&ndash;100 require a copay. This is not long-term care.
                </li>
                <li>
                  <strong>Home health services:</strong> Part-time skilled nursing
                  or therapy at home, when ordered by a physician. Does not cover
                  personal care aides or 24/7 supervision.
                </li>
                <li>
                  <strong>Hospice:</strong> Full coverage for comfort-focused
                  end-of-life care when a doctor certifies life expectancy is 6
                  months or less. Hospice can be received within a memory care
                  community.
                </li>
                <li>
                  <strong>Diagnostic services:</strong> Coverage for dementia
                  evaluations, cognitive assessments, and specialist visits.
                </li>
                <li>
                  <strong>Medications:</strong> Part D covers some Alzheimer&rsquo;s
                  medications, though the new disease-modifying drugs (Leqembi,
                  Kisunla) may have coverage limitations.
                </li>
              </ul>

              <Callout>
                Medicare Advantage plans (Part C) sometimes offer additional
                benefits not in original Medicare, including some home care
                benefits. Review the specific plan&rsquo;s Evidence of Coverage
                for details.
              </Callout>

              <Divider />

              {/* ── Personal Savings ──────────────────────────────── */}
              <H2 id="personal-savings">Personal Savings, Retirement Accounts, and Real Estate</H2>
              <P>
                Most families begin paying for memory care from personal
                savings, IRAs, 401(k)s, and other assets before any other
                funding source is available or established.
              </P>
              <P>
                If real estate is involved, families often sell the home to
                fund care. Keep in mind the capital gains implications: if the
                home was the person&rsquo;s primary residence for 2 of the last
                5 years, up to $250,000 of gain ($500,000 for a couple) is
                excluded from capital gains tax.
              </P>
              <P>
                For married couples, if one spouse needs care while the other
                remains at home, selling the home may not be necessary or
                desirable. An elder law attorney can advise on how to preserve
                assets for the community spouse while funding care for the
                spouse who needs it.
              </P>

              <Divider />

              {/* ── Other Sources ─────────────────────────────────── */}
              <H2 id="other-sources">Life Insurance Conversions and Reverse Mortgages</H2>

              <H3>Life Insurance Policy Conversion</H3>
              <P>
                An existing life insurance policy can be converted to fund
                long-term care through three mechanisms:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>
                  <strong>Life settlement:</strong> Selling the policy to a
                  third-party investor for a lump sum typically ranging from
                  25&ndash;60% of the face value.
                </li>
                <li>
                  <strong>Viatical settlement:</strong> Similar to a life
                  settlement but specifically for people with a life-limiting
                  illness; tax treatment may differ.
                </li>
                <li>
                  <strong>Accelerated death benefit:</strong> Some policies
                  allow the policyholder to access a portion of the death benefit
                  early if they have a qualifying health condition.
                </li>
              </ul>
              <P>
                These strategies are worth exploring if a policy exists that
                the family would otherwise lapse or cancel. The proceeds are not
                subject to spend-down for Medicaid in some states, though rules
                vary &mdash; consult an elder law attorney before proceeding.
              </P>

              <H3>Reverse Mortgage</H3>
              <P>
                For homeowners age 62 or older, a reverse mortgage (Home Equity
                Conversion Mortgage, or HECM) allows them to borrow against home
                equity without monthly payments. The loan is repaid when the
                home is sold. Proceeds can be used for any purpose, including
                memory care.
              </P>
              <P>
                This option works best when the person needs care but a spouse
                continues living in the home. However, if the person with dementia
                is the primary borrower and moves to memory care permanently,
                the reverse mortgage typically becomes due and payable within
                12 months. Review the loan terms carefully.
              </P>

              <Divider />

              {/* ── Building a Plan ───────────────────────────────── */}
              <H2 id="planning">Building a Multi-Source Financial Plan</H2>
              <P>
                The families who navigate memory care costs most successfully
                are the ones who plan ahead and assemble a team of professionals.
                Here&rsquo;s a practical sequence:
              </P>
              <ol className="list-decimal list-inside space-y-3 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>
                  <strong>Consult an elder law attorney</strong> to understand
                  Medicaid eligibility, the look-back period, asset protection
                  strategies, and powers of attorney.
                </li>
                <li>
                  <strong>Review any existing LTC insurance policies</strong>
                  and start the claims process if the trigger criteria are met.
                </li>
                <li>
                  <strong>Determine VA eligibility</strong> if your loved one
                  is a veteran &mdash; connect with a VA-accredited claims agent.
                </li>
                <li>
                  <strong>Assess real estate and liquid assets</strong> with a
                  financial advisor who specializes in senior care planning.
                </li>
                <li>
                  <strong>Apply for Medicaid early</strong> &mdash; the process
                  takes time, and you want to have coverage in place before
                  private funds are fully exhausted.
                </li>
                <li>
                  <strong>Revisit the plan annually</strong> as care costs change
                  and new funding sources may become available.
                </li>
              </ol>

              <Callout>
                The sooner you start this planning process, the more options
                you have. Families who wait until a crisis frequently have
                fewer choices, less time to navigate the bureaucracy, and miss
                opportunities to protect assets that proper planning would have
                preserved.
              </Callout>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Take the First Step
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Our Care Assessment screens for Medicaid and VA eligibility as
                  part of the process &mdash; and helps identify the right level
                  of care for your loved one&rsquo;s specific needs.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Take the Free Assessment →
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-10 border-t border-slate-100 pt-6">
                <em>
                  This guide is for informational purposes only and does not
                  constitute legal, financial, or tax advice. Medicaid and VA
                  rules vary by state and change frequently. Consult a licensed
                  elder law attorney, VA-accredited claims agent, and/or
                  certified financial planner for guidance specific to your
                  situation. VA benefit amounts shown are 2025 figures and are
                  adjusted periodically.
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
            Not Sure Where to Start?
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our free Care Assessment walks you through your loved one&rsquo;s
            situation and screens for financial assistance programs that may
            help. Takes about 4 minutes.
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
