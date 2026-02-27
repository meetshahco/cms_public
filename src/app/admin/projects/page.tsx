"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Plus,
    Star,
    Trash2,
    FolderKanban,
    Archive,
    RotateCcw,
    ChevronDown,
} from "lucide-react";
import { adminPath } from "@/lib/admin-utils";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    starred: boolean;
    status: "draft" | "published";
    image: string;
    createdAt: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [archived, setArchived] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);

    const fetchProjects = async () => {
        const [res, archivedRes] = await Promise.all([
            fetch("/api/cms/projects"),
            fetch("/api/cms/projects?archived=true"),
        ]);
        const data = await res.json();
        const archivedData = await archivedRes.json();
        setProjects(data);
        setArchived(archivedData);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await fetch(`/api/cms/projects/${id}`, { method: "DELETE" });
        fetchProjects();
    };

    const handleRestore = async (id: string) => {
        await fetch(`/api/cms/projects/${id}`, { method: "PATCH" });
        fetchProjects();
    };

    const handleToggleStar = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await fetch(`/api/cms/projects/${id}/star`, { method: "PATCH" });
        fetchProjects();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Projects
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link
                    href={adminPath("/projects/new")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </Link>
            </div>

            {projects.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-16 text-center">
                    <FolderKanban className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-300 mb-2">
                        No projects yet
                    </h3>
                    <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                        Create your first project to start building your portfolio.
                    </p>
                    <Link
                        href={adminPath("/projects/new")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Project
                    </Link>
                </div>
            )}

            {projects.length > 0 && (
                <div className="space-y-2">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={adminPath(`/projects/${project.id}/edit`)}
                            className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all"
                        >
                            <div className="flex items-center gap-4">
                                {project.image && (
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-white truncate">
                                            {project.title}
                                        </h3>
                                        {project.category && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 uppercase tracking-wider font-medium flex-shrink-0">
                                                {project.category}
                                            </span>
                                        )}
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium flex-shrink-0 ${project.status === "published"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-amber-500/10 text-amber-400"
                                                }`}
                                        >
                                            {project.status === "published" ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                    {project.description && (
                                        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                                            {project.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                    <button
                                        onClick={(e) => handleToggleStar(project.id, e)}
                                        className={`p-1.5 rounded-lg transition-colors ${project.starred
                                            ? "text-amber-400 bg-amber-500/10"
                                            : "text-neutral-500 hover:text-amber-400 hover:bg-amber-500/10"
                                            }`}
                                        title={
                                            project.starred ? "Unstar" : "Feature on homepage"
                                        }
                                    >
                                        <Star
                                            className="w-3.5 h-3.5"
                                            fill={project.starred ? "currentColor" : "none"}
                                        />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(project.id, e)}
                                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                        title="Archive"
                                    >
                                        <Archive className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* ─── Archived Section ─────────────────────────── */}
            {archived.length > 0 && (
                <div className="mt-10">
                    <button
                        onClick={() => setShowArchived(!showArchived)}
                        className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-400 transition-colors uppercase tracking-wider font-medium mb-3"
                    >
                        <Archive className="w-3.5 h-3.5" />
                        Archived ({archived.length})
                        <ChevronDown
                            className={`w-3 h-3 transition-transform ${showArchived ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {showArchived && (
                        <div className="space-y-1.5">
                            {archived.map((project) => (
                                <div
                                    key={project.id}
                                    className="group flex items-center gap-4 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 opacity-60 hover:opacity-80 transition-opacity"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm text-neutral-400 truncate">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => handleRestore(project.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        Restore
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
