import { sanityFetch } from "./fetch";
import { newsletterBlockByPlacementQuery } from "./queries";
import type { NewsletterBlockContent } from "@/components/marketing/NewsletterInline";

/**
 * Fetch newsletter block content from Sanity by placement slug.
 * Returns null if no document exists (component uses hardcoded fallbacks).
 */
export async function getNewsletterBlock(
  placement: string,
): Promise<NewsletterBlockContent | null> {
  try {
    const data = await sanityFetch<NewsletterBlockContent | null>({
      query: newsletterBlockByPlacementQuery,
      params: { placement },
      tags: [`newsletter:${placement}`],
    });
    return data;
  } catch {
    return null;
  }
}
