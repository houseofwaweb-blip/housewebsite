import Image from "next/image";
import Link from "next/link";

/**
 * HowItWorks — homepage §6 (Aug-17 rebuild, L629–637). Three steps; HoWA is the
 * memory step, never the identity. Editorial layout: text left, House watercolour
 * right (the brand is editorial, so the process reads as a considered spread).
 */
const STEPS = [
  {
    n: "1",
    title: "Ask the House",
    body: "Choose a service, cover or product.",
  },
  {
    n: "2",
    title: "The House arranges it",
    body: "Vetted people, clear information and joined-up fulfilment.",
  },
  {
    n: "3",
    title: "HoWA remembers it",
    body: "Records, reminders and relevant next steps stay with the home.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-house-cream px-[5vw] py-[clamp(40px,4vw,68px)] border-t border-house-line">
      <div className="mx-auto max-w-[1360px] grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Copy — left */}
        <div>
          <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
            How the House works
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] text-house-ink">
            Simple to ask. Kept in order after.
          </h2>

          <ol className="mt-10 grid gap-8">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="font-display text-[2.4rem] leading-none text-house-gold shrink-0 w-10">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[1.4rem] leading-[1.1] text-house-ink">{s.title}</h3>
                  <p className="mt-2 font-sans text-[18px] leading-relaxed text-house-brown/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="/how-it-works"
            className="mt-10 inline-block font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border border-house-brown/30 px-7 py-3 hover:bg-house-brown hover:text-house-cream transition-colors"
          >
            See how it works
          </Link>
        </div>

        {/* Image — right */}
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full overflow-hidden border border-house-line">
          <Image
            src="/home/how-house-works.webp"
            alt="A watercolour illustration of a British house on the House's gold floral ground"
            fill
            sizes="(min-width:1024px) 44vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
