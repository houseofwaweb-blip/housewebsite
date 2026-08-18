# House of Willow Alexander — SITE BLUEPRINT (single source of truth)

Built to `AUG 17TH REDESIGN/House_Website_Rebuild_Specification.md`. The document is the authority.
The reference commit `1bc758e` (insurance/services) and the live/main site are **design references only**
(layout, section placement, image+text rhythm, colour worlds) — structure & content follow the doc.
Dev: worktree `wa-redesign`, http://localhost:4300, branch `redesign-aug17`, LOCAL ONLY.

## Governing idea
"House of Willow Alexander is who we are. HoWA is what we use." The House owns everything;
HoWA is quiet infrastructure (booking, records, reminders). Never reverse this.

## LOCKED DECISIONS (2026-08-17)
0a. **HoWA is NOT a product on this site.** The doc says the House *uses* HoWA for bookings — it is infrastructure only. REMOVE/redirect the `/howa/*` product pages, **Steward Plans, Housekeeper tier, House Credit, /steward-plans** and any consumer tier ladder. HoWA appears ONLY as "Powered by HoWA" (header/footer/booking-form) + the `/how-it-works` explainer. Membership/recurring-care lives under **House Offers (§14)** and the **Home & Garden** service, not as HoWA tiers.
0b. **Copy source = the insurance-focused preview branch** (howa-stripback / commit `1bc758e`). **Design language = live site.** **Structure/IA = the document.** Pull page copy from that branch where it exists; else use the doc's mandated copy. Purge stale HoWA-tier copy ("Opening to Housekeeper members first", etc.).
0c. **All services LIVE + bookable — NO "coming soon" anywhere** (landing, cards, or detail). Fix by grafting the fuller service + sub-service content from **`doc-amends-local`** (or `howa-stripback`) — those branches carry 197 service images + the loft-organisation / EV-charging sub-services (main, which this branch came from, has only 177 imgs + the 4 launch disciplines with real Service records; the rest render `ComingSoonService`). GRAFT: `git -C <worktree> checkout doc-amends-local -- src/lib/services-data src/app/services public/services` then reconcile with the doc slugs + states. (Homepage badges already removed; services/page.tsx `state:"soon"` + ComingSoonService still need replacing with the grafted real data.)
1. **Build to the document.** Commit/main = design reference; doc = structure + content authority.
2. **Service slugs → migrate to the doc's:** `gardeners, housekeeping, cleaners, window-cleaners, repairs-handyman, electrical-energy, removals, dog-walkers, home-and-garden, interiors`. 301 the old slugs (gardening→gardeners, cleaning→cleaners, window-cleaning→window-cleaners, handyman→repairs-handyman, energy→electrical-energy, pet-care→dog-walkers, gutter-cleaning→window-cleaners).
3. **All 10 services are LIVE + bookable.** No "coming soon" anywhere. Sub-services (loft organisation, EV charging, etc.) are real bookable sub-services — graft the richer sub-service content from a preview branch.
4. **Insurance hub → `/insurance-and-cover`** (doc). Keep the grafted burgundy layout/components, but adapt to the doc's structure + cover set: `home-cover`, `pet-cover`, `home-and-pet-cover`, `quote`, `help-and-claims`. Redirect `/insurance` + `/protect/*` → the new hub. Curate covers to the doc (home/pet/home-and-pet + specialist/private-client); drop motor/business unless requested.
5. **No standalone Design/Gardens/Interiors pillar, no Cinema** (not in doc). Garden design = within Gardeners + Home & Garden services; interior design = the Interiors service (consultation-led).
   - **`/services/interiors` = build it from the EXISTING `/design/interiors` page** (src/app/design/interiors/, also live at willowalexander.co.uk/design/interiors) — reuse its design/imagery/portfolio, restructured to doc §10 Interiors (consultation-led: portfolio → design stages → budget → scope → enquiry form; NOT instant booking). Simplest: adapt/port that page to /services/interiors. REMOVE any HoWA "Assistant" mention when porting (Assistant is a retired HoWA tier; HoWA is not a product here).
   - **`/services/home-and-garden`** = the bundled recurring-care edition (doc §10). Both are currently dead nav links (404) — must be built.
   - Also remove the marketplace-style "Meet our [service]" provider directory (made-up business names) from the core service pages — not a marketplace, not in §10.
6. **House Approved Pro is NOT primary nav** — footer col 5 + The House page only.
7. **HoWA appears only as:** header utility link, mobile-menu footer, every booking-form footer, My House sub-label, footer technology line. Never a nav peer.

## Sitemap (doc §5) — target routes
```
/                                  homepage
services/                          landing (H1 "A specialist for every corner.")
  gardeners housekeeping cleaners window-cleaners repairs-handyman
  electrical-energy removals dog-walkers home-and-garden interiors
insurance-and-cover/               hub (H1 "Cover for the house. And everyone who lives in it.")
  home-cover pet-cover home-and-pet-cover quote help-and-claims
shop/  category/[slug] product/[slug] basket checkout
magazine/ (masthead "The Hearth")  house-and-home garden living-well pets article/[slug]
offers/
the-house/
how-it-works/                      "Powered by HoWA" explainer
house-approved-pro/                B2B (footer + The House only)
book/  my-house/  search/  help/  contact/
legal/  privacy cookies terms service-terms insurance-disclosures accessibility
```
Feature-flag anything not live; no empty pages / dead nav.

## Global nav (doc §6)
Desktop centre (exact order): **Services · Insurance & Cover · Shop · Magazine · Offers · The House**.
Right: small "Powered by HoWA" utility → Search → My House → Basket → **BOOK A SERVICE** button.
**Services mega-menu must have ALL of:** service list w/ colour swatch+name · ONE featured editorial still life · ONE postcode field "See services near you" · ONE House Approved trust statement. Stays cream.
Mobile: monogram · search+account · menu trigger · **sticky bottom CTA** (BOOK A SERVICE on services/home, GET A QUOTE on insurance). Mobile menu grouped **Do · Protect · Shop · Read · About**; "Powered by HoWA" in menu footer.

## Footer (doc §6.3) — 5 columns
1. Services · 2. Insurance & Cover · 3. Shop / Magazine / Offers · 4. Help / Contact / My House · 5. The House / House Approved Pro.
Statement (verbatim): "House of Willow Alexander — for the care, protection and enjoyment of home and garden."
Technology line (verbatim): "Booking and home intelligence powered by HoWA."
Regulatory/insurance disclosures below the main footer (legal-reviewed).

## Homepage (doc §8) — EXACT section order
1. Header · 2. Cabinet hero (proposition plaque + BOOK A SERVICE / EXPLORE THE HOUSE; optional hotspots) ·
3. "What needs doing?" booking rail (default 4: Gardeners/Housekeeping/Cleaners/Repairs + All services; trust line) ·
4. The Hearth editorial spread (12-col; lead changes editorially, not per load) ·
5. Store & Offers (alongside the spread, not above the rail; "Useful things, beautifully chosen." + dark Offers panel) ·
6. How the House works (Ask the House → The House arranges it → HoWA remembers it) · 7. Proof band.
Acceptance: identify Services/Insurance/Shop/Magazine <10s; book without scroll desktop / 1 tap mobile; no service colour >15% of page; HoWA never the identity.
NOTE: image-card ServicesShowcase + text/image EditorialSplit are enrichments beyond the doc's 7 — keep only if they help; the doc's 7 are the spine.

## Individual service page (doc §10) — 11 sections
Hero+booking panel (7/5 split, postcode preselected) → what we help with → included/not included → pricing & frequency → how the visit works → House standard → verified reviews → area & availability → FAQs → related service/cover/article → final CTA. Pricing UX: charging basis shown; survey services = REQUEST A SURVEY not BOOK NOW.

## Insurance hub (doc §11) — order
Hero (GET A QUOTE) → choose cover (Home/Pet/Home&Pet) → why House cover → what may be covered → **what is NOT covered (never buried)** → How House + HoWA work → Claims & help → FAQs → regulatory disclosure (named insurer/underwriter/intermediary/FCA). Burgundy world; porcelain-blue photography only; never Cleaners blue.

## 4 card families (doc §7.3)
Editorial (cream/serif) · Service (service colour + white pattern + still-life) · Insurance (brown/cream/gold + porcelain-blue) · Commerce (product-first, quiet). Never colour alone — always a text eyebrow.

## Design tokens (doc §4, §25.1) — DONE in globals.css
House: cream #F3EEE3, cream-light #FAF7F0, gold #BEA96A, brown #30231C, ink #241B17, chalk #FFFDF8, stone(rule) #D8D0C3.
Services: gardeners #1E3D33, housekeeping #9B4626, cleaners #294D58, dog-walkers #235255, handyman #5D1408, removals #861950, energy #0F183D, windows #3D123C, home-garden #BEA96A, interiors #FFFDF8.
Insurance worlds: burgundy (default) #6e2233 / everyday graphite / business gold. Radius 0–2px. One pattern moment per viewport.

## Key rules (easily missed)
- Never preselect a subscription/frequency (booking) or price-increasing add-on (insurance).
- Guest booking + guest checkout never gated; account offered AFTER.
- Postcode/service/offer context persists across pages; no sensitive data in query strings.
- All 10 booking states designed (loading, no-availability, unavailable-at-postcode, quote-required, payment-failure, pending, confirmed, reschedule, cancellation, refund).
- No em dashes in customer copy; sentence case; ban-list (ecosystem/synergy/AI-powered/seamless/one-stop shop); "home and garden" spelled out in sentences.
- Token-first: no service hex hardcoded in components.

## Build roadmap (doc §30 phases)
- **P1 Commercial foundation:** shell/tokens(✓) → homepage(✓, refine) → **footer to 5-col spec** → **mega-menu postcode + trust** → **mobile nav Do/Protect/Shop/Read/About** → services landing(§9) + service template(§10 11 sections) + **slug migration + redirects** + **sub-services bookable** → booking flow (ServiceOS-wrapped) → contact/help/legal.
- **P2 Protection & relationship:** insurance → `/insurance-and-cover` (doc structure + covers) → my-house → transactional templates.
- **P3 Culture & commerce:** magazine remap (`/the-hearth`→`/magazine` + sections) → shop restyle → offers(§14) full build.
- **P4 Network:** house-approved-pro (`/professionals`→) + application.

## Service sub-service images — SOURCE FOLDERS (copy → public/services + wire to sub-services.ts)
- **PRIMARY set: `houseofwaweb/23rd amendments/images/services/`** (29 imgs, category folders EXTERIOR/HOME/TRADES): handyman-and-repairs, electrical-work, plumbing, plastering, painting-and-decorating, flooring, locks, appliance-repair, heating-and-boilers, pest-control, carpet-cleaning, condensation, chimney, roofing, solar-panel, EV-charger-installation, alarms-and-cctv, smart-home, dog-walking, dog-sitting, pet-care, man-and-a-van, packing, storage, waste-removal, house-clearance, removals.
- cleaning + gardening per-sub-service sets already in `public/services/photos/{cleaning,gardening}/`.
- WP-backup fallback for furniture-assembly/bed-assembly/door-hanging (below).
- Insurance specialist imgs already grafted (`aug12 feedback/new speicliast images` → public/insurance).
Convert to webp, name `<sub-slug>-hero.webp`, drop in `public/services/photos/<service>/`, wire in sub-services.ts.

## Handyman WP-backup images (fallback)
The grafted branch has rich cleaning/gardening sub-service images but NOT handyman's. The originals
(furniture assembly, door hanging, bed assembly) are in the WP export backup:
`C:\Users\User\Desktop\willowalexander-backup\willowalexander.co.uk\public_html\wp-content\uploads\2024\10\`
— `furniture-assembly.jpg`, `bed-assembly-e1697555138838.jpg`, `Door-Hanging.png`, plus `2025/02/Furniture*.jpg`.
TODO: convert to webp → `public/services/photos/handyman/<sub>-hero.webp` and wire to the handyman sub-services in `sub-services.ts`. Also check `AUG 17TH REDESIGN/HOUSE OF WA IMAGERY/Modern Subbrand service images` (timestamp-named) for newer generated versions.

## Copy-cleanup done: "House Companion" → "the House" (no Companion in the doc). Watch for more stale HoWA-era copy.

## Status (as of 2026-08-17)
DONE: tokens; shell/nav labels+swatches; HoWA demotion; homepage (7 sections + enrichments); services expanded to 10; insurance tree grafted (burgundy) — needs restructure to `/insurance-and-cover` + doc cover set; footer dup-key fixed.
NEXT: footer 5-col; mega-menu postcode+trust; mobile nav groups; slug migration; sub-services bookable; then per roadmap.
```
