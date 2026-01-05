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
  const [dragY, setDragY] = useState(0)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    // Watch for class changes on html element
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
    // Minimal, clean design inspired by the reference image
    const lightTheme = {
      primaryColor: '#e8e8e8',
      primaryTextColor: '#1a1a1a',
      primaryBorderColor: 'transparent',
      lineColor: '#aaaaaa',
      secondaryColor: '#e8e8e8',
      tertiaryColor: '#e8e8e8',
      background: 'transparent',
      mainBkg: '#e8e8e8',
      secondBkg: '#e8e8e8',
      tertiaryBkg: '#e8e8e8',
      nodeBorder: 'transparent',
      clusterBkg: 'rgba(0,0,0,0.03)',
      clusterBorder: 'transparent',
      titleColor: '#888888',
      edgeLabelBackground: '#f6f8fa',
      textColor: '#1a1a1a',
      nodeTextColor: '#1a1a1a',
    }

    const darkTheme = {
      // Sleek dark theme matching the reference image
      primaryColor: '#2a2a2a',
      primaryTextColor: '#ffffff',
      primaryBorderColor: 'transparent',
      lineColor: '#555555',
      secondaryColor: '#2a2a2a',
      tertiaryColor: '#2a2a2a',
      background: 'transparent',
      mainBkg: '#2a2a2a',
      secondBkg: '#2a2a2a',
      tertiaryBkg: '#2a2a2a',
      nodeBorder: 'transparent',
      clusterBkg: 'rgba(255,255,255,0.03)',
      clusterBorder: 'transparent',
      titleColor: '#666666',
      edgeLabelBackground: '#0F0F0F',
      textColor: '#ffffff',
      nodeTextColor: '#ffffff',
    }

    const theme = isDark ? darkTheme : lightTheme

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      fontFamily: 'Arial, sans-serif',
      themeVariables: {
        ...theme,
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        // Node styling for rounded pill shapes
        nodePadding: 20,
        nodeRadius: 16,
        // Arrow/edge styling
        lineColor: isDark ? '#555555' : '#aaaaaa',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'linear',
        padding: 24,
        nodeSpacing: 80,
        rankSpacing: 80,
        useMaxWidth: true,
        diagramPadding: 16,
        wrappingWidth: 300,
        // Improve edge label positioning
        edgeLabelBackground: isDark ? '#0F0F0F' : '#f6f8fa',
        subGraphTitleMargin: {
          top: 20,
          bottom: 8,
        },
      },
      securityLevel: 'loose',
    })

    const renderDiagram = async () => {
      if (!chart) return
      
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      
      // Clean the chart string
      const cleanChart = typeof chart === 'string' 
        ? chart.trim() 
        : String(chart).trim()
      
      try {
        const { svg } = await mermaid.render(id, cleanChart)
        
        // Post-process SVG to make it responsive and fit container
        const parser = new DOMParser()
        const doc = parser.parseFromString(svg, 'image/svg+xml')
        const svgElement = doc.documentElement
        
        // Get the original dimensions
        const width = svgElement.getAttribute('width')
        const height = svgElement.getAttribute('height')
        
        // Set viewBox if not present and make SVG responsive
        if (width && height) {
          const numWidth = parseFloat(width)
          const numHeight = parseFloat(height)
          if (!svgElement.getAttribute('viewBox')) {
            svgElement.setAttribute('viewBox', `0 0 ${numWidth} ${numHeight}`)
          }
          // Make it responsive - 90% width, centered, auto height
          svgElement.setAttribute('width', '90%')
          svgElement.setAttribute('height', 'auto')
          svgElement.style.maxWidth = '90%'
          svgElement.style.display = 'block'
          svgElement.style.margin = '0 auto'
        }
        
        // Find all label containers and expand them
        const labelContainers = doc.querySelectorAll('rect.basic.label-container')
        labelContainers.forEach((rect) => {
          const currentWidth = parseFloat(rect.getAttribute('width') || '0')
          // Add 60px extra width to prevent clipping (increased from 40px)
          rect.setAttribute('width', String(currentWidth + 60))
          // Shift x position left by 30px to center
          const currentX = parseFloat(rect.getAttribute('x') || '0')
          rect.setAttribute('x', String(currentX - 30))
        })
        
        // Ensure edge labels are visible and properly styled
        const edgeLabels = doc.querySelectorAll('.edgeLabel')
        edgeLabels.forEach((label) => {
          // Style the background rect
          let rect = label.querySelector('rect')
          
          // If no rect exists, create one
          if (!rect) {
            rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
            const text = label.querySelector('text')
            if (text) {
              const bbox = text.getBBox()
              rect.setAttribute('x', String(bbox.x - 6))
              rect.setAttribute('y', String(bbox.y - 4))
              rect.setAttribute('width', String(bbox.width + 12))
              rect.setAttribute('height', String(bbox.height + 8))
            }
            // Insert rect before text so text appears on top
            label.insertBefore(rect, label.firstChild)
          }
          
          if (rect) {
            rect.setAttribute('fill', isDark ? '#0F0F0F' : '#f6f8fa')
            rect.setAttribute('stroke', isDark ? '#333' : '#ddd')
            rect.setAttribute('stroke-width', '1')
            rect.setAttribute('rx', '4')
            rect.setAttribute('ry', '4')
            rect.setAttribute('fill-opacity', '1')
            rect.setAttribute('opacity', '1')
            // Ensure padding around text
            const currentWidth = parseFloat(rect.getAttribute('width') || '0')
            const currentHeight = parseFloat(rect.getAttribute('height') || '0')
            if (currentWidth > 0) {
              rect.setAttribute('width', String(currentWidth + 12))
              const currentX = parseFloat(rect.getAttribute('x') || '0')
              rect.setAttribute('x', String(currentX - 6))
            }
            if (currentHeight > 0) {
              rect.setAttribute('height', String(currentHeight + 8))
              const currentY = parseFloat(rect.getAttribute('y') || '0')
              rect.setAttribute('y', String(currentY - 4))
            }
          }
          
          // Ensure text is visible and properly styled
          const text = label.querySelector('text')
          if (text) {
            text.setAttribute('fill', isDark ? '#888888' : '#555555')
            text.setAttribute('text-anchor', 'middle')
            text.setAttribute('dominant-baseline', 'middle')
            text.style.fontSize = '12px'
            text.style.fontWeight = '500'
          }
        })
        
        // Ensure nodes appear on top of edges by reordering DOM elements
        // In SVG, elements drawn later appear on top
        const allGroups = doc.querySelectorAll('svg > g > g')
        if (allGroups.length > 0) {
          const parent = allGroups[0].parentElement
          if (parent) {
            const nodeElements: Element[] = []
            const otherElements: Element[] = []
            
            // Separate nodes from other elements
            allGroups.forEach((element) => {
              const classes = element.getAttribute('class') || ''
              if (classes.includes('node')) {
                nodeElements.push(element)
              } else {
                otherElements.push(element)
              }
            })
            
            // Reorder: move nodes to the end
            nodeElements.forEach((node) => {
              parent.appendChild(node)
            })
          }
        }
        
        // Serialize back to string
        const serializer = new XMLSerializer()
        const fixedSvg = serializer.serializeToString(doc.documentElement)
        
        setSvg(fixedSvg)
      } catch (error: any) {
        console.error('Mermaid rendering error:', error)
        setSvg(`<pre class="text-red-500 p-4">Error rendering diagram: ${error.message}</pre>`)
      }
    }

    // Wait for fonts to be ready before rendering
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        renderDiagram()
      })
    } else {
      setTimeout(renderDiagram, 100)
    }
  }, [chart, isDark])

  return (
    <>
      <div 
        className="group/mermaid relative cursor-zoom-in transition-opacity hover:opacity-95 active:opacity-90"
        onClick={() => setIsZoomed(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsZoomed(true)
          }
        }}
        aria-label="Tap to expand diagram"
      >
        <div
          ref={ref}
          className="mermaid-diagram my-4 overflow-hidden rounded-xl border border-black/6 bg-[#f6f8fa] p-6 dark:border-white/5 dark:bg-[#0F0F0F]"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: dragY }}
              exit={{ scale: 0.9, opacity: 0, y: 0 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 300 }}
              dragElastic={{ top: 0, bottom: 0.8 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsZoomed(false)
                  setDragY(0)
                } else {
                  setDragY(0)
                }
              }}
              className="relative h-[90vh] w-full max-w-6xl rounded-xl border border-white/10 bg-[#f6f8fa] dark:bg-[#0F0F0F]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute right-2 top-2 z-10 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform md:right-4 md:top-4 md:size-9"
                aria-label="Close zoom"
              >
                <svg className="h-6 w-6 md:h-5 md:w-5 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                limitToBounds={false}
                wheel={{ step: 0.1 }}
                doubleClick={{ mode: 'toggle', step: 0.7 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute left-2 top-2 z-10 flex gap-2 md:left-4 md:top-4">
                      <button
                        onClick={() => zoomIn()}
                        className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform md:size-9"
                        aria-label="Zoom in"
                      >
                        <svg className="h-5 w-5 md:h-4 md:w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform md:size-9"
                        aria-label="Zoom out"
                      >
                        <svg className="h-5 w-5 md:h-4 md:w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-300 dark:bg-gray-200 transition-colors duration-200 ease-out hover:bg-gray-400 dark:hover:bg-gray-300 active:scale-[0.97] will-change-transform md:size-9"
                        aria-label="Reset zoom"
                      >
                        <svg className="h-5 w-5 md:h-4 md:w-4 stroke-gray-1000 transition-colors duration-200 ease-out group-hover:stroke-gray-1200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                    <TransformComponent
                      wrapperClass="!w-full !h-full rounded-xl overflow-hidden"
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
