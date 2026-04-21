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

  // HoWA Product app (external)
  NEXT_PUBLIC_HOWA_APP_URL: z.string().optional(),
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
  NEXT_PUBLIC_SANITY_PREVIEW_SECRET: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),

  // Shopify
  SHOPIFY_STORE_DOMAIN: z.string().optional(),
  SHOPIFY_STOREFRONT_TOKEN: z.string().optional(),
  SHOPIFY_WEBHOOK_SECRET: z.string().optional(),

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

  // Sentry
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),

  // Contact routing
  CONTACT_INBOX_DEFAULT: z
    .string()
    .default("hello@willowalexander.co.uk"),
  CONTACT_INBOX_DESIGN: z.string().optional(),
  CONTACT_INBOX_SERVICES: z.string().optional(),
  CONTACT_INBOX_PROTECT: z.string().optional(),
  CONTACT_INBOX_SHOP: z.string().optional(),
  CONTACT_INBOX_PRESS: z.string().optional(),

  // Node
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

function parseEnv() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
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
};
