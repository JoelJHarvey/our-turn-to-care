import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "Memory Care Red Flags: Warning Signs to Watch For | OurTurnToCare",
  description:
    "Learn the red flags, warning signs, and environmental, staffing, and care concerns to watch for when evaluating memory care communities.",
  openGraph: {
    title: "Memory Care Red Flags: Warning Signs to Watch For",
    description:
      "Environmental, staffing, and operational red flags to watch when evaluating memory care communities. Know before you sign.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/red-flags/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/red-flags/",
  },
};

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Evaluating Memory Care",
    items: [
      {
        q: "What is the '10 AM test' for memory care?",
        a: "The 10 AM test means visiting a memory care community unannounced at 10 AM on a weekday. This window — between morning care routines and lunch — is when the community is in 'normal operation' rather than prepared for a scheduled tour. You'll see whether residents are engaged in activities or sitting idle, whether staff are attentive or clustered at the nurses' station, and whether the environment is calm and orderly or chaotic.",
      },
      {
        q: "What are the most important red flags in a memory care facility?",
        a: "The most serious red flags are: a pervasive odor of urine or feces in common areas (indicates poor hygiene care), residents sitting completely idle with no activity programming visible, staff who are inattentive or can't answer basic dementia care questions, reluctance to allow unannounced visits, and recent state citations for safety or care violations. Any one of these warrants serious concern; multiple red flags is a reason to walk away.",
      },
      {
        q: "How do I check a memory care facility's inspection history?",
        a: "For memory care communities licensed as assisted living facilities, check your state's licensing agency website — typically the Department of Health or Department of Social Services. Search for inspection reports, deficiency notices, and complaint investigations. For memory care units within nursing homes, use Medicare Care Compare at medicare.gov/care-compare for inspection reports and five-star ratings.",
      },
      {
        q: "What should I ask about staff turnover?",
        a: "Ask directly: 'What is your annual staff turnover rate for caregivers?' Industry average is 40–60%; anything above 60% is a significant red flag. Also ask how long the director has been in place — leadership stability correlates with staff retention. High turnover means residents with dementia are constantly adjusting to new faces, which is particularly destabilizing for this population.",
      },
      {
        q: "What if I notice red flags after my loved one is already placed?",
        a: "Document your concerns in writing and request a meeting with the facility director and director of nursing. Be specific about what you observed and when. If concerns aren't addressed satisfactorily, contact your state's Long-Term Care Ombudsman — a free advocate for residents in long-term care facilities. If you suspect abuse or neglect, contact Adult Protective Services. You also have the right to request a care plan meeting at any time.",
      },
      {
        q: "Can a memory care facility require 30 days notice before moving out?",
        a: "Most memory care facilities require 30 days written notice before a voluntary move-out, and this is standard and reasonable. Read the admission contract carefully for the exact terms. Some facilities require 30–60 days notice; some have different terms if the resident is being asked to leave by the facility. Understanding these terms before signing protects your family.",
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

function WarningCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function RedFlagList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mb-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xs font-bold">✕</span>
          </span>
          <span className="text-[1.0625rem] leading-[1.75] text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Evaluate your options with confidence
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment evaluates your loved one&rsquo;s situation and helps you know what questions to prioritize.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Care Assessment →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Memory Care Guide
        </p>
        <ul className="space-y-2">
          {[
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "56 questions to ask when touring", href: "/memory-care/questions-to-ask/" },
            { label: "Signs it's time for memory care", href: "/memory-care/signs/" },
            { label: "Daily life in memory care", href: "/memory-care/daily-life/" },
            { label: "Memory care facility design", href: "/memory-care/facility-design/" },
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
    </div>
  );
}

export default function MemoryCareRedFlagsPage() {
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
            <span className="text-slate-700 font-medium">Red Flags</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Memory Care Red Flags: Warning Signs to Watch For
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What to look for during tours, what questions reveal the most, and how to protect your loved one from facilities that fall short.
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
                Most memory care communities put their best foot forward during scheduled tours. The lobby is clean, the activity room is busy, and the staff are attentive and friendly. That&rsquo;s why the most important evaluation happens when they&rsquo;re not expecting you.
              </P>
              <P>
                Knowing what to look for &mdash; and what questions to ask &mdash; is what separates families who choose well from those who discover problems only after their loved one is already living there.
              </P>

              <Divider />

              {/* ── The 10 AM Test ──────────────────────────────────────── */}
              <section aria-labelledby="ten-am-test">
                <H2 id="ten-am-test">The 10 AM Test</H2>
                <P>
                  Visit any memory care community you&rsquo;re seriously considering at 10 AM on a weekday, without calling ahead. This is the critical window between morning care routines (waking, hygiene, breakfast, medications) and lunch &mdash; the time when organized activity programming should be happening and when the community is running in normal operating mode.
                </P>
                <P>
                  What you&rsquo;re checking for at 10 AM:
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                  <li>Are residents engaged in activities, or sitting alone and idle?</li>
                  <li>Are staff interacting warmly with residents, or clustered at the nurses&rsquo; station?</li>
                  <li>Does the community smell clean, or is there a pervasive odor?</li>
                  <li>Is there audible distress &mdash; calling out, crying, arguments &mdash; or a calm atmosphere?</li>
                  <li>How do staff respond when you arrive unannounced &mdash; welcomingly, or with visible discomfort?</li>
                </ul>
                <Callout>
                  A community that resists or discourages unannounced visits is a significant red flag on its own. Federal regulations for nursing homes and most state regulations for assisted living require facilities to allow family members to visit during reasonable hours. Resistance to visits suggests the facility has something to hide.
                </Callout>
              </section>

              <Divider />

              {/* ── Environmental Red Flags ─────────────────────────────── */}
              <section aria-labelledby="environmental-red-flags">
                <H2 id="environmental-red-flags">Environmental Red Flags</H2>
                <P>
                  The physical environment reveals a great deal about how a community is run. Poor environmental conditions are often a leading indicator of poor care practices overall.
                </P>
                <RedFlagList
                  items={[
                    "Strong, pervasive odor of urine or feces in common areas or hallways — this indicates residents are not being toileted or changed in a timely manner.",
                    "Dirty or visibly soiled common areas, dining rooms, or resident rooms during a daytime visit.",
                    "Residents who are visibly unkempt — unwashed hair, soiled clothing, food on their clothing from meals.",
                    "Residents sitting alone in their rooms with doors closed for extended periods, indicating insufficient activity and social engagement.",
                    "No visible activity programming during mid-morning hours — residents sitting idle in common areas with nothing to do.",
                    "Outdoor spaces that are locked, unused, or obviously neglected (overgrown, dirty, unsafe).",
                    "Emergency call systems that appear broken or are not within easy reach of residents.",
                    "Exit doors that are unsecured, poorly monitored, or where wandering would go unnoticed.",
                  ]}
                />
              </section>

              <Divider />

              {/* ── Staffing Red Flags ──────────────────────────────────── */}
              <section aria-labelledby="staffing-red-flags">
                <H2 id="staffing-red-flags">Staffing Red Flags</H2>
                <P>
                  Staffing is the single most important predictor of quality in memory care. The best physical environment in the world cannot compensate for undertrained, overstretched, or disengaged staff.
                </P>
                <RedFlagList
                  items={[
                    "Annual staff turnover rate above 50–60% — this is extremely disruptive for residents with dementia, who rely on familiar faces and consistent caregivers.",
                    "Staff who can't answer basic questions about dementia care approaches, behavioral management strategies, or the facility's specific programming philosophy.",
                    "Visibly overwhelmed staff — one caregiver trying to manage too many residents, long wait times for assistance.",
                    "Staff who use infantilizing language or condescending tones with residents.",
                    "No dedicated dementia care trainer or director of memory care with verifiable dementia-specific credentials.",
                    "High turnover in the director position — ask how long the current director has been in place; frequent leadership changes destabilize the entire operation.",
                    "Staff who appear disengaged — phones out, minimal interaction with residents, visibly bored or frustrated.",
                    "No staff visible on the unit floor during your visit — everyone clustered in an office or nurses' station.",
                  ]}
                />
                <H3>What to Ask About Staffing</H3>
                <P>
                  Ask these questions directly and watch for evasive answers:
                </P>
                <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                  <li>&ldquo;What is your current caregiver-to-resident ratio on the day shift? Evening shift?&rdquo;</li>
                  <li>&ldquo;What is your annual staff turnover rate?&rdquo;</li>
                  <li>&ldquo;How many hours of dementia-specific training do new caregivers receive before working with residents?&rdquo;</li>
                  <li>&ldquo;How long has your current director of memory care been in this role?&rdquo;</li>
                  <li>&ldquo;Is there a nurse on-site overnight, or on-call?&rdquo;</li>
                </ul>
                <Callout>
                  Industry average caregiver turnover in assisted living and memory care is 40–60% annually. The best communities have turnover rates of 20–30%. Be skeptical of any community that claims near-zero turnover without explanation — and very skeptical of any that won&rsquo;t disclose the number at all.
                </Callout>
              </section>

              <Divider />

              {/* ── Operational Red Flags ───────────────────────────────── */}
              <section aria-labelledby="operational-red-flags">
                <H2 id="operational-red-flags">Operational Red Flags</H2>
                <P>
                  How a memory care community operates on the business and administrative side reveals its integrity. Unclear pricing, hidden fees, and contract terms that favor the facility over residents are warning signs.
                </P>
                <RedFlagList
                  items={[
                    "Inability or unwillingness to provide a clear, itemized fee schedule — what's included in the base rate and what costs extra.",
                    "Vague answers about level-of-care fee increases — how are they determined, how often do they happen, and what triggers them.",
                    "Pressure to sign a contract or put down a deposit before you've had a chance to review it with your own advisor.",
                    "An admission contract that requires family members to sign as personal financial guarantors for the resident's fees.",
                    "No written care plan provided within the first 30 days of residency (this is a regulatory requirement in most states).",
                    "Poor or disorganized record-keeping — can't produce medication administration records or incident reports when requested.",
                    "Recent state citations for financial exploitation, billing errors, or contract violations.",
                    "Resistance to involving an elder law attorney, financial advisor, or family advocate in the contract review process.",
                  ]}
                />
              </section>

              <Divider />

              {/* ── Care-Specific Red Flags ─────────────────────────────── */}
              <section aria-labelledby="care-red-flags">
                <H2 id="care-red-flags">Care-Specific Red Flags</H2>
                <P>
                  These red flags relate directly to the quality and safety of dementia care. Some require asking specific questions; others become apparent through observation.
                </P>
                <RedFlagList
                  items={[
                    "Heavy reliance on antipsychotic medications to manage behavioral symptoms — ask about the community's antipsychotic prescribing rate; the national average is around 15%, and rates above 25% warrant questions.",
                    "No individualized care plans — every resident on the same activity and care schedule with no personalization.",
                    "Family input is dismissed or ignored during care plan meetings.",
                    "Medication errors, or staff who can't clearly describe the medication management process.",
                    "No protocol for communicating with families about behavioral changes, falls, or incidents.",
                    "Activities that are purely passive (watching television, sitting in a circle doing nothing) rather than therapeutic and cognitively engaging.",
                    "No process for assessing residents' cognitive level and adjusting activity and care approaches as cognition changes.",
                    "Discharge policies that allow the community to ask residents to leave without reasonable notice or appeal options.",
                  ]}
                />
                <WarningCallout>
                  <strong>Antipsychotic medication and chemical restraints:</strong> Federal regulations specifically prohibit the use of antipsychotic medications as chemical restraints for behavioral management without documented medical necessity. If a community mentions using Haldol, Seroquel, or similar medications routinely &ldquo;to help residents settle down,&rdquo; ask for the specific clinical rationale and current medication review documentation for your loved one.
                </WarningCallout>
              </section>

              <Divider />

              {/* ── What To Do If You Spot Red Flags ───────────────────── */}
              <section aria-labelledby="what-to-do">
                <H2 id="what-to-do">What to Do If You Spot Red Flags</H2>
                <H3>During the Evaluation Phase</H3>
                <P>
                  If you spot multiple red flags during a tour or research process, the clearest action is to continue your search. No community is perfect, but a pattern of concerns &mdash; especially in staffing, environment, or operational transparency &mdash; is a signal that the problems are structural, not incidental.
                </P>
                <P>
                  If one concern arises, ask directly. A good community director will address your concern honestly and specifically. Vague deflection or defensiveness is itself a red flag.
                </P>

                <H3>After Your Loved One Is Already Placed</H3>
                <P>
                  If you notice red flags after placement, act quickly and document everything. Write down what you observed, when, and who was present. Then:
                </P>
                <ol className="list-decimal list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                  <li>Request a meeting with the director of nursing and/or facility director to address specific concerns.</li>
                  <li>Request a care plan review meeting and bring a written list of concerns.</li>
                  <li>If concerns aren&rsquo;t resolved satisfactorily, contact your state&rsquo;s Long-Term Care Ombudsman &mdash; a free, independent advocate for residents in long-term care facilities.</li>
                  <li>If you suspect abuse, neglect, or exploitation, contact Adult Protective Services immediately. You can also file a complaint directly with the state licensing agency.</li>
                  <li>If the situation warrants moving your loved one, consult with an elder law attorney about your options and contractual rights before taking action.</li>
                </ol>
                <Callout>
                  The Long-Term Care Ombudsman program exists in every state. Ombudsmen are trained advocates who investigate complaints, mediate disputes between residents/families and facilities, and work to resolve problems. Their services are free and confidential. Find your local ombudsman at the ACL (Administration for Community Living) website or by calling the Eldercare Locator at 1-800-677-1116.
                </Callout>
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
                  This guide reflects regulatory standards, industry research on memory care quality, and CMS inspection data. Specific regulations vary by state. This guide is for informational purposes only and does not constitute legal, medical, or financial advice.
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
            Evaluate Communities with Confidence
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our Care Assessment helps you understand what your loved one needs &mdash; so you know exactly what to look for and what questions to ask.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Take the Free Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
