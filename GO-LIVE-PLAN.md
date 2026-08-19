# Go-Live Plan — Aug 17th Revisions

Prepared while the `aug17th-revisions` preview is out for feedback. Nothing here has
been applied to production. Every change below is staged in the `aug17th-revisions`
branch's `next.config.ts` and only takes effect when this branch is promoted to live.

## TL;DR

- The live site (`willowalexander.co.uk`) is **already this app**, already on the new
  URL structure. This is a redesign update, **not** a WordPress migration.
- Diffed **all 783 live URLs** (from `willowalexander.co.uk/sitemap.xml`) against the
  redesign's **87 routes**: **no orphans, no 404s.** Every live URL resolves to a
  matching route or an existing redirect.
- Redirect infra is mature (~90 rules in `next.config.ts`). Remaining work is
  **hygiene + two decisions**, not new mapping.

## Coverage check (verified 2026-08-18)

| Live section | Count | Handled by |
|---|---|---|
| `/shop/*` | 318 | `/shop`, `/shop/[handle]`, `/shop/collections/[handle]` |
| `/services/*` | 180 | `/services/[slug]`, `/services/[slug]/[sub]`, `/services/local/[slug]` |
| `/the-hearth/*` | 111 | `/the-hearth/[slug]`, `/the-hearth/category/[slug]` |
| `/musings/*` | 74 | `/musings`, `/musings/[slug]` |
| `/recipes/*` | 43 | `/recipes`, `/recipes/[slug]` |
| `/news/*` | 22 | `/news`, `/news/[slug]` |
| `/the-house/*` | 7 | all 6 subpages exist (about, artwork, philosophy, proof, standards, sustainability) |
| `/howa/*`, `/design/*`, `/legal/*`, `/protect/*`, `/partners/*` | 23 | routes or redirects (see decisions) |

No live URL is left without a home.

## 1. Redirect decisions (need your call)

### 1a. Partner profiles — DECISION NEEDED
- Live has 4 real profile pages: `/partners/delve-interiors`, `/partners/house-ai`,
  `/partners/jessica-durling-mcmahon`, `/partners/willow-alexander-gardens`.
- The redesign **has** `/partners/[slug]` pages built, **but** `next.config.ts`
  (~L149, L152) redirects `/partners/*` to `/the-house/about`, which overrides the
  pages so they never render.
- **Choose:** (a) keep the partner profiles — remove the `/partners/*` redirect so the
  pages render; or (b) retire them — keep the redirect (accepts losing that profile
  content + any rankings those URLs hold).

### 1b. Design + HoWA + Protect folds — confirm intended
- `/design`, `/design/interiors`, `/design/studios` redirect into `/services*`
  (pages also exist but are overridden). `/design/gardens` still renders.
- `/howa`, `/howa/assistant`, `/howa/housekeeper`, `/howa/steward`, `/howa/plans`,
  `/howa/faq` redirect to `/how-it-works` or `/offers` (pages overridden).
- `/protect/*` redirects to `/insurance*`.
- These are deliberate folds and produce redirects (not 404s). Confirm they're still
  what you want live, since the live URLs currently render as real pages.

## 2. Redirect hygiene (fix before promote)

### 2a. Temp 307s shadowing permanent 301s
First-matching rule wins in Next. Several `permanent:false` "temp bridges" sit
**above** the `permanent:true` versions, so search engines get a 307 (no ranking
transfer) instead of a 301:
- `/services/gardeners` — 307 at ~L92 shadows the 301 later (~L214). Same for
  `/services/cleaners`, `/services/window-cleaners`.
- `/magazine` — 307 at ~L100 shadows the 301 at ~L172.
- `/insurance-and-cover*`, `/howa*`, `/steward-plans`, `/design*`, `/partners*` are all
  `permanent:false`.
- **Action:** for every mapping that is permanent at launch, flip `permanent:false`
  → `true`, and delete the now-duplicate later rules. Keep `permanent:false` only where
  the destination is genuinely provisional (e.g. a "coming soon" fold you may reverse).

### 2b. Flatten redirect chains (multi-hop → single-hop)
- `/howa/plus` → `/howa/housekeeper` → `/offers` (two hops).
- `/insurance-by-the-house` → `/protect/insurance` → `/insurance`.
- **Action:** point the source directly at the final destination so each is one hop.

### 2c. Dedupe
- Remove shadowed duplicate rules (e.g. the second `/magazine`, the second
  `/services/gardeners`/`/cleaners`) once 2a is done.

## 3. Go-live checklist (non-redirect)

- [ ] **Env parity** — confirm the Vercel project has every var the build needs, and
      that preview vs production scoping is correct (Sanity read token, Shopify
      storefront token, Supabase URL/anon/service-role, Turnstile, Upstash, Sentry).
      A missing var fails the build or silently breaks a data page.
- [ ] **Promote path** — decide how live happens: merge `aug17th-revisions` → `main`
      (Vercel auto-deploys prod), or promote the preview deployment to production in
      Vercel. Keep the previous production deployment pinned for instant rollback.
- [ ] **`leaflet` dependency** — already added to `package.json` this session (was
      missing); confirm it installs on Vercel.
- [ ] **Sitemap** — `src/app/sitemap.ts` regenerates for the new structure. Re-submit
      `sitemap.xml` in Google Search Console after launch.
- [ ] **robots** — confirm `robots.txt`/route allows indexing in prod (and that no
      preview `noindex` leaks to production).
- [ ] **Canonicals** — spot-check a few pages emit a self-canonical on the production
      domain (not the preview host).
- [ ] **Analytics + Search Console** — GA4 / Clarity / Meta / Pinterest fire under
      consent in prod; keep Search Console open to watch Coverage + Crawl errors for
      the first two weeks.
- [ ] **404 monitoring** — after promote, crawl the live sitemap (or Screaming Frog)
      to confirm 0 unexpected 404s, and watch Search Console "Not found (404)".
- [ ] **ServiceOS booking** — the OBF only opens on allow-listed origins. Confirm the
      production domain is allow-listed so deep-links + postcode prefill work live.
- [ ] **ISR warm** — first hit on 744 static/ISR pages can be slow; optionally warm
      the top pages post-deploy.
- [ ] **Redirect smoke test** — after promote, curl ~20 representative old URLs
      (legal, services legacy slugs, product-category, `/our-story`, `/magazine`) and
      confirm each returns a single 301 to the right place.

## 4. What NOT to do now (per instruction)

- Do not apply any redirect change to the current production site. Stage everything in
  the `aug17th-revisions` branch; it goes live only on promote.
- Do not touch the live `sitemap.xml` or the currently-live redirects.

## Notes

- Full URL diff artifacts (live-urls.txt, new-routes.txt) were generated during this
  analysis and can be regenerated any time from the live sitemap + `src/app` routes.
- Outstanding non-redirect audit items the user accepted/deferred are tracked
  separately; none block go-live.
