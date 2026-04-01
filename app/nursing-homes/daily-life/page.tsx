import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Expect: Daily Life in a Nursing Home | OurTurnToCare",
  description:
    "A realistic look at daily life in a nursing home — the daily schedule, meals and nutrition, activities and social life, and how to maintain meaningful connections.",
  openGraph: {
    title: "What to Expect: Daily Life in a Nursing Home",
    description:
      "A realistic look at daily life in a nursing home — the daily schedule, meals, activities, and maintaining connections.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/daily-life/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/daily-life/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Is nursing home care the right fit?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment evaluates your parent&apos;s specific needs and recommends the most appropriate level of care.
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
            { label: "The Transition Guide", href: "/nursing-homes/transition-guide/" },
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
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

export default function DailyLifePage() {
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
            <span className="text-slate-700 font-medium">Daily Life</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            What to Expect: Daily Life in a Nursing Home
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            A realistic look at what daily life looks like — the routines, meals, activities,
            and what good facilities do to support quality of life alongside quality of care.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="daily-schedule">A Typical Daily Schedule</H2>
              <P>
                Nursing homes operate on structured schedules — which provides consistency
                and predictability for residents (especially those with dementia), ensures
                care routines happen reliably, and helps staff manage their workloads
                across a large number of residents.
              </P>

              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Typical Activities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ["6:30–9:00 AM", "Morning care — CNAs assist with waking, personal hygiene, dressing, and getting to breakfast. This is often the busiest and most demanding shift."],
                      ["9:00–11:30 AM", "Therapy sessions (physical, occupational, speech), morning activities, medication administration, physician or nurse practitioner rounds."],
                      ["11:30 AM–1:00 PM", "Lunch — the main meal of the day at many facilities. Dining together in a common room is encouraged; some residents dine in their rooms."],
                      ["1:00–4:30 PM", "Afternoon activities, therapy sessions, rest time, visiting hours, and additional programming."],
                      ["4:30–8:00 PM", "Dinner, evening activities, family visiting, personal care assistance, medication administration."],
                      ["8:00 PM–6:30 AM", "Night care — a smaller overnight staff provides care for residents who are awake, monitors vital signs, and responds to call lights."],
                    ].map(([time, desc], i) => (
                      <tr key={time} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{time}</td>
                        <td className="px-4 py-3 text-slate-600 leading-relaxed">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <P>
                This is a general framework — individual schedules vary by facility and by
                resident. Good nursing homes work to accommodate residents&rsquo; personal
                preferences for when they wake, when they bathe, and what they eat, within
                the constraints of a staffed care environment.
              </P>

              <Divider />

              <H2 id="meals">Meals and Nutrition</H2>
              <P>
                Federal regulations require nursing homes to provide three nutritionally
                balanced meals per day plus snacks. A registered dietitian oversees menu
                planning and nutritional standards. Menus must accommodate medically
                necessary dietary restrictions (low sodium, diabetic, texture-modified) and
                should offer choices at each meal.
              </P>
              <H3>What Good Nutrition Care Looks Like</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Residents receive foods they actually like — facilities that ask about preferences and honor them have better nutritional outcomes",
                  "Adequate staffing during meals so residents who need help eating receive it without rushing",
                  "Proper positioning — seated upright at the table rather than eating in bed when possible",
                  "Adequate hydration — fluids available throughout the day, not just at meals",
                  "Weight monitoring — staff track weight changes and escalate concerns promptly",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                Malnutrition and dehydration are real concerns — an estimated 15–50% of
                nursing home residents are affected by some degree of malnutrition. When
                visiting, join for a meal if possible. Observe the food quality, the
                assistance provided, and how residents are helped to eat.
              </Callout>

              <Divider />

              <H2 id="activities">Activities and Social Life</H2>
              <P>
                Federal law requires nursing homes to provide activity programs that meet
                residents&rsquo; interests and needs. Activities are not just entertainment —
                they are a fundamental part of quality of life and have measurable health
                benefits, including reduced depression, improved cognitive function, and
                better physical outcomes.
              </P>
              <H3>What a Strong Activities Program Includes</H3>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {[
                  "Physical exercise and movement classes",
                  "Creative activities (art, crafts, music)",
                  "Social events and group programs",
                  "Educational programs and lectures",
                  "Religious services and spiritual care",
                  "Outings and community trips",
                  "Pet therapy",
                  "Intergenerational programs",
                  "Cognitive stimulation activities",
                  "Gardening and outdoor time",
                ].map((activity) => (
                  <div key={activity} className="flex gap-2 text-sm text-slate-600">
                    <span className="flex-shrink-0 mt-1 text-teal-500">✓</span>
                    {activity}
                  </div>
                ))}
              </div>
              <P>
                When evaluating a facility, ask to see a recent activity calendar. A sparse
                calendar — or one showing mostly passive activities like watching TV — is a
                sign of a weak program. Also ask whether activities are adapted for
                residents at different cognitive and physical levels.
              </P>

              <Divider />

              <H2 id="connections">Maintaining Connections with Family and Community</H2>
              <P>
                Research consistently shows that nursing home residents with frequent family
                involvement receive better care and have better health outcomes. This isn&rsquo;t
                just correlation — staff pay more attention to residents whose families are
                engaged and visible, and residents themselves are more likely to advocate
                for their own needs when they know family is nearby and attentive.
              </P>
              <H3>Ways to Stay Connected</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Regular in-person visits — consistency matters more than frequency",
                  "Phone and video calls between visits",
                  "Involving your parent in family events — many nursing homes actively support outings",
                  "Attending care plan meetings and staying informed about your parent's condition",
                  "Building relationships with the staff who care for your parent daily",
                  "Participating in the facility's family council if one exists",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                Most nursing homes have generous visiting policies — residents have a right
                to receive visitors. The quality of daily life for a nursing home resident
                is shaped by both the facility&rsquo;s care and by the love and presence of
                family. Both matter.
              </P>

              <Divider />

              <H2 id="personal-space">Personal Space and Belongings</H2>
              <P>
                Nursing home residents can personalize their living space with personal
                items from home — photographs, a favorite chair or lamp (if space allows),
                artwork, plants, and small decorative items. Ask the facility what&rsquo;s allowed
                and what the dimensions of the room are before moving in.
              </P>
              <P>
                Label every personal item clearly with your parent&rsquo;s name. Despite best
                efforts, items get mixed up in laundry and during room changes. Items with
                sentimental value should either be labeled very clearly or left at home.
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
            Supporting Your Parent Through the Transition
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            The first weeks in a nursing home are often the hardest. Read our transition
            guide for practical advice on helping your parent adjust — and managing your
            own emotions through the process.
          </p>
          <Link
            href="/nursing-homes/transition-guide/"
            className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
          >
            Read the Transition Guide →
          </Link>
        </div>
      </section>
    </>
  );
}
