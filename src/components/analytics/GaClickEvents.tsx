"use client";

import { useEffect } from "react";
import { gaEvent } from "@/lib/google/ga4";

/**
 * Site-wide click delegation for GA4 intent events that aren't tied to a
 * single component:
 *   - tel:  links           → `phone_call`
 *   - mailto: links         → `email_click`
 *   - #open-booking-form    → `booking_intent` (ServiceOS booking modal triggers)
 *   - [data-ga-event]       → the named event, with any data-ga-* params
 *
 * One capturing listener on the document, so it catches clicks regardless of
 * where the anchor lives (header, footer, editorial bands, CMS content).
 * Mounted once in the root layout.
 */
export function GaClickEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const start = e.target as HTMLElement | null;
      const el = start?.closest<HTMLElement>("a, button, [data-ga-event]");
      if (!el) return;

      // Explicit annotation wins — data-ga-event + any data-ga-* params.
      const explicit = el.getAttribute("data-ga-event");
      if (explicit) {
        const params: Record<string, string> = {};
        for (const { name, value } of Array.from(el.attributes)) {
          if (name.startsWith("data-ga-") && name !== "data-ga-event") {
            params[name.slice("data-ga-".length).replace(/-/g, "_")] = value;
          }
        }
        gaEvent(explicit, params);
        return;
      }

      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        gaEvent("phone_call", { phone_number: href.replace(/^tel:/, "") });
      } else if (href.startsWith("mailto:")) {
        gaEvent("email_click", { email: href.replace(/^mailto:/, "").split("?")[0] });
      } else if (href.includes("#open-booking-form")) {
        gaEvent("booking_intent", { cta: "book_service", label: el.textContent?.trim().slice(0, 60) });
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
