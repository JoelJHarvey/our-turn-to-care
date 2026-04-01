import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Pay for Nursing Home Care: Medicare, Medicaid & More | OurTurnToCare",
  description:
    "Medicare, Medicaid, VA benefits, long-term care insurance, and private pay options for nursing home care — explained clearly for families dealing with the financial side.",
  openGraph: {
    title: "How to Pay for Nursing Home Care: Medicare, Medicaid & More",
    description:
      "Medicare, Medicaid, VA benefits, long-term care insurance, and private pay options for nursing home care — explained clearly.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/paying-for/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/paying-for/",
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

function ILink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
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

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Check Medicaid eligibility</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Answer a few questions to see if your parent may qualify for Medicaid
          coverage of nursing home care.
        </p>
        <Link
          href="/tools/medicaid-screener"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Medicaid Screener →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "VA Benefits Calculator", href: "/tools/va-benefits" },
            { label: "Nursing Home Costs", href: "/nursing-homes/costs/" },
            { label: "Care Assessment Tool", href: "/tools/care-assessment" },
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

export default function PayingForNursingHomePage() {
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
            <span className="text-slate-700 font-medium">Paying For</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How to Pay for Nursing Home Care: Medicare, Medicaid &amp; More
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Most families use a combination of payment sources, often transitioning from one
            to another as savings are spent. Here&rsquo;s how each option works.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="overview">Understanding Your Payment Options</H2>
              <P>
                At an average of $7,908 per month, nursing home care is one of the most
                expensive forms of long-term care. Understanding payment options helps you
                avoid panic-driven decisions and plan more strategically. The major sources
                of payment — in the order most families encounter them — are Medicare,
                Medicaid, VA benefits, long-term care insurance, and private pay.
              </P>

              <Divider />

              <H2 id="medicare">Medicare: Short-Term Coverage Only</H2>
              <P>
                Medicare covers skilled nursing care for one specific purpose: recovery
                following a qualifying hospitalization. To qualify, your parent must have
                been admitted as an inpatient to a hospital for at least three consecutive
                days (not under &ldquo;observation status&rdquo;), and a doctor must certify they need
                daily skilled nursing or rehabilitation services.
              </P>

              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 font-semibold">Days in SNF</th>
                      <th className="px-4 py-3 font-semibold">What Medicare Pays</th>
                      <th className="px-4 py-3 font-semibold">What You Pay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["Days 1–20", "100% of approved amount", "$0"],
                      ["Days 21–100", "All but the daily coinsurance", "$204.00/day (2024 rate)"],
                      ["After day 100", "Nothing", "100% of all costs"],
                    ].map(([days, medicare, you], i) => (
                      <tr key={days} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{days}</td>
                        <td className="px-4 py-3 text-slate-600">{medicare}</td>
                        <td className="px-4 py-3 text-slate-600">{you}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Warning>
                <strong>The observation status trap:</strong> Medicare only covers skilled nursing
                facility care if the hospital stay was an inpatient admission of at least three
                consecutive days. If your parent was under &ldquo;observation status&rdquo; for three days,
                that does NOT count. Always ask: &ldquo;Is my parent admitted as an inpatient or under
                observation?&rdquo; — and ask the doctor to change the status to inpatient if medically
                appropriate.
              </Warning>
              <P>
                Medicare also only covers care as long as your parent is making measurable
                progress in rehabilitation. If a therapist determines they&rsquo;ve plateaued,
                Medicare coverage can end before day 100 — often with only a few days&rsquo; notice.
              </P>

              <Divider />

              <H2 id="medicaid">Medicaid: The Primary Long-Term Payer</H2>
              <P>
                Medicaid is the single largest payer for nursing home care in the United
                States, covering approximately two-thirds of all nursing home residents. If
                your parent qualifies, Medicaid will pay for nursing home care indefinitely.
              </P>
              <H3>Eligibility Basics</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Income limit: approximately $2,829/month for an individual in most states (2024)",
                  "Asset limit: $2,000 in countable assets for an individual",
                  "Exempt assets typically include: primary home (up to certain equity), one vehicle, personal belongings, and certain other items",
                  "Countable assets: bank accounts, investments, and most other financial assets",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>The Spend-Down Reality</H3>
              <P>
                Most middle-class families don&rsquo;t initially qualify for Medicaid. The typical
                path: a parent enters a nursing home paying privately, spends down their
                savings over months or years, and then transitions to Medicaid once assets
                are depleted to the qualifying level. This is the path the majority of
                long-term nursing home residents eventually take.
              </P>
              <H3>The Five-Year Look-Back</H3>
              <P>
                Medicaid reviews all financial transactions from the five years before the
                application date (in California, 30 months). If your parent gave away money
                or assets during this period — even birthday gifts to grandchildren —
                Medicaid may impose a penalty period during which they won&rsquo;t pay for nursing
                home care. This is why elder law attorneys strongly advise against gifting
                assets without professional guidance once nursing home care becomes a
                possibility.
              </P>
              <P>
                The Medicaid application process is genuinely difficult. It&rsquo;s worth hiring
                an elder law attorney. Seriously.
              </P>
              <H3>Spousal Protections</H3>
              <P>
                If one spouse needs nursing home care and the other remains at home (the
                &ldquo;community spouse&rdquo;), federal law provides protections so the community spouse
                isn&rsquo;t impoverished. The community spouse can keep the family home, a vehicle,
                and a portion of the couple&rsquo;s assets (the Community Spouse Resource
                Allowance, which ranges from $30,828 to $154,140 in 2024). They&rsquo;re also
                entitled to a minimum monthly income. These rules vary significantly by
                state — consulting an elder law attorney is strongly recommended.
              </P>
              <Callout>
                Our <ILink href="/tools/medicaid-screener">Medicaid Eligibility Screener</ILink> provides
                a quick preliminary assessment of whether your parent might qualify, and can
                connect you with an elder law attorney in your area.
              </Callout>

              <Divider />

              <H2 id="va">Veterans Benefits: Aid &amp; Attendance</H2>
              <P>
                If your parent (or their deceased spouse) served in the military during a
                wartime period, they may be eligible for the VA&rsquo;s Aid &amp; Attendance benefit,
                which provides monthly payments to help cover nursing home costs.
              </P>
              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 font-semibold">Recipient</th>
                      <th className="px-4 py-3 font-semibold">Maximum Monthly Benefit (2024)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["Veteran without dependents", "$2,431"],
                      ["Veteran with one dependent", "$2,884"],
                      ["Surviving spouse of a veteran", "$1,318"],
                    ].map(([recipient, amount], i) => (
                      <tr key={recipient} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800">{recipient}</td>
                        <td className="px-4 py-3 text-slate-600">{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <H3>Qualifying Wartime Periods</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "World War II: December 7, 1941 – December 31, 1946",
                  "Korean War: June 27, 1950 – January 31, 1955",
                  "Vietnam War: February 28, 1961 – May 7, 1975 (in-country); August 5, 1964 – May 7, 1975 (all others)",
                  "Gulf War: August 2, 1990 – present",
                ].map((period, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {period}
                  </li>
                ))}
              </ul>
              <Callout>
                Use our <ILink href="/tools/va-benefits">VA Benefits Calculator</ILink> to check
                eligibility and estimate potential monthly benefit amounts based on service
                history and care needs.
              </Callout>

              <Divider />

              <H2 id="ltci">Long-Term Care Insurance</H2>
              <P>
                If your parent purchased a long-term care insurance (LTCI) policy, it may
                cover a significant portion of nursing home costs. Key things to check in
                the policy:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Daily or monthly benefit amount — many older policies have maximums of $100–$200/day, which may not fully cover today's nursing home costs",
                  "Benefit period — how long the policy pays (common periods: 2, 3, 5 years, or lifetime)",
                  "Elimination period — a waiting period of 30–90 days before benefits begin (you pay out of pocket during this time)",
                  "Inflation rider — increases the benefit amount over time to keep pace with rising costs",
                  "Facility requirements — some older policies only cover state-licensed facilities",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                Only about 7–8% of adults over 65 have long-term care insurance. If your
                parent doesn&rsquo;t have it and already needs care, it&rsquo;s too late to purchase —
                insurers won&rsquo;t cover pre-existing conditions.
              </P>

              <Divider />

              <H2 id="private">Private Pay and Other Funding Sources</H2>
              <P>
                For families who don&rsquo;t qualify for Medicaid and don&rsquo;t have long-term care
                insurance, the primary options include:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Personal savings and retirement accounts (IRAs, 401(k)s)",
                  "Selling or renting the family home — often the largest available asset",
                  "Life insurance policy conversions — some policies can be converted to long-term care benefits or sold through a life settlement",
                  "Reverse mortgages — homeowners 62+ can borrow against home equity",
                  "Family contributions — pooling resources among siblings or other family members",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="tax">Tax Deductions for Nursing Home Costs</H2>
              <P>
                Nursing home costs qualify as medical expenses for tax purposes if the
                primary reason for being in the nursing home is to receive medical care.
                Medical expenses that exceed 7.5% of your adjusted gross income (AGI) can
                be deducted if you itemize deductions. Consult a tax professional familiar
                with elder care for specifics about your situation.
              </P>

              <Divider />

              <H2 id="attorney">The Value of an Elder Law Attorney</H2>
              <P>
                Navigating Medicaid planning, asset protection strategies, and benefits
                enrollment is complex and state-specific. An elder law attorney who
                specializes in long-term care financing can often save families tens or
                hundreds of thousands of dollars through proper planning — sometimes making
                the difference between a parent qualifying for Medicaid immediately versus
                running out of money. Find a National Academy of Elder Law Attorneys (NAELA)
                member at{" "}
                <a
                  href="https://www.naela.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  naela.org
                </a>.
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Financial Assistance</h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            You may qualify for more help than you realize. Check Medicaid eligibility and
            VA benefits — both go unclaimed far too often by families dealing with
            nursing home costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/medicaid-screener"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Check Medicaid Eligibility →
            </Link>
            <Link
              href="/tools/va-benefits"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Calculate VA Benefits →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
