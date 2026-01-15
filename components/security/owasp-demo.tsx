'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

type OWASPCategory = 'A01' | 'A03' | 'A05' | 'A06' | 'A07'

const categories: Record<OWASPCategory, {
  title: string
  description: string
  vulnerable: string
  secure: string
  checklist: string[]
}> = {
  'A01': {
    title: 'Broken Access Control',
    description: 'Users access resources they shouldn\'t have access to.',
    vulnerable: `// Frontend hides admin panel
if (user.isAdmin) {
  return <AdminPanel />
}

// Attacker changes in console:
user.isAdmin = true`,
    secure: `// Backend ALWAYS verifies
app.get('/api/admin', (req, res) => {
  const user = getUserFromToken(req)
  if (!user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  return res.json(adminData)
})`,
    checklist: [
      'Validate permissions on backend',
      'Never trust frontend flags',
      'Implement RBAC (Role-Based Access Control)',
      'Log unauthorized access attempts',
      'Use JWT tokens with role claims'
    ]
  },
  'A03': {
    title: 'Injection (XSS)',
    description: 'Malicious code executes in the browser.',
    vulnerable: `// Dangerous!
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// If userComment = '<img src=x onerror="alert(1)"/>'
// The script executes!`,
    secure: `// Safe with DOMPurify
import DOMPurify from 'dompurify'

const clean = DOMPurify.sanitize(userComment)
<div dangerouslySetInnerHTML={{ __html: clean }} />

// Or better:
<p>{userComment}</p> // React escapes automatically`,
    checklist: [
      'Use DOMPurify to sanitize HTML',
      'Avoid dangerouslySetInnerHTML when possible',
      'Configure Content Security Policy (CSP)',
      'Validate and sanitize inputs on backend too',
      'Use HttpOnly cookies for tokens'
    ]
  },
  'A05': {
    title: 'Security Misconfiguration',
    description: 'Insecure configurations expose the application.',
    vulnerable: `// Vulnerable
// No security headers
// No CSP
// CORS open to all
// Source maps in production`,
    secure: `// next.config.js
module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin' },
        { key: 'Content-Security-Policy', value: "default-src 'self'" }
      ]
    }]
  },
  productionBrowserSourceMaps: false
}`,
    checklist: [
      'Configure security headers',
      'Implement strict CSP',
      'Disable source maps in production',
      'Restrictive CORS (don\'t use *)',
      'Rate limiting on APIs'
    ]
  },
  'A06': {
    title: 'Vulnerable Components',
    description: 'Dependencies with known vulnerabilities.',
    vulnerable: `// Vulnerable package.json
"dependencies": {
  "react": "16.8.0",  // version from 2019!
  "axios": "0.18.0"   // known vulnerabilities
}`,
    secure: `// Keep dependencies updated
npm audit
npm audit fix
npm update

// Use Dependabot/Renovate
// CI fails on critical vulnerabilities`,
    checklist: [
      'Run npm audit regularly',
      'Configure Dependabot or Renovate',
      'Review dependencies before installing',
      'Keep versions updated',
      'CI/CD blocks deploys with vulnerabilities'
    ]
  },
  'A07': {
    title: 'Authentication Failures',
    description: 'Failures in authentication and session management.',
    vulnerable: `// Vulnerable
// Password without hash
// No rate limiting on login
// Tokens in localStorage
// No session expiration`,
    secure: `// Backend with bcrypt
const hash = await bcrypt.hash(password, 10)

// HttpOnly cookies
res.cookie('token', jwt, { 
  httpOnly: true, 
  secure: true 
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 5 attempts per 15min
})
app.use('/api/login', limiter)`,
    checklist: [
      'Hash passwords with bcrypt (min 10 rounds)',
      'HttpOnly cookies for tokens',
      'Rate limiting on login/register',
      'Require strong password (min 8 chars)',
      'Implement MFA when possible',
      'Session expiration',
      'Log login attempts'
    ]
  }
}

export function OWASPDemo() {
  const [activeTab, setActiveTab] = useState<OWASPCategory>('A01')

  const current = categories[activeTab]

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {(Object.keys(categories) as OWASPCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
              activeTab === key
                ? 'bg-gray-300 dark:bg-gray-200'
                : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[520px]">
          <div className="space-y-4">
          {/* Title & Description */}
          <div>
            <h4 className="text-base font-medium text-gray-1100 dark:text-gray-1100 mb-1">
              {activeTab} - {current.title}
            </h4>
            <p className="text-sm text-gray-1100 dark:text-gray-1100">
              {current.description}
            </p>
          </div>

          {/* Vulnerable Code */}
          <CodeBox title="❌ Vulnerable" language="javascript">
            {current.vulnerable}
          </CodeBox>

          {/* Secure Code */}
          <CodeBox title="✅ Secure" language="javascript">
            {current.secure}
          </CodeBox>

          {/* Checklist */}
          <div>
            <p className="text-sm font-medium text-gray-1100 dark:text-gray-1100 mb-2">Checklist:</p>
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-1 list-none ml-2">
              {current.checklist.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </div>
  )
}
