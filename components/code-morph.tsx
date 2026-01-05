'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

const codeVersions = [
  // Version 1: Effect-based
  `const ask = (role: string, ticker: string) =>
  LanguageModel.generateText({
    system: \`You are a \${role}. Give stock advice.\`,
    prompt: ticker
  })

const getStockAdvice = Effect.fn(function* (ticker: string) {
  const [tree, star, beetle] = yield* Effect.all([
    ask("tree", ticker),
    ask("Zubenelgenubi", ticker),
    ask("dung beetle", ticker)
  ], { concurrency: "unbounded" })
  return { tree, star, beetle }
})`,
  // Version 2: Async/await
  `function ask = (role: string, ticker: string, signal: AbortSignal) {
  return generateText({
    model: anthropic('claude-opus-4-5'),
    system: \`You are a \${role}. Give stock advice.\`,
    prompt: ticker,
    abortSignal: signal,
  })
}

async function getStockAdvice(ticker: string) {
  const controller = new AbortController()

  try {
    const [tree, star, beetle] = await Promise.all([
      ask("tree", ticker, controller.signal),
      ask("Zubenelgenubi", ticker, controller.signal),
      ask("dung beetle", ticker, controller.signal)
    ])
    return { tree, star, beetle }
  } catch (e) {
    controller.abort()
    throw e
  }
}`
]

// Syntax highlighting function
const highlightCode = (code: string) => {
  let result = code
  
  // Escape HTML first
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Highlight strings (including template literals)
  result = result.replace(
    /(`[^`]*`|"[^"]*"|'[^']*')/g,
    '<span class="text-[#C3E88D]">$1</span>'
  )
  
  // Highlight keywords
  result = result.replace(
    /\b(const|function|return|async|await|try|catch|throw|new|yield)\b/g,
    '<span class="text-[#C792EA]">$1</span>'
  )
  
  // Highlight function* (generator)
  result = result.replace(
    /(function)(\*)/g,
    '<span class="text-[#C792EA]">$1</span><span class="text-[#89DDFF]">$2</span>'
  )
  
  // Highlight yield*
  result = result.replace(
    /(yield)(\*)/g,
    '<span class="text-[#C792EA]">$1</span><span class="text-[#89DDFF]">$2</span>'
  )
  
  // Highlight types
  result = result.replace(
    /\b(string|number|boolean|void|any|unknown|never|AbortSignal|AbortController)\b/g,
    '<span class="text-[#FFCB6B]">$1</span>'
  )
  
  // Highlight object properties and methods (after dots)
  result = result.replace(
    /\.(\w+)/g,
    '.<span class="text-[#82AAFF]">$1</span>'
  )
  
  // Highlight function calls (word followed by opening paren)
  result = result.replace(
    /\b(\w+)(\s*)(\()/g,
    (match, name, space, paren) => {
      // Don't highlight if it's already highlighted (part of a class/property)
      if (name.match(/^(const|function|return|async|await|try|catch|throw|new|yield|string|number|boolean|void|any|unknown|never)$/)) {
        return match
      }
      return `<span class="text-[#82AAFF]">${name}</span>${space}${paren}`
    }
  )
  
  // Highlight special properties in object literals
  result = result.replace(
    /(\w+)(\s*)(:)(?!\s*string)/g,
    '<span class="text-[#82AAFF]">$1</span>$2$3'
  )
  
  return result
}

export function CodeMorphDemo() {
  const [currentVersion, setCurrentVersion] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setCurrentVersion((prev) => (prev + 1) % codeVersions.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full not-prose my-8">
      <div className="bg-[#1e1e2e] rounded-xl border border-[#313244] overflow-hidden pb-14">
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.pre
              key={currentVersion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-mono text-[13px] leading-[1.7] text-[#A6ACCD] overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: highlightCode(codeVersions[currentVersion]) }}
            />
          </AnimatePresence>
        </div>

        {/* Minimal controls */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Progress bar */}
          <div className="h-[2px] bg-[#313244]">
            <motion.div
              className="h-full bg-[#89DCEB]"
              animate={{ 
                width: isPlaying ? '100%' : `${(currentVersion / (codeVersions.length - 1)) * 100}%`
              }}
              transition={{ 
                duration: isPlaying ? 4 : 0,
                ease: 'linear'
              }}
            />
          </div>

          {/* Play button */}
          <div className="px-6 py-3 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 text-[#CDD6F4] hover:text-white transition-colors text-sm"
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <div className="text-xs text-[#6C7086] font-mono">
              {currentVersion + 1} / {codeVersions.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InlineCodeMorphDemo() {
  const states = [
    'Promise.all()',
    'yield* Effect.all()',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % states.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-lg border border-gray-800">
      <span className="text-gray-500 text-sm font-mono">from</span>
      <AnimatePresence mode="wait">
        <motion.code
          key={index}
          initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-purple-400 font-mono text-sm"
        >
          {states[index]}
        </motion.code>
      </AnimatePresence>
    </div>
  )
}

export function HighlightMorphDemo() {
  const [highlighted, setHighlighted] = useState(0)
  
  const lines = [
    { text: 'const result = await fetch("/api/data")' },
    { text: 'const data = await result.json()' },
    { text: 'return data.items' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlighted((i) => (i + 1) % lines.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d] rounded-xl border border-gray-800 p-6">
      <div className="font-mono text-sm space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i === highlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              x: i === highlighted ? 8 : 0,
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="py-1 px-3 rounded"
          >
            <span className="text-gray-300">{line.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
