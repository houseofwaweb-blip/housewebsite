import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./howa-v2.module.css";
import { FeatureCarousel } from "./FeatureCarousel";

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

const StepIcon = {
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V5a1 1 0 0 1 1-1h2" />
      <path d="M17 4h2a1 1 0 0 1 1 1v2" />
      <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
      <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22 2.5 2.5 0 0 0 12 19.5v-15A2.5 2.5 0 0 0 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v15a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 14.5 2Z" />
      <path d="M7 8h-.5a2.5 2.5 0 0 0 0 5H7" />
      <path d="M17 8h.5a2.5 2.5 0 0 1 0 5H17" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
};

const STEPS = [
  { key: "scan", name: "Scan", desc: "Capture what matters in seconds.", icon: StepIcon.scan },
  { key: "understand", name: "Understand", desc: "HoWA interprets and learns your home.", icon: StepIcon.brain },
  { key: "organise", name: "Organise", desc: "Everything in its place. Always up to date.", icon: StepIcon.folder },
  { key: "remember", name: "Remember", desc: "Your home's record lives on ahead.", icon: StepIcon.bell },
];

const FEATURES = [
  {
    name: "Home",
    desc: "Every room, surface, fitting and finish — quietly known.",
    image: "/home-v4/howa-feature-home.webp",
  },
  {
    name: "Garden",
    desc: "Plants, beds, schedules — the year mapped to your soil.",
    image: "/home-v4/howa-feature-garden-care.webp",
  },
  {
    name: "Documents",
    desc: "Deeds, warranties, manuals — read, stored, recallable.",
    image: "/home-v4/howa-feature-documents.webp",
  },
  {
    name: "Tasks",
    desc: "Seasonal jobs and small attentions, prompted at the right time.",
    image: "/home-v4/howa-feature-tasks.webp",
  },
  {
    name: "Home Health",
    desc: "A running view of the home's condition — known, not guessed.",
    image: "/home-v4/howa-feature-home-health.webp",
  },
];

const MODES = [
  {
    slug: "assistant",
    numeral: "I.",
    label: "HoWA Assistant",
    name: "The house, alive.",
    features: [
      "Notices what matters",
      "Tracks changes in real time",
      "Surfaces subtle signals",
    ],
    href: "/howa#assistant",
  },
  {
    slug: "housekeeper",
    numeral: "II.",
    label: "HoWA Housekeeper",
    name: "The house, in order.",
    features: [
      "Tasks orchestrated",
      "Services aligned",
      "Nothing slips",
    ],
    href: "/howa#housekeeper",
  },
  {
    slug: "steward",
    numeral: "III.",
    label: "HoWA Steward",
    name: "The house, understood.",
    features: [
      "Predicts risk",
      "Optimises systems",
      "Protects long-term value",
    ],
    href: "/howa/steward",
  },
];

const TRUST = [
  {
    name: "Assigned to the home",
    desc: "Permanently linked to your address, not a device.",
    image: "/home-v4/howa-trust-assigned-to-the-home.webp",
  },
  {
    name: "Learns over time",
    desc: "HoWA gets smarter with every update and upload.",
    image: "/home-v4/howa-trust-learns-over-time.webp",
  },
  {
    name: "Moves with the home",
    desc: "Hands cleanly to the next custodian when the time comes.",
    image: "/home-v4/howa-trust-moves-with-the-home.webp",
  },
  {
    name: "Evidence-backed",
    desc: "Photos, documents, dates — all in one place.",
    image: "/home-v4/howa-trust-evidence-backed.webp",
  },
];

// Small House mark — used inline next to "Covered by House of Willow Alexander"
const HouseMark = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11 12 3l9 8" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export default function HowaV2Page() {
  return (
    <main className={s.page}>
      <div className={s.banner}>Preview · /howa redesign — not yet live</div>

      <div className={s.subbar}>
        <div className={s.subbarBrand}>HoWA</div>
        <nav className={s.subbarNav}>
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#modes">Modes</a>
        </nav>
        <div className={s.subbarRight}>
          <span className={s.coveredBy}>
            <span className={s.coveredMark}>{HouseMark}</span>
            Covered by <em>House of Willow Alexander</em>
          </span>
          <Link href="/howa/coming-soon" className={s.subbarCta}>
            Join waitlist
          </Link>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={s.hero} id="product">
        <div className={s.heroBg} aria-hidden="true" />
        <div className={s.heroOverlay} aria-hidden="true" />
        <div className={s.heroCopy}>
          <h1 className={s.heroTitle}>
            The home <em>&amp;</em> garden
            <br />
            intelligence app.
          </h1>
          <p className={s.heroLede}>
            Track repairs, garden care, documents, reminders and home health
            in one living record.
          </p>
          <div className={s.heroCtas}>
            <Link href="/howa/coming-soon" className={s.heroCtaPrimary}>
              Join waitlist
            </Link>
            <a href="#how" className={s.heroCtaSecondary}>
              See how it works →
            </a>
          </div>
          <p className={s.heroSub}>One address. One record. Total peace of mind.</p>
          <div className={s.heroBadges}>
            <div className={s.heroBadge}>Secure</div>
            <div className={s.heroBadge}>Private</div>
            <div className={s.heroBadge}>Always with you</div>
            <div className={s.heroBadge}>Built for homes</div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className={s.steps} id="how">
        <div className={s.stepsLabel}>How it works</div>
        <div className={s.stepsRow}>
          {STEPS.map((step, i) => (
            <Fragment key={step.key}>
              <div className={s.step}>
                <div className={s.stepIcon}>{step.icon}</div>
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
        <FeatureCarousel features={FEATURES} />
      </section>

      {/* ── Modes ────────────────────────────────────────────────────── */}
      <section className={s.modes} id="modes">
        <header className={s.modesHead}>
          <h2 className={s.modesTitle}>One app. <em>Three modes.</em></h2>
        </header>
        <div className={s.modesGrid}>
          {MODES.map((m) => (
            <Link
              key={m.slug}
              href={m.href}
              className={`${s.modeCard} ${s[m.slug]}`}
            >
              <div className={s.modeBg} aria-hidden="true" />
              <div className={s.modeOverlay}>
                <header className={s.modeTop}>
                  <p className={s.modeMeta}>
                    {m.numeral} {m.label}
                  </p>
                  <h3 className={s.modeTagline}>{m.name}</h3>
                </header>
                <footer className={s.modeFoot}>
                  <ul className={s.modeFeatures}>
                    {m.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <span className={s.modeLearn}>Learn more →</span>
                </footer>
              </div>
            </Link>
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
            <article key={t.name} className={s.trustItem}>
              <div className={s.trustImage}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={600}
                  height={400}
                  sizes="(max-width: 900px) 100vw, (max-width: 1300px) 50vw, 25vw"
                />
              </div>
              <h3 className={s.trustName}>{t.name}</h3>
              <p className={s.trustDesc}>{t.desc}</p>
            </article>
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
          <p className={s.waitlistFootnote}>Limited early access</p>
        </div>
        <div />
      </section>
    </main>
  );
}
