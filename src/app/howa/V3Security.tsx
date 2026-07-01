/* Security & privacy — placed right after the address reveal, where the data
   question arises. Navy register (askhowa handover). No images, no em dashes. */
export function V3Security() {
  const points = [
    { t: "UK data residency", b: "Stored in the UK, encrypted at rest and in transit." },
    { t: "You own it", b: "Export or delete everything, any time. It's yours, not ours." },
    { t: "Never sold, never trained on", b: "We don't sell your data or use it to train models." },
    { t: "Every access logged", b: "You choose what's shared, with whom, and each access is recorded." },
  ];
  return (
    <section id="security" className="relative overflow-hidden text-[#f3ede0] scroll-mt-20" style={{ background: "#1d2a40" }}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
        <div>
          <p className="smallcaps mb-4 flex items-center gap-2 text-[12px] tracking-[0.18em] text-[#f3ede0]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c5a960]" /> Security &amp; privacy
          </p>
          <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.08] text-[#f3ede0]">
            Your record is yours. <span className="font-italic-display text-[#c5a960]">Full stop.</span>
          </h2>
          <p className="mt-4 max-w-[400px] text-[16.5px] leading-[1.55] text-[#f3ede0]/80">
            Owning a home means trusting someone with a lot. We built HoWA so trust is never the risky part.
          </p>
          <p className="mt-6 font-mono text-[12px] tracking-[0.08em] text-[#f3ede0]/45">
            AES-256 AT REST · TLS 1.3 IN TRANSIT · UK-ONLY · SOC2 ON THE ROADMAP
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-[#c5a960]/15 sm:grid-cols-2">
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
      </div>
    </section>
  );
}

function LockGlyph() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5a960" strokeWidth="1.6" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>;
}
