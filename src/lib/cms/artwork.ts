import { sanityFetch } from "./fetch";
import { artworkPageQuery } from "./queries";

/**
 * Editable shape of /the-house/artwork. Every field is optional —
 * the page merges with hardcoded defaults so it always renders.
 */
export interface ArtworkChapterContent {
  roman?: string;
  kicker?: string;
  headline?: string;
  body?: string[];
  pullQuote?: string;
}

export interface ArtworkPageContent {
  heroEyebrow?: string;
  heroTitle?: string;
  heroTitleEm?: string;
  heroLede?: string;
  heroScrollCue?: string;
  chapters?: ArtworkChapterContent[];
  closingKicker?: string;
  closingStatement?: string;
  closingStatementEm?: string;
  closingCtaPrimary?: string;
  closingCtaPrimaryHref?: string;
  closingCtaSecondary?: string;
  closingCtaSecondaryHref?: string;
  tagline?: string;
  taglineEm?: string;
}

export async function getArtworkPage(): Promise<ArtworkPageContent | null> {
  try {
    return await sanityFetch<ArtworkPageContent | null>({
      query: artworkPageQuery,
      tags: ["artworkPage"],
    });
  } catch {
    return null;
  }
}
