@AGENTS.md

# House of Willow Alexander — Platform

## What is this?
The public website and HoWA product platform for House of Willow Alexander. A premium home stewardship brand offering design, care, protection, and curated commerce.

## Stack
- Next.js 15 (App Router, TypeScript, Tailwind CSS)
- WordPress (headless CMS via WPGraphQL + ACF Pro)
- Supabase (Auth + Postgres)
- Stripe (subscriptions + payments)
- Vercel (hosting)

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
```

## Architecture
- `/src/app/(marketing)/` — public marketing pages (The House, HoWA, Design, Services, Protect, Shop, Journal)
- `/src/app/(auth)/` — sign in / sign up
- `/src/app/(app)/` — authenticated HoWA dashboard (Cut 2)
- `/src/components/` — shared UI components
- `/src/lib/` — utilities, WP client, Supabase client, Stripe helpers

## Design Principles
- The House = emotional, editorial, premium brand surface
- HoWA = structured, calm, operational product surface
- Every commercial page follows: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)
- Navigation is intent-led, not category-led
- No "marketplace" language. Use "Shop" or "House Approved"
- Tone: stewardship, continuity, memory, calm intelligence

## Content Source
All editorial content comes from WordPress via WPGraphQL. Do not hardcode page copy — fetch from CMS.
