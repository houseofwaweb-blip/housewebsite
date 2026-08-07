"use client";

import { useEffect } from "react";
import { gaEvent } from "@/lib/google/ga4";

/**
 * Fires the insurance-enquiry lead conversion when the visitor lands on
 * /insurance/thank-you (spec: the conversion event fires on the confirmation
 * page, not on submit). Point the Google Ads lead conversion at this GA4 event
 * so cost-per-client is measured against completed enquiries only. Runs once on
 * mount; renders nothing.
 */
export function ThankYouConversion() {
  useEffect(() => {
    gaEvent("generate_lead", { form_type: "insurance_enquiry" });
  }, []);
  return null;
}
