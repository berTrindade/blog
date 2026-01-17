'use client'

import { useEffect, useState, useRef } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [indicatorTop, setIndicatorTop] = useState<number>(0)
  const listRef = useRef<HTMLUListElement>(null)
  const isUserScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Get all h2 headings from the article (no h3), excluding footnotes
    const article = document.querySelector('[data-main-content]')
    if (!article) return

    const headingElements = article.querySelectorAll('h2')
    const headingData: Heading[] = Array.from(headingElements)
      .filter((heading) => {
        // Exclude headings inside the footnotes section
        // Exclude Newsletter section (not article content)
        return !heading.closest('.footnotes') && heading.textContent !== 'Newsletter'
      })
      .map((heading) => {
        return {
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1))
        }
      })

    setHeadings(headingData)

    // Set first heading as active by default
    if (headingData.length > 0 && !activeId) {
      setActiveId(headingData[0].id)
    }

    // Handle scroll to update active heading
    const handleScroll = () => {
      // Throttle scroll updates
      if (scrollTimeout.current) return
      
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null
        
        const scrollPosition = window.scrollY + 150 // Offset for header

        // Find the heading that's currently in view
        let currentHeading = headingData[0]?.id || ''

        for (const heading of headingData) {
          const element = document.getElementById(heading.id)
          if (element) {
            const { top } = element.getBoundingClientRect()
            const absoluteTop = top + window.scrollY

            if (absoluteTop <= scrollPosition + 10) {
              currentHeading = heading.id
            }
          }
        }

        setActiveId(currentHeading)

        // If we're at the bottom of the page, select the last heading
        const windowHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight
        if (window.scrollY + windowHeight >= docHeight - 100) {
          if (headingData.length > 0) {
            const lastHeading = headingData[headingData.length - 1].id
            setActiveId(lastHeading)
          }
        }
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate indicator position based on actual DOM measurements
  useEffect(() => {
    if (!activeId || !listRef.current) return

    const headingsList = Array.from(headings)
    const activeIndex = headingsList.findIndex(h => h.id === activeId)
    
    if (activeIndex === -1) return

    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      const listElement = listRef.current
      if (!listElement) return
      
      const activeLink = listElement.querySelector(`a[href="#${activeId}"]`) as HTMLElement
      
      if (activeLink && activeLink.parentElement) {
        const listItem = activeLink.parentElement as HTMLElement
        setIndicatorTop(listItem.offsetTop)
      }
    })
  }, [activeId, headings])

  if (headings.length === 0) return null

  return (
    <nav className="fixed top-16 right-8 hidden max-h-[calc(100vh-6rem)] w-48 overflow-hidden xl:block 2xl:right-16 2xl:w-56">
      <div className="mb-3 flex items-center gap-2 pb-2">
        <svg 
          aria-label="Table of Contents icon" 
          className="size-4 fill-gray-1100" 
          fill="none" 
          role="graphics-symbol" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            clipRule="evenodd" 
            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6ZM2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12ZM2 18C2 17.4477 2.44772 17 3 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H3C2.44772 19 2 18.5523 2 18Z" 
            fillRule="evenodd"
          />
        </svg>
        <h3 className="select-none font-[450] text-[13px] text-gray-1100">Table of Contents</h3>
      </div>
      <div className="relative overflow-visible">
        {/* Background track */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-0 h-full w-[3px] rounded-full bg-gray-300"
        />
        {/* Active indicator */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-0 w-[3px] rounded-full bg-gray-1200" 
          style={{
            willChange: 'transform',
            height: '21px',
            transform: `translateY(${indicatorTop}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <ul ref={listRef} className="space-y-3 pl-5">
          {headings.map((heading, index) => (
            <li 
              key={`${heading.id}-${index}`}
            >
              <a
                href={`#${heading.id}`}
                className={`block select-none truncate font-[450] text-[13px] transition-colors duration-200 ease-out ${
                  activeId === heading.id 
                    ? 'text-gray-1200' 
                    : 'text-gray-1000 hover:text-gray-1200'
                }`}
                title={heading.text}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    window.history.pushState(null, '', `#${heading.id}`)
                    setActiveId(heading.id)
                    element.scrollIntoView({ behavior: 'auto', block: 'start' })
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
