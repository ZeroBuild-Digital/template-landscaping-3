import { easeInOutCubic } from './easing';

type Options = {
  duration?: number;
  easing?: (t: number) => number;
  reduceMotion?: boolean;
};

const MIN_DIFF = 2;
const RAF_KEY = '__smoothScrollRafId__';

type GlobalWithRaf = typeof globalThis & { [RAF_KEY]?: number | null };
const getGlobal = () => globalThis as GlobalWithRaf;

export function cancelSmoothScroll(): void {
  const g = getGlobal();
  const id = g[RAF_KEY];
  if (typeof id === 'number') {
    cancelAnimationFrame(id);
    g[RAF_KEY] = null;
  }
}

export function smoothScrollTo(targetY: number, opts: Options = {}): void {
  if (typeof window === 'undefined') return;
  const { duration = 600, easing = easeInOutCubic, reduceMotion = false } = opts;

  cancelSmoothScroll();

  const startY = window.scrollY || window.pageYOffset || 0;
  const diff = targetY - startY;
  if (Math.abs(diff) < MIN_DIFF) return;

  if (reduceMotion || duration === 0) {
    window.scrollTo(0, targetY);
    return;
  }

  const g = getGlobal();
  const startTime = performance.now();
  const step = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + diff * easing(t));
    if (t < 1) g[RAF_KEY] = requestAnimationFrame(step);
    else g[RAF_KEY] = null;
  };
  g[RAF_KEY] = requestAnimationFrame(step);
}
