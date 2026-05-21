/**
 * Rate-limit tests. The thing this catches: an Upstash outage in production
 * accidentally degrading to "allow everything" instead of "fail closed".
 *
 * The contract is asymmetric on purpose:
 *   - Form submissions: fail CLOSED in prod (security > availability for writes).
 *   - Search:          fail OPEN always (read-only, network blip shouldn't 500).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock the env so we control UPSTASH presence per test.
const envMock = { UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: "" };
vi.mock("@/lib/env", () => ({ env: envMock }));

// Mock Upstash so we don't make network calls.
const limitMock = vi.fn();
vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    static slidingWindow = vi.fn(() => "sw");
    limit = limitMock;
  },
}));
vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor() {}
  },
}));

// Each test imports fresh to bust the singleton module cache.
async function importFresh() {
  vi.resetModules();
  return await import("@/lib/rate-limit");
}

beforeEach(() => {
  envMock.UPSTASH_REDIS_REST_URL = "";
  envMock.UPSTASH_REDIS_REST_TOKEN = "";
  limitMock.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("checkFormRateLimit — no credentials", () => {
  it("fails CLOSED in production (security > availability for writes)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { checkFormRateLimit } = await importFresh();
    const r = await checkFormRateLimit("test-key");
    expect(r.ok).toBe(false);
    expect(r.remaining).toBe(0);
  });

  it("fails OPEN in dev (so local development isn't blocked)", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { checkFormRateLimit } = await importFresh();
    const r = await checkFormRateLimit("test-key");
    expect(r.ok).toBe(true);
    expect(r.remaining).toBeGreaterThan(0);
  });
});

describe("checkFormRateLimit — with credentials", () => {
  beforeEach(() => {
    envMock.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    envMock.UPSTASH_REDIS_REST_TOKEN = "tok";
  });

  it("passes through limiter result when allowed", async () => {
    limitMock.mockResolvedValueOnce({ success: true, remaining: 4, reset: 12345 });
    const { checkFormRateLimit } = await importFresh();
    const r = await checkFormRateLimit("test");
    expect(r).toEqual({ ok: true, remaining: 4, reset: 12345 });
  });

  it("passes through limiter rejection when over limit", async () => {
    limitMock.mockResolvedValueOnce({ success: false, remaining: 0, reset: 99999 });
    const { checkFormRateLimit } = await importFresh();
    const r = await checkFormRateLimit("test");
    expect(r.ok).toBe(false);
  });
});

describe("checkSearchRateLimit", () => {
  it("fails OPEN with no credentials (always)", async () => {
    const { checkSearchRateLimit } = await importFresh();
    const r = await checkSearchRateLimit("test");
    expect(r.ok).toBe(true);
  });

  it("fails OPEN on transport error (read-only endpoint shouldn't 500)", async () => {
    envMock.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    envMock.UPSTASH_REDIS_REST_TOKEN = "tok";
    limitMock.mockRejectedValueOnce(new Error("network blip"));
    const { checkSearchRateLimit } = await importFresh();
    const r = await checkSearchRateLimit("test");
    expect(r.ok).toBe(true);
  });

  it("blocks when over limit", async () => {
    envMock.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    envMock.UPSTASH_REDIS_REST_TOKEN = "tok";
    limitMock.mockResolvedValueOnce({ success: false, remaining: 0, reset: 0 });
    const { checkSearchRateLimit } = await importFresh();
    const r = await checkSearchRateLimit("test");
    expect(r.ok).toBe(false);
  });
});
