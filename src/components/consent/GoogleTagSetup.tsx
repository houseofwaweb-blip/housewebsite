"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useConsent } from "./ConsentProvider";

/**
 * Loads gtag.js and configures both GA4 and Google Ads, then keeps Consent
 * Mode v2 state in sync with our wa-consent cookie.
 *
 * Unlike the other measurement loaders, this one is NOT gated on consent.
 * That is intentional — Consent Mode v2 expects Google's tag to load on
 * every page and respect the consent state internally:
 *
 *   - When all consent is denied (default): Google sends cookieless pings,
 *     no cookies are set, no PII is transmitted. Used purely for
 *     conversion modelling to fill attribution gaps.
 *   - When measurement is granted: GA4 starts setting `_ga*` cookies and
 *     full tracking engages.
 *   - When marketing is granted: Google Ads tag activates retargeting +
 *     remarketing cookies.
 *
 * The consent default state itself is set in app/layout.tsx <head> via a
 * raw <script>, BEFORE this component's gtag.js is loaded — that ordering
 * is required by Consent Mode v2.
 */
export function GoogleTagSetup() {
  const { consent } = useConsent();
  // Load the Google tags (GA4 + Ads) ONLY on the production host. On Vercel
  // preview builds (*.vercel.app) and localhost the Ads tag would otherwise
  // load and pollute GA4/Ads with test traffic. Checked client-side after mount
  // to stay SSR/hydration-safe.
  const [prodHost, setProdHost] = useState(false);
  useEffect(() => {
    setProdHost(/(^|\.)willowalexander\.co\.uk$/i.test(window.location.hostname));
  }, []);
  // GA4 measurement ID is public (it ships in the client HTML). Default to the
  // Willow Alexander GA4 stream so analytics fire on launch even if the Vercel
  // env isn't set; NEXT_PUBLIC_GA_MEASUREMENT_ID overrides it per-environment.
  // Use || not ?? — an empty-string env var (NEXT_PUBLIC_GA_MEASUREMENT_ID="")
  // must still fall back to the baked ID, otherwise gaId="" makes this whole
  // component render nothing and GA never loads.
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HN657RY0DT";
  // Baked fallback like gaId above — the Preview scope value was empty, which
  // dropped the Ads tag from preview builds. Env still wins when set.
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-10957066467";
  // The Shopify-hosted checkout domain the Buy button hands off to, for
  // cross-domain linking (GA4 + Ads sessions/click IDs must carry into
  // checkout). Defaults to the live checkout subdomain; override with
  // NEXT_PUBLIC_CHECKOUT_DOMAIN if it ever changes.
  const checkoutDomain =
    process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN || "checkout.willowalexander.co.uk";
  // Shopify customer-accounts (shop orders) domain, also cross-domain-linked so
  // GA4/Ads sessions carry into the orders area. Host only, no scheme.
  const ordersDomain = (
    process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL || "https://orders.willowalexander.co.uk"
  ).replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  // Update Consent Mode v2 state whenever wa-consent changes. Maps our
  // 4-category model onto Google's 7 storage purposes. Functional maps to
  // both functionality + personalization since they're nearly always
  // toggled together in practice.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Consent Mode updates MUST go through the gtag() command queue (an
    // arguments object), NOT a raw array push. gtag.js ignores array-shaped
    // dataLayer entries, so a raw push would leave a user who clicked
    // "Accept" stuck in the default denied/cookieless state — no _ga cookie,
    // GA4 recording only modelled pings. The head snippet defines
    // `function gtag(){dataLayer.push(arguments)}`, so this queues correctly
    // even before gtag.js finishes loading.
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;
    // Don't push an update until consent is resolved. During hydration the
    // store's first snapshot is null (matches SSR), and pushing a denied update
    // then would end wait_for_update early and send the first page_view denied.
    // The head script already set the correct default from the cookie; a
    // first-time visitor with no choice stays on that default until they pick.
    if (consent === null) return;
    const granted = consent;
    gtag("consent", "update", {
      ad_storage: granted.marketing ? "granted" : "denied",
      ad_user_data: granted.marketing ? "granted" : "denied",
      ad_personalization: granted.marketing ? "granted" : "denied",
      analytics_storage: granted.measurement ? "granted" : "denied",
      functionality_storage: granted.functional ? "granted" : "denied",
      personalization_storage: granted.functional ? "granted" : "denied",
    });
  }, [consent]);

  // Production host only — never load the Google tags on preview/localhost.
  if (!prodHost) return null;

  // No GA4 ID configured → don't load gtag at all (dev / preview without
  // analytics). Google Ads alone without GA4 is fine, but if neither is
  // set, nothing useful loads.
  if (!gaId && !adsId) return null;

  const primaryId = gaId ?? adsId!;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          // Enable GA4 DebugView automatically on preview hosts (vercel.app /
          // localhost) so events can be verified without a browser extension.
          // Production (willowalexander.co.uk) stays out of DebugView so real
          // traffic isn't flagged as debug.
          var __waDebug = /(localhost|vercel\\.app)/.test(location.hostname);
          // Cross-domain linking (Google Shopping brief, Task 6.4): carry the
          // GA client id + gclid across to the Shopify-hosted checkout so a
          // conversion there is attributed to the same session/ad click. Lists
          // both our domain and the checkout domain; accept_incoming reads the
          // linker param when the visitor lands back on us.
          var __linker = { domains: ['willowalexander.co.uk', ${JSON.stringify(checkoutDomain)}, ${JSON.stringify(ordersDomain)}], accept_incoming: true };
          ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true, debug_mode: __waDebug, linker: __linker });` : ""}
          ${adsId ? `gtag('config', '${adsId}', { linker: __linker });` : ""}
          // Signal that gtag is configured, so on-load events (view_item) fire
          // AFTER config and aren't dropped on a first/direct ad landing.
          window.__waGtagReady = true;
          window.dispatchEvent(new Event('wa-gtag-ready'));
        `}
      </Script>
    </>
  );
}
