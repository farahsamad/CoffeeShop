export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;box-shadow: 0 2px 5px rgba(0,0,0,0.8);">
  <div style=" padding: 20px; text-align: center;">
    <h1 style="color: black; margin: 0;background-color: #f9f9f9;">Verify your email to sign up</h1>
  </div>
 <div style=" padding: 10px; text-align: center;">
    <h1 style="color: black; margin: 0;"> <span style="
    font-weight: bolder;
    font-family: cursive;
    color: #7e7d7d;">CoffeeShop</span></h1>
  </div>
  <div style="padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Enter this code on the verification page to complete the sign-up process:</p>
    <div style="text-align: center; margin: 30px 0;background-color:#7e7d7d ;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: white;">{verificationCode}</span>
    </div>
    <p>Or visit the link below to open the confirmation page in a new window or device:</p>
    <p style="text-align:center;">{verificationLink}</p>
    <p>This code will expire in 3 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;box-shadow: 0 2px 5px rgba(0,0,0,0.8);">
  <div style=" padding: 20px; text-align: center;">
    <h1 style="color: black; margin: 0;background-color: #f9f9f9;">Password Reset Successfully</h1>
  </div>
<div style=" padding: 10px; text-align: center;">
    <h1 style="color: black; margin: 0;"> <span style="
    font-weight: bolder;
    font-family: cursive;
    color: #7e7d7d;">CoffeeShop</span></h1>
  </div>
  <div style="padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
<div style="text-align: center;background-color:#7e7d7d ; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    <p>Or visit the link below to open the confirmation page in a new window or device:</p>
    <p style="text-align:center;">{verificationLink}</p>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>This code will expire in 3 minutes for security reasons.</p>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;box-shadow: 0 2px 5px rgba(0,0,0,0.8);">
  <div style=" padding: 20px; text-align: center;">
    <h1 style="color: black; margin: 0;background-color: #f9f9f9;">Password Reset</h1>
  </div>
<div style=" padding: 10px; text-align: center;">
    <h1 style="color: black; margin: 0;"> <span style="
    font-weight: bolder;
    font-family: cursive;
    color: #7e7d7d;">CoffeeShop</span></h1>
  </div>
  <div style="padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center;background-color:#7e7d7d; width:100%; height: 50px; line-height: 50px;display: inline-block; font-size: 30px;">
        <a href="{resetURL}" style="color: #ffecec;width:100%; padding: 12px 20px; text-decoration: none;font-weight: bold;">Reset Password</a>
      </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>This link will expire in 2 minutes for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const TWO_STEP_VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;box-shadow: 0 2px 5px rgba(0,0,0,0.8);">
  <div style=" padding: 20px; text-align: center;">
    <h1 style="color: black; margin: 0;background-color: #f9f9f9;">Two step verification</h1>
  </div>
 <div style=" padding: 10px; text-align: center;">
    <h1 style="color: black; margin: 0;"> <span style="
    font-weight: bolder;
    font-family: cursive;
    color: #7e7d7d;">CoffeeShop</span></h1>
  </div>
  <div style="padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request for two step verification. Enter this code on the verification page to complete the 2FA process:</p>
    <div style="text-align: center; margin: 30px 0;background-color:#7e7d7d ;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: white;">{twoStepVerificationCode}</span>
    </div>
    <p>This code will expire in 3 minutes for security reasons.</p>
    <p>If you didn't initiate this two step verification, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
