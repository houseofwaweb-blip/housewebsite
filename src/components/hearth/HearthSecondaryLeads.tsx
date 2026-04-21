import Image from "next/image";
import Link from "next/link";
import { HearthTitle } from "./HearthTitle";
import type { HearthArticle } from "@/lib/hearth-data";

/**
 * HearthSecondaryLeads — 3 cards below the hero lead.
 * Playground hover pattern: whole card is one link; on hover the card lifts
 * (-4px) and drops a soft shadow, the headline shifts to gold. Card is a
 * flex column with `mt-auto` on the byline so heights align.
 */
export function HearthSecondaryLeads({ articles }: { articles: HearthArticle[] }) {
  return (
    <section className="max-w-[1360px] mx-auto mb-[72px] px-[5vw] border-t border-house-brown/12 pt-12">
      <div className="grid md:grid-cols-3 gap-10">
        {articles.map((a) => (
          <SecondaryArticle key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

function SecondaryArticle({ article }: { article: HearthArticle }) {
  const href = `/journal/${article.slug}`;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex flex-col h-full no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-0.5"
      >
        <div className="mb-[18px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ""}
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="w-full h-auto aspect-[3/2] object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
          />
        </div>
        <span className="inline-block mb-[10px] font-hearth-sans text-[10px] tracking-[0.22em] uppercase text-house-black">
          {article.categoryLong ?? article.category}
          {article.flag ? (
            <em className="not-italic ml-1.5 font-hearth-serif italic text-[12px] text-house-stone tracking-normal normal-case">
              {article.flag}
            </em>
          ) : null}
        </span>
        <h2 className="font-hearth-serif font-medium text-[26px] leading-[1.12] tracking-[-0.005em] text-house-black mb-[10px] transition-colors duration-[var(--t-slow)] ease-out group-hover:text-house-gold">
          <HearthTitle title={article.title} em={article.titleEm} />
        </h2>
        <p className="font-hearth-serif italic text-[15px] leading-[1.5] text-house-stone mb-[10px]">
          {article.dek}
        </p>
        <p className="mt-auto font-hearth-sans text-[10px] tracking-[0.14em] uppercase text-house-stone">
          <em className="not-italic font-hearth-serif italic text-[12px] text-house-black normal-case tracking-normal mr-1">
            {article.author}
          </em>
          · {formattedDate}
        </p>
      </Link>
    </article>
  );
}
