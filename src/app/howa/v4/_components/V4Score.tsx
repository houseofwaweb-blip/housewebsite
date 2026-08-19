import Image from "next/image";
import { V4ScoreRing } from "./V4ScoreRing";

/* STEP 09 + 10 — give the HoWA Score its own moment, then surface the advanced
   product as a calm progression of proof and prevention. Navy register.
   (Brief v2, slides 14, 15.) */
export function V4Score() {
  const progression = [
    { n: "01", t: "Remembers", b: "Documents, costs, jobs and decisions stay with the address." },
    { n: "02", t: "Interprets", b: "HoWA reads quotes, scans, sensors and patterns against the record." },
    { n: "03", t: "Warns", b: "It speaks before small issues become expensive problems." },
    { n: "04", t: "Proves", b: "Evidence packs, Annual Reports and Transfer Packs show the home was cared for." },
  ];
  return (
    <section id="score" className="relative overflow-hidden text-[#f3ede0] scroll-mt-20" style={{ background: "#1d2a40" }}>
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="smallcaps mb-4 flex items-center gap-2 text-[14px] tracking-[0.18em] text-[#f3ede0]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5a960]" /> HoWA Score
            </p>
            <h2 className="font-display text-[clamp(31px,3.2vw,49px)] leading-[1.08] text-[#f3ede0]">
              One number for a house <span className="font-italic-display text-[#c5a960]">well kept.</span>
            </h2>
            <p className="mt-4 max-w-[440px] text-[18.5px] leading-[1.55] text-[#f3ede0]/80">
              Scored across the papers, fabric, risks and care of the home. Tap the number and HoWA explains what raised it, what is missing, and what to do next.
            </p>
            <ul className="mt-6 space-y-2 text-[16.5px] text-[#f3ede0]/75">
              <li>Provisional from the first address portrait.</li>
              <li>Sharpens as documents, jobs and evidence are added.</li>
              <li>Steward shows the full drivers, risk register and improvement plan.</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative aspect-[1122/1402] w-full overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-gold)]/20 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.7)]">
              <Image src="/home-v4/v6-protection.webp" alt="The dollhouse on deep navy with HoWA's gold monitoring nodes placed on the home's vulnerable points." fill sizes="(max-width:1024px) 80vw, 420px" className="object-cover" />
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-[#16243b]/95 px-4 py-3 ring-1 ring-[color:var(--color-gold)]/25 backdrop-blur-[2px]">
              <V4ScoreRing value={62} size={58} stroke={5} />
              <div>
                <p className="smallcaps text-[14px] tracking-[0.16em] text-[#c5a960]">HoWA Score</p>
                <p className="font-display text-[19px] leading-tight text-[#f3ede0]">62 · In order, with gaps</p>
              </div>
            </div>
          </div>
        </div>

        {/* the advanced progression */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#c5a960]/15 sm:grid-cols-2 lg:grid-cols-4">
          {progression.map((p) => (
            <div key={p.n} className="bg-[#1d2a40] p-6">
              <p className="font-display text-[19px] text-[#c5a960]">{p.n}</p>
              <p className="mt-1 font-display text-[22px] text-[#f3ede0]">{p.t}</p>
              <p className="mt-2 text-[18px] leading-[1.5] text-[#f3ede0]/70">{p.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[780px] text-[16.5px] leading-[1.6] text-[#f3ede0]/70">
          <span className="text-[#c5a960]">Steward adds the intelligence layer:</span> risk awareness, proactive prompts, evidence packs and annual reporting, plus sensor and smart-meter interpretation where connected. It is insurance readiness, not advice, and it is not an emergency service or a gadget app. Advanced means less uncertainty and earlier intervention, not more buttons.
        </p>
      </div>
    </section>
  );
}
