import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ContactForm from "@/components/ContactForm";
import { IMAGES } from "@/lib/images";
import { ShieldCheck, Hammer, Award } from "lucide-react";

const TRUST_PILLS = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Hammer, label: "20+ Years" },
  { icon: Award, label: "5-Star Rated" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[color:var(--color-brand)] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 lg:min-h-[calc(100vh-4rem)] lg:pt-28 lg:pb-16"
    >
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgba(10,10,12,0.55)_0%,rgba(5,6,7,0.96)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[color:var(--color-brand-dark)]/95 via-[color:var(--color-brand-dark)]/70 to-[color:var(--color-brand-dark)]/30"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
      />

      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
              <p className="font-body text-[11px] md:text-xs uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
                Premium Landscape Studio
              </p>
            </div>
            <h1
              className="font-display font-semibold uppercase text-white text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl leading-[0.95] tracking-wide text-balance mb-5"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
            >
              Lorem ipsum{" "}
              <span className="font-bold text-[#E8D4A3]" style={{ textShadow: "0 0 32px rgba(232,212,163,0.55), 0 2px 16px rgba(0,0,0,0.85)" }}>
                dolor
              </span>{" "}
              sit amet
            </h1>
            <p
              className="text-base md:text-lg text-white/70 max-w-md leading-relaxed mb-7"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>

            <ul className="flex flex-wrap gap-2 md:gap-3">
              {TRUST_PILLS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 backdrop-blur-sm px-3 py-1.5 text-xs text-white/80 uppercase tracking-wider font-medium"
                >
                  <Icon className="h-3.5 w-3.5 text-[#E8D4A3]" strokeWidth={2} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:max-w-md xl:max-w-lg lg:justify-self-end">
            <div className="backdrop-blur-xl bg-black/55 ring-1 ring-white/15 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-6 md:p-7">
              <div id="quote">
                <p className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-[#E8D4A3] mb-2">
                  Request a Quote
                </p>
                <h2 className="font-display font-semibold uppercase text-white text-xl md:text-2xl mb-1 leading-tight tracking-wide">
                  Start your project
                </h2>
                <p className="text-white/55 text-xs mb-5">
                  Tell us about your space. We respond within one business day.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
