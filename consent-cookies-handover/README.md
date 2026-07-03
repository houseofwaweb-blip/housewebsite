# Consent & Cookies — how it works on the House site

A complete guide to the cookie-consent system: what it is, how it's wired, how
to add a new tracker, and how to keep the legal pages accurate. Written against
the live implementation (July 2026).

---

## TL;DR
- The **consent banner + gating is our own first-party system** — *not* CookieYes.
- **4 categories**: `essential` (always on) · `functional` · `measurement` · `marketing`.
- Consent is stored in **`localStorage` + a `wa-consent` cookie** and mirrored into
  **Google Consent Mode v2**.
- Every third-party tag (GA4, Clarity, Meta, Pinterest, Klaviyo) only loads once
  its category is granted.
- **CookieYes is used for ONE thing**: auto-generating the cookie-disclosure
  *table* on `/legal/cookies`. Its own banner is deliberately hidden.

---

## 1. The four consent categories

| Category | What it covers | Example tags |
|---|---|---|
| `essential` | Always on. The site can't work without these. | Session, security/CSRF, the consent cookie itself, **the ServiceOS booking widget** |
| `functional` | Preferences + other embedded tools | (preferences) |
| `measurement` | First-party understanding of the site | GA4, Microsoft Clarity |
| `marketing` | Advertising + retargeting | Meta Pixel, Pinterest, Klaviyo onsite |

> **⚠️ ServiceOS booking = essential, NOT functional.** The booking widget only
> runs when a visitor clicks a "Book" CTA (a service they've explicitly
> requested), so it must load regardless of consent — otherwise anyone who
> declines optional cookies can't book. It is deliberately **not** consent-gated.
> *(This is the fix for the "booking doesn't open when optional consent is
> declined" issue.)*

Splitting **measurement** from **marketing** is deliberate: a visitor can let us
understand the site (analytics) without consenting to advertising/retargeting.

---

## 2. Where it lives (files)

| File | Role |
|---|---|
| `src/lib/consent/index.ts` | Consent state: types, encode/decode, cookie + localStorage read/write, `readConsentFromCookieHeader()` for server code |
| `src/components/consent/ConsentProvider.tsx` | React context; `useConsentGranted("measurement")` etc. |
| `src/components/consent/CookieBanner.tsx` | The branded banner + preferences modal |
| `src/components/consent/CookiePreferencesLink.tsx` | Footer "Cookie preferences" link (re-opens the modal) |
| `src/components/consent/GoogleTagSetup.tsx` | Loads gtag.js, keeps Consent Mode v2 in sync |
| `src/components/consent/loaders/MetaPixel.tsx` | Meta Pixel — gated on `marketing` |
| `src/components/consent/loaders/MicrosoftClarity.tsx` | Clarity — gated on `measurement` |
| `src/components/consent/loaders/PinterestTag.tsx` | Pinterest — gated on `marketing` |
| `src/components/consent/loaders/Klaviyo.tsx` | Klaviyo onsite — gated on `marketing` |
| `src/components/legal/CookieDisclosureTable.tsx` | CookieYes audit table on `/legal/cookies` |
| `src/app/layout.tsx` (`<head>`) | Consent Mode v2 **default = denied**, set BEFORE gtag loads |

---

## 3. How consent flows (the important ordering)

1. **`<head>` (layout.tsx)** runs a tiny inline script FIRST that sets Consent
   Mode v2 to **default: denied** for every storage type, plus `url_passthrough`
   and `ads_data_redaction`. This must happen before gtag.js loads so Google
   never sets a cookie before the visitor decides.
2. **gtag.js loads** (GoogleTagSetup) — unconditionally, but in the denied
   default state (Google sends cookieless "modelled" pings only).
3. **Visitor clicks Accept / Reject / saves preferences** in the banner →
   `writeConsent()` stores the choice in `localStorage` + the `wa-consent`
   cookie, and fires a `wa-consent-changed` event.
4. **GoogleTagSetup's effect** pushes `gtag('consent', 'update', {...})` mapping
   our 4 categories onto Google's 7 storage purposes. Granting `measurement`
   flips `analytics_storage` to granted; granting `marketing` flips the ad ones.
5. **Each tracker loader** (`useConsentGranted(category)`) mounts its script only
   when its category is granted.

### The `wa-consent` value format
`e{E}f{F}m{M}k{K}|{ISO-date}` where each is `1`/`0`:
`e` = essential (always 1), `f` = functional, `m` = measurement, `k` = mar**K**eting.
Example: `e1f1m1k0|2026-07-03T09:05:39.066Z` = accepted everything except marketing.
Stored in **localStorage** (fast client read) and a **cookie** (SameSite=Lax,
12 months) so server components can read it too.

---

## 4. How to add a NEW third-party tag

Do NOT just drop a `<script>` in — it must be consent-gated **and** allowed by the CSP.

1. **Pick the category** — analytics/heatmaps → `measurement`; ads/retargeting →
   `marketing`; embedded tools/preferences → `functional`.
2. **Create a loader** in `src/components/consent/loaders/` following
   `MicrosoftClarity.tsx`:
   ```tsx
   "use client";
   import Script from "next/script";
   import { useConsentGranted } from "../ConsentProvider";
   export function MyTag() {
     const granted = useConsentGranted("marketing"); // or "measurement"
     // Use `||` not `??` for env fallbacks — an empty-string env must still
     // fall back, or the tag silently never loads. (Learned the hard way.)
     const id = process.env.NEXT_PUBLIC_MYTAG_ID || "FALLBACK_ID";
     if (!granted || !id) return null;
     return <Script id="mytag" strategy="afterInteractive">{`...snippet...`}</Script>;
   }
   ```
3. **Mount it** in `src/app/layout.tsx` next to the other loaders.
4. **Allow its hosts in the CSP** — add the script host to `script-src` and the
   beacon/API host to `connect-src` in BOTH `src/proxy.ts` (the one that actually
   serves) and `next.config.ts` (keep them in sync). Fonts → `font-src` (already
   `https:`), images/pixels → `img-src` (already `https:`).
5. **Deploy and check** `/api/csp-report` output + the browser console for any
   `Refused to connect…` CSP errors, and add missing hosts.

> Gotcha we hit repeatedly: `??` only falls back on null/undefined. An **empty**
> env var (`NEXT_PUBLIC_X=""`) passes `??` and yields `""`, which made the whole
> tag render nothing. **Always use `||` for baked-in fallbacks.**

---

## 5. CookieYes — what it's actually for

CookieYes is connected **only** to auto-generate the cookie-disclosure table on
`/legal/cookies` (`CookieDisclosureTable.tsx`). CookieYes scans the live site
monthly and populates `.cky-audit-table`; we hide its banner UI via scoped CSS so
only the table survives. **We do not use CookieYes for the consent banner or
gating** — that's all our own system above.

- Env var: `NEXT_PUBLIC_COOKIEYES_ID` (must be set, or the table renders empty).
- CookieYes's own cookie (`cookieyes-consent`) is separate and unused for gating.
- CSP already allows `cdn-cookieyes.com` (script) and `log.cookieyes.com` (connect).

---

## 6. Consent-related env vars

| Var | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Deploy | GA4 stream (falls back to `G-HN657RY0DT`) |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Deploy | Clarity project (falls back to `teosz3tmam`) |
| `NEXT_PUBLIC_COOKIEYES_ID` | Deploy | CookieYes disclosure table |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Deploy (optional) | Google Ads conversions |
| Meta / Pinterest pixel IDs | Deploy | in their respective loaders |

⚠️ Set these to real values (not empty strings). The code has `||` fallbacks for
GA + Clarity, but the others don't — an empty value = tag never loads.

---

## 7. Testing consent (for QA)

- **Reset your choice**: DevTools → Application → Local Storage → delete
  `wa-consent`, and delete the `wa-consent` cookie → refresh → banner returns.
  (Or use the footer **"Cookie preferences"** link to re-open the modal.)
- **Confirm a tag fires after Accept**: DevTools → Network → filter `collect`
  (GA), `clarity` (Clarity), `tr?` (Meta) → should go out only after granting the
  relevant category. Note: **ad-blockers / browser Tracking Prevention block
  these locally** even when they're firing correctly — test in a clean browser.
- **Confirm Consent Mode**: GA4 → DebugView → after Accept, `analytics_storage`
  should show `granted`.
