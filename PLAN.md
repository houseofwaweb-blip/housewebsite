# House of Willow Alexander — Marketing Site Build Plan

## North Star
A first-time visitor should be able to say, within five seconds:
"This is a premium House for design, care and protection, and HoWA is the system that helps me steward my home."

## Scope
**Marketing site only.** The HoWA product (dashboard, Companion diagnostic, auth, billing) is being built separately by another team. This plan covers the public-facing website: navigation, homepage, all category/detail pages, journal, shop landing, and utility pages. CTAs that route into the HoWA product will link out to the product app when ready.

## Decision Rule
**The House** = the institution for effortless intelligent living.
**HoWA** = the stewardship system behind it.
Story lives in the House. Decision, configuration, booking, checkout and continuity sit inside HoWA.

---

## Architecture

### Stack
- **Framework:** Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **CMS:** WordPress (headless) via WPGraphQL + ACF Pro — existing content stays in WP
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics (+ PostHog if needed for CTA path tracking)

### Content Strategy
- WordPress remains the CMS for all editorial content (page copy, Journal articles, portfolio images, designer profiles)
- WPGraphQL + WPGraphQL for ACF exposes all structured content as GraphQL
- Next.js fetches at build time with ISR (revalidate on publish)
- Media served from WP media library via next/image optimization
- Copy that exists on the current willowalexander.co.uk site is migrated via WP, not hardcoded

---

## Information Architecture

### Primary Navigation (intent-led, 7 items)
| Label | Route | Purpose | CTA |
|-------|-------|---------|-----|
| The House | /the-house | Brand doorway — philosophy, standards, proof, about | Explore |
| HoWA | /howa | Product doorway — what HoWA is, Companion, plans, pricing | Start HoWA |
| Design | /design | High-consideration — interiors, gardens, studios | See design |
| Services | /services | Recurring + one-off care — plans, booking | Book care |
| Protect | /protect | Protection + insurance — risk review, prevention | Protect home |
| Shop | /shop | Curated commerce — House Approved objects | Shop |
| Journal | /journal | Editorial — The Hearth, guides, case studies | Read |

### Header
- Left: House of Willow Alexander wordmark
- Right utility: Search, Sign in, Book consultation
- Primary button: **Start HoWA**
- Sign in + Start HoWA link to the external HoWA product app

### Mobile Menu (pinned order)
Start HoWA (button), The House, HoWA, Design, Services, Protect, Shop, Journal, Sign in, Book consultation

---

## Routing Structure

```
src/app/
├── page.tsx                        # Homepage
├── the-house/
│   └── page.tsx                    # The House overview
├── howa/
│   ├── page.tsx                    # HoWA landing (merged Welcome + Join)
│   ├── companion/page.tsx          # Companion explainer
│   └── plans/page.tsx              # Plans & Pricing
├── design/
│   ├── page.tsx                    # Design landing
│   ├── interiors/page.tsx          # Interior Design
│   └── gardens/page.tsx            # Garden Design
├── services/
│   ├── page.tsx                    # Services landing
│   └── plans/page.tsx              # House Plans
├── protect/
│   ├── page.tsx                    # Protect landing
│   ├── review/page.tsx             # Home Protection Review
│   └── insurance/page.tsx          # Insurance by the House
├── shop/
│   └── page.tsx                    # Shop landing
├── journal/
│   ├── page.tsx                    # Journal / The Hearth landing
│   └── [slug]/page.tsx             # Article template
├── search/page.tsx
├── book-consultation/page.tsx
├── contact/page.tsx
├── legal/page.tsx
├── not-found.tsx                   # 404
└── layout.tsx                      # Root layout with global shell
```

---

## Build Plan

### Week 1: Foundations

#### Design System & Global Shell
- [ ] Tailwind config: typography scale, color tokens (House navy, warm cream, HoWA teal accents), spacing scale
- [ ] Font setup — match existing brand (premium serif + clean sans)
- [ ] `<Header />` — desktop mega-menu with dropdowns per nav spec, mobile hamburger, utility links, Start HoWA button
- [ ] `<Footer />` — House wordmark, full nav links, contact info, legal links, social
- [ ] `<MobileMenu />` — slide-out drawer with pinned CTA order from spec
- [ ] Base components: `<Button />`, `<Card />`, `<SectionHeader />`, `<ProofStrip />`, `<PackageCard />`, `<ActionRail />`

#### WordPress Integration
- [ ] GraphQL client setup (graphql-request)
- [ ] Content fetching helpers with ISR
- [ ] ACF field type mappings for structured page content
- [ ] next/image loader config for WP media URLs
- [ ] Type generation from WP GraphQL schema

### Week 2: Homepage + Brand & Product Pages

#### Homepage (8 sections per spec)
1. **Hero** — "Beautiful living, intelligently stewarded." + Start HoWA / Explore the House CTAs
2. **Action Rail** — 4 cards: Use HoWA, Design a space, Book care, Protect the home
3. **House / HoWA Split** — Institution vs system explainer with 3 proof points
4. **Design & Care** — Editorial lead-in + two product cards (Design / Services)
5. **Protect** — Calm stewardship positioning, risk review + insurance as joined route
6. **Shop & Journal** — Taste and inspiration, House Approved objects + one editorial story
7. **Proof Strip** — 3-5 trust signals (standards, partners, sustainability, press)
8. **Closing CTA** — "For homes with soul, proper care should never be left to memory alone."

#### The House Overview
- Editorial hero, philosophy, standards, proof/case studies, sustainability, about
- Trust marks, secondary nav to child content

#### HoWA Landing (merge Welcome + Join into one page)
- Product explainer: remembers, guides, protects, coordinates
- Dashboard preview (static mockup or illustration)
- How it works: 3-step flow
- HoWA vs HoWA Steward (core system vs premium layer)
- CTA: Start HoWA (links to product app) + See Plans

#### HoWA Companion Explainer
- What the Companion does (diagnostic engine, not the interactive flow itself)
- Inputs: home type, garden, style, budget, priorities
- Outputs: service rhythm, curation, seasonal prompts, design direction
- CTA: Start with the Companion (links to product app)

#### HoWA Plans & Pricing
- Plan comparison cards
- Feature comparison table
- FAQ
- CTA: links to product app sign-up flow

### Week 3: Commercial Pages + Utility

#### Design Landing + Interiors + Gardens
- **Design landing:** editorial overview, routes to interiors and gardens
- **Interiors:** designer profile, portfolio proof, package ladder (Room Edit / Full House Edit / Add-ons), consultation CTA
- **Gardens:** parallel structure, designer collective, package ladder (Concept / 2D+3D / Planting / Lighting), garden brief CTA
- All follow template pattern: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)

#### Services Landing + House Plans
- **Services landing:** introduce recurring + one-off care, route to plans and individual services
- **House Plans:** Apartment / Essential / Comprehensive / Premium comparison cards, what's included, CTA into HoWA

#### Protect Landing + Review + Insurance
- **Protect landing:** calm prevention framing, route to review and insurance
- **Home Protection Review:** what we look at, how it works, recorded in HoWA, book a review CTA
- **Insurance by the House:** coverage families (home, garden, boundaries, pets), why it feels different, register interest

#### Shop Landing
- Editorial merchandising: seasonal edit, by room, by garden, gifts
- House Approved framing
- Links to existing WooCommerce shop (or placeholder cards if migrating later)

#### Journal Landing + Article Template
- Journal as nav label, The Hearth as editorial brand
- Featured story, category blocks (Colour & Materials, Design & Architecture, Gardens, Heritage, Interiors, Trends), latest stories
- Article template: premium long-form reading, pull quotes, related articles, soft CTA back into House/HoWA
- Public + premium content markers (elegant lock icons, not blank slabs)

#### Utility Pages
- **Search:** tabbed results across House, HoWA, Services, Shop, Journal
- **Book consultation:** structured form (service type, dates, postcode, notes)
- **Contact:** phone, email, location
- **Legal:** policy hub with secondary nav
- **404:** brand-safe recovery with redirect options

---

## Template System

Every commercial landing page follows a 3-layer pattern:

| Layer | What it does | Owner |
|-------|-------------|-------|
| Top | Editorial framing, brand confidence, proof, imagery | House |
| Middle | Package cards, recommendations, provider selection, pricing | HoWA |
| Bottom | Dashboard preview, FAQs, next steps, links into HoWA product | HoWA |

### Reusable Page Templates
1. **Global Shell** — header, nav, footer, breadcrumbs
2. **Homepage** — hero, action rail, split explainer, cards, proof strip
3. **House Landing** — editorial hero, philosophy blocks, trust marks
4. **HoWA Product Landing** — product explainer, system proof, plans CTA
5. **Companion Explainer** — diagnostic explainer, inputs/outputs, CTA
6. **Plans & Pricing** — pricing cards, feature comparison, FAQ
7. **Commercial Landing** — editorial top, package middle, HoWA bottom
8. **Design Detail** — portfolio proof, packages, intake CTA
9. **Protect Detail** — calm prevention, plan options, evidence, register interest
10. **Journal Landing** — featured story, categories, latest
11. **Article Template** — long-form reading, pull quote, next story, CTA
12. **Utility** — search, form, legal text layouts

---

## Redirect Map (from current WP URLs)

| Current Page | New Route | Action |
|-------------|-----------|--------|
| Welcome to HoWA | /howa | Merge into one landing |
| Join HoWA | /howa/plans | Remove as separate page |
| House Companion | /howa/companion | Keep as explainer |
| House Plans | /services/plans | Move under Services |
| Interior Design | /design/interiors | Keep + refine |
| Garden Design | /design/gardens | Keep, remove from top nav |
| Home Protection & Risk Reduction | /protect/review | Rewrite for calm prevention |
| Insurance by the House | /protect/insurance | Keep + soften |
| Your Home & Garden Marketplace | /shop | Rename to Shop |
| The Hearth Magazine | /journal | Journal in nav, Hearth as editorial brand |

---

## Integration Points with HoWA Product

These CTAs and links will point to the separately-built HoWA product app:
- **Start HoWA** (header, homepage, multiple pages) → product app onboarding
- **Sign in** → product app auth
- **Start with the Companion** → product app diagnostic flow
- **Book / Pay Now** on design packages → product app checkout
- **Configure your plan** on House Plans → product app plan configuration
- **Book a review** on Protect → product app booking
- **Register interest** on Insurance → product app waitlist

These should be configured as environment variables so the product app URL can be updated without code changes.

---

## Copy Rules
- Use the language of stewardship, continuity, memory and calm intelligence
- Avoid: "manage your admin", "marketplace", "all-in-one app", "instant", alarm-heavy wording
- When a page moves from story to choice, the design should visibly tighten and become HoWA-like
- Every meaningful journey must end in a next state inside HoWA, not an email thread

---

## Metrics (from day one)
- Homepage click-through rate into HoWA
- Path split across HoWA, Design, Services and Protect
- Conversion from category page to structured journey (click to product app)
- Bounce rate from header and mobile menu
- Journal engagement: read depth, next-article clicks
- Search usage and top queries

---

## Open Decisions
1. **Font selection** — match existing brand or evolve? Need the serif + sans pairing
2. **HoWA Steward naming** — stays inside Plans until signed off, not in primary nav
3. **Primary header CTA** — "Start HoWA" vs "Book consultation" (briefs recommend Start HoWA)
4. **Shop backend** — link to existing WooCommerce, or headless WooCommerce, or placeholder?
5. **Media hosting** — keep serving from WP media library or set up Cloudinary/Vercel Blob?
6. **HoWA product app URL** — what domain/subdomain will the product live on?
