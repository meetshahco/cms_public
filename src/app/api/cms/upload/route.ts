import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const maxDuration = 60; // Extend duration for large files

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: `File type ${file.type} not allowed` },
                { status: 400 }
            );
        }

        // Generate unique filename
        const ext = file.name.split(".").pop() || "bin";
        const timestamp = Date.now();
        const safeName = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .toLowerCase()
            .slice(0, 50);
        const filename = `${safeName}-${timestamp}.${ext}`;

        let url = "";
        let fileType = "image";
        if (file.type.startsWith("video/")) {
            fileType = "video";
        } else if (file.type.includes("pdf") || file.type.includes("presentation") || file.type.includes("powerpoint")) {
            fileType = "document";
        }

        // Use Vercel Blob if token is present
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(filename, file, {
                access: "public",
            });
            url = blob.url;
        } else {
            // Local fallback
            if (!existsSync(UPLOAD_DIR)) {
                await mkdir(UPLOAD_DIR, { recursive: true });
            }
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await writeFile(path.join(UPLOAD_DIR, filename), buffer);
            url = `/uploads/${filename}`;
        }

        return NextResponse.json({
            url,
            filename,
            type: fileType,
            size: file.size,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}
