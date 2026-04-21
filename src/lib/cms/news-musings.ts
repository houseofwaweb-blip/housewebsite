import { sanityFetch } from "./fetch";
import { sanityClient } from "./client";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * News + Musings data layer. Thinner than the Hearth one — no Hearth section
 * split, no categories. Just chronological lists with detail lookups.
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
