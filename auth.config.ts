import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        console.log("authorize credentials: ", credentials);
        const data = LoginSchema.safeParse(credentials);
        console.log("data are: ", data);
        if (data.success) {
          const { email, password } = data.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          console.log("password is :", password);
          console.log("user.password is :", user.password);
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log("passwordMatch: ", passwordMatch);
          if (passwordMatch) {
            console.log("password match!");
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
