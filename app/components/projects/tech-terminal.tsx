"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface TechTerminalProps {
  technologies: string[]
  projectName?: string
  className?: string
  compact?: boolean
}

export const TechTerminal: React.FC<TechTerminalProps> = ({
  technologies,
  projectName = "project",
  className = "",
  compact = false,
}) => {
  const [visibleLines, setVisibleLines] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setIsTyping(true)

            // Animate lines appearing one by one
            let lineIndex = 0
            const interval = setInterval(() => {
              lineIndex++
              setVisibleLines(lineIndex)
              if (lineIndex >= technologies.length + 1) {
                clearInterval(interval)
                setIsTyping(false)
              }
            }, 150)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, technologies.length])

  if (compact) {
    return (
      <div ref={containerRef} className={`flex flex-wrap gap-1.5 ${className}`}>
        {technologies.slice(0, 4).map((tech, index) => (
          <motion.span
            key={tech}
            className="px-2 py-0.5 bg-background-elevated border border-border
                       font-plex-mono text-[10px] text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {tech}
          </motion.span>
        ))}
        {technologies.length > 4 && (
          <motion.span
            className="px-2 py-0.5 bg-card border border-dashed border-border
                       font-plex-mono text-[10px] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            +{technologies.length - 4}
          </motion.span>
        )}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Terminal window */}
      <div className="bg-background border border-border overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="font-plex-mono text-[10px] text-muted-foreground ml-2">
            tech-stack.sh
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-plex-mono text-xs space-y-1">
          {/* Command line */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLines >= 1 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-primary">$</span>
            <span className="text-muted-foreground">
              cat {projectName.toLowerCase().replace(/\s+/g, "-")}/stack.json
            </span>
          </motion.div>

          {/* Tech stack output */}
          <div className="pl-4 pt-2 space-y-0.5">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={visibleLines >= index + 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.2 }}
              >
                <span className="text-muted-foreground">→</span>
                <span className="text-foreground">{tech}</span>
              </motion.div>
            ))}
          </div>

          {/* Cursor */}
          {isTyping && (
            <motion.div
              className="flex items-center gap-2 mt-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <span className="text-primary">$</span>
              <span className="w-2 h-4 bg-primary" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechTerminal
