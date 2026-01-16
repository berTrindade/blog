'use client'

import { TabbedCodeBlock } from '@/components/tabbed-code-block'

export function XSSDemo() {
  return (
    <div className="my-8 space-y-4">
      <TabbedCodeBlock
        filename="Comment.jsx"
        tabs={[
          {
            label: "Vulnerable",
            icon: "problem",
            language: "jsx",
            code: `// NEVER do this!
function Comment({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}

// If user sends:
const maliciousComment = '<img src=x onerror="alert(\\'XSS\\')"/>'

// The script will execute!
// The browser executes any JavaScript in the HTML,
// including malicious scripts that can steal cookies,
// tokens, or perform actions on behalf of the user.`
          },
          {
            label: "Secure",
            icon: "solution",
            language: "jsx",
            code: `// Option 1: Use plain text (React escapes automatically)
function Comment({ text }) {
  return <p>{text}</p>
}

// Option 2: If you NEED HTML, use DOMPurify
import DOMPurify from 'dompurify'

function CommentHTML({ html }) {
  const sanitized = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// Malicious scripts are removed!
// DOMPurify removes malicious scripts but keeps safe formatting.
// React also automatically escapes values in {}.`
          },
          {
            label: "Checklist",
            icon: "info",
            language: "javascript",
            code: `// XSS Prevention Checklist:

// 1. Never use dangerouslySetInnerHTML without sanitization

// 2. Use textContent instead of innerHTML

// 3. Sanitize HTML with DOMPurify when necessary

// 4. Configure Content Security Policy (CSP)

// Example CSP header:
// Content-Security-Policy: default-src 'self'; script-src 'self'`
          }
        ]}
      />
    </div>
  )
}
