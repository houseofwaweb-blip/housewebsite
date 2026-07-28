"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./home-v4a.module.css";

type Tier = "assistant" | "housekeeper" | "steward";

const PHONES: { tier: Tier; src: string; alt: string }[] = [
  {
    tier: "assistant",
    src: "/home-v4/phone-assistant-full.webp",
    alt: "Free tier phone screen",
  },
  {
    tier: "housekeeper",
    src: "/home-v4/phone-housekeeper-full.webp",
    alt: "HoWA Housekeeper phone screen",
  },
  {
    tier: "steward",
    src: "/home-v4/phone-steward-full.webp",
    alt: "HoWA Steward phone screen",
  },
];

export function OneSystem() {
  const [hovered, setHovered] = useState<Tier | null>(null);

  return (
    <section
      className={s.oneSystem}
      data-tier={hovered ?? "default"}
    >
      <div aria-hidden="true" className={s.oneSystemBgStack}>
        <div
          className={s.oneSystemBgLayer}
          data-tier="assistant"
          data-active={hovered === "assistant"}
          style={{ backgroundImage: "url(/home-v4/bg-assistant.webp)" }}
        />
        <div
          className={s.oneSystemBgLayer}
          data-tier="housekeeper"
          data-active={hovered === "housekeeper"}
          style={{ backgroundImage: "url(/home-v4/bg-housekeeper.webp)" }}
        />
        <div
          className={s.oneSystemBgLayer}
          data-tier="steward"
          data-active={hovered === "steward"}
          style={{ backgroundImage: "url(/home-v4/bg-steward.webp)" }}
        />
        <div className={s.oneSystemBgScrim} />
      </div>

      <div className={s.oneSystemInner}>
        <div className={s.oneSystemCopy}>
          <h2>
            One system.<br />
            <em>In your hands.</em>
          </h2>
          <p>
            Designed for clarity. Built for quiet care. Three views into the same
            record, ready when you are.
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
          {PHONES.map((p, i) => (
            <div
              key={p.tier}
              className={`${s.phone} ${i === 1 ? s.phoneRaised : ""}`}
              onMouseEnter={() => setHovered(p.tier)}
              onMouseLeave={() =>
                setHovered((prev) => (prev === p.tier ? null : prev))
              }
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={426}
                height={900}
                sizes="220px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <path d="M3.7 2.5 L14.5 12 L3.7 21.5 z" opacity=".75" />
    </svg>
  );
}
