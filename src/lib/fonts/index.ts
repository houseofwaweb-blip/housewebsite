import localFont from "next/font/local";
import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * Didot LT Pro — the House display face.
 * We only have the Bold cut (no italic file). Registered at 400/500/700
 * as NORMAL only. When `font-style: italic` is applied, the browser won't
 * find a matching italic face and `font-synthesis: style` (set on body in
 * globals.css) kicks in to synthesize the slant. This gives us a real
 * visible italic without a separate font file.
 *
 * Licence confirmation pending (PLAN.md §10 Open Loop #3).
 */
export const didot = localFont({
  src: [
    { path: "../../../public/fonts/DidotLTPro-Bold.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/DidotLTPro-Bold.woff", weight: "400", style: "normal" },
    { path: "../../../public/fonts/DidotLTPro-Bold.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/DidotLTPro-Bold.woff", weight: "500", style: "normal" },
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
