import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { getSettings } from "@/lib/cms/storage";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const metadata: Metadata = {
    title: settings.siteTitle || "Meet Shah",
    description: settings.metaDescription || "Product Designer from India who loves cooking, travelling and surfing Reddit.",
  };

  if (settings.favicon) {
    metadata.icons = {
      icon: settings.favicon
    };
  }

  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <head>
        {settings.favicon && <link rel="icon" href={settings.favicon} />}
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
