import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { getNewsList } from "@/lib/cms/news-musings";

export const metadata = {
  title: "News",
  description:
    "Press, recognition, and announcements from the House of Willow Alexander.",
};

export default async function NewsIndexPage() {
  const items = await getNewsList();

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-[12vh] pb-10 border-b border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <Eyebrow>The House · News</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Announcements &amp; <em>press</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[62ch]">
            Awards, recognition, recent features, and the occasional note from
            the House. Updated as things happen.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="px-[5vw] py-12">
        <div className="max-w-[960px] mx-auto flex flex-col">
          {items.map((item, i) => {
            const date = new Date(item.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            return (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className={`group grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-6 md:gap-10 items-start py-7 border-t border-house-brown/10 ${
                  i === items.length - 1 ? "border-b" : ""
                } no-underline hover:bg-house-cream-dark/40 transition-colors duration-[var(--t-base)] ease-out px-0 md:px-4`}
              >
                <time
                  dateTime={item.publishedAt}
                  className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-stone pt-1"
                >
                  {date}
                </time>
                <div>
                  <h2 className="font-display font-medium text-[22px] md:text-[24px] leading-[1.25] text-house-brown group-hover:text-house-gold transition-colors duration-[var(--t-base)] ease-out mb-2">
                    {item.title}
                  </h2>
                  {item.lede ? (
                    <p className="font-sans italic text-[15px] leading-[1.55] text-house-stone max-w-[60ch]">
                      {item.lede}
                    </p>
                  ) : null}
                </div>
                {item.image ? (
                  <div className="hidden md:block relative w-[180px] h-[120px] shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="hidden md:block w-[180px]" />
                )}
              </Link>
            );
          })}
          {items.length === 0 ? (
            <p className="font-sans italic text-[17px] text-house-stone py-10 text-center">
              No news yet — please check back soon.
            </p>
          ) : null}
        </div>
      </section>
    </article>
  );
}
