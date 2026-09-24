"use client";

import { useConsent } from "./ConsentProvider";

/**
 * Footer trigger that re-opens the preferences modal after a user has
 * already made a choice. Required by ICO guidance: users must be able to
 * change their mind as easily as they made the original choice.
 */
export function CookiePreferencesLink() {
  const { openPreferences } = useConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="font-sans text-[13.5px] text-house-brown/70 hover:text-house-brown transition-colors duration-[var(--t-base)] bg-transparent border-0 cursor-pointer no-underline p-0"
    >
      Cookie preferences
    </button>
  );
}
