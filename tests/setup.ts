import "@testing-library/jest-dom/vitest";

/**
 * Vitest global setup. Runs once before every test file.
 *
 * Server-only modules import `import "server-only"` which throws when
 * imported in a non-server context. Vitest runs in a Node env, so the
 * throw is actually OK — but the package short-circuits to a runtime
 * error message. We stub it to a no-op so server modules can be tested
 * in isolation without spinning up a Next.js server.
 */
import { vi } from "vitest";

vi.mock("server-only", () => ({}));
