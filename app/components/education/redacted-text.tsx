"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"

interface RedactedTextProps {
  text: string
  className?: string
  revealDelay?: number
  charRevealSpeed?: number
}

export const RedactedText: React.FC<RedactedTextProps> = ({
  text,
  className = "",
  revealDelay = 0,
  charRevealSpeed = 15,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false)

  const startReveal = useCallback(() => {
    if (hasBeenRevealed) {
      setRevealedCount(text.length)
      return
    }

    setRevealedCount(0)
    let count = 0
    const interval = setInterval(() => {
      count++
      setRevealedCount(count)
      if (count >= text.length) {
        clearInterval(interval)
        setHasBeenRevealed(true)
      }
    }, charRevealSpeed)

    return () => clearInterval(interval)
  }, [text.length, charRevealSpeed, hasBeenRevealed])

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(startReveal, revealDelay)
      return () => clearTimeout(timeout)
    }
  }, [isHovered, revealDelay, startReveal])

  const renderText = () => {
    return text.split("").map((char, index) => {
      const isRevealed = index < revealedCount
      const isSpace = char === " "

      if (isSpace) {
        return (
          <span key={index} className="inline">
            {" "}
          </span>
        )
      }

      return (
        <span
          key={index}
          className="inline-block relative"
          style={{ minWidth: "0.5em" }}
        >
          {/* Redacted block */}
          <motion.span
            className="absolute inset-0 bg-foreground"
            initial={{ scaleX: 1 }}
            animate={{
              scaleX: isRevealed ? 0 : 1,
              originX: 0,
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
          />
          {/* Actual character */}
          <span
            className={`relative transition-opacity duration-100 ${
              isRevealed ? "opacity-100" : "opacity-0"
            }`}
          >
            {char}
          </span>
        </span>
      )
    })
  }

  return (
    <motion.div
      className={`cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!hasBeenRevealed) {
          setIsHovered(false)
        }
      }}
      onTouchStart={() => setIsHovered(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-plex-mono text-sm leading-relaxed text-muted-foreground">
        {renderText()}
      </span>
      {!hasBeenRevealed && (
        <motion.span
          className="ml-2 text-[10px] uppercase tracking-widest text-text-tertiary font-plex-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          [hover to declassify]
        </motion.span>
      )}
    </motion.div>
  )
}

export default RedactedText
