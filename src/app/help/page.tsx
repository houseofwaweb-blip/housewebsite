import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Help",
  description:
    "The House help centre. Find answers by task: bookings, insurance and claims, orders and returns, My House, payments and House Approved Pro.",
};

const cream = "var(--color-house-cream)";
const creamLight = "var(--color-house-cream-light)";
const brown = "var(--color-house-brown)";
const ink = "var(--color-house-ink)";
const gold = "var(--house-gold)";
const goldDark = "var(--house-gold-dark)";
const line = "var(--color-house-line)";
const display = "var(--font-display)";
const sans = "var(--font-sans)";

type Category = {
  title: string;
  intro: string;
  tasks: string[];
  action: { label: string; href: string };
};

const categories: Category[] = [
  {
    title: "Manage a booking",
    intro: "Change, repeat or cancel a service visit, and understand arrival windows and terms.",
    tasks: [
      "Reschedule or cancel an upcoming visit",
      "Rebook a service you have had before",
      "Check what time your professional will arrive",
      "Understand cancellation and rescheduling terms",
    ],
    action: { label: "Go to My House", href: "/my-house" },
  },
  {
    title: "Insurance and claims",
    intro: "Get help with home and pet cover, policy documents, renewals and making a claim.",
    tasks: [
      "Start or continue a quote",
      "Find your policy documents",
      "Make or track a claim",
      "Understand what is and is not covered",
    ],
    action: { label: "Insurance and cover help", href: "/insurance-and-cover/help-and-claims" },
  },
  {
    title: "Orders and returns",
    intro: "Track a House Store order, arrange a return and check delivery and stock.",
    tasks: [
      "Track a Store order and delivery",
      "Return or exchange an item",
      "Check stock and delivery times",
      "Find a receipt or invoice",
    ],
    action: { label: "Visit the House Store", href: "/shop" },
  },
  {
    title: "My House and Home Record",
    intro: "Sign in, keep your Home Record up to date and manage what the House remembers.",
    tasks: [
      "Sign in to My House",
      "Add or edit property and access details",
      "Upload documents, receipts and warranties",
      "Manage reminders and recommendations",
    ],
    action: { label: "Go to My House", href: "/my-house" },
  },
  {
    title: "Payments and refunds",
    intro: "Understand charges, pricing basis, VAT treatment and how refunds are handled.",
    tasks: [
      "Understand a charge or the pricing basis",
      "Update a payment method",
      "Request or track a refund",
      "Read about VAT and minimum booking values",
    ],
    action: { label: "Contact the House", href: "/contact" },
  },
  {
    title: "House Approved Pro",
    intro: "For professionals: applying, verification, tools and the commercial model.",
    tasks: [
      "Apply to become House Approved",
      "Understand the contractor model and fees",
      "Check standards, vetting and insurance requirements",
      "Get help with your booking and payout tools",
    ],
    action: { label: "House Approved Pro", href: "/house-approved-pro" },
  },
];

export default function HelpPage() {
  return (
    <div style={{ background: cream, color: ink }}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Help", href: "/help" },
        ]}
      />
      {/* Hero */}
      <header
        style={{
          padding:
            "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 96px) clamp(40px, 5vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: goldDark,
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span aria-hidden style={{ width: 36, height: 1, background: goldDark, opacity: 0.7 }} />
            Help
          </p>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(42px, 5.4vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: brown,
              margin: "28px 0 0",
              maxWidth: "18ch",
            }}
          >
            How can the House help?
          </h1>
          <p
            style={{
              fontFamily: sans,
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.6,
              color: "rgba(48, 35, 28, 0.84)",
              margin: "28px 0 0",
              maxWidth: "54ch",
            }}
          >
            Find what you need by task. If you cannot see it here, the House team
            is only an email or a call away.
          </p>
        </div>
      </header>

      {/* Category grid */}
      <section
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "clamp(16px, 3vw, 40px) clamp(24px, 5vw, 96px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 1,
            background: line,
            border: `1px solid ${line}`,
          }}
        >
          {categories.map((c) => (
            <div
              key={c.title}
              style={{
                background: cream,
                padding: "clamp(28px, 3.2vw, 40px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontFamily: display,
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  lineHeight: 1.15,
                  color: brown,
                  margin: "0 0 14px",
                }}
              >
                {c.title}
              </h2>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(48, 35, 28, 0.78)",
                  margin: "0 0 20px",
                }}
              >
                {c.intro}
              </p>
              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0 }}>
                {c.tasks.map((t) => (
                  <li
                    key={t}
                    style={{
                      fontFamily: sans,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: brown,
                      padding: "10px 0",
                      borderBottom: `1px solid ${line}`,
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                    }}
                  >
                    <span aria-hidden style={{ color: gold, fontFamily: display }}>
                      ·
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto" }}>
                <Link
                  href={c.action.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    padding: "0 24px",
                    background: "transparent",
                    color: brown,
                    fontFamily: sans,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    border: `1px solid ${brown}`,
                  }}
                >
                  {c.action.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact band */}
      <section style={{ background: creamLight, borderTop: `1px solid ${line}`, marginTop: "clamp(48px, 6vw, 80px)" }}>
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "clamp(56px, 7vw, 96px) clamp(24px, 5vw, 96px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(26px, 3.2vw, 44px)",
              lineHeight: 1.12,
              color: brown,
              margin: "0 auto 20px",
              maxWidth: "20ch",
            }}
          >
            Still need a hand?
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(48, 35, 28, 0.82)",
              margin: "0 auto 32px",
              maxWidth: "46ch",
            }}
          >
            Speak to the House team. We will point you to the right place, or sort
            it for you.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 48,
              padding: "0 36px",
              background: brown,
              color: "var(--color-house-chalk)",
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: `1px solid ${brown}`,
            }}
          >
            Contact the House
          </Link>
        </div>
      </section>
    </div>
  );
}
