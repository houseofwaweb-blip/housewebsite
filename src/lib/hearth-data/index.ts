/**
 * Hearth dataset — sourced from the live WordPress site
 * (https://willowalexander.co.uk/wp-json/wp/v2/howa_living) via the
 * transform script at ./wp-import/transform.mjs.
 *
 * The transformer writes ./wp-import/articles.json (chronological) and
 * ./wp-import/sections.json (pre-split into layout slots). Both are JSON
 * so Next's build can statically inline them.
 *
 * When we migrate to Sanity, `import ... from './wp-import/articles.json'`
 * becomes `await sanityFetch(...)` and every component keeps its prop shape.
 */

import articlesJson from "./wp-import/articles.json";
import sectionsJson from "./wp-import/sections.json";

export interface HearthArticle {
  slug: string;
  title: string;
  titleEm?: string;
  category: string;
  categoryLong?: string;
  categorySlug?: string;
  flag?: "Feature" | "HoWA+";
  image: string;
  imageAlt?: string;
  dek: string;
  author: string;
  publishedAt: string;
  readTimeMinutes?: number;
  /** Raw HTML body from WordPress. Sanitised at render time. */
  body?: string;
  isPremium?: boolean;
  wpId?: number;
}

export interface PopularItem {
  slug: string;
  tag: string;
  title: string;
  titleEm?: string;
  image: string;
}

// Full chronological list — used for archive, [slug] lookup, related posts.
export const ALL_ARTICLES: HearthArticle[] = articlesJson as HearthArticle[];

// Pre-split sections for the index page layout.
const sections = sectionsJson as {
  hero: HearthArticle;
  secondary: HearthArticle[];
  mainFeed: HearthArticle[];
  popular: PopularItem[];
  moreFeed: HearthArticle[];
};

export const HERO: HearthArticle = { ...sections.hero, flag: "Feature" };
export const SECONDARY_LEADS: HearthArticle[] = sections.secondary;
export const MAIN_FEED: HearthArticle[] = sections.mainFeed;
export const POPULAR: PopularItem[] = sections.popular;
export const MORE_FEED: HearthArticle[] = sections.moreFeed;

// Collection band — curated editorial, independent of chronological feed.
export const COLLECTION = {
  season: "Spring MMXXVI",
  title: "A spring collection",
  titleEm: "spring",
  body: "Twelve dispatches, one seasonal hand. Essays, photo notes, and a few recipes from the Hearth Collection — published weekly through April and May.",
  ctaLabel: "Explore the Collection",
  ctaHref: "/journal/collection/spring-2026",
  big: ALL_ARTICLES[0]?.image ?? "/hearth/art-lead.png",
  stackA: ALL_ARTICLES[1]?.image ?? "/hearth/art-sanctuary.png",
  stackB: ALL_ARTICLES[2]?.image ?? "/hearth/art-patina.png",
};

// Derived from the WP taxonomies we actually saw in the import.
export const CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "interiors-styling", label: "Interiors" },
  { slug: "design-architecture", label: "Architecture" },
  { slug: "gardens-exteriors", label: "Gardens" },
  { slug: "colour-materials", label: "Palette" },
  { slug: "heritage-culture", label: "Heritage" },
  { slug: "trends-inspiration", label: "Trends" },
];

export function findArticle(slug: string): HearthArticle | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 3): HearthArticle[] {
  const current = findArticle(slug);
  if (!current) return [];
  return ALL_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  ).slice(0, limit);
}
