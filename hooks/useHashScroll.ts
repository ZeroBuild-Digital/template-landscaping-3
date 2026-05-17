'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { smoothScrollTo } from '@/lib/smoothScrollTo';

const MAX_RETRIES = 60;
const DEFAULT_OFFSET = 96;

export function useHashScroll(offset: number = DEFAULT_OFFSET) {
  const pathname = usePathname();
  const scrollTokenRef = useRef(0);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
  }, []);

  useEffect(() => {
    function tryScroll() {
      if (!aliveRef.current || typeof window === 'undefined') return;
      const rawHash = window.location.hash.slice(1);
      if (!rawHash) return;
      const idSegment = rawHash.split('?')[0];
      let decoded = idSegment;
      try { decoded = decodeURIComponent(idSegment); } catch { /* keep raw */ }

      const token = ++scrollTokenRef.current;
      let retries = 0;
      const attempt = () => {
        if (!aliveRef.current || token !== scrollTokenRef.current) return;
        const el = document.getElementById(decoded);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - offset;
          smoothScrollTo(Math.max(0, targetY));
          return;
        }
        if (++retries < MAX_RETRIES) requestAnimationFrame(attempt);
      };
      requestAnimationFrame(attempt);
    }

    tryScroll();
    window.addEventListener('hashchange', tryScroll);
    return () => window.removeEventListener('hashchange', tryScroll);
  }, [pathname, offset]);
}
