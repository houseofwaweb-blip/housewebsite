import Image from "next/image";
import Link from "next/link";

/**
 * AppStoreBadges — store badges for the HoWA product showcase.
 *
 * Google Play: the official "Pre-register on Google Play" badge (the app is
 * pre-launch). Apple: a standard "Download on the App Store" lockup (Apple has
 * no pre-register badge). Both link to /howa/coming-soon until launch — swap the
 * hrefs for the real store / pre-registration links when live.
 */
export function AppStoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        href="/howa/coming-soon"
        aria-label="Pre-register for HoWA on Google Play"
        className="block no-underline transition-opacity hover:opacity-85"
      >
        <Image
          src="/brand/google-play-prereg.png"
          alt="Pre-register on Google Play"
          width={270}
          height={80}
          className="h-[44px] w-auto"
        />
      </Link>
      <Link
        href="/howa/coming-soon"
        aria-label="HoWA on the App Store"
        className="block no-underline transition-opacity hover:opacity-85"
      >
        <AppleBadge />
      </Link>
    </div>
  );
}

const FONT = "var(--font-sans), Helvetica, Arial, sans-serif";

/** Standard black "Download on the App Store" lockup. */
function AppleBadge() {
  return (
    <svg viewBox="0 0 120 40" className="h-[44px] w-auto" role="img" aria-label="Download on the App Store" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="119" height="39" rx="6.5" fill="#000" stroke="#A6A6A6" strokeWidth="1" />
      <path
        transform="translate(11,8.5) scale(0.95)"
        fill="#fff"
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      />
      <text x="40" y="16" fill="#fff" fontFamily={FONT} fontSize="7" letterSpacing="0.01em">Download on the</text>
      <text x="40" y="31" fill="#fff" fontFamily={FONT} fontSize="16" fontWeight="600" letterSpacing="-0.02em">App Store</text>
    </svg>
  );
}
