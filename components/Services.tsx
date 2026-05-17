"use client";

import { useState } from "react";
import {
  Hammer,
  Trees,
  Layers,
  Sparkles,
  Mountain,
  Snowflake,
  Droplets,
  Sun,
  ChevronDown,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { IMAGES } from "@/lib/images";

const SERVICES = [
  { icon: Hammer, title: "Service 1", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do." },
  { icon: Trees, title: "Service 2", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit eiusmod." },
  { icon: Layers, title: "Service 3", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit incididunt." },
  { icon: Mountain, title: "Service 4", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit ut labore." },
  { icon: Droplets, title: "Service 5", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit et dolore." },
  { icon: Snowflake, title: "Service 6", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit magna." },
  { icon: Sun, title: "Service 7", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit aliqua." },
  { icon: Sparkles, title: "Service 8", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit veniam." },
];

export default function Services() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? SERVICES : SERVICES.slice(0, 3);

  return (
    <section id="services" className="relative bg-gradient-to-b from-[#15151A] to-[#0A0A0C] py-20 md:py-24 lg:py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <ImageWithFallback
          src={IMAGES.about.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.35] blur-[2px]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(5,6,7,0.60)_0%,rgba(10,10,12,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_25%,rgba(232,212,163,0.12),transparent_60%),radial-gradient(circle_at_85%_75%,rgba(232,212,163,0.07),transparent_65%)]"
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
              What we do
            </p>
          </div>
          <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-5 leading-[0.95]">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-lg text-white/65 leading-relaxed max-w-prose">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {visible.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="group relative bg-white/[0.03] backdrop-blur-sm rounded-md p-7 md:p-8 ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-[#D4B679]/40 hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_40px_rgba(232,212,163,0.15)]"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#D4B679]/12 text-[#E8D4A3] ring-1 ring-[#E8D4A3]/20 transition-colors duration-300 group-hover:bg-[#D4B679]/20">
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold uppercase text-white text-lg mb-3 leading-tight tracking-wide">
                {title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>

        {!expanded && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 font-body font-semibold text-sm uppercase tracking-wider text-[#E8D4A3] hover:text-[#F0E0B8] transition-colors"
            >
              See All Services
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
