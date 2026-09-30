import type { Metadata } from "next";

/**
 * insuranceOg — Open Graph + Twitter share-card metadata for an insurance
 * landing page. Cards are pre-generated 1200x630 (spec: 1.91:1) at
 * /insurance/og/<key>.jpg. Spread the result into a page's metadata object.
 *
 * Pass `path` (the page's own route, e.g. "/insurance/business/liability") to
 * also emit a self-referencing canonical + og:url — the dynamic insurance
 * pages had neither, so shares resolved to the homepage (audit #4). Resolved
 * against metadataBase, so a leading-slash path is enough.
 */
export function insuranceOg(
  key: string,
  alt: string,
  path?: string,
): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = `/insurance/og/${key}.jpg`;
  const canonical = path ? "/" + path.replace(/^\/+/, "").replace(/\/+$/, "") : undefined;
  return {
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...(canonical ? { url: canonical } : {}),
      images: [{ url, width: 1200, height: 630, alt }],
    },
    twitter: { card: "summary_large_image", images: [url] },
  };
}
