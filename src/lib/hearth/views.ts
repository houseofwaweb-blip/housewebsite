import "server-only";
import { getSupabaseAnonClient, getSupabaseServerClient } from "@/lib/supabase/server";
import { servicesReady } from "@/lib/env";

/**
 * Hearth article view tracking (first-party, aggregate).
 *
 * Counts live in Supabase (`hearth_article_views`, per-slug per-day). Writes go
 * through a SECURITY DEFINER RPC so anon can only increment. Reads use the
 * service-role client.
 *
 * Every function here is failure-tolerant: if Supabase isn't configured, the
 * table doesn't exist yet, or a query fails, it degrades to a no-op / empty
 * result and never throws. View tracking must never break a page.
 */

const SLUG_RE = /^[a-z0-9-]{1,120}$/;

/** Record one view for an article slug. No-op on any failure. */
export async function recordArticleView(slug: string): Promise<void> {
  if (!servicesReady.supabase) return;
  if (!SLUG_RE.test(slug)) return;
  try {
    const supabase = getSupabaseAnonClient();
    await supabase.rpc("increment_hearth_view", { p_slug: slug });
  } catch {
    /* analytics must never break the request */
  }
}

export interface ArticleViewStats {
  /** All-time total views. */
  total: number;
  /** Views in the last 30 days. */
  last30: number;
}

function cutoffISODate(daysAgo: number): string {
  // Build a YYYY-MM-DD `days` ago without Date.now-at-import concerns.
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/** All-time + last-30-day totals for one article. Empty on any failure. */
export async function getArticleViewStats(slug: string): Promise<ArticleViewStats> {
  const empty: ArticleViewStats = { total: 0, last30: 0 };
  if (!servicesReady.supabaseWrites || !SLUG_RE.test(slug)) return empty;
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("hearth_article_views")
      .select("day, views")
      .eq("slug", slug);
    if (error || !data) return empty;
    const cutoff = cutoffISODate(30);
    let total = 0;
    let last30 = 0;
    for (const row of data as Array<{ day: string; views: number }>) {
      total += row.views;
      if (row.day >= cutoff) last30 += row.views;
    }
    return { total, last30 };
  } catch {
    return empty;
  }
}

/**
 * Top article slugs by views over the last `days`. Returns an ordered list of
 * slugs (most-viewed first). Empty on any failure — callers should fall back to
 * an editorial default so the "Most Popular" rail is never blank.
 */
export async function getTopArticleSlugs(days = 30, limit = 5): Promise<string[]> {
  if (!servicesReady.supabaseWrites) return [];
  try {
    const supabase = getSupabaseServerClient();
    const cutoff = cutoffISODate(days);
    const { data, error } = await supabase
      .from("hearth_article_views")
      .select("slug, views")
      .gte("day", cutoff);
    if (error || !data) return [];
    const totals = new Map<string, number>();
    for (const row of data as Array<{ slug: string; views: number }>) {
      totals.set(row.slug, (totals.get(row.slug) ?? 0) + row.views);
    }
    return Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([slug]) => slug);
  } catch {
    return [];
  }
}
