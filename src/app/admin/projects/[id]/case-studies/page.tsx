"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, FileText, ArrowLeft } from "lucide-react";
import { adminPath } from "@/lib/admin-utils";

interface CaseStudy {
    slug: string;
    title: string;
    description: string;
    status: string;
    publishedAt: string;
}

export default function CaseStudiesPage() {
    const params = useParams();
    const projectId = params.id as string;
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectTitle, setProjectTitle] = useState("");

    useEffect(() => {
        // Fetch project title
        fetch(`/api/cms/projects/${projectId}`)
            .then((res) => res.json())
            .then((data) => setProjectTitle(data.title || projectId));

        // Fetch case studies
        fetch(`/api/cms/case-studies?parentProject=${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                setCaseStudies(data);
                setLoading(false);
            });
    }, [projectId]);

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this case study?")) return;
        await fetch(`/api/cms/case-studies?slug=${slug}`, { method: "DELETE" });
        setCaseStudies(caseStudies.filter((cs) => cs.slug !== slug));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <Link
                    href={adminPath("/projects")}
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Projects
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {projectTitle}
                        </h1>
                        <p className="text-sm text-neutral-500 mt-1">
                            {caseStudies.length} case {caseStudies.length !== 1 ? "studies" : "study"}
                        </p>
                    </div>
                    <Link
                        href={adminPath(`/projects/${projectId}/case-studies/new`)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Case Study
                    </Link>
                </div>
            </div>

            {caseStudies.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-16 text-center">
                    <FileText className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-300 mb-2">
                        No case studies yet
                    </h3>
                    <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                        Write your first case study for this project.
                    </p>
                    <Link
                        href={adminPath(`/projects/${projectId}/case-studies/new`)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Write Case Study
                    </Link>
                </div>
            )}

            {caseStudies.length > 0 && (
                <div className="space-y-3">
                    {caseStudies.map((cs) => (
                        <div
                            key={cs.slug}
                            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-semibold text-white truncate">
                                            {cs.title}
                                        </h3>
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${cs.status === "published"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-amber-500/10 text-amber-400"
                                                }`}
                                        >
                                            {cs.status}
                                        </span>
                                    </div>
                                    {cs.description && (
                                        <p className="text-sm text-neutral-500 line-clamp-1">
                                            {cs.description}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                                    <Link
                                        href={adminPath(`/projects/${projectId}/case-studies/${cs.slug}/edit`)}
                                        className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(cs.slug)}
                                        className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
