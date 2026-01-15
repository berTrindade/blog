"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Mermaid } from "@/components/mermaid"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  raw?: string
  'data-language'?: string
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

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [lineCount, setLineCount] = useState(0)
  const preRef = useRef<HTMLPreElement>(null)

  // Get language from props or className
  const language = props['data-language'] || className?.match(/language-(\w+)/)?.[1] || ''
  const displayLanguage = LANGUAGE_NAMES[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1)

  // Check if this is a mermaid code block
  const isMermaid = 
    props['data-language'] === 'mermaid' ||
    className?.includes('language-mermaid') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('graph') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('flowchart') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('sequenceDiagram') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('classDiagram') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('stateDiagram') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('erDiagram') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('journey') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('gantt') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('pie') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('mindmap') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('timeline') ||
    className?.includes('shiki') && preRef.current?.textContent?.trim().startsWith('subgraph')

  // State to track mermaid detection after mount
  const [detectedMermaid, setDetectedMermaid] = useState(false)
  const [mermaidCode, setMermaidCode] = useState('')

  useEffect(() => {
    const countLines = () => {
      if (!preRef.current) return
      
      const text = preRef.current.textContent || ''
      
      // Check for mermaid content first
      const trimmedText = text.trim()
      const mermaidPatterns = ['graph ', 'graph\n', 'flowchart ', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'journey', 'gantt', 'pie ', 'pie\n', 'mindmap', 'timeline', 'subgraph']
      const isMermaidContent = mermaidPatterns.some(pattern => trimmedText.startsWith(pattern))
      
      if (isMermaidContent) {
        setDetectedMermaid(true)
        setMermaidCode(trimmedText)
        return
      }
      
      // Count lines from Shiki's rendered structure
      // Shiki wraps each line in <span class="line"> elements
      const codeElement = preRef.current.querySelector('code')
      if (codeElement) {
        const lineElements = codeElement.querySelectorAll('span.line')
        if (lineElements.length > 0) {
          // Count actual line elements (including empty lines in middle)
          let count = lineElements.length
          
          // Remove trailing empty lines only
          // Check if the last line element is empty
          const lastLine = lineElements[lineElements.length - 1]
          if (lastLine && lastLine.textContent?.trim() === '') {
            count = count - 1
          }
          
          setLineCount(Math.max(count, 1))
          return
        }
      }
      
      // Fallback: if no Shiki structure, use textContent split
      const lines = text.split('\n')
      const count = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length
      setLineCount(Math.max(count, 1))
    }
    
    // Try immediately
    countLines()
    
    // Also try after a short delay in case Shiki renders asynchronously
    const timeoutId = setTimeout(countLines, 0)
    
    return () => clearTimeout(timeoutId)
  }, [children])

  // If it's a mermaid diagram, render Mermaid component instead
  if (detectedMermaid && mermaidCode) {
    return <Mermaid chart={mermaidCode} />
  }

  const handleCopy = async () => {
    const preElement = typeof children === 'object' && children && 'props' in children 
      ? (children as any).props.children 
      : children
    
    const textToCopy = extractText(preElement)
    
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isMultiLine = lineCount > 1

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
    <div className="group/code relative code-block-wrapper">
      {/* Language header with copy button */}
      {language ? (
        <div className="flex items-center justify-between px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-200/50 dark:bg-gray-100/50 rounded-t-xl -mb-[1px]">
          <span className="text-xs font-medium text-gray-900 dark:text-gray-1100">
            {displayLanguage}
          </span>
          {copyButton}
        </div>
      ) : (
        <div className="absolute right-4 top-4 z-10">
          {copyButton}
        </div>
      )}
      
      <div className="relative flex">
        {/* Line numbers */}
        {isMultiLine && (
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
        
        <pre 
          ref={preRef} 
          className={`${className} ${language ? 'rounded-t-none' : ''} ${isMultiLine ? '!pl-0' : ''} flex-1 overflow-x-auto`} 
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}

function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText(node.props.children)
  }
  return ''
}
