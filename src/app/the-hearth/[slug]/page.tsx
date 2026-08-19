import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { PortableText } from "@/components/cms/PortableText";
import { HearthMasthead } from "@/components/hearth/HearthMasthead";
import { HearthUsefulDetails } from "@/components/hearth/HearthUsefulDetails";
import { HearthNextAction } from "@/components/hearth/HearthNextAction";
import { HearthTitle } from "@/components/hearth/HearthTitle";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { HearthPaywall } from "@/components/hearth/HearthPaywall";
import { HearthViewTracker } from "@/components/hearth/HearthViewTracker";
import { ProgressBar } from "@/components/primitives/ProgressBar";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getAdjacentArticles,
  relatedArticlesFromSanity,
} from "@/lib/cms/hearth";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * /the-hearth/[slug] — article detail, Sanity-backed.
 * Rendering is unchanged from the WP-HTML era: the body is Portable Text now
 * (rendered via the existing PortableText component) instead of raw HTML.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.dek,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.publishedAt,
      images: article.image ? [{ url: article.image }] : undefined,
      authors: [article.author],
    },
    robots: article.seo?.noindex ? { index: false, follow: true } : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const url = `${base}/the-hearth/${slug}`;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const related = await relatedArticlesFromSanity(slug, article.categorySlug, 3);
  const { prev, next } = await getAdjacentArticles(slug);
  const bodyBlocks = (article.body as PortableTextBlock[] | undefined) ?? [];
  const hasBody = bodyBlocks.length > 0;
  // Paywall: preview the first 2 blocks for premium articles, paywall the rest.
  const PREVIEW_BLOCKS = 2;
  const previewBlocks = article.isPremium
    ? bodyBlocks.slice(0, PREVIEW_BLOCKS)
    : bodyBlocks;
  const lockedBlocks = article.isPremium ? bodyBlocks.slice(PREVIEW_BLOCKS) : [];
  const showPaywall = article.isPremium && bodyBlocks.length > PREVIEW_BLOCKS;

  return (
    <>
      <HearthViewTracker slug={slug} />
      <ArticleJsonLd
        title={article.title}
        description={article.dek}
        image={article.image}
        authorName={article.author}
        datePublished={article.publishedAt}
        section={article.categoryLong ?? article.category}
        url={url}
        gated={article.isPremium}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The Hearth", href: "/the-hearth" },
          { name: article.title, href: `/the-hearth/${slug}` },
        ]}
      />

      <div className="bg-house-white text-house-black">
        <HearthMasthead />

        <div className="sticky top-0 z-30">
          <ProgressBar scroll className="bg-house-white" />
        </div>

        {/* Top prev / next — same neighbours as the footer nav, compact */}
        {prev || next ? (
          <nav
            aria-label="Article navigation (top)"
            className="max-w-[760px] mx-auto px-[5vw] pt-7 flex items-center justify-between gap-10 md:gap-24"
          >
            {prev ? (
              <Link
                href={`/the-hearth/${prev.slug}`}
                className="group inline-flex items-center gap-2 min-w-0 no-underline text-left"
              >
                <span aria-hidden className="font-hearth-sans text-[18px] text-house-stone transition-colors group-hover:text-house-gold-ink">←</span>
                <span className="min-w-0">
                  <span className="block font-hearth-sans text-[14px] tracking-[0.2em] uppercase text-house-stone">Previous</span>
                  <span className="block font-hearth-serif text-[18px] leading-snug text-house-black truncate max-w-[34vw] md:max-w-[220px] transition-colors group-hover:text-house-gold-ink">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/the-hearth/${next.slug}`}
                className="group inline-flex items-center gap-2 min-w-0 no-underline text-right"
              >
                <span className="min-w-0">
                  <span className="block font-hearth-sans text-[14px] tracking-[0.2em] uppercase text-house-stone">Next</span>
                  <span className="block font-hearth-serif text-[18px] leading-snug text-house-black truncate max-w-[34vw] md:max-w-[220px] transition-colors group-hover:text-house-gold-ink">{next.title}</span>
                </span>
                <span aria-hidden className="font-hearth-sans text-[18px] text-house-stone transition-colors group-hover:text-house-gold-ink">→</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}

        <article>
          <header className="px-[5vw] pt-12 pb-8 text-center max-w-[860px] mx-auto">
            <div className="font-hearth-sans text-[14px] tracking-[0.24em] uppercase text-house-black mb-5">
              {article.categoryLong ?? article.category}
              {article.isPremium ? (
                <span className="ml-2 text-house-gold-ink text-[14px] tracking-[0.22em] uppercase before:content-['◆'] before:text-[8px] before:mr-0.5">
                  Members
                </span>
              ) : null}
            </div>
            <h1 className="font-hearth-serif font-medium leading-[1.05] tracking-[-0.01em] text-[clamp(43px,5.5vw,79px)] text-house-black">
              <HearthTitle title={article.title} em={article.titleEm} />
            </h1>
            <p className="font-hearth-serif italic text-[23px] leading-[1.55] text-house-stone mt-6 max-w-[56ch] mx-auto">
              {article.dek}
            </p>
            <p className="font-hearth-sans text-[14px] tracking-[0.16em] uppercase text-house-stone mt-8 flex gap-3 justify-center flex-wrap">
              <em className="not-italic font-hearth-serif italic text-[18px] tracking-[0.02em] normal-case text-house-black">
                {article.author}
              </em>
              <span>·</span>
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              {article.readTimeMinutes ? (
                <>
                  <span>·</span>
                  <span>{article.readTimeMinutes} min read</span>
                </>
              ) : null}
            </p>
          </header>

          {article.image ? (
            <div className="px-[5vw]">
              <div className="max-w-[1200px] mx-auto">
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  width={2400}
                  height={1350}
                  sizes="(min-width: 1200px) 1200px, 100vw"
                  className="w-full h-auto aspect-[16/9] object-cover"
                  priority
                />
              </div>
            </div>
          ) : null}

          <div className="px-[5vw] py-16">
            <div className="max-w-[720px] mx-auto">
              {hasBody ? (
                <>
                  <div className="font-hearth-serif text-[22px] leading-[1.75] text-house-black/90 [&_p]:mb-[22px] [&_h2]:font-hearth-serif [&_h2]:font-medium [&_h2]:text-[clamp(31px,3.5vw,45px)] [&_h2]:leading-[1.15] [&_h2]:mt-14 [&_h2]:mb-4 [&_h3]:font-hearth-serif [&_h3]:font-medium [&_h3]:text-[clamp(25px,2.6vw,33px)] [&_h3]:mt-10 [&_h3]:mb-3 [&_h4]:font-hearth-sans [&_h4]:text-[18px] [&_h4]:tracking-[0.2em] [&_h4]:uppercase [&_h4]:mt-8 [&_h4]:mb-3 [&_a]:text-house-gold-ink [&_a]:underline [&_a]:underline-offset-[3px] [&_blockquote]:my-10 [&_blockquote]:border-l [&_blockquote]:border-house-gold [&_blockquote]:pl-7 [&_blockquote]:italic [&_ul]:my-5 [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal">
                    <PortableText value={previewBlocks} />
                  </div>

                  {showPaywall ? (
                    <>
                      <HearthPaywall />
                      <div
                        aria-hidden="true"
                        className="relative font-hearth-serif text-[22px] leading-[1.75] text-house-black/90 select-none pointer-events-none [filter:blur(3px)] opacity-40 [&_p]:mb-[22px] [&_h2]:font-hearth-serif [&_h2]:font-medium [&_h2]:text-[clamp(31px,3.5vw,45px)] [&_h2]:leading-[1.15] [&_h2]:mt-14 [&_h2]:mb-4 [&_h3]:font-hearth-serif [&_h3]:font-medium [&_h3]:text-[clamp(25px,2.6vw,33px)] [&_h3]:mt-10 [&_h3]:mb-3"
                      >
                        <PortableText value={lockedBlocks} />
                        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-house-white" />
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <p className="font-hearth-serif italic text-[20px] text-house-stone">
                  Body content coming soon.
                </p>
              )}

              {/* §13.7 — the useful details fact box, derived from the piece. */}
              <HearthUsefulDetails
                category={article.categoryLong ?? article.category}
                author={article.author}
                date={formattedDate}
                readTime={article.readTimeMinutes}
                topics={article.tags}
              />

              {/* §13.8 — one contextual next action, after the body, never a form. */}
              <HearthNextAction categorySlug={article.categorySlug} />
            </div>
          </div>
        </article>

        {/* Prev / back-to-Hearth / next */}
        <nav
          aria-label="Article navigation"
          className="max-w-[760px] mx-auto px-[5vw] py-9 border-t border-house-brown/12 flex items-stretch justify-between gap-4"
        >
          {prev ? (
            <Link href={`/the-hearth/${prev.slug}`} className="group flex-1 min-w-0 no-underline">
              <span className="block font-hearth-sans text-[14px] tracking-[0.2em] uppercase text-house-stone mb-1">
                <span aria-hidden>←</span> Previous
              </span>
              <span className="block font-hearth-serif text-[19px] leading-snug text-house-black truncate transition-colors group-hover:text-house-gold-ink">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}

          <Link
            href="/the-hearth"
            className="shrink-0 self-center font-hearth-sans text-[14px] tracking-[0.18em] uppercase text-house-black no-underline border border-house-brown/25 px-5 py-2.5 transition-colors hover:text-house-gold-ink hover:border-house-gold"
          >
            The Hearth
          </Link>

          {next ? (
            <Link href={`/the-hearth/${next.slug}`} className="group flex-1 min-w-0 text-right no-underline">
              <span className="block font-hearth-sans text-[14px] tracking-[0.2em] uppercase text-house-stone mb-1">
                Next <span aria-hidden>→</span>
              </span>
              <span className="block font-hearth-serif text-[19px] leading-snug text-house-black truncate transition-colors group-hover:text-house-gold-ink">
                {next.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>

        {/* Post-read signup — captures the reader at peak interest. Cream
            variant matches the Hearth surface; sourcePage carries the slug
            so Klaviyo properties + the welcome event flow can attribute
            which article drove the signup. */}
        <NewsletterInline
          variant="cream"
          sourcePage={`/the-hearth/${slug}`}
          eyebrow="The Hearth"
          headline="Keep reading the House."
          body="A weekly letter from the editors: seasonal notes on the home, the garden, and the craft of looking after a place properly."
        />

        {related.length > 0 ? (
          <aside className="px-[5vw] py-16 border-t border-house-brown/12 bg-house-white">
            <div className="max-w-[1360px] mx-auto">
              <Eyebrow>Keep reading</Eyebrow>
              <h3 className="font-hearth-serif font-medium italic text-[33px] leading-[1.1] mt-3 mb-8 text-house-black">
                More from <em>{article.category}</em>
              </h3>
              <div className="grid md:grid-cols-3 gap-10">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/the-hearth/${a.slug}`}
                    className="group block no-underline"
                  >
                    <Image
                      src={a.image}
                      alt=""
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="w-full h-auto aspect-[4/3] object-cover mb-4"
                    />
                    <div className="font-hearth-sans text-[14px] tracking-[0.22em] uppercase text-house-black mb-2">
                      {a.category}
                    </div>
                    <h4 className="font-hearth-serif font-medium text-[25px] leading-[1.15] text-house-black group-hover:text-house-gold-ink transition-colors duration-[var(--t-base)]">
                      {a.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        ) : null}

        <div className="px-[5vw] py-10 text-center bg-house-white border-t border-house-brown/12">
          <GhostLink href="/the-hearth">All Hearth writing</GhostLink>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}
