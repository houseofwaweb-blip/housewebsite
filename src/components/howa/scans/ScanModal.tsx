"use client";

import * as React from "react";
import { createPortal } from "react-dom";

/**
 * ScanModal — the pop-up shell for a HoWA scan tool, matching the House offers
 * modal pattern (OfferModal): a portal dialog with a scrim, a capped-height
 * scrollable panel, focus moved in on open and returned to the trigger on close,
 * Escape + backdrop click to close, body-scroll lock and a lightweight focus
 * trap. Presentation only; the scan reveal itself is passed as children.
 */
export function ScanModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

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

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => closeBtnRef.current?.focus(), 20);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!mounted || !open) return null;

  const titleId = "scan-modal-title";

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-house-midnight/70 opacity-0 [animation:howa-slide-up_var(--t-base)_var(--ease-out)_forwards]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="howa-surface relative z-10 my-auto w-full max-w-[1040px] overflow-hidden border border-house-gold/30 bg-house-white opacity-0 [animation:howa-slide-up_var(--t-slow)_var(--ease-out)_forwards]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-house-brown/12 bg-house-cream px-5 py-3.5">
          <p id={titleId} className="font-display text-[18px] leading-none text-house-brown">{title}</p>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-house-brown/20 bg-house-white text-[24px] leading-none text-house-brown transition-colors hover:border-house-gold hover:text-house-gold-dark"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="max-h-[84vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
