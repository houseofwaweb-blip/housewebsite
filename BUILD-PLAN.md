# House of Willow Alexander — Rebuild Build Plan (Aug 17 redesign)

Source spec: `AUG 17TH REDESIGN/House_Website_Rebuild_Specification.md` (1927 lines).
Base: this worktree `wa-redesign` (branch `redesign-aug17`) off **production `main`**. LOCAL ONLY.
Synthesised from: full spec read + two independent agent reads (structure map + features/reuse map).

---

## AUDIT PUNCH-LIST (3-agent audit vs spec, 2026-08-17)
Full reports in the two task output files. Prioritised gaps (auditors 1 & 2; auditor 3 = IA/system pending):

**Correctness / build risk**
- [ ] `ServiceDetail.tsx` type mismatch: `[slug]/page.tsx` imports `ServiceDetailMode` + passes `mode=` that ServiceDetail doesn't define → survey-pricing silently dropped. Fix the prop/type.
- [x] Stale "Housekeeper" copy removed from Hearth masthead + article badge.
- [ ] Strip retired **Steward/tier** content from `ServiceDetail.tsx` (8 refs: /steward-plans, /howa/steward links, "Subscriptions only through Steward" card, "Steward-ready" badge). Locked-decision 0a.
- [ ] Dead HoWA-tier CSS block `globals.css:342-586` (.tier-howa/.tier-howaplus/.tier-steward) — purge.

**§10 Service detail template (CORE)** — doesn't match spec: no 7/5 above-fold booking panel (postcode preselected, SEE TIMES & PRICES, phone alt, Powered-by-HoWA footer); wrong 11-section order; no charging-basis / `REQUEST A SURVEY` survey UX; "coming soon" placeholder path still reachable.
**§9 Services landing** — H1 is "Care as craft…" must be **"A specialist for every corner."**; reconcile section order to §9; stray literal quotes `services/page.tsx:461`.
**§6 Mega-menu** — Services panel missing 3 of 4 required: postcode "See services near you", featured still life, House Approved trust statement.
**§6 Mobile nav** — no sticky bottom CTA (Book/Get a quote by route); not grouped Do/Protect/Shop/Read/About; no "Powered by HoWA" in menu footer.
**§7 Components** — build `PoweredByHowa` (3 sizes), shared `PostcodeField`, and extract card families (ServiceCard/EditorialCard/InsuranceCard/OfferCard/TrustBand/AvailabilityPicker). Primary CTA uses gold; spec wants brown/ink (gold ceremonial only).
**§11 Insurance** — add required **"what is NOT covered"** block (never buried); hub H1 → "Cover for the house. And everyone who lives in it."; Home/Pet/Home&Pet chooser (vs current advised/everyday); name insurer/underwriter when compliance supplies. NB introducer-only model is a deliberate divergence — needs product-owner ruling for the self-serve quote flow.
**§12 Shop** — add "The House Edit" curator block, gifts & experiences, related-Hearth cross-links, PDP sustainability/provenance section, "Featured" sort.
**§13 Magazine** — masthead tagline → "The magazine of the House." + issue marker; remap category taxonomy to House & Home / Garden / Living Well / Pets / The Useful List; add article "useful details" fact box + contextual next-action.
**§14 Offers** — build real OfferCard + content (included/eligibility/price-basis/dates/exclusions/terms/CTA); currently a placeholder.
**IA/slugs** — doc slugs (/services/gardeners, /insurance-and-cover, /magazine) currently 302 BACKWARD to legacy; invert so doc routes are canonical (301 legacy → new).
**Sub-services** — re-add the broader handyman/exterior taxonomy (Locks, Plumbing, Plastering, Heating, Flooring, Pest control, Chimney, Roofing) so the `23rd amendments` images have homes; wire tv-wall-mounting/loft-organisation/home-organising images.

## Progress log (2026-08-17)

Dev server: `wa-redesign` worktree, **http://localhost:4300** (LOCAL ONLY, branch `redesign-aug17`, never pushed).

**Done:**
- **1a Tokens** — globals.css retuned to spec House palette + 10 net-new `--service-*` tokens + spacing. AA text tokens kept.
- **1b Shell** — nav = Services · Insurance & Cover · Shop · Magazine · Offers · The House; HoWA demoted to "Powered by HoWA" utility link; CTA = "Book a service"; `/offers` stub created. (Insurance→/protect, Magazine→/the-hearth are temp targets pending Phase 2.)
- **1d Homepage** — fully rebuilt to spec §8: `CabinetHero` (box-less insurance image + floating cream card, 11 hotspots incl. Insurance, scaled, equal buttons), `BookingRail` ("What needs doing?" chips + ServiceOS trigger), `HearthSpread` (real Sanity articles), `StoreOffers` (Shopify + insurance teaser + offers panel), `HowItWorks`, `ProofBand` (Provenance disclosure), `HouseInstitutionStrip`. Old HoWA-heavy page.tsx replaced. Components in `src/components/home/`.
- **1c Services** — landing now lists 10 disciplines (added home-and-garden + interiors as `state:"soon"`); hero hotspots repoint to real routes; "4 disciplines" copy fixed to 10. All `/services/*` routes 200.
- **1f (partial)** — footer duplicate-key warning fixed.

**Insurance graft (2026-08-17, from commit `1bc758e`):** the full `insurance/*` tree was grafted from the reference commit (same repo) into wa-redesign — hub + everyday/business/private-client/home-protection/how-this-works/guides/[slug], plus `components/insurance/*`, `lib/insurance/*`, `lib/attribution.ts`, and ~80 `public/insurance/*` images. Nav "Insurance & Cover" → `/insurance`; homepage insurance links + hero hotspot → `/insurance`; removed the old `/insurance→/protect/insurance` redirect (reversed: `/protect/insurance`→`/insurance`). All `/insurance/*` routes 200. Homepage section padding tightened (was too airy — the "bare" note).

**Reference:** commit `1bc758ea5800dfd9301247e58f1b35de20112aaa` (2026-08-14) is the design reference for insurance + services pages, and the source for later plans/steward content. It lives in THIS repo's history — graft with `git -C <worktree> checkout 1bc758ea -- <paths>`.

**Next (in priority order):**
- **1e** — bring `/services` landing + `/services/[slug]` template into the new design (spec 11-section order, spec service colours). Currently old design but functional.
- **1f** — legal/contact/help pages + redirects (the-hearth→magazine, howa/how-it-works→how-it-works, professionals→house-approved-pro).
- **Phase 2** — Insurance & Cover (graft strip-back tree to `/insurance-and-cover`, introducer/Provenance), Magazine remap (`/the-hearth`→`/magazine`), House Offers full build, Shop restyle.

**Known temp/notes:** hero hotspots for housekeeping/home-and-garden/interiors land on coming-soon pages; nav Insurance→/protect + Magazine→/the-hearth until Phase 2 repoints; `.env.local` copied into worktree.

---

## 0. The governing idea (do not violate)

**"House of Willow Alexander is who we are. HoWA is what we use."**
House-first, services-first. HoWA is demoted to a quiet "Powered by HoWA" utility — never the identity, never a primary-nav peer, never "Start/Join HoWA". This is the single biggest theme and it **reverses the current codebase's HoWA-forward direction** (header CTA "Start HoWA", `/howa/*` tree, howa-unified rebuild).

Nav becomes: **Services · Insurance & Cover · Shop · Magazine · Offers · The House** (+ small "Powered by HoWA — How it works" utility).

---

## 1. DECISIONS — LOCKED 2026-08-17

1. **Build scope = PRESENTATION-FIRST.** Build the full House-first structure, nav, tokens, and all 44 page shells to spec, but wire commercial actions to the rails that already exist: **ServiceOS** behind the new BookingRail UI, **Provenance introducer/enquiry** for insurance (NOT the spec's bindable self-serve quote+payment), and **link out to the separate HoWA app** for My House / Home Record. The three owned engines (native booking, bindable quote, account dashboard) are deferred; UI is built so they can slot in later.
2. **Spec wins fully.** HoWA demoted to a "Powered by HoWA" utility credit everywhere. Nav = Services · Insurance & Cover · Shop · Magazine · Offers · The House. CLAUDE.md's locked labels ("Marketplace" for Shop, intent-led nav) and the Housekeeper/Steward tier ladder are **superseded for this rebuild**; consumer subscription framing collapses into House Offers per spec.
3. **Service set = all 10, feature-flag unlaunched.** Build all 10 discipline pages + colours to spec; feature-flag the not-yet-live ones (waitlist/enquiry, no dead nav) so services switch on individually. Gutter Cleaning folds under Window Cleaners (spec L782).

### Derived assumptions (flag if wrong)
- Insurance stays introducer-only (Provenance, FCA) — reuse strip-back's compliance/disclosure/Provenance layer as-is; `/insurance-and-cover/quote` is an **enquiry/get-a-quote handoff**, not a bindable purchase.
- My House nav item links to `NEXT_PUBLIC_HOWA_APP_URL` (the product app), not a dashboard built here.
- Booking CTAs open the existing ServiceOS flow (respect the `HOWA_APP_LIVE=false` → `/howa/coming-soon` fallback), dressed in the spec's BookingRail/"What needs doing?" UI.
- Consumer tiers (Housekeeper £16.99 / Steward) are NOT surfaced as a tier ladder; any recurring-care offer lives under House Offers / Steward Plans.

### Still open (needs user input before the relevant phase)
- **Brand assets in hand?** official service wordmarks (handwritten), floral pattern asset, Didot LT Pro + Effra licences, cabinet-hero artwork. Spec forbids approximating these in CSS/SVG (L211, L256, L1626, L1905). Until supplied: use what's in `AUG 17TH REDESIGN/HOUSE OF WA IMAGERY/`, tasteful placeholders elsewhere, and flag each gap.

---

## 2. Reuse strategy (base = main, graft insurance from stripback, net-new the rest)

| Area | Source | Confidence | Work |
|---|---|---|---|
| Global shell (Header/Footer/MegaMenu) | `main` | Med | Rework nav labels, demote HoWA, swap CTA → BOOK A SERVICE |
| Service landing + `/services/[slug]` template | `main` | Med-High | Apply spec 11-section order, colours, expand to chosen service set |
| Insurance & Cover pages + compliance layer | **`howa-stripback`** | Med | Best existing asset; reuse visual/Provenance/disclosure; quote flow may be new |
| Shop (landing/PLP/PDP/basket/checkout) | `main` (Shopify) | High | Restyle to spec card families; mostly functional reuse |
| The Hearth / magazine / article | `main` | Med-High | Route `/the-hearth`→`/magazine`; re-section to spec categories |
| How it works / Powered by HoWA | `main` `/howa/how-it-works` | Med | Reframe, move to `/how-it-works`, strip AI/OS language |
| House Approved Pro | `main`/`howa-unified` `/professionals` | Med | Rebrand application scaffolding |
| Search / Help / Contact / Legal | `main` | Med-High | Reuse; add grouped search, insurance-disclosures |
| Design tokens | rebuild from spec §25.1 | Med | Values differ from main; **10 service tokens are net-new** |
| CMS schemas | `main` `sanity/schemas/*` | Med | Extend to Offer, InsuranceProduct, HomepageIssue |
| **Booking rail + native 9-step flow** | **NET-NEW** | Low | Biggest build gap (neither ServiceOS nor enquiry matches) |
| **House Offers** (`/offers`) | **NET-NEW** | Low | No `/offers` on any branch; build OfferCard |
| **My House + Home Record** | **NET-NEW** (or separate app) | Low | Marketing-only today; authed dashboard is a gap |

---

## 3. Route inventory (44 routes, 6 pillars + system)

- **Home** `/`
- **Services** `/services/` + 10 detail pages (`gardeners, housekeeping, cleaners, window-cleaners, repairs-handyman, electrical-energy, removals, dog-walkers, home-and-garden, interiors`)
- **Insurance & Cover** `/insurance-and-cover/` + `home-cover, pet-cover, home-and-pet-cover, quote, help-and-claims`
- **Shop** `/shop/` + `category/[slug], product/[slug], basket, checkout`
- **Magazine** `/magazine/` + `house-and-home, garden, living-well, pets, article/[slug]`
- **Offers** `/offers/`
- **The House** `/the-house/`
- **System**: `/how-it-works/`, `/house-approved-pro/`, `/book/`, `/my-house/` (+7 sub-nav), `/search/`, `/help/`, `/contact/`
- **Legal**: `/legal/{privacy,cookies,terms,service-terms,insurance-disclosures,accessibility}`

Feature-flag anything not launch-live; no empty pages or dead nav.

---

## 4. Shared components + token layer (build first)

Token layer (spec §25.1) — House palette (`--house-cream #F3EEE3`, `--house-gold #BEA96A`, `--house-brown #30231C`, ink/chalk/stone) + 10 service tokens + radius/space. **These differ from current main globals; service tokens are net-new. No hardcoded hex in components.**

Components (spec §25.2): `HouseHeader, HouseFooter, MegaMenu, PoweredByHowa (3 sizes), HouseButton, ServiceColourLabel, PatternFrame, ServiceCard, EditorialCard, InsuranceCard, ProductCard, OfferCard, PostcodeField, AvailabilityPicker, BookingRail, TrustBand, HearthSpread, StoreEdit, FormStep, PriceSummary, ErrorSummary`.

---

## 5. Build phases (from spec §30)

**Phase 1 — Commercial foundation:** token layer + global shell → homepage (cabinet hero, booking rail, Hearth spread, Store/Offers, how-it-works, proof) → services landing → live service pages → booking flow → contact/help/legal → analytics instrumentation.

**Phase 2 — Protection & relationship:** Insurance & Cover pages + quote → My House + Home Record → transactional templates.

**Phase 3 — Culture & commerce:** Hearth CMS + articles → House Store + checkout → House Offers → contextual recommendations.

**Phase 4 — Network:** House Approved Pro + application/onboarding.

Do not block the service-booking release on future HoWA features.

---

## 6. Cross-cutting reconciliation work

- **Rebuild token layer** to spec values (House palette differs; 10 service tokens new).
- **Systematically demote HoWA** across nav, CTAs, copy (opposite of current trajectory).
- **Unify service slug↔name↔token↔count** across spec §2.1, §4.2, §5, §10 (the spec contradicts itself: 8 vs 10 services; `repairs-handyman` route vs "Repairs" name vs `--service-handyman` token).
- **Route remaps + redirects**: `/the-hearth`→`/magazine`, `/howa/how-it-works`→`/how-it-works`, `/professionals`→`/house-approved-pro`, `/shop`(Marketplace)→spec `/shop`, insurance tree→`/insurance-and-cover/*`.
- **Fill spec gaps**: insurance sub-pages, offer detail route, My House sub-routes, all legal content, desktop-vs-mobile nav taxonomy mapping (Do/Protect/Shop/Read/About).
- **Voice/copy**: sentence case, verb-led CTAs, ban-list ("ecosystem, synergy, AI-powered, seamless…"), keep the standing **no-em-dashes** rule.
- **Compliance gates** (before launch): insurance regulatory copy/FCA roles/underwriter naming/legal review; no review markup for undisplayed reviews.

---

## 7. Spec's own contradictions to resolve (from Reader 1)

Service count 8 vs 10; slug/name/token label inconsistency; homepage secondary CTA ("Get cover" vs "Explore the House"); desktop nav ≠ mobile groups (Offers has no mobile group); "The Useful List" has no route; insurance sub-pages under-specified; My House sub-routes absent from tree; legal pages have zero content spec; offer detail route missing; quote vs book flow overlap; `--service-interiors` == `--house-chalk` (#FFFDF8); "Home & Garden" naming used 3 ways.

---

_This plan is the working reference. Update it as decisions land._
