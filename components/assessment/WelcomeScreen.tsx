interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="bg-white">

      {/* ── Section A: Hero — above the fold ─────────────────────────────── */}
      <div className="px-5 pt-8 pb-10 max-w-lg mx-auto w-full">

        {/* Warm visual banner */}
        <div className="w-full rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-teal-50 via-amber-50 to-rose-50 flex items-center justify-center"
             style={{ minHeight: "180px" }}>
          <div className="text-center px-6 py-8">
            <div className="text-5xl mb-3">👨‍👩‍👧</div>
            <p className="text-sm font-medium text-slate-500 leading-snug">
              Helping families find the right care
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full border border-teal-100">
            Free Care Assessment
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
          What type of care does your loved one need?
        </h1>

        {/* Subhead */}
        <p className="text-lg text-slate-500 leading-relaxed mb-8">
          Answer a few questions and we&rsquo;ll help you understand your options
          — including what it might cost in your area.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onStart}
          className="w-full bg-teal-600 text-white text-lg font-semibold py-4 rounded-xl
                     hover:bg-teal-700 active:bg-teal-800 transition-all duration-150
                     shadow-sm mb-5"
        >
          Start the Assessment →
        </button>

        {/* Trust signals */}
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
          {[
            { icon: "⏱", text: "Takes about 4 minutes" },
            { icon: "✓", text: "100% free — no login required" },
            { icon: "🔒", text: "Your information stays private" },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-1.5 text-sm text-slate-400">
              <span>{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Section B: Value proposition — below the fold ────────────────── */}
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-10">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-6">
            What you&rsquo;ll get
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "🎯",
                title: "A personalized care recommendation",
                body: "Based on your specific situation — not a generic checklist.",
              },
              {
                icon: "💰",
                title: "Real cost estimates for your area",
                body: "Local data, not national averages. Know what to budget before you call a single facility.",
              },
              {
                icon: "💡",
                title: "Financial assistance you may not know about",
                body: "Veterans benefits, Medicaid, and other programs that can make care more affordable.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 leading-snug mb-1">
                    {title}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Repeat CTA below value props for scrollers */}
          <button
            onClick={onStart}
            className="mt-8 w-full bg-teal-600 text-white text-lg font-semibold py-4 rounded-xl
                       hover:bg-teal-700 active:bg-teal-800 transition-all duration-150 shadow-sm"
          >
            Start the Assessment →
          </button>
        </div>
      </div>

      {/* ── Section C: Brief story / trust builder ────────────────────────── */}
      <div className="px-5 py-10 max-w-lg mx-auto w-full">
        <div className="border-l-4 border-teal-200 pl-4">
          <p className="text-slate-600 leading-relaxed mb-2">
            Navigating senior care shouldn&rsquo;t be this overwhelming. We built
            this tool to give families honest, clear information — so you can
            make decisions with confidence, not confusion.
          </p>
          <p className="text-sm font-semibold text-teal-700">
            — OurTurnToCare
          </p>
        </div>
      </div>

    </div>
  );
}
