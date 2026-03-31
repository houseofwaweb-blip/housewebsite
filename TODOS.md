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
