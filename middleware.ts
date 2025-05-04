import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  if (isLoginPage) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (sessionCookie) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  runtime: "nodejs",
  matcher: ["/login/:path*", "/dashboard/:path*"],
};
