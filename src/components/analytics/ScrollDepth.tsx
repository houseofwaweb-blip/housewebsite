"use client";

import { useEffect } from "react";
import { gaEvent } from "@/lib/google/ga4";

/**
 * Fires `scroll_75` once per page load when the reader passes 75% of the
 * document (a depth signal the specs ask for on the conversion and guide pages).
 * Mounted once in the root layout; passive listener, self-removes after firing.
 */
export function ScrollDepth() {
  useEffect(() => {
    let fired = false;
    function onScroll() {
      if (fired) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = (window.scrollY || doc.scrollTop) / scrollable;
      if (depth >= 0.75) {
        fired = true;
        gaEvent("scroll_75", { path: window.location.pathname });
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
