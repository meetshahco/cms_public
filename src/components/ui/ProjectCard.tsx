"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        category: string;
        description: string;
        tags: string[];
        color: string;
        hoverBorder: string;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className={cn(
                "group relative p-8 rounded-3xl bg-neutral-900/50 border border-white/5 overflow-hidden transition-all duration-300",
                project.hoverBorder
            )}
        >
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                project.color
            )} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        {project.category}
                    </span>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold mb-3 font-outfit">{project.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
