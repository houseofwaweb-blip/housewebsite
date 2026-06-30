import type { Metadata, Viewport } from "next";
import { didot, effra, cormorant, jost } from "@/lib/fonts";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { Header } from "@/components/layout/Header";
import { getNavigation, getFooterColumns } from "@/lib/cms/navigation";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/commerce/CartContext";
import { CartToast } from "@/components/commerce/CartToast";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { BookingWidget } from "@/components/marketing/BookingWidget";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { AnalyticsLoader } from "@/components/consent/AnalyticsLoader";
import { SpeedInsightsLoader } from "@/components/consent/SpeedInsightsLoader";
import { GoogleTagSetup } from "@/components/consent/GoogleTagSetup";
import { MicrosoftClarity } from "@/components/consent/loaders/MicrosoftClarity";
import { MetaPixel } from "@/components/consent/loaders/MetaPixel";
import { PinterestTag } from "@/components/consent/loaders/PinterestTag";
import { Klaviyo } from "@/components/consent/loaders/Klaviyo";
import { ClickIdCapture } from "@/components/marketing/ClickIdCapture";
import "./globals.css";

// The primary header CTA is House-led (v5 HoWA-separation review, 2026-06-18):
// the House sells services, and booking opens the House booking modal
// (#open-booking-form) which is always available regardless of the HoWA app
// being live. HoWA online booking is reached from the HoWA Platform menu.
const ctaLabel = "Book through HoWA";
const ctaHref = "#open-booking-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "House of Willow Alexander",
    template: "%s | House of Willow Alexander",
  },
  description:
    "A modern British institution for effortless intelligent living. Design, care, protection, and curated commerce, connected by HoWA.",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
            <CartToast />
            <CartDrawer />
            <BookingWidget />
            <CookieBanner />
            <AnalyticsLoader />
            <SpeedInsightsLoader />
            <GoogleTagSetup />
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
