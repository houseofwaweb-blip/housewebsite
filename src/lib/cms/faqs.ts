import { sanityFetch } from "./fetch";
import { faqsByCategoryQuery } from "./queries";
import { servicesReady } from "@/lib/env";

interface SanityFaq {
  _id: string;
  question: string;
  answer: unknown[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: unknown[];
}

/**
 * Terms the directive retires. An FAQ carrying one is stale content selling a
 * product or a claim the House no longer stands behind.
 *
 * This exists because FAQ documents are NOT covered by CMS_SECTIONS_OVERLAY:
 * they are read straight from Sanity with no in-repo fallback to fall back to.
 * A Sanity audit found four live examples, one of them serious: faq.howa-savings
 * published "Typically 10-15% off service bookings vs calling direct, plus 10%
 * off everything in the House shop" — the exact universal discount claim STEP 09I
 * required removing, still being served after it was deleted from the code.
 *
 * Filtering at the CMS boundary rather than editing the documents is deliberate:
 * Sanity is one dataset shared with production, and this branch must not change
 * the live site. A retired FAQ is dropped rather than shown; the documents
 * themselves still need reconciling at the launch gate.
 */
const RETIRED_IN_FAQS = [
  "assistant",
  "howa+",
  "steward plan",
  "house membership",
  "marketplace",
  "10% off",
  "10-15%",
  "house health score",
  "howa approved",
];

function isNotRetired(doc: SanityFaq): boolean {
  const blob = JSON.stringify(doc).toLowerCase();
  const hit = RETIRED_IN_FAQS.find((t) => blob.includes(t));
  if (hit) {
    console.warn(`[cms/faqs] dropped ${doc._id}: retired term "${hit}"`);
    return false;
  }
  return true;
}

export async function getFaqsByCategory(category: string): Promise<FaqItem[]> {
  if (!servicesReady.sanity) return [];
  try {
    const docs = await sanityFetch<SanityFaq[]>({
      query: faqsByCategoryQuery,
      params: { category },
      tags: ["faq"],
    });
    return docs
      .filter(isNotRetired)
      .map((d) => ({
        id: d._id,
        question: d.question,
        answer: d.answer,
      }));
  } catch (e) {
    console.error("[cms/faqs]", e);
    return [];
  }
}
