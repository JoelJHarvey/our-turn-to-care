"use client";


interface TransitionScreenProps {
  // The main message — supports the same {person}, {pronoun}, {possessive} placeholders
  message: string;
  subtext: string;
  personLabel: string;
  pronoun: string;
  possessive: string;
  personPossessive: string;
  onContinue: () => void;
  onBack: () => void;
}

export default function TransitionScreen({
  message,
  subtext,
  personLabel,
  pronoun,
  possessive,
  personPossessive,
  onContinue,
  onBack,
}: TransitionScreenProps) {
  const sub = (text: string) =>
    text
      .replace(/\{person's\}/g, personPossessive)
      .replace(/\{person\}/g, personLabel)
      .replace(/\{pronoun\}/g, pronoun)
      .replace(/\{possessive\}/g, possessive);

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pb-12">
      {/* Centered content — takes up the full vertical space */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full text-center">
        {/* Section badge */}
        <div className="mb-6">
          <span className="inline-block bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-full border border-amber-100">
            Financial Assistance
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-4">
          {sub(message)}
        </h2>

        <p className="text-base text-slate-500 leading-relaxed max-w-sm">
          {sub(subtext)}
        </p>
      </div>

      {/* Navigation pinned to the bottom */}
      <div className="max-w-lg mx-auto w-full flex flex-col gap-3">
        <button
          onClick={onContinue}
          className="w-full bg-teal-600 text-white py-4 rounded-xl text-base font-semibold
                     hover:bg-teal-700 active:bg-teal-800 transition-all duration-150 shadow-sm"
        >
          Continue
        </button>

        <div className="flex items-center">
          <button
            onClick={onBack}
            className="text-slate-500 text-sm font-medium py-3 px-1 hover:text-slate-700 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
