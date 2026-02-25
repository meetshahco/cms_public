import type { Metadata } from "next";
import { Inter, Outfit, Caveat } from "next/font/google";
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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

import { getSettings } from "@/lib/cms/storage";

import { Providers } from "@/components/auth/Providers";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch(() => null);

  return {
    title: settings?.siteTitle || "Meet Shah",
    description: settings?.metaDescription || "Product Designer and Developer",
    icons: {
      icon: settings?.favicon || "/favicon.ico",
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings().catch(() => null);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${caveat.variable} antialiased bg-[#0a0a0a] text-foreground`}
      >
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
