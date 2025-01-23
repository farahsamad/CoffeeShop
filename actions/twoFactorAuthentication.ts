"use server";

import { updateTwoFactorAuthentication } from "@/data/two-factor-confirmation";

interface twoFactorAuthenticationProps {
  userId: string;
  isTwoFactorEnabled: boolean;
}

export const twoFactorAuthentication = async ({
  userId,
  isTwoFactorEnabled,
}: twoFactorAuthenticationProps) => {
  try {
    const data = await updateTwoFactorAuthentication({ userId, isTwoFactorEnabled });
    console.log("returnedValue: ", data);
    return data;
  } catch (error) {
    console.log("errorrrrr /////////////////");
    return null;
  }
};
