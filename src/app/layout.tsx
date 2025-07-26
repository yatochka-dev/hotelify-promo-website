import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "KeyVaro",
  description: "Unlock your next stay with a smartphone.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body>{children}</body>
    </html>
  );
}
