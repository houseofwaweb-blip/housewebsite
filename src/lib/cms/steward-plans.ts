import { sanityFetch } from "./fetch";
import { sanityClient } from "./client";
import { stewardPlansQuery } from "./queries";
import { servicesReady } from "@/lib/env";
import { PLANS, HOME_GARDEN_PLANS, APARTMENT_PLANS, type StewardPlan } from "@/lib/steward-data";

export async function getAllPlanSlugs(): Promise<string[]> {
  if (servicesReady.sanity) {
    try {
      return await sanityClient.fetch<string[]>(`*[_type == "servicePackage" && _id match "stewardPlan.*"].slug.current`);
    } catch (e) { console.error("[cms/steward-plans]", e); }
  }
  return PLANS.map(p => p.slug);
}

interface SanityPlan {
  _id: string;
  title: string;
  slug: string;
  tier: string;
  price: string;
  bestFor: string;
  inclusions: string[];
  category: string;
  featured: boolean;
  order: number;
}

export async function getStewardPlans(): Promise<StewardPlan[]> {
  if (servicesReady.sanity) {
    try {
      const docs = await sanityFetch<SanityPlan[]>({
        query: stewardPlansQuery,
        tags: ["servicePackage"],
      });
      if (docs.length > 0) {
        return docs.map(sanityToPlan);
      }
    } catch (e) { console.error("[cms/steward-plans]", e); }
  }
  return PLANS;
}

export async function getHomeGardenPlans(): Promise<StewardPlan[]> {
  const plans = await getStewardPlans();
  return plans.filter((p) => p.category === "home-garden");
}

export async function getApartmentPlans(): Promise<StewardPlan[]> {
  const plans = await getStewardPlans();
  return plans.filter((p) => p.category === "apartment");
}

function sanityToPlan(doc: SanityPlan): StewardPlan {
  const priceNum = parseInt(doc.price.replace(/[^0-9]/g, ""), 10) || 0;
  return {
    slug: doc.slug,
    name: doc.title,
    category: doc.category as "home-garden" | "apartment",
    categoryLabel: doc.category === "home-garden" ? "Home & Garden+" : "Apartment+",
    tier: doc.tier,
    price: priceNum,
    priceLabel: `£${priceNum}`,
    featured: doc.featured,
    image: "",
    inclusions: doc.inclusions,
    lede: doc.bestFor,
    body: "",
  };
}
