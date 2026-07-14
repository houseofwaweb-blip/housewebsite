import Link from "next/link";
import s from "./ask.module.css";
import { AskCompanion } from "./AskCompanion";

/**
 * /howa/ask — "Ask HoWA", a required HoWA nav destination (Directive v2, the
 * HoWA nav row: Start with my address · HoWA Score · Home Record · Ask HoWA ·
 * Housekeeper · Steward · Help).
 *
 * The Q&A below is a SCRIPTED ILLUSTRATION, not a live tool. v2 forbids
 * implying a capability is available when it is not, so the demo is labelled
 * as a worked example on the page itself and the CTA routes to the real,
 * honest next step rather than pretending to answer about the user's own home.
 */

export const metadata = {
  title: "Ask HoWA | A plain answer before anyone is booked",
  description:
    "See how HoWA reads a problem in the home: what it likely is, how urgent it is, and what a fair fix costs. Worked examples.",
};

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

export default function AskHowaPage() {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>HoWA · Ask HoWA</p>
            <h1 className={s.heroTitle}>
              Ask the house <em>anything</em>.
            </h1>
            <p className={s.heroLede}>
              Describe what you are looking at, a damp patch, a crack, a noise
              the boiler has started making, and HoWA tells you what it likely
              is, how urgent it really is, and what a fair fix should cost.
              Before anyone is booked, and before anyone quotes you.
            </p>
            <div className={s.heroCtas}>
              <Link href="#open-booking-form" className={s.btnFilled}>
                Book through HoWA
              </Link>
              <Link href="/howa" className={s.btnGhost}>
                See what HoWA remembers
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ask anything, in action — scripted worked examples */}
      <section className={s.examples}>
        <header className={s.examplesHead}>
          <p className={s.examplesEy}>Ask anything</p>
          <h2 className={s.examplesTitle}>
            HoWA, <em>in action</em>.
          </h2>
          <p className={s.heroLede} style={{ maxWidth: "62ch", margin: "16px auto 0" }}>
            Six worked examples, written out in full. Pick an issue, read the
            answer, then choose what you would do next.
          </p>
        </header>
        <AskCompanion items={EXAMPLES} />
        <div className={s.ctaRow}>
          <p className={s.ctaRowText}>
            Worked examples, shown to explain how HoWA reads a home. Answers are
            guidance, never a substitute for a qualified inspection. Gas,
            electrical and structural concerns always go to a qualified
            professional.
          </p>
          <Link href="#open-booking-form" className={s.btnFilled}>
            Book through HoWA
          </Link>
        </div>
      </section>
    </div>
  );
}
