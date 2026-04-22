"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * /search — full search results page.
 * Spec: DESIGN.md Flow 10.
 *
 * Reads `?q=` from the URL. Auto-searches on load if query present.
 * Same tab filtering as the SearchModal but with a full-page layout.
 */

interface SearchResult {
  id: string;
  type: string;
  title: string;
  excerpt?: string;
  href: string;
  image?: string;
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

export default function SearchPage() {
  return (
    <React.Suspense fallback={
      <div className="bg-house-cream min-h-screen flex items-center justify-center">
        <p className="font-display italic text-[15px] text-house-brown/40">Loading search&hellip;</p>
      </div>
    }>
      <SearchContent />
    </React.Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = React.useState(initialQuery);
  const [tab, setTab] = React.useState("all");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<number | null>(null);

  const doSearch = React.useCallback(async (q: string, t: string) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ q, tab: t });
      const res = await fetch(`/api/search?${params}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch {
      setResults([]);
    }
    setLoading(false);
    setHasSearched(true);
  }, []);

  const scheduleSearch = React.useCallback(
    (q: string, t: string) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => doSearch(q, t), 300);
    },
    [doSearch],
  );

  // Auto-search on mount if query present
  React.useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery, "all");
    }
    inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className="bg-house-cream text-house-brown min-h-screen">
      {/* Search input area */}
      <section className="px-[5vw] pt-[12vh] pb-8">
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-center gap-3 pb-2 border-b-2 border-house-brown">
            <svg
              aria-hidden="true"
              className="w-7 h-7 text-house-brown/40 shrink-0"
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
              placeholder="Search the House"
              style={{ outline: "none", boxShadow: "none" }}
              className={cn(
                "flex-1 bg-transparent border-0 min-w-0",
                "font-display font-normal italic text-[clamp(24px,3.5vw,32px)] text-house-brown",
                "placeholder:text-house-brown/30",
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              )}
            />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-5 mt-5 pb-2 border-b border-house-brown/10">
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
                    "bg-transparent border-0 cursor-pointer py-1",
                    "font-sans text-[11px] tracking-[0.22em] uppercase",
                    "transition-all duration-[var(--t-base)] ease-out",
                    active
                      ? "text-[var(--house-gold-dark)] border-b border-[var(--house-gold-dark)]"
                      : "text-house-brown/50 hover:text-house-brown",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-[5vw] pb-20">
        <div className="max-w-[860px] mx-auto">
          {loading ? (
            <p className="font-display italic text-[15px] text-house-brown/40 py-10 text-center">
              Searching&hellip;
            </p>
          ) : hasSearched && results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display italic text-[19px] text-house-brown/60 mb-4">
                Nothing quite like &ldquo;{query}&rdquo; yet.
              </p>
              <p className="font-sans text-[15px] text-house-brown/50 mb-8">
                Try different terms, or browse these sections:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "Services", href: "/services" },
                  { label: "Design", href: "/design/interiors" },
                  { label: "Shop", href: "/shop" },
                  { label: "Journal", href: "/journal" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/20 px-5 py-2.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : !hasSearched ? (
            <p className="font-display italic text-[15px] text-house-brown/40 py-10 text-center">
              Start typing to search across the House.
            </p>
          ) : (
            <>
              <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown/50 mb-6">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="flex flex-col">
                {results.map((r, i) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    style={{ animationDelay: `${Math.min(i, 12) * 50}ms` }}
                    className={cn(
                      "flex items-start gap-4 py-4 border-b border-house-brown/8 no-underline",
                      "transition-[background-color,padding] duration-[var(--t-slow)] ease-out",
                      "hover:bg-house-cream-dark hover:px-3",
                      "opacity-0 [animation:howa-slide-in_var(--t-xslow)_var(--ease-out)_forwards]",
                    )}
                  >
                    {r.image ? (
                      <img
                        src={r.image}
                        alt=""
                        className="w-16 h-16 object-cover shrink-0 mt-0.5 bg-house-cream-dark"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-brown/50 mb-1">
                        {r.type}
                      </div>
                      <h3 className="font-display text-[20px] font-medium text-house-brown mb-1">
                        {r.title}
                      </h3>
                      {r.excerpt ? (
                        <p className="font-sans text-[14px] text-house-brown/60 leading-[1.5]">
                          {r.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
