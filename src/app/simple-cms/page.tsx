"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { motion } from "framer-motion";
import {
    Github,
    Layout,
    Box,
    Zap,
    ExternalLink,
    Linkedin,
    Mail,
    ArrowRight,
    Star,
    Layers,
    Code2,
    Database
} from "lucide-react";
import Link from "next/link";

const FEATURE_CARDS = [
    {
        icon: <Layers className="w-6 h-6 text-blue-400" />,
        title: "Case Study Structure",
        description: "Optimized data models for high-end product design portfolios with zero configuration."
    },
    {
        icon: <Box className="w-6 h-6 text-purple-400" />,
        title: "Custom Input Units",
        description: "Built-in blocks for metrics, device mockups, and rich media that look premium instantly."
    },
    {
        icon: <Database className="w-6 h-6 text-emerald-400" />,
        title: "Edge-Ready Storage",
        description: "Powered by Vercel KV for global low-latency performance and absolute reliability."
    }
];

const SHOWCASE_ITEMS = [
    { label: "Mockups", color: "bg-blue-500/20 text-blue-400", border: "border-blue-500/20" },
    { label: "Metrics", color: "bg-purple-500/20 text-purple-400", border: "border-purple-500/20" },
    { label: "Drafts", color: "bg-amber-500/20 text-amber-400", border: "border-amber-500/20" },
    { label: "Revision Hist.", color: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/20" },
];

export default function SimpleCMSLanding() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Left Side: Marketing & Showcase */}
            <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-between relative overflow-y-auto max-h-screen custom-scrollbar">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 -right-48 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 space-y-12">
                    {/* Header / Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Zap className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Simple CMS</h2>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-xl">
                            The CMS for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Designers</span> who build.
                        </h1>
                        <p className="mt-6 text-lg text-neutral-400 max-w-lg leading-relaxed font-light">
                            A high-powered, lightweight content engine built for modern portfolios.
                            Fully isolated, extremely fast, and developer-friendly.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURE_CARDS.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="mb-4 p-2.5 w-fit rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}

                        {/* Interactive Showcase Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                                    <Code2 className="w-4 h-4" /> Custom Components
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {SHOWCASE_ITEMS.map((item, i) => (
                                        <div key={i} className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${item.border} ${item.color}`}>
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-6 mt-auto italic">
                                Ready-to-go units for your portfolio.
                            </p>
                        </motion.div>
                    </div>

                    {/* GitHub CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link
                            href="https://github.com/meetshahco/cms_public"
                            target="_blank"
                            className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-all active:scale-95 group"
                        >
                            <Github className="w-5 h-5" />
                            <span>View on GitHub</span>
                            <Star className="w-4 h-4 ml-1 fill-black group-hover:animate-bounce" />
                        </Link>

                        <div className="flex items-center gap-4 text-neutral-500 text-sm">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400">DS</div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-purple-500/20 flex items-center justify-center text-[10px] text-purple-400">FE</div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400">API</div>
                            </div>
                            <span>Join the open-source community</span>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-8 justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                        <Link href="https://meetshah.co" className="text-xs hover:text-white transition-colors">Portfolio</Link>
                        <Link href="https://linkedin.com/in/meetshah" className="text-xs hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="/contact" className="text-xs hover:text-white transition-colors">Contact Me</Link>
                    </div>
                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
                        Built from scratch by Meet Shah
                    </p>
                </div>
            </div>

            {/* Right Side: Login Panel */}
            <div className="w-full md:w-2/5 min-h-[500px] md:min-h-screen bg-white/[0.02] border-l border-white/5 flex flex-col justify-center items-center p-8 relative">
                {/* Decorative gradients for the login side */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-700/40 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-sm space-y-8 relative z-10"
                >
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2">Experience the Demo</h2>
                        <p className="text-neutral-500 text-sm">
                            Login below to try the editor interface. <br className="hidden sm:block" />
                            Data is reset periodically for other guests.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl">
                        <LoginForm prefill={true} />

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                                <Zap className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                                <p className="text-xs text-blue-400/80 leading-relaxed">
                                    <span className="font-bold text-blue-400">Guest Pass:</span> The form is pre-filled with <span className="text-white font-mono">admin / admin</span> for your convenience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full flex md:hidden items-center justify-center gap-2 text-xs text-neutral-600 py-4"
                    >
                        Back to Features <ArrowRight className="w-3 h-3 rotate-90" />
                    </button>
                </motion.div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
