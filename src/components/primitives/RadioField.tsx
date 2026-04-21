"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * RadioField — custom-styled radio with zoom-and-settle dot animation.
 * Spec: /ux/09-interactions/playground.html (checkbox section).
 *
 * 18px circle, brown 1.5px border, transparent background, gold inner dot
 * (inset 3px) on check. Dot uses `howa-dot-settle` keyframe.
 *
 * Render as a group: one RadioGroup with children RadioField sharing `name`.
 */
export interface RadioFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: React.ReactNode;
  hint?: string;
  dark?: boolean;
}

export const RadioField = React.forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ label, hint, dark = false, id, className, disabled, ...rest }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "group inline-flex items-start gap-3 cursor-pointer",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className="sr-only"
            {...rest}
          />

          {/* Custom circle */}
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-[3px] shrink-0 inline-block w-[18px] h-[18px] is-round",
              "border-[1.5px] transition-colors",
              "duration-slow ease-out",
              dark ? "border-house-cream" : "border-house-brown",
              "group-has-[:checked]:border-house-gold",
              "group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-house-gold",
            )}
          >
            {/* Inner dot — scale(0) by default, settles to 1 on check */}
            <span
              className={cn(
                "absolute inset-[3px] is-round bg-house-gold",
                "scale-0 opacity-0",
                "group-has-[:checked]:[animation:howa-dot-settle_var(--t-slow)_var(--ease-settle)_forwards]",
              )}
            />
          </span>

          <span
            className={cn(
              "font-sans text-[15px] leading-[1.5]",
              dark ? "text-house-cream" : "text-house-brown",
            )}
          >
            {label}
          </span>
        </label>

        {hint ? (
          <p
            className={cn(
              "font-sans italic text-[13px] pl-[30px]",
              dark ? "text-house-cream/55" : "text-house-stone",
            )}
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
RadioField.displayName = "RadioField";

/**
 * RadioGroup — semantic fieldset wrapper for a set of radios.
 * Pass `name` once via context-ish prop; children pass it through.
 */
export interface RadioGroupProps {
  legend?: string;
  error?: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({ legend, error, dark, children, className }: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      {legend ? (
        <legend
          className={cn(
            "font-sans text-[11px] tracking-[0.22em] uppercase mb-1",
            dark ? "text-house-cream/70" : "text-house-brown/70",
          )}
        >
          {legend}
        </legend>
      ) : null}
      {children}
      {error ? (
        <p role="alert" className="font-sans italic text-[13px] text-error pl-[30px]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
