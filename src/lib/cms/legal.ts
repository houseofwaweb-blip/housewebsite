import { sanityFetch } from "./fetch";
import { legalPageBySlugQuery, allLegalPagesQuery } from "./queries";
import { servicesReady } from "@/lib/env";

interface SanityLegalPage {
  title: string;
  slug: string;
  body: unknown[];
  lastUpdated?: string;
}

export async function getLegalPage(slug: string): Promise<SanityLegalPage | null> {
  if (!servicesReady.sanity) return null;
  try {
    return await sanityFetch<SanityLegalPage | null>({
      query: legalPageBySlugQuery,
      params: { slug },
      tags: ["legalPage"],
    });
  } catch (e) {
    console.error("[cms/legal]", e);
    return null;
  }
}

export async function getAllLegalSlugs(): Promise<string[]> {
  if (!servicesReady.sanity) return ["privacy", "terms", "cookies"];
  try {
    const docs = await sanityFetch<Array<{ slug: string }>>({
      query: allLegalPagesQuery,
      tags: ["legalPage"],
    });
    return docs.map((d) => d.slug);
  } catch {
    return ["privacy", "terms", "cookies"];
  }
}
