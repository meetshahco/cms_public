"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
    "make decisions",
    "preserve craft",
    "understand users",
    "take responsibility",
    "own the vision",
];

// Configuration: Add any keyword here to attach a spotlight image to it
// Added 'className' for walker shape, 'decorationClass' for underline style, 'textClass' for text styling, 'appendIcon' for trailing icon
type HighlightConfig = {
    media: string;
    decorationClass: string;
    walkerClass?: string;
    textClass?: string;
    appendIcon?: React.ReactNode;
    customDecoration?: (isPassed: boolean) => React.ReactNode;
};

const HIGHLIGHT_CONFIG: Record<string, HighlightConfig> = {
    "Meet Shah": {
        media: "https://placehold.co/100x100/171717/ededed?text=Meet",
        decorationClass: "bg-blue-500 h-[3px]", // Standard thick underline
        walkerClass: "rounded-lg -rotate-2",
    },
    "Product Designer": {
        media: "https://placehold.co/100x100/171717/ededed?text=Design",
        decorationClass: "bg-transparent border-b-4 border-dotted border-purple-500 h-1", // Dotted underline
        walkerClass: "rounded-2xl rotate-1",
    },
    "India": {
        media: "https://placehold.co/100x100/171717/ededed?text=India",
        decorationClass: "bg-gradient-to-r from-orange-400 via-white to-green-400 h-[3px]", // Tricolor gradient
        walkerClass: "rounded-full",
    },
    "cooking": {
        media: "https://media.giphy.com/media/DemT0S2dnC0tG/giphy.gif",
        // Using static SVG file for reliability
        decorationClass: "bg-[url('/assets/wave.svg')] h-[12px] bg-bottom bg-repeat-x w-full",
        walkerClass: "rounded-md rotate-3",
    },
    "travelling": {
        media: "https://media.giphy.com/media/3o7qDYXe0QuLCme1Fu/giphy.gif",
        decorationClass: "", // Handled by customDecoration
        walkerClass: "rounded-3xl -rotate-1",
        customDecoration: (isPassed) => <TravellingDecoration isVisible={isPassed} />
    },
    "Reddit": {
        media: "https://media.giphy.com/media/26uf5MGpa0J0o8rPW/giphy.gif",
        decorationClass: "bg-orange-600 h-[4px] rounded-full", // Thick rounded pill
        walkerClass: "rounded-sm rotate-6",
    },
    "knowledge": {
        media: "https://media.giphy.com/media/ru98VbVq4W72E/giphy.gif", // Michael Scott "That's what she said"
        decorationClass: "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-[2px]", // Gradient underline to match
        textClass: "font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-gradient bg-[length:200%_auto]", // Bold, Italic, Gradient Text Animation
        walkerClass: "rounded-xl -rotate-3",
        appendIcon: <span className="inline-block ml-1 text-yellow-400 animate-pulse">✨</span> // Magical Icon (Sparkles)
    }
};

const HERO_TEXT = "Hey there, I’m Meet Shah, a Product Designer from India who loves cooking, travelling and surfing Reddit a lot - to gain knowledge, haha!";

export function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [highlightIndex, setHighlightIndex] = useState(0);

    // Get active keys that are actually present in the text
    const highlightKeys = useMemo(() => {
        return Object.keys(HIGHLIGHT_CONFIG).filter(key => HERO_TEXT.includes(key));
    }, []);

    // Parse text into multiple segments for rendering
    const textSegments = useMemo(() => {
        // Create a regex to split by keywords, keeping delimiters
        const regex = new RegExp(`(${highlightKeys.join("|")})`, "g");
        return HERO_TEXT.split(regex);
    }, [highlightKeys]);

    // Cycle Roles
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Cycle Highlights (The Walker)
    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % highlightKeys.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [highlightKeys]);

    return (
        <section className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-16 md:px-12 md:pt-40 overflow-hidden">
            <div className="mx-auto max-w-5xl relative z-10">
                <LayoutGroup>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-heading text-4xl font-medium leading-tight text-white md:text-6xl md:leading-snug relative"
                    >
                        {textSegments.map((segment, i) => {
                            const config = HIGHLIGHT_CONFIG[segment];
                            if (config) {
                                const currentIndex = highlightKeys.indexOf(segment);
                                return (
                                    <HighlightTarget
                                        key={i}
                                        text={segment}
                                        config={config}
                                        isActive={highlightIndex === currentIndex}
                                        isPassed={highlightIndex > currentIndex}
                                    />
                                );
                            }
                            return <span key={i} className="text-white/60 transition-colors duration-500">{segment}</span>;
                        })}
                    </motion.h1>
                </LayoutGroup>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 text-2xl font-light text-neutral-400 md:text-4xl flex flex-wrap items-center gap-x-2 sm:gap-x-3"
                >
                    <span className="whitespace-nowrap">I’m here to</span>
                    <div className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
                        <motion.div
                            layout
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            className="relative flex flex-col justify-center"
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={ROLES[roleIndex]}
                                    initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: "-110%", opacity: 0, filter: "blur(8px)" }}
                                    transition={{
                                        y: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                                        opacity: { duration: 0.3 },
                                        filter: { duration: 0.3 }
                                    }}
                                    className="whitespace-nowrap font-medium text-white block leading-none"
                                >
                                    {ROLES[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                    <span className="opacity-50 whitespace-nowrap">which AI shouldn’t.</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-16"
                >
                    <a
                        href="/about"
                        className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-all hover:scale-105 hover:bg-neutral-200"
                    >
                        I’m really here
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function HighlightTarget({ text, config, isActive, isPassed }: { text: string, config: HighlightConfig, isActive: boolean, isPassed: boolean }) {
    return (
        <span className="relative inline-block whitespace-nowrap px-1">
            <span className={cn(
                "relative z-10 transition-colors duration-500",
                isActive ? "text-white" : "text-white",
                config.textClass // Apply custom text classes (bold, italic, gradient) here
            )}>
                {text}
                {config.appendIcon} {/* Render optional icon */}
            </span>

            {/* The Walker - Smooth Sine Motion Image */}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        layoutId="hero-spotlight-walker"
                        className={cn(
                            "absolute -top-6 -left-4 -right-4 -bottom-6 -z-0 bg-neutral-800/50 block",
                            config.walkerClass
                        )}
                        transition={{
                            type: "spring",
                            stiffness: 70,
                            damping: 20,
                            mass: 1.2
                        }}
                    >
                        {/* Floating Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            className={cn(
                                "absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 overflow-hidden border-2 border-white/20 shadow-2xl bg-black",
                                config.walkerClass
                            )}
                        >
                            <Image
                                src={config.media}
                                alt={text}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.span>
                )}
            </AnimatePresence>

            {/* The Mark - Persistent Highlight/Underline */}
            {isPassed && config.customDecoration ? (
                // Custom Decoration for complex animations (e.g., Travelling plane)
                config.customDecoration(isPassed)
            ) : isPassed && (
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className={cn("absolute bottom-0 left-0", config.decorationClass)}
                />
            )}
        </span>
    );
}

function TravellingDecoration({ isVisible }: { isVisible: boolean }) {
    return (
        <div className="absolute top-full left-0 w-full h-12 overflow-visible pointer-events-none -mt-4">
            {/* The Paper Plane Path & Icon */}
            {isVisible && (
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none" className="overflow-visible">
                    <defs>
                        <filter id="cloud-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Particle/Sparkle Effects along path */}
                    {[0.2, 0.4, 0.6, 0.8].map((offset, i) => (
                        <motion.circle
                            key={i}
                            r="1.5"
                            fill="#86efac" // Lighter green
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], offsetDistance: [`${offset * 100 - 10}%`, `${offset * 100}%`] }}
                            style={{ offsetPath: "path('M0 20 Q 25 25 50 15 T 100 20')" }}
                            transition={{
                                duration: 1.0,
                                delay: i * 0.2, // Staggered appearance
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    ))}

                    {/* Cloud Trail - Separated from rocket */}
                    <motion.path
                        d="M0 20 Q 25 25 50 15 T 100 20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="0 8" // Dotted/Cloudy look
                        filter="url(#cloud-glow)"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.9 }} // Stop short of the full path to create gap
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Core Line */}
                    <motion.path
                        d="M0 20 Q 25 25 50 15 T 100 20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray="4 4" // Dashed line
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.85 }} // Stop even shorter to ensure gap
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Paper Plane / Rocket - Leading the pack */}
                    <motion.g
                        initial={{ offsetDistance: "0%", opacity: 0 }}
                        animate={{ offsetDistance: "100%", opacity: 1 }}
                        style={{ offsetPath: "path('M0 20 Q 25 25 50 15 T 100 20')" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        {/* 
                            Icon: Flat/Top-down view. 
                            Rotated to align tail with path.
                            Translated forward (x: 10) to create visual separation from the trailing line.
                        */}
                        <g transform="translate(10, 0) rotate(0)">
                            <path
                                d="M22 2L11 21L2 2L22 2Z"
                                fill="#22c55e"
                                stroke="#22c55e"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                transform="rotate(90) scale(0.6) translate(-12, -12)"
                            />
                            <path
                                d="M12 2L12 22"
                                stroke="#14532d"
                                strokeWidth="1"
                                transform="rotate(90) scale(0.6) translate(-12, -12)"
                            />
                        </g>
                    </motion.g>
                </svg>
            )}
        </div>
    );
}
