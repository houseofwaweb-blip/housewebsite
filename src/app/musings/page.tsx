import Image from "next/image";
import Link from "next/link";
import s from "./musings.module.css";
import { getMusingList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "Musings — Short notes from the House.",
  description:
    "The House's free blog — notes on gardens, rooms, seasons, and the keeping of a home.",
};

export default async function MusingsIndexPage() {
  const items = await getMusingList();
  const [hero, ...rest] = items;

  return (
    <div className={s.page}>
      {/* 1. Hero header */}
      <section className={s.head}>
        <div className={s.headInner}>
          <p className={s.eyebrow}>The House · Musings</p>
          <h1 className={s.headTitle}>
            Short notes &amp; <em>practical advice.</em>
          </h1>
          <p className={s.headLede}>
            Free to read. Gardens, rooms, seasons, and the quiet work of
            keeping a home. Longer editorial writing lives in{" "}
            <Link href="/the-hearth" className={s.headLink}>
              The Hearth
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 2. Featured / latest */}
      {hero ? (
        <section className={s.featured}>
          <Link href={`/musings/${hero.slug}`} className={s.featuredCard}>
            {hero.image ? (
              <div className={s.featuredImage}>
                <Image
                  src={hero.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            ) : (
              <div className={s.featuredImagePlaceholder} aria-hidden="true" />
            )}
            <div className={s.featuredBody}>
              <p className={s.featuredEy}>The latest</p>
              <h2 className={s.featuredTitle}>{hero.title}</h2>
              <p className={s.featuredLede}>{hero.lede}</p>
              <time dateTime={hero.publishedAt} className={s.featuredDate}>
                {formatDate(hero.publishedAt, "long")}
              </time>
            </div>
          </Link>
        </section>
      ) : null}

      {/* 3. Grid */}
      {rest.length > 0 ? (
        <section className={s.grid}>
          <header className={s.gridHead}>
            <p className={s.eyebrowCentered}>The archive</p>
            <h2 className={s.gridTitle}>
              More <em>from the House.</em>
            </h2>
          </header>
          <div className={s.gridInner}>
            {rest.map((m) => (
              <article key={m.slug} className={s.card}>
                <Link href={`/musings/${m.slug}`} className={s.cardLink}>
                  {m.image ? (
                    <div className={s.cardImage}>
                      <Image
                        src={m.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  ) : (
                    <div className={s.cardImagePlaceholder} aria-hidden="true" />
                  )}
                  <h3 className={s.cardTitle}>{m.title}</h3>
                  <p className={s.cardLede}>{m.lede}</p>
                  <time dateTime={m.publishedAt} className={s.cardDate}>
                    {formatDate(m.publishedAt, "short")}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {items.length === 0 ? (
        <section className={s.empty}>
          <p className={s.emptyText}>New musings are on their way. Check back soon.</p>
        </section>
      ) : null}
    </div>
  );
}

function formatDate(iso: string, style: "long" | "short" = "long"): string {
  const d = new Date(iso);
  return style === "long"
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
