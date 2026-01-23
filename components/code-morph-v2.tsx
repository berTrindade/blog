'use client'

import { useState, useCallback } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { motion, AnimatePresence } from 'motion/react'
import { useRef } from 'react'
import { CodeMorph } from '@/remotion/components/CodeMorph'

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

// Calculate duration: 2 versions × (90 hold + 30 transition) = 240 frames, loop back
const HOLD_DURATION = 90 // 3 seconds at 30fps
const TRANSITION_DURATION = 30 // 1 second transition
const FPS = 30
const TOTAL_FRAMES = codeVersions.length * (HOLD_DURATION + TRANSITION_DURATION)

export function CodeMorphDemoV2() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [copied, setCopied] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const playerRef = useRef<PlayerRef>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeVersions[currentIndex])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return
    
    if (isPlaying) {
      playerRef.current.pause()
    } else {
      playerRef.current.play()
    }
    setIsPlaying(prev => !prev)
  }, [isPlaying])

  const goToStep = (index: number) => {
    if (!playerRef.current) return
    const targetFrame = index * (HOLD_DURATION + TRANSITION_DURATION)
    playerRef.current.seekTo(targetFrame)
    setCurrentIndex(index)
  }

  // Update current index based on frame
  const handleFrameChange = useCallback((frame: number) => {
    const cycleDuration = HOLD_DURATION + TRANSITION_DURATION
    const newIndex = Math.floor(frame / cycleDuration) % codeVersions.length
    setCurrentIndex(newIndex)
  }, [])

  // Max line count for stable layout
  const maxLineCount = Math.max(...codeVersions.map(v => v.split('\n').length))

  return (
    <div className="not-prose group/code relative code-block-wrapper my-8">
      {/* Language header with controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-200/50 dark:bg-gray-100/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-900 dark:text-gray-1100">
            TypeScript (React)
          </span>
          {/* Step indicator */}
          <div className="flex items-center gap-1.5">
            {codeVersions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-gray-1200' 
                    : 'bg-gray-500 hover:bg-gray-700'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
            type="button"
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg
                  key="pause"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="h-3.5 w-3.5 fill-gray-1000 transition-colors duration-200 ease-out group-hover:fill-gray-1200"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="h-3.5 w-3.5 fill-gray-1000 transition-colors duration-200 ease-out group-hover:fill-gray-1200"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5.14v14.72a1 1 0 001.5.86l11.5-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>

          {/* Copy button */}
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
                  viewBox="0 0 24 24" 
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
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Remotion Player */}
      <div 
        className="rounded-b-xl overflow-hidden"
        style={{ minHeight: `${maxLineCount * 1.7 * 14 + 32}px` }}
      >
        <Player
          ref={playerRef}
          component={CodeMorph}
          inputProps={{
            codeVersions,
            transitionDuration: TRANSITION_DURATION,
            holdDuration: HOLD_DURATION,
          }}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          compositionWidth={800}
          compositionHeight={maxLineCount * 24 + 32}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: `800 / ${maxLineCount * 24 + 32}`,
          }}
          loop
          autoPlay={isPlaying}
          controls={false}
          showVolumeControls={false}
          doubleClickToFullscreen={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          moveToBeginningWhenEnded={false}
        />
      </div>
    </div>
  )
}
