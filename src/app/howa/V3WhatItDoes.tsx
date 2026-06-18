/* ──────────────────────────────────────────────────────────────────────
   /howa — "What it does today" (askhowa.co.uk handover 2026-06-16).

   The section directly under the hero on the live askhowa homepage: a tight
   positioning line, then three concrete capability cards (Ask HoWA / Scans /
   The Logbook), each flagged "Live now". Bright ground, white cards.
   No images — all inline SVG. Tokens + utility classes already in globals.css.
   ────────────────────────────────────────────────────────────────────── */

export function V3WhatItDoes() {
  const cards = [
    {
      key: "ask",
      icon: <AskIcon />,
      title: "Ask HoWA",
      body: "Ask anything about your home and get the answer from your home, not the internet.",
      examples: ["When was the boiler last serviced?", "What did we spend on plumbing last year?"],
      foot: "Answers from your own record, and shows the document it relied on.",
    },
    {
      key: "scan",
      icon: <ScanIcon />,
      title: "Scans",
      kicker: "repair · garden · room",
      body: "Point your phone at a problem. HoWA tells you what it is, how urgent it is, and what to do next.",
      foot: "Every scan saves to your home record.",
    },
    {
      key: "log",
      icon: <LogbookIcon />,
      title: "The Logbook",
      body: "Every manual, warranty, certificate, quote and job in one place that remembers the dates for you.",
      foot: "Reminders for servicing, warranties and renewals come to you.",
    },
  ];
  return (
    <section id="does" className="bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* positioning, said once and plainly */}
        <div className="max-w-[760px] mb-12 lg:mb-14">
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            Not another home app. The layer that{" "}
            <span className="font-italic-display text-[#c5a960]">knows your home</span> and tells you what to do about it.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)] max-w-[620px]">
            Three things you can do the moment you open HoWA. All of it works right now, then try it yourself in the demo just below.
          </p>
        </div>

        {/* mobile: edge-to-edge snap carousel (the next card peeks) · md+: grid */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 lg:gap-6 md:overflow-visible md:px-0">
          {cards.map((c) => (
            <div key={c.key} className="w-[80%] shrink-0 snap-center md:w-auto relative flex flex-col rounded-xl border border-[color:var(--color-gold)]/25 bg-white p-7 shadow-[0_18px_44px_-32px_rgba(40,30,10,0.45)]">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-gold)]/12 text-[color:var(--color-gold-deep)]">
                  {c.icon}
                </span>
                <span className="smallcaps inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-howa-green)]/10 px-2.5 py-1 text-[9.5px] tracking-[0.14em] text-[color:var(--color-howa-green)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-howa-green)]" /> Live now
                </span>
              </div>
              <h3 className="font-display text-[22px] leading-[1.1]">{c.title}</h3>
              {c.kicker && (
                <p className="smallcaps mt-1.5 text-[10.5px] tracking-[0.16em] text-[color:var(--color-gold-deep)]">{c.kicker}</p>
              )}
              <p className="mt-3 text-[16px] leading-[1.5] text-[color:var(--color-ink-soft)]">{c.body}</p>
              {c.examples && (
                <ul className="mt-4 space-y-1.5">
                  {c.examples.map((e) => (
                    <li key={e} className="font-italic-display text-[16px] leading-[1.3] text-[color:var(--color-ink)]/75">
                      &ldquo;{e}&rdquo;
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-auto border-t border-[color:var(--color-ink)]/8 pt-4 text-[14px] leading-[1.45] text-[color:var(--color-ink-soft)]/80">
                {c.foot}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.1 7.7L3 21l1.8-5.9A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9.7 9.4a2.3 2.3 0 0 1 4.5.7c0 1.5-2.2 2.3-2.2 2.3" />
      <path d="M12 15.6h.01" />
    </svg>
  );
}
function ScanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}
function LogbookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6.5 3H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M9 7.5h7M9 11h7" />
    </svg>
  );
}
