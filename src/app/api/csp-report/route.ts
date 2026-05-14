import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CSP violation reporter.
 *
 * Browsers POST here when something violates the policy in proxy.ts.
 * Two shapes arrive:
 *   - Legacy `report-uri`: { "csp-report": { ... } }
 *   - Modern `report-to` (Reporting API): array of { type, body, ... }
 *
 * For launch we just log to Vercel — easy grep, no infra to stand up.
 * Once Sentry is wired (A7), forward there with Sentry.captureMessage
 * or use Sentry's native CSP endpoint instead.
 */

interface LegacyCspReport {
  "csp-report"?: {
    "document-uri"?: string;
    "violated-directive"?: string;
    "blocked-uri"?: string;
    "effective-directive"?: string;
    "original-policy"?: string;
    referrer?: string;
    "script-sample"?: string;
  };
}

interface ReportingApiEntry {
  type: string;
  url?: string;
  body?: {
    documentURL?: string;
    blockedURL?: string;
    effectiveDirective?: string;
    originalPolicy?: string;
    sample?: string;
    disposition?: "enforce" | "report";
  };
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  // Normalise both shapes into one line per violation.
  const reports: Array<Record<string, unknown>> = [];

  if (Array.isArray(raw)) {
    for (const entry of raw as ReportingApiEntry[]) {
      if (entry.type === "csp-violation" && entry.body) {
        reports.push({
          shape: "report-to",
          documentURL: entry.body.documentURL,
          blockedURL: entry.body.blockedURL,
          directive: entry.body.effectiveDirective,
          sample: entry.body.sample,
        });
      }
    }
  } else if (raw && typeof raw === "object" && "csp-report" in raw) {
    const r = (raw as LegacyCspReport)["csp-report"];
    if (r) {
      reports.push({
        shape: "report-uri",
        documentURL: r["document-uri"],
        blockedURL: r["blocked-uri"],
        directive: r["violated-directive"] ?? r["effective-directive"],
        sample: r["script-sample"],
      });
    }
  }

  for (const report of reports) {
    console.warn("[csp-violation]", JSON.stringify(report));
  }

  return new NextResponse(null, { status: 204 });
}
