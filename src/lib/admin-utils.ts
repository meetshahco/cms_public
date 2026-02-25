/**
 * Utility for generating correct admin paths that work on both
 * the subdomain (admin.meetshah.co) and the main domain (/admin).
 *
 * On the subdomain, paths are root-relative: /projects, /settings, etc.
 * On the main domain, paths are prefixed: /admin/projects, /admin/settings, etc.
 */

const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "admin.meetshah.co";

/**
 * Check if the current window location is the admin subdomain.
 * Safe to call on both server and client.
 */
export function isAdminSubdomain(): boolean {
    if (typeof window === "undefined") return false;
    const hostname = window.location.hostname;
    return (
        hostname === ADMIN_DOMAIN ||
        hostname === "admin.localhost" ||
        hostname === "simplecms.meetshah.co" ||
        hostname.startsWith("simplecms.localhost") ||
        hostname.endsWith(`.${ADMIN_DOMAIN}`) ||
        hostname.includes("admin.meetshah.co")
    );
}

/**
 * Generate the correct admin path based on whether we're on the subdomain.
 *
 * @param path - The path relative to admin root, e.g. "/" or "/projects" or "/projects/123/edit"
 * @returns The correct path: "/projects" on subdomain, "/admin/projects" on main domain
 */
export function adminPath(path: string): string {
    const normalizedPath = path === "/" ? "" : path;

    if (isAdminSubdomain()) {
        // On subdomain, paths are root-relative (no /admin prefix)
        return normalizedPath || "/";
    }

    // On main domain, prefix with /admin
    return `/admin${normalizedPath}`;
}
