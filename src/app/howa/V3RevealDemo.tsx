import { V6DemoPhone } from "@/components/howa/V6DemoPhone";

/* "Starts the moment you join" + the playable demo, side by side (askhowa
   handover). Left: the address -> public-record reveal (six facts). Right: the
   live phone demo. Ported for the House site (demo import repointed; em dash in
   the ILLUSTRATIVE line replaced per the no-em-dash brand rule). */
export function V3RevealDemo() {
  const facts = [
    { k: "Energy performance", v: "EPC band C", note: "valid to 2031" },
    { k: "Flood risk", v: "Low", note: "Env. Agency" },
    { k: "Build period", v: "c. 1892", note: "Late Victorian" },
    { k: "Listed status", v: "Grade II", note: "Historic England" },
    { k: "Council tax", v: "Band F", note: "VOA" },
    { k: "Planning history", v: "3 records", note: "since 1998" },
  ];
  return (
    <section id="demo" className="bg-[#fbfaf5] pt-16 pb-3 lg:py-20 scroll-mt-20">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — address reveal */}
          <div className="min-w-0 lg:pt-1">
            <p className="smallcaps mb-3 text-[15px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Starts the moment you join</p>
            <h2 className="font-display text-[clamp(28px,2.8vw,42px)] leading-[1.08] tracking-[-0.01em]">
              Your address already tells a story. <span className="font-italic-display text-[#c5a960]">HoWA reads it.</span>
            </h2>
            <p className="mt-4 max-w-[460px] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
              Before you upload a single thing, HoWA fills your record from the public record. You start full, not empty.
            </p>

            <div className="mt-7 flex max-w-[460px] items-center gap-2 rounded-full border border-[color:var(--color-gold)]/35 bg-white px-4 py-2.5 shadow-[0_10px_30px_-18px_rgba(40,30,10,0.4)]">
              <PinGlyph />
              <span className="flex-1 text-[16px] text-[color:var(--color-ink)]">11 Wellington Square, London SW1A</span>
              <span className="rounded-full bg-[color:var(--color-howa-green)] px-4 py-1.5 text-[15px] text-white">Reveal</span>
            </div>

            <div className="mt-6 grid max-w-[520px] grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.k} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white px-4 py-3">
                  <p className="smallcaps text-[12px] tracking-[0.12em] text-[color:var(--color-gold-deep)]">{f.k}</p>
                  <p className="mt-1 font-display text-[18px] leading-none text-[color:var(--color-ink)]">{f.v}</p>
                  <p className="mt-1 font-mono text-[12px] text-[color:var(--color-ink-soft)]/60">{f.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[520px] font-mono text-[12px] tracking-[0.06em] text-[color:var(--color-ink-soft)]/55">
              ILLUSTRATIVE: drawn from UK public records (EPC, Environment Agency, Historic England, VOA, planning) once live.
            </p>
          </div>

          {/* RIGHT — the playable demo */}
          <div className="min-w-0">
            <V6DemoPhone />
          </div>
        </div>
      </div>
    </section>
  );
}

function PinGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-deep)" strokeWidth="1.6" aria-hidden><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
