type EmailLayoutOptions = {
  subject: string
  content: string
  productName?: string
  supportEmail?: string
  previewText?: string
}

const DEFAULT_BRAND = "ContentGrow Platform"
const DEFAULT_SUPPORT_EMAIL = "support@contentgrow.com"

export function renderEmailLayout({
  subject,
  content,
  productName = DEFAULT_BRAND,
  supportEmail = DEFAULT_SUPPORT_EMAIL,
  previewText = "",
}: EmailLayoutOptions) {
  const currentYear = new Date().getFullYear()

  const preheader = previewText.trim().length > 0 ? previewText : `${productName} notification`

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${subject}</title>
      <style>
        :root {
          color-scheme: light only;
        }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #f9fafb; margin: 0; padding: 0; }
        .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08); }
        a { color: inherit; }
        .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #9ca3af; }
        @media (max-width: 600px) {
          .card { padding: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="preheader">${preheader}</div>
      <div class="wrapper">
        <div class="card">
          ${content}
          <p style="color:#6b7280;font-size:14px;margin-top:24px;">Need help? Reach us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
        </div>
        <p class="footer">&copy; ${currentYear} ${productName}. All rights reserved.</p>
      </div>
    </body>
  </html>`

  return {
    subject,
    html,
  }
}

export type EmailLayout = ReturnType<typeof renderEmailLayout>
