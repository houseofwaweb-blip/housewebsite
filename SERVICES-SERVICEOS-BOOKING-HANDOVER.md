# Services → ServiceOS booking handoff — handover

How a visitor who picks a service and enters a postcode is carried into the
ServiceOS Online Booking Form (OBF) with that service **pre-selected** and the
postcode **pre-filled**. Everything here is what the code actually does today.

---

## 1. The flow in one line

Visitor picks a service + types a postcode → we build a deep-link
`…?book=1&service_id=<id>&fs_payload[postcode]=<PC>` → a **full page navigation**
to it → our `BookingWidget` sees `book=1`, loads the OBF client, and opens the
modal → the OBF reads `service_id` (skips the service-picker) and
`fs_payload[postcode]` (pre-fills the address postcode) from the URL.

> **Important:** service pre-select + the House logo only work on the **live,
> ServiceOS allow-listed domain**. On localhost and per-deploy Vercel **preview**
> hosts the modal still opens, but ServiceOS ignores the preselect/logo because
> the origin is not allow-listed. Test the preselect on production (or ask
> ServiceOS to allow-list the preview host).

---

## 2. The deep-link format

Built by `buildBookingUrl(postcode, serviceId?, path = "/")` in
`src/components/booking/postcode.ts`:

```
<path>?book=1&service_id=<id>&fs_payload[postcode]=<NORMALISED POSTCODE>
```

- `book=1` — **our** trigger. `BookingWidget` opens the modal on arrival.
- `service_id=<id>` — ServiceOS service pre-selection (top-level param; skips the
  service screen). Omitted → a fresh booking.
- `fs_payload[postcode]=<PC>` — the postcode, pre-filled into the OBF address
  field. **Key is literally `fs_payload[postcode]`** (confirmed working on the
  live OBF, 2026-08-18). Only the *value* is URL-encoded; the `[` `]` brackets
  stay literal (browsers keep them, and the iframe reads the literal key).

Rules that must not be broken (documented inline in `postcode.ts` /
`BookingWidget.tsx`):
- **Must be a full page navigation** (plain `<a href>` / `location.assign`), NOT
  a client-side Next `<Link>` — a soft nav does not re-init the OBF client.
- `BookingWidget` strips our params by **raw-string editing**, never
  `URLSearchParams.toString()` (that re-encodes the brackets before the OBF
  reads them, so the postcode is lost).
- **Do not emit `fs_screen=new_booking`** — it lives in the history entry and
  re-opens the booking when the user hits Back (the reported loop). `book=1` is
  enough.

---

## 3. Where it is wired

| File | Role |
|---|---|
| `src/lib/serviceos-links.ts` | `SERVICEOS_SERVICE_ID` — slug → ServiceOS numeric id (the table in §5). |
| `src/components/booking/postcode.ts` | `buildBookingUrl()`, postcode normalise/validate, `COVERED_AREAS`, `isCovered()`. |
| `src/components/marketing/BookingWidget.tsx` | Loads the OBF client, opens on `book=1`/`#open-booking-form`, strips params. Mounted once in the root layout. |
| `src/components/marketing/HeroServiceFinder.tsx` | Services hero: pick a service + postcode → `buildBookingUrl` → navigate. |
| `src/components/home/BookingRail.tsx` | Homepage rail: service + postcode → booking url. |
| `src/components/booking/PostcodeBooking.tsx` | `location.assign(buildBookingUrl(postcode, serviceId, path))`. |
| `src/app/services/[slug]/[sub]/page.tsx` | Leaf service pages preselect the **exact** sub-service id. |
| `src/components/marketing/{ServiceDetail,LocationServiceDetail,ServiceCtaRow,EnquiryForm}.tsx` | Per-service CTAs using the same helpers. |

Any anchor with `href="#open-booking-form"` also opens the modal (no preselect).

---

## 4. OBF configuration (from `BookingWidget.tsx`, sourced from the live WP plugin)

| Field | Value |
|---|---|
| App URL | `https://accounts.willowalexander.co.uk/obf/` |
| API URL | `https://willowalexander.serviceos.com/` |
| Accounts URL | `https://accounts.willowalexander.co.uk/` |
| Client script | `https://accounts.willowalexander.co.uk/obf/client/client.min.js` (hourly cache-buster) |
| Profile ID | `4` |
| Country | `UK` |
| Source abbr | `GORG` |
| Widget key (publishable) | `9xtc467tfmzdsjj1s1bg50vkmktkdhd9xknslxub3gyex0zls9ttwll14i3hdq9a` |
| Phone | `0800 047 8738` |
| Theme primary / secondary | `#c2a660` (gold) / `#0f3e33` (navy) |
| Logo | `/brand/howa/howa-black.png` (PNG — OBF modal doesn't render SVG reliably) |
| `init_event` | `on_click` (binds to `#open-booking-form` links) |

The widget key is **publishable** (like a Stripe publishable key) — it only
identifies the booking profile to ServiceOS's CDN client; real auth happens on
`accounts.willowalexander.co.uk`. The bundle is ~800KB and is **deferred** (loads
on first interaction, or on a Book click, or on `book=1` arrival) to protect LCP.

---

## 5. Service IDs (`SERVICEOS_SERVICE_ID`)

IDs come from ServiceOS's own export (`serviceos-all-service-links.csv`), taking
the **visible** row where a name appears twice. A slug not listed here falls back
to a fresh booking (still carrying the postcode).

**Disciplines (high-intent generic service):**

| Slug(s) | ID | ServiceOS service |
|---|---|---|
| `gardening`, `gardeners` | 148 | Garden Maintenance Visit |
| `cleaning`, `cleaners` | 115 | Regular Domestic Cleaning |
| `window-cleaning`, `windows` | 121 | Window Cleaning |
| `handyman`, `repairs` | 90 | Handyman |
| `removals` | 47 | Small house move |
| `energy` | 60 | Electric car charging |
| `pet-care` | 65 | Dog Walking |
| `housekeeping` | — | none — opens a fresh booking (`?book=1`) |

**Sub-services (leaf `/services/[slug]/[sub]` pages preselect the exact service):**

| Slug | ID | ServiceOS service |
|---|---|---|
| `garden-clearance` | 149 | Garden Clearance Packages |
| `garden-tidy` | 23 | Garden Tidy |
| `lawn-care` | 2 | Lawn Care |
| `hedge-and-boundary-maintenance` | 7 | Hedge & Boundary |
| `planting` | 53 | Planting |
| `tree-work` | 8 | Tree Work |
| `turf-laying` | 54 | Turf laying |
| `garden-maintenance-subscriptions` | 131 | Garden Maintenance Subscription |
| `jet-washing` | 124 | Jet Washing |
| `regular-window-cleaning` | 64 | Regular window cleaning |
| `one-off-window-cleaning` | 63 | One off window cleaning |
| `gutter-cleaning` | 123 | Gutter Cleaning |
| `regular-cleaning` | 115 | Regular Domestic Cleaning |
| `one-off-cleaning` | 61 | One off cleaning |
| `end-of-tenancy-cleaning` | 58 | End of Tenancy Cleaning |
| `after-building-cleaning` | 62 | After building cleaning |
| `spring-clean` | 59 | Spring Cleaning |
| `furniture-assembly` | 34 | Furniture Assembly |
| `picture-hanging` | 37 | Hanging pictures |
| `shelving-installation` | 77 | Shelving Installation |
| `tv-wall-mounting` | 35 | Wall mounting TV |
| `door-hanging` | 84 | Door Hanging |
| `general-repairs` | 90 | Handyman (generic repairs) |
| `baby-proofing` | 75 | Baby Proofing |
| `alarm-installation` | 76 | Alarm Installation |
| `bed-assembly` | 85 | Bed Assembly |
| `cat-flap-installation` | 80 | Cat Flap Installation |
| `christmas-lights` | 87 | Christmas Light Installation & Removing |
| `loft-organisation` | 78 | Loft Organisation |
| `small-house-move` | 47 | Small house move |
| `large-item-collection` | 49 | Large item shop collection |
| `local-pick-up-drop-off` | 48 | Local pick up and drop off |
| `moving-to-storage` | 46 | Moving stuff to storage |
| `home-organising` | 88 | Home Organisation |
| `solar-installation` | 66 | Solar installation |
| `ev-charging` | 60 | Electric car charging |
| `dog-walking` | 65 | Dog Walking |
| `dog-sitting` | 67 | Dog sitting |

**No ServiceOS service yet (fresh booking, postcode still carried):**
`lawn-mowing`, `softwashing`, commercial window/cleaning variants,
`painting-and-decorating`, `packing-service`, `electrical-repairs`,
`commercial-electrical`, `new-builds-renovations`, `electrical-testing`.

---

## 6. Coverage (advisory only)

`COVERED_AREAS` in `postcode.ts`: **BR, CR, DA, E, IG, N, SE, SW, TN**. This is an
advisory pre-check so out-of-area visitors get a message instead of a dead end;
**ServiceOS remains the authority** and re-checks coverage per service against the
full address. Keep in sync with ServiceOS → Setup → Services → Coverage.

`postcodeArea("NW1 1AA")` → `"NW"` (matches leading letters only, so NW is not
mistaken for the covered `N`).

---

## 7. Adding / changing a service

1. Get the numeric `service_id` from ServiceOS's `serviceos-all-service-links.csv`
   (use the **visible** row if a title is duplicated).
2. Add `"<slug>": <id>,` to `SERVICEOS_SERVICE_ID` in `src/lib/serviceos-links.ts`.
3. Nothing else — the finders and service pages build the link automatically.
4. Verify on the **live** domain (preselect won't show on preview/localhost).

---

*Sources: `src/lib/serviceos-links.ts`, `src/components/booking/postcode.ts`,
`src/components/marketing/BookingWidget.tsx`, and the existing
`SERVICEOS_EXTERNAL_BOOKING_LINK.md`.*
