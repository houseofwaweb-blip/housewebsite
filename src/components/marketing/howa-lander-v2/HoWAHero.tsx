import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import { EmphasiseText } from "../home-v2/shared";
import s from "./howa-lander-v2.module.css";

export function HoWAHero({ data }: { data: HoWALanderV2 }) {
  return (
    <section className={s.hero} data-howa-hero>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <div className={s.heroLogoBlock}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/howa/howa-black.svg" alt="HoWA" />
              <span className={s.heroLogoCaption}>The Home Operating System</span>
            </div>
            {data.heroEyebrow && <div className={s.heroEyebrow}>{data.heroEyebrow}</div>}
            <h1 className={s.heroHeadline}>
              <EmphasiseText value={data.heroHeadline} />
            </h1>
            <p className={s.heroLede}>{data.heroLede}</p>
            <div className={s.heroCtas}>
              <Link href={data.heroPrimaryCtaHref} className={s.btnFilled}>
                {data.heroPrimaryCtaLabel} →
              </Link>
              {data.heroSecondaryCtaLabel && data.heroSecondaryCtaHref && (
                <Link href={data.heroSecondaryCtaHref} className={s.btnPlay}>
                  <span className={s.playCircle}>
                    <Play size={12} strokeWidth={1.6} fill="currentColor" />
                  </span>
                  {data.heroSecondaryCtaLabel}
                </Link>
              )}
            </div>
            {data.heroNextCare?.day && (
              <div className={s.heroNextCare}>
                <strong>{data.heroNextCare.label ?? "Next care"}</strong>
                <span>{data.heroNextCare.day} · {data.heroNextCare.time}</span>
              </div>
            )}
          </div>
        </div>

        <div className={s.heroVisual}>
          {data.heroImageUrl && (
            <Image
              src={data.heroImageUrl}
              alt={data.heroImageAlt ?? "House cross-section with HoWA annotations"}
              fill
              sizes="(min-width: 1100px) 56vw, 100vw"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
