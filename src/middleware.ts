import { NextRequest, NextResponse } from "next/server";

// Hardcoding for production to ensure it works even if env vars are missing
const ADMIN_DOMAIN = "admin.meetshah.co";

function isAdminHost(hostname: string): boolean {
    return (
        hostname === ADMIN_DOMAIN ||
        hostname.startsWith("admin.localhost") ||
        hostname.includes("admin.meetshah.co")
    );
}

export default function middleware(request: NextRequest) {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminHost(hostname)) {
        // Skip internal Next.js routes and static assets
        if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
            return NextResponse.next();
        }

        // API routes: allow through (they don't need path rewriting)
        if (pathname.startsWith("/api/")) {
            return NextResponse.next();
        }

        // Prevent double-prefixing: if someone visits admin.meetshah.co/admin/...
        // redirect them to admin.meetshah.co/... (strip the /admin prefix)
        if (pathname.startsWith("/admin")) {
            const cleanPath = pathname.replace(/^\/admin/, "") || "/";
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }

        // Rewrite: admin.meetshah.co/any-path -> /admin/any-path
        const adminPath = pathname === "/" ? "/admin" : `/admin${pathname}`;
        const url = request.nextUrl.clone();
        url.pathname = adminPath;

        return NextResponse.rewrite(url);
    }

    // ─── Main domain: redirect /admin access to subdomain ──
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
