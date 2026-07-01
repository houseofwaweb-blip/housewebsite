import Image from "next/image";

/* "One continuous record" — One address. One record. Three depths of care.
   (askhowa handover). Image path .png -> .webp. */
export function V3OneRecord() {
  const points = [
    { n: "01", t: "One address.", b: "Every detail, decision and document connected to your home." },
    { n: "02", t: "Always up to date.", b: "Records update with you, so everyone works from the same truth." },
    { n: "03", t: "Passes on with the home.", b: "When you sell, its memory transfers with the property, with your permission." },
  ];
  return (
    <section id="record" className="bg-[#fbfaf5] py-16 lg:py-20 scroll-mt-20">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-8 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="handwriting mb-2 text-[21px] text-[color:var(--color-gold-deep)]">One continuous record.</p>
          <h2 className="font-display text-[clamp(29px,2.8vw,42px)] leading-[1.05] tracking-[-0.01em]">
            One address. One record.
            <br />
            <span className="font-italic-display text-[#c5a960]">Three depths of care.</span>
          </h2>
          <p className="mt-4 max-w-[300px] text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            Everything HoWA learns about your home lives in one place, and when you sell, its memory passes on with it.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full">
            <Image src="/home-v4/v6-one-record-v3.webp" alt="Three phones in the Assistant, Housekeeper and Steward colourways, with the dollhouse softly behind." fill sizes="(max-width:1024px) 92vw, 45vw" className="object-contain" />
          </div>
        </div>
        <div className="space-y-6 lg:col-span-4">
          {points.map((p) => (
            <div key={p.n} className="flex gap-4">
              <span className="font-display text-[20px] tabular-nums text-[#c5a960]">{p.n}</span>
              <div>
                <p className="mb-1 font-display text-[19px] leading-[1.2]">{p.t}</p>
                <p className="max-w-[260px] text-[16px] leading-[1.5] text-[color:var(--color-ink-soft)]">{p.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
