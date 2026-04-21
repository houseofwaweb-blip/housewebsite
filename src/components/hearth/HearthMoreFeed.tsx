import Image from "next/image";
import Link from "next/link";
import { HearthTitle } from "./HearthTitle";
import { SectionHead } from "./HearthMainFeed";
import type { HearthArticle } from "@/lib/hearth-data";

/**
 * HearthMoreFeed — 4-column portrait gallery.
 * Same Playground card hover pattern as the main feed: single link wrap,
 * -4px lift + shadow, headline → gold, byline locked to the card bottom.
 */
export function HearthMoreFeed({
  articles,
  heading = "More",
  emText = "from the studios",
  viewAllHref = "/journal/archive",
}: {
  articles: HearthArticle[];
  heading?: string;
  emText?: string;
  viewAllHref?: string;
}) {
  return (
    <section className="max-w-[1360px] mx-auto mt-12 mb-[72px] px-[5vw]">
      <SectionHead heading={heading} emText={emText} viewAllHref={viewAllHref} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-8">
        {articles.map((a) => (
          <MoreArticle key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

function MoreArticle({ article }: { article: HearthArticle }) {
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
        <div className="mb-3.5 overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ""}
            width={900}
            height={1125}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="w-full h-auto aspect-[4/5] object-cover transition-all duration-[var(--t-xslow)] ease-out group-hover:scale-[1.02]"
          />
        </div>
        <span className="block mb-2 font-hearth-sans text-[10px] tracking-[0.22em] uppercase text-house-black">
          {article.categoryLong ?? article.category}
        </span>
        <h4 className="font-hearth-serif font-medium text-[19px] leading-[1.15] tracking-[-0.005em] text-house-black mb-1.5 transition-colors duration-[var(--t-slow)] ease-out group-hover:text-house-gold">
          <HearthTitle title={article.title} em={article.titleEm} />
        </h4>
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
