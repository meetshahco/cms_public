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
    const url = request.nextUrl.clone();
    const hostname = request.headers.get("host") || "";
    const xForwardedHost = request.headers.get("x-forwarded-host");

    // Check hostname from various sources for robustness
    const currentHost = xForwardedHost || hostname || url.hostname;
    const pathname = url.pathname;

    const isAdminSubdomain =
        currentHost === ADMIN_DOMAIN ||
        currentHost.startsWith("admin.localhost") ||
        currentHost.endsWith(`.${ADMIN_DOMAIN}`) ||
        currentHost.includes("admin.meetshah.co");

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminSubdomain) {
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
        url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
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
