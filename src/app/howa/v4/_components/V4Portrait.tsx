import Image from "next/image";
import { V4ScoreRing } from "./V4ScoreRing";

/* STEP 02 — the Portrait Moment, directly under the hero. The consumer "oh".
   Make it feel like the house speaking, not an API report. (Brief v2, slides
   7 & 26.) */
export function V4Portrait() {
  const facts = [
    { k: "The house", v: "14 Elm Grove", note: "Built 1932 · cavity-wall semi · gas combi" },
    { k: "Energy", v: "EPC D", note: "Improvement plan available" },
    { k: "Ground", v: "Clay soil", note: "Watch the dry summers" },
    { k: "Flood", v: "Low risk", note: "Nearest watch point 1.2 mi" },
    { k: "History", v: "Last sold 2014", note: "£312,000" },
  ];
  return (
    <section id="portrait" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="smallcaps mb-3 text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">The first minute</p>
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            Meet your home. <span className="font-italic-display text-[#c5a960]">In sixty seconds.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            Type your address. HoWA introduces your home back to you: age, build, energy, ground, flood, history and a first HoWA Score. No forms. No guessing. The record starts with the house itself.
          </p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px] text-[color:var(--color-ink-soft)]/70">
            <span>No forms</span><span aria-hidden>·</span><span>No guessing</span><span aria-hidden>·</span><span>Free to start</span>
          </p>
        </div>

        {/* the portrait — fact cards + the score */}
        <div className="mt-10 grid items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.k} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-5">
                <p className="smallcaps text-[9.5px] tracking-[0.14em] text-[color:var(--color-gold-deep)]">{f.k}</p>
                <p className="mt-1 font-display text-[20px] leading-none text-[color:var(--color-ink)]">{f.v}</p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-[color:var(--color-ink-soft)]/80">{f.note}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-5">
              <a href="/howa/coming-soon?tier=assistant" className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-howa-green)] px-5 py-3 text-[15.5px] text-white transition-colors hover:bg-[color:var(--color-howa-green-deep)]">
                Save this record <span aria-hidden>→</span>
              </a>
              <p className="mt-2 text-center text-[12px] text-[color:var(--color-ink-soft)]/60">Free. The record begins with your address.</p>
            </div>
          </div>

          {/* the house, then its first Score */}
          <div className="space-y-4">
            <div className="relative aspect-[1448/1086] w-full overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-gold)]/20 shadow-[0_24px_60px_-30px_rgba(40,30,10,0.45)]">
              <Image src="/home-v4/v6-how-it-works-v3.webp" alt="A hand holding a phone showing the HoWA home record beside a cutaway dollhouse on a table." fill sizes="(max-width:1024px) 92vw, 420px" className="object-cover" />
            </div>
            <div className="rounded-2xl bg-[#1d2a40] p-6 text-[#f3ede0]">
              <div className="flex items-center gap-5">
                <V4ScoreRing value={62} size={88} stroke={6} />
                <div>
                  <p className="smallcaps text-[11px] tracking-[0.18em] text-[#c5a960]">HoWA Score</p>
                  <p className="font-display text-[26px] leading-tight">62</p>
                  <p className="text-[14px] text-[#f3ede0]/80">In order, with gaps</p>
                </div>
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.5] text-[#f3ede0]/75">
                One number for a house well kept. Provisional from the first portrait, it sharpens as documents, jobs and evidence are added.
              </p>
            </div>
            <p className="font-mono text-[10px] tracking-[0.06em] text-[color:var(--color-ink-soft)]/50">
              ILLUSTRATIVE · LIVE FACTS FROM UK PUBLIC RECORDS WHERE AVAILABLE, CORRECTABLE BY THE HOMEOWNER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
