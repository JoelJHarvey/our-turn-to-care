import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Five-Star Ratings Explained | OurTurnToCare",
  description:
    "How the CMS Five-Star Quality Rating System works, all 15 quality measures explained, and how to actually use the ratings to compare nursing homes in your area.",
  openGraph: {
    title: "Nursing Home Five-Star Ratings Explained",
    description:
      "How the CMS Five-Star Quality Rating System works, all 15 quality measures, and how to compare nursing homes using the ratings.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/five-star-ratings/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/five-star-ratings/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure which care is right?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment evaluates your loved one&apos;s needs and gives a personalized recommendation.
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
            { label: "How to Evaluate Quality", href: "/nursing-homes/how-to-evaluate/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "Nursing Home Staffing", href: "/nursing-homes/staffing/" },
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

export default function FiveStarRatingsPage() {
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
            <span className="text-slate-700 font-medium">Five-Star Ratings</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Five-Star Ratings Explained
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            How the CMS rating system works, all 15 quality measures, and how to use the
            ratings effectively — including what they don&rsquo;t tell you.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="overview">What the Five-Star Rating System Is</H2>
              <P>
                The Centers for Medicare &amp; Medicaid Services (CMS) publishes a Five-Star
                Quality Rating System for every Medicare and Medicaid-certified nursing home
                in the United States. This is the most widely used tool for comparing
                nursing homes, and understanding how it works — including its limitations —
                helps you use it effectively.
              </P>
              <P>
                Every certified nursing home receives an overall rating of 1 to 5 stars,
                with 5 being the best. You can search for any facility at{" "}
                <a
                  href="https://www.medicare.gov/care-compare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  Medicare Care Compare
                </a>{" "}
                by entering a zip code or facility name.
              </P>

              <Divider />

              <H2 id="three-components">The Three Component Ratings</H2>
              <P>
                The overall star rating is calculated from three component ratings, each of
                which has its own star rating:
              </P>

              <div className="space-y-6 mb-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-xl text-lg font-bold flex items-center justify-center">1</div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">Health Inspection Rating</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Based on the three most recent annual health inspections plus any
                        complaint investigations. Inspectors visit every nursing home at
                        least once every 12–15 months (usually unannounced) and evaluate
                        medication management, infection control, resident rights, and more.
                        This is the component that&rsquo;s hardest to game — it reflects what
                        government inspectors actually observed. <strong className="text-slate-700">Most heavily weighted.</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-xl text-lg font-bold flex items-center justify-center">2</div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">Staffing Rating</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Based on the number of nursing staff hours per resident per day,
                        reported through the Payroll-Based Journal (PBJ) system. Includes
                        RN hours, total nursing hours (RNs + LPNs + CNAs), and weekend
                        staffing. CMS adjusts ratings based on the medical complexity of
                        the facility&rsquo;s residents — a facility caring for sicker patients
                        needs more staff to earn the same rating.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-xl text-lg font-bold flex items-center justify-center">3</div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-2">Quality Measures (QM) Rating</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Based on 15 clinical quality measures derived from resident assessment
                        data (the Minimum Data Set, or MDS). These measures track outcomes
                        like falls with injuries, pressure ulcers, urinary tract infections,
                        physical restraint use, and emergency department visits. Some measures
                        apply to short-stay residents (rehabilitation patients) and others to
                        long-stay residents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              <H2 id="quality-measures">The 15 Quality Measures — Explained</H2>
              <P>
                The quality measures are among the most useful data points for comparing
                facilities, especially when you focus on the measures most relevant to your
                parent&rsquo;s situation.
              </P>

              <H3>For Short-Stay Residents (Rehabilitation/Recovery)</H3>
              <ul className="list-none space-y-2 mb-6">
                {[
                  ["1.", "Percentage who were rehospitalized after admission — a key indicator of whether the facility manages medical issues without sending residents back to the hospital unnecessarily."],
                  ["2.", "Percentage who had an outpatient emergency department visit — similar to rehospitalization; a high rate may indicate inadequate on-site medical management."],
                  ["3.", "Percentage who self-report moderate to severe pain — pain management quality."],
                  ["4.", "Percentage with pressure ulcers that are new or worsened — whether rehabilitation patients are being repositioned and monitored properly."],
                  ["5.", "Percentage who were successfully discharged to the community — the rehab success rate. Higher is better."],
                  ["6.", "Percentage who received an antipsychotic medication — use of antipsychotics for short-stay residents is a red flag in many cases."],
                ].map(([num, desc]) => (
                  <li key={num as string} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 font-bold text-teal-600 w-5">{num}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <H3>For Long-Stay Residents (Permanent Residents)</H3>
              <ul className="list-none space-y-2 mb-6">
                {[
                  ["7.", "Percentage experiencing one or more falls with major injury — a critical safety indicator for long-stay residents."],
                  ["8.", "Percentage with a urinary tract infection — UTIs are often preventable; a high rate suggests inadequate hygiene and hydration monitoring."],
                  ["9.", "Percentage who self-report moderate to severe pain — ongoing pain management."],
                  ["10.", "Percentage with pressure ulcers that are new or worsened — one of the most important quality indicators for bed-bound or mobility-impaired residents."],
                  ["11.", "Percentage who were physically restrained — use of physical restraints should be extremely rare in a well-run facility."],
                  ["12.", "Percentage who received an antipsychotic medication — approximately 14% nationally; high rates warrant scrutiny, especially for residents without a psychiatric diagnosis."],
                  ["13.", "Percentage whose ability to move independently worsened — whether residents are being helped to maintain mobility or are declining from disuse."],
                  ["14.", "Percentage whose need for help with daily activities has increased — measures functional decline."],
                  ["15.", "Percentage who had a catheter inserted and left in their bladder — unnecessary catheter use is a risk for infection and should be minimized."],
                ].map(([num, desc]) => (
                  <li key={num as string} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 font-bold text-teal-600 w-5">{num}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="how-to-use">How to Actually Use the Ratings</H2>
              <P>
                For each facility on Medicare Care Compare, you can see the overall star
                rating, each component rating, specific quality measure results, staffing
                data, health inspection results with dates, and detailed deficiency reports.
              </P>
              <H3>Look Beyond the Overall Rating</H3>
              <P>
                A facility might have 4 stars overall but only 2 stars on health inspections
                — meaning the staffing and quality measures pulled up the average. That gap
                is a warning sign. Conversely, a 3-star facility with 4 stars on health
                inspections and 2 stars on staffing might be a well-run place that&rsquo;s
                short-staffed (a potentially solvable problem) rather than a poorly managed
                one.
              </P>
              <H3>Focus on the Quality Measures That Matter for Your Parent</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "If your parent has dementia: antipsychotic medication use rates (#12) and physical restraint rates (#11)",
                  "If they're entering for rehabilitation: rehospitalization rates (#1) and successful community discharge rates (#5)",
                  "If they have mobility issues: fall rates (#7) and pressure ulcer rates (#10)",
                  "For all long-stay residents: pain management (#9) and functional decline measures (#13, #14)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Callout>
                Read the actual inspection reports, not just the star rating. Look for
                patterns: Are the same deficiencies cited repeatedly across multiple
                inspections? That suggests a systemic issue rather than a one-time problem.
              </Callout>

              <Divider />

              <H2 id="limitations">Limitations of the Five-Star System</H2>
              <Warning>
                The rating system is valuable but imperfect. Use it as a starting point for
                narrowing your options, not as the final word. A high-rated facility that
                doesn&rsquo;t meet your parent&rsquo;s specific needs is worse than a moderately-rated
                facility that specializes in exactly what they require.
              </Warning>
              <P>Key limitations to understand:</P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Facilities can improve quality measure scores through better documentation rather than better care",
                  "Staffing data is self-reported (though CMS audits it)",
                  "Health inspections happen only once a year and facilities sometimes prepare for them",
                  "The system doesn't measure food quality, staff kindness, cleanliness, or resident happiness",
                  "A facility's rating can change significantly from one inspection cycle to the next",
                  "New facilities have limited data and may not yet have a full star rating",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                Always supplement the star rating with in-person visits, conversations with
                current residents and families, and your own observations. See our complete
                guide on{" "}
                <Link href="/nursing-homes/how-to-evaluate/" className="text-teal-700 underline hover:text-teal-900">
                  how to evaluate nursing home quality
                </Link>{" "}
                and the{" "}
                <Link href="/nursing-homes/questions-to-ask/" className="text-teal-700 underline hover:text-teal-900">
                  40 questions to ask on a tour
                </Link>.
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Star ratings are just the starting point. Our care assessment helps you
            understand what level and type of care is right for your parent&rsquo;s specific
            situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/care-assessment"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Take the Care Assessment →
            </Link>
            <Link
              href="/nursing-homes/how-to-evaluate/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              How to Evaluate Quality →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
