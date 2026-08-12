"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { CoverIndexEntry } from "@/lib/insurance/cover-index";

/**
 * "Find your cover" — a self-serve door mechanic. Someone who knows what they
 * want ("van", "listed", "necklace", "toyota", "plumber") types it and is
 * filtered straight to the right cover cards.
 *
 * App-like layout: by default the covers show grouped by category as horizontal
 * swipe rails on mobile (short, swipeable) and a grid on desktop; a search
 * flattens to matching results. The cover index (with its exhaustive keyword
 * tags) is dynamically imported so it is NOT in the initial page bundle.
 */
function CoverCard({ c, className }: { c: CoverIndexEntry; className?: string }) {
  return (
    <Link
      href={c.href}
      className={`group flex flex-col overflow-hidden border border-house-brown/12 bg-house-white no-underline transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)] ${className ?? ""}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={c.image} alt="" fill sizes="(max-width: 640px) 80vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-sans text-[10.5px] tracking-[0.2em] uppercase text-house-stone">{c.group}</p>
        <h3 className="mt-1.5 font-display text-[20px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{c.name}</h3>
        <p className="mt-1.5 font-sans text-[14.5px] leading-[1.55] text-house-stone">{c.blurb}</p>
        <span className="mt-4 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">View cover →</span>
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

  // Group by category (first-appearance order) for the default rail view.
  const grouped = React.useMemo(() => {
    const map = new Map<string, CoverIndexEntry[]>();
    for (const c of covers ?? []) {
      const list = map.get(c.group) ?? [];
      list.push(c);
      map.set(c.group, list);
    }
    return Array.from(map, ([group, items]) => ({ group, items }));
  }, [covers]);

  const searching = query.length > 0;

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
        <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-12">
          {results.map((c) => (
            <CoverCard key={c.href} c={c} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.667rem)]" />
          ))}
        </div>
      ) : null}

      {/* Default — grouped: swipe rails on mobile, grid on desktop */}
      {covers && !searching ? (
        <div className="mt-8 flex flex-col gap-10">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <h3 className="mb-4 font-display text-[clamp(18px,2vw,24px)] leading-tight text-house-black">{group}</h3>
              <div className="-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                {items.map((c) => (
                  <CoverCard key={c.href} c={c} className="w-[80vw] max-w-[300px] shrink-0 snap-start lg:w-auto lg:max-w-none" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
