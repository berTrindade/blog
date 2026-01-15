'use client'

import { useState } from 'react'
import { CodeBox } from './code-box'

export function XSSDemo() {
  const [activeTab, setActiveTab] = useState<'vulnerable' | 'secure' | 'checklist'>('vulnerable')

  return (
    <div className="my-8">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab('vulnerable')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'vulnerable'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ❌ Vulnerable
        </button>
        <button
          onClick={() => setActiveTab('secure')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'secure'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          ✅ Secure
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-1100 dark:text-gray-1100 ${
            activeTab === 'checklist'
              ? 'bg-gray-300 dark:bg-gray-200'
              : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/50'
          }`}
        >
          💡 Checklist
        </button>
          </div>

      {/* Content - min-height prevents layout shift */}
      <div className="min-h-[380px]">
        {activeTab === 'vulnerable' && (
          <div className="space-y-4">
            <CodeBox title="Dangerous Pattern" language="jsx">
{`// NEVER do this!
function Comment({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}

// If user sends:
const maliciousComment = '<img src=x onerror="alert(\\'XSS\\')"/>'

// The script will execute!`}
            </CodeBox>
            <p className="text-sm text-gray-1100 dark:text-gray-1100">
              The browser executes any JavaScript in the HTML, including malicious scripts that can steal cookies, tokens, or perform actions on behalf of the user.
              </p>
          </div>
        )}

        {activeTab === 'secure' && (
          <div className="space-y-4">
            <CodeBox title="Safe Patterns" language="jsx">
{`// Option 1: Use plain text (React escapes automatically)
function Comment({ text }) {
  return <p>{text}</p>
}

// Option 2: If you NEED HTML, use DOMPurify
import DOMPurify from 'dompurify'

function CommentHTML({ html }) {
  const sanitized = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// Malicious scripts are removed!`}
            </CodeBox>
            <p className="text-sm text-gray-1100 dark:text-gray-1100">
              DOMPurify removes malicious scripts but keeps safe formatting. React also automatically escapes values in {`{}`}.
              </p>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <ul className="text-sm text-gray-1100 dark:text-gray-1100 space-y-2 list-disc list-inside ml-2">
              <li>Never use <code className="bg-gray-300 dark:bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">dangerouslySetInnerHTML</code> without sanitization</li>
              <li>Use <code className="bg-gray-300 dark:bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">textContent</code> instead of <code className="bg-gray-300 dark:bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">innerHTML</code></li>
              <li>Sanitize HTML with DOMPurify when necessary</li>
              <li>Configure Content Security Policy (CSP)</li>
            </ul>
      </div>
        )}
      </div>
    </div>
  )
}
