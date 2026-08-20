"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { PostcodeField } from "@/components/forms/PostcodeField";

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
  /** Optional service colour swatch (spec §6.1) — a CSS colour or var(). */
  colour?: string;
}

export interface MegaLinkGroup {
  heading: string;
  links: MegaLink[];
}

/** A category in a two-level mega-menu, with its sub-links. */
export interface TwoLevelCategory {
  title: string;
  href: string;
  subs: MegaLink[];
  /** Optional service colour swatch (spec §6.1). */
  colour?: string;
}

/** Two-level mega-menu: hover a category on the left, its sub-links appear right.
 *  Used by both Marketplace (collections → sub-collections) and Services
 *  (services → sub-services). */
export interface TwoLevelMega {
  categories: TwoLevelCategory[];
  footer?: MegaLink[];
  /**
   * Services mega-menu enrichments (spec §6.1). The menu must carry, alongside
   * the colour-swatched service list: one featured editorial still life, one
   * quick postcode field ("See services near you"), and one House Approved
   * trust statement. Rendered as a cream right rail; colour stays as swatches.
   */
  featured?: { image: string; alt: string; tag?: string; heading?: string; href?: string };
  /** Which side the featured rail sits on. Default "right" (Services); Shop uses "left". */
  featuredSide?: "left" | "right";
  postcode?: { label?: string; action?: string };
  trust?: string;
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
  /** When set, this panel renders the two-level layout (categories → sub-links
   *  revealed on hover) instead of groups+preview. Used by Marketplace + Services. */
  twoLevel?: TwoLevelMega;
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
      className={className}
      onMouseLeave={softHide}
    >
      <ul className="flex items-center gap-5 list-none m-0 p-0">
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
              // Anchored to the full-width sticky <header> (the nav is no longer
              // `relative`), so the panel spans the viewport and the multi-column
              // content has room without shifting off-screen.
              "absolute left-0 right-0 top-full z-30 bg-white border-y border-house-brown/10 overflow-hidden",
              "transition-[max-height,opacity,padding] ease-out",
              "[transition-duration:var(--t-xslow),var(--t-slow),var(--t-xslow)]",
              isOpen
                ? cn(panel.twoLevel ? "max-h-[760px]" : "max-h-[640px]", "opacity-100 px-[5vw] pt-[28px] pb-[36px] pointer-events-auto")
                : "max-h-0 opacity-0 px-[5vw] py-0 pointer-events-none",
            )}
          >
            <div className="mx-auto w-full max-w-[1360px]">
            {panel.twoLevel ? (
              <TwoLevelMegaPanel data={panel.twoLevel} isOpen={isOpen} />
            ) : (
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
                    <div className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-stone mb-[10px]">
                      {group.heading}
                    </div>
                    <ul className="flex flex-col gap-[8px] list-none m-0 p-0">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center font-sans text-[14px] tracking-[0.14em] uppercase text-house-brown no-underline transition-[color,padding-left] duration-[var(--t-base)] ease-out hover:text-house-gold-ink hover:pl-[4px]"
                          >
                            {link.colour ? (
                              <span
                                aria-hidden
                                className="inline-block w-[9px] h-[9px] mr-[9px] shrink-0"
                                style={{ backgroundColor: link.colour }}
                              />
                            ) : null}
                            <span>{link.label}</span>
                            {link.description ? (
                              <span className="font-sans normal-case text-[12px] tracking-[0.02em] text-house-stone ml-[8px]">
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
            )}
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
    "group/trigger relative inline-block py-2 px-0 bg-transparent border-0 whitespace-nowrap",
    "font-sans text-[12px] tracking-[0.09em] uppercase cursor-pointer",
    "transition-colors duration-[var(--t-slow)] ease-out",
    dark
      ? "text-house-cream hover:text-house-gold-light"
      : "text-house-brown hover:text-house-gold-ink",
    // Underline that scales from left
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full",
    dark ? "after:bg-house-gold-light" : "after:bg-house-gold",
    "after:origin-left after:scale-x-0 after:transition-all after:duration-[var(--t-slow)] after:ease-out",
    "hover:after:scale-x-100",
    isOpen && "after:scale-x-100",
    isOpen && (dark ? "text-house-gold-light" : "text-house-gold-ink"),
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

/**
 * TwoLevelMegaPanel — two-level hover. Main categories list on the left; hovering
 * one reveals its sub-links on the right. Utility links along the bottom.
 * Shared by the Marketplace and Services mega-menus.
 */
function TwoLevelMegaPanel({ data, isOpen }: { data: TwoLevelMega; isOpen: boolean }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    if (!isOpen) setActive(0);
  }, [isOpen]);
  const cat = data.categories[active] ?? data.categories[0];
  const hasRail = Boolean(data.featured || data.postcode || data.trust);
  const featLeft = Boolean(data.featured && data.featuredSide === "left");
  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-[var(--t-slow)] ease-out",
        isOpen ? "opacity-100 translate-y-0 delay-[120ms]" : "opacity-0 translate-y-3",
      )}
    >
      <div
        className={cn(
          "grid gap-[40px]",
          hasRail
            ? featLeft
              ? "grid-cols-[190px_1fr] lg:grid-cols-[240px_190px_1fr]"
              : "grid-cols-[minmax(160px,190px)_1fr] lg:grid-cols-[minmax(160px,190px)_1fr_minmax(220px,260px)]"
            : "grid-cols-[minmax(170px,210px)_1fr]",
        )}
      >
        {/* Main categories */}
        <ul className={cn("flex flex-col gap-[1px] list-none m-0 p-0 border-r border-house-brown/8 pr-[24px]", featLeft && "lg:order-2")}>
          {data.categories.map((c, i) => (
            <li key={c.href} onMouseEnter={() => setActive(i)}>
              <Link
                href={c.href}
                className={cn(
                  "group flex items-center justify-between py-[6px] font-sans text-[14px] tracking-[0.12em] uppercase no-underline transition-colors duration-[var(--t-base)]",
                  i === active ? "text-house-gold-ink" : "text-house-brown hover:text-house-gold-ink",
                )}
              >
                <span className="inline-flex items-center">
                  {c.colour ? (
                    <span aria-hidden className="inline-block w-[9px] h-[9px] mr-[9px] shrink-0" style={{ backgroundColor: c.colour }} />
                  ) : null}
                  {c.title}
                </span>
                <span aria-hidden="true" className={cn("text-[18px] transition-opacity duration-[var(--t-base)]", i === active ? "opacity-100" : "opacity-0")}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sub-categories of the active category */}
        <div className={cn(featLeft && "lg:order-3")}>
          <div className="flex items-baseline justify-between mb-[14px]">
            <span className="font-sans text-[12px] tracking-[0.28em] uppercase text-house-stone">{cat.title}</span>
            <Link
              href={cat.href}
              className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink no-underline hover:pl-[3px] transition-[padding-left] duration-[var(--t-base)]"
            >
              View all →
            </Link>
          </div>
          {cat.subs.length > 0 ? (
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[9px] list-none m-0 p-0">
              {cat.subs.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group inline-flex font-sans text-[14px] text-house-brown no-underline transition-[color,padding-left] duration-[var(--t-base)] ease-out hover:text-house-gold-ink hover:pl-[4px]"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Link href={cat.href} className="font-display italic text-[14px] text-house-stone no-underline hover:text-house-gold-ink">
              Browse all {cat.title} →
            </Link>
          )}
        </div>

        {/* Cream right rail — featured still life, postcode finder, trust line
            (spec §6.1). Only rendered for menus that supply enrichments. */}
        {hasRail ? (
          <aside className={cn("hidden lg:flex flex-col", featLeft ? "order-1" : "gap-[16px] bg-house-cream-light border-l border-house-brown/8 pl-[28px]")}>
            {data.featured ? (
              <Link
                href={data.featured.href ?? cat.href}
                className={cn("group relative block overflow-hidden no-underline", featLeft ? "flex-1 min-h-[300px]" : "aspect-[4/3]")}
              >
                <Image
                  src={data.featured.image}
                  alt={data.featured.alt}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.03]"
                />
                {data.featured.tag || data.featured.heading ? (
                  <>
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(29,29,27,0.6)_100%)]" />
                    <div className="absolute left-[12px] right-[12px] bottom-[12px] z-10 text-house-cream">
                      {data.featured.tag ? (
                        <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-light mb-[3px]">
                          {data.featured.tag}
                        </div>
                      ) : null}
                      {data.featured.heading ? (
                        <div className="font-display text-[18px] leading-[1.25]">{data.featured.heading}</div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </Link>
            ) : null}

            {data.trust ? (
              <p className="font-sans text-[12px] leading-[1.5] text-house-brown/75 flex items-start gap-2">
                <span aria-hidden="true" className="mt-[2px] inline-block w-[9px] h-[9px] shrink-0 bg-house-gold" />
                <span>{data.trust}</span>
              </p>
            ) : null}

            {data.postcode ? (
              <PostcodeField
                label={data.postcode.label ?? "See services near you"}
                action={data.postcode.action ?? "/services"}
              />
            ) : null}
          </aside>
        ) : null}
      </div>

      {/* Utility footer row */}
      {data.footer && data.footer.length > 0 ? (
        <div className="mt-[22px] pt-[16px] border-t border-house-brown/10 flex flex-wrap items-center gap-x-[28px] gap-y-[8px]">
          {data.footer.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-brown no-underline hover:text-house-gold-ink transition-colors duration-[var(--t-base)]"
            >
              {f.label}
              {f.description ? (
                <span className="font-sans normal-case tracking-[0.02em] text-[12px] text-house-stone ml-[6px]">{f.description}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
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
        <h5 className="font-display text-[19px] font-medium leading-[1.25] m-0">
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
