"use client";

import Script from "next/script";
import { useEffect } from "react";
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
  // GA4 measurement ID is public (it ships in the client HTML). Default to the
  // Willow Alexander GA4 stream so analytics fire on launch even if the Vercel
  // env isn't set; NEXT_PUBLIC_GA_MEASUREMENT_ID overrides it per-environment.
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-HN657RY0DT";
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  // Update Consent Mode v2 state whenever wa-consent changes. Maps our
  // 4-category model onto Google's 7 storage purposes. Functional maps to
  // both functionality + personalization since they're nearly always
  // toggled together in practice.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (!dataLayer) return;
    const granted = consent ?? {
      functional: false,
      measurement: false,
      marketing: false,
    };
    dataLayer.push([
      "consent",
      "update",
      {
        ad_storage: granted.marketing ? "granted" : "denied",
        ad_user_data: granted.marketing ? "granted" : "denied",
        ad_personalization: granted.marketing ? "granted" : "denied",
        analytics_storage: granted.measurement ? "granted" : "denied",
        functionality_storage: granted.functional ? "granted" : "denied",
        personalization_storage: granted.functional ? "granted" : "denied",
      },
    ]);
  }, [consent]);

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
          ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true });` : ""}
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
