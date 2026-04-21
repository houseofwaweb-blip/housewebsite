"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * LiveSearch — large italic input + tabs + staggered result list.
 * Spec: /ux/09-interactions/playground.html (search section).
 *
 * Input: Didot italic 28px, bottom brown hairline, gold underline grows
 *        from 0 to 100% on focus (--t-slow).
 * Tabs:  uppercase filters; active tab underlines in gold (--t-base).
 * Debounced search (300ms) via `onQuery` callback. Results animate in
 * with 60ms stagger (1 → 2 → 3 → 4) using `howa-slide-in` keyframe.
 *
 * Parent supplies `onQuery(q, tab)` and a `results` array. The debounce
 * and refreshing class are owned here; actual query logic lives in parent.
 */

export interface LiveSearchResult {
  id: string;
  type: string;
  title: React.ReactNode;
  excerpt?: React.ReactNode;
  href: string;
}

export interface LiveSearchTab {
  id: string;
  label: string;
}

export interface LiveSearchProps {
  placeholder?: string;
  tabs?: LiveSearchTab[];
  /** Called 300ms after user stops typing or a tab changes. */
  onQuery: (query: string, tab: string) => void;
  results: LiveSearchResult[];
  loading?: boolean;
  className?: string;
}

export function LiveSearch({
  placeholder = "What are you looking for?",
  tabs = [{ id: "all", label: "All" }],
  onQuery,
  results,
  loading,
  className,
}: LiveSearchProps) {
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState(tabs[0]?.id ?? "all");
  const [refreshKey, setRefreshKey] = React.useState(0);
  const debounceRef = React.useRef<number | null>(null);

  const scheduleQuery = React.useCallback(
    (q: string, t: string) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        onQuery(q, t);
        setRefreshKey((k) => k + 1);
      }, 300);
    },
    [onQuery],
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Input */}
      <div className="relative flex items-center gap-3 py-2 border-b-2 border-house-brown focus-within:border-house-gold transition-colors duration-[var(--t-slow)] ease-out">
        <svg
          aria-hidden="true"
          className="w-7 h-7 text-house-stone shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5 5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            scheduleQuery(e.target.value, tab);
          }}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent border-0 outline-none min-w-0",
            "font-display italic text-[28px] text-house-brown",
            "placeholder:text-house-stone placeholder:opacity-50",
            "placeholder:transition-[opacity] placeholder:duration-[var(--t-slow)] placeholder:ease-out",
            "focus:placeholder:opacity-20",
          )}
        />
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-[-2px] h-[2px] bg-house-gold origin-left scale-x-0 transition-all duration-[var(--t-slow)] ease-out peer-focus-within:scale-x-100 group-focus-within:scale-x-100"
        />
      </div>

      {/* Tabs */}
      {tabs.length > 1 ? (
        <div
          role="tablist"
          aria-label="Filter results"
          className="flex gap-5 border-b border-house-brown/10 pb-2.5 mt-5"
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  scheduleQuery(query, t.id);
                }}
                className={cn(
                  "font-sans text-[10px] tracking-[0.22em] uppercase bg-transparent border-0 cursor-pointer py-1 transition-[color,border-color,opacity,padding] duration-[var(--t-base)] ease-out",
                  active
                    ? "text-house-gold border-b border-house-gold opacity-100 pb-1.5"
                    : "text-house-brown/65 hover:text-house-brown hover:opacity-100",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Results */}
      <div
        key={refreshKey}
        className="flex flex-col gap-0 mt-4"
        aria-busy={loading || undefined}
      >
        {loading && results.length === 0 ? (
          <p className="font-sans italic text-[15px] text-house-stone py-10 text-center">
            Searching…
          </p>
        ) : results.length === 0 && query.length > 0 ? (
          <p className="font-sans italic text-[15px] text-house-stone py-10 text-center">
            No matches for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          results.map((r, i) => (
            <Link
              key={r.id}
              href={r.href}
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              className={cn(
                "block py-3.5 border-b border-house-brown/8 no-underline",
                "transition-[background-color,padding] duration-[var(--t-slow)] ease-out",
                "hover:bg-house-cream hover:px-3",
                "opacity-0 [animation:howa-slide-in_var(--t-xslow)_var(--ease-out)_forwards]",
              )}
            >
              <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-stone mb-1">
                {r.type}
              </div>
              <h5 className="font-sans text-[20px] text-house-brown m-0 mb-1">{r.title}</h5>
              {r.excerpt ? (
                <p className="font-sans italic text-[14px] text-house-stone m-0">
                  {r.excerpt}
                </p>
              ) : null}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
