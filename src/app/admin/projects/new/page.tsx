"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { adminPath } from "@/lib/admin-utils";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
    ssr: false,
    loading: () => (
        <div className="h-64 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
    ),
});

export default function NewProjectPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [content, setContent] = useState("");
    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        tags: [] as string[],
        image: "",
        video: "",
        metrics: [] as { label: string; value: string }[],
        starred: false,
        status: "draft" as "draft" | "published",
    });

    const handleSubmit = async () => {
        if (!form.title.trim()) return;
        setSaving(true);

        const res = await fetch("/api/cms/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, content }),
        });

        if (res.ok) {
            router.push(adminPath("/projects"));
        } else {
            setSaving(false);
            alert("Failed to create project");
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
    };

    const addMetric = () => {
        setForm({ ...form, metrics: [...form.metrics, { label: "", value: "" }] });
    };

    const updateMetric = (i: number, field: "label" | "value", val: string) => {
        const updated = [...form.metrics];
        updated[i][field] = val;
        setForm({ ...form, metrics: updated });
    };

    const removeMetric = (i: number) => {
        setForm({ ...form, metrics: form.metrics.filter((_, idx) => idx !== i) });
    };

    const inputClass =
        "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all";

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href={adminPath("/projects")}
                        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Projects
                    </Link>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        New Project
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.starred}
                                onChange={(e) =>
                                    setForm({ ...form, starred: e.target.checked })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500/60" />
                        </label>
                        <span className="text-xs text-neutral-400">Starred</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={saving || !form.title.trim()}
                        className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </div>

            {/* Title */}
            <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Project title..."
                className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none placeholder-neutral-700 mb-2"
            />

            {/* Description */}
            <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description..."
                className="w-full text-lg text-neutral-400 bg-transparent border-none outline-none placeholder-neutral-700 mb-6"
            />

            {/* Meta fields - collapsible */}
            <details className="mb-8 group">
                <summary className="text-xs text-neutral-500 uppercase tracking-wider font-medium cursor-pointer hover:text-neutral-400 transition-colors select-none">
                    Project Settings ▸
                </summary>
                <div className="mt-4 space-y-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                                Category
                            </label>
                            <input
                                type="text"
                                value={form.category}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                                className={inputClass}
                                placeholder="e.g. FinTech"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className={inputClass}
                                placeholder="/uploads/cover.jpg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                            Preview Video URL
                        </label>
                        <input
                            type="text"
                            value={form.video}
                            onChange={(e) => setForm({ ...form, video: e.target.value })}
                            className={inputClass}
                            placeholder="Video for hover preview"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {form.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-white text-xs"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-neutral-500 hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag();
                                }
                            }}
                            className={inputClass}
                            placeholder="Add tag, press Enter"
                        />
                    </div>

                    {/* Metrics */}
                    <div>
                        <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                            Metrics
                        </label>
                        <div className="space-y-2 mb-2">
                            {form.metrics.map((m, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={m.label}
                                        onChange={(e) => updateMetric(i, "label", e.target.value)}
                                        className={inputClass}
                                        placeholder="Label"
                                    />
                                    <input
                                        type="text"
                                        value={m.value}
                                        onChange={(e) => updateMetric(i, "value", e.target.value)}
                                        className={inputClass}
                                        placeholder="Value"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeMetric(i)}
                                        className="p-2 text-neutral-500 hover:text-red-400 flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addMetric}
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add Metric
                        </button>
                    </div>
                </div>
            </details>

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-8" />

            {/* Editor */}
            <Editor content="" onChange={setContent} placeholder="Write your project story... Type '/' for commands" />
        </div>
    );
}
