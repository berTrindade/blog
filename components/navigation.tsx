"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useTheme } from "@/components/theme-provider"

function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    if (copied) return
    
    try {
      await navigator.clipboard.writeText(globalThis.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = globalThis.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
      type="button"
      aria-label={copied ? "Copied!" : "Copy link"}
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
            key="link"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            aria-label="Link icon" 
            className="absolute h-4 w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200"
            fill="none" 
            height="24" 
            role="graphics-symbol" 
            viewBox="0 0 24 24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.99999 13C10.4294 13.5741 10.9773 14.0491 11.6065 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9547 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.552 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0685 9.05885 10.3533 9.00763C9.63819 8.95641 8.9204 9.0596 8.24864 9.31018C7.57688 9.56077 6.96687 9.9529 6.45999 10.46L3.45999 13.46C2.5492 14.403 2.04522 15.666 2.05662 16.977C2.06801 18.288 2.59385 19.542 3.52089 20.4691C4.44793 21.3961 5.702 21.9219 7.01298 21.9333C8.32396 21.9447 9.58697 21.4408 10.53 20.53L12.24 18.82" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}

export function Navigation({ showShare = false }: { showShare?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const isDark = resolvedTheme === "dark"

  return (
    <nav className="flex items-center justify-end gap-2 px-1">
      {showShare && <ShareButton />}
      <button
        onClick={handleClick}
        className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
        aria-label="Toggle theme"
      >
        {mounted && (
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="absolute"
              >
                <Moon 
                  aria-label="Dark mode"
                  className="h-4 w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="absolute"
              >
                <Sun 
                  aria-label="Light mode"
                  className="h-4 w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </button>
    </nav>
  )
}
