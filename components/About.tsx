import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { IMAGES } from "@/lib/images";

export default function About() {
  return (
    <section id="about" className="relative bg-gradient-to-b from-[color:var(--color-brand)] to-[color:var(--color-brand-dark)] border-t border-[#E8D4A3]/15 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative bg-gradient-to-br from-[color:var(--color-brand-secondary)] to-[color:var(--color-brand-dark)] p-8 md:p-14 lg:p-20 flex flex-col justify-center order-2 lg:order-1 min-h-[480px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,212,163,0.10),transparent_60%),radial-gradient(ellipse_at_30%_50%,rgba(26,26,31,0.55)_0%,rgba(5,6,7,0.88)_100%)]"
          />
          <div
            aria-hidden="true"
            className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          />
          <div className="relative max-w-xl">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
              <p className="font-body text-[11px] uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
                About us
              </p>
            </div>
            <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance mb-7 leading-[0.95]">
              About Heading Placeholder
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-5">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud exercitation ullamco laboris.
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-9">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              aute irure dolor in reprehenderit in voluptate velit esse.
            </p>
            <blockquote className="border-l-2 border-l-[#E8D4A3] pl-6 my-8">
              <p className="text-white/90 italic text-lg md:text-xl leading-relaxed mb-3">
                &ldquo;Lorem ipsum dolor sit amet consectetur adipiscing elit
                sed do eiusmod tempor incididunt ut labore.&rdquo;
              </p>
              <footer className="font-body font-semibold text-[#E8D4A3] text-[11px] uppercase tracking-[0.2em] not-italic">
                &mdash; [Owner Name], Owner
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] order-1 lg:order-2">
          <ImageWithFallback
            src={IMAGES.about.src}
            alt={IMAGES.about.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-transparent via-[color:var(--color-brand)]/30 to-[color:var(--color-brand)]/85"
          />
          <div
            aria-hidden="true"
            className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          />
        </div>
      </div>
    </section>
  );
}
