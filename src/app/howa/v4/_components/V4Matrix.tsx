/* STEP 11 — the cleaner comparison. No "coming" clutter; capabilities not at
   launch are a quiet "starter"/roadmap, not the message. Prices visible.
   (Brief v2, slide 16.) */
type Cell = "yes" | "no" | "starter";
const TIERS = [
  { name: "Assistant", price: "Free", accent: "#5f6a49", slug: "assistant" },
  { name: "Housekeeper", price: "£16.99/mo", accent: "#b56a5c", slug: "housekeeper" },
  { name: "Steward", price: "£29.99/mo", accent: "#c5a960", slug: "steward" },
];
const ROWS: { f: string; c: [Cell, Cell, Cell] }[] = [
  { f: "Instant address portrait", c: ["yes", "yes", "yes"] },
  { f: "Ask HoWA + scans", c: ["yes", "yes", "yes"] },
  { f: "Document upload + home record", c: ["yes", "yes", "yes"] },
  { f: "Full logbook + assets", c: ["no", "yes", "yes"] },
  { f: "Renewals + seasonal calendar", c: ["no", "yes", "yes"] },
  { f: "Monthly Brief", c: ["no", "yes", "yes"] },
  { f: "HoWA Score drivers", c: ["starter", "starter", "yes"] },
  { f: "Risk register + protection prompts", c: ["no", "no", "yes"] },
  { f: "Evidence packs + Annual Report", c: ["no", "no", "yes"] },
  { f: "Insurance readiness, not advice", c: ["no", "no", "yes"] },
  { f: "Transfer Pack foundations", c: ["no", "no", "yes"] },
];

export function V4Matrix() {
  return (
    <section id="compare" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <h2 className="mb-10 text-center font-display text-[clamp(26px,3vw,42px)] leading-[1.08] tracking-[-0.01em]">
          Compare the tiers.
        </h2>

        {/* mobile: one card per tier */}
        <div className="space-y-4 lg:hidden">
          {TIERS.map((t, j) => (
            <div key={t.name} className="overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/25 bg-white">
              <div className="flex items-baseline justify-between border-b border-[color:var(--color-ink)]/10 bg-[#faf8f3] px-5 py-4">
                <p className="font-display text-[21px] leading-none" style={{ color: t.accent }}>{t.name}</p>
                <p className="smallcaps text-[10px] tracking-[0.12em] text-[color:var(--color-ink-soft)]/70">{t.price}</p>
              </div>
              <ul className="space-y-2.5 px-5 py-4">
                {ROWS.filter((r) => r.c[j] !== "no").map((r) => (
                  <li key={r.f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[color:var(--color-ink)]/85">
                    <span className="mt-0.5 shrink-0">{renderCell(r.c[j])}</span>{r.f}
                  </li>
                ))}
              </ul>
              <div className="px-5 pb-5">
                <a href={`/howa/coming-soon?tier=${t.slug}`} className="block rounded-md py-2.5 text-center text-[14.5px]" style={{ background: t.accent, color: t.accent === "#c5a960" ? "#1d2a40" : "#fff" }}>
                  {t.name === "Assistant" ? "Choose Assistant" : `Start ${t.name}`}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* desktop: the table */}
        <div className="hidden overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/25 bg-white lg:block">
          <div className="grid grid-cols-[1.7fr_repeat(3,0.8fr)] items-end gap-2 border-b border-[color:var(--color-ink)]/10 px-6 py-4">
            <span className="smallcaps text-[10px] tracking-[0.16em] text-[color:var(--color-ink-soft)]/60">Capability</span>
            {TIERS.map((t) => (
              <div key={t.name} className="text-center">
                <p className="font-display text-[18px] leading-none" style={{ color: t.accent }}>{t.name}</p>
                <p className="smallcaps mt-1 text-[9.5px] tracking-[0.1em] text-[color:var(--color-ink-soft)]/60">{t.price}</p>
              </div>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div key={r.f} className={"grid grid-cols-[1.7fr_repeat(3,0.8fr)] items-center gap-2 px-6 py-2.5 " + (i % 2 ? "bg-[#1d2a40]/[0.02]" : "")}>
              <span className="text-[14px] leading-snug text-[color:var(--color-ink)]/85">{r.f}</span>
              {r.c.map((cell, j) => <span key={j} className="flex justify-center">{renderCell(cell)}</span>)}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[12.5px] text-[color:var(--color-ink-soft)]/60">
          &ldquo;Starter&rdquo; means a first version of the HoWA Score; the full drivers, risk register and improvement plan are Steward.
        </p>
      </div>
    </section>
  );
}

function renderCell(c: Cell) {
  if (c === "yes")
    return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-howa-green)" strokeWidth="1.8" aria-label="included"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>;
  if (c === "starter")
    return <span className="smallcaps rounded-full border border-[color:var(--color-gold)]/40 px-1.5 py-0.5 text-[8px] tracking-[0.1em] text-[color:var(--color-gold-deep)]">Starter</span>;
  return <span className="text-[color:var(--color-ink)]/20">—</span>;
}
