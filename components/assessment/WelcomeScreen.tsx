interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-16 pb-12">
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">

        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full border border-teal-100">
            Free Care Assessment
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
          What type of care does your loved one need?
        </h1>

        {/* Subhead */}
        <p className="text-lg text-slate-500 leading-relaxed mb-10">
          Answer a few questions and we&rsquo;ll help you understand your options
          — including what it might cost in your area.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onStart}
          className="w-full bg-teal-600 text-white text-lg font-semibold py-4 rounded-xl
                     hover:bg-teal-700 active:bg-teal-800 transition-all duration-150
                     shadow-sm mb-6"
        >
          Start the Assessment
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
    </div>
  );
}
