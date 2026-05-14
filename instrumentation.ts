/**
 * Server / edge instrumentation hook. Next.js calls register() exactly once
 * at server boot, before any request is handled.
 *
 * We use this to load Sentry's Node + Edge SDKs. Dynamic imports so the
 * heavy Sentry code isn't pulled into the bundle when the DSN isn't set
 * (dev/preview without a Sentry account).
 *
 * Pairs with `instrumentation-client.ts` for browser init.
 */

export async function register() {
  if (!process.env.SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: process.env.SENTRY_RELEASE,
      environment: process.env.VERCEL_ENV ?? "development",
      tracesSampleRate: process.env.VERCEL_ENV === "production" ? 0.1 : 1.0,
      // Don't capture the spammy 404s from bot scans.
      ignoreErrors: [/^NEXT_NOT_FOUND$/],
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: process.env.SENTRY_RELEASE,
      environment: process.env.VERCEL_ENV ?? "development",
      tracesSampleRate: process.env.VERCEL_ENV === "production" ? 0.1 : 1.0,
    });
  }
}

/**
 * Next 15+ hook for forwarding nested request errors (React Server
 * Component errors, server action throws) to Sentry. Without this,
 * RSC errors only surface as console output.
 */
export async function onRequestError(
  err: unknown,
  request: Request | { path: string; method: string; headers: Record<string, string> },
  context: { routerKind: string; routePath: string; routeType: string },
) {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  // captureRequestError is the official forwarder — handles request shape
  // normalisation and de-dups against Sentry's own auto-capture.
  // @ts-expect-error — captureRequestError shape varies by SDK minor version.
  Sentry.captureRequestError(err, request, context);
}
