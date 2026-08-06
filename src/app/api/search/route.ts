import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/cms/client";
import { unifiedSearchQuery } from "@/lib/cms/queries";
import { servicesReady } from "@/lib/env";
import { searchCatalogue } from "@/lib/shop-data/catalogue";
import { checkSearchRateLimit } from "@/lib/rate-limit";

const MAX_QUERY_LENGTH = 100;

/**
 * GET /api/search?q=...&tab=all
 *
 * Searches across Sanity content + Shopify products (or local catalogue fallback).
 * Returns a unified array of SearchResult objects.
 *
 * Spec: DESIGN.md Flow 10 — Search. Debounced 300ms client-side.
 */

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt?: string;
  href: string;
  image?: string;
  /** Hidden synonym terms for matching only; not shown to the user. */
  keywords?: string;
  /** When true, this static page is pinned to the top of results (e.g. House Companion). */
  pin?: boolean;
}

// Static pages that should be searchable but aren't in any CMS
const STATIC_PAGES: SearchResult[] = [
  // REVISIONS v3 §6/§9 — the only HoWA destination on this site is the
  // House-context page. Every /howa/* product page 301s to howa.co.uk, and the
  // plan and tier pages are removed from the House site entirely, so they must
  // not be surfaced by search.
  // House Companion is the promoted House-site route into HoWA (Aug 2026). It
  // must be the first result for companion/assistant/design-help/"what service"
  // style queries, so it carries synonym keywords and a pin.
  { id: "sp-house-companion", type: "House Companion", title: "Ask House Companion", excerpt: "Share a photo, a problem, a room, a garden or an idea. House Companion understands what the home needs and prepares the right design, service or next step in HoWA.", href: "/house-companion", pin: true, keywords: "companion assistant ai design help not sure what service what do i need diagnose diagnosis advice guidance ask style stylist scan repair garden room" },
  { id: "sp-companion-repair", type: "House Companion", title: "Fix or repair with House Companion", excerpt: "Photograph a fault and see the likely issue, an indicative cost and the right route.", href: "/house-companion/repair", keywords: "repair fix fault damp leak broken diagnose companion" },
  { id: "sp-companion-garden", type: "House Companion", title: "Design a garden with House Companion", excerpt: "Scan the garden and shape a first concept, planting direction and budget.", href: "/house-companion/garden", keywords: "garden design companion scan concept planting" },
  { id: "sp-companion-room", type: "House Companion", title: "Design a room with House Companion", excerpt: "Scan the room and build a first direction, palette and budget.", href: "/house-companion/room", keywords: "room interior design companion scan palette scheme" },
  { id: "sp-howa", type: "HoWA", title: "The House uses HoWA", excerpt: "The Home Intelligence app behind every House booking, appointment, document and Home Record.", href: "/howa", keywords: "home record open home record home intelligence" },
  { id: "sp-services", type: "Services", title: "Book a House service", excerpt: "Garden care, cleaning, window and gutter cleaning, handyman and repairs, clearance and specialist garden work.", href: "/services", keywords: "book service what service find a service" },
  { id: "sp-handyman", type: "Services", title: "Handyman and repairs", excerpt: "Hourly and half-day visits for the jobs that have been waiting.", href: "/services/handyman" },
  { id: "sp-interiors", type: "Design", title: "Interior Design", excerpt: "Whole-house renovations and single-room reads.", href: "/design/interiors" },
  { id: "sp-gardens", type: "Design", title: "Garden Design", excerpt: "Landscape work led by Willow Alexander Gardens.", href: "/design/gardens" },
  { id: "sp-protect", type: "Insurance", title: "Home Protection Review", excerpt: "An in-person condition survey and prioritised works list. A House service, not an insurance product.", href: "/insurance/home-protection" },
  { id: "sp-insurance-home", type: "Insurance", title: "Home Insurance", excerpt: "Cover that understands period homes and non-standard construction. Introduced by the House, arranged by an authorised FCA-regulated partner.", href: "/insurance/home" },
  { id: "sp-insurance-pet", type: "Insurance", title: "Pet Insurance", excerpt: "Lifetime, time-limited and accident-only cover explained plainly. Introduced by the House.", href: "/insurance/pet" },
  { id: "sp-philosophy", type: "The House", title: "Philosophy", excerpt: "What a house is actually for.", href: "/the-house/philosophy" },
  { id: "sp-standards", type: "The House", title: "Standards", excerpt: "How we work, and what the House standard means.", href: "/the-house/standards" },
  { id: "sp-contact", type: "The House", title: "Contact", excerpt: "Write to the House. Book a House Service.", href: "/contact" },
];

function capitalize(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function searchStaticPages(q: string): SearchResult[] {
  const lower = q.toLowerCase();
  return STATIC_PAGES.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.type.toLowerCase().includes(lower) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(lower)) ||
      (p.keywords && p.keywords.toLowerCase().includes(lower)),
  );
}

interface SanitySearchResult {
  services: Array<{ _id: string; name: string; slug: string; lede?: string; type: string }>;
  partners: Array<{ _id: string; name: string; slug: string; shortBio?: string; type: string }>;
  articles: Array<{ _id: string; title: string; slug: string; lede?: string; isPremium?: boolean; type: string; category?: { name: string; slug: string } }>;
  news: Array<{ _id: string; title: string; slug: string; lede?: string; type: string }>;
  musings: Array<{ _id: string; title: string; slug: string; lede?: string; type: string }>;
}

function mapSanityResults(data: SanitySearchResult): SearchResult[] {
  const results: SearchResult[] = [];

  for (const s of data.services) {
    results.push({
      id: s._id,
      type: "Service",
      title: capitalize(s.name ?? s.slug),
      excerpt: s.lede,
      href: `/services/${s.slug}`,
    });
  }

  for (const p of data.partners) {
    results.push({
      id: p._id,
      type: "Partner",
      title: p.name,
      excerpt: p.shortBio,
      href: `/partners/${p.slug}`,
    });
  }

  for (const a of data.articles) {
    results.push({
      id: a._id,
      type: "Journal",
      title: a.title,
      excerpt: a.lede,
      href: `/the-hearth/${a.slug}`,
    });
  }

  for (const n of data.news) {
    results.push({
      id: n._id,
      type: "The House",
      title: n.title,
      excerpt: n.lede,
      href: `/news/${n.slug}`,
    });
  }

  for (const m of data.musings) {
    results.push({
      id: m._id,
      type: "The House",
      title: m.title,
      excerpt: m.lede,
      href: `/musings/${m.slug}`,
    });
  }

  return results;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const tab = searchParams.get("tab") ?? "all";

  if (!q) {
    return NextResponse.json({ results: [], query: "" });
  }

  // Length cap — bounds GROQ query payload and prevents abuse.
  if (q.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: "query too long", maxLength: MAX_QUERY_LENGTH },
      { status: 400 },
    );
  }

  // Rate limit — 30/min/IP. Read-only so we fail open if Upstash is unreachable.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
  const rl = await checkSearchRateLimit(`search:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate limited", reset: rl.reset },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.reset - Date.now()) / 1000)) } },
    );
  }

  const allResults: SearchResult[] = [];

  // 1. Sanity content search
  if (servicesReady.sanity) {
    try {
      const sanityData = await sanityClient.fetch<SanitySearchResult>(
        unifiedSearchQuery,
        { q: `${q}*` }, // append * for prefix matching
      );
      allResults.push(...mapSanityResults(sanityData));
    } catch {
      // Sanity unavailable — continue with other sources
    }
  }

  // 2. Shopify product search (or local catalogue fallback)
  if (servicesReady.shopify) {
    try {
      const { shopifyProvider } = await import("@/lib/commerce/shopify");
      const products = await shopifyProvider.searchProducts(q, 10);
      for (const p of products) {
        allResults.push({
          id: p.id,
          type: "Shop",
          title: p.title,
          excerpt: p.description?.slice(0, 120),
          href: `/shop/${p.handle}`,
          image: p.images?.[0]?.url || undefined,
        });
      }
    } catch {
      // Shopify unavailable — fall through to catalogue
    }
  }

  // Catalogue fallback for shop (when Shopify not configured)
  if (!servicesReady.shopify) {
    const catalogueHits = searchCatalogue(q);
    for (const p of catalogueHits.slice(0, 10)) {
      allResults.push({
        id: `cat-${p.handle}`,
        type: "Shop",
        title: p.title,
        excerpt: p.lede?.slice(0, 120),
        href: `/shop/${p.handle}`,
        image: p.image || undefined,
      });
    }
  }

  // 3. Static pages
  allResults.push(...searchStaticPages(q));

  // Filter by tab if not "all"
  let filtered = allResults;
  if (tab !== "all") {
    filtered = allResults.filter((r) => r.type.toLowerCase().includes(tab.toLowerCase()));
  }

  // Deduplicate by href
  const seen = new Set<string>();
  const deduped = filtered.filter((r) => {
    if (seen.has(r.href)) return false;
    seen.add(r.href);
    return true;
  });

  // Pin promoted static pages (House Companion) to the top so companion,
  // assistant and design-help queries surface it first (directive §09 search).
  const ranked = [...deduped].sort((a, b) => Number(b.pin ?? false) - Number(a.pin ?? false));

  return NextResponse.json({
    results: ranked.slice(0, 20),
    query: q,
    total: ranked.length,
  });
}
