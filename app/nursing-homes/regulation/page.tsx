import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Nursing Homes Are Regulated and Inspected | OurTurnToCare",
  description:
    "Federal and state oversight, the inspection process, what happens when violations are found, how to access inspection results, and the role of the Long-Term Care Ombudsman.",
  openGraph: {
    title: "How Nursing Homes Are Regulated and Inspected",
    description:
      "Federal and state oversight, the inspection process, violations, and the role of the Long-Term Care Ombudsman — explained for families.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/regulation/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/regulation/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Long-Term Care Ombudsman</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          Free, confidential advocacy for nursing home residents in every state.
        </p>
        <p className="text-lg font-bold text-teal-700 mb-4">1-800-677-1116</p>
        <Link
          href="/nursing-homes/resident-rights/"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Resident Rights Guide →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "Five-Star Ratings Explained", href: "/nursing-homes/five-star-ratings/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "Abuse & Neglect", href: "/nursing-homes/abuse-and-neglect/" },
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
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

export default function RegulationPage() {
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
            <span className="text-slate-700 font-medium">Regulation</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            How Nursing Homes Are Regulated and Inspected
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Understanding the regulatory framework — who oversees nursing homes, how
            inspections work, and what recourse families have — makes you a more effective
            advocate.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="federal-state">Federal and State Oversight</H2>
              <P>
                Nursing home regulation is a joint federal-state enterprise. The Centers
                for Medicare &amp; Medicaid Services (CMS) sets minimum federal standards that
                every Medicare- and Medicaid-certified nursing home must meet. State health
                agencies — operating under agreements with CMS — conduct inspections,
                investigate complaints, and enforce the rules.
              </P>
              <P>
                States may impose additional requirements beyond federal minimums. Some
                states have significantly more stringent standards, higher staffing
                requirements, or more aggressive enforcement than others. This is one
                reason why nursing home quality varies considerably across state lines.
              </P>
              <H3>Key Federal Standards</H3>
              <P>
                The core federal nursing home requirements are set out in the Code of
                Federal Regulations (42 CFR Part 483) and cover:
              </P>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Resident rights — dignity, self-determination, privacy, and freedom from abuse",
                  "Quality of care — full care planning, medication management, nutrition, infection control",
                  "Staffing — licensed nurses on duty 24/7, minimum staffing levels (new CMS rules effective 2024-2026)",
                  "Physical environment — adequate space, safety, temperature, cleanliness",
                  "Administration — competent leadership, financial transparency, resident records",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="inspections">The Inspection Process</H2>
              <H3>Annual Surveys</H3>
              <P>
                State inspectors conduct unannounced, thorough surveys of every
                Medicare/Medicaid-certified nursing home at least once every 12–15 months.
                These surveys typically last 3–5 days and involve a team of inspectors who:
              </P>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Tour the facility and observe care being provided",
                  "Review medical records, care plans, and incident reports",
                  "Interview residents, family members, and staff",
                  "Evaluate medication administration",
                  "Assess infection control practices",
                  "Review staffing records and schedules",
                  "Evaluate kitchen and food service",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>Complaint Investigations</H3>
              <P>
                Any person — a resident, family member, staff member, or member of the
                public — can file a complaint against a nursing home with the state health
                department. The state must investigate all complaints. The timeframe and
                process depends on the severity: complaints alleging immediate jeopardy
                (life-threatening situations) must be investigated on-site within 2 working
                days; less urgent complaints may take longer.
              </P>
              <Callout>
                Complaint investigations are separate from and in addition to annual surveys.
                A facility can be inspected multiple times per year if complaints are filed.
                You can file a complaint with your state health department online or by
                phone at any time — your identity can be kept confidential.
              </Callout>

              <Divider />

              <H2 id="violations">What Happens When Violations Are Found</H2>
              <P>
                When inspectors find that a facility has failed to meet federal or state
                requirements, they cite it with a &ldquo;deficiency.&rdquo; Deficiencies are categorized
                by scope (how many residents are affected) and severity (from potential for
                minimal harm to immediate jeopardy to residents).
              </P>
              <P>
                Consequences depend on the severity and pattern of deficiencies:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Plan of Correction — the facility must submit a plan explaining how and when the problem will be fixed",
                  "Civil Money Penalties (CMPs) — fines ranging from hundreds to tens of thousands of dollars per day",
                  "Denial of Payment for New Admissions — CMS temporarily stops paying for new residents",
                  "Temporary Management — CMS installs an outside manager to run the facility",
                  "Termination of Medicare/Medicaid Certification — the most serious sanction, effectively closing the facility to new residents and requiring existing residents to be transferred",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                In 2023, approximately 94,499 health citations were issued nationally,
                with over $150 million in civil money penalties.
              </P>

              <Divider />

              <H2 id="access-results">How to Access Inspection Results</H2>
              <P>
                Inspection results are public record. You can access them in three ways:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  ["Medicare Care Compare", "medicare.gov/care-compare — Search by facility name or zip code to see star ratings, deficiency reports, and detailed inspection results for every certified facility."],
                  ["State Health Department", "Most states maintain their own searchable database of inspection reports, sometimes with more detail than the federal system."],
                  ["At the Facility", "Every certified nursing home is required to make the most recent annual inspection report available in a public area of the facility — usually the lobby or reception area."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    <div>
                      <span className="font-semibold text-slate-800">{title}</span>
                      {" — "}
                      {desc}
                    </div>
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="ombudsman">The Long-Term Care Ombudsman Program</H2>
              <P>
                Every state has a Long-Term Care Ombudsman program, established under the
                Older Americans Act. Ombudsmen are independent advocates — not government
                regulators — whose job is to protect the rights and welfare of nursing home
                and assisted living residents.
              </P>
              <H3>What the Ombudsman Can Do for You</H3>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Investigate complaints from residents and families — confidentially if requested",
                  "Visit facilities unannounced and speak with residents and staff",
                  "Mediate disputes between residents and facilities",
                  "Assist with discharge appeals and transfer disputes",
                  "Provide information about residents' rights and the regulatory process",
                  "Refer cases to the state health department or Adult Protective Services when warranted",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                The Ombudsman is free, confidential, and available to every nursing home
                resident and family. Call 1-800-677-1116 or visit{" "}
                <a href="https://eldercare.acl.gov" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline hover:text-teal-900">eldercare.acl.gov</a>{" "}
                to find your state&rsquo;s program.
              </Callout>

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
            Use Public Data to Make Better Decisions
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Inspection results, staffing data, and quality measures are publicly available
            for every certified nursing home. Our evaluation guide walks you through how
            to use this data effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nursing-homes/five-star-ratings/"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Five-Star Ratings Explained →
            </Link>
            <Link
              href="/nursing-homes/how-to-evaluate/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              How to Evaluate Quality →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
