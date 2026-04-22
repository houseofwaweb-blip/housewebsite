import { sanityFetch } from "./fetch";
import { allServicesQuery, serviceBySlugQuery, servicePackagesQuery } from "./queries";
import { servicesReady } from "@/lib/env";
import { SERVICES, SERVICE_ORDER, type Service, type ServiceSlug } from "@/lib/services-data";

interface SanityService {
  _id: string;
  slug: string;
  name: string;
  lede: string;
  headline: string;
  eyebrow: string;
  recurring: boolean;
  availableAreas: string[];
  included: string[];
  howItWorks: string[];
  order: number;
}

interface SanityPackage {
  _id: string;
  title: string;
  slug: string;
  tier: string;
  price: string;
  bestFor: string;
  inclusions: string[];
  order: number;
}

export async function getAllServices(): Promise<Service[]> {
  if (servicesReady.sanity) {
    try {
      const docs = await sanityFetch<SanityService[]>({
        query: allServicesQuery,
        tags: ["service"],
      });
      if (docs.length > 0) {
        return docs.map((d) => sanityToService(d));
      }
    } catch (e) { console.error("[cms/services]", e); }
  }
  return SERVICE_ORDER.map((slug) => SERVICES[slug]);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  if (servicesReady.sanity) {
    try {
      const doc = await sanityFetch<SanityService | null>({
        query: serviceBySlugQuery,
        params: { slug },
        tags: ["service"],
      });
      if (doc) {
        const packages = await sanityFetch<SanityPackage[]>({
          query: servicePackagesQuery,
          params: { serviceId: doc._id },
          tags: ["servicePackage"],
        });
        return sanityToService(doc, packages);
      }
    } catch (e) { console.error("[cms/services]", e); }
  }
  return SERVICES[slug as ServiceSlug];
}

function sanityToService(doc: SanityService, packages?: SanityPackage[]): Service {
  const fallback = SERVICES[doc.slug as ServiceSlug];
  return {
    slug: doc.slug as ServiceSlug,
    name: doc.name,
    lede: doc.lede,
    eyebrow: doc.eyebrow || fallback?.eyebrow || "",
    headline: doc.headline || fallback?.headline || "",
    sections: {
      included: doc.included || fallback?.sections?.included || [],
      how: doc.howItWorks || fallback?.sections?.how || [],
    },
    recurring: doc.recurring ?? fallback?.recurring ?? false,
    availableAreas: doc.availableAreas || fallback?.availableAreas || [],
    packages: packages
      ? packages.map((p) => ({
          slug: p.slug,
          name: p.title,
          tier: p.tier as "one-off" | "care" | "steward",
          price: p.price,
          bestFor: p.bestFor,
          inclusions: p.inclusions,
          cta: (p.tier === "steward" ? "waitlist" : "bookNow") as "bookNow" | "quoteEntry" | "waitlist",
        }))
      : fallback?.packages || [],
    subServices: fallback?.subServices || [],
    faq: fallback?.faq || [],
    trustBadges: fallback?.trustBadges || [],
  };
}
