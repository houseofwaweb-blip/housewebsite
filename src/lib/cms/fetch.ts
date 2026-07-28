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
    // Webhook-driven freshness: the Sanity webhook (/api/webhooks/sanity) calls
    // revalidateTag() the moment content is published, so pages update instantly
    // on real changes. The time-based revalidate is therefore only a slow safety
    // net for a missed webhook — 1 week, not 1 hour — which keeps ISR writes and
    // regeneration CPU near zero instead of rewriting every CMS page hourly.
    next: { tags, revalidate: preview ? 0 : 604800 },
  });
}
