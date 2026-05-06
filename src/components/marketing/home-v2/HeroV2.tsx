import Image from "next/image";
import Link from "next/link";
import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import { EmphasiseText } from "./shared";
import s from "./home-v2.module.css";

export function HeroV2({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.hero}>
      <div className={s.heroCopy}>
        <div className={s.heroCopyInner}>
          {data.heroEyebrow && <div className={s.heroEyebrow}>{data.heroEyebrow}</div>}
          <h1 className={s.heroHeadline}>
            <EmphasiseText value={data.heroHeadline} />
          </h1>
          <div className={s.heroRule} />
          <p className={s.heroLede}>{data.heroLede}</p>
          <div className={s.heroCtas}>
            <Link href={data.heroPrimaryCtaHref} className={s.btnFilled}>
              {data.heroPrimaryCtaLabel}
            </Link>
            <Link href={data.heroSecondaryCtaHref} className={s.btnOutlined}>
              <span>{data.heroSecondaryCtaLabel}</span>
              {data.heroSecondaryCtaSub && <small>{data.heroSecondaryCtaSub}</small>}
            </Link>
          </div>
        </div>
      </div>
      <div className={s.heroVisual}>
        {data.heroImageUrl && (
          <Image
            src={data.heroImageUrl}
            alt={data.heroImageAlt ?? ""}
            fill
            sizes="(min-width: 1100px) 60vw, 100vw"
            priority
          />
        )}
        <div className={s.heroOverlay}>
          <div className={s.heroLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/howa/howa-white.svg" alt="HoWA" />
          </div>
          {data.heroOverlayHeading && (
            <div className={s.heroOverlayHeading}>{data.heroOverlayHeading}</div>
          )}
          <div className={s.heroOverlayDivider} />
          {data.heroOverlayTagline && (
            <p className={s.heroOverlayTagline}>{data.heroOverlayTagline}</p>
          )}
        </div>
      </div>
    </section>
  );
}
