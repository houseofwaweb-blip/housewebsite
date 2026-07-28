import Link from "next/link";
import s from "./house-credit.module.css";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

export const metadata = {
  title: "House Credit | Interest-free finance.",
  description:
    "House Credit: spread the cost of home care, design, and services with interest-free finance from the House.",
};

const FEATURES = [
  {
    title: "Spread the cost",
    description:
      "Pay for services, design projects, or shop purchases over 3, 6, or 12 months. Interest-free on qualifying orders.",
  },
  {
    title: "Simple application",
    description:
      "Apply at checkout. Soft credit check, instant decision, no paperwork. Managed through your HoWA account.",
  },
  {
    title: "Works across the House",
    description:
      "Use House Credit for anything: a kitchen renovation, a year of garden care, or a full recurring care plan.",
  },
  {
    title: "No hidden fees",
    description:
      "The price you see is the price you pay. No arrangement fees, no early repayment charges.",
  },
];

const EXAMPLE_NUMBERS = [
  { v: "£3,600", l: "Total" },
  { v: "12", l: "Months" },
  { v: "£300", l: "Per month" },
];

export default async function HouseCreditPage() {
  const sections = await getPageSections("house-credit");
  const hero = sections.get("hero");
  const features = sections.get("features");
  const example = sections.get("example");
  const closing = sections.get("closing");

  const featureCards = cmsCards(features, FEATURES, (c, base) => ({
    title: pick(c.title, base?.title ?? ""),
    description: pick(c.body, base?.description ?? ""),
  }));
  const exampleStats = cmsCards(example, EXAMPLE_NUMBERS, (c, base) => ({
    v: pick(c.value ?? c.label, base?.v ?? ""),
    l: pick(c.title ?? c.body, base?.l ?? ""),
  }));

  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEy}>{cms(hero, "eyebrow", "The House · Finance")}</p>
          <h1 className={s.heroTitle}>
            {cms(hero, "headline", "House")}{" "}
            <em>{cms(hero, "headlineEm", "Credit.", "headline")}</em>
          </h1>
          <p className={s.heroLede}>
            {cms(
              hero,
              "body",
              "Spread the cost of home care. Interest-free finance on services, design, and shop purchases, managed through your HoWA account.",
            )}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={s.features}>
        <header className={s.featuresHead}>
          <p className={s.featuresEy}>{cms(features, "eyebrow", "What you get")}</p>
          <h2 className={s.featuresTitle}>
            {cms(features, "headline", "Finance with the")}{" "}
            <em>{cms(features, "headlineEm", "House standard.", "headline")}</em>
          </h2>
        </header>
        <div className={s.featuresGrid}>
          {featureCards.map((f) => (
            <article key={f.title} className={s.featureCard}>
              <h3 className={s.featureName}>{f.title}</h3>
              <p className={s.featureDesc}>{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Example */}
      <section className={s.example}>
        <header className={s.exampleHead}>
          <p className={s.exampleEy}>{cms(example, "eyebrow", "An example")}</p>
          <h2 className={s.exampleTitle}>
            {cms(example, "headline", "A £3,600 kitchen,")}{" "}
            <em>{cms(example, "headlineEm", "over twelve months.", "headline")}</em>
          </h2>
          <p className={s.exampleLede}>
            {cms(
              example,
              "body",
              "Interest-free. No deposit. Managed through HoWA. No surprises.",
            )}
          </p>
        </header>
        <div className={s.exampleNumbers}>
          {exampleStats.map((n) => (
            <div key={n.l} className={s.exampleStat}>
              <span className={s.exampleStatValue}>{n.v}</span>
              <span className={s.exampleStatLabel}>{n.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Coming soon")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "House Credit", "headline")}</em>{" "}
          {cms(closing, "subheadline", "is launching. Register your interest now.")}
        </p>
        <Link href={cms(closing, "ctaHref", "/api/howa-bounce?source=house-credit")} className={s.btnFilled}>
          {cms(closing, "ctaLabel", "Register interest")}
        </Link>
        <p className={s.closingFineprint}>
          {cms(
            closing,
            "caption",
            "Credit is subject to status. House Credit is provided by a FCA-authorised third-party lender. Full terms at application.",
          )}
        </p>
      </section>
    </div>
  );
}
