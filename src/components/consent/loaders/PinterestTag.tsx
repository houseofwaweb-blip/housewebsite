"use client";

import Script from "next/script";
import { useConsentGranted } from "../ConsentProvider";

// Pinterest Tag. Home/garden/interiors is one of Pinterest's strongest
// verticals — worth carrying even pre-paid-ads so the organic audience
// is measurable. Gated on the `marketing` category (this is an
// advertising platform tag, not first-party measurement).
export function PinterestTag() {
  const granted = useConsentGranted("marketing");
  const id = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;
  if (!granted || !id) return null;
  return (
    <>
      <Script id="pinterest-tag-init" strategy="afterInteractive">
        {`
          !function(e){if(!window.pintrk){window.pintrk=function(){
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
          var n=window.pintrk;n.queue=[],n.version="3.0";
          var t=document.createElement("script");t.async=!0,t.src=e;
          var r=document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '${id}');
          pintrk('page');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- 1×1 tracking pixel; next/image would defeat the noscript fallback */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${id}&noscript=1`}
        />
      </noscript>
    </>
  );
}
