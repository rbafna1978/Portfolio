"use client"

import React from "react"
import { motion } from "motion/react"

interface DocumentLinkProps {
  href: string
  className?: string
}

export const DocumentLink: React.FC<DocumentLinkProps> = ({
  href,
  className = "",
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2 ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* File icon */}
      <motion.div
        className="relative w-5 h-6 flex items-center justify-center"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -5 },
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Document shape */}
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
        >
          {/* Main document body */}
          <path
            d="M1 3C1 1.89543 1.89543 1 3 1H9L15 7V17C15 18.1046 14.1046 19 13 19H3C1.89543 19 1 18.1046 1 17V3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Folded corner */}
          <path
            d="M9 1V7H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lines on document */}
          <path
            d="M4 11H12M4 14H9"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        {/* Stamp overlay on hover */}
        <motion.div
          className="absolute -top-1 -right-1 pointer-events-none"
          variants={{
            initial: { opacity: 0, scale: 0.5, rotate: -20 },
            hover: { opacity: 1, scale: 1, rotate: -12 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <div className="px-1 py-0.5 bg-primary rounded-sm">
            <span className="font-bebas text-[6px] text-background tracking-wide">
              CERT
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="font-plex-mono text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
          Supporting Documentation
        </span>
        <motion.span
          className="font-plex-mono text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300"
          variants={{
            initial: { x: 0 },
            hover: { x: 3 },
          }}
        >
          View Certificate
          <motion.span
            className="inline-block ml-1"
            variants={{
              initial: { x: 0, opacity: 0.5 },
              hover: { x: 3, opacity: 1 },
            }}
          >
            →
          </motion.span>
        </motion.span>
      </div>
    </motion.a>
  )
}

export default DocumentLink
