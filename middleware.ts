import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the user is trying to access a protected route
  const token = request.cookies.get("token") || "";

  // If no token, redirect to the login page
  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the user to continue to the home page if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/departments/:path*",
  ],
};
