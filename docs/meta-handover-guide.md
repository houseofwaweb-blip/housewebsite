# Meta retargeting — handover guide

This guide is for whoever is finishing the Meta setup on the new
willowalexander.co.uk site. The Next.js codebase is already firing the
right pixel and Conversions API events; the remaining work is operational
inside Meta's Business Manager, Events Manager, and Ads Manager.

Allow ~2 hours for first-time completion. The DNS step (#1) has a wait
period for propagation, so start that first and do the rest while it
ticks.

---

## Before you start — access checklist

You need all of the following before the steps below will work. Confirm
with Alex if anything is missing.

- **Meta Business Manager admin role** on the "House of Willow Alexander"
  (or "Willow Alexander") business account
  ([business.facebook.com](https://business.facebook.com))
- **Pixel access** to pixel ID `1784057992368077` (already in use on the
  legacy WordPress site). You should see it listed under Data Sources.
- **DNS access** to `willowalexander.co.uk` (Cloudflare, Namecheap, or
  wherever the registrar is). Needed for domain verification.
- **Ads Manager access** at the campaign-creation level — needed for the
  Custom Audiences step.

If you don't see the pixel or the business, ask Alex to add you via
Business Settings → People → Add → enter your email → assign roles.

---

## 1. Verify the domain `willowalexander.co.uk`

### Why this matters

Without domain verification, Meta limits the new site to 8 conversion
events for iOS 14+ users and blocks several attribution windows entirely.
The legacy WP site is already running on this domain, but Meta requires
re-verification when a new site replaces it — even on the same domain.

### Steps

1. Go to [business.facebook.com](https://business.facebook.com) and pick
   the House of Willow Alexander business.
2. Click **Business Settings** (top-right, may be labelled with a gear
   icon depending on Meta's current UI).
3. In the left sidebar, find **Brand Safety and Suitability** → **Domains**.
   *(If the menu has moved, search "Domains" in the settings search bar.)*
4. Click **Add** (top-right of the Domains panel).
5. Enter `willowalexander.co.uk` (no `https://`, no `www`). Click **Add**.
6. Meta now presents three verification methods. **Use the DNS TXT
   method** — it's the most reliable and doesn't depend on the site being
   live on a specific provider.

#### DNS TXT verification (recommended)

7. Meta shows a value like `facebook-domain-verification=abc123def456...`.
   Copy it.
8. Open your DNS provider (Cloudflare / Namecheap / etc.) and find the
   DNS records for `willowalexander.co.uk`.
9. Add a new **TXT** record:
   - **Type**: TXT
   - **Name / Host**: `@` (or leave blank, or enter `willowalexander.co.uk`
     — varies by provider; "the root domain" is what you want)
   - **Value / Content**: paste the `facebook-domain-verification=...`
     string Meta gave you
   - **TTL**: leave default (usually 1 hour / 3600 seconds)
10. Save. DNS changes take 5 minutes to a few hours to propagate.
11. Back in Meta, return to the Domains page and click **Verify** next to
    the domain. If it fails, wait 15 minutes and try again. Most modern
    DNS providers propagate within minutes.

#### Fallback: Meta tag verification

Only use this if you can't add a DNS record. Steps:

7. Meta shows a `<meta name="facebook-domain-verification" content="...">`
   tag. Copy the **content value** (just the part inside the quotes).
8. Tell the dev team to add it as `NEXT_PUBLIC_META_DOMAIN_VERIFICATION`
   in the new site's environment variables and to wire it into the root
   layout metadata. Until that's done, this method won't work.

### Verifying success

When verified, the domain shows a green tick next to it in the Domains
list. You can now use this domain for all conversion events without the
8-event iOS cap, and full attribution windows become available.

---

## 2. Configure Aggregated Event Measurement (AEM)

### Why this matters

For iOS 14+ users with App Tracking Transparency turned off (most of them),
Meta only counts **one** conversion event per user per campaign — and the
event that counts is whichever is highest on your AEM priority list.
Setting the priority correctly is the difference between "we counted the
purchase" and "we counted the page view and missed the purchase."

The new site is catalogue-only at launch, so the conversion ladder is:
form submissions > content views > page views.

### Steps

1. Go to [Events Manager](https://business.facebook.com/events_manager).
2. In the left sidebar, click **Data Sources**.
3. Click the pixel `1784057992368077` (it may be labelled "House of Willow
   Alexander" or similar).
4. In the top tabs, click **Aggregated Event Measurement** *(if you don't
   see it, look for "Web Events Configuration" — Meta renames this every
   year or two)*.
5. You'll see a list of events that have been fired from the pixel
   recently. Click **Manage Events** (or **Configure Web Events**).
6. Select the verified domain `willowalexander.co.uk` from the dropdown.

### Set the priority

You're allowed up to **8 events** in priority order. The top of the list
is the most valuable — Meta counts the top-most event the user has fired,
ignoring the rest.

Drag-and-drop or use the up/down arrows to set the order as follows:

| Priority | Event | Why this rank |
|---|---|---|
| 1 (highest) | `Schedule` | Consultation booking — closest signal to revenue we have |
| 2 | `Lead` | Contact, waitlist, partner enquiry — broad commercial intent |
| 3 | `CompleteRegistration` | Newsletter signup — engaged audience |
| 4 | `ViewContent` | All product / service / HoWA page views — for upper-funnel retargeting |
| 5 | `Search` | Site search query — intent signal |
| 6 | `PageView` | Everything else |

Leave slots 7 and 8 empty. Don't add `Purchase`, `AddToCart`, or
`InitiateCheckout` — they don't fire on this site yet (catalogue-only
launch; ecommerce is a Path B follow-up).

Click **Apply** / **Save**. Meta says "Changes take up to 72 hours to take
effect" — in practice it's usually a few hours, but plan around the
72-hour figure when scheduling campaign launches.

### Verifying success

In the AEM screen, you should see the 6 events listed in the priority you
set, with a green status indicator. If any show "Pending" or amber, give
it a few hours and refresh.

---

## 3. Build the 10 Custom Audiences

### Why this matters

These are the audiences you'll target with Meta ads. They map directly to
the events the new site is firing, so every visitor who opts in to
Marketing cookies will land in the appropriate bucket automatically.

### How to build a Custom Audience (template)

You'll repeat this pattern 10 times. The structure is always:

1. Go to [Ads Manager](https://business.facebook.com/adsmanager) →
   **Audiences** (from the top nav; if you don't see it, click the
   hamburger / "All Tools" menu and find Audiences under "Plan").
2. Click **Create Audience** → **Custom Audience**.
3. Source = **Website**.
4. Pick the pixel `1784057992368077`.
5. **Include**: pick "People who meet ANY of the following criteria"
   (or "ALL" — varies per audience, see each one below).
6. Configure the event + filter rules per the table below.
7. Set the retention window (most are 30 days for active retargeting;
   180 days for awareness).
8. Give the audience a clear name following the convention:
   `HoWA / [Page] / [State] / [Days]`
   e.g. `HoWA / Plus / Interested / 30d`
9. **Exclude**: where indicated, add an exclusion rule.
10. Save.

> **Tip on event filters**: when you pick an event like `ViewContent`,
> Meta lets you refine by event parameters like `content_id` or
> `content_category`. Use these — they're the difference between a
> precise audience and a noisy one. The content IDs are listed in
> [meta-retargeting.md](./meta-retargeting.md) in this repo.

### The 10 audiences

#### Audience 1 — HoWA+ interested, not converted

- **Event**: `ViewContent`
- **Refine by parameter**: `content_category` equals `howa_membership`
  **OR** `content_id` equals `howa_plans`
- **Retention**: 30 days
- **Exclude**: `CompleteRegistration` event in last 180 days
- **Use for**: "Two ways to be stewarded" ads, £16.99 hook
- **Name**: `HoWA / Plus / Interested / 30d`

#### Audience 2 — HoWA engaged readers

- **Event**: `ViewContent`
- **Refine by parameter**: `content_category` equals `howa_marketing`
- **Add a time filter** (in the audience rules — there's an option for
  "spent at least X seconds on page", which uses ViewContent + dwell time):
  ≥ 30 seconds
- **Retention**: 60 days
- **Use for**: educational top-of-funnel ads driving back to `/howa/plus`
- **Name**: `HoWA / Engaged Readers / 60d`

#### Audience 3 — Steward interested, not waitlisted

- **Event**: `ViewContent`
- **Refine by parameter**: `content_id` equals `howa_steward`
- **Retention**: 30 days
- **Exclude**: `Lead` event with **URL parameter** `sourcePage` containing
  `/howa/steward` in last 180 days
- **Use for**: "Join the Steward waitlist" ads
- **Name**: `HoWA / Steward / Interested / 30d`

#### Audience 4 — Steward waitlist members (lookalike seed + exclusion)

- **Event**: `Lead`
- **Refine by URL**: URL contains `/howa/steward` OR the form-submit URL
  contains `topic=steward`
- **Retention**: 180 days
- **Use for**: exclude from Audience 3; **seed for 1% UK lookalike**
- **Name**: `HoWA / Steward / Waitlist / 180d`

#### Audience 5 — Shop browsers, high intent

- **Event**: `ViewContent`
- **Refine by parameter**:
  - `content_type` equals `product`
  - AND `content_category` not equals `service`
  - AND `content_category` does not start with `howa_`
- **Retention**: 30 days
- **Use for**: "A curated edit, by enquiry" ads pointing back to `/shop`
- **Name**: `Shop / Browsers / 30d`

#### Audience 6 — Shop enquirers (lookalike seed + exclusion)

- **Event**: `Lead`
- **Refine by URL**: URL contains `/contact` AND URL contains
  `topic=shop`
- **Retention**: 180 days
- **Use for**: exclude from Audience 5; **seed for 1% UK lookalike**
- **Name**: `Shop / Enquirers / 180d`

#### Audience 7 — Service viewers, not booked

- **Event**: `ViewContent`
- **Refine by parameter**: `content_category` equals `service`
- **Retention**: 30 days
- **Exclude**: `Schedule` event in last 180 days
- **Use for**: "Book a consultation" ads, locally targeted to London
- **Name**: `Services / Viewers / 30d`

#### Audience 8 — Consultation bookers (highest-value LAL seed)

- **Event**: `Schedule`
- **Retention**: 180 days
- **Use for**: exclude from Audience 7; **highest priority for 1% UK
  lookalike** — this is your most valuable seed
- **Name**: `Services / Bookers / 180d`

#### Audience 9 — All visitors, 30 days

- **Event**: `PageView`
- **Retention**: 30 days
- **Use for**: general awareness retargeting, sale campaigns
- **Name**: `All / Visitors / 30d`

#### Audience 10 — All visitors, 180 days

- **Event**: `PageView`
- **Retention**: 180 days
- **Use for**: seasonal / sale campaigns, long-tail awareness
- **Name**: `All / Visitors / 180d`

### After saving the audiences

Each audience takes **24–48 hours** to populate enough for ad targeting.
Meta requires a minimum of **1,000 matched profiles** before you can
target an audience in ads (smaller audiences will show "audience too
small" warnings).

Because the consent banner is opt-in for marketing, expect ~30–45% of
visitors to land in these audiences. So if the site gets 1,000 visitors,
roughly 350 will be eligible. For ad targeting, you'll likely need
3,000+ raw visitors before audiences are usable — plan launch traffic
accordingly.

### Building Lookalike Audiences

Once any **seed audience** (4, 6, 8) has ≥ 100 matched UK profiles, build
a Lookalike from it:

1. Audiences → Create Audience → **Lookalike Audience**.
2. Source: pick the Custom Audience (e.g. `Services / Bookers / 180d`).
3. Location: **United Kingdom**.
4. Audience size: start with **1%** (most similar). Scale to 2–3% later.
5. Save.

Recommended priority order (build the highest-value seed first):

1. **Audience 8** (Consultation bookers) — highest-value LAL
2. **Audience 4** (Steward waitlist) — premium-segment LAL
3. **Audience 6** (Shop enquirers) — premium-objects LAL

---

## 4. Test before launching paid campaigns

Before spending any money on ads, verify the funnel is firing correctly.
The dev team can flip the site into a "test events" mode by setting
`META_CAPI_TEST_EVENT_CODE` in the environment — ask Alex if this isn't
already done.

### Test checklist

1. Open the new site in an incognito window.
2. Accept all cookies in the banner (including Marketing).
3. Visit `/howa/plus` — wait 5 seconds.
4. Visit `/services/gardening` — wait 5 seconds.
5. Search for "secateurs" in the site search modal.
6. Submit a contact form with test details.
7. Submit a newsletter signup.
8. Go to Events Manager → your pixel → **Test Events** tab.
9. You should see, in order: `PageView`, `ViewContent (howa_plus)`,
   `ViewContent (gardening)`, `Search`, `Lead`, `CompleteRegistration`.
10. For each form event, you should see **two entries** with the same
    `event_id` but different sources: one labelled "Browser" and one
    labelled "Server" — that's the CAPI dedup working correctly.
11. If anything is missing or `event_id` doesn't match between browser
    and server, flag to the dev team before going live.

Remove the `META_CAPI_TEST_EVENT_CODE` env var before launching ads, or
all real events will continue routing to the test view and won't be
counted for attribution.

---

## Troubleshooting

**Domain shows "Pending" indefinitely after DNS update**
- Check DNS propagation with [dnschecker.org](https://dnschecker.org/) —
  search for `willowalexander.co.uk` TXT records.
- If propagation has happened but Meta still says Pending: delete the
  domain in Meta and re-add it. Sometimes Meta's cache needs a hard reset.

**AEM "Pending" or amber status**
- Wait 24 hours after configuring. Meta needs to see live traffic firing
  the events you've configured before they go fully green.
- If still pending after 48 hours, check Events Manager → Diagnostics tab
  for error messages on individual events.

**Custom Audience showing "Too small to target"**
- Meta needs ≥ 1,000 matched profiles. If the site is new, just wait.
- Check the retention window — if it's set to 7 days and the site is new,
  expand to 30 or 60 days.
- Verify Marketing-category consent opt-in rate (Clarity / GA4 can show
  what % of visitors are accepting marketing cookies).

**Lookalike Audience won't create**
- Source audience needs ≥ 100 matched profiles in the source country.
  Check the Custom Audience size before trying to build a Lookalike from
  it.

**Events firing twice in Test Events with the same name but different
event_ids**
- This means dedup isn't working. The browser pixel and CAPI are firing
  independently rather than matching. Flag to the dev team — they need to
  verify the `metaEventId` is being passed correctly from the form
  response into `fbq()`.

---

## Quick reference card

| Step | Where | Time |
|---|---|---|
| Verify domain | Business Settings → Brand Safety → Domains | 10 min + DNS wait |
| Configure AEM | Events Manager → Pixel → AEM tab | 5 min + 24h propagation |
| Build 10 audiences | Ads Manager → Audiences | 30–45 min |
| Test events | Events Manager → Test Events | 15 min |
| Build lookalikes (later) | Ads Manager → Audiences → Lookalike | 5 min each, after seeds have ≥ 100 |

Questions about the firing side of the integration → ask the dev team and
point them at [meta-retargeting.md](./meta-retargeting.md) in this repo
which documents what's wired and how.
