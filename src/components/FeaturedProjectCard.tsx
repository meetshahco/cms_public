"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
        if (isFocused && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.log("Video play failed", e));

            const duration = 7000; // 7 seconds
            const start = Date.now();

            interval = setInterval(() => {
                const elapsed = Date.now() - start;
                const newProgress = (elapsed % duration) / duration;
                setProgress(newProgress * 100);

                if (videoRef.current && videoRef.current.currentTime >= 7) {
                    videoRef.current.currentTime = 0;
                }
            }, 16);
        }
        return () => {
            if (interval) clearInterval(interval);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [isFocused]);

    return (
        <Link href={`/work/${project.id}`}>
            <motion.div
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                className="relative min-h-[500px] md:min-h-[650px] w-full rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 group border border-white/5 shadow-2xl transition-all duration-500"
                whileHover={{
                    scale: 1.02, // Less aggressive scale for full-width cards
                    zIndex: 999,
                    borderColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.05)",
                    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
                }}
                layout
            >
                {/* Resting State: Full-bleed Thumbnail (Top-aligned) */}
                <div className="absolute inset-0 z-0">
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className={cn(
                                "object-cover object-top transition-all duration-1000 ease-out",
                                isFocused ? "scale-105 opacity-0 invisible" : "scale-100 opacity-100 visible"
                            )}
                            priority
                        />
                    )}

                    {/* Sophisticated Multi-stop Scrim for Readability */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700",
                        isFocused ? "opacity-0" : "opacity-100"
                    )} />
                </div>

                {/* Hover State: The Theater Transition */}
                <div className="absolute inset-0 flex flex-col z-10">
                    {/* Top Section: The Theater (Cinematic 16:9 slot) */}
                    <div className={cn(
                        "relative w-full overflow-hidden bg-black transition-all duration-700 ease-[0.25, 1, 0.5, 1]",
                        isFocused ? "h-[65%] opacity-100" : "h-0 opacity-0"
                    )}>
                        <AnimatePresence>
                            {isFocused && project.video && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <video
                                        ref={videoRef}
                                        src={project.video}
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Glassmorphism Progress Bar */}
                                    <div className="absolute bottom-6 left-8 right-8 h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                                        <motion.div
                                            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Meta Section: Grounded Alignment */}
                    <div className={cn(
                        "flex flex-col justify-end p-8 md:p-14 lg:p-20 transition-all duration-700 ease-in-out relative flex-1",
                        isFocused ? "bg-neutral-950/90 backdrop-blur-xl" : "bg-transparent"
                    )}>
                        {/* Shifting Title: Optimized for Readability */}
                        <motion.div layout className="flex flex-col gap-2 max-w-4xl">
                            <motion.h3
                                className={cn(
                                    "font-heading font-extrabold text-white leading-[0.9] tracking-tighter transition-all duration-500",
                                    isFocused
                                        ? "text-4xl md:text-5xl lg:text-6xl text-left"
                                        : "text-5xl md:text-7xl lg:text-8xl text-left"
                                )}
                            >
                                {project.title}
                            </motion.h3>

                            {/* Fading Metadata Content */}
                            <AnimatePresence>
                                {isFocused && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="mt-6 flex flex-col gap-6"
                                    >
                                        <div className="flex items-center gap-4 flex-wrap">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold whitespace-nowrap backdrop-blur-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
                                                {new Date(project.createdAt).getFullYear()}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-12">
                                            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl line-clamp-2">
                                                {project.description}
                                            </p>

                                            <div className="flex-shrink-0">
                                                <div className="group/btn relative w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-110 hover:bg-neutral-100">
                                                    <ArrowRight className="w-8 h-8 -rotate-45 transition-transform group-hover/btn:rotate-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Ambient Glow Background (Inside card) */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-white/5 to-transparent pointer-events-none opacity-50" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
