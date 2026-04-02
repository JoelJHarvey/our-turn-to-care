import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "56 Questions to Ask When Touring Memory Care | OurTurnToCare",
  description:
    "Complete 56-question touring checklist for memory care communities — staffing, safety, programming, costs, and after-admission questions organized by category.",
  openGraph: {
    title: "56 Questions to Ask When Touring Memory Care",
    description:
      "The complete touring checklist — 56 questions organized by category to help you evaluate any memory care community.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/questions-to-ask/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/questions-to-ask/",
  },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-slate-800 mb-4 leading-snug scroll-mt-24">
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

interface QuestionGroup {
  category: string;
  id: string;
  why: string;
  questions: string[];
}

const QUESTION_GROUPS: QuestionGroup[] = [
  {
    category: "Staffing",
    id: "staffing",
    why: "Staffing is the single most important quality indicator in memory care. Get specific numbers — not vague reassurances.",
    questions: [
      "What is the caregiver-to-resident ratio during the day shift?",
      "What is the caregiver-to-resident ratio during the evening shift?",
      "What is the caregiver-to-resident ratio overnight?",
      "How many hours of dementia-specific training does each caregiver receive during orientation?",
      "How many hours of ongoing dementia training do caregivers receive annually?",
      "What is your annual caregiver turnover rate?",
      "Do you use agency (temporary) staff? How frequently?",
      "Who is the memory care director and what is their background?",
      "Is there a nurse on-site 24 hours a day, or on-call?",
      "What training do you provide specifically for Lewy body dementia or frontotemporal dementia?",
    ],
  },
  {
    category: "Safety and Security",
    id: "safety",
    why: "Security is a core function of memory care. Vague answers about exit security are a red flag.",
    questions: [
      "How are exits secured? (Keypad, delayed egress alarm, monitored?)",
      "What is your protocol when a resident tries to exit?",
      "Have there been any elopement (resident leaving without authorization) incidents in the past year?",
      "What wander management technology do you use?",
      "What is your fall prevention protocol?",
      "What is your fall rate for the current resident population?",
      "How do you handle a behavioral emergency (resident becomes aggressive or self-harming)?",
      "What is your process when a resident has a medical emergency?",
      "Is there camera monitoring in common areas?",
      "How are medications managed and stored?",
    ],
  },
  {
    category: "Daily Life and Programming",
    id: "programming",
    why: "Activity programming is the difference between a resident who thrives and one who sits idle all day.",
    questions: [
      "Can I see the actual daily activity schedule for this week?",
      "How are activities adapted for residents at different cognitive levels?",
      "Do you offer music therapy? How frequently?",
      "Do you offer Cognitive Stimulation Therapy (CST) or similar structured programs?",
      "How do residents spend a typical morning before lunch?",
      "What happens when a resident refuses to participate in activities?",
      "Do you have outdoor space residents can access? When is it used?",
      "What is a typical mealtime experience like?",
      "Are residents given choices about their daily schedule and activities?",
      "How do you support residents with specific hobbies or interests from their past?",
    ],
  },
  {
    category: "Costs and Contracts",
    id: "costs",
    why: "Memory care pricing is complex. Get everything in writing and understand the all-in cost before committing.",
    questions: [
      "What exactly is included in the base monthly rate?",
      "How is the level-of-care assessment done, and what are the fees at each level?",
      "What triggers a level-of-care reassessment? How much notice do you give?",
      "What services are charged separately beyond the base rate?",
      "What has been the average annual rate increase over the past three years?",
      "What is the move-in or community fee, and is any of it refundable?",
      "What is the minimum commitment period (month-to-month vs. longer-term)?",
      "What is the refund policy if my loved one passes away or needs to leave?",
      "Do you accept Medicaid? If so, what percentage of your current residents are Medicaid-funded?",
      "Do you accept VA benefits?",
    ],
  },
  {
    category: "Medical and Health Care",
    id: "medical",
    why: "Understanding the medical support available — and its limits — helps you avoid surprises later.",
    questions: [
      "Do you have a medical director? How often do they see residents?",
      "Do residents continue to see their own physicians, or do they use community providers?",
      "What on-site healthcare services are available? (Podiatry, dental, vision, lab?)",
      "What is your protocol for notifying families of health changes?",
      "Can residents who develop significant physical care needs continue to age in place here?",
      "Under what circumstances would you require a resident to transfer to a higher level of care?",
      "What is your experience with hospice care for residents in late-stage dementia?",
      "Do you have a protocol for residents with Lewy body dementia and medication sensitivity?",
    ],
  },
  {
    category: "Family Involvement and Communication",
    id: "family",
    why: "Your ongoing role as an advocate is as important as the initial move-in decision.",
    questions: [
      "How often are formal care plan meetings held, and who participates?",
      "What is the best way to reach the care team with day-to-day questions?",
      "Can I visit at any time, including unannounced?",
      "How do you communicate with families when there are changes in condition?",
      "What is your process for handling family concerns or complaints?",
      "What resources do you offer to family members? (Support groups, education?)",
      "How do you handle situations where family members disagree about care decisions?",
      "What is your discharge policy, and how much notice is given?",
    ],
  },
];

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Before you tour</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment helps confirm memory care is the right level of care &mdash;
          and screens for financial assistance options.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "Memory care red flags", href: "/memory-care/how-to-choose/#red-flags" },
            { label: "After placement guide", href: "/memory-care/after-placement/" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">Jump to category</p>
        <ul className="space-y-1.5">
          {QUESTION_GROUPS.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`} className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors">
                {group.category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function QuestionsToAskPage() {
  const totalQuestions = QUESTION_GROUPS.reduce((sum, g) => sum + g.questions.length, 0);

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
            <span className="text-slate-700 font-medium">Questions to Ask</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            {totalQuestions} Questions to Ask When Touring Memory Care
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            A complete touring checklist organized by category. Use it on every
            visit &mdash; unannounced and scheduled.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Most families go into memory care tours with a short list of
                questions and come away having been shown a beautiful space but
                not having learned what they need to know. This checklist gives
                you the specific questions that reveal whether a community is
                genuinely excellent or just well-marketed.
              </P>
              <P>
                <strong>How to use this list:</strong> You don&rsquo;t need to
                ask all {totalQuestions} questions on a single tour. Prioritize
                the staffing and safety sections first. Use the others to dig
                deeper on your second visit or when narrowing between two
                finalists. Write down the answers &mdash; memories of tours blur
                quickly.
              </P>

              {QUESTION_GROUPS.map((group, gi) => (
                <div key={group.id}>
                  <Divider />
                  <H2 id={group.id}>
                    {gi + 1}. {group.category}
                  </H2>
                  <p className="text-sm text-teal-700 italic mb-5 leading-relaxed">
                    {group.why}
                  </p>
                  <div className="space-y-3">
                    {group.questions.map((q, qi) => (
                      <div
                        key={qi}
                        className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {qi + 1}
                        </span>
                        <p className="text-[0.9375rem] text-slate-700 leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Divider />

              <H2 id="how-to-use">How to Interpret the Answers</H2>
              <P>
                The answers matter less than how communities answer. Watch for:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>
                  <strong>Specific numbers vs. vague reassurances.</strong> &ldquo;We have great ratios&rdquo;
                  is not an answer. &ldquo;Our day ratio is 1:5 and we have a dedicated activity aide from 9 AM to 4 PM&rdquo;
                  is an answer.
                </li>
                <li>
                  <strong>Openness vs. defensiveness.</strong> A community that welcomes hard questions
                  is confident in its quality. One that deflects is often one with something to hide.
                </li>
                <li>
                  <strong>Consistency across staff.</strong> If the sales director and the floor caregiver
                  give you different answers to the same question, that&rsquo;s meaningful.
                </li>
                <li>
                  <strong>Willingness to put it in writing.</strong> Any answer about cost, policy, or
                  commitment that they won&rsquo;t put in writing should be viewed with skepticism.
                </li>
              </ul>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Not sure memory care is the right level yet?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Take the Care Assessment to get a personalized recommendation based on your loved one&rsquo;s
                  specific needs and situation.
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
            Get a personalized care recommendation. Takes about 4 minutes. No login required.
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
