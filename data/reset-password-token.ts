import prisma from "@/lib/prisma";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const getPasswordResetToken = await prisma.passwordResetToken.findFirst({
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
    const getPasswordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return getPasswordResetToken;
  } catch (error) {
    console.log("//////////////////////////////////");
    return null;
  }
};
