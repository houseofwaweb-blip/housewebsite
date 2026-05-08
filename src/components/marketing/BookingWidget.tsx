"use client";

import { useEffect } from "react";

/**
 * Embed the ServiceOS Online Booking Form (OBF) as it currently runs on
 * willowalexander.co.uk via the WP plugin.
 *
 *   1. Set `window.obfOptions` with the same config the WP plugin emits
 *   2. Inject the OBF client script from accounts.willowalexander.co.uk
 *
 * Mount this once at the root layout. The OBF widget binds itself to
 * any link with `href="#open-booking-form"` (matches the live WP site
 * pattern) — clicking opens the booking flow in a modal panel.
 *
 * Credentials / theme — sourced from the live WP config (Tools → SOS OBF):
 *   - APP URL:     https://accounts.willowalexander.co.uk/
 *   - API URL:     https://willowalexander.serviceos.com/
 *   - Profile ID:  4
 *   - Country:     UK
 *   - Phone:       0800 047 8738
 *   - Primary:     #c2a660 (HoWA gold)
 *   - Secondary:   #0f3e33 (HoWA navy)
 *   - Logo:        /brand/howa/howa-black.svg (served from this site)
 */

const OBF_CONFIG = {
  app_url: "https://accounts.willowalexander.co.uk/",
  api_url: "https://willowalexander.serviceos.com/",
  accounts_url: "https://accounts.willowalexander.co.uk/",
  country: "UK",
  hide_phone: false,
  free_quote: false,
  search: false,
  // Public Vercel URL so the widget (loaded from accounts.willowalexander.co.uk)
  // can fetch the logo cross-origin. Fallback to a stable absolute URL.
  logo_url: "https://housewebsite.vercel.app/brand/howa/howa-black.svg",
  init_event: "on_load",
  website_name: "Willow Alexander",
  key: "9xtc467tfmzdsjj1s1bg50vkmktkdhd9xknslxub3gyex0zls9ttwll14i3hdq9a",
  profile_id: "4",
  source_abbr: "GORG",
  main_url: "https://housewebsite.vercel.app/",
  theme: {
    "primary-color": "#c2a660",
    "primary-color-light": "",
    "primary-color-lighter": "",
    "primary-color-dark": "",
    "primary-color-darker": "",
    "secondary-color": "#0f3e33",
    "secondary-color-light": "",
    "secondary-color-lighter": "",
    "secondary-color-dark": "",
    "secondary-color-darker": "",
    "loader-outside-circle": "#c2a660",
    "loader-middle-circle": "#0f3e33",
    "loader-inside-circle": "#ffffff",
  },
};

declare global {
  interface Window {
    obfOptions?: typeof OBF_CONFIG;
    __obfLoaded?: boolean;
  }
}

export function BookingWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__obfLoaded) return;
    window.__obfLoaded = true;
    window.obfOptions = OBF_CONFIG;

    const script = document.createElement("script");
    script.id = "obfAbClient";
    // Path matches the live WP plugin: /obf/client/client.min.js
    script.src =
      "https://accounts.willowalexander.co.uk/obf/client/client.min.js?v=" +
      Math.floor(Date.now() / 3_600_000);
    script.async = true;
    script.dataset.queryParamsTemplate = "true";
    document.body.appendChild(script);
  }, []);

  // The widget injects its own DOM. No visible markup needed — clicks on
  // any `href="#open-booking-form"` anchor open the modal.
  return null;
}
