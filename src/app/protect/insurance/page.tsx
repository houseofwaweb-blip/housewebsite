import Image from "next/image";
import Link from "next/link";
import s from "./insurance.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";

/**
 * /protect/insurance — House Approved Insurance.
 *
 * Section order:
 *   1. Hero — policeman + Edwardian townhouse image right, copy left
 *   2. Stats strip — quiet reassurance
 *   3. A thoughtful approach — editorial
 *   4. What the House offers — 4 editorial cards
 *   5. How it works — 3-step timeline
 *   6. Register interest — navy band + waitlist
 *   7. Cross-sell — Home Protection Review + Living Record
 *   8. FCA notice
 */

export const metadata = {
  title: "House Approved Insurance — Carefully protecting the things that matter.",
  description:
    "Insurance introduced by the House of Willow Alexander. Cover that understands period homes, collections, and the things a standard policy misses.",
};

const STAT_COLS = [
  { value: "1", label: "Named underwriter" },
  { value: "FCA", label: "Regulated partner" },
  { value: "0", label: "Comparison sites" },
  { value: "∞", label: "Claims support" },
];

const OFFERS = [
  {
    title: "A named underwriter",
    body: "You speak to someone who understands the home. Not a call-centre queue, not an algorithm. A named specialist matched to your property type and its contents.",
  },
  {
    title: "Period home cover",
    body: "Period features, listed fabric, outbuildings, non-standard construction, heritage constraints. Your policy reflects how the house was built, not what a database guesses.",
  },
  {
    title: "Contents and collections",
    body: "Fine art, antiques, wine, watches, jewellery, libraries. Valued properly, insured individually where it matters, with agreed-value clauses.",
  },
  {
    title: "Claims support via the House",
    body: "If something happens, the House stays with you. We coordinate with your insurer, introduce vetted loss adjusters, and follow up until the matter resolves.",
  },
];

const STEPS = [
  {
    n: "I.",
    title: "Register interest",
    body: "Fill in the form. We'll ask about the property, its contents, and any specific concerns. Takes two minutes.",
  },
  {
    n: "II.",
    title: "Matched introduction",
    body: "We introduce you to a House Approved underwriter suited to your home. You speak directly to a named specialist, not a comparison engine.",
  },
  {
    n: "III.",
    title: "Cover, filed in HoWA",
    body: "Once the policy is in place, the summary, renewal date, and valuation schedule land in your HoWA record. One less thing to track.",
  },
];

export default function ProtectInsurancePage() {
  return (
    <div className={s.page}>
      {/* 1. Hero — image right, copy left */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>Protect · House Approved Insurance</p>
            <h1 className={s.heroTitle}>
              Carefully protecting <em>the things that matter.</em>
            </h1>
            <p className={s.heroLede}>
              Cover that understands period homes, valuable contents, and the
              things a standard high-street policy quietly excludes. Introduced
              by the House, underwritten by FCA-regulated specialists we've
              vetted to the same standard as every partner who carries the
              House Approved seal.
            </p>
            <div className={s.heroCtas}>
              <a href="#register" className={s.btnFilled}>
                Register interest
              </a>
              <Link href="/protect/home-protection" className={s.btnGhost}>
                See Home Protection
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p className={s.heroFootnote}>
              Opening to HoWA+ members first.
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/protect-insurance.png"
            alt="An Edwardian London townhouse with a policeman standing guard at the front door at golden hour"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>Quieter reassurance, when it's needed.</p>
          <p className={s.statsLedeLine2}>Not more paperwork. Not more panic.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. A thoughtful approach */}
      <section className={s.approach}>
        <div className={s.approachInner}>
          <p className={s.approachEy}>A thoughtful approach</p>
          <h2 className={s.approachTitle}>
            Insurance as part of a wider <em>ecosystem of care.</em>
          </h2>
          <p className={s.approachBody}>
            Most insurance is sold in isolation — policies stacked, renewed
            blindly, rarely revisited. The House approach is different.
            Insurance here is designed as part of a connected relationship with
            the home: how it's lived in, maintained, and looked after over time.
          </p>
          <ul className={s.approachList}>
            <li><em>Not more paperwork.</em></li>
            <li><em>Not more panic.</em></li>
            <li><em>Just quieter reassurance, when it's needed.</em></li>
          </ul>
        </div>
      </section>

      {/* 4. What the House offers */}
      <section className={s.offers}>
        <header className={s.offersHead}>
          <p className={s.offersEy}>What the House offers</p>
          <h2 className={s.offersTitle}>
            A conversation, <em>not a comparison site.</em>
          </h2>
        </header>
        <div className={s.offersGrid}>
          {OFFERS.map((item) => (
            <article key={item.title} className={s.offerCard}>
              <h3 className={s.offerCardTitle}>{item.title}</h3>
              <p className={s.offerCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Three steps */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>How it works</p>
          <h2 className={s.stepsTitle}>
            Three steps to <em>proper cover.</em>
          </h2>
        </header>
        <div className={s.stepsGrid}>
          {STEPS.map((step) => (
            <article key={step.n} className={s.stepCard}>
              <p className={s.stepNumeral}>{step.n}</p>
              <h3 className={s.stepName}>{step.title}</h3>
              <p className={s.stepBody}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Register interest — navy band */}
      <section id="register" className={s.register}>
        <div className={s.registerInner}>
          <p className={s.registerEy}>House Approved Insurance</p>
          <h2 className={s.registerTitle}>
            Opening to HoWA+ members <em>first.</em>
          </h2>
          <p className={s.registerLede}>
            Leave your email and we'll write when introductions open. Existing
            HoWA+ members go to the front of the list.
          </p>
          <WaitlistMini
            product="insurance"
            sourcePage="/protect/insurance"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when insurance introductions open."
          />
        </div>
      </section>

      {/* 7. Cross-sell */}
      <section className={s.crossSell}>
        <article className={s.crossCard}>
          <p className={s.crossEy}>Also from Protect</p>
          <h3 className={s.crossTitle}>Home Protection Review</h3>
          <p className={s.crossBody}>
            A one-day in-person review of the property by House-vetted
            specialists. Condition survey, evidence pack, and a prioritised
            works list — all filed to HoWA and ready for the insurance
            conversation.
          </p>
          <Link href="/protect/home-protection" className={s.crossLink}>
            See Home Protection →
          </Link>
        </article>
        <article className={s.crossCard}>
          <p className={s.crossEy}>Connected via HoWA</p>
          <h3 className={s.crossTitle}>The Living Record</h3>
          <p className={s.crossBody}>
            Your Home Protection Review evidence feeds directly into the
            insurance introduction. One conversation, one record, no starting
            from scratch.
          </p>
          <Link href="/howa" className={s.crossLink}>
            See HoWA →
          </Link>
        </article>
      </section>

      {/* 8. FCA notice */}
      <section className={s.fca}>
        <p>
          HoWA acts as an introducer only. Insurance products arranged via
          Provenance Insurance Brokers, authorised and regulated by the FCA.
          We do not advise on, arrange, or conduct regulated insurance
          activity. Introductions are passed to FCA-authorised partners for
          any subsequent discussion, quotation, or contract. See our{" "}
          <Link href="/legal/privacy">privacy page</Link> for how your details
          are handled.
        </p>
      </section>
    </div>
  );
}
