import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Memory Care vs. Assisted Living: Which Is Right? | OurTurnToCare",
  description:
    "Memory care vs. assisted living — a detailed comparison of cost, staffing, environment, and when each is appropriate. Free care assessment included.",
  openGraph: {
    title: "Memory Care vs. Assisted Living: Which Is Right?",
    description:
      "A detailed comparison to help families decide between memory care and assisted living.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/vs-assisted-living/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/vs-assisted-living/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure which is right?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment evaluates your loved one&rsquo;s specific needs
          and recommends the right level of care.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Compare costs
        </p>
        <p className="text-sm text-slate-500 mb-3">
          See memory care and assisted living pricing in your area.
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
          More comparisons
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "Memory care vs. nursing homes", href: "/memory-care/vs-nursing-home/" },
            { label: "Memory care vs. home care", href: "/memory-care/vs-home-care/" },
            { label: "Assisted living guide", href: "/assisted-living/" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function VsAssistedLivingPage() {
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
            <span className="text-slate-700 font-medium">vs. Assisted Living</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care vs. Assisted Living: A Complete Comparison
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            The most common question families ask &mdash; and the honest answer
            for each situation.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="short-answer">The Short Answer</H2>
              <P>
                If cognitive decline is the primary concern &mdash; wandering,
                safety risks, confusion, significant memory loss &mdash; memory
                care is usually the better fit. If physical care needs are the
                main issue and cognition is mostly intact, assisted living may
                be sufficient.
              </P>
              <P>
                The two levels of care serve different populations. Understanding
                what each offers, and where they fall short, helps families make
                the right choice without over-investing in care that isn&rsquo;t
                needed &mdash; or under-investing in care that is.
              </P>

              <Divider />

              <H2 id="side-by-side">Side-by-Side Comparison</H2>
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Feature</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Assisted Living</th>
                      <th className="px-4 py-3 text-left font-semibold text-teal-700">Memory Care</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Monthly cost (median)", al: "$5,511–$6,200", mc: "$7,908" },
                      { feature: "Dementia-specialized staff", al: "No (general personal care)", mc: "Yes (specific training required)" },
                      { feature: "Secured environment", al: "No — residents come/go freely", mc: "Yes — exits secured, monitored" },
                      { feature: "Staff-to-resident ratio", al: "Approx. 1:8 or higher", mc: "Approx. 1:5 or 1:6" },
                      { feature: "Resident independence", al: "High — self-directed", mc: "Lower — structured daily routine" },
                      { feature: "Activity programming", al: "Social and recreational", mc: "Cognitively adapted and therapeutic" },
                      { feature: "Wandering management", al: "Not typically available", mc: "Core function of the setting" },
                      { feature: "Sundowning support", al: "Limited", mc: "Specialized staff training" },
                      { feature: "Behavioral management", al: "Limited", mc: "Core competency" },
                      { feature: "Who it's best for", al: "Physical care needs; mostly intact cognition", mc: "Cognitive decline is the primary concern" },
                    ].map((row) => (
                      <tr key={row.feature}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">{row.feature}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">{row.al}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-teal-700 font-medium">{row.mc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider />

              <H2 id="when-al-is-enough">When Assisted Living Is the Right Choice</H2>
              <P>
                Assisted living is appropriate when the primary care need is
                physical assistance &mdash; help with bathing, dressing, meals,
                and medication management &mdash; while cognitive function remains
                relatively intact. The person can still:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Navigate the community independently</li>
                <li>Make their own decisions about daily activities</li>
                <li>Participate in standard social programming</li>
                <li>Be safely left without one-on-one supervision for periods of time</li>
                <li>Understand and follow simple safety rules</li>
              </ul>
              <P>
                Some people with early-stage dementia do well in assisted living,
                particularly communities that have a memory support or cognitive
                wellness program for early-stage residents. If the person can
                function with environmental supports and reminders but doesn&rsquo;t
                require secured exits or dedicated dementia programming, assisted
                living may be sufficient &mdash; and is typically $1,500&ndash;$2,500
                per month less expensive.
              </P>

              <Divider />

              <H2 id="when-mc-needed">When Memory Care Is Necessary</H2>
              <P>
                Memory care becomes necessary when cognitive decline creates
                safety risks or care needs that an assisted living environment
                isn&rsquo;t designed to manage:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Wandering or elopement attempts (trying to leave unsecured)</li>
                <li>Getting lost or seriously disoriented within the community</li>
                <li>Behavioral symptoms (aggression, agitation, sundowning) that disrupt the community</li>
                <li>Inability to participate in standard programming because it&rsquo;s not adapted to their cognitive level</li>
                <li>Safety incidents in the assisted living setting</li>
                <li>Staff expressing they cannot safely manage the person&rsquo;s needs</li>
              </ul>

              <Callout>
                The transition from assisted living to memory care is one of the
                more common moves families make &mdash; and it&rsquo;s often
                triggered not by a planned reassessment but by a safety incident
                or a staff conversation. If the assisted living staff are
                raising concerns, take them seriously. They see your loved one
                every day.
              </Callout>

              <Divider />

              <H2 id="the-cost-gap">The Cost Gap</H2>
              <P>
                Memory care costs approximately 20&ndash;30% more than assisted
                living in the same market. At the national median, that&rsquo;s
                roughly $1,700&ndash;$2,400 per month more. Over a year,
                that&rsquo;s $20,000&ndash;$29,000.
              </P>
              <P>
                For families considering keeping a loved one in assisted living
                a bit longer to defer the higher memory care cost: the risk is
                a safety incident that forces an emergency transition under
                worse circumstances. Proactive planning &mdash; moving when the
                person is still adjusting relatively well &mdash; typically leads
                to a smoother transition and better outcome than waiting for a crisis.
              </P>
              <P>
                Both assisted living and memory care may be partially funded by
                Medicaid waivers (in states that offer them), VA Aid &amp;
                Attendance, or long-term care insurance. Our{" "}
                <Link href="/tools/care-assessment" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
                  Care Assessment
                </Link>{" "}
                screens for these financial assistance programs.
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Still not sure which level of care is right?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Answer a few questions about your loved one&rsquo;s situation
                  and get a personalized recommendation from our Care Assessment.
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
