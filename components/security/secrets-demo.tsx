'use client'

import { useState } from 'react'

export function SecretsDemo() {
  const [demo, setDemo] = useState<'initial' | 'problem' | 'solution'>('initial')

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {demo === 'initial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Não existe segredo no bundle</h3>
            <p className="text-sm text-slate-300">
              Qualquer coisa que vai para o browser pode ser vista.
            </p>
          </div>
        )}

        {demo === 'problem' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-red-950/30 border border-red-900 p-4">
              <h4 className="font-semibold text-red-400 mb-3">API Key no Frontend</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
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

// A key vai para o bundle JavaScript!`}</pre>
              <div className="bg-red-900/20 p-3 rounded">
                <p className="text-sm text-red-300 mb-2">
                  <strong>Como encontrar:</strong>
                </p>
                <ol className="text-xs text-slate-300 space-y-1 ml-4">
                  <li>1. Abra DevTools → Sources</li>
                  <li>2. Procure por "sk-" ou "api_key"</li>
                  <li>3. Todas as env vars com NEXT_PUBLIC_ estão no bundle</li>
                  <li>4. Atacante usa sua API key = sua conta paga a conta dele</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {demo === 'solution' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-4">
              <h4 className="font-semibold text-emerald-400 mb-3">Backend For Frontend (BFF)</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`// app/api/ai/route.ts (Route Handler - Backend)
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Sem NEXT_PUBLIC!
})

export async function POST(request: Request) {
  const { prompt } = await request.json()
  
  // Valida autenticação
  const user = await getUser(request)
  if (!user) return new Response('Unauthorized', { status: 401 })
  
  // Chama API com sua key (privada)
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  })
  
  return Response.json(response)
}

// Frontend apenas chama SEU backend:
async function generateText(prompt) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  return res.json()
}`}</pre>
              <div className="bg-emerald-950/50 p-3 rounded">
                <p className="text-sm text-emerald-300 mb-2">
                  <strong>Benefícios:</strong>
                </p>
                <ul className="text-xs text-slate-300 space-y-1 ml-4">
                  <li>API key nunca vai para o browser</li>
                  <li>Você controla rate limiting</li>
                  <li>Valida autenticação do usuário</li>
                  <li>Pode adicionar logging e monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setDemo('problem')}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-400 transition-colors"
        >
          Ver problema
        </button>
        <button
          onClick={() => setDemo('solution')}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Ver solução
        </button>
        {demo !== 'initial' && (
          <button
            onClick={() => setDemo('initial')}
            className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
          >
            Resetar
          </button>
        )}
      </div>
    </div>
  )
}
