"use client";

import Script from "next/script";
import { useConsentGranted } from "../ConsentProvider";

// Microsoft Clarity — free heatmaps + session replay. Gated on the
// `measurement` category (first-party UX understanding, not marketing).
// Clarity masks form input by default which keeps us inside ICO guidance.
export function MicrosoftClarity() {
  const granted = useConsentGranted("measurement");
  // Clarity project ID is public (ships in the client tag). Default to the
  // Willow Alexander project so heatmaps work on launch even without the Vercel
  // env set; NEXT_PUBLIC_CLARITY_PROJECT_ID overrides it.
  // || not ?? — an empty-string env var must still fall back to the baked ID,
  // otherwise id="" makes this render nothing and Clarity never loads.
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "teosz3tmam";
  if (!granted || !id) return null;
  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
