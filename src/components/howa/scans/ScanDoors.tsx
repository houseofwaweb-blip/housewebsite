"use client";

import * as React from "react";
import { ScanModal } from "./ScanModal";
import { ScanReveal } from "./ScanReveal";
import { SCAN_REVEALS } from "@/lib/howa/scan-reveals";
import { HowaScanReveal } from "@/components/howa/HowaScanReveal";

/**
 * ScanDoors — the brief §6.5 "five useful doors" as a card grid where each tool
 * opens its animated reveal in a pop-up (the House offers-modal pattern), rather
 * than stacking the reveals down the page.
 *
 * Copy is verbatim from brief §6.5. Live/Beta/Coming-next states are applied
 * independently per §3 (garden is Live, so no badge; the rest are Beta). Tool
 * buttons on /howa and /howa/house-customers deep-link here with ?tool=<key>,
 * which auto-opens the matching pop-up on load. The cards use a centring flex
 * layout so the trailing row (two cards) sits centred under the first row.
 */

type Door = {
  key: string; // url param + identity
  reveal?: string; // SCAN_REVEALS key, for the scan-to-result reveal
  design?: boolean; // opens the design scan-to-design reveal instead
  heading: string;
  body: string;
  action: string;
  state: "Available" | "Beta" | "Coming next";
};

const DOORS: Door[] = [
  {
    key: "garden",
    reveal: "garden",
    heading: "Read your garden",
    body: "Add photographs and a little context about where you are. Explore what you are looking at, what might need attention and which questions to take to a gardener.",
    action: "Explore my garden",
    state: "Available",
  },
  {
    key: "repair",
    reveal: "repair",
    heading: "Understand a repair",
    body: "Show HoWA the issue and describe what has changed. Get help organising the symptoms and preparing a useful brief for the right professional.",
    action: "Prepare a repair brief",
    state: "Beta",
  },
  {
    key: "quote",
    reveal: "property",
    heading: "Decode a quote",
    body: "Bring the scope into plain English. Identify unclear items, missing assumptions and questions to ask before agreeing to the work.",
    action: "Read a quote with HoWA",
    state: "Beta",
  },
  {
    key: "design",
    design: true,
    heading: "Design a space",
    body: "Start with the space you have and the way you want to use it. Explore a concept and keep a brief you can develop with a professional.",
    action: "Start a design idea",
    state: "Beta",
  },
  {
    key: "documents",
    reveal: "documents",
    heading: "Understand a document",
    body: "Find useful dates, conditions and details in a document you choose to add. Review them before creating a reminder or taking action.",
    action: "Read a document with HoWA",
    state: "Beta",
  },
];

export function ScanDoors() {
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  // Auto-open from ?tool=<key> so cross-page tool buttons land on the pop-up.
  React.useEffect(() => {
    try {
      const tool = new URLSearchParams(window.location.search).get("tool");
      if (tool && DOORS.some((d) => d.key === tool)) setOpenKey(tool);
    } catch {
      /* no-op */
    }
  }, []);

  const openDoor = (key: string, e: React.MouseEvent) => {
    triggerRef.current = e.currentTarget as HTMLElement;
    setOpenKey(key);
  };
  const close = () => {
    setOpenKey(null);
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  };

  const activeDoor = DOORS.find((d) => d.key === openKey);
  const activeReveal = activeDoor?.reveal ? SCAN_REVEALS[activeDoor.reveal] : undefined;

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-[18px]">
        {DOORS.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={(e) => openDoor(d.key, e)}
            className="flex w-full flex-col border border-house-brown/15 bg-house-cream p-6 text-left no-underline transition-colors hover:border-house-gold-dark md:w-[calc(50%-9px)] lg:w-[calc(33.333%-12px)]"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="font-display text-[22px] leading-tight text-house-brown">{d.heading}</h3>
              {d.state !== "Available" ? (
                <span className="shrink-0 border border-house-gold-dark/60 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.14em] text-house-gold-dark">
                  {d.state}
                </span>
              ) : null}
            </div>
            <p className="flex-1 font-sans text-[15px] leading-[1.55] text-house-brown/75">{d.body}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-sans text-[13px] uppercase tracking-[0.14em] text-house-gold-ink">
              {d.action} <span aria-hidden="true">→</span>
            </span>
          </button>
        ))}
      </div>

      <ScanModal open={!!activeDoor} title={activeDoor?.heading ?? "Scan"} onClose={close}>
        {activeDoor?.design ? (
          <div className="p-5 md:p-7">
            <HowaScanReveal />
          </div>
        ) : activeReveal ? (
          <ScanReveal data={activeReveal.data} fields={activeReveal.fields} />
        ) : null}
      </ScanModal>
    </>
  );
}
