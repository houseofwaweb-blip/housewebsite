# Klaviyo — signup events, properties & how to segment

Every sign-up on the site flows into Klaviyo. There are **two** entry points:

1. **Register-interest** (insurance, protect, HoWA app, local services, Steward)
   → one list (`KLAVIYO_LIST_ID`) + a **`Register Interest`** metric/event.
2. **Newsletter** (footer / inline / Hearth) → the newsletter list (`Xbs4GL`)
   + a **`Marketing Site Newsletter Signup`** metric/event.

Build **segments** off the event `product` (or newsletter `interest_tags`) and
**flows** off the event itself. Don't campaign to the whole list — target a
segment, so register-interest people only get their relevant flow.

---

## 1. Register Interest (one list, segment by `product`)

**Metric:** `Register Interest`
**Key property to segment on:** `product`

| `product` value | Where it comes from | What it means |
|---|---|---|
| `insurance` | /protect/insurance, /protect | House Approved insurance interest |
| `protect_review` | /protect/home-protection, /protect | Home Protection Review interest |
| `other` | /services/local/[slug] | A location + service page (e.g. "gardening in X") |
| `howa_app` | HoWA app waitlist | Early access to the HoWA app |
| `steward` | /howa/steward | Steward application (by application) |

**Other properties on the profile/event you can use:**
- `registered_interest` — **profile property**, same values as `product`
  (`insurance` / `protect_review` / `howa_app` / `steward` / `other`). This is
  the one visible directly on the profile, so you can build a segment on the
  *profile property* as well as on the `Register Interest` event's `product`.
- `tier_interest` — `Assistant` / `Housekeeper` / `Steward` / `Undecided` (HoWA app)
- `signup_page` — the URL path they signed up from
- `postcode`, `property_type`, `steward_note` — Steward / waitlist extras
- `steward_application: true` — set when tier interest is Steward

### Example segment (Klaviyo → Lists & Segments → Create Segment)
> **Insurance interest** — *What someone has done* → `Register Interest`
> at least once where **product** equals `insurance`.

Repeat for `protect_review`, `howa_app`, `steward`, `other`.

### Example flow (welcome / notify series)
> Trigger: **Metric** → `Register Interest`
> Filter: `product` equals `insurance`
> → your Insurance welcome / "we'll be in touch" series.

---

## 2. Newsletter (list `Xbs4GL`, segment by interest)

**Metric:** `Marketing Site Newsletter Signup`
**Properties:**
- `interest_tags` — e.g. `design`, `gardens`, `interiors`, `recipes`, `care`
  (derived from which surface they signed up on)
- `surfaces` — the raw surface list
- `signup_page`

### Example segment
> **Garden-interested newsletter** — `Marketing Site Newsletter Signup`
> where **interest_tags** contains `gardens`.

---

## Marketable contacts (billing / consent)

Register-interest and newsletter sign-ups are **subscribed (consented)** — they
count as **active/marketable profiles** (Klaviyo bills on these) and are eligible
for campaigns **sent to that list**. To keep them from getting unrelated mail:

- **Campaign to segments, not the list.** Your general newsletter goes to the
  newsletter segment; register-interest people only get their product flow.
- If a register-interest list grows large and you don't intend to campaign to
  it, you can periodically **suppress** those profiles to control the bill —
  they'll still be reachable by their flow.

---

## Where this is wired (for devs)
- `src/lib/klaviyo/index.ts` — `subscribeToWaitlist` (register-interest) +
  `subscribeToNewsletter` + `trackEvent` (the `Register Interest` /
  `Marketing Site Newsletter Signup` metrics).
- `src/lib/forms/submit.ts` — every waitlist product subscribes + fires the
  `Register Interest` event with `product`.
- Lists are set via env: `KLAVIYO_LIST_ID` (register-interest), newsletter list
  id is `Xbs4GL` (hardcoded in `klaviyo/index.ts`).
