import Image from "next/image";
import Link from "next/link";
import s from "./assistant.module.css";
import { V6Cta } from "../V6Sections";
import { AskCompanion } from "./AskCompanion";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/assistant, the free Assistant tier ("The way in").
 *
 * Assistant is the deck's Tier 01: free, useful before you've paid a penny.
 * The Companion diagnostic (Ask: photograph -> answer) is its centrepiece,
 * alongside the portrait, the scans, quotes-decoded and the first save.
 * Everything carries upward into Housekeeper (Housekeeper) and Steward.
 *
 * Section order:
 *   1. Hero, "The house, seen." Start with an address.
 *   2. Stats strip, useful before you've paid a penny
 *   3. What you get free, the Assistant capability cards
 *   4. Ask anything, the Companion in action (six real answers)
 *   5. Testimonial
 *   6. CTA band (olive)
 *   7. Closing, free to start, deepens with Housekeeper
 */

export const metadata = {
  title: "HoWA Assistant: the house, seen. Free, start with an address.",
  description:
    "The free way into HoWA. The portrait of your home in a minute, the Assistant diagnostic for anything that bothers you, repair, garden and room scans, quotes decoded, and the first save.",
};

const STAT_COLS = [
  { value: "1 min", label: "To the portrait" },
  { value: "Free", label: "To start, no card" },
  { value: "100%", label: "Private to your record" },
  { value: "0", label: "Jargon" },
];

const CAPABILITIES = [
  {
    n: "I.",
    title: "The portrait",
    body:
      "Start with an address. Age, build, energy, ground and flood, gathered into a picture of your home in about a minute.",
  },
  {
    n: "II.",
    title: "The scans",
    body:
      "Repair, garden and room. Photograph what you've noticed; get what it is, how urgent it is, and what to do first.",
  },
  {
    n: "III.",
    title: "Quotes, decoded",
    body:
      "Send a quote or invoice. The Assistant reads it back in plain words, what it covers, and what's fair to ask.",
  },
  {
    n: "IV.",
    title: "The first save",
    body:
      "One tap and the record begins. Everything you ask and save stays in your home's private history, and carries upward as you grow.",
  },
];

const EXAMPLES = [
  {
    issue: "Damp patch behind a radiator",
    answer:
      "Usually a leaking valve seal. Not urgent, but worth fixing before the next cold snap. Around £90 to £150 for a plumber.",
    choices: [
      {
        label: "Book a plumber",
        result:
          "Booked. Thursday at 9am, a vetted plumber at the House rate. Added to your diary, and the job is saved to your home record.",
      },
      {
        label: "Save it for now",
        result:
          "Saved to your home record with the photo. We'll nudge you before the first cold week of autumn.",
      },
    ],
  },
  {
    issue: "Hairline crack following a door frame",
    answer:
      "Ordinary settlement. Not structural. Fill with flexible decorator's caulk when you next paint.",
    choices: [
      {
        label: "Add to my to-do list",
        result:
          "Added to your seasonal to-do list under decorating, so it surfaces when you next plan a paint.",
      },
      {
        label: "Remind me in 6 months",
        result:
          "Noted. We'll check back in December and ask whether the crack has moved at all.",
      },
    ],
  },
  {
    issue: "Fine black speckling on bathroom ceiling",
    answer:
      "Cold-bridge mould from poor ventilation. Wipe with diluted bleach, then consider a humidity-sensing extractor.",
    choices: [
      {
        label: "Find an electrician",
        result:
          "Three vetted electricians near you, extractor upgrades from £240. Added to your shortlist to compare.",
      },
      {
        label: "Save the guidance",
        result:
          "Saved to your record with the cleaning steps, ready for the next time it appears.",
      },
    ],
  },
  {
    issue: "Condensation between double-glazed panes",
    answer:
      "Seal failure. The gas between the panes has escaped. Not urgent, but the window will only get worse. A replacement unit is £120 to £250.",
    choices: [
      {
        label: "Get a glazier's quote",
        result:
          "Quote request sent to a vetted glazier. You'll have a price within two working days, saved to the record.",
      },
      {
        label: "Schedule for spring",
        result:
          "Added to your calendar for March, when the weather is kinder for glazing work.",
      },
    ],
  },
  {
    issue: "Cracking render on the side wall",
    answer:
      "Hairline cracking in cement render is common. Tap for hollow patches; if it's solid, a flexible exterior filler will hold.",
    choices: [
      {
        label: "Flag for my Protection Review",
        result:
          "Flagged. It's on the agenda for your next Home Protection Review, with today's photo attached.",
      },
      {
        label: "Save and monitor",
        result:
          "Saved with a reminder to re-photograph in three months, so we can see whether it's spreading.",
      },
    ],
  },
  {
    issue: "Small round holes in a roof beam",
    answer:
      "Likely woodworm exit holes (common furniture beetle). Fresh dust, called frass, means it's active. Treatment is £200 to £400 per room.",
    choices: [
      {
        label: "Book a specialist",
        result:
          "Booked. A timber specialist at member rate, with the certificate filed to your record once it's treated.",
      },
      {
        label: "Save for now",
        result:
          "Saved to your record, with a reminder to check for fresh frass in a fortnight.",
      },
    ],
  },
];

export default async function AssistantPage() {
  const sections = await getPageSections("howa-assistant");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const capabilities = sections.get("capabilities");
  const examples = sections.get("examples");
  const quote = sections.get("quote");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const capabilityCards = cmsCards(capabilities, CAPABILITIES, (c, base) => ({
    n: pick(c.label, base?.n ?? ""),
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_assistant"
        contentName="HoWA Assistant"
        contentCategory="howa_tier"
      />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Assistant · Free · The way in")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "The house,")}{" "}
              <em>{cms(hero, "headlineEm", "seen", "headline")}</em>.<br />
              {cms(hero, "subheadline", "Start with an address.")}
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "The free way into HoWA. The portrait of your home arrives in a minute; after that, ask the house whatever's bothering you. Useful before you've paid a penny, and the first honest conversation with your home.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link
                href={cms(hero, "ctaHref", "/howa/coming-soon?tier=assistant")}
                className={s.btnFilled}
              >
                {cms(hero, "ctaLabel", "Start free")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/howa/plans")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Compare the tiers")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          {/* Floating UI card over the empty olive wall, askhowa style */}
          <div className="hidden lg:block absolute left-[8%] top-[14%] z-10 w-[232px] bg-[#faf7f0] border border-[color:var(--color-gold)]/35 shadow-[0_22px_50px_-18px_rgba(30,30,15,0.5)] px-5 py-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-gold-deep)] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5f6a49]" aria-hidden /> Free with Assistant
            </p>
            <ul className="space-y-2.5">
              {["The portrait, from an address", "Repair, garden & room scans", "Ask anything, quotes decoded"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.35] text-[color:var(--color-ink)]/85">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5f6a49" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={cms(hero, "imageUrl", "/home-v4/companion-hero.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "The HoWA Assistant dollhouse, an olive-toned cutaway Georgian home on a single-colour ground.",
            )}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Useful before you've paid a penny.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Not a vault, a manager, or a discount club.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. What you get, free */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>{cms(capabilities, "eyebrow", "What you get, free")}</p>
          <h2 className={s.stepsTitle}>
            {cms(capabilities, "headline", "Everything the")}{" "}
            <em>{cms(capabilities, "headlineEm", "Assistant does.", "headline")}</em>
          </h2>
        </header>
        <div className={s.stepsGrid}>
          {capabilityCards.map((cap) => (
            <article key={cap.n} className={s.stepCard}>
              <p className={s.stepNumber}>{cap.n}</p>
              <h3 className={s.stepTitle}>{cap.title}</h3>
              <p className={s.stepBody}>{cap.body}</p>
            </article>
          ))}
        </div>
        <div className={s.ctaRow}>
          <p className={s.ctaRowText}>Free to start, no card needed.</p>
          <Link href="/howa/coming-soon?tier=assistant" className={s.btnFilled}>
            Start with an address
          </Link>
        </div>
      </section>

      {/* 4. Ask anything, the Companion in action */}
      <section className={s.examples}>
        <header className={s.examplesHead}>
          <p className={s.examplesEy}>{cms(examples, "eyebrow", "Ask anything")}</p>
          <h2 className={s.examplesTitle}>
            {cms(examples, "headline", "The Assistant,")}{" "}
            <em>{cms(examples, "headlineEm", "in action", "headline")}</em>.
          </h2>
        </header>
        <AskCompanion items={EXAMPLES} />
        <div className={s.ctaRow}>
          <p className={s.ctaRowText}>Ask the Assistant about your own home, free.</p>
          <Link href="/howa/coming-soon?tier=assistant" className={s.btnFilled}>
            Start free
          </Link>
        </div>
      </section>

      {/* 5. Testimonial */}
      <section className={s.quoteSection}>
        <figure className={s.quote}>
          <blockquote>
            {cms(
              quote,
              "body",
              "I photograph everything now. The Assistant told me the crack above the kitchen door was settlement, not structural. Saved me a surveyor's call-out fee and a week of worry.",
            )}
          </blockquote>
          <figcaption>
            <strong>{cms(quote, "headline", "David R.")}</strong>{" "}
            · {cms(quote, "subheadline", "2-bed cottage, Oxfordshire")}
          </figcaption>
        </figure>
      </section>

      {/* 6. CTA band (askhowa olive strip) */}
      <V6Cta />

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "The Assistant is free. It deepens with Housekeeper.")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "The first honest conversation with your house.", "headline")}</em>
        </p>
        <p className={s.closingSub}>
          {cms(
            closing,
            "body",
            "Your photos and notes are stored in your private record, encrypted, never shared, never used to train public models. Everything you save here carries upward, stepping up never starts you over.",
          )}
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/howa/coming-soon?tier=assistant")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Start free with an address")}
          </Link>
        </div>
      </section>
    </div>
  );
}
