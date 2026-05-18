import Image from "next/image";
import Link from "next/link";
import s from "./companion.module.css";
import { CompanionTry } from "@/components/marketing/CompanionTry";

/**
 * /howa/companion — The Companion diagnostic.
 *
 * Section order:
 *   1. Hero — Companion scan image right, copy left, dollhouse-warm tone
 *   2. Stats strip — Insight first. Action second.
 *   3. Four steps — editorial grid
 *   4. Six examples — full-bleed editorial Q&A
 *   5. Testimonial — quote panel
 *   6. Try it — CompanionTry component, lander-styled wrapper
 *   7. Closing — italic statement + HoWA+ link
 */

export const metadata = {
  title: "The Companion — The question you'd ask a surveyor, answered.",
  description:
    "The Companion is HoWA's root diagnostic. Describe what you've noticed; the Companion tells you what it probably is, whether it matters, and what to do next.",
};

const STAT_COLS = [
  { value: "2", label: "Minutes to capture" },
  { value: "17", label: "House standards covered" },
  { value: "100%", label: "Private to your record" },
  { value: "0", label: "Jargon" },
];

const STEPS = [
  {
    n: "I.",
    title: "Understand",
    body:
      "Capture the home once. Property type, systems, rooms, garden zones, preferences, condition. The Companion builds a home profile from what you know.",
  },
  {
    n: "II.",
    title: "Recommend",
    body:
      "The next best route. Based on your home profile, HoWA proposes providers, packages, reviews, consultations, or quotes. Ranked options, not a blank search.",
  },
  {
    n: "III.",
    title: "Connect",
    body:
      "Handoff into action. Select a designer, book a service, start a Protection Review, or configure a care plan. Everything passes into HoWA with context.",
  },
  {
    n: "IV.",
    title: "Remember",
    body:
      "Save to the record. Every answer, every action, every outcome. Partially completed sessions save automatically. The record compounds.",
  },
];

const EXAMPLES = [
  {
    issue: "Damp patch behind a radiator",
    answer:
      "Usually a leaking valve seal. Not urgent, but worth fixing before the next cold snap. £90–150 for a plumber.",
    next: "Booked a plumber at the House rate. £120, fixed same week.",
  },
  {
    issue: "Hairline crack following a door frame",
    answer:
      "Ordinary settlement. Not structural — fill with flexible decorator's caulk when you next paint.",
    next: "Saved to the record. Checked 6 months later — no change. Just the house settling.",
  },
  {
    issue: "Fine black speckling on bathroom ceiling",
    answer:
      "Cold-bridge mould from poor ventilation. Wipe with diluted bleach; consider a humidity-sensing extractor.",
    next: "Cleaned with bleach. Booked an electrician for an extractor upgrade. £280, no more mould.",
  },
  {
    issue: "Condensation between double-glazed panes",
    answer:
      "Seal failure. The gas between the panes has escaped. Not urgent but the window will get worse. Replacement unit £120–250.",
    next: "Scheduled for spring. Unit replaced, record updated.",
  },
  {
    issue: "Cracking render on the side wall",
    answer:
      "Hairline cracking in cement render is common. Check for hollow patches by tapping. If solid, a flexible exterior filler will hold.",
    next: "Tapped the wall — solid. Filled with exterior filler. Noted for the Home Protection Review next quarter.",
  },
  {
    issue: "Small round holes in a roof beam",
    answer:
      "Likely woodworm exit holes (common furniture beetle). If the holes have fresh dust (frass), the infestation is active. Treatment £200–400 per room.",
    next: "Fresh frass confirmed. Specialist booked at member rate. Treatment done, certificate filed to the record.",
  },
];

export default function CompanionPage() {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The Companion</p>
            <h1 className={s.heroTitle}>
              The question you'd ask <em>a surveyor</em>,<br />
              answered.
            </h1>
            <p className={s.heroLede}>
              Not another chatbot. A calm, specific diagnostic built for British
              homes. Capture the home once, route intelligently into design,
              services, protection, and ongoing care.
            </p>
            <div className={s.heroCtas}>
              <Link
                href="/api/howa-bounce?source=companion"
                className={s.btnFilled}
              >
                Try the Companion
              </Link>
              <Link href="/howa/plus" className={s.btnGhost}>
                Part of HoWA+
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/plus-benefit-3.png"
            alt="A hand holding a phone running the Companion diagnostic over a kitchen valve, with subtle architect-style annotation lines"
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
          <p className={s.statsLedeLine1}>Insight first. Action second.</p>
          <p className={s.statsLedeLine2}>Guidance before transaction.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Four steps */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>How it works</p>
          <h2 className={s.stepsTitle}>
            Four steps, <em>about two minutes.</em>
          </h2>
        </header>
        <div className={s.stepsGrid}>
          {STEPS.map((step) => (
            <article key={step.n} className={s.stepCard}>
              <p className={s.stepNumber}>{step.n}</p>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepBody}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Six examples */}
      <section className={s.examples}>
        <header className={s.examplesHead}>
          <p className={s.examplesEy}>What good looks like</p>
          <h2 className={s.examplesTitle}>
            Six <em>actual</em> answers.
          </h2>
        </header>
        <ul className={s.examplesList}>
          {EXAMPLES.map((ex, i) => (
            <li key={ex.issue} className={s.example}>
              <span className={s.exampleIndex}>0{i + 1}</span>
              <div className={s.exampleBody}>
                <div className={s.exampleQ}>
                  <p className={s.exampleLabel}>You said</p>
                  <p className={s.exampleIssue}>{ex.issue}</p>
                </div>
                <div className={s.exampleA}>
                  <p className={`${s.exampleLabel} ${s.exampleLabelHowa}`}>The Companion</p>
                  <p className={s.exampleAnswer}>{ex.answer}</p>
                </div>
                <div className={s.exampleNext}>
                  <p className={s.exampleLabel}>What happened next</p>
                  <p className={s.exampleNextBody}>{ex.next}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Testimonial */}
      <section className={s.quoteSection}>
        <figure className={s.quote}>
          <blockquote>
            I photograph everything now. The Companion told me the crack above
            the kitchen door was settlement, not structural. Saved me a
            surveyor's call-out fee and a week of worry.
          </blockquote>
          <figcaption>
            <strong>David R.</strong> · 2-bed cottage, Oxfordshire
          </figcaption>
        </figure>
      </section>

      {/* 6. Try it teaser */}
      <section className={s.tryItSection}>
        <div className={s.tryItInner}>
          <CompanionTry />
        </div>
      </section>

      {/* 7. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>The Companion is part of HoWA+.</p>
        <p className={s.closingStatement}>
          <em>Your home, finally understood.</em>
        </p>
        <p className={s.closingSub}>
          Your photos and notes are stored in your private record — encrypted,
          never shared, never used to train public models.
        </p>
        <div className={s.closingCtas}>
          <Link href="/howa/plus" className={s.closingBtnFilled}>
            HoWA+ is £16.99 a month
          </Link>
        </div>
      </section>
    </div>
  );
}
