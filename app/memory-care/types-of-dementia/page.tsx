import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Types of Dementia: Alzheimer's, Lewy Body, FTD & More | OurTurnToCare",
  description:
    "Learn about every major type of dementia — Alzheimer's, vascular, Lewy body, frontotemporal, and mixed — and why the type matters when choosing memory care.",
  openGraph: {
    title: "Types of Dementia: Alzheimer's, Lewy Body, FTD & More",
    description:
      "Every major type of dementia explained — and why the type matters when choosing memory care.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/types-of-dementia/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/types-of-dementia/",
  },
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function TypeCard({
  name,
  prevalence,
  onset,
  keyFeatures,
  progressionPattern,
  careFocus,
  children,
}: {
  name: string;
  prevalence: string;
  onset: string;
  keyFeatures: string[];
  progressionPattern: string;
  careFocus: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8">
      <div className="bg-teal-700 px-6 py-4">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="text-sm text-teal-100">
            <span className="font-medium">Prevalence:</span> {prevalence}
          </span>
          <span className="text-sm text-teal-100">
            <span className="font-medium">Typical onset:</span> {onset}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">{children}</div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Key features
            </p>
            <ul className="space-y-1">
              {keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-teal-400 mt-1 flex-shrink-0">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Progression
            </p>
            <p className="text-sm text-slate-600 mb-4">{progressionPattern}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Memory care focus
            </p>
            <p className="text-sm text-slate-600">{careFocus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Not sure what level of care is right?
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment evaluates your loved one&rsquo;s specific situation
          and gives you a personalized recommendation.
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
            { label: "← Back to memory care hub", href: "/memory-care/" },
            { label: "The 7 stages of dementia", href: "/memory-care/stages/" },
            { label: "Memory care costs", href: "/memory-care/costs/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "Signs it's time for memory care", href: "/memory-care/signs/" },
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

export default function TypesOfDementiaPage() {
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
            <span className="text-slate-700 font-medium">Types of Dementia</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Types of Dementia: What Every Caregiver Should Know
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Alzheimer&rsquo;s, vascular, Lewy body, frontotemporal, and more &mdash;
            how each type presents, progresses, and affects care decisions.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10">
                <SidebarCTA />
              </div>

              <H2 id="overview">Why the Type of Dementia Matters</H2>
              <P>
                &ldquo;Dementia&rdquo; is not a single disease &mdash; it&rsquo;s
                an umbrella term for a group of conditions characterized by
                cognitive decline severe enough to interfere with daily life.
                Different diseases cause different forms of dementia, and they
                present differently, progress differently, and respond differently
                to treatment.
              </P>
              <P>
                The type of dementia your loved one has matters when choosing a
                memory care community. Ask any community you tour: what is your
                experience with this specific diagnosis? How many of your current
                residents have Lewy body dementia? How do you manage the behavioral
                presentations of frontotemporal dementia? The answers reveal a
                lot about the depth of their expertise.
              </P>

              <Divider />

              <H2 id="types">The Major Types of Dementia</H2>

              <TypeCard
                name="Alzheimer's Disease"
                prevalence="60–80% of all dementia cases"
                onset="Usually 65+; early-onset can affect people in their 40s–50s"
                keyFeatures={[
                  "Memory loss, especially for recent events",
                  "Difficulty with familiar tasks and planning",
                  "Language problems (word-finding, following conversations)",
                  "Disorientation to time and place",
                  "Poor judgment and decision-making",
                  "Personality and mood changes in later stages",
                ]}
                progressionPattern="Gradual, continuous decline over 8–10 years on average (range: 3–20 years). Follows a relatively predictable pattern through the 7 GDS stages."
                careFocus="Routine and familiarity. Visual cues. Behavior management for sundowning and anxiety. Cognitive stimulation activities adapted to ability level."
              >
                <P>
                  Alzheimer&rsquo;s is caused by the accumulation of amyloid
                  plaques and tau tangles in the brain, which disrupt and
                  eventually destroy nerve cells. It typically begins in the
                  hippocampus (the memory center) and spreads progressively
                  to other brain regions. Most memory care communities are
                  designed primarily around Alzheimer&rsquo;s presentation and
                  are well-equipped to care for residents with this diagnosis.
                </P>
              </TypeCard>

              <TypeCard
                name="Vascular Dementia"
                prevalence="~10% of dementia cases (second most common)"
                onset="Usually 60s–80s, often following a stroke or series of small strokes"
                keyFeatures={[
                  "Problems with reasoning, planning, judgment rather than memory first",
                  "Slowed thinking and processing speed",
                  "Difficulty with concentration and organization",
                  "Physical symptoms: weakness, balance problems (depending on which brain area is affected)",
                  "May have sudden onset after a stroke",
                  "Depression more common than in Alzheimer's",
                ]}
                progressionPattern="Often stepwise rather than gradual — the person may plateau for a period, then decline abruptly following another vascular event, then plateau again."
                careFocus="Cardiovascular risk management. Physical therapy for mobility. Cognitive support structured around preserved vs. affected abilities. Depression monitoring."
              >
                <P>
                  Vascular dementia results from reduced or blocked blood flow to
                  the brain. A major stroke can cause it suddenly; a series of
                  small &ldquo;silent&rdquo; strokes can cause it gradually.
                  The pattern of impairment depends on which area of the brain
                  was affected. Memory may be relatively preserved early on,
                  with more prominent problems in executive function, processing
                  speed, and physical coordination.
                </P>
              </TypeCard>

              <TypeCard
                name="Lewy Body Dementia (LBD)"
                prevalence="~5% of dementia cases (third most common)"
                onset="Usually 50s–80s"
                keyFeatures={[
                  "Vivid, detailed visual hallucinations (often people or animals)",
                  "Fluctuating alertness and attention (good days and bad days)",
                  "Parkinson's-like movement symptoms: tremor, rigidity, shuffling gait",
                  "REM sleep behavior disorder (acting out dreams, often predates cognitive symptoms)",
                  "Extreme sensitivity to antipsychotic medications",
                  "Autonomic dysfunction: blood pressure swings, fainting",
                ]}
                progressionPattern="Progression is variable and often faster than Alzheimer's. The fluctuating nature can be mistaken for other conditions."
                careFocus="Extreme caution with medications — many standard antipsychotics are contraindicated and can be fatal. Fall prevention. Management of hallucinations with non-drug approaches first."
              >
                <P>
                  Lewy body dementia is caused by abnormal protein deposits
                  (Lewy bodies) in the brain. It&rsquo;s often misdiagnosed as
                  Alzheimer&rsquo;s or Parkinson&rsquo;s disease. The medication
                  sensitivity issue is critical: certain antipsychotic drugs
                  commonly used to manage behavioral symptoms in Alzheimer&rsquo;s
                  can cause sudden, severe reactions in people with LBD, including
                  death. If your loved one has LBD, ensure any prospective memory
                  care community understands this and has protocols to avoid
                  dangerous medications.
                </P>
                <WarningBox>
                  Lewy body dementia requires specific medication protocols.
                  Any memory care community caring for an LBD resident must be
                  aware of the contraindication with typical antipsychotics.
                  Confirm this explicitly with any community you consider.
                </WarningBox>
              </TypeCard>

              <TypeCard
                name="Frontotemporal Dementia (FTD)"
                prevalence="~5% of dementia cases; most common under age 65"
                onset="Often 40s–60s — earlier than most other dementias"
                keyFeatures={[
                  "Personality changes: disinhibition, impulsivity, socially inappropriate behavior",
                  "Apathy and loss of empathy",
                  "Language difficulties (two subtypes: behavioral variant and primary progressive aphasia)",
                  "Relatively preserved memory in early stages",
                  "May be mistaken for psychiatric illness (depression, bipolar disorder, schizophrenia)",
                  "Compulsive or repetitive behaviors",
                ]}
                progressionPattern="Typically faster progression than Alzheimer's, though variable. Often 6–8 years from symptom onset, but ranges from 2–20 years."
                careFocus="Management of disinhibited and impulsive behaviors (which can be disruptive in a community setting). Structured environment. Close staff-to-resident supervision. Language support."
              >
                <P>
                  FTD affects the frontal and temporal lobes of the brain,
                  which govern personality, behavior, and language rather than
                  memory. This means the early presentation is dramatically
                  different from Alzheimer&rsquo;s: the person may behave in
                  ways that are profoundly out of character &mdash; making crude
                  jokes, ignoring social norms, spending money impulsively, or
                  losing empathy for loved ones. These behavioral symptoms can
                  be extremely difficult for families to understand and manage.
                </P>
                <P>
                  FTD patients in a memory care community can be challenging for
                  both staff and other residents. Ask directly how the community
                  manages behavioral variant FTD and whether they have experience
                  with this diagnosis.
                </P>
              </TypeCard>

              <TypeCard
                name="Mixed Dementia"
                prevalence="More common than recognized; may be the most common type in older adults"
                onset="Usually 75+"
                keyFeatures={[
                  "Combination of Alzheimer's and vascular dementia most common",
                  "Symptoms reflect the mix of underlying types",
                  "May progress faster than either type alone",
                  "Diagnosis often confirmed only at autopsy",
                  "Multiple risk factors typically present (cardiovascular + genetic)",
                ]}
                progressionPattern="Variable, depends on the specific combination. May show both gradual decline and stepwise worsening."
                careFocus="Comprehensive approach addressing all underlying types. Regular cardiovascular monitoring. Cognitive and behavioral support."
              >
                <P>
                  Autopsy studies show that the majority of people diagnosed with
                  Alzheimer&rsquo;s during their lifetime actually had a
                  combination of Alzheimer&rsquo;s and vascular dementia (or
                  other types). Mixed dementia is increasingly recognized as
                  common, particularly in people over 80. The treatment approach
                  addresses all underlying types present.
                </P>
              </TypeCard>

              <Divider />

              <H2 id="less-common">Less Common Forms of Dementia</H2>

              <H3>Parkinson&rsquo;s Disease Dementia</H3>
              <P>
                Parkinson&rsquo;s disease frequently leads to dementia as it
                progresses. The cognitive symptoms typically appear at least a
                year after motor symptoms (tremor, rigidity) are established.
                It&rsquo;s related to Lewy body dementia and shares many of the
                same medication sensitivities. Memory care communities should
                have experience managing both the motor and cognitive aspects
                of this condition.
              </P>

              <H3>Creutzfeldt-Jakob Disease (CJD)</H3>
              <P>
                A rare and rapidly progressive prion disease that causes severe
                dementia. It progresses very quickly (often months rather than
                years) and typically presents in older adults. Memory care is
                rarely appropriate given the pace of decline; hospice is often
                the relevant discussion.
              </P>

              <H3>Huntington&rsquo;s Disease</H3>
              <P>
                A genetic disorder that causes progressive cognitive, behavioral,
                and motor decline. Onset is typically in midlife (30s&ndash;50s).
                Specialized care for younger adults with Huntington&rsquo;s
                requires finding a community with specific experience with this
                diagnosis.
              </P>

              <H3>Normal Pressure Hydrocephalus (NPH)</H3>
              <P>
                A potentially reversible condition (unlike most dementias) caused
                by excess fluid in the brain. The classic triad of symptoms:
                gait problems, urinary incontinence, and cognitive decline. A
                shunt procedure can sometimes dramatically improve symptoms.
                If your loved one&rsquo;s physician hasn&rsquo;t ruled out NPH,
                it&rsquo;s worth asking.
              </P>

              <Divider />

              <H2 id="why-type-matters">Why Type Matters for Choosing Memory Care</H2>
              <P>
                When you tour memory care communities, the type of dementia your
                loved one has should drive specific questions:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>
                  <strong>Lewy body / Parkinson&rsquo;s:</strong> &ldquo;What is
                  your protocol for avoiding dangerous antipsychotic medications?
                  Do you have a medical director familiar with LBD?&rdquo;
                </li>
                <li>
                  <strong>FTD:</strong> &ldquo;How do you manage disinhibited
                  behaviors that might affect other residents? What experience do
                  you have with behavioral variant FTD?&rdquo;
                </li>
                <li>
                  <strong>Early-onset dementia (under 65):</strong> &ldquo;What
                  proportion of your residents are under 65? How do your activities
                  accommodate residents who are physically active and cognitively
                  engaged at a different level?&rdquo;
                </li>
                <li>
                  <strong>Vascular dementia with physical symptoms:</strong>
                  &ldquo;What physical therapy support do you have on-site?
                  How do you manage fall risk for residents with balance problems?&rdquo;
                </li>
              </ul>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Take the Free Care Assessment
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Answer a few questions about your loved one&rsquo;s specific
                  situation and get a personalized care recommendation.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Start the Assessment →
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-10 border-t border-slate-100 pt-6">
                <em>
                  Sources: Alzheimer&rsquo;s Association 2025 Facts &amp; Figures.
                  National Institute of Neurological Disorders and Stroke (NINDS)
                  dementia information sheets. Lewy Body Dementia Association (LBDA)
                  clinical resources. Association for Frontotemporal Degeneration
                  (AFTD). Prevalence figures are approximate and reflect current
                  clinical literature. This guide is for informational purposes
                  only and does not constitute medical advice.
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

      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Free Care Assessment
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized recommendation based on your loved one&rsquo;s
            specific needs and situation. Takes about 4 minutes.
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
