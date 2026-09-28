import type { Metadata } from "next";

/**
 * Self-referencing canonical + og:url for a page.
 *
 * Audit fix (#4): 782 pages shipped with no canonical and og:url hard-coded to
 * the homepage, so every social share resolved to `/` and Google had no
 * canonical signal. Spread `pageMeta("/the/path")` into a page's metadata (or
 * generateMetadata return) and it self-references. Paths are resolved against
 * `metadataBase` (set in the root layout), so a leading-slash path is enough;
 * og:image continues to come from metadataBase, i.e. the production domain on a
 * production deploy.
 */
export function pageMeta(path: string): Metadata {
  const canonical = "/" + String(path).replace(/^\/+/, "").replace(/\/+$/, "");
  return {
    alternates: { canonical: canonical || "/" },
    openGraph: { url: canonical || "/" },
  };
}
