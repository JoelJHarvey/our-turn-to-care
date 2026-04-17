"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";

interface NameScreenProps {
  question: string;
  subtext?: string;
  progress: number;
  progressLabel?: string;
  personLabel: string;
  pronoun: string;
  possessive: string;
  personPossessive: string;
  onNext: (values: string[]) => void;
  onBack: () => void;
  // Restores a previously typed name if the user navigates back
  initialValue?: string;
}

export default function NameScreen({
  question,
  subtext,
  progress,
  progressLabel,
  personLabel,
  pronoun,
  possessive,
  personPossessive,
  onNext,
  onBack,
  initialValue = "",
}: NameScreenProps) {
  const [name, setName] = useState(initialValue);

  const sub = (text: string) =>
    text
      .replace(/\{person's\}/g, personPossessive)
      .replace(/\{person\}/g, personLabel)
      .replace(/\{pronoun\}/g, pronoun)
      .replace(/\{possessive\}/g, possessive);

  const canProceed = name.trim().length > 0;

  return (
    <div className="bg-white px-5 pt-6 pb-8 max-w-lg mx-auto w-full">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar progress={progress} label={progressLabel} />
      </div>

      {/* Question text */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-3">
          {sub(question)}
        </h2>

        {subtext && (
          <p className="text-base text-slate-500 leading-relaxed mb-10">
            {sub(subtext)}
          </p>
        )}
        {!subtext && <div className="mb-10" />}

        {/* Name input — underline style, matching the zip code field */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px]">
            <input
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // Allow Enter key to submit if a name is typed
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed) onNext([name.trim()]);
              }}
              aria-label="First name"
              className={[
                "w-full bg-transparent text-center text-2xl font-semibold",
                "border-0 border-b-2 py-3 outline-none",
                "placeholder:text-slate-300 text-slate-800",
                "transition-colors duration-150",
                "border-slate-300 focus:border-teal-500",
              ].join(" ")}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col gap-3">
        {/* Primary CTA — slightly taller and larger text than regular Next buttons
            to signal this is the final step */}
        <button
          onClick={() => {
            if (canProceed) onNext([name.trim()]);
          }}
          disabled={!canProceed}
          className={[
            "w-full py-5 rounded-xl text-lg font-semibold transition-all duration-150",
            canProceed
              ? "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-md"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          See My Results →
        </button>

        {/* Skip — displayed as a secondary outlined button since skipping is common and valid */}
        <button
          onClick={() => onNext(["skip"])}
          className="w-full py-4 rounded-xl text-base font-semibold border-2 border-slate-200
                     text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
        >
          Skip — See My Results
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
