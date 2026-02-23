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

// Helper for Cover Image Uploads
async function uploadFile(file: File): Promise<{ url: string; type: string } | null> {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const res = await fetch("/api/cms/upload", { method: "POST", body: formData });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

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

    const [isDraggingCover, setIsDraggingCover] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);

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

    const handleCoverDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingCover(false);

        const file = e.dataTransfer?.files?.[0];
        if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
            setUploadingCover(true);
            const res = await uploadFile(file);
            if (res) {
                setCoverImage(res.url);
            }
            setUploadingCover(false);
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

            {/* Cover Image Dropzone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingCover(true); }}
                onDragLeave={() => setIsDraggingCover(false)}
                onDrop={handleCoverDrop}
                className={`relative w-full aspect-[8/12] max-h-[400px] md:aspect-video md:max-h-[500px] rounded-3xl mb-8 overflow-hidden transition-all flex flex-col items-center justify-center cursor-pointer border-2 ${isDraggingCover ? "border-blue-500 bg-blue-500/10" : coverImage ? "border-transparent" : "border-dashed border-white/20 hover:border-white/40 hover:bg-white/5"
                    }`}
            >
                {coverImage ? (
                    <>
                        <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover z-0" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20 gap-3">
                            <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md pointer-events-none">Change Cover Image</span>
                            <div className="flex gap-2">
                                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const url = prompt("Paste external image URL:"); if (url) setCoverImage(url); }} className="px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white text-xs rounded-lg transition-colors backdrop-blur-md border border-white/10">Paste Link</button>
                                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open("/admin/media", "_blank"); }} className="px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white text-xs rounded-lg transition-colors backdrop-blur-md border border-white/10">Media Library</button>
                                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCoverImage(""); }} className="px-3 py-1.5 bg-red-500/50 hover:bg-red-500/70 text-white text-xs rounded-lg transition-colors backdrop-blur-md border border-white/10">Remove</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-6 z-20 relative pointer-events-none">
                        <div className="w-8 h-8 rounded-full border border-white/20 mx-auto mb-3 flex items-center justify-center">
                            <span className="text-xl leading-none text-neutral-400">+</span>
                        </div>
                        <p className="text-sm font-medium text-neutral-300">Add Cover Image</p>
                        <p className="text-xs text-neutral-500 mt-1 mb-4">Drag & drop or click to attach from computer</p>
                        <div className="flex items-center justify-center gap-2 pointer-events-auto">
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); const url = prompt("Paste external image URL:"); if (url) setCoverImage(url); }} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors border border-white/10">Paste Link</button>
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open("/admin/media", "_blank"); }} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors border border-white/10">Media Library</button>
                        </div>
                    </div>
                )}

                {/* Fallback hidden input for click-to-upload */}
                <input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setUploadingCover(true);
                            const res = await uploadFile(file);
                            if (res) setCoverImage(res.url);
                            setUploadingCover(false);
                        }
                    }}
                />

                {uploadingCover && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                )}
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

            {/* Divider */}
            <div className="border-t border-white/[0.06] mb-8" />

            {/* Editor */}
            <Editor content="" onChange={setContent} />
        </div>
    );
}
