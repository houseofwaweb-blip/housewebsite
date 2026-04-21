"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * MegaMenu — hover-revealed panel beneath a nav item.
 * Spec: /ux/09-interactions/playground.html (mega section).
 *
 * Panel expands: max-height 0 → 400px over --t-xslow (750ms), padding
 * + opacity animate together. Direct children stagger in (150ms, 250ms).
 *
 * Hover grace: 200ms delay before hide when leaving trigger, cancelled
 * if the cursor enters the panel (prevents accidental collapse when
 * moving the mouse from trigger down to panel).
 *
 * Accessibility: Esc closes; Tab moves into panel (focus-within keeps open);
 * each trigger is a semantic <button> with `aria-expanded` and
 * `aria-controls` pointing at its panel id.
 */

export interface MegaLink {
  label: string;
  href: string;
  /** Short italic descriptor shown after the label. */
  description?: string;
}

export interface MegaLinkGroup {
  heading: string;
  links: MegaLink[];
}

export interface MegaPanel {
  id: string;
  /** The primary nav item label. */
  trigger: string;
  /** Link if the trigger itself is navigable (in addition to opening the panel). */
  triggerHref?: string;
  groups: MegaLinkGroup[];
  preview?: {
    image: string;
    alt: string;
    tag?: string;
    heading: string;
    href?: string;
  };
}

const HIDE_GRACE_MS = 200;

export function MegaMenu({
  panels,
  className,
  dark = false,
}: {
  panels: MegaPanel[];
  className?: string;
  /** Dark header context — triggers become cream text, hover stays gold. */
  dark?: boolean;
}) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const hideTimer = React.useRef<number | null>(null);

  const clearHide = React.useCallback(() => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const softHide = React.useCallback(() => {
    clearHide();
    hideTimer.current = window.setTimeout(() => setOpenId(null), HIDE_GRACE_MS);
  }, [clearHide]);

  const show = React.useCallback(
    (id: string) => {
      clearHide();
      setOpenId(id);
    },
    [clearHide],
  );

  // Escape closes
  React.useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <nav
      aria-label="Primary"
      className={cn("relative", className)}
      onMouseLeave={softHide}
    >
      <ul className="flex items-center gap-8 list-none m-0 p-0">
        {panels.map((panel) => {
          const isOpen = openId === panel.id;
          return (
            <li
              key={panel.id}
              className="relative"
              onMouseEnter={() => show(panel.id)}
              onFocus={() => show(panel.id)}
            >
              <MegaTrigger
                panelId={panel.id}
                isOpen={isOpen}
                triggerHref={panel.triggerHref}
                label={panel.trigger}
                dark={dark}
              />
            </li>
          );
        })}
      </ul>

      {/* Panels — absolutely positioned below the nav row, full-bleed */}
      {panels.map((panel) => {
        const isOpen = openId === panel.id;
        return (
          <div
            key={panel.id}
            id={`mega-panel-${panel.id}`}
            role="region"
            aria-label={panel.trigger}
            aria-hidden={!isOpen}
            onMouseEnter={clearHide}
            onMouseLeave={() => setOpenId(null)}
            className={cn(
              "absolute left-0 right-0 top-full z-30 bg-white border border-house-brown/10 border-t-0 overflow-hidden",
              "transition-[max-height,opacity,padding] ease-out",
              "[transition-duration:var(--t-xslow),var(--t-slow),var(--t-xslow)]",
              isOpen
                ? "max-h-[400px] opacity-100 px-[40px] py-[28px] pointer-events-auto"
                : "max-h-0 opacity-0 px-[40px] py-0 pointer-events-none",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-[32px]">
              {/* Links */}
              <div
                className={cn(
                  "flex flex-col gap-[20px] transition-[opacity,transform] duration-[var(--t-slow)] ease-out",
                  isOpen ? "opacity-100 translate-y-0 delay-[150ms]" : "opacity-0 translate-y-3 delay-0",
                )}
              >
                {panel.groups.map((group) => (
                  <div key={group.heading}>
                    <div className="font-sans text-[9px] tracking-[0.28em] uppercase text-house-stone mb-[10px]">
                      {group.heading}
                    </div>
                    <ul className="flex flex-col gap-[8px] list-none m-0 p-0">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-baseline font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown no-underline transition-[color,padding-left] duration-[var(--t-base)] ease-out hover:text-house-gold hover:pl-[4px]"
                          >
                            <span>{link.label}</span>
                            {link.description ? (
                              <span className="font-sans normal-case text-[10px] tracking-[0.02em] text-house-stone ml-[8px]">
                                {link.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Preview */}
              {panel.preview ? (
                <div
                  className={cn(
                    "relative min-h-[220px] overflow-hidden transition-[opacity,transform] duration-[var(--t-slow)] ease-out",
                    isOpen ? "opacity-100 translate-y-0 delay-[250ms]" : "opacity-0 translate-y-3 delay-0",
                  )}
                >
                  <PreviewBlock preview={panel.preview} />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function MegaTrigger({
  panelId,
  isOpen,
  triggerHref,
  label,
  dark,
}: {
  panelId: string;
  isOpen: boolean;
  triggerHref?: string;
  label: string;
  dark?: boolean;
}) {
  const classes = cn(
    "group/trigger relative inline-block py-2 px-0 bg-transparent border-0",
    "font-sans text-[11px] tracking-[0.18em] uppercase cursor-pointer",
    "transition-colors duration-[var(--t-slow)] ease-out",
    dark
      ? "text-house-cream hover:text-house-gold-light"
      : "text-house-brown hover:text-house-gold",
    // Underline that scales from left
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full",
    dark ? "after:bg-house-gold-light" : "after:bg-house-gold",
    "after:origin-left after:scale-x-0 after:transition-all after:duration-[var(--t-slow)] after:ease-out",
    "hover:after:scale-x-100",
    isOpen && "after:scale-x-100",
    isOpen && (dark ? "text-house-gold-light" : "text-house-gold"),
  );

  if (triggerHref) {
    return (
      <Link
        href={triggerHref}
        aria-expanded={isOpen}
        aria-controls={`mega-panel-${panelId}`}
        className={classes}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`mega-panel-${panelId}`}
      className={classes}
    >
      {label}
    </button>
  );
}

function PreviewBlock({ preview }: { preview: NonNullable<MegaPanel["preview"]> }) {
  const content = (
    <>
      <Image
        src={preview.image}
        alt={preview.alt}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(29,29,27,0.55)_100%)]"
      />
      <div className="absolute left-[16px] right-[16px] bottom-[16px] z-10 text-house-cream">
        {preview.tag ? (
          <div className="font-sans text-[8px] tracking-[0.22em] uppercase text-house-gold-light mb-[4px]">
            {preview.tag}
          </div>
        ) : null}
        <h5 className="font-display text-[16px] font-medium leading-[1.25] m-0">
          {preview.heading}
        </h5>
      </div>
    </>
  );

  if (preview.href) {
    return (
      <Link href={preview.href} className="relative block w-full h-full no-underline">
        {content}
      </Link>
    );
  }
  return <div className="relative w-full h-full">{content}</div>;
}
