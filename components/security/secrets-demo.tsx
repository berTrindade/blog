'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

export function SecretsDemo() {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem')

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setActiveTab('problem')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'problem'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ❌ Problem
        </button>
        <button
          onClick={() => setActiveTab('solution')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'solution'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ✅ Solution
        </button>
          </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[480px]">
        {activeTab === 'problem' && (
          <div className="space-y-4">
            <CodeBox title="Vulnerable Code" language="typescript">
{`// .env.local
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

// The key goes to the JavaScript bundle!`}
            </CodeBox>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-1100 dark:text-gray-1100">How to find it:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-2 text-gray-1100 dark:text-gray-1100">
                <li>Open DevTools → Sources</li>
                <li>Search for "sk-" or "api_key"</li>
                <li>All env vars with NEXT_PUBLIC_ are in the bundle</li>
                <li>Attacker uses your API key = you pay their bill</li>
                </ol>
            </div>
          </div>
        )}

        {activeTab === 'solution' && (
          <div className="space-y-4">
            <CodeBox title="Backend For Frontend (BFF)" language="typescript">
{`// app/api/ai/route.ts (Route Handler - Backend)
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
}`}
            </CodeBox>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-1100 dark:text-gray-1100 ml-2">
              <li>API key never goes to the browser</li>
              <li>You control rate limiting</li>
              <li>Validates user authentication</li>
              <li>Can add logging and monitoring</li>
                </ul>
          </div>
        )}
      </div>
    </div>
  )
}
