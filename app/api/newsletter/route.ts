import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Mock: In production, save to database or email service (Mailchimp, SendGrid, etc.)
    console.log("[v0] Newsletter subscription:", email)

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
