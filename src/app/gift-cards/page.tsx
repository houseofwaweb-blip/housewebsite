import Link from "next/link";
import s from "./gift-cards.module.css";

export const metadata = {
  title: "Gift Cards | Give a well-kept home.",
  description:
    "House of HoWA gift cards: give the gift of home care, design, or anything from the House.",
};

const DENOMINATIONS = [
  { value: "£25", description: "A window clean or a garden tidy" },
  { value: "£50", description: "A deep clean or gutter clear" },
  { value: "£100", description: "A full clean or seasonal garden visit" },
  { value: "£250", description: "A month of care, or a design consultation" },
  { value: "Custom", description: "Any amount you choose" },
];

const STEPS = [
  { roman: "I.", title: "Choose an amount", desc: "Pick a set value or enter your own." },
  { roman: "II.", title: "Add a message", desc: "Personal note, delivered with a House-branded card." },
  { roman: "III.", title: "Send by email", desc: "Arrives instantly. Redeemable on anything from the House." },
];

export default function GiftCardsPage() {
  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEy}>The House · Gift Cards</p>
          <h1 className={s.heroTitle}>
            Give the gift of <em>a well-kept home.</em>
          </h1>
          <p className={s.heroLede}>
            House gift cards work across everything: services, the shop, design
            consultations, and HoWA memberships. Delivered by email, redeemed
            online or in person.
          </p>
        </div>
      </section>

      {/* Denominations */}
      <section className={s.denoms}>
        <header className={s.denomsHead}>
          <p className={s.denomsEy}>Denominations</p>
          <h2 className={s.denomsTitle}>
            Five ways <em>to give.</em>
          </h2>
        </header>
        <div className={s.denomsGrid}>
          {DENOMINATIONS.map((d) => (
            <article key={d.value} className={s.denomCard}>
              <p className={s.denomValue}>{d.value}</p>
              <p className={s.denomDesc}>{d.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={s.how}>
        <header className={s.howHead}>
          <p className={s.howEy}>How it works</p>
          <h2 className={s.howTitle}>
            Three steps, <em>start to gifted.</em>
          </h2>
        </header>
        <div className={s.howGrid}>
          {STEPS.map((step) => (
            <article key={step.roman} className={s.howStep}>
              <span className={s.howStepN}>{step.roman}</span>
              <h3 className={s.howStepName}>{step.title}</h3>
              <p className={s.howStepBody}>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Coming soon</p>
        <p className={s.closingStatement}>
          <em>Gift cards</em> are available once the shop is live.
        </p>
        <Link href="/shop" className={s.btnGhost}>
          Browse the shop
          <span aria-hidden="true" className={s.btnArrow}>→</span>
        </Link>
      </section>
    </div>
  );
}
