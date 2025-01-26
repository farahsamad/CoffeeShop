import prisma from "@/lib/prisma";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const getTwoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return getTwoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const getTwoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return getTwoFactorToken;
  } catch (error) {
    return null;
  }
};
