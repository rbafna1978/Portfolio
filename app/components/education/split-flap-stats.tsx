"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "motion/react"

const CHARSET = "0123456789.%"

interface SplitFlapCharProps {
  targetChar: string
  delay: number
  isFlipping: boolean
}

const SplitFlapChar: React.FC<SplitFlapCharProps> = ({
  targetChar,
  delay,
  isFlipping,
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
    const maxIterations = 8 + Math.floor(Math.random() * 6)

    intervalRef.current = setInterval(() => {
      iterations++
      if (iterations < maxIterations) {
        setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])
      } else {
        cleanup()
        setCurrentChar(targetChar)
        setIsAnimating(false)
      }
    }, 50)
  }, [targetChar, cleanup])

  useEffect(() => {
    if (isFlipping && targetChar !== " ") {
      timeoutRef.current = setTimeout(startFlipping, delay)
    }
    return cleanup
  }, [isFlipping, delay, startFlipping, targetChar, cleanup])

  // Space or special chars - just show them
  if (targetChar === " ") {
    return <span className="inline-block w-[0.25em]" />
  }

  return (
    <motion.span
      className="inline-block relative font-bebas text-3xl md:text-4xl tabular-nums"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      style={{
        color: isAnimating ? "hsl(var(--primary))" : "hsl(var(--foreground))",
        minWidth: targetChar === "." ? "0.3em" : "0.6em",
        textAlign: "center",
      }}
    >
      {currentChar}
    </motion.span>
  )
}

interface SplitFlapStatsProps {
  value: string
  label: string
  className?: string
  triggerOnView?: boolean
}

export const SplitFlapStats: React.FC<SplitFlapStatsProps> = ({
  value,
  label,
  className = "",
  triggerOnView = true,
}) => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!triggerOnView) {
      setIsFlipping(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true)
            setTimeout(() => setIsFlipping(true), 200)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [triggerOnView, hasTriggered])

  const characters = value.split("")

  return (
    <div ref={containerRef} className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-baseline">
        {characters.map((char, index) => (
          <SplitFlapChar
            key={`${index}-${char}`}
            targetChar={char}
            delay={index * 80}
            isFlipping={isFlipping}
          />
        ))}
      </div>
      <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
        {label}
      </span>
    </div>
  )
}

export default SplitFlapStats
