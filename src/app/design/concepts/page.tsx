import Link from "next/link";
import { DesignerBreadcrumb } from "@/components/design/DesignerBreadcrumb";

/**
 * /design/concepts — the HoWA Concept product (Final Master Directive).
 * A structured, property-specific concept and brief. Sold transparently as a
 * concept, not a measured design or a substitute for professional advice.
 * Beta: paid digital product when fulfilment is approved.
 */

export const metadata = {
  title: "HoWA Concepts | A more intelligent place to begin",
  description:
    "The HoWA Concept turns photographs, preferences, practical needs and budget into a structured direction and a brief ready for professional development. A concept, created with HoWA, not a measured design.",
};

const INCLUDES = [
  "A structured room or garden brief.",
  "Mood, palette and material direction.",
  "Possible layout, planting or furniture directions.",
  "Priorities and the questions still to resolve.",
  "Indicative purchasing and implementation bands.",
  "A professional handover pack, saved to the Home Record.",
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors hover:border-house-gold-ink hover:text-house-gold-ink";

export default function ConceptsPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <DesignerBreadcrumb current="Concepts" />
      <section className="px-[5vw] pt-20 pb-14 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">HoWA Concepts · Beta</p>
        <h1 className="font-display text-[clamp(38px,5vw,72px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[16ch]">
          A more intelligent place to begin.
        </h1>
        <p className="font-sans text-[18px] leading-[1.65] text-house-brown/82 mt-7 max-w-[54ch]">
          A better room or garden begins before the first line is drawn. Share photographs, preferences, practical needs
          and budget, and HoWA organises the information into an initial concept direction and a brief ready for
          professional development.
        </p>
        <p className="font-display italic text-[clamp(17px,2vw,22px)] leading-[1.4] text-house-brown/85 mt-6 max-w-[44ch]">
          Created with HoWA. Developed by the right human. Kept with the home.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/design/interiors" className={ctaPrimary}>Create an interior concept</Link>
          <Link href="/design/gardens" className={ctaSecondary}>Create a garden concept</Link>
        </div>
      </section>

      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">What a Concept includes.</h2>
            <ul className="grid gap-3">
              {INCLUDES.map((i) => (
                <li key={i} className="font-sans text-[16px] leading-[1.55] text-house-brown/82 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-black mb-6">Then, the right human.</h2>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/80 mb-4">
              A Concept is a beginning, not a finished scheme. When you are ready, a House Approved studio can review it,
              develop it properly and take responsibility for the design.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/72 mb-6">
              Because the Concept and brief live in the Home Record, the studio starts with context rather than a blank
              page, and nothing has to begin again.
            </p>
            <Link href="/design" className={ctaSecondary}>Explore design routes →</Link>
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-14 max-w-[900px] mx-auto text-center">
        <p className="font-sans text-[13.5px] leading-[1.7] text-house-stone max-w-[64ch] mx-auto">
          A HoWA Concept is concept-only. It is created with the help of HoWA and is not a measured design, a technical
          specification, or a substitute for professional advice. Structural, planning, regulatory and build feasibility
          decisions require a qualified professional.
        </p>
      </section>
    </div>
  );
}
