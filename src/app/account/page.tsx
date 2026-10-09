import type { Metadata } from "next";
import { env } from "@/lib/env";
import { pageMeta } from "@/lib/seo/meta";

/**
 * /account — one front door for the two separate account systems. Services &
 * membership live on ServiceOS (accounts.willowalexander.co.uk); shop orders
 * live on Shopify customer accounts (NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL). The
 * customer shouldn't have to know which is which, so this page points at both.
 * The old WooCommerce /my-account URL 301s here (see next.config).
 */
export const metadata: Metadata = {
  title: "Your account",
  description:
    "Manage your House of Willow Alexander account: bookings, visits, membership and your home record, plus shop orders, past purchases and returns.",
  // A signed-out doorway to two external account systems — no unique indexable
  // content of its own, so keep it out of the index (Search Console audit).
  robots: { index: false, follow: true },
  ...pageMeta("/account"),
};

const SERVICEOS_URL = "https://accounts.willowalexander.co.uk";

const TILES = [
  {
    href: SERVICEOS_URL,
    eyebrow: "Services & membership",
    title: "Bookings, visits and your Home Record",
    body: "Manage your service bookings and visits, your membership, and the Home Record of everything done to your home.",
    cta: "Go to services & membership",
  },
  {
    href: env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL,
    eyebrow: "Shop orders",
    title: "Orders, purchases and returns",
    body: "Track a shop order, look back over past purchases, and start a return from the House Store.",
    cta: "Go to shop orders",
  },
];

export default function AccountPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-24 pb-16">
        <div className="mx-auto max-w-[960px]">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-dark">
            The House
          </p>
          <h1 className="mt-4 font-display text-[clamp(37px,5.5vw,64px)] leading-[1.04] text-house-black">
            Your account.
          </h1>
          <p className="mt-6 max-w-[52ch] font-sans text-[21px] leading-[1.6] text-house-stone">
            Your services and your shop orders are looked after in two places. Choose the one you need; you can always come back here.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TILES.map((t) => (
              <a
                key={t.eyebrow}
                href={t.href}
                className="group flex flex-col border border-house-brown/15 bg-house-white p-8 no-underline transition-[border-color,box-shadow] hover:border-house-gold-dark hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)]"
              >
                <p className="font-sans text-[13px] tracking-[0.24em] uppercase text-house-gold-dark">
                  {t.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-[clamp(23px,2.4vw,29px)] leading-[1.2] text-house-black">
                  {t.title}
                </h2>
                <p className="mt-3 mb-8 font-sans text-[18px] leading-[1.6] text-house-stone">
                  {t.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown group-hover:text-house-gold-dark">
                  {t.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 font-sans text-[15px] leading-[1.6] text-house-stone/80">
            Signing in is handled securely by each service. As the House and HoWA
            come together, these will move into one place.
          </p>
        </div>
      </section>
    </div>
  );
}
