import type { Metadata } from "next";
import { didot, effra, cormorant, jost } from "@/lib/fonts";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { Header } from "@/components/layout/Header";
import { getNavigation, getFooterColumns } from "@/lib/cms/navigation";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/commerce/CartContext";
import { CartToast } from "@/components/commerce/CartToast";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import "./globals.css";

// When the HoWA Product app isn't live, header CTA swaps to "Book consultation"
// and routes to the in-site consultation form rather than bouncing out.
const ctaLabel = env.HOWA_APP_LIVE ? "Start HoWA" : "Book consultation";
const ctaHref = env.HOWA_APP_LIVE
  ? env.NEXT_PUBLIC_HOWA_APP_URL ?? "/api/howa-bounce"
  : "/book-consultation";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "House of Willow Alexander",
    template: "%s — House of Willow Alexander",
  },
  description:
    "A modern British institution for effortless intelligent living. Design, care, protection, and curated commerce — connected by HoWA.",
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
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        <CartProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header ctaLabel={ctaLabel} ctaHref={ctaHref} nav={nav} />
          <main id="main">{children}</main>
          <Footer columns={footerCols} />
          <CartToast />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
