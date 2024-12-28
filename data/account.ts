import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const existingAccount = await db.account.findFirst({
      where: { userId },
    });
    return existingAccount;
  } catch (error) {
    return null;
  }
};
