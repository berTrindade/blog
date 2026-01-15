'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { codeToHtml } from 'shiki'

// Map language codes to display names (same as blog's code-block.tsx)
const LANGUAGE_NAMES: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TypeScript (React)',
  jsx: 'JavaScript (React)',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  python: 'Python',
  sql: 'SQL',
}

interface CodeBoxProps {
  title?: string
  language?: string
  children: string
}

export function CodeBox({ title, language = 'typescript', children }: CodeBoxProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null)

  const displayLanguage = LANGUAGE_NAMES[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1)

  useEffect(() => {
    async function highlight() {
      try {
        const html = await codeToHtml(children, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: false, // Use CSS variables for theme switching
        })
        setHighlightedCode(html)
      } catch {
        setHighlightedCode(null)
      }
    }
    highlight()
  }, [children, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Count lines for line numbers
  const lines = children.split('\n')
  const lineCount = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length
  const showLineNumbers = lineCount > 1

  const copyButton = (
    <button
      onClick={handleCopy}
      className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
      type="button"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.svg
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            aria-label="Check icon" 
            className="h-3.5 w-3.5 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200"
            fill="none" 
            height="24" 
            role="graphics-symbol" 
            viewBox="0 0 24 24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          </motion.svg>
        ) : (
          <motion.svg
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            aria-label="Copy icon"
            className="h-3.5 w-3.5 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200"
            fill="none"
            height="24"
            role="graphics-symbol"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )

  return (
    <div className="code-block-wrapper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-200/50 dark:bg-gray-100/50 rounded-t-xl">
        <span className="text-xs font-medium text-gray-900 dark:text-gray-1100">
          {title || displayLanguage}
        </span>
        {copyButton}
      </div>
      
      {/* Code area */}
      <div className="relative flex bg-gray-200 dark:bg-gray-100 rounded-b-xl">
        {/* Line numbers */}
        {showLineNumbers && (
          <div 
            className="flex-shrink-0 select-none text-right pr-4 py-[15px] text-xs leading-[1.7] text-gray-800 dark:text-gray-700 font-mono"
            style={{ paddingLeft: '12px' }}
            aria-hidden="true"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>
        )}
        
        {/* Code content */}
        {highlightedCode ? (
          <div 
            className={`flex-1 overflow-x-auto py-[15px] pr-4 ${showLineNumbers ? 'pl-0' : 'pl-4'} text-xs leading-[1.7] font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_.shiki]:!bg-transparent`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className={`flex-1 overflow-x-auto py-[15px] pr-4 ${showLineNumbers ? 'pl-0' : 'pl-4'} text-xs leading-[1.7] font-mono text-gray-1100`}>
            <code>{children}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
