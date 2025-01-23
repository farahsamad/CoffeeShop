import NextAuth, { type DefaultSession, type DefaultJWT } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  rememberMe: boolean | string;
  // expires: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     rememberMe?: boolean;
//   }
// }
