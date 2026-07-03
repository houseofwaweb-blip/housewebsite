import { useEffect, useState } from "react";
import { useFormValue, type StringInputProps } from "sanity";

/**
 * Read-only Studio field that shows an article's live first-party view counts
 * (from Supabase, via /api/hearth/view). Purely a display — it never writes to
 * the document. The counts are deliberately NOT rendered on the public site.
 */
type Stats = { total: number; last30: number };
type State = "loading" | "error" | "no-slug" | Stats;

export function ViewCountInput(_props: StringInputProps) {
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!slug) {
      setState("no-slug");
      return;
    }
    let active = true;
    setState("loading");
    fetch(`/api/hearth/view?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Stats) => {
        if (active) setState({ total: d.total ?? 0, last30: d.last30 ?? 0 });
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const box: React.CSSProperties = {
    display: "flex",
    gap: 24,
    padding: "12px 16px",
    border: "1px solid var(--card-border-color, #e3e4e8)",
    borderRadius: 6,
    background: "var(--card-muted-bg-color, #f6f6f8)",
  };
  const num: React.CSSProperties = { fontSize: 22, fontWeight: 600, lineHeight: 1.1 };
  const label: React.CSSProperties = { fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6, marginTop: 2 };
  const note: React.CSSProperties = { fontSize: 12, opacity: 0.6, padding: "8px 0" };

  if (state === "no-slug") return <div style={note}>Save the article (with a slug) to see view counts.</div>;
  if (state === "loading") return <div style={note}>Loading view counts…</div>;
  if (state === "error") return <div style={note}>View counts unavailable right now.</div>;

  return (
    <div>
      <div style={box}>
        <div>
          <div style={num}>{state.last30.toLocaleString("en-GB")}</div>
          <div style={label}>Last 30 days</div>
        </div>
        <div>
          <div style={num}>{state.total.toLocaleString("en-GB")}</div>
          <div style={label}>All time</div>
        </div>
      </div>
      <div style={note}>First-party views. Not shown on the public site.</div>
    </div>
  );
}
