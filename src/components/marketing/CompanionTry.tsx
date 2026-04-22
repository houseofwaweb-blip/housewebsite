"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export function CompanionTry() {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/api/howa-bounce?source=companion-try");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[560px] mx-auto">
      <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-3 text-center">
        Try it yourself
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe something you've noticed in your home..."
          className="w-full px-5 py-4 border border-house-brown/15 bg-house-white font-display text-[18px] font-normal italic text-house-brown placeholder:text-house-stone placeholder:italic focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
        />
      </div>
      <button
        type="submit"
        className="mt-3 w-full py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold cursor-pointer transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
      >
        Ask the Companion →
      </button>
      <p className="font-sans text-[11px] text-house-stone text-center mt-2 italic">
        Part of HoWA+. You&apos;ll be taken to the Companion to get your answer.
      </p>
    </form>
  );
}
