import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";
import prisma from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      console.log("credentials are: ", credentials);
      const creds = credentials as { rememberMe?: string }; // Convert the rememberMe value to a boolean
      const rememberMe = creds?.rememberMe === "true";
      console.log("User////////////////////////:\\\\\\\\\\\\\\\\\\\\\\\\\\", user);
      if (account?.provider !== "credentials") return true;
      if (!user.id) {
        return false;
      }
      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        return false;
      }
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      //   if (!twoFactorConfirmation) {
      //     return false;
      //   }

      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id },
      //   });
      // }
      console.log("correct auth.ts!");
      return true;
    },
    // async jwt({ token, user, session }) {
    //   console.log("token here//////:", token);
    //   console.log("user here/////////:", user);
    //   if (!token.sub) {
    //     return token;
    //   }
    //   const existingUser = await getUserById(token.sub);
    //   if (!existingUser) return token;

    //   const existingAccount = await getAccountByUserId(existingUser.id);

    //   token.email = existingUser.email;
    //   token.name = existingUser.name;
    //   // token.sub = existingUser.id
    //   token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
    //   token.isOAuth = !!existingAccount;

    //   if (user) {
    //     if (typeof user?.rememberMe === string) token.rememberMe = user?.rememberMe === "true";
    //     if (typeof user?.rememberMe === boolean) token.rememberMe = user?.rememberMe;
    //   }

    //   // const rememberMe = session?.rememberMe === "true"; // Safe check with optional chaining
    //   // const rememberMe = session?.user;
    //   // token.rememberMe = rememberMe;
    //   // token.exp = rememberMe
    //   //   ? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
    //   //   : Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    //   // // }
    //   console.log("Token after JWT callback:", token);
    //   return token;
    // },

    // async session({ session, token }) {
    //   console.log("session: ", session);
    //   console.log("token: ", token);
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //   }

    //   if (session.user) {
    //     session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    //     session.user.name = token.name;
    //     session.user.email = token.email as string;
    //     session.user.isOAuth = token.isOAuth as boolean;
    //     console.log("token.rememberMe: ", token.rememberMe);
    //     console.log("typeof token.rememberMe: ", typeof token.rememberMe);
    //     session.user.rememberMe = token.rememberMe as boolean;

    //     const expirationDate = new Date((token.exp ?? Math.floor(Date.now() / 1000)) * 1000);
    //     session.expires = expirationDate as unknown as Date & string;
    //     //         const expirationDate = new Date(token.exp * 1000);
    //     // session.expires = expirationDate.toISOString();
    //   }

    //   console.log("Session after Session callback:", session);
    //   return session;
    // },
    async jwt({ token, user, session }) {
      if (user) {
        // Assert the user type to include rememberMe
        const userWithRememberMe = user as { rememberMe?: boolean };
        token.rememberMe = userWithRememberMe.rememberMe || false;
      }

      console.log("session in jwt callback: ", session);

      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.email = existingUser.email;
      token.name = existingUser.name;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;

      const rememberMe = token.rememberMe;
      token.exp = rememberMe
        ? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
        : Math.floor(Date.now() / 1000) + 60 * 60 * 24;

      console.log("Token after JWT callback:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("token in session callback: ", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.rememberMe = token.rememberMe as boolean;

        // const expirationDate = new Date(token.exp * 1000);
        // session.expires = expirationDate.toISOString();
        const expirationDate = new Date((token.exp ?? Math.floor(Date.now() / 1000)) * 1000);
        session.expires = expirationDate as unknown as Date & string;
      }

      console.log("Session after Session callback:", session);
      return session;
    },
    redirect() {
      return "/";
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
