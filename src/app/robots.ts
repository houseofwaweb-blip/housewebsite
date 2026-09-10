import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * robots.txt for the marketing site.
 *
 * Default (everyone): allow the site, hide machine/admin/fallback paths.
 *
 * Blocked bots: low-value or content-scraping crawlers that inflate edge
 * traffic for no benefit — foreign search engines we don't serve, SEO-tool
 * scrapers, and AI *training* crawlers. Explicitly NOT blocked (they earn their
 * keep): Googlebot + Bingbot (search), Applebot/DuckDuckBot, Pinterest + social
 * link-preview bots, and AI *search/retrieval* bots (OAI-SearchBot,
 * PerplexityBot, ChatGPT-User) that can cite us and send traffic.
 *
 * NOTE: robots.txt is advisory — polite bots obey it, but some (e.g. Bytespider)
 * ignore it. Enforce the hard blocks in the Vercel Firewall as well.
 */
const BLOCKED_BOTS = [
  // Low-value / aggressive search + tool crawlers
  "PetalBot",
  "GoogleOther", // Google's non-search crawler — blocking does NOT affect Google Search
  "Amazonbot",
  "Baiduspider",
  "YandexBot",
  "AhrefsBot",
  "SemrushBot",
  "SERanking",
  "MJ12bot",
  "DotBot",
  "Bytespider",
  // Meta AI
  "meta-externalagent",
  "meta-webindexer",
  // AI training scrapers
  "GPTBot",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Omgilibot",
  "Diffbot",
  "ImagesiftBot",
  "Timpibot",
];

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/howa/coming-soon"],
      },
      {
        userAgent: BLOCKED_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
