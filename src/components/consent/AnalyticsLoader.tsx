"use client";

import { Analytics } from "@vercel/analytics/react";
import { useConsentGranted } from "./ConsentProvider";

/**
 * Mounts Vercel Analytics only when the user has granted measurement consent.
 *
 * Vercel Analytics is cookie-less by design, but UK ICO/PECR treats any
 * client-side tracking script as requiring opt-in regardless of cookie
 * use. Vercel Analytics is first-party page-view measurement — gated on
 * the `measurement` category, not `marketing`.
 *
 * When consent is later revoked, the component unmounts, which detaches
 * the navigation listeners — no further beacons sent.
 */
export function AnalyticsLoader() {
  const granted = useConsentGranted("measurement");
  if (!granted) return null;
  return <Analytics />;
}
