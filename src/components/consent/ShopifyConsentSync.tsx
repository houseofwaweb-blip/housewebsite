"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useConsent } from "./ConsentProvider";

/**
 * Pass the website's cookie choice to Shopify via the headless Customer Privacy
 * API, so the site and the Shopify-hosted checkout share ONE consent record.
 *
 * Why this exists: the checkout's purchase pixel ("GA4 plus Ads purchase")
 * requires Analytics + Marketing consent. Without a Shopify consent record it
 * never loads, so no purchase is ever tracked. We do NOT turn on Shopify's own
 * checkout cookie banner — one banner, on the website, passed through here.
 *
 * Mapping (our category -> Shopify field):
 *   measurement -> analytics        marketing -> marketing + sale_of_data
 *   functional  -> preferences
 * (`sale_of_data` because the purchase pixel is marked "qualifies as data sale".)
 *
 * Production host only: the headless config pins the storefront/checkout domains,
 * so it must not run on *.vercel.app / localhost.
 */
export function ShopifyConsentSync({ storefrontToken }: { storefrontToken: string }) {
  const { consent } = useConsent();
  const [apiReady, setApiReady] = useState(false);
  const [prodHost, setProdHost] = useState(false);

  useEffect(() => {
    setProdHost(/(^|\.)willowalexander\.co\.uk$/i.test(window.location.hostname));
  }, []);

  useEffect(() => {
    // Sync on first load (if a choice already exists) and on every change,
    // including rejections — keeps Shopify in lockstep with the banner.
    if (!apiReady || consent === null) return;
    const w = window as unknown as {
      Shopify?: {
        loadFeatures: (
          features: Array<{ name: string; version: string }>,
          cb: (error?: unknown) => void,
        ) => void;
        customerPrivacy?: {
          setTrackingConsent: (consent: Record<string, unknown>, cb: () => void) => void;
        };
      };
    };
    if (!w.Shopify?.loadFeatures) return;
    try {
      w.Shopify.loadFeatures(
        [{ name: "consent-tracking-api", version: "0.1" }],
        (error) => {
          if (error) {
            console.error("[shopify-consent] loadFeatures failed", error);
            return;
          }
          w.Shopify!.customerPrivacy?.setTrackingConsent(
            {
              analytics: consent.measurement,
              marketing: consent.marketing,
              preferences: consent.functional,
              sale_of_data: consent.marketing,
              headlessStorefront: true,
              checkoutRootDomain: "checkout.willowalexander.co.uk",
              storefrontRootDomain: "willowalexander.co.uk",
              storefrontAccessToken: storefrontToken,
            },
            () => {},
          );
        },
      );
    } catch (e) {
      console.error("[shopify-consent] setTrackingConsent threw", e);
    }
  }, [apiReady, consent, storefrontToken]);

  if (!prodHost || !storefrontToken) return null;

  return (
    <Script
      src="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js"
      strategy="afterInteractive"
      onLoad={() => setApiReady(true)}
    />
  );
}
