import { sanityClient } from "@/lib/cms/client";

/**
 * Cinema catalog.
 *
 * PRIMARY SOURCE — Sanity "Cinema film" documents. When any exist with
 * "Show on site" ticked, they ARE the Cinema: Alex adds a YouTube link and ticks
 * the box in the Studio, and only those films show. Title/description/thumbnail
 * still auto-fill from YouTube; hashtags are stripped.
 *
 * FALLBACK (no Sanity films yet) — auto-pull every video from the House YouTube
 * channel (@HouseOfWillowAlexander), newest first, refreshed hourly. Curate that
 * mode with AUTO_PULL_FROM_CHANNEL / HIDDEN_IDS / FILM_META below, or the
 * hand-picked CURATED_FILMS list.
 */

const CHANNEL_UPLOADS_PLAYLIST = "UUWHxVjKadOJXp3zF4amTVag"; // @HouseOfWillowAlexander
const AUTO_PULL_FROM_CHANNEL = true;
const MAX_FILMS = 60; // safety cap on how many channel videos to pull

/** Videos to hide from Cinema (auto-pull mode). Paste the YouTube ID. */
const HIDDEN_IDS = new Set<string>([
  // "dQw4w9WgXcQ",
]);

type FilmMeta = {
  category?: string;
  featured?: boolean;
  orientation?: "landscape" | "portrait";
  title?: string;
  description?: string;
  slug?: string;
};

/** Per-video tweaks. Category defaults to "Film" when not set here. */
const FILM_META: Record<string, FilmMeta> = {
  ydfFognD8xM: { category: "Homes & Gardens", featured: true, slug: "talliston-house-and-gardens" },
  uPeHiJd2DCc: { category: "Interiors", slug: "inside-a-beckenham-home" },
  RVx47CNdcco: { category: "Gardens", slug: "the-world-garden-tom-hart-dyke" },
};

/**
 * The featured (top, autoplaying) film on /cinema. Paste a YouTube id to pin it
 * as the feature, whatever the source (Sanity or channel auto-pull) — it wins
 * over any `featured` flag. Set to "" to fall back to the featured flag / newest.
 * The video must appear in the Cinema (a visible Sanity film, or on the
 * @HouseOfWillowAlexander channel so the auto-pull includes it).
 */
const FEATURED_YOUTUBE_ID = "ydfFognD8xM";

/**
 * Hard fallback for the pinned feature, so it shows on /cinema the moment this
 * deploys — even before the hourly channel pull refreshes, or if the YouTube
 * API key is down (auto-pull then returns nothing). Once the channel pull
 * includes the video, the real (YouTube-sourced) entry supersedes this. The
 * slug matches FILM_META so the /cinema/[slug] URL is stable either way.
 */
const FEATURED_FALLBACK: Film = {
  slug: "talliston-house-and-gardens",
  youtubeId: FEATURED_YOUTUBE_ID,
  title: "That Feeling You Call Home | Inside Talliston House & Gardens with John Tarrow",
  // Full YouTube caption (hashtags stripped), so the feature reads correctly even
  // before the channel pull supersedes this entry.
  description: `What makes a house truly feel like home?

At Talliston House & Gardens in Great Dunmow, Essex, author John Tarrow has spent more than two decades exploring that question through one of Britain’s most extraordinary homes. What began as an ordinary three-bedroom semi-detached house became a series of immersive rooms and gardens, each shaped around a different place, period, story and feeling.

Rather than beginning with how a room should look, John began with a more personal question: how should it feel? The writing room, kitchen, dining spaces and gardens were created around imagined perfect moments, from the ideal place to write to the perfect setting for a Sunday morning breakfast.

The result is a remarkable example of interior storytelling, creative home design and the emotional relationship we have with the places we live. Talliston is filled with influences gathered through travel, memory and imagination, but beneath the extraordinary interiors is a simple idea: home should be a place you genuinely want to return to.

Read the full article, The Feeling You Call Home: Inside Talliston House & Gardens with John Tarrow:
https://www.willowalexander.co.uk/the-hearth/the-feeling-you-call-home-talliston-house-gardens

Visit Talliston House & Gardens and discover current tours and experiences:
https://www.talliston.com/`,
  category: "Homes & Gardens",
  orientation: "landscape",
  featured: true,
};

/** Guarantee the pinned feature is in the list (prepend the fallback if the
 *  source hasn't surfaced it yet), so it features and its page resolves. */
function ensureFeatured(films: Film[]): Film[] {
  if (!FEATURED_YOUTUBE_ID) return films;
  if (films.some((f) => f.youtubeId === FEATURED_YOUTUBE_ID)) return films;
  return [FEATURED_FALLBACK, ...films];
}

export type Film = {
  slug: string;
  category: string;
  youtubeId: string;
  title: string;
  description: string;
  duration?: string;
  poster?: string;
  orientation: "landscape" | "portrait";
  featured?: boolean;
};

/** Hand-picked fallback, used when AUTO_PULL_FROM_CHANNEL = false. */
const CURATED_FILMS: { youtubeId: string; title: string; description: string }[] = [
  {
    youtubeId: "uPeHiJd2DCc",
    title: "Inside a Beckenham home designed for work and family life",
    description:
      "Inside this Beckenham home, writer Katherine Slee reflects on what home really means to her - not as a style or statement, but as a space shaped around family life, work, routine and togetherness.\n\nThe garden, designed and built by Willow Alexander Gardens, continues this connection outdoors.",
  },
  {
    youtubeId: "RVx47CNdcco",
    title: "Inside the World Garden with Tom Hart Dyke",
    description:
      "Step inside The World Garden at Lullingstone Castle with Tom Hart Dyke, plant hunter, curator and creator of one of Kent's most extraordinary gardens.",
  },
];

// ───── helpers ────────────────────────────────────────────────────────────

/** The YouTube-hosted thumbnail for a video (16:9, no API needed). */
export function filmThumb(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function filmPoster(film: { poster?: string; youtubeId: string }): string {
  return film.poster ?? filmThumb(film.youtubeId);
}

/** Remove #hashtags and tidy the leftover whitespace/punctuation. */
function stripHashtags(s: string): string {
  return s
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([.,!?|·])/g, "$1")
    .replace(/[\s|·\-–—]+$/g, "")
    .trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "film";
}

type RawVideo = { youtubeId: string; title: string; description: string };

/** Pull the channel's uploads (newest first), up to `max`. {} / [] on failure. */
async function fetchChannelUploads(playlistId: string, key: string, max: number): Promise<RawVideo[]> {
  const out: RawVideo[] = [];
  let pageToken = "";
  try {
    while (out.length < max) {
      const url =
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50` +
        `&playlistId=${playlistId}${pageToken ? `&pageToken=${pageToken}` : ""}&key=${key}`;
      const res = await fetch(url, { next: { revalidate: 3600, tags: ["cinema:channel"] } });
      if (!res.ok) break;
      const data = (await res.json()) as {
        nextPageToken?: string;
        items?: { snippet?: { title?: string; description?: string; resourceId?: { videoId?: string } } }[];
      };
      for (const item of data.items ?? []) {
        const vid = item.snippet?.resourceId?.videoId;
        if (vid) out.push({ youtubeId: vid, title: item.snippet?.title ?? "", description: item.snippet?.description ?? "" });
      }
      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }
  } catch {
    /* fall through to whatever we collected */
  }
  return out.slice(0, max);
}

/** Fetch title/description for specific IDs (used for the curated fallback). */
async function fetchByIds(ids: string[], key: string): Promise<Record<string, RawVideo>> {
  if (!ids.length) return {};
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(",")}&key=${key}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return {};
    const data = (await res.json()) as { items?: { id: string; snippet?: { title?: string; description?: string } }[] };
    const out: Record<string, RawVideo> = {};
    for (const item of data.items ?? []) {
      out[item.id] = { youtubeId: item.id, title: item.snippet?.title ?? "", description: item.snippet?.description ?? "" };
    }
    return out;
  } catch {
    return {};
  }
}

// ───── public resolvers (server components only) ──────────────────────────

// ───── Sanity source (the "Show on site" tickbox) ─────────────────────────

type SanityFilmDoc = {
  youtubeUrl?: string;
  category?: string;
  featured?: boolean;
  orientation?: string;
  titleOverride?: string;
  descriptionOverride?: string;
};

/** Pull an 11-char YouTube id from a link or a bare id. */
function extractYoutubeId(input?: string): string | null {
  if (!input) return null;
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|\/shorts\/|[?&]v=|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

async function fetchSanityFilms(): Promise<SanityFilmDoc[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "cinemaFilm" && visible == true] | order(order asc, _createdAt desc){
        youtubeUrl, category, featured, orientation, titleOverride, descriptionOverride
      }`,
      {},
      // Tag + hourly revalidate so adding/featuring a film in the Studio shows on
      // /cinema: the Sanity webhook revalidates `type:cinemaFilm`, and the
      // revalidate window is a safety net. Without the tag the fetch was
      // force-cached and never refreshed on cinemaFilm changes.
      { next: { revalidate: 3600, tags: ["type:cinemaFilm"] } },
    );
  } catch {
    return [];
  }
}

async function buildFromSanity(docs: SanityFilmDoc[], key?: string): Promise<Film[]> {
  const need = docs
    .filter((d) => !d.titleOverride || !d.descriptionOverride)
    .map((d) => extractYoutubeId(d.youtubeUrl))
    .filter((x): x is string => Boolean(x));
  const meta = key && need.length ? await fetchByIds(need, key) : {};
  const seen = new Set<string>();
  const films: Film[] = [];
  for (const d of docs) {
    const id = extractYoutubeId(d.youtubeUrl);
    if (!id) continue;
    const title = stripHashtags(d.titleOverride ?? meta[id]?.title ?? "") || "Untitled film";
    // A permanent slug override (FILM_META, keyed by video id) wins over the
    // title-derived slug, so a URL stays stable even if the title changes.
    let slug = FILM_META[id]?.slug ?? slugify(title);
    while (seen.has(slug)) slug = `${slug}-${id.slice(0, 4).toLowerCase()}`;
    seen.add(slug);
    films.push({
      slug,
      youtubeId: id,
      title,
      description: stripHashtags(d.descriptionOverride ?? meta[id]?.description ?? ""),
      category: d.category || "Film",
      orientation: d.orientation === "portrait" ? "portrait" : "landscape",
      featured: d.featured === true,
    });
  }
  return films;
}

// ───── public resolvers (server components only) ──────────────────────────

export async function resolveFilms(): Promise<Film[]> {
  const key = process.env.YOUTUBE_API_KEY;

  // 1. Sanity-curated films take precedence (the "Show on site" tickbox).
  const sanityDocs = await fetchSanityFilms();
  if (sanityDocs.length) return ensureFeatured(await buildFromSanity(sanityDocs, key));

  // 2. Fallback: channel auto-pull, or the hand-picked list.
  let raw: RawVideo[];
  if (AUTO_PULL_FROM_CHANNEL && key) {
    raw = await fetchChannelUploads(CHANNEL_UPLOADS_PLAYLIST, key, MAX_FILMS);
    if (!raw.length) raw = CURATED_FILMS; // API failed → don't blank the page
  } else {
    // Curated mode: use the hand-picked list, filling any blank copy from YouTube.
    const need = CURATED_FILMS.filter((f) => !f.title || !f.description).map((f) => f.youtubeId);
    const meta = key ? await fetchByIds(need, key) : {};
    raw = CURATED_FILMS.map((f) => ({
      youtubeId: f.youtubeId,
      title: f.title || meta[f.youtubeId]?.title || "",
      description: f.description || meta[f.youtubeId]?.description || "",
    }));
  }

  const seen = new Set<string>();
  const films: Film[] = [];
  for (const r of raw) {
    if (HIDDEN_IDS.has(r.youtubeId)) continue;
    const m = FILM_META[r.youtubeId] ?? {};
    const title = stripHashtags(m.title ?? r.title) || "Untitled film";
    let slug = m.slug ?? slugify(title);
    while (seen.has(slug)) slug = `${slug}-${r.youtubeId.slice(0, 4).toLowerCase()}`;
    seen.add(slug);
    films.push({
      slug,
      youtubeId: r.youtubeId,
      title,
      description: stripHashtags(m.description ?? r.description),
      category: m.category ?? "Film",
      orientation: m.orientation ?? "landscape",
      featured: m.featured === true,
    });
  }
  return ensureFeatured(films);
}

export async function resolveFilm(slug: string): Promise<Film | undefined> {
  return (await resolveFilms()).find((f) => f.slug === slug);
}

export async function resolveFeatured(): Promise<Film> {
  const all = await resolveFilms();
  if (FEATURED_YOUTUBE_ID) {
    const pinned = all.find((f) => f.youtubeId === FEATURED_YOUTUBE_ID);
    if (pinned) return { ...pinned, featured: true };
  }
  return all.find((f) => f.featured) ?? all[0];
}
