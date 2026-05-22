# `PLACEHOLDERS.md` — Landscaping Template 3 (Cinematic Nightscape)

> **Audience:** the developer running Phase 7 production migration after a real client has signed and forked this template. This file is the punch-list of every literal placeholder the template ships with. Replace each value, run `npm run verify:images` (and the final sweep grep at the end of this file), and the migration is data-complete.

## Top-line — env-var policy (Item 1a, HARD)

The template ships with these two `.env.local` variables intentionally blank because **template builds never wire form deliverability** — the form runs in preview mode and short-circuits before any network call. Production migration sets both.

| Variable | Status | File | Production migration action |
|---|---|---|---|
| `CLIENT_NOTIFICATION_EMAIL` | BLANK (intentional for preview) | `.env.local`, future `.env.production` on droplet | Phase 7: set to the real monitored inbox where the client wants form submissions delivered. |
| `CLIENT_BUSINESS_NAME` | BLANK (intentional for preview) | `.env.local`, future `.env.production` on droplet | Phase 7: set to the display name used in email subject lines (e.g., the real legal/marketing business name). |
| `NEXT_PUBLIC_BUILD_MODE` | `preview` (in-template default) | `.env.local` | Phase 7: change to `production` so `components/ContactForm.tsx` POSTs to `/api/contact` instead of short-circuiting. |
| `RESEND_API_KEY` | BLANK (deliberately not committed) | `.env.local`, future `.env.production` on droplet | Phase 7: copy the agency-shared key from any prior production project. **Never regenerate.** |
| `RESEND_FROM_EMAIL` | `contact@zerobuilddigital.com` (agency-wide constant) | `.env.local` | No change — agency constant. |

## Item 1b — footer mailto address

| Placeholder | Status | File:Line | Production migration action |
|---|---|---|---|
| `contact@placeholder.com` | TRANSIENT | `components/Footer.tsx` (mailto href + display text) | Replace with the real client email. This is separate from `CLIENT_NOTIFICATION_EMAIL` — it's the public-facing contact address; they may differ. |

## Per-placeholder table (Items 2+)

Every literal placeholder string used in the template code. All status: **TRANSIENT** unless noted otherwise. Production migration replaces each value.

| Placeholder | File(s) | Production migration action |
|---|---|---|
| `[TEMPLATE 3]` | `components/Navbar.tsx` (brand mark + aria-label), `components/Footer.tsx` (brand mark, copyright), `app/layout.tsx` (title metadata), `components/ContactForm.tsx` (preview-mode message) | Replace with real business name (display) and the SEO-appropriate site title. |
| `(555) 123-4567` (display) + `tel:+15551234567` (href) | `components/Navbar.tsx` (no direct phone — Get Quote routes to form), `components/MobileStickyCtaBar.tsx` (Call pill href), `components/CtaSection.tsx` (emerald phone block, click-to-call), `components/Footer.tsx` (phone link) | Replace both display string and `tel:+1...` E.164 href consistently. Click-to-call must work on mobile. |
| `contact@placeholder.com` | `components/Footer.tsx` mailto | See Item 1b above. |
| `123 Sample Street, Sample Town, ST 00000` | `components/Footer.tsx` address block | Replace with real client business address. |
| `Service 1`–`Service 8` | `components/Services.tsx` (titles), `components/Footer.tsx` (services column) | Replace 8 service titles with real services. Update accompanying ~12-15-word lorem ipsum bodies with real copy in **first-person plural voice** ("we"/"our crew"). |
| `Sample Reviewer 1`, `Sample Reviewer 2`, `Sample Reviewer 3` + `Sample Town` + `Sample Service` + `Sample Date` | `components/Reviews.tsx` (3 review attribution rows) | Replace all 3 reviewer attributions with real names, real NJ towns, real service descriptions, real dates. **Keep stars at `fill-amber-400 text-amber-400`** — never shift to cyan (universal kept row). |
| `Reason 1`, `Reason 2`, `Reason 3` | `components/WhyUs.tsx` (3 reason card titles) | Replace 3 reason titles with real differentiators. Update accompanying ~25-word lorem ipsum bodies. |
| `About Heading Placeholder` | `components/About.tsx` (H2) | Replace with real about-section heading. |
| `[Owner Name]` | `components/About.tsx` (attributed quote attribution) | Replace with real owner name. The attributed-quote pattern (italic body + "— [Name], Owner") stays. |
| `FAQ 1`–`FAQ 7` | `components/FAQ.tsx` (7 question titles) | Replace 7 question titles with real client FAQs. Update accompanying 2-3-sentence lorem ipsum answers. ALL closed by default — preserve `useState<number \| null>(null)`. |
| `Sample Town One`–`Sample Town Five` | `components/Footer.tsx` (Service Area column) | Replace with 5 real NJ town names from the client's service area. |
| Lorem ipsum body copy throughout | `components/Hero.tsx` (H1, subhead, eyebrow), `components/Services.tsx`, `components/Reviews.tsx`, `components/WhyUs.tsx`, `components/About.tsx`, `components/RecentWork.tsx` (slide captions), `components/CtaSection.tsx`, `components/FAQ.tsx` | Rewrite every lorem ipsum string with real copy. Preserve **first-person plural voice** ("we"/"us"/"our crew") in body copy; singular "I" only in the About attributed quote. Action copy on CTAs stays imperative ("Get a Free Quote", "Call Now"). |
| Hero H1 word color pop (`text-cyan-400` on one word) | `components/Hero.tsx` | Pick a meaningful 1-word emphasis in the real H1. Keep it to EXACTLY ONE word per design-reference.md "exactly ONE one-word accent color pop." |
| Unsplash bg images | `lib/images.ts` (hero, reviews, about + 6 RECENT_WORK slides) | Replace 9 Unsplash URLs with real client photos. **Re-run `npm run verify:images` after the swap.** Lean toward twilight/dusk/blue-hour shots where possible (Cinematic Nightscape mood). |

## Final migration check — sweep grep

After completing the migration, run from the project root to confirm no placeholders are left in code:

```
grep -rE "Sample Reviewer|Sample Town|Sample Service|Sample Date|\[Template 3\]|\[Owner Name\]|About Heading Placeholder|FAQ [1-7]\b|Reason [1-3]\b|Service [1-8]\b|placeholder\.com|555-?\)?\s?\(?123-4567|tel:\+15551234567" components/ app/
```

Expected after a complete migration: **ZERO matches**. Any lingering hit is a placeholder the migration missed.

## Notes for future-you

- The Mobile Sticky CTA Bar's Call pill uses `<a href="tel:+15551234567">` (raw `<a>` — correct for `tel:` URLs; no smooth-scroll). The Quote pill uses `<SmoothLink href="#quote">` (correct for hash links). Don't swap these.
- The `app/api/contact/route.ts` lazy-init Resend pattern (`new Resend(...)` inside POST handler at line ~36, AFTER the env-presence guard at lines 28-34) MUST be preserved during any edit. The build-without-env regression check (`mv .env.local .env.local.bak && npm run build`) catches violations.
- The `@layer base` heading rule in `app/globals.css` has `font-family` ONLY — never set `color` globally on `h1, h2, h3, h4`. Dark-section headings inherit white from parent containers; light-section headings get explicit `text-slate-900` on the element. If you ever see headings render as dark slate on dark midnight, this rule was violated.
- Cyan accent budget: 13 declared touchpoints in `__DESIGN.md__`. Don't spread cyan beyond those — it flattens the visual impact. Specifically, NEVER use cyan on review stars (kept amber) or in-section phone CTA blocks (kept emerald).
