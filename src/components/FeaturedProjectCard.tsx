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
                className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 group shadow-2xl"
                whileHover={{
                    scale: 1.3,
                    zIndex: 999,
                    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
                }}
                layout
            >
                {/* Resting State: Full-bleed Thumbnail + Scrim */}
                <div className="absolute inset-0 z-0">
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700",
                                isFocused ? "opacity-0 invisible" : "opacity-100 visible"
                            )}
                            priority
                        />
                    )}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                        isFocused ? "opacity-0" : "opacity-100"
                    )} />
                </div>

                {/* Hover State: The 16-Unit Vertical Split (9:7) */}
                <div className="absolute inset-0 flex flex-col z-10">
                    {/* Top Section: The Theater (9 Units / 56.25%) */}
                    <div className="relative h-[56.25%] w-full overflow-hidden bg-black">
                        <AnimatePresence>
                            {isFocused && project.video && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0"
                                >
                                    <video
                                        ref={videoRef}
                                        src={project.video}
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Progress Bar */}
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-white/30 w-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Section: The Metadata (7 Units / 43.75%) */}
                    <div className={cn(
                        "flex flex-col justify-end p-6 md:p-8 bg-neutral-950 transition-all duration-500 ease-in-out",
                        isFocused ? "h-[43.75%] opacity-100" : "h-full bg-transparent"
                    )}>
                        {/* Shifting Title */}
                        <motion.h3
                            layout
                            className={cn(
                                "font-heading font-extrabold text-white leading-tight tracking-tighter",
                                isFocused
                                    ? "text-lg md:text-xl text-left"
                                    : "text-4xl md:text-5xl text-center absolute inset-0 flex items-center justify-center p-8 pointer-events-none drop-shadow-2xl"
                            )}
                            style={{ originX: 0, originY: 1 }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Fading Metadata Content */}
                        <AnimatePresence>
                            {isFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="mt-4 w-full"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold whitespace-nowrap">
                                                    {project.tags[0] || "Design"}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold whitespace-nowrap">
                                                    {new Date(project.createdAt).getFullYear()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-400 font-medium truncate opacity-60">
                                                {project.description.slice(0, 45)}...
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg transition-transform hover:scale-110">
                                                <ArrowRight className="w-5 h-5 -rotate-45" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
