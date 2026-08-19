"use client";

import { useState } from "react";

/**
 * FilmThumb — a YouTube poster image with graceful fallback.
 *
 * Thumbnails render at ~300-400px, so we lead with sddefault.jpg (640x480,
 * ~40KB) instead of maxresdefault.jpg (1280x720, up to ~1.3MB) — a large
 * bandwidth saving across a full grid of tiles, with no visible quality loss at
 * this size. sddefault + hqdefault are both generated for every video (unlike
 * maxres, which older uploads and shorts never get). A plain <img> (not
 * next/image) so onError can retry the next resolution. The 4:3 sources carry
 * letterbox bars, but the parent's aspect-video + object-cover crop them away.
 */
export function FilmThumb({
  youtubeId,
  poster,
  alt,
  className = "",
}: {
  youtubeId: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const chain = poster
    ? [poster]
    : [
        `https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      ];
  const [i, setI] = useState(0);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={chain[i]}
      alt={alt}
      loading="lazy"
      onError={() => setI((n) => (n < chain.length - 1 ? n + 1 : n))}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
