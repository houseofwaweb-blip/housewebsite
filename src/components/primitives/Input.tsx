"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Input — text, email, tel field with the Playground interaction pattern.
 * Spec: /ux/09-interactions/playground.html (forms section).
 *
 * Default: cream background, full brown hairline, stone italic placeholder.
 * Focus:   white background, brown border, gold underline grows left→right,
 *          placeholder dims + slides 4px right.
 * Error/success: animated grid-row message slot (0fr → 1fr) under the field.
 *
 * All timing via --t-* vars; all respects prefers-reduced-motion.
 */

type BaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps extends BaseProps {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  dark?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hint, error, success, dark = false, id, className, required, onFocus, onBlur, ...rest },
    ref,
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const successId = success ? `${inputId}-success` : undefined;
    const describedBy = [hintId, errorId, successId].filter(Boolean).join(" ") || undefined;

    const [focused, setFocused] = React.useState(false);

    const state: "error" | "success" | "default" = error ? "error" : success ? "success" : "default";

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "font-sans text-[11px] tracking-[0.22em] uppercase",
            dark ? "text-house-cream/70" : "text-house-brown/70",
          )}
        >
          {label}
          {required ? <span aria-hidden="true" className="ml-1 opacity-60">*</span> : null}
        </label>

        {/* Wrap hosts the growing underline pseudo */}
        <div
          className={cn(
            "relative border transition-colors",
            "duration-slow ease-out",
            dark
              ? focused
                ? "bg-house-brown border-house-cream"
                : "bg-transparent border-house-cream/30"
              : focused
                ? "bg-white border-house-brown"
                : "bg-house-cream border-house-brown/30",
            state === "error" && "border-error",
            state === "success" && "border-success",
            // Underline grow-in: use ::after via a sibling span (Tailwind can't style ::after dynamically)
          )}
        >
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={state === "error" ? true : undefined}
            aria-describedby={describedBy}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              "w-full bg-transparent border-0 outline-none px-4 py-3",
              "font-sans text-[16px] leading-[1.4]",
              "placeholder:font-display placeholder:italic placeholder:transition-all",
              "placeholder:duration-[var(--t-slow)] placeholder:ease-out",
              dark
                ? "text-house-cream placeholder:text-house-cream/50"
                : "text-house-brown placeholder:text-house-stone",
              focused && "placeholder:opacity-40 placeholder:translate-x-1",
              className,
            )}
            {...rest}
          />
          {/* Gold underline — grows from 0 to full on focus */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 bottom-[-1px] h-[2px] bg-house-gold",
              "transition-[width] duration-[var(--t-slow)] ease-out",
              focused ? "w-full" : "w-0",
            )}
          />
        </div>

        {/* Hint — stable, not animated */}
        {hint && state === "default" ? (
          <p
            id={hintId}
            className={cn(
              "font-sans italic text-[13px] leading-[1.4]",
              dark ? "text-house-cream/55" : "text-house-stone",
            )}
          >
            {hint}
          </p>
        ) : null}

        {/* Message slot — grid-row expand (0fr → 1fr) */}
        <MessageSlot open={state === "error" || state === "success"}>
          {state === "error" ? (
            <p id={errorId} role="alert" className="font-sans italic text-[13px] text-error">
              {error}
            </p>
          ) : state === "success" ? (
            <p id={successId} className="font-sans italic text-[13px] text-success">
              {success}
            </p>
          ) : null}
        </MessageSlot>
      </div>
    );
  },
);
Input.displayName = "Input";

/**
 * Textarea — same pattern as Input, multi-line.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  dark?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, hint, error, success, dark = false, id, className, required, rows = 4, onFocus, onBlur, ...rest },
    ref,
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const successId = success ? `${inputId}-success` : undefined;
    const describedBy = [hintId, errorId, successId].filter(Boolean).join(" ") || undefined;
    const [focused, setFocused] = React.useState(false);
    const state: "error" | "success" | "default" = error ? "error" : success ? "success" : "default";

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "font-sans text-[11px] tracking-[0.22em] uppercase",
            dark ? "text-house-cream/70" : "text-house-brown/70",
          )}
        >
          {label}
          {required ? <span aria-hidden="true" className="ml-1 opacity-60">*</span> : null}
        </label>

        <div
          className={cn(
            "relative border transition-colors",
            "duration-slow ease-out",
            dark
              ? focused
                ? "bg-house-brown border-house-cream"
                : "bg-transparent border-house-cream/30"
              : focused
                ? "bg-white border-house-brown"
                : "bg-house-cream border-house-brown/30",
            state === "error" && "border-error",
            state === "success" && "border-success",
          )}
        >
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            required={required}
            aria-invalid={state === "error" ? true : undefined}
            aria-describedby={describedBy}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              "w-full bg-transparent border-0 outline-none px-4 py-3 resize-none",
              "font-sans text-[16px] leading-[1.5]",
              "placeholder:font-display placeholder:italic placeholder:transition-all",
              "placeholder:duration-[var(--t-slow)] placeholder:ease-out",
              dark
                ? "text-house-cream placeholder:text-house-cream/50"
                : "text-house-brown placeholder:text-house-stone",
              focused && "placeholder:opacity-40 placeholder:translate-x-1",
              className,
            )}
            {...rest}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 bottom-[-1px] h-[2px] bg-house-gold",
              "transition-[width] duration-[var(--t-slow)] ease-out",
              focused ? "w-full" : "w-0",
            )}
          />
        </div>

        {hint && state === "default" ? (
          <p
            id={hintId}
            className={cn(
              "font-sans italic text-[13px] leading-[1.4]",
              dark ? "text-house-cream/55" : "text-house-stone",
            )}
          >
            {hint}
          </p>
        ) : null}

        <MessageSlot open={state === "error" || state === "success"}>
          {state === "error" ? (
            <p id={errorId} role="alert" className="font-sans italic text-[13px] text-error">
              {error}
            </p>
          ) : state === "success" ? (
            <p id={successId} className="font-sans italic text-[13px] text-success">
              {success}
            </p>
          ) : null}
        </MessageSlot>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

/**
 * MessageSlot — grid-row expand (0fr → 1fr) so children collapse fully
 * when inactive without content shifting around them.
 */
function MessageSlot({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-[var(--t-slow)] ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div
        className={cn(
          "overflow-hidden transition-[opacity,padding] duration-[var(--t-slow)] ease-out",
          open ? "opacity-100 pt-1.5" : "opacity-0 pt-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
