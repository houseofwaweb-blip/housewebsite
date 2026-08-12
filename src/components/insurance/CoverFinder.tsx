"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { CoverIndexEntry } from "@/lib/insurance/cover-index";

/**
 * "Find your cover" — a self-serve door. Type what you want ("van", "listed",
 * "necklace", "toyota", "plumber") and the covers filter to a flat result.
 *
 * Default view: a single continuous grid ordered by category (no headings), with
 * category anchor-chips near the search that jump straight to that category's
 * first card. 2-col on mobile (app-compact), 3-col on desktop. The cover index
 * (with exhaustive keyword tags) is dynamically imported, not in the page bundle.
 */
const CATEGORY_ORDER = ["Everyday cover", "Home cover", "Advised", "Specialist property", "Assets & advice"];

function catSlug(g: string) {
  return g.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function CoverCard({ c, id, className }: { c: CoverIndexEntry; id?: string; className?: string }) {
  return (
    <Link
      id={id}
      href={c.href}
      className={`group flex flex-col overflow-hidden border border-house-brown/12 bg-house-white no-underline scroll-mt-28 transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)] ${className ?? ""}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={c.image} alt="" fill sizes="(max-width: 640px) 50vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-sans text-[10.5px] tracking-[0.2em] uppercase text-house-stone">{c.group}</p>
        <h3 className="mt-1.5 font-display text-[17px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)] sm:text-[20px]">{c.name}</h3>
        <p className="mt-1.5 font-sans text-[13.5px] leading-[1.5] text-house-stone sm:text-[14.5px]">{c.blurb}</p>
        <span className="mt-4 font-sans text-[11px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] sm:text-[12px]">View cover →</span>
      </div>
    </Link>
  );
}

export function CoverFinder() {
  const [q, setQ] = React.useState("");
  const [covers, setCovers] = React.useState<CoverIndexEntry[] | null>(null);
  const loading = React.useRef(false);
  const query = q.trim().toLowerCase();

  const load = React.useCallback(() => {
    if (loading.current || covers) return;
    loading.current = true;
    import("@/lib/insurance/cover-index").then((m) => setCovers(m.ALL_COVERS));
  }, [covers]);

  React.useEffect(() => {
    load();
  }, [load]);

  const results = React.useMemo(() => {
    if (!covers) return [];
    const STOP = new Set(["insurance", "cover", "policy", "quote", "for", "my", "the", "and", "an", "of", "to", "get", "want", "need", "looking", "some", "help", "with"]);
    const tokens = query
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length >= 2 && !STOP.has(t));
    if (tokens.length === 0) return covers;
    const regexes = tokens.map((t) => {
      const esc = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return t.length >= 3 ? new RegExp("\\b" + esc) : new RegExp("\\b" + esc + "\\b");
    });
    return covers.filter((c) => {
      const hay = `${c.name} ${c.blurb} ${c.group} ${c.tags.join(" ")}`.toLowerCase();
      return regexes.every((re) => re.test(hay));
    });
  }, [query, covers]);

  // Category-ordered covers + the ordered list of categories present.
  const ordered = React.useMemo(() => {
    if (!covers) return [];
    return [...covers].sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a.group);
      const ib = CATEGORY_ORDER.indexOf(b.group);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }, [covers]);

  const categories = React.useMemo(() => {
    const out: string[] = [];
    const seen = new Set<string>();
    for (const c of ordered) if (!seen.has(c.group)) { seen.add(c.group); out.push(c.group); }
    return out;
  }, [ordered]);

  const searching = query.length > 0;
  const gridCls = "mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12";

  return (
    <div>
      <label htmlFor="cover-finder" className="block font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">
        Find your cover
      </label>
      <input
        id="cover-finder"
        type="search"
        value={q}
        onFocus={load}
        onChange={(e) => {
          load();
          setQ(e.target.value);
        }}
        placeholder="Try ‘van’, ‘listed’, ‘necklace’, ‘toyota’, ‘plumber’…"
        className="mt-3 w-full max-w-[560px] border border-house-brown/25 bg-house-white px-5 py-4 font-sans text-[17px] text-house-brown placeholder:text-house-stone/70 outline-none transition-colors focus:border-[color:var(--ins-ink)]"
        autoComplete="off"
      />

      {/* Category jump-chips — anchor to each category's first card */}
      {covers && !searching && categories.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {categories.map((g) => (
            <a
              key={g}
              href={`#cat-${catSlug(g)}`}
              className="shrink-0 whitespace-nowrap border border-house-brown/25 px-4 py-2 font-sans text-[11px] tracking-[0.14em] uppercase text-house-brown no-underline transition-colors hover:border-[color:var(--ins-ink)] hover:text-[color:var(--ins-ink)]"
            >
              {g}
            </a>
          ))}
        </div>
      ) : null}

      {/* No-match */}
      {covers && searching && results.length === 0 ? (
        <p className="mt-8 max-w-[52ch] font-sans text-[16px] leading-[1.65] text-house-stone">
          Nothing matches “{q}”.{" "}
          <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
            Speak to a specialist
          </Link>{" "}
          and we will point you the right way.
        </p>
      ) : null}

      {/* Search results — flat grid */}
      {covers && searching && results.length > 0 ? (
        <div className={gridCls}>
          {results.map((c) => (
            <CoverCard key={c.href} c={c} />
          ))}
        </div>
      ) : null}

      {/* Default — one continuous grid, category-ordered, first-of-category anchored */}
      {covers && !searching ? (
        <div className={gridCls}>
          {(() => {
            const seen = new Set<string>();
            return ordered.map((c) => {
              const first = !seen.has(c.group);
              if (first) seen.add(c.group);
              return <CoverCard key={c.href} c={c} id={first ? `cat-${catSlug(c.group)}` : undefined} />;
            });
          })()}
        </div>
      ) : null}
    </div>
  );
}
