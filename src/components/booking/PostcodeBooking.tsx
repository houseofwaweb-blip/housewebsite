'use client';

import { useId, useState, type FormEvent } from 'react';
import {
  buildBookingUrl,
  isCovered,
  isValidPostcode,
  normalisePostcode,
} from './postcode';

type Props = {
  /** Question above the field. Serif, per the House register. */
  heading?: string;
  /** Optional supporting line under the heading. */
  hint?: string;
  /** Button label. */
  cta?: string;
  /**
   * ServiceOS OBF service id. Omit for a service-agnostic box — the visitor
   * then picks the service inside the booking form.
   *
   * Note: hidden services (visible = No in ServiceOS) do NOT appear in the
   * form's own service picker, so they can only be reached by passing an id.
   */
  serviceId?: number;
  /** Page the booking form should open on. Defaults to the site root. */
  path?: string;
  className?: string;
};

type Status =
  | { kind: 'idle' }
  | { kind: 'invalid' }
  | { kind: 'uncovered'; postcode: string };

export default function PostcodeBooking({
  heading = 'Where are we cleaning?',
  hint,
  cta = 'Check availability',
  serviceId,
  path = '/',
  className = '',
}: Props) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [submitting, setSubmitting] = useState(false);
  const fieldId = useId();
  const messageId = `${fieldId}-message`;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const postcode = normalisePostcode(value);

    if (!isValidPostcode(postcode)) {
      setStatus({ kind: 'invalid' });
      return;
    }
    if (!isCovered(postcode)) {
      setStatus({ kind: 'uncovered', postcode });
      return;
    }

    // Full navigation is deliberate — see README. The booking script has
    // already initialised by the time anyone types here, so it will only pick
    // the postcode up from a fresh page load.
    setSubmitting(true);
    setStatus({ kind: 'idle' });
    window.location.assign(buildBookingUrl(postcode, serviceId, path));
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <h2 className="font-display text-[27px] leading-[1.27] md:text-[33px] text-house-brown">
        {heading}
      </h2>

      {hint ? (
        <p className="mt-3 font-sans text-[18px] leading-[1.5] text-house-stone">
          {hint}
        </p>
      ) : null}

      <label className="sr-only" htmlFor={fieldId}>
        Postcode
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          id={fieldId}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (status.kind !== 'idle') setStatus({ kind: 'idle' });
          }}
          placeholder="BR8 8AU"
          autoComplete="postal-code"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          maxLength={8}
          aria-invalid={status.kind === 'invalid'}
          aria-describedby={status.kind === 'idle' ? undefined : messageId}
          className="w-full flex-1 border bg-house-white border-house-brown/15 px-4 py-3.5
                     font-sans text-[18px] text-house-brown
                     placeholder:font-sans placeholder:text-house-brown/35
                     outline-none focus:border-house-gold
                     focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-house-brown"
        />

        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 border border-house-ink bg-house-ink px-5 py-4 cursor-pointer
                     font-sans text-[14px] tracking-[0.18em] uppercase text-house-cream
                     transition-[transform,filter,opacity] duration-[var(--t-base)]
                     motion-safe:hover:-translate-y-px hover:brightness-125
                     disabled:opacity-60 disabled:cursor-default
                     focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-house-brown"
        >
          {submitting ? 'One moment…' : cta}
        </button>
      </div>

      {status.kind !== 'idle' ? (
        <p
          id={messageId}
          role="alert"
          className="mt-3 font-sans text-[17px] leading-[1.5] text-house-brown"
        >
          {status.kind === 'invalid' ? (
            <>Please enter a full UK postcode, for example BR8 8AU.</>
          ) : (
            <>
              We don&rsquo;t cover {status.postcode} yet.{' '}
              <a
                href="/contact"
                className="text-house-brown underline decoration-house-gold
                           underline-offset-4 hover:decoration-dotted"
              >
                Tell us where you are
              </a>{' '}
              and we&rsquo;ll be in touch when we reach you.
            </>
          )}
        </p>
      ) : null}
    </form>
  );
}
