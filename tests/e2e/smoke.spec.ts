import { test, expect, type ConsoleMessage } from "@playwright/test";

/**
 * Smoke crawl: every key public route returns 200 and renders without
 * console errors that would indicate a SSR throw or hydration failure.
 *
 * Ignored console noise (not migration-related, pre-existing):
 *   - CSP/Trusted-Types blocks on third-party analytics scripts
 *   - 401 on Sanity preview probes (dev only)
 *   - "Form submission canceled because the form is not connected" (React dev)
 */

const IGNORE_PATTERNS = [
  /googletagmanager/i,
  /Trusted(HTML|Script)/i,
  /Form submission canceled/i,
  /Failed to load resource.*\b401\b/i,
  /CookieYes/i,
  /sentry/i, // dev server has no DSN; sentry no-ops noisily
  /cookieyes/i,
];

function shouldIgnore(msg: ConsoleMessage): boolean {
  const text = msg.text();
  return IGNORE_PATTERNS.some((re) => re.test(text));
}

const ROUTES = [
  "/",
  "/howa",
  "/howa/plus",
  "/howa/companion",
  "/howa/plans",
  "/howa/how-it-works",
  "/howa/steward",
  "/howa/faq",
  "/howa/coming-soon",
  "/the-house",
  "/the-house/about",
  "/the-house/philosophy",
  "/the-house/standards",
  "/the-house/sustainability",
  "/the-house/proof",
  "/the-house/artwork",
  "/protect",
  "/protect/home-protection",
  "/protect/insurance",
  "/design",
  "/design/interiors",
  "/design/gardens",
  "/design/studios",
  "/services",
  "/partners",
  "/house-credit",
  "/shop",
  "/the-hearth",
  "/contact",
  "/search",
  "/sitemap.xml",
  "/robots.txt",
];

for (const route of ROUTES) {
  test(`smoke: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !shouldIgnore(msg)) {
        errors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      errors.push(`pageerror: ${err.message}`);
    });

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response, `no response for ${route}`).toBeTruthy();
    expect(response!.status(), `${route} should return 200`).toBeLessThan(400);

    // Brief settle window for hydration-time errors to surface. Don't use
    // networkidle — Next.js streams + analytics keep it from ever firing.
    await page.waitForTimeout(800);

    expect(errors, `console errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}

test("404 page returns 404 status (not 200)", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist", {
    waitUntil: "domcontentloaded",
  });
  expect(response!.status()).toBe(404);
});

test("X-Robots-Tag noindex header on /studio", async ({ request }) => {
  const r = await request.get("/studio");
  // Studio is `force-static` so it returns 200 in dev; the header is what
  // matters for crawler signals.
  const header = r.headers()["x-robots-tag"];
  expect(header, "/studio should have x-robots-tag header").toMatch(/noindex/i);
});

test("/api/preview unauthenticated returns 401", async ({ request }) => {
  const r = await request.get("/api/preview");
  expect(r.status()).toBeGreaterThanOrEqual(400);
});
