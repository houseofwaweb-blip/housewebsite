"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import s from "./search.module.css";

/**
 * /search — full search results page.
 * Reads `?q=` from the URL. Auto-searches on load if query present.
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
  { id: "the hearth", label: "The Hearth" },
  { id: "the house", label: "The House" },
  { id: "howa", label: "HoWA" },
];

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className={s.loading}>
          <p>Loading search&hellip;</p>
        </div>
      }
    >
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
  const [loading, setLoading] = React.useState(!!initialQuery);
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

  React.useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery, "all");
    }
    inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.page}>
      {/* Input */}
      <section className={s.head}>
        <div className={s.headInner}>
          <h1 className={s.eyebrow}>Search the House</h1>
          <div className={s.inputRow}>
            <svg
              aria-hidden="true"
              className={s.icon}
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
              className={s.input}
            />
          </div>

          <div className={s.tabs}>
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
                  className={`${s.tab} ${active ? s.tabActive : ""}`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className={s.results}>
        <div className={s.resultsInner}>
          {loading ? (
            <p className={s.statusMsg}>Searching&hellip;</p>
          ) : hasSearched && results.length === 0 ? (
            <div className={s.empty}>
              <p className={s.emptyTitle}>
                Nothing quite like &ldquo;{query}&rdquo; yet.
              </p>
              <p className={s.emptyLede}>
                Try different terms, or browse these sections:
              </p>
              <div className={s.emptyChips}>
                {[
                  { label: "Services", href: "/services" },
                  { label: "Design", href: "/design/interiors" },
                  { label: "Shop", href: "/shop" },
                  { label: "The Hearth", href: "/the-hearth" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className={s.chip}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : !hasSearched ? (
            <p className={s.statusMsg}>Start typing to search across the House.</p>
          ) : (
            <>
              <p className={s.count}>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className={s.list}>
                {results.map((r) => (
                  <Link key={r.id} href={r.href} className={s.result}>
                    {r.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image} alt="" className={s.resultImage} />
                    ) : null}
                    <div className={s.resultBody}>
                      <p className={s.resultType}>{r.type}</p>
                      <h3 className={s.resultTitle}>{r.title}</h3>
                      {r.excerpt ? (
                        <p className={s.resultExcerpt}>{r.excerpt}</p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
