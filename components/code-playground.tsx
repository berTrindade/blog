'use client'

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  useSandpackNavigation,
} from '@codesandbox/sandpack-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme-provider'

interface CodePlaygroundProps {
  files: Record<string, string>
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts'
  showPreview?: boolean
  showLineNumbers?: boolean
  editorHeight?: string
  title?: string
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
    <div className="flex gap-1">
      <button
        aria-label="Reset code"
        title="Reset code"
        onClick={handleReset}
        type="button"
        className="group flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-300 text-gray-1100 hover:text-gray-1200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path d="M18.0618 4.13538C18.8928 3.58721 20 4.18326 20 5.17884V18.8213C20 19.8169 18.8928 20.413 18.0618 19.8648L7.71987 13.0436C6.97086 12.5495 6.97086 11.4507 7.71987 10.9566L18.0618 4.13538Z" fill="currentColor"></path>
          <path d="M4 4.75009C4 4.33588 4.33579 4.00009 4.75 4.00009C5.16421 4.00009 5.5 4.33588 5.5 4.75009V19.2501C5.5 19.6643 5.16421 20.0001 4.75 20.0001C4.33579 20.0001 4 19.6643 4 19.2501V4.75009Z" fill="currentColor"></path>
        </svg>
      </button>
      <button
        aria-label="Refresh preview"
        title="Refresh preview"
        onClick={handleRefresh}
        type="button"
        className="group flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-300 text-gray-1100 hover:text-gray-1200 transition-colors"
      >
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M4.47852 12C4.47852 7.85786 7.83638 4.5 11.9785 4.5C14.4012 4.5 16.0555 5.46268 17.7064 7.25H15.25C14.8358 7.25 14.5 7.58579 14.5 8C14.5 8.41421 14.8358 8.75 15.25 8.75H18.75C19.4404 8.75 20 8.19036 20 7.5V4C20 3.58579 19.6642 3.25 19.25 3.25C18.8358 3.25 18.5 3.58579 18.5 4V5.90778C16.7377 4.10436 14.7767 3 11.9785 3C7.00795 3 2.97852 7.02944 2.97852 12C2.97852 16.9706 7.00795 21 11.9785 21C15.8983 21 19.2311 18.4945 20.4662 14.9999C20.6042 14.6094 20.3995 14.1809 20.009 14.0429C19.6185 13.9048 19.19 14.1095 19.0519 14.5001C18.022 17.4141 15.2429 19.5 11.9785 19.5C7.83638 19.5 4.47852 16.1421 4.47852 12Z" fill="currentColor"></path>
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

  return (
    <div className="my-7">
      <div className="mobile-full-width mx-auto w-full max-w-4xl">
        <SandpackProvider
          template={template}
          files={files}
          theme={isDark ? 'dark' : 'light'}
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
              className="sp-layout overflow-hidden shadow-sm [&_.cm-content]:px-3 [&_.cm-gutterElement]:text-[13px] [&_.cm-gutterElement]:text-gray-900 [&_.cm-matchingBracket]:bg-gray-100 dark:[&_.sp-preview-container]:bg-[#0D0D0D] !rounded-none sm:!rounded-xl" 
              style={{ border: 'none', ['--sp-font-mono' as any]: 'var(--font-mono)' }}
            >
              <header className="flex h-12 w-full items-center justify-between bg-white pl-4 pr-2 dark:bg-[#1a1a1a] border-b border-gray-400">
                <span className="font-medium text-gray-1200">{title}</span>
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
                    <div className="hidden lg:flex h-full w-3 flex-shrink-0 items-center justify-center bg-white transition-colors hover:bg-gray-200 dark:bg-[#1a1a1a] dark:hover:bg-gray-700">
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
    </div>
  )
}
