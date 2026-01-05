'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof globalThis.window === 'undefined') return 'light'
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark')
    
    // Always add the resolved theme class
    root.classList.add(resolved)
    
    setResolvedTheme(resolved)
  }, [])

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
    applyTheme(newTheme)
  }, [applyTheme])

  // Initialize on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme = stored || 'system'
    setThemeState(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [applyTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return
    
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        const newResolved = getSystemTheme()
        setResolvedTheme(newResolved)
        // Also update the document class
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(newResolved)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted, theme])

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
