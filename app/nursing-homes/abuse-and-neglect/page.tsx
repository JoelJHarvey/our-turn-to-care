import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Abuse & Neglect: Signs and How to Report | OurTurnToCare",
  description:
    "An estimated 1 in 10 nursing home residents experience abuse or neglect. Types, warning signs, and a clear 6-step process for reporting and protecting your loved one.",
  openGraph: {
    title: "Nursing Home Abuse & Neglect: Signs and How to Report",
    description:
      "Types of abuse and neglect, warning signs, and a clear 6-step reporting process for protecting your loved one in a nursing home.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/abuse-and-neglect/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/abuse-and-neglect/",
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

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl px-5 py-4 my-6">
      <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
        <p className="text-sm font-bold text-red-700 mb-2">Emergency?</p>
        <p className="text-sm text-red-600 leading-relaxed mb-3">
          If your parent is in immediate danger, call 911 first.
        </p>
        <p className="text-sm font-semibold text-slate-700 mb-1">Long-Term Care Ombudsman</p>
        <p className="text-sm text-slate-600 mb-2">Free, confidential advocacy</p>
        <p className="text-lg font-bold text-slate-800">1-800-677-1116</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "Red Flags to Watch For", href: "/nursing-homes/red-flags/" },
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "How Nursing Homes Are Regulated", href: "/nursing-homes/regulation/" },
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

export default function AbuseAndNeglectPage() {
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
            <span className="text-slate-700 font-medium">Abuse &amp; Neglect</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Abuse &amp; Neglect: What Families Need to Know
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            The warning signs, the types of abuse, and a clear step-by-step process
            for reporting and protecting your loved one.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <Warning>
                If you believe your parent is in immediate danger, call 911. For non-emergency
                concerns, the Long-Term Care Ombudsman (1-800-677-1116) is the most effective
                first call — they have the authority to enter facilities unannounced and
                investigate complaints at no cost to you.
              </Warning>

              <H2 id="scope">The Scope of the Problem</H2>
              <P>
                An estimated 1 in 10 nursing home residents experience some form of abuse
                or serious neglect in a given year. Perhaps more concerning: only about
                1 in 24 cases are ever reported. Victims are often reluctant to report
                for fear of retaliation or because cognitive impairment limits their
                ability to communicate what happened.
              </P>
              <P>
                This means family members are often the most important line of defense.
                Knowing the types of abuse, the warning signs, and the reporting process
                is essential for any family with a loved one in residential care.
              </P>

              <Divider />

              <H2 id="types">Types of Abuse and Neglect</H2>
              <div className="space-y-4 mb-6">
                {[
                  {
                    type: "Physical Abuse",
                    desc: "Intentional use of force that results in bodily injury, pain, or impairment. Includes hitting, pushing, slapping, rough handling during care, inappropriate use of restraints, or force-feeding.",
                  },
                  {
                    type: "Emotional or Psychological Abuse",
                    desc: "Actions that cause emotional pain, distress, or anguish. Includes yelling, humiliating, threatening, ignoring, isolating, and using demeaning language.",
                  },
                  {
                    type: "Sexual Abuse",
                    desc: "Any non-consensual sexual contact or exposure. Includes sexual assault, inappropriate touching, forced nudity, and sexual photography.",
                  },
                  {
                    type: "Neglect",
                    desc: "Failure to provide adequate care. Active neglect (intentional failure to provide care) and passive neglect (inadequate care due to lack of training, staffing, or resources) are both serious. Includes failing to turn bedridden residents (causing pressure ulcers), not providing adequate food and water, ignoring call lights, and failing to provide prescribed medications.",
                  },
                  {
                    type: "Financial Exploitation",
                    desc: "Misuse or theft of a resident's money or property. Includes theft of cash or valuables, unauthorized use of financial accounts, and coercing residents to sign financial documents.",
                  },
                ].map(({ type, desc }) => (
                  <div key={type} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">{type}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Divider />

              <H2 id="signs">Warning Signs</H2>
              <H3>Physical Signs</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Unexplained bruises, welts, burns, cuts, or fractures — especially in unusual locations",
                  "Pressure ulcers (bedsores) that appear or worsen quickly",
                  "Signs of dehydration or malnutrition — weight loss, dry skin, sunken eyes",
                  "Poor hygiene — unwashed body or hair, unchanged clothing or bedding",
                  "Signs of overmedication — extreme drowsiness, confusion disproportionate to medical condition",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 text-red-400 mt-0.5">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>Emotional and Behavioral Signs</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Sudden withdrawal, depression, or unusual fearfulness",
                  "Agitation or anxiety, especially around care activities or certain staff",
                  "Reluctance to speak freely — especially in the presence of certain staff",
                  "Reports of being mistreated, even vague or indirect ones",
                  "Sudden personality changes without a clear medical explanation",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 text-amber-400 mt-0.5">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
              <H3>Signs of Financial Exploitation</H3>
              <ul className="list-none space-y-1 mb-5">
                {[
                  "Missing cash, jewelry, or personal belongings",
                  "Unexplained bank withdrawals or credit card charges",
                  "Sudden changes to financial documents (wills, powers of attorney)",
                  "Unpaid bills despite adequate financial resources",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 text-amber-400 mt-0.5">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Divider />

              <H2 id="reporting">How to Report: A 6-Step Process</H2>
              <P>
                Document everything as you go — dates, times, specific observations,
                names of staff involved, and the responses you received. This record
                will matter if the situation escalates.
              </P>
              <ol className="list-none space-y-4 mb-6">
                {[
                  {
                    num: 1,
                    title: "Call 911 if there is immediate danger",
                    desc: "If your parent is in immediate physical danger or has been seriously injured, call emergency services first. Medical documentation of injuries is important evidence.",
                  },
                  {
                    num: 2,
                    title: "Report to the facility administrator in writing",
                    desc: "Put your concern in writing — email or a written note delivered in person. Keep a copy. Request a written response within 24-48 hours.",
                  },
                  {
                    num: 3,
                    title: "Contact the Long-Term Care Ombudsman (1-800-677-1116)",
                    desc: "This is often the most effective first call outside the facility. Ombudsmen can enter facilities unannounced, investigate complaints confidentially, and advocate for your parent — at no cost.",
                  },
                  {
                    num: 4,
                    title: "File a complaint with your state health department",
                    desc: "The state health department investigates complaints and conducts inspections. Serious complaints may be investigated within 24-48 hours. Search '[your state] nursing home complaint' to find the filing process.",
                  },
                  {
                    num: 5,
                    title: "Contact Adult Protective Services (APS)",
                    desc: "APS investigates abuse, neglect, and exploitation of vulnerable adults. Find your state's APS at eldercare.acl.gov or by calling 1-800-677-1116.",
                  },
                  {
                    num: 6,
                    title: "Contact law enforcement for criminal conduct",
                    desc: "Physical assault, sexual abuse, theft, and fraud are crimes. File a police report if you believe a crime has been committed. Consider consulting an elder law attorney about civil remedies.",
                  },
                ].map(({ num, title, desc }) => (
                  <li key={num} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center mt-0.5">{num}</span>
                    <div>
                      <p className="font-bold text-slate-800 mb-1">{title}</p>
                      <p className="text-[1.0625rem] leading-[1.75] text-slate-600">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Callout>
                Document everything throughout the process: dates, times, what you observed,
                what you reported, who you spoke with, and what they said. This record
                is essential if the situation escalates to regulatory action or legal
                proceedings.
              </Callout>

              <Divider />

              <H2 id="after">After Reporting</H2>
              <P>
                After filing a complaint, you should receive acknowledgment and a timeline
                for investigation. If your parent remains in a facility where you believe
                they are being abused or neglected and the situation is not being addressed,
                you have the right to seek an emergency transfer to another facility.
                The Ombudsman can help with this process.
              </P>
              <P>
                If you believe your parent has suffered harm due to abuse or neglect, an
                elder law attorney can advise you about potential legal remedies, including
                civil claims against the facility.
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
            Prevention Starts with Knowing What to Look For
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Regular visits, engaged advocacy, and knowing the warning signs are the most
            powerful tools families have for preventing abuse and neglect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nursing-homes/red-flags/"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              See the Red Flags Guide →
            </Link>
            <Link
              href="/nursing-homes/resident-rights/"
              className="inline-flex items-center justify-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-800 border border-white/30 transition-colors"
            >
              Know Your Parent&rsquo;s Rights →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
