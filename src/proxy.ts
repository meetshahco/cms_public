import { NextRequest, NextResponse } from "next/server";

const ADMIN_DOMAIN = "admin.meetshah.co";

function isAdminHost(hostname: string): boolean {
    return (
        hostname.includes("admin.") ||
        hostname.startsWith("admin.localhost")
    );
}

export function proxy(request: NextRequest) {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    const response = (function () {
        // ─── Subdomain routing ───────────────────────────────────
        if (isAdminHost(hostname)) {
            // Skip internal Next.js routes and static assets
            if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
                return NextResponse.next();
            }

            // API routes
            if (pathname.startsWith("/api/")) {
                return NextResponse.next();
            }

            // Prevent double-prefixing
            if (pathname.startsWith("/admin")) {
                const cleanPath = pathname.replace(/^\/admin/, "") || "/";
                return NextResponse.redirect(new URL(cleanPath, request.url));
            }

            // Rewrite: admin.meetshah.co / -> serves /admin
            const adminPath = pathname === "/" ? "/admin" : `/admin${pathname}`;
            const url = request.nextUrl.clone();
            url.pathname = adminPath;

            return NextResponse.rewrite(url);
        }

        // ─── Main domain: redirect /admin/* to subdomain ──
        if (pathname.startsWith("/admin")) {
            const adminSubPath = pathname.replace(/^\/admin/, "") || "/";
            // Hardcode to rule out env var issues for now
            return NextResponse.redirect(
                new URL(`https://${ADMIN_DOMAIN}${adminSubPath}`)
            );
        }

        return NextResponse.next();
    })();

    // Add debug headers
    response.headers.set("x-proxy-executed", "true");
    response.headers.set("x-proxy-host", hostname);
    response.headers.set("x-proxy-match", isAdminHost(hostname) ? "admin" : "main");

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
