import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest config. Keep this minimal — the suite is for catching regressions
 * in the form pipeline, CMS helpers, and rate-limit logic. Heavy E2E lives
 * under tests/e2e (Playwright); this config does not see those.
 *
 * Env: happy-dom is faster than jsdom and supports everything we touch.
 * Resolution: vite-tsconfig-paths honours the @/* alias from tsconfig.json.
 */
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/unit/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**", "src/components/forms/**"],
      exclude: ["**/*.test.ts", "**/*.spec.ts", "**/types.ts"],
    },
  },
});
