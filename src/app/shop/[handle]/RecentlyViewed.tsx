"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

type Item = { handle: string; title: string; price: string; image: string };
const KEY = "howa_recently_viewed";
const MAX = 12;

/**
 * RecentlyViewed — the customer's own browsing history, kept in localStorage.
 * On each product view it records the current piece and shows the ones seen
 * before it. Nothing renders until there's a history (so first-time visitors
 * see nothing).
 */
export function RecentlyViewed({ current }: { current: Item }) {
  const [items, setItems] = React.useState<Item[]>([]);

  React.useEffect(() => {
    let prev: Item[] = [];
    try {
      prev = JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      prev = [];
    }
    // Show what was viewed before this piece.
    setItems(prev.filter((p) => p.handle !== current.handle).slice(0, 4));
    // Record this piece at the front of the history.
    const next = [current, ...prev.filter((p) => p.handle !== current.handle)].slice(0, MAX);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [current.handle, current.image, current.price, current.title]);

  if (items.length === 0) return null;

  return (
    <section className="px-[5vw] py-[clamp(40px,5vw,72px)] border-t border-house-brown/8">
      <div className="max-w-[1280px] mx-auto">
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-house-gold-dark mb-2">Where you have been</p>
        <h2 className="font-display italic text-[clamp(22px,2.6vw,32px)] text-house-brown mb-8">Recently viewed.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
          {items.map((p) => (
            <Link key={p.handle} href={`/shop/${p.handle}`} className="group block no-underline">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark mb-3">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <p className="font-display text-[15px] leading-[1.25] text-house-brown group-hover:text-house-gold-dark transition-colors">
                {p.title}
              </p>
              <p className="font-sans text-[13px] text-house-stone mt-0.5">{p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
