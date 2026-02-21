import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Project, CaseStudy } from "@/lib/cms/storage";

interface ProjectDetailsProps {
    project: Project;
    content: string;
    caseStudies: CaseStudy[];
}

export function ProjectDetails({ project, content, caseStudies }: ProjectDetailsProps) {
    return (
        <div className="min-h-screen w-full bg-black/95 flex items-center justify-center p-4 md:p-8 lg:p-12 relative">
            <Link href="/" className="absolute inset-0 cursor-default" aria-label="Close" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-6xl bg-neutral-900/50 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
                <div className="overflow-y-auto h-full scrollbar-hide">
                    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
                        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Works</span>
                        </Link>
                        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="h-6 w-6 text-neutral-400 hover:text-white" />
                        </Link>
                    </div>

                    <div className="px-6 pb-24 md:px-12 pt-8">
                        <header className="mb-12">
                            <span className="mb-4 inline-block rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-sm text-neutral-400">
                                {project.category}
                            </span>
                            <h1 className="font-heading text-4xl font-bold md:text-6xl text-white leading-tight">{project.title}</h1>
                            <p className="mt-6 text-xl text-neutral-300 max-w-2xl leading-relaxed">{project.description}</p>
                        </header>

                        <section className="mb-16 overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video relative group shadow-2xl">
                            <video
                                src={project.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        </section>

                        <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
                            {project.metrics.map((metric) => (
                                <div key={metric.label} className="rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                                    <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                                    <p className="text-sm text-neutral-400">{metric.label}</p>
                                </div>
                            ))}
                        </section>

                        {/* Project Content (Dynamic TipTap HTML) */}
                        <section className="prose prose-invert prose-lg max-w-none mb-24">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </section>

                        {caseStudies.length > 0 && (
                            <section>
                                <h2 className="mb-8 font-heading text-3xl font-semibold text-white">Key Case Studies</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {caseStudies.map((study) => (
                                        <Link key={study.slug} href={`/work/${project.id}/${study.slug}`}>
                                            <div className="group cursor-pointer rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1">
                                                <div className="aspect-[4/3] w-full rounded-xl bg-neutral-800 mb-4 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 group-hover:scale-105 transition-transform duration-500" />
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{study.title}</h3>
                                                        <p className="text-sm text-neutral-500 mt-1">{study.description}</p>
                                                    </div>
                                                    <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
