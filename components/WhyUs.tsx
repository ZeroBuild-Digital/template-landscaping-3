"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { WHY_US } from "@/lib/images";

const REASONS = [
  {
    number: "01",
    title: "Reason 1",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam quis nostrud.",
    image: WHY_US[0],
  },
  {
    number: "02",
    title: "Reason 2",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua nostrud exercitation.",
    image: WHY_US[1],
  },
  {
    number: "03",
    title: "Reason 3",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua excepteur sunt.",
    image: WHY_US[2],
  },
  {
    number: "04",
    title: "Reason 4",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua officia deserunt.",
    image: WHY_US[3],
  },
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = REASONS[activeIndex];

  return (
    <section className="relative bg-gradient-to-b from-[#1F1F25] to-[#0F0F14] border-t border-[#E8D4A3]/15 py-20 md:py-24 lg:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_30%,rgba(232,212,163,0.12),transparent_60%)]"
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
              Why us
            </p>
          </div>
          <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-5 leading-[0.95]">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-lg text-white/65 leading-relaxed max-w-prose">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-stretch lg:min-h-[560px]">
          {/* Left: vertical tab list with inline expanding body */}
          <ul role="tablist" aria-orientation="vertical" className="relative">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-px bg-white/8"
            />
            {REASONS.map((reason, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={reason.number} className="relative border-b border-white/8 last:border-b-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="why-us-panel"
                    onClick={() => setActiveIndex(i)}
                    className="group relative w-full text-left pt-6 md:pt-7 pb-5 md:pb-6 pl-6 md:pl-8 pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D4A3]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#15151A]"
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute left-0 top-8 w-[2px] bg-[#E8D4A3] transition-all duration-500 ease-out",
                        isActive
                          ? "opacity-100 shadow-[0_0_16px_rgba(232,212,163,0.7)]"
                          : "h-0 opacity-0",
                      ].join(" ")}
                      style={isActive ? { height: "calc(100% - 2.5rem)" } : undefined}
                    />
                    <div className="flex items-baseline gap-5 md:gap-6">
                      <span
                        className={[
                          "font-body text-xs tracking-[0.3em] font-semibold transition-colors duration-300",
                          isActive ? "text-[#E8D4A3]" : "text-white/30 group-hover:text-white/50",
                        ].join(" ")}
                      >
                        {reason.number}
                      </span>
                      <h3
                        className={[
                          "font-display font-semibold uppercase tracking-wide leading-tight transition-colors duration-300",
                          "text-2xl md:text-3xl",
                          isActive
                            ? "text-white"
                            : "text-white/35 group-hover:text-white/65",
                        ].join(" ")}
                      >
                        {reason.title}
                      </h3>
                    </div>
                  </button>

                  {/* Inline expanding body — only the active item shows it */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[calc(1.5rem+1.5rem)] md:pl-[calc(2rem+1.75rem)] pr-2 pb-6 md:pb-7 -mt-1">
                          <p className="text-white/70 leading-relaxed text-[15px] max-w-prose">
                            {reason.body}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Right: clean full-bleed image, no overlay */}
          <div
            id="why-us-panel"
            role="tabpanel"
            aria-live="polite"
            className="relative h-full aspect-[4/5] lg:aspect-auto lg:min-h-0 overflow-hidden rounded-md ring-1 ring-white/10 shadow-[0_28px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.005 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={active.image.src}
                  alt={active.image.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
                {/* Subtle vignette only — no text overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(0,0,0,0.35)_100%)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
