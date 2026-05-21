import { sanityFetch } from "./fetch";
import { pageSectionsQuery } from "./queries";

/**
 * A single CMS-controlled content section.
 * Every field is optional — the component merges with hardcoded defaults.
 */
export interface PageSectionCard {
  label?: string;
  title?: string;
  body?: string;
  value?: string;
  value2?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: string[];
  imageUrl?: string;
  imageAlt?: string;
}

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
  cards?: PageSectionCard[];
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
 *
 * CMS values win when present; undefined/null/empty falls through to the default.
 *
 * The optional `siblingField` arg handles paired fields like headline +
 * headlineEm. If `field` is empty but `siblingField` is set in the same
 * section, the editor explicitly controlled the paired phrase and left this
 * part blank on purpose — suppress the fallback and render empty instead.
 *
 * Without `siblingField`, partial Sanity sections leak the TSX fallback
 * for missing fields, which causes duplication when the editor types the
 * full phrase into one field (e.g. headline) and leaves the accent blank.
 */
export function cms<T>(
  section: PageSectionContent | undefined,
  field: keyof PageSectionContent,
  fallback: T,
  siblingField?: keyof PageSectionContent,
): T {
  const val = section?.[field];
  if (val !== undefined && val !== null && val !== "") return val as unknown as T;
  if (siblingField && section) {
    const sib = section[siblingField];
    if (sib !== undefined && sib !== null && sib !== "") {
      return "" as unknown as T;
    }
  }
  return fallback;
}

/**
 * Merge a CMS card array with a fallback array of typed cards.
 *
 * Each fallback card supplies all its fields (icon/image/etc.); the matching
 * CMS card (by index) overrides any of the editable text fields when present.
 * If Sanity has more cards than the fallback, the extras are appended using
 * only their CMS fields. If Sanity is empty, the fallback is returned untouched.
 */
export function cmsCards<T extends Record<string, unknown>>(
  section: PageSectionContent | undefined,
  fallback: T[],
  mapField: (card: PageSectionCard, base: T | undefined) => T,
): T[] {
  const cards = section?.cards;
  if (!cards || cards.length === 0) return fallback;
  const merged: T[] = [];
  const max = Math.max(cards.length, fallback.length);
  for (let i = 0; i < max; i++) {
    const cmsCard = cards[i];
    const baseCard = fallback[i];
    if (cmsCard) {
      merged.push(mapField(cmsCard, baseCard));
    } else if (baseCard) {
      merged.push(baseCard);
    }
  }
  return merged;
}

/** Pick CMS value or fall back per-field. Used inside cmsCards mappers. */
export function pick<T>(value: unknown, fallback: T): T {
  if (value === undefined || value === null || value === "") return fallback;
  return value as T;
}
