import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://keyvaro.com"),
  title: "KeyVaro",
  description: "Unlock your next stay with a smartphone.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "KeyVaro",
    description: "Unlock your next stay with a smartphone.",
    images: [{ url: "/preview.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyVaro",
    description: "Unlock your next stay with a smartphone.",
    images: [{ url: "/preview.png" }],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body>{children}</body>
    </html>
  );
}
