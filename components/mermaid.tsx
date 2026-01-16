'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { motion, AnimatePresence } from 'motion/react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [isDark, setIsDark] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasTransformed, setHasTransformed] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(chart)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Handle Escape key to close zoom
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isZoomed])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isZoomed])

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'neutral',
      securityLevel: 'loose',
    })

    const renderDiagram = async () => {
      if (!chart) return
      
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      
      const cleanChart = typeof chart === 'string' 
        ? chart.trim() 
        : String(chart).trim()
      
      try {
        let { svg } = await mermaid.render(id, cleanChart)
        
        // Remove background-color from edge label spans using string replacement
        // This handles the foreignObject HTML content that DOM queries can't reach
        svg = svg.replace(/background-color:\s*[^;"\s]+[;]?/gi, '')
        svg = svg.replace(/background:\s*[^;"\s]+[;]?/gi, '')
        
        // Make SVG responsive
        const parser = new DOMParser()
        const doc = parser.parseFromString(svg, 'image/svg+xml')
        const svgElement = doc.documentElement
        
        const width = svgElement.getAttribute('width')
        const height = svgElement.getAttribute('height')
        
        if (width && height) {
          const numWidth = parseFloat(width)
          const numHeight = parseFloat(height)
          if (!svgElement.getAttribute('viewBox')) {
            svgElement.setAttribute('viewBox', `0 0 ${numWidth} ${numHeight}`)
          }
          svgElement.setAttribute('width', '100%')
          svgElement.setAttribute('height', 'auto')
          svgElement.style.maxWidth = '100%'
          svgElement.style.display = 'block'
          svgElement.style.margin = '0 auto'
        }
        
        // Make edge label backgrounds semi-transparent
        const edgeLabelBackgrounds = svgElement.querySelectorAll('.edgeLabel rect, .edgeLabel polygon, .labelBkg, g.edgeLabel > rect, g[class*="edgeLabel"] rect')
        edgeLabelBackgrounds.forEach((el) => {
          el.setAttribute('fill', isDark ? '#1e1e1e' : '#ffffff')
          el.setAttribute('fill-opacity', '0.15')
          el.setAttribute('stroke', 'none')
        })
        
        // Make arrow lines lighter/more transparent
        const edgePaths = svgElement.querySelectorAll('.edgePath path, .flowchart-link')
        edgePaths.forEach((el) => {
          el.setAttribute('stroke-opacity', '0.25')
        })
        
        // Also make arrowhead markers more transparent
        const markers = svgElement.querySelectorAll('marker path, marker polygon')
        markers.forEach((el) => {
          el.setAttribute('fill-opacity', '0.25')
          el.setAttribute('stroke-opacity', '0.25')
        })
        
        
        const serializer = new XMLSerializer()
        setSvg(serializer.serializeToString(doc.documentElement))
      } catch (error: unknown) {
        console.error('Mermaid rendering error:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        setSvg(`<pre class="text-red-500 p-4">Error rendering diagram: ${message}</pre>`)
      }
    }

    renderDiagram()
  }, [chart, isDark])

  return (
    <>
      <div className="group/mermaid relative my-4">
        {/* Cursor-style toolbar - top right, shows on hover, hidden on mobile */}
        <div className="absolute right-3 top-3 z-10 hidden items-center rounded-lg border border-gray-200 bg-white p-1 opacity-0 shadow-sm transition-opacity duration-200 group-hover/mermaid:opacity-100 dark:border-[#4a4a4a] dark:bg-[#323232] dark:shadow-none lg:flex">
          {/* Expand - two diagonal arrows pointing outward */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(true) }}
            className="group/btn flex size-8 cursor-pointer items-center justify-center"
            aria-label="Expand diagram"
          >
            <svg className="h-4 w-4 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 9V4h-5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 4l-6 6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v5h5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l6-6" />
            </svg>
          </button>
          {/* Copy */}
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy() }}
            className="group/btn flex size-8 cursor-pointer items-center justify-center"
            aria-label={copied ? "Copied!" : "Copy diagram code"}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.svg
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="h-5 w-5 text-gray-1000 dark:text-[#8c8c8c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
        
        <div
          ref={ref}
          className="mermaid-diagram overflow-hidden rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#1e1e1e]"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {/* Zoomed modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 dark:bg-black/95"
            onClick={() => { setIsZoomed(false); setHasTransformed(false) }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative h-[90vh] w-full max-w-6xl rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1e1e1e]"
              onClick={(e) => e.stopPropagation()}
            >
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                limitToBounds={false}
                wheel={{ step: 0.1 }}
                doubleClick={{ mode: 'toggle', step: 0.7 }}
                onTransformed={(_, state) => {
                  // Show extra controls when scale !== 1 or position has changed
                  const isTransformed = state.scale !== 1 || state.positionX !== 0 || state.positionY !== 0
                  setHasTransformed(isTransformed)
                }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Cursor-style toolbar - top right, full toolbar */}
                    <div className="absolute right-4 top-4 z-10 flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-[#4a4a4a] dark:bg-[#323232] dark:shadow-none">
                      {/* Collapse/Minimize - two diagonal arrows pointing inward ↙↗ */}
                      <button
                        onClick={() => { setIsZoomed(false); setHasTransformed(false) }}
                        className="group/btn flex size-8 cursor-pointer items-center justify-center"
                        aria-label="Minimize"
                      >
                        <svg className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 4l-6 6m0-4v4h4" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l6-6m0 4v-4h-4" />
                        </svg>
                      </button>
                      {/* Copy */}
                      <button
                        onClick={() => handleCopy()}
                        className="group/btn flex size-8 cursor-pointer items-center justify-center"
                        aria-label={copied ? "Copied!" : "Copy diagram code"}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.svg
                              key="check"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.1 }}
                              className="h-5 w-5 text-gray-1000 dark:text-[#8c8c8c]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
                            </motion.svg>
                          ) : (
                            <motion.svg
                              key="copy"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.1 }}
                              className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <rect x="8" y="8" width="12" height="12" rx="2" />
                              <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </button>
                      {/* These buttons only show when diagram has been transformed */}
                      {hasTransformed && (
                        <>
                          {/* Reset/Undo - curved arrow */}
                          <button
                            onClick={() => { resetTransform(); setHasTransformed(false) }}
                            className="group/btn flex size-8 cursor-pointer items-center justify-center"
                            aria-label="Reset view"
                          >
                            <svg className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10c4 0 7 3 7 7M3 10l5-5M3 10l5 5" />
                            </svg>
                          </button>
                          {/* Zoom In - magnifying glass with + */}
                          <button
                            onClick={() => zoomIn()}
                            className="group/btn flex size-8 cursor-pointer items-center justify-center"
                            aria-label="Zoom in"
                          >
                            <svg className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <circle cx="10" cy="10" r="6" />
                              <path strokeLinecap="round" d="M14.5 14.5L20 20" />
                              <path strokeLinecap="round" d="M10 7v6M7 10h6" />
                            </svg>
                          </button>
                          {/* Zoom Out - magnifying glass with - */}
                          <button
                            onClick={() => zoomOut()}
                            className="group/btn flex size-8 cursor-pointer items-center justify-center"
                            aria-label="Zoom out"
                          >
                            <svg className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <circle cx="10" cy="10" r="6" />
                              <path strokeLinecap="round" d="M14.5 14.5L20 20" />
                              <path strokeLinecap="round" d="M7 10h6" />
                            </svg>
                          </button>
                          {/* Close - X */}
                          <button
                            onClick={() => { setIsZoomed(false); setHasTransformed(false) }}
                            className="group/btn flex size-8 cursor-pointer items-center justify-center"
                            aria-label="Close"
                          >
                            <svg className="h-5 w-5 text-gray-1000 transition-colors group-hover/btn:text-gray-1200 dark:text-[#8c8c8c] dark:group-hover/btn:text-[#c0c0c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <TransformComponent
                      wrapperClass="!w-full !h-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
                      contentClass="!w-full !h-full flex items-center justify-center p-8"
                    >
                      <div 
                        className="mermaid-zoomed w-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: svg }} 
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
