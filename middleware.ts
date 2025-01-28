import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PROTECTED_ROUTES,
  LOGOUT_ROUTE,
} from "@/routes";
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

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
function matchApiRoute(pathname: string) {
  const apiRoutePatterns = [
    /^\/api$/,
    /^\/api\/[^\/]+$/,
    /^\/api\/[^\/]+\/[^\/]+$/,
    /^\/api\/[^\/]+\/[^\/]+\/[^\/]+$/,
  ];
  return apiRoutePatterns.some((pattern) => pattern.test(pathname));
}

export const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  console.log("req: ", req);
  console.log("/////////////nextUrl: ", nextUrl);
  const isAuth = !!req.auth;
  const isAccessingApiAuthRoute = matchApiRoute(nextUrl.pathname);
  const isAccessingAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  // const isAccessingPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAccessingPublicRoute = matchPublicRoute(nextUrl.pathname);
  const isAccessingProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);
  const isAccessingLogoutRoute = LOGOUT_ROUTE.includes(nextUrl.pathname);

  if (isAccessingApiAuthRoute) {
    console.log("isAccessingApiAuthRoute!");
    return NextResponse.next();
  }
  console.log("middleware.ts");
  if (isAccessingAuthRoute) {
    console.log("isAccessingAuthRoute!");
    if (isAuth) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, BASE_URL));
    }
    console.log("isAccessingAuthRoute but not authenticated!");

    return NextResponse.next();
  }

  if (isAccessingLogoutRoute) {
    console.log("isAccessingLogoutRoute!");
    if (isAuth) {
      const response = NextResponse.json({ message: "Signed out successfully" }, { status: 302 });
      response.cookies.set("authjs.session-token", "", { expires: new Date(0) });
      response.headers.set("Location", DEFAULT_LOGIN_REDIRECT);
      return response;
    }
    console.log("isAccessingLogoutRoute but not authenticated!");

    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, BASE_URL));
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
    console.log("///////encodedCallbackUrl: ", encodedCallbackUrl);
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, BASE_URL));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
