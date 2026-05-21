"use client";

import Script from "next/script";
import { useConsentGranted } from "../ConsentProvider";

// Meta (Facebook/Instagram) Pixel. Gated on the `marketing` category —
// this is an advertising / retargeting pixel, not first-party measurement,
// so it sits behind the marketing toggle (which is off by default).
// We do NOT load the pixel without explicit opt-in, which is stricter
// than Meta's own Limited Data Use mode and keeps us inside UK/EU rules.
//
// PageView fires on mount; SPA route changes are handled by the layout
// wiring (see `usePathname` listener) when a use case arises.
export function MetaPixel() {
  const granted = useConsentGranted("marketing");
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!granted || !id) return null;
  return (
    <>
      <Script id="fb-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- 1×1 tracking pixel; next/image would defeat the noscript fallback */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
