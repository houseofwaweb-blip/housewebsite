"use client";

import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

/**
 * CinemaPlayer — an inline, House-branded Plyr player for a film's page. Plays a
 * YouTube-hosted film on click, with gold controls. youtube-nocookie limits
 * tracking; playback runs on YouTube's CDN (no hosting bandwidth on us).
 */
export function CinemaPlayer({
  youtubeId,
  start = 0,
  orientation = "landscape",
  className = "",
}: {
  youtubeId: string;
  /** Seconds to cue the film at (used to resume from the featured loop). */
  start?: number;
  /** "portrait" renders a 9:16 player for Shorts. */
  orientation?: "landscape" | "portrait";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: { destroy: () => void } | undefined;
    let cancelled = false;
    let capTimer: ReturnType<typeof setInterval> | undefined;
    (async () => {
      const Plyr = (await import("plyr")).default;
      if (cancelled || !ref.current) return;
      const p = new Plyr(ref.current, {
        ratio: orientation === "portrait" ? "9:16" : "16:9",
        // Self-hosted icon sprite: the CDN default is blocked by our CSP, which
        // left the controls rendering as empty gold blocks.
        iconUrl: "/plyr.svg",
        // Captions off — cc_load_policy 0 asks YouTube not to auto-load them,
        // but a viewer's "always show captions" account setting overrides it, so
        // we also unload the caption module directly (below).
        youtube: { noCookie: true, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, cc_load_policy: 0, start: start > 0 ? start : undefined },
        captions: { active: false, update: false },
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
      });

      // Force YouTube's captions off, beating the account-level "always show
      // captions" setting. Plyr exposes the underlying YT.Player as `embed`.
      // The caption module loads a beat into playback, so we (a) listen for
      // onApiChange (fires when it loads) and (b) retry for a few seconds.
      const killCaptions = () => {
        try {
          const yt = (p as unknown as {
            embed?: {
              unloadModule?: (m: string) => void;
              setOption?: (mod: string, opt: string, val: unknown) => void;
            };
          }).embed;
          if (!yt) return;
          yt.unloadModule?.("captions");
          yt.unloadModule?.("cc");
          yt.setOption?.("captions", "track", {});
          yt.setOption?.("cc", "track", {});
        } catch {
          /* noop */
        }
      };
      p.on("ready", () => {
        killCaptions();
        try {
          const yt = (p as unknown as {
            embed?: { addEventListener?: (e: string, cb: () => void) => void };
          }).embed;
          yt?.addEventListener?.("onApiChange", killCaptions);
        } catch {
          /* noop */
        }
        // Retry over the first few seconds while the module loads.
        let n = 0;
        capTimer = setInterval(() => {
          killCaptions();
          if (++n > 8) {
            clearInterval(capTimer);
            capTimer = undefined;
          }
        }, 600);
      });
      p.on("play", killCaptions);
      player = p;
    })();
    return () => {
      cancelled = true;
      if (capTimer) clearInterval(capTimer);
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [youtubeId, orientation]);

  return (
    <div
      className={className}
      style={{
        ["--plyr-color-main" as string]: "var(--color-house-gold)",
        // A 9:16 Short would be enormous at full width, so cap and centre it.
        ...(orientation === "portrait" ? { maxWidth: 440, marginInline: "auto" } : {}),
      }}
    >
      <div ref={ref} data-plyr-provider="youtube" data-plyr-embed-id={youtubeId} />
    </div>
  );
}
