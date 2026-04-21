import { sanityFetch } from "./fetch";
import { sanityClient } from "./client";
import type { HearthArticle, PopularItem } from "@/lib/hearth-data";

/**
 * Hearth data layer — Sanity source of truth.
 *
 * Maps the Sanity `article` schema to the existing HearthArticle shape so the
 * magazine components don't need to change. The adapter computes a few fields
 * that the importer doesn't store (short category label, titleEm, read time).
 *
 * The old `src/lib/hearth-data/index.ts` still exists for type definitions
 * and the COLLECTION band content (still hardcoded). If the Sanity query
 * returns nothing (e.g. dataset emptied), we fall back to the local JSON so
 * dev doesn't grind to a halt.
 */

// ---------------------------------------------------------------------------
// GROQ
// ---------------------------------------------------------------------------
const ARTICLE_PROJECTION = /* groq */ `{
  "slug": slug.current,
  title,
  "dek": lede,
  "image": hero.asset->url,
  "imageAlt": hero.alt,
  "categoryLong": category->name,
  "categorySlug": category->slug.current,
  author,
  publishedAt,
  "isPremium": coalesce(isPremium, false),
  "bodyWordCount": length(pt::text(body))
}`;

const journalIndexQuery = /* groq */ `{
  "all": *[_type == "article"] | order(publishedAt desc) ${ARTICLE_PROJECTION}
}`;

const articleBySlugFullQuery = /* groq */ `*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  "dek": lede,
  "image": hero.asset->url,
  "imageAlt": hero.alt,
  body,
  "categoryLong": category->name,
  "categorySlug": category->slug.current,
  author,
  publishedAt,
  "isPremium": coalesce(isPremium, false),
  seo,
  tags
}`;

const allSlugsQuery = /* groq */ `*[_type == "article"].slug.current`;

// ---------------------------------------------------------------------------
// Short category labels (mirrors transform.mjs)
// ---------------------------------------------------------------------------
const SHORT_CATEGORY: Record<string, string> = {
  "COLOUR & MATERIALS": "Palette",
  "DESIGN & ARCHITECTURE": "Architecture",
  "GARDENS & EXTERIORS": "Gardens",
  "HERITAGE & CULTURE": "Heritage",
  "INTERIORS & STYLING": "Interiors",
  "TRENDS & INSPIRATION": "Trends",
};

const shortCategory = (long?: string) =>
  (long && SHORT_CATEGORY[long]) || long || "Essays";

// ---------------------------------------------------------------------------
// titleEm picker (mirrors transform.mjs — keep the two in sync)
// ---------------------------------------------------------------------------
function pickTitleEm(raw: string): string | undefined {
  const title = raw.trim().replace(/[.!?]$/, "");
  const punct = title.match(/^(.+?)(?:\.\s+|\s—\s+|:\s+)(.+)$/);
  if (punct && punct[1].split(/\s+/).length >= 2) return punct[2];

  const words = title.split(/\s+/);
  const connectives = new Set([
    "that",
    "for",
    "with",
    "on",
    "as",
    "of",
    "to",
    "in",
    "by",
  ]);
  for (let i = 3; i < words.length - 1; i++) {
    if (connectives.has(words[i].toLowerCase())) return words.slice(i).join(" ");
  }
  if (words.length >= 6) {
    return words.slice(Math.ceil(words.length * 0.6)).join(" ");
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------
interface RawSanityArticle {
  slug: string;
  title: string;
  dek: string;
  image: string | null;
  imageAlt?: string;
  categoryLong?: string;
  categorySlug?: string;
  author: string;
  publishedAt: string;
  isPremium: boolean;
  bodyWordCount?: number;
  body?: unknown;
  seo?: { title?: string; description?: string; noindex?: boolean };
  tags?: string[];
}

function toHearthArticle(doc: RawSanityArticle): HearthArticle {
  const category = shortCategory(doc.categoryLong);
  const readTime = doc.bodyWordCount
    ? Math.max(3, Math.round(doc.bodyWordCount / 200))
    : undefined;
  return {
    slug: doc.slug,
    title: doc.title,
    titleEm: pickTitleEm(doc.title),
    category,
    categoryLong: doc.categoryLong,
    categorySlug: doc.categorySlug,
    image: doc.image || "/hearth/art-lead.png",
    imageAlt: doc.imageAlt,
    dek: doc.dek,
    author: doc.author,
    publishedAt: doc.publishedAt,
    readTimeMinutes: readTime,
    isPremium: doc.isPremium,
  };
}

// ---------------------------------------------------------------------------
// Public helpers — signatures mirror the old hearth-data exports
// ---------------------------------------------------------------------------
export interface HearthIndexSections {
  hero: HearthArticle;
  secondary: HearthArticle[];
  mainFeed: HearthArticle[];
  popular: PopularItem[];
  moreFeed: HearthArticle[];
  all: HearthArticle[];
}

export async function getHearthIndex(): Promise<HearthIndexSections> {
  const raw = await sanityFetch<{ all: RawSanityArticle[] }>({
    query: journalIndexQuery,
    tags: ["type:article", "type:articleCategory"],
  });
  const all = raw.all.map(toHearthArticle);
  const popular: PopularItem[] = all.slice(10, 15).map((a) => ({
    slug: a.slug,
    tag: a.category,
    title: a.title,
    titleEm: a.titleEm,
    image: a.image,
  }));
  return {
    hero: { ...all[0], flag: "Feature" },
    secondary: all.slice(1, 4),
    mainFeed: all.slice(4, 10),
    popular,
    moreFeed: all.slice(15, 19),
    all,
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  // Called from generateStaticParams at build time — can't use the
  // draft-aware sanityFetch here because draftMode() isn't available
  // outside of request context. Use the plain public client.
  return sanityClient.fetch<string[]>(allSlugsQuery);
}

export type FullArticle = Omit<HearthArticle, "body"> & {
  body?: unknown;
  seo?: { title?: string; description?: string; noindex?: boolean };
  tags?: string[];
};

export async function getArticleBySlug(slug: string): Promise<FullArticle | null> {
  const raw = await sanityFetch<RawSanityArticle | null>({
    query: articleBySlugFullQuery,
    params: { slug },
    tags: [`article:${slug}`, "type:article"],
  });
  if (!raw) return null;
  return { ...toHearthArticle(raw), body: raw.body, seo: raw.seo, tags: raw.tags };
}

export async function relatedArticlesFromSanity(
  slug: string,
  category: string | undefined,
  limit = 3,
): Promise<HearthArticle[]> {
  if (!category) return [];
  const query = /* groq */ `*[_type == "article" && slug.current != $slug && category->name == $category] | order(publishedAt desc)[0...$limit] ${ARTICLE_PROJECTION}`;
  const raw = await sanityFetch<RawSanityArticle[]>({
    query,
    params: { slug, category, limit },
    tags: [`article:${slug}`, "type:article"],
  });
  return raw.map(toHearthArticle);
}

export { shortCategory, pickTitleEm };
