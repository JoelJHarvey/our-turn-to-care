import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nursing Home Red Flags: Warning Signs of Poor Care | OurTurnToCare",
  description:
    "What to watch for when choosing or monitoring a nursing home — environmental, staffing, care quality, and behavioral red flags, and exactly what to do if you see them.",
  openGraph: {
    title: "Nursing Home Red Flags: Warning Signs of Poor Care",
    description:
      "Environmental, staffing, care quality, and behavioral red flags to watch for — and what to do if you see them.",
    type: "article",
    url: "https://ourturntocare.org/nursing-homes/red-flags/",
  },
  alternates: {
    canonical: "https://ourturntocare.org/nursing-homes/red-flags/",
  },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-slate-800 mb-5 leading-snug scroll-mt-24">
      {children}
    </h2>
  );
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

function RedFlagBox({ title, flags }: { title: string; flags: string[] }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
      <p className="text-sm font-bold text-slate-700 mb-3">{title}</p>
      <ul className="space-y-1.5">
        {flags.map((flag) => (
          <li key={flag} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
            <span className="flex-shrink-0 text-red-400 mt-0.5">⚠</span>
            {flag}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">Need to take action?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          If you&apos;re seeing serious concerns, contact your state&apos;s Long-Term Care Ombudsman at 1-800-677-1116 — free advocacy for nursing home residents.
        </p>
        <Link
          href="/nursing-homes/abuse-and-neglect/"
          className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Abuse &amp; Neglect Guide →
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Related guides</p>
        <ul className="space-y-2">
          {[
            { label: "Resident Rights", href: "/nursing-homes/resident-rights/" },
            { label: "How to Evaluate Quality", href: "/nursing-homes/how-to-evaluate/" },
            { label: "Nursing Home Staffing", href: "/nursing-homes/staffing/" },
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

export default function RedFlagsPage() {
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
            <span className="text-slate-700 font-medium">Red Flags</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[820px]">
            Nursing Home Red Flags: Warning Signs of Poor Care
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[660px]">
            What to watch for when choosing or monitoring a nursing home — and exactly
            what to do if you see warning signs.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">
            <article className="lg:flex-1 min-w-0">
              <div className="lg:hidden mb-10"><SidebarCTA /></div>

              <P>
                Whether you&rsquo;re choosing a facility for the first time or monitoring your
                parent&rsquo;s care after placement, knowing what poor care looks like — and
                catching it early — can make an enormous difference. Many signs of
                inadequate care are visible to an attentive family member.
              </P>

              <Callout>
                Your most informative visits will be unannounced — stop by during a meal,
                in the evening, or on a weekend. This is when a facility&rsquo;s true culture is
                visible, and when understaffing or poor practices are most apparent.
              </Callout>

              <Divider />

              <H2 id="environmental">Environmental Red Flags</H2>
              <div className="grid sm:grid-cols-1 gap-4 mb-6">
                <RedFlagBox
                  title="What to Look For"
                  flags={[
                    "A persistent strong odor of urine or feces — especially in hallways or common areas — indicates that residents are not being assisted with toileting promptly",
                    "Dirty or unkempt common areas — floors, furniture, bathrooms that are visibly unclean",
                    "Residents sitting in soiled clothing or bedding",
                    "Broken, missing, or poorly maintained equipment (call light systems, wheelchairs, lifts)",
                    "Call lights going unanswered for long periods — you can observe this during any visit",
                    "A general feeling of neglect, disorder, or institutional bleakness in the environment",
                  ]}
                />
              </div>

              <Divider />

              <H2 id="staffing">Staffing Red Flags</H2>
              <div className="grid sm:grid-cols-1 gap-4 mb-6">
                <RedFlagBox
                  title="What to Look For"
                  flags={[
                    "Staff who appear rushed, stressed, or unable to pause for a human interaction",
                    "Condescending or dismissive tone toward residents — talking about them rather than to them, or using infantilizing language",
                    "High use of agency (temporary) staff — unfamiliar faces who don't know residents by name",
                    "Evasiveness when you ask about nurse-to-resident ratios, staffing levels, or turnover",
                    "Difficulty getting anyone's attention or a consistent point of contact for care questions",
                    "Staff who seem unfamiliar with your parent's history, preferences, or condition",
                  ]}
                />
              </div>

              <Divider />

              <H2 id="care-quality">Care Quality Red Flags</H2>
              <P>
                These are the most serious red flags — physical signs that care is
                inadequate. Some require medical assessment, but all require immediate
                action.
              </P>
              <div className="grid sm:grid-cols-1 gap-4 mb-6">
                <RedFlagBox
                  title="Physical and Clinical Warning Signs"
                  flags={[
                    "Unexplained weight loss — more than 5% of body weight over one month",
                    "Signs of dehydration — dry mouth, sunken eyes, dark urine, confusion",
                    "New or worsening pressure ulcers (bedsores), especially in a resident who was previously free of them",
                    "Frequent falls or unexplained injuries — bruises, fractures, abrasions",
                    "Medication errors — wrong medication, wrong dose, missed medications",
                    "Decline in hygiene — unwashed hair, unclean skin, unkempt appearance",
                    "Apparent over-sedation or unusual drowsiness",
                    "Preventable infections occurring repeatedly — UTIs, respiratory infections",
                    "Significant functional decline without a clear medical explanation",
                  ]}
                />
              </div>

              <Divider />

              <H2 id="behavioral">Behavioral Red Flags from Your Parent</H2>
              <P>
                Your parent&rsquo;s behavior and emotional state can be among the most
                important indicators of their experience. Pay attention to changes.
              </P>
              <div className="grid sm:grid-cols-1 gap-4 mb-6">
                <RedFlagBox
                  title="What to Watch For"
                  flags={[
                    "Fear of or reluctance to be around certain staff members",
                    "Reluctance to speak freely in the facility — especially if they seem more open when you take them to a private space",
                    "Sudden, unexplained changes in behavior, mood, or personality",
                    "Reports of being treated roughly, called names, or ignored when they ask for help",
                    "Anxiety or distress around personal care times",
                    "Withdrawal from activities and social interaction that were previously enjoyed",
                  ]}
                />
              </div>

              <Divider />

              <H2 id="what-to-do">What to Do When You See Red Flags</H2>
              <P>
                Don&rsquo;t ignore warning signs and hope they improve. Act — and document
                everything. Keep a log with dates, times, and specific observations.
              </P>
              <ol className="list-none space-y-3 mb-6">
                {[
                  {
                    step: "Raise concerns with the nurse on duty — start with the immediate care issue. Be specific and factual.",
                    note: null,
                  },
                  {
                    step: "If not resolved within 24-48 hours, escalate to the Director of Nursing (DON) in writing.",
                    note: null,
                  },
                  {
                    step: "If the DON is unresponsive or the situation is serious, contact the facility Administrator.",
                    note: null,
                  },
                  {
                    step: "Contact the Long-Term Care Ombudsman — 1-800-677-1116. This is a free, confidential advocacy service. Ombudsmen investigate complaints, mediate disputes, and have authority to enter facilities unannounced.",
                    note: null,
                  },
                  {
                    step: "File a formal complaint with your state health department. Search '[your state] nursing home complaint' to find the right agency. Serious complaints trigger inspections.",
                    note: null,
                  },
                  {
                    step: "For suspected abuse, neglect, or financial exploitation, contact Adult Protective Services and potentially local law enforcement.",
                    note: null,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    <span>{item.step}</span>
                  </li>
                ))}
              </ol>
              <Callout>
                Document everything in writing. When raising concerns, follow up verbal
                conversations with an email or written note summarizing what was discussed
                and what was agreed. This creates a record that matters if the situation
                escalates.
              </Callout>
              <P>
                If you&rsquo;re concerned about abuse or neglect specifically, see our{" "}
                <Link href="/nursing-homes/abuse-and-neglect/" className="text-teal-700 underline hover:text-teal-900">
                  complete guide to nursing home abuse and neglect
                </Link>{" "}
                for more detail on types, signs, and reporting steps.
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
            Your Advocacy Makes a Difference
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Residents with engaged, present family members receive measurably better care.
            Your attention, your questions, and your willingness to raise concerns protect
            your parent in ways no regulation can.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nursing-homes/resident-rights/"
              className="inline-flex items-center justify-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Know Your Parent&rsquo;s Rights →
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
