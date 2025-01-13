import { db } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const getTwoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return getTwoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const getTwoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return getTwoFactorToken;
  } catch (error) {
    return null;
  }
};
