import type { Metadata } from 'next';
import { Inter, Outfit, DM_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Meet Shah | Product Designer',
  description: 'Portfolio of Meet Shah - Product Designer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-[#050505] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
