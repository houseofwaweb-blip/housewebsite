"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { MegaMenu } from "@/components/nav/MegaMenu";
import { SearchModal } from "@/components/search/SearchModal";
import { CartIcon } from "@/components/commerce/CartIcon";
import { useCart } from "@/components/commerce/CartContext";
import { PRIMARY_NAV } from "./navConfig";

/**
 * Global site header.
 * Spec: DESIGN.md Part C · "<Header />" + /ux/09-interactions/playground.html (mega).
 *
 * Desktop: brand wordmark → MegaMenu (hover panels) → utility (search, sign in, CTA).
 * Mobile:  brand → hamburger → full-screen drawer with accordion-style children.
 *
 * Primary CTA ("Start HoWA" or "Book consultation") is decided upstream by
 * the Provider that reads HOWA_APP_LIVE; this component only renders what
 * it's given.
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
  ctaLabel = "Start HoWA",
  ctaHref = "/api/howa-bounce",
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

  return (
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
            "bg-transparent border-0 cursor-pointer font-sans text-[11px] tracking-[0.16em] uppercase opacity-[0.55] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          Search
        </button>
        <Link
          href="/sign-in"
          className={cn(
            "font-sans text-[11px] tracking-[0.16em] uppercase no-underline opacity-[0.55] hover:opacity-100",
            "transition-opacity duration-[var(--t-base)]",
            dark ? "text-house-cream" : "text-house-brown",
          )}
        >
          Sign in
        </Link>
        <CartIcon dark={dark} onClick={openDrawer} />
        <Link
          href={ctaHref}
          className={cn(
            "font-sans text-[11px] tracking-[0.16em] uppercase text-white bg-house-gold border border-house-gold px-5 py-2.5 no-underline",
            "transition-colors duration-[var(--t-slow)] ease-out",
            "hover:bg-house-gold-light hover:border-house-gold-light",
          )}
        >
          {ctaLabel}
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden flex flex-col gap-1.5 p-2"
      >
        <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
        <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
        <span className={cn("block w-5 h-px", dark ? "bg-house-cream" : "bg-house-brown")} />
      </button>

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

          <div className="px-[5vw] pt-8 pb-12 flex flex-col gap-1">
            <Link
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold px-6 py-4 text-center mb-6 no-underline"
            >
              {ctaLabel}
            </Link>

            {navPanels.map((panel) => {
              const expanded = mobileExpanded === panel.id;
              const firstGroup = panel.groups[0];
              return (
                <div key={panel.id} className="border-b border-house-brown/10">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(expanded ? null : panel.id)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-between py-4 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <span className="font-display text-[22px] text-house-brown">
                      {panel.trigger}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-[24px] text-house-gold",
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
                            className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold no-underline mb-1"
                          >
                            See all {panel.trigger.toLowerCase()} →
                          </Link>
                        ) : null}
                        {firstGroup?.links.map((link) => (
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
                className="text-left bg-transparent border-0 cursor-pointer font-sans text-[11px] tracking-[0.16em] uppercase opacity-60"
              >
                Search
              </button>
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="font-sans text-[11px] tracking-[0.16em] uppercase opacity-60 no-underline"
              >
                Sign in
              </Link>
              <Link
                href="/book-consultation"
                onClick={() => setMobileOpen(false)}
                className="font-sans text-[11px] tracking-[0.16em] uppercase opacity-60 no-underline"
              >
                Book consultation
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Search modal — full-page overlay */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
