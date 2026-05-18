import Image from "next/image";
import Link from "next/link";
import s from "./steward-v1.module.css";
import { TierShowcase } from "./TierShowcase";

/**
 * /howa/steward — HoWA Steward landing.
 *
 * Section order:
 *   1. Hero — navy "blueprint mode", full-width cross-section
 *   2. A home is not static — full-width photo→blueprint composite
 *   3. Three ways to access it — tier showcase on navy
 *   4. One system. In your hands. — phone trio on cream
 *   5. Intelligence band — dark olive
 *   6. Powered by the House — trust lines on cream
 *   7. Step into stewardship — closing CTA on navy
 */

export const metadata = {
  title: "HoWA Steward — Step into stewardship.",
  description:
    "The premium HoWA tier. Understand. Protect. Perform. Architectural-grade intelligence for a home you mean to keep.",
};

const INTELLIGENCE_STATS = [
  { title: "Boiler failure predicted", highlight: "14", subAfter: " days early" },
  { title: "Service booked", subAfter: "automatically" },
  { title: "Cost reduced", highlight: "by 42%" },
  { title: "No disruption", subAfter: "to your home" },
];

const TRUST_LINES = [
  { icon: HomeIcon, text: "Trusted services and specialists" },
  { icon: ShieldIcon, text: "Verified partners and suppliers" },
  { icon: LeafIcon, text: "Seamless execution layer" },
  { icon: AwardIcon, text: "Accountability at every step" },
];

export default function StewardV1PreviewPage() {
  return (
    <div className={`${s.page} ${s.stewardTheme}`}>
      {/* 1. Hero — navy blueprint mode, image full-width across header */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true">
          <Image
            src="/home-v4/steward-hero-blueprint.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The Home Operating System</p>
            <h1 className={s.heroTitle}>
              The Home<br />
              Operating System
            </h1>
            <p className={s.heroSub}>Your home, finally understood.</p>
            <p className={s.heroLede}>
              HoWA observes, learns, and acts — so nothing is missed, delayed,
              or forgotten.
            </p>
            <div className={s.heroCtas}>
              <Link href="/api/howa-bounce" className={s.btnFilled}>
                Enter HoWA
              </Link>
              <Link href="/howa/how-it-works" className={s.btnGhost}>
                See how it works
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A home is not static — full-width composite with copy floating right */}
      <section className={s.notStatic}>
        <div className={s.notStaticImage}>
          <Image
            src="/home-v4/steward-photo-blueprint-annot.png"
            alt="A photograph of a Georgian townhouse dissolving into a glowing blueprint diagram, annotated with Structure, Environment, Energy and Security"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.notStaticScrim} aria-hidden="true" />
        <div className={s.notStaticCopy}>
          <h2 className={s.notStaticTitle}>
            A home is<br />
            <span className={s.notStaticItalic}>not static.</span>
          </h2>
          <p className={s.notStaticSub}>
            <em>It is a system<br />in motion.</em>
          </p>
          <p className={s.notStaticBody}>
            HoWA transforms your home from a place you manage into a system
            that manages itself.
          </p>
        </div>
      </section>

      {/* 3. Three ways to access it (navy theme) */}
      <TierShowcase />

      {/* 4. One system. In your hands. — phone trio on navy */}
      <section className={s.oneSystem}>
        <div className={s.oneSystemInner}>
          <div className={s.oneSystemCopy}>
            <h2>
              One system.<br />
              <em>In your hands.</em>
            </h2>
            <p>
              Designed for clarity. Built for your home.
            </p>
            <div className={s.appStores}>
              <Link href="#open-booking-form" className={s.appStore}>
                <AppleIcon className={s.appStoreIcon} />
                <span className={s.appStoreText}>
                  <small>Coming soon to</small>
                  <strong>App Store</strong>
                </span>
              </Link>
              <Link href="#open-booking-form" className={s.appStore}>
                <GooglePlayIcon className={s.appStoreIcon} />
                <span className={s.appStoreText}>
                  <small>Coming soon to</small>
                  <strong>Google Play</strong>
                </span>
              </Link>
            </div>
          </div>
          <div className={s.phoneRow}>
            <div className={s.phone}>
              <Image src="/home-v4/phone-assistant-full.webp" alt="HoWA Assistant" width={426} height={900} sizes="220px" />
            </div>
            <div className={`${s.phone} ${s.phoneRaised}`}>
              <Image src="/home-v4/phone-housekeeper-full.webp" alt="HoWA Housekeeper" width={426} height={900} sizes="220px" />
            </div>
            <div className={s.phone}>
              <Image src="/home-v4/phone-steward-full.webp" alt="HoWA Steward" width={426} height={900} sizes="220px" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Intelligence band */}
      <section className={s.intelligence}>
        <div className={s.intelligenceCopy}>
          <header className={s.intelligenceHead}>
            <span className={s.intelligenceIcon} aria-hidden="true">
              <CalendarIcon />
            </span>
            <h2 className={s.intelligenceTitle}>
              Intelligence that<br />
              <em>makes a real difference.</em>
            </h2>
          </header>
          <div className={s.intelligenceStats}>
            {INTELLIGENCE_STATS.map((stat, i) => (
              <div key={stat.title} className={s.iStat}>
                <p className={s.iStatTitle}>{stat.title}</p>
                <p className={s.iStatSub}>
                  {stat.highlight ? (
                    <span className={s.iStatHighlight}>{stat.highlight}</span>
                  ) : null}
                  {stat.subAfter}
                </p>
                {i < INTELLIGENCE_STATS.length - 1 ? (
                  <span aria-hidden="true" className={s.iStatArrow}>→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className={s.intelligenceImage}>
          <Image
            src="/home-v4/plus-intelligence.png"
            alt="A warm dusk-lit interior — what intelligent stewardship protects"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 6. Powered by the House */}
      <section className={s.poweredBand}>
        <p className={s.poweredEy}>Powered by the House of Willow Alexander.</p>
        <div className={s.poweredLines}>
          {TRUST_LINES.map((line) => {
            const Icon = line.icon;
            return (
              <div key={line.text} className={s.poweredLine}>
                <span className={s.poweredLineIcon}><Icon /></span>
                <span className={s.poweredLineText}>{line.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Step into stewardship — closing */}
      <section className={s.stewardClose}>
        <div className={s.stewardCloseBg} aria-hidden="true">
          <Image
            src="/home-v4/steward-blueprint-only.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className={s.stewardCloseInner}>
          <h2 className={s.stewardCloseTitle}>Step into stewardship.</h2>
          <p className={s.stewardCloseSub}>Understand. Protect. Perform.</p>
          <Link href="/api/howa-bounce" className={s.closingBtnFilled}>
            Enter HoWA
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ---------------- icons ---------------- */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M3 11 L12 4 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" />
      <path d="M9 21 V13 H15 V21" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M12 3 L20 6 V12 C20 16, 16 20, 12 22 C8 20, 4 16, 4 12 V6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M5 21 C 5 12, 12 5, 21 5 C 21 14, 14 21, 5 21 Z" />
      <path d="M5 21 L 14 12" />
    </svg>
  );
}
function AwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14 L7 22 L12 19 L17 22 L15 14" />
    </svg>
  );
}
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="22" rx="1" />
      <path d="M4 12 L28 12" />
      <path d="M10 3 L10 9" />
      <path d="M22 3 L22 9" />
    </svg>
  );
}
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.5 2.5 L14.5 12 L3.5 21.5 a1 1 0 0 1 -.5 -.87 V3.37 a1 1 0 0 1 .5 -.87 z" />
      <path d="M16.3 9.7 L19.8 11.5 a1 1 0 0 1 0 1.7 L16.3 14.3 L13.5 12 z" />
    </svg>
  );
}
