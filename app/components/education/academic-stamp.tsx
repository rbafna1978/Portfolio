"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

type StampVariant = "verified" | "completed" | "honors" | "deans-list"

interface AcademicStampProps {
  variant: StampVariant
  className?: string
  delay?: number
}

const stampConfig: Record<StampVariant, { text: string; color: string }> = {
  verified: {
    text: "VERIFIED",
    color: "hsl(var(--primary))", // Orange accent
  },
  completed: {
    text: "COMPLETED",
    color: "hsl(var(--success))", // Muted green
  },
  honors: {
    text: "HONORS",
    color: "hsl(280 65% 60%)", // Purple
  },
  "deans-list": {
    text: "DEAN'S LIST",
    color: "hsl(var(--primary))", // Orange accent
  },
}

export const AcademicStamp: React.FC<AcademicStampProps> = ({
  variant,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const stampRef = useRef<HTMLDivElement>(null)

  const config = stampConfig[variant]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, delay)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (stampRef.current) {
      observer.observe(stampRef.current)
    }

    return () => observer.disconnect()
  }, [delay, hasAnimated])

  return (
    <div ref={stampRef} className={`relative ${className}`}>
      <motion.div
        className="relative"
        initial={{
          opacity: 0,
          scale: 2,
          rotate: -20,
          y: -30
        }}
        animate={isVisible ? {
          opacity: 1,
          scale: 1,
          rotate: -6,
          y: 0
        } : {}}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.5,
        }}
      >
        {/* Main stamp container */}
        <div
          className="relative px-3 py-1.5 border-2 rounded-sm"
          style={{
            borderColor: config.color,
            backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
          }}
        >
          {/* Stamp text */}
          <span
            className="font-bebas text-sm md:text-base tracking-[0.15em] whitespace-nowrap"
            style={{ color: config.color }}
          >
            {config.text}
          </span>

          {/* Corner notches for stamp effect */}
          <div
            className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5"
            style={{ backgroundColor: config.color }}
          />
          <div
            className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5"
            style={{ backgroundColor: config.color }}
          />
          <div
            className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5"
            style={{ backgroundColor: config.color }}
          />
          <div
            className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5"
            style={{ backgroundColor: config.color }}
          />
        </div>

        {/* Ink splatter particles */}
        {isVisible && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: config.color,
                  top: "50%",
                  left: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 40,
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  )
}

export default AcademicStamp
