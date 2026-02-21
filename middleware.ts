import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("x-test-middleware", "active");
    response.headers.set("x-test-host", request.headers.get("host") || "unknown");
    return response;
}

export const config = {
    matcher: "/:path*",
};
