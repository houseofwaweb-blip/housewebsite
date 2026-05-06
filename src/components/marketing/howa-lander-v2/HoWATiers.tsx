import Image from "next/image";
import { Leaf } from "lucide-react";
import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import { LucideIcon } from "../home-v2/shared";
import s from "./howa-lander-v2.module.css";

export function HoWATiers({ data }: { data: HoWALanderV2 }) {
  return (
    <section className={s.tiers}>
      <div className={s.tiersInner}>
        <h2 className={s.tiersTitle}>{data.tiersTitle}</h2>

        <div className={s.tiersGrid}>
          {data.tiers.map((t) => (
            <div key={t.numeral} className={s.tier}>
              <ul className={s.tierFeatures}>
                {t.features?.map((f) => (
                  <li key={f.label} className={s.tierFeature}>
                    <span className={s.tierFeatureIcon}>
                      <LucideIcon name={f.icon} size={16} />
                    </span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>

              <div className={s.tierBody}>
                <div className={s.tierBodyHead}>
                  <div className={s.tierLeaf}>
                    <Leaf size={18} strokeWidth={1.4} />
                  </div>
                  <div className={s.tierName}>
                    {t.numeral} {t.name}
                  </div>
                  <div className={s.tierTagline}>{t.tagline}</div>
                </div>
                {t.phoneImageUrl && (
                  <Image
                    src={t.phoneImageUrl}
                    alt={t.phoneImageAlt ?? `HoWA ${t.name}`}
                    width={426}
                    height={900}
                    sizes="(min-width: 1100px) 220px, 60vw"
                    className={s.tierPhone}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
