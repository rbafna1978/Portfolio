"use client"

import React from "react"
import { motion } from "motion/react"

type StatusType = "complete" | "active"

interface StatusIndicatorProps {
  status: StatusType
  className?: string
  showText?: boolean
}

const statusConfig: Record<StatusType, { text: string; color: string; pulseColor: string }> = {
  complete: {
    text: "OPERATION COMPLETE",
    color: "hsl(var(--primary))", // Orange accent
    pulseColor: "hsl(var(--primary) / 0.4)",
  },
  active: {
    text: "CURRENTLY DEPLOYED",
    color: "hsl(var(--success))", // Green
    pulseColor: "hsl(var(--success) / 0.4)",
  },
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  className = "",
  showText = true,
}) => {
  const config = statusConfig[status]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Pulsing dot */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: config.pulseColor }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Inner solid dot */}
        <motion.div
          className="relative w-2 h-2 rounded-full"
          style={{ backgroundColor: config.color }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Status text */}
      {showText && (
        <span
          className="font-plex-mono text-[10px] uppercase tracking-[0.15em]"
          style={{ color: config.color }}
        >
          {config.text}
        </span>
      )}
    </div>
  )
}

export default StatusIndicator
