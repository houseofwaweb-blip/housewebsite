"use client";

import * as React from "react";
import Link from "next/link";

/**
 * CompanionPreview — interactive step-widget preview for /howa landing.
 * Clickable options toggle selection. Continue links to /howa/companion.
 */

const OPTIONS = ["Design", "Care", "Protection", "Everything"];

export function CompanionPreview() {
  const [selected, setSelected] = React.useState(1); // "Care" default

  return (
    <div className="bg-house-white border border-house-brown/10 p-6 shadow-sm max-w-[400px] mx-auto md:mx-0 md:ml-auto">
      <div className="flex items-center justify-between mb-5">
        <span className="font-hearth-sans text-[11px] tracking-[0.16em] uppercase text-howa-teal-dark">
          Companion
        </span>
        <span className="font-hearth-sans text-[11px] text-house-brown/50">
          Step 2 of 5
        </span>
      </div>
      <div className="w-full h-[3px] bg-house-brown/8 mb-6">
        <div
          className="h-full transition-all duration-[var(--t-slow)] ease-out"
          style={{
            background: "var(--house-gold-dark)",
            width: selected >= 0 ? "40%" : "20%",
          }}
        />
      </div>
      <h3 className="font-hearth-sans font-medium text-[17px] text-house-brown mb-5 leading-[1.35]">
        What matters most for this home right now?
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(i)}
            className={
              "border px-4 py-3 text-center font-hearth-sans text-[13px] cursor-pointer transition-all duration-[var(--t-base)] ease-out " +
              (i === selected
                ? "border-[var(--house-gold-dark)] text-house-brown bg-[var(--house-gold-dark)]/5 font-medium"
                : "border-house-brown/12 text-house-brown/70 hover:border-house-brown/25")
            }
          >
            {opt}
          </button>
        ))}
      </div>
      <Link
        href="/howa/companion"
        className="block w-full py-3 font-hearth-sans text-[13px] tracking-[0.12em] uppercase text-white text-center no-underline transition-all duration-[var(--t-base)] ease-out hover:brightness-110"
        style={{ background: "var(--house-gold-dark)" }}
      >
        Continue &rarr;
      </Link>
    </div>
  );
}
