"use client";
import { projects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

export function ProjectGallery() {
    return (
        <section className="py-24 px-4 md:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
