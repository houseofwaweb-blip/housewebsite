/**
 * JSON-LD helpers — one component per schema.org type we emit.
 * Per Next.js 16 docs, render <script type="application/ld+json"> with the
 * stringified JSON, scrubbing `<` → `\u003c` to prevent XSS.
 *
 * Reference: DESIGN.md Part J.1–J.2 (site-wide + per-template schemas)
 */
import { env } from "@/lib/env";

function renderLd(data: Record<string, unknown>) {
  const safe = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

/** Site-wide Organization schema. Rendered in root layout. */
export function OrganizationJsonLd() {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}#organization`,
    name: "House of HoWA",
    alternateName: ["HoWA", "The House"],
    url: base,
    logo: `${base}/brand/logo-organization.png`,
    description:
      "A modern British House for the care, design and intelligence of home and garden. Design, care, protection, and curated commerce, connected by HoWA.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14 Willow Lane",
        addressLocality: "Notting Hill",
        addressRegion: "London",
        postalCode: "W11",
        addressCountry: "GB",
      },
    },
    sameAs: [
      "https://instagram.com/howa.house",
      "https://instagram.com/willowalexandergardens",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: env.CONTACT_INBOX_DEFAULT,
      availableLanguage: "en",
    },
  });
}

/** Site-wide WebSite schema with SearchAction — enables sitelinks search box. */
export function WebSiteJsonLd() {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}#website`,
    url: base,
    name: "House of HoWA",
    publisher: { "@id": `${base}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-GB",
  });
}

/** BreadcrumbList schema from a segment array. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; href: string }>;
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.href}`,
    })),
  });
}

/** Article schema for Hearth pieces. Handles the gated (Housekeeper) case per DESIGN J.2. */
export function ArticleJsonLd({
  title,
  description,
  image,
  authorName,
  authorUrl,
  datePublished,
  dateModified,
  wordCount,
  section,
  url,
  gated,
}: {
  title: string;
  description: string;
  image: string;
  authorName: string;
  authorUrl?: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
  section: string;
  url: string;
  gated?: boolean;
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: { "@id": `${base}#organization` },
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(wordCount ? { wordCount } : {}),
    articleSection: section,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "Periodical",
      name: "The Hearth",
      publisher: { "@id": `${base}#organization` },
    },
  };

  // Paywall signal for gated articles — DESIGN.md Part J.2
  // "Google flexible sampling": signal that part of the content is paid
  // without appearing to cloak content from crawlers.
  if (gated) {
    article.isAccessibleForFree = false;
    article.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".paywall-hidden",
    };
  }

  return renderLd(article);
}

/**
 * Service schema for /services/[slug]. Surfaces the offering in Google's
 * Service rich result and connects it to the Organization. `areaServed`
 * defaults to "London" — the audit (PLAN.md §15 finding O11) flagged
 * geo-coverage as a search-fit driver for the 4 launch services.
 */
export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType,
  image,
  priceRange,
  areaServed = "London",
}: {
  name: string;
  description: string;
  url: string;
  /** e.g. "Cleaning", "Gardening" — used for type categorisation. */
  serviceType: string;
  image?: string;
  /** Free-form price hint (e.g. "£90+") for the search result snippet. */
  priceRange?: string;
  areaServed?: string;
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: { "@id": `${base}#organization` },
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
    ...(image ? { image } : {}),
    ...(priceRange ? { offers: { "@type": "Offer", priceCurrency: "GBP", price: priceRange } } : {}),
  });
}

/**
 * LocalBusiness schema for /partners/[slug] pages.
 *
 * HoWA is a tech platform that connects householders to vetted local
 * providers — it is not itself a service business, so LocalBusiness on
 * the HoWA brand surface would be misleading (and Google rightly
 * down-weights mismatched entity claims). The partner profile pages
 * are the only legitimate place for a LocalBusiness mark-up, because
 * they represent a real local business (Willow Alexander Gardens,
 * Delve Interiors, etc.).
 *
 * Pass `serviceType` so Google can map the partner to the correct
 * vertical (LocalBusiness has many subclasses; we use the generic
 * LocalBusiness + a `knowsAbout` field rather than picking subclasses
 * one at a time, which keeps the helper simple at small SEO cost).
 */
export function PartnerLocalBusinessJsonLd({
  name,
  description,
  url,
  image,
  telephone,
  streetAddress,
  addressLocality,
  postalCode,
  serviceType,
  areaServed = ["London"],
  priceRange = "££££",
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  /** e.g. "Garden design", "Interior design" */
  serviceType: string;
  areaServed?: string[];
  priceRange?: string;
}) {
  return renderLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    ...(image ? { image } : {}),
    ...(telephone ? { telephone } : {}),
    knowsAbout: serviceType,
    priceRange,
    ...(streetAddress || addressLocality || postalCode
      ? {
          address: {
            "@type": "PostalAddress",
            ...(streetAddress ? { streetAddress } : {}),
            ...(addressLocality ? { addressLocality } : {}),
            ...(postalCode ? { postalCode } : {}),
            addressCountry: "GB",
          },
        }
      : {}),
    areaServed: areaServed.map((n) => ({ "@type": "City", name: n })),
  });
}

/**
 * SoftwareApplication schema for /howa and /howa/plans.
 *
 * The HoWA Product (companion diagnostic, home record, member dashboard,
 * billing) is genuine software — not a service — so this is the correct
 * schema for the HoWA brand surface. SaaS pricing is conveyed via
 * `offers` so Google can surface the plan price in rich results.
 */
export function SoftwareApplicationJsonLd({
  url,
  monthlyPriceGBP,
}: {
  url: string;
  /** e.g. 16.99 for the Housekeeper plan. Pass undefined for the marketing landing. */
  monthlyPriceGBP?: number;
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HoWA",
    alternateName: "House of HoWA · HoWA",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web, iOS, Android",
    url,
    publisher: { "@id": `${base}#organization` },
    ...(monthlyPriceGBP !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: monthlyPriceGBP.toFixed(2),
            priceCurrency: "GBP",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: monthlyPriceGBP.toFixed(2),
              priceCurrency: "GBP",
              billingDuration: "P1M",
              unitText: "month",
            },
          },
        }
      : {}),
  });
}

/**
 * FAQPage schema for FAQ blocks on commercial pages. Body strings are
 * treated as HTML by Google's parser — callers should pre-sanitise any
 * rich text before passing in.
 */
export function FaqJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return renderLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  });
}

/**
 * Product schema for /shop/[handle]. Required fields for Google Shopping +
 * organic product rich results: name, image, offers (price + availability +
 * currency). `aggregateRating` and `review` are intentionally left to the
 * caller — we don't fake reviews and Trustpilot import isn't wired yet.
 */
export function ProductJsonLd({
  name,
  description,
  image,
  url,
  sku,
  brand = "House of HoWA",
  price,
  priceCurrency = "GBP",
  availability,
}: {
  name: string;
  description: string;
  /** One or more image URLs. Google prefers at least one square image. */
  image: string | string[];
  url: string;
  sku?: string;
  brand?: string;
  /** Numeric price. Pass as a number for accurate decimal handling. */
  price: number;
  priceCurrency?: string;
  /** schema.org availability enum. Map Shopify availableForSale → InStock/OutOfStock. */
  availability: "InStock" | "OutOfStock" | "PreOrder";
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    ...(sku ? { sku } : {}),
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency,
      price: price.toFixed(2),
      availability: `https://schema.org/${availability}`,
      seller: { "@id": `${base}#organization` },
    },
  });
}
