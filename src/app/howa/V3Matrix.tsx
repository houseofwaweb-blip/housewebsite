/* The decision zone — the three tiers as a typeset capability matrix
   (feature rows × tier columns) (askhowa handover). Ported for the House site:
   row copy uses the finalised no-em-dash wording (HANDOVER.md §4 H); CTAs ->
   /howa/coming-soon. */
type Cell = "yes" | "no" | "coming";
const ROWS: { f: string; c: [Cell, Cell, Cell] }[] = [
  { f: "One Home Record, your address remembers", c: ["yes", "yes", "yes"] },
  { f: "Ask HoWA, answers from your own record", c: ["yes", "yes", "yes"] },
  { f: "Repair, garden & room scans", c: ["yes", "yes", "yes"] },
  { f: "Document upload & home record", c: ["yes", "yes", "yes"] },
  { f: "Full logbook: rooms, assets, service history", c: ["no", "yes", "yes"] },
  { f: "Maintenance calendar & seasonal garden plan", c: ["no", "yes", "yes"] },
  { f: "Renewal & warranty reminders", c: ["no", "yes", "yes"] },
  { f: "Member pricing & priority booking", c: ["no", "yes", "yes"] },
  { f: "Home Health Score & risk register", c: ["no", "no", "coming"] },
  { f: "Predictive maintenance", c: ["no", "no", "coming"] },
  { f: "Insurance readiness: evidence & prefill, not advice", c: ["no", "no", "coming"] },
  { f: "Annual Home Report & Home Transfer Pack", c: ["no", "no", "coming"] },
];

export function V3Matrix({ middleLabel = "Housekeeper", showTitle = true }: { middleLabel?: string; showTitle?: boolean } = {}) {
  const TIERS = [
    { name: "Assistant", price: "Free", accent: "#5f6a49" },
    { name: middleLabel, price: "£16.99/mo", accent: "#b56a5c" },
    { name: "Steward", price: "£29.99/mo", accent: "#c5a960" },
  ];
  return (
    <section id="tiers" className="bg-[#fbfaf5] pt-16 pb-3 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {showTitle ? (
          <div className="mb-10 text-center">
            <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.08] tracking-[-0.01em]">
              One record. Choose how deep the care goes.
            </h2>
          </div>
        ) : null}

        {/* mobile: one card per tier (no column cross-referencing) */}
        <div className="space-y-4 lg:hidden">
          {TIERS.map((t, j) => {
            const inc = ROWS.filter((r) => r.c[j] === "yes").map((r) => r.f);
            const soon = ROWS.filter((r) => r.c[j] === "coming").map((r) => r.f);
            return (
              <div key={t.name} className="overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/25 bg-white">
                <div className="flex items-center justify-between border-b border-[color:var(--color-ink)]/10 px-5 py-4">
                  <span className="font-display text-[19px]" style={{ color: t.accent }}>{t.name}</span>
                  <span className="smallcaps text-[10px] tracking-[0.1em] text-[color:var(--color-ink-soft)]/60">{t.price}</span>
                </div>
                <ul className="space-y-2.5 px-5 py-4">
                  {inc.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[color:var(--color-ink)]/85">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-howa-green)" strokeWidth="1.8" className="mt-px shrink-0" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
                      {f}
                    </li>
                  ))}
                  {soon.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[color:var(--color-ink-soft)]/65">
                      <span className="smallcaps mt-px shrink-0 rounded-full border border-[color:var(--color-ink)]/15 px-1.5 py-0.5 text-[8px] tracking-[0.1em] text-[color:var(--color-ink-soft)]/55">Coming</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-5 pb-5">
                  <a href="/howa/coming-soon" className="block rounded-md px-4 py-3 text-center text-[14px] transition-opacity hover:opacity-90" style={{ background: t.accent, color: t.accent === "#c5a960" ? "#1d2a40" : "#fff" }}>
                    {t.name === "Steward" ? "Apply" : "Choose"} {t.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/25 bg-white lg:block">
          {/* header */}
          <div className="grid grid-cols-[1.6fr_repeat(3,0.8fr)] items-end gap-2 border-b border-[color:var(--color-ink)]/10 px-4 py-4 sm:px-6">
            <span className="smallcaps text-[10px] tracking-[0.16em] text-[color:var(--color-ink-soft)]/60">Capability</span>
            {TIERS.map((t) => (
              <div key={t.name} className="text-center">
                <p className="font-display text-[clamp(14px,1.4vw,19px)] leading-none" style={{ color: t.accent }}>{t.name}</p>
                <p className="smallcaps mt-1 text-[9.5px] tracking-[0.1em] text-[color:var(--color-ink-soft)]/60">{t.price}</p>
              </div>
            ))}
          </div>
          {/* rows */}
          {ROWS.map((r, i) => (
            <div key={r.f} className={"grid grid-cols-[1.6fr_repeat(3,0.8fr)] items-center gap-2 px-4 py-2.5 sm:px-6 " + (i % 2 ? "bg-[#1d2a40]/[0.02]" : "")}>
              <span className="text-[13.5px] leading-snug text-[color:var(--color-ink)]/85">{r.f}</span>
              {r.c.map((cell, j) => (
                <span key={j} className="flex justify-center">{renderCell(cell)}</span>
              ))}
            </div>
          ))}
          {/* footer ctas */}
          <div className="grid grid-cols-[1.6fr_repeat(3,0.8fr)] items-center gap-2 border-t border-[color:var(--color-ink)]/10 px-4 py-4 sm:px-6">
            <span />
            {TIERS.map((t) => (
              <a key={t.name} href="/howa/coming-soon" className="mx-auto rounded-md px-3 py-1.5 text-center text-[12px] transition-opacity hover:opacity-90" style={{ background: t.accent, color: t.accent === "#c5a960" ? "#1d2a40" : "#fff" }}>
                {t.name === "Steward" ? "Apply" : "Choose"}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderCell(c: Cell) {
  if (c === "yes")
    return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-howa-green)" strokeWidth="1.8" aria-label="included"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>;
  if (c === "coming")
    return <span className="smallcaps rounded-full border border-[color:var(--color-ink)]/15 px-1.5 py-0.5 text-[8px] tracking-[0.1em] text-[color:var(--color-ink-soft)]/55">Coming</span>;
  return <span className="text-[color:var(--color-ink)]/20">·</span>;
}
