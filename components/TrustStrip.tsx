import { ShieldCheck, BadgeCheck, MapPin, Hammer, FileText } from "lucide-react";

const SIGNALS = [
  { icon: ShieldCheck, label: "Fully Licensed" },
  { icon: BadgeCheck, label: "Insured & Bonded" },
  { icon: MapPin, label: "Locally Owned" },
  { icon: Hammer, label: "20+ Years" },
  { icon: FileText, label: "Free Quotes" },
];

export default function TrustStrip() {
  return (
    <section className="relative bg-[color:var(--color-brand-dark)] border-t border-[#E8D4A3]/20 border-b border-white/5">
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 py-8 md:py-9">
          {SIGNALS.map(({ icon: Icon, label }, idx) => (
            <li
              key={label}
              className={`flex items-center justify-center gap-3 text-center md:text-left ${
                idx < SIGNALS.length - 1
                  ? "lg:border-r lg:border-r-[#E8D4A3]/25"
                  : ""
              }`}
            >
              <Icon
                className="h-5 w-5 text-[#E8D4A3] flex-shrink-0"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="font-body text-[11px] md:text-xs font-semibold text-white/80 tracking-[0.18em] uppercase">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
