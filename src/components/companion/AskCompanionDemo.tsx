"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * AskCompanionDemo — a scripted, believable demo of asking House Companion.
 * Ported from the HoWA product site's ask demo (AskHowaDemo, seen on /ai): pick
 * a question -> House Companion "thinks" -> types a reply -> choose an action ->
 * confirmation. It is a PERFORMANCE, not a live model: every question, answer
 * and outcome is pre-written and clearly labelled illustrative.
 *
 * Tokens mapped to the House palette (midnight -> forest, sage -> moss). Wrapped
 * in `.howa-surface` so the chat bubbles keep their radius under the site-wide
 * border-radius:0 reset.
 */

const TYPE_MS = 22;
const THINK_MS = 460;

type Choice = { label: string; result: string };
type AskItem = { issue: string; answer: string; confidence: string; choices: [Choice, Choice] };

const EXAMPLES: AskItem[] = [
  {
    issue: "How should I lay out this living room?",
    confidence: "Moderate",
    answer:
      "From your photo, the light falls best along the window wall. I would zone the room around conversation, keep a quiet reading nook by the window and build the media wall into joinery. A calm, plaster-toned palette lets the light do the work.",
    choices: [
      { label: "Commission an interior design", result: "I will open a room project in HoWA with your first direction, palette and an indicative budget, ready for a House Approved studio to carry on." },
      { label: "See a sample first", result: "Opening a sample room reveal: how a photo becomes a first direction, palette, layout and indicative budget." },
    ],
  },
  {
    issue: "There is damp tracking into my skirting, what is it?",
    confidence: "Moderate",
    answer:
      "That reads like a slow weep from a failed radiator valve seal, with damp beginning to track into the skirting. It is localised but worth doing within days before it spreads. Indicative cost is around £120 to £280.",
    choices: [
      { label: "Book a repair", result: "I will prepare the brief and line up a named House repair professional. The job, cost and photos save back to your Home Record." },
      { label: "See how it works", result: "Opening a sample repair scan: how a photo becomes a diagnosis, a scope and the right route." },
    ],
  },
  {
    issue: "What would suit my north-facing garden?",
    confidence: "Moderate",
    answer:
      "A north-facing garden wants structure and shade-tolerant planting. I would hold the space with yew and multi-stem birch, a sandstone terrace for dining, and deep borders of grasses and lavender. Built to mature well and ask little to stay right.",
    choices: [
      { label: "Commission a garden design", result: "I will open a garden project in HoWA with the concept, planting direction and an indicative budget, ready for a House Approved garden studio." },
      { label: "Book garden care", result: "I will arrange a named gardener for routine care. Photos, cost and the schedule save to your Home Record." },
    ],
  },
  {
    issue: "I have just moved in, where do I start?",
    confidence: "High",
    answer:
      "I would start by claiming the address so everything lives in one place. From there I can prioritise what protects the home first: a boiler service, a gutter check and the safety certificates, then the cosmetic work in its own time.",
    choices: [
      { label: "Open my Home Record", result: "Opening HoWA for your address, with a calm first plan of what matters, in priority order." },
      { label: "Ask something else", result: "Ask me anything about the home: a room, a repair, the garden, or simply where to begin." },
    ],
  },
];

type Stage = "thinking" | "typing" | "await" | "thinkingResult" | "typingResult" | "result";

export function AskCompanionDemo({ backgroundImage = "/powered-by-howa/ai-ask-scan.png" }: { backgroundImage?: string }) {
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState<Stage>("thinking");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const item = EXAMPLES[active];
    const isResult = chosen !== null;
    const text = isResult ? item.choices[chosen].result : item.answer;
    setTyped("");
    setStage(isResult ? "thinkingResult" : "thinking");

    let typeTimer: ReturnType<typeof setInterval> | null = null;
    const thinkTimer = setTimeout(() => {
      if (reduced.current) {
        setTyped(text);
        setStage(isResult ? "result" : "await");
        return;
      }
      setStage(isResult ? "typingResult" : "typing");
      let i = 0;
      typeTimer = setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          if (typeTimer) clearInterval(typeTimer);
          setStage(isResult ? "result" : "await");
        }
      }, TYPE_MS);
    }, reduced.current ? 0 : THINK_MS);

    return () => {
      clearTimeout(thinkTimer);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, [active, chosen]);

  const item = EXAMPLES[active];
  const thinking = stage === "thinking" || stage === "thinkingResult";
  const typing = stage === "typing" || stage === "typingResult";
  const showChoices = stage === "await";
  const isResultPhase = chosen !== null;

  return (
    <div className="howa-surface relative overflow-hidden rounded-2xl border border-house-brown/10">
      {/* Background home image + scrim */}
      <Image src={backgroundImage} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-house-forest/60" />

      <div className="relative px-4 py-8 sm:px-8 md:py-12">
        <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-2xl border border-house-gold/25 bg-house-white shadow-[0_28px_70px_-30px_rgba(30,35,20,0.7)]">
          {/* header */}
          <div className="flex items-center gap-2.5 border-b border-house-brown/8 bg-house-cream px-5 py-3.5">
            <span className="is-round flex h-7 w-7 items-center justify-center bg-house-forest font-display text-[12px] text-house-gold-ink">H</span>
            <div className="leading-tight">
              <p className="font-display text-[15px] text-house-black">Ask House Companion</p>
              <p className="text-[11px] text-house-stone/70">Guided by House Companion, remembered by HoWA</p>
            </div>
          </div>

          {/* question chips, click to ask */}
          <div role="tablist" aria-label="Example questions" className="flex flex-wrap gap-2 border-b border-house-brown/8 px-5 py-3.5">
            {EXAMPLES.map((q, i) => (
              <button
                key={q.issue}
                role="tab"
                aria-selected={i === active}
                type="button"
                onClick={() => { if (i !== active) { setChosen(null); setActive(i); } }}
                className={
                  "rounded-full border px-3.5 py-1.5 text-[13px] leading-none transition-colors " +
                  (i === active
                    ? "border-house-forest bg-house-forest text-house-cream"
                    : "border-house-gold/35 bg-house-white text-house-stone hover:bg-house-cream")
                }
              >
                {q.issue}
              </button>
            ))}
          </div>

          {/* conversation */}
          <div className="space-y-3 px-5 py-5">
            <div className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-house-forest px-4 py-2.5 text-[14px] leading-snug text-house-cream">{item.issue}</p>
            </div>

            <div className="flex justify-start" aria-live="polite">
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-house-gold/25 bg-house-cream px-4 py-3 text-[14px] leading-[1.5] text-house-black">
                {thinking ? (
                  <ThinkingDots />
                ) : (
                  <span>
                    <span aria-hidden={typing}>{typed}</span>
                    {typing && <Cursor />}
                  </span>
                )}
                {/* AI safety: source + confidence shown beside the answer. */}
                {!thinking && !isResultPhase && stage === "await" ? (
                  <span className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-house-brown/10 pt-2">
                    <span className="border border-house-brown/20 bg-house-white px-2 py-0.5 font-sans text-[9.5px] uppercase tracking-[0.14em] text-house-brown/65">
                      Source: your home
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-house-moss">
                      Confidence: {item.confidence}
                    </span>
                  </span>
                ) : null}
              </div>
            </div>

            {showChoices && (
              <div className="pt-1">
                <p className="mb-2 text-[12.5px] text-house-stone/80">What would you like to do?</p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {item.choices.map((c, i) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setChosen(i)}
                      className={
                        "flex-1 rounded-xl px-4 py-2.5 text-[13.5px] transition-[filter,background-color] " +
                        (i === 0
                          ? "bg-house-moss text-white hover:brightness-110"
                          : "border border-house-gold/40 bg-house-white text-house-black hover:bg-house-cream")
                      }
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isResultPhase && (
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm border border-house-gold/30 bg-house-white px-4 py-2 text-[13px] leading-snug text-house-stone">
                  {item.choices[chosen].label}
                </p>
              </div>
            )}
          </div>

          <p className="border-t border-house-brown/8 px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.12em] text-house-stone/60">
            Illustrative example. Your answers come from your own home once you start.
          </p>
        </div>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="House Companion is thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="is-round h-1.5 w-1.5 bg-house-gold-dark/70 motion-safe:animate-bounce"
          style={{ animationDelay: `${i * 0.16}s`, animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-house-gold-dark align-middle motion-safe:animate-pulse" aria-hidden />;
}
