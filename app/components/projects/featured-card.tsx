"use client"

import React, { useState, useRef } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { TechTerminal } from "./tech-terminal"

interface FeaturedCardProps {
  title: string
  description: string
  image?: string
  category: string
  date: string
  tags: string[]
  github?: string
  webapp?: string
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title,
  description,
  image,
  category,
  date,
  tags,
  github,
  webapp,
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

  // Subtle 3D tilt
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -5 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 5 : 0

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="relative h-full bg-background-elevated border border-border overflow-hidden
                   hover:border-primary/30 transition-colors duration-500"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Featured ribbon */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary text-background">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-background"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-bebas text-xs tracking-wider">FEATURED</span>
            </div>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: "blur(10px)", zIndex: -1 }}
            />
          </div>
        </motion.div>

        {/* Background gradient/image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          {image && (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                loading="lazy"
              />
            </div>
          )}
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
          {/* Top section - date & category */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <motion.div
              className="px-3 py-1.5 border border-border bg-background/50"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-bebas text-sm tracking-wider text-foreground">
                {date}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-plex-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className="font-bebas text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide mb-4
                       group-hover:text-primary transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="font-plex-mono text-sm text-muted-foreground leading-relaxed max-w-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Tech Terminal */}
          <motion.div
            className="flex-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TechTerminal
              technologies={tags}
              projectName={title}
              className="max-w-md"
            />
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {webapp && (
              <a
                href={webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 px-5 py-2.5 bg-primary text-background
                           hover:bg-primary/90 transition-colors duration-300"
              >
                <span className="font-plex-mono text-xs uppercase tracking-wider font-medium">
                  View Live
                </span>
                <motion.svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  whileHover={{ x: 2, y: -2 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border
                           text-muted-foreground hover:border-primary hover:text-primary
                           transition-colors duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="font-plex-mono text-xs uppercase tracking-wider">
                  Source Code
                </span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-border" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-border" />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 100px hsl(var(--primary) / 0.08)"
              : "inset 0 0 0px hsl(var(--primary) / 0)",
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default FeaturedCard
