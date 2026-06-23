import Image from "next/image";
import Link from "next/link";
import s from "./news.module.css";
import { getNewsList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "News | Announcements & press.",
  description:
    "Press, recognition, and announcements from the House of Willow Alexander.",
};

export default async function NewsIndexPage() {
  const items = await getNewsList();

  return (
    <div className={s.page}>
      {/* 1. Header */}
      <section className={s.head}>
        <div className={s.headInner}>
          <p className={s.eyebrow}>The House · News</p>
          <h1 className={s.headTitle}>
            Announcements &amp; <em>press.</em>
          </h1>
          <p className={s.headLede}>
            Awards, recognition, recent features, and the occasional note from
            the House. Added as they come.
          </p>
        </div>
      </section>

      {/* 2. Chronological list */}
      <section className={s.list}>
        <div className={s.listInner}>
          {items.length === 0 ? (
            <p className={s.empty}>No news yet. Please check back soon.</p>
          ) : (
            items.map((item, i) => {
              const date = new Date(item.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className={`${s.row} ${i === items.length - 1 ? s.rowLast : ""}`}
                >
                  <time dateTime={item.publishedAt} className={s.rowDate}>
                    {date}
                  </time>
                  <div className={s.rowBody}>
                    <h2 className={s.rowTitle}>{item.title}</h2>
                    {item.lede ? (
                      <p className={s.rowLede}>{item.lede}</p>
                    ) : null}
                  </div>
                  {item.image ? (
                    <div className={s.rowThumb}>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="200px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  ) : (
                    <span className={s.rowThumbPlaceholder} aria-hidden="true" />
                  )}
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
