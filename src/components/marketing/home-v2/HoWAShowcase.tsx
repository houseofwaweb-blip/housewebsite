"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import { LucideIcon } from "./shared";
import { CompanionTeaser } from "./CompanionTeaser";
import s from "./home-v2.module.css";

export function HoWAShowcase({ data }: { data: HomepageV2 }) {
  const phones = data.howaPhones ?? [];
  const [hoveredPhone, setHoveredPhone] = useState<number | null>(null);
  const hoveredHasBg =
    hoveredPhone !== null && !!phones[hoveredPhone]?.hoverImageUrl;

  return (
    <section
      className={s.howa}
      data-hovering={hoveredHasBg ? "true" : "false"}
    >
      <div aria-hidden="true" className={s.howaBgStack}>
        {phones.map((p, i) =>
          p.hoverImageUrl ? (
            <div
              key={p.tier ?? i}
              className={s.howaBgLayer}
              data-active={hoveredPhone === i ? "true" : "false"}
              style={{ backgroundImage: `url(${p.hoverImageUrl})` }}
            />
          ) : null,
        )}
        <div className={s.howaBgScrim} />
      </div>

      <header className={s.howaHead}>
        <h2 className={s.howaTitle}>Introducing HoWA</h2>
      </header>
      <div className={s.howaInner}>
        <div>
          <div className={s.howaLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/howa/howa-black.svg" alt="HoWA" />
          </div>
          {data.howaSubtitle && <div className={s.howaSubtitle}>{data.howaSubtitle}</div>}
          <p className={s.howaLede}>{data.howaLede}</p>
          {data.howaLinkLabel && data.howaLinkHref && (
            <Link href={data.howaLinkHref} className={s.howaLink}>
              {data.howaLinkLabel} →
            </Link>
          )}
        </div>

        <div className={s.howaPhones}>
          {phones.map((p, i) =>
            p.imageUrl ? (
              <Image
                key={p.tier ?? i}
                src={p.imageUrl}
                alt={p.imageAlt ?? `HoWA ${p.tier}`}
                width={426}
                height={900}
                sizes="200px"
                className={`${s.phone} ${i === 1 ? s.phoneRaised : ""}`}
                onMouseEnter={() => setHoveredPhone(i)}
                onMouseLeave={() =>
                  setHoveredPhone((prev) => (prev === i ? null : prev))
                }
              />
            ) : null,
          )}
        </div>

        <div>
          <ul className={s.howaFeatures}>
            {data.howaFeatures.map((f) => (
              <li key={f.heading} className={s.howaFeature}>
                <span className={s.icon}>
                  <LucideIcon name={f.icon} size={22} />
                </span>
                <div>
                  <h4>{f.heading}</h4>
                  <p>{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
          {data.howaCtaLabel && data.howaCtaHref && (
            <Link href={data.howaCtaHref} className={s.howaCta}>
              {data.howaCtaLabel} →
            </Link>
          )}
        </div>
      </div>

      <CompanionTeaser overlayDark={hoveredHasBg} />
    </section>
  );
}
