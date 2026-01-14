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
    // Verify admin API key
    const authHeader = request.headers.get("authorization")
    const adminKey = process.env.NEWSLETTER_ADMIN_KEY

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { subject, html, text } = await request.json()

    if (!subject || (!html && !text)) {
      return NextResponse.json(
        { error: "Missing required fields: subject and either html or text content" },
        { status: 400 }
      )
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      return NextResponse.json({ error: "RESEND_AUDIENCE_ID not configured" }, { status: 500 })
    }

    // Fetch all contacts from the audience
    const { data: contactsData, error: contactsError } = await resend.contacts.list({
      audienceId,
    })

    if (contactsError) {
      console.error("Failed to fetch contacts:", contactsError)
      return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
    }

    const contacts = contactsData?.data || []

    if (contacts.length === 0) {
      return NextResponse.json({ error: "No subscribers found" }, { status: 400 })
    }

    // Filter to only subscribed contacts
    const subscribedEmails = contacts
      .filter((contact) => !contact.unsubscribed)
      .map((contact) => contact.email)

    if (subscribedEmails.length === 0) {
      return NextResponse.json({ error: "No active subscribers found" }, { status: 400 })
    }

    // Send to all subscribers using batch
    // Resend batch API allows up to 100 emails per request
    const batchSize = 100
    const results = []

    for (let i = 0; i < subscribedEmails.length; i += batchSize) {
      const batch = subscribedEmails.slice(i, i + batchSize)
      const emails = batch.map((email) => ({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject,
        html,
        text,
      }))

      const { data, error } = await resend.batch.send(emails)

      if (error) {
        console.error("Batch send error:", error)
        results.push({ batch: i / batchSize + 1, error: error.message })
      } else {
        results.push({ batch: i / batchSize + 1, sent: data?.data?.length || batch.length })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${subscribedEmails.length} subscribers`,
      results,
    })
  } catch (error) {
    console.error("Broadcast error:", error)
    return NextResponse.json({ error: "Failed to send broadcast" }, { status: 500 })
  }
}
