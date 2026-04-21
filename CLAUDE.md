@AGENTS.md

# House of Willow Alexander — Marketing Site

## What is this?
The public marketing website for House of Willow Alexander. A premium British home-stewardship brand offering design, care, protection, and curated commerce. The HoWA product (dashboard, Companion diagnostic, auth, billing, checkout, account, home records) is a separate app — this is the brand, editorial, and shop layer.

## Stack
- **Next.js 16** (App Router, TypeScript, Tailwind 4, React 19)
- **Sanity v3** — editorial CMS. Content Lake API for reads, Management API for agent writes, GROQ queries
- **Shopify Storefront API** — headless commerce, in-site cart + redirect to themed Shopify-hosted checkout
- **Supabase Postgres** — form submissions + waitlists only (consultation_bookings, waitlist_interests, contact_submissions, newsletter_subscribers) with RLS
- **Vercel** — hosting + preview URLs + ISR

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
```

## Architecture
- `/src/app/` — all public pages (App Router)
- `/src/components/` — shared UI components (see DESIGN.md Part C for full library)
- `/src/lib/cms/` — Sanity client, GROQ queries, content types
- `/src/lib/commerce/` — Shopify Storefront client behind a CommerceProvider interface (swappable)
- `/src/lib/supabase/` — Supabase server client, RLS-safe form endpoints
- `/src/app/api/forms/[type]/` — form submission endpoints (zod-validated, rate-limited)
- `/src/app/api/shopify/` — Shopify proxy routes (keeps Storefront token server-side)

## Design Principles
- **The House** = emotional, editorial, premium brand surface (cream / Didot / generous / outlined CTAs)
- **HoWA** = structured, calm, operational product surface (white / Effra / tighter / filled gold CTAs)
- **Steward** = blueprint mode (navy / technical / gold-on-navy) — premium layer only
- Every commercial page follows: editorial top (House) → package middle (HoWA) → continuity bottom (HoWA)
- Navigation is intent-led, not category-led (The House · HoWA · Design · Services · Protect · Shop · Journal)
- No "marketplace" language. Use "Shop" or "House Approved"
- Tone: stewardship, continuity, memory, calm intelligence

## Services at launch (4, not 6)
Gardening · Window Cleaning · Cleaning · Gutter Cleaning. Handyman, Removals, Energy deferred.

## Launch partners (4)
Willow Alexander Gardens · Jessica Durling-McMahon · Delve Interiors · House AI. Each has a `/partners/[slug]` profile. Consent workflow required before publication.

## Commercial decisions (locked 2026-04-15)
- HoWA+ price: **£16.99/month**
- HoWA Steward: coming soon on `/howa/plans`, not in primary nav
- House Membership: collapsed into HoWA+ (no longer a separate product)
- Steward Plans: public label for managed recurring care
- Protect Review: coming soon at launch, no public booking
- Insurance: register-interest only (Provenance introducer-only, FCA-regulated)

## Content Source
All editorial content comes from Sanity via API (reads: GROQ via Content Lake; writes: Management API by agent; human publishes via Studio). Do not hardcode page copy.

Content provided by Alex (not migrated from WP at launch). Sanity schemas defined in PLAN.md §4.1.

## Commerce
Shop product data comes from Shopify Storefront API. In-site cart via httpOnly cookie, redirect to Shopify-hosted checkout (themed with brand fonts/colours). WooCommerce → Shopify migration in PLAN.md §5.

Commerce abstracted behind a `CommerceProvider` interface so Shopify can be swapped for HoWA Product commerce later.

## Design System
**Always read DESIGN.md before making any visual or UI decision.**

DESIGN.md v2 covers: visual foundations, UX principles, component library, interaction states, user flows, voice & microcopy, accessibility, mechanics library, decisions log. Single source of truth.

Mockup HTMLs by page live in `~/.gstack/projects/platform/designs/*-20260415/`. Locked direction: `/journal` = Variant A (H&G-modeled). Other pages still open — see memory file `approved_directions.md`.

Do not deviate from DESIGN.md without explicit user approval. In QA, flag any code that doesn't match.

## HoWA Product integration
CTAs that route into the HoWA product (Start HoWA, Sign in, Configure, Book, Pay, Start with the Companion) link to `NEXT_PUBLIC_HOWA_APP_URL`.

**Hard gate fallback:** env flag `HOWA_APP_LIVE=false` routes all Start HoWA CTAs to `/howa/coming-soon` and swaps header CTA label to "Book consultation". Built in to avoid dead CTAs if the product isn't live at cutover.

## Env var inventory
Split between Vercel deploy env and ops-only (local CLI / CI / migration):

**Deploy (safe for Vercel):**
- `NEXT_PUBLIC_HOWA_APP_URL` — HoWA Product domain
- `HOWA_APP_LIVE` — fallback flag (middleware + context provider read this)
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_READ_TOKEN`
- `SANITY_PREVIEW_SECRET` — draft preview route auth
- `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN` (least-privilege: read listings + write checkouts only)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — **server-route only**. Lint rule blocks in `'use client'`; runtime throws if `typeof window !== 'undefined'`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — rate-limiting + postcode cache
- `TURNSTILE_SITE_KEY` (public) + `TURNSTILE_SECRET_KEY` (server) — anti-abuse. All `/api/forms/*` POST must verify via Cloudflare siteverify before write
- `NEXT_PUBLIC_SENTRY_DSN` — client-side errors (public, rate-limited)
- `SENTRY_DSN` — server-side errors (private, higher fidelity)
- `SENTRY_RELEASE` — set by CI to git SHA for error→deploy mapping

**Ops (never in Vercel — local CLI / CI only):**
- `SANITY_MANAGEMENT_TOKEN` — agent content uploads + preview toggles
- `SHOPIFY_ADMIN_TOKEN` — migration + metafield definitions only
- `WOOCOMMERCE_CONSUMER_KEY/SECRET` — WC→Shopify migration
- `SENTRY_AUTH_TOKEN` — source-map upload in CI

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
