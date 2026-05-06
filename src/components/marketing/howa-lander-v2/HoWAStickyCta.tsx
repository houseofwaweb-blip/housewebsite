"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./howa-lander-v2.module.css";

/**
 * Sticky bottom-right CTA pill that fades in once the hero is mostly
 * out of view. Hides itself again when the final CTA is in view, so
 * we don't double up at the bottom of the page.
 */
export function HoWAStickyCta({ label = "Start HoWA", href = "/howa" }: { label?: string; href?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-howa-hero]");
    const final = document.querySelector("[data-howa-final]");
    if (!hero) return;

    let heroOut = false;
    let finalIn = false;
    const update = () => setVisible(heroOut && !finalIn);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroOut = e.intersectionRatio < 0.2;
        update();
      },
      { threshold: [0, 0.2, 0.5, 1] },
    );
    heroObs.observe(hero);

    let finalObs: IntersectionObserver | undefined;
    if (final) {
      finalObs = new IntersectionObserver(
        ([e]) => {
          finalIn = e.intersectionRatio > 0.2;
          update();
        },
        { threshold: [0, 0.2, 0.5, 1] },
      );
      finalObs.observe(final);
    }

    return () => {
      heroObs.disconnect();
      finalObs?.disconnect();
    };
  }, []);

  return (
    <Link
      href={href}
      className={s.stickyCta}
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      {label} →
    </Link>
  );
}
