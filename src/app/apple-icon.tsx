import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Cream square, serif "W" in house brown,
 * gold rule beneath in the lander-framework style.
 *
 * Placeholder until proper brand assets land (Phase B5).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3ede1",
          color: "#30231c",
          fontFamily: "serif",
          fontWeight: 500,
          fontSize: 132,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
          position: "relative",
        }}
      >
        <span style={{ lineHeight: 1, marginBottom: 8 }}>W</span>
        <span
          style={{
            width: 36,
            height: 2,
            background: "#c2a660",
          }}
        />
      </div>
    ),
    size,
  );
}
