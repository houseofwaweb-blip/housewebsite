import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { env } from "@/lib/env";

/**
 * Meta Conversions API (CAPI) client.
 *
 * Fires the same event names as the browser pixel (PageView, ViewContent,
 * Lead, Search, CompleteRegistration). Each call passes an `event_id`
 * that the browser pixel ALSO sends — Meta uses it to dedupe the two
 * signals, keeping the best of both (server: more reliable; browser:
 * richer client-side context like `_fbp` and `_fbc`).
 *
 * Architecture:
 *   - Server route (e.g. /api/forms/contact) calls sendMetaCapiEvent()
 *     with event_id = generated UUID + user_data (email, phone) extracted
 *     from the form payload.
 *   - The same route returns { meta_event_id } to the client.
 *   - The client then calls fbq('track', 'Lead', {}, { eventID }) with
 *     the matching ID for dedup.
 *
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const API_VERSION = "v18.0";

/**
 * SHA-256 hash, lowercase hex. Meta requires PII hashed before transmission.
 * Email + phone must be normalised first (lowercase, no spaces, no formatting).
 */
function hash(value: string): string {
  return createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

/** Normalise UK phone to E.164-ish (digits only, leading +). */
function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  if (digits.startsWith("44")) return `+${digits}`;
  return digits;
}

export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postcode?: string;
  city?: string;
  /** From `_fbp` cookie — set by the browser pixel itself. */
  fbp?: string;
  /** From `_fbc` cookie — set when user clicked an fbclid-tagged ad. */
  fbc?: string;
  /** Client IP from the request (Vercel exposes this in headers). */
  clientIp?: string;
  /** Client User-Agent from the request. */
  clientUserAgent?: string;
}

export interface MetaCustomData {
  currency?: string;
  value?: number;
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  content_category?: string;
  search_string?: string;
  num_items?: number;
}

export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "Subscribe"
  | "Schedule";

interface SendMetaCapiEventArgs {
  eventName: MetaEventName;
  /** Page URL the event originated from. */
  eventSourceUrl: string;
  /** Pass undefined to auto-generate. Return this value so the browser pixel can match. */
  eventId?: string;
  userData?: MetaUserData;
  customData?: MetaCustomData;
}

interface SendMetaCapiEventResult {
  ok: boolean;
  eventId: string;
  error?: string;
}

/**
 * Fire a single event to Meta CAPI. No-op when the token isn't configured —
 * lets local dev work without burning real events.
 */
export async function sendMetaCapiEvent({
  eventName,
  eventSourceUrl,
  eventId,
  userData,
  customData,
}: SendMetaCapiEventArgs): Promise<SendMetaCapiEventResult> {
  const id = eventId ?? randomUUID();
  if (!env.META_CAPI_ACCESS_TOKEN || !env.NEXT_PUBLIC_META_PIXEL_ID) {
    return { ok: false, eventId: id, error: "meta_not_configured" };
  }

  const userDataPayload: Record<string, unknown> = {};
  if (userData?.email) userDataPayload.em = [hash(userData.email)];
  if (userData?.phone)
    userDataPayload.ph = [hash(normalisePhone(userData.phone))];
  if (userData?.firstName) userDataPayload.fn = [hash(userData.firstName)];
  if (userData?.lastName) userDataPayload.ln = [hash(userData.lastName)];
  if (userData?.postcode)
    userDataPayload.zp = [hash(userData.postcode.replace(/\s+/g, ""))];
  if (userData?.city) userDataPayload.ct = [hash(userData.city)];
  if (userData?.fbp) userDataPayload.fbp = userData.fbp;
  if (userData?.fbc) userDataPayload.fbc = userData.fbc;
  if (userData?.clientIp) userDataPayload.client_ip_address = userData.clientIp;
  if (userData?.clientUserAgent)
    userDataPayload.client_user_agent = userData.clientUserAgent;
  if (Object.keys(userDataPayload).length === 0) {
    return { ok: false, eventId: id, error: "no_user_data" };
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: id,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userDataPayload,
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
    access_token: env.META_CAPI_ACCESS_TOKEN,
  };
  if (env.META_CAPI_TEST_EVENT_CODE) {
    body.test_event_code = env.META_CAPI_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${env.NEXT_PUBLIC_META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        eventId: id,
        error: `meta_capi_${res.status}: ${text.slice(0, 200)}`,
      };
    }
    return { ok: true, eventId: id };
  } catch (err) {
    return {
      ok: false,
      eventId: id,
      error: err instanceof Error ? err.message : "unknown",
    };
  }
}

/**
 * Pull the standard pixel cookies + client identifiers from a Next.js
 * Request object so the route handler can pass them to sendMetaCapiEvent
 * without each callsite knowing the cookie names.
 */
export function extractMetaIdentifiers(request: Request): {
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  clientUserAgent?: string;
} {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const fbp = /(?:^|; )_fbp=([^;]+)/.exec(cookieHeader)?.[1];
  const fbc = /(?:^|; )_fbc=([^;]+)/.exec(cookieHeader)?.[1];
  // Vercel sets x-forwarded-for; the first IP is the original client.
  const xff = request.headers.get("x-forwarded-for");
  const clientIp = xff ? xff.split(",")[0].trim() : undefined;
  const clientUserAgent = request.headers.get("user-agent") ?? undefined;
  return { fbp, fbc, clientIp, clientUserAgent };
}
