import Link from "next/link";
import s from "./house-credit.module.css";

export const metadata = {
  title: "House Credit — Interest-free finance.",
  description:
    "House Credit — spread the cost of home care, design, and services with interest-free finance from the House.",
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
      "Use House Credit for anything — a kitchen renovation, a year of garden care, or a full Steward plan.",
  },
  {
    title: "No hidden fees",
    description:
      "The price you see is the price you pay. No arrangement fees, no early repayment charges.",
  },
];

export default function HouseCreditPage() {
  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEy}>The House · Finance</p>
          <h1 className={s.heroTitle}>
            House <em>Credit.</em>
          </h1>
          <p className={s.heroLede}>
            Spread the cost of home care. Interest-free finance on services,
            design, and shop purchases — managed through your HoWA account.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className={s.features}>
        <header className={s.featuresHead}>
          <p className={s.featuresEy}>What you get</p>
          <h2 className={s.featuresTitle}>
            Finance with the <em>House standard.</em>
          </h2>
        </header>
        <div className={s.featuresGrid}>
          {FEATURES.map((f) => (
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
          <p className={s.exampleEy}>An example</p>
          <h2 className={s.exampleTitle}>
            A £3,600 kitchen, <em>over twelve months.</em>
          </h2>
          <p className={s.exampleLede}>
            Interest-free. No deposit. Managed through HoWA. No surprises.
          </p>
        </header>
        <div className={s.exampleNumbers}>
          {[
            { v: "£3,600", l: "Total" },
            { v: "12", l: "Months" },
            { v: "£300", l: "Per month" },
          ].map((n) => (
            <div key={n.l} className={s.exampleStat}>
              <span className={s.exampleStatValue}>{n.v}</span>
              <span className={s.exampleStatLabel}>{n.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Coming soon</p>
        <p className={s.closingStatement}>
          <em>House Credit</em> is launching. Register your interest now.
        </p>
        <Link href="/api/howa-bounce?source=house-credit" className={s.btnFilled}>
          Register interest
        </Link>
        <p className={s.closingFineprint}>
          Credit is subject to status. House Credit is provided by a
          FCA-authorised third-party lender. Full terms at application.
        </p>
      </section>
    </div>
  );
}
