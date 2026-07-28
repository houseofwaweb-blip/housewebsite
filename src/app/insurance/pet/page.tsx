import Image from "next/image";
import Link from "next/link";
import s from "../insurance.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";

/**
 * /insurance/pet — Pet Insurance (REVISIONS v3 §8).
 *
 * A separate journey from Home Insurance, with its own proposition, its own
 * questions and its own FAQs. v3 forbids any undifferentiated page that tries
 * to sell Home and Pet in the same form.
 *
 * Required sections (§8 Pet Insurance page):
 *   1 heading and proposition · 2 animals and cover types supported ·
 *   3 how the introduction works · 4 named provider and regulatory disclosure ·
 *   5 what information is required · 6 Pet Insurance FAQs ·
 *   7 primary CTA "Request a Pet Insurance introduction"
 *
 * COMPLIANCE GATE (v3 §8): all insurance copy and promotions require approval
 * from the authorised insurance partner before launch. Nothing here may imply
 * the House underwrites, arranges, advises on or handles claims.
 */

export const metadata = {
  title: "Pet Insurance, introduced by the House",
  description:
    "Pet insurance introduced by House of Willow Alexander and arranged by an authorised, FCA-regulated partner. Lifetime, time-limited and accident-only cover explained plainly.",
};

/** §8 Pet 2 — animals and cover types supported. */
const ANIMALS = [
  { title: "Dogs", body: "From puppies to older dogs, including breeds that standard policies load heavily or decline outright." },
  { title: "Cats", body: "Indoor and outdoor, single pets and multi-cat households, with third-party liability where it applies." },
  { title: "Older and pre-existing", body: "Animals that other insurers have already turned down, or renewed with exclusions you were not expecting." },
  { title: "Multiple pets", body: "One conversation covering the whole household, rather than three separate forms and three renewal dates." },
];

const COVER_TYPES = [
  {
    title: "Lifetime",
    body: "An annual limit that resets each year, so an ongoing condition stays covered for as long as the policy is renewed. The most expensive, and usually the only sensible choice for a young animal.",
  },
  {
    title: "Maximum benefit",
    body: "A fixed sum per condition with no time limit. Once that sum is used for a condition, that condition stops being covered.",
  },
  {
    title: "Time-limited",
    body: "Cover for each condition for a set period, usually twelve months from the first sign of it. Cheaper, and unsuitable for anything chronic.",
  },
  {
    title: "Accident only",
    body: "Injuries but not illnesses. The lowest premium, and the narrowest cover. Worth understanding properly before choosing it on price.",
  },
];

/** §8 Pet 3 — how the introduction journey works. */
const STEPS = [
  {
    n: "I.",
    title: "Tell us about the animal",
    body: "Species, breed, age and anything already diagnosed. Two minutes, and no obligation.",
  },
  {
    n: "II.",
    title: "A matched introduction",
    body: "We introduce you to the authorised, FCA-regulated partner. From that point you speak directly to them. This is an introduction, not a quotation: the House does not price or advise.",
  },
  {
    n: "III.",
    title: "Renewal date, remembered",
    body: "If you take a policy, and only with your consent, the renewal date is filed in your Home Record in HoWA so it does not sneak up on you a year later.",
  },
];

/** §8 Pet 5 — what information is required. */
const REQUIRED_INFO = [
  "Species, breed and date of birth (or best estimate for a rescue)",
  "Whether the animal is neutered, microchipped and vaccinated",
  "Any conditions already diagnosed or treated, including minor ones",
  "Whether cover has ever been declined, loaded or cancelled",
  "Your postcode, since premiums vary by area",
  "The level of cover you want, if you already know",
];

/** §8 Pet 6 — FAQs specific to Pet Insurance. */
const FAQ = [
  {
    q: "Is House of Willow Alexander an insurance broker?",
    a: "No. The House is an introducer only. We do not underwrite, arrange or advise on insurance, and we do not handle claims. All regulated activity is carried out by the authorised, FCA-regulated partner we introduce you to.",
  },
  {
    q: "Can you cover a pre-existing condition?",
    a: "Sometimes, on specialist terms, and sometimes not at all. It depends on the condition, the animal and the insurer. That is a conversation for the partner, and it is why declaring everything up front matters.",
  },
  {
    q: "What is the difference between lifetime and time-limited cover?",
    a: "Lifetime cover resets its annual limit every year, so a long-term condition stays covered while you keep renewing. Time-limited cover pays for each condition only for a set period, usually twelve months. For a chronic illness the difference is the whole point of the policy.",
  },
  {
    q: "Is there a minimum or maximum age?",
    a: "Insurers set their own limits, and many decline new policies for older animals. The partner will tell you what is actually available for your pet rather than what a comparison table implies.",
  },
  {
    q: "Do I need to be a House services customer?",
    a: "No. Introductions are open to anyone, whether or not you book services from the House.",
  },
  {
    q: "What does the introduction cost?",
    a: "Nothing. There is no charge to you for the introduction.",
  },
];

export default function PetInsurancePage() {
  return (
    <div className={s.page}>
      {/* 1. Heading and proposition (§8 Pet 1) */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>Pet Insurance · Introduced by the House</p>
            <h1 className={s.heroTitle}>
              Cover for the animals{" "}
              <em>who live here too.</em>
            </h1>
            <p className={s.heroLede}>
              Pet insurance is one of the few products where the cheapest policy
              is often the one that pays out least. We introduce you to an
              authorised, FCA-regulated partner who will explain the difference
              between lifetime, time-limited and accident-only cover before you
              choose on price.
            </p>
            <div className={s.heroCtas}>
              <a href="#register" className={s.btnFilled}>
                Request a Pet Insurance introduction
              </a>
              <Link href="/insurance/home" className={s.btnGhost}>
                Looking for Home Insurance?
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
            <p className={s.heroDisclosure}>
              House of Willow Alexander is an introducer only and does not
              provide, arrange or advise on insurance. Cover is arranged and
              provided by an authorised, FCA-regulated insurance partner.
            </p>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/services/subbrands/dog-walking.webp"
            alt="A dog lead, waste-bag holder and travel bowl laid out on a wooden table"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
          />
        </div>
      </section>

      {/* 2. Animals supported (§8 Pet 2) */}
      <section className={s.offers}>
        <header className={s.offersHead}>
          <p className={s.offersEy}>Who this is for</p>
          <h2 className={s.offersTitle}>
            The animals{" "}
            <em>a comparison site struggles with.</em>
          </h2>
        </header>
        <div className={s.offersGrid}>
          {ANIMALS.map((item) => (
            <article key={item.title} className={s.offerCard}>
              <h3 className={s.offerCardTitle}>{item.title}</h3>
              <p className={s.offerCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Cover types supported (§8 Pet 2) */}
      <section className={s.offers} style={{ background: "var(--color-house-white)" }}>
        <header className={s.offersHead}>
          <p className={s.offersEy}>Types of cover</p>
          <h2 className={s.offersTitle}>
            Four kinds of policy,{" "}
            <em>and they are not interchangeable.</em>
          </h2>
        </header>
        <div className={s.offersGrid}>
          {COVER_TYPES.map((item) => (
            <article key={item.title} className={s.offerCard}>
              <h3 className={s.offerCardTitle}>{item.title}</h3>
              <p className={s.offerCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. How the introduction works (§8 Pet 3) */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>How the introduction works</p>
          <h2 className={s.stepsTitle}>
            Three steps,{" "}
            <em>then a real conversation.</em>
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

      {/* 5. What information is required (§8 Pet 5) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">What we will ask</p>
          <h2 className="mb-5 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            Declare everything. <em>Especially the small things.</em>
          </h2>
          <p className="mb-6 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            Most pet insurance disputes come from something that was not
            mentioned at the start. A limp two years ago counts. So does a course
            of tablets nobody wrote down.
          </p>
          <ul className="m-0 grid list-none gap-3 p-0">
            {REQUIRED_INFO.map((row) => (
              <li key={row} className="flex gap-3 font-sans text-[15px] leading-[1.55] text-house-brown">
                <span aria-hidden className="text-house-gold-ink">·</span>
                {row}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[62ch] font-sans text-[14px] leading-[1.6] text-house-stone/85">
            This information is passed to the authorised partner only with your
            consent, and you can withdraw that consent at any time. See our{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2">privacy page</Link>{" "}
            for how your details are handled.
          </p>
        </div>
      </section>

      {/* 6. Pet Insurance FAQs (§8 Pet 6) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Pet Insurance questions</p>
          <h2 className="mb-8 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            The things people ask first.
          </h2>
          <div className="grid gap-0">
            {FAQ.map((f) => (
              <details key={f.q} className="border-b border-house-brown/12 py-5">
                <summary className="cursor-pointer list-none font-display text-[19px] leading-tight text-house-brown">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-[64ch] font-sans text-[15px] leading-[1.65] text-house-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Primary CTA (§8 Pet 7) */}
      <section id="register" className={s.register}>
        <div className={s.registerInner}>
          <p className={s.registerEy}>Pet Insurance</p>
          <h2 className={s.registerTitle}>
            Request an{" "}
            <em>introduction.</em>
          </h2>
          <p className={s.registerLede}>
            Leave your email and we will write when Pet Insurance introductions
            open.
          </p>
          <WaitlistMini
            product="insurance"
            sourcePage="/insurance/pet"
            placeholder="Your email"
            buttonLabel="Request a Pet Insurance introduction"
            successMessage="Thank you. We will write when Pet Insurance introductions open."
          />
        </div>
      </section>

      {/* 8. Named provider and regulatory disclosure (§8 Pet 4) */}
      <section className={s.fca}>
        <p>
          House of Willow Alexander acts as an introducer only. Insurance
          products arranged via Provenance Insurance Brokers, authorised and
          regulated by the FCA. We do not advise on, arrange, or conduct
          regulated insurance activity. Introductions are passed to
          FCA-authorised partners for any subsequent discussion, quotation, or
          contract.{" "}
          See our <Link href="/legal/privacy">privacy page</Link> for how your details are handled.
        </p>
      </section>
    </div>
  );
}
