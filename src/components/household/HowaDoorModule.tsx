"use client";

import { useState } from "react";
import { gaEvent } from "@/lib/google/ga4";
import { APP_HREF, BOOK_HREF, type Persona } from "./personaData";

/**
 * The free Household tool: idle -> running -> result -> saved. The result is a
 * scripted demonstration (a setTimeout); swap the run() body for a real fetch
 * when the backend lands (handover §9). Every step fires a GA event, and every
 * CTA carries a door tag so the site-wide click delegate records intent.
 *
 * Render inside a `.howa-surface` scope so the rounded corners survive the
 * global border-radius reset.
 */

type Stage = "idle" | "running" | "result" | "saved";

const TOOL_INPUT: Record<string, string> = {
  photo: "Upload or take a photo",
  upload: "Upload a photo",
  paste: "Upload a photo, or paste the quote",
  document: "Send one document",
  address: "Enter your address",
};

const GREEN = "#1f3a2b";
const GREEN_DEEP = "#15291e";

export function HowaDoorModule({ persona, surface = "persona-page" }: { persona: Persona; surface?: string }) {
  const [stage, setStage] = useState<Stage>("idle");
  const accent = persona.accent;
  const tag = { "data-ga-door": persona.doorTag, "data-ga-surface": surface } as const;

  function run() {
    gaEvent("tool_started", { door: persona.doorTag, surface });
    setStage("running");
    // Demonstration only — replace this block with a real fetch() (handover §9).
    window.setTimeout(() => {
      setStage("result");
      gaEvent("tool_completed", { door: persona.doorTag, surface });
      gaEvent("result_viewed", { door: persona.doorTag, surface });
    }, 1300);
  }

  function save() {
    gaEvent("result_saved_to_record", { door: persona.doorTag, surface });
    setStage("saved");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#b89968]/25 bg-white shadow-[0_28px_66px_-38px_rgba(40,30,10,0.4)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#1a241d]/8 px-6 py-3.5">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em]" style={{ color: accent }}>
          {persona.name}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#3a352c]/55">Free tool</span>
      </div>

      <div className="p-6 sm:p-8">
        {stage === "idle" && (
          <div>
            <p className="text-[15px] leading-[1.55] text-[#3a352c]">{persona.toolHint}</p>
            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#b89968]/45 bg-[#fbfaf5] px-6 py-10 text-center transition-colors hover:bg-[#f6f2e9]">
              <span className="font-display text-[17px] text-[#1a241d]">{TOOL_INPUT[persona.toolKind]}</span>
              <span className="text-[13px] text-[#3a352c]/70">Nothing is stored until you choose to save it.</span>
              <input type="file" className="sr-only" onChange={run} aria-label={persona.toolCta} />
            </label>
            <button
              onClick={run}
              {...tag}
              data-ga-event="tool_started"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[16px] text-white transition-opacity hover:opacity-90"
              style={{ background: accent }}
            >
              {persona.toolCta} <span aria-hidden>→</span>
            </button>
            <p className="mt-3 text-center text-[12px] text-[#3a352c]/55">
              Demonstration result · your real result needs the app
            </p>
          </div>
        )}

        {stage === "running" && (
          <div className="py-10 text-center">
            <div className="is-round mx-auto h-8 w-8 animate-spin border-2 border-[#b89968]/30 border-t-[#8a6f3f]" />
            <p className="mt-4 font-display text-[18px] text-[#1a241d]">{persona.name} is reading it…</p>
            <p className="mt-1 text-[13.5px] text-[#3a352c]/70">A first, plain-English read in a moment.</p>
          </div>
        )}

        {(stage === "result" || stage === "saved") && (
          <div>
            <h3 className="font-display text-[22px] leading-tight text-[#1a241d]">{persona.resultHeading}</h3>
            <ul className="mt-4 space-y-3">
              {persona.resultLines.map((l) => (
                <li key={l.k} className="flex gap-3">
                  <span
                    className="mt-0.5 shrink-0 font-sans text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: accent, minWidth: 78 }}
                  >
                    {l.k}
                  </span>
                  <span className="text-[14.5px] leading-[1.5] text-[#3a352c]">{l.v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10.5px] tracking-[0.04em] text-[#3a352c]/55">
              {persona.resultNote.toUpperCase()}
            </p>

            {stage === "result" && (
              <div className="mt-6 rounded-xl bg-[#fbfaf5] p-5">
                <p className="text-[14.5px] leading-[1.5] text-[#1a241d]">{persona.saveMemoryLine}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={save}
                    {...tag}
                    data-ga-event="result_saved_to_record"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] text-white transition-opacity hover:opacity-90"
                    style={{ background: accent }}
                  >
                    {persona.saveCta} <span aria-hidden>→</span>
                  </button>
                  <a
                    href={BOOK_HREF}
                    {...tag}
                    data-ga-event="booking_started"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b89968]/40 px-5 py-3 text-[15px] text-[#1a241d] no-underline transition-colors hover:bg-[#f6f2e9]"
                  >
                    {persona.handsCta} <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            )}

            {stage === "saved" && (
              <div
                className="mt-6 rounded-xl border p-5"
                style={{ borderColor: `${GREEN}40`, background: `${GREEN}0f` }}
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.16em]" style={{ color: GREEN_DEEP }}>
                  Saved. And remembered.
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#1a241d]">
                  This now lives in your Home Record. HoWA can use it when you ask, book or plan what happens next.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={APP_HREF}
                    {...tag}
                    data-ga-event="app_waitlist_joined"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] text-white no-underline transition-colors"
                    style={{ background: GREEN }}
                  >
                    Open it in the HoWA app <span aria-hidden>→</span>
                  </a>
                  <a
                    href={persona.upsellHref}
                    {...tag}
                    data-ga-event={persona.upsellHref.includes("steward") ? "steward_started" : "housekeeper_started"}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b89968]/40 px-5 py-3 text-[15px] text-[#1a241d] no-underline transition-colors hover:bg-[#f6f2e9]"
                  >
                    {persona.upsellCta} <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
