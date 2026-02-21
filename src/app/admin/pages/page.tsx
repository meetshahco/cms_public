"use client";

import { useState } from "react";
import { Plus, Layout } from "lucide-react";

const pageCategories = [
    "Home",
    "Work",
    "About",
    "Contact",
    "Legal",
];

export default function PagesManagement() {
    const [activePage, setActivePage] = useState("Home");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Pages</h1>
                    <p className="text-sm text-neutral-500 mt-1">Edit and manage your site's static content.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create
                </button>
            </div>

            {/* Horizontal Navigation */}
            <div className="flex items-center gap-8 border-b border-white/[0.06]">
                {pageCategories.map((page) => (
                    <button
                        key={page}
                        onClick={() => setActivePage(page)}
                        className={`pb-4 text-sm font-medium transition-all relative ${activePage === page
                                ? "text-white"
                                : "text-neutral-500 hover:text-neutral-300"
                            }`}
                    >
                        {page}
                        {activePage === page && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px] rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Layout className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">{activePage} Page</h2>
                        <p className="text-sm text-neutral-500">Configure sections and copy for the {activePage} route.</p>
                    </div>
                </div>

                {/* Editor Placeholder */}
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                                <div>
                                    <p className="text-sm font-medium text-neutral-300">Section {i}</p>
                                    <p className="text-xs text-neutral-600">Last updated 2 days ago</p>
                                </div>
                            </div>
                            <button className="text-xs text-neutral-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                Edit Section
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
