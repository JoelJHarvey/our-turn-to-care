import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alzheimer's & Dementia Treatments: New Drugs, Therapies & Trials (2026) | OurTurnToCare",
  description:
    "Current FDA-approved Alzheimer's treatments, new disease-modifying drugs (Leqembi, Kisunla), non-drug therapies, and clinical trial options explained for families.",
  openGraph: {
    title: "Alzheimer's & Dementia Treatments: New Drugs, Therapies & Trials (2026)",
    description:
      "FDA drugs, new disease-modifying treatments, non-drug therapies, and clinical trials for dementia — what families need to know.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/treatments/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/treatments/",
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function DrugCard({
  name,
  brandName,
  approvalYear,
  mechanism,
  whoFor,
  benefit,
  risks,
  cost,
  coverage,
}: {
  name: string;
  brandName: string;
  approvalYear: string;
  mechanism: string;
  whoFor: string;
  benefit: string;
  risks: string;
  cost: string;
  coverage: string;
}) {
  return (
    <div className="border border-teal-200 bg-teal-50 rounded-2xl overflow-hidden mb-8">
      <div className="bg-teal-700 px-6 py-4">
        <h3 className="text-lg font-bold text-white">{name} ({brandName})</h3>
        <p className="text-sm text-teal-100 mt-1">FDA approved {approvalYear}</p>
      </div>
      <div className="p-6 grid sm:grid-cols-2 gap-4">
        {[
          { label: "How it works", value: mechanism },
          { label: "Who it's for", value: whoFor },
          { label: "Demonstrated benefit", value: benefit },
          { label: "Key risks", value: risks },
          { label: "Annual cost", value: cost },
          { label: "Insurance coverage", value: coverage },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Evaluating care options?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment helps identify the right level of care for where your loved one is now.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Memory Care Guide</p>
        <ul className="space-y-2">
          {[
            { label: "← Memory care hub", href: "/memory-care/" },
            { label: "Types of dementia", href: "/memory-care/types-of-dementia/" },
            { label: "The 7 stages", href: "/memory-care/stages/" },
            { label: "After placement", href: "/memory-care/after-placement/" },
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

export default function TreatmentsPage() {
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
            <span className="text-slate-700 font-medium">Treatments & Research</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Alzheimer&rsquo;s & Dementia Treatments: What&rsquo;s Available Now (2026)
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            FDA-approved medications, new disease-modifying drugs, non-drug
            therapies with strong evidence, and how to access clinical trials.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                There is no cure for Alzheimer&rsquo;s disease or most other
                forms of dementia as of 2026. But the landscape has changed
                significantly in the past few years. For the first time, there
                are FDA-approved medications that can slow the progression of
                early-stage Alzheimer&rsquo;s &mdash; not just manage symptoms.
                Non-drug approaches have strong evidence. And the clinical trial
                pipeline is larger than at any point in history.
              </P>

              <Callout>
                Most of what is in this guide applies primarily to
                Alzheimer&rsquo;s disease, which has received the most research
                attention. Treatments for other dementia types (Lewy body,
                vascular, FTD) are more limited. Always consult a neurologist
                with expertise in dementia for guidance specific to your loved
                one&rsquo;s diagnosis.
              </Callout>

              <Divider />

              <H2 id="symptom-medications">Medications That Manage Symptoms</H2>
              <P>
                These medications have been available for years and are widely
                used in memory care settings. They don&rsquo;t slow the underlying
                disease &mdash; they manage symptoms and may temporarily improve
                function.
              </P>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Drug (Brand)</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Class</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Stage</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">What It Does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { drug: "Donepezil (Aricept)", cls: "Cholinesterase inhibitor", stage: "Mild–severe", effect: "May temporarily improve or stabilize memory and thinking" },
                      { drug: "Rivastigmine (Exelon)", cls: "Cholinesterase inhibitor", stage: "Mild–moderate", effect: "Similar to donepezil; available as patch" },
                      { drug: "Galantamine (Razadyne)", cls: "Cholinesterase inhibitor", stage: "Mild–moderate", effect: "Similar to donepezil" },
                      { drug: "Memantine (Namenda)", cls: "NMDA antagonist", stage: "Moderate–severe", effect: "May slow symptom progression in later stages" },
                      { drug: "Aducanumab (Aduhelm)", cls: "Anti-amyloid antibody", stage: "Early Alzheimer's", effect: "Controversial FDA approval; limited use" },
                    ].map((row) => (
                      <tr key={row.drug}>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">{row.drug}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">{row.cls}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">{row.stage}</td>
                        <td className="px-4 py-3 border-t border-slate-100 text-slate-600">{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                These medications have modest benefits for most people &mdash;
                they don&rsquo;t halt the disease, and not everyone responds.
                Side effects (primarily gastrointestinal for cholinesterase
                inhibitors) can be significant. The decision to use them should
                be made with a physician who knows your loved one&rsquo;s
                full medical picture.
              </P>

              <Divider />

              <H2 id="disease-modifying">The New Disease-Modifying Drugs</H2>
              <P>
                This is the genuinely exciting development of the past few years.
                For the first time, there are medications that target the
                underlying biology of Alzheimer&rsquo;s &mdash; specifically the
                amyloid plaques that accumulate in the brain &mdash; and can
                slow the progression of the disease, not just manage symptoms.
              </P>

              <DrugCard
                name="Lecanemab"
                brandName="Leqembi"
                approvalYear="2023 (accelerated); full approval 2023"
                mechanism="Anti-amyloid antibody that clears amyloid plaques from the brain via intravenous infusion every two weeks"
                whoFor="Adults with confirmed early-stage Alzheimer's (mild cognitive impairment or mild dementia stage). Requires PET scan or spinal fluid test to confirm amyloid presence. Not for other dementia types or later-stage Alzheimer's."
                benefit="Slowed cognitive decline by approximately 27% compared to placebo in 18-month clinical trial (CLARITY AD study)"
                risks="Amyloid-related imaging abnormalities (ARIA) — brain swelling or bleeding visible on MRI in ~37% of patients; serious ARIA in ~3%. Higher risk in people with certain genetic variants (APOE ε4)."
                cost="Approximately $26,500 per year for the drug alone; significant additional costs for infusions, monitoring MRIs, and confirmatory testing"
                coverage="Medicare covers it with conditions; Part B coverage for drug administration. Coverage varies significantly by plan and state. Pre-authorization typically required."
              />

              <DrugCard
                name="Donanemab"
                brandName="Kisunla"
                approvalYear="2024"
                mechanism="Anti-amyloid antibody targeting a modified form of amyloid; intravenous infusion monthly. Treatment may be stopped once amyloid is sufficiently cleared."
                whoFor="Early symptomatic Alzheimer's (mild cognitive impairment or mild dementia) with confirmed amyloid. May be suitable for people who are not APOE ε4 homozygous."
                benefit="Slowed decline by approximately 35% in participants with lower tau burden in 76-week trial; 29% overall in the TRAILBLAZER-ALZ 2 trial"
                risks="Similar ARIA risks to lecanemab. Three deaths in the trial were potentially related to ARIA. Serious ARIA in ~6.1% of patients."
                cost="Approximately $32,000 per year (may vary)"
                coverage="Medicare coverage similar to lecanemab; subject to pre-authorization and monitoring requirements"
              />

              <WarningBox>
                These medications are only appropriate for early-stage Alzheimer&rsquo;s.
                Most people in memory care are in moderate to severe stages
                (GDS 5&ndash;7) and are not candidates. If your loved one
                was recently diagnosed with mild cognitive impairment or
                early Alzheimer&rsquo;s, discuss these options with a
                neurologist or geriatric psychiatrist immediately &mdash;
                the window for eligibility is early.
              </WarningBox>

              <Divider />

              <H2 id="non-drug-therapies">Non-Drug Therapies With Strong Evidence</H2>
              <P>
                Multiple non-pharmacological interventions have demonstrated
                meaningful benefits for quality of life, behavioral symptoms,
                and cognitive function in dementia. Good memory care communities
                incorporate these into their daily programming.
              </P>

              <H3>Cognitive Stimulation Therapy (CST)</H3>
              <P>
                The most evidence-based non-drug intervention for dementia. CST
                involves structured group sessions that engage cognitive function
                through themed activities &mdash; word games, discussing current
                events, sorting and categorizing objects, music, creative arts.
                Multiple randomized controlled trials show benefits for cognition
                and quality of life comparable to cholinesterase inhibitor
                medications, with no side effects.
              </P>

              <H3>Music Therapy</H3>
              <P>
                Music accesses a different part of the brain than declarative
                memory &mdash; which is why people with advanced dementia who
                can&rsquo;t recall what they had for breakfast can often sing
                along to songs from their youth. Music therapy (using live or
                recorded music in a therapeutic context) shows consistent
                benefits for reducing agitation, depression, and anxiety in
                dementia, with effects lasting 1&ndash;4 hours after a session.
                Ask any memory care community you tour about their music therapy
                programming.
              </P>

              <H3>Reminiscence Therapy</H3>
              <P>
                Structured use of photos, objects, music, and discussion from
                the person&rsquo;s past to stimulate long-term memory and
                identity. Long-term memory is often preserved longer than
                short-term memory in Alzheimer&rsquo;s, making this a
                particularly effective approach. Life story work &mdash;
                creating a book or record of the person&rsquo;s life history &mdash;
                is a related approach that also helps staff provide more
                personalized care.
              </P>

              <H3>Physical Exercise</H3>
              <P>
                Consistent evidence shows that structured physical exercise slows
                cognitive decline in people with mild-to-moderate dementia,
                reduces depression and agitation, and improves physical function.
                Even walking programs show benefit. Ask memory care communities
                about their daily exercise programming and whether it&rsquo;s
                adapted to different ability levels.
              </P>

              <H3>Art Therapy</H3>
              <P>
                Creative engagement through painting, drawing, or other visual
                arts taps into preserved abilities and provides meaningful activity
                even in moderate-to-severe dementia. Benefits include reduced
                anxiety, increased engagement, and improved mood.
              </P>

              <Divider />

              <H2 id="clinical-trials">Clinical Trials</H2>
              <P>
                The Alzheimer&rsquo;s research pipeline in 2026 includes over
                140 drugs in clinical trials targeting multiple mechanisms:
                amyloid, tau, neuroinflammation, synapse protection, and
                disease prevention. Participating in a clinical trial may
                provide access to potentially beneficial treatments not yet
                approved and contributes to research that will help future
                generations.
              </P>
              <P>
                To find clinical trials:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>
                  <Link href="https://www.clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
                    ClinicalTrials.gov
                  </Link>{" "}
                  &mdash; the official government registry; search for &ldquo;Alzheimer's disease&rdquo; and filter by status (recruiting) and location
                </li>
                <li>
                  <Link href="https://www.alzheimers.gov/clinical-trials" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
                    Alzheimers.gov clinical trials finder
                  </Link>
                </li>
                <li>
                  The Alzheimer&rsquo;s Association Trial Match: 1-800-272-3900
                </li>
                <li>
                  Ask the person&rsquo;s neurologist or geriatrician &mdash; they often know of relevant trials
                </li>
              </ul>
              <P>
                Note that most disease-modifying trials require early-stage
                diagnosis and may have strict eligibility criteria. Brain
                imaging (PET scan) or spinal fluid analysis to confirm
                Alzheimer&rsquo;s pathology is often required.
              </P>

              <Divider />

              <H2 id="managing-behavioral-symptoms">Managing Behavioral Symptoms</H2>
              <P>
                Agitation, aggression, wandering, sundowning, hallucinations,
                and sleep disturbances affect most people with dementia at some
                point. These behavioral and psychological symptoms of dementia
                (BPSD) are often more distressing to families than memory loss.
              </P>
              <P>
                The current evidence strongly supports trying non-drug approaches
                first: environmental modifications, structured activity, music,
                caregiver communication techniques, and addressing unmet needs
                (pain, discomfort, boredom, loneliness). Antipsychotic
                medications are commonly used for severe behavioral symptoms
                but carry a black box FDA warning for increased mortality in
                elderly patients with dementia.
              </P>
              <P>
                If a community or physician recommends an antipsychotic
                medication, ask specifically: What non-drug approaches have
                been tried? What symptom is this targeting? What are the risks?
                What is the plan to taper off if it works?
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Evaluating memory care options?
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Our Care Assessment helps identify the right level of care for
                  where your loved one is now, and screens for financial assistance.
                </p>
                <Link
                  href="/tools/care-assessment"
                  className="inline-block bg-white text-teal-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Take the Free Assessment →
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-10 border-t border-slate-100 pt-6">
                <em>
                  Sources: FDA drug approval records for lecanemab (Leqembi) and donanemab (Kisunla).
                  van der Steen JT et al., &ldquo;Evidence-based interventions for dementia&rdquo; (Cochrane
                  systematic reviews). Woods B et al., &ldquo;Cognitive Stimulation to improve cognitive
                  functioning in people with dementia,&rdquo; Cochrane Review 2023. Alzheimer&rsquo;s
                  Association 2025 Facts &amp; Figures. This guide is for informational purposes only
                  and does not constitute medical advice. Treatment decisions should be made with a
                  qualified physician.
                </em>
              </p>

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
