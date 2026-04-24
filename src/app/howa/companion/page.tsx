import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { CompanionTry } from "@/components/marketing/CompanionTry";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "The Companion",
  description:
    "Describe what you noticed; the Companion tells you what it probably is, whether it matters, and what to do next.",
};

const STEPS = [
  { n: "01", title: "Understand", body: "Capture the home. Property type, systems, rooms, garden zones, preferences, condition. The Companion builds a home profile from what you know. Intent preselection: design, services, protect, or stewardship." },
  { n: "02", title: "Recommend", body: "The next best route. Based on your home profile, HoWA proposes providers, packages, reviews, consultations, or quotes. Ranked options, not a blank search." },
  { n: "03", title: "Connect", body: "Handoff into action. Select a designer, book a service, start a protection review, or configure a care plan. Everything passes into HoWA with context." },
  { n: "04", title: "Remember", body: "Save to the record. Every answer, every action, every outcome. Partially completed sessions save automatically. The record compounds. The home gets better." },
];

const EXAMPLES = [
  { issue: "Damp patch behind a radiator", answer: "Usually a leaking valve seal. Not urgent, but worth fixing before the next cold snap. \u00a390\u2013150 for a plumber.", next: "Booked a plumber at the House rate. \u00a3120, fixed same week." },
  { issue: "Hairline crack following a door frame", answer: "Ordinary settlement. Not structural \u2014 fill with flexible decorator\u2019s caulk when you next paint.", next: "Saved to the record. Checked 6 months later \u2014 no change. Just the house settling." },
  { issue: "Fine black speckling on bathroom ceiling", answer: "Cold-bridge mould from poor ventilation. Wipe with diluted bleach; consider a humidity-sensing extractor.", next: "Cleaned with bleach. Booked an electrician for an extractor upgrade. \u00a3280, no more mould." },
  { issue: "Condensation between double-glazed panes", answer: "Seal failure. The gas between the panes has escaped. Not urgent but the window will get worse. Replacement unit \u00a3120\u2013250 depending on size. The frame is usually fine.", next: "Scheduled for spring. Unit replaced, record updated." },
  { issue: "Cracking render on the side wall", answer: "Hairline cracking in render is common on cement-rendered masonry. Check for hollow patches by tapping. If solid, a flexible exterior filler will hold.", next: "Tapped the wall \u2014 solid. Filled with exterior filler. Noted for the Protect Review next quarter." },
  { issue: "Small round holes in a roof beam", answer: "Likely woodworm exit holes (common furniture beetle). If the holes have fresh dust (frass), the infestation is active. Typical treatment: \u00a3200\u2013400 per room.", next: "Fresh frass confirmed. Specialist booked at member rate. Treatment done, certificate filed to the record." },
];

export default async function CompanionPage() {
  const sections = await getPageSections("howa-companion");
  const s = (name: string) => sections.get(name);

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>HoWA &middot; The Companion</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            {cms(s("hero"), "headline", "The question you\u2019d ask")} <em>{cms(s("hero"), "headlineEm", "a surveyor")}</em>{cms(s("hero"), "subheadline", ", answered.")}
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 mt-6 max-w-[60ch]">
            {cms(s("hero"), "body", "The Companion is the root diagnostic and intake layer. It captures the home once, then routes intelligently into Design, Services, Protect, and ongoing care. Calm, specific, honest about what it doesn\u2019t know.")}
          </p>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 mt-4 max-w-[56ch]">
            Not another chatbot. A diagnostic built for British homes. The output saves to the home record even before purchase. Insight first, action second. Guidance before transaction.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/api/howa-bounce?source=companion"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
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
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70">{step.body}</p>
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
                    <p className="font-sans italic text-[15px] leading-[1.6] text-house-brown/70">{ex.answer}</p>
                  </div>
                </div>
                {ex.next ? (
                  <div className="mt-3 ml-0 md:ml-[calc(41.67%+12px)] bg-house-white border border-house-brown/6 px-4 py-2.5">
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-house-gold mr-2">What happened next</span>
                    <span className="font-sans text-[13px] text-house-brown/70">{ex.next}</span>
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
          <p className="font-sans text-[12px] text-house-brown/70 mt-3">David R. &middot; 2-bed cottage, Oxfordshire</p>
        </div>
      </section>

      {/* Try it teaser */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10" style={{ background: "var(--howa-paper, #f4efe4)" }}>
        <CompanionTry />
      </section>

      {/* Closing */}
      <section className="px-[5vw] py-14 border-t border-house-brown/10">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="font-sans italic text-[14px] text-house-brown/70 leading-[1.6] mb-5">
            The Companion is part of HoWA+. Your photos and notes are stored in your private record &mdash; encrypted, never shared, never used to train public models.
          </p>
          <GhostLink href="/howa/plus">HoWA+ is &pound;16.99 a month &rarr;</GhostLink>
        </div>
      </section>
    </article>
  );
}
