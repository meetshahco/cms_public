"use client";

import { useState, useEffect } from "react";
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

export default function EditCaseStudyPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;
    const caseStudySlug = params.slug as string;

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`/api/cms/case-studies?slug=${caseStudySlug}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title || "");
                setDescription(data.description || "");
                setCoverImage(data.coverImage || "");
                setStatus(data.status || "draft");
                setContent(data.content || "");
                setLoading(false);
            })
            .catch(() => {
                router.push(adminPath(`/projects/${projectId}/case-studies`));
            });
    }, [caseStudySlug, projectId, router]);

    const handleSave = async () => {
        setSaving(true);

        const res = await fetch("/api/cms/case-studies", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                slug: caseStudySlug,
                title,
                description,
                coverImage,
                parentProject: projectId,
                status,
                content,
            }),
        });

        if (res.ok) {
            router.push(adminPath(`/projects/${projectId}/case-studies`));
        } else {
            setSaving(false);
            alert("Failed to save");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const inputClass =
        "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all";

    return (
        <div className="max-w-4xl">
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
                        Edit Case Study
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
                        disabled={saving}
                        className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Case study title..."
                className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none placeholder-neutral-700 mb-2"
            />

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                className="w-full text-lg text-neutral-400 bg-transparent border-none outline-none placeholder-neutral-700 mb-6"
            />

            <div className="mb-8">
                <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Cover image URL (optional)"
                    className={inputClass}
                />
            </div>

            <div className="border-t border-white/[0.06] mb-8" />

            <Editor content={content} onChange={setContent} />
        </div>
    );
}
