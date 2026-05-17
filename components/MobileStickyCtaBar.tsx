"use client";

import { Phone, CalendarCheck } from "lucide-react";
import SmoothLink from "@/components/ui/SmoothLink";

export default function MobileStickyCtaBar() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 md:hidden px-4 pointer-events-none"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
      role="region"
      aria-label="Quick contact"
    >
      <div className="flex gap-3 max-w-md mx-auto">
        <a
          href="tel:+15551234567"
          className="flex-1 pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-5 backdrop-blur-xl bg-white/15 ring-1 ring-white/25 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] text-base font-semibold uppercase tracking-wide active:opacity-90 transition-opacity"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
        <SmoothLink
          href="#quote"
          className="flex-1 pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-5 bg-[#D4B679] text-slate-900 shadow-[0_0_32px_rgba(232,212,163,0.55)] ring-1 ring-[#E8D4A3]/40 text-base font-bold uppercase tracking-wide active:opacity-90 transition-opacity"
          aria-label="Jump to quote request form"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Get Quote
        </SmoothLink>
      </div>
    </div>
  );
}
