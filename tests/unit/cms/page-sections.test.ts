/**
 * page-sections helper tests. These cover the cms() / cmsCards() / pick()
 * helpers powering the ~25-page Sanity-with-TSX-fallback migration. Every
 * marketing page relies on these — regressions here would silently corrupt
 * content across the site.
 *
 * The sibling-field semantics are the subtle bit: when an editor sets only
 * `headline` and leaves `headlineEm` null, the em-fallback must be
 * suppressed so we don't render "Headline. headlineEm-fallback." duplicated.
 */
import { describe, it, expect, vi } from "vitest";

// page-sections imports a Sanity client that throws at construction time
// without env vars. Stub the upstream fetch module so the pure helpers
// (cms/cmsCards/pick) can be tested in isolation.
vi.mock("@/lib/cms/fetch", () => ({
  sanityFetch: vi.fn(async () => []),
}));
vi.mock("@/lib/cms/queries", () => ({
  pageSectionsQuery: "",
}));

const { cms, cmsCards, pick } = await import("@/lib/cms/page-sections");
type PageSectionContent = Awaited<ReturnType<typeof import("@/lib/cms/page-sections").getPageSections>> extends Map<string, infer V> ? V : never;

describe("cms()", () => {
  it("returns the fallback when section is undefined", () => {
    expect(cms(undefined, "headline", "default")).toBe("default");
  });

  it("returns the fallback when the field is undefined", () => {
    expect(cms({ section: "hero" }, "headline", "default")).toBe("default");
  });

  it("returns the fallback when the field is null", () => {
    expect(cms({ section: "hero", headline: null as never }, "headline", "default")).toBe("default");
  });

  it("returns the fallback when the field is empty string", () => {
    expect(cms({ section: "hero", headline: "" }, "headline", "default")).toBe("default");
  });

  it("returns the CMS value when present", () => {
    expect(cms({ section: "hero", headline: "From CMS" }, "headline", "default")).toBe("From CMS");
  });

  describe("siblingField semantics", () => {
    it("returns empty string when field empty but sibling is set (suppresses fallback)", () => {
      const result = cms(
        { section: "hero", headline: "Three ways to begin." },
        "headlineEm",
        "to begin.",
        "headline",
      );
      expect(result).toBe("");
    });

    it("still uses fallback when both field and sibling are empty", () => {
      const result = cms(
        { section: "hero" },
        "headlineEm",
        "to begin.",
        "headline",
      );
      expect(result).toBe("to begin.");
    });

    it("returns the CMS value when the field itself is set, regardless of sibling", () => {
      const result = cms(
        { section: "hero", headline: "Override", headlineEm: "custom em" },
        "headlineEm",
        "to begin.",
        "headline",
      );
      expect(result).toBe("custom em");
    });

    it("treats sibling empty string as not-set (falls back as normal)", () => {
      const result = cms(
        { section: "hero", headline: "" },
        "headlineEm",
        "to begin.",
        "headline",
      );
      expect(result).toBe("to begin.");
    });
  });
});

describe("pick()", () => {
  it("returns the value when present", () => {
    expect(pick("real", "fallback")).toBe("real");
  });
  it("returns fallback on undefined", () => {
    expect(pick(undefined, "fallback")).toBe("fallback");
  });
  it("returns fallback on null", () => {
    expect(pick(null, "fallback")).toBe("fallback");
  });
  it("returns fallback on empty string", () => {
    expect(pick("", "fallback")).toBe("fallback");
  });
  it("preserves 0 as a valid value (not falsy fallback)", () => {
    // pick uses explicit checks, so 0 should pass through.
    expect(pick(0, 99)).toBe(0);
  });
  it("preserves false as a valid value", () => {
    expect(pick(false, true)).toBe(false);
  });
});

describe("cmsCards()", () => {
  type Stat = { value: string; label: string };
  const fallback: Stat[] = [
    { value: "10%", label: "off" },
    { value: "∞", label: "entries" },
    { value: "0", label: "minimum" },
  ];
  const mapper = (c: PageSectionContent["cards"] extends (infer T)[] | undefined ? T : never, base: Stat | undefined): Stat => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  });

  it("returns the fallback array unchanged when section is undefined", () => {
    expect(cmsCards(undefined, fallback, mapper)).toEqual(fallback);
  });

  it("returns the fallback array unchanged when cards is undefined", () => {
    expect(cmsCards({ section: "stats" }, fallback, mapper)).toEqual(fallback);
  });

  it("returns the fallback array unchanged when cards is empty []", () => {
    expect(cmsCards({ section: "stats", cards: [] }, fallback, mapper)).toEqual(fallback);
  });

  it("overrides matching cards by index when CMS provides them", () => {
    const result = cmsCards(
      { section: "stats", cards: [{ value: "20%", title: "off" }] },
      fallback,
      mapper,
    );
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ value: "20%", label: "off" });
    expect(result[1]).toEqual(fallback[1]);
    expect(result[2]).toEqual(fallback[2]);
  });

  it("appends extra CMS cards beyond the fallback array length", () => {
    const result = cmsCards(
      {
        section: "stats",
        cards: [
          { value: "1", title: "a" },
          { value: "2", title: "b" },
          { value: "3", title: "c" },
          { value: "4", title: "d" }, // beyond fallback
          { value: "5", title: "e" }, // beyond fallback
        ],
      },
      fallback,
      mapper,
    );
    expect(result).toHaveLength(5);
    expect(result[3].value).toBe("4");
    expect(result[4].value).toBe("5");
  });

  it("preserves fallback fields not overridden by the CMS card", () => {
    type Card = { title: string; body: string; icon: string };
    const fb: Card[] = [{ title: "Original", body: "Original body", icon: "star" }];
    const r = cmsCards(
      { section: "x", cards: [{ title: "New" }] },
      fb,
      (c, base) => ({
        title: pick(c.title, base?.title ?? ""),
        body: pick(c.body, base?.body ?? ""),
        icon: base?.icon ?? "",
      }),
    );
    expect(r[0]).toEqual({ title: "New", body: "Original body", icon: "star" });
  });
});
