"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Project } from "@/lib/cms/storage";
import { cn } from "@/lib/utils";

interface FeaturedProjectCardProps {
    project: Project;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    isHovered: boolean;
}

export function FeaturedProjectCard({ project, onHoverStart, onHoverEnd, isHovered }: FeaturedProjectCardProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [loopKey, setLoopKey] = useState(0);

    // Mobile scroll-to-pop logic
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center", "end start"]
    });

    const mobileScale = useTransform(scrollYProgress,
        [0, 0.5, 1],
        [0.9, 1.1, 0.9]
    );

    const mobileY = useTransform(scrollYProgress,
        [0, 0.5, 1],
        [20, 0, -20]
    );

    // Hover delay logic (150ms)
    useEffect(() => {
        if (isHovered) {
            timeoutRef.current = setTimeout(() => {
                setIsFocused(true);
            }, 150);
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsFocused(false);
            setProgress(0);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isHovered]);

    // Video Loop Engine (7 seconds)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        let isSourceValid = true;

        if (isFocused && project.video) {
            if (project.video.includes("loom.com/share")) {
                const duration = 7000;
                interval = setInterval(() => {
                    setLoopKey(prev => prev + 1);
                }, duration);
            } else if (videoRef.current) {
                videoRef.current.currentTime = 0;
                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        if (e.name !== "AbortError") {
                            console.log("Video play failed", e);
                        }
                    });
                }

                const duration = 7000;
                const start = Date.now();

                interval = setInterval(() => {
                    if (!videoRef.current) return;

                    const elapsed = Date.now() - start;
                    const newProgress = (elapsed % duration) / duration;
                    setProgress(newProgress * 100);

                    if (videoRef.current.currentTime >= 7) {
                        videoRef.current.currentTime = 0;
                    }
                }, 16);
            }
        }
        return () => {
            if (interval) clearInterval(interval);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };
    }, [isFocused, project.video]);

    return (
        <Link href={`/work/${project.id}`} className="block w-full h-[700px] relative">
            <motion.div
                ref={cardRef}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                className="relative w-full h-full rounded-[40px] overflow-hidden cursor-pointer bg-neutral-900 group transform-gpu"
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    zIndex: isHovered ? 100 : 1,
                    boxShadow: isHovered
                        ? "0 40px 100px -20px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 255, 255, 0.05)"
                        : "none"
                }}
                style={{
                    scale: typeof window !== 'undefined' && window.innerWidth < 768 ? mobileScale : undefined,
                    y: typeof window !== 'undefined' && window.innerWidth < 768 ? mobileY : 0,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Subtle Gradient Glow Overlay (Hover) */}
                <div className={cn(
                    "absolute -inset-[1px] bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 transition-opacity duration-700 pointer-events-none z-50",
                    isHovered && "opacity-100"
                )} />
                {/* Resting State: Full-bleed Thumbnail (Top-aligned) */}
                <div className="absolute inset-0 z-0">
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className={cn(
                                "object-cover object-center transition-all duration-700 ease-out",
                                isFocused ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
                            )}
                            priority
                        />
                    )}

                    {/* Deeper Scrim for Readability - No solid block to ensure full-bleed feel */}
                    <div className={cn(
                        "absolute inset-x-[-1px] bottom-[-1px] h-[85%] bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 rounded-b-[40px] translate-z-0",
                        isFocused ? "opacity-0" : "opacity-100"
                    )} />
                </div>

                {/* Hover State: The Theater Transition */}
                <div className={cn(
                    "absolute inset-0 z-10",
                    isFocused ? "grid grid-rows-[70%_30%]" : "flex flex-col"
                )}>
                    {/* Top Section: The Theater (Cinematic slot) */}
                    <div className={cn(
                        "relative w-full overflow-hidden bg-black transition-all duration-700 ease-[0.16, 1, 0.3, 1] flex-shrink-0 z-20",
                        isFocused ? "h-full opacity-100" : "h-0 opacity-0"
                    )}>
                        <AnimatePresence>
                            {isFocused && (
                                <motion.div
                                    key={loopKey}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    {project.video && project.video.includes("loom.com/share") ? (
                                        <iframe
                                            src={project.video.replace("loom.com/share/", "loom.com/embed/") + "?autoplay=1&muted=1&preload=1&hide_owner=true&hide_share=true&hide_title=true&hide_embed_code=true"}
                                            frameBorder="0"
                                            allowFullScreen
                                            className="h-full w-full object-cover"
                                        />
                                    ) : project.video ? (
                                        <video
                                            ref={videoRef}
                                            src={project.video}
                                            muted
                                            playsInline
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={project.image || ""}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    )}
                                    {/* Glassmorphism Progress Bar - Only for direct video */}
                                    {!(project.video && project.video.includes("loom.com/share")) && project.video && (
                                        <div className="absolute bottom-6 left-8 right-8 h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                                            <motion.div
                                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Meta Section: Grounded Alignment */}
                    <div className={cn(
                        "flex flex-col p-4 md:p-6 transition-all duration-700 ease-in-out relative flex-1 z-30 overflow-hidden",
                        isFocused ? "bg-black justify-start pt-4" : "bg-transparent justify-end"
                    )}>
                        {/* Shifting Title: Optimized for Readability */}
                        <div className="flex flex-col gap-2 w-full">
                            <div className="min-h-[calc(3 * 1.25 * 1rem)] md:min-h-[calc(2 * 1.3 * 1.5rem)] flex items-center">
                                <motion.h3
                                    className="font-heading font-semibold text-white leading-[1.25] tracking-tight line-clamp-3"
                                    style={{ originX: 0, originY: 1 }}
                                    animate={{
                                        fontSize: isFocused ? "calc(1.1rem + 0.5vw)" : "calc(2.5rem + 2vw)",
                                        textAlign: "left"
                                    }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {project.title}
                                </motion.h3>
                            </div>

                            {/* Fading Metadata Content */}
                            <AnimatePresence mode="wait">
                                {isFocused && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="mt-1 flex flex-col gap-2"
                                    >
                                        <div className="min-h-0">
                                            <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed w-full line-clamp-3 md:line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="mt-0 flex items-center justify-between gap-4 pt-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {/* Categories as chips - Luxe Minimalist Styling */}
                                                {project.category && project.category.split(',').slice(0, 2).map(cat => (
                                                    <span key={cat.trim()} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/90 font-bold whitespace-nowrap backdrop-blur-sm shadow-sm transition-colors hover:bg-white/10">
                                                        {cat.trim()}
                                                    </span>
                                                ))}
                                                {/* Filtered Tags */}
                                                {project.tags.slice(0, 1).map(tag => (
                                                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold whitespace-nowrap backdrop-blur-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex-shrink-0">
                                                <div className="group/btn relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-110 hover:bg-neutral-100">
                                                    <ArrowRight className="w-6 h-6 md:w-7 md:h-7 -rotate-45 transition-transform group-hover/btn:rotate-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link >
    );
}
