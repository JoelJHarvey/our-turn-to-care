import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Statistics: Key Data for Families (2026) | OurTurnToCare",
  description:
    "Facilities and residents, costs, staffing, quality measures, COVID-19 impact, and future projections — the key nursing home statistics families need to understand.",
  openGraph: {
    title: "Nursing Home Statistics: Key Data for Families (2026)",
    description:
      "Facilities, residents, costs, staffing, quality, COVID impact, and projections — the essential nursing home data in one place.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/statistics/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/statistics/",
  },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-slate-800 mb-5 leading-snug scroll-mt-24">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.0625rem] leading-[1.75] text-slate-600 mb-5">{children}</p>;
}

function Divider() {
  return <hr className="my-10 border-slate-100" />;
}

function StatGrid({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-0 mb-6 rounded-xl border border-slate-200 overflow-hidden">
      {stats.map(({ label, value }, i) => (
        <div
          key={label}
          className={[
            "flex justify-between items-baseline gap-4 px-5 py-4",
            i % 2 === 0 ? "bg-white" : "bg-slate-50",
            "border-b border-slate-100 last:border-0",
          ].join(" ")}
        >
          <span className="text-sm text-slate-600">{label}</span>
          <span className="text-sm font-bold text-slate-800 flex-shrink-0">{value}</span>
        </div>
      ))}
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Get a personalized assessment</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Statistics describe the average. Our care assessment helps you understand what matters for your parent specifically.
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
            { label: "Nursing Home Costs", href: "/nursing-homes/costs/" },
            { label: "Nursing Home Staffing", href: "/nursing-homes/staffing/" },
            { label: "Five-Star Ratings", href: "/nursing-homes/five-star-ratings/" },
            { label: "How to Pay for Care", href: "/nursing-homes/paying-for/" },
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

export default function StatisticsPage() {
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
            <span className="text-slate-700 font-medium">Statistics</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Statistics and Data (2026)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Key figures on facilities, residents, costs, staffing, quality, COVID-19
            impact, and projections — the essential data for understanding nursing home
            care in the United States.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="facilities">Facilities and Residents</H2>
              <StatGrid
                stats={[
                  { label: "Certified nursing facilities in the U.S.", value: "~14,742" },
                  { label: "Total nursing home residents", value: "~1.24 million" },
                  { label: "Average occupancy rate", value: "~77%" },
                  { label: "Average resident age", value: "79 years" },
                  { label: "Female residents", value: "~70%" },
                  { label: "Residents funded by Medicaid", value: "~66%" },
                  { label: "Residents with Alzheimer's or dementia", value: "~47%" },
                  { label: "Residents receiving hospice care", value: "~10-12%" },
                ]}
              />
              <P>
                The average length of a nursing home stay is approximately 835 days (about
                2.3 years). Short-stay rehabilitation patients stay considerably less —
                typically 20–30 days. About 20% of all admissions result in stays of less
                than 30 days; roughly 14% of residents stay five years or longer.
              </P>

              <Divider />

              <H2 id="demographics">Who Lives in Nursing Homes</H2>
              <P>
                The nursing home population is predominantly older, female, and has
                significant medical complexity:
              </P>
              <StatGrid
                stats={[
                  { label: "Average age at admission", value: "79 years" },
                  { label: "Women (% of residents)", value: "~70%" },
                  { label: "White residents", value: "~74%" },
                  { label: "Black residents", value: "~14%" },
                  { label: "Hispanic residents", value: "~7%" },
                  { label: "Residents with 3+ chronic conditions", value: "~70%+" },
                  { label: "Residents needing help with all ADLs", value: "~50%" },
                  { label: "Residents who entered from a hospital", value: "~60%" },
                ]}
              />

              <Divider />

              <H2 id="costs">Cost Statistics</H2>
              <StatGrid
                stats={[
                  { label: "Semi-private room (national average)", value: "$7,908/month" },
                  { label: "Private room (national average)", value: "$9,034/month" },
                  { label: "Semi-private room (per day)", value: "$260/day" },
                  { label: "Private room (per day)", value: "$297/day" },
                  { label: "Annual cost, semi-private", value: "$94,896" },
                  { label: "Annual cost, private room", value: "$108,408" },
                  { label: "Total cost, average stay (2.3 yrs)", value: "~$218,000" },
                  { label: "Historical annual cost increase", value: "~3-4%/year" },
                ]}
              />
              <P>
                The highest-cost state (Alaska) averages over $30,000 per month for a
                private room — more than five times the cost in the lowest-cost states
                (Oklahoma, Missouri, Mississippi at $5,000–$6,500/month). See our{" "}
                <Link href="/nursing-homes/costs/" className="text-teal-700 underline hover:text-teal-900">
                  complete cost guide
                </Link>{" "}
                for state-by-state data.
              </P>

              <Divider />

              <H2 id="payment">Payment and Financing</H2>
              <StatGrid
                stats={[
                  { label: "Residents funded by Medicaid", value: "~66%" },
                  { label: "Residents funded by Medicare (short-term)", value: "~13%" },
                  { label: "Residents paying privately", value: "~17%" },
                  { label: "Residents with long-term care insurance", value: "~4%" },
                  { label: "Adults 65+ with LTC insurance", value: "~7-8%" },
                  { label: "Medicaid spend on nursing home care", value: "$65+ billion/yr" },
                  { label: "Total national spending on SNF care", value: "$200+ billion/yr" },
                  { label: "Medicare per-day coinsurance (days 21-100)", value: "$204/day (2024)" },
                ]}
              />

              <Divider />

              <H2 id="staffing-stats">Staffing Statistics</H2>
              <StatGrid
                stats={[
                  { label: "Annual CNA turnover rate (national avg)", value: "~46%" },
                  { label: "Annual RN turnover rate (national avg)", value: "~36%" },
                  { label: "Facilities with 100%+ annual turnover", value: "Substantial minority" },
                  { label: "CMS minimum staffing (total nursing)", value: "3.48 HPRD" },
                  { label: "CMS minimum RN staffing", value: "0.55 HPRD" },
                  { label: "CMS minimum CNA staffing", value: "2.45 HPRD" },
                  { label: "Facilities meeting new CMS minimums", value: "Varies by state" },
                  { label: "Agency (temp) staff usage, pandemic peak", value: "Widespread" },
                ]}
              />
              <P>
                HPRD = hours per resident per day. The new CMS staffing minimums (finalized
                2024) are the first federal minimum staffing requirements in the history
                of the nursing home program and are being phased in through 2026–2029
                depending on facility location.
              </P>

              <Divider />

              <H2 id="quality-stats">Quality Statistics</H2>
              <StatGrid
                stats={[
                  { label: "Health citations issued nationally (2023)", value: "94,499" },
                  { label: "Citations related to abuse/neglect/exploitation", value: "~8.1%" },
                  { label: "Civil money penalties (annual total)", value: "$150M+" },
                  { label: "Residents on antipsychotics (long-stay)", value: "~14%" },
                  { label: "Residents with pressure ulcers (long-stay)", value: "~1.5-2%" },
                  { label: "Residents experiencing falls with injury", value: "~2-3%" },
                  { label: "Short-stay rehospitalization rate", value: "~11-14%" },
                  { label: "Short-stay community discharge rate", value: "~55-60%" },
                ]}
              />

              <Divider />

              <H2 id="covid">COVID-19 Impact on Nursing Homes</H2>
              <StatGrid
                stats={[
                  { label: "Resident deaths attributed to COVID-19", value: "~172,000" },
                  { label: "Share of all U.S. COVID deaths", value: "~15%" },
                  { label: "Staff deaths from COVID-19", value: "Thousands" },
                  { label: "Occupancy decline (2020-2021)", value: "~15-20 percentage points" },
                  { label: "Facilities temporarily closed (pandemic)", value: "Hundreds" },
                  { label: "Current occupancy vs. pre-pandemic", value: "Still recovering" },
                ]}
              />
              <P>
                COVID-19 had a devastating and disproportionate impact on nursing home
                residents and staff. The pandemic exposed structural vulnerabilities in
                the sector — inadequate infection control, chronic understaffing, and poor
                physical plant conditions — and accelerated federal regulatory focus on
                staffing and infection control requirements.
              </P>

              <Divider />

              <H2 id="projections">Future Projections</H2>
              <StatGrid
                stats={[
                  { label: "Americans 85+ projected by 2060", value: "2x current level" },
                  { label: "Increase in nursing home demand by 2030", value: "~75%" },
                  { label: "Projected workforce shortfall (nurses/aides)", value: "Severe" },
                  { label: "Expected annual cost increases", value: "4-5%+ per year" },
                  { label: "Facilities expected to close (rural areas)", value: "Ongoing trend" },
                  { label: "New payment models in development", value: "Multiple ongoing" },
                ]}
              />
              <P>
                The demographic math is stark: the 85+ population — which has the highest
                nursing home utilization — is projected to more than double by 2060.
                Combined with workforce shortages, rising costs, and rural facility closures,
                nursing home capacity in the U.S. faces significant challenges in the
                coming decades. Planning ahead — including financial planning and early
                identification of appropriate facilities — has never been more important.
              </P>

              <p className="text-xs text-slate-400 mt-8">
                Sources: CMS Nursing Home Data Compendium; Genworth Cost of Care Survey /
                CareScout 2025; AHCA/NCAL; Kaiser Family Foundation; CDC National Center
                for Health Statistics. Data represents most recent available figures as of
                early 2026.
              </p>

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
            From Statistics to Your Situation
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            National data describes averages. What matters most is what&rsquo;s right for your
            parent&rsquo;s specific needs and your family&rsquo;s financial situation. Our tools
            help you move from statistics to decisions.
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
              See Costs in Your Area →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
