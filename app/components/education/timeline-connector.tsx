"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface TimelineConnectorProps {
  className?: string
  nodeCount?: number
}

export const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  className = "",
  nodeCount = 3,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the timeline is visible
      const startOffset = windowHeight * 0.8 // Start drawing when 80% from top
      const endOffset = windowHeight * 0.2 // Complete when 20% from top remains

      const totalScrollDistance = rect.height + startOffset - endOffset
      const scrolled = startOffset - rect.top

      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance))
      setScrollProgress(progress)
    }

    // Throttle scroll handler using RAF
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])

  // Calculate which nodes should be active
  const getNodeProgress = (nodeIndex: number) => {
    const nodePosition = nodeIndex / (nodeCount - 1)
    const threshold = nodePosition
    return scrollProgress >= threshold ? 1 : scrollProgress > threshold - 0.1 ? (scrollProgress - (threshold - 0.1)) / 0.1 : 0
  }

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 -translate-x-1/2 h-full pointer-events-none hidden md:block ${className}`}
      style={{ width: "10px" }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-border rounded-full" />

      {/* Animated progress line */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-full origin-top bg-gradient-to-b from-primary to-primary/70"
        style={{
          height: "100%",
          scaleY: scrollProgress,
          boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
        }}
      />

      {/* Milestone nodes */}
      {[...Array(nodeCount)].map((_, index) => {
        const topPosition = index === 0 ? 0 : index === nodeCount - 1 ? 100 : (index / (nodeCount - 1)) * 100
        const nodeProgress = getNodeProgress(index)

        return (
          <div
            key={index}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${topPosition}%` }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2"
              style={{
                borderColor: nodeProgress > 0 ? "hsl(var(--primary))" : "hsl(var(--border))",
                backgroundColor: nodeProgress > 0 ? "hsl(var(--primary) / 0.2)" : "hsl(var(--card))",
              }}
              animate={{
                scale: nodeProgress > 0.5 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />

            {/* Inner dot */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                backgroundColor: nodeProgress > 0 ? "hsl(var(--primary))" : "hsl(var(--text-tertiary))",
              }}
              animate={{
                scale: nodeProgress,
              }}
            />

            {/* Pulse ring when active */}
            {nodeProgress > 0.5 && (
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TimelineConnector
