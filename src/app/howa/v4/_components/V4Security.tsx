/* STEP 14 — security & consent, sharpened per the brief: keep the strong
   trust section, and connect it to consent, audit trails and partner/device
   data. Calm proof, not fear. (Brief v2, slide 19.) */
export function V4Security() {
  const points = [
    { t: "UK data residency", b: "Stored in the UK, encrypted at rest and in transit." },
    { t: "You own it", b: "Export or delete everything, any time. It's yours, not ours." },
    { t: "Never sold, never trained on", b: "We don't sell your data or use it to train models." },
    { t: "Every access logged", b: "Each access to your record is recorded, and you choose what's shared." },
    { t: "Consent for every flow", b: "Every partner or device data flow requires your consent first." },
    { t: "Every source correctable", b: "Every auto-filled fact can be checked and corrected by you." },
  ];
  return (
    <section id="security" className="relative overflow-hidden text-[#f3ede0] scroll-mt-20" style={{ background: "#1d2a40" }}>
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 lg:py-20">
        <div className="max-w-[640px]">
          <p className="smallcaps mb-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#f3ede0]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c5a960]" /> Security &amp; privacy
          </p>
          <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.08] text-[#f3ede0]">
            Your record is yours. <span className="font-italic-display text-[#c5a960]">Full stop.</span>
          </h2>
          <p className="mt-4 max-w-[560px] text-[16.5px] leading-[1.55] text-[#f3ede0]/80">
            Every source, share and partner access is visible, consented and reversible.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-[#c5a960]/15 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div key={p.t} className="bg-[#1d2a40] p-5">
              <div className="mb-2 flex items-center gap-2">
                <LockGlyph />
                <p className="font-display text-[17px] text-[#f3ede0]">{p.t}</p>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#f3ede0]/70">{p.b}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-[#f3ede0]/45">
          AES-256 AT REST · TLS 1.3 IN TRANSIT · UK-ONLY · SOC2 ON THE ROADMAP
        </p>
      </div>
    </section>
  );
}

function LockGlyph() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5a960" strokeWidth="1.6" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
}
