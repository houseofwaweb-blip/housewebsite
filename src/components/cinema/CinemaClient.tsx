"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "plyr/dist/plyr.css";

/**
 * CinemaClient — the House screening room, powered by Plyr + YouTube.
 *
 * Films are hosted (unlisted) on YouTube for free, and Plyr skins them with a
 * House-branded player (gold controls on the dark screening room). Clicking a
 * film opens a focused modal player. `noCookie` uses youtube-nocookie.com to
 * limit tracking; the whole thing runs on YouTube's CDN, so nothing touches our
 * hosting bandwidth.
 *
 * To add a film: drop its YouTube video ID into the catalog on the page.
 */

export type Film = {
  title: string;
  category: string;
  blurb: string;
  duration: string;
  poster: string;
  youtubeId: string;
};

function PlayerModal({ film, onClose }: { film: Film; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: { destroy: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const Plyr = (await import("plyr")).default;
      if (cancelled || !ref.current) return;
      player = new Plyr(ref.current, {
        autoplay: true,
        ratio: "16:9",
        youtube: { noCookie: true, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1 },
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
      });
    })();
    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [film.youtubeId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-house-black/92 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
      style={{ ["--plyr-color-main" as string]: "var(--color-house-gold)" }}
    >
      <div className="w-full max-w-[1120px]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-house-gold-light">
            {film.category} · {film.duration}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border-0 bg-transparent font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream/80 transition-colors hover:text-house-cream"
          >
            Close ✕
          </button>
        </div>
        <div className="overflow-hidden border border-house-gold-dark/40">
          <div ref={ref} data-plyr-provider="youtube" data-plyr-embed-id={film.youtubeId} />
        </div>
        <h2 className="mt-4 font-display text-[clamp(22px,2.6vw,34px)] leading-tight text-house-cream">{film.title}</h2>
        <p className="mt-2 max-w-[70ch] font-sans text-[15px] leading-[1.6] text-house-cream/75">{film.blurb}</p>
      </div>
    </div>
  );
}

function PlayBadge({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full border border-house-cream/70 bg-house-black/40 text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold group-hover:text-house-gold ${className}`}>
      ▶
    </span>
  );
}

export function CinemaClient({ featured, films }: { featured: Film; films: Film[] }) {
  const [active, setActive] = useState<Film | null>(null);
  const open = useCallback((f: Film) => setActive(f), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {/* Featured film */}
      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[1200px]">
          <button
            type="button"
            onClick={() => open(featured)}
            className="group relative block aspect-[21/9] w-full cursor-pointer overflow-hidden border border-house-gold-dark/30 p-0"
          >
            <Image src={featured.poster} alt={featured.title} fill priority sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,9,0.9), rgba(15,12,9,0.15) 60%, rgba(15,12,9,0.35))" }} />
            <PlayBadge className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-[22px]" />
            <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,4vw,48px)] text-left">
              <span className="block font-sans text-[11px] tracking-[0.24em] uppercase text-house-gold-light">
                Featured · {featured.category} · {featured.duration}
              </span>
              <span className="mt-2 block max-w-[20ch] font-display text-[clamp(26px,3.6vw,48px)] leading-[1.05] text-house-cream">
                {featured.title}
              </span>
              <span className="mt-3 block max-w-[56ch] font-sans text-[15px] leading-[1.6] text-house-cream/80">{featured.blurb}</span>
            </span>
          </button>
        </div>
      </section>

      {/* Film grid */}
      <section className="px-[5vw] pb-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-light">More from the House</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {films.map((f) => (
              <button
                key={f.title}
                type="button"
                onClick={() => open(f)}
                className="group cursor-pointer border-0 bg-transparent p-0 text-left"
              >
                <div className="relative aspect-video w-full overflow-hidden border border-house-gold-dark/25">
                  <Image src={f.poster} alt={f.title} fill sizes="(min-width: 1024px) 31vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 bg-house-black/25 transition-colors group-hover:bg-house-black/10" />
                  <PlayBadge className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2" />
                  <span className="absolute bottom-2 right-2 bg-house-black/70 px-2 py-1 font-sans text-[11px] tracking-[0.08em] text-house-cream/90">{f.duration}</span>
                </div>
                <p className="mt-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-light/80">{f.category}</p>
                <h3 className="mt-1 font-display text-[22px] leading-tight text-house-cream">{f.title}</h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.55] text-house-cream/70">{f.blurb}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active ? <PlayerModal film={active} onClose={close} /> : null}
    </>
  );
}
