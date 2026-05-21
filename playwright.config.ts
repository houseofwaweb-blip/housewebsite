import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — smoke crawl only.
 *
 * Spins the Next.js dev server on port 4000 and runs the smoke suite
 * against it. Keep this minimal: any test that needs Sanity / Shopify /
 * Supabase real responses belongs in a heavier integration tier, not here.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:4000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Run smoke against the production build. Dev server can't keep up with
  // parallel route compilation and produces ERR_ABORTED failures that are
  // dev-only artefacts, not real regressions.
  //
  // Run `npm run build` BEFORE `npx playwright test` — the prebuilt .next/
  // directory makes `npm run start` boot in ~5s instead of 60s.
  webServer: {
    command: "npm run start",
    url: "http://localhost:4000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
