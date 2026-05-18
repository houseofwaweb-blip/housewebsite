import Image from "next/image";
import Link from "next/link";
import s from "./howa-v1.module.css";
import { TierShowcase } from "./TierShowcase";
import { FaqList } from "@/components/marketing/FaqList";

/**
 * /howa — HoWA landing page.
 *
 * Section order:
 *   1. Hero — copy + Georgian house illustration
 *   2. Stats strip
 *   3. One system. Three ways to access it. — tier + phone showcase
 *   4. Intelligence band
 *   5. Pillars
 *   6. Powered by House of Willow Alexander — trust + quote
 *   7. FAQ accordion
 *   8. Closing CTA band — Step into stewardship
 */

export const metadata = {
  title: "HoWA — Your home, finally understood.",
  description:
    "The Home Operating System. HoWA observes, learns and acts — so nothing is missed, delayed or forgotten.",
};

const STAT_COLS = [
  { value: "91%", label: "House Health Optimal" },
  { value: "12", label: "Tasks Completed This Week" },
  { value: "08", label: "Systems Monitored" },
  { value: "0", label: "Issues Detected" },
];

const INTELLIGENCE_STATS = [
  { title: "Boiler failure predicted", highlight: "14", subAfter: " days early" },
  { title: "Service booked", subAfter: "automatically" },
  { title: "Cost reduced", highlight: "by 42%" },
  { title: "No disruption", subAfter: "to your home" },
];

const PILLARS = [
  {
    label: "Services",
    title: "Expert care for every aspect of home.",
    image: "/home-v4/pillar-1.webp",
    href: "/services",
    cta: "Explore services",
  },
  {
    label: "Shop",
    title: "Curated essentials for home and hearth.",
    image: "/home-v4/pillar-2.webp",
    href: "/shop",
    cta: "Visit the shop",
  },
  {
    label: "The Hearth",
    title: "Stories, guidance, and timeless inspiration.",
    image: "/home-v4/pillar-3.webp",
    href: "/hearth",
    cta: "Read journal",
  },
  {
    label: "About the House",
    title: "Our heritage. Our promise.",
    image: "/home-v4/pillar-4.webp",
    href: "/the-house",
    cta: "Learn more",
  },
];

const TRUST_LINES = [
  { icon: HomeIcon, text: "Trusted services and specialists" },
  { icon: ShieldIcon, text: "Verified partners and suppliers" },
  { icon: LeafIcon, text: "Seamless recreation layer" },
  { icon: AwardIcon, text: "Accountability at every step" },
];

const FAQS = [
  {
    q: "Can I cancel HoWA+ anytime?",
    a: "Yes. There's no minimum term. Cancel from your account dashboard and your record stays accessible in read-only mode for 12 months.",
  },
  {
    q: "How long does setup take?",
    a: "About fifteen minutes. We ask for your address, key system dates (boiler service, EICR, gas safety), and a few photos. HoWA does the rest.",
  },
  {
    q: "What if my home doesn't fit a category?",
    a: "We've built HoWA to flex. Leasehold flats, listed cottages, mews houses — all welcome. Your concierge tailors the standard to your property.",
  },
  {
    q: "Where does my data live?",
    a: "In the UK, encrypted at rest, owned by you. We don't sell, share, or train models on your home record.",
  },
  {
    q: "Do I have to use the booked services?",
    a: "Never. HoWA will surface what needs doing and recommend trusted partners — but you stay in control of who comes to your home.",
  },
  {
    q: "What happens if I move?",
    a: "Your record moves with you. You can also hand it to the new owner as part of the sale — adding £18,000 of average value in our pilot.",
  },
];

export default function HoWAV1PreviewPage() {
  return (
    <div className={s.page}>
      {/* 1. Hero — copy left + annotated Georgian on right */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>The Home Operating System</p>
            <h1 className={s.heroTitle}>
              Your home,<br />
              <em>finally understood.</em>
            </h1>
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

        <div className={s.heroVisual}>
          <div className={s.heroVisualFrame}>
            <Image
              src="/home-v4/howa-lander-hero-v4.png"
              alt="A pink Georgian townhouse with its left half rendered as a hand-drawn elevation — HoWA revealing the structure beneath the home"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
              style={{ objectFit: "contain", objectPosition: "right center" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>It remembers. It signals. It cares.</p>
          <p className={s.statsLedeLine2}>Stewardship starts with listening.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Tier showcase — dollhouse + phone per tier */}
      <TierShowcase />

      {/* 4. Intelligence band */}
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
            src="/home-v4/pillar-1.webp"
            alt="A warm parlour interior, marble fireplace and flowers"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 5. Pillars */}
      <section className={s.pillars}>
        <div className={s.pillarsGrid}>
          {PILLARS.map((p) => (
            <Link key={p.label} href={p.href} className={s.pillarCard}>
              <div className={s.pillarImage}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={780}
                  height={975}
                  sizes="(min-width: 1024px) 24vw, 90vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className={s.pillarBody}>
                <p className={s.pillarLabel}>{p.label}</p>
                <h3 className={s.pillarTitle}>{p.title}</h3>
                <span className={s.pillarCta}>{p.cta} →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 6. Powered by + customer quote */}
        <div className={s.poweredBy}>
          <p className={s.poweredByEy}>Every service. Every standard.</p>
          <h2 className={s.poweredByTitle}>
            Powered by the House of Willow Alexander.
          </h2>
          <div className={s.pillarsBelow}>
            {TRUST_LINES.map((line) => {
              const Icon = line.icon;
              return (
                <div key={line.text} className={s.pillarLine}>
                  <span className={s.pillarLineIcon}>
                    <Icon />
                  </span>
                  <span className={s.pillarLineText}>{line.text}</span>
                </div>
              );
            })}
          </div>
          <figure className={s.quote}>
            <blockquote>
              I just know my home better than anyone, and that gives me real
              peace of mind.
            </blockquote>
            <figcaption>— A. Porter, London</figcaption>
          </figure>
        </div>
      </section>

      {/* 7. FAQ — Q&A on the left, illustrated still life anchored right */}
      <section className={s.faqSection}>
        <div className={s.faqCopy}>
          <header className={s.faqHead}>
            <p className={s.faqEy}>Before you begin.</p>
            <h2 className={s.faqTitle}>Questions, answered.</h2>
          </header>
          <FaqList items={FAQS} />
        </div>
        <div className={s.faqVisual}>
          <div className={s.faqVisualFrame}>
            <Image
              src="/home-v4/howa-lander-faq-v2.png"
              alt="The Living Record of Your Home — a leather-bound book on a wooden cabinet beside a vase of foliage, a brass key and a HoWA sensor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectFit: "contain", objectPosition: "right center" }}
            />
          </div>
        </div>
      </section>

      {/* 8. Closing band */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Step into stewardship.</p>
        <p className={s.closingStatement}>
          <em>Understand. Protect. Perform.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/api/howa-bounce" className={s.closingBtnFilled}>
            Enter HoWA
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------
   Inline SVG icons — copy from v4a to keep this preview self-contained
---------------------------------------------------------------- */

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
      <circle cx="11" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="21" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="11" cy="23" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="23" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
