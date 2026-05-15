import "server-only";
import { env } from "@/lib/env";

/**
 * Klaviyo client — newsletter signup with interest tagging.
 *
 * We call the Klaviyo REST API directly (no SDK) — keeps the bundle lean
 * and avoids a runtime dep that breaks with every revision bump.
 *
 * Behaviour:
 *   - KLAVIYO_PRIVATE_KEY unset → no-op, logs that it would have subscribed.
 *     Lets dev work without an account and lets the newsletter form keep
 *     flowing (Supabase row still written) even when ops haven't wired it yet.
 *   - KLAVIYO_PRIVATE_KEY set → real subscribe via the consent-aware
 *     `profile-subscription-bulk-create-jobs` endpoint. Failure logs but
 *     does not throw — the signup is already persisted to Supabase, so a
 *     Klaviyo blip never breaks the user flow.
 *
 * Interest taxonomy — what the user picks on the form maps to one or more
 * `interest` property values that drive existing Klaviyo segments. See the
 * SURFACE_TO_INTEREST map below and the segment definitions at:
 *   - Cleaners Interests Segment    (U4DfAR) — interest contains "cleaners"
 *   - Gardeners Interest Segment    (RKGQag) — interest contains "gardeners"
 *   - Window Cleaners Interest      (UzJ3Kp) — interest contains "windows"
 *   - Garden Design Interest        (VYTTFX) — interest contains "design"
 *   - Interior Design Interest      (XHM5XW) — interest contains "interior"
 *   - House Interests Segment       (RW9QVL) — interest contains "howa"
 */

const REVISION = "2024-10-15";

/** Master list — double opt-in, the long-running newsletter list. */
const NEWSLETTER_LIST_ID = "Xbs4GL";

/**
 * Form-facing interest IDs → Klaviyo `interest` property values.
 *
 * "services" is the grouped option: picking it tags the profile with all
 * three service-based interests so they land in every relevant segment.
 * Handyman is omitted from the launch form (deferred service).
 */
export const SURFACE_TO_INTEREST: Record<string, string[]> = {
  "the-house": ["howa"],
  services: ["cleaners", "gardeners", "windows"],
  "garden-design": ["design"],
  "interior-design": ["interior"],
};

export type InterestSurface = keyof typeof SURFACE_TO_INTEREST;

export interface SubscribeInput {
  email: string;
  /** Optional first name — fed into Klaviyo's `first_name` profile field. */
  firstName?: string;
  /** Form-facing surface IDs the user ticked. Empty array = no interests. */
  surfaces: InterestSurface[];
  /** Where the signup came from. Stored as `signup_page` profile property. */
  sourcePage?: string;
}

export interface SubscribeResult {
  ok: boolean;
  error?: string;
  /** True when we skipped because no API key is configured. */
  skipped?: boolean;
}

function surfacesToInterestString(surfaces: InterestSurface[]): string {
  const tags = new Set<string>();
  for (const s of surfaces) {
    for (const t of SURFACE_TO_INTEREST[s] ?? []) tags.add(t);
  }
  return Array.from(tags).join(",");
}

export async function subscribeToNewsletter(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  if (!env.KLAVIYO_PRIVATE_KEY) {
    console.log(
      `[klaviyo:skipped] email=${input.email} surfaces=${input.surfaces.join("|")} — KLAVIYO_PRIVATE_KEY not set`,
    );
    return { ok: false, skipped: true };
  }

  const interest = surfacesToInterestString(input.surfaces);

  // profile-subscription-bulk-create-jobs is the consent-aware endpoint —
  // it sets marketing-consent + adds to the list in one call, and triggers
  // the double-opt-in flow when the target list requires it (Xbs4GL does).
  const body = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: input.email,
                ...(input.firstName ? { first_name: input.firstName } : {}),
                subscriptions: {
                  email: { marketing: { consent: "SUBSCRIBED" } },
                },
                properties: {
                  ...(interest ? { interest } : {}),
                  signup_source: "marketing-site",
                  ...(input.sourcePage ? { signup_page: input.sourcePage } : {}),
                },
              },
            },
          ],
        },
        // Custom source string surfaces in the Klaviyo dashboard's
        // "subscription source" column — useful when triaging volume.
        custom_source: "marketing-site",
      },
      relationships: {
        list: { data: { type: "list", id: NEWSLETTER_LIST_ID } },
      },
    },
  };

  try {
    const res = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${env.KLAVIYO_PRIVATE_KEY}`,
          revision: REVISION,
          "Content-Type": "application/json",
          accept: "application/vnd.api+json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(`[klaviyo:failed] ${res.status} — ${detail.slice(0, 240)}`);
      return { ok: false, error: `klaviyo-${res.status}` };
    }

    // 202 Accepted is the success shape for the bulk-job endpoint. Body is empty.
    return { ok: true };
  } catch (e) {
    console.error("[klaviyo:exception]", e);
    return { ok: false, error: "network" };
  }
}
