"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ContactAnimationProvider } from "@/context/ContactAnimationContext";
import type { Project } from "@/lib/cms/storage";

export function WorkClient({ projects }: { projects: Project[] }) {
    return (
        <ContactAnimationProvider>
            <main className="min-h-screen bg-black text-white flex flex-col items-center p-6 sm:p-12 relative overflow-hidden">
                <Navbar />

                {/* Background ambient glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full max-w-5xl relative z-10 flex flex-col items-center mt-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 border border-white/5">
                            Selected Work
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                            Recent Projects.
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-md mx-auto">
                            A showcase of my recent work across product design and development.
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="w-full">
                        <ProjectGallery projects={projects} />
                    </div>
                </div>
            </main>
        </ContactAnimationProvider>
    );
}
