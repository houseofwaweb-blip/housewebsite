import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./howa-v2.module.css";

/**
 * /howa-v2 — HoWA product landing preview.
 *
 * Mocks up the dedicated HoWA product page per the howa-landing
 * reference (ChatGPT image, May 2026): banner + sub-bar, hero with
 * watercolor house + paired phones, 4-step "How it works" strip,
 * 5-column feature grid, three-modes section, trust strip, dark
 * green footer waitlist band.
 *
 * Noindex'd until approved. Once approved, swap into /howa.
 */

export const metadata = {
  title: "HoWA — preview · House of Willow Alexander",
  description: "The home & garden intelligence app. Preview for approval.",
  robots: { index: false, follow: false },
};

const STEPS = [
  { num: "1", name: "Scan", desc: "Photograph rooms, garden, documents." },
  { num: "2", name: "Understand", desc: "HoWA reads, recognises, indexes." },
  { num: "3", name: "Organise", desc: "Everything filed by room and system." },
  { num: "4", name: "Remember", desc: "A record that lives with the home." },
];

const FEATURES = [
  {
    name: "Home",
    desc: "Every room, surface, fitting and finish — quietly known.",
    examples: ["Rooms & layouts", "Surfaces & finishes", "Fittings & fixtures"],
  },
  {
    name: "Garden",
    desc: "Plants, beds, schedules — the year mapped to your soil.",
    examples: ["Plant inventory", "Care calendar", "Soil & aspect"],
  },
  {
    name: "Documents",
    desc: "Deeds, warranties, manuals — read, stored, recallable.",
    examples: ["Title & deeds", "Warranties", "Operating manuals"],
  },
  {
    name: "Tasks",
    desc: "Seasonal jobs and small attentions, prompted at the right time.",
    examples: ["Seasonal cycles", "One-off jobs", "Reminders"],
  },
  {
    name: "Health",
    desc: "A running view of the home's condition — known, not guessed.",
    examples: ["Condition score", "Trend over time", "Flagged risks"],
  },
];

const MODES = [
  {
    label: "I.",
    name: "Assistant",
    desc: "Always with you. Ask, log, look up — the house at your elbow.",
    house: "/home-v4/assistant-dollhouse.webp",
    phone: "/home-v4/phone-assistant.webp",
  },
  {
    label: "II.",
    name: "Housekeeper",
    desc: "Quietly running things in the background — routines, prompts, care.",
    house: "/home-v4/housekeeper-dollhouse.webp",
    phone: "/home-v4/phone-housekeeper.webp",
  },
  {
    label: "III.",
    name: "Steward",
    desc: "Long-view custodianship. Insurance, value, succession — accounted for.",
    house: "/home-v4/steward-dollhouse.webp",
    phone: "/home-v4/phone-steward.webp",
  },
];

const TRUST = [
  {
    name: "Assigned to the home",
    desc: "The record belongs to the address, not the device.",
  },
  {
    name: "Lives over time",
    desc: "Compounds with every season, repair, and change.",
  },
  {
    name: "Moves with the home",
    desc: "Transfers cleanly to the next custodian when the time comes.",
  },
  {
    name: "Evidence-backed",
    desc: "Photos, documents, dates — nothing assumed.",
  },
];

export default function HowaV2Page() {
  return (
    <main className={s.page}>
      <div className={s.banner}>Preview · /howa redesign — not yet live</div>

      <div className={s.subbar}>
        <div className={s.subbarBrand}>
          Ho<em>WA</em>
        </div>
        <nav className={s.subbarNav}>
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#modes">Modes</a>
        </nav>
        <div className={s.subbarRight}>
          <span>
            Covered by <em>House of Willow Alexander</em>
          </span>
          <Link href="/howa/coming-soon" className={s.subbarCta}>
            Join waitlist
          </Link>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={s.hero} id="product">
        <div className={s.heroCopy}>
          <h1 className={s.heroTitle}>
            The home <em>&amp;</em> garden
            <br />
            intelligence app.
          </h1>
          <p className={s.heroLede}>
            HoWA reads your home, learns its rhythms, and keeps the record
            that follows it through time. Scan once. Understood always.
          </p>
          <div className={s.heroCtas}>
            <Link href="/howa/coming-soon" className={s.heroCtaPrimary}>
              Join waitlist
            </Link>
            <a href="#how" className={s.heroCtaSecondary}>
              See how it works →
            </a>
          </div>
          <p className={s.heroSub}>Coming soon · Private beta opening late 2026.</p>
          <div className={s.heroBadges}>
            <div className={s.heroBadge}>Secure</div>
            <div className={s.heroBadge}>Private</div>
            <div className={s.heroBadge}>Always with you</div>
            <div className={s.heroBadge}>Built for homes</div>
          </div>
        </div>

        <div className={s.heroVisual}>
          <div
            className={s.heroHouse}
            style={{ backgroundImage: "url(/home-v4/house-watercolour.webp)" }}
          />
          <div className={s.heroPhones}>
            <div className={s.heroPhone}>
              <Image
                src="/home-v4/phone-assistant.webp"
                alt="HoWA Assistant"
                width={300}
                height={620}
              />
            </div>
            <div className={`${s.heroPhone} ${s.raised}`}>
              <Image
                src="/home-v4/phone-housekeeper.webp"
                alt="HoWA Housekeeper"
                width={300}
                height={620}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className={s.steps} id="how">
        <div className={s.stepsLabel}>How it works</div>
        <div className={s.stepsRow}>
          {STEPS.map((step, i) => (
            <Fragment key={step.name}>
              <div className={s.step}>
                <div className={s.stepNum}>{step.num}</div>
                <div className={s.stepText}>
                  <div className={s.stepName}>{step.name}</div>
                  <div className={s.stepDesc}>{step.desc}</div>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <span className={s.stepArrow}>→</span>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className={s.features} id="features">
        <h2 className={s.featuresTitle}>
          Everything for your home, <em>in one place.</em>
        </h2>
        <div className={s.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.name} className={s.feature}>
              <div className={s.featureIcon}>✦</div>
              <h3 className={s.featureName}>{f.name}</h3>
              <p className={s.featureDesc}>{f.desc}</p>
              <ul className={s.featureExamples}>
                {f.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Modes ────────────────────────────────────────────────────── */}
      <section className={s.modes} id="modes">
        <h2 className={s.modesTitle}>
          One app. <em>Three modes.</em>
        </h2>
        <div className={s.modesGrid}>
          {MODES.map((m) => (
            <article key={m.name} className={s.mode}>
              <div className={s.modeCopy}>
                <div className={s.modeLabel}>{m.label}</div>
                <h3 className={s.modeName}>{m.name}</h3>
                <p className={s.modeDesc}>{m.desc}</p>
              </div>
              <div className={s.modePhone}>
                <Image src={m.phone} alt={m.name} width={180} height={380} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <section className={s.trust}>
        <h2 className={s.trustTitle}>
          One address. One record. <em>One intelligence layer.</em>
        </h2>
        <div className={s.trustGrid}>
          {TRUST.map((t) => (
            <div key={t.name} className={s.trustItem}>
              <div className={s.trustIcon}>✦</div>
              <div className={s.trustName}>{t.name}</div>
              <div className={s.trustDesc}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Waitlist footer band ─────────────────────────────────────── */}
      <section className={s.waitlist}>
        <Image
          src="/brand/howa/howa-white.svg"
          alt="HoWA"
          width={180}
          height={60}
          className={s.waitlistHouse}
        />
        <div className={s.waitlistCopy}>
          <h2 className={s.waitlistLine}>Step into stewardship.</h2>
          <p className={s.waitlistSub}>
            HoWA is opening in waves. Join the waitlist and we'll bring you in
            when your home's place is ready.
          </p>
          <Link href="/howa/coming-soon" className={s.waitlistCta}>
            Join waitlist
          </Link>
        </div>
        <div />
      </section>
    </main>
  );
}
