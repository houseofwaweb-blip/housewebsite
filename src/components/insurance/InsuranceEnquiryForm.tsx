"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
 * InsuranceEnquiryForm, the shared 5-field specialist enquiry (name, email,
 * phone, postcode, renewal month). One component across every specialist page
 * so a field change happens once. NEVER add pre-purchase questions (sums
 * insured, contents value, claims history, existing insurer), Article 33B
 * limits the House to passing information it already holds, and form length
 * kills conversion. Business pages may add a company name (6 fields).
 *
 * Submits to the existing waitlist/insurance endpoint (Klaviyo + CRM), with the
 * enquiry detail carried in `context`. On success the visitor lands on the
 * confirmation page where the conversion event fires.
 */
const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  phone: z.string().trim().regex(/^[0-9+()\-\s]{7,20}$/u, "Enter a valid phone number"),
  postcode: z.string().trim().min(1, "Required").max(12),
  renewalMonth: z.string().min(1, "Please choose"),
  companyName: z.string().trim().max(160).optional(),
  marketingOptIn: z.boolean().optional(),
  turnstileToken: z.string().min(1, "Verification required"),
  honey: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function InsuranceEnquiryForm({
  enquiryType,
  turnstileSiteKey,
  sourcePage,
  submitLabel = "Speak to a specialist",
  withCompany = false,
}: {
  /** For attribution, e.g. "listed-buildings", "private-client", "trades". */
  enquiryType: string;
  turnstileSiteKey: string;
  sourcePage?: string;
  submitLabel?: string;
  /** B2B pages add a company-name field. */
  withCompany?: boolean;
}) {
  const router = useRouter();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const started = React.useRef(false);
  const [status, setStatus] = React.useState<FormStatusState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { turnstileToken: "", honey: "" },
  });

  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    gaEvent("form_start", { form_type: "insurance_enquiry", enquiry_type: enquiryType });
  };

  const onSubmit = async (data: Values) => {
    if (data.honey) return; // honeypot
    setStatus({ kind: "submitting" });
    const result = await submitForm("waitlist", {
      email: data.email,
      product: "insurance",
      firstName: data.name,
      postcode: data.postcode,
      marketingOptIn: data.marketingOptIn ?? false,
      sourcePage,
      turnstileToken: data.turnstileToken,
      context: {
        enquiry_type: enquiryType,
        phone: data.phone,
        renewal_month: data.renewalMonth,
        ...(withCompany && data.companyName ? { company: data.companyName } : {}),
        ...getAttribution(),
      },
    });
    if (result.ok) {
      gaEvent("insurance_enquiry_submit", { enquiry_type: enquiryType });
      router.push("/insurance/thank-you");
    } else {
      setStatus({ kind: "error", message: result.error });
      turnstileRef.current?.reset();
    }
  };

  const selectCls =
    "w-full border border-house-brown/30 bg-white px-3 py-2.5 text-[16px] text-house-brown outline-none transition-colors focus:border-[color:var(--ins-accent)]";

  return (
    // eslint-disable-next-line react-hooks/refs -- react-hook-form's handleSubmit owns its own refs
    <form onSubmit={handleSubmit(onSubmit)} onFocusCapture={onFirstInput} className="space-y-4" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honey")} />
      </div>

      <Input label="Name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
      {withCompany ? (
        <Input label="Company" autoComplete="organization" error={errors.companyName?.message} {...register("companyName")} />
      ) : null}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
        </div>
        <div className="flex-1">
          <Input label="Phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input label="Postcode" required autoComplete="postal-code" error={errors.postcode?.message} {...register("postcode")} />
        </div>
        <div className="flex-1">
          <label htmlFor="ins-renewal" className="mb-1.5 block font-sans text-[15px] tracking-[0.04em] text-house-brown/70">
            Renewal month
          </label>
          <select id="ins-renewal" required defaultValue="" className={selectCls} {...register("renewalMonth")}>
            <option value="" disabled>Choose a month…</option>
            {RENEWAL_MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.renewalMonth?.message ? (
            <p className="mt-1 font-sans text-[15px] text-red-700">{errors.renewalMonth.message}</p>
          ) : null}
        </div>
      </div>

      <label className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] text-house-brown/75">
        <input type="checkbox" className="mt-1" {...register("marketingOptIn")} />
        <span>Keep me posted with occasional notes from the House. You can stop any time.</span>
      </label>

      <TurnstileField
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        theme="light"
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
        onExpire={() => setValue("turnstileToken", "")}
      />
      {errors.turnstileToken ? (
        <p className="font-sans text-[15px] text-red-700">{errors.turnstileToken.message}</p>
      ) : null}

      {/* Mandated disclosure sits directly above the primary action. */}
      <InsuranceDisclosure />
      <Button type="submit" variant="gold" loading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-auto" style={{ background: "var(--ins-accent)", color: "var(--ins-on)", borderColor: "var(--ins-dark)" }}>
        {submitLabel}
      </Button>

      <FormStatus status={status} />
    </form>
  );
}
