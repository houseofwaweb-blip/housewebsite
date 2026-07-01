import Image from "next/image";

/* STEP 04/05 — behaviours, not disconnected feature cards. The Ask/scan/
   logbook capabilities live INSIDE this Know -> Ask -> Act -> Remember system
   frame. The "layer above" render keeps it on-brand. (Brief v2, slides 10, 27.) */
export function V4WhatItDoes() {
  const steps = [
    { n: "01", t: "Know", b: "The address creates the first home portrait. Public records, documents and decisions form one living record." },
    { n: "02", t: "Ask", b: "Ask HoWA about the house, garden, quote, document or room. Answers come from the record, with source and confidence." },
    { n: "03", t: "Act", b: "HoWA turns answers into tasks, reminders, plans or optional trusted fulfilment. It tells you what matters first." },
    { n: "04", t: "Remember", b: "Every action, cost, photo, guarantee, supplier and outcome, writes back to the record and improves the score." },
  ];
  return (
    <section id="does" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mb-9 max-w-[680px]">
          <p className="smallcaps mb-3 text-[15px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">What HoWA does</p>
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            Know, ask, act, <span className="font-italic-display text-[#c5a960]">remember.</span>
          </h2>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            One system, not a drawer of disconnected tools. Each thing HoWA does writes back to the home record and sharpens what it knows.
          </p>
        </div>

        {/* the layer above the home */}
        <figure className="relative mb-8 w-full overflow-hidden rounded-2xl bg-[#1d2a40] shadow-[0_30px_70px_-34px_rgba(20,15,5,0.6)] ring-1 ring-[color:var(--color-gold)]/15" style={{ aspectRatio: "1896 / 829" }}>
          <Image src="/home-v4/v6-layer-above.webp" alt="A cutaway Georgian dollhouse with HoWA's intelligence layer floating above it as a constellation of gold nodes, on a deep navy ground." fill sizes="(max-width:1024px) 92vw, 1140px" className="object-cover" />
        </figure>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/20 bg-[color:var(--color-gold)]/15 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="bg-white p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[20px] tabular-nums text-[#c5a960]">{s.n}</span>
                <h3 className="font-display text-[22px] leading-none text-[color:var(--color-ink)]">{s.t}</h3>
              </div>
              <p className="mt-3 text-[16px] leading-[1.55] text-[color:var(--color-ink-soft)]">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
