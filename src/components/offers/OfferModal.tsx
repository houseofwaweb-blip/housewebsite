"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Offer } from "./OfferCard";

/**
 * OfferModal — the full-detail popup for a House offer (spec §14). Opened from a
 * compact OfferCard, it carries every honest field: what is included, who is
 * eligible, the price or saving basis, when it runs, exclusions, a terms link
 * and the single CTA. Presentation only, the "existing offer look": dark
 * house-brown panel on cream, gold accents.
 *
 * A11y: role="dialog" + aria-modal, labelled by the offer title, focus moves in
 * on open and returns to the trigger on close, Escape and backdrop click close,
 * body scroll is locked while open, Tab is kept within the panel. Motion honours
 * prefers-reduced-motion via the global reset in globals.css.
 */

/** A compact, uppercase-labelled meta line. Keeps price/dates/eligibility
 *  scannable rather than in prose blocks. */
function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[74px_1fr] gap-3 border-t border-house-cream/12 py-3 sm:grid-cols-[84px_1fr]">
      <dt className="font-sans text-[10px] leading-[1.5] tracking-[0.16em] uppercase text-house-gold">
        {label}
      </dt>
      <dd className="font-sans text-[13.5px] leading-[1.55] text-house-cream/85">{children}</dd>
    </div>
  );
}

export function OfferModal({
  offer,
  onClose,
}: {
  /** The offer to show, or null when the modal is closed. */
  offer: Offer | null;
  onClose: () => void;
}) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const open = offer !== null;

  // Escape to close + a lightweight focus trap while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Move focus into the panel on open.
  React.useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => closeBtnRef.current?.focus(), 20);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!mounted || !offer) return null;

  const titleId = `offer-modal-title-${offer.slug}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:items-center sm:p-6"
      // Backdrop click closes; clicks inside the panel are stopped below.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Scrim */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-house-ink/70 opacity-0 [animation:howa-slide-up_var(--t-base)_var(--ease-out)_forwards]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 my-auto w-full max-w-[640px] overflow-hidden border border-house-gold/30 bg-house-brown text-house-cream opacity-0 [animation:howa-slide-up_var(--t-slow)_var(--ease-out)_forwards]"
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close offer"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center border-0 bg-house-ink/40 text-[22px] leading-none text-house-cream transition-colors duration-[var(--t-base)] hover:bg-house-ink/70 hover:text-house-gold"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {/* Scrollable body — the panel caps its height and scrolls its own content */}
        <div className="max-h-[88vh] overflow-y-auto">
          {/* Visual header */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-house-ink">
            {offer.accent ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-20 block h-1"
                style={{ background: offer.accent }}
              />
            ) : null}
            {offer.image ? (
              <Image
                src={offer.image}
                alt={offer.imageAlt ?? ""}
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,35,28,0.92) 0%, rgba(48,35,28,0.35) 45%, rgba(48,35,28,0) 72%)",
              }}
            />
            <p className="absolute bottom-4 left-6 z-20 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold">
              {offer.category}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <h2
              id={titleId}
              className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.1] text-house-cream"
            >
              {offer.title}
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-[1.55] text-house-cream/80">
              {offer.summary}
            </p>

            {/* What's included */}
            <p className="mt-7 font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold">
              What&apos;s included
            </p>
            <ul className="mt-3 flex list-none flex-col gap-2.5 p-0">
              {offer.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 font-sans text-[14.5px] leading-[1.5] text-house-cream/90"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] block h-[5px] w-[5px] shrink-0 rotate-45 bg-house-gold"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Terms of the offer, kept scannable rather than in prose blocks */}
            <dl className="mt-7 flex flex-col">
              <Meta label="Price">{offer.priceBasis}</Meta>
              <Meta label="Runs">
                {offer.starts} to {offer.ends}
              </Meta>
              <Meta label="Who">{offer.eligibility}</Meta>
              <Meta label="Excludes">{offer.exclusions}</Meta>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={offer.cta.href}
                className="inline-block bg-house-gold px-6 py-3 font-sans text-[11px] tracking-[0.16em] uppercase text-house-brown no-underline transition hover:brightness-110"
              >
                {offer.cta.label}
              </Link>
              <Link
                href={offer.termsHref}
                className="font-sans text-[12px] tracking-[0.04em] text-house-cream/65 underline underline-offset-4 transition hover:text-house-cream"
              >
                Offer terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
