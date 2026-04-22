import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { CompanionTry } from "@/components/marketing/CompanionTry";

export const metadata = {
  title: "The Companion",
  description:
    "Describe what you noticed; the Companion tells you what it probably is, whether it matters, and what to do next.",
};

const STEPS = [
  { n: "01", title: "Notice something", body: "A crack above a door frame. A patch where the paint is coming away. A smell you can\u2019t place. Take a photo." },
  { n: "02", title: "Describe it", body: "A few lines to the Companion. Where it is, when you first noticed it, anything relevant about the house." },
  { n: "03", title: "Get an answer", body: "What it probably is, whether it\u2019s urgent, what a fair price looks like, and whether it\u2019s worth having someone out." },
  { n: "04", title: "Act on it, or don\u2019t", body: "Book a trade through HoWA at the House rate, or save the note to your record and look again in six weeks." },
];

const EXAMPLES = [
  { issue: "Damp patch behind a radiator", answer: "Usually a leaking valve seal. Not urgent, but worth fixing before the next cold snap. \u00a390\u2013150 for a plumber.", next: "Booked a plumber at the House rate. \u00a3120, fixed same week." },
  { issue: "Hairline crack following a door frame", answer: "Ordinary settlement. Not structural \u2014 fill with flexible decorator\u2019s caulk when you next paint.", next: "Saved to the record. Checked 6 months later \u2014 no change. Just the house settling." },
  { issue: "Fine black speckling on bathroom ceiling", answer: "Cold-bridge mould from poor ventilation. Wipe with diluted bleach; consider a humidity-sensing extractor.", next: "Cleaned with bleach. Booked an electrician for an extractor upgrade. \u00a3280, no more mould." },
  { issue: "Condensation between double-glazed panes", answer: "Seal failure. The gas between the panes has escaped. Not urgent but the window will get worse. Replacement unit \u00a3120\u2013250 depending on size. The frame is usually fine.", next: "Scheduled for spring. Unit replaced, record updated." },
  { issue: "Cracking render on the side wall", answer: "Hairline cracking in render is common on cement-rendered masonry. Check for hollow patches by tapping. If solid, a flexible exterior filler will hold.", next: "Tapped the wall \u2014 solid. Filled with exterior filler. Noted for the Protect Review next quarter." },
  { issue: "Small round holes in a roof beam", answer: "Likely woodworm exit holes (common furniture beetle). If the holes have fresh dust (frass), the infestation is active. Typical treatment: \u00a3200\u2013400 per room.", next: "Fresh frass confirmed. Specialist booked at member rate. Treatment done, certificate filed to the record." },
];

export default function CompanionPage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>HoWA \u00b7 The Companion</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            The question you&apos;d ask <em>a surveyor</em>, answered.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Not another chatbot. A diagnostic built specifically for British homes, trained on decades of survey notes, trade call-outs, and the patterns we see again and again. Calm, specific, honest about what it doesn&apos;t know.
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-stone mt-4 max-w-[56ch]">
            Useful for the 80% of home issues that recur across British housing stock. Not a replacement for qualified surveyors or trades &mdash; it&apos;s the layer between noticing a problem and acting on it.
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
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">{step.n}</div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2]">{step.title}</h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-stone">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <Eyebrow>What good looks like</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-4 mb-10">
            Six <em>actual</em> answers.
          </h2>
          <ul className="flex flex-col">
            {EXAMPLES.map((ex) => (
              <li key={ex.issue} className="py-7 border-t border-house-brown/10 first:border-t-0">
                <div className="grid md:grid-cols-[1fr_1.4fr] gap-6">
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-1">You said</div>
                    <p className="font-sans text-[16px] leading-[1.5] text-house-brown/90">{ex.issue}</p>
                  </div>
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-1">The Companion</div>
                    <p className="font-sans italic text-[15px] leading-[1.6] text-house-stone">{ex.answer}</p>
                  </div>
                </div>
                {ex.next ? (
                  <div className="mt-3 ml-0 md:ml-[calc(41.67%+12px)] bg-house-white border border-house-brown/6 px-4 py-2.5">
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-house-gold mr-2">What happened next</span>
                    <span className="font-sans text-[13px] text-house-stone">{ex.next}</span>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-[5vw] py-12 bg-white border-t border-house-brown/10">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="font-sans italic text-[17px] leading-[1.55] text-house-brown/80">
            &ldquo;I photograph everything now. The Companion told me the crack above the kitchen door was settlement, not structural. Saved me a surveyor&apos;s call-out fee and a week of worry.&rdquo;
          </p>
          <p className="font-sans text-[12px] text-house-stone mt-3">David R. &middot; 2-bed cottage, Oxfordshire</p>
        </div>
      </section>

      {/* Try it teaser */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10" style={{ background: "var(--howa-paper, #f4efe4)" }}>
        <CompanionTry />
      </section>

      {/* Closing */}
      <section className="px-[5vw] py-14 border-t border-house-brown/10">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="font-sans italic text-[14px] text-house-stone leading-[1.6] mb-5">
            The Companion is part of HoWA+. Your photos and notes are stored in your private record &mdash; encrypted, never shared, never used to train public models.
          </p>
          <GhostLink href="/howa/plus">HoWA+ is &pound;16.99 a month &rarr;</GhostLink>
        </div>
      </section>
    </article>
  );
}
