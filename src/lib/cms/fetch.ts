import { draftMode } from "next/headers";
import { sanityClient, sanityPreviewClient } from "./client";

/**
 * Server-only Sanity fetch. Tag-scoped via Next fetch cache.
 * In draft mode, bypasses CDN and pulls drafts.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const { isEnabled: preview } = await draftMode();
  const client = preview ? sanityPreviewClient : sanityClient;
  return client.fetch<T>(query, params, {
    cache: preview ? "no-store" : "force-cache",
    // 1-hour safety net (was 1 week). The Sanity webhook revalidates by tag for
    // instant updates; this bounds how long a CMS change can lag if the webhook
    // doesn't fire, so featuring an article / adding content shows within the
    // hour instead of being force-cached for a week.
    next: { tags, revalidate: preview ? 0 : 3600 },
  });
}
