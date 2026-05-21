"use client";

import { useEffect } from "react";
import { captureClickIds } from "@/lib/google/gclid";

/**
 * Runs once on first client render. Reads any ad click IDs (gclid,
 * gbraid, wbraid, fbclid, msclkid) from the URL and persists them to
 * localStorage + first-party cookie for the 90-day attribution window.
 *
 * Not consent-gated — click IDs are essential first-party data with no
 * cookie set on third-party domains. They sit alongside the wa-consent
 * cookie itself in the essential category.
 */
export function ClickIdCapture() {
  useEffect(() => {
    captureClickIds();
  }, []);
  return null;
}
