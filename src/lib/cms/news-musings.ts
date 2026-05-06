import { sanityFetch } from "./fetch";
import { sanityClient } from "./client";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * News + Musings + Recipes data layer. Thinner than the Hearth one — no Hearth
 * section split, no categories. Just chronological lists with detail lookups.
 */

export interface NewsListItem {
  slug: string;
  title: string;
  lede: string;
  image: string | null;
  publishedAt: string;
  externalUrl?: string;
}
export interface NewsDetail extends NewsListItem {
  body: PortableTextBlock[];
  imageAlt?: string;
  author: string;
  seo?: { title?: string; description?: string; noindex?: boolean };
}

export interface MusingListItem {
  slug: string;
  title: string;
  lede: string;
  image: string | null;
  publishedAt: string;
  tags?: string[];
}
export interface MusingDetail extends MusingListItem {
  body: PortableTextBlock[];
  imageAlt?: string;
  author: string;
  seo?: { title?: string; description?: string; noindex?: boolean };
}

const newsListQuery = /* groq */ `*[_type == "newsItem"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  publishedAt,
  externalUrl
}`;

const newsBySlugQuery = /* groq */ `*[_type == "newsItem" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  "imageAlt": hero.alt,
  body,
  author,
  externalUrl,
  publishedAt,
  seo
}`;

const allNewsSlugsQuery = /* groq */ `*[_type == "newsItem"].slug.current`;

const musingListQuery = /* groq */ `*[_type == "musing"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  publishedAt,
  tags
}`;

const musingBySlugQuery = /* groq */ `*[_type == "musing" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  "imageAlt": hero.alt,
  body,
  author,
  tags,
  publishedAt,
  seo
}`;

const allMusingSlugsQuery = /* groq */ `*[_type == "musing"].slug.current`;

export async function getNewsList(): Promise<NewsListItem[]> {
  return sanityFetch<NewsListItem[]>({
    query: newsListQuery,
    tags: ["type:newsItem"],
  });
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  return sanityFetch<NewsDetail | null>({
    query: newsBySlugQuery,
    params: { slug },
    tags: [`newsItem:${slug}`, "type:newsItem"],
  });
}

export async function getAllNewsSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(allNewsSlugsQuery);
}

export async function getMusingList(): Promise<MusingListItem[]> {
  return sanityFetch<MusingListItem[]>({
    query: musingListQuery,
    tags: ["type:musing"],
  });
}

export async function getMusingBySlug(slug: string): Promise<MusingDetail | null> {
  return sanityFetch<MusingDetail | null>({
    query: musingBySlugQuery,
    params: { slug },
    tags: [`musing:${slug}`, "type:musing"],
  });
}

export async function getAllMusingSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(allMusingSlugsQuery);
}

/* ------------------------------------------------------------------ */
/*  Recipes                                                           */
/* ------------------------------------------------------------------ */

export interface RecipeListItem {
  slug: string;
  title: string;
  lede: string;
  image: string | null;
  publishedAt: string;
  prepTime?: string;
  cookTime?: string;
  serves?: string;
  season?: string;
  tags?: string[];
}
export interface RecipeDetail extends RecipeListItem {
  body: PortableTextBlock[];
  imageAlt?: string;
  author: string;
  seo?: { title?: string; description?: string; noindex?: boolean };
}

const recipeListQuery = /* groq */ `*[_type == "recipe"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  publishedAt,
  prepTime,
  cookTime,
  serves,
  season,
  tags
}`;

const recipeBySlugQuery = /* groq */ `*[_type == "recipe" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  lede,
  "image": hero.asset->url,
  "imageAlt": hero.alt,
  body,
  author,
  prepTime,
  cookTime,
  serves,
  season,
  tags,
  publishedAt,
  seo
}`;

const allRecipeSlugsQuery = /* groq */ `*[_type == "recipe"].slug.current`;

export async function getRecipeList(): Promise<RecipeListItem[]> {
  return sanityFetch<RecipeListItem[]>({
    query: recipeListQuery,
    tags: ["type:recipe"],
  });
}

export async function getRecipeBySlug(slug: string): Promise<RecipeDetail | null> {
  return sanityFetch<RecipeDetail | null>({
    query: recipeBySlugQuery,
    params: { slug },
    tags: [`recipe:${slug}`, "type:recipe"],
  });
}

export async function getAllRecipeSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(allRecipeSlugsQuery);
}
