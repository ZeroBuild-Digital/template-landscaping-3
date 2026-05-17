import SmoothLink from "@/components/ui/SmoothLink";

const SERVICES = [
  "Service 1 Placeholder",
  "Service 2 Placeholder",
  "Service 3 Placeholder",
  "Service 4 Placeholder",
  "Service 5 Placeholder",
  "Service 6 Placeholder",
  "Service 7 Placeholder",
  "Service 8 Placeholder",
];

const TOWNS = [
  "Sample Town",
  "Sample Town North",
  "Sample Town East",
  "Sample Town West",
  "Sample Town South",
];

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#quote", label: "Quote" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#020203] to-[#000000] border-t border-t-[#E8D4A3]/30 overflow-hidden">
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
          <div className="lg:col-span-1">
            <p className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-4">
              [Template 4]
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SmoothLink
                    href={link.href}
                    className="text-white/60 hover:text-[#E8D4A3] text-sm transition-colors"
                  >
                    {link.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-[#E8D4A3] mb-5">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm leading-relaxed">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-[#E8D4A3] mb-5">
              Service Area
            </p>
            <ul className="space-y-2.5">
              {TOWNS.map((town) => (
                <li key={town}>
                  <span className="text-white/60 text-sm leading-relaxed">
                    {town}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-[#E8D4A3] mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+15551234567"
                  className="font-display font-bold uppercase text-white hover:text-[#E8D4A3] text-lg tracking-tight transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="text-white/60 hover:text-[#E8D4A3] text-sm transition-colors"
                >
                  hello@example.com
                </a>
              </li>
              <li>
                <p className="text-white/55 text-sm leading-relaxed">
                  Lorem ipsum street
                  <br />
                  Sample Town, ST 00000
                </p>
              </li>
              <li>
                <p className="text-white/55 text-sm leading-relaxed">
                  Mon&ndash;Fri 8a&ndash;6p
                  <br />
                  Sat 9a&ndash;2p
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/45 text-xs">
            &copy; {year} [Template 4]. All rights reserved.
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-[0.25em]">
            Lorem ipsum dolor
          </p>
        </div>
      </div>
    </footer>
  );
}
