import Image from "next/image";
import Link from "next/link";
import { HearthTitle } from "./HearthTitle";
import type { HearthArticle } from "@/lib/hearth-data";

/**
 * HearthHeroLead — big image left (4:3, 1.5fr), headline block right (1fr).
 * Per variant-A: Cormorant headlines, Jost labels, "Category / Feature" tag
 * with gold separator slash, byline with italic author.
 *
 * The entire block is a single click target via a wrapping Link, so anywhere
 * on the lead navigates to the article.
 */
export function HearthHeroLead({ article }: { article: HearthArticle }) {
  const href = `/the-hearth/${article.slug}`;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-[1360px] mx-auto my-12 px-[5vw]">
      <Link
        href={href}
        className="group grid md:grid-cols-[1.5fr_1fr] gap-12 items-center text-inherit no-underline"
      >
        <div className="block overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ""}
            width={1600}
            height={1200}
            sizes="(min-width: 1024px) 810px, 100vw"
            className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.01]"
            priority
          />
        </div>

        <div>
          <span className="inline-block mb-[18px] font-hearth-sans text-[12px] tracking-[0.24em] uppercase text-house-black after:content-['_/'] after:text-house-stone after:ml-1">
            {article.categoryLong ?? article.category}
            {article.flag ? (
              <em className="not-italic ml-1.5 font-hearth-serif italic text-[14px] tracking-[0.02em] normal-case text-house-stone">
                {article.flag}
              </em>
            ) : null}
          </span>

          <h1 className="font-hearth-serif font-medium leading-[1.04] tracking-[-0.01em] text-[clamp(42px,4.6vw,68px)] text-house-black mb-[18px] transition-colors duration-[var(--t-base)] ease-out group-hover:text-house-gold-dark">
            <HearthTitle title={article.title} em={article.titleEm} />
          </h1>

          <p className="font-hearth-serif text-[19px] leading-[1.55] text-house-stone mb-[22px]">
            {article.dek}
          </p>

          <p className="font-hearth-sans text-[12px] tracking-[0.14em] uppercase text-house-stone">
            <em className="not-italic font-hearth-serif italic text-[14px] tracking-[0.02em] normal-case text-house-black mr-1.5">
              {article.author}
            </em>
            · {formattedDate}
            {article.readTimeMinutes ? ` · ${article.readTimeMinutes}-minute read` : null}
          </p>
        </div>
      </Link>
    </section>
  );
}
