import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "End-of-Life Care in Nursing Homes: Planning Guide | OurTurnToCare",
  description:
    "Advance directives, hospice care in nursing homes, having the conversation with your parent, and planning for end of life with clarity and compassion.",
  openGraph: {
    title: "End-of-Life Care in Nursing Homes: Planning Guide",
    description:
      "Advance directives, hospice in nursing homes, and how to have the conversation — a compassionate guide to end-of-life planning.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/end-of-life/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/end-of-life/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Understand all your options</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Our care assessment helps clarify the right level of care for your parent&apos;s specific situation — including end-of-life considerations.
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
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "Specialized Care", href: "/nursing-homes/specialized-care/" },
            { label: "Daily Life in a Nursing Home", href: "/nursing-homes/daily-life/" },
            { label: "The Transition Guide", href: "/nursing-homes/transition-guide/" },
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

export default function EndOfLifePage() {
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
            <span className="text-slate-700 font-medium">End-of-Life Care</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            End-of-Life Care and Advance Planning in Nursing Homes
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Planning for end of life — while emotionally difficult — is one of the most
            loving things you can do for your parent and your family. This guide explains
            your options and how to approach them with clarity.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Nursing homes are not just places where people receive medical care — they
                are, for many residents, where life ends. Understanding end-of-life care
                options and advance planning tools helps ensure that your parent&rsquo;s final
                weeks, months, or years reflect their own wishes and values, rather than
                default medical processes that may not align with what they would have
                chosen.
              </P>

              <H2 id="advance-directives">Advance Directives: The Essential Documents</H2>
              <P>
                Advance directives are legal documents that communicate a person&rsquo;s wishes
                regarding medical treatment when they can no longer speak for themselves.
                The most important ones to establish before nursing home placement — and
                ideally well before — are:
              </P>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Living Will (Advance Directive for Healthcare)",
                    desc: "A written statement of a person's wishes regarding medical treatment — specifically, which interventions they do and don't want if they become incapacitated. A living will typically addresses resuscitation (CPR), mechanical ventilation, feeding tubes, dialysis, and comfort care preferences. It is a guide to values and preferences, not a legally binding medical order.",
                  },
                  {
                    title: "Healthcare Power of Attorney (HCPOA) / Healthcare Proxy",
                    desc: "Designates a specific person — the healthcare agent or proxy — to make medical decisions on the person's behalf if they lose decision-making capacity. This is arguably the most important document. The person you designate needs to know your parent's values, be able to make difficult decisions under pressure, and be available and reachable when needed.",
                  },
                  {
                    title: "POLST / MOLST Form (Physician Orders for Life-Sustaining Treatment)",
                    desc: "Unlike a living will, a POLST (or MOLST in some states) is a medical order — signed by a physician — that travels with the patient and guides emergency medical responders and healthcare providers. It translates a person's end-of-life wishes into actionable medical orders, covering CPR, mechanical ventilation, feeding tubes, and hospitalization preferences. Every nursing home resident should have an up-to-date POLST/MOLST.",
                  },
                  {
                    title: "DNR Order (Do Not Resuscitate)",
                    desc: "A specific medical order that instructs staff not to perform CPR if the person's heart stops or breathing ceases. A DNR is separate from other advance directives and is signed by a physician. Some families choose a DNR-Comfort Care order, which focuses entirely on comfort and pain management and forgoes life-sustaining treatment.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-2">{title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Callout>
                Establishing advance directives while your parent still has decision-making
                capacity is critically important. Once capacity is lost, the ability to
                express wishes formally is gone — and families are left making decisions
                without clear guidance, which is one of the hardest situations anyone can
                face. Don&rsquo;t wait.
              </Callout>

              <Divider />

              <H2 id="hospice">Hospice Care in Nursing Homes</H2>
              <P>
                Hospice is a philosophy and an approach to care, not a place. Hospice
                provides comfort-focused care for people with a terminal illness and a
                life expectancy of six months or less (if the illness runs its normal
                course). Crucially, hospice can — and often is — provided within a nursing
                home, by a hospice team that visits and supplements the facility&rsquo;s care.
              </P>
              <H3>What Hospice Covers</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Physician and nursing visits focused on pain and symptom management",
                  "Social worker support for the resident and family",
                  "Chaplain or spiritual care services",
                  "Home health aide services (additional personal care)",
                  "Medications, medical equipment, and supplies related to the terminal diagnosis",
                  "Bereavement counseling for family members after the resident's death",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>How Hospice Is Covered</H3>
              <P>
                Medicare covers hospice at no cost to the resident. Medicaid also covers
                hospice in most states. Most private insurance covers hospice care as well.
                The nursing home continues to be paid by its usual payment sources (Medicare
                Part A, Medicaid, or private pay); the hospice is paid separately by
                Medicare or other insurance for the hospice services it provides.
              </P>
              <H3>The Research on Hospice</H3>
              <P>
                Research consistently shows that hospice care improves quality of life for
                people with terminal illness. Perhaps most significantly, multiple studies
                have found that hospice patients live as long — or in some cases longer —
                than similar patients who didn&rsquo;t use hospice. This counterintuitive finding
                is attributed to better symptom management, reduced hospitalizations, and
                care aligned with patients&rsquo; own goals and values.
              </P>
              <Callout>
                Many families wait too long to ask about hospice. If your parent&rsquo;s
                condition is declining despite treatment, or if a physician says they
                may be in the last months of life, it&rsquo;s worth asking: &ldquo;Is my parent a
                candidate for hospice?&rdquo; The answer may open up a level of support and
                comfort care that wasn&rsquo;t previously available.
              </Callout>

              <Divider />

              <H2 id="conversation">Having the Conversation</H2>
              <P>
                Talking with your parent about end-of-life wishes is one of the most
                meaningful conversations you can have — and one of the most commonly
                avoided. Many families find that when they finally have the conversation,
                it&rsquo;s less difficult than they feared, and often a source of relief and
                connection for everyone involved.
              </P>
              <H3>Questions to Ask</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "\"What matters most to you in the time you have left?\"",
                  "\"What are you most afraid of?\"",
                  "\"If you became very ill and couldn't speak for yourself, who would you want to make decisions for you?\"",
                  "\"If you couldn't be cured, what would be most important to you — being comfortable, staying as sharp mentally as possible, being near family?\"",
                  "\"How do you feel about being resuscitated if your heart stopped?\"",
                  "\"Are there specific treatments you know you would or wouldn't want?\"",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-700 leading-relaxed italic">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full not-italic"></span>
                    <span className="not-italic text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
              <H3>After the Conversation</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Document their wishes formally using advance directive forms (available from your state health department)",
                  "Share copies with their physician, the nursing home, and any healthcare agents",
                  "Make sure the POLST/MOLST form in their medical record reflects their wishes",
                  "Revisit the conversation periodically — wishes can change",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                The Conversation Project (theconversationproject.org) offers free guides
                and tools to help families have these conversations. The Five Wishes
                document (agingwithdignity.org) is an accessible advance directive form
                accepted in most states that walks through both legal and personal elements
                of end-of-life planning.
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
            Planning Ahead Is an Act of Love
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            The families who move through end of life with the least regret are usually those
            who had the conversations and made the plans before a crisis forced their
            hand. Our tools help you understand all your options.
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
