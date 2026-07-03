import { createClient } from "next-sanity";
import { env } from "@/lib/env";

/**
 * Placeholder projectId used only when Sanity isn't configured (e.g. a CI
 * `next build` without secrets). `createClient()` throws on a missing/empty
 * projectId, which would break the build at module-import time — even though
 * every read is guarded by `servicesReady.sanity` / `env.SANITY_PROJECT_ID`
 * and never actually fetches when unconfigured. The placeholder lets the
 * client construct; it is never used to make a request.
 */
const projectId =
  env.SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

/**
 * Public read client. Cached via Next fetch cache + tag-based revalidation.
 * Uses perspective=published by default so drafts never leak.
 */
export const sanityClient = createClient({
  projectId,
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
  projectId,
  dataset: env.SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: false,
  perspective: "previewDrafts",
  token: env.SANITY_READ_TOKEN,
});
