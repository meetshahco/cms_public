"use client";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/cms/storage";

export function ProjectGallery({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <section className="py-24 px-4 md:px-6 flex flex-col items-center justify-center min-h-[40vh] text-center">
                <div className="rounded-full bg-white/5 p-6 mb-6 border border-white/10">
                    <Layers className="w-12 h-12 text-neutral-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No projects yet.</h3>
                <p className="text-neutral-500 max-w-sm">
                    Start by creating and publishing your first project in the admin dashboard.
                </p>
                <Link
                    href="/admin/projects/new"
                    className="mt-8 px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors"
                >
                    Create Project
                </Link>
            </section>
        );
    }

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
