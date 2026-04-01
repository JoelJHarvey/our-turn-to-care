import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Evaluate a Nursing Home: A 5-Step Process | OurTurnToCare",
  description:
    "A practical 5-step process for evaluating nursing home quality — research, visit unannounced, talk to residents and families, review the care plan process, and assess leadership.",
  openGraph: {
    title: "How to Evaluate a Nursing Home: A 5-Step Process",
    description:
      "A practical 5-step process for evaluating nursing home quality — from online research to unannounced visits to assessing facility culture.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/how-to-evaluate/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/how-to-evaluate/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure what care is right?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment evaluates your loved one&apos;s needs and recommends the most appropriate level of care.
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
            { label: "Five-Star Ratings Explained", href: "/nursing-homes/five-star-ratings/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "Understanding Staffing", href: "/nursing-homes/staffing/" },
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

export default function HowToEvaluatePage() {
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
            <span className="text-slate-700 font-medium">How to Evaluate</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How to Evaluate Nursing Home Quality: A 5-Step Process
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Star ratings are a starting point. Here&rsquo;s how to go deeper and truly assess
            whether a facility will provide good care for your parent.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="step1">Step 1: Research Before You Visit</H2>
              <P>
                Before setting foot in a facility, do your homework online. This ensures
                you don&rsquo;t waste time on obvious poor performers and helps you ask better
                questions when you do visit.
              </P>
              <H3>Medicare Care Compare</H3>
              <P>
                Go to{" "}
                <a href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline hover:text-teal-900">
                  medicare.gov/care-compare
                </a>{" "}
                and search by zip code. For each facility on your shortlist, look at:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "The overall star rating and each component rating (health inspection, staffing, quality measures) separately",
                  "The actual inspection reports — not just the number of deficiencies, but what the specific deficiencies were",
                  "Patterns across multiple inspections — the same problem cited repeatedly is a red flag",
                  "Staffing data — total nursing hours per resident per day, and specifically RN hours",
                  "Staff turnover data — now published on Care Compare",
                  "Quality measure scores for the measures most relevant to your parent",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>State Health Department</H3>
              <P>
                Most states maintain their own databases of nursing home inspection reports,
                complaint histories, and enforcement actions. Search for &ldquo;[your state]
                nursing home inspection database&rdquo; to find your state&rsquo;s resource. Some states
                provide more detailed information than what&rsquo;s available on the federal system.
              </P>
              <H3>News Search</H3>
              <P>
                Do a simple news search for the facility name. Serious problems — abuse
                allegations, enforcement actions, outbreaks — often appear in local news.
              </P>

              <Divider />

              <H2 id="step2">Step 2: Visit — More Than Once, and Unannounced</H2>
              <P>
                Your first visit should be a scheduled tour. But your most informative visit
                will be unannounced. Stop by during a meal, in the evening, or on a weekend.
                These are the times when a facility&rsquo;s true culture is visible — when
                administrators aren&rsquo;t prepared and the experience your parent would actually
                have is on display.
              </P>
              <P>
                The brochure photos always look amazing. Visit on a random Tuesday evening —
                that&rsquo;s the real test.
              </P>
              <H3>What to Observe During Any Visit</H3>
              <P>
                Use all your senses. What you observe often matters more than what you&rsquo;re
                told:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Smell — a strong persistent odor of urine or feces is a serious red flag indicating inadequate hygiene care",
                  "Sight — are residents dressed, in common areas, engaged? Or are doors closed and residents isolated in their rooms? Are common areas clean?",
                  "Sound — do you hear call lights going unanswered? Are there sounds of distress? Is there warmth and conversation, or a hospital-like silence?",
                  "Staff interaction — watch how aides and nurses interact with residents. Is there warmth, patience, and eye contact? Or is care rushed and impersonal?",
                  "Residents' appearance — do residents look well-groomed? Are they in soiled clothing? Do they look engaged or vacant?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                Visit at mealtime if possible. How a facility feeds its residents — the food
                quality, the assistance provided, whether residents are positioned properly,
                how much time staff spend helping those who need it — is one of the most
                revealing indicators of care quality.
              </Callout>

              <Divider />

              <H2 id="step3">Step 3: Talk to People Already There</H2>
              <P>
                The most valuable information you can get comes from people who are living
                or working at the facility right now.
              </P>
              <H3>Talk to Current Residents</H3>
              <P>
                If you can, spend a few minutes talking to residents in common areas. Ask
                open-ended questions: &ldquo;How do you like living here?&rdquo; &ldquo;What do you wish was
                different?&rdquo; &ldquo;Do the aides come quickly when you need help?&rdquo; The content of
                their answers matters, but so does their demeanor — do they seem afraid to
                speak? Do they brighten when talking to someone from outside?
              </P>
              <H3>Talk to Family Members</H3>
              <P>
                Ask the facility if you can speak with family members of current residents.
                Well-run facilities will have no problem letting you do this. If a facility is reluctant
                or evasive about connecting you with families, that itself is informative.
                When you do speak with families, ask: &ldquo;What has surprised you — good or
                bad?&rdquo; &ldquo;Have you had any concerns, and how were they handled?&rdquo; &ldquo;Knowing
                what you know now, would you choose this facility again?&rdquo;
              </P>
              <H3>Observe Staff</H3>
              <P>
                Beyond what staff tell you, watch what they do. Do CNAs acknowledge
                residents by name as they pass? Do nurses respond to call lights promptly?
                Are staff interacting with each other positively — which often reflects
                morale and management quality? High morale in staff typically translates to
                better care for residents.
              </P>

              <Divider />

              <H2 id="step4">Step 4: Evaluate the Care Plan Process</H2>
              <P>
                A good nursing home develops an individualized care plan for every resident
                within the first few weeks of admission (legally required within 14 days).
                Ask:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "How often are care plan meetings held, and who attends?",
                  "Can family members participate in care plan meetings?",
                  "How are the resident's preferences and goals incorporated into the care plan?",
                  "What happens when a resident's condition changes — how is the care plan updated?",
                  "How does the facility communicate with family between care plan meetings?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                The care plan process is where a resident&rsquo;s individual needs, preferences,
                and goals are supposed to be recognized and addressed. A facility that
                treats care planning as a checkbox exercise rather than a meaningful
                conversation is likely to provide less individualized care overall.
              </P>

              <Divider />

              <H2 id="step5">Step 5: Assess Administration and Culture</H2>
              <P>
                The quality of nursing home care is heavily influenced by leadership. A
                stable, experienced, values-driven administrator creates a culture that
                affects every interaction between staff and residents.
              </P>
              <P>
                Try to meet the administrator and the director of nursing. Ask how long
                they&rsquo;ve been in their roles. High turnover in leadership — especially if
                there have been multiple directors of nursing in the past two years — is a
                significant warning sign. A facility with stable leadership where long-term
                staff know residents by name and history is usually a better choice than a
                higher-rated facility with revolving leadership.
              </P>
              <H3>Questions for Administration</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "How long have you been in your current role at this facility?",
                  "What has changed in the past year? What are you working to improve?",
                  "How do you handle complaints from residents and families?",
                  "What is your philosophy around restraint use and antipsychotic medications?",
                  "How would you describe your facility's culture?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="making-decision">Making Your Decision</H2>
              <P>
                After completing this process for two or three facilities, you&rsquo;ll usually
                have a clear sense of which one is the best fit. Trust your instincts. A
                moderately-rated facility where staff genuinely seem to care and residents
                seem engaged and content is often a better choice than a higher-rated
                facility that felt cold and institutional on visits.
              </P>
              <P>
                Once you&rsquo;ve chosen a facility, review the full{" "}
                <Link href="/nursing-homes/admission-process/" className="text-teal-700 underline hover:text-teal-900">
                  admission process guide
                </Link>{" "}
                to understand what to expect next — including the documents you&rsquo;ll need, the
                admission agreement, and the first care plan meeting.
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
            Need Help Choosing the Right Care?
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our free care assessment helps you determine whether nursing home care is the
            right level — or if another option might better serve your parent right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/care-assessment"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Take the Care Assessment →
            </Link>
            <Link
              href="/nursing-homes/questions-to-ask/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Get the 40-Question Checklist →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
