import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./prisma";
import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/reset-password-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

const productionToken = 111111;
const environment = process.env.NEXT_ENVIRONMENT;

export const generateVerificationToken = async (email: string) => {
  const token =
    environment === "production"
      ? productionToken.toString()
      : crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = environment === "production" ? productionToken.toString() : uuidv4();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token =
    environment === "production"
      ? productionToken.toString()
      : crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
