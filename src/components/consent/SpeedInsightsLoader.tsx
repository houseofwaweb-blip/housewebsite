"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsentGranted } from "./ConsentProvider";

// Vercel Speed Insights (Core Web Vitals: LCP, INP, CLS, TTFB).
// First-party performance telemetry — gated on the `measurement`
// category (not `marketing`). Cookie-less but UK PECR still requires
// opt-in for any client-side measurement script.
export function SpeedInsightsLoader() {
  const granted = useConsentGranted("measurement");
  if (!granted) return null;
  return <SpeedInsights />;
}
