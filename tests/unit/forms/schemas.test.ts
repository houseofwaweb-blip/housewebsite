/**
 * Form schema tests — these are the gatekeepers for every public POST.
 * Regressions here are exploitable: bad email through, bad phone through,
 * honeypot accepts text, postcode regex weakens, etc.
 *
 * We exercise the actual zod schemas (no mocking) because we want the
 * regex + transforms verified end-to-end.
 */
import { describe, it, expect } from "vitest";
import {
  consultationBookingSchema,
  waitlistInterestSchema,
  contactSubmissionSchema,
  newsletterSchema,
  formRegistry,
} from "@/lib/forms/schemas";

const baseConsultation = {
  name: "Alex Field",
  email: "alex@example.com",
  serviceType: "general" as const,
  turnstileToken: "tok",
};

const baseWaitlist = {
  email: "alex@example.com",
  product: "steward" as const,
  turnstileToken: "tok",
};

const baseContact = {
  name: "Alex Field",
  email: "alex@example.com",
  message: "Hello",
  topic: "general" as const,
  turnstileToken: "tok",
};

const baseNewsletter = {
  email: "alex@example.com",
  turnstileToken: "tok",
};

describe("consultationBookingSchema", () => {
  it("accepts a minimal valid booking", () => {
    const r = consultationBookingSchema.parse(baseConsultation);
    expect(r.email).toBe("alex@example.com");
    expect(r.serviceType).toBe("general");
  });

  it("lowercases + trims email", () => {
    const r = consultationBookingSchema.parse({
      ...baseConsultation,
      email: "  ALEX@Example.COM ",
    });
    expect(r.email).toBe("alex@example.com");
  });

  it("uppercases UK postcode", () => {
    const r = consultationBookingSchema.parse({
      ...baseConsultation,
      postcode: "sw1a 1aa",
    });
    expect(r.postcode).toBe("SW1A 1AA");
  });

  it("accepts UK postcode without space", () => {
    const r = consultationBookingSchema.parse({
      ...baseConsultation,
      postcode: "EC1A1BB",
    });
    expect(r.postcode).toBe("EC1A1BB");
  });

  it("rejects malformed UK postcode", () => {
    expect(() =>
      consultationBookingSchema.parse({
        ...baseConsultation,
        postcode: "12345",
      }),
    ).toThrow();
  });

  it("rejects oversized notes (>2000 chars)", () => {
    expect(() =>
      consultationBookingSchema.parse({
        ...baseConsultation,
        notes: "x".repeat(2001),
      }),
    ).toThrow();
  });

  it("rejects unknown serviceType", () => {
    expect(() =>
      consultationBookingSchema.parse({
        ...baseConsultation,
        serviceType: "elephant" as never,
      }),
    ).toThrow();
  });

  it("requires turnstileToken", () => {
    const { turnstileToken: _t, ...without } = baseConsultation;
    void _t;
    expect(() => consultationBookingSchema.parse(without)).toThrow();
  });

  it("rejects a populated honeypot", () => {
    expect(() =>
      consultationBookingSchema.parse({
        ...baseConsultation,
        honey: "i am a bot",
      }),
    ).toThrow();
  });

  it("treats empty optional fields as undefined (not empty string)", () => {
    const r = consultationBookingSchema.parse({
      ...baseConsultation,
      phone: "",
      postcode: "",
      sourcePage: "",
    });
    expect(r.phone).toBeUndefined();
    expect(r.postcode).toBeUndefined();
    expect(r.sourcePage).toBeUndefined();
  });
});

describe("waitlistInterestSchema", () => {
  it("accepts the 5 product variants", () => {
    for (const product of ["steward", "protect_review", "insurance", "howa_app", "other"] as const) {
      const r = waitlistInterestSchema.parse({ ...baseWaitlist, product });
      expect(r.product).toBe(product);
    }
  });

  it("rejects an unknown product", () => {
    expect(() =>
      waitlistInterestSchema.parse({ ...baseWaitlist, product: "spaceship" as never }),
    ).toThrow();
  });

  it("allows freeform context object", () => {
    const r = waitlistInterestSchema.parse({
      ...baseWaitlist,
      context: { homeType: "victorian", postcode: "SW1A 1AA" },
    });
    expect(r.context).toEqual({ homeType: "victorian", postcode: "SW1A 1AA" });
  });
});

describe("contactSubmissionSchema", () => {
  it("requires a non-empty message", () => {
    expect(() =>
      contactSubmissionSchema.parse({ ...baseContact, message: "" }),
    ).toThrow();
  });

  it("rejects oversized message (>5000 chars)", () => {
    expect(() =>
      contactSubmissionSchema.parse({ ...baseContact, message: "x".repeat(5001) }),
    ).toThrow();
  });

  it("defaults topic to general when omitted", () => {
    const { topic: _topic, ...without } = baseContact;
    void _topic;
    const r = contactSubmissionSchema.parse(without);
    expect(r.topic).toBe("general");
  });

  it("rejects unknown topic", () => {
    expect(() =>
      contactSubmissionSchema.parse({ ...baseContact, topic: "spam" as never }),
    ).toThrow();
  });
});

describe("newsletterSchema", () => {
  it("accepts no interests (empty array)", () => {
    const r = newsletterSchema.parse(baseNewsletter);
    expect(r.interests).toEqual([]);
  });

  it("accepts up to 4 interests", () => {
    const r = newsletterSchema.parse({
      ...baseNewsletter,
      interests: ["the-house", "services", "garden-design", "interior-design"],
    });
    expect(r.interests).toHaveLength(4);
  });

  it("rejects unknown interest", () => {
    expect(() =>
      newsletterSchema.parse({
        ...baseNewsletter,
        interests: ["the-house", "celebrity-gossip"] as never,
      }),
    ).toThrow();
  });

  it("allows missing name (newsletter is email-first)", () => {
    const r = newsletterSchema.parse(baseNewsletter);
    expect(r.name).toBeUndefined();
  });
});

describe("formRegistry", () => {
  it("exposes the 4 expected form types with matching tables", () => {
    expect(Object.keys(formRegistry).sort()).toEqual(
      ["consultation", "waitlist", "contact", "newsletter"].sort(),
    );
    expect(formRegistry.consultation.table).toBe("consultation_bookings");
    expect(formRegistry.waitlist.table).toBe("waitlist_interests");
    expect(formRegistry.contact.table).toBe("contact_submissions");
    expect(formRegistry.newsletter.table).toBe("newsletter_subscribers");
  });
});
