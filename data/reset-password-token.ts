import { db } from "@/lib/prisma";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const getPasswordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return getPasswordResetToken;
  } catch (error) {
    console.log("//////////////////////////////////");
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const getPasswordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return getPasswordResetToken;
  } catch (error) {
    console.log("//////////////////////////////////");
    return null;
  }
};
