import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import AccessibilityMenu from "./components/AccessibilityMenu";
import CookieNotice from "./components/CookieNotice";
import GoogleAnalytics from "./components/GoogleAnalytics";
import JsonLd from "./components/JsonLd";
import { mainSiteLinks, seoConfig } from "./seo-config";
import "./globals.css";

const bodyFont = Heebo({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
});

const displayFont = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
});

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;
const bingVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.title,
    template: "%s | ALGOWAYS",
  },
  description: seoConfig.description,
  applicationName: seoConfig.siteName,
  authors: [{ name: "ALGOWAYS", url: "/about" }],
  creator: "ALGOWAYS",
  publisher: "ALGOWAYS",
  category: "Financial Technology",
  keywords: [
    "ALGOWAYS",
    "מסחר אלגוריתמי",
    "מערכות מסחר אוטומטיות",
    "רובוט מסחר",
    "פיתוח אלגו",
    "שרת VPS למסחר",
    "קורס אלגו טרייד",
    "כלים פיננסיים",
    "FinTech Israel",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "ALGOWAYS for language models" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: "/",
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "ALGOWAYS — Technology, Markets and Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: googleVerification,
    other: bingVerification
      ? {
          "msvalidate.01": [bingVerification],
        }
      : undefined,
  },
  manifest: "/manifest.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${seoConfig.siteUrl}/#organization`,
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/logos/algoways-wordmark-2026-trim.png`,
  description: seoConfig.shortDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: seoConfig.location.city,
    addressCountry: seoConfig.location.country,
  },
  areaServed: {
    "@type": "Country",
    name: "Israel",
  },
  contactPoint: {
    "@type": "ContactPoint",
    url: `${seoConfig.siteUrl}/contact`,
    contactType: "customer service",
    availableLanguage: ["he", "en"],
  },
  knowsAbout: [
    "מסחר אלגוריתמי",
    "פיתוח מערכות מסחר אוטומטיות",
    "תשתיות VPS למסחר",
    "ניתוח ביצועי מסחר",
    "לימודי אלגו טרייד",
  ],
  brand: mainSiteLinks.map((url) => ({
    "@type": "Brand",
    url,
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${seoConfig.siteUrl}/#website`,
  url: seoConfig.siteUrl,
  name: seoConfig.siteName,
  description: seoConfig.description,
  inLanguage: seoConfig.language,
  publisher: {
    "@id": `${seoConfig.siteUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="ALGOWAYS for language models"
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {children}
        <GoogleAnalytics />
        <CookieNotice />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
