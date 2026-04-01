import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Staffing: Why It Matters & What to Look For | OurTurnToCare",
  description:
    "Staffing is the single most important predictor of nursing home quality. Who works there, the new CMS minimum requirements, how to evaluate a facility's staffing, and why turnover matters.",
  openGraph: {
    title: "Nursing Home Staffing: Why It Matters & What to Look For",
    description:
      "Staffing is the single most important predictor of nursing home quality. Here's who works there, the new CMS requirements, and how to evaluate a facility.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/staffing/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/staffing/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Not sure which care is right?</p>
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
            { label: "How to Evaluate Quality", href: "/nursing-homes/how-to-evaluate/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "40 Questions to Ask", href: "/nursing-homes/questions-to-ask/" },
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

export default function StaffingPage() {
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
            <span className="text-slate-700 font-medium">Staffing</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Staffing: Why It Matters &amp; What to Look For
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Staffing is the single most important predictor of nursing home quality.
            Here&rsquo;s who works in a nursing home, what the standards are, and how to
            evaluate a facility&rsquo;s staffing before and after placement.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="why-it-matters">Why Staffing Matters</H2>
              <P>
                Research consistently shows that facilities with more nurses and aides per
                resident have lower rates of pressure ulcers, fewer infections, fewer falls,
                fewer hospitalizations, and better overall outcomes. The relationship
                between staffing levels and care quality is one of the most well-documented
                findings in long-term care research.
              </P>
              <P>
                The math is simple: when a CNA is responsible for 10
                residents during a morning shift, they have approximately 5 minutes per
                resident for personal care, meals, and repositioning. When they&rsquo;re
                responsible for 7 residents, they have more time — and more time means
                noticing early warning signs, preventing pressure ulcers through regular
                repositioning, ensuring residents drink enough fluids, and treating each
                person with patience and dignity.
              </P>

              <Divider />

              <H2 id="who-works">Who Works in a Nursing Home</H2>
              <div className="space-y-4 mb-6">
                {[
                  {
                    role: "Registered Nurses (RNs)",
                    desc: "The highest-credentialed nursing staff. RNs assess residents, develop nursing care plans, administer complex medications and treatments (including IV therapy), manage medical emergencies, and supervise LPNs and CNAs. At least one RN must be on duty 8 consecutive hours per day, 7 days a week — and new CMS rules require 24/7 RN presence.",
                  },
                  {
                    role: "Licensed Practical Nurses (LPNs)",
                    desc: "Work under RN supervision to provide much of the day-to-day skilled nursing care — administering oral medications, monitoring vital signs, performing wound care, and communicating with physicians. LPNs often serve as charge nurses during evening and night shifts.",
                  },
                  {
                    role: "Certified Nursing Assistants (CNAs)",
                    desc: "The frontline caregivers who provide the most direct, hands-on care to residents — helping with bathing, dressing, toileting, meals, mobility, and positioning. CNAs are the staff your parent will interact with most frequently. Their skill, patience, and compassion profoundly affect quality of life.",
                  },
                  {
                    role: "Physicians and Nurse Practitioners",
                    desc: "A physician serves as medical director and is responsible for the overall medical care program. Most residents have their own attending physician, who is required to visit at least once every 30 days for the first 90 days, then at least every 60 days. Nurse practitioners (NPs) often fill gaps between physician visits.",
                  },
                  {
                    role: "Physical, Occupational, and Speech Therapists",
                    desc: "Provide rehabilitation services. May be employed by the facility or contracted through a therapy company. The employment model matters — facility-employed therapists tend to be more integrated into resident care planning.",
                  },
                  {
                    role: "Social Workers",
                    desc: "Address psychosocial needs, coordinate care planning, manage discharge planning, and serve as a resource for families trying to figure out the system.",
                  },
                  {
                    role: "Registered Dietitians",
                    desc: "Oversee nutritional care, assess residents at risk for malnutrition, and develop individualized nutrition plans.",
                  },
                  {
                    role: "Activity Directors",
                    desc: "Plan and implement the activities program. Certified activity directors (CTRSs) are trained in therapeutic recreation.",
                  },
                ].map(({ role, desc }) => (
                  <div key={role} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">{role}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Divider />

              <H2 id="cms-requirements">The New CMS Staffing Requirements (2024)</H2>
              <P>
                In April 2024, CMS finalized new minimum staffing requirements for nursing
                homes — the first federal minimum staffing rule in the history of the
                nursing home program:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "24/7 registered nurse (RN) presence — an RN must be on-site at all times",
                  "At least 0.55 RN hours per resident per day",
                  "At least 2.45 CNA hours per resident per day",
                  "Total minimum of 3.48 nursing hours per resident per day",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                These are <strong>minimums</strong> — the floor, not the target. High-quality facilities
                significantly exceed these requirements. When evaluating a facility, ask
                for their actual staffing numbers rather than comparing to the minimum.
                Many experts consider 4.1+ total nursing hours per resident per day to
                be the threshold for high-quality care.
              </Callout>

              <Divider />

              <H2 id="evaluating">How to Evaluate a Facility&rsquo;s Staffing</H2>
              <H3>On Medicare Care Compare</H3>
              <P>
                At{" "}
                <a href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline hover:text-teal-900">
                  medicare.gov/care-compare
                </a>
                , you can see each facility&rsquo;s reported staffing data including total nursing
                hours per resident per day, RN hours specifically, the staffing star rating,
                and — now — staff turnover rates.
              </P>
              <H3>Questions to Ask on Tour</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "What is the total nursing hours per resident per day on each shift?",
                  "How many RNs, LPNs, and CNAs are on duty on day shift? Evening shift? Night shift?",
                  "What is the nurse-to-resident and CNA-to-resident ratio on each shift?",
                  "Do you staff differently on weekends? How does weekend staffing compare to weekday staffing?",
                  "What is your annual staff turnover rate?",
                  "How long have your director of nursing and administrator been in their roles?",
                  "How often do you use agency (temporary) staff? On what shifts?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="turnover">Staff Turnover: A Critical Quality Indicator</H2>
              <P>
                The national average annual turnover rate for nursing staff is approximately
                46%, and RN turnover averages about 36%. Some facilities have turnover
                exceeding 100% annually — meaning the entire nursing staff turns over more
                than once per year.
              </P>
              <P>
                High turnover is a red flag for several reasons. It means residents
                constantly interact with unfamiliar caregivers who don&rsquo;t know their
                preferences, history, or warning signs. It signals problems with management,
                working conditions, or compensation. And it often leads to heavier reliance
                on agency (temporary) staff, who provide less consistent care.
              </P>
              <P>
                CMS now publishes turnover data on Medicare Care Compare for every facility.
                When comparing facilities, look for turnover rates well below the national
                average. A facility where CNAs and nurses stay for years — who know
                residents by name, know their family members, and notice immediately when
                something seems off — provides fundamentally better care.
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
            Evaluate Quality Before You Choose
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Staffing is one of the most important factors — but it&rsquo;s one of many. Our
            complete evaluation guide walks you through the full 5-step process for
            comparing nursing homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nursing-homes/how-to-evaluate/"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              How to Evaluate Quality →
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
