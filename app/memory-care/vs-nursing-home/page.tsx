import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Memory Care vs. Nursing Home: Key Differences Explained | OurTurnToCare",
  description:
    "Memory care vs. nursing homes — cost, medical care, environment, and when each is appropriate. Includes cost comparison table and free care assessment.",
  openGraph: {
    title: "Memory Care vs. Nursing Home: Key Differences Explained",
    description:
      "Detailed comparison of memory care and nursing homes to help families make the right choice.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/vs-nursing-home/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/vs-nursing-home/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure which is right?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment helps identify the right level of care for your loved one&rsquo;s specific needs.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">More comparisons</p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "Memory care vs. assisted living", href: "/memory-care/vs-assisted-living/" },
            { label: "Memory care vs. home care", href: "/memory-care/vs-home-care/" },
            { label: "Memory care costs", href: "/memory-care/costs/" },
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

export default function VsNursingHomePage() {
  return (
    <>
      <section
        className="px-4 sm:px-6 py-14 sm:py-20"
        style={{ background: "linear-gradient(to bottom, #f0fdfa, #ffffff)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/memory-care/" className="hover:text-teal-700 transition-colors">Memory Care</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">vs. Nursing Home</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care vs. Nursing Homes: Which Is Right for Dementia?
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What each provides, what each costs, and the situations where one is
            clearly the right choice over the other.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="key-difference">The Core Distinction</H2>
              <P>
                The key difference between memory care and nursing homes (skilled
                nursing facilities, or SNFs) is the type of care provided.
                Nursing homes are medical facilities that provide skilled clinical
                care &mdash; wound management, IV therapy, respiratory support,
                post-surgical rehabilitation &mdash; with licensed nurses on-site
                24 hours a day. Memory care is a residential environment specialized
                for the behavioral and cognitive needs of dementia, with a homelike
                setting and dementia-trained staff.
              </P>
              <P>
                For someone whose primary needs are cognitive and behavioral rather
                than medical, memory care is almost always the better environment.
                It&rsquo;s less institutional, less expensive, and more specifically
                designed for dementia care. Nursing home placement becomes
                necessary when complex medical needs are layered on top of dementia.
              </P>

              <Divider />

              <H2 id="comparison-table">Side-by-Side Comparison</H2>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Feature</th>
                      <th className="px-4 py-3 text-left font-semibold text-teal-700">Memory Care</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Nursing Home (SNF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: "Monthly cost (median)", mc: "$7,908", nh: "$9,197 (semi-private); $10,326 (private)" },
                      { f: "Licensed nurses on-site", mc: "Some hours; varies by state", nh: "24/7 RNs required" },
                      { f: "Skilled medical services", mc: "Not provided", nh: "Core service: wound care, IVs, PT/OT/ST" },
                      { f: "Environment", mc: "Homelike, residential", nh: "More clinical/institutional" },
                      { f: "Dementia specialization", mc: "Primary focus", nh: "Variable; some have dedicated units" },
                      { f: "Secured environment", mc: "Standard", nh: "Varies" },
                      { f: "Staff-to-resident ratio", mc: "~1:5 or 1:6 (day)", nh: "Regulated; often 1:8 or more" },
                      { f: "Medicare coverage", mc: "No", nh: "Up to 100 days (post-hospital)" },
                      { f: "Medicaid coverage", mc: "Waiver programs (varies)", nh: "Standard Medicaid benefit" },
                      { f: "Best for", mc: "Dementia with primarily behavioral/cognitive needs", nh: "Dementia + complex medical needs" },
                    ].map((row) => (
                      <tr key={row.f}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">{row.f}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-teal-700 font-medium">{row.mc}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">{row.nh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider />

              <H2 id="when-memory-care">When Memory Care Is the Better Choice</H2>
              <P>
                For most people with dementia in the moderate to severe stages
                (GDS Stages 5&ndash;6), memory care is the preferred environment.
                It&rsquo;s designed specifically for their condition, less expensive
                than nursing home care, and provides a more normalized living
                environment.
              </P>
              <P>
                Memory care is appropriate when:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Cognitive and behavioral symptoms are the primary concern</li>
                <li>There are no complex medical conditions requiring continuous skilled nursing</li>
                <li>The person can still ambulate (walk) independently or with minimal assistance</li>
                <li>The focus is on quality of life, engagement, and behavioral management</li>
              </ul>

              <H2 id="when-nursing-home">When a Nursing Home Becomes Necessary</H2>
              <P>
                Nursing home care becomes necessary when medical complexity exceeds
                what memory care can safely manage. Common triggers:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Significant wound care needs (pressure injuries at Stage 7)</li>
                <li>Feeding tube management</li>
                <li>IV medication administration</li>
                <li>Complex medication management requiring nursing assessment</li>
                <li>Frequent falls with injury requiring intensive physical rehabilitation</li>
                <li>Respiratory support needs</li>
                <li>Post-hospitalization recovery requiring skilled therapy</li>
              </ul>

              <Callout>
                Many people with dementia in Stage 7 are cared for in nursing
                homes, primarily because of the complex physical care needs
                (incontinence, pressure injury prevention, swallowing difficulties,
                infections) that develop at late stages. However, some memory care
                communities can care for residents through the end of life if they
                have appropriate nursing support on-site.
              </Callout>

              <H2 id="medicaid-difference">An Important Medicaid Distinction</H2>
              <P>
                Nursing home care is a standard Medicaid benefit in all states.
                Medicaid coverage for memory care in residential communities is
                only available through optional waiver programs, which vary by
                state and often have waitlists.
              </P>
              <P>
                If your loved one is Medicaid-eligible and needs residential care,
                a nursing home with a dedicated memory care unit may be an easier
                path to coverage than a standalone memory care community. An elder
                law attorney can advise on your state&rsquo;s specific options.
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Get a personalized recommendation
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Our Care Assessment evaluates your loved one&rsquo;s specific needs
                  and helps identify the right level of care and financial assistance options.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Take the Free Assessment →
                </Link>
              </div>

            </article>

            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24"><SidebarCTA /></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Take the Free Care Assessment</h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized recommendation. Takes about 4 minutes. No login required.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
          >
            Start the Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
