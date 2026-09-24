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
      className="font-sans text-[18px] text-house-cream/90 hover:text-house-cream transition-colors duration-[var(--t-base)] bg-transparent border-0 cursor-pointer underline decoration-house-gold underline-offset-4 hover:decoration-house-gold-light p-0"
    >
      Cookie preferences
    </button>
  );
}
