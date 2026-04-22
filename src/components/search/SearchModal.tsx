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
  image?: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const TABS = [
  { id: "all", label: "All" },
  { id: "service", label: "Services" },
  { id: "shop", label: "Shop" },
  { id: "design", label: "Design" },
  { id: "journal", label: "Journal" },
  { id: "the house", label: "The House" },
  { id: "howa", label: "HoWA" },
];

async function fetchResults(query: string, tab: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  try {
    const params = new URLSearchParams({ q: query, tab });
    const res = await fetch(`/api/search?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results ?? [];
  } catch {
    return [];
  }
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState("all");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<number | null>(null);

  const [loading, setLoading] = React.useState(false);

  // Focus input when modal opens
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setTab("all");
      setResults([]);
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
      debounceRef.current = window.setTimeout(async () => {
        setLoading(true);
        const hits = await fetchResults(q, t);
        setResults(hits);
        setRefreshKey((k) => k + 1);
        setLoading(false);
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
              className="w-[28px] h-[28px] text-house-brown/60 shrink-0"
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
                "placeholder:font-normal placeholder:text-house-brown/60 placeholder:opacity-50",
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
          {loading ? (
            <p className="font-display italic text-[15px] text-house-brown/50 py-[40px] text-center">
              Searching&hellip;
            </p>
          ) : results.length === 0 && query.length > 0 ? (
            <p className="font-display italic text-[17px] text-house-brown/50 py-[40px] text-center">
              Nothing quite like &ldquo;{query}&rdquo; yet. Try different terms.
            </p>
          ) : results.length === 0 ? (
            <p className="font-display italic text-[15px] text-house-brown/50 py-[40px] text-center">
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
                  "flex items-start gap-4 py-[14px] border-b border-house-brown/8 no-underline",
                  "transition-[background-color,padding] duration-[var(--t-slow)] ease-out",
                  "hover:bg-house-cream-dark hover:px-[12px]",
                  "opacity-0 [animation:howa-slide-in_var(--t-xslow)_var(--ease-out)_forwards]",
                )}
              >
                {r.image ? (
                  <img
                    src={r.image}
                    alt=""
                    className="w-[56px] h-[56px] object-cover shrink-0 mt-1 bg-house-cream-dark"
                  />
                ) : null}
                <div className="min-w-0">
                  <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-brown/60 mb-[4px]">
                    {r.type}
                  </div>
                  <h5 className="font-display text-[20px] font-medium text-house-brown mb-[4px]">
                    {r.title}
                  </h5>
                  {r.excerpt ? (
                    <p className="font-sans text-[14px] text-house-brown/60 leading-[1.5]">
                      {r.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
