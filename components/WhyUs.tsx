import { ShieldCheck, Clock, ThumbsUp } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Reason 1",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad.",
  },
  {
    icon: Clock,
    title: "Reason 2",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua exercitation.",
  },
  {
    icon: ThumbsUp,
    title: "Reason 3",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam.",
  },
];

export default function WhyUs() {
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

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REASONS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="group relative bg-black/30 backdrop-blur-sm rounded-md p-7 md:p-8 ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/45 hover:ring-[#D4B679]/40 hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_40px_rgba(232,212,163,0.15)]"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-[#D4B679]/12 text-[#E8D4A3] ring-1 ring-[#E8D4A3]/20 transition-colors duration-300 group-hover:bg-[#D4B679]/20">
                <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold uppercase text-white text-xl mb-3 leading-tight tracking-wide">
                {title}
              </h3>
              <p className="text-white/60 leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
