"use client";

import { useState } from "react";
import { Plus, Search, Grid, List as ListIcon } from "lucide-react";

const categories = [
    "All Media",
    "Photos",
    "Videos",
    "SVGs",
    "GIF",
    "Audio",
];

export default function MediaPage() {
    const [activeCategory, setActiveCategory] = useState("All Media");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Media</h1>
                    <p className="text-sm text-neutral-500 mt-1">Manage and organize your portfolio assets.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors">
                    <Plus className="w-4 h-4" />
                    Create
                </button>
            </div>

            {/* Horizontal Navigation */}
            <div className="flex items-center justify-between border-b border-white/[0.06]">
                <div className="flex items-center gap-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`pb-4 text-sm font-medium transition-all relative ${activeCategory === category
                                    ? "text-white"
                                    : "text-neutral-500 hover:text-neutral-300"
                                }`}
                        >
                            {category}
                            {activeCategory === category && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 pb-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all w-48"
                        />
                    </div>
                </div>
            </div>

            {/* Empty State / Grid container */}
            <div className="min-h-[400px] rounded-2xl border border-dashed border-white/[0.06] flex flex-col items-center justify-center text-center p-12">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4">
                    <Grid className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="text-lg font-medium text-white">No {activeCategory.toLowerCase()} found</h3>
                <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                    Start by uploading your first asset or use the "Create" button to add new content.
                </p>
            </div>
        </div>
    );
}
