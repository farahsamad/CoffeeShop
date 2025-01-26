import prisma from "@/lib/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const getVerificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return getVerificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const getVerificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return getVerificationToken;
  } catch (error) {
    return null;
  }
};
