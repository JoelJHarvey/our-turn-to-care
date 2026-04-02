import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "After Memory Care Placement: What to Expect | OurTurnToCare",
  description:
    "What happens after your loved one moves into memory care — the adjustment period, how to visit, how to advocate, and what to expect at end of life.",
  openGraph: {
    title: "After Memory Care Placement: What to Expect",
    description:
      "The adjustment period, visiting guidance, how to advocate for your loved one, and end-of-life planning in memory care.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/after-placement/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/after-placement/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Still deciding on a community?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment helps confirm the right level of care and screens for financial assistance.
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
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "56 questions to ask", href: "/memory-care/questions-to-ask/" },
            { label: "The 7 stages of dementia", href: "/memory-care/stages/" },
            { label: "Treatments & research", href: "/memory-care/treatments/" },
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

export default function AfterPlacementPage() {
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
            <span className="text-slate-700 font-medium">After Placement</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            After Memory Care Placement: A Guide for Families
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            The adjustment period, how to visit, how to be an effective advocate,
            and what to expect as the disease progresses.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                The move into memory care is rarely easy. For the person with
                dementia and for the family. Understanding what the first weeks and
                months typically look like &mdash; and what you can do to support
                your loved one &mdash; makes the experience less frightening.
              </P>

              <Divider />

              <H2 id="adjustment-period">The Adjustment Period</H2>
              <P>
                Most new memory care residents experience increased confusion,
                agitation, or emotional distress during the first 2 to 6 weeks.
                This is normal. It doesn&rsquo;t mean you made the wrong choice.
                It means your loved one&rsquo;s brain is trying to adapt to a new
                environment, which is genuinely difficult for someone with dementia.
              </P>
              <P>
                Common adjustment-period behaviors include:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Repeatedly asking to go home</li>
                <li>Increased agitation or anxiety at sundowning time</li>
                <li>Refusing meals or activities</li>
                <li>Calling family members frequently with distress</li>
                <li>Sleep disruption</li>
                <li>Temporary increase in behavioral symptoms</li>
              </ul>
              <P>
                For most residents, these behaviors improve significantly after
                4 to 6 weeks as new routines become familiar and relationships
                with staff develop. The research is consistent: family members
                who are told this upfront experience less guilt and distress than
                those who are surprised by it.
              </P>

              <Callout>
                If you can, follow the community&rsquo;s guidance about visiting
                frequency during the first two weeks. Some clinical staff recommend
                giving the person a few days to begin adjusting before family
                visits, so the first routines can take hold. Others encourage
                daily visits. There&rsquo;s no universal rule &mdash; ask the
                care team what they&rsquo;ve found works best.
              </Callout>

              <H3>What to Do if Adjustment Is Severe</H3>
              <P>
                If behavioral symptoms are extreme or the person is in clear
                distress beyond what would be expected, communicate with the care
                team. Ask for a care conference. Ask about whether medication
                adjustments might be appropriate. Ask whether the person is
                being integrated into activities or spending a lot of time alone.
                Good teams welcome this engagement and have seen adjustment
                periods before.
              </P>

              <Divider />

              <H2 id="visiting">How to Visit</H2>
              <H3>Consistency Matters More Than Frequency</H3>
              <P>
                For a person with dementia, predictable patterns feel safer than
                frequent but unpredictable visits. Coming at the same time of day
                on the same days of the week helps your loved one develop a sense
                of &ldquo;this is when family comes.&rdquo; Even if they
                can&rsquo;t articulate it, that pattern provides emotional
                security.
              </P>

              <H3>When They Say They Want to Go Home</H3>
              <P>
                This is one of the most heartbreaking parts of visiting. Your
                parent asks to go home, and they mean it &mdash; there&rsquo;s
                a specific place they&rsquo;re missing, maybe their home from
                decades ago, maybe the concept of safety and belonging.
              </P>
              <P>
                Strategies that tend to work better than direct redirection:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Validate the feeling first: &ldquo;I know you miss home. I understand.&rdquo;</li>
                <li>Join their reality rather than correcting it: &ldquo;Tell me about your home.&rdquo;</li>
                <li>Shift attention to something in the present: &ldquo;Let&rsquo;s take a walk before I go.&rdquo;</li>
                <li>Don&rsquo;t promise things you can&rsquo;t deliver (like &ldquo;you&rsquo;ll go home soon&rdquo;)</li>
              </ul>
              <P>
                Ask the care team for guidance on specific strategies that work for
                your loved one. The staff who see them every day often have
                developed approaches that aren&rsquo;t obvious.
              </P>

              <H3>What to Do During Visits</H3>
              <P>
                As cognitive decline progresses, sitting and talking becomes
                harder. Activities tend to connect better:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Looking through old photos together</li>
                <li>Listening to music from their era</li>
                <li>Walking outdoors if the person is mobile</li>
                <li>Simple activities like folding napkins or looking at objects with tactile interest</li>
                <li>Reading aloud from something familiar</li>
                <li>Just sitting together &mdash; presence matters, even if conversation is limited</li>
              </ul>

              <Divider />

              <H2 id="advocacy">Being an Effective Advocate</H2>
              <H3>Attend Care Plan Meetings</H3>
              <P>
                Memory care communities are required to hold regular care plan
                meetings (usually every 90 days or when there&rsquo;s a
                significant change). Attend these. Come with questions. Know
                your loved one&rsquo;s current medications, any recent behavioral
                changes you&rsquo;ve observed, and any concerns you want to
                address.
              </P>

              <H3>Visit at Different Times</H3>
              <P>
                If you always visit at 2 PM on Sunday, you only see one slice
                of the community&rsquo;s operation. Vary your visit times. Visit
                during a mealtime occasionally. Drop by in the evening when
                sundowning behaviors are most likely. The picture you get from
                different time windows is more accurate than any single visit.
              </P>

              <H3>If You Have Concerns About Care Quality</H3>
              <P>
                Document your concerns in writing. Start with the direct care
                staff. If that doesn&rsquo;t resolve the issue, go to the
                memory care director or director of nursing. If concerns remain
                unresolved, contact your state&rsquo;s Long-Term Care Ombudsman
                program. Ombudsmen are advocates for residents of long-term care
                facilities and can investigate complaints and intervene on your
                loved one&rsquo;s behalf.
              </P>
              <P>
                In cases of suspected abuse or neglect, contact Adult Protective
                Services and your state licensing agency. Document everything and
                don&rsquo;t be discouraged if the first response is dismissive.
              </P>

              <Divider />

              <H2 id="as-disease-progresses">As the Disease Progresses</H2>
              <P>
                Good memory care communities adapt their approach as dementia
                advances. Residents in the later stages need different programming,
                different communication approaches, and ultimately different
                physical care. Ask the community:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Can you care for residents through late-stage dementia (Stage 7)?</li>
                <li>At what point, if any, would you require a transfer to skilled nursing?</li>
                <li>How do you manage swallowing difficulties, which often emerge in Stage 7?</li>
                <li>How do you handle the end-of-life period?</li>
              </ul>
              <P>
                Some communities can provide care through the end of life.
                Others require a transfer to skilled nursing when care needs
                become intensive. Knowing this upfront avoids a painful forced
                move at the worst possible time.
              </P>

              <Divider />

              <H2 id="hospice">Hospice Care in Memory Care</H2>
              <P>
                When it becomes clear that the dementia is in its final stages,
                hospice care shifts the focus from slowing the disease to
                maximizing comfort and dignity. Hospice is not &ldquo;giving up&rdquo;
                &mdash; it&rsquo;s a recognition that the goals of care have
                appropriately shifted.
              </P>
              <P>
                Hospice services can typically be provided within the memory care
                community, without requiring a move to a hospital or separate
                facility. A hospice team provides:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Regular nursing visits for pain and symptom management</li>
                <li>Aide services for personal care (beyond what the community provides)</li>
                <li>Social work support for the family</li>
                <li>Chaplaincy and spiritual support</li>
                <li>Medications for comfort care</li>
                <li>24/7 on-call nurse availability for questions and emergencies</li>
                <li>Bereavement support for the family after death</li>
              </ul>
              <P>
                Medicare covers hospice care at no additional cost in most cases.
                To qualify, two physicians must certify that the person has a life
                expectancy of 6 months or less if the disease runs its normal
                course. You can re-certify for additional 60-day periods if needed.
              </P>

              <Callout>
                Research consistently shows that families who choose hospice
                earlier in the dying process report less distress and better
                end-of-life experiences than those who wait. If your loved
                one&rsquo;s physician hasn&rsquo;t raised hospice as an option
                and you think it may be appropriate, it is completely reasonable
                to ask.
              </Callout>

              <Divider />

              <H2 id="for-you">Taking Care of Yourself</H2>
              <P>
                The work of family caregiving doesn&rsquo;t end when your loved
                one moves into memory care. It changes shape. You become an
                advocate, a visitor, a decision-maker. You carry grief.
              </P>
              <P>
                Caregiver support groups &mdash; many offered through the
                Alzheimer&rsquo;s Association and local hospitals &mdash; can
                provide community with people who understand exactly what this
                experience is like. Therapy can help with the anticipatory grief
                and the complicated emotions of this period. Allowing yourself
                to receive support is not weakness. It&rsquo;s necessary.
              </P>
              <P>
                The Alzheimer&rsquo;s Association 24/7 Helpline is available
                at <strong>1-800-272-3900</strong> and provides support for
                caregivers at every stage.
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
          <h2 className="text-3xl font-bold text-white mb-4">Take the Free Care Assessment</h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Not sure if memory care is the right level yet? Get a personalized recommendation
            in about 4 minutes.
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
