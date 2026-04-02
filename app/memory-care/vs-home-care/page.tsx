import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Memory Care vs. Home Care for Dementia: The Real Cost Comparison | OurTurnToCare",
  description:
    "Memory care vs. 24/7 home care for dementia — the cost comparison that surprises most families. Includes what home care can and can't provide for dementia.",
  openGraph: {
    title: "Memory Care vs. Home Care for Dementia: The Real Cost Comparison",
    description:
      "Why 24/7 in-home care for dementia costs 2-3x more than memory care — and what each option provides.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/vs-home-care/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/vs-home-care/",
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
          Our Care Assessment evaluates your loved one&rsquo;s specific needs and recommends the right level of care.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Compare costs</p>
        <p className="text-sm text-slate-500 mb-3">See local pricing for memory care and home care.</p>
        <Link
          href="/tools/cost-calculator"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Open Cost Calculator →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">More comparisons</p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "Memory care vs. assisted living", href: "/memory-care/vs-assisted-living/" },
            { label: "Memory care vs. nursing homes", href: "/memory-care/vs-nursing-home/" },
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

export default function VsHomeCarePage() {
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
            <span className="text-slate-700 font-medium">vs. Home Care</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care vs. Home Care for Dementia: The Cost Reality
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Keeping a dementia patient at home feels like the loving choice.
            The numbers &mdash; and the safety realities &mdash; tell a more
            complicated story.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="the-cost-reality">The Number That Changes the Conversation</H2>
              <P>
                Round-the-clock in-home care for a person with moderate-to-severe
                dementia (Stages 5&ndash;6) requires multiple professional
                caregivers working in shifts. The math:
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-sm min-w-[420px]">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 text-left font-semibold">Option</th>
                      <th className="px-4 py-3 text-left font-semibold">Monthly Cost</th>
                      <th className="px-4 py-3 text-left font-semibold">Annual Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { option: "Part-time home aide (44 hrs/week)", mo: "$5,720", yr: "$68,640", highlight: false },
                      { option: "Memory care community", mo: "$7,908", yr: "$94,896", highlight: true },
                      { option: "24/7 professional home care (shifts)", mo: "$15,000–$20,000+", yr: "$180,000–$240,000+", highlight: false },
                      { option: "Live-in caregiver (single aide)", mo: "$8,000–$12,000", yr: "$96,000–$144,000", highlight: false },
                    ].map((row) => (
                      <tr key={row.option} className={row.highlight ? "bg-teal-50 font-semibold" : ""}>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-700"}`}>{row.option}</td>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-600"}`}>{row.mo}</td>
                        <td className={`px-4 py-3 border-t border-slate-100 ${row.highlight ? "text-teal-800" : "text-slate-600"}`}>{row.yr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mb-6">Source: CareScout 2025 Cost of Care Survey</p>

              <Callout>
                A single live-in caregiver cannot legally work 24/7 &mdash; labor
                laws require breaks and rest periods. True round-the-clock coverage
                requires at least two or three full-time aides in rotation, plus
                supervision, backup, and management overhead. This is why the real
                cost of 24/7 home care typically reaches $15,000&ndash;$20,000 per month.
              </Callout>

              <Divider />

              <H2 id="what-home-care-cant-provide">What Home Care Can&rsquo;t Provide</H2>
              <P>
                Beyond cost, there are genuine care quality differences that
                matter for someone with moderate-to-severe dementia:
              </P>

              <H3>No Secured Environment</H3>
              <P>
                Home care cannot replicate the secured, dementia-proofed
                environment of a memory care community. Wandering out of the
                house &mdash; especially at night or when the caregiver is
                briefly occupied &mdash; is one of the most serious safety risks
                in home-based dementia care. Securing a home adequately (door
                alarms, all-room monitoring, outdoor fence) is expensive and
                still imperfect.
              </P>

              <H3>No Peer Community</H3>
              <P>
                Humans are social, and dementia doesn&rsquo;t change that.
                Memory care communities provide structured social interaction
                with peers at a similar cognitive level, which research shows
                maintains function longer and improves quality of life.
                Home-based care, by contrast, is often socially isolating
                for the person receiving care.
              </P>

              <H3>Caregiver Continuity Challenges</H3>
              <P>
                Professional home caregivers call out sick, leave agencies,
                go on vacation. Each transition means a new person in your
                loved one&rsquo;s intimate space &mdash; deeply disorienting
                for someone with dementia, for whom familiar routines and faces
                are essential to emotional stability.
              </P>

              <H3>Caregiver Burnout of Family Members</H3>
              <P>
                When home care is supplemented by family caregiving (the most
                common arrangement), the toll on family members is substantial.
                Caregiver burnout is not a personal failure &mdash; it&rsquo;s
                a predictable outcome of providing intensive care without
                adequate support. The health consequences for family caregivers
                are well-documented, including higher rates of depression,
                anxiety, and physical illness.
              </P>

              <Divider />

              <H2 id="when-home-care-works">When Home Care Is the Right Choice</H2>
              <P>
                Home care is often the right choice in the earlier stages of
                dementia (Stages 3&ndash;4), when:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>The person can be safely left alone for periods of time</li>
                <li>Cognitive decline is mild and not yet creating safety risks</li>
                <li>Family caregivers can provide meaningful support without burning out</li>
                <li>Part-time professional care (a few hours per day) is sufficient</li>
                <li>The person is strongly attached to their home and the emotional benefit is significant</li>
              </ul>
              <P>
                A staged approach often works well: start with part-time home
                care in early stages, add adult day programs for social
                engagement, and transition to memory care when needs escalate
                to requiring full-time supervision.
              </P>

              <Divider />

              <H2 id="the-transition">Planning the Transition</H2>
              <P>
                The families who transition most successfully from home care to
                memory care are the ones who plan ahead rather than waiting
                for a crisis. Typical crisis triggers that force an unplanned
                transition: a wandering incident, a fall, caregiver burnout,
                or a hospitalization.
              </P>
              <P>
                If you&rsquo;re currently providing home care and can foresee
                the trajectory &mdash; increasing supervision needs, declining
                ability to be alone, behavioral symptoms escalating &mdash;
                starting to tour memory care communities now gives you the
                luxury of a thoughtful choice rather than an emergency decision.
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Not sure which care level is right right now?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Our Care Assessment evaluates your loved one&rsquo;s specific
                  situation and helps identify the right level of care &mdash;
                  including whether home care is still appropriate.
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
