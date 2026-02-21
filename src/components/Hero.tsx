"use client";
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactAnimation } from "@/context/ContactAnimationContext";

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
    duration?: number; // Optional custom display duration in ms
};

const HIGHLIGHT_CONFIG: Record<string, HighlightConfig> = {
    "Meet Shah": {
        media: "/assets/meet_shah_v2.jpg",
        decorationClass: "bg-blue-500 h-[3px]", // Standard thick underline
        textClass: "font-medium text-blue-200 drop-shadow-[0_0_6px_rgba(147,197,253,0.6)]", // Soft personal blue glow
        walkerClass: "!w-48 !h-36 rounded-2xl rotate-2 shadow-2xl object-cover border-2 border-white/10", // 4:3 fixed size
    },
    "Product Designer": {
        media: "/assets/product_designer.gif",
        decorationClass: "bg-transparent border-b-4 border-dotted border-purple-500 h-1", // Dotted underline
        textClass: "font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]", // High contrast text shadow
        walkerClass: "!w-64 !h-36 rounded-xl rotate-1 grainy-filter", // Wide 16:9 box, grainy filter
    },
    "India": {
        media: "/assets/india_temple.jpg",
        decorationClass: "bg-gradient-to-r from-orange-400 via-white to-green-400 h-[3px]", // Tricolor gradient
        textClass: "font-medium text-amber-400 drop-shadow-[0_0_8px_rgba(217,119,6,0.9)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]", // Warm golden bronze feel
        walkerClass: "!w-40 !h-40 rounded-3xl object-cover shadow-2xl border border-white/20 -rotate-2 brightness-[0.70] contrast-[0.85]", // Lowered brightness/contrast for readability
    },
    "cooking": {
        media: "/assets/cooking.gif",
        // Using static SVG file for reliability
        decorationClass: "bg-[url('/assets/wave.svg')] h-[12px] bg-bottom bg-repeat-x w-full",
        textClass: "font-medium text-amber-200 drop-shadow-[0_0_6px_rgba(252,211,77,0.6)]", // Warm culinary yellow/orange
        walkerClass: "!w-48 !h-36 rounded-xl rotate-3 shadow-xl object-cover border border-white/20", // 4:3 GIF
    },
    "travelling": {
        media: "/assets/travelling.gif",
        decorationClass: "", // Handled by customDecoration
        textClass: "font-medium text-emerald-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.5)]", // Earthy/fresh green
        walkerClass: "!w-64 !h-36 rounded-2xl -rotate-1 shadow-2xl object-cover", // Set precise 16:9 box for ezgif download
        duration: 5500, // Custom extended duration to let the EZgif loop complete entirely
        customDecoration: (isPassed) => <TravellingDecoration isVisible={isPassed} colorTheme="green" iconType="motorcycle" />
    },
    "Cinema": {
        media: "/assets/cinema.gif", // "Cinema" GIF
        decorationClass: "bg-red-500 h-[2px]", // Red underline to match
        textClass: "font-bold text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]", // Bold, Red, Glow applied to TEXT
        walkerClass: "rounded-md rotate-3",
    },
    "knowledge": {
        media: "/assets/knowledge_star.gif", // "The more you know" GIF
        decorationClass: "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-[2px]",
        textClass: "font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-gradient bg-[length:200%_auto]",
        // Expanded size, shifted center far right over "haha!", tilted, and grainy
        walkerClass: "!w-64 !h-32 !left-full !-translate-x-[40%] rounded-lg -rotate-6 grainy-filter",
    },
    "I'm really here!": {
        media: "", // Moved to inline layout
        decorationClass: "", // No underline
        walkerClass: "", // Moved to inline layout
        textClass: "font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 animate-gradient bg-[length:200%_auto]",
    }
};

const HERO_TEXT = "Hey there, I’m Meet Shah, a Product Designer from India who loves cooking, travelling and watching Cinema - to gain knowledge, haha!";

export function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [rects, setRects] = useState<Record<string, DOMRect>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const refs = useRef<Record<string, HTMLSpanElement | null>>({});
    const { triggerPlaneAnimation, isViewDeckCta, viewDeckRef } = useContactAnimation();

    const [subheaderPhase, setSubheaderPhase] = useState<"idle" | "text" | "end">("idle");
    const [hasLooped, setHasLooped] = useState(false);

    // Get active keys that are actually present in the text (Header only)
    const headerKeys = useMemo(() => {
        return Object.keys(HIGHLIGHT_CONFIG).filter(key => HERO_TEXT.includes(key));
    }, []);

    // Subheader specific keys
    const subheaderKeys = useMemo(() => ["I'm really here!", "end-marker"], []);
    const allKeys = useMemo(() => [...headerKeys, ...subheaderKeys], [headerKeys, subheaderKeys]);

    // Parse text into multiple segments for rendering
    const textSegments = useMemo(() => {
        // Create a regex to split by keywords, keeping delimiters
        const regex = new RegExp(`(${headerKeys.join("|")})`, "g");
        return HERO_TEXT.split(regex);
    }, [headerKeys]);

    // Update positions on resize or index change
    const updateRects = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newRects: Record<string, DOMRect> = {};

        allKeys.forEach((key) => {
            const el = refs.current[key];
            if (el) {
                const rect = el.getBoundingClientRect();
                // Calculate relative position to container
                newRects[key] = {
                    ...rect,
                    left: rect.left - containerRect.left,
                    top: rect.top - containerRect.top,
                    width: rect.width,
                    height: rect.height,
                    // JSON doesn't serialize methods, but we just need the properties
                    x: rect.x, y: rect.y, bottom: rect.bottom, right: rect.right, toJSON: () => { }
                } as DOMRect;
            }
        });
        setRects(newRects);
    };

    useLayoutEffect(() => {
        updateRects();
        window.addEventListener("resize", updateRects);
        // Small delay to ensure fonts/layout are stable
        const timer = setTimeout(updateRects, 100);
        return () => {
            window.removeEventListener("resize", updateRects);
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allKeys]);

    // Cycle Roles
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Cycle Header Highlights (The Main Walker) - Loops Infinite
    useEffect(() => {
        const cycle = () => {
            setHighlightIndex((prev) => {
                const next = (prev + 1) % headerKeys.length;
                if (next === 0 && !hasLooped) {
                    setHasLooped(true); // Trigger subheader after first full loop
                }
                return next;
            });
        };

        const currentKey = headerKeys[highlightIndex];
        const delay = HIGHLIGHT_CONFIG[currentKey]?.duration || 3000;

        const timeout = setTimeout(cycle, delay);

        return () => clearTimeout(timeout);
    }, [headerKeys, hasLooped, highlightIndex]);

    // Subheader Sequence
    useEffect(() => {
        if (hasLooped && subheaderPhase === "idle") {
            // Start subheader sequence
            setSubheaderPhase("text");

            // Wait for the walker to slide to the text before launching the plane
            setTimeout(() => {
                const domNode = refs.current["I'm really here!"];
                if (domNode) {
                    const rect = domNode.getBoundingClientRect();
                    triggerPlaneAnimation({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    });
                }
            }, 800);

            setTimeout(() => {
                setSubheaderPhase("end");
            }, 3000); // Wait 3s on text then move to end
        }
    }, [hasLooped, subheaderPhase, triggerPlaneAnimation]);

    const activeKey = headerKeys[highlightIndex];
    const activeConfig = HIGHLIGHT_CONFIG[activeKey];
    const activeRect = rects[activeKey];

    return (
        <section className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-16 md:px-12 md:pt-40 overflow-hidden">
            <div className="mx-auto max-w-5xl relative z-10" ref={containerRef}>
                <LayoutGroup>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-heading text-4xl font-medium leading-tight text-white md:text-6xl md:leading-snug relative isolate"
                    >
                        {/* The Walker - Smooth Sine Motion Image BEHIND text */}
                        <AnimatePresence mode="wait">
                            {activeRect && activeConfig && (
                                <motion.div
                                    key={activeKey === "I'm really here!" ? "subheader-walker" : "header-walker"}
                                    className="absolute z-0 pointer-events-none"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        top: activeRect.top,
                                        left: activeRect.left,
                                        width: activeRect.width,
                                        height: activeRect.height,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        top: activeRect.top,
                                        left: activeRect.left,
                                        width: activeRect.width,
                                        height: activeRect.height,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 20,
                                        mass: 0.8
                                    }}
                                >
                                    {/* The Walker Shape & Image */}
                                    <motion.div
                                        className={cn(
                                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] w-24 h-24 overflow-hidden border-2 border-white/20 shadow-2xl bg-black",
                                            activeConfig.walkerClass
                                        )}
                                        initial={{ opacity: 0.4, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.1 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "circOut"
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeKey} // Key change triggers exit/enter
                                                className="w-full h-full relative"
                                                initial={{ opacity: 0, scale: 1.2 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Image
                                                    src={activeConfig.media}
                                                    alt={activeKey}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={activeConfig.media.endsWith('.gif')}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Background Glow/Highlight behind text */}
                                    <motion.div
                                        className={cn(
                                            "absolute -top-6 -left-4 -right-4 -bottom-6 -z-10 bg-neutral-800/50 block rounded-xl"
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Subheader tracking removed completely for native Flex Layout inline positioning */}
                        {textSegments.map((segment, i) => {
                            const config = HIGHLIGHT_CONFIG[segment];
                            if (config) {
                                const currentIndex = headerKeys.indexOf(segment);
                                return (
                                    <HighlightTarget
                                        key={i}
                                        text={segment}
                                        config={config}
                                        isActive={highlightIndex === currentIndex}
                                        isPassed={highlightIndex > currentIndex}
                                        setRef={(el) => { refs.current[segment] = el; }}
                                    />
                                );
                            }
                            return <span key={i} className="text-white/60 transition-colors duration-500 relative z-10">{segment}</span>;
                        })}

                    </motion.h1>
                </LayoutGroup>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 text-2xl font-light text-neutral-400 md:text-3xl flex flex-wrap items-center gap-x-2 sm:gap-x-3 relative z-10"
                >
                    <span className="whitespace-nowrap opacity-50 px-1">I’m here to</span>
                    <div className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
                        <motion.div
                            layout
                            className="relative flex flex-col justify-center w-auto min-w-[max-content]"
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
                                    className="whitespace-nowrap font-medium text-white block leading-none px-1"
                                >
                                    {ROLES[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                    <span className="opacity-50 whitespace-nowrap px-1">which AI shouldn’t,</span>

                    {/* Integrated "I'm really here!" into the walker system in the subheader */}
                    <div className="flex items-center flex-nowrap gap-x-2">
                        <a
                            href="/contact"
                            className="inline-block relative z-20 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 hover:-rotate-2 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                        >
                            <HighlightTarget
                                text="I'm really here!"
                                config={HIGHLIGHT_CONFIG["I'm really here!"] || {
                                    media: "",
                                    decorationClass: "",
                                    textClass: "text-white font-medium"
                                }}
                                isActive={subheaderPhase === "text"}
                                isPassed={false} // Reverts to base state when phase ends
                                setRef={(el) => { refs.current["I'm really here!"] = el; }}
                                inactiveClass="text-neutral-400 opacity-50 transition-all duration-1000"
                            />
                        </a>

                        {/* Inline Dwight GIF effortlessly locked into Flex Layout via permanent reserved space */}
                        <div className="relative w-28 h-24 flex-shrink-0 hidden sm:block">
                            <AnimatePresence>
                                {(subheaderPhase === "text" || subheaderPhase === "end") && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, rotate: -15, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, scale: 1, rotate: 3, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black z-10 origin-left"
                                    >
                                        <Image
                                            src="/assets/dwight_phone.gif"
                                            alt="dwight typing"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-6 relative z-10"
                >
                    <a
                        href="https://drive.google.com/file/d/1T2yRyHmrCg2aqya-pVXIBlPyfyaPwqoc/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={viewDeckRef}
                        className={cn(
                            "group inline-flex items-center gap-2 rounded-full transition-all duration-700 overflow-hidden",
                            isViewDeckCta
                                ? "bg-white text-black text-sm font-medium px-6 py-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-neutral-200 ring-1 ring-white/0"
                                : "bg-transparent text-neutral-400 font-medium text-sm px-6 py-2 ring-1 ring-inset ring-white/20 hover:ring-white/40 hover:text-white"
                        )}
                    >
                        View Deck
                        <ArrowRight className={cn("transition-transform group-hover:translate-x-1", isViewDeckCta ? "w-4 h-4" : "w-4 h-4")} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function HighlightTarget({
    text,
    config,
    isActive,
    isPassed,
    setRef,
    inactiveClass = "text-white/60"
}: {
    text: string,
    config: HighlightConfig,
    isActive: boolean,
    isPassed: boolean,
    setRef: (el: HTMLSpanElement | null) => void,
    inactiveClass?: string
}) {
    return (
        <span ref={setRef} className="relative inline-block whitespace-nowrap px-1 z-10">
            <span className={cn(
                "relative z-10 transition-colors duration-500",
                // Highlight if active OR passed. Otherwise dim.
                (isActive || isPassed)
                    ? (config.textClass || "text-white")
                    : inactiveClass
            )}>
                {text}
                {config.appendIcon} {/* Render optional icon */}
            </span>

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

function TravellingDecoration({ isVisible, colorTheme = "green", iconType = "plane" }: { isVisible: boolean, colorTheme?: "green" | "orange", iconType?: "plane" | "motorcycle" }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(100); // Default to prevent crash/empty

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        // Initial measure
        setWidth(containerRef.current.offsetWidth);

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    setWidth(entry.contentRect.width);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Define colors based on theme
    const colors = {
        green: {
            primary: "#22c55e", // Green-500
            secondary: "#14532d", // Green-900 (for icon detail)
            light: "#86efac", // Green-300 (for particles)
        },
        orange: {
            primary: "#f97316", // Orange-500
            secondary: "#7c2d12", // Orange-900 (for icon detail)
            light: "#fdba74", // Orange-300 (for particles)
        }
    }[colorTheme];

    // Dynamic path based on measured width
    const pathD = `M0 20 Q ${width * 0.25} 25 ${width * 0.5} 15 T ${width} 20`;

    return (
        <div ref={containerRef} className="absolute top-full left-0 w-full h-12 overflow-visible pointer-events-none -mt-4">
            {/* The Path & Icon */}
            {isVisible && width > 0 && (
                <svg width="100%" height="100%" viewBox={`0 0 ${width} 40`} className="overflow-visible">
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
                            fill={colors.light}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], offsetDistance: [`${offset * 100 - 10}%`, `${offset * 100}%`] }}
                            style={{ offsetPath: `path('${pathD}')` }}
                            transition={{
                                duration: 1.0,
                                delay: i * 0.2,
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    ))}

                    {/* Cloud Trail - Separated from vehicle */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="0 8" // Dotted/Cloudy look
                        filter="url(#cloud-glow)"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.9 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Core Line */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                        strokeDasharray="4 4" // Dashed line
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.85 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Vehicle - Leading the pack */}
                    <motion.g
                        initial={{ offsetDistance: "0%", opacity: 0 }}
                        animate={{ offsetDistance: "100%", opacity: 1 }}
                        style={{
                            offsetPath: `path('${pathD}')`,
                            // Motorcycle stays level (0deg), Plane tracks path (auto) relative to tangent
                            offsetRotate: iconType === "motorcycle" ? "0deg" : "auto"
                        }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        {iconType === "plane" ? (
                            /* Paper Plane Icon */
                            <g transform="translate(14, -12) rotate(-45)">
                                <path
                                    d="M22 2L11 21L2 2L22 2Z"
                                    fill={colors.primary}
                                    stroke={colors.primary}
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    transform="rotate(270) scale(0.6) translate(-12, -12)"
                                />
                                <path
                                    d="M12 2L12 22"
                                    stroke={colors.secondary}
                                    strokeWidth="1"
                                    transform="rotate(270) scale(0.6) translate(-12, -12)"
                                />
                            </g>
                        ) : (
                            /* Motorcycle (Bullet/Himalayan Style) Icon - Improved Proportions & Centering */
                            <g transform="translate(12, -22) scale(0.8)">
                                {/* Main Body & Frame - Heavy Base */}
                                <path
                                    d="M5 16 L10 16 L14 12 L11 12 Z"
                                    fill={colors.secondary}
                                />
                                {/* Tank - Teardrop shape */}
                                <path
                                    d="M10 11 Q 13 8 18 11 L 18 12 L 10 12 Z"
                                    fill={colors.primary}
                                    stroke={colors.secondary}
                                    strokeWidth="1"
                                />
                                {/* Seat - Flat/Scrambler style */}
                                <path
                                    d="M5 11 L10 11 L10 13 L6 13 Z"
                                    fill="#171717"
                                />
                                {/* Wheels - Spoked wire look */}
                                <circle cx="5" cy="18" r="4.5" stroke={colors.primary} strokeWidth="1.5" fill="none" />
                                <circle cx="21" cy="18" r="4.5" stroke={colors.primary} strokeWidth="1.5" fill="none" />

                                {/* Engine Block */}
                                <rect x="11" y="13" width="4" height="4" rx="1" fill={colors.secondary} />

                                {/* Handlebars - Rising up */}
                                <path d="M16 11 L16 9 L14 8" stroke={colors.primary} strokeWidth="1.5" fill="none" />

                                {/* Headlight - Round Classic */}
                                <circle cx="19" cy="9" r="1.5" fill={colors.light} />

                                {/* Exhaust - Long horizontal */}
                                <path d="M12 18 L24 18" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" />
                            </g>
                        )}
                    </motion.g>
                </svg>
            )}
        </div>
    );
}

