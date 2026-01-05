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

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isMultiLine, setIsMultiLine] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

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
    if (preRef.current) {
      const lineCount = preRef.current.textContent?.split('\n').filter(line => line.trim()).length || 0
      setIsMultiLine(lineCount > 1)
      
      // Check for mermaid content
      const text = preRef.current.textContent?.trim() || ''
      const mermaidPatterns = ['graph ', 'graph\n', 'flowchart ', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'journey', 'gantt', 'pie ', 'pie\n', 'mindmap', 'timeline', 'subgraph']
      const isMermaidContent = mermaidPatterns.some(pattern => text.startsWith(pattern))
      
      if (isMermaidContent) {
        setDetectedMermaid(true)
        setMermaidCode(text)
      }
    }
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

  return (
    <div className="group/code relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className={`group flex absolute right-4 size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform ${
          isMultiLine ? 'top-4' : 'top-1/2 -translate-y-1/2'
        }`}
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
              className="absolute h-[18px] w-[18px] stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200"
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
              className="absolute h-4 w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200"
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
