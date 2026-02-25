import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Hardcoding for production to ensure it works even if env vars are missing
const ADMIN_DOMAIN = "admin.meetshah.co";

export default auth((request) => {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get("host") || "";
    const xForwardedHost = request.headers.get("x-forwarded-host");

    const currentHost = request.headers.get("host") || "";
    const pathname = url.pathname;

    // v4 - Early return for AuthJS internal routes to avoid middleware interference
    if (pathname.startsWith("/api/auth")) {
        const response = NextResponse.next();
        response.headers.set("x-middleware-v", "4");
        return response;
    }

    const isGuestSubdomain =
        currentHost.startsWith("guest.meetshah.co") ||
        currentHost.startsWith("guest.localhost");

    const isAdminSubdomain =
        !isGuestSubdomain && (
            currentHost.startsWith("admin.meetshah.co") ||
            currentHost.startsWith("admin.localhost")
        );

    // Check authentication
    const isLoggedIn = !!request.auth;
    const isApiCmsRoute = pathname.startsWith("/api/cms");
    // After rewrite, internal paths on the subdomain might look like /admin/...
    // but before rewrite they could just be /

    // We will handle Auth checks *after* figuring out the mapped path
    let mappedPathname = pathname;

    // ─── Subdomain routing ───────────────────────────────────
    if (isAdminSubdomain || isGuestSubdomain) {
        // Skip internal Next.js routes and static assets
        if (pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
            return;
        }

        // Prevent double-prefixing: if someone visits [subdomain]/admin/...
        // redirect them to [subdomain]/... (strip the /admin prefix)
        if (pathname.startsWith("/admin")) {
            const cleanPath = pathname.replace(/^\/admin/, "") || "/";
            return NextResponse.redirect(new URL(cleanPath, request.url));
        }

        // For API routes, we don't want to prefix with /admin
        if (pathname.startsWith("/api/")) {
            mappedPathname = pathname;
        } else if (pathname === "/") {
            // Guest root shows the landing page, Admin root shows the dashboard
            mappedPathname = isGuestSubdomain ? "/simple-cms" : "/admin";
        } else {
            mappedPathname = `/admin${pathname}`;
        }
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
        // If we're on a subdomain and trying to access an admin page while not logged in,
        // redirect to the login page (on the subdomain)
        if (isAdminSubdomain || isGuestSubdomain) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // Otherwise, standard redirect
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // 3. Redirect away from login if already logged in
    if (isOnLogin && isLoggedIn) {
        if (isAdminSubdomain || isGuestSubdomain) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // ─── Apply Rewrites / Redirects ───────────────────────────
    if (isAdminSubdomain || isGuestSubdomain) {
        // Don't rewrite API routes - they should stay at /api/...
        if (pathname.startsWith("/api/")) {
            return;
        }

        const requestHeaders = new Headers(request.headers);
        if (isGuestSubdomain) {
            requestHeaders.set("x-guest-mode", "true");
        }

        url.pathname = mappedPathname;
        return NextResponse.rewrite(url, {
            request: {
                headers: requestHeaders,
            }
        });
    }

    // ─── Main domain: redirect /admin access to subdomain ──
    if (!isAdminSubdomain && !isGuestSubdomain && pathname.startsWith("/admin")) {
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
