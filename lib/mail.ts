import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  TWO_STEP_VERIFICATION_EMAIL_TEMPLATE,
} from "@/components/mail-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "coffeeshop@resend.dev",
    to: email,
    subject: "Verification email",
    // html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token).replace(
      "{verificationLink}",
      confirmLink
    ),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/password/reset?token=${token}`;

  await resend.emails.send({
    from: "coffeeshop@resend.dev",
    to: email,
    subject: "Reset your password",
    // html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    html: PASSWORD_RESET_TEMPLATE.replace("{resetURL}", resetLink),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "coffeeshop@resend.dev",
    to: email,
    subject: "2FA Code",
    html: TWO_STEP_VERIFICATION_EMAIL_TEMPLATE.replace("{twoStepVerificationCode}", token),
    // html: `<p>Your 2FA code: ${token}</p>`,
  });
};
