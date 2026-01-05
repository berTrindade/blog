'use client'

import { useState } from 'react'

export function AuthDemo() {
  const [demo, setDemo] = useState<'initial' | 'user' | 'bypass'>('initial')

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {demo === 'initial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Frontend não controla acesso</h3>
            <p className="text-sm text-slate-300">
              Veja como validações frontend são facilmente contornadas.
            </p>
          </div>
        )}

        {demo === 'user' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4">
              <h4 className="font-semibold mb-3">Usuário Normal</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`// Frontend esconde recursos premium
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {user.isPremium && (
        <PremiumFeatures />
      )}
    </div>
  )
}

// Resultado: Acesso negado (UI esconde)`}</pre>
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="text-sm text-slate-400">
                  Status atual: Premium Features - Acesso negado
                </p>
              </div>
            </div>
          </div>
        )}

        {demo === 'bypass' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-950/30 border border-amber-900 p-4">
              <h4 className="font-semibold text-amber-400 mb-3">Bypass via DevTools</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`// No console do navegador:
user.isPremium = true

// Ou fazer request direto:
fetch('/api/premium-data', {
  headers: { 'Authorization': 'Bearer token' }
})

// Se o backend não validar, o acesso é liberado!`}</pre>
              <div className="bg-red-950/50 p-3 rounded mb-3">
                <p className="text-sm text-red-300">
                  <strong>Atacante conseguiu:</strong>
                </p>
                <ul className="text-xs text-slate-300 space-y-1 ml-4 mt-2">
                  <li>Mudar variável no console</li>
                  <li>Fazer requests diretas com curl/Postman</li>
                  <li>Acessar recursos sem pagar</li>
                </ul>
              </div>
              <div className="bg-emerald-950/30 border border-emerald-900 p-3 rounded">
                <h5 className="text-sm font-semibold text-emerald-400 mb-2">Solução: Validar no Backend</h5>
                <pre className="text-xs overflow-x-auto bg-black/50 p-2 rounded">
{`// Backend verifica SEMPRE
app.get('/api/premium-data', async (req, res) => {
  const user = await getUserFromToken(req)
  
  if (!user.isPremium) {
    return res.status(403).json({ 
      error: 'Premium required' 
    })
  }
  
  return res.json(premiumData)
})`}</pre>
              </div>
            </div>
            <div className="rounded-lg bg-sky-900/20 border border-sky-800 p-4">
              <p className="text-sm text-sky-300">
                <strong>Mantra:</strong> Frontend esconde (UX), Backend bloqueia (segurança)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setDemo('user')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          Tentar como usuário
        </button>
        <button
          onClick={() => setDemo('bypass')}
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
        >
          Bypass no DevTools
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
