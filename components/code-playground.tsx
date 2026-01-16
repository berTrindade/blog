'use client'

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  useSandpackNavigation,
  type SandpackTheme,
} from '@codesandbox/sandpack-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme-provider'
import { motion, AnimatePresence } from 'motion/react'

interface CodePlaygroundProps {
  files: Record<string, string>
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts'
  showPreview?: boolean
  showLineNumbers?: boolean
  editorHeight?: string
  title?: string
}

// Custom Sandpack theme matching the blog's design system and GitHub theme colors
const blogLightTheme: SandpackTheme = {
  colors: {
    surface1: '#ffffff',
    surface2: '#f6f8fa',
    surface3: '#f0f0f0',
    clickable: '#6e7781',
    base: '#24292f',
    disabled: '#8c959f',
    hover: '#24292f',
    accent: '#24292f',
    error: '#cf222e',
    errorSurface: '#ffebe9',
  },
  syntax: {
    plain: '#24292f',
    comment: { color: '#6e7781', fontStyle: 'italic' },
    keyword: '#cf222e',
    tag: '#116329',
    punctuation: '#24292f',
    definition: '#8250df',
    property: '#0550ae',
    static: '#0550ae',
    string: '#0a3069',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: '13px',
    lineHeight: '1.7',
  },
}

const blogDarkTheme: SandpackTheme = {
  colors: {
    surface1: '#111111',
    surface2: '#1a1a1a',
    surface3: '#252525',
    clickable: '#8b949e',
    base: '#e6e6e6',
    disabled: '#555555',
    hover: '#e6e6e6',
    accent: '#e6e6e6',
    error: '#f85149',
    errorSurface: '#3d1d20',
  },
  syntax: {
    plain: '#e6e6e6',
    comment: { color: '#6e6e6e', fontStyle: 'italic' },
    keyword: '#ff7b72',
    tag: '#7ee787',
    punctuation: '#e6e6e6',
    definition: '#d2a8ff',
    property: '#79c0ff',
    static: '#79c0ff',
    string: '#a5d6ff',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: '13px',
    lineHeight: '1.7',
  },
}

function CopyButton() {
  const { sandpack } = useSandpack()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const activeFile = sandpack.activeFile
    const code = sandpack.files[activeFile]?.code || ''
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
      type="button"
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
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
}

function ToolbarButtons() {
  const { sandpack } = useSandpack()
  const { refresh } = useSandpackNavigation()

  const handleReset = () => {
    sandpack.resetAllFiles()
  }

  const handleRefresh = () => {
    refresh()
  }

  return (
    <div className="flex gap-1 items-center">
      <CopyButton />
      <button
        aria-label="Reset code"
        title="Reset code"
        onClick={handleReset}
        type="button"
        className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-gray-1000 transition-colors duration-200 ease-out group-hover:fill-gray-1200" viewBox="0 0 24 24" fill="none">
          <path d="M18.0618 4.13538C18.8928 3.58721 20 4.18326 20 5.17884V18.8213C20 19.8169 18.8928 20.413 18.0618 19.8648L7.71987 13.0436C6.97086 12.5495 6.97086 11.4507 7.71987 10.9566L18.0618 4.13538Z"></path>
          <path d="M4 4.75009C4 4.33588 4.33579 4.00009 4.75 4.00009C5.16421 4.00009 5.5 4.33588 5.5 4.75009V19.2501C5.5 19.6643 5.16421 20.0001 4.75 20.0001C4.33579 20.0001 4 19.6643 4 19.2501V4.75009Z"></path>
        </svg>
      </button>
      <button
        aria-label="Refresh preview"
        title="Refresh preview"
        onClick={handleRefresh}
        type="button"
        className="group flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform"
      >
        <svg className="h-3.5 w-3.5 fill-gray-1000 transition-colors duration-200 ease-out group-hover:fill-gray-1200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M4.47852 12C4.47852 7.85786 7.83638 4.5 11.9785 4.5C14.4012 4.5 16.0555 5.46268 17.7064 7.25H15.25C14.8358 7.25 14.5 7.58579 14.5 8C14.5 8.41421 14.8358 8.75 15.25 8.75H18.75C19.4404 8.75 20 8.19036 20 7.5V4C20 3.58579 19.6642 3.25 19.25 3.25C18.8358 3.25 18.5 3.58579 18.5 4V5.90778C16.7377 4.10436 14.7767 3 11.9785 3C7.00795 3 2.97852 7.02944 2.97852 12C2.97852 16.9706 7.00795 21 11.9785 21C15.8983 21 19.2311 18.4945 20.4662 14.9999C20.6042 14.6094 20.3995 14.1809 20.009 14.0429C19.6185 13.9048 19.19 14.1095 19.0519 14.5001C18.022 17.4141 15.2429 19.5 11.9785 19.5C7.83638 19.5 4.47852 16.1421 4.47852 12Z"></path>
        </svg>
      </button>
    </div>
  )
}

export function CodePlayground({
  files,
  template = 'react',
  showPreview = true,
  showLineNumbers = true,
  editorHeight = '50vh',
  title = 'Code Playground'
}: CodePlaygroundProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use resolvedTheme to handle system theme, fallback to 'light' during SSR
  const isDark = mounted ? resolvedTheme === 'dark' : false
  const theme = isDark ? blogDarkTheme : blogLightTheme

  return (
    <div className="code-block-wrapper code-playground-wide my-7">
        <SandpackProvider
          template={template}
          files={files}
          theme={theme}
          customSetup={{
            dependencies: {
              'dompurify': 'latest',
              '@types/dompurify': 'latest'
            }
          }}
          options={{
            activeFile: Object.keys(files)[0]
          }}
        >
          <div className="sp-wrapper">
            <div 
              className="sp-layout overflow-hidden shadow-sm !rounded-none sm:!rounded-xl" 
              style={{ border: 'none', ['--sp-font-mono' as any]: 'var(--font-mono)' }}
            >
              <header className="flex items-center justify-between px-4 py-2 border-b border-black/6 dark:border-white/5 bg-gray-300/50 dark:bg-gray-200/50 rounded-t-xl">
                <span className="text-xs font-medium text-gray-1100 dark:text-gray-1100">
                  {title}
                </span>
                <ToolbarButtons />
              </header>
              <div className="relative flex h-fit w-full flex-col lg:h-auto lg:flex-row">
                <div className="panel flex-1">
                  <SandpackCodeEditor
                    showLineNumbers={showLineNumbers}
                    showTabs={true}
                    showInlineErrors
                    wrapContent
                    style={{ height: editorHeight }}
                  />
                </div>
                {showPreview && (
                  <>
                    <div className="hidden lg:flex h-full w-3 flex-shrink-0 items-center justify-center bg-white transition-colors hover:bg-gray-200 dark:bg-[#161b22] dark:hover:bg-gray-700">
                      <div className="h-full w-px bg-gray-400"></div>
                    </div>
                    <div className="panel relative select-none border-t border-gray-400 lg:border-none flex-1">
                      <SandpackPreview
                        showOpenInCodeSandbox={false}
                        showRefreshButton={false}
                        style={{ height: editorHeight, minHeight: '280px' }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </SandpackProvider>
    </div>
  )
}
