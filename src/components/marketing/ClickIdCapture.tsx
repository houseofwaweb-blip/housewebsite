"use client";

import { useEffect } from "react";
import { captureClickIds } from "@/lib/google/gclid";
import { useConsentGranted } from "@/components/consent/ConsentProvider";

/**
 * Reads any ad click IDs (gclid, gbraid, wbraid, fbclid, msclkid) from the URL
 * and persists them for the 90-day attribution window.
 *
 * Consent-gated (finding 27): wa_click_ids is part of the Marketing category,
 * not an essential cookie. We only capture and store it once the visitor has
 * accepted Marketing; nothing is stored if they reject.
 */
export function ClickIdCapture() {
  const marketing = useConsentGranted("marketing");
  useEffect(() => {
    if (marketing) captureClickIds();
  }, [marketing]);
  return null;
}
