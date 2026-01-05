'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { ShikiMagicMove } from 'shiki-magic-move/react'
import { createHighlighter, type HighlighterCore } from 'shiki'
import 'shiki-magic-move/dist/style.css'

const codeVersions = [
  `function ask(role: string, ticker: string, signal: AbortSignal) {
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
}`,
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
})`
]

// Fixed height based on the largest code snippet (23 lines × 24px line-height + 32px padding)
const CONTAINER_HEIGHT = 23 * 24 + 32

export function CodeMorphDemoV2() {
  const [code, setCode] = useState(codeVersions[0])
  const [highlighter, setHighlighter] = useState<HighlighterCore>()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function initializeHighlighter() {
      const hl = await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['typescript'],
      })
      setHighlighter(hl)
    }
    initializeHighlighter()
  }, [])

  useEffect(() => {
    if (!highlighter) return
    
    let currentIndex = 0
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % codeVersions.length
      setCode(codeVersions[currentIndex])
    }, 4000)

    return () => clearInterval(timer)
  }, [highlighter])

  const shikiTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light'

  return (
    <div 
      className="not-prose code-morph-wrapper w-full mx-auto rounded-xl my-8" 
      style={{ 
        height: CONTAINER_HEIGHT,
        backgroundImage: 'none'
      }}
    >
      {highlighter && mounted ? (
        <ShikiMagicMove
          key={shikiTheme}
          lang="ts"
          theme={shikiTheme}
          highlighter={highlighter}
          code={code}
          options={{ 
            duration: 800, 
            stagger: 0.3,
            lineNumbers: false,
            animateContainer: false
          }}
          className="h-full"
        />
      ) : (
        <pre>
          <code>{codeVersions[0]}</code>
        </pre>
      )}
    </div>
  )
}