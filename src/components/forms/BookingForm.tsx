"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Input, Textarea } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { TurnstileField } from "./TurnstileField";
import { FormStatus, type FormStatusState } from "./FormStatus";
import { submitForm } from "./submitForm";
import {
  consultationBookingSchema,
  type ConsultationBookingInput,
  type ConsultationBookingOutput,
} from "@/lib/forms/schemas";

/**
 * BookingForm — consultation booking across all service types.
 * Spec: DESIGN.md Part F · booking flow. Routes to consultation_bookings table.
 */
export interface BookingFormProps {
  turnstileSiteKey: string;
  sourcePage?: string;
  defaultServiceType?: ConsultationBookingInput["serviceType"];
  dark?: boolean;
}

export function BookingForm({
  turnstileSiteKey,
  sourcePage,
  defaultServiceType = "general",
  dark = false,
}: BookingFormProps) {
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = React.useState<FormStatusState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationBookingInput, unknown, ConsultationBookingOutput>({
    resolver: zodResolver(consultationBookingSchema),
    defaultValues: {
      serviceType: defaultServiceType,
      sourcePage,
      turnstileToken: "",
      honey: "",
    },
  });

  const serviceType = watch("serviceType");

  const onSubmit = async (data: ConsultationBookingOutput) => {
    setStatus({ kind: "submitting" });
    const result = await submitForm("consultation", data);
    if (result.ok) {
      setStatus({
        kind: "success",
        message: "Thank you. A member of the House will write back within one working day.",
      });
      reset({ serviceType: defaultServiceType, sourcePage, turnstileToken: "", honey: "" });
      turnstileRef.current?.reset();
    } else {
      setStatus({ kind: "error", message: result.error });
      turnstileRef.current?.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot — visually hidden, tab-skipped */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="bf-honey">Do not fill</label>
        <input
          id="bf-honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honey")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Name"
          required
          autoComplete="name"
          dark={dark}
          error={errors.name?.message}
          {...register("name")}
        />
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

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone"
          type="tel"
          autoComplete="tel"
          dark={dark}
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Postcode"
          autoComplete="postal-code"
          dark={dark}
          error={errors.postcode?.message}
          {...register("postcode")}
        />
      </div>

      <div>
        <span
          className={`font-sans text-[10px] tracking-[0.22em] uppercase block mb-3 ${
            dark ? "text-house-cream/70" : "text-house-brown/70"
          }`}
        >
          Service
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SERVICE_OPTIONS.map((opt) => {
            const checked = serviceType === opt.value;
            return (
              <label
                key={opt.value}
                className={`cursor-pointer border px-3 py-2.5 font-sans text-[12px] tracking-[0.08em] uppercase text-center transition-colors duration-[var(--t-base)] ease-[var(--ease-out)] ${
                  checked
                    ? dark
                      ? "bg-house-cream text-house-brown border-house-cream"
                      : "bg-house-brown text-house-cream border-house-brown"
                    : dark
                      ? "border-house-cream/20 text-house-cream/80 hover:border-house-cream/50"
                      : "border-house-brown/20 text-house-brown/80 hover:border-house-brown/50"
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  checked={checked}
                  onChange={() => setValue("serviceType", opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>

      <Input
        label="Preferred dates"
        hint="E.g. 'weekday mornings, April 22 onwards'"
        dark={dark}
        error={errors.preferredDates?.message}
        {...register("preferredDates")}
      />

      <Textarea
        label="Notes"
        rows={4}
        hint="Anything that'll help us prepare for the conversation."
        dark={dark}
        error={errors.notes?.message}
        {...register("notes")}
      />

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

      <div className="pt-2">
        <Button
          type="submit"
          variant={dark ? "outline-light" : "gold"}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Book consultation
        </Button>
        <FormStatus status={status} dark={dark} />
      </div>
    </form>
  );
}

const SERVICE_OPTIONS: Array<{
  value: ConsultationBookingInput["serviceType"];
  label: string;
}> = [
  { value: "design-interiors", label: "Interiors" },
  { value: "design-gardens", label: "Gardens" },
  { value: "gardening", label: "Gardening" },
  { value: "window-cleaning", label: "Windows" },
  { value: "cleaning", label: "Cleaning" },
  { value: "gutter-cleaning", label: "Gutters" },
  { value: "steward", label: "Steward" },
  { value: "protect", label: "Protect" },
  { value: "general", label: "General" },
];
