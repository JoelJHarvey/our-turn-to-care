import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Costs by State: What You'll Really Pay (2026) | OurTurnToCare",
  description:
    "Nursing home costs average $7,908/month nationally. See what's included, regional cost ranges, how costs have changed, and the true total cost of a nursing home stay.",
  openGraph: {
    title: "Nursing Home Costs by State: What You'll Really Pay (2026)",
    description:
      "Nursing home costs average $7,908/month nationally. See regional ranges, what's included, and how to plan for the total cost.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/costs/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/costs/",
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

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          See costs in your area
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Enter your zip code and get side-by-side cost comparisons for all
          senior care types in your market.
        </p>
        <Link
          href="/tools/cost-calculator"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Open Cost Calculator →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Related guides
        </p>
        <ul className="space-y-2">
          {[
            { label: "How to Pay for Nursing Home Care", href: "/nursing-homes/paying-for/" },
            { label: "Medicaid Eligibility Screener", href: "/tools/medicaid-screener" },
            { label: "VA Benefits Calculator", href: "/tools/va-benefits" },
            { label: "Back to Nursing Homes Hub", href: "/nursing-homes/" },
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

export default function NursingHomeCostsPage() {
  return (
    <>
      {/* Hero */}
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
            <span className="text-slate-700 font-medium">Costs</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Costs by State: What You&rsquo;ll Really Pay in 2026
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            National averages, regional ranges, what&rsquo;s included vs. billed separately,
            how costs have changed over time, and what to plan for financially.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            {/* Main article */}
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              <H2 id="national-averages">National Average Costs</H2>
              <P>
                A semi-private room (shared with one other resident) in a nursing home
                averages approximately <strong className="text-slate-800">$7,908 per month</strong>,
                or $260 per day, across the United States. A private room averages
                approximately <strong className="text-slate-800">$9,034 per month</strong>,
                or $297 per day. These figures translate to annual costs of roughly $94,900
                for a semi-private room and $108,405 for a private room.
              </P>
              <P>
                These are averages. Actual costs vary enormously by location, sometimes by
                300% or more between the highest- and lowest-cost states.
              </P>
              <P>
                Most families don&rsquo;t plan for these numbers in advance. Please don&rsquo;t skip
                this section.
              </P>

              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 font-semibold">Room Type</th>
                      <th className="px-4 py-3 font-semibold">Per Day</th>
                      <th className="px-4 py-3 font-semibold">Per Month</th>
                      <th className="px-4 py-3 font-semibold">Per Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-slate-800">Semi-private room</td>
                      <td className="px-4 py-3 text-slate-600">$260</td>
                      <td className="px-4 py-3 text-slate-600">$7,908</td>
                      <td className="px-4 py-3 text-slate-600">$94,896</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">Private room</td>
                      <td className="px-4 py-3 text-slate-600">$297</td>
                      <td className="px-4 py-3 text-slate-600">$9,034</td>
                      <td className="px-4 py-3 text-slate-600">$108,408</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mb-8">Source: Genworth Cost of Care Survey / CareScout 2025</p>

              <Divider />

              <H2 id="by-state">Cost by Region and State</H2>
              <P>
                Where your parent lives — or where you choose to place them — can make an
                enormous difference in cost. Here is a representative overview:
              </P>

              <H3>Highest-Cost States (private room, monthly average)</H3>
              <div className="overflow-x-auto my-4 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="px-4 py-3 font-semibold">State</th>
                      <th className="px-4 py-3 font-semibold">Private Room (Monthly)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["Alaska", "$30,000+"],
                      ["Connecticut", "$14,000–$16,000"],
                      ["New York", "$13,000–$15,000"],
                      ["Massachusetts", "$13,000–$14,500"],
                      ["New Jersey", "$11,000–$13,000"],
                    ].map(([state, cost], i) => (
                      <tr key={state} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{state}</td>
                        <td className="px-4 py-3 text-slate-600">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <H3>Lowest-Cost States (private room, monthly average)</H3>
              <div className="overflow-x-auto my-4 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="px-4 py-3 font-semibold">State</th>
                      <th className="px-4 py-3 font-semibold">Private Room (Monthly)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["Oklahoma", "$5,500–$6,500"],
                      ["Louisiana", "$5,500–$6,500"],
                      ["Texas", "$5,500–$7,000"],
                      ["Missouri", "$5,000–$6,500"],
                      ["Mississippi", "$6,000–$7,000"],
                    ].map(([state, cost], i) => (
                      <tr key={state} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{state}</td>
                        <td className="px-4 py-3 text-slate-600">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Callout>
                To see specific costs for your area, use our{" "}
                <Link href="/tools/cost-calculator" className="text-teal-700 underline hover:text-teal-900">
                  Cost of Care Calculator
                </Link>
                , which shows side-by-side costs for all care types in your region based on
                your zip code.
              </Callout>

              <Divider />

              <H2 id="included">What&rsquo;s Included in the Cost</H2>
              <P>
                The base daily or monthly rate at most nursing homes typically covers:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Room and board — a bed, meals, housekeeping, and laundry",
                  "24-hour nursing care and personal assistance (bathing, dressing, toileting)",
                  "Standard medications (though policies vary — always confirm)",
                  "Routine medical supplies",
                  "Activities programming and social programs",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <H3>What May Cost Extra</H3>
              <P>
                What is billed separately varies by facility, but common add-on charges
                include:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Physical therapy, occupational therapy, and speech therapy beyond what insurance covers",
                  "Specialty medications not included in the base formulary",
                  "Dental care, vision care, and hearing services",
                  "Personal items: phone service, cable TV, haircuts, toiletries",
                  "Private room upgrades (if the quoted rate is for semi-private)",
                  "Specialized wound care supplies or medical equipment",
                  "Transportation for medical appointments",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                When comparing facilities, always ask for a complete breakdown of what&rsquo;s
                included in the quoted daily rate and what incurs additional charges. A
                facility that looks cheaper on paper may end up costing more once add-on
                fees are included.
              </Callout>

              <Divider />

              <H2 id="over-time">How Nursing Home Costs Have Changed Over Time</H2>
              <P>
                Nursing home costs have risen steadily, outpacing general inflation.
                Over the past decade, costs have increased approximately 3–4% annually —
                driven by rising labor costs (staffing is the largest expense), regulatory
                requirements, insurance costs, and facility maintenance.
              </P>
              <P>
                The new CMS staffing mandates requiring higher nurse-to-resident ratios are
                expected to put additional upward pressure on costs in the coming years.
                If you&rsquo;re planning for care several years in the future, budgeting for 4–5%
                annual cost increases is a reasonable assumption.
              </P>

              <Divider />

              <H2 id="total-cost">The Total Cost of a Nursing Home Stay</H2>
              <P>
                Because many people enter a nursing home for the long term, the total
                lifetime cost can be substantial. The average length of a nursing home stay
                is approximately 835 days (about 2.3 years), though this varies widely —
                some stays last weeks, others last a decade or more.
              </P>
              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 font-semibold">Length of Stay</th>
                      <th className="px-4 py-3 font-semibold">Semi-private Room</th>
                      <th className="px-4 py-3 font-semibold">Private Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["1 year", "$94,896", "$108,408"],
                      ["2.3 years (average)", "$218,261", "$249,338"],
                      ["3 years", "$284,688", "$325,224"],
                      ["5 years", "$474,480", "$542,040"],
                      ["10 years", "$948,960", "$1,084,080"],
                    ].map(([duration, semi, priv], i) => (
                      <tr key={duration} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{duration}</td>
                        <td className="px-4 py-3 text-slate-600">{semi}</td>
                        <td className="px-4 py-3 text-slate-600">{priv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                These numbers make clear why financial planning — ideally well before nursing
                home care is needed — is so important. Most families use a combination of
                private savings, Medicare (short-term only), Medicaid (after spending down),
                VA benefits, and long-term care insurance.
              </P>

              <Divider />

              <H2 id="tax">Are Nursing Home Costs Tax Deductible?</H2>
              <P>
                In many cases, yes. Nursing home costs qualify as medical expenses for tax
                purposes if the primary reason for being in the nursing home is to receive
                medical care. For most nursing home residents — especially long-stay
                residents — the medical care requirement is met.
              </P>
              <P>
                Medical expenses that exceed 7.5% of your adjusted gross income (AGI) can
                be deducted if you itemize deductions. This can result in a meaningful tax
                benefit, especially in the first year when costs are often highest. Consult
                a tax professional familiar with elder care for specifics about your
                situation.
              </P>

              <Divider />

              <H2 id="next-steps">Planning for the Cost</H2>
              <P>
                Understanding the full financial picture before placement gives you the best
                chance to plan your finances strategically. If you haven&rsquo;t already, review the
                payment options — Medicare, Medicaid, VA benefits, and long-term care
                insurance — in our{" "}
                <ILink href="/nursing-homes/paying-for/">
                  complete guide to paying for nursing home care
                </ILink>
                . Consulting an elder law attorney before making placement decisions is one
                of the most valuable investments a family can make.
              </P>

            </article>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SidebarCTA />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            See What Care Costs in Your Area
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Enter your zip code to compare nursing home, assisted living, memory care,
            and home care costs side by side — free, no login required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Open Cost Calculator →
            </Link>
            <Link
              href="/tools/medicaid-screener"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Check Medicaid Eligibility →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
