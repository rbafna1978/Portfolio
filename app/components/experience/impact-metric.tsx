"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"

interface ImpactMetricProps {
  value: number
  label: string
  isPercentage?: boolean
  suffix?: string
  className?: string
  delay?: number
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({
  value,
  label,
  isPercentage = false,
  suffix = "",
  className = "",
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const animateCounter = useCallback(() => {
    const duration = 1500 // 1.5 seconds
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(easeOut * value)

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateCounter)
      }
    }

    animationRef.current = requestAnimationFrame(updateCounter)
  }, [value])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setTimeout(animateCounter, delay)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateCounter, delay, hasAnimated])

  const displayText = isPercentage
    ? `${displayValue}%`
    : `${displayValue}${suffix}`

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 ${className}`}>
      {/* Value display */}
      <div className="flex items-baseline gap-1">
        <span className="font-bebas text-2xl md:text-3xl text-foreground tabular-nums">
          {displayText}
        </span>
      </div>

      {/* Progress bar for percentages */}
      {isPercentage && (
        <div className="relative h-1 w-full bg-border overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={hasAnimated ? { width: `${value}%` } : {}}
            transition={{
              duration: 1.5,
              delay: delay / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {/* Glow effect */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ filter: "blur(4px)" }}
            initial={{ width: 0, opacity: 0.5 }}
            animate={hasAnimated ? { width: `${value}%` } : {}}
            transition={{
              duration: 1.5,
              delay: delay / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      )}

      {/* Label */}
      <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

// Utility function to extract metrics from description
export const extractMetrics = (
  description: string
): Array<{ value: number; label: string; isPercentage: boolean; suffix: string }> => {
  const metrics: Array<{ value: number; label: string; isPercentage: boolean; suffix: string }> = []

  // Pattern for percentages
  const percentagePatterns = [
    { regex: /(\d+)%\s*success/gi, label: "SUCCESS RATE" },
    { regex: /(\d+)%\s*performance/gi, label: "PERFORMANCE" },
    { regex: /(\d+)%\s*increase/gi, label: "INCREASE" },
    { regex: /(\d+)%\s*boost/gi, label: "BOOST" },
    { regex: /(\d+)%\s*satisfaction/gi, label: "SATISFACTION" },
    { regex: /(\d+)%\s*ui/gi, label: "UI IMPROVEMENT" },
    { regex: /(\d+)%\s*backend/gi, label: "BACKEND BOOST" },
  ]

  // Pattern for quantities
  const quantityPatterns = [
    { regex: /(\d+)\+?\s*students/gi, label: "STUDENTS", suffix: "+" },
    { regex: /(\d+)\+?\s*users/gi, label: "USERS", suffix: "+" },
    { regex: /(\d+)\+?\s*projects/gi, label: "PROJECTS", suffix: "" },
  ]

  // Extract percentages
  percentagePatterns.forEach(({ regex, label }) => {
    const match = regex.exec(description)
    if (match) {
      metrics.push({
        value: parseInt(match[1], 10),
        label,
        isPercentage: true,
        suffix: "",
      })
    }
  })

  // Extract quantities
  quantityPatterns.forEach(({ regex, label, suffix }) => {
    const match = regex.exec(description)
    if (match) {
      metrics.push({
        value: parseInt(match[1], 10),
        label,
        isPercentage: false,
        suffix,
      })
    }
  })

  return metrics.slice(0, 3) // Max 3 metrics
}

export default ImpactMetric
