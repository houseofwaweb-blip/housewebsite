import Image from "next/image";
import Link from "next/link";
import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import s from "./home-v2.module.css";

export function PillarsRow({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.pillars}>
      <div className={s.pillarsGrid}>
        {data.pillars.map((p) => {
          const href = p.sublinks?.length ? "#" : p.ctaHref ?? "#";
          return (
            <Link key={p.name} href={href} className={s.pillar}>
              <div className={s.pillarText}>
                <div className={s.pillarName}>{p.name}</div>
                <div
                  className={s.pillarHeadline}
                  // headline supports two-line breaks via newline in CMS
                  style={{ whiteSpace: "pre-line" }}
                >
                  {p.headline}
                </div>
                <p>{p.body}</p>

                {p.sublinks?.length ? (
                  <ul className={s.pillarLinks}>
                    {p.sublinks.map((sl) => (
                      <li key={sl.label}>
                        <Link href={sl.href}>{sl.label}</Link>
                        <span>→</span>
                      </li>
                    ))}
                  </ul>
                ) : p.ctaLabel ? (
                  <span className={s.pillarCta}>{p.ctaLabel} →</span>
                ) : null}
              </div>
              <div className={s.pillarImg}>
                {p.imageUrl && (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={600}
                    height={1200}
                    sizes="(min-width: 1100px) 12vw, 25vw"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
