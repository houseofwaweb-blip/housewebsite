"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { CoverIndexEntry } from "@/lib/insurance/cover-index";

/**
 * "Find your cover" — a self-serve door. Type what you want ("van", "listed",
 * "necklace", "toyota", "plumber") and the covers filter to a flat result.
 *
 * Default view differs by device:
 *  - Mobile: a horizontal swipe slider per category (app-like, short, edge-bleed).
 *  - Desktop: one continuous grid ordered by category (no headings), with
 *    category anchor-chips near the search that jump to each category's first card.
 * The cover index (exhaustive keyword tags) is dynamically imported, not bundled.
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
        <Image src={c.image} alt="" fill sizes="(max-width: 640px) 80vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-sans text-[12.5px] tracking-[0.2em] uppercase text-house-stone">{c.group}</p>
        <h3 className="mt-1.5 font-display text-[21px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)] sm:text-[23px]">{c.name}</h3>
        <p className="mt-1.5 font-sans text-[17px] leading-[1.5] text-house-stone sm:text-[16.5px]">{c.blurb}</p>
        <span className="mt-4 font-sans text-[13px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] sm:text-[14px]">View cover →</span>
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

  const ordered = React.useMemo(() => {
    if (!covers) return [];
    return [...covers].sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a.group);
      const ib = CATEGORY_ORDER.indexOf(b.group);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }, [covers]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, CoverIndexEntry[]>();
    for (const c of ordered) {
      const l = map.get(c.group) ?? [];
      l.push(c);
      map.set(c.group, l);
    }
    return Array.from(map, ([group, items]) => ({ group, items }));
  }, [ordered]);

  const searching = query.length > 0;

  return (
    <div>
      <label htmlFor="cover-finder" className="block font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">
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
        className="mt-3 w-full max-w-[560px] border border-house-brown/25 bg-house-white px-5 py-4 font-sans text-[20px] text-house-brown placeholder:text-house-stone/70 outline-none transition-colors focus:border-[color:var(--ins-ink)] focus-visible:[outline:2px_solid_var(--ins-ink)] focus-visible:outline-offset-2"
        autoComplete="off"
      />

      {/* No-match */}
      {covers && searching && results.length === 0 ? (
        <p className="mt-8 max-w-[52ch] font-sans text-[19px] leading-[1.65] text-house-stone">
          Nothing matches “{q}”.{" "}
          <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
            Speak to a specialist
          </Link>{" "}
          and we will point you the right way.
        </p>
      ) : null}

      {/* Search results — flat grid (both devices) */}
      {covers && searching && results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {results.map((c) => (
            <CoverCard key={c.href} c={c} />
          ))}
        </div>
      ) : null}

      {/* Default — MOBILE: a swipe slider per category */}
      {covers && !searching ? (
        <div className="mt-8 flex flex-col gap-9 lg:hidden">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <h3 className="mb-3 font-display text-[clamp(21px,2vw,25px)] leading-tight text-house-black">{group}</h3>
              <div className="-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((c) => (
                  <CoverCard key={c.href} c={c} className="w-[80vw] max-w-[300px] shrink-0 snap-start" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Default — DESKTOP: category jump-chips + one continuous category-ordered grid */}
      {covers && !searching ? (
        <div className="hidden lg:block">
          <div className="mt-4 flex flex-wrap gap-2">
            {grouped.map(({ group }) => (
              <a
                key={group}
                href={`#cat-${catSlug(group)}`}
                className="border border-house-brown/25 px-4 py-2 font-sans text-[13px] tracking-[0.14em] uppercase text-house-brown no-underline transition-colors hover:border-[color:var(--ins-ink)] hover:text-[color:var(--ins-ink)]"
              >
                {group}
              </a>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-x-10 gap-y-12">
            {(() => {
              const seen = new Set<string>();
              return ordered.map((c) => {
                const first = !seen.has(c.group);
                if (first) seen.add(c.group);
                return <CoverCard key={c.href} c={c} id={first ? `cat-${catSlug(c.group)}` : undefined} />;
              });
            })()}
          </div>
        </div>
      ) : null}
    </div>
  );
}
