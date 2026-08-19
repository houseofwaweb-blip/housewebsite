"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "plyr/dist/plyr.css";

/**
 * CinemaFeatured — the ambient, muted, looping film at the top of /cinema. It
 * autoplays as a backdrop; clicking it opens the film's own page and resumes
 * playback from roughly where the ambient loop had got to (passed as ?t=).
 */
export function CinemaFeatured({
  youtubeId,
  slug,
  title,
  category,
}: {
  youtubeId: string;
  slug: string;
  title: string;
  category: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const playerRef = useRef<{ currentTime?: number; destroy: () => void } | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const Plyr = (await import("plyr")).default;
      if (cancelled || !ref.current) return;
      const p = new Plyr(ref.current, {
        controls: [],
        clickToPlay: false,
        keyboard: { focused: false, global: false },
        muted: true,
        autoplay: true,
        loop: { active: true },
        iconUrl: "/plyr.svg",
        youtube: { noCookie: true, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, cc_load_policy: 0, disablekb: 1 },
      });
      p.muted = true;
      // Prefetch the detail route so the click feels instant.
      router.prefetch(`/cinema/${slug}`);
      playerRef.current = p as unknown as { currentTime?: number; destroy: () => void };
    })();
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [youtubeId, slug, router]);

  const open = () => {
    const t = Math.floor(playerRef.current?.currentTime ?? 0);
    router.push(`/cinema/${slug}${t > 1 ? `?t=${t}` : ""}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`Watch ${title}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden border border-house-brown/12 bg-house-black no-underline"
    >
      {/* Ambient player sits behind the overlay and ignores pointer events so the
          whole tile acts as one click target. */}
      <div className="pointer-events-none absolute inset-0 [&_.plyr]:h-full [&_.plyr]:w-full [&_iframe]:h-full [&_iframe]:w-full">
        <div ref={ref} data-plyr-provider="youtube" data-plyr-embed-id={youtubeId} />
      </div>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(15,12,9,0.85), rgba(15,12,9,0.05) 55%, rgba(15,12,9,0.25))" }}
      />
      <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,4vw,48px)]">
        <span className="inline-flex items-center gap-2.5 font-sans text-[14px] tracking-[0.22em] uppercase text-house-cream">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-house-cream/70 text-[13px]">▶</span>
          Watch · {category}
        </span>
        <span className="mt-3 block max-w-[24ch] font-display text-[clamp(29px,3.6vw,53px)] leading-[1.05] text-house-cream">
          {title}
        </span>
      </span>
    </div>
  );
}
