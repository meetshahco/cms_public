"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// The exact structure from the GIF
// "Hey there, I'm [Meet Shah] [Product Designer] from [India] who loves [cooking], [travelling] and [surfing Reddit] a lot - to gain [knowledge], haha."

const TARGETS = [
    {
        id: "name",
        text: "Meet Shah",
        image: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif" // Generic happy/person GIF
    },
    {
        id: "role",
        text: "Product Designer",
        image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" // Design/computer GIF
    },
    {
        id: "loc",
        text: "India",
        image: "https://media.giphy.com/media/3o6vXVzKWtkOIpyNMc/giphy.gif" // India Flag/Map
    },
    {
        id: "cooking",
        text: "cooking",
        image: "https://media.giphy.com/media/demgiphy/giphy.gif" // Chef/Cooking
    },
    {
        id: "travel",
        text: "travelling",
        image: "https://media.giphy.com/media/3o7qDYjF29msTSzcnk/giphy.gif" // Plane/Travel
    },
    {
        id: "reddit",
        text: "surfing Reddit",
        image: "https://media.giphy.com/media/26uf8S0Kgy4Yt5tpm/giphy.gif" // Reddit/Internet
    },
    {
        id: "knowledge",
        text: "knowledge",
        image: "https://media.giphy.com/media/3o7ec2SK5gX3fWvTAI/giphy.gif" // Brain/Sparkle
    }
];

export function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rects, setRects] = useState<Record<string, DOMRect>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const refs = useRef<Record<string, HTMLSpanElement | null>>({});

    // Cycle through targets
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TARGETS.length);
        }, 2500); // 2.5s per word
        return () => clearInterval(interval);
    }, []);

    // Update positions on resize or index change
    const updateRects = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newRects: Record<string, DOMRect> = {};

        TARGETS.forEach((t) => {
            const el = refs.current[t.id];
            if (el) {
                const rect = el.getBoundingClientRect();
                // Calculate relative position to container
                newRects[t.id] = {
                    ...rect,
                    left: rect.left - containerRect.left,
                    top: rect.top - containerRect.top,
                    width: rect.width,
                    height: rect.height
                } as DOMRect;
            }
        });
        setRects(newRects);
    };

    useLayoutEffect(() => {
        updateRects();
        window.addEventListener("resize", updateRects);
        return () => window.removeEventListener("resize", updateRects);
    }, []);

    const activeTarget = TARGETS[activeIndex];
    const activeRect = rects[activeTarget.id];

    return (
        <section className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-6 md:px-20 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-dm-sans leading-[1.4] text-neutral-600">
                    Hey there, I&apos;m{" "}
                    <Target id="name" activeId={activeTarget.id} refs={refs} />
                    {" "}
                    <br className="hidden md:block" />
                    <Target id="role" activeId={activeTarget.id} refs={refs} />
                    {" "}from{" "}
                    <Target id="loc" activeId={activeTarget.id} refs={refs} />
                    {" "}who
                    <br className="hidden md:block" />
                    loves{" "}
                    <Target id="cooking" activeId={activeTarget.id} refs={refs} />
                    ,{" "}
                    <Target id="travel" activeId={activeTarget.id} refs={refs} />
                    {" "}and{" "}
                    <Target id="reddit" activeId={activeTarget.id} refs={refs} />
                    {" "}a lot
                    <br className="hidden md:block" />
                    - to gain{" "}
                    <Target id="knowledge" activeId={activeTarget.id} refs={refs} />
                    , haha.
                </h1>

                {/* The WALKER */}
                {activeRect && (
                    <motion.div
                        className="absolute z-20 pointer-events-none"
                        initial={false}
                        animate={{
                            top: activeRect.top,
                            left: activeRect.left,
                            width: activeRect.width,
                            height: activeRect.height,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                    >
                        {/* The Image Circle (Offset to sit above/near text) */}
                        <motion.div
                            className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/10 bg-neutral-900 overflow-hidden shadow-2xl"
                            layoutId="walker-image"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeTarget.image}
                                    src={activeTarget.image}
                                    alt="Walker"
                                    className="w-full h-full object-cover opacity-80"
                                    initial={{ opacity: 0, scale: 1.2 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </motion.div>

                        {/* Connection Line (Optional - from image to text) */}
                        <motion.div
                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-white/20 to-transparent"
                        />
                    </motion.div>
                )}
            </div>

            <div className="absolute bottom-10 left-10">
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-md">
                    I&apos;m really here -&gt;
                </button>
            </div>
        </section>
    );
}

function Target({ id, activeId, refs }: { id: string, activeId: string, refs: any }) {
    const isActive = id === activeId;
    const target = TARGETS.find(t => t.id === id);

    return (
        <span
            ref={(el) => { refs.current[id] = el; }}
            className={cn(
                "inline-block transition-colors duration-500 relative px-1",
                isActive ? "text-white" : "text-neutral-700/50"
            )}
        >
            {target?.text}
            {isActive && (
                <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {/* Specific Keyword Underlines */}
            {isActive && id === "cooking" && (
                <motion.div
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    className="absolute bottom-1 left-0 w-full h-1 bg-yellow-500/50"
                />
            )}
        </span>
    );
}
