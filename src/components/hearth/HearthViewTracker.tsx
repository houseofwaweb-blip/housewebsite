"use client";

import { useEffect } from "react";
import { useConsentGranted } from "@/components/consent/ConsentProvider";

/**
 * Fires a single first-party view beacon for a Hearth article.
 *
 * - Gated on `measurement` consent (consistent with GA4 / Clarity). First-party
 *   and aggregate, but we treat it as measurement to match the rest of the
 *   consent model. Ad-blockers don't block same-origin requests, so this still
 *   captures more than GA4 among consenting visitors.
 * - Dedupes to once per article per browser session via sessionStorage (a plain
 *   boolean flag, not a tracking identifier) so refreshes don't inflate counts.
 * - Best-effort: uses sendBeacon when available, ignores all failures.
 */
export function HearthViewTracker({ slug }: { slug: string }) {
  const measurement = useConsentGranted("measurement");

  useEffect(() => {
    if (!measurement || !slug) return;
    const key = `hv:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage blocked (private mode) — still send once per mount.
    }

    const url = "/api/hearth/view";
    const payload = JSON.stringify({ slug });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      } else {
        void fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      /* best-effort */
    }
  }, [measurement, slug]);

  return null;
}
