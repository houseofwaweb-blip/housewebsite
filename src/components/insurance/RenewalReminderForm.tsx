"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { FormStatus, type FormStatusState } from "@/components/forms/FormStatus";
import { submitForm } from "@/components/forms/submitForm";
import { gaEvent } from "@/lib/google/ga4";
import { getAttribution } from "@/lib/attribution";
import { InsuranceDisclosure } from "./InsuranceDisclosure";
import { RENEWAL_MONTHS } from "@/lib/insurance/config";

/**
 * RenewalReminderForm, two fields only (email, renewal month). The single most
 * valuable data point on the site: it is what makes triggered email possible.
 * Consent is explicit and separate. NOT an insurance enquiry, the House passes
 * nothing to Provenance until the person asks it to.
 */
const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  renewalMonth: z.string().min(1, "Please choose"),
  consent: z.boolean().refine((v) => v === true, { message: "Please tick to confirm" }),
  turnstileToken: z.string().min(1, "Verification required"),
  honey: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function RenewalReminderForm({
  turnstileSiteKey,
  sourcePage,
  dark = false,
}: {
  turnstileSiteKey: string;
  sourcePage?: string;
  dark?: boolean;
}) {
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = React.useState<FormStatusState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { turnstileToken: "", honey: "" },
  });

  const onSubmit = async (data: Values) => {
    if (data.honey) return;
    setStatus({ kind: "submitting" });
    const result = await submitForm("waitlist", {
      email: data.email,
      product: "insurance",
      marketingOptIn: true, // explicit consent ticked above
      sourcePage,
      turnstileToken: data.turnstileToken,
      context: { enquiry_type: "renewal_reminder", renewal_month: data.renewalMonth, ...getAttribution() },
    });
    if (result.ok) {
      gaEvent("renewal_reminder_submit", { renewal_month: data.renewalMonth });
      setStatus({ kind: "success", message: "Done. We'll send one email at the right moment, and nothing else." });
      reset({ turnstileToken: "", honey: "" });
      turnstileRef.current?.reset();
    } else {
      setStatus({ kind: "error", message: result.error });
      turnstileRef.current?.reset();
    }
  };

  // Mirror the Input primitive so the select lines up with the email field.
  const selectCls = `w-full border px-4 py-3 font-sans text-[16px] leading-[1.4] outline-none transition-colors ${
    dark
      ? "bg-transparent border-house-cream/30 text-house-cream focus:border-house-cream"
      : "bg-house-cream border-house-brown/30 text-house-brown focus:border-house-brown"
  }`;
  const labelCls = `font-sans text-[12px] tracking-[0.22em] uppercase ${dark ? "text-house-cream/70" : "text-house-brown/70"}`;

  return (
    // eslint-disable-next-line react-hooks/refs -- react-hook-form's handleSubmit owns its own refs
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honey")} />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex-1">
          <Input label="Email" type="email" required autoComplete="email" dark={dark} error={errors.email?.message} {...register("email")} />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="rr-month" className={labelCls}>
            Renewal month<span aria-hidden="true" className="ml-1 opacity-60">*</span>
          </label>
          <select id="rr-month" required defaultValue="" className={selectCls} {...register("renewalMonth")}>
            <option value="" disabled>Choose a month…</option>
            {RENEWAL_MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.renewalMonth?.message ? (
            <p className={`font-sans italic text-[15px] ${dark ? "text-red-300" : "text-red-700"}`}>{errors.renewalMonth.message}</p>
          ) : null}
        </div>
      </div>

      <label className={`flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] ${dark ? "text-white/75" : "text-house-brown/75"}`}>
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>Email me once, near my renewal. I understand this is not an insurance enquiry and my details are not passed on.</span>
      </label>
      {errors.consent?.message ? (
        <p className={`font-sans text-[15px] ${dark ? "text-red-300" : "text-red-700"}`}>{errors.consent.message}</p>
      ) : null}

      <TurnstileField
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        theme={dark ? "dark" : "light"}
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        onExpire={() => setValue("turnstileToken", "")}
      />
      {errors.turnstileToken ? (
        <p className={`font-sans text-[15px] ${dark ? "text-red-300" : "text-red-700"}`}>{errors.turnstileToken.message}</p>
      ) : null}

      {/* Mandated disclosure sits directly above the primary action (spec rule 7 / A5). */}
      {dark ? null : <InsuranceDisclosure />}
      <Button type="submit" variant={dark ? "outline-light" : "gold"} loading={isSubmitting} disabled={isSubmitting} style={dark ? undefined : { background: "var(--ins-accent)", color: "var(--ins-on)", borderColor: "var(--ins-dark)" }}>
        Remind me
      </Button>
      <FormStatus status={status} dark={dark} />
    </form>
  );
}
