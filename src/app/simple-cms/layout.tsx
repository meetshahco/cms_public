import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Simple CMS | Your Portfolio's New Best Friend",
    description: "Built with Next.js, Vercel KV, and Tiptap. Designed for Designers, PMs, and Makers who build high-end product portfolios.",
    openGraph: {
        title: "Simple CMS | Meet Shah",
        description: "Your Portfolio's New Best Friend. Designed for Designers, PMs, and Makers who build high-end product portfolios.",
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
        description: "Designed for Designers, PMs, and Makers who build high-end product portfolios.",
    },
};

export default function SimpleCMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
