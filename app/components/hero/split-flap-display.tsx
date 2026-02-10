"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "motion/react"

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

interface SplitFlapCharacterProps {
  targetChar: string
  delay: number
  isFlipping: boolean
  outline?: boolean
  highlight?: boolean
  highlightActive?: boolean
}

const SplitFlapCharacter: React.FC<SplitFlapCharacterProps> = ({
  targetChar,
  delay,
  isFlipping,
  outline = false,
  highlight = false,
  highlightActive = false,
}) => {
  const [currentChar, setCurrentChar] = useState(" ")
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startFlipping = useCallback(() => {
    cleanup()
    setIsAnimating(true)
    setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])

    let iterations = 0
    const maxIterations = 10 + Math.floor(Math.random() * 8)

    intervalRef.current = setInterval(() => {
      iterations++
      if (iterations < maxIterations) {
        setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])
      } else {
        cleanup()
        setCurrentChar(targetChar)
        setIsAnimating(false)
      }
    }, 40)
  }, [targetChar, cleanup])

  useEffect(() => {
    if (isFlipping && targetChar !== " ") {
      timeoutRef.current = setTimeout(startFlipping, delay)
    }

    return cleanup
  }, [isFlipping, delay, startFlipping, targetChar, cleanup])

  // Space character - just render a gap
  if (targetChar === " ") {
    return (
      <motion.div
        className="inline-block w-[0.25em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  // Style for highlight, outline, or filled
  let letterStyle: React.CSSProperties

  if (highlight) {
    // Highlight mode: filled text that becomes white when highlight is active
    letterStyle = {
      color: highlightActive ? "var(--primary-foreground)" : "var(--foreground)",
      transition: "color 0.4s ease-out",
    }
  } else if (outline) {
    letterStyle = {
      color: "transparent",
      WebkitTextStroke: "2px var(--foreground)",
      WebkitTextStrokeColor: isAnimating ? "var(--primary)" : "var(--foreground)",
    }
  } else {
    letterStyle = {
      color: isAnimating ? "var(--primary)" : "var(--foreground)",
    }
  }

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="relative font-bebas leading-[0.85] transition-colors duration-100"
        style={letterStyle}
      >
        {currentChar}
      </span>
    </motion.div>
  )
}

interface SplitFlapDisplayProps {
  text: string
  className?: string
  onHoverReplay?: boolean
  outline?: boolean
  highlight?: boolean
}

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  text,
  className = "",
  onHoverReplay = true,
  outline = false,
  highlight = false,
}) => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [key, setKey] = useState(0)
  const [highlightActive, setHighlightActive] = useState(false)
  const isAnimatingRef = useRef(false)
  const cooldownRef = useRef<NodeJS.Timeout | null>(null)
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Start animation on mount
  useEffect(() => {
    // Reset highlight when key changes (for hover replay)
    setHighlightActive(false)

    const timer = setTimeout(() => {
      setIsFlipping(true)
      isAnimatingRef.current = true

      // Set cooldown to prevent immediate re-trigger
      const totalDuration = text.length * 120 + 600
      cooldownRef.current = setTimeout(() => {
        isAnimatingRef.current = false
      }, totalDuration)

      // Trigger highlight animation after scramble completes + delay for premium feel
      if (highlight) {
        highlightTimeoutRef.current = setTimeout(() => {
          setHighlightActive(true)
        }, totalDuration + 300) // 300ms after scramble ends for premium feel
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (cooldownRef.current) clearTimeout(cooldownRef.current)
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current)
    }
  }, [key, text.length, highlight])

  const handleMouseEnter = () => {
    if (onHoverReplay && !isAnimatingRef.current) {
      isAnimatingRef.current = true
      setIsFlipping(false)
      setHighlightActive(false)

      // Small delay before restarting to ensure clean reset
      setTimeout(() => {
        setKey((prev) => prev + 1)
      }, 50)
    }
  }

  const characters = text.toUpperCase().split("")

  return (
    <div
      key={key}
      className={`relative inline-flex flex-wrap cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {/* Animated highlight background */}
      {highlight && (
        <motion.div
          className="absolute bg-primary"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: highlightActive ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            // Add padding around the text
            top: "-0.1em",
            bottom: "-0.1em",
            left: "0",
            right: "-0.3em",
          }}
        />
      )}

      {/* Characters */}
      <div className="relative z-10 flex">
        {characters.map((char, index) => (
          <SplitFlapCharacter
            key={`${key}-${index}`}
            targetChar={char}
            delay={index * 100}
            isFlipping={isFlipping}
            outline={outline}
            highlight={highlight}
            highlightActive={highlightActive}
          />
        ))}
      </div>
    </div>
  )
}

export default SplitFlapDisplay
