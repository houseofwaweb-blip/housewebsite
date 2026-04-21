import Image from "next/image";
import Link from "next/link";
import { HearthTitle } from "./HearthTitle";
import type { HearthArticle } from "@/lib/hearth-data";

/**
 * HearthMainFeed — 2-column grid, 6 articles.
 * Playground card hover: -4px lift, soft shadow, headline → gold.
 * Card is a single link, flex-col, dek pinned at the bottom.
 */
export function HearthMainFeed({
  articles,
  heading,
  emText,
  viewAllHref = "/journal/archive",
}: {
  articles: HearthArticle[];
  heading: string;
  emText?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="main-feed">
      <SectionHead heading={heading} emText={emText} viewAllHref={viewAllHref} />
      <div className="grid md:grid-cols-2 gap-x-7 gap-y-9">
        {articles.map((a) => (
          <FeedArticle key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}

function FeedArticle({ article }: { article: HearthArticle }) {
  const href = `/journal/${article.slug}`;
  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex flex-col h-full no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5"
      >
        <div className="mb-3.5 overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ""}
            width={1200}
            height={900}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="w-full h-auto aspect-[4/3] object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
          />
        </div>
        <span className="inline-block mb-2 font-hearth-sans text-[10px] tracking-[0.22em] uppercase text-house-black">
          {article.categoryLong ?? article.category}
          {article.isPremium ? (
            <span className="ml-1.5 text-house-gold text-[9px] tracking-[0.22em] before:content-['◆'] before:text-[8px] before:mr-[2px]">
              HoWA+
            </span>
          ) : null}
        </span>
        <h4 className="font-hearth-serif font-medium text-[22px] leading-[1.15] tracking-[-0.005em] text-house-black mb-2 transition-colors duration-[var(--t-slow)] ease-out group-hover:text-house-gold">
          <HearthTitle title={article.title} em={article.titleEm} />
        </h4>
        <p className="mt-auto font-hearth-serif italic text-[14px] leading-[1.5] text-house-stone">
          {article.dek}
        </p>
      </Link>
    </article>
  );
}

export function SectionHead({
  heading,
  emText,
  viewAllHref,
}: {
  heading: string;
  emText?: string;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-7">
      <h3 className="font-hearth-serif italic font-medium text-[30px] leading-[1.1] tracking-[-0.005em] text-house-black">
        {heading}
        {emText ? <em className="italic text-house-stone"> {emText}</em> : null}
      </h3>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="font-hearth-sans text-[10px] tracking-[0.2em] uppercase text-house-black no-underline border-b border-house-gold pb-[3px]"
        >
          View all →
        </Link>
      ) : null}
    </div>
  );
}
