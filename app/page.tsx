import Link from "next/link";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────────
          Section 1: Hero
      ───────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 py-24 sm:py-32 text-center"
        style={{
          background: "linear-gradient(to bottom, #f0fdfa, #ffffff)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-5">
            When It&apos;s Your Turn to Care for Them
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[640px] mx-auto mb-8">
            Navigating care for an aging parent is overwhelming. We help you
            understand your options, find the right level of care, and uncover
            financial assistance you didn&apos;t know existed.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-teal-600 text-white text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-md"
          >
            Take the Free Care Assessment →
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            4 minutes &nbsp;·&nbsp; No login required &nbsp;·&nbsp; Personalized results
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Section 2: How It Works
      ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Answer a Few Questions",
                desc: "Tell us about your loved one's daily needs, living situation, and health coverage. It takes about 4 minutes.",
              },
              {
                num: "2",
                title: "Get a Personalized Plan",
                desc: "We'll recommend the right type of care, show you costs in your area, and identify financial assistance programs they may qualify for.",
              },
              {
                num: "3",
                title: "Explore Your Options",
                desc: "Connect with care providers, check benefits eligibility, and take the next step with confidence — not pressure.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 border-t-4 border-t-teal-500 px-6 py-8"
              >
                <span className="inline-block text-3xl font-extrabold text-teal-600 mb-3">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Section 3: Why Families Trust Us
      ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Why Families Trust Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="flex flex-col gap-5">
              <p className="text-slate-600 leading-relaxed">
                Most senior care websites make money by selling your information
                to the highest bidder. Every recommendation they make is
                influenced by who pays them the most. We think families deserve
                better than that.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our Care Assessment gives you an honest recommendation based on
                your loved one&apos;s actual needs — not on which facility is paying
                the highest referral fee. We show you real costs, identify
                financial assistance you may qualify for, and connect you with
                providers who match your specific situation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We built this because we&apos;ve been where you are. Searching for
                answers at midnight, overwhelmed by options, unsure if you&apos;re
                making the right choice. You deserve a resource that puts your
                family first.
              </p>
            </div>

            {/* Image placeholder */}
            <div className="rounded-2xl bg-slate-200 h-64 md:h-80 flex items-center justify-center text-slate-400 text-sm font-medium">
              Image placeholder
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Section 4: Statistics
      ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-50">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                stat: "70%",
                desc: "of families don't know about VA benefits that could cover care costs",
              },
              {
                stat: "$6,500/mo",
                desc: "Average cost of memory care in the U.S.",
              },
              {
                stat: "48 hours",
                desc: "Average time families spend researching care options",
              },
            ].map((item) => (
              <div key={item.stat} className="flex flex-col items-center gap-3">
                <span className="text-4xl md:text-5xl font-extrabold text-teal-600">
                  {item.stat}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Section 5: CTA Banner
      ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Our free Care Assessment gives you a personalized recommendation in
            about 4 minutes. No login, no pressure, no sales calls unless you
            want them.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Start the Assessment →
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          Section 6: FAQ
      ───────────────────────────────────────────── */}
      <FAQSection />
    </>
  );
}
