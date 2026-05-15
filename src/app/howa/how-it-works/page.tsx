import Image from "next/image";
import Link from "next/link";
import s from "./how-it-works.module.css";

/**
 * /howa/how-it-works — How HoWA works.
 *
 * Section order:
 *   1. Hero — copy left, blueprint cross-section right (full-bleed bg, same
 *      gradient-scrim treatment as the steward hero)
 *   2. Stats strip — Four quiet jobs at a glance
 *   3. Verb sections — Understand / Recommend / Connect / Remember
 *      Each is a 2-col image+copy split, alternating sides
 *   4. Compound effect — dark navy band
 *   5. Closing CTA — Start with the Companion
 */

export const metadata = {
  title: "How HoWA works — Understand. Recommend. Connect. Remember.",
  description:
    "Four quiet jobs. Every home, every day. How HoWA stewards the home — from the first scan to the inherited record.",
};

const STAT_COLS = [
  { value: "4", label: "Quiet jobs" },
  { value: "17", label: "House standards covered" },
  { value: "∞", label: "Living Record entries" },
  { value: "0", label: "Things left to chance" },
];

const VERBS = [
  {
    numeral: "I.",
    verb: "Understand",
    title: "It starts by knowing the home.",
    lede: "HoWA reads every system in the home — fabric, services, garden, contents — and builds a record that compounds with every visit.",
    examples: [
      "Your boiler was installed in 2018. It has two years of expected life left before replacement becomes the smarter move.",
      "The crack above the kitchen door appeared after the extension. It's settlement, not structural. Fill with flexible caulk and check in six months.",
      "Your garden faces north-west. The planting plan accounts for that — shade-tolerant perennials at the back, sun-loving herbs by the south wall.",
    ],
    image: "/home-v4/howa-blueprint-hero.png",
    imageAlt:
      "An architectural cross-section of a Georgian townhouse annotated with roof, structure, boiler, garden, environment and risk-watch readouts",
  },
  {
    numeral: "II.",
    verb: "Recommend",
    title: "Then it tells you what matters next.",
    lede: "Seasonal prompts, surfaced risks and timely suggestions. The right thing, at the right moment, with no nagging.",
    examples: [
      "Gutters haven't been cleared since March. Autumn leaves are three weeks away. HoWA suggests booking now, before the rush.",
      "Your Home Protection Review flagged the flat roof as a priority. HoWA routes that to your insurance record and recommends a surveyor quote before renewal.",
      "The cleaning team noted limescale buildup on the bathroom glass. HoWA recommends a descale visit and adjusts the quarterly schedule.",
    ],
    image: "/home-v4/plus-benefit-2.png",
    imageAlt:
      "A leather-bound notebook with a fountain pen and calendar — Living Record and task centre",
  },
  {
    numeral: "III.",
    verb: "Connect",
    title: "It matches you with the right hands.",
    lede: "Trusted services, vetted partners, and the same trade twice when continuity matters. Booked, billed and filed in one place.",
    examples: [
      "You need a plumber for the radiator valve. HoWA matches you with a House-vetted tradesperson at the member rate. Booked for Tuesday.",
      "Your design brief needs a kitchen specialist. HoWA connects you with Jessica Durling-McMahon, whose studio focuses on period kitchens. First consultation this week.",
      "The garden needs seasonal pruning. HoWA schedules Willow Alexander Gardens for the next available slot. Same gardener as last time.",
    ],
    image: "/home-v4/plus-benefit-1.png",
    imageAlt:
      "A window cleaner's hand at a sash window in golden-hour light",
  },
  {
    numeral: "IV.",
    verb: "Remember",
    title: "And it never forgets.",
    lede: "Every service, decision, and document — kept in a record that travels with the home. When you hand the keys on, you hand the story on too.",
    examples: [
      "When you sell the house, the buyer inherits a complete record: every service, every repair, every improvement, every plan. That's provenance.",
      "Your decorator arrives and checks HoWA before starting. Paint colours, finish types, last painted date — all there. No guessing.",
      "Insurance renewal is in 42 days. HoWA surfaces the Home Protection Review evidence pack, the maintenance log, and the claims history. Ready to go.",
    ],
    image: "/home-v4/howa-lander-faq-v2.png",
    imageAlt:
      "The Living Record of Your Home — a leather-bound book, vase, brass key and HoWA sensor on a wooden cabinet",
  },
];

export default function HowItWorksPage() {
  return (
    <div className={s.page}>
      {/* 1. Hero — dollhouse-on-cabinet scene as full-bleed bg, copy floats left */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src="/home-v4/howa-dollhouse-scene.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>How HoWA works</p>
            <h1 className={s.heroTitle}>
              Four quiet jobs.<br />
              <em>Every home, every day.</em>
            </h1>
            <p className={s.heroLede}>
              Whatever the tier, HoWA does the same four things — Understand,
              Recommend, Connect and Remember. Each one feeds the next, and
              the record compounds.
            </p>
            <div className={s.heroCtas}>
              <Link href="/api/howa-bounce" className={s.btnFilled}>
                Enter HoWA
              </Link>
              <Link href="/howa/plus" className={s.btnGhost}>
                See HoWA+
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>Understand. Recommend. Connect. Remember.</p>
          <p className={s.statsLedeLine2}>One system. Four quiet jobs.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3-6. Four verbs */}
      {VERBS.map((v, i) => (
        <section
          key={v.verb}
          className={`${s.verbSection} ${i % 2 === 1 ? s.verbAlt : ""}`}
        >
          <div className={s.verbImage}>
            <Image
              src={v.image}
              alt={v.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className={s.verbCopy}>
            <p className={s.verbMeta}>
              {v.numeral} <span aria-hidden="true">·</span> {v.verb}
            </p>
            <h2 className={s.verbTitle}>{v.title}</h2>
            <p className={s.verbLede}>{v.lede}</p>
            <ul className={s.verbExamples}>
              {v.examples.map((ex, j) => (
                <li key={j}>
                  <span className={s.verbExampleIndex}>0{j + 1}</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* 7. Compound band — navy */}
      <section className={s.compoundBand}>
        <p className={s.compoundEy}>The compound effect.</p>
        <h2 className={s.compoundTitle}>
          Understand <span className={s.compoundDot}>·</span> Recommend <span className={s.compoundDot}>·</span> Connect <span className={s.compoundDot}>·</span> Remember.
        </h2>
        <p className={s.compoundBody}>
          Each verb feeds the next. The more HoWA understands, the better it
          recommends. The more connections it makes, the richer the record.
          Over time the home goes from unknown to deeply known, and maintenance
          shifts from reactive to calm.
        </p>
        <Link href="/howa/plus" className={s.compoundLink}>
          See what HoWA+ includes →
        </Link>
      </section>

      {/* 8. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Begin with the Companion.</p>
        <p className={s.closingStatement}>
          <em>Two minutes. The first piece of the record.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/api/howa-bounce" className={s.closingBtnFilled}>
            Start HoWA — Free
          </Link>
        </div>
      </section>
    </div>
  );
}
