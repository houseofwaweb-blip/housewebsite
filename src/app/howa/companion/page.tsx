import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * /howa/companion — the diagnostic layer of HoWA.
 * Sits between "I noticed a thing in my home" and "someone should look at it".
 *
 * Tone: confident and practical. We are not trying to replace a surveyor —
 * we're answering the bit before you need one.
 */

export const metadata = {
  title: "The Companion",
  description:
    "Describe what you noticed; the Companion tells you what it probably is, whether it matters, and what to do next.",
};

const STEPS = [
  {
    n: "01",
    title: "Notice something",
    body: "A crack above a door frame. A patch where the paint is coming away. A smell you can't place. Take a photo.",
  },
  {
    n: "02",
    title: "Describe it",
    body: "A few lines to the Companion. Where it is, when you first noticed it, anything relevant about the house.",
  },
  {
    n: "03",
    title: "Get an answer",
    body: "What it probably is, whether it's urgent, what a fair price looks like, and whether it's worth having someone out.",
  },
  {
    n: "04",
    title: "Act on it, or don't",
    body: "Book a trade through HoWA at the House rate, or save the note to your record and look again in six weeks.",
  },
];

const EXAMPLES = [
  {
    issue: "Damp patch behind a radiator",
    answer:
      "Usually a leaking valve seal. Not urgent, but worth fixing before the next cold snap. £90–150 for a plumber.",
  },
  {
    issue: "Hairline crack following a door frame",
    answer:
      "Ordinary settlement. Not structural — fill with flexible decorator's caulk when you next paint.",
  },
  {
    issue: "Fine black speckling on bathroom ceiling",
    answer:
      "Cold-bridge mould from poor ventilation. Wipe with diluted bleach; consider a humidity-sensing extractor.",
  },
];

export default function CompanionPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>HoWA · The Companion</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            The question you&apos;d ask <em>a surveyor</em>, answered.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Not another chatbot. A diagnostic built specifically for British
            homes, trained on decades of survey notes, trade call-outs, and the
            patterns we see again and again. Calm, specific, honest about
            what it doesn&apos;t know.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/api/howa-bounce?source=companion"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Try the Companion
            </Link>
            <StateBadge state="coming">Part of HoWA+</StateBadge>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[1100px] mx-auto">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-4 mb-12 max-w-[22ch]">
            Four steps, about two minutes.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 border-t border-house-gold pt-5">
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
                  {step.n}
                </div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[860px] mx-auto">
          <Eyebrow>What good looks like</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-4 mb-10">
            Three <em>actual</em> answers.
          </h2>
          <ul className="flex flex-col">
            {EXAMPLES.map((ex) => (
              <li
                key={ex.issue}
                className="grid md:grid-cols-[1fr_1.4fr] gap-6 py-6 border-t border-house-brown/10 first:border-t-0"
              >
                <div>
                  <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-1">
                    You said
                  </div>
                  <p className="font-sans text-[16px] leading-[1.5] text-house-brown/90">
                    {ex.issue}
                  </p>
                </div>
                <div>
                  <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-1">
                    The Companion
                  </div>
                  <p className="font-sans italic text-[16px] leading-[1.6] text-house-stone">
                    {ex.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-12 font-sans italic text-[14px] text-house-stone leading-[1.6]">
            It&apos;s not a replacement for a surveyor or a tradesman — it&apos;s
            the layer between noticing and acting. When you do need someone
            out, we book them through HoWA at the House rate.
          </p>
          <div className="mt-6">
            <GhostLink href="/howa/plans">HoWA+ is £16.99 a month</GhostLink>
          </div>
        </div>
      </section>
    </article>
  );
}
