"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * Route-segment error boundary. Shown when a server component throws.
 * Sibling: global-error.tsx handles errors that escape the root layout.
 *
 * The reset() prop re-renders the segment, useful for transient errors.
 * digest is the Next-assigned error fingerprint we can quote to support.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: "route-segment" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <section className="bg-house-cream text-house-brown px-[5vw] py-[16vh] min-h-[70vh] flex items-center">
      <div className="max-w-[720px] mx-auto w-full text-center">
        <Eyebrow>500 · Something is amiss</Eyebrow>
        <h1 className="em-accent font-display font-medium text-[clamp(48px,7vw,96px)] leading-[1.02] tracking-[-0.01em] mt-6">
          A draught has <em>blown out</em> the candle.
        </h1>
        <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[52ch] mx-auto">
          The House met an error rendering that page. Try again, or take
          another route. If it keeps happening,{" "}
          <Link
            href="/contact"
            className="text-house-brown underline decoration-house-gold underline-offset-4"
          >
            write to the House
          </Link>
          {error.digest ? ` and quote reference ${error.digest}` : ""}.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-block font-sans text-[14px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline cursor-pointer transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Try again
          </button>
          <GhostLink href="/">Back to the House</GhostLink>
        </div>
      </div>
    </section>
  );
}
