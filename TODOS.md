# TODOs

## P1

### Performance budget + Lighthouse CI
Set LCP < 2.5s, CLS < 0.1, FID < 100ms targets. Add Lighthouse CI to Vercel deploy pipeline to catch regressions per-deploy. Without this, performance degrades page by page.
- **Effort:** S (CC: ~10 min)
- **Blocked by:** nothing
- **Added:** 2026-03-31 via CEO review

### Structured data (JSON-LD) for SEO
Add Organization schema site-wide, Product schema on `/shop/product/*`, Article schema on `/journal/*`. Required for Google rich snippets.
- **Effort:** S (CC: ~10 min)
- **Blocked by:** Sanity content model finalized
- **Added:** 2026-03-31 via CEO review

### Accessibility audit (WCAG 2.1 AA)
Run axe-core or Lighthouse accessibility on every page template before launch. Fix failures.
- **Effort:** S (CC: ~15 min)
- **Blocked by:** pages built
- **Added:** 2026-03-31 via CEO review

### CI pipeline (ESLint + TypeScript + tests on PR)
GitHub Actions or Vercel build step: `npm run lint && npm run build && npm test`. Catches type errors and lint failures before preview deploy.
- **Effort:** S (CC: ~10 min)
- **Blocked by:** nothing
- **Added:** 2026-04-01 via eng review

### WP catch-all redirect strategy
Middleware-level catch-all for old WP URLs not in explicit redirect map (category archives, ?p=123, tag pages). Redirect to homepage or nearest category with 301. Prevents SEO equity loss during migration.
- **Effort:** S (CC: ~10 min)
- **Blocked by:** redirect map finalized
- **Added:** 2026-04-01 via eng review

---

## P2 · Post-launch (from 2026-04-15 review pass)

Captured from the 5-review pass. Not blocking launch — P2 for first iteration post-cutover.

### E10 — Content migration agent
Build the deferred content migration agent (WP REST + ACF → Sanity Management API) once the launch ships.
- **Effort:** M · **Blocked by:** launch · **Added:** 2026-04-15

### E11 — Expanded observability
Beyond Sentry + Vercel Analytics: add BetterStack or Uptime Robot for uptime monitoring, funnel dashboards in PostHog if CTA conversion data becomes important.
- **Effort:** S · **Blocked by:** launch · **Added:** 2026-04-15

### E12 — Full CI pipeline
GitHub Actions: lint + typecheck + Vitest + Playwright on PR. Deploy preview per branch. Secrets scoped correctly.
- **Effort:** S · **Blocked by:** none · **Added:** 2026-04-15

### D6 — i18n when needed
When expanding beyond UK English, adopt `@sanity/document-internationalization`. Schema changes required.
- **Effort:** L · **Blocked by:** locale expansion decision · **Added:** 2026-04-15

### D7 — Seasonal content rotation
`season` field on `article` + `servicePackage`. Homepage + Hearth filter by current season at query time.
- **Effort:** S · **Blocked by:** Sanity schema deployed · **Added:** 2026-04-15

### D8 — SEO metadata override per document
`seo` object on all publishable docs with metaTitle / metaDescription / ogImage / canonical / noindex overrides.
- **Effort:** S · **Blocked by:** none · **Added:** 2026-04-15

### D9 — Sanity Studio previews
Each schema gets a `preview: { select: { title, subtitle, media } }` block for navigable Studio.
- **Effort:** S · **Blocked by:** Studio deployed · **Added:** 2026-04-15

### D14 — Soft-delete on form tables
Add `deleted_at` nullable timestamp to consultation_bookings, waitlist_interests, contact_submissions, newsletter_subscribers. Read queries filter it out.
- **Effort:** S · **Blocked by:** none · **Added:** 2026-04-15

### D15 — Booking status enum
`consultation_bookings.status` constrained to `CHECK IN ('new','contacted','scheduled','completed','declined','cancelled')`.
- **Effort:** S · **Blocked by:** first admin view · **Added:** 2026-04-15

### A9 — Mobile touch targets audit
Verify every tappable element ≥ 44px on mobile breakpoints. Category strip tag-links vulnerable.
- **Effort:** S · **Blocked by:** responsive build · **Added:** 2026-04-15

### A10 — Animation pause docs
Document animation duration rules. Any auto-playing motion > 5s must provide pause control per WCAG 2.2.2. All our current animations are <1s, so we pass — just document.
- **Effort:** XS · **Blocked by:** none · **Added:** 2026-04-15

### A11 — Keyboard verification on topic cards
Verify Enter/Space triggers selection on /contact topic cards in production build.
- **Effort:** XS · **Blocked by:** /contact coded · **Added:** 2026-04-15

### O17 — Geo-suffix service pages
`/services/gardening/london`, `/services/cleaning/w11` etc. for local long-tail. Template already exists; adding a route is cheap.
- **Effort:** M · **Blocked by:** launch traffic data · **Added:** 2026-04-15

### O18 — hreflang
English-only for launch. When locales expand, add hreflang annotations.
- **Effort:** S · **Blocked by:** locale decision · **Added:** 2026-04-15

### O19 — robots.txt refinement
Launch with basic rules; refine over time based on GSC crawl data.
- **Effort:** XS · **Blocked by:** post-launch GSC data · **Added:** 2026-04-15

### S9 — Split Sentry DSNs
Two DSNs: `NEXT_PUBLIC_SENTRY_DSN` for client (public, rate-limited) + `SENTRY_DSN` for server (private, higher fidelity). Source-map upload token server-only in CI.
- **Effort:** XS · **Blocked by:** Sentry project created · **Added:** 2026-04-15

### S11 — Waitlist double-opt-in
Phase 1: single-opt-in accepted. If volume grows: require email click-through before activation.
- **Effort:** S · **Blocked by:** post-launch volume data · **Added:** 2026-04-15
