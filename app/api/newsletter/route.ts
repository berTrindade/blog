import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResendClient()
    const { email } = await request.json()

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Add contact to Resend Audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      console.error("RESEND_AUDIENCE_ID is not configured")
      return NextResponse.json({ error: "Newsletter service not configured" }, { status: 500 })
    }

    const { error: contactError } = await resend.contacts.create({
      email,
      audienceId,
    })

    if (contactError) {
      // If contact already exists, that's okay
      if (!contactError.message?.includes("already exists")) {
        console.error("Failed to add contact:", contactError)
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
      }
    }

    // Send welcome email with branded template
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Welcome to the newsletter",
      html: getWelcomeEmailHtml(email),
    })

    if (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the subscription if welcome email fails
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

function getWelcomeEmailHtml(email: string): string {
  const siteUrl = process.env.SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null)
    || (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null)
    || "http://localhost:3000"

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Welcome to the newsletter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FCFCFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FCFCFC;">
    <tr>
      <td align="center" style="padding: 48px 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid rgba(0, 0, 0, 0.06);">
              <a href="${siteUrl}" style="text-decoration: none; color: #1a1a1a; font-size: 15px; font-weight: 600; letter-spacing: -0.02em;">
                Bernardo Trindade
              </a>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 0;">
              <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.022em; line-height: 1.2;">
                Thanks for subscribing
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #525252; letter-spacing: -0.011em;">
                You're now on the list. I write about software engineering, web development, and the occasional side project.
              </p>
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.7; color: #525252; letter-spacing: -0.011em;">
                Expect thoughtful posts about React, TypeScript, system design, and building great user experiences. No spam, ever.
              </p>
              
              <!-- CTA Button -->
              <a href="${siteUrl}/writing" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; padding: 12px 24px; border-radius: 6px; letter-spacing: -0.01em;">
                Read the latest posts
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid rgba(0, 0, 0, 0.06);">
              <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.5; color: #8c8c8c;">
                You received this email because you subscribed at <a href="${siteUrl}" style="color: #525252; text-decoration: underline;">btrinda.de</a>
              </p>
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #8c8c8c;">
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #8c8c8c; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
