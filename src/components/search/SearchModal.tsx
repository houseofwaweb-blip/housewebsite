"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * SearchModal — full-page search overlay.
 * Spec: /ux/09-interactions/playground.html (search section) + mega menu appearing style.
 *
 * Opens as a fixed overlay covering the viewport. Input sits in the upper third.
 * Results slide in below with 60ms stagger per item (howa-slide-in keyframe).
 * Hover on results: cream bg tint + padding slide (matching Playground).
 * Escape or × closes. Focus trapped inside while open.
 *
 * Tab categories filter results client-side from a placeholder dataset.
 * When a real search backend lands, swap the filterResults function.
 */

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt?: string;
  href: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

// Placeholder results — drawn from existing site content so the UI feels real.
const ALL_RESULTS: SearchResult[] = [
  { id: "s1", type: "Service", title: "Gardening", excerpt: "Seasonal planting, pruning, and the patience of a calendar.", href: "/services/gardening" },
  { id: "s2", type: "Service", title: "Window Cleaning", excerpt: "Pure-water pole cleans up to four storeys.", href: "/services/window-cleaning" },
  { id: "s3", type: "Service", title: "Cleaning", excerpt: "Weekly domestic care, or deep seasonal resets.", href: "/services/cleaning" },
  { id: "s4", type: "Service", title: "Gutter Cleaning", excerpt: "Cleared before the storm, checked before the season.", href: "/services/gutter-cleaning" },
  { id: "p1", type: "Partner", title: "Delve Interiors", excerpt: "Considered schemes, quiet palettes, careful detailing.", href: "/partners/delve-interiors" },
  { id: "p2", type: "Partner", title: "Jessica Durling-McMahon", excerpt: "Layered rooms with confident colour and a love of textile.", href: "/partners/jessica-durling-mcmahon" },
  { id: "p3", type: "Partner", title: "Willow Alexander Gardens", excerpt: "Planting schemes rooted in the garden's existing character.", href: "/partners/willow-alexander-gardens" },
  { id: "d1", type: "Design", title: "Interiors", excerpt: "Whole-house renovations and single-room reads.", href: "/design/interiors" },
  { id: "d2", type: "Design", title: "Gardens", excerpt: "Landscape work led by Willow Alexander Gardens.", href: "/design/gardens" },
  { id: "h1", type: "HoWA", title: "Plans & Pricing", excerpt: "HoWA+ at £16.99/mo. Steward plans coming soon.", href: "/howa/plans" },
  { id: "h2", type: "The Hearth", title: "The case for a long-kept house", excerpt: "Why the homes we return to are the ones we do not redo every five years.", href: "/journal/the-case-for-a-long-house" },
  { id: "h3", type: "The Hearth", title: "Colour, by daylight", excerpt: "The trouble with picking paint on a screen.", href: "/journal/colour-by-daylight" },
  { id: "sh1", type: "Shop", title: "Heritage Secateurs", excerpt: "Japanese carbon steel, walnut handles. £48.", href: "/shop/heritage-secateurs" },
  { id: "sh2", type: "Shop", title: "Copper Watering Can", excerpt: "Solid copper, brass rose. £125.", href: "/shop/copper-watering-can" },
  { id: "sh3", type: "Shop", title: "Waxed Stockman Coat", excerpt: "Full-length waxed cotton. £295.", href: "/shop/waxed-stockman-coat" },
  { id: "i1", type: "Protect", title: "House Approved Insurance", excerpt: "Cover that understands period homes and collections.", href: "/insurance" },
  { id: "t1", type: "The House", title: "Philosophy", excerpt: "What a house is actually for.", href: "/the-house/philosophy" },
  { id: "t2", type: "The House", title: "Standards", excerpt: "How we work, and what House Approved means.", href: "/the-house/standards" },
];

const TABS = [
  { id: "all", label: "All" },
  { id: "service", label: "Services" },
  { id: "shop", label: "Shop" },
  { id: "design", label: "Design" },
  { id: "the hearth", label: "Journal" },
  { id: "the house", label: "The House" },
];

function filterResults(query: string, tab: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  let pool = ALL_RESULTS;
  if (tab !== "all") {
    pool = pool.filter((r) => r.type.toLowerCase().includes(tab));
  }
  if (!q) return pool.slice(0, 8);
  return pool.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      (r.excerpt && r.excerpt.toLowerCase().includes(q)),
  );
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState("all");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<number | null>(null);

  // Focus input when modal opens
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTab("all");
      setResults(filterResults("", "all"));
      setRefreshKey((k) => k + 1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape closes
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scheduleSearch = React.useCallback(
    (q: string, t: string) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        setResults(filterResults(q, t));
        setRefreshKey((k) => k + 1);
      }, 300);
    },
    [],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the House"
      className={cn(
        "fixed inset-0 z-[60] bg-house-cream overflow-y-auto",
        "opacity-0 [animation:howa-slide-up_var(--t-slow)_var(--ease-out)_forwards]",
      )}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute top-5 right-[5vw] z-10 text-[28px] leading-none text-house-brown hover:text-house-gold transition-colors duration-[var(--t-base)] bg-transparent border-0 cursor-pointer"
      >
        ×
      </button>

      {/* Upper third — input + tabs */}
      <div className="px-[5vw] pt-[min(18vh,140px)] pb-[32px] max-w-[860px] mx-auto">
        {/* Search input — large Didot italic, gold underline grow-in */}
        <div className="relative pb-[2px]">
          <div className="flex items-center gap-[14px] pb-[8px] border-b-2 border-house-brown">
            <svg
              aria-hidden="true"
              className="w-[28px] h-[28px] text-house-stone shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10.5" cy="10.5" r="6" />
              <path d="M15 15l5 5" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                scheduleSearch(e.target.value, tab);
              }}
              placeholder="What are you looking for?"
              style={{ outline: "none", boxShadow: "none" }}
              className={cn(
                "flex-1 bg-transparent border-0 min-w-0",
                "font-display font-normal italic text-[clamp(24px,3.5vw,32px)] text-house-brown",
                "placeholder:font-normal placeholder:text-house-stone placeholder:opacity-50",
                "placeholder:transition-opacity placeholder:duration-[var(--t-slow)] placeholder:ease-out",
                "focus:placeholder:opacity-20",
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              )}
            />
          </div>
          {/* Gold underline — grows on focus */}
          <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-house-gold origin-left scale-x-0 transition-transform duration-[var(--t-slow)] ease-out peer-focus:scale-x-100 has-[:focus]:scale-x-100" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-[20px] mt-[20px] pb-[10px] border-b border-house-brown/10">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  scheduleSearch(query, t.id);
                }}
                className={cn(
                  "bg-transparent border-0 cursor-pointer py-[4px]",
                  "font-sans text-[11px] tracking-[0.22em] uppercase",
                  "transition-all duration-[var(--t-base)] ease-out",
                  active
                    ? "text-house-gold border-b border-house-gold opacity-100 pb-[6px]"
                    : "text-house-brown/65 hover:text-house-brown hover:opacity-100",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results — staggered slide-in, matching Playground */}
      <div className="px-[5vw] pb-[80px] max-w-[860px] mx-auto">
        {/* View all results — ghost button with arrow, visible when there are results */}
        {results.length > 0 ? (
          <div className="flex justify-end mb-[16px]">
            <Link
              href={`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`}
              onClick={onClose}
              className="group inline-flex items-center gap-[8px] font-sans text-[12px] tracking-[0.18em] uppercase no-underline text-house-brown border-b border-solid border-house-gold pb-[3px] transition-[color,border-style] duration-[var(--t-slow)] ease-out hover:text-house-gold hover:border-dotted"
            >
              <span>View all results</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-[var(--t-slow)] ease-out group-hover:translate-x-[8px]"
              >
                →
              </span>
            </Link>
          </div>
        ) : null}

        <div key={refreshKey} className="flex flex-col">
          {results.length === 0 && query.length > 0 ? (
            <p className="font-display italic text-[17px] text-house-stone py-[40px] text-center">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          ) : results.length === 0 ? (
            <p className="font-display italic text-[15px] text-house-stone py-[40px] text-center">
              Start typing to search across the House.
            </p>
          ) : (
            results.map((r, i) => (
              <Link
                key={r.id}
                href={r.href}
                onClick={onClose}
                style={{ animationDelay: `${Math.min(i, 10) * 60}ms` }}
                className={cn(
                  "block py-[14px] border-b border-house-brown/8 no-underline",
                  /* Hover: cream bg + padding slide (Playground pattern) */
                  "transition-[background-color,padding] duration-[var(--t-slow)] ease-out",
                  "hover:bg-house-cream-dark hover:px-[12px]",
                  /* Staggered entry animation */
                  "opacity-0 [animation:howa-slide-in_var(--t-xslow)_var(--ease-out)_forwards]",
                )}
              >
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-stone mb-[4px]">
                  {r.type}
                </div>
                <h5 className="font-display text-[20px] font-medium text-house-brown mb-[4px] transition-colors duration-[var(--t-base)] ease-out group-hover:text-house-gold">
                  {r.title}
                </h5>
                {r.excerpt ? (
                  <p className="font-sans text-[14px] text-house-stone leading-[1.5]">
                    {r.excerpt}
                  </p>
                ) : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
