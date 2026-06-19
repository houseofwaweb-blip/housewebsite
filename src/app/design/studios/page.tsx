import Image from "next/image";
import Link from "next/link";
import s from "./studios.module.css";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /design/studios — lander framework.
 *
 * Section order:
 *   1. Hero — copy left, 2x2 studio mosaic right
 *   2. Stats strip
 *   3. The collective — four studios as editorial cards with image
 *   4. Selection — three tests, House Approved meaning
 *   5. How to commission — 4 step process
 *   6. Closing CTA
 */

export const metadata = {
  title: "The Studios: Four, properly chosen.",
  description:
    "The studios and designers the House works with. How we select, what House Approved means in design, and how to commission a project.",
};

const STAT_COLS = [
  { value: "4", label: "Launch studios" },
  { value: "3", label: "Annual tests" },
  { value: "1:1", label: "Founder relationship" },
  { value: "0", label: "Faceless agencies" },
];

const STUDIOS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "Interiors studio",
    location: "London & South East",
    blurb:
      "Considered schemes, quiet palettes, careful detailing. Listed homes, period flats and contemporary pieds-à-terre.",
    signatures: ["Listed-property specialist", "Period detailing", "Quiet colour"],
    image: "/design/interiors/project-tunbridge-1.webp",
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "Interior designer",
    location: "London & Cotswolds",
    blurb:
      "Layered rooms with confident colour, antiques properly used, and a deep love of textile and pattern.",
    signatures: ["Confident colour", "Antiques placement", "Textile-led"],
    image: "/design/interiors/project-bedroom.webp",
  },
  {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    type: "Garden design",
    location: "UK-wide",
    blurb:
      "Planting schemes and landscapes rooted in the garden's existing character. Ecological, seasonal, edible.",
    signatures: ["Planting-led", "Ecological", "Heritage gardens"],
    image: "/design/gardens/hero.jpg",
  },
  {
    slug: "house-ai",
    name: "House AI",
    type: "Specialist partner",
    location: "UK-wide",
    blurb:
      "Automation, lighting schemes and quiet technology that disappears into the architecture rather than dominating it.",
    signatures: ["Lighting design", "Automation", "Quiet technology"],
    image: "/home-v4/design-portrait.webp",
  },
];

const SELECTION_TESTS = [
  {
    numeral: "I",
    title: "Living-home test",
    body: "Their work survives the kind of use a real family puts a home through. Not a show home. A lived-in one, with dogs, children, dinner parties, weekends.",
  },
  {
    numeral: "II",
    title: "Person test",
    body: "We have met them, visited their studio, and would put a friend in their hands. Every studio carries individual responsibility, not a faceless agency front.",
  },
  {
    numeral: "III",
    title: "Care test",
    body: "Every project comes with care notes: what was specified, where it came from, how to look after it, who to call when something needs attention. The record stays with the home.",
  },
];

const COMMISSION_STEPS = [
  {
    n: "01.",
    name: "Begin with a conversation",
    body: "The HoWA Assistant asks the right questions to understand your home, your priorities, and what feels right. About two minutes.",
  },
  {
    n: "02.",
    name: "Matched, not assigned",
    body: "We propose two or three studios from the collective who fit the project. You pick. The Assistant creates the design brief on your home record.",
  },
  {
    n: "03.",
    name: "Commission",
    body: "Project lives in HoWA throughout: drawings, mood boards, decisions, samples, costs, supplier records. You stay in the loop without managing it.",
  },
  {
    n: "04.",
    name: "Looked after",
    body: "When the project completes, every choice stays in the record. So in five years' time when a sofa needs reupholstering, we know the fabric, who supplied it, and who can remake it.",
  },
];

export default async function DesignStudiosPage() {
  const sections = await getPageSections("design-studios");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const studios = sections.get("studios");
  const tests = sections.get("tests");
  const commission = sections.get("commission");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const testCards = cmsCards(tests, SELECTION_TESTS, (c, base) => ({
    numeral: pick(c.label, base?.numeral ?? ""),
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));
  const stepCards = cmsCards(commission, COMMISSION_STEPS, (c, base) => ({
    n: pick(c.label, base?.n ?? ""),
    name: pick(c.title, base?.name ?? ""),
    body: pick(c.body, base?.body ?? ""),
  }));

  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Design · The Studios")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "A small collective,")}{" "}
              <em>{cms(hero, "headlineEm", "properly chosen.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Every studio working under the House Approved seal has been visited, interviewed, and put in front of a real project. The collective starts small on purpose. We would rather work with four studios we trust than forty we don't.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "#studios")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Meet the studios")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/the-house/standards")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "Read the standards")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroMosaic}>
          {STUDIOS.map((studio) => (
            <div key={studio.slug} className={s.heroMosaicCell}>
              <Image
                src={studio.image}
                alt={studio.name}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Vetted. Visited. Reviewed annually.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "The collective grows only when the right person turns up.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Studios — editorial cards */}
      <section id="studios" className={s.studios}>
        <header className={s.studiosHead}>
          <p className={s.studiosEy}>{cms(studios, "eyebrow", "The collective at launch")}</p>
          <h2 className={s.studiosTitle}>
            {cms(studios, "headline", "Four studios.")}{" "}
            <em>{cms(studios, "headlineEm", "Four ways to begin.", "headline")}</em>
          </h2>
          <p className={s.studiosLede}>
            {cms(
              studios,
              "body",
              "Each carries the House Approved seal under the same three tests, and stays in the collective only as long as those tests hold.",
            )}
          </p>
        </header>
        <div className={s.studiosGrid}>
          {STUDIOS.map((studio) => (
            <article key={studio.slug} className={s.studioCard}>
              <div className={s.studioImage}>
                <Image
                  src={studio.image}
                  alt={studio.name}
                  width={1024}
                  height={768}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.studioBody}>
                <p className={s.studioType}>
                  {studio.type} · {studio.location}
                </p>
                <h3 className={s.studioName}>{studio.name}</h3>
                <p className={s.studioBlurb}>{studio.blurb}</p>
                <ul className={s.studioSignatures}>
                  {studio.signatures.map((sig) => (
                    <li key={sig}>{sig}</li>
                  ))}
                </ul>
                <Link
                  href={`/partners/${studio.slug}`}
                  className={s.studioCta}
                >
                  See the work →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Selection tests */}
      <section className={s.tests}>
        <header className={s.testsHead}>
          <p className={s.testsEy}>{cms(tests, "eyebrow", "What House Approved means in design")}</p>
          <h2 className={s.testsTitle}>
            {cms(tests, "headline", "Three tests,")}{" "}
            <em>{cms(tests, "headlineEm", "every time.", "headline")}</em>
          </h2>
          <p className={s.testsLede}>
            {cms(
              tests,
              "body",
              "The seal isn't bestowed once and forgotten. Every studio is reviewed annually against the same three tests. If any test fails for two consecutive cycles, the studio leaves the collective.",
            )}
          </p>
        </header>
        <div className={s.testsGrid}>
          {testCards.map((t) => (
            <article key={t.title} className={s.testCard}>
              <p className={s.testNumeral}>Test {t.numeral}.</p>
              <h3 className={s.testName}>{t.title}</h3>
              <p className={s.testBody}>{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. How to commission */}
      <section className={s.commission}>
        <header className={s.commissionHead}>
          <p className={s.commissionEy}>{cms(commission, "eyebrow", "How to commission")}</p>
          <h2 className={s.commissionTitle}>
            {cms(commission, "headline", "From a brief to a")}{" "}
            <em>{cms(commission, "headlineEm", "finished room.", "headline")}</em>
          </h2>
          <p className={s.commissionLede}>
            {cms(
              commission,
              "body",
              "You don't pick a studio cold. The Assistant learns enough to put two or three in front of you that fit, and the design brief lives on your home record from day one.",
            )}
          </p>
        </header>
        <ol className={s.commissionList}>
          {stepCards.map((step) => (
            <li key={step.n} className={s.commissionStep}>
              <span className={s.commissionStepN}>{step.n}</span>
              <div className={s.commissionStepBody}>
                <h3 className={s.commissionStepName}>{step.name}</h3>
                <p className={s.commissionStepCopy}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Ready when you are")}</p>
        <p className={s.closingStatement}>
          {cms(closing, "headline", "Begin with a")}{" "}
          <em>{cms(closing, "headlineEm", "conversation.", "headline")}</em>
        </p>
        <p className={s.closingLede}>
          {cms(
            closing,
            "body",
            "The Assistant takes about two minutes. The studios match to the brief. You only meet the ones we think fit.",
          )}
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/api/howa-bounce?source=design-studios")} className={s.btnFilled}>
            {cms(closing, "ctaLabel", "Coming soon")}
          </Link>
          <Link href={cms(closing, "cta2Href", "/design")} className={s.btnGhost}>
            {cms(closing, "cta2Label", "Back to Design")}
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
