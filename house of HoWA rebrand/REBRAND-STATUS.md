# House of HoWA rebrand — status

**Branch:** `howa-rebrand` (80 commits ahead of `main`). Everything is committed and pushed.
**Live site:** untouched. `main` has had nothing since the Hearth read-time fix.
**Working tree:** clean.
**Last commit:** `f79cd5f` — sweep unevidenced economics + stop non-deterministic ISR.

Authority: `further amendments/House_of_HoWA_Persona_Led_Zero_Interpretation_Claude_Code_Directive_v2.docx`
is the single ordered instruction. `House_of_HoWA_Digital_Estate_Workflow_and_Asset_Register_v1.docx`
governs domain and operating architecture. **CLAUDE.md is stale** — its "Launch partners (4)"
list is pre-rebrand and wrong (see STEP 14 below).

---

## Where we are

| Step | State |
|---|---|
| 00–11 | Done and verified against each step's PASS criteria |
| 12 Interior Design | Naming/ownership done. **Brief + match flow outstanding** |
| 13 Garden Design | Professional boundaries done. **Brief flow outstanding** |
| 14 Partners | Fact gate done. Route architecture outstanding |
| 15–26 | Not started |

### What exists now that didn't
- **Truth layer** (`src/lib/truth/index.ts`) actually governs the site. Strip a
  service's seller and it downgrades itself off the homepage, the services grid
  and the member chips. Verified by test.
- **Ten Household members, ten routes.** Doc-verbatim promises, breadcrumbs,
  professional boundary, named sellers, named Home Record objects.
- **Honest tool states.** In-build tools no longer fake readings of real homes.
- **Locked homepage order**, four rooms, real-people band.
- **Services**: 4 live only, future ones separated and non-bookable.

---

## Blocked on decisions (not code)

1. **Legal entity.** Terms/Privacy name **House of HoWA Ltd** (co. 15062693);
   the footer and the new Payments clause name **HoWA Living Ltd**. Are they one
   renamed company or two? If two, HoWA Living Ltd needs its company number and
   registered office, and Privacy needs to say which entity controls data.
   The Estate register still lists "Confirm which legal entity operates House of
   HoWA…" as an open action.

2. **STEP 12/13 brief flows** need approved studio capacity, geography and
   availability. Cannot be built without them — inventing eligible studios is
   the fake-partner mistake again.

3. **Sanity reconciliation at cutover** (see below).

---

## The Sanity problem (important)

There is **one Sanity dataset shared by production and preview**, and CMS content
overrides the code. So repo greps prove nothing on their own.

- `CMS_SECTIONS_OVERLAY=off` is set on the Vercel **Preview** environment only.
  It makes the 25 `pageSection` docs stop masking in-repo copy. Production leaves
  it unset and is unaffected.
- **FAQ docs are not covered by that flag** — they have no in-repo fallback, so
  retired ones are filtered at the CMS boundary in `src/lib/cms/faqs.ts`.
- **Partner docs are gated** by `APPROVED_PARTNERS` in the truth layer.

**Audited (read-only) — retired terms still live in Sanity:**
- `faq.howa-savings` — "10-15% off service bookings… plus 10% off everything"
- `faq.howa-steward-cost`, `faq.howa-steward-when` — retired "Steward plan"
- `faq.howa-membership` — "House Membership"
- `pageSection:hero` — "Assistant"
- `pageSection:system-split` — "Marketplace"

These are **filtered, not fixed**. Editing them changes the live site, which this
branch must not do. **They must be reconciled at the launch gate (STEP 25)** or
production will re-mask the rebrand copy the moment it points at this branch.

**Nav risk:** `layout.tsx` passes `getNavigation()` from Sanity into the Header.
There are currently **0 navigation docs**, so the directive-locked nav renders by
luck. One Sanity nav doc would override STEP 04. Consider gating it.

---

## STEP 14 — who is actually approved

The directive's slot table lists **route slots to prepare, not names to publish**:
Delve Interiors; Willow Alexander Interiors; Willow Alexander Gardens; Coffee Girl
Designs; Jessica Durling Design; Willow Alexander Gardeners.

**Approved to publish (confirmed by Alex): Willow Alexander Gardens, Delve Interiors.**

- **House AI** — appears nowhere in the directive or Estate register. Came from
  stale CLAUDE.md. `/partners/house-ai` now 404s.
- **Jessica** — dropped long ago; was still served from Sanity under a personal
  name that isn't even the entity the directive names. Now 404s.
- **Coffee Girl Designs** — never a partner. No route created.

Design packages and prices on `/design/interiors` and `/design/gardens` are
**approved** and stay.

---

## Vercel

Free (Hobby) allowances exceeded on 6 resources. **Hobby does not bill — it
pauses.** The on-demand rates in Vercel's docs are Pro-only ("Pro plans charge for
usage beyond the included amount"). Upgrading is ~$20/month and current usage sits
inside Pro's included allowances.

**Biggest overage: ISR Writes 969K / 200K.** Cause found and fixed in `f79cd5f`:
the sitemap used `new Date()` for `lastModified`, so every revalidation produced a
different sitemap and Vercel charged an ISR write for unchanged content — Vercel's
docs name this exact cause. Now a build-time constant. **Effect can only be
observed in production, not locally.**

Second: Image Optimization 21K/5K transformations, 251K/100K cache writes. Not yet
investigated — `next/image` `sizes` breakpoints and `minimumCacheTTL` are the levers.

---

## Next actions

1. Reconcile or decide on the Sanity docs listed above (launch gate).
2. Resolve the legal entity question.
3. STEP 15 onward, or the image-optimisation overage.
4. STEP 12/13 brief flows once partner facts exist.
