import Link from "next/link";
import Image from "next/image";
import { CookiePreferencesLink } from "@/components/consent/CookiePreferencesLink";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";
import { PoweredByHowa } from "@/components/marketing/PoweredByHowa";

/**
 * Global footer.
 * Spec: DESIGN.md Part C · "<Footer />" · doc §6.3
 * Two bands so it does not read as one continuous brown slab:
 *   1. Brand band — cream, with the wordmark, the institutional line and contact.
 *   2. Body band  — House brown, with the five nav columns, disclosure and legal.
 */

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

const COLS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Gardeners", href: "/services/gardening" },
      { label: "Cleaners", href: "/services/cleaning" },
      { label: "Window cleaners", href: "/services/window-cleaning" },
      { label: "Repairs", href: "/services/handyman" },
      { label: "Home & garden", href: "/services/home-and-garden" },
    ],
  },
  {
    heading: "Insurance & Cover",
    links: [
      { label: "Home & contents", href: "/insurance/everyday/home" },
      { label: "Pet & travel", href: "/insurance/everyday/pet-and-travel" },
      { label: "Private client & estate", href: "/insurance/private-client" },
      { label: "Business & commercial", href: "/insurance/business" },
      { label: "Claims & help", href: "/insurance/claims-and-help" },
    ],
  },
  {
    heading: "Shop · Magazine · Offers",
    links: [
      { label: "The House Store", href: "/shop" },
      { label: "The Hearth magazine", href: "/the-hearth" },
      { label: "House Offers", href: "/offers" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Help & account",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "My House", href: "/my-house" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About the House", href: "/the-house/about" },
      { label: "Philosophy", href: "/the-house/philosophy" },
      { label: "Standards", href: "/the-house/standards" },
      { label: "House Approved Pro", href: "/house-approved-pro" },
    ],
  },
];

export interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

const DIVIDER = "border-[rgba(245,240,232,0.14)]";

export function Footer({ columns, tagline }: FooterProps) {
  const cols = columns && columns.length > 0 ? columns : COLS;
  const tag = tagline || "Ownership is passive. Stewardship is intentional.";

  return (
    <footer className="mt-auto">
      {/* Brand band — cream, distinct from the brown body below */}
      <div className="border-t border-house-brown/12 bg-house-cream-light px-[5vw] py-[clamp(40px,5vw,64px)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[42ch]">
            <Link href="/" aria-label="House of Willow Alexander, home" className="inline-block">
              <Image
                src="/brand/wordmark.svg"
                alt="House of Willow Alexander"
                width={296}
                height={125}
                className="h-[56px] w-auto"
              />
            </Link>
            <p className="mt-6 font-display text-[clamp(26px,2.8vw,38px)] leading-[1.1] text-house-brown">
              An institution for the British home.
            </p>
            <p className="mt-3 font-sans text-[18px] leading-[1.55] text-house-brown/70">
              For the care, protection and enjoyment of home and garden.
            </p>
          </div>

          <div className="shrink-0 font-sans text-[18px] leading-[1.7] text-house-brown/85">
            <p className="mb-3 text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
              Speak to the House
            </p>
            <p>
              <a href="tel:08000478738" className="text-house-brown no-underline hover:text-house-gold-ink">
                0800 047 8738
              </a>
            </p>
            <p>
              <a href="mailto:sales@willowalexander.co.uk" className="text-house-brown no-underline hover:text-house-gold-ink">
                sales@willowalexander.co.uk
              </a>
            </p>
            <p className="mt-1 text-house-brown/55">Monday to Friday, 8am to 6pm</p>
          </div>
        </div>
      </div>

      {/* Body band — House brown */}
      <div className="relative overflow-hidden bg-house-brown text-house-cream px-[5vw] pt-14 pb-10">
        <FlowerWatermark color="gold" side="left" opacity={0.13} />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Nav columns */}
          <div className={`grid grid-cols-1 gap-10 border-b ${DIVIDER} pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`}>
            {cols.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-light">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, i) => (
                    <li key={`${link.href}-${i}`}>
                      <Link
                        href={link.href}
                        className="font-sans text-[18px] text-house-cream no-underline opacity-85 transition-opacity duration-[var(--t-base)] hover:opacity-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclosure + Powered by HoWA */}
          <div className={`max-w-[760px] border-b ${DIVIDER} py-9`}>
            <p className="font-sans text-[17px] leading-[1.65] text-house-cream/70">
              Booking and home intelligence powered by HoWA. Insurance is arranged by Provenance,
              which is authorised and regulated by the Financial Conduct Authority.
            </p>
            <div className="pt-5">
              <PoweredByHowa size="compact" href="/how-it-works" dark />
            </div>
          </div>

          {/* Bottom: legal + tagline */}
          <div className="flex flex-col gap-4 pt-7 md:flex-row md:items-center md:justify-between">
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[16px] text-house-cream/70"
            >
              <Link href="/legal/privacy" className="no-underline hover:text-house-cream transition-colors">
                Privacy
              </Link>
              <Link href="/legal/terms" className="no-underline hover:text-house-cream transition-colors">
                Terms
              </Link>
              <Link href="/legal/cookies" className="no-underline hover:text-house-cream transition-colors">
                Cookie policy
              </Link>
              <CookiePreferencesLink />
            </nav>
            <p className="font-sans text-[16px] italic text-house-cream/55">{tag}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
