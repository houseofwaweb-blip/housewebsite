/**
 * Runtime + build-time environment variable validation.
 *
 * Import from server code only (not from 'use client' components).
 * Throws on startup if any REQUIRED var is missing.
 * Optional vars return `undefined` and must be checked at the use site.
 *
 * Follows CLAUDE.md "Env var inventory" split:
 *   - Deploy-safe (NEXT_PUBLIC_ exposed, regular server-only)
 *   - Ops-only (never in Vercel; local CLI + CI only)
 */
import "server-only";
import { z } from "zod";

// Required — site breaks without these. Graceful "not yet configured" noted
// per service; in dev we allow empty strings until Alex wires up each provider.
const schema = z.object({
  // Site core
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:4000"),

  // HoWA Product app (external). Fed straight into `new URL()` by
  // /api/howa-bounce, so we validate here to fail at boot, not request time.
  // Empty string in .env.local is treated as "not set" (Alex wires it later).
  NEXT_PUBLIC_HOWA_APP_URL: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().url().optional(),
  ),
  HOWA_APP_LIVE: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),

  // Sanity
  SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  SANITY_DATASET: z.string().default("production"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().optional(),
  SANITY_READ_TOKEN: z.string().optional(),
  SANITY_PREVIEW_SECRET: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),

  // Shopify
  SHOPIFY_STORE_DOMAIN: z.string().optional(),
  SHOPIFY_STOREFRONT_TOKEN: z.string().optional(),
  SHOPIFY_WEBHOOK_SECRET: z.string().optional(),
  // Catalog mode. SHOP_BUYABLE=false → products + prices stay viewable but
  // add-to-basket and checkout are disabled (pre-launch browse-only). Flip to
  // "true" at go-live. Read server-side, passed into CartProvider as a prop.
  SHOP_BUYABLE: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),

  // Supabase
  SUPABASE_URL: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Upstash
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Turnstile
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),

  // Sentry. *_AUTH_TOKEN + ORG + PROJECT are build-time only (consumed by
  // withSentryConfig in next.config.ts), not loaded into runtime env.ts.
  // Declaring them here makes the .env.example fully self-documenting and
  // avoids accidental drift between code that reads env and the schema.
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Contact routing
  CONTACT_INBOX_DEFAULT: z
    .string()
    .default("hello@willowalexander.co.uk"),
  CONTACT_INBOX_DESIGN: z.string().optional(),
  CONTACT_INBOX_SERVICES: z.string().optional(),
  CONTACT_INBOX_PROTECT: z.string().optional(),
  CONTACT_INBOX_SHOP: z.string().optional(),
  CONTACT_INBOX_PRESS: z.string().optional(),

  // Email (Brevo Transactional). When BREVO_API_KEY is unset, sendEmail()
  // is a no-op so dev works without an account. Production requires the
  // key + a verified sender domain in Brevo. The rest of the WA stack
  // (Call Handler, ServiceOS Agent) uses these same variable names —
  // keep them aligned for ops consistency.
  BREVO_API_KEY: z.string().optional(),
  BREVO_FROM_EMAIL: z
    .string()
    .email()
    .default("hello@willowalexander.co.uk"),
  BREVO_FROM_NAME: z.string().default("House of Willow Alexander"),

  // Newsletter (Klaviyo). Newsletter signup writes to Supabase regardless;
  // Klaviyo subscribe is the secondary side-effect. Optional — when keys
  // are missing, the subscribe call is skipped (signup still rows).
  // PUBLIC key is the 6-char site ID; safe to expose to the browser.
  // PRIVATE key is server-only.
  // No list ID — the planned interest-led signup picks lists at runtime
  // based on what the user selects (see lib/klaviyo when it lands).
  NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY: z.string().optional(),
  KLAVIYO_PRIVATE_KEY: z.string().optional(),
  // Single shared HoWA waitlist list (same id as askhowa.co.uk) — the waitlist
  // form subscribes here with a `tier_interest` profile property.
  KLAVIYO_LIST_ID: z.string().optional(),

  // Meta Conversions API. Pixel ID is read from NEXT_PUBLIC_META_PIXEL_ID
  // (also useful server-side). Access token is server-only; never expose.
  // Test event code routes events to the Test Events tab while wiring.
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  META_CAPI_ACCESS_TOKEN: z.string().optional(),
  META_CAPI_TEST_EVENT_CODE: z.string().optional(),

  // Node
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

function parseEnv() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export const env = parseEnv();

/** True when all required services are wired up. */
export const servicesReady = {
  sanity: !!(env.SANITY_PROJECT_ID && env.SANITY_READ_TOKEN),
  shopify: !!(env.SHOPIFY_STORE_DOMAIN && env.SHOPIFY_STOREFRONT_TOKEN),
  supabase: !!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY),
  supabaseWrites: !!env.SUPABASE_SERVICE_ROLE_KEY,
  upstash: !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN),
  turnstile: !!(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY),
  sentry: !!env.SENTRY_DSN,
  howaProduct: !!(env.HOWA_APP_LIVE && env.NEXT_PUBLIC_HOWA_APP_URL),
  metaCapi: !!(env.META_CAPI_ACCESS_TOKEN && env.NEXT_PUBLIC_META_PIXEL_ID),
};
