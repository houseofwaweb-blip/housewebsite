# House of Willow Alexander — Platform Build Plan

## North Star
A first-time visitor should be able to say, within five seconds:
"This is a premium House for design, care and protection, and HoWA is the system that helps me steward my home."

## Decision Rule
**The House** = the institution for effortless intelligent living.
**HoWA** = the stewardship system behind it.
Story lives in the House. Decision, configuration, booking, checkout and continuity sit inside HoWA.

---

## Architecture

### Stack
- **Framework:** Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **CMS:** WordPress (headless) via WPGraphQL + ACF Pro — existing content stays in WP
- **Auth:** Supabase Auth (email + magic link)
- **Database:** Supabase (Postgres) — home records, projects, bookings, companion data
- **Payments:** Stripe — HoWA plans, design packages, service bookings
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics + PostHog (event tracking for CTA paths)

### Content Strategy
- WordPress remains the CMS for editorial content (Journal/Hearth articles, page copy, portfolio images)
- WPGraphQL + WPGraphQL for ACF exposes all structured content
- Next.js fetches at build time (ISR) for public pages, on-demand for dynamic content
- Media served from WP media library or migrated to Vercel Blob/Cloudinary

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

### Mobile Menu (pinned order)
Start HoWA (button), The House, HoWA, Design, Services, Protect, Shop, Journal, Sign in, Book consultation

---

## Cut 1: Marketing Site + Auth + Plans (Weeks 1-3)

### Week 1: Foundations

#### Global Shell & Design System
- [ ] Tailwind config: typography scale, color tokens (House navy, warm cream, HoWA teal), spacing
- [ ] Font setup (likely a premium serif + clean sans)
- [ ] `<Header />` — desktop nav with mega-menu dropdowns, mobile hamburger, utility links, Start HoWA CTA
- [ ] `<Footer />` — House wordmark, nav links, contact, legal, social
- [ ] `<MobileMenu />` — slide-out with pinned CTA order
- [ ] `<PageShell />` — layout wrapper with header/footer, breadcrumbs
- [ ] Base components: `<Button />`, `<Card />`, `<SectionHeader />`, `<ProofStrip />`

#### WordPress Integration
- [ ] WPGraphQL client setup (graphql-request or urql)
- [ ] Content fetching utilities with ISR (revalidate: 3600)
- [ ] ACF field type mappings
- [ ] Image optimization pipeline (next/image with WP media URLs)

#### Routing Structure
```
src/app/
├── (marketing)/
│   ├── page.tsx                    # Homepage
│   ├── the-house/
│   │   └── page.tsx                # The House overview
│   ├── howa/
│   │   ├── page.tsx                # HoWA landing
│   │   ├── companion/page.tsx      # Companion explainer
│   │   └── plans/page.tsx          # Plans & Pricing
│   ├── design/
│   │   ├── page.tsx                # Design landing
│   │   ├── interiors/page.tsx      # Interior Design
│   │   └── gardens/page.tsx        # Garden Design
│   ├── services/
│   │   ├── page.tsx                # Services landing
│   │   └── plans/page.tsx          # House Plans
│   ├── protect/
│   │   ├── page.tsx                # Protect landing
│   │   ├── review/page.tsx         # Home Protection Review
│   │   └── insurance/page.tsx      # Insurance by the House
│   ├── shop/
│   │   └── page.tsx                # Shop landing
│   ├── journal/
│   │   ├── page.tsx                # Journal / The Hearth landing
│   │   └── [article]/page.tsx      # Article template
│   ├── search/page.tsx
│   ├── book-consultation/page.tsx
│   ├── contact/page.tsx
│   └── legal/page.tsx
├── (auth)/
│   └── sign-in/page.tsx
├── (app)/                          # Cut 2: HoWA dashboard
│   └── account/
└── layout.tsx
```

### Week 2: Homepage + Core Pages

#### Homepage (8 sections per spec)
1. **Hero** — "Beautiful living, intelligently stewarded." + Start HoWA / Explore the House CTAs
2. **Action Rail** — 4 cards: Use HoWA, Design a space, Book care, Protect the home
3. **House / HoWA Split** — Institution vs system explainer with 3 proof points
4. **Design & Care** — Editorial lead-in + two product cards (Design / Services)
5. **Protect** — Calm stewardship positioning, risk review + insurance as joined route
6. **Shop & Journal** — Taste and inspiration without e-commerce overload
7. **Proof Strip** — 3-5 trust signals (standards, partners, sustainability, press)
8. **Closing CTA** — "For homes with soul..." back to HoWA

#### The House Overview
- Philosophy, standards, House Approved, sustainability, about
- Editorial hero, trust marks, secondary nav to child pages

#### HoWA Landing (merge Welcome + Join)
- Product explainer: remembers, guides, protects, coordinates
- Dashboard preview mockup
- HoWA vs HoWA Steward architecture
- Plans CTA

#### HoWA Companion Page
- 3-step flow: tell us about the home → receive a House Plan → enter HoWA
- Inputs/outputs table
- Start diagnostic CTA

#### HoWA Plans & Pricing
- Plan comparison cards (HoWA free vs HoWA Steward)
- Feature comparison table
- Stripe Checkout integration for Steward subscription
- FAQ section

### Week 3: Commercial Pillars + Utility

#### Design Landing + Interiors + Gardens
- Design landing: editorial overview routing to interiors/gardens
- Interiors: designer story, package ladder (Room Edit / Full House Edit / Add-ons), HoWA brief builder below fold
- Gardens: parallel structure, designer collective, package ladder, garden brief builder
- Template pattern: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)

#### Services Landing + House Plans
- Services landing: introduce recurring + one-off care
- House Plans: Apartment/Essential/Comprehensive/Premium plan comparison, configure-in-HoWA CTA

#### Protect Landing + Review + Insurance
- Protect landing: calm prevention framing
- Home Protection Review: review → setup → ongoing plan structure, HoWA protection record
- Insurance by the House: coverage families, trust positioning, register interest/waitlist

#### Shop Landing
- Editorial merchandising (not marketplace grid)
- House Approved framing, seasonal edit, by room, by garden, gifts
- Links to existing WP/WooCommerce shop or placeholder

#### Journal Landing + Article Template
- The Hearth as editorial identity, Journal as nav label
- Featured story, category blocks, latest stories
- Article template: long-form reading, pull quotes, soft CTA into House/HoWA
- Public/premium content mix with elegant lock markers

#### Utility Pages
- Search results (tabbed by House, HoWA, Services, Shop, Journal)
- Book consultation form
- Contact page
- Legal/policy hub
- Sign in (Supabase Auth)
- 404

#### Auth + Stripe
- [ ] Supabase Auth setup (email + magic link)
- [ ] Sign in / sign up flow
- [ ] Stripe product + price setup (HoWA Steward monthly/annual)
- [ ] Checkout session creation API route
- [ ] Webhook handler for subscription events
- [ ] Basic account page showing plan status

---

## Cut 2: HoWA Product Layer (Weeks 4-8)

### Companion Diagnostic Flow
- Interactive guided questionnaire (home type, garden, style, budget, priorities)
- Context captured to Supabase (home profile draft + design brief)
- Recommendation engine: service rhythm, product curation, seasonal prompts, design direction
- Output: personalized House Plan created in HoWA

### Dashboard
- Tasks, records, plans, protection, orders
- "What needs attention" and "Home record" views
- Active plan display, next scheduled service
- Protection log and evidence

### Projects
- Design projects: files, milestones, calls, decisions, shoppable recommendations
- Service projects: provider history, scheduling, budget tracking
- Protection projects: review history, verification schedule, reminders

### Account
- Household profile, property details, garden profile
- Subscription management (Stripe Customer Portal)
- Notification preferences

---

## Template System

Every commercial landing page follows a 3-layer pattern:

| Layer | What it does | Owner |
|-------|-------------|-------|
| Top | Editorial framing, brand confidence, proof, imagery | House |
| Middle | Package cards, recommendations, provider selection, pricing | HoWA |
| Bottom | Account continuity, dashboard preview, FAQs, next steps | HoWA |

### Reusable Templates
1. **Global Shell** — header, nav, footer, breadcrumbs, CTA rail
2. **Homepage** — hero, action rail, split explainer, proof strip
3. **House Landing** — editorial hero, philosophy blocks, trust marks
4. **HoWA Product Landing** — product explainer, system proof, plans CTA
5. **Companion Template** — diagnostic explainer, intake flow, outcomes
6. **Plans & Pricing** — pricing cards, feature comparison, FAQ, sign-up
7. **Commercial Landing** — editorial top, package middle, HoWA bottom
8. **Service Detail** — service story, scope, pricing, booking module
9. **Design Detail** — portfolio proof, packages, intake module, consultation CTA
10. **Protect Detail** — calm prevention, plan options, evidence, register interest
11. **Journal Landing** — featured story, categories, latest, sign-up
12. **Article Template** — long-form reading, pull quote, next story, CTA

---

## Redirect Map (from current WP site)

| Current | New | Action |
|---------|-----|--------|
| Welcome to HoWA | /howa | Merge into one landing |
| Join HoWA | /howa/plans | Remove as separate page |
| House Companion | /howa/companion | Keep + simplify |
| House Plans | /services/plans | Move under Services |
| Interior Design | /design/interiors | Keep + refine |
| Garden Design | /design/gardens | Keep + refine, remove from top nav |
| Home Protection & Risk Reduction | /protect/review | Rewrite for calm prevention |
| Insurance by the House | /protect/insurance | Keep + soften |
| Your Home & Garden Marketplace | /shop | Rename to Shop |
| The Hearth Magazine | /journal | Journal in nav, Hearth as editorial brand |

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
- Start rate on Companion / HoWA onboarding
- Conversion from category page to structured journey
- Bounce rate from header and mobile menu
- Stripe: trial starts, conversions, churn

---

## Open Decisions
1. **Font selection** — which premium serif + sans pairing? (Need to match existing brand or evolve?)
2. **HoWA Steward naming** — stays inside Plans until signed off, not in primary nav
3. **Primary header CTA** — "Start HoWA" vs "Book consultation" (docs recommend Start HoWA)
4. **Shop backend** — keep WooCommerce via headless, or migrate to Shopify/Stripe?
5. **Companion diagnostic** — rule-based or AI-powered? (Cut 2 decision)
6. **Media hosting** — keep WP media library or migrate to Cloudinary/Vercel Blob?
