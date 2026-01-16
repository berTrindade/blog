"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { codeToHtml } from "shiki"

type TabIcon = 'problem' | 'solution' | 'attack' | 'risk' | 'info' | 'warning' | 'check' | 'audit'

interface CodeTab {
  label: string
  icon?: TabIcon
  code: string
  language?: string
  highlightLines?: string // e.g., "2,10-12" or "1,3-5"
}

interface TabbedCodeBlockProps {
  tabs: CodeTab[]
  filename?: string
  defaultTab?: number
}

// Map language codes to display names
const LANGUAGE_NAMES: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TypeScript (React)',
  jsx: 'JavaScript (React)',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  md: 'Markdown',
  markdown: 'Markdown',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  zsh: 'Zsh',
  python: 'Python',
  py: 'Python',
  rust: 'Rust',
  go: 'Go',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  c: 'C',
  cpp: 'C++',
  csharp: 'C#',
  cs: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  sql: 'SQL',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  docker: 'Dockerfile',
  nginx: 'Nginx',
  plaintext: 'Text',
  text: 'Text',
  txt: 'Text',
}

// Icon components for tabs
function TabIconComponent({ icon, className }: { icon: TabIcon; className?: string }) {
  const baseClass = `w-3.5 h-3.5 ${className || ''}`
  
  switch (icon) {
    case 'problem':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )
    case 'solution':
    case 'check':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'attack':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )
    case 'risk':
    case 'warning':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'info':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    case 'audit':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    default:
      return null
  }
}

// Parse highlight lines string into a Set of line numbers
function parseHighlightLines(highlightLines?: string): Set<number> {
  const lines = new Set<number>()
  if (!highlightLines) return lines

  const parts = highlightLines.split(',')
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(n => parseInt(n.trim(), 10))
      for (let i = start; i <= end; i++) {
        lines.add(i)
      }
    } else {
      lines.add(parseInt(trimmed, 10))
    }
  }
  return lines
}

export function TabbedCodeBlock({ tabs, filename, defaultTab = 0 }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isDark, setIsDark] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentTab = tabs[activeTab]
  const language = currentTab?.language || 'typescript'
  const displayLanguage = LANGUAGE_NAMES[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1)
  const highlightedLines = parseHighlightLines(currentTab?.highlightLines)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Highlight code with Shiki
  // Using primitive dependencies (strings) instead of objects (Set) per rerender-dependencies best practice
  useEffect(() => {
    if (!currentTab?.code) return

    const highlight = async () => {
      // Parse highlight lines inside the effect to avoid stale closure issues
      const linesToHighlight = parseHighlightLines(currentTab?.highlightLines)
      
      try {
        const html = await codeToHtml(currentTab.code.trimEnd(), {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: false,
          transformers: [
            {
              line(node, line) {
                if (linesToHighlight.has(line)) {
                  this.addClassToHast(node, 'highlighted')
                }
              }
            }
          ]
        })
        setHighlightedCode(html)
      } catch {
        // Fallback for unsupported languages
        setHighlightedCode(`<pre><code>${currentTab.code}</code></pre>`)
      }
    }

    highlight()
  }, [currentTab?.code, currentTab?.highlightLines, language, isDark])

  const handleCopy = async () => {
    if (!currentTab?.code) return
    await navigator.clipboard.writeText(currentTab.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Count lines for line numbers
  const lineCount = currentTab?.code?.split('\n').length || 0

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
    <div ref={containerRef} className="group/code relative tabbed-code-block">
      {/* Code block container */}
      <div className="code-block-wrapper">
        {/* Tabs in header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-300/50 dark:bg-gray-200/50 rounded-t-xl">
          <div className="flex items-center gap-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-200 rounded-md ${
                  activeTab === index
                    ? 'text-gray-1200'
                    : 'text-gray-900 hover:text-gray-1100'
                }`}
                type="button"
              >
                {tab.icon && <TabIconComponent icon={tab.icon} />}
                {tab.label}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 bg-gray-1200 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          {copyButton}
        </div>

        {/* Filename row (optional) */}
        {filename && (
          <div className="flex items-center px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-200/50 dark:bg-gray-100/50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-900 bg-gray-400/50 dark:bg-gray-400/30 px-1.5 py-0.5 rounded">
                {displayLanguage}
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-gray-1100">
                {filename}
              </span>
            </div>
          </div>
        )}

        {/* Code area with line numbers */}
        <div className="relative flex">
          {/* Line numbers */}
          {lineCount > 1 && (
            <div
              className="flex-shrink-0 select-none text-right pr-4 py-[15px] text-xs leading-[1.7] text-gray-800 dark:text-gray-700 font-mono"
              style={{ paddingLeft: '12px' }}
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i + 1}
                  className={highlightedLines.has(i + 1) ? 'text-gray-1100 dark:text-gray-1000 font-medium' : ''}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code content */}
          <div className="flex-1 overflow-x-hidden">
            <div
              className="shiki-wrapper py-[15px] pr-4 text-[12px] leading-[1.7] font-mono [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!border-0 [&_code]:!bg-transparent [&_code]:whitespace-pre-wrap [&_code]:break-words"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
