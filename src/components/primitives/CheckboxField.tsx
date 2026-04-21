"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * CheckboxField — custom-styled checkbox with the Playground zoom-and-settle
 * animation on check. 18px square, 1.5px brown border, gold when checked.
 * Checkmark uses `howa-check-settle` keyframe from globals.css.
 *
 * Structure: the <label> is a `group`; the native input uses `sr-only`;
 * every styled element below reads the checked state via `group-has-[:checked]`
 * so child elements (not just siblings) can react.
 */
export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: React.ReactNode;
  hint?: string;
  error?: string;
  dark?: boolean;
}

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, hint, error, dark = false, id, className, disabled, ...rest }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
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
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className="sr-only"
            {...rest}
          />

          {/* Custom box */}
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-[3px] shrink-0 inline-block w-[18px] h-[18px]",
              "border-[1.5px] transition-colors",
              "duration-slow ease-out",
              dark ? "border-house-cream" : "border-house-brown",
              "group-has-[:checked]:bg-house-gold group-has-[:checked]:border-house-gold",
              "group-has-[:focus-visible]:outline group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 group-has-[:focus-visible]:outline-house-gold",
              error && "!border-error group-has-[:checked]:!bg-error group-has-[:checked]:!border-error",
            )}
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "text-white text-[13px] font-semibold leading-none",
                "scale-0 opacity-0",
                "group-has-[:checked]:[animation:howa-check-settle_var(--t-slow)_var(--ease-settle)_forwards]",
              )}
            >
              ✓
            </span>
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

        {hint && !error ? (
          <p
            className={cn(
              "font-sans italic text-[13px] pl-[30px]",
              dark ? "text-house-cream/55" : "text-house-stone",
            )}
          >
            {hint}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="font-sans italic text-[13px] text-error pl-[30px]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
CheckboxField.displayName = "CheckboxField";
