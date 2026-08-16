import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCAL_ORGANIZATION_ID } from "@/lib/organization";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

export function proxy(request: NextRequest) {
  if (!LOCAL_HOSTNAMES.has(request.nextUrl.hostname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-organization-id", LOCAL_ORGANIZATION_ID);
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/demands/:path*",
    "/board/:path*",
    "/journey/:path*",
    "/history/:path*",
    "/operators/:path*",
    "/notes/:path*",
    "/roadmap/:path*",
    "/reports/:path*",
    "/support/:path*",
    "/integrations/:path*",
    "/manual/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
