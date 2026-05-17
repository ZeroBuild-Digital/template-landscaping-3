// In-memory per-IP rate limiter. 5 submissions per rolling hour per IP.
// Note: resets on serverless cold starts and is per-instance. Good enough
// for low-traffic client sites; swap for Upstash if a client grows.

type Hit = { count: number; resetAt: number };
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const store = new Map<string, Hit>();

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || existing.resetAt < now) {
    const fresh = { count: 1, resetAt: now + WINDOW_MS };
    store.set(ip, fresh);
    return { allowed: true, remaining: LIMIT - 1, resetAt: fresh.resetAt };
  }

  if (existing.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: LIMIT - existing.count,
    resetAt: existing.resetAt,
  };
}

// Periodic cleanup so the Map doesn't grow forever.
if (typeof globalThis.setInterval === "function") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, hit] of store.entries()) {
      if (hit.resetAt < now) store.delete(ip);
    }
  }, WINDOW_MS).unref?.();
}
