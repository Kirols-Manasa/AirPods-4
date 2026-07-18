 import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import GridOverlay from "@/GridOverlay";
import Header from "@/layout/Header/Header";

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
         <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <GridOverlay />
       
      </body>
    </html>
  );
}