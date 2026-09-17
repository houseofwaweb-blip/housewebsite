"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * ScanPreview, the compact scan used on scan cards. It runs the same blueprint
 * scan as the tool reveals' left stage: the image greyscales under a navy wash
 * and gold survey grid while a scan line sweeps, then it resolves to colour with
 * pins and a "scanned" badge.
 *
 * `autoStart` false shows a "Start the scan" button over the image and only runs
 * on click; true runs on mount. Respects reduced-motion.
 */

type Props = {
  name: string;
  image?: string;
  alt?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  subject?: string;
  autoStart?: boolean;
  pins?: string[];
  statusScanning?: string;
  statusResolved?: string;
  /** When set, a "read the full report" button fades in once the scan resolves. */
  resolvedHref?: string;
  resolvedLabel?: string;
};

const PIN_POS = [
  { top: "24%", left: "16%" },
  { top: "60%", left: "58%" },
  { top: "40%", left: "80%" },
];

export function ScanPreview({
  name,
  image,
  alt,
  aspect = "4 / 3",
  className = "",
  priority = false,
  subject = "the home",
  autoStart = true,
  pins = [],
  statusScanning = "HoWA · scanning",
  statusResolved = "Scanned",
  resolvedHref,
  resolvedLabel = "Read the full report from your scan",
}: Props) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "resolved">(autoStart ? "scanning" : "idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "scanning") return;
    timer.current = setTimeout(() => setPhase("resolved"), 2200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phase]);

  const blueprint = phase === "scanning";
  const started = phase !== "idle";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-house-brown/12 bg-house-cream-dark ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {image ? (
        <Image
          src={image}
          alt={alt ?? `${name} scan`}
          fill
          priority={priority}
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover"
          style={{ filter: blueprint ? "grayscale(1) contrast(1.08) brightness(.95)" : "none", transition: "filter 1.3s ease" }}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(67,85,70,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(67,85,70,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <span className="font-display text-[clamp(18px,2vw,24px)] leading-tight text-house-brown/70">{name}</span>
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-house-sage">
            {blueprint ? `Scanning ${subject}` : name}
          </span>
        </div>
      )}

      {/* Navy blueprint wash */}
      <div aria-hidden className="absolute inset-0" style={{ background: "#132a3f", mixBlendMode: "multiply", opacity: blueprint ? 0.5 : 0, transition: "opacity 1.3s ease" }} />
      {/* Gold survey grid */}
      <div aria-hidden className="absolute inset-0" style={{ opacity: blueprint ? 0.4 : 0, transition: "opacity .8s ease", backgroundImage: "repeating-linear-gradient(0deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px)" }} />
      {/* Scan line */}
      {blueprint ? <div aria-hidden className="scanreveal-line" /> : null}
      <style>{`
        @keyframes howaScan { 0% { transform: translateY(-8%); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateY(108%); opacity: 0; } }
        .scanreveal-line { position: absolute; left: 0; right: 0; height: 42px; pointer-events: none; background: linear-gradient(to bottom, transparent, rgba(197,169,96,.55), transparent); animation: howaScan 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .scanreveal-line { animation: none; opacity: .4; top: 40%; } }
      `}</style>

      {/* Pins appear as it resolves */}
      {pins.slice(0, 3).map((p, i) => (
        <span
          key={p}
          className="absolute whitespace-nowrap border border-house-gold/50 bg-house-cream/95 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-house-brown"
          style={{
            ...PIN_POS[i],
            opacity: phase === "resolved" ? 1 : 0,
            transform: phase === "resolved" ? "none" : "translateY(14px)",
            transition: "opacity .7s ease, transform .7s ease",
            transitionDelay: `${i * 140}ms`,
          }}
        >
          <span className="mr-1 text-house-sage" aria-hidden>+</span>{p}
        </span>
      ))}

      {/* Status badge */}
      {started ? (
        <div
          className="absolute left-3 top-3 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.18em]"
          style={{ background: blueprint ? "#132a3f" : "var(--color-house-gold-ink)", color: blueprint ? "#c5a960" : "var(--color-house-brown)", transition: "background .5s, color .5s" }}
        >
          {blueprint ? statusScanning : statusResolved}
        </div>
      ) : null}

      {/* Read the full report, fades in once the scan resolves. */}
      {resolvedHref ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4"
          style={{
            opacity: phase === "resolved" ? 1 : 0,
            transform: phase === "resolved" ? "none" : "translateY(10px)",
            transition: "opacity .6s ease .5s, transform .6s ease .5s",
            background: "linear-gradient(to top, rgba(16,37,52,0.6), transparent)",
          }}
        >
          <Link
            href={resolvedHref}
            tabIndex={phase === "resolved" ? 0 : -1}
            aria-hidden={phase !== "resolved"}
            className="pointer-events-auto border border-house-gold-dark bg-house-gold-ink px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-house-brown no-underline shadow-[0_10px_30px_-12px_rgba(40,30,10,0.6)] transition-[filter] hover:brightness-110"
          >
            {resolvedLabel} →
          </Link>
        </div>
      ) : null}

      {/* Start-the-scan button. */}
      {!started && (
        <button
          type="button"
          onClick={() => setPhase("scanning")}
          className="group absolute inset-0 z-20 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          aria-label={`Start the ${name} scan`}
        >
          <span className="flex items-center gap-2 border border-house-gold-dark bg-house-gold-ink px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-house-brown shadow-[0_10px_30px_-12px_rgba(40,30,10,0.6)] transition-[filter] group-hover:brightness-110">
            <span aria-hidden className="inline-block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-house-brown" />
            Start the scan
          </span>
        </button>
      )}
    </div>
  );
}
