export const API_AUTH_PREFIX = "/api/auth";

export const AUTH_ROUTES = ["/login", "/signup", "/password/forgotten", "/password/reset"];

export const DEFAULT_LOGIN_REDIRECT = "/";
export const LOGOUT_ROUTE = ["/logout"];

export const PROTECTED_ROUTES = [
  "/payment/card",
  "/payment/cash",
  // your other protected routes
];

export const PUBLIC_ROUTES = [
  "/",
  "/^/menu/[^/]+$/", //Match /menu/[id]
  "/^/menu/[^/]+/[^/]+$/", //Match /menu/[id]/[name]
  "/menu",
  "/menu/[id]",
  "/menu/[id]/[name]",
  "/cart",
];
