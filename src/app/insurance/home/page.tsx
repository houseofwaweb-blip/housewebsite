import Image from "next/image";
import Link from "next/link";
import s from "../insurance.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /insurance/home — Home Insurance (REVISIONS v3 §8).
 *
 * v3 splits insurance into a hub plus two dedicated journeys, because Home and
 * Pet are different products with different questions. This page carries the
 * eight required Home Insurance sections:
 *
 *   1 heading and proposition · 2 who the cover is for · 3 types of need
 *   supported · 4 how the introduction works · 5 named provider and regulatory
 *   disclosure · 6 what information passes, with consent · 7 Home Insurance
 *   FAQs · 8 primary CTA "Request a Home Insurance introduction"
 *
 * COMPLIANCE GATE (v3 §8, unchanged from v2 §11): all insurance copy and
 * promotions require approval from the authorised insurance partner BEFORE
 * launch. Nothing here may imply the House underwrites, arranges, advises on
 * or handles claims, and nothing may suggest HoWA provides regulated advice.
 * "House Approved Insurance" is a forbidden phrase (§11 do-not-use).
 */

export const metadata = {
  title: "Home Insurance, introduced by the House",
  description:
    "Specialist home insurance, introduced by House of Willow Alexander and arranged by an authorised, FCA-regulated partner. Cover that understands period homes, collections and the things a standard policy misses.",
};

/** §8 required section 2 — who the cover is intended for. */
const FOR_WHOM = [
  { title: "Period and listed homes", body: "Georgian, Victorian and Edwardian houses, listed fabric, heritage constraints and the repair obligations that come with them." },
  { title: "Non-standard construction", body: "Thatch, timber frame, stone, flat roofs, converted buildings and anything a postcode database quietly declines." },
  { title: "Households with real contents", body: "Fine art, antiques, wine, watches, jewellery and libraries that need valuing properly rather than lumping into a single sum." },
  { title: "Homes that are worked on", body: "Renovation, extension, unoccupied periods and let rooms, where the cover has to follow what is actually happening." },
];

/** §8 required section 3 — types of home or contents needs supported. */
const NEEDS = [
  "Buildings cover for the fabric, including outbuildings and boundary structures",
  "Contents cover, with agreed-value clauses where an item warrants one",
  "High-value single items, specified and scheduled",
  "Accidental damage, escape of water and subsidence considerations",
  "Alternative accommodation if the home becomes uninhabitable",
  "Cover during renovation, extension or an unoccupied period",
];

const STAT_COLS = [
  { value: "1", label: "Named specialist" },
  { value: "FCA", label: "Regulated partner" },
  { value: "0", label: "Comparison sites" },
  { value: "0", label: "Cold sales calls" },
];

const OFFERS = [
  {
    title: "A named specialist",
    body: "You speak to someone who understands the home. Not a call-centre queue, not an algorithm. A named specialist from the authorised partner, matched to your property type and its contents.",
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
    title: "Regulated advice and claims",
    body: "Advice, underwriting and claims are handled by the authorised, FCA-regulated partner. The House introduces you and, with your consent, keeps the policy summary and renewal date in your Home Record in HoWA.",
  },
];

/** §8 required section 4 — how the introduction journey works. */
const STEPS = [
  {
    n: "I.",
    title: "Register your interest",
    body: "Tell us about the property, its contents and anything you already know is unusual about it. Two minutes, and no obligation.",
  },
  {
    n: "II.",
    title: "A matched introduction",
    body: "We introduce you to the authorised, FCA-regulated partner suited to your home. From that point you speak directly to a named specialist. This is an introduction, not a quotation: the House does not price or advise.",
  },
  {
    n: "III.",
    title: "Cover, filed in your Home Record",
    body: "If you take a policy, and only with your consent, the summary and renewal date are filed in your Home Record in HoWA so the date is not lost between years.",
  },
];

/** §8 required section 7 — FAQs specific to Home Insurance. */
const FAQ = [
  {
    q: "Is House of Willow Alexander an insurance broker?",
    a: "No. The House is an introducer only. We do not underwrite, arrange or advise on insurance, and we do not handle claims. All regulated activity is carried out by the authorised, FCA-regulated partner we introduce you to.",
  },
  {
    q: "Will I get a quote from the House?",
    a: "No. The House makes an introduction. Any quotation comes from the authorised partner after they have spoken to you and gathered what they need.",
  },
  {
    q: "What does it cost to be introduced?",
    a: "Nothing. There is no charge to you for the introduction.",
  },
  {
    q: "Do I have to be a House services customer?",
    a: "No. Introductions are open to anyone, whether or not you book services from the House.",
  },
  {
    q: "What happens to the information I give you?",
    a: "It is used to make the introduction, and it is passed to the authorised partner only with your consent. Nothing about your home is shared without you agreeing to it. See our privacy page for the detail.",
  },
  {
    q: "Does my Home Record in HoWA affect my premium?",
    a: "Not by itself. HoWA is where the House keeps a record of work done on your home. If you choose to share maintenance evidence with the partner it may help the conversation, but HoWA does not price policies and does not provide regulated advice.",
  },
];

export default async function HomeInsurancePage() {
  const sections = await getPageSections("protect-insurance");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const approach = sections.get("approach");
  const offers = sections.get("offers");
  const steps = sections.get("steps");
  const register = sections.get("register");
  const fca = sections.get("fca");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const offerCards = cmsCards(offers, OFFERS, (c, base) => ({
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
      {/* 1. Heading and proposition (§8.1) */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>Home Insurance · Introduced by the House</p>
            <h1 className={s.heroTitle}>
              Home insurance for houses{" "}
              <em>a database cannot read.</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "Cover that understands period homes, valuable contents, and the things a standard high-street policy quietly excludes. Introduced by the House and arranged by an authorised, FCA-regulated insurance partner.",
              )}
            </p>
            <div className={s.heroCtas}>
              <a href="#register" className={s.btnFilled}>
                Request a Home Insurance introduction
              </a>
              <Link href="/insurance/pet" className={s.btnGhost}>
                Looking for Pet Insurance?
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
            src="/home-v4/protect-insurance.webp"
            alt="An Edwardian London townhouse at golden hour"
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
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "Quieter reassurance, when it's needed.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Not more paperwork. Not more panic.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Who the cover is intended for (§8.2) */}
      <section className={s.offers}>
        <header className={s.offersHead}>
          <p className={s.offersEy}>Who this is for</p>
          <h2 className={s.offersTitle}>
            Homes that need{" "}
            <em>a person, not a postcode.</em>
          </h2>
        </header>
        <div className={s.offersGrid}>
          {FOR_WHOM.map((item) => (
            <article key={item.title} className={s.offerCard}>
              <h3 className={s.offerCardTitle}>{item.title}</h3>
              <p className={s.offerCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Types of home or contents needs supported (§8.3) */}
      <section className={s.approach}>
        <div className={s.approachInner}>
          <p className={s.approachEy}>What can be covered</p>
          <h2 className={s.approachTitle}>
            The needs the partner{" "}
            <em>can work with.</em>
          </h2>
          <p className={s.approachBody}>
            {cms(
              approach,
              "body",
              "Most insurance is sold in isolation: policies stacked, renewed blindly, rarely revisited. The House approach is different. Insurance here is designed as part of a connected relationship with the home: how it is lived in, maintained, and looked after over time.",
            )}
          </p>
          <ul className={s.approachList}>
            {NEEDS.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. What the House offers */}
      <section className={s.offers}>
        <header className={s.offersHead}>
          <p className={s.offersEy}>{cms(offers, "eyebrow", "What the House offers")}</p>
          <h2 className={s.offersTitle}>
            {cms(offers, "headline", "A conversation,")}{" "}
            <em>{cms(offers, "headlineEm", "not a comparison site.", "headline")}</em>
          </h2>
        </header>
        <div className={s.offersGrid}>
          {offerCards.map((item) => (
            <article key={item.title} className={s.offerCard}>
              <h3 className={s.offerCardTitle}>{item.title}</h3>
              <p className={s.offerCardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. How the introduction journey works (§8.4) */}
      <section className={s.steps}>
        <header className={s.stepsHead}>
          <p className={s.stepsEy}>How the introduction works</p>
          <h2 className={s.stepsTitle}>
            Three steps to{" "}
            <em>proper cover.</em>
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

      {/* 7. What information passes, with consent (§8.6) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Your information</p>
          <h2 className="mb-5 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            What we pass on, <em>and only with your consent.</em>
          </h2>
          <p className="mb-6 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            An introduction only works if the partner knows enough to be useful.
            Here is exactly what may pass from the House, or from your Home
            Record in HoWA, and it passes only when you have said yes.
          </p>
          <ul className="m-0 grid list-none gap-3 p-0">
            {[
              "Your name, contact details and the property address",
              "The property type, age and construction, where you have told us",
              "A summary of work the House has carried out on the home",
              "Maintenance evidence from your Home Record, if you choose to share it",
              "Anything you have specifically asked us to mention",
            ].map((row) => (
              <li key={row} className="flex gap-3 font-sans text-[15px] leading-[1.55] text-house-brown">
                <span aria-hidden className="text-house-gold-ink">·</span>
                {row}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[62ch] font-sans text-[14px] leading-[1.6] text-house-stone/85">
            Nothing is shared without your agreement, and you can withdraw
            consent at any time. HoWA stores and shares this information at your
            instruction; it does not provide regulated advice, underwrite cover
            or handle claims. See our{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2">privacy page</Link>{" "}
            for how your details are handled.
          </p>
        </div>
      </section>

      {/* 8. Home Insurance FAQs (§8.7) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Home Insurance questions</p>
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

      {/* 9. Primary CTA (§8.8) */}
      <section id="register" className={s.register}>
        <div className={s.registerInner}>
          <p className={s.registerEy}>Home Insurance</p>
          <h2 className={s.registerTitle}>
            Request an{" "}
            <em>introduction.</em>
          </h2>
          <p className={s.registerLede}>
            {cms(
              register,
              "body",
              "Leave your email and we will write when introductions open. Open to all House customers.",
            )}
          </p>
          <WaitlistMini
            product="insurance"
            sourcePage="/insurance/home"
            placeholder="Your email"
            buttonLabel="Request a Home Insurance introduction"
            successMessage="Thank you. We will write when Home Insurance introductions open."
          />
        </div>
      </section>

      {/* 10. Named provider and regulatory disclosure (§8.5) */}
      <section className={s.fca}>
        <p>
          {cms(
            fca,
            "body",
            "House of Willow Alexander acts as an introducer only. Insurance products arranged via Provenance Insurance Brokers, authorised and regulated by the FCA. We do not advise on, arrange, or conduct regulated insurance activity. Introductions are passed to FCA-authorised partners for any subsequent discussion, quotation, or contract.",
          )}{" "}
          See our <Link href="/legal/privacy">privacy page</Link> for how your details are handled.
        </p>
      </section>
    </div>
  );
}
