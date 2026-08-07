import type { Metadata } from "next";

/**
 * insuranceOg — Open Graph + Twitter share-card metadata for an insurance
 * landing page. Cards are pre-generated 1200x630 (spec: 1.91:1) at
 * /insurance/og/<key>.jpg. Spread the result into a page's metadata object.
 */
export function insuranceOg(key: string, alt: string): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `/insurance/og/${key}.jpg`;
  return {
    openGraph: { images: [{ url, width: 1200, height: 630, alt }] },
    twitter: { card: "summary_large_image", images: [url] },
  };
}
