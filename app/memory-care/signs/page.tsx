import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signs It's Time for Memory Care: When to Make the Move | OurTurnToCare",
  description:
    "The specific signs that indicate memory care is needed — safety incidents, care needs, behavioral symptoms, and quality of life factors explained for families.",
  openGraph: {
    title: "Signs It's Time for Memory Care: When to Make the Move",
    description:
      "The specific safety, behavioral, and care signs that indicate it's time to consider memory care.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/signs/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/signs/",
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

function SignCard({
  icon,
  title,
  signs,
  urgency,
}: {
  icon: string;
  title: string;
  signs: string[];
  urgency: "high" | "moderate" | "quality-of-life";
}) {
  const urgencyConfig = {
    high: { label: "High urgency", color: "bg-red-100 text-red-700 border-red-200" },
    moderate: { label: "Moderate urgency", color: "bg-amber-100 text-amber-700 border-amber-200" },
    "quality-of-life": { label: "Quality of life", color: "bg-teal-100 text-teal-700 border-teal-200" },
  }[urgency];

  return (
    <div className="border border-slate-200 rounded-2xl p-6 mb-5">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${urgencyConfig.color}`}>
              {urgencyConfig.label}
            </span>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {signs.map((sign, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="text-teal-400 mt-1 flex-shrink-0">•</span>
            {sign}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure what level of care is needed?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment evaluates your loved one&rsquo;s specific situation
          and gives you a personalized recommendation in about 4 minutes.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "The 7 stages of dementia", href: "/memory-care/stages/" },
            { label: "Types of dementia", href: "/memory-care/types-of-dementia/" },
            { label: "Memory care vs. home care", href: "/memory-care/vs-home-care/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
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

export default function SignsPage() {
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
            <span className="text-slate-700 font-medium">Signs It&apos;s Time</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Signs It&rsquo;s Time for Memory Care: A Guide for Families
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            There&rsquo;s rarely a single clear moment. Here&rsquo;s what the
            specific signals look like &mdash; and what to do when you see them.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Most families don&rsquo;t have a single moment when the decision
                becomes obvious. It&rsquo;s an accumulation &mdash; incidents
                that alone are worrying but manageable, until they&rsquo;re not.
                Understanding what the specific warning signs look like helps
                families act before a crisis forces the decision.
              </P>
              <P>
                The signs below are organized by urgency. High-urgency signs
                indicate immediate safety risk. Moderate-urgency signs indicate
                care needs are escalating. Quality-of-life signs indicate that
                a more supportive environment may significantly improve your
                loved one&rsquo;s daily experience.
              </P>

              <Divider />

              <H2 id="safety-signs">Safety Signs: High Urgency</H2>
              <P>
                These signs indicate your loved one is at risk of serious harm
                in their current environment. If you&rsquo;re seeing multiple
                of these, the conversation about memory care should happen now.
              </P>

              <SignCard
                icon="🚪"
                title="Wandering and Elopement"
                urgency="high"
                signs={[
                  "Has left the home and been found disoriented, sometimes far from home",
                  "Has been reported missing (even briefly) by neighbors or passersby",
                  "Wanders at night, sometimes leaving the house",
                  "Cannot reliably find their way back to familiar locations",
                  "Gets lost in their own neighborhood or on familiar routes",
                ]}
              />

              <SignCard
                icon="🔥"
                title="Home Safety Incidents"
                urgency="high"
                signs={[
                  "Leaves stove or oven on, sometimes with food burning",
                  "Has caused a small fire or near-miss fire incident",
                  "Forgets water running (flooding risk)",
                  "Takes medications incorrectly — wrong dose, wrong frequency, wrong drug",
                  "Has fallen more than once due to disorientation (not just physical weakness)",
                ]}
              />

              <SignCard
                icon="🚗"
                title="Driving Safety"
                urgency="high"
                signs={[
                  "Has gotten lost while driving in familiar areas",
                  "Has had an accident or near-miss accident",
                  "Has received a ticket or warning for driving erratically",
                  "Family members are afraid to let them drive but feel they can't stop them",
                  "Physician has recommended driving cessation but they refuse",
                ]}
              />

              <Divider />

              <H2 id="care-needs-signs">Care Needs Signs: Moderate Urgency</H2>
              <P>
                These signs indicate care needs are escalating beyond what the
                current environment &mdash; whether home, assisted living, or
                family care &mdash; can safely manage.
              </P>

              <SignCard
                icon="👤"
                title="Cannot Be Left Alone Safely"
                urgency="moderate"
                signs={[
                  "Cannot be safely left alone for any period of time",
                  "Family caregiver is sleeping with \"one eye open\" for safety reasons",
                  "24-hour supervision is required but not sustainable by family caregivers",
                  "Has called 911 inappropriately or cannot recognize an emergency that needs help",
                  "Family caregiver's health is declining due to caregiving burden",
                ]}
              />

              <SignCard
                icon="🧘"
                title="Behavioral Symptoms Overwhelming the Household"
                urgency="moderate"
                signs={[
                  "Significant agitation, aggression, or combativeness during personal care",
                  "Severe sundowning that disrupts the household every evening",
                  "Persistent accusations toward family caregivers (paranoia)",
                  "Sleep disturbances severe enough to prevent family caregiver from sleeping",
                  "Behavioral symptoms that neighbors have noticed or complained about",
                ]}
              />

              <SignCard
                icon="🏥"
                title="Repeated Health Crises"
                urgency="moderate"
                signs={[
                  "Multiple emergency room visits in recent months",
                  "Hospitalization related to falls, medication errors, or neglect",
                  "Repeated infections (UTIs, pneumonia) related to inadequate self-care",
                  "Significant unintended weight loss from not eating adequately",
                  "Incontinence that is not being managed appropriately at home",
                ]}
              />

              <Divider />

              <H2 id="quality-of-life-signs">Quality of Life Signs</H2>
              <P>
                These signs don&rsquo;t indicate immediate danger, but they do
                suggest that a well-designed memory care environment might
                significantly improve your loved one&rsquo;s quality of life
                &mdash; a consideration that families sometimes underweight.
              </P>

              <SignCard
                icon="😔"
                title="Social Isolation and Withdrawal"
                urgency="quality-of-life"
                signs={[
                  "Has stopped participating in activities or social engagement they previously enjoyed",
                  "Shows no interest in leaving the house",
                  "Has lost connection with friends and community",
                  "Spends most of the day watching TV or sitting alone",
                  "Family caregiver is the only meaningful social interaction",
                ]}
              />

              <SignCard
                icon="😟"
                title="Increased Anxiety and Confusion in Current Setting"
                urgency="quality-of-life"
                signs={[
                  "Seems more anxious and confused at home than they used to be",
                  "Cannot follow familiar routines without significant assistance",
                  "Repeatedly asks the same questions despite answers",
                  "Becomes distressed when the familiar caregiver leaves the room",
                  "Has expressed fear or unhappiness that doesn't seem connected to specific causes",
                ]}
              />

              <Divider />

              <H2 id="caregiver-signs">Signs in the Caregiver</H2>
              <P>
                Sometimes the signal that memory care is needed comes not from
                the person with dementia but from the family caregiver. These
                caregiver signs are legitimate indicators that the current care
                arrangement is not sustainable:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>Chronic sleep deprivation due to caregiving demands</li>
                <li>Declining own health (skipping medical appointments, not exercising, poor diet)</li>
                <li>Feeling rage or resentment toward the person with dementia</li>
                <li>Feeling isolated from friends, family, and your own life</li>
                <li>Physical symptoms of stress: headaches, gastrointestinal issues, high blood pressure</li>
                <li>Depression or anxiety that has developed or worsened since becoming a caregiver</li>
                <li>Healthcare providers expressing concern about the caregiver&rsquo;s health</li>
              </ul>
              <P>
                Caregiver burnout is not a character flaw. It is a predictable
                physiological response to providing intensive care without
                adequate support. Recognizing your own limits and responding to
                them is an act of caregiving &mdash; a burned-out caregiver
                cannot provide good care.
              </P>

              <Callout>
                The research on caregiver health is sobering: family caregivers
                of people with dementia have significantly elevated rates of
                depression, immune dysfunction, and mortality compared to
                non-caregivers. Taking care of yourself isn&rsquo;t separate
                from taking care of your loved one &mdash; it&rsquo;s a
                prerequisite for it.
              </Callout>

              <Divider />

              <H2 id="what-to-do">What to Do When You See These Signs</H2>
              <P>
                Seeing these signs doesn&rsquo;t mean the decision is immediate
                &mdash; but it means the conversation should start now, before
                a crisis forces the issue.
              </P>
              <ol className="list-decimal list-inside space-y-3 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>
                  <strong>Talk to your loved one&rsquo;s physician.</strong>{" "}
                  Share what you&rsquo;re observing. Ask for a cognitive
                  assessment if one hasn&rsquo;t been done recently. Get their
                  clinical perspective on care level.
                </li>
                <li>
                  <strong>Take our Care Assessment.</strong>{" "}
                  It walks through the specific signals you&rsquo;re seeing and
                  gives you a personalized recommendation.
                </li>
                <li>
                  <strong>Start researching communities</strong> &mdash; even
                  if you&rsquo;re not ready to make a decision. Knowing what&rsquo;s
                  available in your area, what it costs, and what the waitlists
                  look like gives you options.
                </li>
                <li>
                  <strong>Consult an elder law attorney</strong> about financial
                  planning, Medicaid eligibility, and powers of attorney if
                  these aren&rsquo;t already in place.
                </li>
              </ol>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Take the Free Care Assessment
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Answer a few questions about your loved one&rsquo;s specific
                  situation and get a personalized care recommendation, cost
                  estimates, and a screening for financial assistance programs.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Start the Assessment →
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
