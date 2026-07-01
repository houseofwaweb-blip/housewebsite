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
 * WaitlistForm — register-interest on Steward / Home Protection Review / Insurance / HoWA app.
 * Product is set by the parent (each coming-soon surface embeds its own WaitlistForm).
 */
export interface WaitlistFormProps {
  product: WaitlistInterestInput["product"];
  turnstileSiteKey: string;
  sourcePage?: string;
  dark?: boolean;
  submitLabel?: string;
  successMessage?: string;
  /** HoWA app waitlist: show the required tier picker + optional name/postcode. */
  collectTier?: boolean;
}

const TIER_OPTIONS = [
  { value: "assistant", label: "Assistant, free" },
  { value: "housekeeper", label: "Housekeeper, £16.99/mo" },
  { value: "steward", label: "Steward, £29.99/mo" },
] as const;

export function WaitlistForm({
  product,
  turnstileSiteKey,
  sourcePage,
  dark = false,
  submitLabel = "Register interest",
  successMessage = "Thank you. We'll write when it opens.",
  collectTier = false,
}: WaitlistFormProps) {
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
      product,
      sourcePage,
      turnstileToken: "",
      honey: "",
    },
  });

  // Pre-fill the tier from a `?tier=` link (e.g. /howa/coming-soon?tier=steward),
  // so "Apply for Steward" arrives with Steward already chosen.
  React.useEffect(() => {
    if (!collectTier) return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tier")?.toLowerCase();
    if (t && TIER_OPTIONS.some((o) => o.value === t)) {
      setValue("tier", t as WaitlistInterestInput["tier"], { shouldValidate: true });
    }
    // Carry the address/postcode typed into a hero "Enter your address" bar.
    const pc = params.get("postcode")?.trim();
    if (pc) {
      setValue("postcode", pc.toUpperCase(), { shouldValidate: true });
    }
  }, [collectTier, setValue]);

  const selectCls = `w-full border px-3 py-2.5 text-[16px] outline-none transition-colors ${
    dark
      ? "border-white/30 bg-transparent text-white focus:border-white/60"
      : "border-house-brown/30 bg-white text-house-brown focus:border-house-gold"
  }`;
  const labelCls = `block font-sans text-[15px] tracking-[0.04em] mb-1.5 ${dark ? "text-white/75" : "text-house-brown/70"}`;

  const onSubmit = async (data: WaitlistInterestOutput) => {
    setStatus({ kind: "submitting" });
    const result = await submitForm("waitlist", data);
    if (result.ok) {
      setStatus({ kind: "success", message: successMessage });
      reset({ product, sourcePage, turnstileToken: "", honey: "" });
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

      {collectTier ? (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="First name"
                required
                autoComplete="given-name"
                dark={dark}
                error={errors.firstName?.message}
                {...register("firstName", { required: "Required" })}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Last name"
                required
                autoComplete="family-name"
                dark={dark}
                error={errors.lastName?.message}
                {...register("lastName", { required: "Required" })}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="wl-tier" className={labelCls}>
                Which tier interests you?
              </label>
              <select
                id="wl-tier"
                required
                defaultValue=""
                className={selectCls}
                {...register("tier", { required: "Please choose a tier" })}
              >
                <option value="" disabled style={{ color: "#6b6357", background: "#fff" }}>
                  Choose a tier…
                </option>
                {TIER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} style={{ color: "#1a241d", background: "#fff" }}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.tier?.message ? (
                <p className="font-sans text-[15px] text-red-700 mt-1">{errors.tier.message}</p>
              ) : null}
            </div>
            <div className="flex-1">
              <Input
                label="Postcode (optional)"
                autoComplete="postal-code"
                dark={dark}
                error={errors.postcode?.message}
                {...register("postcode")}
              />
            </div>
          </div>
        </>
      ) : null}

      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1">
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            dark={dark}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          variant={dark ? "outline-light" : "gold"}
          loading={isSubmitting}
          disabled={isSubmitting}
          className="md:mb-1.5"
        >
          {submitLabel}
        </Button>
      </div>

      <TurnstileField
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        theme={dark ? "dark" : "light"}
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        onExpire={() => setValue("turnstileToken", "")}
      />
      {errors.turnstileToken ? (
        <p className="font-sans text-[15px] text-red-700">
          {errors.turnstileToken.message}
        </p>
      ) : null}

      <FormStatus status={status} dark={dark} />
    </form>
  );
}
