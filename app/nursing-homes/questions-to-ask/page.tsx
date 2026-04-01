import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "40 Questions to Ask When Touring a Nursing Home | OurTurnToCare",
  description:
    "The complete touring checklist — 40 questions organized by staffing, medical care, daily life, safety, family involvement, and financials. Print and bring with you.",
  openGraph: {
    title: "40 Questions to Ask When Touring a Nursing Home",
    description:
      "The complete touring checklist — 40 questions organized by staffing, medical care, daily life, safety, family involvement, and financials.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/questions-to-ask/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/questions-to-ask/",
  },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-slate-800 mb-5 leading-snug scroll-mt-24">
      {children}
    </h2>
  );
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

function QuestionGroup({
  number,
  title,
  questions,
}: {
  number: number;
  title: string;
  questions: string[];
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-3 text-slate-600 leading-relaxed py-2 border-b border-slate-100 last:border-0">
            <span className="flex-shrink-0 w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center text-xs text-slate-400 mt-0.5">
              ✓
            </span>
            <span>{q}</span>
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure which care is right?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Answer a few questions to get a personalized care recommendation in about 5 minutes.
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
            { label: "Five-Star Ratings", href: "/nursing-homes/five-star-ratings/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "The Admission Process", href: "/nursing-homes/admission-process/" },
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

export default function QuestionsToAskPage() {
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
            <span className="text-slate-700 font-medium">Questions to Ask</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            40 Questions to Ask When Touring a Nursing Home
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Print this checklist and bring it to every facility you visit. Not every
            question will apply to every family — focus on the categories that matter most
            for your parent&rsquo;s specific situation.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Touring a nursing home is an information-gathering exercise, and the
                questions you ask — and how staff respond to them — reveal as much about a
                facility as what you can see. Vague answers, defensiveness, or reluctance
                to share basic information are red flags. A well-run facility will be
                transparent and forthcoming.
              </P>

              <Callout>
                Your most informative visit will be unannounced. Beyond the scheduled tour,
                stop by during a meal, in the evening, or on a weekend to observe how the
                facility operates when they&rsquo;re not expecting you.
              </Callout>

              <Divider />

              <H2 id="staffing">Staffing Questions</H2>
              <QuestionGroup
                number={1}
                title="Staffing"
                questions={[
                  "How many RNs are on duty during each shift — day, evening, and night?",
                  "How many LPNs and CNAs work each shift?",
                  "What is the nurse-to-resident ratio on the day shift? On the night shift?",
                  "What is the CNA-to-resident ratio on each shift?",
                  "What is your staff turnover rate? How long have most nurses and CNAs been here?",
                  "Is there always an RN on-site 24 hours a day, 7 days a week?",
                  "How do you handle staffing when someone calls in sick?",
                  "How often do you use agency (temporary) staff?",
                ]}
              />

              <Divider />

              <H2 id="medical">Medical Care Questions</H2>
              <QuestionGroup
                number={2}
                title="Medical Care"
                questions={[
                  "Is there a physician or nurse practitioner on-site daily? How often does the medical director visit?",
                  "How are medical emergencies handled after hours?",
                  "Which hospital does the facility transfer to in an emergency?",
                  "How are medications managed, administered, and reviewed?",
                  "What rehabilitation services are available — physical therapy, occupational therapy, speech therapy?",
                  "Are therapists employed by the facility or contracted?",
                  "Does the facility offer specialized care for [your parent's specific condition]?",
                  "How does the facility manage pain?",
                ]}
              />

              <Divider />

              <H2 id="daily-life">Daily Life &amp; Activities Questions</H2>
              <QuestionGroup
                number={3}
                title="Daily Life & Activities"
                questions={[
                  "What does a typical day look like for a resident?",
                  "What activities and social programs are offered? Can I see a recent activity calendar?",
                  "Are there outdoor spaces residents can access?",
                  "How are meals handled? Can I see a recent menu? Can I join for a meal?",
                  "How does the facility accommodate special dietary needs or preferences?",
                  "Can residents personalize their rooms? What can they bring from home?",
                  "Are religious services or spiritual care available?",
                  "Is there a resident council? How do residents provide feedback?",
                ]}
              />

              <Divider />

              <H2 id="safety">Safety &amp; Quality Questions</H2>
              <QuestionGroup
                number={4}
                title="Safety & Quality"
                questions={[
                  "What was your most recent state inspection rating? Can I see the full report?",
                  "How many deficiencies were cited in the last inspection? What were they?",
                  "What infection control measures are in place?",
                  "How do you prevent falls? What is your fall rate?",
                  "What is your policy on physical restraints? Chemical restraints (antipsychotic medications)?",
                  "How do you handle residents who wander (for dementia patients)?",
                ]}
              />

              <Divider />

              <H2 id="family">Family Involvement Questions</H2>
              <QuestionGroup
                number={5}
                title="Family Involvement"
                questions={[
                  "What are the visiting hours? Are there any restrictions?",
                  "Can family members participate in care plan meetings?",
                  "How will the facility communicate with me about my parent's condition? How often?",
                  "Is there a family council?",
                  "Can family bring in outside food?",
                ]}
              />

              <Divider />

              <H2 id="financial">Financial Questions</H2>
              <QuestionGroup
                number={6}
                title="Financial"
                questions={[
                  "What is the daily rate for a semi-private room? A private room?",
                  "What services are included in the daily rate? What costs extra?",
                  "Do you accept Medicare? Medicaid? What happens when someone transitions from private pay to Medicaid?",
                  "Is a deposit required? Is it refundable?",
                  "What is the billing cycle, and what notice is given for rate increases?",
                ]}
              />

              <Divider />

              <H2 id="tips">Tips for Using This Checklist</H2>
              <P>
                Don&rsquo;t try to ask all 40 questions in a single visit — focus on the
                categories most relevant to your parent&rsquo;s situation. For a parent entering
                for rehabilitation, prioritize staffing and medical care. For a long-term
                placement, prioritize daily life, family involvement, and financial
                questions.
              </P>
              <P>
                Pay as much attention to <em>how</em> staff respond as to <em>what</em> they say. A
                facility that answers every question honestly, invites you to look
                at inspection reports, and suggests you speak with current residents&rsquo; families
                is demonstrating confidence in their care. Evasiveness, reluctance to share
                data, or overly polished rehearsed answers should give you pause.
              </P>
              <P>
                After each tour, write down your impressions while they&rsquo;re fresh. Note
                specific answers to the questions above, but also your overall gut feeling
                about the culture and environment. The smell, the sounds, the way staff
                interact with residents — these things can&rsquo;t be captured on paper but
                matter enormously.
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
            Still Deciding?
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our free care assessment helps clarify whether a nursing home is the right
            level of care for your parent&rsquo;s specific situation — or whether another option
            might be a better fit.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
          >
            Take the Free Care Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
