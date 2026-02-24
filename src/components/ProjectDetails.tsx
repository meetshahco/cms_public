"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project, CaseStudy } from "@/lib/cms/storage";

interface ProjectDetailsProps {
    project: Project;
    content: string;
    caseStudies: CaseStudy[];
}

export function ProjectDetails({ project, content, caseStudies }: ProjectDetailsProps) {
    return (
        <div className="min-h-screen w-full bg-black">
            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-black/50 backdrop-blur-md border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Works</span>
                </Link>
            </div>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 px-6 md:px-12 lg:px-24"
            >
                {/* Background Video */}
                {project.video && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                )}

                {project.image && !project.video && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        {/* Fallback to image if no video */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
                    </div>
                )}

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                            {project.category}
                        </span>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Main Content Area */}
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-20 pb-40">
                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-24 grid grid-cols-2 gap-4 md:grid-cols-4"
                    >
                        {project.metrics.map((metric, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={metric.label}
                                className="rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition-colors"
                            >
                                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{metric.value}</p>
                                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider">{metric.label}</p>
                            </motion.div>
                        ))}
                    </motion.section>
                )}

                {/* Rich Text Content */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="prose prose-invert prose-lg md:prose-xl max-w-none mb-32 prose-headings:font-heading prose-headings:font-bold prose-headings:text-white text-neutral-300 prose-a:text-blue-400 hover:prose-a:text-blue-300"
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </motion.section>

                {/* Case Studies */}
                {caseStudies.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-12 font-heading text-4xl font-bold text-white">Key Case Studies</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {caseStudies.map((study, i) => (
                                <Link key={study.slug} href={`/work/${project.id}/${study.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                        className="group cursor-pointer rounded-3xl border border-white/5 bg-white/5 p-4 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2"
                                    >
                                        <div className="aspect-[4/3] w-full rounded-2xl bg-neutral-800 mb-6 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <div className="flex justify-between items-start px-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{study.title}</h3>
                                                <p className="text-sm text-neutral-400 mt-2 line-clamp-2 leading-relaxed">{study.description}</p>
                                            </div>
                                            <div className="ml-4 mt-1 rounded-full bg-white/10 p-2 group-hover:bg-white transition-colors duration-300">
                                                <ArrowRight className="h-4 w-4 text-white group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
