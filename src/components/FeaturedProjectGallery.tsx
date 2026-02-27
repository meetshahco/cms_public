"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import type { Project } from "@/lib/cms/storage";

export function FeaturedProjectGallery({ projects }: { projects: Project[] }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    if (projects.length === 0) return null;

    return (
        <section className="relative overflow-visible px-6 md:px-12 py-32">
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-20 lg:gap-24">
                    {projects.map((project, index) => (
                        <div key={project.id} className="relative z-0 hover:z-[999]">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                animate={{
                                    filter: hoveredId && hoveredId !== project.id
                                        ? "blur(15px) grayscale(0.6)"
                                        : "blur(0px) grayscale(0)",
                                    opacity: hoveredId && hoveredId !== project.id ? 0.4 : 1,
                                    scale: hoveredId && hoveredId !== project.id ? 0.95 : 1
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.25, 1, 0.5, 1],
                                    delay: index * 0.1
                                }}
                            >
                                <FeaturedProjectCard
                                    project={project}
                                    onHoverStart={() => setHoveredId(project.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    isHovered={hoveredId === project.id}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
