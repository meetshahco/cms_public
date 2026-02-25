"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Settings } from "@/lib/cms/storage";

// Filled SVG for LinkedIn
function LinkedinIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

// Filled SVG for Medium
function MediumFilledIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
    );
}

// Official X (Twitter) Logo SVG
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export function FooterClient({ settings }: { settings: Settings }) {
    const quote = "Code is the logic; Story is the craft.";
    const quoteChars = quote.split("");

    return (
        <footer className="w-full bg-neutral-950/50 border-t border-white/5 pt-16 pb-8 px-6 sm:px-12 flex flex-col items-center justify-center relative overflow-hidden mt-12">
            {/* Top quote section */}
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 z-10 min-h-[100px]">
                <motion.blockquote
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                        hidden: {}
                    }}
                    className="text-xl md:text-2xl font-mono text-neutral-400 font-medium tracking-tight flex items-center flex-wrap justify-center"
                >
                    <span className="opacity-50 mr-4 text-green-500/70">{">_"}</span>
                    {quoteChars.map((char, i) => (
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
                        className="ml-1 w-2.5 h-6 md:h-7 bg-green-500/70 inline-block align-middle"
                    />
                </motion.blockquote>

                {/* Digital Signature */}
                <div className="font-mono text-xs md:text-sm flex items-center gap-3">
                    <span className="text-neutral-700">---</span>
                    <span className="uppercase text-neutral-500 tracking-widest bg-neutral-900 px-3 py-1 rounded border border-white/5">
                        [SYS.AUTH: 0xMEET]
                    </span>
                    <span className="text-neutral-700">---</span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-screen-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

            {/* Bottom Section */}
            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center z-10 text-center md:text-left">

                <div className="flex flex-col items-center md:items-start space-y-4">
                    {settings.favicon ? (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group relative flex items-center justify-center w-10 h-10 transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            aria-label="Back to top"
                        >
                            <div className="relative w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                <Image
                                    src={settings.favicon}
                                    alt="Logo"
                                    fill
                                    className="object-contain invert brightness-0"
                                />
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center h-10 text-xl font-bold text-white opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-110"
                        >
                            {settings.siteTitle || "Meet Shah"}
                        </button>
                    )}
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-6">
                        {settings.socialLinks?.linkedin && (
                            <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-10 h-10 text-neutral-500 transition-all duration-500 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" aria-label="LinkedIn">
                                <LinkedinIcon className="w-5 h-5 relative z-10" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-neutral-300 text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    LinkedIn
                                </span>
                            </a>
                        )}
                        {settings.socialLinks?.medium && (
                            <a href={settings.socialLinks.medium} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-10 h-10 text-neutral-500 transition-all duration-500 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" aria-label="Medium">
                                <MediumFilledIcon className="w-5 h-5 relative z-10" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-neutral-300 text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    Medium
                                </span>
                            </a>
                        )}
                        {settings.socialLinks?.twitter && (
                            <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-10 h-10 text-neutral-500 transition-all duration-500 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" aria-label="X (Twitter)">
                                <XIcon className="w-5 h-5 m-0.5 relative z-10" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-neutral-300 text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    X (Twitter)
                                </span>
                            </a>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center md:items-end space-y-4">
                    <Link
                        href="https://www.meetshah.co/contact"
                        className="group inline-flex h-10 items-center gap-2 rounded-full transition-all duration-700 overflow-hidden bg-transparent text-neutral-400 font-medium text-sm px-6 ring-1 ring-inset ring-white/20 hover:ring-white/0 hover:bg-white hover:text-black hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105"
                    >
                        Let's talk
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            {/* Footer Bottom copyright */}
            <div className="w-full max-w-screen-2xl mx-auto mt-12 text-center z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed text-left">
                    Copyright &copy; {new Date().getFullYear()} {settings.siteTitle || "Meet Shah"}
                </p>
                <div className="text-xs sm:text-sm text-neutral-500 leading-relaxed text-right flex items-center justify-center md:justify-end flex-wrap gap-1.5">
                    <span>Crafted while having several late night chats with</span>
                    <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-all duration-300">
                        <Sparkles className="w-3 h-3 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] text-neutral-500 group-hover:text-white transition-colors" />
                        <span className="underline underline-offset-2 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] text-neutral-400">Antigravity</span>
                    </a>
                </div>
            </div>

            {/* Ambient Background glow */}
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-[100%] blur-[100px] pointer-events-none" />
        </footer>
    );
}
