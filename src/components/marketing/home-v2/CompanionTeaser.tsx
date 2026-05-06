import Link from "next/link";
import s from "./companion-teaser.module.css";

const COMPANION_HREF = "/howa/companion";

/**
 * Companion teaser — direction B (margin-note annotation).
 * Renders inside the HoWA section as a tail block, sharing the sepia
 * paper background. Eyebrow · italic note · single filled-brown CTA.
 */
export function CompanionTeaser({ overlayDark = false }: { overlayDark?: boolean } = {}) {
  return (
    <div className={s.companion} data-hovering={overlayDark ? "true" : "false"}>
      <p className={s.eyebrow}>The Companion</p>
      <p className={s.note}>
        Not sure where to start? <em>The Companion</em> will help.
      </p>
      <Link href={COMPANION_HREF} className={s.cta}>
        Launch The Companion
      </Link>
    </div>
  );
}
