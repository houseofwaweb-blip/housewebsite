"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomepageV3, Pillar } from "@/lib/cms/homepage-v3";
import s from "./pillars-editorial.module.css";

/**
 * Editorial 4-column pillars (homepage2 style) with hover-driven
 * full-bleed background swap. When a column is hovered, that pillar's
 * hoverImage fades in across the entire section, a dark scrim drops,
 * and all text shifts to cream for legibility.
 *
 * If a pillar has no hoverImage, hovering it leaves the resting
 * cream-dark band unchanged.
 */
export function PillarsEditorial({ data }: { data: HomepageV3 }) {
  const pillars = data.pillars ?? [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!pillars.length) return null;

  const hoveredPillar = hoveredIndex !== null ? pillars[hoveredIndex] : null;
  const isHovering = !!hoveredPillar?.hoverImageUrl;

  return (
    <section
      className={s.pillars}
      data-hovering={isHovering ? "true" : "false"}
    >
      <div aria-hidden="true" className={s.bgStack}>
        {pillars.map((p, i) =>
          p.hoverImageUrl ? (
            <div
              key={p.name}
              className={s.bgLayer}
              data-active={hoveredIndex === i ? "true" : "false"}
              style={{ backgroundImage: `url(${p.hoverImageUrl})` }}
            />
          ) : null,
        )}
        <div className={s.bgScrim} />
      </div>

      <div className={s.inner}>
        {data.pillarsTitle && (
          <header className={s.head}>
            <h2 className={s.title}>{data.pillarsTitle}</h2>
          </header>
        )}
        <div className={s.grid}>
          {pillars.map((p, i) => (
            <Column
              key={p.name}
              pillar={p}
              index={i}
              onEnter={() => setHoveredIndex(i)}
              onLeave={() =>
                setHoveredIndex((prev) => (prev === i ? null : prev))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ROMAN = ["I.", "II.", "III.", "IV.", "V.", "VI."];

function Column({
  pillar,
  index,
  onEnter,
  onLeave,
}: {
  pillar: Pillar;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const href = pillar.sublinks?.length ? "#" : pillar.ctaHref ?? "#";

  return (
    <article
      className={s.col}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onEnter}
      onBlurCapture={onLeave}
    >
      <div className={s.numeral}>{ROMAN[index] ?? `${index + 1}.`}</div>
      <h3 className={s.name}>{pillar.name}</h3>
      <p className={s.tagline} style={{ whiteSpace: "pre-line" }}>{pillar.headline}</p>
      <p className={s.body}>{pillar.body}</p>

      {pillar.imageUrl && (
        <div className={s.imgWrap}>
          <Image
            src={pillar.imageUrl}
            alt={pillar.imageAlt ?? pillar.name}
            width={800}
            height={1067}
            sizes="(min-width: 1100px) 22vw, 90vw"
          />
        </div>
      )}

      {pillar.sublinks?.length ? (
        <ul className={s.links}>
          {pillar.sublinks.map((sl) => (
            <li key={sl.label}>
              <Link href={sl.href}>{sl.label} →</Link>
            </li>
          ))}
        </ul>
      ) : pillar.ctaLabel ? (
        <Link href={href} className={s.cta}>
          {pillar.ctaLabel} →
        </Link>
      ) : null}
    </article>
  );
}
