import Image from "next/image";
import Link from "next/link";
import type { HomepageV2 } from "@/lib/cms/homepage-v2";
import s from "./home-v2.module.css";

export function Temperaments({ data }: { data: HomepageV2 }) {
  return (
    <section className={s.temperaments}>
      <div className={s.tempHead}>
        <h2>{data.temperamentsTitle}</h2>
      </div>
      <div className={s.tempGrid}>
        {data.temperaments.map((t) => (
          <Link key={t.name} href={t.href ?? "#"} className={s.temp}>
            {t.imageUrl && (
              <Image
                src={t.imageUrl}
                alt={t.name}
                width={960}
                height={1200}
                sizes="(min-width: 1100px) 25vw, 50vw"
              />
            )}
            <span className={s.tempCta}>
              {t.ctaLabel ?? "Learn more"} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
