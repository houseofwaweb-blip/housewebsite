import Image from "next/image";
import Link from "next/link";
import s from "./home-protection.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /insurance/home-protection, Home Protection Review.
 *
 * Section order:
 *   1. Hero, surreal helmet image full-width, copy left
 *   2. Stats strip, what the day delivers
 *   3. What the review covers, three editorial cards
 *   4. How it works, 4-step timeline
 *   5. Waitlist + still-life image
 *   6. Cross-sell, insurance + Living Record
 *   7. Closing tagline
 */

export const metadata = {
  title: "Home Protection. Know the home before the home needs you.",
  description:
    "A one-day in-person review by House-vetted specialists. Condition review, evidence pack, and insurance-ready documentation for your home.",
};

const STAT_COLS = [
  { value: "1", label: "Day on-site" },
  { value: "1 wk", label: "Report turnaround" },
  { value: "17", label: "House standards" },
  { value: "0", label: "Disruption" },
];

const COVERS = [
  {
    title: "Condition review",
    body: "A thorough walk-through of the building: fabric, systems, access, security, damp, drainage. Carried out by House-vetted specialists who understand period homes. This is a House condition review and evidence pack, not a formal RICS survey.",
  },
  {
    title: "Evidence pack",
    body: "Photographs, detailed notes and a prioritised list of works, gathered into a record you can refer back to.",
  },
  {
    title: "Insurance documentation",
    body: "Relevant information from the review can support later insurance conversations by giving the broker a clearer picture of the property.",
  },
];

const STEPS = [
  {
    n: "I.",
    title: "Book",
    body: "Register interest and, when the service opens, the House will arrange a date for the review.",
  },
  {
    n: "II.",
    title: "Assess",
    body: "Our House-vetted specialist visits the property and conducts a full condition review. You don't need to prepare anything.",
  },
  {
    n: "III.",
    title: "Report",
    body: "Your evidence pack and prioritised works list are then returned as a record you can keep and use.",
  },
  {
    n: "IV.",
    title: "Act",
    body: "Where the review flags work, we introduce you to vetted specialists. Where it flags risk, it feeds directly into your insurance conversation.",
  },
];

export default async function HomeProtectionPage() {
  const sections = await getPageSections("protect-home-protection");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const covers = sections.get("covers");
  const steps = sections.get("steps");
  const register = sections.get("register");
  const crossSell = sections.get("cross-sell");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const coverCards = cmsCards(covers, COVERS, (c, base) => ({
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));
  const stepCards = cmsCards(steps, STEPS, (c, base) => ({
    n: pick(c.label, base?.n ?? ""),
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src={cms(hero, "imageUrl", "/home-v4/protect-hero.webp")}
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Protect · Late 2026")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Know the home")}{" "}
              <em>{cms(hero, "headlineEm", "before the home needs you.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "A one-day in-person review by House-vetted specialists. A condition review, an evidence pack, and insurance-ready documentation, yours to keep and ready for whatever comes next.",
              )}
            </p>
            <div className={s.heroCtas}>
              <a href={cms(hero, "ctaHref", "#register")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Register interest")}
              </a>
              <Link href={cms(hero, "cta2Href", "/insurance")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See Protect overview")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p className={s.heroFootnote}>
              {cms(hero, "caption", "Open to all House customers.")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "One day on-site. One clear pack. Years of clarity.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "The first practical act of Home Protection.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. What the review covers */}
      <section className={s.covers}>
        <header className={s.coversHead}>
          <p className={s.coversEy}>{cms(covers, "eyebrow", "What the review covers")}</p>
          <h2 className={s.coversTitle}>
            {cms(covers, "headline", "A practical review of the home,")}{" "}
            <em>{cms(covers, "headlineEm", "documented in one place.", "headline")}</em>
          </h2>
        </header>
        <div className={s.coversGrid}>
          {coverCards.map((item) => (
            <article key={item.title} className={s.coverCard}>
              <h3 className={s.coverCardTitle}>{item.title}</h3>
              <p className={s.coverCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. How it works */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>{cms(steps, "eyebrow", "How it works")}</p>
          <h2 className={s.stepsTitle}>
            {cms(steps, "headline", "Four steps from review to")}{" "}
            <em>{cms(steps, "headlineEm", "a clearer record of the home.", "headline")}</em>
          </h2>
        </header>
        <div className={s.stepsGrid}>
          {stepCards.map((step) => (
            <article key={step.n} className={s.stepCard}>
              <p className={s.stepNumeral}>{step.n}</p>
              <h3 className={s.stepName}>{step.title}</h3>
              <p className={s.stepBody}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Waitlist with still-life */}
      <section id="register" className={s.register}>
        <div className={s.registerImage}>
          <Image
            src={cms(register, "imageUrl", "/home-v4/protect-still-life.webp")}
            alt={cms(
              register,
              "imageAlt",
              "Still life of stewardship: brass padlock, smoke detector, key, and chain on a wooden cabinet",
            )}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.registerCopy}>
          <p className={s.registerEy}>{cms(register, "eyebrow", "Register interest")}</p>
          <h2 className={s.registerTitle}>
            {cms(register, "headline", "Opening in")}{" "}
            <em>{cms(register, "headlineEm", "late 2026.", "headline")}</em>
          </h2>
          <p className={s.registerLede}>
            {cms(
              register,
              "body",
              "Leave your email and we'll write when Home Protection opens. Open to all House customers.",
            )}
          </p>
          <WaitlistMini
            product="protect_review"
            sourcePage="/insurance/home-protection"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when Home Protection opens."
          />
        </div>
      </section>

      {/* 6. Cross-sell */}
      <section className={s.crossSell}>
        <article className={s.crossCard}>
          <p className={s.crossEy}>{cms(crossSell, "eyebrow", "Also from Protect")}</p>
          <h3 className={s.crossTitle}>{cms(crossSell, "headline", "Home Insurance")}</h3>
          <p className={s.crossBody}>
            {cms(
              crossSell,
              "body",
              "Home insurance introduced by the House and arranged through Provenance, with specialist routes available for period, high-value and more complex homes.",
            )}
          </p>
          <Link href={cms(crossSell, "ctaHref", "/insurance")} className={s.crossLink}>
            {cms(crossSell, "ctaLabel", "See Home Insurance")} →
          </Link>
        </article>
        <article className={s.crossCard}>
          <p className={s.crossEy}>{cms(crossSell, "subheadline", "Use the same information")}</p>
          <h3 className={s.crossTitle}>{cms(crossSell, "headlineEm", "A better starting point for insurance", "headline")}</h3>
          <p className={s.crossBody}>
            {cms(
              crossSell,
              "body2",
              "Where relevant, information from your Home Protection review can help inform the later insurance conversation, so useful property details do not need to be gathered again.",
            )}
          </p>
          <Link href={cms(crossSell, "cta2Href", "#register")} className={s.crossLink}>
            {cms(crossSell, "cta2Label", "Register interest")} →
          </Link>
        </article>
      </section>

      {/* 7. Closing tagline */}
      <section className={s.closing}>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "Know the condition before work becomes urgent.", "headline")}</em>{" "}
          {cms(closing, "subheadline", "That is what the review is for.")}
        </p>
      </section>
    </div>
  );
}
