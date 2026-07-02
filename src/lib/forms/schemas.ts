import { z } from "zod";

/**
 * Form schemas. Used by client-side RHF and server-side API routes (same source of truth).
 * Every public POST body must include turnstileToken for anti-abuse.
 */

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address")
  .max(254);

const name = z.string().trim().min(1, "Required").max(120);

const ukPhone = z
  .string()
  .trim()
  .regex(/^[0-9+()\-\s]{7,20}$/u, "Please enter a valid phone number")
  .optional()
  .or(z.literal("").transform(() => undefined));

const ukPostcode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/u,
    "Please enter a valid UK postcode",
  )
  .optional()
  .or(z.literal("").transform(() => undefined));

const turnstileToken = z.string().min(1, "Verification required");

// `min(1)` is what gives the `.or(literal(""))` branch a chance to run.
// Without it, empty string is a valid `string()` value and the union short-
// circuits on the first branch, leaving "" to slip through to Supabase.
const sourcePage = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .optional()
  .or(z.literal("").transform(() => undefined));

// Honeypot field — real users never fill this; bots usually do.
const honey = z
  .string()
  .max(0, "Invalid submission")
  .optional()
  .or(z.literal("").transform(() => undefined));

// First-touch marketing attribution (UTM + landing page + referrer + ad click
// IDs), captured client-side and attached to every submission. Stripped before
// the Supabase insert; surfaced in the notification email for the sales trail.
const tracking = z
  .object({
    gclid: z.string().max(400),
    gbraid: z.string().max(400),
    wbraid: z.string().max(400),
    fbclid: z.string().max(400),
    msclkid: z.string().max(400),
    utmSource: z.string().max(200),
    utmMedium: z.string().max(200),
    utmCampaign: z.string().max(200),
    utmTerm: z.string().max(200),
    utmContent: z.string().max(200),
    landingPage: z.string().max(600),
    referrer: z.string().max(600),
    capturedAt: z.string().max(40),
  })
  .partial()
  .optional();

// ---------------------------------------------------------------------------
// Consultation booking
// ---------------------------------------------------------------------------
export const consultationBookingSchema = z.object({
  name,
  email,
  phone: ukPhone,
  postcode: ukPostcode,
  serviceType: z
    .enum([
      "design-interiors",
      "design-gardens",
      "gardening",
      "window-cleaning",
      "cleaning",
      "gutter-cleaning",
      "steward",
      "protect",
      "general",
    ])
    .default("general"),
  preferredDates: z.string().trim().max(240).optional(),
  notes: z.string().trim().max(2000).optional(),
  sourcePage,
  turnstileToken,
  honey,
  tracking,
});

export type ConsultationBookingInput = z.input<typeof consultationBookingSchema>;
export type ConsultationBookingOutput = z.output<typeof consultationBookingSchema>;

// ---------------------------------------------------------------------------
// Waitlist (Steward / Home Protection Review / Insurance / HoWA app / other)
// ---------------------------------------------------------------------------
export const waitlistInterestSchema = z.object({
  email,
  product: z.enum(["steward", "protect_review", "insurance", "howa_app", "other"]),
  // HoWA app waitlist extras (optional in the schema so the other register-
  // interest products keep working; the HoWA form makes tier required client-side).
  // tier maps to the Klaviyo `tier_interest` profile property; postcode is uppercased.
  firstName: z.string().trim().min(1).max(120).optional(),
  lastName: z.string().trim().min(1).max(120).optional(),
  postcode: z.string().trim().max(12).optional(),
  tier: z.enum(["assistant", "housekeeper", "steward"]).optional(),
  // Steward application extras (the /howa/steward "Request an invitation" form).
  // propertyType -> Klaviyo `property_type`; note -> `steward_note`.
  propertyType: z.string().trim().max(60).optional(),
  note: z.string().trim().max(2000).optional().or(z.literal("").transform(() => undefined)),
  context: z.record(z.string(), z.unknown()).optional(),
  sourcePage,
  turnstileToken,
  honey,
  tracking,
});

export type WaitlistInterestInput = z.input<typeof waitlistInterestSchema>;
export type WaitlistInterestOutput = z.output<typeof waitlistInterestSchema>;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const contactSubmissionSchema = z.object({
  name,
  email,
  subject: z.string().trim().max(240).optional(),
  message: z.string().trim().min(1, "Required").max(5000),
  topic: z
    .enum([
      "general",
      "press",
      "partnership",
      "careers",
      "existing-client",
      "complaint",
    ])
    .default("general"),
  sourcePage,
  turnstileToken,
  honey,
  tracking,
});

export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>;
export type ContactSubmissionOutput = z.output<typeof contactSubmissionSchema>;

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------
const optionalName = z
  .string()
  .trim()
  .max(120)
  .optional()
  .or(z.literal("").transform(() => undefined));

/**
 * Newsletter signup. `interests` is an array of form-facing surface IDs
 * that get mapped to Klaviyo `interest` property values by
 * lib/klaviyo/SURFACE_TO_INTEREST. Keep in sync with that map.
 *   - "the-house"     → editorial (Hearth, gardens, design notes)
 *   - "services"      → grouped: cleaners + gardeners + windows
 *   - "garden-design" → garden design / studios
 *   - "interior-design" → interior design / studios
 * Empty array is allowed — still rows into Supabase, just no Klaviyo tags.
 */
export const newsletterInterest = z.enum([
  "the-house",
  "services",
  "garden-design",
  "interior-design",
]);
export type NewsletterInterest = z.infer<typeof newsletterInterest>;

export const newsletterSchema = z.object({
  name: optionalName,
  email,
  interests: z.array(newsletterInterest).max(4).default([]),
  sourcePage,
  turnstileToken,
  honey,
  tracking,
});

export type NewsletterInput = z.input<typeof newsletterSchema>;
export type NewsletterOutput = z.output<typeof newsletterSchema>;

// ---------------------------------------------------------------------------
// Registry — maps the URL-path `type` to the schema + table + waitlist product
// ---------------------------------------------------------------------------
export const formRegistry = {
  consultation: {
    schema: consultationBookingSchema,
    table: "consultation_bookings" as const,
  },
  waitlist: {
    schema: waitlistInterestSchema,
    table: "waitlist_interests" as const,
  },
  contact: {
    schema: contactSubmissionSchema,
    table: "contact_submissions" as const,
  },
  newsletter: {
    schema: newsletterSchema,
    table: "newsletter_subscribers" as const,
  },
};

export type FormType = keyof typeof formRegistry;
