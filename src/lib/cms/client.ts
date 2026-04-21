import { createClient } from "next-sanity";
import { env } from "@/lib/env";

/**
 * Public read client. Cached via Next fetch cache + tag-based revalidation.
 * Uses perspective=published by default so drafts never leak.
 */
export const sanityClient = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
  token: env.SANITY_READ_TOKEN,
});

/**
 * Preview client — draft-mode only. Never exposed to anon requests.
 * Callers must be inside draftMode() gate.
 */
export const sanityPreviewClient = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "previewDrafts",
  token: env.SANITY_READ_TOKEN,
});
