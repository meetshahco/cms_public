import { NextRequest, NextResponse } from "next/server";

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "admin.meetshah.co";

function isAdminHost(hostname: string): boolean {
    return (
        hostname === ADMIN_DOMAIN ||
        hostname.startsWith("admin.localhost")
    );
}

export function proxy(request: NextRequest) {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminHost(hostname)) {
        // Skip internal Next.js routes and static assets
        if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
            return NextResponse.next();
        }

        // API routes: allow through without rewriting
        if (pathname.startsWith("/api/")) {
            return NextResponse.next();
        }

        // Prevent double-prefixing: admin.meetshah.co/admin/... → admin.meetshah.co/...
        if (pathname.startsWith("/admin")) {
            const cleanPath = pathname.replace(/^\/admin/, "") || "/";
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }

        // Rewrite: admin.meetshah.co/projects → internally serves /admin/projects
        // Auth is handled by next-auth's authorized callback on the rewritten path
        const adminPath = pathname === "/" ? "/admin" : `/admin${pathname}`;
        const url = request.nextUrl.clone();
        url.pathname = adminPath;

        return NextResponse.rewrite(url);
    }

    // ─── Main domain: redirect /admin/* to subdomain ──
    if (pathname.startsWith("/admin")) {
        const adminSubPath = pathname.replace(/^\/admin/, "") || "/";
        return NextResponse.redirect(
            new URL(`https://${ADMIN_DOMAIN}${adminSubPath}`)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
