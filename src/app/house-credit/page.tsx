import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export const metadata = {
  title: "House Credit",
  description:
    "House Credit — spread the cost of home care, design, and services with interest-free finance from the House.",
};

const FEATURES = [
  {
    title: "Spread the cost",
    description:
      "Pay for services, design projects, or shop purchases over 3, 6, or 12 months. Interest-free on qualifying orders.",
  },
  {
    title: "Simple application",
    description:
      "Apply at checkout. Soft credit check, instant decision, no paperwork. Managed through your HoWA account.",
  },
  {
    title: "Works across the House",
    description:
      "Use House Credit for anything — a kitchen renovation, a year of garden care, or a full Steward plan.",
  },
  {
    title: "No hidden fees",
    description:
      "The price you see is the price you pay. No arrangement fees, no early repayment charges.",
  },
];

/**
 * /house-credit — Interest-free finance landing page.
 * FCA-regulated product — register interest only at launch.
 */
export default function HouseCreditPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16 text-center">
        <Eyebrow>The House · Finance</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4 mb-6">
          House <em>Credit</em>.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 max-w-[560px] mx-auto">
          Spread the cost of home care. Interest-free finance on services,
          design, and shop purchases — managed through your HoWA account.
        </p>
      </section>

      {/* Features grid */}
      <section className="px-[5vw] pb-20">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-house-brown/12 p-8 transition-all duration-[var(--t-base)] ease-out hover:border-house-gold"
            >
              <h3 className="font-display font-medium text-[22px] mb-3">
                {f.title}
              </h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Example */}
      <section className="bg-house-white px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-display font-medium text-[28px] mb-3">
            An example.
          </h2>
          <p className="font-sans text-[16px] leading-[1.6] text-house-stone mb-8 max-w-[480px] mx-auto">
            A £3,600 kitchen project, spread over 12 months at £300/month.
            Interest-free. No deposit. Managed through HoWA.
          </p>
          <div className="inline-grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display font-medium text-[28px] text-house-gold">
                £3,600
              </div>
              <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone mt-1">
                Total
              </div>
            </div>
            <div>
              <div className="font-display font-medium text-[28px] text-house-gold">
                12
              </div>
              <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone mt-1">
                Months
              </div>
            </div>
            <div>
              <div className="font-display font-medium text-[28px] text-house-gold">
                £300
              </div>
              <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone mt-1">
                Per month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — register interest */}
      <section className="px-[5vw] py-16 text-center border-t border-house-brown/10">
        <p className="font-display italic text-[22px] text-house-stone mb-6">
          House Credit is coming soon. Register your interest.
        </p>
        <Link
          href="/api/howa-bounce?source=house-credit"
          className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Register interest
        </Link>
        <p className="font-sans text-[12px] text-house-stone/60 mt-4 max-w-[400px] mx-auto">
          Credit is subject to status. House Credit is provided by a
          FCA-authorised third-party lender. Full terms at application.
        </p>
      </section>
    </article>
  );
}
