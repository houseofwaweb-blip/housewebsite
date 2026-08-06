"use client";

import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

/**
 * CinemaPlayer — an inline, House-branded Plyr player for a film's page. Plays a
 * YouTube-hosted film on click, with gold controls. youtube-nocookie limits
 * tracking; playback runs on YouTube's CDN (no hosting bandwidth on us).
 */
export function CinemaPlayer({ youtubeId, className = "" }: { youtubeId: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: { destroy: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const Plyr = (await import("plyr")).default;
      if (cancelled || !ref.current) return;
      player = new Plyr(ref.current, {
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
  }, [youtubeId]);

  return (
    <div className={className} style={{ ["--plyr-color-main" as string]: "var(--color-house-gold)" }}>
      <div ref={ref} data-plyr-provider="youtube" data-plyr-embed-id={youtubeId} />
    </div>
  );
}
