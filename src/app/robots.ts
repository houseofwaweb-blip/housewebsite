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
 * (The team's OWN Ahrefs/Semrush site audits use distinct audit-crawler
 * user-agents — AhrefsSiteAudit / SiteAuditBot / SemrushBot-SA — explicitly
 * ALLOWED above, so internal audits keep working; only the competitor-facing
 * web-index crawlers AhrefsBot / SemrushBot are blocked.)
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
  // Our OWN SEO team's site-audit crawlers. These are DISTINCT user-agents from
  // the web-wide index crawlers (AhrefsBot / SemrushBot) blocked below: the index
  // crawlers feed the public database competitors use to study our backlinks; the
  // audit crawlers are the ones the team points at our own site. Allowing these
  // explicitly (longest-match wins) keeps internal audits working while the
  // competitor-facing index crawlers stay blocked.
  "AhrefsSiteAudit",
  "SiteAuditBot",
  "SemrushBot-SA",
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

// Paths allowed above the broad disallows. Collection pagination (?page=N) is
// re-opened here so Google can crawl every product in a collection, not just
// the first 20 (Search Console audit, Part 1.1). A longer, more specific Allow
// wins over the broad "/*?page=" Disallow, so only /shop/collections/* pages
// escape the page-param block; /shop and /shop/all deep pages stay blocked.
const ALLOW_PATHS = ["/", "/shop/collections/*?page="];

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
        allow: ALLOW_PATHS,
        disallow: DISALLOW_ALL,
      },
      {
        userAgent: "*",
        allow: ALLOW_PATHS,
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
