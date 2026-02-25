import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Simple CMS | Your Portfolio's New Best Friend",
    description: "The premier open-source CMS for Product Designers and PMs. Build high-end portfolios using Next.js and Vercel KV with native blocks for metrics, interactive mockups, and before/after frames. Engineered for makers who need more than a blog—create data-driven product stories with a Tiptap-powered editor.",
    openGraph: {
        title: "Simple CMS | Meet Shah",
        description: "The premier open-source CMS for Product Designers and PMs. Build high-end portfolios using Next.js and Vercel KV with native blocks for metrics, interactive mockups, and before/after frames. Engineered for makers who need more than a blog—create data-driven product stories with a Tiptap-powered editor.",
        type: "website",
        images: [
            {
                url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazFybnd5bWQ3bmxzOTl0MDVmbGd4cnBmMHo1anpsbTc2bjZyMXZhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hRCFBt3ta0DJeGto2R/giphy.gif",
                width: 800,
                height: 600,
                alt: "Simple CMS Sparkle",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Simple CMS | Your Portfolio's New Best Friend",
        description: "The premier open-source CMS for Product Designers and PMs.",
    },
};

export default function SimpleCMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
