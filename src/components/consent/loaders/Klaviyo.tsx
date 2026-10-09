"use client";

import Script from "next/script";
import { useConsentGranted } from "../ConsentProvider";
import { flushKlaviyoQueue } from "@/lib/klaviyo/client";

// Klaviyo onsite tracking — loads klaviyo.js so we can fire "Active on Site"
// and "Added to Cart" events that power the abandoned-cart flow. This is
// first-party, but it's used for email marketing retargeting, so it sits
// behind the `marketing` consent category (off by default), same as the Meta
// Pixel. That also lines up with the legal basis for abandoned-cart marketing
// emails: no marketing consent → no tracking → no marketing email. When the
// script isn't loaded, our klaviyoTrack()/klaviyoIdentify() helpers no-op.
//
// Server-side events (Started Checkout, Placed Order) come from the
// Shopify ⇆ Klaviyo integration and do NOT depend on this script.
export function Klaviyo() {
  const granted = useConsentGranted("marketing");
  const companyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;
  if (!granted || !companyId) return null;
  return (
    <Script
      id="klaviyo-onsite"
      strategy="afterInteractive"
      src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${companyId}`}
      // klaviyo.js has now initialised window.klaviyo (the real SDK). Flush any
      // events our helpers queued while it was still loading (e.g. a "Viewed
      // Product" fired on this page's mount, or "Added to Cart" right after the
      // visitor accepted cookies). Without this, early events are never sent.
      onLoad={() => flushKlaviyoQueue()}
      // Belt-and-braces: if the browser served klaviyo.js from cache, onLoad may
      // have already fired before React attached this handler. onReady runs on
      // mount too, so the queue still drains.
      onReady={() => flushKlaviyoQueue()}
    />
  );
}
