import localFont from "next/font/local";
import { Cormorant_Garamond, Jost } from "next/font/google";

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
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/**
 * Jost — the Hearth magazine sans. Small-caps labels, bylines, utility.
 */
export const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});
