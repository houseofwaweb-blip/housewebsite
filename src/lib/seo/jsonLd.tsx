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
      // eslint-disable-next-line react/no-danger
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
    alternateName: ["HoWA", "The House"],
    url: base,
    logo: `${base}/brand/logo-organization.png`,
    description:
      "A modern British institution for effortless intelligent living. Design, care, protection, and curated commerce — connected by HoWA.",
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

/** Article schema for Hearth pieces. Handles the gated (HoWA+) case per DESIGN J.2. */
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
