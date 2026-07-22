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

  title: {
    default: "AirPods 4 ",
    template: "%s | AirPods 4",
  },

  description:
    "AirPods 4 with the Apple H2 chip. Experience Personalized Spatial Audio, Adaptive EQ, and theater-like sound — redesigned for the way you listen.",

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
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  themeColor: "#ffffff",

  authors: [{ name: "Kirols" }],
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
  return (
    <html lang="en" dir="ltr">
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