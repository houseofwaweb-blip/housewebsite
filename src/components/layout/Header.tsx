"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { MegaMenu, type MegaPanel } from "@/components/nav/MegaMenu";
import { SearchModal } from "@/components/search/SearchModal";
import { CartIcon } from "@/components/commerce/CartIcon";
import { useCart } from "@/components/commerce/CartContext";
import { PoweredByHowa } from "@/components/marketing/PoweredByHowa";
import { PRIMARY_NAV } from "./navConfig";

/**
 * Mobile menu grouping (spec §6.2): the drawer regroups the six primary panels
 * under five verbs — Do, Protect, Shop, Read, About. Offers folds into Shop
 * (footer col 3 keeps Shop / Magazine / Offers together).
 */
const MOBILE_GROUPS: { label: string; panelId: string }[] = [
  { label: "Do", panelId: "services" },
  { label: "Protect", panelId: "insurance" },
  { label: "Shop", panelId: "shop" },
  { label: "Read", panelId: "magazine" },
  { label: "About", panelId: "the-house" },
];

/**
 * Global site header.
 * Spec: DESIGN.md Part C · "<Header />" + /ux/09-interactions/playground.html (mega).
 *
 * Desktop: brand wordmark → MegaMenu (hover panels) → utility (search, sign in, CTA).
 * Mobile:  brand → hamburger → full-screen drawer with accordion-style children.
 *
 * Primary CTA ("Book a service") opens the House booking modal. Per the Aug-17
 * rebuild, HoWA is NOT a nav pillar or CTA — it appears only as the small
 * "Powered by HoWA" utility link below (spec L104–109, L397–403).
 */

export interface HeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
  /** Dark variant for navy stages (Steward, HoWA app bounce). */
  dark?: boolean;
  /** Navigation panels from Sanity. Falls back to PRIMARY_NAV. */
  nav?: MegaPanel[];
}

export function Header({
  ctaLabel = "Book a service",
  ctaHref = "#open-booking-form",
  dark: darkProp,
  nav,
}: HeaderProps) {
  const navPanels = nav ?? PRIMARY_NAV;
  const pathname = usePathname() ?? "";
  // Routes that run on a dark navy surface. /howa/steward is blueprint mode;
  // the /howa landing is now HoWA mode (light) per 2026-04-22 audit.
  const DARK_ROUTES = new Set(["/howa/steward"]);
  const dark = darkProp ?? DARK_ROUTES.has(pathname);

  const { openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Sticky mobile CTA (spec §6.2): "Book a service" on most routes, "Get a
  // quote" on Insurance & Cover routes.
  const isInsuranceRoute = pathname.startsWith("/insurance");
  const stickyCtaLabel = isInsuranceRoute ? "Get a quote" : ctaLabel;
  const stickyCtaHref = isInsuranceRoute ? "/insurance-and-cover/quote" : ctaHref;

  const panelById = (id: string) => navPanels.find((p) => p.id === id);

  return (
    <>

    <header
      className={cn(
        "sticky top-0 z-40",
        "flex items-center justify-between px-[5vw] py-3",
        "border-b",
        dark
          ? "bg-howa-navy/95 backdrop-blur text-house-cream border-[rgba(245,240,232,0.1)]"
          : "bg-house-cream text-house-brown border-[rgba(48,35,28,0.08)]",
      )}
    >
      {/* Wordmark */}
      <Link
        href="/"
        aria-label="House of Willow Alexander, home"
        className="flex items-center shrink-0"
      >
        <Image
          src={dark ? "/brand/wordmark-white.svg" : "/brand/wordmark.svg"}
          alt="House of Willow Alexander"
          width={296}
          height={125}
          priority
          className="h-[52px] md:h-[64px] w-auto"
        />
      </Link>

      {/* Desktop MegaMenu */}
      <div className="hidden lg:block flex-1 px-10">
        <MegaMenu panels={navPanels} dark={dark} />
      </div>

      {/* Utility right */}
      <div className="hidden lg:flex items-center gap-5 shrink-0">
        <button
          type="button"
          aria-label="Search the site"
          onClick={() => setSearchOpen(true)}
          className={cn(
            "bg-transparent border-0 cursor-pointer font-sans text-[12px] tracking-[0.16em] uppercase opacity-[0.55] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          Search
        </button>
        <PoweredByHowa size="compact" href="/how-it-works" dark={dark} />
        <Link
          href="/my-house"
          className={cn(
            "font-sans text-[12px] tracking-[0.16em] uppercase no-underline opacity-[0.55] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          My House
        </Link>
        <CartIcon dark={dark} onClick={openDrawer} />
        <Link
          href={ctaHref}
          data-ga-event="booking_intent"
          data-ga-cta={ctaLabel}
          className={cn(
            "booknow-button",
            // Primary House button (spec §7.1): brown/ink ground, cream type.
            // Gold is ceremonial only, never a generic CTA colour (§4.1, §7.1).
            "font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-5 py-2.5 no-underline",
            "transition-[filter] duration-[var(--t-slow)] ease-out",
            "hover:brightness-125",
          )}
        >
          {ctaLabel}
        </Link>
      </div>

      {/* Mobile utility cluster — Search + account icons, then the menu trigger
          (spec §6.2). The full-label desktop cluster above stays lg-only. */}
      <div className="lg:hidden flex items-center gap-1 shrink-0">
        <Link
          href="/search"
          aria-label="Search the site"
          className={cn(
            "flex items-center justify-center p-2 opacity-[0.7] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="15.4" y1="15.4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>
        <Link
          href="/my-house"
          aria-label="My House account"
          className={cn(
            "flex items-center justify-center p-2 opacity-[0.7] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="3.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.75 19.25c0-3.6 3.25-5.75 7.25-5.75s7.25 2.15 7.25 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>

        {/* Menu trigger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2"
        >
          <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
          <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
          <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
        </button>
      </div>

      {/* Mobile drawer — reuses MegaMenu config as accordions */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="lg:hidden fixed inset-0 z-50 bg-house-cream overflow-y-auto"
        >
          <div className="sticky top-0 flex items-center justify-between px-[5vw] py-3 bg-house-cream border-b border-house-brown/10">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/brand/wordmark.svg"
                alt="House of Willow Alexander"
                width={296}
                height={125}
                className="h-[44px] w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-[28px] leading-none text-house-brown bg-transparent border-0"
            >
              ×
            </button>
          </div>

          {/* pb leaves room for the sticky bottom CTA bar */}
          <div className="px-[5vw] pt-8 pb-28 flex flex-col gap-1">
            <Link
              href={stickyCtaHref}
              data-ga-event="booking_intent"
              data-ga-cta={stickyCtaLabel}
              onClick={() => setMobileOpen(false)}
              className="inline-block font-sans text-[15px] tracking-[0.18em] uppercase text-house-cream bg-house-brown px-6 py-4 text-center mb-6 no-underline"
            >
              {stickyCtaLabel}
            </Link>

            {/* Grouped menu — Do · Protect · Shop · Read · About (spec §6.2) */}
            {MOBILE_GROUPS.map((group) => {
              const panel = panelById(group.panelId);
              if (!panel) return null;
              const expanded = mobileExpanded === group.panelId;
              // Flatten every group's links, drop anchors, and dedupe by href so
              // the drawer shows the complete category (e.g. all ten services),
              // not just the first column.
              const seen = new Set<string>();
              const links = panel.groups
                .flatMap((g) => g.links)
                .filter((l) => {
                  if (l.href.startsWith("#") || seen.has(l.href)) return false;
                  seen.add(l.href);
                  return true;
                });
              const extraLinks =
                group.panelId === "shop" ? [{ label: "House Offers", href: "/offers" }] : [];
              return (
                <div key={group.panelId} className="border-b border-house-brown/10">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(expanded ? null : group.panelId)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-between py-4 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[22px] text-house-brown">{group.label}</span>
                      <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-brown/40">
                        {panel.trigger}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-[24px] text-house-gold-ink",
                        "transition-all duration-[var(--t-slow)] ease-out",
                        expanded && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-[var(--t-slow)] ease-out",
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div
                      className={cn(
                        "overflow-hidden transition-[opacity,padding-bottom] duration-[var(--t-slow)] ease-out",
                        expanded ? "opacity-100 pb-4" : "opacity-0 pb-0",
                      )}
                    >
                      <div className="flex flex-col gap-3 pl-1">
                        {panel.triggerHref ? (
                          <Link
                            href={panel.triggerHref}
                            onClick={() => setMobileOpen(false)}
                            className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink no-underline mb-1"
                          >
                            See all {panel.trigger.toLowerCase()} →
                          </Link>
                        ) : null}
                        {[...links, ...extraLinks].map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-sans text-[17px] text-house-brown no-underline"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 flex flex-col gap-4 pt-6 border-t border-house-brown/10">
              <button
                type="button"
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="text-left bg-transparent border-0 cursor-pointer font-sans text-[12px] tracking-[0.16em] uppercase opacity-60"
              >
                Search
              </button>
              <Link
                href="/my-house"
                onClick={() => setMobileOpen(false)}
                className="font-sans text-[12px] tracking-[0.16em] uppercase opacity-60 no-underline"
              >
                My House
              </Link>
              {/* HoWA sits in the menu footer, never the top line (spec §6.2) */}
              <div className="pt-2">
                <PoweredByHowa size="compact" href="/how-it-works" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Search modal — full-page overlay */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>

    {/* Sticky bottom CTA bar — mobile only, persistent (spec §6.2). Rendered
        outside <header> so the header's backdrop-filter does not become the
        containing block for this fixed element. Book a service on most routes;
        Get a quote on Insurance & Cover routes. */}
    <Link
      href={stickyCtaHref}
      data-ga-event="booking_intent"
      data-ga-cta={stickyCtaLabel}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center px-[5vw] py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-house-brown text-house-cream no-underline border-t border-house-gold/30 font-sans text-[13px] tracking-[0.18em] uppercase"
    >
      {stickyCtaLabel}
    </Link>
    </>
  );
}
