# Google Ads attribution — handover guide

This guide is for the PPC team picking up the new willowalexander.co.uk
site. The Next.js codebase already has the full attribution stack wired:
GA4, Google Ads tag, Enhanced Conversions, Consent Mode v2, and GCLID
capture. The remaining work is operational inside Google Ads and Google
Analytics 4.

Allow ~2 hours for first-time completion.

---

## What's already wired on the site

So you know the contract:

- **GA4** (`G-HN657RY0DT`) loads on every page with Consent Mode v2
  default-denied. When the user grants Measurement, GA4 upgrades to full
  tracking.
- **Google Ads tag** (`AW-10957066467`) loads on the same gtag.js
  instance. When the user grants Marketing, retargeting cookies activate.
- **Consent Mode v2 advanced mode**: even users who reject consent are
  counted via cookieless pings for conversion modelling. Recovers ~30% of
  lost attribution.
- **Enhanced Conversions**: hashed email, phone, name, and postcode are
  sent with every conversion event. Recovers iOS/ITP/ad-blocker users
  via Google's identity match.
- **Click ID capture**: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`
  are pulled from URLs and persisted to a first-party cookie +
  localStorage for the 90-day window.
- **Conversion firing** on form submissions: `Lead`, `Schedule`,
  `Registration` events fire to Google Ads with full Enhanced Conversions
  payload after Lead, Consultation, and Newsletter form submits.

What you need to do is **define the conversion actions in Google Ads**,
**link GA4 to Google Ads**, **enable Enhanced Conversions for web**, and
**verify it all fires**.

---

## Before you start — access checklist

You need all of the following before the steps below will work. Confirm
with Alex if anything is missing:

- **Google Ads account access** at Admin level (or "Standard" with edit
  permission on Conversions)
- **GA4 property access** at Admin or Editor level on
  `G-HN657RY0DT`
- **The dev team can update environment variables** — you'll generate
  three conversion labels in step 1 below and need to hand them over.

---

## 1. Create the three Conversion Actions in Google Ads

### Why this matters

Each form-submission event the site fires (Lead, Schedule, Registration)
needs a matching Conversion Action defined in Google Ads. The Conversion
Action gives you the **Conversion Label** (a short alphanumeric string
like `abcDEFghi123`) that the code uses as the `send_to` target. Without
the label, the firing code is a no-op.

### Steps — repeat 3 times, one per conversion

1. Go to [ads.google.com](https://ads.google.com) and pick the Willow
   Alexander Google Ads account.
2. Click **Tools** (spanner icon, top nav) → **Conversions** *(if the
   menu has moved, look under "Goals" → "Conversions")*.
3. Click **+ New conversion action** → **Website**.
4. Enter your **website domain**: `willowalexander.co.uk`. Click **Scan**.
5. Google will detect the existing tag. When it asks how to set up,
   choose **Add a conversion action manually** (not auto-detection — the
   manual config gives you the right granularity).
6. Fill in the fields per the table below for each of the three
   conversions. Repeat steps 3–6 for each row.

| Conversion | Category | Name | Value | Count | Click-through window | Attribution model |
|---|---|---|---|---|---|---|
| **Lead** | Submit lead form | "House — Lead (Contact / Waitlist)" | Don't use a value | One | 30 days | Data-driven |
| **Schedule** | Book appointment | "House — Schedule (Consultation)" | Don't use a value | One | 30 days | Data-driven |
| **Registration** | Sign-up | "House — Registration (Newsletter)" | Don't use a value | One | 30 days | Data-driven |

> **Tip on values**: leave these blank to start. Once you have ~30 days
> of conversions, you can revisit and assign per-conversion values based
> on actual close rates (e.g. Schedule = £400 if average consultation
> leads to £400 service revenue at 30% close).

> **Attribution model**: "Data-driven" requires Google Ads to have enough
> conversion volume; if it greys out, use "Last click" as a fallback
> and switch to data-driven once volume builds.

7. On the next screen, choose **"Use Google tag"** (not Google Tag
   Manager — the site uses gtag directly).
8. **Skip** the "Install the tag yourself" step — the tag is already
   installed by the dev team.
9. On the **Tag setup** screen, you'll see a snippet like:
   ```
   gtag('event', 'conversion', { 'send_to': 'AW-10957066467/abcDEFghi123' });
   ```
   **Copy the label part only — the bit after the slash, e.g.
   `abcDEFghi123`.** Don't copy the `AW-...` prefix.
10. Click **Done** / **Save**.

### Hand over the labels

Once all three Conversion Actions exist, you'll have three labels. Hand
them to the dev team to drop into `.env.local`:

| Site env var | Conversion label from Google Ads |
|---|---|
| `NEXT_PUBLIC_GADS_CONVERSION_LEAD` | (label from "House — Lead" conversion) |
| `NEXT_PUBLIC_GADS_CONVERSION_SCHEDULE` | (label from "House — Schedule" conversion) |
| `NEXT_PUBLIC_GADS_CONVERSION_REGISTRATION` | (label from "House — Registration" conversion) |

Once they redeploy with the values filled in, conversions start firing
in real time.

---

## 2. Enable Enhanced Conversions for web

### Why this matters

Enhanced Conversions sends hashed first-party PII (email, phone, name,
postcode) to Google alongside each conversion event. Google matches the
hash against signed-in Google identities and recovers attribution for
users whose cookies were blocked by iOS, ITP, ad-blockers, etc. Typical
uplift is **+20–30% conversion match rate** on iOS, **+10–15% overall**.

The hashing already happens client-side in the codebase
(`lib/google/conversions.ts` uses SubtleCrypto for SHA-256). You just
need to flip the switch in Google Ads so it accepts the data.

### Steps

1. In Google Ads: **Tools** → **Conversions** → click one of the three
   conversion actions you created in step 1.
2. Scroll to the **Enhanced conversions** section.
3. Toggle **Turn on enhanced conversions for web** to **On**.
4. Pick **Google tag** as the implementation method.
5. Accept the customer data terms.
6. **Repeat for all three conversion actions** (Lead, Schedule,
   Registration). Enhanced Conversions is per-action, not account-wide.
7. Save.

### Verifying success

Go back to the conversion action overview. Under "Enhanced conversions"
you should see status **"Recording conversions correctly"** within 24–48
hours of real traffic. Until then it may show "Pending verification" —
that's expected.

### Common failure mode

If Google reports **"Missing tag implementation"** or **"No user_data
detected"**:
- Check that visitors are actually submitting forms (Enhanced Conversions
  only fires on form-submission events, not page views)
- Confirm at least one of `email`, `phone`, `firstName`, `lastName`, or
  `postcode` is populated on the form being submitted — if your test
  submissions have empty fields, no user_data is sent
- Check the Marketing toggle in the consent banner is being granted in
  test submissions

---

## 3. Link Google Ads to GA4

### Why this matters

Linking the two accounts unlocks three meaningful capabilities:

1. **GA4 audiences become available in Google Ads** — for example, you
   can target an Ads campaign at "GA4 users who viewed `/howa/plus` but
   didn't convert" without rebuilding the audience in Ads.
2. **Bid optimisation uses GA4 conversions** — Google Ads' Smart Bidding
   can use GA4 goal completions as additional signal beyond your three
   Google Ads conversion actions.
3. **GA4 reports show ad cost data** alongside conversion data — your
   cost-per-conversion lives in the same view as the conversion itself.

### Steps

1. Go to [analytics.google.com](https://analytics.google.com) and pick
   the Willow Alexander GA4 property.
2. Click **Admin** (cog icon, bottom-left) → in the **Property** column,
   click **Google Ads links**.
3. Click **Link**.
4. **Choose Google Ads accounts**: pick the Willow Alexander Google Ads
   account from the dropdown. Confirm.
5. **Configure settings**:
   - **Enable Personalized Advertising**: ON
   - **Enable auto-tagging**: ON *(critical — this is what makes the
     `gclid` parameter appear on Google Ad click destinations in the
     first place)*
6. **Review and submit**.

### Verifying success

- Back in **Admin → Google Ads links**, the link should show status
  **"Linked"**.
- 24 hours later, go to Google Ads → **Audiences** → **+ New Audience** →
  **Custom audience** → pick **GA4 source**. If GA4 audiences are
  available in the dropdown, the link is working.

### Optional follow-up: import GA4 conversions to Google Ads

If you have key conversion events defined in GA4 that aren't replicated
as Google Ads conversion actions (e.g. specific button clicks, scroll
depth milestones), you can import them:

1. Google Ads → **Tools** → **Conversions** → **+ New conversion action**
   → **Import** → **Google Analytics 4 properties** → **Web**.
2. Pick the conversions from GA4 you want imported.
3. Save.

For this site at launch, the three native Google Ads conversions
(Lead, Schedule, Registration) cover the core funnel — only import GA4
conversions if you start defining custom events later.

---

## 4. Test the full attribution funnel

Before spending paid budget, verify everything fires correctly.

### Set up Tag Assistant

1. Install the **[Google Tag Assistant Companion](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm)**
   Chrome extension.
2. Go to [tagassistant.google.com](https://tagassistant.google.com),
   click **Add domain**, paste `https://willowalexander.co.uk` (or your
   preview URL).
3. Tag Assistant opens the site in a new window with debug overlay.

### Run through the test funnel

In the Tag Assistant window:

1. **Accept all cookies** in the consent banner (so marketing fires).
2. Visit `/howa/plus` — wait 5 seconds.
3. Visit `/services/gardening` — wait 5 seconds.
4. Submit a test newsletter signup.
5. Submit a test consultation booking.
6. Submit a test contact form.

In Tag Assistant's "Tags fired" panel, you should see:

| Step | Tags fired |
|---|---|
| Page load | Google tag (`G-HN657RY0DT`), Google Ads tag (`AW-10957066467`), Consent default (denied), Consent update (granted after accept) |
| `/howa/plus` view | `page_view` on GA4, `gtag/js` initial |
| Newsletter submit | `conversion` event with `send_to: AW-10957066467/<your registration label>` |
| Consultation submit | `conversion` event with `send_to: AW-10957066467/<your schedule label>` |
| Contact submit | `conversion` event with `send_to: AW-10957066467/<your lead label>` |

For each conversion event, click into it and verify:
- **User_data** section is populated with hashed email/phone/name fields
  — that's Enhanced Conversions working
- **Consent state** at time of firing shows `ad_storage: granted`,
  `analytics_storage: granted` — that's Consent Mode v2 working

### Verify in Google Ads UI

1. Google Ads → **Tools** → **Conversions** → click each conversion
   action.
2. Under **Status**, you should see **"Recording conversions"** within
   3–4 hours of real test submissions. Before that, it says **"No
   recent conversions"** which is normal for a fresh setup.
3. Under **Enhanced conversions**, you should see **"Recording
   conversions correctly"** within 24–48 hours.

### Verify GCLID capture (if you have a live Google Ads campaign)

Once a campaign is running:

1. Click on one of your own Google Ads from a search result. The URL
   will gain a `?gclid=...` parameter when you land on the site.
2. Open browser DevTools → Application → Cookies → look for
   `wa_click_ids`. The cookie value should contain a JSON blob with the
   `gclid` you just received.
3. localStorage `wa_click_ids` should hold the same value.
4. Submit a form. In Tag Assistant, the conversion event should fire
   normally. Even if you return to the site days later via direct/organic
   and convert, that conversion will still be attributed to the original
   Google Ad click — that's the cross-session attribution working.

---

## 5. Suggested Audience setup (for ads campaigns)

Once GA4 ↔ Google Ads is linked, build these audiences. Each maps to
events that already fire from the site. Audiences populate over 24–72
hours of real traffic.

> **Where to build them**: Google Ads → **Audience Manager** → **Custom
> Segments** OR **GA4 Audiences** (the latter is simpler and the
> audiences sync to Google Ads via the link).

### Top priority audiences

1. **HoWA+ interested, not converted** (60-day window)
   - Include: viewed page where `page_location` contains `/howa/plus`
     OR `/howa/plans`
   - Exclude: triggered `Registration` conversion
   - Use for: retargeting with the £16.99 hook

2. **Steward interested, not waitlisted** (90-day window)
   - Include: viewed page where `page_location` contains `/howa/steward`
   - Exclude: triggered `Lead` conversion with source `steward`
   - Use for: waitlist-driver ads

3. **Service viewers, not booked** (30-day window)
   - Include: viewed page where `page_location` contains `/services/`
   - Exclude: triggered `Schedule` conversion
   - Use for: "Book a consultation" search ads, locally targeted

4. **All site visitors** (30-day window)
   - Include: any `page_view`
   - Use for: general awareness retargeting

### Lookalike-equivalent: Customer Match + Smart Bidding

Google Ads doesn't have "Lookalike Audiences" the way Meta does, but it
has equivalents:

- **Customer Match**: upload hashed email lists (Klaviyo subscribers,
  consultation bookers) → Google finds similar Google users. Best for
  high-value seed lists.
- **Smart Bidding with Customer Match as a signal**: not a separate
  audience, but Smart Bidding strategies (Target CPA, Maximize
  Conversions) use Customer Match data as a quality signal.

Both require Customer Match list uploads — get the lists from Alex /
the dev team via the Klaviyo export tool when you're ready.

---

## 6. Recommended campaign-launch checklist

Before turning campaigns on:

- [ ] All three Conversion Actions defined and labels handed to dev team
- [ ] `.env.local` updated and site redeployed with the labels
- [ ] Enhanced Conversions toggled ON for all three Conversion Actions
- [ ] GA4 ↔ Google Ads link active with auto-tagging ON
- [ ] Test funnel run through and all events confirmed firing in Tag
      Assistant
- [ ] Enhanced Conversions showing "Recording correctly" (or "Pending"
      with at least 5 real submissions to verify against)
- [ ] At least one Customer Match list uploaded (Klaviyo export)
- [ ] Audiences building (>0 size in Audience Manager)
- [ ] Conversion tracking visible in Google Ads UI (Tools → Conversions)

When all are checked, you're ready to spend.

---

## Troubleshooting

**Conversion Action shows "No recent conversions" 48 hours after going
live**
- Check Tag Assistant on a live form-submission flow. If the conversion
  event isn't firing in Tag Assistant either, the issue is upstream
  (env var not set, marketing consent not being granted).
- If it IS firing in Tag Assistant but not in Google Ads, check the
  Conversion Label string for typos — case-sensitive.

**Enhanced Conversions stuck on "Pending" indefinitely**
- Google Ads needs to see at least 5–10 real conversions before it can
  verify Enhanced Conversions is working. If you only have test
  submissions and they're all using `test@example.com`, the matching
  fails silently. Run real submissions through real email addresses.

**GA4 audiences not appearing in Google Ads**
- 24-hour delay after linking is normal. If still missing after 48
  hours, check the link is still active (Admin → Google Ads links).
- Also check that "Personalized Advertising" is enabled — without it,
  GA4 audiences won't sync.

**Consent Mode v2 showing high "modelled conversions" — is this real?**
- Yes. Modelled conversions are real conversions that happened but
  couldn't be deterministically attributed (no cookies due to consent
  rejection or browser limits). Google fills in the gap using
  aggregated patterns. They're as legitimate as direct-attributed
  conversions and should be treated as such in bidding decisions.

**Site is firing the conversion event but no Enhanced Conversions data
appears in Google Ads**
- Check that the user submitted a form with at least one of the
  Enhanced Conversion fields populated (email, phone, name, postcode).
- Empty or null user_data is silently dropped by Google — no error,
  just no enhancement.

---

## Quick reference card

| Step | Where | Time |
|---|---|---|
| Create 3 Conversion Actions | Google Ads → Tools → Conversions | 15 min |
| Enable Enhanced Conversions | Google Ads → each Conversion Action | 5 min × 3 |
| Link GA4 ↔ Google Ads | GA4 Admin → Google Ads links | 5 min + 24h propagation |
| Test funnel via Tag Assistant | tagassistant.google.com | 20 min |
| Build 4 starter audiences | GA4 → Audiences (or Google Ads → Audience Manager) | 20 min |
| Upload Customer Match list | Google Ads → Audience Manager | 10 min |

Questions about how the firing side works → ask the dev team and point
them at [meta-retargeting.md](./meta-retargeting.md) (same dedup
pattern applies to Google's `transaction_id`).
