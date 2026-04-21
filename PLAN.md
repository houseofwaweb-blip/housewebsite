<!-- /autoplan restore point: /Users/willowalexander/.gstack/projects/platform/main-autoplan-restore-20260415-102735.md -->
# House of Willow Alexander — Marketing Site Build Plan

**Version:** v1 (2026-04-15) — supersedes PLAN.v0.md
**Status:** Working source of truth, iterating with Alex before lockdown.
**Canonical brief:** `context/HoWA_Canonical_Master_Brief_Website_Rebuild_v1.docx` (14 April 2026)

---

## North Star
A first-time visitor should be able to say, within five seconds:
"This is a premium House for design, care and protection, and HoWA is the system that helps me steward my home."

---

## 1. Scope

**This build:** public marketing site for House of Willow Alexander (willowalexander.co.uk), replacing the current WordPress + WooCommerce site as a hard cutover.

**Out of scope (separate HoWA Product app):** Companion diagnostic, dashboard, auth, billing, checkout, account, home records, projects. Every "decide / configure / pay / sign in" CTA in this build links out to `NEXT_PUBLIC_HOWA_APP_URL`.

**Also out of scope:** Gardens and Gardeners sister sites are separate properties. They are not referenced as sub-brands, sub-routes, or peer worlds on this site.

**Decision rule.** The House = the institution for effortless intelligent living. HoWA = the stewardship system behind it. Story lives in the House. Decision, configuration, booking, checkout and continuity sit inside HoWA Product.

---

## 2. Stack

| Layer | Choice | Role |
|---|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Tailwind 4) | Scaffolded at `/platform/` |
| Editorial CMS | Sanity v3 | Single source of truth for all content — partner profiles, services, packages, articles, pages, nav, site settings |
| Commerce | Shopify (headless, Storefront API) | Product catalogue, inventory, cart. In-site cart → redirect to Shopify-hosted checkout (branded) |
| Relational DB | Supabase Postgres | Form submissions + waitlists only. RLS enforced. Nothing editorial lives here |
| Hosting | Vercel | Preview URLs during build, hard cutover at launch |
| Analytics | Vercel Analytics (+ PostHog if needed for CTA path tracking) | |

**Rationale.**
- Sanity owns all structural/editorial content because it is agent-friendly (agent-first authoring flow) and clean for typed content.
- Shopify replaces WooCommerce for this cutover. Phase 1 checkout is Shopify-hosted (fast, PCI-safe, zero maintenance) themed with brand fonts/colours.
- Supabase is scoped narrowly to form submissions (bookings, register-interest, newsletter, contact) because Sanity is not built for append-heavy submission tables and RLS + SQL exports matter here.
- HoWA Product lives separately; this site links out to it.

---

## 3. Information Architecture

### Primary navigation (7 items, intent-led)

| Label | Route | Purpose | CTA |
|---|---|---|---|
| The House | `/the-house` | Brand doorway | Explore |
| HoWA | `/howa` | Product doorway | Start HoWA |
| Design | `/design` | High-consideration offer | See design |
| Services | `/services` | Recurring + one-off care | Book care |
| Protect | `/protect` | Protection + insurance | Protect home |
| Shop | `/shop` | Curated commerce | Shop |
| Journal | `/journal` | Editorial | Read |

**Header.** Wordmark left · Search · Sign in · Book consultation · **Start HoWA** (primary CTA — the "Start HoWA" vs "Book consultation" header-CTA label decision is deferred and implemented as a swappable flag).

**Mobile menu order (pinned):** Start HoWA · The House · HoWA · Design · Services · Protect · Shop · Journal · Sign in · Book consultation.

### Route inventory (launch — P0)

```
/
/the-house
/the-house/philosophy
/the-house/standards
/the-house/proof
/the-house/sustainability
/the-house/about
/howa
/howa/companion              (explainer — interactive flow lives in HoWA Product)
/howa/plans                  (HoWA · HoWA+ £16.99 · Steward coming soon)
/howa/faq
/design
/design/interiors
/design/gardens
/design/studios              (curated design-partner showcase, pulls from /partners)
/design/consultation         (consultation booking with design context)
/services
/services/plans              (Steward Plans — apartment/house/one-off)
/services/gardening          (house gardening service, NOT the Gardens sister brand)
/services/window-cleaning
/services/cleaning
/services/gutter-cleaning
# Deferred: /services/handyman, /services/removals, /services/energy
/protect
/protect/review              (coming soon state)
/protect/insurance           (register-interest only — Phase 1 introducer-only)
/protect/register-interest   (form endpoint)
/shop
/shop/[category]
/shop/product/[slug]
/shop/cart
/journal
/journal/[slug]
/journal/category/[slug]
/partners                    (master directory, filterable by type)
/partners/[slug]             (master partner profile — used for ALL partner types)
/search
/sign-in                     (bounces to HoWA Product)
/book-consultation
/contact
/legal
/not-found
```

**Key IA note.** The original sitemap PDF had `/partner/[slug]` as a P2 singular. This plan promotes `/partners/[slug]` to P0 (plural, master directory pattern) because we have four named launch partners that need public profiles on day one. `/design/studios` stays as a curated *showcase* pulling design-type partners from the `/partners` master — not a separate profile system.

### Redirect map (current WP → new site)

| Current URL | Destination | Action |
|---|---|---|
| Welcome to HoWA | `/howa` | Merge |
| Join HoWA | `/howa/plans` | Merge |
| House Companion | `/howa/companion` | Keep + simplify |
| House Plans | `/services/plans` | Move under Services |
| Interior Design | `/design/interiors` | Keep + refine |
| Garden Design | `/design/gardens` | Keep + refine |
| Home Protection & Risk Reduction | `/protect/review` | Rewrite (calm prevention), launch as "coming soon" |
| Insurance by the House | `/protect/insurance` | Keep + soften, register-interest only |
| Your Home & Garden Marketplace | `/shop` | Rename publicly |
| The Hearth Magazine | `/journal` | Rename to Journal; keep The Hearth as editorial identity |
| `/shop/product/*` (Woo slugs) | `/shop/product/*` (new slugs) | Mapped during Shopify migration |

---

## 4. Data model

### 4.1 Sanity schemas (launch set)

| Schema | Purpose | Key fields |
|---|---|---|
| `siteSettings` | Global config (single doc) | headerCtaLabel, defaultOg, phone, footerCopy, socialHandles, howaAppUrl |
| `navigation` | Header + footer + mobile nav | headerItems[], footerGroups[], mobileOrder[] |
| `page` | Generic page | slug, title, hero, blocks[] (portable text + custom block types) |
| `partner` | Partner profile (core entity) | slug, name, type (design-studio, interior-designer, craftsman, brand-partner), shortBio, longBio, founderPortrait, heroImage, portfolio[] (image, title, year, location, caption), specialties[], serviceAreas[], website, instagram, contactRoute, houseApprovedSeal, featured, order |
| `service` | Service detail (Cleaning, Gardening, etc.) | slug, name, lede, hero, sections[], recurring, availableAreas, linkedPackages[] |
| `servicePackage` | Plan/package | slug, name, tier, price, inclusions[], bestFor, appliesTo, cta (bookNow/payNow/quoteEntry/applicationOnly) |
| `article` | Journal/Hearth article | slug, title, lede, hero, body, category, author, tags, publishedAt, isPremium, season |
| `articleCategory` | Journal taxonomy | slug, name, description |
| `proofPoint` | Testimonial / press / award / standard | type, title, body, logo, source |
| `faq` | Pooled FAQs | question, answer, category, pages[] |
| `legalPage` | /legal/* | slug, title, body, updatedAt |
| `redirect` | Agent-maintained redirect map | from, to, status |

### 4.2 Supabase tables

All writes go through `/api/forms/[type]` route handlers that validate with Zod, rate-limit, write via the service-role key server-side, and optionally dispatch an email notification.

| Table | Columns | RLS |
|---|---|---|
| `consultation_bookings` | id, created_at, name, email, phone, postcode, service_type, preferred_dates, notes, source_page, status | insert: anon; select/update: authenticated admin only |
| `waitlist_interests` | id, created_at, email, product (steward / protect_review / insurance / other), context jsonb, source_page | same |
| `contact_submissions` | id, created_at, name, email, subject, message, source_page | same |
| `newsletter_subscribers` | id, created_at, email, source_page, confirmed_at | same |

### 4.3 Shopify

- Storefront API for product + collection reads.
- Cart state managed in-site via Storefront API cart mutations.
- Checkout is Shopify-hosted — theme with brand fonts/colours through Shopify Checkout Editor.
- Metafields: `houseApproved` (bool), `careNotes` (rich text), `linkedPartner` (slug), `linkedService` (slug), `editorialCopy` (long text — House-voice description that differs from Shopify admin description).

---

## 5. WooCommerce → Shopify migration

Migrating the current store at `https://willowalexander.co.uk/shop/` to a new Shopify store.

**Path:**
1. Inventory the Woo catalogue via WC REST (`/wp-json/wc/store/products`) and capture category tree.
2. Choose tool:
   - **Matrixify** (Shopify app, CSV-based) if catalogue is simple and clean.
   - **Shopify WooCommerce importer app** for the basic case.
   - **Custom Node script** (Woo REST → Shopify Admin API) if we need metafield mapping, category restructuring, or House-voice description rewrites.
3. Map Woo fields → Shopify fields + metafields. Woo custom taxonomies become Shopify tags or collections.
4. Migrate images to Shopify CDN.
5. Capture Woo product slugs → new Shopify slugs as redirects.
6. One-shot inventory + price sync; manual maintenance after, or live sync via API if required later.

**Inputs needed from Alex:** WooCommerce consumer key + secret (read scope), Shopify Admin API access token, Shopify store domain. Ideally start with 5–10 sample products to validate mapping before running the full import.

---

## 6. Content

**All launch copy (pages, editorial, partner profiles, Journal articles, service descriptions) will be provided by Alex, not migrated from WP or stubbed as placeholder.** Delivery format confirmed per-section as schemas come online. Sanity schemas are designed so content pastes in cleanly.

WP → Sanity bulk migration (if needed later for archived content) remains an option via a separate agent, but is not on the critical path for launch.

---

## 7. Design system

**See `/platform/DESIGN.md` v2** — the single source of truth. Covers visual foundations, UX principles, component library, interaction states, all 11 user flows, voice & microcopy, WCAG 2.1 AA accessibility commitments, and the 16-mechanic library developed across the design sessions.

**Concrete setup:**
- Tailwind config with design tokens (colours, spacing, typography scale, border-radius 0 everywhere).
- `next/font/local` with Didot LT Pro Bold + Effra Std Regular from `/platform/mockups/fonts/` (verify commercial web-font licence before launch).
- Pattern PNGs from `/brand-assets/` wired into a reusable `<PatternFrame />` component.
- Base components: `<Header />`, `<Footer />`, `<MobileMenu />`, `<Button />` (gold-filled, brown-outlined, navy-filled, teal-filled, ghost-link), `<Card />` (House variant + HoWA variant), `<ActionRail />`, `<PlanCard />`, `<PartnerCard />`, `<ProofStrip />`, `<SectionHeader />`, `<HouseToHowaTransition />` (the signature 20%-tighten + cream→white shift).

**Visual reference:** `/platform/mockups/index.html`, `howa.html`, `article.html`, `design-system-preview.html`.

**Homepage hero copy (locked):** *"Beautiful living, intelligently stewarded."* Subhead and section order per the canonical brief.

---

## 8. Build sequence

Ordered work, not calendarised. Timeline is Alex's concern; this lists what gets built in what order.

**Foundations (must come first)**
1. Tailwind 4 config + design tokens (colours, spacing, typography, 0px radius).
2. `next/font/local` for Didot LT Pro + Effra Std (licence confirmation required — open loop #3).
3. `<PatternFrame />` + base components (`<Header />`, `<Footer />`, `<MobileMenu />`, `<Button />` variants, `<Card />` House+HoWA variants, `<ActionRail />`, `<PlanCard />`, `<PartnerCard />`, `<ProofStrip />`, `<SectionHeader />`, `<HouseToHowaTransition />`).
4. Sanity project + schemas + launch partner profiles (×4).
5. Supabase project + tables + RLS + `/api/forms/[type]` routes.
6. Shopify connection + Storefront API client + metafield definitions.

**Front door (the brand-legibility surfaces)**
7. Homepage.
8. `/the-house` + 5 children (philosophy, standards, proof, sustainability, about).
9. `/howa` + `/howa/companion` + `/howa/plans` + `/howa/faq`.
10. `/partners` + `/partners/[slug]`.

**Commercial pages**
11. `/design` + interiors + gardens + studios + consultation.
12. `/services` + plans + 6 service detail pages.
13. `/protect` + review (coming-soon state) + insurance (register-interest) + form endpoint.

**Shop + editorial + utility**
14. `/shop` landing + collections + product detail + cart (Shopify catalogue migrated in parallel — see §5).
15. `/journal` + article template + category template.
16. `/search`, `/contact`, `/legal`, `/not-found`, `/book-consultation`, `/sign-in` (bounce to HoWA Product).

**Pre-cutover**
17. Redirect map (WP → new routes, Woo product slugs → Shopify slugs).
18. Analytics event wiring (§14).
19. QA: cross-browser, mobile, forms, Shopify cart→checkout.
20. DNS cutover.

---

## 9. Commercial decisions (locked 2026-04-15)

| Decision | State |
|---|---|
| HoWA+ price | £16.99 / month |
| HoWA Steward | "Coming soon" on `/howa/plans`, not in primary nav |
| House Membership | Collapsed into HoWA+ — no longer marketed as a separate product |
| Steward Plans (managed recurring care) | Public label confirmed |
| Protect Review | "Coming soon" at launch — no public booking |
| Insurance Phase 1 | Register-interest only (introducer-only boundary, Provenance holds regulated activity) |
| Services at launch (4) | Gardening · Window Cleaning · Cleaning · Gutter Cleaning. Handyman, Removals, Energy deferred. |
| Launch partners (4) | Willow Alexander Gardens · Jessica Durling-McMahon · Delve Interiors · House AI |
| Header primary CTA | Start HoWA vs Book consultation — deferred, build as a swappable flag |
| `/journal` (The Hearth) direction | **LOCKED** · Variant A (House & Garden UK model adapted). See `approved.json` in `~/.gstack/projects/platform/designs/hearth-magazine-20260415/` |

---

## 10. Open loops (to close before launch)

1. **Header CTA label** — Start HoWA vs Book consultation.
2. **`NEXT_PUBLIC_HOWA_APP_URL` (HARD GATE).** Every "Start HoWA" CTA routes here. If HoWA Product is not live at cutover, these become brand-damaging dead ends. **Fallback built in:** env flag `HOWA_APP_LIVE=false` routes Start HoWA CTAs to `/howa/coming-soon` (email capture via Supabase `waitlist_interests`) and flips header CTA label to "Book consultation". Cutover can proceed without HoWA Product, but full launch experience depends on this resolving.
3. **Didot LT Pro web-font licensing** — commercial entitlement for this domain/traffic. Fallback: GT Alpina or comparable high-contrast transitional serif, swap via design tokens.
4. **Photography shot list by page** — homepage hero (Georgian facade), /the-house editorial hero, /howa imagery, /design/interiors + /design/gardens portfolio, /services category imagery, /journal article headers, partner founder portraits + portfolios. Alex delivers from library.
5. **Partner consent workflow** — each of the 4 launch partners needs sign-off on public profile copy, portfolio image rights, and House Approved seal usage before publication.
6. **HoWA Product copy ownership** — does the HoWA Product team write `/howa/companion` explainer, or do we draft from the canonical brief?
7. **Contact form recipient routing** — single inbox or topic-routed (design / insurance / press / general)?
8. **Shopify store provisioning** — new Shopify store already created, or to create? Which plan?
9. **Provenance / FCA introducer scope** — confirm exact wording permitted on `/protect/insurance` under introducer-only agreement. Even register-interest has UK regulatory sensitivities.
10. **Email deliverability** — SPF/DKIM/DMARC on `willowalexander.co.uk` for transactional emails from form submissions.

---

## 11. Copy rules (from the canonical brief)

- Use the language of stewardship, continuity, memory, and calm intelligence.
- Avoid: *marketplace, manage your admin, all-in-one app, instant,* alarm-heavy wording.
- When a page moves from story to choice, the design visibly tightens and becomes HoWA-like.
- Every meaningful journey must end in a next state inside HoWA — not an email thread.

---

## 12. Metrics (from day one)

- Homepage click-through rate into HoWA (Start HoWA button).
- Path split across HoWA, Design, Services, Protect.
- Conversion from category page to structured journey (CTA click out to HoWA Product).
- Bounce rate from header + mobile menu.
- Journal engagement: read depth, next-article clicks.
- Shop: product views, add-to-cart, checkout starts.
- Search usage and top queries.
- Form submission counts by type.

---

## 13. Analytics event map

Wired into Vercel Analytics + PostHog from launch.

| Event | Trigger | Properties |
|---|---|---|
| `cta_click` | Any Start HoWA / Book consultation / Protect home / See design / Book care button | `cta_label`, `page`, `position` (header/hero/action-rail/footer) |
| `nav_click` | Primary nav item or mobile menu item | `nav_label`, `from_page` |
| `path_selected` | Action-rail card click on homepage | `path` (howa/design/services/protect) |
| `howa_journey_start` | Any CTA that routes to `NEXT_PUBLIC_HOWA_APP_URL` | `source_page`, `intent` (interiors/gardens/review/plans) |
| `partner_view` | `/partners/[slug]` loaded | `partner_slug`, `partner_type`, `from_page` |
| `shop_view_product` | `/shop/product/[slug]` loaded | `product_id`, `category`, `price` |
| `shop_add_to_cart` | Cart mutation | `product_id`, `qty`, `cart_total` |
| `shop_checkout_start` | User clicks through to Shopify-hosted checkout | `cart_total`, `item_count` |
| `form_submit` | Any `/api/forms/[type]` success | `form_type` (consultation/waitlist/contact/newsletter), `source_page`, `product` (for waitlist) |
| `journal_read_complete` | Article scroll depth ≥ 90% | `article_slug`, `category`, `is_premium` |
| `search_query` | `/search` submission | `query`, `result_count` |
| `404_hit` | Custom 404 render | `original_path`, `referrer` |

---

## 14. Immediate next actions (after plan sign-off)

1. Sync `/platform/CLAUDE.md` to reflect Shopify + Supabase + partner model.
2. Scaffold Tailwind config + design tokens + fonts + `<PatternFrame />` + global shell.
3. Create Sanity project (dev dataset), commit schema files, wire up GROQ client.
4. Create Supabase project, apply table + RLS migrations, wire up `/api/forms/[type]` routes.
5. Stub every launch route with working file + placeholder content so the skeleton is clickable within a day.
6. Start top-of-site build: Homepage → /the-house → /howa → /howa/plans → /partners.

---

---

## 15. Findings & Mitigations (Review Pass · 2026-04-15)

Five reviews run against PLAN v1 + DESIGN v2 + mockup suite: Engineering, Data Model, Security, Accessibility, SEO. Every finding has a fix and a phase. **Pre-code** = must ship before writing production code. **Pre-launch** = must ship before DNS cutover. **Post-launch** = captured as P2 in TODOS.md.

### Pre-code (work before any real component is written)

| ID | Area | Finding | Fix |
|---|---|---|---|
| E1 | Middleware + HoWA flag | Env flag `HOWA_APP_LIVE=false` rewriting + CTA label swap not architected | `middleware.ts` URL rewrite + `<HoWAEnvProvider>` context provider in layout. Header reads context, not env |
| E2 | Shopify cart cookie | Cookie naming, expiry, cross-subdomain strategy unspecified | `wa_cart_id_v2`, validate freshness via Storefront `cart.updatedAt`, `domain=.willowalexander.co.uk` in prod |
| S1 | Supabase RLS | Policies not shipped as SQL migrations | Each form table: anon `INSERT WITH CHECK`, revoke SELECT/UPDATE/DELETE from anon, service_role-only reads. Test with fake anon JWT |
| S2 | Service role key leakage | No guard against client-side use | ESLint rule blocking `SUPABASE_SERVICE_ROLE_KEY` in `'use client'` files + runtime `if (typeof window !== 'undefined') throw` |
| S3 | Turnstile verification | Server-side token check not specified | Every `/api/forms/*` POST verifies via Cloudflare siteverify before Supabase write. 403 on failure + Sentry log |
| S6 | CSP headers | Next 16 ships no CSP by default | Middleware emits CSP with per-request nonce. Allow Sanity/Shopify/Supabase/Turnstile origins only |
| D1 | Portable text block-kit | Hearth rich text blocks not defined | Sanity custom blocks: `pullQuote`, `dropCapPara`, `photoEssay`, `marginNote`, `inlineProduct`, `inlineCollection`. Map to `portableTextComponents` in Next |
| D2 | Reference graph | Schema relationships not spec'd | Lock refs: article→partner(author), article→articleCategory, article→article(related), servicePackage→service, partner→article(featured), partner→serviceArea |
| D10 | GDPR deletion | No endpoint for data subject request | `/api/forms/delete-me` (email + signed token) deletes across 4 tables, writes to `gdpr_deletions` audit |
| O1 | Paywall schema | HoWA+ gated articles risk cloaking signal to Google | Emit `CreativeWork` with `isAccessibleForFree=False` + `hasPart/WebPageElement/cssSelector=.paywall-hidden`. Google "flexible sampling" pattern |
| O3 | 301 redirect map | Existing WP URLs not fully mapped | Screaming Frog crawl pre-launch; build source→destination in Sanity `redirect` docs; serve via `middleware.ts`. Target: zero 404s for any URL with backlinks |
| O5 | Organization + WebSite schema | Site-wide trust signals missing | Root layout emits JSON-LD: `Organization` (name, logo, sameAs, contactPoint) + `WebSite` with `SearchAction` |

### Pre-launch (before DNS cutover)

| ID | Area | Finding | Fix |
|---|---|---|---|
| E3 | ISR + webhook revalidation | No tag strategy | Tag-based: `partner-{slug}`, `article-{slug}`, `product-{sku}`. Sanity + Shopify webhooks hit `/api/webhooks/*` which fire `revalidateTag()` |
| E4 | Brief-builder state | Cross-device / mid-signin not handled | `howa_brief_draft_v1` localStorage; on continue, serialise to URL params (not body) and redirect. HoWA Product hydrates from URL, writes server state, clears local. Cross-device = v2 |
| E5 | Rate-limit strategy | Per-form-type buckets not defined | Upstash Ratelimit per IP per `form_type`: consultation/contact 3/min, waitlist/newsletter 5/min. 429 + `Retry-After` header. Polite fallback UI |
| E6 | Test strategy | Specific paths not locked | Playwright (6): home→Start HoWA; Shop PDP→add→checkout URL; book-consultation submit; register-interest submit; contact conditional reveal; Hearth paywall. Vitest: Zod schemas, redirect map, fuzzy 404 |
| E7 | Draft preview | No toggle mechanism | `/api/preview?secret=X&slug=...` sets Next-Preview cookie. Floating "Draft Mode — Exit" pill in UI when cookie present. Sanity Studio preview links point here |
| E8 | Image strategy | Three CDNs, no allowlist | `next.config.ts` `remotePatterns`: `cdn.sanity.io` + `cdn.shopify.com`. `@sanity/image-url` for negotiation. Hero priority + responsive sizes |
| E9 | Postcode API fan-out | No cache, no graceful degrade | `/api/postcode/[pc]` caches in Upstash 30 days. Parallel API calls with 800ms budget. Partial result allowed. Strict UK-postcode regex validation |
| D3 | Partner fields incomplete | Missing certifications, press, founded | Extend `partner`: `certifications[]`, `languages[]`, `founded`, `team_size`, `insurance_reference`, `press_mentions[]`, `social`, `featured_project` |
| D4 | ServicePackage CTA enum | Free-text risks typos | `cta: { type: "payNow" \| "bookNow" \| "quoteEntry" \| "applicationOnly", label, url }` |
| D5 | Article gating too blunt | Boolean doesn't encode preview-paragraphs | `gating: { type: "public" \| "preview" \| "members", previewParagraphs: number }`, default preview/3 |
| D11 | contact_submissions missing columns | `topic` enum, `routed_to` | Add `topic CHECK IN (...)`, `routed_to text`, `routed_at timestamp` |
| D13 | Missing indexes | Common queries will scan | `idx_waitlist_product(product, created_at DESC)`, `idx_bookings_status(status, created_at DESC)` |
| D16 | Shopify metafield namespace | Collision risk | Use `howa.*` namespace for all custom metafields. Define via Shopify Admin API before imports |
| S4 | Waitlist email enumeration | Response reveals membership | Always 200 OK. Server-side dedupe without dispatching duplicate confirmations |
| S5 | Storefront token scope | Over-scoped risk | Least-privilege: `unauthenticated_read_product_listings` + `unauthenticated_write_checkouts` only |
| S7 | Cookie security flags | Not enforced in helper | `lib/cookies.ts` enforces `Secure; HttpOnly; SameSite=Lax`. Secure=false allowed on localhost only |
| S8 | SSRF on postcode API | Unvalidated input | Strict UK postcode regex before any outbound call |
| S10 | Input length limits | Unbounded writes risk | Zod + DB column limits: message 5000, name 200, email 320 (RFC), phone 30, postcode 10 |
| A1 | Topic cards missing aria-pressed | Screen reader can't announce state | Add `aria-pressed` toggle to topic-card buttons |
| A2 | Conditional reveal unannounced | New fields invisible to SR | Wrap conditional section in `aria-live="polite"`, move focus to first revealed field |
| A3 | `house-stone` at body sizes | 3.1:1 fails AA for <18px | Enforce `house-stone` only at ≥18px; use `house-brown` 70% otherwise. Lint rule catches |
| A4 | Mega menu keyboard | Hover-only = inaccessible | `focus` as well as `hover` triggers; panel reachable via Tab; `aria-expanded` + `aria-hidden` |
| A6 | Reading progress bar | No text equivalent | `role="progressbar"` with `aria-valuenow/min/max` + `aria-label="Reading progress"` |
| A7 | Skip-to-content link | Missing site-wide | `<a class="skip-link" href="#main">` as first focusable, visually hidden until focused |
| A8 | Image alt inconsistency | Mockups mixed standards | Enforce format per image type. Required in Sanity schema for content images |
| O2 | LocalBusiness + Service schema | Lose local-intent queries | `/contact` emits `LocalBusiness` (address, hours, telephone, geo). `/services/*` emits `Service` + `serviceArea[]` (postcodes). Google Business Profile linked to studio address |
| O4 | Sitemap strategy | No dynamic spec | `app/sitemap.ts` pulls Sanity + Shopify + static routes. Split into `/sitemap-{type}.xml` via sitemap index when >1000 URLs. Submit to GSC + Bing |
| O6 | Article schema | Required for rich results | Every `/journal/[slug]`: `Article` with headline, author (Person), publisher (Organization), datePublished, image (1200×630), isPartOf: Periodical (Hearth) |
| O7 | Product schema | Required for Shopping | `/shop/product/[slug]`: `Product` with offers, price, availability, brand, sku |
| O8 | FAQ schema | Rich results opportunity | `FAQPage` on any section with ≥3 items. Don't spam — only genuine FAQs |
| O9 | Breadcrumb schema | Navigation signal | `BreadcrumbList` structured data generated from route segments |
| O10 | Meta fallback hierarchy | No default chain spec'd | `generateMetadata`: seo.metaTitle → title+brand → seo.metaDescription → dek → truncated hero. OG: seo.ogImage → hero → `@vercel/og` branded fallback |
| O11 | Canonical rules | Inconsistent = duplicate-content penalty | `trailingSlash: false`. Middleware: www→apex, `/PATH/` → `/path`. `metadata.alternates.canonical` on every page |
| O15 | Meta robots on coming-soon | Risk of indexing unfinished pages | `noindex, follow` on `/howa/coming-soon`, `/protect/review` while coming-soon, draft-mode pages, utility pages |

### Post-launch (TODOS.md P2)

E10 content migration agent · E11 expanded observability · E12 full CI pipeline · D6 i18n · D7 seasonal rotation · D8 SEO metadata per doc · D9 Sanity Studio previews · D14 soft-delete on form tables · D15 booking status enum · A9 mobile touch targets · A10 animation pause docs · A11 topic card Enter/Space verification · O17 location-suffix service pages · O18 hreflang · O19 robots.txt refinement · S9 split Sentry DSN · S11 waitlist double-opt-in

### How to read this

Every finding is a row. Pre-code = blocks code start. Pre-launch = blocks DNS cutover. Post-launch = P2. Decisions log in DESIGN.md mirrors these. CLAUDE.md env inventory updated with any new keys.

---

## Archive
- `PLAN.v0.md` — pre-canonical-brief plan (Week-of 2026-03-31). Kept for reference; decisions superseded by this document.

---

## GSTACK REVIEW REPORT — /autoplan (2026-04-15)

| Review | Runs | Status | Findings | Notes |
|--------|------|--------|----------|-------|
| CEO review | 1 | CLEAR (with user-directed overrides) | 3 user challenges raised, all overridden by Alex: nav duality stays separate, timeline is Alex's concern, copy provided not stubbed. Hidden dependencies: HoWA URL, Didot licence, photography, partner consent, Provenance/FCA, email deliverability (10 open loops). | Subagent-only outside voice (Codex unavailable). |
| Design review | 1 | CLEAR | 7 structural findings, all auto-applied: plan-card ordering, states matrix, brand transition rule, mobile-first QA gate, WCAG 2.1 AA pre-launch gate, `<PageHeader>` + breadcrumbs, pattern-use allowlist. 5.4/10 → 9/10 projected. | No taste decisions. |
| Eng review | 1 | CLEAR (12 fixes folded in) | RLS migrations, rate-limiting + Turnstile, cart cookie persistence, redirect hybrid (static build + middleware), webhook-driven ISR, Sanity draft preview, Sentry observability, Next 16/Tailwind 4 lock-in, Shopify proxy for token safety. 5/10 → 8.5/10 projected. | No code yet; test plan committed for pre-cutover. |

**VERDICT:** PLAN v1 APPROVED with fixes applied. Next step: sync CLAUDE.md, then begin foundations work per §8 step 1.
