import * as React from "react";

// Static cookie disclosure table for /legal/cookies.
//
// Previously this rendered a CookieYes auto-scan table; we've removed the
// CookieYes dependency and maintain this list by hand. Keep it in sync when a
// tracker is added/removed (see consent-cookies-handover/README.md).

type Row = { name: string; provider: string; purpose: string; duration: string };

const GROUPS: { category: string; rows: Row[] }[] = [
  {
    category: "Essential — always on",
    rows: [
      { name: "wa-consent", provider: "House of HoWA", purpose: "Remembers your cookie consent choice", duration: "12 months" },
      { name: "wa_click_ids", provider: "House of HoWA", purpose: "Remembers the ad you arrived from, for attribution", duration: "90 days" },
      { name: "wa_cart_id", provider: "House of HoWA", purpose: "Keeps your shopping basket between visits", duration: "Local storage, until cleared" },
      { name: "Turnstile / cf_*", provider: "Cloudflare", purpose: "Anti-bot verification on forms", duration: "Session" },
      { name: "ServiceOS booking", provider: "ServiceOS", purpose: "Runs the booking widget when you book a service", duration: "Session" },
    ],
  },
  {
    category: "Measurement — only if you accept",
    rows: [
      { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes visitors", duration: "2 years" },
      { name: "_ga_*", provider: "Google Analytics", purpose: "Keeps session state", duration: "2 years" },
      { name: "_clck", provider: "Microsoft Clarity", purpose: "Persists the Clarity user ID", duration: "1 year" },
      { name: "_clsk", provider: "Microsoft Clarity", purpose: "Connects page views into one session", duration: "1 day" },
    ],
  },
  {
    category: "Marketing — only if you accept",
    rows: [
      { name: "_fbp", provider: "Meta (Facebook / Instagram)", purpose: "Ad delivery and measurement", duration: "3 months" },
      { name: "__kla_id", provider: "Klaviyo", purpose: "Identifies you for email flows", duration: "2 years" },
      { name: "_pin_unauth", provider: "Pinterest", purpose: "Ad measurement", duration: "1 year" },
      { name: "_gcl_au", provider: "Google Ads", purpose: "Links conversions to ad clicks", duration: "3 months" },
    ],
  },
];

const cell: React.CSSProperties = {
  padding: "12px 14px",
  borderBottom: "1px solid rgba(48,35,28,0.12)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  lineHeight: 1.5,
  color: "var(--color-house-brown)",
  textAlign: "left",
  verticalAlign: "top",
};

export function CookieDisclosureTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
        <thead>
          <tr>
            {["Cookie", "Provider", "Purpose", "Duration"].map((h) => (
              <th
                key={h}
                style={{
                  ...cell,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-house-stone)",
                  borderBottom: "1px solid var(--color-house-brown)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((g) => (
            <React.Fragment key={g.category}>
              <tr>
                <td
                  colSpan={4}
                  style={{
                    ...cell,
                    paddingTop: 22,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "var(--color-house-gold-ink)",
                    borderBottom: "none",
                  }}
                >
                  {g.category}
                </td>
              </tr>
              {g.rows.map((r) => (
                <tr key={g.category + r.name}>
                  <td style={{ ...cell, fontFamily: "monospace", whiteSpace: "nowrap" }}>{r.name}</td>
                  <td style={cell}>{r.provider}</td>
                  <td style={cell}>{r.purpose}</td>
                  <td style={{ ...cell, whiteSpace: "nowrap" }}>{r.duration}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
