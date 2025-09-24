import {renderEmailLayout} from "./layout";

type PasswordResetTemplateParams = {
  resetUrl: string
  recipientName?: string
  productName?: string
  supportEmail?: string
}

export function buildPasswordResetEmail({
  resetUrl,
  recipientName,
  productName = "ContentGrow Platform",
  supportEmail,
}: PasswordResetTemplateParams) {
  const displayName = recipientName ? `Hi ${recipientName},` : "Hello,";
  const fallbackSupport = supportEmail ?? "support@contentgrow.com";

  const subject = `${productName} password reset request`;

  const content = `
    <p style="margin:0 0 16px;">${displayName}</p>
    <h1 style="font-size:24px;margin:0 0 16px;">Reset your password</h1>
    <p style="line-height:1.6;margin:0 0 16px;">We received a request to reset your password for ${productName}. Click the button below to set a new password. This link will expire in 60 minutes.</p>
    <p style="text-align:center;margin:32px 0;">
      <a style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff !important;text-decoration:none;border-radius:9999px;font-weight:600;" href="${resetUrl}" target="_blank" rel="noopener">Reset password</a>
    </p>
    <p style="line-height:1.6;margin:0 0 16px;">If you didn’t request a password reset, you can safely ignore this email. Your password will not be changed.</p>
  `;

  const {html} = renderEmailLayout({
    subject,
    productName,
    supportEmail: fallbackSupport,
    previewText: "Reset your password in just a few clicks",
    content,
  });

  const text = `${displayName}\n\nWe received a request to reset your password for ${productName}.\n\nReset password: ${resetUrl}\n\nIf you did not request this, please ignore this email.\n\nNeed help? Contact ${fallbackSupport}.`;

  return {
    subject,
    html,
    text,
  };
}

export type PasswordResetEmail = ReturnType<typeof buildPasswordResetEmail>;
