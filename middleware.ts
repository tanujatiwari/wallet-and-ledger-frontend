import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to root, login page, and dashboard sub-routes
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
