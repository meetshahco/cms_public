import {
    Layout,
    Box,
    Zap,
    Layers,
    Code2,
    PenTool,
    Smartphone,
    Triangle,
    Wind,
    Video,
    Code,
    Type
} from "lucide-react";
import React from "react";

export interface Tag {
    label: string;
    icon?: React.ReactNode;
}

export interface FeatureCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    tags: Tag[];
}

export const FEATURE_CARDS: FeatureCard[] = [
    {
        icon: <Layers className="w-6 h-6 text-neutral-300 drop-shadow-md group-hover:text-white transition-colors" />,
        title: "Project <> Case Studies Structure",
        description: "Organize your work like a Netflix TV show. Build high-end portfolios where one project can contain multiple deep-dive case studies.",
        tags: []
    },
    {
        icon: <Box className="w-6 h-6 text-neutral-300 drop-shadow-md group-hover:text-white transition-colors" />,
        title: "Custom Input Blocks",
        description: "Built-in, edge-ready input components like metrics, device mockups, and many more that instantly elevate your content with best-in class writing experience.",
        tags: [
            { label: "Mockups", icon: <Layout className="w-3 h-3" /> },
            { label: "Metrics", icon: <Zap className="w-3 h-3" /> },
            { label: "Drafts", icon: <PenTool className="w-3 h-3" /> },
            { label: "Videos", icon: <Video className="w-3 h-3" /> },
            { label: "Code", icon: <Code className="w-3 h-3" /> },
            { label: "Quotes", icon: <Type className="w-3 h-3" /> },
            { label: "+ Many more" }
        ]
    },
    {
        icon: <Code2 className="w-6 h-6 text-neutral-300 drop-shadow-md group-hover:text-white transition-colors" />,
        title: "Modern Tech Stack",
        description: "Powered by modern technologies for global low-latency performance and an amazing developer experience.",
        tags: [
            { label: "Next.js", icon: <Triangle className="w-3 h-3 fill-current" /> },
            { label: "Vercel KV", icon: <Triangle className="w-3 h-3" /> },
            { label: "Tiptap", icon: <Box className="w-3 h-3" /> },
            { label: "Tailwind", icon: <Wind className="w-3 h-3" /> }
        ]
    },
    {
        icon: <Smartphone className="w-6 h-6 text-neutral-300 drop-shadow-md group-hover:text-white transition-colors" />,
        title: "Mobile Ready",
        description: "Manage your portfolio on the go. The entire admin interface is responsive and works flawlessly on any device.",
        tags: []
    }
];
