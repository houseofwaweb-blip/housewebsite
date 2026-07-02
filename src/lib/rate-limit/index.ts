import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

/**
 * Rate limiter. Upstash Redis sliding window.
 * Spec: PLAN.md §15 Finding S2. Applied to all /api/forms/* POST.
 *
 * In dev without Upstash creds, falls back to a permissive no-op so local
 * development isn't blocked. Production REQUIRES valid creds.
 */

let _redis: Redis | null = null;
let _form: Ratelimit | null = null;
let _search: Ratelimit | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null;
  _redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  return _redis;
}

function getFormLimiter(): Ratelimit | null {
  if (_form) return _form;
  const redis = getRedis();
  if (!redis) return null;
  // 5 submissions per 10 minutes per identifier.
  _form = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "howa:form",
  });
  return _form;
}

function getSearchLimiter(): Ratelimit | null {
  if (_search) return _search;
  const redis = getRedis();
  if (!redis) return null;
  // 30 searches per minute per identifier — generous for normal use, blocks burst abuse.
  _search = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "howa:search",
  });
  return _search;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  reset: number;
}

export async function checkFormRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getFormLimiter();
  // Upstash not configured -> allow. Turnstile is the primary bot defense, so a
  // missing optional rate-limiter must never block (or 500) real submissions.
  if (!limiter) {
    return { ok: true, remaining: 99, reset: Date.now() + 600_000 };
  }
  try {
    const { success, remaining, reset } = await limiter.limit(identifier);
    return { ok: success, remaining, reset };
  } catch {
    // A rate-limiter transport/config error must never surface as a 500 on a
    // form submission — fail open (same as the search limiter).
    return { ok: true, remaining: 99, reset: Date.now() + 600_000 };
  }
}

/**
 * Search-route rate limit. Looser than form submissions (30/min vs 5/10m) but
 * still bounds abuse of /api/search which fans out to Sanity + Shopify.
 * Fails open on transport errors (read-only endpoint, network blip shouldn't 500).
 */
export async function checkSearchRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getSearchLimiter();
  if (!limiter) {
    return { ok: true, remaining: 99, reset: Date.now() + 60_000 };
  }
  try {
    const { success, remaining, reset } = await limiter.limit(identifier);
    return { ok: success, remaining, reset };
  } catch {
    return { ok: true, remaining: 99, reset: Date.now() + 60_000 };
  }
}
