@AGENTS.md

# House of Willow Alexander — Marketing Site

## What is this?
The public marketing website for House of Willow Alexander. A premium home stewardship brand offering design, care, protection, and curated commerce. The HoWA product (dashboard, auth, billing) is built separately — this is the brand and content layer only.

## Stack
- Next.js 15 (App Router, TypeScript, Tailwind CSS)
- WordPress (headless CMS via WPGraphQL + ACF Pro)
- Vercel (hosting)

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
```

## Architecture
- `/src/app/` — all public pages (flat routing, no route groups needed)
- `/src/components/` — shared UI components
- `/src/lib/` — WordPress GraphQL client, content fetching helpers, types

## Design Principles
- The House = emotional, editorial, premium brand surface
- HoWA = structured, calm, operational product surface
- Every commercial page follows: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)
- Navigation is intent-led, not category-led
- No "marketplace" language. Use "Shop" or "House Approved"
- Tone: stewardship, continuity, memory, calm intelligence

## Content Source
All editorial content comes from WordPress via WPGraphQL. Do not hardcode page copy — fetch from CMS.

## HoWA Product Integration
CTAs that route into the HoWA product (Start HoWA, Sign in, Book, Pay, Configure) link to an external product app. The URL is configured via `NEXT_PUBLIC_HOWA_APP_URL` environment variable.
