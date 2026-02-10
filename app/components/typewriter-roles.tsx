"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Bio } from "@/data/constants"

interface TypewriterRolesProps {
  className?: string
  withLine?: boolean
  lineClassName?: string
}

export const TypewriterRoles = ({
  className = "",
  withLine = false,
  lineClassName = "w-12",
}: TypewriterRolesProps) => {
  const roles = Bio.roles
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]

    // Pause when text is complete
    if (!isDeleting && displayedText === currentRole) {
      setIsPaused(true)
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(pauseTimeout)
    }

    // Move to next role after deleting
    if (isDeleting && displayedText === "") {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    // Don't type/delete while paused
    if (isPaused) return

    // Type or delete one character
    const typingSpeed = isDeleting ? 30 : 70
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1))
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentRoleIndex, displayedText, isDeleting, isPaused, roles])

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {withLine && (
        <span
          className={`h-px bg-text-tertiary ${lineClassName}`}
          aria-hidden
        />
      )}
      <span className="font-plex-mono text-muted-foreground">
        I am a{" "}
        <span className="text-primary font-medium">
          {displayedText}
        </span>
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-text-bottom"
        />
      </span>
    </div>
  )
}
