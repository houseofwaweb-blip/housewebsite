"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * AskHowaDemo — a scripted, believable demo of asking your own home (brief §6.4).
 * Pick a question, HoWA "thinks", types an answer back, shows its source and
 * confidence, then you choose a next action. It is a PERFORMANCE, not a live
 * model: every question, answer and outcome is pre-written and clearly labelled
 * illustrative. Ported from the Ask HoWA handover into the House palette, sitting
 * over a warm real-home photo under a Midnight scrim.
 *
 * Truth behaviours kept from the handover: the offline sensor refuses to treat a
 * stale reading as current, and the damp-quote / garden answers refuse to guess
 * and ask for the missing input first. Respects prefers-reduced-motion.
 */

const TYPE_MS = 24;
const THINK_MS = 460;

type Choice = { label: string; result: string };
type AskItem = { issue: string; answer: string; source: string; choices: [Choice, Choice] };

const EXAMPLES: AskItem[] = [
  {
    issue: "Where is the dishwasher warranty?",
    source: "Source: saved warranty document",
    answer:
      "It is saved with the dishwasher in your Kitchen record. Open the original warranty document.",
    choices: [
      { label: "Open the document", result: "Opening the warranty kept with the dishwasher, with its expiry and what it covers." },
      { label: "Set a reminder", result: "A reminder is saved before the warranty expires, linked to the document." },
    ],
  },
  {
    issue: "When does my home insurance renew?",
    source: "Source: renewal letter received 9 September 2026",
    answer:
      "Your renewal letter says the policy renews on 1 October 2026.",
    choices: [
      { label: "Remind me before it renews", result: "A reminder is saved for mid-September, linked to the original renewal letter." },
      { label: "Open the letter", result: "Opening the renewal letter kept in your Home Mailbox." },
    ],
  },
  {
    issue: "What needs attention this week?",
    source: "Source: Home Plan and renewal letter",
    answer:
      "The garden task saved for 11 September is due first. Your insurance renewal is next on 1 October.",
    choices: [
      { label: "Open my Home Plan", result: "Opening this week's tasks in priority order, with the reason each one is there." },
      { label: "Share the garden task", result: "The 11 September garden task can be shared with the household where supported." },
    ],
  },
  {
    issue: "What do you know about the living room sensor?",
    source: "Source: connected-home sample",
    answer:
      "Its last reading was 21.5°C on 8 September at 08:42. The sensor is offline, so that is not a current reading.",
    choices: [
      { label: "Reconnect the sensor", result: "An offline device cannot receive a command until it reconnects." },
      { label: "See connection details", result: "Opening what this connection can read and control, and the permission it needs." },
    ],
  },
  {
    issue: "What should I check in this damp quote?",
    source: "Needs the quote",
    answer:
      "The quote should make clear what work is included, what cause is being treated and what is not included. Add the quote and HoWA can help you review those points.",
    choices: [
      { label: "Add the quote", result: "Add the builder's quote and HoWA highlights the included work, likely omissions and questions to ask." },
      { label: "See what to ask", result: "A short list of questions worth asking before you agree to the work." },
    ],
  },
  {
    issue: "What does the garden need next?",
    source: "Needs current context",
    answer:
      "Add a current photo or open the garden task already saved for 11 September. HoWA should not guess the condition of the garden without current information.",
    choices: [
      { label: "Add a photo", result: "Add a current garden photo and HoWA suggests the next useful task to review." },
      { label: "Open the saved task", result: "Opening the garden task saved for 11 September." },
    ],
  },
];

// Confidence shown alongside the source, so the promised sequence step
// (Question -> Context -> Answer -> Source -> Confidence -> action) is real.
const CONFIDENCE: Record<string, string> = {
  "Where is the dishwasher warranty?": "High",
  "When does my home insurance renew?": "High",
  "What needs attention this week?": "Medium",
  "What do you know about the living room sensor?": "Low, sensor offline",
  "What should I check in this damp quote?": "Add the quote to raise",
  "What does the garden need next?": "Add context to raise",
};

type Stage = "thinking" | "typing" | "await" | "thinkingResult" | "typingResult" | "result";

export function AskHowaDemo({ backgroundImage = "/howa/v5/ai-ask-scan.png" }: { backgroundImage?: string }) {
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
    <div className="howa-surface relative overflow-hidden border border-house-brown/10">
      {/* Background home image + scrim */}
      <Image src={backgroundImage} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-house-midnight/55" />

      <div className="relative px-4 py-8 sm:px-8 md:py-12">
        <div className="mx-auto w-full max-w-[640px] overflow-hidden border border-house-gold/25 bg-house-white shadow-[0_28px_70px_-30px_rgba(16,37,52,0.7)]">
          {/* header */}
          <div className="flex items-center gap-2.5 border-b border-house-brown/8 bg-house-cream px-5 py-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-house-midnight font-display text-[12px] text-house-gold-ink">H</span>
            <div className="leading-tight">
              <p className="font-display text-[15px] text-house-black">Ask HoWA</p>
              <p className="text-[11px] text-house-stone/70">Answers from your Home Record</p>
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
                    ? "border-house-midnight bg-house-midnight text-house-cream"
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
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-house-midnight px-4 py-2.5 text-[14px] leading-snug text-house-cream">{item.issue}</p>
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
                {/* Source or missing-context state shown beside the answer. */}
                {!thinking && !isResultPhase && stage === "await" ? (
                  <span className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-house-brown/10 pt-2">
                    <span className="border border-house-brown/20 bg-house-white px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-house-brown/70">
                      {item.source}
                    </span>
                    <span className="border border-house-brown/20 bg-house-white px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-house-brown/70">
                      Confidence: {CONFIDENCE[item.issue] ?? "Medium"}
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
                        "flex-1 px-4 py-2.5 text-[13.5px] transition-[filter,background-color] " +
                        (i === 0
                          ? "bg-house-sage text-white hover:brightness-110"
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

          <p className="border-t border-house-brown/8 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.1em] text-house-stone/70">
            Illustrative example. Your answers come from your own Home Record once you start.
          </p>
        </div>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="HoWA is thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-house-gold-dark/70 motion-safe:animate-bounce"
          style={{ animationDelay: `${i * 0.16}s`, animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-house-gold-dark align-middle motion-safe:animate-pulse" aria-hidden />;
}
