import { sanityFetch } from "./fetch";
import type {
  HomepageV2,
  Pillar,
  PhoneScreen,
  HoWAFeature,
  WorkflowStep,
  Stat,
  PoweredItem,
} from "./homepage-v2";

/**
 * Homepage V3 CMS read.
 * Same shape as v2 plus the new tier-ladder section.
 * Singleton document (id: "homepageV3").
 */

export interface TierCard {
  name: string;
  price: string;
  tagline: string;
  body: string;
  inclusions: string[];
  ctaLabel: string;
  ctaHref: string;
  tone: "quiet" | "active" | "premium";
}

export interface ProtectBlockData {
  label: string;
  headline: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface HomepageV3 extends HomepageV2 {
  // workflow
  workflowEyebrow?: string;
  workflowTitle?: string;
  workflowSub?: string;

  // tiers
  tiersEyebrow?: string;
  tiersTitle: string;
  tiersSub?: string;
  tiers: TierCard[];

  // pillars
  pillarsEyebrow?: string;
  pillarsTitle?: string;
  pillarsSub?: string;

  // protect deep-dive
  protectEyebrow?: string;
  protectTitle?: string;
  protectSub?: string;
  protectBlocks: ProtectBlockData[];
}

const homepageV3Query = /* groq */ `*[_id == "homepageV3"][0]{
  heroEyebrow, heroHeadline, heroLede,
  heroPrimaryCtaLabel, heroPrimaryCtaHref,
  heroSecondaryCtaLabel, heroSecondaryCtaSub, heroSecondaryCtaHref,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  heroOverlayHeading, heroOverlayTagline,

  // (no temperaments in v3 — product-first flow drops it from the homepage)
  "temperamentsTitle": null,
  "temperaments": [],

  howaSubtitle, howaLede, howaLinkLabel, howaLinkHref,
  "howaPhones": howaPhones[]{
    tier,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "hoverImageUrl": hoverImage.asset->url,
    "hoverImageAlt": hoverImage.alt
  },
  "howaFeatures": howaFeatures[]{ icon, heading, body },
  howaCtaLabel, howaCtaHref,

  workflowEyebrow, workflowTitle, workflowSub,
  workflowLeadIcon,
  "workflowSteps": workflowSteps[]{ heading, sub },
  "stats": stats[]{ num, label },

  tiersEyebrow, tiersTitle, tiersSub,
  "tiers": tiers[]{ name, price, tagline, body, inclusions, ctaLabel, ctaHref, tone },

  pillarsEyebrow, pillarsTitle, pillarsSub,
  "pillars": pillars[]{
    name, headline, body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "hoverImageUrl": hoverImage.asset->url,
    "hoverImageAlt": hoverImage.alt,
    "sublinks": sublinks[]{ label, href },
    ctaLabel, ctaHref
  },

  protectEyebrow, protectTitle, protectSub,
  "protectBlocks": protectBlocks[]{
    label, headline, body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    bullets, ctaLabel, ctaHref
  },

  poweredByTitle,
  "poweredByItems": poweredByItems[]{ icon, label },

  finalCtaStatement, finalCtaSub,
  finalCtaPrimaryLabel, finalCtaPrimaryHref,
  finalCtaSecondaryLabel, finalCtaSecondaryHref
}`;

export async function getHomepageV3(): Promise<HomepageV3 | null> {
  return sanityFetch<HomepageV3 | null>({
    query: homepageV3Query,
    tags: ["homepageV3"],
  });
}

export type {
  Pillar, PhoneScreen, HoWAFeature, WorkflowStep, Stat, PoweredItem,
};
