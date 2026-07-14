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
 *   3. Verb sections, Know / Score / Act / Remember
 *      Each is a 2-col image+copy split, alternating sides
 *   4. Compound effect, dark navy band
 *   5. Closing CTA, Start with the Assistant
 */

export const metadata = {
  title: "How HoWA Works | Know, score, act, remember",
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
    verb: "Know",
    title: "It starts by knowing the home.",
    lede: "The address begins the record. Public facts, rooms, assets, documents, services, photographs and decisions gather around one centre.",
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
    verb: "Score",
    title: "Then it scores what is known.",
    lede: "The HoWA Score shows what is known, what is missing and what needs attention. It sharpens as the record fills.",
    examples: [
      "Record completeness sits at 48%. Adding the boiler certificate and the last three invoices moves it most.",
      "Maintenance rhythm is strong, evidence is thin. Two documents close the biggest gap.",
      "The Score stays provisional until the first service writes back. One visit sharpens it.",
    ],
    image: "/home-v4/howa-remember.webp",
    imageAlt:
      "The HoWA home record on a phone beside the cutaway dollhouse, surfacing what matters next",
  },
  {
    numeral: "III.",
    verb: "Act",
    title: "It turns signals into useful action.",
    lede: "HoWA turns answers into tasks, reminders, plans, bookings or trusted routes. A useful answer should not become another thing to remember.",
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
    title: "And it remembers the outcome.",
    lede: "Every action, cost, photograph, certificate, supplier, note and outcome returns to the Home Record. When you hand the keys on, you hand the story on too.",
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
              {cms(hero, "headline", "Know. Score.")}<br />
              <em>{cms(hero, "headlineEm", "Act. Remember.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "HoWA does four quiet jobs for the home. It learns what the home is, scores what is known, turns signals into useful action, and remembers the outcome.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "/api/howa-bounce")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Start free")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/household/housekeeper")} className={s.btnGhost}>
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
            {cms(stats, "headline", "Know. Score. Act. Remember.")}
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
          Know <span className={s.compoundDot}>·</span> Score <span className={s.compoundDot}>·</span> Act <span className={s.compoundDot}>·</span> Remember.
        </h2>
        <p className={s.compoundBody}>
          {cms(
            compound,
            "body",
            "The more the home is known, the more useful HoWA becomes. The more useful HoWA becomes, the more the owner returns. The record gets richer, the Score gets clearer, and the home becomes easier to keep.",
          )}
        </p>
        <Link href={cms(compound, "ctaHref", "/household/housekeeper")} className={s.compoundLink}>
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
