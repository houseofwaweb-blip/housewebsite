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
 * WaitlistForm — register-interest on Steward / Protect Review / Insurance / HoWA app.
 * Product is set by the parent (each coming-soon surface embeds its own WaitlistForm).
 */
export interface WaitlistFormProps {
  product: WaitlistInterestInput["product"];
  turnstileSiteKey: string;
  sourcePage?: string;
  dark?: boolean;
  submitLabel?: string;
  successMessage?: string;
}

export function WaitlistForm({
  product,
  turnstileSiteKey,
  sourcePage,
  dark = false,
  submitLabel = "Register interest",
  successMessage = "Thank you. We'll write when it opens.",
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honey")} />
      </div>

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
        <p className="font-sans text-[12px] text-red-700">
          {errors.turnstileToken.message}
        </p>
      ) : null}

      <FormStatus status={status} dark={dark} />
    </form>
  );
}
