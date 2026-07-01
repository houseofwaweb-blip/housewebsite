"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────────────
   /v6 — playable demo phone. A mock of the HoWA app styled to match the
   dashboard in the how-it-works photo. Visitors set up their home, scan
   rooms, restyle a room (before → after), upload documents (which raise
   the home-health score) and book a service. Entirely client-side.
   ────────────────────────────────────────────────────────────────────── */

type Tab = "home" | "scan" | "design" | "docs" | "health";

const HOUSE_TYPES = ["Terraced", "Semi-detached", "Detached", "Period townhouse", "Flat"];

const SCANS = [
  { id: "living", label: "Living room", img: "/home-v4/samples/living-before.webp", found: ["Smoke alarm · tested OK", "Radiator · bleed before winter"], add: 7 },
  { id: "dining", label: "Dining room", img: "/home-v4/samples/dining-before.webp", found: ["Sash windows · re-seal recommended", "No damp detected"], add: 6 },
  { id: "hallway", label: "Hallway", img: "/home-v4/samples/hallway-before.webp", found: ["Loose stair spindle · re-fix", "Smoke alarm · tested OK"], add: 5 },
  { id: "garden", label: "Garden", img: "/home-v4/samples/lawn-before.webp", found: ["Hedges · trim in spring", "Patio · power-wash due"], add: 4 },
];

const SUBJECTS = [
  { id: "living", label: "Living room", kind: "room" },
  { id: "dining", label: "Dining room", kind: "room" },
  { id: "hallway", label: "Hallway", kind: "room" },
  { id: "lawn", label: "Lawn", kind: "garden" },
  { id: "beds", label: "Flower beds", kind: "garden" },
  { id: "patio", label: "Back garden", kind: "garden" },
] as const;
type Subject = (typeof SUBJECTS)[number];

const ROOM_STYLES = [
  { key: "heritage", label: "Heritage English" },
  { key: "minimalist", label: "Modern minimalist" },
  { key: "scandinavian", label: "Scandinavian" },
];
const GARDEN_STYLES = [
  { key: "cottage", label: "English cottage" },
  { key: "formal", label: "Formal parterre" },
  { key: "tropical", label: "Tropical" },
];

const INITIAL_DOCS = [
  { name: "Boiler manual.pdf", meta: "Heating" },
  { name: "Buildings insurance.pdf", meta: "Cover" },
];
const ADDABLE_DOCS = [
  { name: "Gas safety certificate.pdf", meta: "Safety" },
  { name: "EPC certificate.pdf", meta: "Energy" },
  { name: "Window warranty.pdf", meta: "Joinery" },
  { name: "Boiler service receipt.pdf", meta: "Heating" },
  { name: "Damp survey.pdf", meta: "Structure" },
];

const PROS = [
  { name: "C. Whittaker & Sons", trade: "Gas Safe engineer", rating: "4.9", dist: "1.4 mi" },
  { name: "Bramble Heating", trade: "Heating specialist", rating: "4.8", dist: "2.2 mi" },
  { name: "Coppice Maintenance", trade: "Property care", rating: "4.7", dist: "0.8 mi" },
];
const SLOTS = ["Tue · 9–11am", "Wed · 1–3pm", "Fri · 8–10am"];

const HEALTH = [
  { label: "Structure", v: 95 },
  { label: "Damp & air", v: 88 },
  { label: "Security", v: 100 },
  { label: "Heating", v: 84 },
  { label: "Garden", v: 79 },
];

export function V6DemoPhone({ saveCta = false }: { saveCta?: boolean } = {}) {
  const [tab, setTab] = useState<Tab>("home");
  const [setupDone, setSetupDone] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [htype, setHtype] = useState("");

  const [score, setScore] = useState(74);
  const [items, setItems] = useState(1248);
  const [bump, setBump] = useState(0); // transient "+n" feedback

  // scan
  const [scanning, setScanning] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<{ label: string; lines: string[] }[]>([]);

  // design
  const [dSubject, setDSubject] = useState<Subject | null>(null);
  const [dStyle, setDStyle] = useState<{ key: string; label: string } | null>(null);
  const [dStep, setDStep] = useState<"subjects" | "choose" | "styling" | "after">("subjects");
  const [showBefore, setShowBefore] = useState(false);
  const [designCount, setDesignCount] = useState(0);

  // docs
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [addable, setAddable] = useState(ADDABLE_DOCS);

  // actions + booking
  const [done, setDone] = useState<Record<string, boolean>>({ boiler: false, gutters: false });
  const [booking, setBooking] = useState<{ key: string; service: string; step: "pros" | "slot" | "done"; pro?: string; slot?: string } | null>(null);
  const [upcoming, setUpcoming] = useState([
    { label: "Window cleaner", meta: "Fri" },
    { label: "Insurance renewal", meta: "12 days" },
    { label: "Gas safety check", meta: "Mar" },
  ]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  function later(fn: () => void, ms: number) { timers.current.push(setTimeout(fn, ms)); }
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function raise(by: number) {
    setScore((s) => Math.min(98, s + by));
    setBump(by);
    later(() => setBump(0), 1900);
  }

  function runScan(s: (typeof SCANS)[number]) {
    if (scanning) return;
    setScanning(s.id);
    later(() => {
      setScanResults((r) => [{ label: s.label, lines: s.found }, ...r].slice(0, 4));
      setItems((n) => n + s.add);
      setScanning(null);
    }, 1300);
  }

  function addDoc(doc: { name: string; meta: string }) {
    setDocs((d) => [doc, ...d]);
    setAddable((a) => a.filter((x) => x.name !== doc.name));
    setItems((n) => n + 1);
    raise(3);
  }

  function pickSubject(s: Subject) { setDSubject(s); setDStyle(null); setShowBefore(false); setDStep("choose"); }
  function pickStyle(st: { key: string; label: string }) {
    setDStyle(st); setDStep("styling");
    later(() => { setDStep("after"); setShowBefore(false); setItems((n) => n + 1); setDesignCount((n) => n + 1); }, 1400);
  }

  function confirmBooking(slot: string) {
    setBooking((b) => (b ? { ...b, slot, step: "done" } : b));
  }
  function finishBooking() {
    if (!booking) return;
    setDone((d) => ({ ...d, [booking.key]: true }));
    setUpcoming((u) => [{ label: booking.service, meta: (booking.slot || "Booked").split(" ")[0] }, ...u]);
    raise(5);
    setBooking(null);
  }

  return (
    <section id="demo" className="bg-[#f4f1e9] pt-2 pb-16 lg:pb-20 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        <div className="text-center max-w-[600px] mx-auto mb-9">
          <p className="smallcaps text-[15px] tracking-[0.18em] text-[color:var(--color-gold-deep)] mb-3">Try it yourself</p>
          <h2 className="font-display text-[clamp(27px,2.6vw,40px)] leading-[1.05]">
            Take a look around.
            <span className="font-italic-display text-[#c5a960]"> Tap anything.</span>
          </h2>
          <p className="mt-3 text-[16px] leading-[1.55] text-[color:var(--color-ink-soft)]">
            Set up your home, scan a room, restyle a space, add a document or book a service. Nothing you tap is saved.
          </p>
        </div>

        <div className="mx-auto w-[348px] max-w-full">
          <div className="relative rounded-[48px] bg-gradient-to-b from-[#26262a] via-[#141416] to-[#08080a] p-[14px] shadow-[0_48px_96px_-32px_rgba(30,22,8,0.62)] ring-1 ring-black/40">
            <div className="relative h-[680px] overflow-hidden rounded-[38px] bg-[#f5efe2] text-[#1d2a40] ring-1 ring-black/20">
              <div className="absolute left-1/2 top-[13px] z-30 h-[27px] w-[110px] -translate-x-1/2 rounded-[14px] bg-black shadow-[inset_0_-1px_2px_rgba(255,255,255,0.08)]" />

              {!setupDone ? (
                <SetupScreen postcode={postcode} setPostcode={setPostcode} htype={htype} setHtype={setHtype} onDone={() => { setSetupDone(true); setTab("home"); }} />
              ) : (
                <div className="flex h-full flex-col">
                  <div className="flex-1 overflow-y-auto px-5 pt-10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {tab === "home" && <HomeScreen score={score} items={items} done={done} postcode={postcode} htype={htype} upcoming={upcoming} go={setTab} book={(key, service) => setBooking({ key, service, step: "pros" })} />}
                    {tab === "scan" && <ScanScreen scanning={scanning} results={scanResults} runScan={runScan} />}
                    {tab === "design" && <DesignScreen subject={dSubject} style={dStyle} step={dStep} count={designCount} showBefore={showBefore} setShowBefore={setShowBefore} pickSubject={pickSubject} pickStyle={pickStyle} reset={() => { setDStep("subjects"); setDSubject(null); setDStyle(null); }} />}
                    {tab === "docs" && <DocsScreen docs={docs} addable={addable} addDoc={addDoc} />}
                    {tab === "health" && <HealthScreen score={score} />}
                  </div>
                  {saveCta && (
                    <a
                      href={postcode.trim() ? `/howa/coming-soon?postcode=${encodeURIComponent(postcode.trim())}` : "/howa/coming-soon"}
                      className="mx-3 mb-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#1f3a2b] py-2.5 text-[15px] font-medium text-white shadow-[0_8px_20px_-10px_rgba(31,58,43,0.6)] transition-colors hover:bg-[#15291e]"
                    >
                      Save this record{postcode.trim() ? ` · ${postcode.trim().toUpperCase()}` : ""} <span aria-hidden>→</span>
                    </a>
                  )}
                  <Nav tab={tab} setTab={setTab} />
                </div>
              )}

              {/* score-rise toast */}
              {bump > 0 && (
                <div className="pointer-events-none absolute bottom-[80px] left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#1d2a40] px-3.5 py-1.5 text-[15px] text-[#f3ede0] shadow-lg">
                  Home health +{bump}
                </div>
              )}

              {/* booking overlay */}
              {booking && <BookingSheet booking={booking} pickPro={(pro) => setBooking({ ...booking, pro, step: "slot" })} confirm={confirmBooking} finish={finishBooking} close={() => setBooking(null)} />}
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[15px] tracking-[0.02em] text-[color:var(--color-ink-soft)]/65">A live preview of the HoWA record. No account needed.</p>
        </div>
      </div>
    </section>
  );
}

/* ── setup ───────────────────────────────────────────────────────────── */
function SetupScreen({ postcode, setPostcode, htype, setHtype, onDone }: { postcode: string; setPostcode: (v: string) => void; htype: string; setHtype: (v: string) => void; onDone: () => void }) {
  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-12 text-center">
      <div className="flex flex-1 flex-col">
        <p className="font-display text-[16px] text-[color:var(--color-gold-deep)]">HoWA</p>
        <h3 className="mt-5 font-display text-[25px] leading-tight">Set up your home</h3>
        <p className="mx-auto mt-2 max-w-[230px] text-[15px] leading-[1.5] text-[color:var(--color-ink-soft)]">
          HoWA links everything to your address, not your phone. Pop in a postcode to begin.
        </p>

        <div className="mt-6 text-left">
          <label className="text-[15px] uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]/70">Postcode</label>
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="SW1A 1AA"
            className="mt-1.5 w-full rounded-xl border border-[color:var(--color-gold)]/30 bg-white/70 px-4 py-3 text-[16px] text-[#1d2a40] outline-none placeholder:text-[color:var(--color-ink-soft)]/40 focus:border-[#5f6a49]"
          />
          <label className="mt-4 block text-[15px] uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]/70">House type</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {HOUSE_TYPES.map((t) => (
              <button key={t} onClick={() => setHtype(t)} className={"rounded-full border px-3 py-1.5 text-[15px] transition-colors " + (htype === t ? "border-[#5f6a49] bg-[#5f6a49] text-white" : "border-[color:var(--color-gold)]/30 bg-white/55 text-[color:var(--color-ink)] hover:bg-white")}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={onDone} disabled={!postcode.trim()} className="w-full rounded-full bg-[#5f6a49] py-3.5 text-[16px] font-medium text-white transition-colors enabled:hover:bg-[#515b3e] disabled:opacity-40">
        Get started →
      </button>
      <button onClick={onDone} className="mt-2 text-[15px] text-[color:var(--color-ink-soft)]/70 hover:text-[color:var(--color-ink)]">Skip for now</button>
    </div>
  );
}

/* ── home ────────────────────────────────────────────────────────────── */
function HomeScreen({ score, items, done, postcode, htype, upcoming, go, book }: { score: number; items: number; done: Record<string, boolean>; postcode: string; htype: string; upcoming: { label: string; meta: string }[]; go: (t: Tab) => void; book: (key: string, service: string) => void }) {
  const addr = [htype || "Your home", postcode].filter(Boolean).join(" · ");
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] leading-none text-[color:var(--color-ink-soft)]/65">{addr}</p>
          <p className="font-display text-[23px] leading-tight">Home Overview</p>
        </div>
        <span className="mt-0.5 font-display text-[16px] text-[color:var(--color-gold-deep)]">HoWA</span>
      </div>

      <button onClick={() => go("health")} className="mt-4 flex w-full items-center gap-4 rounded-xl border border-[color:var(--color-gold)]/20 bg-white/75 p-4 text-left transition-colors hover:bg-white">
        <Ring value={score} size={74} />
        <div className="flex-1 space-y-2">
          <MetricRow label="Structure" val="Good" />
          <MetricRow label="Damp & air" val="52%" />
          <MetricRow label="Security" val="Armed" />
        </div>
      </button>

      <div className="mt-3 flex gap-2 text-center">
        <Stat n="14" l="Rooms" />
        <Stat n={items.toLocaleString()} l="Items" />
        <Stat n="3" l="Tasks due" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={() => go("scan")} className="flex items-center gap-2 rounded-xl bg-[#5f6a49] px-3.5 py-3 text-[15px] text-white transition-colors hover:bg-[#515b3e]"><CameraIcon /> Scan a room</button>
        <button onClick={() => go("design")} className="flex items-center gap-2 rounded-xl border border-[color:var(--color-gold)]/35 bg-white/60 px-3.5 py-3 text-[15px] text-[#1d2a40] transition-colors hover:bg-white"><SparkleIcon /> Restyle</button>
      </div>

      <p className="mb-2 mt-5 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Next actions</p>
      <div className="space-y-2.5">
        <ActionRow label="Service boiler" cta="Book" done={done.boiler} doneText="Booked" onClick={() => book("boiler", "Boiler service")} />
        <ActionRow label="Clean gutters" cta="Schedule" done={done.gutters} doneText="Scheduled" onClick={() => book("gutters", "Gutter clean")} />
        <ActionRow label="Smoke alarms" cta="" done doneText="Done" onClick={() => {}} />
      </div>

      <p className="mb-2 mt-5 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Upcoming</p>
      <div className="space-y-2 pb-1">
        {upcoming.map((u, i) => (
          <UpRow key={u.label + i} label={u.label} meta={u.meta} />
        ))}
      </div>
    </div>
  );
}

/* ── scan ────────────────────────────────────────────────────────────── */
function ScanScreen({ scanning, results, runScan }: { scanning: string | null; results: { label: string; lines: string[] }[]; runScan: (s: (typeof SCANS)[number]) => void }) {
  return (
    <div>
      <p className="font-display text-[23px] leading-tight">Scan your home</p>
      <p className="mt-1 text-[15px] text-[color:var(--color-ink-soft)]/75">Choose a photo to scan. HoWA finds what needs attention and adds it to your record.</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {SCANS.map((s) => {
          const busy = scanning === s.id;
          return (
            <button key={s.id} onClick={() => runScan(s)} disabled={!!scanning} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--color-gold)]/20 text-left disabled:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.label} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-1.5 text-[15px] font-medium text-white">{s.label}</span>
              {busy && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[1px]">
                  <span className="scan-sweep absolute inset-x-0 h-[2px] bg-[#c5a960] shadow-[0_0_8px_2px_rgba(197,169,96,0.7)]" />
                  <span className="text-[15px] font-medium text-white">Scanning…</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {results.length > 0 && (
        <>
          <p className="mb-2 mt-5 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Found</p>
          <div className="space-y-2 pb-1">
            {results.map((r, i) => (
              <div key={i} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white/75 p-3">
                <p className="text-[15px] font-medium text-[#1d2a40]">{r.label}</p>
                <ul className="mt-1 space-y-1">
                  {r.lines.map((l) => (<li key={l} className="flex items-center gap-2 text-[15px] text-[color:var(--color-ink-soft)]"><Tick /> {l}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── design (before → after) ─────────────────────────────────────────── */
function DesignScreen({ subject, style, step, count, showBefore, setShowBefore, pickSubject, pickStyle, reset }: { subject: Subject | null; style: { key: string; label: string } | null; step: "subjects" | "choose" | "styling" | "after"; count: number; showBefore: boolean; setShowBefore: (v: boolean) => void; pickSubject: (s: Subject) => void; pickStyle: (st: { key: string; label: string }) => void; reset: () => void }) {
  if (step === "subjects" || !subject) {
    if (count >= 3) return <DesignLocked />;
    return (
      <div>
        <p className="font-display text-[23px] leading-tight">Restyle a space</p>
        <p className="mt-1 text-[15px] text-[color:var(--color-ink-soft)]/75">Pick a photo, choose a look, and see it transformed.</p>
        <p className="mt-1.5 text-[15px] font-medium text-[color:var(--color-gold-deep)]">{3 - count} free restyle{3 - count === 1 ? "" : "s"} left</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5 pb-1">
          {SUBJECTS.map((s) => (
            <button key={s.id} onClick={() => pickSubject(s)} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--color-gold)]/20 text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/home-v4/samples/${s.id}-before.webp`} alt={s.label} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2.5 py-1.5 text-[15px] font-medium text-white">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const styles = subject.kind === "room" ? ROOM_STYLES : GARDEN_STYLES;
  const before = `/home-v4/samples/${subject.id}-before.webp`;
  const after = style ? `/home-v4/samples/${subject.id}-${style.key}.webp` : before;

  return (
    <div>
      <button onClick={reset} className="mb-2 inline-flex items-center gap-1 text-[15px] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">‹ Photos</button>
      <p className="font-display text-[21px] leading-tight">{subject.label}</p>

      <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-xl border border-[color:var(--color-gold)]/20 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={step === "after" && !showBefore ? after : before} alt={subject.label} className="absolute inset-0 h-full w-full object-cover" />
        {step === "styling" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white">
            <span className="scan-sweep absolute inset-x-0 h-[2px] bg-[#c5a960] shadow-[0_0_10px_2px_rgba(197,169,96,0.8)]" />
            <Spinner />
            <span className="mt-2 text-[15px]">Restyling in {style?.label}…</span>
          </div>
        )}
        {step === "after" && (
          <button onClick={() => setShowBefore(!showBefore)} className="absolute right-2 top-2 rounded-full bg-black/55 px-3 py-1 text-[15px] text-white backdrop-blur-sm">
            {showBefore ? "Show after" : "Show before"}
          </button>
        )}
        {step === "after" && (
          <span className="absolute left-2 top-2 rounded-full bg-[#5f6a49] px-2.5 py-0.5 text-[12px] text-white">{showBefore ? "Before" : style?.label}</span>
        )}
      </div>

      {step !== "after" ? (
        <>
          <p className="mb-2 mt-4 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Choose a style</p>
          <div className="space-y-2 pb-1">
            {styles.map((st) => (
              <button key={st.key} disabled={step === "styling"} onClick={() => pickStyle(st)} className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-gold)]/20 bg-white/70 px-3.5 py-3 text-left text-[15px] text-[#1d2a40] transition-colors enabled:hover:bg-white disabled:opacity-50">
                {st.label} <span aria-hidden className="text-[color:var(--color-gold-deep)]">→</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-2 pb-1">
          <p className="text-[15px] text-[color:var(--color-ink-soft)]">Saved to your home record. Estimated next steps added to tasks.</p>
          <div className="flex gap-2">
            <button onClick={reset} className="flex-1 rounded-xl border border-[color:var(--color-gold)]/35 bg-white/60 py-2.5 text-[15px] text-[#1d2a40] hover:bg-white">Try another</button>
            <button onClick={reset} className="flex-1 rounded-xl bg-[#5f6a49] py-2.5 text-[15px] text-white hover:bg-[#515b3e]">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DesignLocked() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5f6a49]/12 text-[#5f6a49]"><LockIcon /></span>
      <p className="mt-4 font-display text-[22px] leading-tight">That&apos;s your 3 free restyles</p>
      <p className="mt-2 max-w-[250px] text-[15px] leading-[1.5] text-[color:var(--color-ink-soft)]">Create a free HoWA account to keep restyling rooms and gardens, and save them to your home.</p>
      <a href="/waitlist" className="mt-6 rounded-full bg-[#5f6a49] px-8 py-3 text-[16px] text-white transition-colors hover:bg-[#515b3e]">Create an account →</a>
      <p className="mt-3 text-[15px] text-[color:var(--color-ink-soft)]/60">Free to join · no card needed</p>
    </div>
  );
}

/* ── docs ────────────────────────────────────────────────────────────── */
function DocsScreen({ docs, addable, addDoc }: { docs: { name: string; meta: string }[]; addable: { name: string; meta: string }[]; addDoc: (d: { name: string; meta: string }) => void }) {
  return (
    <div>
      <p className="font-display text-[23px] leading-tight">Documents</p>
      <p className="mt-1 text-[15px] text-[color:var(--color-ink-soft)]/75">Pick a document to add to your record. Each one raises your home-health score.</p>

      {addable.length > 0 ? (
        <>
          <p className="mb-2 mt-4 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Add to your record</p>
          <div className="space-y-2">
            {addable.map((d) => (
              <button key={d.name} onClick={() => addDoc(d)} className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[color:var(--color-gold)]/45 bg-white/40 p-3 text-left transition-colors hover:bg-white/75">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#5f6a49]/8 text-[#5f6a49]"><DocIcon /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] text-[#1d2a40]">{d.name}</p>
                  <p className="text-[15px] text-[color:var(--color-ink-soft)]/65">{d.meta} · +3 score</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#5f6a49] px-3 py-1 text-[15px] text-white">Add</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-xl border border-[color:var(--color-gold)]/20 bg-white/55 px-4 py-3 text-[15px] text-[color:var(--color-ink-soft)]">Your record is complete. Every document is in.</p>
      )}

      <p className="mb-2 mt-5 text-[15px] font-medium text-[color:var(--color-ink-soft)]/85">Your documents</p>
      <div className="space-y-2 pb-1">
        {docs.map((d, i) => (
          <div key={d.name + i} className="flex items-center gap-3 rounded-xl border border-[color:var(--color-gold)]/20 bg-white/75 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#5f6a49]/10 text-[#5f6a49]"><DocIcon /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] text-[#1d2a40]">{d.name}</p>
              <p className="text-[15px] text-[color:var(--color-ink-soft)]/65">{d.meta}</p>
            </div>
            {i === 0 && docs.length > INITIAL_DOCS.length && <span className="shrink-0 rounded-full bg-[#5f6a49]/12 px-2 py-0.5 text-[12px] text-[#5f6a49]">New</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── health ──────────────────────────────────────────────────────────── */
function HealthScreen({ score }: { score: number }) {
  return (
    <div>
      <p className="font-display text-[23px] leading-tight">Home health</p>
      <p className="mt-1 text-[15px] text-[color:var(--color-ink-soft)]/75">A single score for how your home is doing. It rises as you add documents and book care.</p>
      <div className="mt-5 flex flex-col items-center">
        <Ring value={score} size={132} stroke={9} big />
        <p className="mt-2 text-[15px] text-[color:var(--color-ink-soft)]">Good shape · last checked today</p>
      </div>
      <div className="mt-6 space-y-3.5 pb-1">
        {HEALTH.map((h) => (
          <div key={h.label}>
            <div className="mb-1 flex items-center justify-between text-[15px]"><span className="text-[#1d2a40]">{h.label}</span><span className="text-[color:var(--color-ink-soft)]">{h.v}%</span></div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-gold)]/15"><div className="h-full rounded-full bg-[#5f6a49] transition-[width] duration-700" style={{ width: `${h.v}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── booking sheet ───────────────────────────────────────────────────── */
function BookingSheet({ booking, pickPro, confirm, finish, close }: { booking: { key: string; service: string; step: "pros" | "slot" | "done"; pro?: string; slot?: string }; pickPro: (pro: string) => void; confirm: (slot: string) => void; finish: () => void; close: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#f5efe2]">
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <button onClick={close} className="text-[15px] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">Cancel</button>
        <p className="text-[15px] uppercase tracking-[0.16em] text-[color:var(--color-gold-deep)]">{booking.service}</p>
        <span className="w-12" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {booking.step === "pros" && (
          <>
            <p className="font-display text-[21px] leading-tight">Choose a professional</p>
            <p className="mt-1 mb-4 text-[15px] text-[color:var(--color-ink-soft)]/75">Vetted local trades, near {`SW1A`}.</p>
            <div className="space-y-2.5">
              {PROS.map((p) => (
                <button key={p.name} onClick={() => pickPro(p.name)} className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-gold)]/20 bg-white/75 p-3.5 text-left transition-colors hover:bg-white">
                  <div>
                    <p className="text-[14.5px] text-[#1d2a40]">{p.name}</p>
                    <p className="text-[15px] text-[color:var(--color-ink-soft)]/70">{p.trade} · {p.dist}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[15px] text-[#5f6a49]"><Star /> {p.rating}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {booking.step === "slot" && (
          <>
            <p className="font-display text-[21px] leading-tight">Pick a time</p>
            <p className="mt-1 mb-4 text-[15px] text-[color:var(--color-ink-soft)]/75">{booking.pro} · earliest availability.</p>
            <div className="space-y-2.5">
              {SLOTS.map((s) => (
                <button key={s} onClick={() => confirm(s)} className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-gold)]/20 bg-white/75 px-4 py-3.5 text-left text-[14.5px] text-[#1d2a40] transition-colors hover:bg-white">
                  {s} <span aria-hidden className="text-[color:var(--color-gold-deep)]">→</span>
                </button>
              ))}
            </div>
          </>
        )}
        {booking.step === "done" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5f6a49]/12 text-[#5f6a49]"><BigTick /></span>
            <p className="mt-4 font-display text-[23px]">Booked.</p>
            <p className="mt-1.5 max-w-[240px] text-[15px] text-[color:var(--color-ink-soft)]">{booking.pro} for your {booking.service.toLowerCase()}, {booking.slot}. Added to your tasks.</p>
            <button onClick={finish} className="mt-6 rounded-full bg-[#5f6a49] px-8 py-3 text-[16px] text-white transition-colors hover:bg-[#515b3e]">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── shared ──────────────────────────────────────────────────────────── */
function Nav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "scan", label: "Scan", icon: <CameraIcon /> },
    { id: "design", label: "Design", icon: <SparkleIcon /> },
    { id: "docs", label: "Docs", icon: <DocIcon /> },
    { id: "health", label: "Health", icon: <HeartIcon /> },
  ];
  return (
    <div className="flex items-stretch justify-around border-t border-[color:var(--color-gold)]/15 bg-[#f5efe2] px-1 pb-5 pt-2.5">
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} className={"flex flex-1 flex-col items-center gap-1 py-1 transition-colors " + (active ? "text-[#5f6a49]" : "text-[color:var(--color-ink-soft)]/55")}>
            <span className={active ? "scale-110 transition-transform" : "transition-transform"}>{it.icon}</span>
            <span className="text-[12px] tracking-wide">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Ring({ value, size, stroke = 6, big }: { value: number; size: number; stroke?: number; big?: boolean }) {
  const r = (100 - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(184,153,104,0.28)" strokeWidth={stroke} />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#5f6a49" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} className="transition-[stroke-dashoffset] duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={"font-display leading-none text-[#1d2a40] " + (big ? "text-[35px]" : "text-[21px]")}>{value}%</span>
        {big && <span className="text-[15px] text-[color:var(--color-ink-soft)]">home health</span>}
      </div>
    </div>
  );
}

function MetricRow({ label, val }: { label: string; val: string }) {
  return (
    <div className="flex items-center justify-between text-[15px]">
      <span className="text-[color:var(--color-ink-soft)]">{label}</span>
      <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#5f6a49]" />{val}</span>
    </div>
  );
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex-1 rounded-lg border border-[color:var(--color-gold)]/15 bg-white/55 py-2">
      <p className="font-display text-[18px] leading-none">{n}</p>
      <p className="mt-0.5 text-[12px] leading-none text-[color:var(--color-ink-soft)]/70">{l}</p>
    </div>
  );
}
function ActionRow({ label, cta, done, doneText, onClick }: { label: string; cta: string; done: boolean; doneText: string; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[color:var(--color-gold)]/20 bg-white/80 px-3.5 py-2.5">
      <span className="text-[15px] text-[#1d2a40]">{label}</span>
      {done ? (
        <span className="flex items-center gap-1 text-[15px] text-[#5f6a49]"><Tick /> {doneText}</span>
      ) : (
        <button onClick={onClick} className="rounded-lg bg-[#5f6a49] px-3 py-1.5 text-[15px] text-white transition-colors hover:bg-[#515b3e]">{cta}</button>
      )}
    </div>
  );
}
function UpRow({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[15px] text-[#1d2a40]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]" />{label}</span>
      <span className="text-[15px] text-[color:var(--color-ink-soft)]/70">{meta}</span>
    </div>
  );
}

/* ── icons ───────────────────────────────────────────────────────────── */
const ic = "h-[18px] w-[18px]";
function HomeIcon() { return <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v8a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2z" /></svg>; }
function CameraIcon({ small }: { small?: boolean }) { return <svg viewBox="0 0 24 24" className={small ? "h-3.5 w-3.5" : ic} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><circle cx="12" cy="12.5" r="3.2" /></svg>; }
function SparkleIcon() { return <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M18 15l.7 1.8 1.8.7-1.8.7L18 20l-.7-1.8-1.8-.7 1.8-.7z" /></svg>; }
function DocIcon() { return <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></svg>; }
function HeartIcon() { return <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0112 7a3.5 3.5 0 017 3.5C19 15.5 12 20 12 20z" /></svg>; }
function LockIcon() { return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>; }
function Tick() { return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="#5f6a49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>; }
function BigTick() { return <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>; }
function Star() { return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.4 1.4 6.6L12 17.3 6 20l1.4-6.6L2.5 9l6.6-.7z" /></svg>; }
function Spinner() { return <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3a9 9 0 109 9" /></svg>; }
