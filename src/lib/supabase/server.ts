import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Service-role client. Server-only. NEVER import from a Client Component.
 * Runtime throws if somehow loaded in a browser context.
 */
if (typeof window !== "undefined") {
  throw new Error("supabase/server loaded in a browser context");
}

let _client: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (!_client) {
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase env not configured");
    }
    _client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}
