"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Using the same projects data (normally would import, but inlining for clarity in this snippet)
import { PROJECTS } from "./ProjectGallery";

export function ProjectModal({ projectId, onClose }: { projectId: string, onClose: () => void }) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-${projectId}`}
                className="w-full max-w-6xl h-full md:h-[90vh] bg-[#0F0F0F] rounded-3xl overflow-y-auto overflow-x-hidden relative border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all"
                >
                    <X size={24} />
                </button>

                {/* Hero Content (Video/Image) */}
                <div className="relative h-[50vh] w-full">
                    <video
                        src={project.video}
                        className="w-full h-full object-cover opacity-80"
                        autoPlay loop muted playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />

                    <div className="absolute bottom-8 left-8 md:left-12 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-white/10 backdrop-blur rounded-full border border-white/10"
                        >
                            {project.category}
                        </motion.span>
                        <motion.h2
                            layoutId={`title-${projectId}`}
                            className="text-5xl md:text-7xl font-bold font-outfit leading-tight mb-4"
                        >
                            {project.title}
                        </motion.h2>
                    </div>
                </div>

                {/* Details Content */}
                <div className="px-8 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="col-span-2 space-y-8">
                        <h3 className="text-2xl font-bold text-white/90">Overview</h3>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            {project.description} This is a placeholder for the full case study text.
                            It would describe the challenge, solution, and impact of the work done for {project.title}.
                            The design focuses on clarity, speed, and user delight.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-3xl font-bold mb-1">45%</div>
                                <div className="text-sm text-gray-500">Conversion Rate</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-3xl font-bold mb-1">2.4M</div>
                                <div className="text-sm text-gray-500">Active Users</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 space-y-8">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Role</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>Product Design</li>
                                <li>Interaction Prototyping</li>
                                <li>User Research</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">Timeline</h4>
                            <p className="text-gray-300">Aug 2025 - Present</p>
                        </div>

                        <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                            <span>View Live Project</span>
                            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}
