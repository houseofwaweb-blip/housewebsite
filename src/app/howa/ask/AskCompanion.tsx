"use client";

import * as React from "react";
import s from "./ask.module.css";

export interface AskChoice {
  label: string;
  result: string;
}
export interface AskItem {
  issue: string;
  answer: string;
  choices: AskChoice[];
}

type Stage =
  | "thinking"
  | "typing"
  | "await"
  | "thinkingResult"
  | "typingResult"
  | "result";

const TYPE_MS = 30; // per character (slower than the first pass)
const THINK_MS = 520;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * AskCompanion — the diagnostic, made interactive.
 *
 * Pick a question; the Companion thinks, then types its answer back. Once it
 * lands, two action buttons appear ("Book a plumber" / "Save it for now"). The
 * reader picks one and the Companion types a concrete confirmation (a booked
 * slot added to the diary, a reminder set). Honours prefers-reduced-motion.
 */
export function AskCompanion({ items }: { items: AskItem[] }) {
  const [active, setActive] = React.useState(0);
  const [chosen, setChosen] = React.useState<number | null>(null);
  const [typed, setTyped] = React.useState("");
  const [stage, setStage] = React.useState<Stage>("thinking");
  const reduced = usePrefersReducedMotion();
  const item = items[active];

  function pickQuestion(i: number) {
    if (i === active) return;
    setActive(i);
    setChosen(null);
  }

  React.useEffect(() => {
    if (!item) return;
    const isResult = chosen !== null;
    const text = isResult ? item.choices[chosen]?.result ?? "" : item.answer;
    setTyped("");
    setStage(isResult ? "thinkingResult" : "thinking");

    if (reduced) {
      setTyped(text);
      setStage(isResult ? "result" : "await");
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    const think = setTimeout(() => {
      setStage(isResult ? "typingResult" : "typing");
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setStage(isResult ? "result" : "await");
        }
      }, TYPE_MS);
    }, THINK_MS);

    return () => {
      clearTimeout(think);
      if (interval) clearInterval(interval);
    };
  }, [active, chosen, item, reduced]);

  if (!item) return null;

  const answerSettled =
    stage === "await" ||
    stage === "thinkingResult" ||
    stage === "typingResult" ||
    stage === "result";

  return (
    <div className={s.ask}>
      <div className={s.askChips} role="tablist" aria-label="Questions for the Assistant">
        {items.map((it, i) => (
          <button
            key={it.issue}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${s.askChip} ${i === active ? s.askChipActive : ""}`}
            onClick={() => pickQuestion(i)}
          >
            {it.issue}
          </button>
        ))}
      </div>

      <div className={s.askPanel} aria-live="polite">
        {/* You said */}
        <div className={s.askUser}>
          <p className={s.askUserLabel}>You said</p>
          <p className={s.askBubbleUser}>{item.issue}</p>
        </div>

        {/* The Companion answers */}
        <div className={s.askBot}>
          <p className={s.askBotLabel}>The Assistant</p>
          {stage === "thinking" ? (
            <p className={s.askThinking} aria-hidden="true">
              <span />
              <span />
              <span />
            </p>
          ) : (
            <p className={s.askAnswer}>
              <span aria-hidden={stage === "typing"}>
                {answerSettled ? item.answer : typed}
              </span>
              {stage === "typing" ? <span className={s.askCursor} aria-hidden="true" /> : null}
            </p>
          )}
        </div>

        {/* Two actions to choose from */}
        {stage === "await" ? (
          <div className={s.askChoices}>
            <p className={s.askChoicePrompt}>What would you like to do?</p>
            <div className={s.askChoiceBtns}>
              {item.choices.map((c, i) => (
                <button
                  key={c.label}
                  type="button"
                  className={s.askChoiceBtn}
                  onClick={() => setChosen(i)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* The chosen action + the Companion's confirmation */}
        {chosen !== null ? (
          <>
            <div className={s.askChoiceMade}>
              <p className={s.askUserLabel}>You chose</p>
              <p className={s.askBubbleUser}>{item.choices[chosen]?.label}</p>
            </div>
            <div className={s.askBot}>
              <p className={s.askBotLabel}>The Assistant</p>
              {stage === "thinkingResult" ? (
                <p className={s.askThinking} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
              ) : (
                <p className={s.askAnswer}>
                  <span aria-hidden={stage === "typingResult"}>
                    {stage === "result" ? item.choices[chosen]?.result : typed}
                  </span>
                  {stage === "typingResult" ? (
                    <span className={s.askCursor} aria-hidden="true" />
                  ) : null}
                </p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
