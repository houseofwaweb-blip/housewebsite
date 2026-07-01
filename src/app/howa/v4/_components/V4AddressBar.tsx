"use client";

import { useState } from "react";

/* The hero address bar. What the visitor types is carried to /howa/coming-soon as
   ?postcode=..., so the waitlist form arrives pre-filled, it feels like the
   address is being saved. */
export function V4AddressBar() {
  const [value, setValue] = useState("");
  const go = () => {
    const v = value.trim();
    window.location.href = v ? `/howa/coming-soon?postcode=${encodeURIComponent(v)}` : "/howa/coming-soon";
  };
  return (
    <div className="flex max-w-[440px] flex-col gap-2.5 sm:flex-row">
      <span className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--color-gold)]/35 bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(40,30,10,0.4)]">
        <PinGlyph />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") go(); }}
          aria-label="Your address or postcode"
          placeholder="Your address or postcode"
          className="w-full bg-transparent text-[16px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-soft)]/45 focus:outline-none"
        />
      </span>
      <button onClick={go} className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-howa-green)] px-6 py-3 text-[16px] text-white transition-colors hover:bg-[color:var(--color-howa-green-deep)]">
        Enter your address <span aria-hidden>→</span>
      </button>
    </div>
  );
}

function PinGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-deep)" strokeWidth="1.6" aria-hidden className="shrink-0"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
