"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Real Brand Logos
const BRANDS = [
    { name: "Bank of Baroda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bank_of_Baroda_logo.svg" },
    { name: "Kotak Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Kotak_Mahindra_Bank_logo.svg" },
    { name: "Joveo", logo: "https://mma.prnewswire.com/media/2529141/Joveo_Logo.jpg?w=200" }, // Using a clean JPG placeholder if SVG not directly hotlinkable, but let's try to find a better one or use a high-quality fallback. Actually, let's use a text fallback for Joveo if vector isn't easy, but the prompt asked for logos. Let's use standard placeholders with real names if hotlinks are unstable, but I will try to use reliable Wikimedia/CDN links where possible.
    // Joveo doesn't have a reliable wiki svg. Let's use a placeholder for now but styled properly.
    // Actually, wait, let's use the one found in search or a generic one.
    { name: "Narayana Health", logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Narayana_Health_logo.png" },
    // Duplicates for loop
    { name: "Bank of Baroda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bank_of_Baroda_logo.svg" },
    { name: "Kotak Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Kotak_Mahindra_Bank_logo.svg" },
    { name: "Joveo", logo: "https://mma.prnewswire.com/media/2529141/Joveo_Logo.jpg?w=200" },
    { name: "Narayana Health", logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Narayana_Health_logo.png" },
];

export function AboutMe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-24"
        >
            {/* Background Orbital Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                {/* Animated Rotating Container */}
                <motion.div
                    className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-neutral-800/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    {/* Positioning items on the circle */}
                    {BRANDS.map((brand, i) => {
                        const angle = (i / BRANDS.length) * 360;
                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    transform: `rotate(${angle}deg) translate(300px) rotate(-${angle}deg)`,
                                }}
                            >
                                <div className="w-24 h-12 relative grayscale opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                                    {/* Fallback for complex SVGs: simple img tag */}
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain invert brightness-0 hover:invert-0 hover:brightness-100 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Profile Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileInView={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex max-w-4xl flex-col md:flex-row items-center gap-8 rounded-3xl bg-neutral-900/50 p-8 md:p-12 border border-white/5 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.15)] group"
            >
                {/* Left: Bio Text */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h3 className="text-2xl font-light text-white md:text-3xl leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                        I craft digital experiences that blend <span className="text-blue-400 font-normal">form</span> and <span className="text-purple-400 font-normal">function</span>. With a focus on user-centric design, I help brands tell their stories through intuitive interfaces.
                    </h3>
                    <p className="text-neutral-400 text-lg group-hover:text-neutral-300 transition-colors">
                        Based in India, working with clients globally.
                    </p>
                </div>

                {/* Right: Profile Image */}
                <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 shadow-lg md:h-64 md:w-64 rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                    <Image
                        loader={({ src }) => `https://placehold.co/400x400/222/fff?text=Meet`}
                        src="placeholder"
                        alt="Meet Shah"
                        fill
                        className="object-cover"
                    />
                </div>
            </motion.div>
        </section>
    );
}
