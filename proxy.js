import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request) {

  const token = request.cookies.get("accessToken");
  
  const protectedRoutes = ["/dashboard", "/profile", "/admin"];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
