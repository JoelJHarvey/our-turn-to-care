import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Resident Rights: What the Law Protects | OurTurnToCare",
  description:
    "Nursing home residents have extensive federally protected rights under the Nursing Home Reform Act. Here's what those rights are, how they're enforced, and what to do if they're violated.",
  openGraph: {
    title: "Nursing Home Resident Rights: What the Law Protects",
    description:
      "Extensive federally protected rights under the Nursing Home Reform Act — what they are, how they're enforced, and what to do if they're violated.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/resident-rights/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/resident-rights/",
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
        <p className="text-sm font-semibold text-slate-700 mb-1">Concerned about care quality?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          If you&apos;re seeing red flags or have concerns about your parent&apos;s care, our red flags guide walks you through what to watch for and what to do.
        </p>
        <Link
          href="/nursing-homes/red-flags/"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          See the Red Flags Guide →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "Abuse & Neglect", href: "/nursing-homes/abuse-and-neglect/" },
            { label: "How Nursing Homes Are Regulated", href: "/nursing-homes/regulation/" },
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "Daily Life in a Nursing Home", href: "/nursing-homes/daily-life/" },
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

export default function ResidentRightsPage() {
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
            <span className="text-slate-700 font-medium">Resident Rights</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Resident Rights: What the Law Protects
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            Nursing home residents have extensive, federally protected rights. Knowing
            these rights — and how to enforce them — makes you a stronger advocate for
            your loved one.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <H2 id="overview">The Nursing Home Reform Act of 1987</H2>
              <P>
                The Nursing Home Reform Act (OBRA &lsquo;87) established a broad set of
                rights for every resident of a Medicare- or Medicaid-certified nursing home.
                These rights are federal law — not suggestions — and nursing homes can face
                significant consequences for violating them, including fines, denial of
                payment, and loss of Medicare/Medicaid certification.
              </P>
              <P>
                The rights are posted in every certified nursing home and must be explained
                to residents and families at or before admission. Residents must be
                informed of any changes to these rights in writing.
              </P>

              <Divider />

              <H2 id="dignity">The Right to Dignity, Respect, and Self-Determination</H2>
              <P>
                Every resident has the right to be treated with dignity and respect as an
                individual. Specific rights include:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Choose their own physician and participate in the development and implementation of their care plan",
                  "Refuse treatment, medications, or procedures — even if that refusal may affect their health",
                  "Manage their own finances, or designate someone to do so",
                  "Privacy in personal care, communications, and visits",
                  "Make choices about daily life — what to wear, what to eat, when to rise and retire, how to spend time",
                  "Express grievances and have those grievances addressed without fear of retaliation",
                  "Access social services, including counseling and legal services",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="freedom-from-abuse">The Right to Be Free from Abuse, Neglect, and Restraints</H2>
              <P>
                Residents have the right to be free from:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Physical, verbal, sexual, and mental abuse",
                  "Corporal punishment",
                  "Involuntary seclusion",
                  "Physical restraints (including side rails, vests, belts) unless medically necessary, ordered by a physician, and used only as long as needed",
                  "Chemical restraints — medications used to sedate or control behavior rather than treat a medical condition",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-red-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Callout>
                Approximately 14% of long-stay nursing home residents receive antipsychotic
                medications. While these medications are appropriate for some residents
                (those with diagnosed psychiatric conditions), they are overused in many
                facilities as a form of chemical restraint. Ask about your facility&rsquo;s
                antipsychotic use rate — it&rsquo;s publicly available on Medicare Care Compare.
              </Callout>

              <Divider />

              <H2 id="information">The Right to Information and Communication</H2>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "Be fully informed about their health status, medical condition, and care options in a language they understand",
                  "Access their medical records within 24 hours of request",
                  "Send and receive personal mail without interference",
                  "Communicate freely with any person of their choice, including family, friends, and the ombudsman",
                  "Receive visitors, including immediate family, at any reasonable time",
                  "Use a telephone with privacy",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="complaints">The Right to Voice Complaints</H2>
              <P>
                Residents have the right to present grievances to facility staff and to
                outside agencies — including the Long-Term Care Ombudsman — without fear
                of retaliation or interference. The facility must have a grievance process
                and must make reasonable efforts to resolve complaints promptly.
              </P>
              <P>
                Retaliation against a resident or family member for filing a complaint is
                a serious violation. Signs of retaliation — sudden changes in care,
                unexplained restriction of privileges, staff hostility — should be reported
                immediately to the Ombudsman.
              </P>

              <Divider />

              <H2 id="transfer-discharge">Transfer and Discharge Protections</H2>
              <P>
                A nursing home can only transfer or discharge a resident for specific
                reasons:
              </P>
              <ul className="list-none space-y-2 mb-5">
                {[
                  "The facility cannot meet the resident's medical needs",
                  "The resident's health has improved to the point they no longer need nursing home care",
                  "The safety of other residents or staff is at risk",
                  "The resident has failed to pay after proper notice",
                  "The facility is closing",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 mt-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <P>
                The facility must provide at least 30 days written notice before a
                discharge or transfer (except in emergencies), inform the resident and
                family of appeal rights, and document the reason for discharge in the
                medical record. A nursing home <strong className="text-slate-800">cannot</strong> discharge a resident
                solely because they have transitioned from private pay to Medicaid.
              </P>

              <Divider />

              <H2 id="enforcement">How Rights Are Enforced</H2>
              <H3>Internal Grievance Process</H3>
              <P>
                Start with the facility&rsquo;s own grievance process — speak with the charge
                nurse, director of nursing, or administrator. Put your concern in writing
                and request a written response. Keep copies of everything.
              </P>
              <H3>The Long-Term Care Ombudsman</H3>
              <P>
                Every state has a Long-Term Care Ombudsman program — independent advocates
                who investigate complaints, mediate disputes, and help residents and families
                understand and exercise their rights. The Ombudsman is a free resource.
                To find your state&rsquo;s ombudsman: call 1-800-677-1116 or visit{" "}
                <a href="https://eldercare.acl.gov" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline hover:text-teal-900">eldercare.acl.gov</a>.
              </P>
              <H3>State Health Department</H3>
              <P>
                The state health department investigates complaints about nursing homes and
                conducts inspections. Filing a complaint triggers an investigation; serious
                complaints may be investigated within 24–48 hours.
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
            Knowing Rights Makes You a Better Advocate
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            The most effective family advocates combine knowledge of rights with regular
            presence. Both matter — and both start with staying informed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nursing-homes/red-flags/"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Warning Signs to Watch For →
            </Link>
            <Link
              href="/nursing-homes/abuse-and-neglect/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Abuse &amp; Neglect Guide →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
