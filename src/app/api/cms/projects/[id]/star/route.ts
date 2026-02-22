import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { toggleProjectStar } from "@/lib/cms/storage";

export async function PATCH(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const project = await toggleProjectStar(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
}
