import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/test-redirect") {
        return NextResponse.redirect(new URL("https://google.com", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-test-active", "true");
    return response;
}

export const config = {
    matcher: "/:path*",
};
