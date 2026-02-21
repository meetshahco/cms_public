import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/cms/storage";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const settings = await getSettings();
    return NextResponse.json(settings);
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const settings = await updateSettings(body);
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
