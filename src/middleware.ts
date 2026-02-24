import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Hardcoding for production to ensure it works even if env vars are missing
const ADMIN_DOMAIN = "admin.meetshah.co";

export default auth((request) => {
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

    // Check authentication
    const isLoggedIn = !!request.auth;
    const isApiCmsRoute = pathname.startsWith("/api/cms");
    // After rewrite, internal paths on the subdomain might look like /admin/...
    // but before rewrite they could just be /

    // We will handle Auth checks *after* figuring out the mapped path
    let mappedPathname = pathname;

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminSubdomain) {
        // Skip internal Next.js routes and static assets
        if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
            return;
        }

        // Prevent double-prefixing: if someone visits admin.meetshah.co/admin/...
        // redirect them to admin.meetshah.co/... (strip the /admin prefix)
        if (pathname.startsWith("/admin")) {
            const cleanPath = pathname.replace(/^\/admin/, "") || "/";
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }

        mappedPathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
    }

    // Now check auth against mappedPathname (which is what the Next app actually sees)
    const isOnAdminUI = mappedPathname.startsWith("/admin");
    const isOnLogin = mappedPathname === "/admin/login";

    // 1. Protect /api/cms routes
    if (isApiCmsRoute && !isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Protect /admin routes
    if (isOnAdminUI && !isOnLogin && !isLoggedIn) {
        // If we're on the subdomain and trying to access an admin page while not logged in,
        // redirect to the login page (on the subdomain)
        if (isAdminSubdomain) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Otherwise, standard redirect
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // 3. Redirect away from login if already logged in
    if (isOnLogin && isLoggedIn) {
        if (isAdminSubdomain) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // ─── Apply Rewrites / Redirects ───────────────────────────
    if (isAdminSubdomain) {
        // Don't rewrite API routes - they should stay at /api/...
        if (pathname.startsWith("/api/")) {
            return;
        }
        url.pathname = mappedPathname;
        return NextResponse.rewrite(url);
    }

    // ─── Main domain: redirect /admin access to subdomain ──
    if (!isAdminSubdomain && pathname.startsWith("/admin")) {
        // In local development, don't force redirect to production admin domain
        if (currentHost.includes("localhost") || currentHost.includes("127.0.0.1") || currentHost.startsWith("192.168.")) {
            return;
        }

        const adminSubPath = pathname.replace(/^\/admin/, "") || "/";
        return NextResponse.redirect(
            new URL(`https://${ADMIN_DOMAIN}${adminSubPath}`)
        );
    }
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
