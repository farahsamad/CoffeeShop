import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { API_AUTH_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes";
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option

export const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  // const pathname = req.nextUrl.pathname;
  // // manage route protection
  // const isAuth = req.auth;
  // const isAccessingApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  // const isAccessingAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  // const isAccessingProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  // if (isAccessingApiAuthRoute) {
  //   return NextResponse.next();
  // }
  // if (isAccessingAuthRoute) {
  //   if (isAuth) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   return NextResponse.next();
  // }
  // if (!isAuth && isAccessingProtectedRoute) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
