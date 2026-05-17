import { Star } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { IMAGES } from "@/lib/images";

const REVIEWS = [
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Sample Reviewer 1",
    town: "Sample Town",
    service: "Sample Service",
    date: "Sample Date",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna nostrud.",
    name: "Sample Reviewer 2",
    town: "Sample Town",
    service: "Sample Service",
    date: "Sample Date",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore exercitation.",
    name: "Sample Reviewer 3",
    town: "Sample Town",
    service: "Sample Service",
    date: "Sample Date",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-gradient-to-b from-[color:var(--color-brand)] to-[color:var(--color-brand-secondary)] border-t border-[#E8D4A3]/15 py-20 md:py-24 lg:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden ring-1 ring-white/10 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)]">
              <ImageWithFallback
                src={IMAGES.reviews.src}
                alt={IMAGES.reviews.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              />
            </div>
          </div>

          <div>
            <div className="mb-10">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
                <p className="font-body text-[11px] uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
                  Client Word
                </p>
              </div>
              <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-5 leading-[0.95]">
                What our clients say
              </h2>
              <p className="text-lg text-white/65 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>

            <ul className="space-y-5">
              {REVIEWS.map((r) => (
                <li
                  key={r.name}
                  className="bg-white/[0.03] backdrop-blur-sm rounded-md p-6 md:p-7 ring-1 ring-white/10"
                >
                  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-white/85 leading-relaxed italic mb-4">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <p className="font-body font-semibold text-white text-xs uppercase tracking-wider">
                    {r.name}
                    <span className="font-normal text-white/50 normal-case tracking-normal">
                      {" "}
                      &mdash; {r.town} &mdash; {r.service} &mdash; {r.date}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
