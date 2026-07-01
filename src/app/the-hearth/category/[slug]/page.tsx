import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HearthMasthead } from "@/components/hearth/HearthMasthead";
import { HearthCategoryStrip } from "@/components/hearth/HearthCategoryStrip";
import { HearthMainFeed } from "@/components/hearth/HearthMainFeed";
import { HearthFullWidthNewsletter } from "@/components/hearth/HearthFullWidthNewsletter";
import { HearthColophon } from "@/components/hearth/HearthColophon";
import { getHearthByCategory, getActiveCategorySlugs } from "@/lib/cms/hearth";

/**
 * /the-hearth/category/[slug] — articles filtered to one Hearth category.
 * Slug matches the Sanity `articleCategory` slug (e.g. gardens-and-exteriors).
 */

/** "GARDENS & EXTERIORS" -> "Gardens & Exteriors" for headings. */
function titleCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAnd\b/g, "and");
}

export async function generateStaticParams() {
  const slugs = await getActiveCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getHearthByCategory(slug);
  if (!category) return { title: "The Hearth" };
  const label = titleCase(category.name);
  return {
    title: `${label} | The Hearth`,
    description:
      category.description ??
      `${label} from The Hearth, the House of Willow Alexander journal on homes and gardens.`,
  };
}

export default async function HearthCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, articles } = await getHearthByCategory(slug);
  if (!category) notFound();
  const label = titleCase(category.name);

  return (
    <div className="bg-house-white text-house-black">
      <HearthMasthead />
      <HearthCategoryStrip activeSlug={slug} />

      <section className="max-w-[1360px] mx-auto px-[5vw] pt-12 pb-2 text-center">
        <p className="font-hearth-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-dark mb-3">
          The Hearth
        </p>
        <h1 className="font-hearth-serif text-[clamp(32px,4vw,52px)] leading-[1.05] text-house-black">
          {label}
        </h1>
        {category.description ? (
          <p className="mt-4 max-w-[60ch] mx-auto font-hearth-sans text-[16px] leading-[1.6] text-house-brown/70">
            {category.description}
          </p>
        ) : null}
      </section>

      <section className="max-w-[1360px] mx-auto mb-[72px] px-[5vw] pt-8">
        {articles.length ? (
          <HearthMainFeed
            articles={articles}
            heading="In this section"
            emText={label}
            viewAllHref="/the-hearth"
          />
        ) : (
          <p className="py-16 text-center font-hearth-sans text-[16px] text-house-brown/60">
            No articles in this section yet. Please check back soon.
          </p>
        )}
      </section>

      <HearthFullWidthNewsletter />
      <HearthColophon />
    </div>
  );
}
