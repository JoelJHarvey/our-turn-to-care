"use client";

import ProgressBar from "./ProgressBar";

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
  progress?: number;
  progressLabel?: string;
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
  progress,
  progressLabel,
}: TransitionScreenProps) {
  const sub = (text: string) =>
    text
      .replace(/\{person's\}/g, personPossessive)
      .replace(/\{person\}/g, personLabel)
      .replace(/\{pronoun\}/g, pronoun)
      .replace(/\{possessive\}/g, possessive);

  return (
    <div className="bg-white px-5 py-8 max-w-lg mx-auto w-full">
      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mb-10">
          <ProgressBar progress={progress} label={progressLabel} />
        </div>
      )}

      {/* Centered content */}
      <div className="flex flex-col items-center text-center mb-12">
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

      {/* Navigation */}
      <div className="flex flex-col gap-3">
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
            className="text-gray-600 text-base font-medium py-3 px-3 min-h-[44px] hover:text-slate-800 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
