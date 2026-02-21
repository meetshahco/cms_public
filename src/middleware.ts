import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "admin.meetshah.co";

function isAdminHost(hostname: string): boolean {
    return (
        hostname === ADMIN_DOMAIN ||
        hostname.startsWith("admin.localhost")
    );
}

// Wrap middleware with next-auth's `auth` to get session info
export default auth((request) => {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;
    const isLoggedIn = !!request.auth?.user;

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminHost(hostname)) {
        // Skip internal Next.js routes and static assets
        if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
            return NextResponse.next();
        }

        // API routes: allow through (they don't need rewriting)
        if (pathname.startsWith("/api/")) {
            return NextResponse.next();
        }

        // Prevent double-prefixing: if someone visits admin.meetshah.co/admin/...
        // redirect them to admin.meetshah.co/... (strip the /admin prefix)
        if (pathname.startsWith("/admin")) {
            const cleanPath = pathname.replace(/^\/admin/, "") || "/";
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }

        // Auth checks for subdomain
        const isLoginPage = pathname === "/login";

        if (isLoginPage && isLoggedIn) {
            // Already logged in, redirect to dashboard
            return NextResponse.redirect(new URL("/", request.url));
        }

        if (!isLoginPage && !isLoggedIn) {
            // Not logged in, redirect to login
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Rewrite the URL to the /admin route internally
        // e.g., admin.meetshah.co/projects → serves /admin/projects
        const adminPath = pathname === "/" ? "/admin" : `/admin${pathname}`;
        const url = request.nextUrl.clone();
        url.pathname = adminPath;

        return NextResponse.rewrite(url);
    }

    // ─── Main domain: block /admin access, redirect to subdomain ──
    if (pathname.startsWith("/admin")) {
        const adminSubPath = pathname.replace(/^\/admin/, "") || "/";
        const protocol = request.nextUrl.protocol;
        return NextResponse.redirect(
            new URL(`${protocol}//${ADMIN_DOMAIN}${adminSubPath}`)
        );
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
