import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "Memory Care & Dementia Statistics (2026) | OurTurnToCare",
  description:
    "Key data on dementia prevalence, aging population trends, caregiving burden, memory care costs, and residential care utilization. Sourced from 2025–2026 data.",
  openGraph: {
    title: "Memory Care & Dementia Statistics (2026)",
    description:
      "Key statistics on dementia prevalence, caregiving burden, costs, and residential care trends for families making care decisions.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/statistics/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/statistics/",
  },
};

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Dementia Statistics and Data",
    items: [
      {
        q: "How many Americans have Alzheimer's disease?",
        a: "An estimated 7.2 million Americans age 65 and older are living with Alzheimer's disease as of 2025, according to the Alzheimer's Association. This number is projected to grow to 13 million by 2050 as the population ages.",
      },
      {
        q: "What percentage of people over 65 have Alzheimer's?",
        a: "About 1 in 9 (approximately 10.8%) of people age 65 and older have Alzheimer's dementia. The risk increases sharply with age: about 5% of those 65–74, 13% of those 75–84, and 33% of those 85 and older.",
      },
      {
        q: "Is Alzheimer's more common in women?",
        a: "Yes. Nearly two-thirds of Americans with Alzheimer's are women. Women also make up a disproportionate share of unpaid caregivers. The reasons are not fully understood but likely include the fact that women live longer, on average, than men — and age is the greatest risk factor for Alzheimer's.",
      },
      {
        q: "What is the lifetime cost of dementia care?",
        a: "The lifetime cost of care for a person with Alzheimer's or another form of dementia is estimated at $350,000 or more, though actual costs vary enormously based on disease duration, care setting, and geographic location. Most of this cost falls on families, not insurance or government programs.",
      },
      {
        q: "How much of dementia care is covered by Medicare?",
        a: "Medicare does not cover long-term residential memory care or custodial care at home. It covers short-term skilled nursing (up to 100 days after a qualifying hospital stay), some home health services, and hospice care. The large majority of long-term dementia care costs are paid out-of-pocket, through Medicaid (for those who qualify), or through long-term care insurance.",
      },
      {
        q: "How many people work as dementia caregivers?",
        a: "In 2024, an estimated 12 million Americans provided unpaid care to people with Alzheimer's or other dementias — partners, adult children, other family members. They provided an estimated 18.4 billion hours of care, valued at over $346 billion. The health and economic toll on these caregivers is significant and well-documented.",
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

function StatCard({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 text-center">
      <p className="text-2xl sm:text-3xl font-bold text-teal-700 leading-tight mb-1.5">{value}</p>
      <p className="text-sm text-slate-600 leading-snug mb-1">{label}</p>
      {source && <p className="text-xs text-slate-400">{source}</p>}
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Understand your care options
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Take the free Care Assessment to get a personalized recommendation for your loved one&rsquo;s situation.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Care Assessment →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          See costs in your area
        </p>
        <p className="text-sm text-slate-500 mb-3 leading-relaxed">
          National medians tell part of the story. Local costs can vary significantly.
        </p>
        <Link
          href="/tools/cost-calculator"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Open Cost Calculator →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "Memory care costs by state", href: "/memory-care/costs/" },
            { label: "How to pay for memory care", href: "/memory-care/paying-for/" },
            { label: "The 7 stages of dementia", href: "/memory-care/stages/" },
            { label: "Types of dementia", href: "/memory-care/types-of-dementia/" },
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

export default function MemoryCareStatisticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <span className="text-slate-700 font-medium">Statistics</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care &amp; Dementia Statistics (2026)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Key data on dementia prevalence, the caregiving burden, costs, and residential care trends &mdash; from the most recent available research.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────── */}
      <section className="bg-teal-700 py-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "7.2M", label: "Americans 65+ with Alzheimer's (2025)" },
              { stat: "1 in 9", label: "People over 65 affected" },
              { stat: "12M", label: "Unpaid dementia caregivers" },
              { stat: "13M", label: "Projected by 2050" },
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
            Source: Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              <P>
                Understanding the scope of dementia in America helps put the challenge in context &mdash; and explains why memory care exists, why the workforce crisis matters, and why planning ahead is so important. These figures are drawn primarily from the Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report, the CareScout/Genworth 2025 Cost of Care Survey, and CDC and Census Bureau data.
              </P>

              <Divider />

              {/* ── Prevalence ──────────────────────────────────────────── */}
              <section aria-labelledby="prevalence">
                <H2 id="prevalence">Prevalence and Incidence</H2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <StatCard
                    value="7.2 million"
                    label="Americans 65+ living with Alzheimer's"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="1 in 9"
                    label="People over 65 have Alzheimer's dementia"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="1 in 3"
                    label="People over 85 have Alzheimer's dementia"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="~200,000"
                    label="Americans under 65 with early-onset Alzheimer's"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="~65%"
                    label="Of Americans with Alzheimer's who are women"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="13 million"
                    label="Projected Americans with Alzheimer's by 2050"
                    source="Alzheimer's Association, 2025"
                  />
                </div>

                <H3>Prevalence by Age Group</H3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Age Group</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Estimated Prevalence</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Under 65", "~200,000", "Early-onset Alzheimer's"],
                        ["65–74", "~5%", "Rising slowly"],
                        ["75–84", "~13%", "Significant increase"],
                        ["85 and older", "~33%", "One in three affected"],
                      ].map(([age, prev, note]) => (
                        <tr key={age} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-medium text-slate-700">{age}</td>
                          <td className="px-4 py-3 text-slate-600">{prev}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <H3>Race and Ethnicity</H3>
                <P>
                  Dementia is not evenly distributed across population groups. Research suggests that older Black Americans are about twice as likely to have Alzheimer&rsquo;s or other dementias as older white Americans, and older Hispanic Americans are about one-and-a-half times as likely. Cardiovascular risk factors — which are more prevalent in some communities due to structural health disparities — are a significant contributing factor.
                </P>
              </section>

              <Divider />

              {/* ── Types of Dementia ───────────────────────────────────── */}
              <section aria-labelledby="types">
                <H2 id="types">Types of Dementia: Distribution</H2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="px-4 py-3 text-left font-semibold">Type</th>
                        <th className="px-4 py-3 text-left font-semibold">% of Cases</th>
                        <th className="px-4 py-3 text-left font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { type: "Alzheimer's disease", pct: "60–80%", note: "Most common; progressive", highlight: true },
                        { type: "Vascular dementia", pct: "~20%", note: "Often follows stroke or TIA", highlight: false },
                        { type: "Lewy body dementia", pct: "10–15%", note: "Includes DLB and PD dementia", highlight: false },
                        { type: "Frontotemporal dementia", pct: "5–10%", note: "Often earlier onset (50s–60s)", highlight: false },
                        { type: "Mixed dementia", pct: "Varies", note: "Two+ types; more common over 80", highlight: false },
                        { type: "Other types", pct: "~5%", note: "Creutzfeldt-Jakob, Huntington's, etc.", highlight: false },
                      ].map((row) => (
                        <tr key={row.type} className={["border-t border-slate-100", row.highlight ? "bg-teal-50" : ""].join(" ")}>
                          <td className={["px-4 py-3 font-medium", row.highlight ? "text-teal-800" : "text-slate-700"].join(" ")}>{row.type}</td>
                          <td className={["px-4 py-3", row.highlight ? "text-teal-700 font-semibold" : "text-slate-600"].join(" ")}>{row.pct}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <P>
                  It&rsquo;s important to note that many people, especially those over 80, have more than one type of dementia simultaneously &mdash; a condition called mixed dementia. This is increasingly recognized as more common than previously thought, as autopsy studies show multiple pathologies in the majority of older adults with dementia.
                </P>
              </section>

              <Divider />

              {/* ── Caregiving Burden ───────────────────────────────────── */}
              <section aria-labelledby="caregiving">
                <H2 id="caregiving">The Caregiving Burden</H2>
                <P>
                  The numbers around unpaid caregiving are staggering &mdash; and they represent one of the most underrecognized public health challenges in America.
                </P>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <StatCard
                    value="12 million"
                    label="Unpaid caregivers for people with Alzheimer's and other dementias"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="18.4 billion"
                    label="Hours of unpaid care provided annually"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="$346 billion"
                    label="Estimated value of unpaid caregiving (2024)"
                    source="Alzheimer's Association, 2025"
                  />
                  <StatCard
                    value="47%"
                    label="Of dementia caregivers report high emotional stress"
                    source="Alzheimer's Association, 2025"
                  />
                </div>

                <H3>Who Are Dementia Caregivers?</H3>
                <P>
                  The majority of unpaid dementia caregivers are adult children (primarily daughters and daughters-in-law) and spouses. Women provide the majority of unpaid caregiving. Many are simultaneously managing their own careers, raising children, and caring for their health &mdash; a situation called the &ldquo;sandwich generation.&rdquo;
                </P>
                <P>
                  The health consequences for caregivers are well-documented. Dementia caregivers have higher rates of depression, anxiety, and their own physical health problems compared to non-caregivers. The emotional burden is compounded by the nature of dementia &mdash; a slow, unpredictable loss of the person you know, with no clear endpoint. Psychologists call this &ldquo;ambiguous grief.&rdquo;
                </P>
                <Callout>
                  If you are a family caregiver for someone with dementia, you are not alone. More than 12 million Americans are in your situation. The Alzheimer&rsquo;s Association 24/7 Helpline (800-272-3900) provides free support, information, and referrals. Caregiver support groups are available in most communities and online.
                </Callout>
              </section>

              <Divider />

              {/* ── Financial Reality ───────────────────────────────────── */}
              <section aria-labelledby="financial">
                <H2 id="financial">The Financial Reality</H2>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <StatCard
                    value="$7,908/mo"
                    label="Median memory care cost, national (2025)"
                    source="CareScout 2025 Cost of Care Survey"
                  />
                  <StatCard
                    value="$94,896/yr"
                    label="Annual cost at national median"
                    source="CareScout 2025 Cost of Care Survey"
                  />
                  <StatCard
                    value="$350,000+"
                    label="Estimated lifetime dementia care cost (all settings)"
                    source="Alzheimer's Association"
                  />
                  <StatCard
                    value="~80%"
                    label="Of memory care paid out-of-pocket or through Medicaid"
                    source="Estimate; varies by state"
                  />
                </div>

                <H3>Cost Variation by Region</H3>
                <P>
                  Memory care costs vary significantly by geography. The national median of $7,908/month masks a wide range: costs in major metropolitan areas like San Francisco, New York, and Boston often exceed $9,000–$12,000/month, while costs in rural areas and lower-cost states can be closer to $4,500–$6,000/month.
                </P>
                <P>
                  The CareScout 2025 Cost of Care Survey provides state-by-state cost data for memory care and all major senior care options. Use our <ILink href="/tools/cost-calculator">Cost Calculator</ILink> to see what memory care costs in your specific market.
                </P>

                <H3>What Medicare and Medicaid Cover</H3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Payer</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Covers Memory Care?</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          payer: "Medicare",
                          covers: "No",
                          detail: "Covers short-term skilled nursing (up to 100 days), home health, and hospice only",
                        },
                        {
                          payer: "Medicaid",
                          covers: "Yes (many states)",
                          detail: "Through optional waiver programs; eligibility requires limited income and assets; waitlists common",
                        },
                        {
                          payer: "Long-term care insurance",
                          covers: "Yes (if policy in force)",
                          detail: "Most policies cover memory care; $150–$300/day typical; 2–5 year benefit period",
                        },
                        {
                          payer: "VA Aid & Attendance",
                          covers: "Yes (eligible veterans)",
                          detail: "Up to $2,431/month for qualifying veterans; surviving spouses up to $1,318/month",
                        },
                        {
                          payer: "Private pay",
                          covers: "Yes",
                          detail: "Personal savings, retirement funds, home equity; most families' primary or only resource",
                        },
                      ].map(({ payer, covers, detail }) => (
                        <tr key={payer} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-medium text-slate-700">{payer}</td>
                          <td className={["px-4 py-3 font-semibold", covers.startsWith("Yes") ? "text-teal-700" : "text-red-600"].join(" ")}>{covers}</td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <Divider />

              {/* ── Residential Care ────────────────────────────────────── */}
              <section aria-labelledby="residential">
                <H2 id="residential">Residential Care Utilization</H2>
                <P>
                  Despite the scale of dementia in America, the majority of people with the disease live at home &mdash; cared for by family members, not in residential care settings.
                </P>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Setting</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Estimated % of People with Dementia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Living at home (with or without paid help)", "~75%"],
                        ["Memory care / assisted living communities", "~10–12%"],
                        ["Nursing homes (skilled nursing facilities)", "~12–15%"],
                        ["Other residential settings", "~3–5%"],
                      ].map(([setting, pct]) => (
                        <tr key={setting} className="border-t border-slate-100">
                          <td className="px-4 py-3 text-slate-700">{setting}</td>
                          <td className="px-4 py-3 text-slate-600">{pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <P>
                  The proportion living at home drops significantly in moderate-to-severe stages of dementia, when around-the-clock supervision becomes necessary and the physical and emotional burden on family caregivers becomes unsustainable. Stage 5 and beyond is when most transitions to residential memory care occur.
                </P>
              </section>

              <Divider />

              {/* ── Workforce ───────────────────────────────────────────── */}
              <section aria-labelledby="workforce">
                <H2 id="workforce">Memory Care Workforce and Staffing</H2>
                <P>
                  One of the most significant challenges in memory care is workforce: there are not enough trained dementia care workers to meet current needs, let alone projected future growth.
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li>Annual staff turnover in memory care and assisted living averages <strong>40–60%</strong>, among the highest in any industry.</li>
                  <li>Dementia care workers are among the lowest-paid in the healthcare workforce despite providing highly skilled and emotionally demanding care.</li>
                  <li>The number of Americans who will need professional dementia care is expected to nearly double by 2050, while workforce supply lags.</li>
                  <li>High turnover means residents with dementia &mdash; who rely on familiar faces and consistent relationships &mdash; face constant disruption in their care.</li>
                </ul>
                <P>
                  When evaluating communities, staffing stability is one of the most important factors. Ask specifically about annual caregiver turnover rate and director tenure. Communities investing in staff through competitive compensation, training, and culture tend to have lower turnover and better resident outcomes.
                </P>
              </section>

              <Divider />

              {/* ── Future Trends ───────────────────────────────────────── */}
              <section aria-labelledby="future">
                <H2 id="future">Future Trends</H2>
                <P>
                  The demographic reality is clear: demand for memory care will substantially increase over the next two decades as the baby boom generation reaches the ages of highest dementia risk (75 and above).
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li>Americans age 85+ &mdash; the group with highest dementia risk &mdash; will more than double between 2020 and 2040.</li>
                  <li>The supply of memory care communities and skilled nursing beds is not projected to keep pace with demand.</li>
                  <li>Policy pressure is increasing to expand Medicaid coverage for residential memory care and reduce waitlists.</li>
                  <li>Technology &mdash; monitoring systems, AI-assisted care coordination, remote health monitoring &mdash; is being integrated into memory care operations, though its impact on care quality is still being studied.</li>
                  <li>Disease-modifying treatments (lecanemab, donanemab) may reduce the rate of progression for some early-stage patients, potentially delaying but not eliminating the need for residential care.</li>
                </ul>
              </section>

              <Divider />

              {/* ── Sources ─────────────────────────────────────────────── */}
              <section aria-labelledby="sources">
                <H2 id="sources">Sources and Further Reading</H2>
                <ul className="space-y-3 mb-6">
                  {[
                    {
                      label: "Alzheimer's Association 2025 Facts and Figures Report",
                      href: "https://www.alz.org/alzheimers-dementia/facts-figures",
                    },
                    {
                      label: "CareScout (formerly Genworth) 2025 Cost of Care Survey",
                      href: "https://www.carescout.com/cost-of-care",
                    },
                    {
                      label: "Centers for Disease Control and Prevention: Alzheimer's Disease and Healthy Aging",
                      href: "https://www.cdc.gov/aging/dementia/index.html",
                    },
                    {
                      label: "National Institute on Aging: Alzheimer's Disease and Related Dementias",
                      href: "https://www.nia.nih.gov/health/alzheimers",
                    },
                    {
                      label: "Centers for Medicare and Medicaid Services: Nursing Home Data",
                      href: "https://www.cms.gov/data-research/statistics-trends-and-reports/nursing-home-data-compendium",
                    },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors"
                      >
                        {label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <Divider />

              {/* ── FAQ ─────────────────────────────────────────────────── */}
              <section aria-labelledby="faq">
                <H2 id="faq">Frequently Asked Questions</H2>
                <FAQAccordion groups={FAQ_GROUPS} />
              </section>

              <Divider />

              <p className="text-xs text-slate-400 leading-relaxed mb-10 border-t border-slate-100 pt-6">
                <em>
                  Statistics on this page are drawn from the Alzheimer&rsquo;s Association 2025 Facts &amp; Figures Report, CareScout 2025 Cost of Care Survey, U.S. Census Bureau population projections, and CDC data. Figures are approximations and may vary. This guide is updated periodically as new data becomes available. Last updated: 2026.
                </em>
              </p>

            </article>

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
            Explore Your Care Options
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Understanding the data is the first step. Our Care Assessment takes 5 minutes and gives you a personalized recommendation for your loved one&rsquo;s specific situation.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Take the Free Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
