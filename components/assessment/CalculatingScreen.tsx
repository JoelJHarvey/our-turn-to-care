"use client";

import { useEffect, useCallback } from "react";
import ProgressBar from "./ProgressBar";

interface CalculatingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function CalculatingScreen({
  onComplete,
  onBack,
}: CalculatingScreenProps) {
  const stableOnComplete = useCallback(onComplete, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance after 2 seconds — builds anticipation without feeling slow
  useEffect(() => {
    const timer = setTimeout(stableOnComplete, 2000);
    return () => clearTimeout(timer);
  }, [stableOnComplete]);

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-6 pb-8 max-w-lg mx-auto w-full">
      {/* Progress — always 100% on this screen */}
      <div className="mb-8">
        <ProgressBar progress={100} />
      </div>

      {/* Centered loading state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Three bouncing dots with staggered delays */}
        <div className="flex items-center gap-3" aria-label="Calculating results" role="status">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold text-slate-700 mb-2">
            Analyzing your answers…
          </p>
          <p className="text-base text-slate-400">
            Matching care options for your situation
          </p>
        </div>
      </div>

      {/* Back navigation — lets users correct an answer on Screen 12 */}
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="text-slate-500 text-sm font-medium py-3 px-1 hover:text-slate-700 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
