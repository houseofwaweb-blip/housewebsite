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
    name: "House of Willow Alexander",
    // HoWA is a distinct business (a defined partnership), not an alternate name
    // for the House, so it is not listed here (final September brief §4).
    alternateName: ["The House"],
    url: base,
    logo: `${base}/brand/logo-organization.png`,
    description:
      "A modern British House for the care, design and intelligence of home and garden. Design, care, protection, and curated commerce, connected by HoWA.",
    // Social profiles kept in sync with the footer's links (the House's own
    // accounts). HoWA is a distinct business, so its handle is not listed here.
    sameAs: [
      "https://www.instagram.com/world_of_willowalexander/",
      "https://www.facebook.com/HouseOfWillowAlexander",
      "https://www.youtube.com/@HouseOfWillowAlexander",
    ],
    telephone: "+44 800 047 8738",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+44 800 047 8738",
      email: "shop@willowalexander.co.uk",
      availableLanguage: "en",
    },
    // Trading address — must match Merchant Center's business info exactly
    // (Google Shopping brief, Task 5, amended). The registered office (12
    // Hatherley Road) stays in the footer's company statement.
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parker House, 5 Powerscroft Road",
      addressLocality: "Sidcup",
      postalCode: "DA14 5DT",
      addressCountry: "GB",
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
    name: "House of Willow Alexander",
    publisher: { "@id": `${base}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-GB",
  });
}

/**
 * LocalBusiness (HomeAndConstructionBusiness subtype) for the House's own home
 * and garden services. Gives service pages a local-business rich result with
 * NAP + areaServed and links back to the Organization. Audit #15: no
 * LocalBusiness existed anywhere. Render one per service page.
 */
export function HomeServiceBusinessJsonLd({
  areaServed = ["London", "Kent"],
}: {
  areaServed?: string[];
} = {}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return renderLd({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${base}#localbusiness`,
    name: "House of Willow Alexander",
    parentOrganization: { "@id": `${base}#organization` },
    url: base,
    logo: `${base}/brand/logo-organization.png`,
    image: `${base}/og/default.jpg`,
    telephone: "+44 800 047 8738",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parker House, 5 Powerscroft Road",
      addressLocality: "Sidcup",
      postalCode: "DA14 5DT",
      addressCountry: "GB",
    },
    areaServed: areaServed.map((n) => ({ "@type": "City", name: n })),
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
    alternateName: "House of Willow Alexander · HoWA",
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
type SchemaAvailability = "InStock" | "OutOfStock" | "PreOrder";
type OfferInput = {
  price: number;
  url: string;
  availability: SchemaAvailability;
  sku?: string;
  gtin?: string;
};

/**
 * Shipping label for the product, mirroring src/lib/shop-data/delivery.ts.
 * `null` = standard carriage; "large"/"furniture" = the two surcharge bands.
 */
type ShippingBand = "large" | "furniture" | null;

/**
 * Build OfferShippingDetails matching the delivery line shown on the page
 * (Search Console audit, Part 3.1). Standard carriage is £4.99 and free from
 * a £75 order value, so we emit two shipping entries: the flat rate, plus a
 * £0 rate gated by eligibleTransactionVolume (order value ≥ £75). The two
 * surcharge bands are never free, so they emit a single rate each.
 *
 * Delivery times follow the shipping policy: Standard 2–3 working days,
 * large items 2–5, two-person furniture arranged 3–14. Handling 0–1 days.
 */
function shippingDetailsFor(band: ShippingBand) {
  const gb = { "@type": "DefinedRegion", addressCountry: "GB" };
  const money = (value: string) => ({
    "@type": "MonetaryAmount",
    value,
    currency: "GBP",
  });
  const deliveryTime = (transitMin: number, transitMax: number) => ({
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 1,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: transitMin,
      maxValue: transitMax,
      unitCode: "DAY",
    },
  });

  if (band === "large") {
    return [
      {
        "@type": "OfferShippingDetails",
        shippingRate: money("12.99"),
        shippingDestination: gb,
        deliveryTime: deliveryTime(2, 5),
      },
    ];
  }
  if (band === "furniture") {
    return [
      {
        "@type": "OfferShippingDetails",
        shippingRate: money("39.99"),
        shippingDestination: gb,
        deliveryTime: deliveryTime(3, 14),
      },
    ];
  }
  // Standard carriage: £4.99, free from £75 order value.
  return [
    {
      "@type": "OfferShippingDetails",
      shippingRate: money("4.99"),
      shippingDestination: gb,
      deliveryTime: deliveryTime(2, 3),
    },
    {
      "@type": "OfferShippingDetails",
      shippingRate: money("0"),
      shippingDestination: gb,
      eligibleTransactionVolume: {
        "@type": "PriceSpecification",
        minPrice: 75,
        priceCurrency: "GBP",
      },
      deliveryTime: deliveryTime(2, 3),
    },
  ];
}

/**
 * Merchant return policy matching /legal/returns: 14-day change-of-mind
 * window, returned by post, with the customer responsible for return
 * carriage (faulty items are handled separately off-schema). Kept as a
 * single shared object since the policy is the same for every product.
 */
function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "GB",
    returnPolicyCountry: "GB",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    // Customer arranges and pays return carriage for change-of-mind returns
    // (/legal/returns). This enum needs no fixed fee amount, unlike
    // ReturnShippingFees, so Rich Results stays error-free.
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
  };
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  sku,
  gtin,
  brand = "House of Willow Alexander",
  price,
  priceCurrency = "GBP",
  availability,
  offers,
  shippingBand = null,
}: {
  name: string;
  description: string;
  /** One or more image URLs. Google prefers at least one square image. */
  image: string | string[];
  url: string;
  sku?: string;
  /** Valid GTIN (barcode) for the default variant, if any. */
  gtin?: string;
  brand?: string;
  /** Numeric price. Pass as a number for accurate decimal handling. */
  price: number;
  priceCurrency?: string;
  /** schema.org availability enum. Map Shopify availableForSale → InStock/OutOfStock. */
  availability: SchemaAvailability;
  /** One Offer per variant. When omitted, a single Offer is built from price/url. */
  offers?: OfferInput[];
  /**
   * Delivery band for shippingDetails — matches getShippingLabel(handle).
   * null = standard carriage (£4.99 / free £75); "large"/"furniture" bands.
   */
  shippingBand?: ShippingBand;
}) {
  const base = env.NEXT_PUBLIC_SITE_URL;
  // Shipping + returns are the same for every variant of a product, so build
  // once and attach to each Offer (Search Console audit, Part 3.1).
  const shippingDetails = shippingDetailsFor(shippingBand);
  const returnPolicy = merchantReturnPolicy();
  const mkOffer = (o: OfferInput) => ({
    "@type": "Offer",
    url: o.url,
    priceCurrency,
    price: o.price.toFixed(2),
    availability: `https://schema.org/${o.availability}`,
    itemCondition: "https://schema.org/NewCondition",
    ...(o.sku ? { sku: o.sku } : {}),
    ...(o.gtin ? { gtin: o.gtin } : {}),
    seller: { "@id": `${base}#organization` },
    shippingDetails,
    hasMerchantReturnPolicy: returnPolicy,
  });
  return renderLd({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    ...(sku ? { sku } : {}),
    ...(gtin ? { gtin13: gtin, gtin } : {}),
    brand: { "@type": "Brand", name: brand },
    offers:
      offers && offers.length
        ? offers.map(mkOffer)
        : mkOffer({ price, url, availability, sku, gtin }),
  });
}
