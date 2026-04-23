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

const sourcePage = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal("").transform(() => undefined));

// Honeypot field — real users never fill this; bots usually do.
const honey = z
  .string()
  .max(0, "Invalid submission")
  .optional()
  .or(z.literal("").transform(() => undefined));

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
});

export type ConsultationBookingInput = z.input<typeof consultationBookingSchema>;
export type ConsultationBookingOutput = z.output<typeof consultationBookingSchema>;

// ---------------------------------------------------------------------------
// Waitlist (Steward / Protect Review / Insurance / HoWA app / other)
// ---------------------------------------------------------------------------
export const waitlistInterestSchema = z.object({
  email,
  product: z.enum(["steward", "protect_review", "insurance", "howa_app", "other"]),
  context: z.record(z.string(), z.unknown()).optional(),
  sourcePage,
  turnstileToken,
  honey,
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

export const newsletterSchema = z.object({
  name: optionalName,
  email,
  sourcePage,
  turnstileToken,
  honey,
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
