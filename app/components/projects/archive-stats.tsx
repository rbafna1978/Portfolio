"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"

interface StatItem {
  value: number
  label: string
  suffix?: string
  accent?: boolean
}

interface ArchiveStatsProps {
  stats: StatItem[]
  className?: string
}

const AnimatedCounter: React.FC<{
  value: number
  suffix?: string
  accent?: boolean
  delay?: number
}> = ({ value, suffix = "", accent = false, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) {
      setDisplayValue(end)
      return
    }

    const totalMiliseconds = 1500
    const incrementTime = totalMiliseconds / end

    const timer = setInterval(() => {
      start += 1
      setDisplayValue(start)
      if (start >= end) clearInterval(timer)
    }, Math.max(incrementTime, 20))

    return () => clearInterval(timer)
  }, [value, delay])

  return (
    <span
      className={`font-bebas text-3xl md:text-4xl tabular-nums ${
        accent ? "text-primary" : "text-foreground"
      }`}
    >
      {displayValue || value}
      {suffix}
    </span>
  )
}

export const ArchiveStats: React.FC<ArchiveStatsProps> = ({
  stats,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 pt-8 border-t border-border ${className}`}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center md:items-start gap-1"
        >
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            accent={stat.accent}
            delay={index * 150}
          />
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

// Utility to calculate archive stats from projects
export const calculateArchiveStats = (
  projects: Array<{ tags?: string[]; date?: string }>
): StatItem[] => {
  console.log("Calculating stats for projects:", projects?.length);
  
  if (!projects || projects.length === 0) {
    return [
      { value: 4, label: "Projects", suffix: "" },
      { value: 15, label: "Technologies", suffix: "+" },
      { value: 2, label: "Years", suffix: "", accent: true },
    ];
  }

  // Count unique technologies
  const allTechs = new Set<string>()
  projects.forEach((project) => {
    project.tags?.forEach((tag) => allTechs.add(tag))
  })

  // Calculate year range
  const years = projects
    .map((p) => {
      const match = p.date?.match(/\d{4}/)
      return match ? parseInt(match[0]) : null
    })
    .filter((y): y is number => y !== null)

  const minYear = years.length > 0 ? Math.min(...years) : 2024
  const maxYear = years.length > 0 ? Math.max(...years) : 2025
  const yearSpan = years.length > 0 ? Math.max(1, maxYear - minYear + 1) : 2

  return [
    { value: projects.length || 4, label: "Projects", suffix: "" },
    { value: allTechs.size || 15, label: "Technologies", suffix: "+" },
    { value: yearSpan, label: "Years", suffix: "", accent: true },
  ]
}

export default ArchiveStats
