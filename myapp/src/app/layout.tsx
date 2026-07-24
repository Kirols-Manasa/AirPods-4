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

  // ✅ Description طوله معقول — جملتين واضحتين
  description:
    "AirPods 4 — an Apple-inspired landing page featuring H2 chip audio, spatial sound, and immersive scroll animations. Built with Next.js and T3 Stack.",

  // ✅ Keywords خاصة بالموقع بس — مش منافسة Apple
  keywords: [
    // 🎯 اسمك = صفر منافسة
    "Kirols",
    "Kirols portfolio",
    "Kirols frontend developer",

    // 🎯 AirPods + تقنيات = منافسة منخفضة جداً
    "AirPods 4 landing page",
    "AirPods 4 Next.js",
    "AirPods 4 web design",
    "AirPods 4 scroll animation",
    "AirPods 4 spatial audio website",
    "AirPods 4 H2 chip page",
    "AirPods 4 interactive website",
    "AirPods 4 Apple clone",
    "AirPods 4 T3 stack",

    // 🎯 تقنيات بس
    "Apple product page Next.js",
    "GSAP Apple animation Next.js",
  ],

  // ✅ Favicon ظاهر في التاب — أهم حاجة
  icons: {
    icon: [
      {
        url: "https://airpods-4.vercel.app/images/favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: "https://airpods-4.vercel.app/images/favicon.ico",
    apple: "https://airpods-4.vercel.app/images/favicon.ico",
  },

  openGraph: {
    title: "AirPods 4 — Iconic. Now Supersonic.",
    description:
      "AirPods 4 — an Apple-inspired landing page featuring H2 chip audio, spatial sound, and immersive scroll animations. Built with Next.js and T3 Stack.",
    url: "https://airpods-4.vercel.app",
    siteName: "AirPods 4",
    // ✅ URL كامل للصورة مش relative path
    images: [
      {
        url: "https://airpods-4.vercel.app/images/meta.webp",
        width: 1200,
        height: 630,
        alt: "AirPods 4 Landing Page",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AirPods 4 — Iconic. Now Supersonic.",
    description:
      "AirPods 4 — an Apple-inspired landing page with H2 chip audio and immersive scroll animations. Built with Next.js.",
    // ✅ URL كامل هنا كمان
    images: ["https://airpods-4.vercel.app/images/meta.webp"],
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

  alternates: {
    canonical: "https://airpods-4.vercel.app",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },

  category: "technology",
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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AirPods 4",
    url: "https://airpods-4.vercel.app",
    description:
      "Apple-inspired AirPods 4 landing page with immersive scroll animations, built with Next.js and T3 Stack.",
    author: {
      "@type": "Person",
      name: "Kirols",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ViewAction",
      target: "https://airpods-4.vercel.app",
    },
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "AirPods 4 Landing Page",
    description:
      "Apple-style product landing page for AirPods 4 with scroll-driven GSAP animations and spatial audio storytelling.",
    creator: {
      "@type": "Person",
      name: "Kirols",
    },
    url: "https://airpods-4.vercel.app",
    image: "https://airpods-4.vercel.app/images/meta.webp",
    dateCreated: "2025",
    genre: "Web Development Portfolio",
    about: {
      "@type": "Thing",
      name: "AirPods 4",
      description: "Apple AirPods 4 wireless earbuds with H2 chip",
    },
    keywords: "AirPods 4, Next.js, T3 Stack, Tailwind CSS, GSAP, TypeScript, Apple design",
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* ✅ Favicon صريح في الـ head عشان يظهر في كل المتصفحات */}
        <link
          rel="icon"
          href="https://airpods-4.vercel.app/images/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href="https://airpods-4.vercel.app/images/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          href="https://airpods-4.vercel.app/images/favicon.ico"
        />

        {/* Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
        />

        {/* ✅ Open Graph image صريح في الـ head كـ fallback */}
        <meta property="og:image" content="https://airpods-4.vercel.app/images/meta.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
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