import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

export const metadata = {
  title: "How HoWA Works",
  description:
    "Four quiet jobs: Understand, Recommend, Connect, Remember. How HoWA stewards your home, every day.",
};

const VERBS = [
  {
    numeral: "I",
    verb: "Understand",
    headline: "It starts by knowing the home.",
    examples: [
      "Your boiler was installed in 2018. It has two years of expected life left before replacement becomes the smarter move.",
      "The crack above the kitchen door appeared after the extension. It's settlement, not structural. Fill with flexible caulk and check in six months.",
      "Your garden faces north-west. The planting plan accounts for that — shade-tolerant perennials at the back, sun-loving herbs by the south wall.",
    ],
  },
  {
    numeral: "II",
    verb: "Recommend",
    headline: "Then it tells you what matters next.",
    examples: [
      "Gutters haven't been cleared since March. Autumn leaves are three weeks away. HoWA suggests booking now, before the rush.",
      "Your Protect Review flagged the flat roof as a priority. HoWA routes that to your insurance record and recommends a surveyor quote before renewal.",
      "The cleaning team noted limescale buildup on the bathroom glass. HoWA recommends a descale visit and adjusts the quarterly schedule.",
    ],
  },
  {
    numeral: "III",
    verb: "Connect",
    headline: "It matches you with the right hands.",
    examples: [
      "You need a plumber for the radiator valve. HoWA matches you with a House-vetted tradesperson at the member rate. Booked for Tuesday.",
      "Your design brief needs a kitchen specialist. HoWA connects you with Jessica Durling-McMahon, whose studio focuses on period kitchens. First consultation this week.",
      "The garden needs seasonal pruning. HoWA schedules Willow Alexander Gardens for the next available slot. Same gardener as last time.",
    ],
  },
  {
    numeral: "IV",
    verb: "Remember",
    headline: "And it never forgets.",
    examples: [
      "When you sell the house, the buyer inherits a complete record: every service, every repair, every improvement, every plan. That's provenance.",
      "Your decorator arrives and checks HoWA before starting. Paint colours, finish types, last painted date — all there. No guessing.",
      "Insurance renewal is in 42 days. HoWA surfaces the Protect Review evidence pack, the maintenance log, and the claims history. Ready to go.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <article className="text-house-brown">
      {/* Hero */}
      <section className="bg-house-cream px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>How HoWA works</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Four quiet jobs. Every home, <em>every day.</em>
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 mt-6 max-w-[60ch]">
            Whatever the tier, HoWA does the same four things. Story lives on the House. Decision, configuration, booking, payment, and continuity live in HoWA. No meaningful journey ends as an orphan enquiry. The record compounds. The home gets better.
          </p>
        </div>
      </section>

      {/* Verb sections */}
      {VERBS.map((v, i) => (
        <section
          key={v.verb}
          className={`px-[5vw] py-20 border-t border-house-brown/8 ${i % 2 === 0 ? "bg-house-white" : ""}`}
          style={i % 2 !== 0 ? { background: "var(--howa-paper, #f4efe4)" } : undefined}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className={i % 2 !== 0 ? "md:order-2" : ""}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-[-12px] left-[-6px] font-display font-normal text-[clamp(80px,10vw,130px)] leading-[0.85] text-house-brown/5 select-none"
                >
                  {v.numeral}
                </span>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-2.5">
                  {v.verb}
                </span>
                <h2 className="font-sans font-normal text-[clamp(24px,3vw,36px)] leading-[1.15] text-house-brown mb-8">
                  {v.headline}
                </h2>
              </div>
              <ul className="space-y-5">
                {v.examples.map((ex, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="flex-shrink-0 font-display italic text-[13px] text-house-gold mt-0.5">
                      {j + 1}.
                    </span>
                    <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                      {ex}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`w-full aspect-[4/5] bg-house-cream-dark flex items-center justify-center font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown/70 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
              {v.verb} illustration
            </div>
          </div>
        </section>
      ))}

      {/* Together they compound */}
      <section className="bg-howa-navy text-house-cream px-[5vw] py-20">
        <div className="max-w-[720px] mx-auto text-center">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3">
            The compound effect
          </span>
          <h2 className="font-sans font-normal text-[clamp(24px,3vw,36px)] leading-[1.15] text-house-cream mb-5">
            Understand + Recommend + Connect + Remember.
          </h2>
          <p className="font-sans text-[16px] leading-[1.65] text-house-cream/65 mb-8">
            Each verb feeds the next. The more HoWA understands, the better it recommends. The more connections it makes, the richer the record. Over time, the home goes from unknown to deeply known, and the maintenance goes from reactive to calm.
          </p>
          <GhostLink href="/howa/plus" dark>
            See what HoWA+ includes →
          </GhostLink>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-house-cream px-[5vw] py-20 text-center border-t border-house-brown/8">
        <p className="mx-auto max-w-[600px] mb-7 font-display italic text-[22px] leading-[1.35] text-house-brown">
          Begin with the Companion. It takes two minutes and gives you the first piece of the record.
        </p>
        <Link
          href="/api/howa-bounce?source=how-it-works"
          className="inline-block px-10 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start HoWA — Free
        </Link>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/70 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
