import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listProjects, listArchivedProjects, createProject, type ProjectInput } from "@/lib/cms/storage";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const archived = searchParams.get("archived") === "true";
    const projects = archived ? await listArchivedProjects() : await listProjects();
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { content, ...meta } = body;
        const project = await createProject(meta as ProjectInput, content);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
