import type { Metadata, Viewport } from "next";
import { didot, effra, cormorant, jost } from "@/lib/fonts";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { getNavigation, getFooterColumns } from "@/lib/cms/navigation";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/commerce/CartContext";
import { CartToast } from "@/components/commerce/CartToast";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { AnalyticsLoader } from "@/components/consent/AnalyticsLoader";
import { SpeedInsightsLoader } from "@/components/consent/SpeedInsightsLoader";
import { GoogleTagSetup } from "@/components/consent/GoogleTagSetup";
import { GaClickEvents } from "@/components/analytics/GaClickEvents";
import { MicrosoftClarity } from "@/components/consent/loaders/MicrosoftClarity";
import { MetaPixel } from "@/components/consent/loaders/MetaPixel";
import { PinterestTag } from "@/components/consent/loaders/PinterestTag";
import { Klaviyo } from "@/components/consent/loaders/Klaviyo";
import { ClickIdCapture } from "@/components/marketing/ClickIdCapture";
import "./globals.css";

// Aug 2026 eComm/Insurance refocus — the House pares down to the Marketplace,
// Insurance, The Hearth and Cinema, with links out to the service businesses.
// The header CTA is the commerce front door.
const ctaLabel = "Shop";
const ctaHref = "/shop";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "House of Willow Alexander",
    template: "%s | House of Willow Alexander",
  },
  description:
    "A modern British home institution: home insurance, a curated marketplace, editorial journal and film, and the Willow Alexander home-service businesses.",
  applicationName: "House of Willow Alexander",
  authors: [{ name: "House of Willow Alexander" }],
  creator: "House of Willow Alexander",
  publisher: "House of Willow Alexander",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: "House of Willow Alexander",
    title: "House of Willow Alexander",
    description:
      "A modern British institution for effortless intelligent living.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@howahouse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  manifest: "/site.webmanifest",
  // Favicon / touch icons come from the file conventions in src/app/
  // (favicon.ico, icon.png, apple-icon.png) — Next generates the <link> tags
  // automatically, so no manual `icons` block is needed (it would only
  // duplicate them). The gold house-leaf badge is the single source of truth.
};

// Explicit viewport: Next 16 derives a sensible default, but stating it
// removes ambiguity in Search Console and prevents accidental no-zoom
// configs from creeping in.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f3ede1",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [nav, footerCols] = await Promise.all([
    getNavigation(),
    getFooterColumns(),
  ]);
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${didot.variable} ${effra.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <head>
        {/*
         * Google Consent Mode v2 default state.
         * MUST execute synchronously, before any other Google tag loads,
         * so that gtag.js initialises with consent already denied. Using
         * a raw <script> rather than next/script to guarantee inline
         * synchronous execution in the head.
         *
         * security_storage is the only category granted by default —
         * CSRF + session cookies are essential. wait_for_update tells
         * Google tags to hold beacons for up to 500ms while the user's
         * consent decision is read from our wa-consent cookie + propagated
         * via gtag('consent', 'update'). After 500ms, Google sends
         * cookieless pings for conversion modelling regardless.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        <ConsentProvider>
          <CartProvider buyable={env.SHOP_BUYABLE}>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Header ctaLabel={ctaLabel} ctaHref={ctaHref} nav={nav} />
            <main id="main">{children}</main>
            <Footer columns={footerCols} />
            {/* Spacer so the fixed mobile action bar never covers footer content. */}
            <div aria-hidden className="lg:hidden h-[64px]" />
            <MobileActionBar />
            <CartToast />
            <CartDrawer />
            <CookieBanner />
            <AnalyticsLoader />
            <SpeedInsightsLoader />
            <GoogleTagSetup />
            <GaClickEvents />
            <MicrosoftClarity />
            <MetaPixel />
            <PinterestTag />
            <Klaviyo />
            <ClickIdCapture />
          </CartProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
