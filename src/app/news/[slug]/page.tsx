import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@/components/cms/PortableText";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/cms/news-musings";
import s from "./news-item.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "News · not found" };
  return {
    title: item.seo?.title ?? item.title,
    description: item.seo?.description ?? item.lede,
    robots: item.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: item.title,
      description: item.lede,
      publishedTime: item.publishedAt,
      images: item.image ? [{ url: item.image }] : undefined,
    },
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const date = new Date(item.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div className={s.headInner}>
          <Link href="/news" className={s.eyebrow}>The House · News</Link>
          <h1 className={s.title}>{item.title}</h1>
          <p className={s.byline}>
            <em>{item.author}</em>
            <span className={s.bylineSep}>·</span>
            <time dateTime={item.publishedAt}>{date}</time>
          </p>
          {item.lede ? <p className={s.lede}>{item.lede}</p> : null}
        </div>
      </header>

      {item.image ? (
        <div className={s.heroImageWrap}>
          <div className={s.heroImage}>
            <Image
              src={item.image}
              alt={item.imageAlt || item.title}
              width={2200}
              height={1240}
              sizes="(min-width: 1100px) 1100px, 100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      ) : null}

      <article className={s.body}>
        <div className={s.bodyInner}>
          {item.body?.length ? (
            <div className={s.prose}>
              <PortableText value={item.body} />
            </div>
          ) : (
            <p className={s.placeholderCopy}>Coverage coming soon.</p>
          )}

          {item.externalUrl ? (
            <div className={s.external}>
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.externalLink}
              >
                Read original coverage
                <span aria-hidden="true" className={s.externalArrow}>↗</span>
              </a>
            </div>
          ) : null}
        </div>
      </article>

      <section className={s.closing}>
        <p className={s.closingKicker}>The House · News</p>
        <p className={s.closingStatement}>
          More <em>from the House.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/news" className={s.btnFilled}>
            All news
          </Link>
          <Link href="/musings" className={s.btnGhost}>
            Read our musings
            <span aria-hidden="true" className={s.btnArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}
