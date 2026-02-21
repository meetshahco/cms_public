import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
    listCaseStudies,
    createCaseStudy,
    getCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    getCaseStudyContent,
    type CaseStudyInput,
} from "@/lib/cms/storage";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const parentProject = searchParams.get("parentProject") || undefined;
    const slug = searchParams.get("slug");

    if (slug) {
        const cs = await getCaseStudy(slug);
        if (!cs) return NextResponse.json({ error: "Not found" }, { status: 404 });
        const content = await getCaseStudyContent(slug);
        return NextResponse.json({ ...cs, content });
    }

    const caseStudies = await listCaseStudies(parentProject);
    return NextResponse.json(caseStudies);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { content, ...meta } = body;
        const caseStudy = await createCaseStudy(meta as CaseStudyInput, content || "");
        return NextResponse.json(caseStudy, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { slug, content, ...updates } = body;
        const cs = await updateCaseStudy(slug, updates, content);
        if (!cs) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(cs);
    } catch {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const deleted = await deleteCaseStudy(slug);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
}
