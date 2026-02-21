"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Real Brand Logos
const BRANDS = [
    { name: "Bank of Baroda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bank_of_Baroda_logo.svg" },
    { name: "Kotak Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Kotak_Mahindra_Bank_logo.svg" },
    { name: "Joveo", logo: "https://mma.prnewswire.com/media/2529141/Joveo_Logo.jpg?w=200" },
    { name: "Narayana Health", logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Narayana_Health_logo.png" },
    // Duplicates for loop
    { name: "Bank of Baroda", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bank_of_Baroda_logo.svg" },
    { name: "Kotak Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Kotak_Mahindra_Bank_logo.svg" },
    { name: "Joveo", logo: "https://mma.prnewswire.com/media/2529141/Joveo_Logo.jpg?w=200" },
    { name: "Narayana Health", logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Narayana_Health_logo.png" },
];

export function AboutMe() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-24 [--orbit-radius:160px] sm:[--orbit-radius:250px] md:[--orbit-radius:300px] lg:[--orbit-radius:400px]"
        >
            {/* Background Orbital Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                {/* Animated Rotating Container */}
                <motion.div
                    className="relative w-[calc(var(--orbit-radius)*2)] h-[calc(var(--orbit-radius)*2)] rounded-full border border-neutral-800/50"
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
                                    transform: `rotate(${angle}deg) translate(var(--orbit-radius)) rotate(-${angle}deg)`,
                                }}
                            >
                                <div className="w-16 h-8 sm:w-24 sm:h-12 relative grayscale opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain invert brightness-0 hover:invert-0 hover:brightness-100 transition-all duration-300"
                                        unoptimized
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
                        loader={() => `https://placehold.co/400x400/222/fff?text=Meet`}
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
