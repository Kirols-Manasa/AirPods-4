import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import LinesScroll from "@/LinesScroll";
import GridOverlay from "@/GridOverlay";
import Header from "@/layout/Header/Header";
import Footer from "@/sections/footer/footer";
import CustomScrollbar from "@/CustomScrollbar";
import { IntroProvider } from "@/context/IntroContext";
import IntroShell from "@/IntroShell";
import type { Metadata } from "next";

// ============================
// Metadata
// ============================
export const metadata: Metadata = {
  metadataBase: new URL("https://airpods-4.vercel.app"),

  verification: {
    google: "6gbMHsyf9v0uC5eznZfuwomHsuDLYWiTj8nMCK6-GAE",
  },

  title: {
    default: "AirPods 4 — Iconic. Now Supersonic.",
    template: "%s | AirPods 4",
  },

  description:
    "AirPods 4 with the Apple H2 chip. Experience Personalized Spatial Audio, Adaptive EQ, and theater-like sound — redesigned for the way you listen.",

  keywords: [
    "AirPods 4",
    "wireless earbuds",
    "Apple H2 chip",
    "spatial audio",
    "noise cancellation",
    "best earbuds 2026",
  ],

  icons: {
    icon: "/images/favicon.ico",
  },

  openGraph: {
    title: "AirPods 4 — Iconic. Now Supersonic.",
    description:
      "AirPods 4 with the Apple H2 chip. Experience Personalized Spatial Audio, Adaptive EQ, and theater-like sound — redesigned for the way you listen.",
    url: "https://airpods-4.vercel.app",
    siteName: "AirPods 4",
    images: [
      {
        url: "/images/meta.webp",
        width: 1200,
        height: 630,
        alt: "AirPods 4",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AirPods 4 — Iconic. Now Supersonic.",
    description:
      "AirPods 4 with the Apple H2 chip. Experience Personalized Spatial Audio, Adaptive EQ, and theater-like sound — redesigned for the way you listen.",
    images: ["/images/meta.webp"],
    creator: "@airpods",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  themeColor: "#ffffff",

  authors: [{ name: "Kirols" }],

  // ← جديد: Canonical URL
  alternates: {
    canonical: "https://airpods-4.vercel.app",
  },

  // ← جديد: Viewport optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  // ← جديد: Apple specific
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

// ============================
// Font
// ============================
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ← جديد: Product schema structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AirPods 4",
    description:
      "AirPods 4 with the Apple H2 chip. Experience Personalized Spatial Audio, Adaptive EQ, and theater-like sound.",
    image: "https://airpods-4.vercel.app/images/meta.webp",
    brand: {
      "@type": "Brand",
      name: "Apple",
    },
    offers: {
      "@type": "Offer",
      price: "129",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1500",
    },
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* ← جديد: Product schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        {/* ← جديد: Preconnect لـ Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* ← جديد: DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className={inter.className}>
        <IntroProvider>
          <IntroShell />
          <CustomScrollbar />
          <LinesScroll>
            <Header />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <GridOverlay />
          </LinesScroll>
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}