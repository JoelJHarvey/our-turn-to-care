'use client';

import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
}

export function TexasFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-base font-semibold text-slate-900">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 text-slate-500 text-sm transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
            {isOpen && (
              <div className="px-5 py-4 bg-white border-t border-slate-100">
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
