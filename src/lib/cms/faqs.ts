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

export async function getFaqsByCategory(category: string): Promise<FaqItem[]> {
  if (!servicesReady.sanity) return [];
  try {
    const docs = await sanityFetch<SanityFaq[]>({
      query: faqsByCategoryQuery,
      params: { category },
      tags: ["faq"],
    });
    return docs.map((d) => ({
      id: d._id,
      question: d.question,
      answer: d.answer,
    }));
  } catch (e) {
    console.error("[cms/faqs]", e);
    return [];
  }
}
