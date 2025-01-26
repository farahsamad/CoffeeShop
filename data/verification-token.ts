import { db } from "@/lib/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const getVerificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return getVerificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const getVerificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return getVerificationToken;
  } catch (error) {
    return null;
  }
};
