"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "FAQ 1",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "FAQ 2",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
  },
  {
    q: "FAQ 3",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit duis aute irure dolor in reprehenderit in voluptate velit esse.",
  },
  {
    q: "FAQ 4",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit excepteur sint occaecat cupidatat non proident sunt in culpa.",
  },
  {
    q: "FAQ 5",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit qui officia deserunt mollit anim id est laborum sed ut.",
  },
  {
    q: "FAQ 6",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit perspiciatis unde omnis iste natus error sit voluptatem.",
  },
  {
    q: "FAQ 7",
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit accusantium doloremque laudantium totam rem aperiam eaque.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-gradient-to-b from-[#15151A] to-[#080A0D] border-t border-[#E8D4A3]/15 py-20 md:py-24 lg:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_70%,rgba(232,212,163,0.10),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
            <p className="font-body text-[11px] uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
              Questions answered
            </p>
          </div>
          <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-5 leading-[0.95]">
            Lorem ipsum dolor sit
          </h2>
          <p className="text-lg text-white/65 leading-relaxed max-w-prose">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <li key={item.q}>
                <div
                  className={`rounded-md backdrop-blur-sm transition-all duration-300 ease-out ${
                    isOpen
                      ? "bg-white/[0.06] ring-1 ring-[#D4B679]/45 shadow-[0_8px_28px_rgba(232,212,163,0.15)]"
                      : "bg-white/[0.03] ring-1 ring-white/10 hover:ring-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="font-display font-semibold uppercase text-white text-base md:text-lg leading-snug tracking-wide">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#E8D4A3]" : "text-white/50"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 md:px-6 md:pb-6 text-white/65 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
