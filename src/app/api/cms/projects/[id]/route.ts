import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
    getProject,
    getProjectContent,
    updateProject,
    deleteProject,
    restoreProject,
    type ProjectInput,
} from "@/lib/cms/storage";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const project = await getProject(id);
    if (!project)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

    const content = await getProjectContent(id);
    return NextResponse.json({ ...project, content });
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    try {
        const body = await req.json();
        const { content, ...updates } = body;
        const project = await updateProject(id, updates as Partial<ProjectInput>, content);
        if (!project)
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const deleted = await deleteProject(id);
    if (!deleted)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
}

// PATCH — restore from archive
export async function PATCH(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const project = await restoreProject(id);
    if (!project)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
}
