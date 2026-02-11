"use client"

import React, { useState, useRef } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { TechTerminal } from "./tech-terminal"

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  category: string
  date: string
  tags: string[]
  github?: string
  webapp?: string
  index: number
  isExpanded?: boolean
  onToggleExpand?: () => void
}

const categoryColors: Record<string, string> = {
  "systems": "hsl(var(--chart-1))",
  "web app": "hsl(var(--chart-3))",
  "tools": "hsl(var(--chart-4))",
  "ios app": "hsl(var(--primary))",
  ".net app": "hsl(var(--chart-2))",
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  category,
  date,
  tags,
  github,
  webapp,
  index,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const categoryColor = categoryColors[category.toLowerCase()] || "hsl(var(--primary))"

  // 3D tilt transform
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -10 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 10 : 0

  return (
    <motion.div
      ref={cardRef}
      className="relative group flex flex-col h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative bg-card border border-border overflow-hidden flex flex-col h-full
                   hover:border-primary/30 transition-colors duration-300"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image section */}
        <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-gradient-to-br from-background-elevated to-card">
          {image ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Scan line effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-x-0 h-px bg-primary"
                  initial={{ top: "0%" }}
                  animate={isHovered ? { top: ["0%", "100%"] } : { top: "0%" }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "linear",
                  }}
                  style={{
                    boxShadow: "0 0 20px 2px hsl(var(--primary) / 0.5)",
                  }}
                />
              </motion.div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-bebas text-6xl"
                style={{ color: `${categoryColor}30` }}
              >
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <div
              className="flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <span className="font-plex-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Date */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-1 bg-primary" />
            <span className="font-plex-mono text-[10px] text-muted-foreground">
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bebas text-xl text-foreground tracking-wide mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <div className="mb-4">
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : "3rem" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-plex-mono text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
            {description.length > 80 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleExpand?.()
                }}
                className="font-plex-mono text-[9px] text-primary hover:text-primary/80 uppercase tracking-wider mt-1 transition-colors duration-200"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          {/* Tech stack - Full Terminal */}
          <TechTerminal 
            technologies={tags} 
            projectName={title} 
            className="mb-4" 
          />

          {/* Action links */}
          <div className="flex gap-3 pt-3 mt-auto border-t border-border">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-plex-mono text-[10px] uppercase tracking-wider
                           text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Source
              </a>
            )}
            {webapp && (
              <a
                href={webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-plex-mono text-[10px] uppercase tracking-wider
                           text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span>Live</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 60px hsl(var(--primary) / 0.1)"
              : "inset 0 0 0px hsl(var(--primary) / 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
