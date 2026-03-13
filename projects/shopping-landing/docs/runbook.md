# ShopZen — Runbook

---

## Shopping Landing Page — added March 2026

**Trigger:** Any HTTP request to the root route `/` (served by Next.js App Router via `app/page.tsx`).

**Service/Function:** `HomePage` in `app/page.tsx` — composes six section components in a fixed order: Hero → FeaturedProducts → Categories → PromoBanner → Newsletter → Footer.

**Failure mode:**
- Build-time failure (TypeScript errors, missing imports) — `next build` exits non-zero; deployment blocked; no user impact if running in production.
- Runtime image failure — `next/image` will error if `picsum.photos` is unreachable and the hostname is not in `next.config.ts` `remotePatterns`. Fix: ensure `picsum.photos` (or replacement CDN hostname) is in the allowlist.
- Newsletter form — client-side only; no backend. Submission simply toggles a local `submitted` state. There is no data loss risk, but emails are not collected. Wire up a POST handler when a mailing-list service is chosen.

**Template/Config:**
- `app/data/products.ts` — product names, prices, badges, ratings (8 items)
- `app/data/categories.ts` — category names, icons, item counts (6 items)
- `app/globals.css` — Tailwind v4 `@theme` block; brand colour tokens
- `next.config.ts` — image remote pattern allowlist
- No environment variables required for the current static build

**To disable:** Remove or redirect the `app/page.tsx` route. All section components are only rendered from this page; removing the page entry point takes down the entire landing experience without affecting any other routes. No feature flag or env var toggle exists at this time.

---

## Newsletter Signup Form — added March 2026

**Trigger:** User submits the email form in the Newsletter section (`app/components/Newsletter.tsx`).

**Service/Function:** `handleSubmit` in `Newsletter` (client component). Validates the email client-side using `isValidEmail` regex, then transitions the UI to a success state.

**Failure mode:** Validation rejects empty input and malformed emails with inline error messages. There is no network call — the form cannot fail due to a backend outage. If a mailing-list integration is added later and the POST fails, the `setSubmitted(true)` call should be moved inside a `.then()` handler (after confirmed success) and an error state added.

**Template/Config:** No external config. The "Subscribe" action is entirely local state at this stage.

**To disable:** Replace the `<Newsletter />` usage in `app/page.tsx` with `null` or remove the import. The component is self-contained and has no side effects on other sections.
