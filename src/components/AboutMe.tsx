"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutMe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={containerRef}
            className="relative flex items-center justify-center py-24 sm:py-32 w-full mx-auto px-4 md:px-6"
        >
            {/* Ambient Background Behind Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

            {/* Main Glowing Card that pops in on scroll */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ y }}
                className="relative z-10 w-full max-w-5xl mx-auto rounded-[2.5rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl p-8 sm:p-12 md:p-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] group/card"
            >
                {/* Decorative subtle border glow that follows hover */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8 flex flex-col justify-center text-center lg:text-left">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-2xl sm:text-3xl lg:text-4xl text-neutral-300 leading-relaxed font-light relative z-10"
                        >
                            A business-focused holistic <span className="text-white font-medium drop-shadow-md">Product/UX generalist</span> who believes in making people's lives easier with the combined experience of <span className="text-white font-medium drop-shadow-md">technology</span> and <span className="text-white font-medium drop-shadow-md">design</span> over the past 9 years.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className="pt-2 flex justify-center lg:justify-start"
                        >
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-2 rounded-full transition-all duration-700 overflow-hidden bg-transparent text-neutral-400 font-medium text-sm px-6 py-2 ring-1 ring-inset ring-white/20 hover:ring-white/0 hover:bg-white hover:text-black hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105"
                            >
                                More About Me
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Portrait Image Container (Right-aligned entirely) */}
                    <div className="flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-auto">
                        <motion.div
                            initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                            whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                            className="relative w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 group perspective-[1000px]"
                        >
                            {/* Main image wrapper with classy tilt and subtle interaction */}
                            <motion.div
                                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[-10px_20px_30px_rgba(0,0,0,0.5)] bg-neutral-800 transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:border-white/30"
                            >
                                <Image
                                    src="/assets/meet-portrait.jpg"
                                    alt="Meet Shah"
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                    priority
                                />
                                {/* subtle inner vignette */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none mix-blend-overlay" />
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
