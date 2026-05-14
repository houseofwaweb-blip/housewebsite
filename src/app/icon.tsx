import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser-tab favicon. Cream square with serif "W" in house brown.
 * Next.js resolves this to /favicon.ico automatically for older browsers
 * and to /icon at size 32 for modern ones.
 *
 * Placeholder until proper brand assets land (see Phase B5 in
 * post-audit-todos-2026-05-14.md).
 */
export default function Icon() {
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
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
        }}
      >
        W
      </div>
    ),
    size,
  );
}
