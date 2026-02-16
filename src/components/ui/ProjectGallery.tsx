"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectModal } from "./ProjectModal";

// Mock Data matching the user's previous context
export const PROJECTS = [
    {
        id: "kwikpay",
        title: "KwikPay",
        category: "Fintech",
        description: "Simplifying payments for the next billion users.",
        tags: ["UX Design", "Mobile App"],
        color: "from-blue-600 to-indigo-900",
        video: "https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4", // Placeholder payment/tech video
    },
    {
        id: "netflix",
        title: "Netflix Interactions",
        category: "Concept",
        description: "Reimagining the content discovery experience with fluid motion.",
        tags: ["Interaction", "Prototyping"],
        color: "from-red-600 to-black",
        video: "https://videos.pexels.com/video-files/5077283/5077283-sd_640_360_25fps.mp4", // Abstract dark video
    },
    {
        id: "bob",
        title: "Bank of Baroda",
        category: "Banking",
        description: "Modernizing legacy banking interfaces for a digital-first era.",
        tags: ["Design System", "Enterprise"],
        color: "from-orange-600 to-amber-800",
        video: "https://videos.pexels.com/video-files/3163534/3163534-sd_640_360_30fps.mp4", // Office/working video
    }
];

export function ProjectGallery() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <section id="work" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-10">Selected Work</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                    <motion.div
                        key={project.id}
                        layoutId={`card-${project.id}`}
                        onClick={() => setSelectedProject(project.id)}
                        onMouseEnter={() => setActiveId(project.id)}
                        onMouseLeave={() => setActiveId(null)}
                        className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10"
                    >
                        {/* Background Image / Color */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-300", project.color, activeId === project.id ? "opacity-20" : "opacity-10")} />

                        {/* Video Preview (Netflix Style) */}
                        <div className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            activeId === project.id ? "opacity-100" : "opacity-0"
                        )}>
                            <video
                                src={project.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-60 mix-blend-screen"
                            />
                        </div>

                        {/* Content Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <motion.div layoutId={`title-${project.id}`}>
                                <h3 className="text-2xl font-bold font-outfit mb-2 group-hover:scale-105 transition-transform origin-bottom-left">
                                    {project.title}
                                </h3>
                            </motion.div>

                            <motion.p
                                className="text-sm text-gray-300 line-clamp-2 mb-4 group-hover:text-white transition-colors"
                            >
                                {project.description}
                            </motion.p>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                                <span className="p-2 bg-white text-black rounded-full">
                                    <Play className="w-4 h-4 fill-current" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider">View Case Study</span>
                            </div>
                        </div>

                        {/* Hover Glow Border */}
                        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
