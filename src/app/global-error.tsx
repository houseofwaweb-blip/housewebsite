"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/**
 * Root error boundary. Catches errors that escape the root layout
 * (where error.tsx can't reach). Must include <html> + <body> because
 * the layout itself didn't render.
 *
 * Kept intentionally minimal — no fonts, no CSS modules, just inline
 * styles so it works even if the global stylesheet is the thing that
 * threw. Brand voice still, just stripped down.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: "global" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          fontFamily: "Georgia, 'Times New Roman', serif",
          background: "#f3ede1",
          color: "#30231c",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vw",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 11,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(48, 35, 28, 0.72)",
              margin: 0,
            }}
          >
            500 · Something is amiss
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.05,
              margin: "24px 0 16px",
            }}
          >
            The House met an error.
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(48, 35, 28, 0.72)",
              margin: "16px auto 32px",
              maxWidth: "52ch",
            }}
          >
            Something failed at the root of the site. Try again, and if it
            persists, write to hello@willowalexander.co.uk
            {error.digest ? ` and quote reference ${error.digest}.` : "."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "#c2a660",
              color: "#fff",
              border: "1px solid #c2a660",
              padding: "14px 24px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
