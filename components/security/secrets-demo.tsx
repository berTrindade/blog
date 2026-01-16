'use client'

import { TabbedCodeBlock } from '@/components/tabbed-code-block'

export function SecretsDemo() {
  return (
    <div className="my-8 space-y-4">
      <TabbedCodeBlock
        filename="api-client.ts"
        tabs={[
          {
            label: "Problem",
            icon: "problem",
            language: "typescript",
            highlightLines: "2,5,10",
            code: `// .env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-xxxxx

// Component
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

async function generateText() {
  const response = await fetch('https://api.openai.com/v1/chat', {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`
    }
  })
}

// The key goes to the JavaScript bundle!
// How to find it:
// 1. Open DevTools → Sources
// 2. Search for "sk-" or "api_key"
// 3. All env vars with NEXT_PUBLIC_ are in the bundle
// 4. Attacker uses your API key = you pay their bill`
          },
          {
            label: "Solution",
            icon: "solution",
            language: "typescript",
            highlightLines: "4-5,9-10",
            code: `// app/api/ai/route.ts (Route Handler - Backend)
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // No NEXT_PUBLIC!
})

export async function POST(request: Request) {
  const { prompt } = await request.json()
  
  // Validate authentication
  const user = await getUser(request)
  if (!user) return new Response('Unauthorized', { status: 401 })
  
  // Call API with your key (private)
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  })
  
  return Response.json(response)
}

// Frontend only calls YOUR backend:
async function generateText(prompt) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  return res.json()
}

// Benefits:
// • API key never goes to the browser
// • You control rate limiting
// • Validates user authentication
// • Can add logging and monitoring`
          }
        ]}
      />
    </div>
  )
}
