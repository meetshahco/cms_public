"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { adminPath } from "@/lib/admin-utils";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
    ssr: false,
    loading: () => (
        <div className="h-96 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
    ),
});

export default function NewCaseStudyPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [content, setContent] = useState("");

    const handleSave = async () => {
        if (!title.trim()) return;
        setSaving(true);

        const res = await fetch("/api/cms/case-studies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                coverImage,
                parentProject: projectId,
                publishedAt: new Date().toISOString(),
                status,
                content,
            }),
        });

        if (res.ok) {
            router.push(adminPath(`/projects/${projectId}/case-studies`));
        } else {
            setSaving(false);
            alert("Failed to create case study");
        }
    };

    const inputClass =
        "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all";

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href={adminPath(`/projects/${projectId}/case-studies`)}
                        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Case Studies
                    </Link>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        New Case Study
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={saving || !title.trim()}
                        className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {/* Title */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Case study title..."
                className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none placeholder-neutral-700 mb-2"
            />

            {/* Description */}
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                className="w-full text-lg text-neutral-400 bg-transparent border-none outline-none placeholder-neutral-700 mb-6"
            />

            {/* Cover Image */}
            <div className="mb-8">
                <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Cover image URL (optional)"
                    className={inputClass}
                />
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-8" />

            {/* Editor */}
            <Editor content="" onChange={setContent} />
        </div>
    );
}
