import { HearthFullWidthNewsletter } from "@/components/hearth/HearthFullWidthNewsletter";

/**
 * /newsletter — standalone sign-up landing page.
 *
 * Built for Linktree / Instagram bio traffic: one direct link to subscribe.
 * Reuses the dark Hearth sign-up block (same form, same /api/forms/newsletter
 * pipeline, same Turnstile + Klaviyo + Meta CompleteRegistration), centred in
 * the viewport so the form is visible without scrolling on a phone. Header and
 * footer come from the root layout. /subscribe 301s here (next.config.ts).
 */

export const metadata = {
  alternates: { canonical: "/newsletter" },
  title: { absolute: "Subscribe to The Hearth | House of Willow Alexander" },
  description:
    "Seasonal notes on home and garden from the House of Willow Alexander.",
  openGraph: {
    title: "Subscribe to The Hearth | House of Willow Alexander",
    description:
      "Seasonal notes on home and garden from the House of Willow Alexander.",
    url: "/newsletter",
    images: [{ url: "/home/hearth-card-still.webp" }],
  },
};

export default function NewsletterPage() {
  return (
    <main className="bg-house-black">
      <HearthFullWidthNewsletter
        sourcePage="/newsletter"
        id="subscribe"
        collectName
        className="mt-0 flex min-h-[calc(100svh-var(--header-h,72px))] flex-col justify-center py-14 md:py-20"
      />
    </main>
  );
}
