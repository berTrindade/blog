'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

export function SquashAndStretchDemo() {
  const [isSquashed, setIsSquashed] = useState(false)

  return (
    <div className="flex items-center justify-center gap-8 p-12 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <motion.div
        className="w-24 h-24 bg-blue-500 rounded-lg cursor-pointer"
        animate={{
          scaleX: isSquashed ? 0.8 : 1,
          scaleY: isSquashed ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        onClick={() => setIsSquashed(!isSquashed)}
        whileHover={{ scale: 1.05 }}
      />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the box to see squash and stretch
      </p>
    </div>
  )
}

export function AnticipationDemo() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHolding, setIsHolding] = useState(false)

  const handleMouseDown = () => {
    setIsHolding(true)
    setTimeout(() => {
      if (isHolding) {
        setIsDeleting(true)
        setTimeout(() => {
          setIsDeleting(false)
          setIsHolding(false)
        }, 500)
      }
    }, 1000)
  }

  const handleMouseUp = () => {
    setIsHolding(false)
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <motion.div
        className="p-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        animate={{
          scale: isHolding ? 0.95 : 1,
          opacity: isDeleting ? 0 : 1,
          x: isDeleting ? 100 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <p className="text-sm font-medium">Hold to delete</p>
        <p className="text-xs text-gray-500 mt-1">Press and hold this card</p>
      </motion.div>
    </div>
  )
}

export function TimingDemo() {
  const [animateA, setAnimateA] = useState(false)
  const [animateB, setAnimateB] = useState(false)

  return (
    <div className="space-y-6 p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 bg-green-500 rounded-lg"
            animate={{ x: animateA ? 200 : 0 }}
            transition={{ duration: 0.12 }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Snappy (120ms)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 bg-orange-500 rounded-lg"
            animate={{ x: animateB ? 200 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Sluggish (400ms)
          </span>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => {
          setAnimateA(!animateA)
          setAnimateB(!animateB)
        }}
      >
        Animate
      </button>
    </div>
  )
}

export function GestureDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <motion.button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
      >
        Hover and click me
      </motion.button>
    </div>
  )
}

export function LayoutAnimationDemo() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <motion.div
        layout
        className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        <motion.h3 layout="position" className="font-medium mb-2">
          Click to expand
        </motion.h3>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            This content animates smoothly using Motion's layout animations.
            The container automatically animates between different sizes.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
