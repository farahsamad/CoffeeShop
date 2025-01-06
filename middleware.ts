import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  API_AUTH_PREFIX,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_ROUTES,
} from "@/routes";
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option

function matchPublicRoute(pathname: string) {
  const publicRoutePatterns = [
    /^\/$/,
    /^\/menu$/,
    /^\/menu\/[^\/]+$/,
    /^\/menu\/[^\/]+\/[^\/]+$/,
    /^\/cart$/,
  ];
  return publicRoutePatterns.some((pattern) => pattern.test(pathname));
}

export const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  const isAccessingApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAccessingAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  // const isAccessingPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAccessingPublicRoute = matchPublicRoute(nextUrl.pathname);
  const isAccessingProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);

  if (isAccessingApiAuthRoute) {
    return NextResponse.next();
  }
  console.log("middleware.ts");
  if (isAccessingAuthRoute) {
    console.log("isAccessingAuthRoute!");
    if (isAuth) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    console.log("isAccessingAuthRoute but not authenticated!");

    return NextResponse.next();
  }
  if (isAccessingProtectedRoute) {
    console.log("isAccessingProtectedRoute!");
    if (!isAuth) {
      console.log("isAccessingProtectedRoute but not authenticated");
      return Response.redirect(new URL("/login", nextUrl));
    }
    console.log("isAccessingProtectedRoute and authenticated");
    return NextResponse.next();
  }

  // if (isAccessingPublicRoute && nextUrl.pathname !== "/") {
  //   return NextResponse.redirect(new URL(`/`, nextUrl));
  // }

  if (!isAuth && !isAccessingPublicRoute) {
    console.log("///////true");
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
