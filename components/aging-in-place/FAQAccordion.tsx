"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-slate-800 leading-snug">
                {item.q}
              </span>
              <span
                className={[
                  "flex-shrink-0 w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 mt-0.5 transition-transform duration-200",
                  isOpen ? "rotate-45 border-teal-500 text-teal-500" : "",
                ].join(" ")}
                aria-hidden="true"
              >
                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                  <path
                    d="M5 2v6M2 5h6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 bg-slate-50">
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
