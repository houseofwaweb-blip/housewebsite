import Image from "next/image";

/* STEP 03/04 — explain the durable, address-bound record BEFORE the feature
   cards. Show it as a graph, not a list of app features. Everything writes
   back to this centre. (Brief v2, slides 9 & 27.) */
export function V4Record() {
  const writes = [
    { k: "Public record", v: "EPC · flood · ground · price paid" },
    { k: "Documents", v: "Invoices · warranties · certificates" },
    { k: "Scans", v: "Repair · garden · room · quote" },
    { k: "Tasks", v: "Reminders · renewals · seasonal care" },
    { k: "Proof", v: "Score · evidence packs · annual report" },
  ];
  return (
    <section id="record" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="max-w-[720px]">
          <p className="smallcaps mb-3 text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">One Home Record</p>
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            One address. One record. <span className="font-italic-display text-[#c5a960]">A home that remembers.</span>
          </h2>
          <p className="mt-4 max-w-[640px] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            Everything HoWA learns, public facts, documents, scans, costs, jobs, reminders, risks and evidence, belongs to the home record. It is bound to the address, not the phone, and it gets richer every time the home is cared for.
          </p>
          <p className="mt-3 smallcaps text-[11px] tracking-[0.16em] text-[color:var(--color-gold-deep)]">Bound to the address, not the phone</p>
        </div>

        <figure className="relative mt-9 w-full overflow-hidden rounded-lg bg-[#1d2a40] shadow-[0_30px_70px_-34px_rgba(20,15,5,0.6)] ring-1 ring-[color:var(--color-gold)]/20" style={{ aspectRatio: "1672 / 941" }}>
          <Image src="/home-v4/v6-home-graph-v2.webp" alt="The HoWA home record drawn as a graph: the address at the centre, branching into spaces, assets and a dated timeline of events." fill sizes="(max-width:1024px) 92vw, 1140px" className="object-cover" />
        </figure>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {writes.map((w) => (
            <div key={w.k} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-4">
              <p className="font-display text-[16px] leading-tight text-[color:var(--color-ink)]">{w.k}</p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[color:var(--color-ink-soft)]/80">{w.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[14px] text-[color:var(--color-ink-soft)]/70">Every feature writes back to this centre.</p>
        <p className="mt-4 font-italic-display text-[clamp(17px,1.7vw,22px)] leading-[1.3] text-[color:var(--color-gold-deep)]">
          HoWA earns its place before anyone visits. The first value is clarity.
        </p>
      </div>
    </section>
  );
}
