import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

/**
 * Sanity Studio config.
 * Runs embedded at /studio inside the Next app AND in the standalone
 * `sanity` CLI for command-line deploys.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "a9t8u8nh";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
const previewSecret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4000";

/**
 * Document types that have a public URL and should expose a preview link.
 * Each maps to a slug-prefix so Studio can build the correct path.
 */
const previewPathByType: Record<string, (slug: string) => string> = {
  page: (slug) => `/${slug}`,
  article: (slug) => `/journal/${slug}`,
  partner: (slug) => `/partners/${slug}`,
  service: (slug) => `/services/${slug}`,
  legalPage: (slug) => `/legal/${slug}`,
};

export default defineConfig({
  name: "howa",
  title: "House of Willow Alexander",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },

  document: {
    /**
     * Builds the "Open preview" link for each document.
     * Studio opens it in a new tab; Next's /api/preview route validates
     * the secret, sets draft-mode cookie, and redirects to the slug.
     */
    productionUrl: async (prev, context) => {
      const { document } = context;
      const type = document._type as string;
      const slug = (document as unknown as { slug?: { current?: string } }).slug?.current;
      if (!slug || !previewPathByType[type] || !previewSecret) return prev;

      const url = new URL("/api/preview", siteUrl);
      url.searchParams.set("secret", previewSecret);
      url.searchParams.set("slug", previewPathByType[type](slug));
      return url.toString();
    },
  },
});
