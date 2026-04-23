import { sanityFetch } from "./fetch";
import { pageSectionsQuery } from "./queries";

/**
 * A single CMS-controlled content section.
 * Every field is optional — the component merges with hardcoded defaults.
 */
export interface PageSectionContent {
  section: string;
  eyebrow?: string;
  headline?: string;
  headlineEm?: string;
  subheadline?: string;
  body?: string;
  body2?: string;
  items?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  cta2Label?: string;
  cta2Href?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
}

/**
 * Fetch all sections for a page. Returns a Map keyed by section name
 * for O(1) lookup. Falls back to empty map on error.
 *
 * Usage:
 *   const cms = await getPageSections("homepage");
 *   const hero = cms.get("hero");
 *   const headline = hero?.headline ?? "Hardcoded fallback";
 */
export async function getPageSections(
  page: string,
): Promise<Map<string, PageSectionContent>> {
  try {
    const sections = await sanityFetch<PageSectionContent[]>({
      query: pageSectionsQuery,
      params: { page },
      tags: [`page:${page}`],
    });
    const map = new Map<string, PageSectionContent>();
    for (const s of sections) {
      map.set(s.section, s);
    }
    return map;
  } catch {
    return new Map();
  }
}

/**
 * Helper to merge CMS content with hardcoded defaults.
 * CMS values win when present; undefined/null falls through to the default.
 */
export function cms<T>(
  section: PageSectionContent | undefined,
  field: keyof PageSectionContent,
  fallback: T,
): T {
  const val = section?.[field];
  if (val === undefined || val === null || val === "") return fallback;
  return val as unknown as T;
}
