import "server-only";

/**
 * Website service enquiry -> ServiceOS Hot Lead.
 *
 * Adapted for the House of Willow Alexander site from the proven Handyman
 * integration (serviceos-handover/reference-implementation). Read
 * serviceos-handover/02-corrections-and-findings.md before changing anything
 * here: the quirks below are documented behaviour of the live ServiceOS API,
 * not defensive guesswork.
 *
 * WHERE THIS IS CALLED FROM
 * Inline from the form handler's after() block (lib/forms/submit.ts), for
 * `consultation` submissions whose serviceType is a real service. Every service
 * enquiry on the site — service pages, the two design pages, location pages and
 * the booking modal — posts to /api/forms/consultation, so wiring it there
 * covers them all in one place.
 *
 * NO RETRY QUEUE (the inline trade-off, stated plainly). If ServiceOS is down
 * when someone enquires, no Hot Lead is created THAT time. The enquiry is NOT
 * lost: the Supabase row (consultation_bookings + form_submissions) and the
 * sales notification email still happen, and the failure is logged loudly with
 * the enquirer's details, so a human can key it in. If volume ever justifies
 * it, the right upgrade is a Supabase-backed worker + cron (the brief's durable
 * design), not a retry loop.
 *
 * FAIL-SOFT, ALWAYS. Nothing here may block or fail an enquiry. Every function
 * swallows its errors and reports them in the return value.
 */

const API_VERSION = "v2.2";

/** ServiceOS status id for a Hot Lead. Handover section 2. */
const HOT_LEAD_STATUS_ID = 3;

/** ServiceOS "Undefined - UK" service — the triage bucket when no specific service matches. */
const UNDEFINED_SERVICE_ID = 84;

/**
 * Comment tag "Office/System" (id 2).
 *
 * `tags: []` is NOT "no tag": ServiceOS falls back to id 1, "PRO/PRO Only",
 * which is the tradesperson attending the job, not the office triaging a web
 * enquiry. Confirmed via GET /user/comment_tags on the live instance:
 *   1 = PRO/PRO Only   2 = Office/System   3 = Client/Visible for client
 *
 * parseInt rather than Number: a non-numeric env value gives NaN, which
 * JSON.stringify writes as null, silently dropping the tag.
 */
const COMMENT_TAG_SYSTEM =
  Number.parseInt(process.env.SERVICEOS_COMMENT_TAG_ID?.trim() || "", 10) || 2;

/**
 * serviceType (the consultation form enum) -> ServiceOS service id.
 *
 * Confirmed ids for this site: Garden Design enquiry = 104, Interior Design = 105.
 * The commodity services have no dedicated ServiceOS service yet, so they file
 * under 84 (Undefined/triage) with the chosen service written into the comment,
 * which is the handover's documented fallback (02-corrections-and-findings §2).
 *
 * Override any of these per environment without a code change, e.g.
 *   SERVICEOS_SERVICE_ID_GARDENING=NN
 *   SERVICEOS_SERVICE_ID_DESIGN_INTERIORS=NN
 * (env key = SERVICEOS_SERVICE_ID_ + serviceType uppercased, hyphens -> _).
 */
const SERVICE_ID_BY_TYPE: Record<string, number> = {
  // Confirmed by name against GET /user/services on the live instance (1 Oct 2026).
  "design-gardens": 104, // "Garden Design Enquiry - UK"
  "design-interiors": 105, // "Interior Design Enquiry - UK"
  gardening: 79, // "Garden Maintenance [NEW] - UK"
  "window-cleaning": 76, // "Window Cleaning [NEW] - UK"
  "gutter-cleaning": 77, // "Gutter Cleaning - UK"
  cleaning: 14, // "Cleaning services - UK" (broad bucket; cf. 72 Regular Domestic, 73 Deep)
};

/**
 * Sub-service slug -> specific ServiceOS service id. The enquiry dropdowns are
 * frequency/scope tiers, so only the ones that map to a DISTINCT ServiceOS
 * service are listed; every other tier falls back to its parent service (above)
 * and the chosen tier is still written into the Hot Lead comment.
 * Keys are the real sub.slug values from lib/services-data.
 */
const SUBSERVICE_ID_BY_SLUG: Record<string, number> = {
  tidy: 11, // Gardening · One-off tidy -> "Garden Tidy"
  "estate-garden-care": 82, // Gardening · Estate care -> "Garden Maintenance Subscription"
  "weekly-clean": 72, // Cleaning · Weekly -> "Regular Domestic Cleaning"
  "whole-home-clean": 73, // Cleaning · Whole-home -> "Deep Cleaning"
};

/** Human label for the comment's "Service:" line. */
const SERVICE_LABEL: Record<string, string> = {
  "design-gardens": "Garden Design",
  "design-interiors": "Interior Design",
  gardening: "Gardening",
  "window-cleaning": "Window Cleaning",
  cleaning: "Cleaning",
  "gutter-cleaning": "Gutter Cleaning",
  steward: "Steward Plan",
  protect: "Home Protection",
  general: "General enquiry",
};

/**
 * Consultation serviceTypes that are NOT a bookable service, so they do NOT
 * become ServiceOS Hot Leads (owner's rule: "service only, not membership or
 * general contact"):
 *   steward  -> membership tier
 *   protect  -> insurance / Home Protection (register-interest only)
 *   general  -> a plain contact enquiry (EnquiryForm treats "general" as such)
 * Everything else is a real service and syncs.
 */
const NON_SERVICE_TYPES = new Set(["steward", "protect", "general"]);

/** True if this consultation serviceType should create a ServiceOS Hot Lead. */
export function shouldSyncServiceType(serviceType?: string): boolean {
  const t = (serviceType ?? "").trim();
  if (!t) return false;
  return !NON_SERVICE_TYPES.has(t);
}

function envServiceId(prefix: string, key: string): number | null {
  const envKey = `${prefix}${key.replace(/-/g, "_").toUpperCase()}`;
  const v = Number.parseInt(process.env[envKey]?.trim() || "", 10);
  return Number.isFinite(v) && v > 0 ? v : null;
}

/**
 * Most specific wins: the chosen sub-service slug, then the parent serviceType,
 * then 84 (Undefined/triage). Each level is env-overridable without a code
 * change: SERVICEOS_SERVICE_ID_SUB_<SLUG> and SERVICEOS_SERVICE_ID_<TYPE>
 * (hyphens -> _, uppercased).
 */
function resolveServiceId(serviceType?: string, serviceDetail?: string): number {
  const detail = (serviceDetail ?? "").trim();
  if (detail) {
    const env = envServiceId("SERVICEOS_SERVICE_ID_SUB_", detail);
    if (env) return env;
    if (SUBSERVICE_ID_BY_SLUG[detail]) return SUBSERVICE_ID_BY_SLUG[detail];
  }
  const key = (serviceType ?? "").trim();
  if (key) {
    const env = envServiceId("SERVICEOS_SERVICE_ID_", key);
    if (env) return env;
    if (SERVICE_ID_BY_TYPE[key]) return SERVICE_ID_BY_TYPE[key];
  }
  return UNDEFINED_SERVICE_ID;
}

/**
 * Referrer ids, handover section 6.5. `Undefined` is the honest default: never
 * default to Organic, which would overstate free traffic.
 */
const REFERRER = {
  undefined: 1,
  email: 3,
  whatsapp: 4,
  ppc: 5,
  returnCustomer: 7,
  checkatrade: 8,
  social: 9,
  localServiceAd: 10,
  leaflet: 11,
  vans: 12,
  customerReferral: 14,
  organic: 15,
  teamUpsell: 16,
} as const;

export interface ServiceOsSyncResult {
  /** "done" | "skipped" | "failed" | "dry-run" | "off" */
  status: string;
  bookingNum?: string;
  bookingId?: number;
  serviceId?: number;
  referrerId?: number;
  referrerReason?: string;
  error?: string;
}

interface Config {
  baseUrl: string;
  appToken: string;
  username: string;
  password: string;
  dryRun: boolean;
}

function readConfig(): Config | null {
  // Master switch: off only when explicitly "false".
  if (process.env.SERVICEOS_SYNC_ENABLED?.trim() === "false") return null;

  const baseUrl = (
    process.env.SERVICEOS_BASE_URL?.trim() ||
    (process.env.SERVICEOS_HOST?.trim() ? `https://${process.env.SERVICEOS_HOST.trim()}` : "")
  ).replace(/\/$/, "");
  const appToken = process.env.SERVICEOS_APP_TOKEN?.trim();
  const username = process.env.SERVICEOS_USERNAME?.trim();
  const password = process.env.SERVICEOS_PASSWORD?.trim();

  if (!baseUrl || !appToken || !username || !password) return null;

  return {
    baseUrl,
    appToken,
    username,
    password,
    // Defaults to TRUE. ServiceOS has no test environment: every write is real
    // and the sales team sees it. Nothing writes until this is explicitly "false".
    dryRun: process.env.SERVICEOS_DRY_RUN?.trim() !== "false",
  };
}

export function isServiceOsConfigured(): boolean {
  return readConfig() !== null;
}

/* ── transport ─────────────────────────────────────────────────────────── */

/** One in-flight login shared by every caller (handover: avoid login bursts). */
let sessionId: string | null = null;
let loginInFlight: Promise<string | null> | null = null;

type SoResponse = { data?: unknown; error?: Array<{ code?: number; message?: string }> };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** ServiceOS reports failures as HTTP 200 with an `error` array. */
function soError(body: SoResponse): { code?: number; message: string } | null {
  const first = Array.isArray(body?.error) ? body.error[0] : undefined;
  if (!first) return null;
  return { code: first.code, message: first.message ?? "unknown ServiceOS error" };
}

async function rawFetch(
  cfg: Config,
  path: string,
  init: RequestInit & { auth?: boolean } = {},
): Promise<{ body: SoResponse; httpStatus: number }> {
  const headers: Record<string, string> = {
    "X-Application": cfg.appToken,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  // Raw session id, deliberately with NO "Bearer " prefix (handover 6.6).
  if (init.auth !== false && sessionId) headers.Authorization = sessionId;

  const res = await fetch(`${cfg.baseUrl}/api/${API_VERSION}${path}`, { ...init, headers });
  let body: SoResponse = {};
  try {
    body = (await res.json()) as SoResponse;
  } catch {
    body = {};
  }
  return { body, httpStatus: res.status };
}

async function login(cfg: Config): Promise<string | null> {
  if (loginInFlight) return loginInFlight;
  loginInFlight = (async () => {
    try {
      const { body } = await rawFetch(cfg, "/unit/login", {
        method: "POST",
        body: JSON.stringify({ username: cfg.username, password: cfg.password }),
        auth: false,
      });
      const err = soError(body);
      if (err) {
        console.error(`[serviceos] login rejected: ${err.code} ${err.message}`);
        return null;
      }
      const sid = (body.data as { session?: { sid?: string } } | null)?.session?.sid ?? null;
      if (!sid) console.error("[serviceos] login returned no session id");
      sessionId = sid;
      return sid;
    } catch (e) {
      console.error("[serviceos] login threw:", e instanceof Error ? e.message : e);
      return null;
    } finally {
      loginInFlight = null;
    }
  })();
  return loginInFlight;
}

/**
 * Authenticated call: retry 5xx/429/network up to 3 times with backoff,
 * re-login once on auth code 5142, surface any other error code as a failure.
 */
async function call(
  cfg: Config,
  path: string,
  init: RequestInit = {},
): Promise<{ data: unknown } | { error: string }> {
  if (!sessionId && !(await login(cfg))) return { error: "login failed" };

  let retriedAuth = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { body, httpStatus } = await rawFetch(cfg, path, init);

      if (httpStatus === 429 || (httpStatus >= 500 && httpStatus <= 504)) {
        if (attempt < 2) {
          await sleep(500 * 2 ** attempt + Math.random() * 200);
          continue;
        }
        return { error: `HTTP ${httpStatus} after retries` };
      }

      const err = soError(body);
      if (err) {
        // 5142 = invalid authorization. Log in again and retry once.
        if ((err.code === 5142 || httpStatus === 401) && !retriedAuth) {
          retriedAuth = true;
          sessionId = null;
          if (!(await login(cfg))) return { error: "re-login failed" };
          continue;
        }
        return { error: `${err.code ?? "?"}: ${err.message}` };
      }
      return { data: body.data };
    } catch (e) {
      if (attempt < 2) {
        await sleep(500 * 2 ** attempt + Math.random() * 200);
        continue;
      }
      return { error: e instanceof Error ? e.message : "network error" };
    }
  }
  return { error: "exhausted retries" };
}

/** `data` is an array even for a single record (handover 6.6). */
function firstRow<T>(data: unknown): T | null {
  if (Array.isArray(data)) return (data[0] as T) ?? null;
  return (data as T) ?? null;
}

/* ── lookups ───────────────────────────────────────────────────────────── */

/** ServiceOS stores phones as "+44 7936623311" and matches the format exactly. */
export function phoneVariants(raw: string): string[] {
  const digits = String(raw || "").replace(/[\s\-().+]/g, "");
  if (!/^\d+$/.test(digits)) return raw ? [raw] : [];
  const national = digits.replace(/^0/, "44").replace(/^44/, "");
  return [...new Set([raw, national, `+44 ${national}`, `0${national}`].filter(Boolean))];
}

type SoClient = { id?: number; phone?: string; email?: string };
type SoBooking = { id?: number; num?: string; status_id?: number };

/** Digits only, UK prefixes stripped, so two formats compare equal. */
function phoneKey(raw: string): string {
  const digits = String(raw || "").replace(/\D/g, "");
  return digits.replace(/^44/, "").replace(/^0/, "");
}

/**
 * Every client record that genuinely matches, not just the first.
 *
 * ⚠ ServiceOS phone search is a PARTIAL match (query[phone]=7 returns ten
 * strangers), so every candidate is verified against the searched number, and
 * short numbers are not searched at all. And one person routinely has several
 * client records, so we collect them all and the caller picks deterministically.
 */
async function findClientCandidates(cfg: Config, phone: string, email: string): Promise<number[]> {
  const ids: number[] = [];
  const add = (id?: number) => {
    if (id && !ids.includes(id)) ids.push(id);
  };

  const wantPhone = phoneKey(phone);
  if (wantPhone.length >= 9) {
    for (const variant of phoneVariants(phone)) {
      const r = await call(cfg, `/user/clients?query%5Bphone%5D=${encodeURIComponent(variant)}`);
      if (!("data" in r) || !Array.isArray(r.data)) continue;
      for (const c of r.data as SoClient[]) {
        if (phoneKey(c.phone ?? "") === wantPhone) add(c.id);
      }
    }
  }

  if (email) {
    const want = email.trim().toLowerCase();
    const r = await call(cfg, `/user/clients?query%5Bemail%5D=${encodeURIComponent(email)}`);
    if ("data" in r && Array.isArray(r.data)) {
      for (const c of r.data as SoClient[]) {
        if ((c.email ?? "").trim().toLowerCase() === want) add(c.id);
      }
    }
  }

  if (ids.length > 1) {
    console.warn(
      `[serviceos] ${ids.length} client records match this enquirer (${ids.join(", ")}). ` +
        `Preferring one with booking history. Worth merging them in ServiceOS.`,
    );
  }
  return ids;
}

/* ── referrer inference (handover 6.5) ─────────────────────────────────── */

const SOCIAL = /facebook|instagram|meta|tiktok|twitter|^x$|linkedin|pinterest|youtube|snapchat|nextdoor/i;
const EMAIL_TOOL = /mailchimp|klaviyo|brevo|sendinblue|sendgrid|newsletter|campaign-?monitor/i;
const SEARCH = /google|bing|yahoo|duckduckgo|ecosia|search/i;
const PAID = /cpc|ppc|paid|pmax|display|ads|adwords|retargeting/i;

export function inferReferrer(utm: {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  pageUrl?: string;
  referrer?: string;
  isReturningClient?: boolean;
}): { id: number; reason: string } {
  if (utm.isReturningClient) {
    return { id: REFERRER.returnCustomer, reason: "existing client with earlier booking" };
  }

  const source = (utm.source ?? "").toLowerCase();
  const medium = (utm.medium ?? "").toLowerCase();
  const campaign = (utm.campaign ?? "").toLowerCase();
  const blob = `${source} ${medium} ${campaign} ${(utm.content ?? "").toLowerCase()}`;

  if (/checkatrade/.test(blob)) return { id: REFERRER.checkatrade, reason: "checkatrade UTM" };
  if (/\blsa\b|local[-_ ]?service/.test(blob))
    return { id: REFERRER.localServiceAd, reason: "local services ad UTM" };
  if (/whatsapp/.test(blob)) return { id: REFERRER.whatsapp, reason: "whatsapp UTM" };
  if (/upsell|crew/.test(blob)) return { id: REFERRER.teamUpsell, reason: "team upsell UTM" };
  if (/\bvan\b|vehicle/.test(blob)) return { id: REFERRER.vans, reason: "van/vehicle UTM (QR)" };
  if (/leaflet|flyer|print|door-?drop/.test(blob))
    return { id: REFERRER.leaflet, reason: "leaflet/print UTM" };
  if (/referral|refer-?a-?friend/.test(blob))
    return { id: REFERRER.customerReferral, reason: "referral UTM" };

  const url = utm.pageUrl ?? "";
  if (/[?&](gclid|gbraid|wbraid|msclkid)=/i.test(url))
    return { id: REFERRER.ppc, reason: "paid search click id in URL" };

  if (medium && PAID.test(medium)) {
    return SOCIAL.test(source)
      ? { id: REFERRER.social, reason: `paid social (medium=${medium}, source=${source})` }
      : { id: REFERRER.ppc, reason: `paid medium=${medium}` };
  }

  if (/email|newsletter/.test(medium)) return { id: REFERRER.email, reason: `medium=${medium}` };
  if (/social|story|bio/.test(medium)) return { id: REFERRER.social, reason: `medium=${medium}` };

  if (source) {
    if (SOCIAL.test(source)) return { id: REFERRER.social, reason: `source=${source}` };
    if (EMAIL_TOOL.test(source)) return { id: REFERRER.email, reason: `source=${source}` };
    if (SEARCH.test(source))
      return { id: REFERRER.organic, reason: `search source=${source} (includes GBP links)` };
  }

  const refHost = (() => {
    try {
      return utm.referrer ? new URL(utm.referrer).hostname : "";
    } catch {
      return "";
    }
  })();
  if (refHost) {
    if (SEARCH.test(refHost)) return { id: REFERRER.organic, reason: `referred by ${refHost}` };
    if (SOCIAL.test(refHost)) return { id: REFERRER.social, reason: `referred by ${refHost}` };
  }

  return { id: REFERRER.undefined, reason: "no usable attribution on the submission" };
}

/* ── the sync ──────────────────────────────────────────────────────────── */

export interface LeadForServiceOs {
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  address?: string;
  /** The consultation serviceType enum (routes the ServiceOS service id). */
  serviceType?: string;
  /** Chosen sub-service slug (routes to a more specific ServiceOS service). */
  serviceDetail?: string;
  /** Human service label for the comment (falls back to serviceType). */
  service?: string;
  message?: string;
  sourceForm?: string;
  pageUrl?: string;
  submittedAt: Date;
  utm: { source?: string; medium?: string; campaign?: string; content?: string; term?: string };
  /** gclid / gbraid / wbraid / msclkid / fbclid, space separated. Presence proves a paid click. */
  clickIds?: string;
  /** External referring URL, when the browser gave one. */
  referrer?: string;
  /** The page they first landed on. */
  landingPage?: string;
}

function commentBody(lead: LeadForServiceOs, ref: { id: number; reason: string }) {
  const u = lead.utm;
  const when = lead.submittedAt.toLocaleString("en-GB", { timeZone: "Europe/London" });
  const serviceLabel = lead.service || SERVICE_LABEL[lead.serviceType ?? ""] || lead.serviceType || "-";
  return [
    "🌐 WEB ENQUIRY — willowalexander.co.uk",
    `Received: ${when}   |   Form: ${lead.sourceForm || "-"}   |   Service: ${serviceLabel}`,
    "",
    `Name: ${lead.name}   Phone: ${lead.phone || "-"}   Email: ${lead.email}   Postcode: ${lead.postcode || "-"}`,
    `Source page: ${lead.pageUrl || "-"}`,
    `How they found us: referrer ${ref.id}: ${ref.reason}`,
    `UTM: source=${u.source || "-"} medium=${u.medium || "-"} campaign=${u.campaign || "-"} term=${u.term || "-"} content=${u.content || "-"}`,
    "",
    "Message:",
    lead.message || "(none given)",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function syncLeadToServiceOs(lead: LeadForServiceOs): Promise<ServiceOsSyncResult> {
  const cfg = readConfig();
  if (!cfg) {
    return { status: "off", error: "ServiceOS not configured or disabled" };
  }

  const serviceId = resolveServiceId(lead.serviceType, lead.serviceDetail);

  try {
    const [firstName, ...rest] = lead.name.trim().split(/\s+/);
    const lastName = rest.join(" ") || "-";

    const candidates = await findClientCandidates(cfg, lead.phone ?? "", lead.email);

    // EVERY ENQUIRY GETS ITS OWN HOT LEAD (owner's decision). Client records are
    // still deduplicated — pick an EXISTING person rather than adding a copy —
    // but we never fold two enquiries into one lead, so two different jobs both
    // get quoted. Pick the client DETERMINISTICALLY: a record with real booking
    // history (their established file), else the lowest id. Capped at five.
    const scored: Array<{ id: number; hasHistory: boolean }> = [];
    let isReturning = false;

    for (const id of [...candidates].sort((a, b) => a - b).slice(0, 5)) {
      const r = await call(cfg, `/user/clients/${id}/bookings`);
      if (!("data" in r) || !Array.isArray(r.data)) continue;
      const bookings = r.data as SoBooking[];
      const hasHistory = bookings.some((b) => b.status_id !== HOT_LEAD_STATUS_ID);
      if (hasHistory) isReturning = true;
      scored.push({ id, hasHistory });
    }

    const clientId: number | null =
      scored.find((s) => s.hasHistory)?.id ??
      scored[0]?.id ??
      [...candidates].sort((a, b) => a - b)[0] ??
      null;

    const ref = inferReferrer({
      ...lead.utm,
      pageUrl: [lead.pageUrl, lead.clickIds ? `?gclid=${lead.clickIds}` : ""].join(""),
      referrer: lead.referrer,
      isReturningClient: isReturning,
    });

    if (cfg.dryRun) {
      console.log(
        `[serviceos] DRY RUN, nothing written. clientId=${clientId ?? "would create"} ` +
          `candidates=${candidates.length} serviceType=${lead.serviceType} serviceId=${serviceId} ` +
          `referrer=${ref.id} (${ref.reason}) name="${lead.name}" email=${lead.email}`,
      );
      return { status: "dry-run", serviceId, referrerId: ref.id, referrerReason: ref.reason };
    }

    // Create the client if none matched. Tracked, because only a client we
    // created in THIS request may have identity fields written by the booking.
    let id: number | null = clientId;
    let createdClient = false;
    if (!id) {
      createdClient = true;
      const created = await call(cfg, "/user/clients", {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone: lead.phone ?? "",
          email: lead.email,
          postcode: lead.postcode ?? "",
          address: lead.address ?? "",
        }),
      });
      if ("data" in created) id = firstRow<SoClient>(created.data)?.id ?? null;
      // 200 with data:null means ServiceOS spotted a duplicate — look it up again.
      if (!id) id = (await findClientCandidates(cfg, lead.phone ?? "", lead.email))[0] ?? null;
      if (!id) return { status: "failed", error: "could not find or create client", serviceId };
    }

    // ⚠ ServiceOS applies a booking's identity fields BACK ONTO the client
    // record. So send name/phone/email ONLY when we created the client this
    // request (the form is then the only source of truth). For a matched
    // client, send just the job fields; the enquiry's own name/phone/email are
    // in the comment, where sales can see them without overwriting the record.
    const bookingPayload: Record<string, unknown> = {
      client_id: id,
      service_id: serviceId,
      status_id: HOT_LEAD_STATUS_ID,
      postcode: lead.postcode ?? "",
      address: lead.address ?? "",
      referrer_id: ref.id,
    };
    if (createdClient) {
      bookingPayload.first_name = firstName;
      bookingPayload.last_name = lastName;
      bookingPayload.phone = lead.phone ?? "";
      bookingPayload.email = lead.email;
    }

    const booking = await call(cfg, "/user/bookings", {
      method: "POST",
      body: JSON.stringify(bookingPayload),
    });
    if ("error" in booking) return { status: "failed", error: `create booking: ${booking.error}`, serviceId };

    const row = firstRow<SoBooking>(booking.data);
    if (!row?.id || row.id <= 0) return { status: "failed", error: "booking created without an id", serviceId };

    const c = await call(cfg, `/user/bookings/${row.id}/comments`, {
      method: "POST",
      body: JSON.stringify({ comment: commentBody(lead, ref), tags: [COMMENT_TAG_SYSTEM] }),
    });
    if ("error" in c) {
      console.error(`[serviceos] booking ${row.num} created but comment failed: ${c.error}`);
    }

    return {
      status: "done",
      bookingId: row.id,
      bookingNum: row.num,
      serviceId,
      referrerId: ref.id,
      referrerReason: ref.reason,
    };
  } catch (e) {
    return { status: "failed", error: e instanceof Error ? e.message : "unexpected error", serviceId };
  }
}
