import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "What to Expect: Daily Life in Memory Care | OurTurnToCare",
  description:
    "A day-in-the-life walkthrough of memory care: morning routines, activities, mealtimes, evening care, sleep, and why routine matters for people with dementia.",
  openGraph: {
    title: "What to Expect: Daily Life in Memory Care",
    description:
      "What happens each day in memory care — from morning routines to evening wind-down — and why structured daily life improves quality of life for residents.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/daily-life/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/daily-life/",
  },
};

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Daily Life in Memory Care",
    items: [
      {
        q: "What do residents do all day in memory care?",
        a: "A well-run memory care community provides a structured schedule of meaningful activities: personal care assistance in the morning, cognitive stimulation activities, physical movement, social engagement, mealtimes, creative activities (music, art, gardening), and quiet time. Activities are adapted to different cognitive levels so residents at all stages can participate meaningfully.",
      },
      {
        q: "Can family members visit whenever they want?",
        a: "In most states, regulations require memory care communities to permit family visits during reasonable hours. Some communities have preferred visiting windows, but true restrictions on family access are limited to specific circumstances (facility-wide infection protocols, etc.). Consistent, predictable visits help residents feel secure — many families find that visiting at the same time each day or week works best for their loved one.",
      },
      {
        q: "What happens if my loved one doesn't want to participate in activities?",
        a: "Good memory care staff are skilled at gentle engagement. They'll try different approaches — a familiar song, a conversation about the person's past, a hands-on activity connected to their history — before accepting that a resident doesn't want to participate. Some days, not participating is fine. The goal is to offer meaningful opportunities and meet the resident where they are.",
      },
      {
        q: "Can my loved one keep their own schedule and preferences?",
        a: "Yes, within the structure of the community. Good communities maintain care plans that reflect each resident's preferences — preferred wake time, food preferences, activity interests, sleep schedule. These are honored as much as operationally possible. When touring, ask: 'What would happen if my mother prefers to sleep until 9 AM rather than 7?'",
      },
      {
        q: "What happens when dementia causes sleep problems?",
        a: "Sleep disturbances are extremely common in dementia — including sundowning (increased confusion and agitation in late afternoon/evening) and night wandering. Memory care staff are trained to manage these. Interventions include maintaining consistent sleep routines, light therapy, structured evening activities to reduce sundowning, safe nighttime supervision for wandering residents, and medication when appropriate. Ask any community you're evaluating about their specific sleep and sundowning protocols.",
      },
      {
        q: "How are meals handled in memory care?",
        a: "Mealtimes in memory care are carefully managed. Communities adapt for residents who need assistance eating, have swallowing difficulties (dysphagia), or are at risk of choking. Dining is a social event — usually in a common dining room — and is designed to be calm and unhurried. Good communities accommodate food preferences, cultural dietary needs, and textures. Ask about the dining experience and whether a registered dietitian reviews residents' nutritional needs.",
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

function TimeBlock({
  time,
  title,
  children,
}: {
  time: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-24 pt-1">
        <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-center leading-snug">
          {time}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">{title}</h3>
        <div className="text-[1.0625rem] leading-[1.75] text-slate-600">{children}</div>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "How memory care is designed", href: "/memory-care/facility-design/" },
            { label: "Red flags to watch for", href: "/memory-care/red-flags/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "56 questions to ask when touring", href: "/memory-care/questions-to-ask/" },
            { label: "After placement: what to expect", href: "/memory-care/after-placement/" },
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

      <div className="bg-teal-50 rounded-2xl border border-teal-100 p-5">
        <p className="text-sm font-semibold text-teal-800 mb-2">
          Questions for your tour
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Use our 56-question checklist to ask the right questions about daily routines, activities, and care approaches.
        </p>
        <Link
          href="/memory-care/questions-to-ask/"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        >
          Get the Checklist →
        </Link>
      </div>
    </div>
  );
}

export default function MemoryCareDailyLifePage() {
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
            <span className="text-slate-700 font-medium">Daily Life</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            What to Expect: Daily Life in Memory Care
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            A walkthrough of a typical day in memory care &mdash; from wake-up through sleep &mdash; and why structured daily life matters so much for residents with dementia.
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
                One of the most common questions families ask before placing a loved one in memory care is simply: <em>what will their day actually look like?</em> The answer matters, because for a person with dementia, daily structure isn&rsquo;t just a schedule &mdash; it&rsquo;s part of the care itself.
              </P>

              <Divider />

              {/* ── Why Routine Matters ─────────────────────────────────── */}
              <section aria-labelledby="why-routine">
                <H2 id="why-routine">Why Routine Matters</H2>
                <P>
                  For people with dementia, predictability provides a form of safety that nothing else can replicate. When the sequence of daily events is consistent &mdash; wake at the same time, breakfast in the same place, familiar activities at familiar hours &mdash; the person&rsquo;s world becomes navigable even when memory fails.
                </P>
                <P>
                  Disruption of routine is one of the most common triggers for behavioral symptoms in dementia: agitation, aggression, wandering, refusal of care. When families report that their loved one &ldquo;did so much better at first&rdquo; and then deteriorated, the loss of familiar routine is often a significant contributing factor.
                </P>
                <P>
                  A good memory care community understands this and builds the entire day around it. The schedule is consistent not because it&rsquo;s convenient for staff, but because consistency is genuinely therapeutic.
                </P>
                <Callout>
                  Research on dementia care consistently shows that structured daily routines reduce agitation, improve sleep quality, and decrease the need for behavioral medications. When you evaluate communities, ask to see the actual daily activity schedule &mdash; not a brochure description of activities, but the real schedule the staff follows.
                </Callout>
              </section>

              <Divider />

              {/* ── Day in the Life ─────────────────────────────────────── */}
              <section aria-labelledby="day-in-life">
                <H2 id="day-in-life">A Typical Day in Memory Care</H2>
                <P>
                  Every community has its own schedule and programming approach, but high-quality memory care follows a consistent structure across the day. Here&rsquo;s what a typical day looks like.
                </P>

                <TimeBlock time="6–8 AM" title="Morning Wake-Up and Personal Care">
                  <p className="mb-3">Caregivers assist residents with waking, morning hygiene (washing, grooming, oral care), dressing, and preparing for the day. This is one of the most important caregiving interactions of the day &mdash; done well, it sets a calm, dignified tone. Done poorly (rushed, mechanical, disrespectful), it triggers agitation that can persist for hours.</p>
                  <p>Medications scheduled for morning are administered. Residents who have difficulty with the morning routine &mdash; resisting bathing, confused about where they are &mdash; receive individualized approaches based on their care plan (preferred music, familiar conversation topics, etc.).</p>
                </TimeBlock>

                <TimeBlock time="7:30–9 AM" title="Breakfast">
                  <p className="mb-3">Breakfast is typically served in a common dining room. In smaller-scale communities, a shared dining table creates a family-style meal environment. For residents with swallowing difficulties or nutritional needs, modified textures or supplements are provided.</p>
                  <p>Mealtimes in memory care are social events, not just nutrition delivery. Familiar foods, pleasant conversation, and unhurried timing all matter. Some residents do better with smaller, more frequent meals throughout the day rather than three large ones.</p>
                </TimeBlock>

                <TimeBlock time="9–12 PM" title="Morning Activities">
                  <p className="mb-3">Mid-morning is the primary activity period for most memory care communities, when residents are most alert. Good programming includes a mix of:</p>
                  <ul className="list-disc list-inside space-y-1.5 mb-3 ml-1">
                    <li><strong>Cognitive stimulation</strong> — discussion groups, word games, trivia, current events</li>
                    <li><strong>Physical movement</strong> — seated exercise, walking groups, chair yoga</li>
                    <li><strong>Creative activities</strong> — art, music, reminiscence projects</li>
                    <li><strong>Life skills activities</strong> — folding towels, sorting objects, simple cooking</li>
                    <li><strong>Outdoor time</strong> — garden walks, outdoor seating, nature observation</li>
                  </ul>
                  <p>Activities are adapted to different cognitive levels so residents at all stages participate in ways that are meaningful to them. A resident who can no longer follow a word game can still enjoy familiar music or hold a pet.</p>
                </TimeBlock>

                <TimeBlock time="12–1 PM" title="Lunch">
                  <p>Lunch is the main meal of the day for many communities. Similar considerations as breakfast apply: social environment, modified textures as needed, adequate assistance for residents who need help eating. Residents who are at risk for weight loss receive additional nutritional monitoring.</p>
                </TimeBlock>

                <TimeBlock time="1–3 PM" title="Rest and Afternoon Activities">
                  <p className="mb-3">Many residents with dementia, especially in later stages, benefit from an afternoon rest period. This is not just convenience for staff &mdash; napping at predictable times supports nighttime sleep and reduces sundowning.</p>
                  <p>For residents who don&rsquo;t rest, early afternoon may include quieter 1-on-1 activities, appointments with visiting healthcare providers (physician, podiatrist, dental hygienist), or family visits.</p>
                </TimeBlock>

                <TimeBlock time="3–6 PM" title="Late Afternoon: The Sundowning Window">
                  <p className="mb-3">Late afternoon is the most challenging part of the day in memory care. &ldquo;Sundowning&rdquo; &mdash; increased confusion, agitation, and behavioral symptoms that occur in late afternoon and early evening &mdash; affects a significant portion of people with dementia. It&rsquo;s not fully understood, but it&rsquo;s real and manageable with the right approach.</p>
                  <p className="mb-3">Good communities actively program this window: snacks, gentle physical movement, music therapy, and organized activities designed to redirect and calm rather than further stimulate. Family visits during this time can be wonderful for some residents and counterproductive for others &mdash; ask the care team for guidance on your specific loved one.</p>
                  <p>Ask any community you&rsquo;re evaluating: <em>&ldquo;What is your approach to sundowning? What does the 3–5 PM period look like for residents?&rdquo;</em></p>
                </TimeBlock>

                <TimeBlock time="6–8 PM" title="Dinner and Evening">
                  <p className="mb-3">Dinner follows, with similar considerations as other meals. Evenings in memory care are intentionally calm &mdash; lower lighting, quieter activity, familiar television programming, or music. This is often a good time for family visits for residents who don&rsquo;t sundown severely.</p>
                  <p>Evening medications are administered. Residents are assisted with evening hygiene (washing, dental care, preparing for bed) according to their care plan and personal preferences.</p>
                </TimeBlock>

                <TimeBlock time="9 PM–6 AM" title="Night and Sleep">
                  <p className="mb-3">Good sleep is extremely important for people with dementia and is often difficult to achieve. Sleep disorders are common in this population: insomnia, nighttime wandering, REM sleep behavior disorder, and excessive daytime sleepiness.</p>
                  <p className="mb-3">Memory care communities have overnight staff specifically to manage nighttime needs: assisting residents who wake confused, preventing wandering to unsafe areas, providing toileting assistance to reduce incontinence-related discomfort, and monitoring for signs of distress or medical problems.</p>
                  <p>Ask about the overnight staffing ratio. At minimum, there should be awake staff on the floor at all times &mdash; not an on-call arrangement where staff are sleeping and only awakened for emergencies.</p>
                </TimeBlock>
              </section>

              <Divider />

              {/* ── Personalization and Autonomy ────────────────────────── */}
              <section aria-labelledby="personalization">
                <H2 id="personalization">Personalization and Preserved Autonomy</H2>
                <P>
                  Structure and routine are essential, but they should never become rigid uniformity. The best memory care communities invest time in learning each resident as a complete person &mdash; not just their diagnosis and care needs, but their life history, preferences, relationships, and values.
                </P>
                <P>
                  This means knowing that a resident was a carpenter who still finds satisfaction in working with his hands, so he gets time in a woodworking activity each week. Or that another resident spent decades as a teacher, and leading a simple group activity gives her a sense of purpose. Or that someone had strong religious faith, and having access to familiar prayers or religious music is calming in a way nothing else is.
                </P>
                <P>
                  Ask communities: How do you learn about who each resident is as a person? What does &ldquo;life history&rdquo; intake look like? How do you incorporate past interests into programming?
                </P>
                <Callout>
                  Person-centered care &mdash; the approach that tailors care to each individual&rsquo;s history, preferences, and identity rather than treating all residents identically &mdash; consistently produces better outcomes in dementia care. It&rsquo;s not a luxury; it&rsquo;s a measure of quality.
                </Callout>

                <H3>Preserving Dignity in Daily Care</H3>
                <P>
                  Even as cognitive ability declines, people with dementia retain awareness of how they are treated. Dignity in daily care means: always explaining what you&rsquo;re doing before doing it; never rushing personal care; never speaking to residents in a condescending or infantilizing tone; respecting preferences and choices even when they seem irrational; and involving residents in decisions as much as possible.
                </P>
                <P>
                  When you visit a community, pay attention to how staff speak to residents. Is the tone warm and respectful? Are staff patient when a resident is confused or resistant? Do they listen, or just direct? These interactions, which you can observe in minutes during a visit, tell you more about culture than any brochure.
                </P>
              </section>

              <Divider />

              {/* ── Activities That Matter ──────────────────────────────── */}
              <section aria-labelledby="activities">
                <H2 id="activities">Activities That Matter</H2>
                <P>
                  Not all activity programming is equal. In memory care, the distinction between <em>therapeutic activities</em> and <em>time-filling activities</em> matters enormously for resident wellbeing.
                </P>

                <H3>Therapeutic Activities</H3>
                <P>These have documented evidence of benefit for people with dementia:</P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                  <li><strong>Cognitive Stimulation Therapy (CST)</strong> — structured group activities involving discussion, word puzzles, and reminiscence, shown to improve cognition and quality of life in mild to moderate dementia</li>
                  <li><strong>Music therapy</strong> — particularly powerful; familiar music from a person&rsquo;s young adulthood activates preserved long-term memory, reduces agitation, and improves mood</li>
                  <li><strong>Reminiscence therapy</strong> — structured recall of past experiences, using photos, objects, and stories; supports identity and emotional wellbeing</li>
                  <li><strong>Exercise and movement</strong> — reduces falls, improves sleep, reduces depression and agitation</li>
                  <li><strong>Pet therapy</strong> — interaction with animals reduces anxiety and increases social engagement</li>
                  <li><strong>Sensory stimulation</strong> — for residents in later stages who can no longer participate in structured activities</li>
                </ul>

                <H3>Red Flags in Activity Programming</H3>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                  <li>Television as the primary activity</li>
                  <li>One-size-fits-all activities that don&rsquo;t adapt to cognitive level</li>
                  <li>Activities scheduled on paper but rarely happening in practice (ask to see attendance records)</li>
                  <li>No certified activity director or therapeutic recreation specialist on staff</li>
                  <li>Activities that feel passive and disengaged rather than interactive</li>
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
                  This guide reflects evidence-based dementia care practices and draws on research from the Alzheimer&rsquo;s Association, Cochrane Reviews on dementia care interventions, and industry standards for person-centered care. This guide is for informational purposes only and does not constitute medical advice.
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
            Learn More About Community Life
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            See how memory care communities are designed to support the routines and activities that matter most.
          </p>
          <Link
            href="/memory-care/facility-design/"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            How Memory Care Is Designed →
          </Link>
        </div>
      </section>
    </>
  );
}
