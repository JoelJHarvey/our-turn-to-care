import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose a Memory Care Community: The Complete Guide | OurTurnToCare",
  description:
    "How to evaluate memory care communities — staffing, red flags, ratings, the 10 AM test, what to look for, and 56 questions to ask on tour.",
  openGraph: {
    title: "How to Choose a Memory Care Community: The Complete Guide",
    description:
      "Everything you need to evaluate and choose the right memory care community for your loved one.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/how-to-choose/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/how-to-choose/",
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

const TOC = [
  { label: "Start With Staffing", id: "staffing" },
  { label: "The Physical Environment", id: "environment" },
  { label: "Activity Programming", id: "programming" },
  { label: "Safety and Security", id: "safety" },
  { label: "Cost Transparency", id: "cost-transparency" },
  { label: "The 10 AM Test", id: "ten-am-test" },
  { label: "Red Flags", id: "red-flags" },
  { label: "How to Check Ratings", id: "ratings" },
  { label: "Questions to Ask", id: "questions-to-ask" },
  { label: "Making the Final Decision", id: "final-decision" },
];

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure which care is right yet?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our Care Assessment helps identify the right level of care before you start touring communities.
        </p>
        <Link
          href="/tools/care-assessment"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Take the Assessment →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-sm font-semibold text-slate-700 mb-1">Touring checklist</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          56 specific questions to ask on every tour, organized by category.
        </p>
        <Link
          href="/memory-care/questions-to-ask/"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        >
          See the Checklist →
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">In this guide</p>
        <ol className="space-y-1.5">
          {TOC.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-teal-700 hover:text-teal-900 hover:underline transition-colors leading-snug flex items-start gap-1.5"
              >
                <span className="font-semibold text-teal-400 flex-shrink-0 w-4 text-right text-xs mt-0.5">{i + 1}.</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function HowToChoosePage() {
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
            <span className="text-slate-700 font-medium">How to Choose</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How to Choose a Memory Care Community
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What to look for, what to ask, red flags to watch for, and how to
            make a confident decision for your loved one.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">

              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Choosing a memory care community is one of the most consequential
                decisions a family can make. The right community extends quality
                of life, reduces behavioral symptoms, and gives family caregivers
                peace of mind. The wrong one does the opposite.
              </P>
              <P>
                This guide gives you a systematic framework for evaluating any
                community. Use it alongside our{" "}
                <Link href="/memory-care/questions-to-ask/" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
                  56-question touring checklist
                </Link>{" "}
                for a complete evaluation process.
              </P>

              <Divider />

              <H2 id="staffing">1. Start With Staffing</H2>
              <P>
                Staffing is the single most important variable in memory care
                quality. Everything else &mdash; the beautiful lobby, the activity
                schedule, the menu &mdash; matters less than the people who are
                with your loved one every day.
              </P>

              <H3>Caregiver-to-Resident Ratio</H3>
              <P>
                Ask specifically about the ratio during day shifts, evening
                shifts, and overnight. A good ratio for memory care is 1:5 or
                1:6 during the day. Many communities have higher ratios during
                evenings and overnight &mdash; ask what those numbers are. A
                community that won&rsquo;t give you specific numbers is a red flag.
              </P>

              <H3>Dementia-Specific Training</H3>
              <P>
                Ask: How many hours of dementia-specific training does each
                caregiver receive during orientation? How many hours annually?
                Is the training ongoing or one-time? Look for communities that
                invest in training beyond the state minimum. Many states require
                as few as 4&ndash;8 hours of dementia training. The best
                communities provide 30, 40, or 60+ hours.
              </P>

              <H3>Staff Turnover Rate</H3>
              <P>
                Turnover in long-term care is notoriously high &mdash; industry-wide
                averages exceed 50% annually. High turnover means your loved one
                is constantly adjusting to new caregivers, which is particularly
                destabilizing for people with dementia. Ask directly: what is
                your annual caregiver turnover rate? Any community below 30% is
                doing well. A community that deflects this question is often a
                community with a problem.
              </P>

              <Callout>
                The same caregiver seeing your loved one every day knows their
                patterns, preferences, and triggers. That consistency of relationship
                is not a nice-to-have in memory care &mdash; it&rsquo;s a clinical
                necessity.
              </Callout>

              <Divider />

              <H2 id="environment">2. The Physical Environment</H2>
              <P>
                The physical design of a memory care community has a significant
                impact on resident wellbeing, safety, and function.
              </P>

              <H3>Layout</H3>
              <P>
                Look for circular or loop floor plans that allow residents to
                walk continuously without reaching dead ends (dead ends cause
                agitation in wandering residents). Smaller dining rooms (rather
                than one large cafeteria) reduce overstimulation. Wide hallways
                accommodate walkers and wheelchairs.
              </P>

              <H3>Wayfinding and Orientation Cues</H3>
              <P>
                Well-designed communities use visual cues to help residents
                orient themselves: color-coded hallways, personal memory boxes
                or shadow boxes outside each room (with photos and meaningful
                objects), clear signage that residents with dementia can actually
                process.
              </P>

              <H3>Outdoor Space</H3>
              <P>
                Secure outdoor space &mdash; a garden or courtyard that residents
                can access safely &mdash; is significantly associated with better
                behavioral outcomes. Sunlight, fresh air, and controlled outdoor
                activity are therapeutic for dementia residents. Ask whether
                staff actively take residents outside or whether the outdoor
                space is mostly decorative.
              </P>

              <H3>Noise and Stimulation Level</H3>
              <P>
                Visit during a normal activity period. Is the environment calm
                or chaotic? Is music playing at a reasonable volume? Are
                televisions constantly blaring? Overstimulation is a known
                trigger for agitation and sundowning in dementia residents.
              </P>

              <Divider />

              <H2 id="programming">3. Activity Programming</H2>
              <P>
                A genuine activity program &mdash; not just a printed schedule
                that isn&rsquo;t followed &mdash; is one of the most important
                quality indicators in memory care.
              </P>
              <P>
                Ask to see the actual daily schedule, not just a description.
                Ask how activities are adapted for residents at different
                cognitive levels. Ask what the ratio of passive activities
                (watching TV, listening to music) to active, cognitively
                stimulating activities is. The best programs offer:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Cognitive Stimulation Therapy (CST) or equivalent structured programs</li>
                <li>Music therapy (particularly effective for dementia)</li>
                <li>Art, crafts, or other creative activities</li>
                <li>Physical exercise tailored to cognitive level</li>
                <li>Reminiscence therapy (using objects, photos, and stories from the past)</li>
                <li>Outdoor and sensory activities</li>
                <li>Social interaction at an appropriate level</li>
              </ul>

              <Divider />

              <H2 id="safety">4. Safety and Security</H2>
              <H3>Secured Exits</H3>
              <P>
                All exits should be secured in a way that prevents residents
                from wandering out. Ask how exits are secured: keypad codes,
                delayed egress alarms, or staff monitoring. Ask what happens
                when a resident tries to exit. Ask whether there have been any
                elopement incidents in the past year.
              </P>

              <H3>Monitoring</H3>
              <P>
                Ask about wander management systems &mdash; many communities
                use wristbands or ankle bands that trigger alarms at secured
                exits. Ask about camera coverage in common areas (not rooms).
                Ask about overnight monitoring and staffing.
              </P>

              <H3>Fall Prevention</H3>
              <P>
                Falls are a major risk in memory care populations. Ask about the
                community&rsquo;s fall prevention protocol, the rate of fall
                incidents, and how they manage residents who are fall risks.
                A community that can&rsquo;t give you specific fall-related
                answers is a concern.
              </P>

              <Divider />

              <H2 id="cost-transparency">5. Cost Transparency</H2>
              <P>
                Memory care pricing is often opaque. Get complete cost information
                in writing before making any decision.
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>What is the base monthly rate, and what does it include?</li>
                <li>What is the level-of-care assessment system? How are levels determined? What are the fees at each level?</li>
                <li>What triggers a reassessment? How much notice is given?</li>
                <li>What additional services are charged separately? (Incontinence supplies, therapy, salon)</li>
                <li>What is the move-in fee or community fee?</li>
                <li>What has been the average annual rate increase over the past 3 years?</li>
                <li>What is the discharge policy? Under what circumstances can a resident be asked to leave?</li>
              </ul>

              <Divider />

              <H2 id="ten-am-test">6. The 10 AM Test</H2>
              <P>
                This is the single most useful thing you can do when evaluating
                a memory care community. Visit at 10 AM on a weekday, unannounced
                if the community allows it. This window &mdash; after morning
                care (breakfast, bathing, dressing) and before lunch &mdash;
                shows you what the community looks like during a regular day,
                not a scheduled tour.
              </P>
              <P>
                What you&rsquo;re looking for:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>Are residents engaged in activities or sitting idle?</li>
                <li>Are staff interacting warmly and patiently with residents, or clustered at the nurses&rsquo; station?</li>
                <li>What is the noise and energy level?</li>
                <li>Are residents dressed and groomed?</li>
                <li>Does the environment smell clean?</li>
                <li>Do residents seem calm, or is there significant agitation or distress visible?</li>
                <li>Do staff greet you warmly and answer questions directly?</li>
              </ul>

              <Callout>
                Your gut reaction during the 10 AM unannounced visit is meaningful
                data. If something feels off &mdash; residents sitting in a dark
                hallway, staff who seem stressed or inattentive, a pervasive odor
                of urine &mdash; trust that feeling and look elsewhere.
              </Callout>

              <Divider />

              <H2 id="red-flags">7. Red Flags</H2>
              <P>
                These are the signals that should stop your evaluation of a
                community:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li><strong>Strong pervasive odor of urine</strong> in common areas (not just momentarily near a resident)</li>
                <li><strong>Residents sitting idle</strong> with no programming in sight</li>
                <li><strong>Evasion of staffing ratio questions</strong> — won&rsquo;t give specific numbers</li>
                <li><strong>Refusal to allow unannounced visits</strong> after move-in</li>
                <li><strong>Vague or inconsistent cost information</strong> — can&rsquo;t tell you what the all-in cost will be</li>
                <li><strong>High visible staff agitation</strong> or staff talking about residents dismissively</li>
                <li><strong>Recent state citations</strong> for serious deficiencies (check online before visiting)</li>
                <li><strong>Pressure to sign quickly</strong> or "limited availability" tactics</li>
                <li><strong>No dedicated memory care director</strong> or clinical leadership</li>
              </ul>

              <Divider />

              <H2 id="ratings">8. How to Check Ratings and Inspection Reports</H2>
              <P>
                Before visiting any community, check its regulatory history.
                For nursing homes with memory care units, the CMS Care Compare
                tool at{" "}
                <Link href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors">
                  medicare.gov/care-compare
                </Link>{" "}
                provides star ratings, inspection reports, and deficiency citations.
              </P>
              <P>
                For standalone memory care communities (not nursing homes), check
                your state&rsquo;s licensing agency. Most states publish inspection
                reports and deficiency data online. Search for your state&rsquo;s
                &ldquo;assisted living inspection reports&rdquo; or &ldquo;residential care licensing.&rdquo;
              </P>
              <P>
                Also check:
              </P>
              <ul className="list-disc list-inside space-y-2 text-[1.0625rem] text-slate-600 mb-5 ml-1">
                <li>State licensing status (is the community currently licensed?)</li>
                <li>Complaint history (most state agencies publish this)</li>
                <li>Google reviews (filter for the most recent)</li>
                <li>Yelp and A Place for Mom reviews (with appropriate skepticism for sponsored listings)</li>
              </ul>

              <Divider />

              <H2 id="questions-to-ask">9. Questions to Ask</H2>
              <P>
                We&rsquo;ve compiled a complete 56-question touring checklist organized
                by category: staffing, environment, programming, safety, costs, and
                after-admission questions. Use it on every tour.
              </P>
              <div className="my-6">
                <Link
                  href="/memory-care/questions-to-ask/"
                  className="inline-block bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
                >
                  See the Complete 56-Question Checklist →
                </Link>
              </div>

              <Divider />

              <H2 id="final-decision">10. Making the Final Decision</H2>
              <P>
                After visiting multiple communities, you&rsquo;ll likely have one or
                two that rise above the rest. Here&rsquo;s a final decision framework:
              </P>
              <ol className="list-decimal list-inside space-y-3 text-[1.0625rem] text-slate-600 mb-6 ml-1">
                <li>
                  <strong>The gut check:</strong> When you walked in, did it feel
                  like a place your loved one would be okay? Did staff seem to
                  actually like the residents?
                </li>
                <li>
                  <strong>Staffing:</strong> Did they answer the staffing ratio
                  and turnover questions honestly and specifically?
                </li>
                <li>
                  <strong>Cost clarity:</strong> Do you fully understand what the
                  all-in monthly cost will be and what could change it?
                </li>
                <li>
                  <strong>Regulatory history:</strong> Any recent serious citations
                  or repeated violations?
                </li>
                <li>
                  <strong>The 10 AM check:</strong> Did an unannounced or less
                  formal visit confirm what the scheduled tour showed you?
                </li>
              </ol>
              <P>
                No community is perfect. You&rsquo;re looking for the best fit for
                your specific loved one, at their specific stage of dementia, in your
                specific area. Trust the combination of data, gut feeling, and the
                answers you got to your hardest questions.
              </P>

              <div className="bg-teal-600 rounded-2xl p-7 text-center mt-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Before You Tour: Take the Care Assessment
                </h2>
                <p className="text-teal-100 text-sm leading-relaxed mb-5">
                  Understanding whether memory care is the right level of care
                  &mdash; and what financial assistance your loved one might
                  qualify for &mdash; helps you tour with confidence.
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
