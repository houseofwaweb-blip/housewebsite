"use client";

import Image from "next/image";
import Link from "next/link";
import s from "./steward-v1.module.css";

type Tier = "assistant" | "housekeeper" | "steward";

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M5 21 C 5 12, 12 5, 21 5 C 21 14, 14 21, 5 21 Z" />
      <path d="M5 21 L 14 12" />
    </svg>
  );
}
function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M3 12 H8 L10 7 L14 17 L16 12 H21" />
    </svg>
  );
}
function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7 7 a7 7 0 0 1 10 0" />
      <path d="M5 5 a10 10 0 0 1 14 0" />
    </svg>
  );
}
function TaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="1" />
      <path d="M9 9 L10.5 10.5 L13 8" />
      <path d="M9 14 L10.5 15.5 L13 13" />
      <path d="M16 9 H16.5" />
      <path d="M16 14 H16.5" />
    </svg>
  );
}
function CalendarSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M4 10 H20" />
      <path d="M9 4 V8" />
      <path d="M15 4 V8" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M6 16 L6 11 a6 6 0 0 1 12 0 L18 16 L20 18 H4 Z" />
      <path d="M10 21 a2 2 0 0 0 4 0" />
    </svg>
  );
}
function ShieldSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M12 3 L20 6 V12 C20 16, 16 20, 12 22 C8 20, 4 16, 4 12 V6 Z" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M4.9 19.1 L7 17 M17 7 L19.1 4.9" />
    </svg>
  );
}
function VaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9 V8 M12 16 V15 M9 12 H8 M16 12 H15" />
    </svg>
  );
}

type FeatureItem = { icon: React.ComponentType; text: string };

const TIERS: {
  slug: Tier;
  numeral: string;
  label: string;
  tagline: string;
  visual: { kind: "illustration" | "phone"; src: string; alt: string };
  features: FeatureItem[];
  href: string;
}[] = [
  {
    slug: "assistant",
    numeral: "I.",
    label: "Assistant",
    tagline: "The house, seen.",
    visual: { kind: "illustration", src: "/home-v4/assistant-dollhouse.webp", alt: "Doll house — Assistant tier" },
    features: [
      { icon: LeafIcon, text: "Notices what matters" },
      { icon: PulseIcon, text: "Tracks changes in real time" },
      { icon: SignalIcon, text: "Surfaces subtle signals" },
    ],
    href: "/howa#assistant",
  },
  {
    slug: "housekeeper",
    numeral: "II.",
    label: "Housekeeper",
    tagline: "The house, in order.",
    visual: { kind: "phone", src: "/home-v4/steward-phone-housekeeper.webp", alt: "Today's Plan — Housekeeper phone" },
    features: [
      { icon: TaskIcon, text: "Windows remembered" },
      { icon: CalendarSmallIcon, text: "Services in rhythm" },
      { icon: BellIcon, text: "Nothing slips" },
    ],
    href: "/howa#housekeeper",
  },
  {
    slug: "steward",
    numeral: "III.",
    label: "Steward",
    tagline: "The house, protected before failure.",
    visual: { kind: "phone", src: "/home-v4/steward-phone-steward.webp", alt: "House Health 91% Optimal — Steward phone" },
    features: [
      { icon: ShieldSmallIcon, text: "Predicts risk" },
      { icon: GearIcon, text: "Optimises systems" },
      { icon: VaultIcon, text: "Protects long-term value" },
    ],
    href: "/howa/steward",
  },
];

export function TierShowcase() {
  return (
    <section className={s.tierShowcase}>
      <header className={s.tierShowcaseHead}>
        <h2 className={s.tierShowcaseTitle}>
          Three ways to access it.
        </h2>
      </header>
      <div className={s.tierShowcaseGrid}>
        {TIERS.map((tier) => (
          <article key={tier.slug} className={`${s.tierShowcaseCol} ${s[tier.slug]}`}>
            <header className={s.tierShowcaseTop}>
              <p className={s.tierShowcaseMeta}>
                {tier.numeral} {tier.label}
              </p>
              <h3 className={s.tierShowcaseTagline}>{tier.tagline}</h3>
            </header>

            <div className={s.tierShowcaseBody}>
              <div className={`${s.tierShowcaseVisual} ${s[`v-${tier.visual.kind}`]}`}>
                <Image
                  src={tier.visual.src}
                  alt={tier.visual.alt}
                  width={tier.visual.kind === "phone" ? 1024 : 1024}
                  height={tier.visual.kind === "phone" ? 1536 : 1228}
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <ul className={s.tierShowcaseFeatures}>
                {tier.features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.text}>
                      <span className={s.tierShowcaseFeatureIcon}>
                        <Icon />
                      </span>
                      <span>{f.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link href={tier.href} className={s.tierShowcaseLearn}>
              Learn more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
