# Design System — House of Willow Alexander

## Product Context
- **What this is:** Premium British home stewardship institution. Marketing site + editorial commerce.
- **Who it's for:** Affluent UK homeowners who care about design, craft, and sustainability.
- **Space/industry:** Premium home services meets lifestyle brand. Peers: Farrow & Ball, The White Company, Soho House, Daylesford.
- **Project type:** Marketing site (editorial + commerce) with dual personality: The House (brand) and HoWA (product).

## Aesthetic Direction
- **Direction:** Luxury/Refined with Editorial/Magazine elements
- **Decoration level:** Intentional. The hand-drawn floral pattern is the institutional signature, used as borders/frames in gold/white/black, never as fill. Scale pattern to ~350% of natural size. Let it breathe.
- **Mood:** Heritage modernism. Quiet luxury, intelligent restraint. "As if it has existed forever and will continue to exist long after trends have passed." Cinematic, candid, textural. Celebrating care, craft, and calm.
- **Reference sites:** Current willowalexander.co.uk, the Almanac brand book

## The Dual Personality

The brand has two visual registers that share one system but shift in tone:

### The House (editorial, aspirational, institutional)
- Background: `house-cream` (#f5f0e8)
- Headlines: Didot LT Pro Bold (serif)
- Spacing: generous (xl, 2xl between sections)
- Tone: poetic, editorial, warm
- Pattern: white on cream (soft-light blend, 50% opacity)
- CTAs: outlined (brown border, brown text, inverts on hover)

### HoWA (structured, calm, operational)
- Background: `house-white` (#faf8f4) or `howa-navy` (#1e2a3a)
- Headlines: Effra Std Regular (sans-serif)
- Spacing: tighter (~20% less than House territory)
- Tone: precise, assistive, modern
- Pattern: white on navy (4% opacity) or none
- CTAs: filled gold or teal
- Accent: `howa-teal` (#3a7d7e) for links and eyebrows

### The Transition
When a page moves from House territory (editorial top) to HoWA territory (structured middle/bottom):
- Background shifts: cream → white
- Headlines shift: Didot → Effra
- Spacing tightens by ~20%
- CTAs shift: outlined → filled gold
- Cards gain borders, feel more structured
- This is the brand's signature visual moment: "walking from the living room to the study"

## Typography
- **Display/Hero:** Didot LT Pro Bold — institutional serif voice, high contrast, thin strokes. Heritage authority.
- **Body:** Effra Std Regular — calm, clear, modern sans. The utility voice.
- **UI/Labels:** Effra Std Regular
- **Data/Tables:** Effra (tabular-nums)
- **Code:** Not applicable (no code display in marketing site)
- **Loading:** Self-hosted from `/public/fonts/` via `next/font/local`. No Google Fonts dependency. Files: DidotLTPro-Bold.woff2, DidotLTPro-Bold.woff, effra_std_rg-webfont.woff2, effra_std_rg-webfont.woff
- **Scale (desktop):**

| Token | Size | Font | Weight | Line height | Use |
|-------|------|------|--------|-------------|-----|
| display | 56px / 3.5rem | Didot | 700 | 1.1 | Homepage hero |
| h1 | 44px / 2.75rem | Didot | 700 | 1.15 | Page titles |
| h2 | 32px / 2rem | Didot | 700 | 1.2 | Section heads |
| h3 | 24px / 1.5rem | Didot | 700 | 1.25 | Card titles (House) |
| h4 | 20px / 1.25rem | Effra | 400 | 1.3 | Subsections (HoWA territory) |
| body-lg | 18px / 1.125rem | Effra | 400 | 1.7 | Article body, hero subtext |
| body | 16px / 1rem | Effra | 400 | 1.6 | Default body |
| body-sm | 14px / 0.875rem | Effra | 400 | 1.5 | Nav, metadata, captions |
| caption | 12px / 0.75rem | Effra | 400 | 1.4 | Timestamps, legal |
| eyebrow | 12px / 0.75rem | Effra | 400 | 1.2 | Uppercase, letter-spacing 0.15em |

- **Scale (mobile):** display → 32px, h1 → 28px, h2 → 24px, h3 → 20px. Body sizes unchanged.

## Color
- **Approach:** Restrained. Gold is the only accent. Everything else is neutral. Color is rare and meaningful.

### House Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `house-brown` | `#30231c` | Primary text, dark backgrounds, footer |
| `house-gold` | `#b8943e` | Primary accent, CTAs, pattern, links, gold line on cards |
| `house-gold-light` | `#d4af5a` | Hover state for gold elements |
| `house-cream` | `#f5f0e8` | House section backgrounds |
| `house-cream-dark` | `#ebe4d6` | Borders, dividers, subtle backgrounds |
| `house-white` | `#faf8f4` | Page background, HoWA section backgrounds |
| `house-stone` | `#a09885` | Secondary text, captions, metadata |
| `house-moss` | `#5a6b4a` | Garden accents, success states |
| `house-black` | `#1d1d1b` | Maximum contrast when needed |

### HoWA Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `howa-navy` | `#1e2a3a` | HoWA hero backgrounds, featured plan cards, structured sections |
| `howa-teal` | `#3a7d7e` | HoWA links, secondary accent, eyebrows, top-lines |
| `howa-light` | `#f0f4f3` | HoWA light backgrounds (optional) |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| success | `#5a6b4a` | Moss green. Confirmation, positive states |
| warning | `#c4922a` | Amber. Review needed |
| error | `#8b3a3a` | Muted red. Not alarming. Attention needed |
| info | `#3a7d7e` | Teal. Helpful context |

- **Dark mode:** Not in scope. Brand palette not defined for dark. The brown/navy sections serve as dark moments within the light design.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable (House), tightening to moderate (HoWA)
- **Scale:** 4 / 8 / 16 / 24 / 40 / 64 / 96 / 128px
- **House territory:** generous spacing between sections (96px, 128px)
- **HoWA territory:** tighter by ~20% (64px, 96px between sections)

## Layout
- **Approach:** Grid-disciplined with editorial moments
- **Grid:** 2-column and 3-column layouts within max-width container
- **Max content width:** 1200px
- **Article reading width:** 680px
- **Border radius:** 0px everywhere. Sharp corners. Heritage/institutional authority. No exceptions.
- **Breakpoints:**
  - Mobile: 0–767px (single column, hamburger menu)
  - Tablet: 768–1023px (2-column grids collapse, mega-menu becomes dropdown)
  - Desktop: 1024px+ (full layout)

## Components

### Buttons
- **Gold filled** (`btn-gold`): `background: house-gold`, `color: #ffffff`. Hover: lighten to `house-gold-light`, lift 1px. Primary CTA.
- **Brown outlined** (`btn-outline`): `border: 1px solid house-brown`, transparent bg. Hover: fill brown, text cream. Secondary CTA in House territory.
- **Light outlined** (`btn-outline-light`): For use on dark backgrounds. `border: rgba(255,255,255,0.3)`. Hover: subtle white fill.
- **Navy filled** (`btn-navy`): `background: howa-navy`. Hover: lighten, lift 1px.
- **Teal filled** (`btn-teal`): `background: howa-teal`. Hover: lighten to #458f90, lift 1px. CTA in HoWA territory.
- **Ghost link** (`btn-ghost`): `color: house-gold`, solid underline, `text-underline-offset: 4px`. Hover: underline morphs to dotted, color lightens. Used for in-content links.
- All buttons: 0px border-radius, `font-size: 14px`, `letter-spacing: 0.05em`, `padding: 10px 24px`, `transition: all 0.2s ease-out`

### Cards — House Territory (editorial)
- No visible border on the card itself
- Image bleeds full width of the card area
- 2px gold line (`house-gold`) separates image from text content
- On hover: image lifts 4px with soft shadow (`0 12px 40px rgba(48,35,28,0.1)`), title turns gold
- Text uses Didot for title, Effra for description
- Ghost link CTA below description

### Cards — HoWA Territory (text-forward)
- No image. Gold 2px top-line. Text-forward layout on `howa-navy` background.
- Large ghost number (01, 02, 03) at top-right, `opacity: 0.06`, Didot 48px
- On hover: card lifts 3px, title shifts to `house-gold-light`
- Titles in Effra (not Didot), smaller scale, tighter spacing

### Action Rail
- Minimal horizontal items with gold top-line border on hover
- No box borders. Just a 2px top border (cream-dark default, gold on hover)
- Didot titles, Effra descriptions, stone color text

### Plan Comparison Cards
- Side-by-side with collapsing borders (margin-left: -1px)
- Featured plan: `howa-navy` background with cream text
- On hover: lift 2px with soft shadow
- Effra headlines (HoWA territory)

## Pattern Usage
The hand-drawn floral pattern is the House's institutional signature. Treat it with reverence.

### Rules (from the Almanac)
1. Never full color. The pattern is always linework.
2. Always gold, white, or black for the House.
3. Let it breathe. Never cramped or lost behind text.
4. Frame, never filler. Border, gesture, quiet envelope.
5. The pattern is not decoration. It is identity.

### Implementation
- **Scale:** ~350% of the pattern's natural tile size (1050–1750px `background-size`)
- **Gold on brown/dark:** Use a pseudo-element overlay (`::before`) with `opacity: 0.15`. Do NOT use blend modes, the contrast is too high for readable text.
- **White on cream:** `background-blend-mode: soft-light` with `opacity: 0.5` works well.
- **White on navy:** Pseudo-element with `opacity: 0.04`. Very subtle.
- **Where to use:** Alternating sections. Never on every section. Used on: cream backgrounds (split, protect, proof strip), closing CTA (brown), footer (brown, very subtle at 6%), HoWA navy cards (very subtle).

### Pattern Files
- `brand-assets/patterns/WA-Gold flower pattern-02.png` — gold linework on black background
- `brand-assets/patterns/white-pattern-alpha-op.png` — white linework with alpha transparency

## Motion
- **Approach:** Intentional. Not minimal, not expressive. Purposeful movement that reinforces hierarchy.
- **Easing:** enter: ease-out, exit: ease-in, move: ease-in-out
- **Duration:** micro: 100ms, short: 200ms, medium: 250ms, long: 300ms
- **Hover:** 200ms ease-out. Buttons lift 1px. Cards lift 3–4px with shadow. Titles shift to gold.
- **Ghost link underline:** solid → dotted transition, 300ms
- **Page transitions:** View Transitions API (pending spike). Fallback: instant navigation.
- **Scroll-linked:** Subtle parallax on homepage hero only. No entrance animations on text (appears immediately). Images can fade in.
- **Mega-menu:** 150ms slide-down, ease-out.
- **Reading progress bar:** 2px gold bar below sticky header, tracks scroll position through article body.

## Photography Direction
- Cinematic, candid, textural. Celebrating care, craft, and calm.
- Warm natural light with visible shadow and depth.
- Avoid digital gloss or over-staged lifestyle imagery.
- Every frame should feel like a scene from a home that is lived in beautifully.
- Keywords: natural light, layered materials, stillness, craftsmanship, warmth, British timelessness.
- Product images: 3:4 portrait ratio.

## Copy Voice
- Sentences should breathe. Words should feel placed, not poured.
- Avoid technical language. Prefer emotional clarity.
- Use the language of stewardship, continuity, memory, and calm intelligence.
- Avoid: "manage your admin", "marketplace", "all-in-one app", "instant", alarm-heavy wording.
- The House speaks with quiet confidence. Warm authority, refined, not distant.

## Mockups
Reference HTML mockups at:
- Homepage: `~/.gstack/projects/platform/designs/homepage-html-20260401/index.html`
- HoWA landing: `~/.gstack/projects/platform/designs/homepage-html-20260401/howa.html`
- Journal article: `~/.gstack/projects/platform/designs/homepage-html-20260401/article.html`
- Design system preview: `~/.gstack/projects/platform/designs/design-system-preview.html`

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-31 | Fonts: Didot LT Pro Bold + Effra Std Regular | From Almanac. Self-hosted, no external dependency |
| 2026-03-31 | Color: restrained, gold-only accent | Almanac: "organic, never synthetic" |
| 2026-04-01 | Border radius: 0px everywhere | Heritage/institutional authority. Deliberate departure from rounded trend |
| 2026-04-01 | Cards: editorial (House) vs text-forward (HoWA) | Avoids generic card grid. Gold accent line is signature |
| 2026-04-01 | Pattern scale: 350% | Reads as individual botanical elements, not tight weave |
| 2026-04-01 | Gold on brown: 15% opacity overlay | Blend modes too high contrast for text readability |
| 2026-04-01 | Ghost link: solid → dotted underline on hover | Distinctive micro-interaction matching the "intelligent restraint" brand |
| 2026-04-01 | Article width: 680px | Optimal line length for Effra at 18px body |
| 2026-04-01 | Product images: 3:4 portrait | Shows objects better than square |
| 2026-04-01 | House→HoWA transition: full shift | Bg + type + spacing + CTA style all change. The brand's defining visual pattern |
| 2026-04-01 | Initial DESIGN.md created | /design-consultation from Almanac + brand assets |
