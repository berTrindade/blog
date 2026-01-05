'use client'

import { useState } from 'react'

type OWASPCategory = 'A01' | 'A03' | 'A05' | 'A06' | 'A07'

const categories = {
  'A01': {
    title: 'A01 - Broken Access Control',
    color: '#ff6b6b',
    description: 'Usuários acessam recursos que não deveriam.',
    example: `// Vulnerável
if (user.isAdmin) {
  return <AdminPanel />
}

// Atacante muda no console:
user.isAdmin = true`,
    solution: `// Seguro
// Backend verifica SEMPRE
app.get('/api/admin', (req, res) => {
  const user = getUserFromToken(req)
  if (!user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  return res.json(adminData)
})`,
    checklist: [
      'Validar permissões no backend',
      'Nunca confiar em flags do frontend',
      'Implementar RBAC (Role-Based Access Control)',
      'Logar tentativas de acesso não autorizado',
      'Usar tokens JWT com claims de role'
    ]
  },
  'A03': {
    title: 'A03 - Injection (XSS)',
    color: '#ee5a6f',
    description: 'Código malicioso é executado no browser.',
    example: `// Vulnerável
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// Se userComment = '<img src=x onerror="alert(1)"/>'
// O script executa!`,
    solution: `// Seguro
import DOMPurify from 'dompurify'

const clean = DOMPurify.sanitize(userComment)
<div dangerouslySetInnerHTML={{ __html: clean }} />

// Ou melhor ainda:
<p>{userComment}</p> // React escapa automaticamente`,
    checklist: [
      'Usar DOMPurify para sanitizar HTML',
      'Evitar dangerouslySetInnerHTML quando possível',
      'Configurar Content Security Policy (CSP)',
      'Validar e sanitizar inputs no backend também',
      'Usar HttpOnly cookies para tokens'
    ]
  },
  'A05': {
    title: 'A05 - Security Misconfiguration',
    color: '#f59e0b',
    description: 'Configurações inseguras expõem a aplicação.',
    example: `// Vulnerável
// Sem headers de segurança
// Sem CSP
// CORS aberto para todos
// Source maps em produção`,
    solution: `// Seguro (next.config.js)
module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: "default-src 'self'" }
      ]
    }]
  },
  productionBrowserSourceMaps: false
}`,
    checklist: [
      'Configurar security headers',
      'Implementar CSP estrito',
      'Desabilitar source maps em produção',
      'CORS restritivo (não usar *)',
      'Rate limiting em APIs'
    ]
  },
  'A06': {
    title: 'A06 - Vulnerable and Outdated Components',
    color: '#ec4899',
    description: 'Dependências com vulnerabilidades conhecidas.',
    example: `// Vulnerável
// package.json com dependências desatualizadas
"dependencies": {
  "react": "16.8.0",  // versão de 2019!
  "axios": "0.18.0"   // vulnerabilidades conhecidas
}`,
    solution: `// Seguro
// Manter atualizado
npm audit
npm audit fix
npm update

// Usar Dependabot/Renovate
// CI falha se vulnerabilidades críticas`,
    checklist: [
      'Executar npm audit regularmente',
      'Configurar Dependabot ou Renovate',
      'Revisar dependências antes de instalar',
      'Manter versões atualizadas',
      'CI/CD bloqueia deploys com vulnerabilidades'
    ]
  },
  'A07': {
    title: 'A07 - Identification and Authentication Failures',
    color: '#8b5cf6',
    description: 'Falhas na autenticação e gestão de sessão.',
    example: `// Vulnerável
// Senha sem hash
// Sem rate limiting no login
// Tokens em localStorage
// Sem expiração de sessão`,
    solution: `// Seguro
// Backend com bcrypt
const hash = await bcrypt.hash(password, 10)

// HttpOnly cookies
res.cookie('token', jwt, { httpOnly: true, secure: true })

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 5 tentativas por 15min
})
app.use('/api/login', limiter)`,
    checklist: [
      'Hash senhas com bcrypt (min 10 rounds)',
      'HttpOnly cookies para tokens',
      'Rate limiting em login/register',
      'Require senha forte (min 8 chars)',
      'Implementar MFA quando possível',
      'Expiração de sessão',
      'Log de tentativas de login'
    ]
  }
}

export function OWASPDemo() {
  const [activeCategory, setActiveCategory] = useState<OWASPCategory | null>(null)

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        {!activeCategory && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">OWASP Top 10 - Guia Prático Frontend</h3>
            <p className="text-sm text-slate-300">
              Use o OWASP como checklist de conversa com o backend, não apenas teoria.
            </p>
            <div className="bg-slate-800/30 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Clique nas categorias para explorar:</p>
              <ul className="text-xs text-slate-300 space-y-1 ml-4 columns-2">
                <li><strong>A01</strong> - Broken Access Control</li>
                <li><strong>A03</strong> - Injection (XSS)</li>
                <li><strong>A05</strong> - Security Misconfiguration</li>
                <li><strong>A06</strong> - Vulnerable Components</li>
                <li><strong>A07</strong> - Authentication Failures</li>
              </ul>
            </div>
          </div>
        )}

        {activeCategory && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4" style={{ 
              backgroundColor: `${categories[activeCategory].color}10`, 
              borderColor: categories[activeCategory].color 
            }}>
              <h4 className="font-semibold mb-2" style={{ color: categories[activeCategory].color }}>
                {categories[activeCategory].title}
              </h4>
              <p className="text-sm text-slate-300">
                {categories[activeCategory].description}
              </p>
            </div>

            <div className="rounded-lg bg-red-950/30 border border-red-900 p-4">
              <h5 className="text-sm font-semibold text-red-400 mb-2">Código Vulnerável:</h5>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded">
                {categories[activeCategory].example}
              </pre>
            </div>

            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-4">
              <h5 className="text-sm font-semibold text-emerald-400 mb-2">Código Seguro:</h5>
              <pre className="text-xs overflow-x-auto bg-black/50 p-3 rounded">
                {categories[activeCategory].solution}
              </pre>
            </div>

            <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4">
              <h5 className="text-sm font-semibold mb-2" style={{ color: categories[activeCategory].color }}>
                Checklist:
              </h5>
              <ul className="text-xs text-slate-300 space-y-1 ml-4">
                {categories[activeCategory].checklist.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory('A01')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          A01 - Access Control
        </button>
        <button
          onClick={() => setActiveCategory('A03')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          A03 - Injection/XSS
        </button>
        <button
          onClick={() => setActiveCategory('A05')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          A05 - Misconfiguration
        </button>
        <button
          onClick={() => setActiveCategory('A06')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          A06 - Vulnerable Components
        </button>
        <button
          onClick={() => setActiveCategory('A07')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
        >
          A07 - Auth Failures
        </button>
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-600 transition-colors"
          >
            Resetar
          </button>
        )}
      </div>
    </div>
  )
}
