import Link from "next/link";

/**
 * /howa-score — HoWA Score (launch read section 5).
 * The lead product moment: one living number for a home well kept.
 * Keeps the House design system (cream ground, Didot display, gold ink).
 */

export const metadata = {
  title: "HoWA Score | One number for a home well kept",
  description:
    "The HoWA Score is a living measure of care, evidence and readiness. It improves as your Home Record becomes more complete.",
};

const DIMENSIONS = [
  {
    name: "Record completeness",
    body: "Rooms, assets, documents, service history and decisions.",
  },
  {
    name: "Maintenance rhythm",
    body: "What is due, complete, overdue or recurring.",
  },
  {
    name: "Evidence strength",
    body: "Warranties, certificates, invoices, photographs and proof.",
  },
  {
    name: "Risk readiness",
    body: "Weather, damp, fabric, drainage, access and insurance-readiness gaps.",
  },
  {
    name: "Efficiency & utilities",
    body: "EPC, energy, water, devices and operational performance.",
  },
  {
    name: "Future stewardship",
    body: "Plans, approvals, transfer readiness and long-term care.",
  },
];

const IMPROVE = [
  "Add documents.",
  "Save service visits.",
  "Complete tasks.",
  "Resolve open risks.",
  "Attach evidence.",
  "Build a seasonal care rhythm.",
  "Keep decisions, plans and certificates in one place.",
];

const ctaPrimary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-110";
const ctaSecondary =
  "inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/30 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-gold-ink hover:text-house-gold-ink";

export default function HowaScorePage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-16 max-w-[1100px] mx-auto">
        <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink mb-6">
          HoWA · The Score
        </p>
        <h1 className="font-display text-[clamp(40px,6vw,76px)] leading-[1.03] tracking-[-0.01em] text-house-black max-w-[16ch]">
          One number for a <em className="italic">home well kept.</em>
        </h1>
        <p className="font-sans text-[19px] leading-[1.65] text-house-brown/80 mt-8 max-w-[58ch]">
          The HoWA Score makes a house legible. It shows what is known, what
          needs attention, and what to do next. It is not a one-off inspection.
          It is a living measure of care, evidence and readiness, attached to the
          address and sharpened over time.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/howa/assistant" className={ctaPrimary}>
            Start with my address
          </Link>
          <Link href="/howa/how-it-works" className={ctaSecondary}>
            Improve my Score
          </Link>
        </div>
      </section>

      {/* What the Score reads */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-house-black mb-3">
            What the Score reads
          </h2>
          <p className="font-sans text-[17px] leading-[1.6] text-house-brown/75 max-w-[52ch] mb-10">
            The HoWA Score looks across six living dimensions.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.name}
                className="bg-house-cream border border-house-brown/12 p-6"
              >
                <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-[22px] leading-[1.15] text-house-black mb-2">
                  {d.name}
                </h3>
                <p className="font-sans text-[15px] leading-[1.55] text-house-brown/75">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-[5vw] py-16 max-w-[760px] mx-auto">
        <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-5">
          Why it matters
        </h2>
        <p className="font-sans text-[18px] leading-[1.7] text-house-brown/82 mb-4">
          When a home has no memory, the owner carries the burden. You have to
          remember who came, what was done, what was paid, what was promised,
          what was guaranteed and what must be checked next.
        </p>
        <p className="font-display italic text-[clamp(22px,2.6vw,30px)] leading-[1.35] text-house-brown mt-8">
          The Score moves that burden into the home itself.
        </p>
      </section>

      {/* How the Score improves */}
      <section className="px-[5vw] py-16 bg-house-cream-dark border-t border-b border-house-brown/8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.12] text-house-black mb-8">
            How the Score improves
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {IMPROVE.map((item) => (
              <li
                key={item}
                className="font-sans text-[16px] leading-[1.5] text-house-brown/82 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 mt-8 max-w-[56ch]">
            Every useful action should either improve the record, explain a gap,
            or suggest the next best step.
          </p>
        </div>
      </section>

      {/* What the Score is not */}
      <section className="px-[5vw] py-16 max-w-[760px] mx-auto">
        <h2 className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-stone mb-4">
          What the Score is not
        </h2>
        <p className="font-sans text-[16px] leading-[1.7] text-house-brown/70">
          The HoWA Score is not a legal survey, emergency service, valuation,
          insurance recommendation or guarantee. It is a practical stewardship
          measure to help a homeowner understand and manage the home more calmly.
        </p>
      </section>

      {/* Close */}
      <section className="px-[5vw] py-20 bg-house-brown text-house-cream text-center">
        <p className="font-display italic text-[clamp(26px,3.4vw,44px)] leading-[1.15] text-house-cream/95 max-w-[20ch] mx-auto">
          The home, finally known.
        </p>
        <div className="mt-8">
          <Link
            href="/howa/assistant"
            className="inline-block font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-7 py-3 no-underline hover:brightness-110 transition-[filter]"
          >
            Start with my address
          </Link>
        </div>
      </section>
    </div>
  );
}
