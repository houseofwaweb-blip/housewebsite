# HoWA September Amendments — Implementation Handover

**Status for sign-off.** House of Willow Alexander website, re-integrating HoWA per the September 2026 amendment documents.

- **Where:** worktree `C:\Users\User\Desktop\wa-redesign`, branch `aug17th-amendments`.
- **Run:** `npm run dev` → http://localhost:4000 (port 4000).
- **State:** LOCALHOST ONLY. Nothing committed or pushed. All changes are working-tree only, awaiting review before any commit.
- **Source docs:** `houseofwaweb/september amendments/` — `House_HoWA_Full_Website_Copy_and_Implementation_Brief.md` (18 steps + copy), `House_HoWA_Visual_Review.pdf`, `HoWA_Homepage_Layout_Correction_Brief.md`, the `existing house customers/` microsite files, and the `AI-Scans-Handover` / `Ask-HoWA-Handover` folders.

---

## Done (verified: every route 200 or an intended redirect, no compile errors)

**Brief steps 01–13 and 16** — global House shell; reusable modules + truthful action states (`HOWA_APP_LIVE` gate); homepage HoWA hero-product module; service architecture (one-off vs recurring vs optional membership); `/how-it-works` fulfilment journey; `/howa` hub (built to the layout-correction brief); `/howa/house-customers` welcome; `/my-house` doorway; `/howa/design` route; design/package presentation; `/the-house` institution; `/house-approved-pro` network; cross-site consistency.

**Naming / routing consistency**
- "Assistant" → **Ask HoWA**. Route renamed `/howa/assistant` → **`/howa/ask`** (old path 307-redirects). Nav, inbound links and sitemap updated.
- **HoWA+** standalone page removed from nav; `/howa/housekeeper` 307-redirects to `/howa/plans` (the single tiers page). Tiers everywhere: **HoWA Free / HoWA+ / HoWA Steward**.
- `/design` ↔ `/howa/design` circular CTA loop fixed (HoWA-design primaries now go to `/design#routes`).

**Section 5 reconciliation (welcome directive §5)** — "no paid HoWA plan required" is now scoped to non-plan-holders, and the regular-customer → **HoWA Steward** invitation (£29.99/mo × 12 = £359.88, visits billed separately) is carried on the homepage HoWA module, `/howa` hub, `/services`, and `/howa/house-customers`.

**AI Scans + Ask HoWA (from the two handovers, "AI" dropped per House brand)**
- `/howa/ask` rebuilt: interactive **AskHowaDemo** hero ("Ask the home, not the internet", source + confidence, refuses to guess), and the brief §6.5 **five useful doors** as **offers-style pop-ups** (garden / repair / quote / documents open a `ScanReveal`; design opens the design reveal). Cross-page tool buttons deep-link with `?tool=<key>` to auto-open the pop-up.
- Components: `src/components/howa/AskHowaDemo.tsx`, `src/components/howa/scans/{ScanReveal,ScanModal,ScanDoors,ScanPreview,AskScanPreview}.tsx`; data `src/lib/howa/scan-reveals.ts`.

**Parked decisions (resolved from the documents)**
- Type size: copy brief asks only for "readable type"; base bumped 16px → **17px** (`globals.css`).
- House imagery: layout brief mandates the doll's house shown **whole, `object-contain`, never cropped** — applied on `/howa` hero (desktop + mobile) and the homepage module.

**Imagery pass (new library in `public/howa/new/`)** — doll's-house / product-proof for feature + product sections, real-home lifestyle for benefit sections, non-full-bleed, varied layouts. Applied across `/howa`, `/how-it-works`, `/the-house`, `/services`, `/howa/design`, `/howa/plans`, and the HoWA nav preview. Doll's-house/product images use `object-contain` (uncropped); lifestyle frames match their aspect ratio.

---

## Outstanding

**Step 14 — lighter House touches (not done):** selective "Take this into HoWA" bridges + role consistency on Shop, The Hearth (`/the-hearth`), Insurance, Help. Pages are live and consistent; the light HoWA integrations from §14 are not yet applied. (Hearth already has HoWA hooks via `HearthHowaHooks`.)

**Step 15 — imagery loose ends:** a **transparent-cutout doll's-house PNG** is still needed to replace the baked rose background on the hero asset (requires image production, not codeable here); a formal mobile/responsive art-direction check is pending.

**Backend-dependent (cannot be built on localhost; honest fallbacks in place):** the one complete loop (brief → booking → provider → completion record), ServiceOS account matching / writeback, paid-Steward checkout, plan entitlements. CTAs route to `/howa/coming-soon`, the ServiceOS accounts portal, or `/contact` as appropriate.

**Cosmetic / low priority:** dead `v3/v4/v6` HoWA components and `HowaFaq.tsx` / `ModesBands.tsx` still contain legacy "Assistant/Housekeeper" strings but are **imported by zero live files** (never rendered); the retired `/howa/housekeeper` CSS module and `src/lib/howa/scan-catalog.ts` are unused. Safe to delete in a later tidy.

---

## How to review

Start at `/howa`, then `/how-it-works`, `/howa/ask` (open the pop-ups), `/howa/house-customers`, `/howa/plans`, `/howa/design`, `/the-house`, `/services`. Confirm imagery, the Steward messaging, and the Ask HoWA pop-ups. Redirects to verify: `/howa/assistant` → `/howa/ask`, `/howa/housekeeper` → `/howa/plans`.
