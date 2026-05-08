import Image from "next/image";
import Link from "next/link";
import type { HomepageV3 } from "@/lib/cms/homepage-v3";
import { EmphasiseText } from "./shared";
import s from "./hero-v3.module.css";

/**
 * Full-bleed photographic hero — same composition as the current live
 * homepage at `/`, but driven by homepageV3 Sanity fields and using the
 * sage-Georgian image. Centred cream text over a dark gradient.
 */
export function HeroV3({ data }: { data: HomepageV3 }) {
  return (
    <section aria-label="Welcome" className={s.hero}>
      {data.heroImageUrl && (
        <Image
          src={data.heroImageUrl}
          alt={data.heroImageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className={s.heroImg}
        />
      )}
      <div aria-hidden="true" className={s.gradient} />

      <div className={s.content}>
        {data.heroEyebrow && <span className={s.eyebrow}>{data.heroEyebrow}</span>}
        <h1 className={s.headline}>
          <EmphasiseText value={data.heroHeadline} />
        </h1>
        <p className={s.lede}>{data.heroLede}</p>

        <div className={s.ctas}>
          <Link href={data.heroPrimaryCtaHref} className={s.btnPrimary}>
            {data.heroPrimaryCtaLabel}
          </Link>
          <Link href={data.heroSecondaryCtaHref} className={s.btnSecondary}>
            {data.heroSecondaryCtaLabel}
          </Link>
        </div>

        <p className={s.tertiary}>
          <Link href="#open-booking-form">Or book a consultation</Link>
        </p>
      </div>
    </section>
  );
}
