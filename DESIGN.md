# Design System — House of Willow Alexander

**Version:** v2 (2026-04-15) — supersedes DESIGN.v1.md
**Purpose:** Single source of truth for the visual system, UX principles, component library, interaction states, user flows, voice, accessibility, and the bank of reusable mechanics we've developed across the design sessions.

Read before making any visual or UX decision. In QA, flag any code that doesn't match this doc.

---

## Contents

- [Part A — Foundations](#part-a--foundations)
- [Part B — UX principles](#part-b--ux-principles)
- [Part C — Component library](#part-c--component-library)
- [Part D — Interaction states](#part-d--interaction-states)
- [Part E — User flows](#part-e--user-flows)
- [Part F — Voice & microcopy](#part-f--voice--microcopy)
- [Part G — Accessibility](#part-g--accessibility)
- [Part H — Mechanics library](#part-h--mechanics-library)
- [Part I — Decisions log](#part-i--decisions-log)

---

# Part A — Foundations

## Product context

A premium British home-stewardship institution. Two brands in one system.

- **The House of Willow Alexander** — the institution: taste, trust, editorial authority.
- **HoWA** — the stewardship system: memory, context, continuity.
- **The Hearth** — the editorial brand within the House (published at `/journal`).

The website is the public surface. Every CTA that feels like a decision, a configuration, a payment, or continuity lives in the separate HoWA Product app.

**Peers, aesthetically:** House & Garden, The Gentlewoman, Soho House Journal, Farrow & Ball, Daylesford, Cereal.
**Not our peers:** generic marketplace apps, smart-home gadget brands, contractor directories.

## The dual personality — three visual modes

The brand has two primary registers, plus one premium mode. Every surface uses one of these.

### House mode *(finished room)*

| | |
|---|---|
| **Background** | `house-cream` `#f5f0e8` |
| **Headlines** | Cormorant Garamond / Didot LT Pro Bold — high-contrast serif |
| **Body** | Cormorant Garamond 18–19px, generous leading |
| **Spacing** | Generous (80–128px between sections) |
| **Tone** | Poetic, editorial, unhurried |
| **Pattern** | White on cream, `soft-light` blend, 50% opacity — always as frame |
| **CTAs** | Outlined brown, transparent background |

Where it lives: homepage aspirational sections, `/the-house` and children, `/journal` article reading surfaces, closing CTAs on commercial pages.

### HoWA mode *(tracing layer)*

| | |
|---|---|
| **Background** | `house-white` `#faf8f4` or `howa-paper` `#f4efe4` |
| **Headlines** | Jost / Effra Std — precise sans |
| **Body** | Jost 16–17px, tighter leading |
| **Spacing** | ~20% tighter than House (56–96px between sections) |
| **Tone** | Calm, precise, assistive |
| **Pattern** | White on navy 4%, or none |
| **CTAs** | Filled gold (primary) · teal ghost (secondary) |

Where it lives: `/howa` landing page and children (except `/howa/steward`), packages and tier cards (HoWA and HoWA+ cards), Companion explainer, account shell, any surface where the user is configuring or deciding.

### Steward mode *(blueprint)*

| | |
|---|---|
| **Background** | `howa-navy-deep` `#151e2b` |
| **Headlines** | Jost, lighter weight on dark |
| **Accents** | `house-gold-light` `#d4af5a` on navy |
| **Texture** | Blueprint grid, 40px repeat, gold 6% opacity |
| **Linework** | Architectural technical drawings, cream/gold strokes |
| **Tone** | Control, monitoring, telemetry |
| **CTAs** | Outlined cream on navy, or filled gold |

Where it lives: `/howa/steward` landing page, HoWA Steward surfaces only. Predictive maintenance, device integration, insurer-adjacent views. **Never** on public pages outside of `/howa/steward` or a Steward tier card preview.

## The transition moment *(the signature UX pattern)*

When a page moves from House territory (editorial, story, aspiration) into HoWA territory (packages, configuration, action), the visual language shifts visibly:

- Background: cream → white
- Headlines: Didot → Effra
- Spacing: ~20% tighter
- CTAs: outlined → filled gold
- Cards: borderless → bordered
- Pattern: frame → absent

This shift sits as a discrete section on every commercial page. The visitor feels the room change. This is the brand's defining UX pattern — treat it as a first-class component, not an afterthought (see [`<HouseToHowaTransition>`](#commercial-components) in Part C).

## Typography

**Display / Headlines:** Didot LT Pro Bold — institutional serif, heritage authority, high contrast.
**Body / UI:** Effra Std Regular — calm, clear sans. The utility voice.
**Dev fallback** (until licence confirmed): Cormorant Garamond + Jost from Google Fonts.

Self-hosted via `next/font/local`. Files in `/public/fonts/`.

### Scale (desktop)

| Token | Size | Font | Weight | Line height | Use |
|---|---|---|---|---|---|
| `display-xl` | 96–128px | Didot / Cormorant | 500 | 0.95 | Editorial mastheads (Hearth, the-house manifesto) |
| `display` | 56–72px | Didot | 700 | 1.05 | Homepage hero |
| `h1` | 44px | Didot | 700 | 1.1 | Page titles |
| `h2` | 32px | Didot | 700 | 1.2 | Section heads |
| `h3` | 24px | Didot | 700 | 1.25 | Card titles (House) |
| `h4` | 20px | Effra | 400 | 1.3 | Subsections (HoWA territory) |
| `body-lg` | 18px | Effra | 400 | 1.7 | Article body, hero subtext |
| `body` | 16px | Effra | 400 | 1.6 | Default body |
| `body-sm` | 14px | Effra | 400 | 1.5 | Nav, metadata, captions |
| `caption` | 12px | Effra | 400 | 1.4 | Timestamps, legal |
| `eyebrow` | 11–12px | Effra | 400 | 1.2 | Uppercase, letter-spacing 0.22em |

### Scale (mobile)
`display` → 40px, `h1` → 28px, `h2` → 24px, `h3` → 20px. Body sizes unchanged.

### Italic `<em>` accent *(locked brand mannerism)*

Italicise one or two key words in every headline. Creates a reading rhythm, not ornament. Examples: *"The home, **finally** known."* / *"On the art of **quiet protection**."* / *"Rooms that **settle** into themselves."*

Never italicise the whole headline. Never more than two words.

## Colour

Restrained. Gold is the only accent. Colour is rare and meaningful.

### House palette

| Token | Hex | Usage |
|---|---|---|
| `house-brown` | `#30231c` | Primary text, dark backgrounds, footer |
| `house-gold` | `#b8943e` | Decorative gold only: pattern, thin rules, ornamental borders. Never for text <18px or filled button backgrounds (fails AA at 2.7:1 on light bgs) |
| `house-gold-dark` | `#8a6f2e` | Accessible gold for text, filled button backgrounds (`btn-gold`), links. 5.16:1 on white, 4.82:1 on cream — passes AA |
| `house-gold-light` | `#d4af5a` | Hover state for gold elements, Steward accent on navy |
| `house-cream` | `#f5f0e8` | House section backgrounds |
| `house-cream-dark` | `#ebe4d6` | Borders, dividers, subtle backgrounds |
| `house-white` | `#faf8f4` | Page background, HoWA section backgrounds |
| `house-stone` | `#a09885` | Decorative separators and borders only. NEVER for body text at any size (2.7:1 on light bgs — fails AA). For muted body text, use `house-brown` at 70% opacity instead |
| `house-moss` | `#5a6b4a` | Garden accents, `live` state |
| `house-black` | `#1d1d1b` | Maximum contrast (Hearth masthead) |

### HoWA palette

| Token | Hex | Usage |
|---|---|---|
| `howa-navy` | `#1e2a3a` | HoWA hero backgrounds, featured plan cards |
| `howa-navy-deep` | `#151e2b` | Steward blueprint mode |
| `howa-teal` | `#3a7d7e` | HoWA links and accents at ≥18px only. At <18px on light backgrounds, use `howa-teal-dark` instead (4.48:1 fails AA normal text) |
| `howa-teal-dark` | `#2d6364` | Accessible teal for eyebrows, small text (<18px). 5.8:1 on white — passes AA |
| `howa-paper` | `#f4efe4` | Tracing-layer parchment backgrounds |
| `howa-light` | `#f0f4f3` | Optional HoWA light backgrounds |

### Semantic palette

| Token | Hex | Usage |
|---|---|---|
| `success` | `#5a6b4a` | Moss. Confirmation, positive states, `live` badge |
| `warning` | `#c4922a` | Amber. Review needed, `coming soon` badge |
| `error` | `#8b3a3a` | Muted red. Attention needed. Never alarm-red |
| `info` | `#3a7d7e` | Teal. Helpful context, `register interest` badge |

**No dark mode.** Dark moments (navy sections, Steward) are composed within the light design, not a system-level switch.

## Spacing

Base unit 8px. Comfortable (House), tightening to moderate (HoWA).

Scale: `4 / 8 / 16 / 24 / 40 / 64 / 96 / 128px`.

- House territory between sections: 96 or 128px
- HoWA territory between sections: 64 or 96px
- Steward territory: 56 or 72px

Rule of thumb: when in doubt, go larger.

## Layout & grid

- Max content width `1200px` for most pages; `1400px` for editorial/Hearth; `1100px` for long-form article.
- Article reading width `680px`.
- **`0px` border-radius everywhere.** Sharp corners. Heritage/institutional. No exceptions.
- 12-column grid at desktop, 8-column at tablet, 4-column at mobile.

### Breakpoints

| | Width | Behaviour |
|---|---|---|
| Mobile | 0–767px | Single column, hamburger menu, pinned CTAs |
| Tablet | 768–1023px | 2-column grids collapse, mega-menu → dropdown |
| Desktop | 1024px+ | Full layout |

## Pattern

The hand-drawn floral pattern is the House's institutional signature. Treat it with reverence.

### Rules

1. Never full colour. Always linework.
2. Always gold, white, or black for the House.
3. Let it breathe. Never cramped.
4. Frame, never filler. Border, gesture, quiet envelope.
5. Not decoration. Identity.

### Implementation

- Scale ~350% of the pattern's natural tile size (1050–1750px `background-size`).
- **Gold on brown/dark:** pseudo-element overlay with `opacity: 0.15`. No blend modes (contrast too high for text).
- **White on cream:** `background-blend-mode: soft-light` with `opacity: 0.5`.
- **White on navy:** pseudo-element with `opacity: 0.04`.

### Where to use

Homepage (hero corner + closing CTA), `/the-house/philosophy` hero, `/howa` hero, `/journal` article drop-caps, footer, HoWA navy section surrounds.

**Banned from:** plan comparison cards, shop category grids, partner cards, form surfaces, data-heavy pages. Anywhere the pattern fights content, it loses.

### Files

- `brand-assets/patterns/WA-Gold flower pattern-02.png`
- `brand-assets/patterns/white-pattern-alpha-op.png`

## Motion

Intentional. Not minimal, not expressive. Purposeful movement that reinforces hierarchy.

| | |
|---|---|
| Easing | enter `ease-out` · exit `ease-in` · move `ease-in-out` |
| Duration | micro 100ms · short 200ms · medium 250ms · long 300ms |
| Buttons | Lift 1px, 200ms ease-out |
| Cards | Lift 3–4px with shadow, titles shift to gold |
| Ghost link underline | Solid → dotted, 300ms |
| Mega-menu | 150ms slide-down |
| Page transitions | View Transitions API where supported, instant fallback |
| Scroll-linked | Subtle parallax on homepage hero only. No entrance animations on text |
| Reading progress | 2px gold bar below sticky header on article pages |

Honour `prefers-reduced-motion: reduce` — replace all transitions with `0ms`, keep opacity changes only.

## Photography direction

Cinematic, candid, textural. Celebrating care, craft, and calm.

- Warm natural light with visible shadow and depth
- No digital gloss
- No over-staged lifestyle
- Every frame feels like a scene from a home lived in beautifully
- Keywords: natural light, layered materials, stillness, craftsmanship, warmth, British timelessness
- Product images: 3:4 portrait

---

# Part B — UX principles

The ideas that govern every decision. When in doubt, re-read.

## 1. Don't make me think

Every page is self-evident. If a user stops to wonder *what is this?* or *where do I click?*, we've failed. Self-evident beats self-explanatory beats *requires-explanation*.

## 2. Clicks don't matter — thinking does

Three mindless, unambiguous clicks beat one click that requires thought. Each step feels like an obvious choice, not a puzzle.

## 3. Users scan, they don't read

Design for scanning: visual hierarchy, clearly defined areas, headings, bullets, highlighted key terms. We're designing billboards going by at 60 mph, not brochures.

## 4. The goodwill reservoir

Every user arrives with a reservoir of patience. Every friction point drains it.

**What drains it:**
- Hiding info users want (pricing, contact, shipping, availability)
- Formatting requirements on user input (phone numbers, postcodes)
- Asking for unnecessary information
- Splash screens, forced tours, interstitials
- Unprofessional appearance
- Dead-end CTAs (e.g. Start HoWA when the product isn't live)

**What refills it:**
- Making the obvious thing obvious
- Telling them what they want to know upfront
- Saving them steps
- Forgiving errors gracefully
- Apologising when we should

## 5. Navigation wayfinding — the trunk test

Cover everything except the navigation. The user should still be able to answer:
1. What site is this?
2. What page am I on?
3. What are the major sections?
4. Where am I in the hierarchy?
5. How do I search?
6. How do I go home?

If they can't, the nav has failed. Every page passes this test.

## 6. The House → HoWA transition is the signature moment

The shift from editorial to structured is the brand's defining UX pattern. It should feel like *walking from the living room to the study.* Every commercial page stages it deliberately. Never half-done. Never absent.

## 7. Progressive disclosure

Show the minimum to make the next action obvious. Defer detail until asked. Applies to: plan comparison (summary first, features on hover/click), FAQ accordions, service details, article paywalls.

## 8. Mobile discipline

Real estate is scarce on mobile, but never sacrifice usability for space. Touch targets ≥ 44px. Hover-to-discover is banned (mobile has no hover). Flat design strips visual cues — put them back with shape, shadow, and position.

## 9. Clarity beats consistency

If making something significantly clearer requires a small inconsistency, pick clarity. (Rare exception to the component library, not a licence to freestyle.)

## 10. When NOT to use

- **Modals** — only for destructive confirmation. Never for content, never for onboarding. Content goes on a page.
- **Tooltips** — only for truly optional, non-critical context. Never for required information.
- **Carousels** — only for shop product images. Never for editorial content or key messaging.
- **Auto-playing video** — never.
- **Hamburger menus on desktop** — only if the nav genuinely needs hiding. Ours doesn't.
- **Infinite scroll** — only for Journal feed (pagination OK). Never in shop.
- **Popup newsletter signups** — never. They get a proper band, not an ambush.

---

# Part C — Component library

Every reusable piece of the site. Built once, used everywhere.

## Primitives

### Buttons

| Variant | Style | Use |
|---|---|---|
| `btn-gold` | Filled `house-gold-dark` (#8a6f2e), white text | Primary CTA in HoWA territory. Uses accessible gold (5.16:1 contrast) |
| `btn-outline` | Transparent, brown border, brown text | Primary CTA in House territory |
| `btn-outline-light` | Transparent, cream border | On navy/dark backgrounds |
| `btn-navy` | Filled `howa-navy`, cream text | Rare — HoWA featured actions |
| `btn-teal` | Filled `howa-teal`, white text | HoWA secondary emphasis |
| `btn-ghost` | Transparent, gold underline | In-content links, "Read more →" |

All buttons: `0px` border-radius, 14px, letter-spacing 0.16em, padding `13px 26px`, transition `all 200ms ease-out`. Lift 1px on hover.

### Inputs

| Type | Style |
|---|---|
| Text / email | Cream bg, 1px brown border, Jost 14px, 11px padding, no border-radius |
| Hero search (postcode, search) | Larger — Cormorant 22–28px, 2px bold border, dark submit button inline |
| Form textarea | Same as text, min-height 120px |
| Select | Custom chevron, no native styling |
| Checkbox / radio | 14px square, brown border, gold fill when checked |

All inputs: visible focus ring (2px gold outline, offset 2px). Placeholder text is *italic Cormorant* — elegant but never substitutes for a label (see [accessibility](#part-g--accessibility)).

### Rules & ornaments

- `hr-thin` — 1px `rgba(48,35,28,0.12)` — section dividers
- `hr-bold` — 1px `house-brown` — mastheads, colophons
- `hr-double` — 3px double `house-brown` — editorial divisions (Hearth, The House manifesto)
- `hr-gold` — 1px `house-gold` — quiet accent, transition markers
- `ornament-roman` — italic Roman numeral (`II`, `III`) between editorial sections
- `ornament-dots` — `· · ·` centred, `house-gold` — poetic transitions

### Eyebrow / kicker

Small-caps sans label that sits above a headline.

| | |
|---|---|
| Font | Jost 11px, weight 400 |
| Letter-spacing | 0.22em |
| Colour | Context-dependent — `house-gold-dark` for editorial, `howa-teal-dark` for HoWA sections, `house-brown` at 70% opacity for metadata. Never `house-stone` (fails AA) |
| Spacing | 14–24px below, never less than headline it labels |

## Navigation components

### `<Header />` *(global shell)*

- Left: HoWA Main Logo SVG (black on light pages, white on dark, gold for occasional editorial moments). Links home.
- Centre: 7 primary nav items — The House · HoWA · Design · Services · Protect · Shop · Journal. Uppercase, Jost 11px, letter-spacing 0.18em. Opacity 0.72, full on hover. Active route: full opacity + 500 weight.
- Right: Search icon, Sign in link (bounces to HoWA Product), Start HoWA button (gold-filled).

Sticky, 76px min-height. Background matches page mode (cream / white / navy).

### `<MobileMenu />`

Full-screen drawer, slide-in from right, 250ms ease-out. Pinned order:
1. Start HoWA (gold button, top)
2. The House
3. HoWA
4. Design
5. Services
6. Protect
7. Shop
8. Journal
9. Sign in
10. Book consultation

Close via X button top-right or swipe-right gesture. Nav items are 18px Cormorant, generous 24px vertical spacing.

### `<PageHeader />`

Every non-homepage route renders this. Provides the trunk-test answer *"what page am I on"*:

- Eyebrow (category or section label)
- H1 (the page's title)
- Optional dek (one-line description)

Consistent wherever it appears.

### `<Breadcrumbs />`

On routes ≥ 2 levels deep (`/howa/plans`, `/design/interiors`, `/partners/[slug]`, `/journal/[slug]`). Format: `The House / HoWA / Plans`. Jost 11px, italic separator, final item bold.

### `<AnchorTOC />`

On long single-page reads (e.g. `/the-house` D variant's "Rooms"). Sticky or inline, depending on context. Jumps to section with smooth scroll, respects reduced-motion.

### `<CategoryStrip />` *(editorial)*

The filter/category row on `/journal`. Horizontal list of small-caps sans labels, active one gold-underlined. Becomes a scrollable row on mobile.

## Editorial components *(Hearth)*

Defined in the locked `/journal` Variant A.

### `<PromoStrip />`

Thin black band at top of page. Dark bg, cream text, small-caps sans. Used for HoWA+ callouts, new product announcements, seasonal notes.

### `<HearthMasthead />`

Small centered "THE / Hearth" wordmark with tagline. Sits below global header. Never the giant "Hearth" across the whole fold (rejected in v1 review).

### `<HeroLead />`

4:3 image left, editorial text block right.
- Cat-tag (eyebrow): `Category / Type` (e.g. *"Gardens & Exteriors / Feature"*)
- H1 (Cormorant 42–68px)
- Dek (Cormorant italic 19px, stone colour)
- Byline (Jost 11px with Cormorant italic name)

### `<SecondaryLeads />` *(3-column)*

Three stories in a row below the hero. Equal weight. Image + cat-tag + h2 + dek + byline.

### `<PopularList />` *(Hearth signature sidebar)*

Sticky. Thick black top rule. Label *"Most Popular this week"*. Numbered 1–5, each row: `[num] [body: cat-tag + h5] [72×72 thumbnail]`.

### `<NewsletterBand />`

Two variants:
- **Inline** (sidebar): `howa-paper` bg, tracing-line texture, compact email form
- **Full-width black** (page footer): `house-black` bg, centred layout, headline + dek + wide form

### `<CollectionBand />`

Mid-page full-width band with `house-cream-dark` background. Split layout: editorial copy + 2:1 image lockup. Used for "The Hearth Collection", partner features, sponsored series.

### Editorial primitives in articles

- `<DropCap>` — first letter 48px Cormorant italic gold
- `<PullQuote>` — 32px Cormorant italic, centred, gold rules top+bottom
- `<Marginalia>` — 13px Cormorant italic notes in 3-column layout sidebars
- `<Colophon>` — running footer with issue/date/brand
- `<Folio>` — page-level metadata row at top of masthead

## Commercial components

### `<ActionRail />` *(homepage)*

4-card horizontal row — *Use HoWA · Design a space · Book care · Protect the home.* Each card: eyebrow + h3 + one-sentence dek + Read More →. Gold hairline on top border, becomes full line on hover. No card-boxes.

### `<PackageLadder />` *(design, services)*

Three-card row. Middle card is `featured` — elevated, navy bg, cream text, gold `RECOMMENDED` ribbon above. Each card: eyebrow (Tier label) + h4 + price + `for` italic + inclusions list + CTA.

### `<PlanComparison />` *(services, howa/plans)*

Four columns, one per tier. Middle tier featured. Same structure as `<PackageLadder>` but scaled for longer feature lists + plan-specific CTAs.

### `<TierCard />` *(the three-mode HoWA signature)*

Three variants, visually differentiated per brief §5.3:

- **`tier-howa`** — parchment `howa-paper` bg, visible tracing-layer line grid (CSS repeating-gradient), white preview box with dashed dividers, brown linework. *"Free forever."*
- **`tier-howaplus`** — cream bg, gold border, raised with drop-shadow, `RECOMMENDED` ribbon, photographic preview (home imagery), warm gold accents. *"£16.99 / month."*
- **`tier-steward`** — `howa-navy-deep` bg, gold blueprint grid overlay, cream/gold type, CSS-rendered radial gauge ("House Health 91") as preview. Gold "Coming soon" badge. *Premium care.*

### `<HouseToHowaTransition />`

Full-width transition band. Gradient background from `house-cream` to `house-white`. 1px gold vertical rule at centre (28px tall, 18px below). Single line of italic Cormorant copy, optionally with small-caps pull-out (*"The House introduces. HoWA configures."*).

Stages the transition on every commercial page. Non-optional.

### `<CoverageTile />` *(protect)*

Image + body lockup (1:1 ratio). Image left, editorial body right. Cat-tag, h4, dek, bulleted coverage list, gold-underlined CTA link.

### `<ServiceTile />` *(services landing)*

Vertical stack: image (4:5 portrait), cat-tag, h3, italic promise, meta row (price + rhythm), CTA link.

## State primitives

### `<StateBadge />`

Small pill indicating product state. Three variants (plus reserved `live`):

| Variant | Border + text | Icon | Use |
|---|---|---|---|
| `coming` | `house-gold` | `●` | Coming soon — Protect Review, Steward, future launches |
| `interest` | `howa-teal` | `◈` | Register-interest — Insurance, waitlisted products |
| `live` | `house-moss` | `✓` | Live now — Protect Plan, any active product |
| `soon` | grey/50% opacity | — | Muted "coming soon" for tier cards |

Jost 10px, letter-spacing 0.2em, uppercase, 4px × 10px padding.

### `<WaitlistMini />`

Inline waitlist form. Row of `[email input] [Join/Register button]`. Used inside coverage tiles, Protect family panels, Hearth HoWA+ callouts.

Writes to Supabase `waitlist_interests` table with product enum (`steward / protect_review / insurance / other`).

### `<HoWAPlusTag />`

Tiny inline badge next to bylines / card labels indicating gated content. `◆ HoWA+` — gold, 9px Jost, letter-spacing 0.22em. Never a full-width gate.

## Diagnostic / interactive mechanics

See [Part H — Mechanics library](#part-h--mechanics-library) for the full catalogue. Components that may become React primitives:

- `<CompanionStep />` — live-ish step widget with progress, question, options, Continue
- `<RhythmDiagram />` — services cadence grid (Weekly / Seasonal / On-demand)
- `<SchematicHotspot />` — clickable home cutaway with side panel
- `<RecordFlow />` — 3-step arrow diagram
- `<ProcessLine />` — bubble-connector sequence
- `<AlmanacGrid />` — 12-month calendar grid
- `<PostcodeHero />` — search-driven page entry

## Forms

### `<PostcodeInput />`

Hero-scale. 2px solid `house-brown` border, Cormorant 28px input, uppercase letter-spacing 0.08em, inline dark `Read the home →` submit. Auto-validates UK postcode on blur. Shows hint row below: *"Or try: W11 · SE3 · CV8 · BA1"*.

### `<EmailWaitlist />` (see `<WaitlistMini />`)

### `<BookingForm />`

Structured form for `/book-consultation`. Fields: name, email, phone, postcode, service type (select), preferred dates, notes. Submits to Supabase `consultation_bookings`.

### `<BriefBuilder />` (HoWA hand-off)

5-step widget that captures design brief. Shown live on `/design/interiors` v2 hero. Internally captures: property, scope, style, budget, recommendation. Final step bounces to HoWA Product with context param.

### `<ContactForm />`

Standard contact form. Fields: name, email, subject (select), message, source-page (hidden). Submits to Supabase `contact_submissions`.

## Commerce components

### `<ProductCard />`

3:4 portrait image, hover scale 1.02. Tags below: `House Approved` seal where applicable. H4 (Cormorant), price (Jost), optional "care notes" toggle. Single-click add-to-cart with optimistic UI.

### `<PDPLayout />`

Two-column: image gallery left (3:4 primary + thumbnails below), buy column right. Buy column: category eyebrow, H1, price, description (Sanity `editorialCopy`, not Shopify admin description), add-to-cart, `care notes` accordion, `linked partner` / `linked service` if present.

### `<CartItem />`

Row: thumbnail, name + variant, qty stepper, line total, remove X. Editable qty with optimistic update.

### `<CheckoutHandoff />`

Simple transition: "Continuing to Shopify checkout..." with brief pause, then redirect to Shopify's hosted checkout URL. Shopify checkout themed with brand fonts/colours via Shopify Checkout Editor.

---

# Part D — Interaction states

Every interactive element has these states. Designed once, used everywhere.

## The states matrix

| State | When | Visual cue |
|---|---|---|
| **Default** | Resting | Base style |
| **Hover** | Pointer over (desktop only) | Subtle lift, colour shift, or underline |
| **Focus** | Keyboard focus | 2px gold outline, 2px offset. Never remove this. |
| **Active** | Mousedown / keypress | Darker tint, no lift |
| **Visited** | Link previously clicked | Slightly dimmed (`opacity: 0.7`) |
| **Disabled** | Not currently actionable | 40% opacity, cursor `not-allowed`, no hover |
| **Loading** | Async in flight | Skeleton pulse (editorial) or spinner (form submit) |
| **Success** | Async resolved, positive | Moss check + brief toast / inline message |
| **Error** | Async failed | Muted red message + retry option |
| **Empty** | No data to render | Calm message + primary action |

## Component-level specifics

### Buttons

- **Hover:** lift 1px, colour shifts (gold → gold-light, brown → cream-filled)
- **Focus:** gold outline, offset
- **Active:** pressed-in, no lift
- **Disabled:** 40% opacity, no transition
- **Loading:** text replaced with `· · ·` animated dots (700ms), button width preserved

### Links

- **Default:** underlined (3px offset), brown or gold depending on context
- **Hover:** underline morphs from solid to dotted (300ms)
- **Visited:** slightly dimmed
- **Focus:** gold outline box

### Cards

- **Hover (House card):** lift 4px, shadow `0 12px 40px rgba(48,35,28,0.1)`, title to gold
- **Hover (HoWA card):** lift 3px, subtle shadow
- **Focus:** 2px gold outline, offset
- **Loading:** skeleton pulse — 16px `house-cream-dark` blocks where content will appear, 1.5s fade
- **Empty (filtered to zero):** *"Nothing here in this category yet. Try [other category]."* — ghost-link CTA back to all

### Forms

- **Default:** fields unfilled, submit disabled if required empty
- **Validating (on-blur):** spinner in field, 600ms debounce
- **Field error:** muted red border (not bright red), inline message below field ("We need a valid postcode, something like W11 1NH"), error persists until field reblurred
- **Form-level error:** banner above form, "*Something's off here — we've been notified.*", retry button
- **Submitting:** submit button loading state, fields locked
- **Success (inline):** form replaced with moss-coloured confirmation block, *"That's with us. We'll reply on Thursday."*, link to continue browsing
- **Success (redirect):** on nav-like form (booking, checkout), brief confirmation then redirect to success page

### Async content

- **Loading:** skeleton that matches final content shape (not a generic spinner). Hold for min 300ms even if data returns faster (prevents flash).
- **Stale (ISR):** no visible state change — user gets the cached version, webhook revalidates in background
- **API down (Shopify / Sanity):** show warm cached fallback if possible. If not, show *"We're having trouble loading this — try again in a minute."* with reload button. Never blank page.

### Cart (Shopify)

- **Empty:** *"Your basket is quiet for now. Start here →"* with link to `/shop`
- **Adding:** inline success toast in top-right corner, auto-dismiss after 3s, with "View basket" link
- **Quantity change:** optimistic UI, revert on error
- **Updating (server):** subtle inline spinner next to line item

### Journal article — HoWA+ paywall

When user hits a gated article without membership:
- First ~30% of article renders normally (fade to cream at bottom)
- Gate section below: `HoWA+ tag`, H3 *"Continue reading with HoWA+"*, 3-line benefit list, "Join HoWA+ — £16.99/month" button + "Already a member? Sign in" link
- No pop-up, no overlay. A soft wall, not a slam.

---

# Part E — User flows

The journeys that carry commercial weight. Each flow specifies entry, success path, failure paths, what writes to the database, what shows on screen.

## Flow 1 — Start HoWA

**Entry:** any Start HoWA CTA on the site (homepage hero, action rail, header button, closing CTAs).

**Happy path:**
1. User clicks Start HoWA
2. Browser navigates to `NEXT_PUBLIC_HOWA_APP_URL` with `?source=<page>` param
3. HoWA Product app handles onboarding, Companion, account creation
4. After completion (outside our scope), user returns to our site with active account

**Fallback path** (HoWA Product not yet live, env flag `HOWA_APP_LIVE=false`):
1. User clicks Start HoWA
2. Middleware routes to `/howa/coming-soon`
3. Page shows: Hearth-style editorial explainer, HoWA product preview, `<EmailWaitlist>` with product=`steward`
4. Write to Supabase `waitlist_interests`, send transactional confirmation email
5. Header CTA label swaps to "Book consultation" site-wide

**Analytics events:** `cta_click` (label, position), `howa_journey_start` (source, intent)

---

## Flow 2 — Book a service

**Entry:** `/services/*`, service tile, Book care CTA

**Happy path:**
1. User browses `/services` landing → selects discipline (Gardening, Cleaning, Window Cleaning, Gutter Cleaning)
2. Either one-off (`Book →` CTA) or plan (`Start a plan`)
3. One-off: HoWA Product booking flow
4. Plan: `<BriefBuilder>` Companion → HoWA Product checkout

**Service not available in postcode:**
- Postcode captured during booking
- If out of area: *"We're not quite in your postcode yet — join the waitlist and we'll let you know."* → Supabase waitlist

**Analytics events:** `cta_click`, `howa_journey_start` (intent=`service-<type>`)

---

## Flow 3 — Read a Hearth article (free + HoWA+ gated)

**Entry:** `/journal`, category nav, search, social referral

**Free article path:**
1. User clicks article tile
2. Article renders full at `/journal/[slug]`
3. Reading progress bar fills as they scroll
4. At 90% scroll, fire `journal_read_complete` event
5. Footer shows "Continue reading" suggestions — next 3 articles in same category

**HoWA+ gated path:**
1. User clicks article with `◆ HoWA+` tag
2. First ~30% renders fully
3. Paywall block appears inline (no modal): benefits list, `Join HoWA+ — £16.99/month` CTA (to HoWA Product), `Already a member? Sign in` link
4. If signed in as HoWA+ member (detected via cookie from HoWA Product): full article renders, no gate

**Analytics events:** `journal_read_complete`, `cta_click` (if paywall engaged), `howa_journey_start` (if member signup)

---

## Flow 4 — Shop a product (Shopify)

**Entry:** `/shop`, editorial Collection band, Hearth article "shop this" CTA

**Happy path:**
1. User browses `/shop` or category
2. Clicks a `<ProductCard>` → `/shop/product/[slug]`
3. PDP renders: Shopify product data + Sanity `editorialCopy` + care notes
4. User clicks Add to cart → optimistic UI, cart cookie created, success toast
5. User clicks View basket → `/shop/cart`
6. User clicks Checkout → brief `<CheckoutHandoff>` → redirect to Shopify hosted checkout (themed)
7. After Shopify checkout success → redirect to `/shop/thank-you` with order ID

**Out of stock:**
- PDP shows `Sold out` badge, Add to cart replaced with `Notify me when available` → Supabase waitlist entry

**Failed add-to-cart:**
- Toast *"Couldn't add that just now — try again?"*, no cart state change

**Analytics events:** `shop_view_product`, `shop_add_to_cart`, `shop_checkout_start`

---

## Flow 5 — Design brief builder

**Entry:** `/design/interiors`, `/design/gardens`, Start a brief CTAs

**Happy path:**
1. User lands on `/design/interiors` → sees designer (Jessica), packages, brief-builder module
2. User starts `<BriefBuilder>` (inline, not modal)
3. Step 1 — Property (type, rooms, postcode)
4. Step 2 — Scope (which rooms, full house)
5. Step 3 — Style (taste)
6. Step 4 — Budget (range)
7. Step 5 — Recommendation (system suggests package + designer match)
8. CTA: Continue to HoWA → bounce to HoWA Product with brief data serialised in URL

**User abandons mid-flow:**
- Progress saved to `localStorage` for 14 days
- Return to page shows *"Pick up where you left off — step 3 of 5"* banner

**Analytics events:** `cta_click` per step, `howa_journey_start` on completion

---

## Flow 6 — Protect register-interest (Insurance)

**Entry:** `/protect`, `/protect/insurance`, Insurance family panel, coverage tile

**Happy path:**
1. User reads `/protect/insurance`
2. Clicks `Register interest` CTA (coverage family or inline `<WaitlistMini>`)
3. If inline: email captured, write to Supabase `waitlist_interests` with product=`insurance`, dispatch confirmation email
4. Inline success: form replaced with *"You're on the list. We'll write when cover opens in your area."*
5. Full form route (`/protect/register-interest`): more detail captured — name, postcode, property type, existing cover

**Regulatory constraint:**
- Copy must not give advice or compare policies
- Footnote visible: *"HoWA acts as an introducer only. Insurance products arranged via Provenance Insurance Brokers, authorised and regulated by the FCA. Phase 1: register-interest only."*

**Analytics events:** `form_submit` (form_type=`waitlist`, product=`insurance`)

---

## Flow 7 — Book consultation

**Entry:** header utility link, footer, `/book-consultation`, any "Book consultation" CTA

**Happy path:**
1. User clicks Book consultation
2. `/book-consultation` renders `<BookingForm>`
3. Fields: name, email, phone, postcode, service type (Design / Services / Protect / General), preferred dates (multi), notes
4. Submit → Supabase `consultation_bookings`, dispatch email to house inbox + confirmation email to user
5. Success: replace form with confirmation block + calendar ICS download

**Analytics events:** `form_submit` (form_type=`consultation`)

---

## Flow 8 — Partner profile

**Entry:** `/partners`, `/partners/[slug]`, Hearth article byline, `/design/studios`

**Happy path:**
1. User lands on `/partners/[slug]` (e.g. Jessica Durling-McMahon)
2. Reads profile: portfolio, bio, specialties, House Approved seal, service areas
3. Clicks `Select in HoWA` or `Start a brief with [partner]`
4. Bounces to HoWA Product with `?partner=<slug>` query — brief-builder pre-fills designer

**Out of service area:**
- If user is known postcode and partner doesn't cover: inline note *"[Partner] works across London & the Home Counties — register interest if you're outside."* + waitlist form

**Analytics events:** `partner_view`, `howa_journey_start` (intent=`design`, partner=slug)

---

## Flow 9 — Postcode check (Protect variant A)

**Entry:** `/protect` hero

**Happy path:**
1. User enters postcode in `<PostcodeInput>`
2. Page state updates (no navigation — AJAX) with regional results:
   - Flood zone, conservation area, listed status, TPO status (Environment Agency API + Historic England)
   - Plan availability ("live in W11")
   - Review opening date ("Opens May 2026 in W11")
   - Insurance waitlist scoped to area
3. User can continue with `Start a Plan`, `Join Review waitlist`, `Register for Insurance` — postcode context carries into HoWA Product / Supabase writes

**Invalid postcode:**
- Inline error: *"That doesn't look like a UK postcode — something like W11 1NH?"*

**API unavailable:**
- Fall back to simpler page state: standard Protect family panel without regional detail, preserve postcode for later

**Analytics events:** `cta_click` (postcode submit), `howa_journey_start`

---

## Flow 10 — Search

**Entry:** header search icon, `/search`

**Happy path:**
1. User clicks search icon — `/search` page (not a modal)
2. Input auto-focused, placeholder *"Search the House"*
3. User types — results appear live (debounced 300ms), tabbed by: The House · HoWA · Design · Services · Protect · Shop · Journal
4. Each result: eyebrow (type) + h4 + one-line dek + category tag
5. Click → canonical route

**No results:**
- *"Nothing quite like that yet. Try [related terms] — or browse [popular categories]."* + 3 editorial picks

**Search powered by:** Sanity GROQ query for editorial content, Shopify Storefront API for products, combined server-side into tabbed payload.

**Analytics events:** `search_query` (query, result_count)

---

## Flow 11 — 404 recovery

**Entry:** any invalid URL

**Happy path:**
1. `/not-found` renders
2. Parses `original_path` from referrer or URL
3. Runs fuzzy matching against Sanity redirect table + route list (Levenshtein distance ≤ 3)
4. If close match found: *"Did you mean [match]?"* with big link
5. Always show: "Or try — " with 3 closest category matches + homepage link
6. Soft, not apologetic. Brand-consistent tone.

**Analytics events:** `404_hit` (original_path, referrer)

---

# Part F — Voice & microcopy

The voice rules, per context. Apply across all surfaces.

## The register

**Warm authority.** Spoken by someone who owns a House, not by a company selling to you. Confident without shouting. Refined without distance. Specific and literary where possible.

Reference: House & Garden editor's letter. Cereal magazine captions. The Gentlewoman features. Rowan Coleman-Smith, not BuzzFeed.

## Tone by surface

| Surface | Tone | Example |
|---|---|---|
| Homepage hero | Declarative, short | *"The home, finally known."* |
| The House pages | Literary, patient | *"Ownership is passive. Stewardship is intentional."* |
| HoWA pages | Precise, calm, confident | *"The living record of the home."* |
| Service detail | Specific, practical | *"Twice-yearly gutter clearance with a pre-winter check."* |
| Hearth article | Essayistic, unhurried | *"The houses that fail, fail slowly."* |
| Form labels | Direct, helpful | *"Your email"*, not *"Please enter your email address"* |
| Button microcopy | Active verb + context | *"Start HoWA"*, *"Book a review"*, *"Join HoWA+"* |
| Error messages | Warm, never blame user | *"Something's off here — we've been notified. Try again?"* |
| Empty states | Invitational | *"Nothing here yet. Try [alternative]."* |
| Confirmations | Quiet, trust-building | *"That's with us. We'll reply on Thursday."* |

## Button microcopy library

| Context | Copy |
|---|---|
| Start the HoWA product flow | `Start HoWA` or `Start HoWA — Free` |
| See plans page | `See plans` |
| Book a one-off service | `Book gardening` (service-specific) |
| Start recurring plan | `Start a plan` |
| Enter editorial | `Read the piece` / `Continue the piece →` |
| Join HoWA+ membership | `Join HoWA+ — £16.99/month` |
| Register interest (waitlist) | `Register interest` / `Join the waitlist` |
| Secondary / ghost CTA | `See plans` / `Explore the House` / `Meet the designer` |
| Pay now (design package) | `Configure in HoWA →` |
| Book consultation | `Book a consultation` |
| Download / save | `Download the almanac` |
| Continue reading gated article | `Continue reading with HoWA+` |

## Error messages

| Type | Message |
|---|---|
| Form field invalid | *"We need a valid [field], something like [example]."* |
| Form submit failed | *"Something's off here — we've been notified. Try again?"* + retry button |
| Shopify API down | *"We're having trouble loading this — try again in a minute."* |
| Payment declined | *"That didn't go through. Try another card, or [contact link]."* |
| Page not found | *"That's not a page yet. Did you mean [guess]?"* |
| Permission denied | *"This one's for HoWA+ members. [Join link] or [Sign in link]."* |

Never: *"Error 500"*, *"Oops!"*, *"Something went wrong"*, *"An error has occurred"*.

## Empty states

| Context | Message |
|---|---|
| Filtered to zero (Journal) | *"Nothing here in [category] yet. Try [sister category] or [all]."* |
| Cart empty | *"Your basket is quiet for now. [Start in Shop →]"* |
| Search no results | *"Nothing quite like that yet. Try [term] — or browse [3 picks]."* |
| Partner portfolio empty | *"New work is in preparation. Subscribe to be notified."* |

## Confirmations

| Action | Copy |
|---|---|
| Consultation booked | *"That's with us. We'll reply on [day]."* |
| Waitlist joined | *"You're on the list. We'll write when [product] opens in your area."* |
| Newsletter signed up | *"Welcome to The Hearth. The first letter arrives Friday."* |
| Order placed | *"Thank you. Order [N] — we'll send tracking soon."* |
| Account created (HoWA Product echo) | *"Your home now has a record. [Continue to HoWA]"* |

## Words we never use

From the canonical brief §5.3 + session additions:

- *marketplace* (use Shop)
- *manage your admin*
- *all-in-one app*
- *instant* / *instantly*
- *hassle-free*
- *solutions* (generic)
- *revolutionary* / *cutting-edge*
- *unleash* / *unlock your potential*
- Alarm-heavy wording (*"Don't let your home...!"*)
- Self-congratulatory company speak

---

# Part G — Accessibility

**Commitment: WCAG 2.1 AA on every public page.** Audited pre-launch with axe-core. Any failure blocks the cutover.

## Focus management

- Visible focus ring on every interactive element — 2px `house-gold` outline, 2px offset. Never `outline: none` without replacement.
- Logical tab order — follows document order, skip decorative elements (`tabindex="-1"` on images without links).
- Skip-to-content link at top of every page, keyboard-only visible, jumps past header.
- Modals / dialogs (reminder: we use these sparingly) trap focus while open, return focus to trigger on close, close on `Escape`.

## Keyboard navigation

- All interactive elements reachable via Tab / Shift-Tab.
- Dropdowns: arrow keys move, Enter selects, Escape closes.
- Sidebar anchors: Tab, Enter activates smooth-scroll to section.
- Forms: Enter submits if on submit button or last field; Tab moves between fields.
- Carousel (shop only): left/right arrow keys navigate, Space pauses autoplay if any.

## Screen reader

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` used correctly.
- Heading hierarchy: one `<h1>` per page, no skipped levels.
- Icon buttons have `aria-label` (e.g. search icon `aria-label="Search the site"`).
- Form fields always have visible `<label>` linked by `for`/`id`. Placeholder never substitutes for a label.
- Decorative images `alt=""`. Content images have descriptive `alt`.
- Images in Hearth articles have captions, not just alt.
- Live regions (`aria-live="polite"`) for async updates (cart add confirmation, form validation, search results).

## Colour contrast

Minimums (WCAG AA):
- Body text ≥ 4.5:1
- Large text (18px+ or 14px+ bold) ≥ 3:1
- UI components (borders, focus rings) ≥ 3:1

### Passing combinations

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| `house-brown #30231c` | `house-cream #f5f0e8` | 13.4:1 ✓ | Primary text on cream |
| `house-brown #30231c` | `house-white #faf8f4` | 14.3:1 ✓ | Primary text on white |
| `house-brown #30231c` | `howa-paper #f4efe4` | 13.2:1 ✓ | Primary text on parchment |
| `house-brown` 70% opacity | `house-white` | ~5.5:1 ✓ | Muted body text (replaces `house-stone`) |
| `house-cream #f5f0e8` | `house-brown #30231c` | 13.4:1 ✓ | Inverted text |
| `house-cream #f5f0e8` | `howa-navy-deep #151e2b` | 14.8:1 ✓ | Body text on Steward surfaces |
| `house-gold-dark #8a6f2e` | `house-white` | 5.2:1 ✓ | Gold text, links, button bg |
| `house-gold-dark #8a6f2e` | `house-cream` | 4.8:1 ✓ | Gold text on cream |
| `white #ffffff` | `house-gold-dark #8a6f2e` | 5.2:1 ✓ | Button text on accessible gold |
| `house-gold-light #d4af5a` | `howa-navy-deep` | 8.1:1 ✓ | Gold accent on navy |
| `house-gold #b8943e` | `howa-navy-deep` | 5.9:1 ✓ | Gold on navy (passes at any size) |
| `howa-teal-dark #2d6364` | `house-white` | 5.8:1 ✓ | Teal eyebrows, small text |
| `howa-teal #3a7d7e` | `house-white` | 4.5:1 ✓ | Teal links at ≥18px only |

### Failing combinations (do not use)

| Foreground | Background | Ratio | Why it fails |
|---|---|---|---|
| `house-stone #a09885` | any light bg | 2.5–2.7:1 | Fails AA entirely. Never for text. |
| `house-gold #b8943e` | any light bg | 2.5–2.7:1 | Fails AA entirely. Decorative only. |
| `white #ffffff` | `house-gold #b8943e` | 2.9:1 | Fails AA. Use `house-gold-dark` for buttons. |
| `howa-teal #3a7d7e` | any light bg | 4.2–4.5:1 | Fails normal text (<18px). Use `howa-teal-dark`. |

### Rules

- Never use `house-stone` for text at any size — use `house-brown` at 70% opacity for muted text
- Never use `house-gold` for text or filled buttons — use `house-gold-dark`
- `house-gold` is for decorative elements only: pattern overlays, thin rules, ornamental borders
- Teal text below 18px must use `howa-teal-dark` (#2d6364), not `howa-teal`
- Minimum font size for any text: 11px. Steward gauge axis text must be ≥11px (not 9px)

## Motion preferences

Respect `prefers-reduced-motion: reduce`:
- Page transitions → instant
- Hover lifts → opacity only
- Scroll-linked parallax → disabled
- Reading progress bar → still shows (static position update)
- Card hover shadows → disabled

## Touch targets

- Minimum 44×44px (iOS HIG) for all taps on mobile
- Inline text links: 44px tap area even if visual is smaller (padding)
- Navigation items have generous vertical padding on mobile (`py-4` minimum)

## Forms

- Every field has a visible label (never placeholder-only).
- Required fields marked with `*` in label + `aria-required="true"`.
- Error messages linked via `aria-describedby`.
- Success messages announced via `aria-live="polite"`.
- Never disable submit until form validates — instead, show errors on submit attempt.

---

# Part H — Mechanics library

Sixteen reusable design mechanics developed across the exploration. Each is a first-class design primitive — catalogued with when-to-use / when-not-to.

## 1. Three-mode tier system *(paper / brand / blueprint)*

**What:** Three visually differentiated tier cards representing HoWA (free, tracing-layer) / HoWA+ (warm brand mode) / Steward (blueprint mode).

**Use when:** displaying HoWA product tiers, plan comparison, or any three-level progression where each level has a distinct character.

**Don't:** apply to service plans — those use the standard `<PackageLadder>` (essential/comprehensive/premium).

## 2. Rooms-as-metaphor IA *(anchor TOC)*

**What:** A page structured as a tour of named "rooms" (Drawing Room, Library, Workshop, Garden, Study), with an anchor-linked TOC at the top.

**Use when:** the content has a natural spatial narrative. The House page's "Rooms of the House" variant.

**Don't:** force the metaphor onto pages with flat content (e.g. services, plans). It only works when the rooms are genuinely distinct.

## 3. Cadence rhythm diagram

**What:** Row-grouped service chips organised by frequency (Weekly / Seasonal / On-demand).

**Use when:** showing recurring services where cadence is the primary organising principle. `/services` variant D.

**Don't:** use for one-off services or where cadence doesn't vary.

## 4. Connector-bubble process line

**What:** Horizontal connector line with numbered bubbles marking each step (Review → Plan → Insurance).

**Use when:** communicating a sequential family with three to five stages. `/protect` family overview.

**Don't:** more than five stages — use a numbered list or ToC instead.

## 5. State badges

**What:** Small pill badges indicating product state — `coming soon` (gold) / `register interest` (teal) / `live` (moss).

**Use when:** any surface mentions an unreleased or in-beta product. Inline, not modal.

**Don't:** use on commercial primary CTAs (where state should be implicit in the button copy). Limit to 1–2 states per page.

## 6. Record-flow diagram

**What:** Three-step arrow diagram showing how an input flows through HoWA and produces an output (Review → Plan → Insurance).

**Use when:** explaining the HoWA value chain on a single page. `/protect` variant D, `/howa` four-verbs.

**Don't:** use for linear product journeys — use the process line instead.

## 7. Live Companion step widget

**What:** A hero-level step widget showing the Companion in action (progress bar, question, options, Continue button).

**Use when:** a commercial page needs to make HoWA feel tangible in the hero, not just as a downstream link. `/design/interiors` variant D, any brief-builder hook.

**Don't:** show on pages without a real Companion flow behind it — it's a commitment to functionality, not a mockup.

## 8. Annotated-house tracing layer

**What:** Illustrated cross-section or elevation of a home with hand-drawn annotations pointing at parts ("Roof — 8 yrs remaining", "Boiler — 14 days").

**Use when:** illustrating HoWA's "living record" concept. Homepage, /howa, /protect — the visual signature of the brand.

**Don't:** overuse. If every page has it, it loses power.

## 9. Search-driven postcode hero

**What:** Postcode input as the primary page interaction, reconfiguring the page based on the user's area.

**Use when:** page content varies meaningfully by geography. `/protect` variant A, future `/services` variant.

**Don't:** use where geography doesn't change the answer (`/the-house`, `/howa`, Journal).

## 10. 12-month calendar grid

**What:** 12-column grid, one cell per month, colour-coded tasks per cell.

**Use when:** content is genuinely seasonal and tied to a calendar rhythm. `/protect` almanac, potentially `/services` plans.

**Don't:** force on content without a real monthly rhythm.

## 11. Interactive clickable schematic

**What:** Illustrated home cutaway with hoverable / clickable hotspots revealing content per element.

**Use when:** the content has a clear spatial mapping (Protect, Services by part of home). `/protect` variant C.

**Don't:** use without real hover/click behaviour — it's a functional commitment.

## 12. Magazine long-form with marginalia

**What:** Full long-form article layout with drop-cap opening, pull-quotes, 3-column layout with left/right marginalia, footnotes.

**Use when:** Hearth articles, long editorial pieces on brand pages (The House variant A manifesto).

**Don't:** use on commercial pages — too slow a pace for conversion-oriented content.

## 13. Newspaper 8-col grid

**What:** 8-column grid with varied spans (span-2 / span-3 / span-4), rule lines between stories.

**Use when:** dense editorial content with varied weight (Hearth Nameplate variant, future category pages).

**Don't:** use on commercial pages — feels printed and slow for action-oriented reading.

## 14. Numbered magazine ToC

**What:** Classic magazine inside-front-matter layout. Roman-numeral entries, page numbers (or read-times), byline + dek per entry.

**Use when:** an issue-based or curated list where each entry deserves equal weight. Hearth Contents Page variant.

**Don't:** mix with cards — ToC is typography-only.

## 15. Quarterly issue architecture

**What:** The journal organised by issues, not categories. Full-bleed cover per issue, "In this issue" rubric below, past-issues bookshelf.

**Use when:** treating the Hearth as a quarterly magazine (vs. rolling feed). Hearth Season variant.

**Don't:** mix with rolling content — commit to one or the other.

## 16. Linear scrolled reading-column

**What:** No grid, no cards. Each story a full horizontal spread stacked vertically, with drop-cap lede, cue image, continue-reading link. Reading progress cue in margin.

**Use when:** slow, meditative editorial reading. Hearth Reading Room variant.

**Don't:** use where scanning or filtering matters more than immersion.

---

# Part I — Decisions log

Append-only. Every decision with date + rationale.

| Date | Decision | Rationale |
|---|---|---|
| 2026-03-31 | Fonts: Didot LT Pro Bold + Effra Std Regular | From Almanac. Self-hosted, no external dependency |
| 2026-03-31 | Colour: restrained, gold-only accent | Almanac: "organic, never synthetic" |
| 2026-04-01 | Border radius: 0px everywhere | Heritage/institutional authority. Deliberate departure from rounded trend |
| 2026-04-01 | Cards: editorial (House) vs text-forward (HoWA) | Avoids generic card grid. Gold accent line is signature |
| 2026-04-01 | Pattern scale: 350% | Reads as individual botanical elements, not tight weave |
| 2026-04-01 | Gold on brown: 15% opacity overlay | Blend modes too high contrast for text readability |
| 2026-04-01 | Ghost link: solid → dotted underline on hover | Distinctive micro-interaction matching "intelligent restraint" brand |
| 2026-04-01 | Article width: 680px | Optimal line length for Effra at 18px body |
| 2026-04-01 | Product images: 3:4 portrait | Shows objects better than square |
| 2026-04-01 | House→HoWA transition: full shift | Bg + type + spacing + CTA style all change. The brand's defining visual pattern |
| 2026-04-15 | /journal locked as Variant A (H&G model) | Promo strip + small Hearth wordmark + category strip + big-image lead + Most Popular sidebar + Collection band + full-width black newsletter |
| 2026-04-15 | Three-mode tier system locked (paper / brand / blueprint) | Per canonical brief §5.3. HoWA tracing layer / HoWA+ warm brand / Steward blueprint are three distinct visual systems |
| 2026-04-15 | State badges locked (coming / interest / live) | Reusable primitive introduced on /protect, applies to Steward, Review, Insurance, and future phased products |
| 2026-04-15 | Italic `<em>` accent rule locked | One or two words italicised per headline; never more. Creates reading rhythm |
| 2026-04-15 | Design novelty rule | Variants must introduce a new mechanic, not rearrange the hero template. Mechanics bank tracked in Part H |
| 2026-04-15 | DESIGN.md v2 published | Extended from v1 to include UX principles, interaction states, user flows, voice, accessibility, mechanics library. Single source of truth |
| 2026-04-15 | Playground interactions locked | All 16 micro-interactions approved: timings (350–750ms), `ease-settle` curve for toggles, zoom-in on radio/checkbox, slide-reveal validation, gold-underline-draw on inputs, postcode button reworked (no bg swap), card hairline rule, horizontal transition ornament (no stray vertical), search hover slow-slide, mega nav slide+fade with staggered content, accordion grid-row animation |
| 2026-04-15 | /journal locked as Variant A | House & Garden UK model adapted. See `ux/08-hearth-magazine/approved.json` |
| 2026-04-15 | 5 reviews run (Eng, Data, Security, A11y, SEO) | 70+ findings integrated into PLAN.md §15 + this decisions log. Split into pre-code / pre-launch / post-launch phases |
| 2026-04-15 | Paywall schema pattern locked | HoWA+ gated articles emit `CreativeWork` with `isAccessibleForFree=False` + `hasPart/WebPageElement/cssSelector=.paywall-hidden`. Follows Google flexible-sampling pattern — avoids cloaking flag |
| 2026-04-15 | LocalBusiness + Service schema required | `/contact` emits `LocalBusiness` with full NAP + hours + geo. `/services/*` emits `Service` + `serviceArea` (postcodes). Google Business Profile linked to 14 Willow Lane |
| 2026-04-15 | 301 redirect map = pre-launch blocker | Zero 404s allowed on any URL with existing backlinks. Screaming Frog crawl of WP site → Sanity redirect docs → served via middleware |
| 2026-04-15 | Sanity reference graph locked | article→partner(author), article→articleCategory, article→article(related), servicePackage→service, partner→article(featured). GROQ queries return joined data |
| 2026-04-15 | Portable text block-kit locked | Custom blocks: pullQuote, dropCapPara, photoEssay, marginNote, inlineProduct, inlineCollection. Typed, required fields |
| 2026-04-15 | Article gating enum locked | `gating.type: public / preview / members` + `previewParagraphs: number`. Default: preview/3 |
| 2026-04-15 | Image alt format enforced | Content: "Subject, treatment, location" format. Required field in Sanity schema. Decorative: `alt=""` |
| 2026-04-15 | `house-stone` body restriction | Only use at ≥18px (large-text AA pass at 3.1:1). For <18px, use `house-brown` at 70% opacity (≥4.5:1 AA). Lint rule enforces |
| 2026-04-22 | WCAG audit: `house-gold-dark` token added | `#8a6f2e` — accessible gold for text and filled buttons. Original `house-gold` (#b8943e) demoted to decorative-only (2.7:1 on light bgs fails AA) |
| 2026-04-22 | WCAG audit: `howa-teal-dark` token added | `#2d6364` — accessible teal for eyebrows and text <18px. Original `howa-teal` (#3a7d7e) restricted to ≥18px (4.48:1 fails normal text AA) |
| 2026-04-22 | WCAG audit: `house-stone` banned from all text | Full audit confirmed 2.5–2.7:1 on all light backgrounds — fails even large-text AA. Use `house-brown` at 70% opacity instead |
| 2026-04-22 | WCAG audit: white on gold buttons fixed | White on `house-gold` was 2.86:1 (fails). `btn-gold` now uses `house-gold-dark` (#8a6f2e) as background — white on dark gold = 5.16:1 (passes) |
| 2026-04-22 | WCAG audit: minimum font size 11px | Steward gauge axis text was 9px — bumped to 11px minimum across all surfaces |
| 2026-04-22 | `/howa` reworked from Steward mode to HoWA mode | Variant D used `howa-navy-deep` as body bg — violates DESIGN.md rule that navy-deep is Steward-only. Page now uses `house-white`/`howa-paper` with tier cards carrying their own modes |
| 2026-04-22 | `/howa/steward` landing page created | Dedicated Steward page at `/howa/steward` (not top-level nav). Full blueprint mode. Campaign imagery, House Health gauge, register-interest CTA. Nested under HoWA per nav spec |

---

# Part J — SEO & Structured Data

Structured data, meta, sitemap, canonical, redirect, and robots rules. Applied site-wide or per-template as noted.

## J.1 · Site-wide JSON-LD (emitted in root layout)

- **Organization** — legal name, logo, founded year, contactPoint (phone + email), sameAs (social URLs), address
- **WebSite** — with `potentialAction: SearchAction` (enables sitelinks search box in SERPs)

## J.2 · Per-template JSON-LD

| Route | Schema | Key fields |
|---|---|---|
| `/the-house/*` | `AboutPage` | name, description, primaryImageOfPage |
| `/howa` + `/howa/plans` | `Product` (HoWA as a service-product) | offers (free + £16.99/month tiers), provider: Organization |
| `/howa/companion` | `SoftwareApplication` | applicationCategory, offers |
| `/design/interiors`, `/design/gardens` | `Service` + `creator` refs | serviceType, areaServed, provider, offers (package ladder) |
| `/services/*` (gardening, window-cleaning, cleaning, gutter-cleaning) | `Service` + `areaServed` | serviceType, provider, serviceArea (postcodes covered), offers |
| `/protect`, `/protect/review`, `/protect/insurance` | `Service` | Note: Insurance requires care — Provenance may request specific wording. `FinancialProduct` not used under introducer-only state |
| `/shop` + `/shop/[category]` | `CollectionPage` + `ItemList` | numberOfItems, itemListElement |
| `/shop/product/[slug]` | `Product` | name, description (editorialCopy), image[], brand, sku, offers (price, priceCurrency: GBP, availability, url), aggregateRating + review (when they exist) |
| `/journal` | `Periodical` + `ItemList` of recent articles | name: "The Hearth", publisher: Organization |
| `/journal/[slug]` | `Article` or `NewsArticle` | headline, description, image (1200×630), author (Person), publisher (Organization), datePublished, dateModified, articleBody, wordCount, articleSection (rubric), isPartOf (Periodical) |
| Gated `/journal/[slug]` (HoWA+) | `CreativeWork` + `hasPart.WebPageElement` | `isAccessibleForFree=False` at both levels, `cssSelector=".paywall-hidden"` — Google flexible sampling pattern |
| `/partners/[slug]` | `Person` (if individual) or `Organization` (if studio) + `memberOf` | name, jobTitle, worksFor (Organization = HoWA), image, url, sameAs |
| `/contact` | `ContactPage` + `LocalBusiness` | Full NAP: name, address (streetAddress, addressLocality, postalCode, addressCountry), telephone, openingHours, geo, priceRange |
| Any page with ≥3 FAQs | `FAQPage` | mainEntity[]: Question{name, acceptedAnswer: Answer{text}} |
| Any route ≥2 levels deep | `BreadcrumbList` | itemListElement[]: ListItem{position, name, item} — generated from route segments |

## J.3 · Meta tag hierarchy

For every page, `generateMetadata()` resolves in this order:

**Title:**
1. `seo.metaTitle` override from Sanity
2. Document title + `" — House of Willow Alexander"` (or `" — The Hearth"` for `/journal/*`)
3. Fallback: page-type default (e.g. "Shop · House of Willow Alexander")

**Description:**
1. `seo.metaDescription` from Sanity (max 160)
2. Document `dek` field (max 160)
3. Truncated hero/first paragraph

**OG image (1200×630):**
1. `seo.ogImage` override
2. Document `hero.image`
3. `@vercel/og` branded fallback — Didot title on cream + HoWA logomark

**Twitter card:** `summary_large_image`, `twitter:site=@howahouse`, `twitter:creator` from author if present.

## J.4 · Canonical URL rules

- Scheme: `https://` only. Non-https → 301 to https.
- Host: apex `willowalexander.co.uk`. `www.` → 301 to apex.
- Trailing slash: **none**. `next.config.ts` `trailingSlash: false`. Middleware 301: `/path/` → `/path`.
- Case: all lowercase. Uppercase segments → 301 to lowercase.
- Query strings: dropped from canonical unless meaningful (e.g. `?postcode=` on /protect). `metadata.alternates.canonical` set explicitly.
- Pagination: `/journal?page=2+` → canonical to `/journal` + `noindex`.

## J.5 · Sitemap strategy

`app/sitemap.ts` returns a dynamic XML sitemap.

- **Sources:** Sanity (articles, partners, pages, services, packages), Shopify (products, collections), static (home, /the-house, /howa, utility).
- **lastmod:** from Sanity `_updatedAt` or Shopify `updated_at`.
- **changefreq:** home daily · journal landing weekly · articles monthly · partner profiles monthly · shop products weekly · static pages yearly.
- **priority:** home 1.0 · brand landings 0.9 · detail pages 0.7 · articles 0.6 · utility 0.3.
- **Split when needed:** if total >1000 URLs, switch to sitemap-index with `/sitemap-articles.xml`, `/sitemap-products.xml`, `/sitemap-partners.xml`, `/sitemap-pages.xml`.
- Submitted to Google Search Console + Bing Webmaster Tools on launch.
- Referenced from `robots.txt`.

## J.6 · Robots.txt

`app/robots.ts` returns structured rules.

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /account/
Disallow: /_next/
Disallow: /howa/coming-soon
Disallow: /*?preview=*

Sitemap: https://willowalexander.co.uk/sitemap.xml
```

Draft-mode routes return `noindex` via response headers; not listed in robots.txt (don't reveal preview endpoints).

## J.7 · Per-document meta tag robots

`noindex, follow` on:
- `/howa/coming-soon` (while flag off)
- `/protect/review` (while coming-soon state)
- Any page with `gating.type=members` (fully gated articles)
- Draft-mode pages
- Utility: `/404`, `/search` (with empty query), `/legal/preview/*`

Default for all other public pages: `index, follow`.

**Draft vs gated — distinct:** Draft-mode pages are `noindex` (unfinished, should not appear in SERPs). Gated HoWA+ articles are **not** `noindex` — they're `index, follow` with paywall structured data (see J.2). Google indexes the preview portion. Easy to conflate when implementing the article page component; keep these two mechanisms separate.

## J.8 · 301 redirect map (launch blocker)

Pre-launch crawl of existing `willowalexander.co.uk` via Screaming Frog or GSC URL export. Build complete source → destination map as Sanity `redirect` documents. Serve via `middleware.ts` (checked first, hot path) falling back to `next.config.ts` `redirects()` for static well-known ones.

**Source of truth:** Sanity `redirect` docs are authoritative. A build script (`scripts/sync-redirects.ts`) pulls them at build time and injects into `next.config.ts` `redirects()`. Runtime middleware also reads from Sanity for post-build additions. Never edit `next.config.ts` redirects manually — they get overwritten.

**Source types to cover:**
- WP posts: `/2024/01/*` → `/journal/[slug]` (use last path segment for mapping)
- WP product URLs: `/product/*` → `/shop/product/[new-slug]`
- WP category archives: `/category/interiors/` → `/journal/category/interiors`
- WP pages: `/about/`, `/contact/`, `/services/` → new counterparts
- WP attachments: `/wp-content/uploads/*` → 410 Gone (no longer hosted)
- WP feed URLs: `/feed/`, `/category/*/feed/` → corresponding feed at new site, or 410

**Target:** zero 404s at launch for any URL with an inbound backlink.

## J.9 · Local SEO

- `LocalBusiness` structured data on `/contact` with full NAP + hours + geo.
- Google Business Profile linked to 14 Willow Lane, Notting Hill W11 studio address.
- `Service` + `areaServed` schema on each `/services/*` page listing covered postcodes.
- Aim to rank for `[service] [postcode]` and `[service] [area name]` queries in the competitive London + Home Counties region.
- Post-launch P2: geo-suffix service pages (`/services/gardening/london`, `/services/cleaning/w11`).

## J.10 · Image SEO

- `next/image` for everything via `@sanity/image-url` + Shopify CDN.
- Alt text required for content images; format: "Subject, treatment, location" (e.g. "Drawing room, layered textile scheme, Kensington home").
- Alt empty (`alt=""`) for decorative pattern + frame imagery.
- Lazy loading default; `priority` on hero/above-fold only.
- Responsive `sizes` per component (documented in Part C).

## J.11 · Internal linking architecture

- Hearth articles link to relevant services, partners, and products via Sanity `article.relatedCommerce[]` field (array of refs).
- Partner profiles link to their `featured_project` (Article) and to relevant services.
- Service pages link to Hearth articles about that discipline.
- Shop products link to `linkedPartner` and `linkedService` if set.
- Builds internal PageRank and keeps users inside the House.

## J.12 · Brand protection

- Own search for "House of Willow Alexander", "HoWA", "Willow Alexander Gardens" via: Organization schema, clean canonical URL, high-quality content on `/the-house`, Google Business Profile, consistent NAP across web.
- Monitor via GSC brand terms weekly post-launch.

---

## Mockups reference

---

## Mockups reference

Working HTML mockups by page (design artefacts, not production code):

- Homepage hero: `~/.gstack/projects/platform/designs/homepage-hero-20260415/`
- `/howa` landing: `~/.gstack/projects/platform/designs/howa-landing-20260415/`
- `/design/interiors`: `~/.gstack/projects/platform/designs/design-interiors-20260415/`
- `/services`: `~/.gstack/projects/platform/designs/services-landing-20260415/`
- `/the-house`: `~/.gstack/projects/platform/designs/the-house-20260415/`
- `/protect` v2: `~/.gstack/projects/platform/designs/protect-landing-v2-20260415/`
- `/howa/steward`: `~/.gstack/projects/platform/designs/howa-steward-20260422/`
- `/journal` (The Hearth) — **locked**: `~/.gstack/projects/platform/designs/hearth-magazine-20260415/` (Variant A)

## Archive

- `DESIGN.v1.md` — previous design system (2026-04-01). Kept for reference; decisions carried forward and extended into v2.
