"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { TurnstileField } from "./TurnstileField";
import { FormStatus, type FormStatusState } from "./FormStatus";
import { submitForm } from "./submitForm";
import {
  waitlistInterestSchema,
  type WaitlistInterestInput,
  type WaitlistInterestOutput,
} from "@/lib/forms/schemas";

/**
 * StewardApplicationForm — the /howa/steward "Request an invitation" form.
 *
 * Steward is invite-only, so this reads as an application, not a signup. It
 * posts the shared waitlist body with product = "howa_app" and tier = "steward",
 * which routes it through subscribeToWaitlist() and lands the profile in the
 * existing `tier_interest = Steward` Klaviyo segment. The extra Steward fields
 * (propertyType, note) ride along as `property_type` / `steward_note` profile
 * properties, with a `steward_application: true` flag set server-side.
 *
 * Sits on navy, so it always renders in the dark variant.
 */
export interface StewardApplicationFormProps {
  turnstileSiteKey: string;
  sourcePage?: string;
}

const PROPERTY_TYPES = [
  "Detached",
  "Townhouse",
  "Period property",
  "Estate",
  "Other",
] as const;

export function StewardApplicationForm({
  turnstileSiteKey,
  sourcePage,
}: StewardApplicationFormProps) {
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = React.useState<FormStatusState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInterestInput, unknown, WaitlistInterestOutput>({
    resolver: zodResolver(waitlistInterestSchema),
    defaultValues: {
      product: "howa_app",
      tier: "steward",
      sourcePage,
      turnstileToken: "",
      honey: "",
    },
  });

  const selectCls =
    "w-full border border-white/30 bg-transparent px-3 py-2.5 text-[19px] text-white outline-none transition-colors focus:border-[color:var(--color-gold)]";
  const labelCls =
    "block font-sans text-[18px] tracking-[0.04em] mb-1.5 text-white/70";

  const onSubmit = async (data: WaitlistInterestOutput) => {
    setStatus({ kind: "submitting" });
    const result = await submitForm("waitlist", data);
    if (result.ok) {
      setStatus({
        kind: "success",
        message:
          "Thank you. We review each application personally and will be in touch.",
      });
      reset({ product: "howa_app", tier: "steward", sourcePage, turnstileToken: "", honey: "" });
      turnstileRef.current?.reset();
    } else {
      setStatus({ kind: "error", message: result.error });
      turnstileRef.current?.reset();
    }
  };

  return (
    // eslint-disable-next-line react-hooks/refs -- react-hook-form's handleSubmit owns its own refs
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honey")} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="First name"
            required
            autoComplete="given-name"
            dark
            error={errors.firstName?.message}
            {...register("firstName", { required: "Required" })}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Last name"
            required
            autoComplete="family-name"
            dark
            error={errors.lastName?.message}
            {...register("lastName", { required: "Required" })}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            dark
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Property postcode"
            required
            autoComplete="postal-code"
            dark
            error={errors.postcode?.message}
            {...register("postcode", { required: "Required" })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="st-prop" className={labelCls}>
          Property type (optional)
        </label>
        <select id="st-prop" defaultValue="" className={selectCls} {...register("propertyType")}>
          <option value="" style={{ color: "#6b6357", background: "#fff" }}>
            Select a type…
          </option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t} style={{ color: "#1a241d", background: "#fff" }}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="st-note" className={labelCls}>
          A little about your home (optional)
        </label>
        <textarea
          id="st-note"
          rows={3}
          className={`${selectCls} resize-none placeholder:text-white/40`}
          placeholder="Period, size, what you'd want a steward to watch over…"
          {...register("note")}
        />
      </div>

      <div className="pt-1">
        <Button type="submit" variant="outline-light" loading={isSubmitting} disabled={isSubmitting}>
          Request an invitation
        </Button>
      </div>

      <TurnstileField
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        theme="dark"
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        onExpire={() => setValue("turnstileToken", "")}
      />
      {errors.turnstileToken ? (
        <p className="font-sans text-[18px] text-red-300">{errors.turnstileToken.message}</p>
      ) : null}

      <FormStatus status={status} dark />
    </form>
  );
}
