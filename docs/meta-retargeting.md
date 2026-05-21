# Meta retargeting — audience setup

This is a one-page reference for the audiences that the new site is wired to support. Every audience below maps to events that already fire from the codebase — no code changes are needed in the new site to build any of them.

## What's firing (already wired)

| Event | Where it fires | Browser pixel | CAPI |
|---|---|---|---|
| `PageView` | Every route | ✅ | — |
| `ViewContent` | All product, service, and HoWA pages (see content IDs below) | ✅ | — |
| `Search` | SearchModal, debounced 300ms | ✅ | — |
| `Lead` | `/api/forms/contact`, `/api/forms/waitlist` | ✅ | ✅ deduped |
| `Schedule` | `/api/forms/consultation` | ✅ | ✅ deduped |
| `CompleteRegistration` | `/api/forms/newsletter` | ✅ | ✅ deduped |

All events are gated on the user opting in to the **Marketing** category of the consent banner — so audiences will skew to ~30–45% of total visitor pool (the privacy-forward cost).

## ViewContent content IDs (use these in audience rules)

| Page | `content_id` | `content_category` |
|---|---|---|
| `/howa` | `howa_overview` | `howa_marketing` |
| `/howa/plans` | `howa_plans` | `howa_pricing` |
| `/howa/plus` | `howa_plus` | `howa_membership` |
| `/howa/steward` | `howa_steward` | `howa_membership` |
| `/howa/companion` | `howa_companion` | `howa_product_feature` |
| `/howa/how-it-works` | `howa_how_it_works` | `howa_marketing` |
| `/howa/faq` | `howa_faq` | `howa_marketing` |
| `/shop/[handle]` | the product handle | the collection (e.g. "Garden") |
| `/services/[slug]` | the service slug | `service` or the Sanity category |

## Recommended Custom Audiences

Create these in **Meta Ads Manager → Audiences → Custom Audience → Website**. Each can be 7/14/30/60/180-day windows — start with **30-day** for active retargeting, **180-day** for awareness-tier remarketing.

### HoWA+ funnel

1. **HoWA+ interested — not converted**
   - Event: `ViewContent`
   - Filter: `content_category` equals `howa_membership` OR `content_id` equals `howa_plans`
   - Exclude: anyone who fired `CompleteRegistration` (proxy for member signup once HoWA Product is live)
   - Use for: "Two ways to be stewarded" ads with the £16.99 hook

2. **HoWA+ engaged readers**
   - Event: `ViewContent`
   - Filter: `content_category` equals `howa_marketing` AND time spent ≥ 30s (set in audience definition)
   - Use for: educational top-of-funnel ads driving back to `/howa/plus`

### Steward (waitlist driver)

3. **Steward interested — not waitlisted**
   - Event: `ViewContent`
   - Filter: `content_id` equals `howa_steward`
   - Exclude: anyone who fired `Lead` from a waitlist form
   - Use for: "Join the Steward waitlist" ads

4. **Steward waitlist members** (use as exclusion + lookalike seed)
   - Event: `Lead` with source page containing `/howa/steward`
   - Use for: exclude from #3 above; seed a 1% UK lookalike for cold prospecting

### Shop catalogue

5. **Shop browsers — high intent**
   - Event: `ViewContent`
   - Filter: `content_type` equals `product` AND `content_category` not equal to `service` AND `content_category` not starts with `howa_`
   - Use for: "A curated edit, by enquiry" ads pointing back to `/shop` once a stock of pieces is ready

6. **Shop enquirers**
   - Event: `Lead` with source page containing `/contact` AND query string contains `topic=shop`
   - Use for: exclude from #5; seed lookalikes for premium-objects audience

### Services

7. **Service viewers — not booked**
   - Event: `ViewContent` with `content_category` equals `service`
   - Exclude: anyone who fired `Schedule`
   - Use for: "Book a consultation" ads, locally targeted

8. **Consultation bookers** (high-value LAL seed)
   - Event: `Schedule`
   - Use for: 1% UK lookalike — this is your most valuable seed

### Site-wide top-of-funnel

9. **All visitors — 30 day** — every PageView. Use for general awareness retargeting.
10. **All visitors — 180 day** — same, longer window. Use for sale/seasonal campaigns.

## Lookalike seeds (priority order)

Once the source audience has ≥100 matched UK profiles, build lookalikes from these — in this priority order:

1. **Consultation bookers** (`Schedule`) — highest value, paying intent
2. **Steward waitlist** (`Lead` from steward pages) — premium-segment self-selection
3. **Newsletter registrants** (`CompleteRegistration`) — engaged audience
4. **All form leads** (`Lead`) — broad commercial intent

Recommend **1% UK** for prospecting, **1–3% UK** when you scale.

## Aggregated Event Measurement (AEM) priority

Meta caps you at 8 prioritised events for iOS 14+ users. Configure in Events Manager → Aggregated Event Measurement. Recommended priority for this site (highest first):

1. `Schedule` (consultation booking — best conversion signal we have)
2. `Lead` (contact, waitlist, partner enquiry)
3. `CompleteRegistration` (newsletter)
4. `ViewContent` (all product/service/plan views)
5. `Search`
6. `PageView`

(`AddToCart` / `InitiateCheckout` / `Purchase` don't fire on this site — Path A is catalogue-only — so omit them until the Shopify cutover in Path B.)

## Domain verification

Required before iOS 14+ conversion measurement works on `willowalexander.co.uk` from the new Next.js site. Two paths:

- **DNS TXT** (recommended): Business Settings → Brand Safety → Domains → Add → DNS TXT → add `facebook-domain-verification=<value>` to your DNS
- **Meta tag**: same screen, choose "Meta tag" → paste the value as `NEXT_PUBLIC_META_DOMAIN_VERIFICATION` (env var not yet added — flag if you go this route and I'll wire it into the root layout metadata)

## Testing the funnel before going live

Drop a value into `META_CAPI_TEST_EVENT_CODE` in `.env.local` (from Events Manager → Test Events tab). While set, all CAPI events route to the test view instead of production. Submit one form per type and verify each one shows up in Test Events with `event_id` matched against the browser pixel event. Remove the env var when verified.

## What still requires Path B (Shopify migration)

These are not wired today and won't be until the Shopify cutover:

- `AddToCart` — no cart exists in the catalogue-only model
- `InitiateCheckout` — no checkout
- `Purchase` — no order completion
- Dynamic Product Ads (the "this exact lamp follows you on Instagram" experience) — needs the Shopify ↔ Meta catalog connection

These are upper-funnel-only consequences. Retargeting on intent (`ViewContent`) and conversion on leads (`Lead`, `Schedule`, `CompleteRegistration`) all work from day 1.
