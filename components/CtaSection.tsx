import { Check, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SmoothLink from "@/components/ui/SmoothLink";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { IMAGES } from "@/lib/images";

const BENEFITS = [
  "Lorem ipsum dolor sit amet consectetur",
  "Adipiscing elit sed do eiusmod tempor",
  "Incididunt ut labore et dolore magna",
  "Aliqua ut enim ad minim veniam quis",
];

export default function CtaSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0C] to-[#020203] border-t border-[#E8D4A3]/15 py-20 md:py-24 lg:py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <ImageWithFallback
          src={IMAGES.hero.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.26] blur-[3px]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(10,10,12,0.70)_0%,rgba(5,6,7,0.84)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_30%,rgba(232,212,163,0.11),transparent_60%),radial-gradient(ellipse_at_30%_50%,rgba(26,26,31,0.35)_0%,rgba(5,6,7,0.78)_100%)]"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
              <p className="font-body text-[11px] uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
                Ready when you are
              </p>
            </div>
            <h2
              className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-6 leading-[0.95]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
            >
              Start your{" "}
              <span className="text-[#E8D4A3]" style={{ textShadow: "0 0 32px rgba(232,212,163,0.5)" }}>
                project
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-9 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore.
            </p>

            <ul className="space-y-3 mb-10">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-white/80">
                  <Check
                    className="h-5 w-5 flex-shrink-0 text-[#E8D4A3] mt-1"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-emerald-700 text-white p-5 rounded-md flex items-center gap-4 mb-7 ring-1 ring-emerald-600/40">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 flex-shrink-0">
                <Phone className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.24em] font-semibold text-emerald-100 mb-1">
                  Call now
                </p>
                <a
                  href="tel:+15551234567"
                  className="font-display font-bold uppercase text-2xl md:text-3xl text-white hover:text-emerald-100 transition-colors leading-tight tracking-tight"
                >
                  (555) 123-4567
                </a>
              </div>
            </div>

            <SmoothLink
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D4B679] text-slate-900 font-bold uppercase tracking-wider text-base md:text-lg px-8 py-4 shadow-[0_0_40px_rgba(232,212,163,0.4)] hover:bg-[#E8D4A3] hover:shadow-[0_0_60px_rgba(232,212,163,0.6)] transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              Get a Free Quote
            </SmoothLink>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="backdrop-blur-xl bg-black/55 ring-1 ring-white/15 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-6 md:p-7">
              <div id="cta-form">
                <p className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-[#E8D4A3] mb-2">
                  Request a Quote
                </p>
                <h3 className="font-display font-semibold uppercase text-white text-xl md:text-2xl mb-1 leading-tight tracking-wide">
                  Tell us about it
                </h3>
                <p className="text-white/55 text-xs mb-5">
                  Lorem ipsum dolor sit amet consectetur adipiscing.
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
