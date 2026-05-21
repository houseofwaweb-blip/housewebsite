"use client";

import Script from "next/script";

// Renders the CookieYes auto-generated cookie-disclosure table.
//
// CookieYes scans the live site monthly and populates `.cky-audit-table`
// with every cookie it finds — name, provider, purpose, duration.
//
// The CookieYes banner stays *enabled* in their dashboard because the
// legacy WP site (willowalexander.co.uk) still depends on it. On the
// new site we have our own bespoke consent banner, so we suppress the
// CookieYes banner UI via scoped CSS — only the audit table survives.
// The CookieYes consent cookie (`cookieyes-consent`) is in a different
// namespace from ours (`wa-consent`), so the two don't collide.
//
// The script is loaded ONLY on /legal/cookies (not in the root layout),
// which is the only page where the audit table needs to render.
export function CookieDisclosureTable() {
  const id = process.env.NEXT_PUBLIC_COOKIEYES_ID;
  if (!id) {
    return (
      <p className="text-sm opacity-70">
        Cookie disclosure table will appear here once CookieYes is connected.
      </p>
    );
  }
  return (
    <>
      <style
        // Hide every CookieYes banner / modal / revisit-button element,
        // but leave .cky-audit-table* visible so the cookie list renders.
        // `display: none !important` because CookieYes inlines its own
        // styles after injection and we need to win specificity.
        dangerouslySetInnerHTML={{
          __html: `
            .cky-consent-container,
            .cky-consent-bar,
            .cky-modal-open,
            .cky-modal,
            .cky-overlay,
            .cky-revisit-bottom-left,
            .cky-revisit-bottom-right,
            .cky-btn-revisit-wrapper {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `,
        }}
      />
      <Script
        id="cookieyes"
        src={`https://cdn-cookieyes.com/client_data/${id}/script.js`}
        strategy="afterInteractive"
      />
      <div className="cky-audit-table-element" />
    </>
  );
}
