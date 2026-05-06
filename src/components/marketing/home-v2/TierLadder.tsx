import Link from "next/link";
import { Check } from "lucide-react";
import type { HomepageV3, TierCard } from "@/lib/cms/homepage-v3";
import s from "./tier-ladder.module.css";

export function TierLadder({ data }: { data: HomepageV3 }) {
  return (
    <section className={s.tiers}>
      <div className={s.tiersInner}>
        <header className={s.tiersHead}>
          {data.tiersEyebrow && (
            <div className={s.tiersEyebrow}>{data.tiersEyebrow}</div>
          )}
          <h2 className={s.tiersTitle}>{data.tiersTitle}</h2>
          {data.tiersSub && <p className={s.tiersSub}>{data.tiersSub}</p>}
        </header>

        <div className={s.tiersGrid}>
          {data.tiers.map((tier) => (
            <TierCardEl key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCardEl({ tier }: { tier: TierCard }) {
  const toneClass =
    tier.tone === "active"
      ? s.toneActive
      : tier.tone === "premium"
        ? s.tonePremium
        : s.toneQuiet;

  return (
    <article className={`${s.card} ${toneClass}`}>
      <div className={s.cardHead}>
        <h3 className={s.cardName}>{tier.name}</h3>
        <div className={s.cardPrice}>{tier.price}</div>
      </div>
      <p className={s.cardTagline}>{tier.tagline}</p>
      <p className={s.cardBody}>{tier.body}</p>

      {tier.inclusions?.length ? (
        <ul className={s.cardList}>
          {tier.inclusions.map((inc) => (
            <li key={inc}>
              <Check size={14} strokeWidth={1.6} />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Link href={tier.ctaHref} className={s.cardCta}>
        {tier.ctaLabel} →
      </Link>
    </article>
  );
}
