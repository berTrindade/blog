"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    // Only toggle between light and dark, never use system
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const isDark = resolvedTheme === "dark"

  if (!mounted) {
    return (
      <button
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent transition-opacity duration-200 ease-out hover:opacity-70"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent transition-opacity duration-200 ease-out hover:opacity-70"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute"
          >
            <Moon 
              aria-label="Dark mode"
              className="h-4 w-4 stroke-gray-1200 dark:stroke-white transition-colors duration-200 ease-out" 
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute"
          >
            <Sun 
              aria-label="Light mode"
              className="h-4 w-4 stroke-gray-1200 dark:stroke-white transition-colors duration-200 ease-out" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
