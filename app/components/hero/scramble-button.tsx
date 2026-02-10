"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx"

interface ScrambleButtonProps {
  href: string
  children: string
  variant?: "primary" | "secondary"
  className?: string
  external?: boolean
}

export const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}) => {
  const [displayText, setDisplayText] = useState(children)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered) {
      let iterations = 0
      const maxIterations = children.length * 3

      intervalRef.current = setInterval(() => {
        iterations++
        const progress = iterations / maxIterations

        setDisplayText(
          children
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < progress * children.length) {
                return children[index]
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join("")
        )

        if (iterations >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setDisplayText(children)
        }
      }, 30)
    } else {
      setDisplayText(children)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, children])

  const baseStyles = `
    inline-flex items-center gap-3
    px-6 py-3
    font-plex-mono text-xs uppercase tracking-[0.2em]
    transition-all duration-300
    group
  `

  const variantStyles = {
    primary: `
      border border-foreground/20
      text-foreground
      hover:border-primary
      hover:text-primary
      bg-transparent
    `,
    secondary: `
      border-none
      text-muted-foreground
      hover:text-foreground
      bg-transparent
    `,
  }

  const content = (
    <>
      <span className="relative overflow-hidden">
        {displayText}
      </span>
      <motion.span
        className="relative"
        animate={{ rotate: isHovered ? 45 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <ArrowUpRight className="w-4 h-4" />
      </motion.span>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </Link>
  )
}

export default ScrambleButton
