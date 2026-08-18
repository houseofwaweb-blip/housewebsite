"use client";

import { useState } from "react";

/**
 * FilmThumb — a YouTube poster image with graceful fallback.
 *
 * maxresdefault.jpg (1280x720) does not exist for every video: older uploads,
 * shorts and lower-resolution sources never get one, so it 404s and the tile
 * shows an empty placeholder. We step down to sddefault, then hqdefault, both
 * of which YouTube generates for every video. A plain <img> (not next/image)
 * so onError can retry the next resolution. The 4:3 fallbacks carry letterbox
 * bars, but the parent's aspect-video + object-cover crop them away.
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
        `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
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
