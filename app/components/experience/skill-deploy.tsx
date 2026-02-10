"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface SkillDeployProps {
  skills: string[]
  className?: string
  maxVisible?: number
}

export const SkillDeploy: React.FC<SkillDeployProps> = ({
  skills,
  className = "",
  maxVisible = 6,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const visibleSkills = showAll ? skills : skills.slice(0, maxVisible)
  const hiddenCount = skills.length - maxVisible

  return (
    <div ref={containerRef} className={className}>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-3 bg-primary" />
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Deployed Skills
        </span>
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => (
          <motion.div
            key={skill}
            className="group relative"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border bg-background-elevated
                         hover:border-primary/50 hover:bg-card transition-all duration-300"
            >
              {/* Checkmark */}
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-primary"
                initial={{ scale: 0, rotate: -45 }}
                animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05 + 0.2,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <path
                  d="M2 5L4 7L8 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>

              {/* Skill name */}
              <span className="font-plex-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {skill}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Show more button */}
        {hiddenCount > 0 && !showAll && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 border border-dashed border-border
                       hover:border-primary transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: maxVisible * 0.05 }}
          >
            <span className="font-plex-mono text-[10px] text-muted-foreground">
              +{hiddenCount} more
            </span>
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default SkillDeploy
