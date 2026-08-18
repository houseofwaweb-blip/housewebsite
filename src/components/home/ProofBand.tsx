import Image from "next/image";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * ProofBand — homepage §7 (Aug-17 rebuild, L639–647). A framed evidence band:
 * image on one side; on the other, a heading that gives the facts context plus
 * the restrained proof (rating, vetting, service area) and the regulatory
 * disclosure required wherever insurance is promoted. Evidence, not badges.
 */
const ITEMS = [
  { stat: "Reviews", label: "Verified ratings where available" },
  { stat: "House standard", label: "Clear expectations for every service" },
  { stat: "Postcode check", label: "Availability varies by service" },
  { stat: "Provenance", label: "FCA-authorised and regulated broker" },
];

export function ProofBand() {
  return (
    <section className="bg-house-cream-light border-t border-house-line px-[5vw] py-[clamp(40px,5vw,76px)]">
      <div className="mx-auto max-w-[1360px] grid lg:grid-cols-2 items-stretch gap-8 lg:gap-0">
        {/* Image */}
        <div className="relative min-h-[300px] lg:min-h-[500px]">
          <Image
            src="/home-v4/hero-georgian-london.webp"
            alt="A well-kept British home, cared for to the House standard"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Framed proof */}
        <div className="relative overflow-hidden flex flex-col justify-center py-4 lg:py-8 lg:pl-[clamp(32px,4vw,72px)]">
          <FlowerWatermark color="gold" side="right" opacity={0.1} />
          <div className="relative z-10">
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-dark">
              The proof
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,2.6vw,2.7rem)] leading-[1.04] text-house-ink text-balance">
              Held to a standard you can check.
            </h2>
            <p className="mt-4 font-sans text-[15.5px] leading-relaxed text-house-brown/80 max-w-[46ch]">
              Look for current reviews, service credentials, clear pricing or
              quotation terms, and the service area before you book.
            </p>

            <ul className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {ITEMS.map((i) => (
                <li key={i.label} className="flex flex-col">
                  <span className="font-display text-[clamp(1.2rem,1.5vw,1.5rem)] text-house-ink leading-tight">
                    {i.stat}
                  </span>
                  <span className="mt-1 font-sans text-[12px] tracking-[0.04em] text-house-stone max-w-[24ch]">
                    {i.label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-9 font-sans text-[11px] leading-relaxed text-house-stone/90 max-w-[54ch]">
              House of Willow Alexander acts as an introducer for insurance, arranged by
              Provenance, which is authorised and regulated by the Financial Conduct
              Authority. Full details are provided before any purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
