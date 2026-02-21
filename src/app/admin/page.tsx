import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderKanban, Star, FileText, Plus } from "lucide-react";
import { getStats } from "@/lib/cms/storage";
import { adminPath } from "@/lib/admin-utils";

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) redirect(adminPath("/login"));

    const stats = await getStats();

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Dashboard
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Welcome back, {session.user?.name || "Admin"}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <FolderKanban className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                            Projects
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                            Starred
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.starredProjects}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                            Case Studies
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.totalCaseStudies}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
                    Quick Actions
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={adminPath("/projects/new")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                    <Link
                        href={adminPath("/projects")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                        <FolderKanban className="w-4 h-4" />
                        View Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
