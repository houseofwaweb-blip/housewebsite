import Link from "next/link";

/**
 * BookingFlowStrip — the "what happens next" booking strip (change brief
 * slides 5 + 8). Makes the booking loop explicit: the customer books a House
 * service through HoWA, the team delivers, and the home is left more documented
 * than before. Copy-only; the real on-road screenshots come later (slide 17).
 */
const STEPS = [
  { n: "1", label: "Choose your service" },
  { n: "2", label: "Postcode + home details" },
  { n: "3", label: "Book & pay through HoWA" },
  { n: "4", label: "The team uses the on-road view" },
  { n: "5", label: "Photos & notes write back" },
];

export function BookingFlowStrip() {
  return (
    <section className="px-[5vw] py-[clamp(44px,5.5vw,80px)] border-t border-house-brown/8" style={{ background: "var(--color-house-white)" }}>
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-house-gold mb-3">
          What happens when you book
        </p>
        <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.08] text-house-brown mb-4">
          Booked, delivered, remembered.
        </h2>
        <p className="font-sans text-[14.5px] leading-[1.7] text-house-stone max-w-[60ch] mx-auto mb-10">
          We book, confirm and manage House visits through HoWA. You see the
          appointment, the team, the notes and what the home should remember next.
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8 text-left">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col">
              <span className="font-display text-[28px] leading-none text-house-gold mb-3">{step.n}</span>
              <span aria-hidden className="block h-px w-8 bg-house-gold/40 mb-3" />
              <span className="font-sans text-[13.5px] leading-[1.5] text-house-brown">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-11">
          <a
            href="#open-booking-form"
            className="inline-flex items-center justify-center font-sans text-[11px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-8 py-4 no-underline transition-colors hover:bg-house-gold-dark hover:border-house-gold-dark"
          >
            Book through HoWA
          </a>
        </div>
      </div>
    </section>
  );
}
