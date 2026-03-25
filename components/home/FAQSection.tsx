"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes, completely. Our Care Assessment and all our resources are free to use. We're funded by connecting families with care providers — but only when you choose to be connected.",
  },
  {
    q: "Will I get sales calls?",
    a: "Only if you ask to be connected with providers. Taking the assessment doesn't sign you up for anything. Your information stays private unless you explicitly submit the contact form.",
  },
  {
    q: "How accurate is the assessment?",
    a: "Our assessment is based on the same Activities of Daily Living (ADL) framework that healthcare professionals use to evaluate care needs. It provides a solid starting point, but it's not a substitute for a professional evaluation.",
  },
  {
    q: "What financial assistance programs do you check for?",
    a: "We screen for VA Aid and Attendance benefits, Medicaid eligibility, long-term care insurance coverage, and other state-specific programs. Many families are surprised to learn what they qualify for.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Common Questions
        </h2>
        <div className="flex flex-col divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-slate-600 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
