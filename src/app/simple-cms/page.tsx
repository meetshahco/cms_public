"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { CMSBackgroundAnimation } from "@/components/auth/CMSBackgroundAnimation";
import { motion } from "framer-motion";
import {
    Github,
    Layout,
    Box,
    Zap,
    Star,
    Layers,
    Code2,
    PenTool,
    Smartphone,
    Triangle,
    Wind,
    Video,
    Code,
    Type,
    Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FEATURE_CARDS = [
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

export default function SimpleCMSLanding() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white/20">
            <div className="flex flex-col md:flex-row flex-1">
                {/* Left Side: Marketing & Showcase */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-16 lg:p-24 flex flex-col relative z-10">

                    {/* Background Decor (Subtle Greyscale) */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
                        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-white rounded-full blur-[150px]" />
                    </div>

                    <div className="relative z-10 space-y-12">
                        {/* Header / Branding */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-white/10 transition-shadow"
                                >
                                    <Layout className="w-5 h-5 text-neutral-300" />
                                </motion.div>
                                <h2 className="text-xl font-medium tracking-tight text-neutral-300">Simple CMS</h2>
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-neutral-100 leading-tight md:!leading-[50px]">
                                    Your Portfolio's New Best{" "}
                                    <span className="whitespace-nowrap">
                                        Friend.{" "}
                                        <motion.span
                                            initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                                            animate={{ scale: 1, opacity: 1, rotate: -5 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                                            className="inline-block align-middle -mt-2 md:-mt-3"
                                        >
                                            <img
                                                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazFybnd5bWQ3bmxzOTl0MDVmbGd4cnBmMHo1anpsbTc2bjZyMXZhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hRCFBt3ta0DJeGto2R/giphy.gif"
                                                alt="Sparkle"
                                                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-xl opacity-90 mix-blend-screen mix-blend-lighten"
                                            />
                                        </motion.span>
                                    </span>
                                </h1>
                            </div>

                            <p className="mt-6 text-base text-neutral-400 max-w-lg leading-relaxed font-light">
                                Built with Next.js, Vercel KV, and Tiptap. Designed for Designers, PMs, and Makers who build high-end product portfolios.
                            </p>
                        </motion.div>

                        {/* Features List (Full width) */}
                        <div className="space-y-4">
                            {FEATURE_CARDS.map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                        whileHover={{ scale: 1.01, y: -2 }}
                                        className="relative p-5 md:p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col md:flex-row gap-5 md:gap-6 overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] min-w-0"
                                    >
                                        {/* Glow Effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.04] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" />

                                        <div className="hidden sm:flex shrink-0 self-start md:mt-1">
                                            <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/5 shadow-xl shadow-black border border-white/10 group-hover:border-white/20 transition-colors flex items-center justify-center">
                                                {/* Inner Animated Icon */}
                                                <motion.div
                                                    initial={{ scale: 1 }}
                                                    whileHover={{ scale: 1.15, rotate: 15 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    {Icon}
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col relative z-10 break-words overflow-visible min-w-0">
                                            <h3 className="text-base font-semibold mb-2 text-neutral-100 group-hover:text-white transition-colors">{feature.title}</h3>
                                            <p className="text-[13px] text-neutral-400 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">{feature.description}</p>

                                            {/* Horizontal Animated Chips / Marquee */}
                                            {feature.tags && feature.tags.length > 0 && (
                                                <div className="flex overflow-hidden relative w-full mt-5 mask-edges-horizontal-wide">
                                                    <motion.div
                                                        animate={{ x: ["0%", "-50%"] }}
                                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                                        className="flex shrink-0 gap-2 w-max"
                                                    >
                                                        {[...feature.tags, ...feature.tags].map((tag, j) => (
                                                            <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/5 bg-black/20 text-neutral-400 shadow-sm group-hover:border-white/10 group-hover:text-neutral-300 transition-colors whitespace-nowrap">
                                                                {tag.icon}
                                                                <span>{tag.label}</span>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* High-End GitHub Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 relative w-full rounded-2xl overflow-hidden group border border-transparent hover:border-white/5 transition-colors bg-white/[0.03]"
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                            <div className="p-6 md:p-8 flex flex-col h-full min-h-[160px] relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6 h-full">
                                    <div className="flex flex-col max-w-sm">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                                            <Github className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                                            Constantly updating CMS with features focused on you.
                                        </h3>
                                        <p className="text-neutral-400 text-sm font-light">
                                            Fork it, own it, update it.
                                        </p>
                                    </div>

                                    <div className="mt-auto md:h-full md:mt-0 flex items-end justify-end w-full md:w-auto self-end md:self-stretch">
                                        <Link
                                            href="https://github.com/meetshahco/cms_public"
                                            target="_blank"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-neutral-200 text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                        >
                                            <span>Fork on GitHub</span>
                                            <Star className="w-3.5 h-3.5 fill-current group-hover:animate-bounce" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Login Panel */}
                <div className="w-full md:w-2/5 min-h-[500px] md:h-screen md:sticky md:top-0 bg-[#020202] border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-center items-center p-8 relative z-20 shadow-2xl overflow-hidden">

                    {/* Animated CMS Background */}
                    <CMSBackgroundAnimation />

                    {/* Subtle Right Side Decor */}
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-sm space-y-8 relative z-10"
                    >
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-2 text-neutral-100 tracking-tight">Experience the Demo</h2>
                            <p className="text-neutral-500 text-sm font-light">
                                Login below to try the editor interface. <br className="hidden sm:block" />
                                Data is reset periodically for other guests.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-transparent shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.03)] transition-shadow">
                            <LoginForm prefill={true} />

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex items-start gap-3 bg-white/[0.04] p-4 rounded-xl border border-transparent shadow-inner">
                                    <Layout className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0 drop-shadow" />
                                    <p className="text-[13px] text-neutral-400 leading-relaxed font-light">
                                        <span className="font-semibold text-neutral-300">Guest Pass:</span> Form is pre-filled with <span className="font-mono text-neutral-200">admin / admin</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Global Full-Width Footer */}
            <div className="w-full bg-[#020202] border-t border-white/10 relative overflow-hidden z-30">
                <div className="max-w-[1600px] mx-auto p-8 md:p-16">
                    <div className="flex flex-col gap-6 relative z-10 w-full group">
                        {/* Line 1: Philosophy with typing animation */}
                        <div className="text-center md:text-left h-20 sm:h-auto flex items-center justify-center md:justify-start">
                            <motion.blockquote
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "0px" }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } },
                                    hidden: {}
                                }}
                                className="font-['var(--font-caveat)'] text-3xl sm:text-4xl text-neutral-300 tracking-wide flex items-center flex-wrap"
                            >
                                {"Designed to solve my problems. Open-sourced to solve yours.".split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hidden: { display: "none", opacity: 0 },
                                            visible: { display: "inline", opacity: 1 }
                                        }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="ml-1 w-2.5 h-6 md:h-7 bg-neutral-400 inline-block align-middle"
                                />
                            </motion.blockquote>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-4">
                            {/* Left: Built By */}
                            <p className="text-xs md:text-sm text-neutral-500 font-light text-center md:text-left order-2 sm:order-1">
                                Built by <Link href="https://meetshah.co" className="font-bold text-neutral-200 hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-white/30 hover:after:bg-white transition-all">Meet Shah</Link>
                            </p>

                            {/* Right: Global Links & CTA */}
                            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 order-1 sm:order-2">
                                <Link
                                    href="https://meetshah.co"
                                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-neutral-400 hover:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                                    title="Portfolio"
                                >
                                    <Globe className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link
                                    href="https://linkedin.com/in/meetshahco"
                                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 transition-all text-neutral-400 hover:text-[#0077b5] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0077b5]/50"
                                    title="LinkedIn"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </Link>
                                <Link
                                    href="https://github.com/meetshahco"
                                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/50 transition-all text-neutral-400 hover:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                                    title="GitHub"
                                >
                                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link
                                    href="https://www.meetshah.co/contact"
                                    className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-neutral-200 text-[13px] transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-wide"
                                >
                                    Let's talk
                                </Link>
                            </div>
                        </div>

                        {/* Retro ambient background element that subtly reacts to hover on the whole footer area */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 overflow-hidden">
                            <div className="absolute left-1/4 bottom-0 w-[500px] h-32 bg-blue-500/10 blur-[80px] rounded-full translate-y-10 group-hover:translate-y-0 transition-transform duration-1000" />
                            <div className="absolute right-1/4 bottom-0 w-[300px] h-32 bg-purple-500/10 blur-[80px] rounded-full translate-y-10 group-hover:translate-y-0 transition-transform duration-1000 delay-100" />
                        </div>
                    </div>
                </div>
                {/* Global CSS for fade out mask edges */}
                <style jsx global>{`
                .mask-edges-horizontal-wide {
                    mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 25%, black 75%, transparent);
                }
                `}</style>
            </div>
        </div>
    );
}
