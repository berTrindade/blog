'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface FootnoteProps {
  id: string
  children: React.ReactNode
}

export function Footnote({ id, children }: FootnoteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number; placement: 'above' | 'below' }>({ 
    top: 0, 
    left: 0, 
    placement: 'below' 
  })
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const footnoteNumber = id.replace('fn-', '')

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate popover position
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const popoverHeight = 120 // Estimated height
    const popoverWidth = Math.min(280, viewportWidth - 32) // Max 280px, with 16px margins
    
    // Determine if popover should appear above or below
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    const placement = spaceBelow < popoverHeight && spaceAbove > spaceBelow ? 'above' : 'below'
    
    // Calculate horizontal position (centered on trigger, but within viewport)
    let left = rect.left + rect.width / 2 - popoverWidth / 2
    left = Math.max(16, Math.min(left, viewportWidth - popoverWidth - 16))
    
    // Calculate vertical position
    const top = placement === 'below' 
      ? rect.bottom + 8 
      : rect.top - popoverHeight - 8

    setPosition({ top, left, placement })
  }, [])

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current && 
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    // Handle scroll to close
    const handleScroll = () => {
      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  // Update position when opening
  useEffect(() => {
    if (isOpen && isMobile) {
      updatePosition()
    }
  }, [isOpen, isMobile, updatePosition])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }
    // On desktop, let the default anchor behavior work (jump to sidenote)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }
  }

  return (
    <>
      <sup className="footnote-ref">
        <a 
          ref={triggerRef}
          href={`#${id}`} 
          id={`${id}-ref`} 
          className="footnote-link"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-expanded={isMobile ? isOpen : undefined}
          aria-describedby={isMobile && isOpen ? `${id}-popover` : undefined}
          role={isMobile ? 'button' : undefined}
        >
          {footnoteNumber}
        </a>
      </sup>
      
      {/* Desktop: Sidenote in margin */}
      <span className="sidenote" id={id}>
        <span className="sidenote-number">{footnoteNumber}</span>
        <span className="sidenote-content">{children}</span>
      </span>

      {/* Mobile: Popover */}
      {isMobile && isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={popoverRef}
          id={`${id}-popover`}
          className={`footnote-popover footnote-popover--${position.placement}`}
          style={{
            top: position.top,
            left: position.left,
          }}
          role="tooltip"
          aria-live="polite"
        >
          <span className="footnote-popover-number">{footnoteNumber}</span>
          <span className="footnote-popover-content">{children}</span>
        </div>,
        document.body
      )}
    </>
  )
}
