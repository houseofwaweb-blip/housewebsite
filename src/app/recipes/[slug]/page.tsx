import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@/components/cms/PortableText";
import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/cms/news-musings";
import s from "./recipe.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRecipeBySlug(slug);
  if (!item) return { title: "Recipes · not found" };
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

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getRecipeBySlug(slug);
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
          <Link href="/recipes" className={s.eyebrow}>The House · Recipes</Link>
          <h1 className={s.title}>{item.title}</h1>
          {item.lede ? <p className={s.lede}>{item.lede}</p> : null}

          {(item.prepTime || item.cookTime || item.serves || item.season) ? (
            <div className={s.meta}>
              {item.prepTime ? (
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Prep</span>
                  <span className={s.metaValue}>{item.prepTime}</span>
                </div>
              ) : null}
              {item.cookTime ? (
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Cook</span>
                  <span className={s.metaValue}>{item.cookTime}</span>
                </div>
              ) : null}
              {item.serves ? (
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Serves</span>
                  <span className={s.metaValue}>{item.serves}</span>
                </div>
              ) : null}
              {item.season ? (
                <div className={s.metaItem}>
                  <span className={s.metaLabel}>Season</span>
                  <span className={s.metaValue}>{item.season}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          <p className={s.byline}>
            <em>{item.author}</em>
            <span className={s.bylineSep}>·</span>
            <time dateTime={item.publishedAt}>{date}</time>
          </p>
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
          ) : null}

          {item.tags?.length ? (
            <div className={s.tags}>
              {item.tags.map((t) => (
                <span key={t} className={s.tag}>{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      <section className={s.closing}>
        <p className={s.closingKicker}>The House · Recipes</p>
        <p className={s.closingStatement}>
          More <em>from the kitchen.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/recipes" className={s.btnFilled}>
            All recipes
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
  const slugs = await getAllRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}
