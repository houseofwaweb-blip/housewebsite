import localFont from "next/font/local";

/**
 * Didot — the House display face (Linotype Didot).
 * Regular (400) + Italic extracted from the Linotype Didot .ttc; Bold (700)
 * from DidotLTPro-Bold. So headings can now be a lighter Regular with real
 * italics, and reserve the Bold cut for emphasis (weight 700).
 *   - 400 / 500  -> Didot Regular  (+ real Didot Italic for `font-style: italic`)
 *   - 700        -> DidotLTPro Bold
 *
 * Licence confirmation pending (PLAN.md §10 Open Loop #3) — all cuts are
 * Linotype Didot; confirm the webfont licence covers the Regular/Italic too.
 */
export const didot = localFont({
  src: [
    { path: "../../../public/fonts/Didot-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Didot-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../../public/fonts/Didot-Regular.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/Didot-Italic.woff2", weight: "500", style: "italic" },
    { path: "../../../public/fonts/DidotLTPro-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/DidotLTPro-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-didot",
  display: "swap",
  preload: true,
});

/**
 * Effra Std Regular — the HoWA sans, body face throughout the main site.
 */
export const effra = localFont({
  src: [
    {
      path: "../../../public/fonts/effra_std_rg-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/effra_std_rg-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Effra-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-effra",
  display: "swap",
  preload: true,
});

/**
 * Cormorant Garamond — the Hearth magazine serif.
 * Used only inside the /journal tree. The Hearth is a product of the House
 * with its own typography, per approved variant-A.
 */
// Self-hosted (next/font/local) rather than next/font/google: Turbopack's
// Google-font loader intermittently fails on Vercel when the build cache is
// restored across a tooling change. These are the Google Fonts latin variable
// woff2 files, downloaded into public/fonts, so the build never depends on the
// next/font/google module. Normal + italic variable faces cover 400-700.
export const cormorant = localFont({
  src: [
    { path: "../../../public/fonts/cormorant.woff2", weight: "400 700", style: "normal" },
    { path: "../../../public/fonts/cormorant-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

/**
 * Jost — the Hearth magazine sans. Small-caps labels, bylines, utility.
 */
// Self-hosted variable Jost (latin), covering weights 200-500. See cormorant.
export const jost = localFont({
  src: [{ path: "../../../public/fonts/jost.woff2", weight: "200 500", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

// Petit Formal Script removed (audit #23 — fewer font families). The
// "For homes that do good." signature now uses Didot italic (Cormorant stand-in)
// via the .font-script class in globals.css.
