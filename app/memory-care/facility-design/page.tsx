import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion, { FAQGroup } from "@/components/memory-care/FAQAccordion";

export const metadata: Metadata = {
  title: "How Memory Care Communities Are Designed | OurTurnToCare",
  description:
    "Inside the design of memory care: layout, wayfinding, secured exits, sensory design, outdoor spaces, and how environment directly impacts care quality.",
  openGraph: {
    title: "How Memory Care Communities Are Designed",
    description:
      "The physical environment of memory care is part of the care itself. Learn what good design looks like and what to evaluate on a tour.",
    type: "article",
    url: "https://ourturntocare.org/memory-care/facility-design/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/memory-care/facility-design/",
  },
};

const FAQ_GROUPS: FAQGroup[] = [
  {
    category: "Memory Care Facility Design",
    items: [
      {
        q: "What makes memory care design different from regular assisted living?",
        a: "Memory care design addresses specific challenges of cognitive impairment: wandering and elopement risk (requiring secured exits and monitored perimeters), wayfinding difficulty (requiring clear visual cues and familiar landmarks), sensory sensitivity (requiring controlled lighting and sound levels), and agitation triggers (requiring calm, uncluttered environments). Standard assisted living design prioritizes aesthetics and independent living, not the cognitive support features that memory care requires.",
      },
      {
        q: "What is a 'secured perimeter' in memory care?",
        a: "A secured perimeter means residents cannot exit the facility without staff awareness or assistance. This is achieved through a combination of locked or code-protected exit doors, alarm systems on exits, and in some cases wristband technology that triggers alerts if a resident approaches an exit. The goal is safety without excessive restriction — the best communities have secure outdoor spaces where residents can move freely while remaining safely within the community.",
      },
      {
        q: "What should I look for in the physical environment during a tour?",
        a: "Look for: natural light (windows, skylights, outdoor access); a calm, uncluttered environment; clear wayfinding cues (signage, color coding, personal identifiers near rooms); a loop or circular floor plan that allows wandering residents to walk safely without reaching dead ends; secured but accessible outdoor space; and small-scale neighborhood design rather than large institutional corridors. Also observe: is the environment calm and pleasant, or institutional and chaotic?",
      },
      {
        q: "Can residents bring personal belongings to memory care?",
        a: "Yes. Most memory care communities encourage residents to bring meaningful personal items — photographs, familiar furniture pieces, a favorite chair, personal decorations for their room. Familiar objects from their home environment support orientation and identity. Some items require safety review (sharp objects, cords, items that could be mistaken for food). Ask the community for their specific guidelines on personal belongings.",
      },
      {
        q: "What is 'memory box' wayfinding in memory care?",
        a: "Memory boxes — small display cases mounted outside each resident's room — hold personal items, photographs, and mementos that help the resident (and staff) identify their room. They help residents find their own space and serve as conversation starters and identity anchors. They're one of the simplest and most effective wayfinding tools in dementia care environments.",
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

function DesignFeature({
  title,
  good,
  poor,
}: {
  title: string;
  good: string;
  poor: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
      </div>
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1.5">Good design</p>
          <p className="text-sm text-slate-600 leading-relaxed">{good}</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1.5">Poor design</p>
          <p className="text-sm text-slate-600 leading-relaxed">{poor}</p>
        </div>
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
            { label: "Daily life in memory care", href: "/memory-care/daily-life/" },
            { label: "Red flags to watch for", href: "/memory-care/red-flags/" },
            { label: "How to choose a community", href: "/memory-care/how-to-choose/" },
            { label: "56 questions to ask when touring", href: "/memory-care/questions-to-ask/" },
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
          See design in practice
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Use our 56-question touring checklist to ask the right questions about environment and safety on your visits.
        </p>
        <Link
          href="/memory-care/questions-to-ask/"
          className="block text-center text-sm font-semibold px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        >
          Get the Touring Checklist →
        </Link>
      </div>
    </div>
  );
}

export default function MemoryCareFacilityDesignPage() {
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
            <span className="text-slate-700 font-medium">Facility Design</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How Memory Care Communities Are Designed
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            The physical environment of memory care is part of the care itself. What good design looks like, why it matters, and what to evaluate when you tour.
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
                Walk into a well-designed memory care community and you feel the difference before you can articulate it. The light is calm, not fluorescent. The hallways are short and circular, not long and disorienting. The common areas are small enough to feel familiar, not institutional. The outdoor space is visible, not locked away.
              </P>
              <P>
                That feeling is intentional. Evidence-based dementia care environment design has advanced significantly over the past two decades, and the physical layout of a memory care community directly affects behavioral symptoms, falls, agitation, and quality of life for residents.
              </P>

              <Divider />

              {/* ── Design Principles ───────────────────────────────────── */}
              <section aria-labelledby="design-principles">
                <H2 id="design-principles">Core Design Principles for Memory Care</H2>
                <P>
                  Well-designed memory care environments are built around four core principles that address the specific challenges of cognitive impairment:
                </P>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Safety Without Excessive Restriction",
                      desc: "Residents need protection from wandering into unsafe situations, but excessive restriction creates agitation and diminishes dignity. Good design provides freedom within safe boundaries — secured perimeters that allow free movement within them, rather than locked doors that confine residents to small spaces.",
                    },
                    {
                      title: "Wayfinding and Orientation Support",
                      desc: "For someone with dementia, navigating even a familiar space can become impossible. Good design uses consistent visual cues, memorable landmarks, color-coded areas, and personal identifiers to help residents navigate independently, maintaining autonomy for as long as possible.",
                    },
                    {
                      title: "Sensory Calibration",
                      desc: "People with dementia are often hypersensitive to sensory input. Overstimulation — loud noise, bright fluorescent lighting, chaotic patterns — triggers agitation. Good design uses natural light, calm color palettes, controlled ambient sound, and textured surfaces that provide sensory engagement without overwhelm.",
                    },
                    {
                      title: "Small-Scale, Homelike Environments",
                      desc: "Large institutional wings with 40–60 residents sharing a common space are associated with higher rates of agitation, wandering, and behavioral symptoms. Smaller neighborhoods of 10–15 residents with dedicated dining and living areas create familiarity and social connection.",
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="border border-slate-200 rounded-xl px-5 py-4">
                      <p className="font-semibold text-slate-800 mb-1.5">{title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <Divider />

              {/* ── Layout ──────────────────────────────────────────────── */}
              <section aria-labelledby="layout">
                <H2 id="layout">Layout and Floor Plan</H2>
                <P>
                  The floor plan of a memory care community is one of the most important structural decisions affecting resident experience.
                </P>

                <H3>Circular and Loop Floor Plans</H3>
                <P>
                  Circular or loop corridors &mdash; where walking a continuous path returns the resident to their starting point &mdash; are considered the gold standard in memory care design. They allow residents who pace or wander to do so safely, without reaching dead ends (which trigger agitation) or exit doors.
                </P>
                <P>
                  When you tour a community, trace the floor plan. Can you walk a complete loop without passing through a secured door or dead end? If corridors terminate at locked exits, ask how wandering residents are redirected.
                </P>

                <H3>Small-Scale Neighborhoods</H3>
                <P>
                  Newer memory care communities often divide the facility into &ldquo;neighborhoods&rdquo; of 10&ndash;15 residents, each with its own dining room, living area, and activity space. Research consistently shows better outcomes in these smaller-scale units compared to large common spaces shared by 40+ residents.
                </P>
                <P>
                  Smaller neighborhoods mean: more familiar faces for residents, quieter and calmer common spaces, and caregivers who know each resident individually. When evaluating communities, ask how many residents share each common dining area.
                </P>

                <DesignFeature
                  title="Floor Plan Design"
                  good="Circular or loop corridors; small resident neighborhoods (10–15 residents); clear sightlines from staff areas; separate quiet and activity spaces"
                  poor="Long dead-end corridors; large institutional wings with 30–50+ residents sharing common spaces; poor visibility from staff work areas"
                />
              </section>

              <Divider />

              {/* ── Wayfinding ──────────────────────────────────────────── */}
              <section aria-labelledby="wayfinding">
                <H2 id="wayfinding">Wayfinding and Navigation</H2>
                <P>
                  A person with moderate dementia may be entirely unable to remember where their room is, or which hallway leads to the dining room. Good wayfinding design compensates for this lost ability through consistent visual cues that don&rsquo;t depend on memory.
                </P>

                <H3>Memory Boxes</H3>
                <P>
                  Memory boxes are small display cases mounted outside each resident&rsquo;s room, holding familiar personal items &mdash; photographs, a favorite object, a meaningful memento. They help residents identify their own room and provide a visual identity anchor that supports autonomy. They&rsquo;re also conversation starters that staff can use during care.
                </P>

                <H3>Color Coding and Landmarks</H3>
                <P>
                  Consistent color schemes for different areas, distinctive artwork, and familiar landmarks at key decision points (where to turn for the dining room, where to find the nurses&rsquo; station) support navigation. Look for environmental cues when you tour &mdash; is it clear, even to you as a visitor, where different spaces are and how to get there?
                </P>

                <H3>Signage</H3>
                <P>
                  Effective signage for memory care uses large text, simple language, high contrast colors, and pictographic icons alongside words. Signs should be placed at eye level and at decision points. Generic printed signs in small type are ineffective for people with dementia.
                </P>

                <DesignFeature
                  title="Wayfinding"
                  good="Memory boxes outside each room; consistent color coding by area; large-text pictographic signage at eye level; distinctive landmarks at key intersections"
                  poor="Identical-looking corridors; small printed signs; no visual differentiation between areas; confusing or inconsistent environmental cues"
                />
              </section>

              <Divider />

              {/* ── Secured Exits ───────────────────────────────────────── */}
              <section aria-labelledby="secured-exits">
                <H2 id="secured-exits">Secured Exits and Wandering Safety</H2>
                <P>
                  Wandering and elopement (exiting the facility unsafely) are serious safety risks for people with dementia. Communities address this through multiple overlapping layers of protection.
                </P>

                <H3>Physical Security</H3>
                <P>
                  Exit doors in memory care are typically secured by code-entry keypads, delayed egress mechanisms (the door sounds an alarm and delays opening by 15 seconds when an exit is attempted), or both. The goal is to prevent residents from exiting unsafely while maintaining a dignified environment that doesn&rsquo;t feel like a prison.
                </P>

                <H3>Technology-Based Monitoring</H3>
                <P>
                  Many communities use wristband or anklet systems that alert staff when a resident approaches a secured exit. This allows a less restrictive physical environment while maintaining safety. Ask any community you evaluate what specific technology they use for wandering prevention.
                </P>

                <H3>Secured Outdoor Access</H3>
                <P>
                  The best memory care communities provide secure outdoor spaces that residents can access freely &mdash; enclosed courtyards, walking paths, gardens. Access to outdoor space is associated with improved sleep, reduced agitation, and better quality of life. Communities that lock all outdoor access and restrict residents to indoor spaces all day are doing residents a disservice.
                </P>

                <Callout>
                  Ask specifically: &ldquo;Can residents access outdoor space independently during the day, or is outdoor time only available during organized outings?&rdquo; The answer tells you a great deal about the community&rsquo;s design philosophy and care approach.
                </Callout>
              </section>

              <Divider />

              {/* ── Sensory Design ──────────────────────────────────────── */}
              <section aria-labelledby="sensory-design">
                <H2 id="sensory-design">Sensory Design</H2>
                <P>
                  Sensory overstimulation is a significant trigger for agitation in people with dementia. Good memory care design addresses lighting, color, sound, and touch in ways that calm rather than agitate.
                </P>

                <H3>Lighting</H3>
                <P>
                  Natural light is the most important lighting consideration in dementia care environments. Exposure to natural light supports circadian rhythms, which are disrupted in dementia, contributing to sundowning and sleep problems. Communities should have windows that admit good natural light throughout the day. LED lighting should be warm-toned and adjustable, not harsh institutional fluorescents.
                </P>
                <P>
                  Some communities also use light therapy &mdash; bright light boxes &mdash; in the morning to reinforce circadian rhythms. This is an evidence-based intervention for sleep and sundowning management.
                </P>

                <H3>Color</H3>
                <P>
                  Calm, warm color palettes are preferred over institutional whites or overstimulating bright colors. High contrast between floors and walls helps residents with visual impairment navigate safely. Color contrast on handrails, door frames, and toilet seats improves safety and independence for residents with visual processing difficulties.
                </P>

                <H3>Sound</H3>
                <P>
                  Background noise levels matter enormously. Large institutional dining rooms with hard surfaces create acoustic chaos that disorients residents with dementia. Good design uses acoustic panels, soft furnishings, and smaller dining spaces to keep noise levels manageable. Overhead paging systems, loud televisions in common areas, and echoing corridors are design failures.
                </P>

                <DesignFeature
                  title="Sensory Environment"
                  good="Natural light throughout; warm, adjustable lighting; calm color palette with high contrast for safety; soft furnishings that absorb sound; quiet common spaces"
                  poor="Fluorescent lighting; loud overhead PA systems; hard surfaces that create acoustic chaos; overstimulating patterns or colors; limited natural light access"
                />
              </section>

              <Divider />

              {/* ── Dining and Bedrooms ─────────────────────────────────── */}
              <section aria-labelledby="spaces">
                <H2 id="spaces">Dining, Activity, and Personal Spaces</H2>

                <H3>Dining Areas</H3>
                <P>
                  Dining in memory care should feel like a shared meal, not a cafeteria. Small tables of 4&ndash;6 residents, familiar table settings, natural lighting, and a calm ambient sound level all contribute to positive dining experiences. Dining ability in dementia often persists longer when the environment supports it &mdash; and deteriorates faster when it doesn&rsquo;t.
                </P>

                <H3>Activity Spaces</H3>
                <P>
                  Dedicated activity spaces for programming, art, music, and movement are a sign of investment in resident quality of life. Look for a variety of spaces &mdash; not just one common area, but distinct spaces for different types of activity. A kitchen area for cooking-related activities, an art room, a garden area, and a space for exercise and movement all signal a robust activity program.
                </P>

                <H3>Resident Bedrooms</H3>
                <P>
                  Private rooms are strongly preferred over shared rooms in memory care. The ability to personalize a room with familiar objects from home &mdash; photographs, a familiar quilt, a favorite chair &mdash; supports identity and reduces disorientation. Ask whether the community has both private and shared rooms and what the cost difference is.
                </P>
                <P>
                  Memory boxes outside room doors, as discussed in the wayfinding section, are a best practice indicator. When evaluating communities, look at how individual rooms are identified and personalized.
                </P>
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
                  This guide draws on evidence-based design principles for dementia care environments, including research from the Center for Health Design, Dementia Design Guide (Designing for Dementia, Judith Torrington), and the Alzheimer&rsquo;s Association. This guide is for informational purposes only.
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
            Tour Communities to See Design in Practice
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our 56-question touring checklist helps you evaluate the physical environment, wayfinding, safety features, and sensory design of any memory care community.
          </p>
          <Link
            href="/memory-care/questions-to-ask/"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Get the Touring Checklist →
          </Link>
        </div>
      </section>
    </>
  );
}
