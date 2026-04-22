import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

if (typeof window !== "undefined") {
  throw new Error("supabase/server loaded in a browser context");
}

let _anonClient: SupabaseClient | null = null;
let _serviceClient: SupabaseClient | null = null;

/**
 * Anon-key client for form inserts. Respects RLS policies.
 * Use this for all public form submissions (INSERT-only via RLS).
 */
export function getSupabaseAnonClient(): SupabaseClient {
  if (!_anonClient) {
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      throw new Error("Supabase env not configured (URL + anon key required)");
    }
    _anonClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _anonClient;
}

/**
 * Service-role client. Bypasses RLS. Only use for admin operations
 * that need to read/update form submissions (e.g. admin dashboard).
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (!_serviceClient) {
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase env not configured (URL + service role key required)");
    }
    _serviceClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _serviceClient;
}
