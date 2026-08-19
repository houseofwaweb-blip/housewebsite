"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Input, Textarea } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { TurnstileField } from "./TurnstileField";
import { FormStatus, type FormStatusState } from "./FormStatus";
import { submitForm } from "./submitForm";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
  type ContactSubmissionOutput,
} from "@/lib/forms/schemas";

/**
 * ContactForm — /ux/10-contact mockup.
 * Step 1: pick a topic (6 cards). Step 2: topic-specific fields + message.
 *
 * Each topic remembers its own intro copy and subject prompt, so the form
 * feels written for the visitor rather than generic.
 */
export interface ContactFormProps {
  turnstileSiteKey: string;
  sourcePage?: string;
}

type Topic = ContactSubmissionInput["topic"];

const TOPICS: Array<{
  value: Topic;
  label: string;
  blurb: string;
  subjectHint: string;
}> = [
  {
    value: "general",
    label: "General enquiry",
    blurb: "Anything else we haven't covered.",
    subjectHint: "A few words on what you'd like to discuss",
  },
  {
    value: "press",
    label: "Press & editorial",
    blurb: "Features, comment requests, assets, interviews.",
    subjectHint: "Publication or outlet + deadline",
  },
  {
    value: "partnership",
    label: "Partnerships",
    blurb: "Collaborations, suppliers, designers, brands.",
    subjectHint: "Nature of the partnership",
  },
  {
    value: "careers",
    label: "Careers",
    blurb: "Open roles and speculative applications.",
    subjectHint: "Role or area of interest",
  },
  {
    value: "existing-client",
    label: "Existing client",
    blurb: "Issues with a service or an active engagement.",
    subjectHint: "Your project reference, if you have one",
  },
  {
    value: "complaint",
    label: "Complaint",
    blurb: "Something went wrong. We'll read it personally.",
    subjectHint: "Brief summary of the issue",
  },
];

export function ContactForm({ turnstileSiteKey, sourcePage }: ContactFormProps) {
  const router = useRouter();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = React.useState<FormStatusState>({ kind: "idle" });
  const [topic, setTopic] = React.useState<Topic | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactSubmissionInput, unknown, ContactSubmissionOutput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      topic: "general",
      sourcePage,
      turnstileToken: "",
      honey: "",
    },
  });

  // No Turnstile site key configured (local/preview without the env var): skip
  // the widget entirely and satisfy the token field, so the form still submits
  // instead of rendering the Cloudflare "unable to connect" error. The server
  // skips verification when its secret is likewise unset.
  React.useEffect(() => {
    if (!turnstileSiteKey) setValue("turnstileToken", "no-turnstile", { shouldValidate: false });
  }, [turnstileSiteKey, setValue]);

  const activeTopic = topic ? TOPICS.find((t) => t.value === topic)! : null;

  const onSubmit = async (data: ContactSubmissionOutput) => {
    setStatus({ kind: "submitting" });
    const result = await submitForm("contact", data);
    if (result.ok) {
      router.push("/thank-you");
      return;
    }
    setStatus({ kind: "error", message: result.error });
    turnstileRef.current?.reset();
  };

  return (
    <div className="space-y-10">
      {/* Step 1 — topic selection */}
      <fieldset>
        <legend className="font-sans text-[14px] tracking-[0.22em] uppercase text-house-brown/70 mb-4">
          What's this about?
        </legend>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPICS.map((t) => {
            const selected = topic === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setTopic(t.value);
                  setValue("topic", t.value);
                }}
                aria-pressed={selected}
                className={`text-left border p-5 transition-colors duration-[var(--t-base)] ease-[var(--ease-out)] ${
                  selected
                    ? "border-house-gold bg-house-gold/5"
                    : "border-house-brown/12 hover:border-house-brown/30"
                }`}
              >
                <div className="font-sans text-[20px] font-medium mb-1.5">
                  {t.label}
                </div>
                <div className="font-sans text-[18px] text-house-brown/70 leading-[1.55]">
                  {t.blurb}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2 — reveal once a topic is chosen */}
      {activeTopic ? (
        // eslint-disable-next-line react-hooks/refs -- react-hook-form's handleSubmit owns its own refs
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <input type="text" tabIndex={-1} autoComplete="off" {...register("honey")} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Name"
              required
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Input
            label="Subject"
            hint={activeTopic.subjectHint}
            error={errors.subject?.message}
            {...register("subject")}
          />

          <Textarea
            label="Message"
            required
            rows={6}
            error={errors.message?.message}
            {...register("message")}
          />

          <label className="flex items-start gap-2.5 cursor-pointer font-sans text-[17px] leading-[1.5] text-house-stone">
            <input
              type="checkbox"
              {...register("marketingOptIn")}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--house-gold-ink)]"
            />
            <span>I&rsquo;d like to hear from House of Willow Alexander occasionally about home, garden and seasonal tips and offers.</span>
          </label>

          {turnstileSiteKey ? (
            <>
              <TurnstileField
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
                onExpire={() => setValue("turnstileToken", "")}
              />
              {errors.turnstileToken ? (
                <p className="font-sans text-[18px] text-red-700">
                  {errors.turnstileToken.message}
                </p>
              ) : null}
            </>
          ) : null}

          <div className="pt-2">
            <Button type="submit" variant="gold" loading={isSubmitting} disabled={isSubmitting}>
              Send message
            </Button>
            <FormStatus status={status} />
          </div>
        </form>
      ) : null}
    </div>
  );
}
