import Link from "next/link";
import type { HoWALanderV2 } from "@/lib/cms/howa-lander-v2";
import s from "./howa-lander-v2.module.css";

export function HoWAHeader({ data }: { data: HoWALanderV2 }) {
  return (
    <header className={s.header}>
      <div className={s.headerLogoBlock}>
        <Link href="/howa" className={s.headerLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/howa/howa-black.svg" alt="HoWA" />
        </Link>
        {data.headerLogoCaption && (
          <span className={s.headerLogoCaption}>{data.headerLogoCaption}</span>
        )}
      </div>
      <nav>
        <ul className={s.headerNav}>
          {data.headerNavItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href={data.headerCtaHref} className={s.headerCta}>
        {data.headerCtaLabel} →
      </Link>
    </header>
  );
}
