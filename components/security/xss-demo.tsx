'use client'

import { useState } from 'react'

export function XSSDemo() {
  const [demoState, setDemoState] = useState<'initial' | 'vulnerable' | 'safe'>('initial')

  const showVulnerable = () => {
    setDemoState('vulnerable')
  }

  const showSafe = () => {
    setDemoState('safe')
  }

  const reset = () => {
    setDemoState('initial')
  }

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {demoState === 'initial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Demonstração Interativa</h3>
            <p className="text-sm text-slate-300">
              Veja a diferença entre código vulnerável e código seguro.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Como XSS funciona na prática</li>
              <li>Como prevenir com sanitização</li>
              <li>Usando DOMPurify para HTML seguro</li>
            </ul>
          </div>
        )}

        {demoState === 'vulnerable' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-red-950/30 border border-red-900 p-4">
              <h4 className="font-semibold text-red-400 mb-2">Código Vulnerável</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded">
{`// ❌ NUNCA faça isso!
function Comment({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}

// Se o usuário enviar:
const maliciousComment = '<img src=x onerror="alert(\\'XSS\\')"/>'

// O script será executado!`}</pre>
            </div>
            <div className="rounded-lg bg-red-900/20 border border-red-800 p-4">
              <p className="text-sm text-red-300">
                <strong>Problema:</strong> O navegador executa qualquer JavaScript que estiver no HTML,
                incluindo scripts maliciosos que podem roubar cookies, tokens, ou realizar ações em nome do usuário.
              </p>
            </div>
          </div>
        )}

        {demoState === 'safe' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-4">
              <h4 className="font-semibold text-emerald-400 mb-2">Código Seguro</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded">
{`// ✅ Forma 1: Usar texto puro
function Comment({ text }) {
  return <p>{text}</p>
}

// ✅ Forma 2: Se PRECISA de HTML, use DOMPurify
import DOMPurify from 'dompurify'

function CommentHTML({ html }) {
  const sanitized = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// Scripts maliciosos são removidos!`}</pre>
            </div>
            <div className="rounded-lg bg-emerald-900/20 border border-emerald-800 p-4">
              <p className="text-sm text-emerald-300">
                <strong>Solução:</strong> DOMPurify remove scripts maliciosos mas mantém formatação segura (bold, italic, links).
                React também escapa automaticamente valores em {`{}`}, tornando-os seguros por padrão.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={showVulnerable}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-400 transition-colors"
        >
          Código vulnerável
        </button>
        <button
          onClick={showSafe}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Código seguro
        </button>
        {demoState !== 'initial' && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
          >
            Resetar
          </button>
        )}
      </div>
    </div>
  )
}
