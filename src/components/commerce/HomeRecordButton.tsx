"use client";

import * as React from "react";

/**
 * HomeRecordButton — "Add to Home Record" (change brief slide 9/10): the
 * product-page save / wishlist action. Persists to localStorage now (a pre-app
 * stand-in for the address-bound Home Record); when the HoWA app is live this
 * is where a saved object, with room, warranty and care notes, syncs to the
 * real record.
 */
type Saved = { handle: string; title: string; price: string; image: string };
const KEY = "howa_home_record";

function read(): Saved[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function HomeRecordButton({
  handle,
  title,
  price,
  image,
  className = "",
}: Saved & { className?: string }) {
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setSaved(read().some((s) => s.handle === handle));
  }, [handle]);

  const toggle = () => {
    const list = read().filter((s) => s.handle !== handle);
    if (!saved) list.unshift({ handle, title, price, image });
    try {
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, 100)));
    } catch {
      /* storage unavailable */
    }
    setSaved(!saved);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={
        className ||
        "inline-flex w-full items-center justify-center gap-2 border border-house-gold-dark bg-house-gold-dark px-6 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white transition-[filter,transform] hover:brightness-110 cursor-pointer"
      }
    >
      <span aria-hidden>{saved ? "✓" : "+"}</span>
      {saved ? "Saved to Home Record" : "Add to Home Record"}
    </button>
  );
}
