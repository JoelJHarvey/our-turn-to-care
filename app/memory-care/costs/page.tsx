import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Memory Care Costs by State: How Much You'll Really Pay (2026) | OurTurnToCare",
  description:
    "Memory care costs $7,908/month nationally. See what's included, what's not, level-of-care fees, and how costs compare to other senior care options.",
  openGraph: {
    title: "Memory Care Costs by State: How Much You'll Really Pay (2026)",
    description:
      "Memory care costs $7,908/month nationally. See what's included, level-of-care fees, and how it compares.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/costs/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/costs/",
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
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Financial assistance
        </p>
        <p className="text-sm text-slate-500 mb-3 leading-relaxed">
          Check whether Medicaid or VA benefits could help cover memory care costs.
        </p>
        <div className="space-y-2">
          <Link
            href="/tools/medicaid-screener"
            className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Check Medicaid Eligibility →
          </Link>
          <Link
            href="/tools/va-benefits"
            className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Check VA Benefits →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "How to pay for memory care", href: "/memory-care/paying-for/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "Memory care vs. assisted living", href: "/memory-care/vs-assisted-living/" },
            { label: "Memory care vs. home care", href: "/memory-care/vs-home-care/" },
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

export default function MemoryCareCostsPage() {
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
            <span className="text-slate-700 font-medium">Costs</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care Costs: What Families Actually Pay in 2026
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            National overview, what&rsquo;s included and what&rsquo;s not,
            level-of-care fees, cost by region, and how memory care compares to
            other options.
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

              {/* ── Key Numbers ────────────────────────────────── */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  { num: "$7,908", label: "National median per month" },
                  { num: "$94,896", label: "National median per year" },
                  { num: "20–30%", label: "More than standard assisted living" },
                ].map(({ num, label }) => (
                  <div
                    key={num}
                    className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center"
                  >
                    <div className="text-2xl font-bold text-teal-700 mb-1">{num}</div>
                    <div className="text-sm text-slate-600">{label}</div>
                  </div>
                ))}
              </div>

              <H2 id="national-overview">The National Picture</H2>
              <P>
                Memory care is the second most expensive form of long-term care,
                after round-the-clock in-home care. The national median monthly
                cost was <strong>$7,908</strong> in 2025 (CareScout/Genworth
                Cost of Care Survey), which works out to approximately{" "}
                <strong>$94,896 per year</strong>.
              </P>
              <P>
                That&rsquo;s a median &mdash; half of communities charge more
                than that and half charge less. The actual range is wide:
                roughly $5,000 per month in the most affordable markets (parts
                of the South and Midwest) to over $12,000 per month in major
                metro areas like San Francisco, New York City, and Boston.
              </P>
              <P>
                Memory care costs <strong>20 to 30 percent more</strong> than
                standard assisted living in the same market. The premium reflects
                higher staffing ratios, specialized dementia care training,
                secured building design, and more intensive programming.
              </P>

              <Callout>
                These figures represent the base monthly rate. Most families pay
                more than the base rate once level-of-care fees and additional
                services are included. Factor in 10&ndash;20% above the quoted
                base rate when budgeting.
              </Callout>

              <Divider />

              {/* ── What&rsquo;s Included ──────────────────────────────── */}
              <H2 id="whats-included">What&rsquo;s Typically Included</H2>
              <P>
                The base monthly rate at most memory care communities includes:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>24-hour supervision and secured environment</li>
                <li>Three meals and snacks daily</li>
                <li>Personal care assistance (bathing, dressing, grooming, toileting)</li>
                <li>Medication management and administration</li>
                <li>Structured daily activities and therapeutic programming</li>
                <li>Housekeeping and laundry</li>
                <li>Transportation to medical appointments (varies)</li>
                <li>Social activities and entertainment</li>
              </ul>

              <H3>What&rsquo;s Typically Extra</H3>
              <P>
                Most communities charge separately for services beyond the base
                package. Common add-ons include:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>Incontinence supplies (often $100–$300/month additional)</li>
                <li>Specialized therapy (speech, physical, occupational)</li>
                <li>Podiatry, dental, vision services</li>
                <li>Salon/barber services</li>
                <li>Private duty nursing or additional one-on-one aide time</li>
                <li>Escort to meals and activities (if needed beyond standard assistance)</li>
                <li>Guest meals for family visits</li>
              </ul>

              <Divider />

              {/* ── Level-of-Care Fees ─────────────────────────── */}
              <H2 id="level-of-care-fees">Level-of-Care Fees: The Hidden Cost</H2>
              <P>
                One of the most important things to understand about memory care
                pricing is the <strong>level-of-care fee</strong> system. Most
                communities assess each resident&rsquo;s care needs and assign
                a tier or point-based score, then charge an additional fee on
                top of the base rate.
              </P>
              <P>
                As dementia progresses, care needs increase &mdash; and so does
                the level-of-care fee. A resident who enters at Level 1 (mild
                needs) might pay $500&ndash;$1,000/month extra. By Stage 6 or 7,
                the same resident might be at Level 3 or 4, adding
                $1,500&ndash;$3,000+ per month to the base rate.
              </P>
              <P>
                Always ask communities how their level-of-care system works, what
                triggers reassessment, and what the highest tier costs. Get this in
                writing. The difference between the base rate and the actual
                all-in cost can be $1,000&ndash;$3,000 per month for a resident
                with significant needs.
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Care Level</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Typical Additional Fee</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Typical Triggers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        level: "Level 1 (minimal)",
                        fee: "$300–$700/month",
                        triggers: "Mild needs, minimal behavioral management",
                      },
                      {
                        level: "Level 2 (moderate)",
                        fee: "$700–$1,500/month",
                        triggers: "Full ADL assistance, some behavioral needs",
                      },
                      {
                        level: "Level 3 (high)",
                        fee: "$1,500–$2,500/month",
                        triggers: "Incontinence, wandering, significant behavioral support",
                      },
                      {
                        level: "Level 4 (intensive)",
                        fee: "$2,500–$4,000+/month",
                        triggers: "Complex behavioral, late-stage physical needs",
                      },
                    ].map((row) => (
                      <tr key={row.level}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">
                          {row.level}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700">
                          {row.fee}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">
                          {row.triggers}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Ranges are approximate. Community-specific fees vary significantly.
              </p>

              <Divider />

              {/* ── Cost Comparison ──────────────────────────── */}
              <H2 id="cost-comparison">Memory Care vs. All Other Care Options</H2>
              <P>
                To put memory care costs in context, here&rsquo;s how it compares
                to every other major senior care option:
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Care Type</th>
                      <th className="px-4 py-3 text-left font-semibold">Monthly</th>
                      <th className="px-4 py-3 text-left font-semibold">Annual</th>
                      <th className="px-4 py-3 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Adult day care", mo: "$1,750–$2,000", yr: "$21,000–$24,000", notes: "Daytime only", highlight: false },
                      { type: "In-home aide (44 hrs/wk)", mo: "$5,720", yr: "$68,640", notes: "Non-medical personal care", highlight: false },
                      { type: "Assisted living", mo: "$5,511–$6,200", yr: "$66,000–$74,400", notes: "Not dementia-specialized", highlight: false },
                      { type: "Memory care", mo: "$7,908", yr: "$94,896", notes: "Dementia-specialized, 24/7", highlight: true },
                      { type: "Nursing home (semi-private)", mo: "$9,197", yr: "$110,364", notes: "Medical skilled care", highlight: false },
                      { type: "Nursing home (private)", mo: "$10,326", yr: "$123,912", notes: "Medical skilled care", highlight: false },
                      { type: "24/7 in-home care", mo: "$15,000–$20,000+", yr: "$180,000–$240,000+", notes: "Multiple aides in shifts", highlight: false },
                    ].map((row) => (
                      <tr key={row.type} className={row.highlight ? "bg-teal-50 font-semibold" : ""}>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-700"}`}>
                          {row.type}
                        </td>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-600"}`}>
                          {row.mo}
                        </td>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-600"}`}>
                          {row.yr}
                        </td>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-700" : "text-slate-500"}`}>
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Source: CareScout/Genworth 2025 Cost of Care Survey. Figures are national medians.
              </p>

              <Callout>
                The comparison that surprises most families: round-the-clock
                in-home care &mdash; which Stage 5 and 6 dementia typically
                requires &mdash; costs two to three times more than memory care.
                The conversation about cost often changes once families run this
                number.
              </Callout>

              <Divider />

              {/* ── Cost by Region ───────────────────────────── */}
              <H2 id="cost-by-region">Memory Care Cost by Region</H2>
              <P>
                Geographic variation in memory care costs is substantial. A
                community in rural Mississippi may charge under $4,000 per month
                for what a comparable community in San Francisco charges over
                $14,000 for. Urban markets, high cost-of-living areas, and
                states with strong regulations (which often drive up quality
                and cost) tend to be more expensive.
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm min-w-[420px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Region</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Approx. Monthly Range</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Key States</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { region: "Northeast", range: "$7,500–$14,000+", states: "MA, NY, CT, NJ, PA" },
                      { region: "West Coast", range: "$7,000–$14,000+", states: "CA, WA, OR, HI" },
                      { region: "Mid-Atlantic", range: "$6,500–$11,000", states: "MD, DC, VA" },
                      { region: "Midwest", range: "$5,000–$9,000", states: "IL, MN, OH, MO, WI" },
                      { region: "Mountain West", range: "$5,500–$10,000", states: "CO, AZ, NV, UT" },
                      { region: "South", range: "$4,000–$8,000", states: "FL, TX, GA, NC, TN" },
                    ].map((row) => (
                      <tr key={row.region}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">
                          {row.region}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700">
                          {row.range}
                        </td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-500">
                          {row.states}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Ranges are approximate. Use the Cost Calculator for your specific zip code.
              </p>

              <Divider />

              {/* ── What Drives Price ────────────────────────── */}
              <H2 id="what-drives-price">Why Memory Care Costs What It Does</H2>
              <P>
                Memory care is expensive because dementia care is labor-intensive
                and requires specialized expertise. The main cost drivers:
              </P>

              <H3>Higher Staffing Ratios</H3>
              <P>
                Memory care communities maintain a caregiver-to-resident ratio
                of roughly 1:5 or 1:6 during the day, compared to 1:8 or higher
                in standard assisted living. More staff means more labor cost,
                which flows directly into the monthly rate.
              </P>

              <H3>Specialized Training</H3>
              <P>
                Dementia-specific training &mdash; in communication techniques,
                behavioral management, safe redirection, and person-centered care
                &mdash; requires ongoing investment. States vary in how many
                hours they require, but quality communities typically exceed
                state minimums.
              </P>

              <H3>Secured Building Design</H3>
              <P>
                Memory care units are specifically designed to prevent wandering
                while maintaining a homelike feel. Secured exits, alarmed doors,
                enclosed outdoor spaces, and dementia-friendly interior design
                all add to construction and operating costs.
              </P>

              <H3>24/7 Supervision</H3>
              <P>
                Unlike assisted living, where residents may have significant
                autonomy, memory care requires consistent staff presence around
                the clock, including overnight. Three full shifts of trained
                caregivers, seven days a week, is a significant cost.
              </P>

              <Divider />

              {/* ── How to Pay ───────────────────────────────── */}
              <H2 id="help-paying">Help Paying for Memory Care</H2>
              <P>
                The sticker shock is real, but most families aren&rsquo;t paying
                the full cost out of pocket. The most common sources of financial
                help:
              </P>

              <H3>Medicaid</H3>
              <P>
                In many states, Medicaid covers memory care through Home and
                Community-Based Services (HCBS) waiver programs. Eligibility
                requires limited income and assets, but many families qualify
                after a period of spending down. Planning ahead with an elder
                law attorney is critical &mdash; there&rsquo;s a 5-year
                look-back period that can complicate applications if assets were
                transferred.{" "}
                <ILink href="/tools/medicaid-screener">
                  Check Medicaid eligibility →
                </ILink>
              </P>

              <H3>VA Aid &amp; Attendance</H3>
              <P>
                Wartime veterans and their surviving spouses who need help with
                daily activities may qualify for up to $2,431/month (veteran)
                or $1,318/month (surviving spouse) through the VA&rsquo;s Aid &amp;
                Attendance pension. This benefit is significantly underutilized.{" "}
                <ILink href="/tools/va-benefits">
                  Check VA eligibility →
                </ILink>
              </P>

              <H3>Long-Term Care Insurance</H3>
              <P>
                If your loved one purchased an LTC insurance policy before their
                dementia diagnosis, it very likely covers memory care. Review the
                policy documents and contact the carrier to begin the claims
                process. Most policies have a waiting period (elimination period)
                of 60&ndash;90 days before benefits begin.
              </P>

              <P>
                <ILink href="/memory-care/paying-for/">
                  Read the complete guide to paying for memory care →
                </ILink>
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Not sure what care costs in your area?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Use our Cost Calculator to get side-by-side pricing for
                  memory care and all other senior care options in your zip code.
                </p>
                <Link
                  href="/tools/cost-calculator"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Open the Cost Calculator →
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-10 border-t border-slate-100 pt-6">
                <em>
                  Source: CareScout (formerly Genworth) 2025 Cost of Care Survey.
                  Regional ranges are approximate and based on survey data and
                  publicly available community pricing. Actual costs vary by
                  community, care level, and local market conditions. This guide
                  is for informational purposes only and does not constitute
                  financial or legal advice.
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
            Get a personalized recommendation and a screening for financial
            assistance programs. Takes about 4 minutes. No login required.
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
