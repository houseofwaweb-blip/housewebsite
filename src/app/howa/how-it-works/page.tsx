import Image from "next/image";
import Link from "next/link";
import s from "./how-it-works.module.css";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/how-it-works, How HoWA works.
 *
 * Section order:
 *   1. Hero, copy left, blueprint cross-section right (full-bleed bg, same
 *      gradient-scrim treatment as the steward hero)
 *   2. Stats strip, Four quiet jobs at a glance
 *   3. Verb sections, Understand / Recommend / Connect / Remember
 *      Each is a 2-col image+copy split, alternating sides
 *   4. Compound effect, dark navy band
 *   5. Closing CTA, Start with the Assistant
 */

export const metadata = {
  title: "How HoWA works: Understand. Recommend. Connect. Remember.",
  description:
    "Four quiet jobs. Every home, every day. How HoWA stewards the home, from the first scan to the inherited record.",
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
    lede: "HoWA reads every system in the home, fabric, services, garden, contents, and builds a record that compounds with every visit.",
    examples: [
      "Your boiler was installed in 2018. It has two years of expected life left before replacement becomes the smarter move.",
      "The crack above the kitchen door appeared after the extension. It's settlement, not structural. Fill with flexible caulk and check in six months.",
      "Your garden faces north-west. The planting plan accounts for that, shade-tolerant perennials at the back, sun-loving herbs by the south wall.",
    ],
    image: "/home-v4/howitworks-scan-v2.webp",
    imageAlt:
      "A phone scanning a room in the home, HoWA reading its fabric, services and contents to build the record",
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
    image: "/home-v4/howa-remember.webp",
    imageAlt:
      "The HoWA home record on a phone beside the cutaway dollhouse, surfacing what matters next",
  },
  {
    numeral: "III.",
    verb: "Connect",
    title: "It matches you with the right hands.",
    lede: "Trusted services, vetted partners, and the same trade twice when continuity matters. Booked, billed and filed in one place.",
    examples: [
      "You need a plumber for the radiator valve. HoWA matches you with a House-vetted tradesperson at the member rate. Booked for Tuesday.",
      "Your design brief needs an interiors specialist. HoWA connects you with Delve Interiors, whose studio focuses on period homes. First consultation this week.",
      "The garden needs seasonal pruning. HoWA schedules Willow Alexander Gardens for the next available slot. Same gardener as last time.",
    ],
    image: "/home-v4/howa-connect.webp",
    imageAlt:
      "HoWA matching the home with the right trusted hands, booked, billed and filed in one place",
  },
  {
    numeral: "IV.",
    verb: "Remember",
    title: "And it never forgets.",
    lede: "Every service, decision, and document, kept in a record that travels with the home. When you hand the keys on, you hand the story on too.",
    examples: [
      "When you sell the house, the buyer inherits a complete record: every service, every repair, every improvement, every plan. That's provenance.",
      "Your decorator arrives and checks HoWA before starting. Paint colours, finish types, last painted date, all there. No guessing.",
      "Insurance renewal is in 42 days. HoWA surfaces the Home Protection Review evidence pack, the maintenance log, and the claims history. Ready to go.",
    ],
    image: "/home-v4/howa-understand.webp",
    imageAlt:
      "The HoWA living record of the home, every service, decision and document kept and carried forward",
  },
];

export default async function HowItWorksPage() {
  const sections = await getPageSections("howa-how-it-works");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const verbsSection = sections.get("verbs");
  const compound = sections.get("compound");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const verbs = cmsCards(verbsSection, VERBS, (c, base) => ({
    numeral: pick(c.label, base?.numeral ?? ""),
    verb: pick(c.value, base?.verb ?? ""),
    title: pick(c.title, base?.title ?? ""),
    lede: pick(c.body, base?.lede ?? ""),
    examples: c.items && c.items.length ? c.items : base?.examples ?? [],
    image: pick(c.imageUrl, base?.image ?? ""),
    imageAlt: pick(c.imageAlt, base?.imageAlt ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_how_it_works"
        contentName="How HoWA works"
        contentCategory="howa_marketing"
      />
      {/* 1. Hero, dollhouse-on-cabinet scene as full-bleed bg, copy floats left */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src={cms(hero, "imageUrl", "/home-v4/howa-dollhouse-scene.webp")}
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "How HoWA works")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Four quiet jobs.")}<br />
              <em>{cms(hero, "headlineEm", "Every home, every day.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Whatever the tier, HoWA does the same four things, Understand, Recommend, Connect and Remember. Each one feeds the next, and the record compounds.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "/api/howa-bounce")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Join the waitlist")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/howa/housekeeper")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See Housekeeper")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Understand. Recommend. Connect. Remember.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "One system. Four quiet jobs.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3-6. Four verbs */}
      {verbs.map((v, i) => (
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

      {/* 7. Compound band, navy */}
      <section className={s.compoundBand}>
        <p className={s.compoundEy}>{cms(compound, "eyebrow", "The compound effect.")}</p>
        <h2 className={s.compoundTitle}>
          Understand <span className={s.compoundDot}>·</span> Recommend <span className={s.compoundDot}>·</span> Connect <span className={s.compoundDot}>·</span> Remember.
        </h2>
        <p className={s.compoundBody}>
          {cms(
            compound,
            "body",
            "Each verb feeds the next. The more HoWA understands, the better it recommends. The more connections it makes, the richer the record. Over time the home goes from unknown to deeply known, and maintenance shifts from reactive to calm.",
          )}
        </p>
        <Link href={cms(compound, "ctaHref", "/howa/housekeeper")} className={s.compoundLink}>
          {cms(compound, "ctaLabel", "See what Housekeeper includes")} →
        </Link>
      </section>

      {/* 8. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Begin with the Assistant.")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "Two minutes. The first piece of the record.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/api/howa-bounce")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Join the waitlist")}
          </Link>
        </div>
      </section>
    </div>
  );
}
