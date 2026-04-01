import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Moving a Parent to a Nursing Home: The Transition Guide | OurTurnToCare",
  description:
    "A compassionate, practical guide to moving a parent to a nursing home — before the move, the first two weeks, the first 90 days, and how to manage the guilt that nearly every family feels.",
  openGraph: {
    title: "Moving a Parent to a Nursing Home: The Transition Guide",
    description:
      "Before the move, the first two weeks, the first 90 days, and managing the guilt every family feels — a compassionate guide to the transition.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/transition-guide/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/transition-guide/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Still deciding?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment helps you understand whether nursing home care is the right level for your parent right now.
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
            { label: "The Admission Process", href: "/nursing-homes/admission-process/" },
            { label: "Daily Life in a Nursing Home", href: "/nursing-homes/daily-life/" },
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
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

export default function TransitionGuidePage() {
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
            <span className="text-slate-700 font-medium">Transition Guide</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Moving a Parent to a Nursing Home: The Transition Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            A compassionate, practical guide to one of the most emotionally difficult
            transitions a family will go through — before the move, the first weeks, and
            the months that follow.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Moving a parent to a nursing home is rarely a single decision — it&rsquo;s the
                culmination of many smaller decisions, a long period of increasing care
                needs, and often a specific crisis that makes the transition necessary
                right now. Whatever path brought you to this moment, you are not alone.
                Millions of adult children go through this transition every year, and the
                emotional complexity of it — love, grief, guilt, relief, exhaustion —
                is universal.
              </P>

              <Divider />

              <H2 id="before">Before the Move</H2>
              <H3>Have Honest Conversations</H3>
              <P>
                If your parent has the cognitive capacity to participate in the decision,
                involve them. Even if they&rsquo;re resistant, they deserve to know what&rsquo;s
                happening and why. A conversation framed around their safety and your concern
                for them — not around burden or logistics — is more likely to be received as
                the act of love it is.
              </P>
              <P>
                If your parent has dementia and can no longer meaningfully participate in
                the decision, the conversation shifts to your own processing and the
                reassurance of the medical team. Know that a person with dementia often
                doesn&rsquo;t retain the distress of a transition the way a cognitively intact
                person would — the adjustment period, while real, is often shorter than
                families fear.
              </P>
              <H3>Visit the Facility Together if Possible</H3>
              <P>
                When a planned transition is possible — as opposed to an emergency discharge
                from a hospital — visiting the chosen facility with your parent before
                move-in can reduce anxiety. Familiarity reduces fear, and seeing where they
                will live can make the eventual move feel less abrupt.
              </P>
              <H3>Prepare Practically</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Label every item of clothing and every personal belonging with your parent's name",
                  "Set up the room before or on move-in day with familiar items — photographs, a favorite blanket, personal décor",
                  "Create an 'About Me' document — one page telling staff who your parent is as a person: their career, family, preferences, what brings them comfort, what they dislike",
                  "Gather all medical, legal, and financial documents (see the admission process guide)",
                  "Confirm insurance coverage and payment arrangements before the first day",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="first-two-weeks">The First Two Weeks</H2>
              <P>
                The first two weeks are typically the hardest — for your parent and for you.
                An adjustment reaction — sometimes called &ldquo;transfer trauma&rdquo; — is
                well-documented and usually temporary. Your parent may be confused, upset,
                withdrawn, or even distressed. They may ask to go home repeatedly. They
                may be angry with you.
              </P>
              <P>
                This is normal. Research shows that adjustment reactions typically peak
                in the first one to two weeks and improve significantly by four to six weeks
                as new routines become familiar. Residents who are given time and support
                to adjust — who are encouraged to participate in activities, introduced to
                other residents, and visited regularly by family — adjust better and faster
                than those who are isolated or left alone to struggle.
              </P>
              <H3>How to Help During the First Weeks</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Visit frequently during this period — your presence is reassuring and signals to staff that this resident has an involved family",
                  "Keep visits positive and warm — avoid expressing your own distress or guilt in ways your parent will absorb",
                  "Encourage participation in activities, even gently — isolation makes adjustment harder",
                  "Introduce yourself to the CNAs and nurses who work with your parent most frequently; knowing family is engaged improves care",
                  "Don't hover or try to manage the facility — trust the process while staying watchful",
                  "Follow the facility's guidance about visit timing and length during the adjustment period",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="first-90-days">The First 90 Days</H2>
              <P>
                The first 90 days are a period of gradual adjustment — routine develops,
                relationships form, and most residents find a rhythm. This is also a period
                of active monitoring for families.
              </P>
              <H3>Stay Engaged</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Continue regular visits — consistency matters more than frequency",
                  "Attend the care plan meeting (required within 14 days of admission and then quarterly)",
                  "Monitor your parent's physical condition — weight, skin integrity, hygiene, mood",
                  "Stay in regular contact with the nursing staff and social worker",
                  "Raise any concerns promptly and in writing",
                  "Participate in the family council if the facility has one",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                If something feels wrong in the first 90 days — if your parent&rsquo;s condition
                is declining unexpectedly, if you&rsquo;re seeing red flags in care quality, or
                if your concerns aren&rsquo;t being addressed — you have the right to raise those
                concerns and to contact the Long-Term Care Ombudsman (1-800-677-1116) for
                support.
              </Callout>

              <Divider />

              <H2 id="guilt">Managing Your Own Guilt</H2>
              <P>
                Nearly every adult child who places a parent in a nursing home experiences
                guilt. It&rsquo;s one of the most common and most painful emotions of this
                experience. And it&rsquo;s worth addressing directly, because it can cloud your
                judgment, exhaust you, and sometimes lead to decisions that aren&rsquo;t in your
                parent&rsquo;s best interest.
              </P>
              <P>
                Guilt is not evidence that you made the wrong decision. Guilt is a feeling,
                and feelings can be present even when the decision is right — even when it&rsquo;s
                the most loving thing you could have done.
              </P>
              <P>
                Consider what &ldquo;keeping them home&rdquo; would have actually meant. Would it have
                meant 24-hour caregiving without adequate skills? Medication management you
                weren&rsquo;t trained for? Watching pressure ulcers develop without the ability
                to treat them properly? Physical injuries from transfers? Your own career,
                health, and relationships destroyed by the weight of care that was too much
                for one person to carry?
              </P>
              <P>
                Ensuring your parent receives the skilled medical care they need — care
                that you could not safely provide alone — is an act of love, not
                abandonment. The presence you bring through regular visits, engaged
                advocacy, and genuine care matters enormously, regardless of where your
                parent sleeps at night.
              </P>
              <H3>If the Guilt Is Overwhelming</H3>
              <P>
                Caregiver guilt that becomes debilitating is worth addressing with a
                therapist, social worker, or support group. The Caregiver Action Network
                (caregiveraction.org) and local Area Agencies on Aging can help connect
                you with support resources. You matter too — your wellbeing is not
                separate from your ability to advocate for and support your parent.
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
            You Don&rsquo;t Have to Navigate This Alone
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Understanding your options — and knowing you&rsquo;ve made the most informed
            decision possible — is one of the best antidotes to uncertainty. Our tools
            are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/care-assessment"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Take the Care Assessment →
            </Link>
            <Link
              href="/nursing-homes/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Back to the Full Guide →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
