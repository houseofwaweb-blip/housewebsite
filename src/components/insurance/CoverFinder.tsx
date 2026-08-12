"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_COVERS } from "@/lib/insurance/cover-index";

/**
 * "Find your cover" — a self-serve door mechanic. Someone who knows what they
 * want ("van", "listed", "boiler", "art") types it and is filtered straight to
 * the right cover cards. No query shows everything, grouped visually by the
 * order in the index. Introducer-safe: it only routes to House pages.
 */
export function CoverFinder() {
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();

  const results = React.useMemo(() => {
    if (!query) return ALL_COVERS;
    // Match at word boundaries so "art" hits "art"/"fine art" but not
    // "ap-art-ment" or "st-art" (home start).
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("\\b" + escaped);
    return ALL_COVERS.filter((c) =>
      re.test(`${c.name} ${c.blurb} ${c.group} ${c.tags.join(" ")}`.toLowerCase())
    );
  }, [query]);

  return (
    <div>
      <label htmlFor="cover-finder" className="block font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">
        Find your cover
      </label>
      <input
        id="cover-finder"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try ‘van’, ‘listed’, ‘boiler’, ‘art’, ‘empty house’…"
        className="mt-3 w-full max-w-[560px] border border-house-brown/25 bg-house-white px-5 py-4 font-sans text-[17px] text-house-brown placeholder:text-house-stone/70 outline-none transition-colors focus:border-[color:var(--ins-ink)]"
        autoComplete="off"
      />

      {results.length === 0 ? (
        <p className="mt-8 max-w-[52ch] font-sans text-[16px] leading-[1.65] text-house-stone">
          Nothing matches “{q}”.{" "}
          <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
            Speak to a specialist
          </Link>{" "}
          and we will point you the right way.
        </p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col overflow-hidden border border-house-brown/12 bg-house-white no-underline transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-sans text-[10.5px] tracking-[0.2em] uppercase text-house-stone">{c.group}</p>
                <h3 className="mt-1.5 font-display text-[20px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{c.name}</h3>
                <p className="mt-1.5 font-sans text-[14.5px] leading-[1.55] text-house-stone">{c.blurb}</p>
                <span className="mt-4 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">View cover →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
