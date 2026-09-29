import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * robots.txt for the marketing site.
 *
 * Policy (confirmed by Alex, audit #17): allow the bots that send people our
 * way — real search engines and AI ANSWER/SEARCH engines that cite us and refer
 * traffic — and block the bots that TAKE content without referral (AI *training*
 * crawlers and scrapers).
 *
 * APPROVED (send people our way, explicitly allowed): Googlebot + Bingbot
 * (search — and Google's AI Overviews / AI Mode grounding uses the Search index,
 * i.e. Googlebot, so we stay visible in Google AI), Applebot + DuckDuckBot, and
 * the AI answer/search retrieval bots that cite sources: OAI-SearchBot +
 * ChatGPT-User (ChatGPT search), PerplexityBot + Perplexity-User, and Anthropic's
 * Claude-SearchBot + Claude-User. Social link-preview bots stay allowed too.
 *
 * DISAPPROVED (take from us, blocked): AI *training* crawlers (GPTBot, ClaudeBot,
 * anthropic-ai, Google-Extended [Gemini training, NOT AI Overviews], CCBot,
 * Applebot-Extended, Bytespider, Meta AI, Omgilibot, Diffbot, ImagesiftBot,
 * Timpibot), SEO-tool + low-value scrapers, and foreign engines we don't serve.
 * (The team's own Ahrefs/Semrush audits still run via a verified-site override.)
 *
 * NOTE: robots.txt is advisory — polite bots obey it, but some ignore it.
 * Enforce the hard blocks + a /shop rate-limit in the Vercel Firewall as well
 * (see VERCEL-FIREWALL-RULES.md).
 */
// Approved — cite us and send traffic. Explicitly allowed so a future edit can't
// silently sweep them into a block.
const ALLOWED_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];
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
  "shapbot",
  "DataForSeoBot",
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

// Crawl traps + old WordPress/WooCommerce probe paths (all 404 today).
const DISALLOW_ALL = [
  "/api/",
  "/studio/",
  "/howa/coming-soon",
  // Faceted/sort/paginated listing variants — the /shop crawl explosion.
  "/shop?",
  "/*?sort=",
  "/*?filter=",
  "/*?page=",
  // Old WordPress / WooCommerce endpoints bots keep probing.
  "/wp-json/",
  "/wp-admin/",
  "/wp-login.php",
  "/xmlrpc.php",
  "/wp-content/",
];

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      // Approved search + AI-answer bots — explicitly allowed (crawl traps still hidden).
      {
        userAgent: ALLOWED_BOTS,
        allow: "/",
        disallow: DISALLOW_ALL,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_ALL,
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
