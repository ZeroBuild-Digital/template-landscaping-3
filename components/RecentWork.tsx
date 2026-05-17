"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { RECENT_WORK } from "@/lib/images";

const SLOT_VW = 60;

export default function RecentWork() {
  const items = RECENT_WORK;
  const N = items.length;
  const extended = [items[N - 1], ...items, items[0]];

  const [virtualIndex, setVirtualIndex] = useState(1);
  const [skipAnim, setSkipAnim] = useState(false);
  const realIndex = (((virtualIndex - 1) % N) + N) % N;
  const prefersReducedMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setSkipAnim(false);
    setVirtualIndex((v) => Math.min(v + 1, N + 1));
  }, [N]);
  const goPrev = useCallback(() => {
    setSkipAnim(false);
    setVirtualIndex((v) => Math.max(v - 1, 0));
  }, []);
  const goTo = useCallback((i: number) => {
    setSkipAnim(false);
    setVirtualIndex(i + 1);
  }, []);

  const onAnimDone = useCallback(() => {
    if (virtualIndex <= 0) {
      setSkipAnim(true);
      setVirtualIndex(N);
    } else if (virtualIndex >= N + 1) {
      setSkipAnim(true);
      setVirtualIndex(1);
    }
  }, [virtualIndex, N]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const SWIPE_DISTANCE = 50;
      const SWIPE_VELOCITY = 500;
      const { offset, velocity } = info;
      if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
        goNext();
      } else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  const transition =
    prefersReducedMotion || skipAnim
      ? { duration: 0 }
      : {
          type: "tween" as const,
          duration: 0.35,
          ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
        };

  const captionTransition =
    prefersReducedMotion || skipAnim
      ? { duration: 0 }
      : {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: 0.15,
        };

  const stripWidth = extended.length * SLOT_VW;
  const xPercent =
    (-virtualIndex * SLOT_VW + (50 - SLOT_VW / 2)) / (stripWidth / 100);

  return (
    <section
      id="work"
      className="relative bg-gradient-to-b from-[color:var(--color-brand-dark)] via-[#0F0F12] to-[color:var(--color-brand-dark)] py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_20%,rgba(232,212,163,0.10),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(232,212,163,0.06),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 mb-12 md:mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]" />
          <p className="font-body text-[11px] uppercase tracking-[0.32em] font-semibold text-[#E8D4A3]">
            Portfolio
          </p>
        </div>
        <h2 className="font-display font-semibold uppercase text-white text-4xl md:text-5xl lg:text-6xl tracking-wide text-balance max-w-3xl leading-[0.95]">
          Recent work
        </h2>
      </div>

      <div className="relative z-10" role="region" aria-roledescription="carousel" aria-label="Recent work gallery">
        <div className="relative overflow-hidden h-[280px] sm:h-[360px] md:h-[460px] lg:h-[520px]">
          <motion.div
            className="absolute inset-y-0 left-0 flex h-full cursor-grab active:cursor-grabbing select-none"
            style={{ width: `${stripWidth}%`, touchAction: "pan-y" }}
            animate={{ x: `${xPercent}%` }}
            transition={transition}
            onAnimationComplete={onAnimDone}
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            data-testid="carousel-strip"
          >
            {extended.map((item, i) => {
              const isActive = i === virtualIndex;
              const isClone = i === 0 || i === extended.length - 1;
              return (
                <motion.div
                  key={`slot-${i}`}
                  className="relative h-full px-2 md:px-3 flex-shrink-0"
                  style={{ width: `${100 / extended.length}%` }}
                  animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.92 }}
                  transition={transition}
                  aria-hidden={!isActive}
                  data-slot-index={i}
                  data-clone={isClone ? "true" : undefined}
                  data-active={isActive ? "true" : undefined}
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-md transition-shadow duration-300 ${
                      isActive
                        ? "ring-1 ring-[#E8D4A3]/50 shadow-[0_0_60px_rgba(232,212,163,0.35)]"
                        : "ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                    }`}
                  >
                    <ImageWithFallback
                      src={item.src}
                      alt={isClone ? "" : item.alt}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                      draggable={false}
                      fallbackLabel={isClone ? undefined : item.caption}
                    />
                    {!isClone && (
                      <motion.div
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-6 py-6 pointer-events-none"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                        transition={captionTransition}
                      >
                        <p className="font-display font-semibold uppercase text-white text-xl md:text-2xl lg:text-3xl tracking-wide leading-tight">
                          {item.caption}
                        </p>
                        <p className="text-[#E8D4A3] text-[11px] uppercase tracking-[0.2em] font-semibold mt-1">
                          {item.town}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20 backdrop-blur transition-all duration-150 ease-out hover:bg-[#D4B679] hover:text-slate-900 hover:ring-[#E8D4A3]/50 hover:shadow-[0_0_30px_rgba(232,212,163,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D4A3]"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20 backdrop-blur transition-all duration-150 ease-out hover:bg-[#D4B679] hover:text-slate-900 hover:ring-[#E8D4A3]/50 hover:shadow-[0_0_30px_rgba(232,212,163,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D4A3]"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="relative z-10 mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Slides">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === realIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D4A3] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                i === realIndex
                  ? "w-8 bg-[#E8D4A3] shadow-[0_0_12px_rgba(232,212,163,0.6)]"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
