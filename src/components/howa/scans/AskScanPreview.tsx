"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * AskScanPreview, the Ask HoWA preview card. Ask is a conversation, not a scan:
 * clicking "Ask a question" surfaces a sample question and types a grounded
 * answer over a home image, then offers the full demo. Illustrative and clearly
 * labelled.
 */

const TYPE_MS = 26;
const THINK_MS = 500;
const NAVY = "#132740";

const SAMPLE = {
  question: "When was the boiler last serviced?",
  answer: "Last serviced 14 March 2025. The next service is due in about three months, and the warranty runs to 2027.",
};

type Stage = "idle" | "thinking" | "typing" | "done";

export function AskScanPreview({
  image = "/howa/design/interiors/project-living-room.webp",
  href = "/howa/ask",
  aspect = "16 / 9",
  className = "",
}: {
  image?: string;
  href?: string;
  aspect?: string;
  className?: string;
}) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState("");
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Keyed on `started` (not `stage`) so changing stage inside doesn't re-run
  // the effect and clear its own typing interval.
  useEffect(() => {
    if (!started) return;
    setStage("thinking");
    setTyped("");
    let typeTimer: ReturnType<typeof setInterval> | null = null;
    const think = setTimeout(() => {
      if (reduced.current) {
        setTyped(SAMPLE.answer);
        setStage("done");
        return;
      }
      setStage("typing");
      let i = 0;
      typeTimer = setInterval(() => {
        i += 1;
        setTyped(SAMPLE.answer.slice(0, i));
        if (i >= SAMPLE.answer.length) {
          if (typeTimer) clearInterval(typeTimer);
          setStage("done");
        }
      }, TYPE_MS);
    }, reduced.current ? 0 : THINK_MS);
    return () => {
      clearTimeout(think);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, [started]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(19,39,64,0.55)" }} />

      {/* Badge */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-white" style={{ background: "rgba(19,39,64,0.85)" }}>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-house-gold-ink" />
        Ask HoWA
      </div>

      {/* Conversation */}
      {started && (
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-2.5 px-5 sm:px-8" aria-live="polite">
          <div className="flex justify-end">
            <p className="max-w-[78%] rounded-2xl rounded-br-sm px-3.5 py-2 text-[13px] leading-snug text-house-cream" style={{ background: NAVY }}>{SAMPLE.question}</p>
          </div>
          <div className="flex justify-start">
            <p className="max-w-[86%] rounded-2xl rounded-bl-sm bg-house-white/95 px-3.5 py-2.5 text-[13px] leading-[1.45] text-house-black">
              {stage === "thinking" ? <ThinkingDots /> : (
                <span>
                  {typed}
                  {stage === "typing" && <Cursor />}
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Idle: ask button */}
      {!started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="group absolute inset-0 z-20 flex items-center justify-center transition-colors"
          aria-label="Ask HoWA a sample question"
        >
          <span className="border border-house-gold-dark bg-house-gold-ink px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-house-brown shadow-[0_10px_30px_-12px_rgba(40,30,10,0.6)] transition-[filter] group-hover:brightness-110">
            Ask a question
          </span>
        </button>
      )}

      {/* Done: go to the full demo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4"
        style={{
          opacity: stage === "done" ? 1 : 0,
          transform: stage === "done" ? "none" : "translateY(10px)",
          transition: "opacity .6s ease .3s, transform .6s ease .3s",
          background: "linear-gradient(to top, rgba(16,37,52,0.7), transparent)",
        }}
      >
        <Link
          href={href}
          tabIndex={stage === "done" ? 0 : -1}
          aria-hidden={stage !== "done"}
          className="pointer-events-auto border border-house-gold-dark bg-house-gold-ink px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-house-brown no-underline shadow-[0_10px_30px_-12px_rgba(40,30,10,0.6)] transition-[filter] hover:brightness-110"
        >
          Ask your home →
        </Link>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-0.5" aria-label="HoWA is thinking">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-house-gold-dark/70 motion-safe:animate-bounce" style={{ animationDelay: `${i * 0.16}s`, animationDuration: "0.9s" }} />
      ))}
    </span>
  );
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-house-gold-dark align-middle motion-safe:animate-pulse" aria-hidden />;
}
