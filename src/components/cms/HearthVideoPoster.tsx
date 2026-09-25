"use client";

import * as React from "react";
import Image from "next/image";

/**
 * HearthVideoPoster — a House-branded video facade for the article `videoEmbed`
 * block when a custom poster image is set. Shows the chosen poster with a play
 * button; the YouTube player loads (and autoplays) only on click, so nothing
 * loads from YouTube until the reader chooses to watch. The circular play button
 * is an inline SVG so it is unaffected by the global border-radius reset.
 */
export function HearthVideoPoster({
  youtubeId,
  poster,
  alt,
  caption,
}: {
  youtubeId: string;
  poster: string;
  alt: string;
  caption?: string;
}) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <figure className="my-12">
      <div className="relative mx-auto w-full max-w-[420px] aspect-[9/16] overflow-hidden rounded-sm border border-house-gold/30 bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={caption ?? "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={caption ? `Play: ${caption}` : "Play video"}
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
          >
            <Image src={poster} alt={alt} fill sizes="420px" className="object-cover" />
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center bg-black/15 transition-colors group-hover:bg-black/30"
            >
              <svg viewBox="0 0 72 72" className="h-[72px] w-[72px] drop-shadow" role="img" aria-hidden="true">
                <circle cx="36" cy="36" r="34" fill="rgba(0,0,0,0.42)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
                <path d="M29 23 L52 36 L29 49 Z" fill="#ffffff" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="font-sans text-[15px] tracking-[0.04em] text-house-brown/60 mt-3 italic text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
