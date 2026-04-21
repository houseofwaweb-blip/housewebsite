import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { PortableText } from "@/components/cms/PortableText";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/cms/news-musings";

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
    <article className="bg-house-cream text-house-brown">
      <header className="px-[5vw] pt-[12vh] pb-8">
        <div className="max-w-[760px] mx-auto">
          <Eyebrow>The House · News</Eyebrow>
          <h1 className="font-display font-medium text-[clamp(36px,4.8vw,64px)] leading-[1.1] tracking-[-0.01em] mt-4">
            {item.title}
          </h1>
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone mt-6">
            <time dateTime={item.publishedAt}>{date}</time>
            <span className="mx-2">·</span>
            {item.author}
          </p>
          {item.lede ? (
            <p className="font-sans italic text-[19px] leading-[1.55] text-house-stone mt-6 max-w-[60ch]">
              {item.lede}
            </p>
          ) : null}
        </div>
      </header>

      {item.image ? (
        <div className="px-[5vw]">
          <div className="max-w-[1100px] mx-auto">
            <Image
              src={item.image}
              alt={item.imageAlt || item.title}
              width={2200}
              height={1240}
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="w-full h-auto aspect-[16/9] object-cover"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="px-[5vw] py-14">
        <div className="max-w-[720px] mx-auto">
          {item.body?.length ? (
            <div className="font-sans text-[18px] leading-[1.75] text-house-brown/90 [&_p]:mb-5 [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-[clamp(24px,3vw,34px)] [&_h2]:mt-12 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[22px] [&_h3]:mt-10 [&_h3]:mb-3 [&_a]:text-house-gold [&_a]:underline [&_a]:underline-offset-[3px] [&_ul]:my-5 [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_blockquote]:my-8 [&_blockquote]:pl-6 [&_blockquote]:border-l [&_blockquote]:border-house-gold [&_blockquote]:italic">
              <PortableText value={item.body} />
            </div>
          ) : (
            <p className="font-sans italic text-[17px] text-house-stone">
              Coverage coming soon.
            </p>
          )}

          {item.externalUrl ? (
            <div className="mt-10 pt-6 border-t border-house-brown/10">
              <GhostLink href={item.externalUrl} external>
                Read original coverage
              </GhostLink>
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-[5vw] pb-14 text-center border-t border-house-brown/10 pt-10">
        <Link
          href="/news"
          className="font-sans text-[11px] tracking-[0.2em] uppercase no-underline border-b border-house-gold text-house-brown pb-[2px]"
        >
          ← All news
        </Link>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}
