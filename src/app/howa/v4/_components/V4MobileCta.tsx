"use client";

import { useEffect, useState } from "react";

/* STEP 18 — sticky mobile CTA. Mobile stacking is where the "service-app"
   drift risk is highest, so the bar keeps inviting a home record the whole way
   down: "Enter your address" until tier pricing is in view, then "Join the
   waitlist". Never "Book". It appears only once past the hero (so it doesn't
   double the hero's own address bar) and is hidden on desktop. (Brief v2, slide 23.) */
export function V4MobileCta() {
  const [visible, setVisible] = useState(false);
  const [atTiers, setAtTiers] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const portrait = document.getElementById("portrait");
    if (portrait) {
      const o = new IntersectionObserver(
        ([e]) => setVisible(e.isIntersecting || e.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      o.observe(portrait);
      observers.push(o);
    }

    // switch to "Join the waitlist" once the tier pricing reaches the upper viewport
    const tiers = document.getElementById("tiers");
    if (tiers) {
      const o = new IntersectionObserver(
        ([e]) => setAtTiers(e.isIntersecting || e.boundingClientRect.top < 0),
        { threshold: 0, rootMargin: "0px 0px -55% 0px" },
      );
      o.observe(tiers);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={
        "fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ease-out " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
    >
      <div className="border-t border-[color:var(--color-gold)]/25 bg-[#fbfaf5]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md shadow-[0_-10px_28px_-14px_rgba(40,30,10,0.45)]">
        <a
          href="/howa/coming-soon"
          className="flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-howa-green)] py-3.5 text-[19px] text-white transition-colors active:bg-[color:var(--color-howa-green-deep)]"
        >
          {atTiers ? "Join the waitlist" : "Enter your address"} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
