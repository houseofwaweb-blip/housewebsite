import { ImageResponse } from "next/og";

export const alt = "House of HoWA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG card for social shares. Cream background, gold-rule eyebrow,
 * Cormorant-style serif headline, sans tagline. Matches the lander
 * framework's heroEy + heroTitle pattern.
 *
 * Pages that override this (e.g. /the-hearth/[slug], /shop/[handle])
 * supply their own opengraph-image. Placeholder typography uses system
 * fonts until the brand font is loaded into the OG renderer (Phase B5).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3ede1",
          color: "#30231c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "sans-serif",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(48, 35, 28, 0.65)",
            marginBottom: 40,
          }}
        >
          <span style={{ width: 36, height: 2, background: "#c2a660" }} />
          House of HoWA
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 96,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            maxWidth: 980,
          }}
        >
          <span>A house, properly&nbsp;</span>
          <span style={{ fontStyle: "italic", color: "rgba(48, 35, 28, 0.85)" }}>
            kept.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 24,
            lineHeight: 1.5,
            color: "rgba(48, 35, 28, 0.7)",
            marginTop: 32,
            maxWidth: 800,
          }}
        >
          Design, care, protection, and curated commerce. The intelligence
          layer for the modern household.
        </div>
      </div>
    ),
    size,
  );
}
