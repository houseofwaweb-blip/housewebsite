@AGENTS.md

# House of Willow Alexander — Marketing Site

## What is this?
The public marketing website for House of Willow Alexander. A premium home stewardship brand offering design, care, protection, and curated commerce. The HoWA product (dashboard, auth, billing) is built separately — this is the brand, content, and shop layer.

## Stack
- Next.js 15 (App Router, TypeScript, Tailwind CSS)
- Storyblok or Sanity (API-first headless CMS — agent/bot is primary content updater)
- WooCommerce REST API (interim commerce — product listings, cart, checkout)
- Vercel (hosting)

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
```

## Architecture
- `/src/app/` — all public pages (flat routing)
- `/src/components/` — shared UI components
- `/src/lib/cms/` — CMS client (Storyblok or Sanity), content fetching, types
- `/src/lib/commerce/` — WooCommerce client behind a CommerceProvider interface (swappable for HoWA Product later)

## Design Principles
- The House = emotional, editorial, premium brand surface
- HoWA = structured, calm, operational product surface
- Every commercial page follows: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)
- Navigation is intent-led, not category-led
- No "marketplace" language. Use "Shop" or "House Approved"
- Tone: stewardship, continuity, memory, calm intelligence

## Content Source
All editorial content comes from the headless CMS via API. Do not hardcode page copy.
Content is primarily updated by Claude agents via the CMS Management API.

## Commerce
Shop product data comes from WooCommerce REST API. This is interim — will be replaced by HoWA Product.
Commerce logic is behind a `CommerceProvider` interface so the WooCommerce implementation can be swapped cleanly.

## HoWA Product Integration
CTAs that route into the HoWA product (Start HoWA, Sign in, Book, Pay, Configure) link to `NEXT_PUBLIC_HOWA_APP_URL`.
