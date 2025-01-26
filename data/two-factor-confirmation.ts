import prisma from "@/lib/prisma";

interface updateTwoFactorAuthenticationProps {
  userId: string;
  isTwoFactorEnabled: boolean;
}

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};

export const updateTwoFactorAuthentication = async ({
  userId,
  isTwoFactorEnabled,
}: updateTwoFactorAuthenticationProps) => {
  try {
    const updateTwoFactor = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isTwoFactorEnabled: isTwoFactorEnabled,
      },
    });
    return updateTwoFactor;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error updating isTwoFactorEnabled: ", error.message);
    } else {
      console.log("An unexpected error occurred.");
    }
    return null;
  }
};
