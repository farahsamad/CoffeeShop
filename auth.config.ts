import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default { providers: [Google, Facebook, Credentials] } satisfies NextAuthConfig;
