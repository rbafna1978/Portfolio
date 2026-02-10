"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"

export type ProjectCategory = "all" | "web app" | "machine learning" | "iOS app" | ".NET APP"

interface CategoryConfig {
  label: string
  color: string
}

const categoryConfig: Record<ProjectCategory, CategoryConfig> = {
  all: {
    label: "All",
    color: "hsl(var(--foreground))",
  },
  "web app": {
    label: "Web Apps",
    color: "hsl(var(--chart-1))",
  },
  "machine learning": {
    label: "ML / AI",
    color: "hsl(var(--chart-4))",
  },
  "iOS app": {
    label: "iOS",
    color: "hsl(var(--primary))",
  },
  ".NET APP": {
    label: ".NET",
    color: "hsl(var(--chart-2))",
  },
}

interface CategoryFilterProps {
  categories: ProjectCategory[]
  activeCategory: ProjectCategory
  onCategoryChange: (category: ProjectCategory) => void
  projectCounts: Record<ProjectCategory, number>
  className?: string
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  projectCounts,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  // Update indicator position when active category changes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      })
    }
  }, [activeCategory])

  return (
    <div className={className}>
      {/* Filter tabs container */}
      <div
        ref={containerRef}
        className="relative flex flex-wrap gap-2 md:gap-3"
      >
        {/* Animated indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{ display: indicatorStyle.width > 0 ? "block" : "none" }}
        />

        {categories.map((category) => {
          const config = categoryConfig[category]
          const isActive = activeCategory === category
          const count = projectCounts[category]

          return (
            <motion.button
              key={category}
              data-category={category}
              onClick={() => onCategoryChange(category)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 pb-3
                font-plex-mono text-[11px] uppercase tracking-[0.12em]
                transition-colors duration-300
                ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}
              `}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Category indicator dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.color }}
                animate={{
                  scale: isActive ? 1 : 0.7,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Label */}
              <span>{config.label}</span>

              {/* Count badge */}
              <motion.span
                className={`
                  px-1.5 py-0.5 text-[9px] font-medium
                  ${isActive
                    ? "bg-primary text-background"
                    : "bg-background-elevated text-muted-foreground"
                  }
                `}
                animate={{
                  backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--background-elevated))",
                }}
                transition={{ duration: 0.2 }}
              >
                {count}
              </motion.span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// Utility to get unique categories from projects
export const getProjectCategories = (
  projects: Array<{ category: string }>
): ProjectCategory[] => {
  const categories = new Set<ProjectCategory>(["all"])
  projects.forEach((project) => {
    const cat = project.category.toLowerCase() as ProjectCategory
    if (categoryConfig[cat]) {
      categories.add(cat)
    }
  })
  return Array.from(categories)
}

// Utility to count projects per category
export const getProjectCounts = (
  projects: Array<{ category: string }>
): Record<ProjectCategory, number> => {
  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    "web app": 0,
    "machine learning": 0,
    "iOS app": 0,
    ".NET APP": 0,
  }

  projects.forEach((project) => {
    const cat = project.category.toLowerCase() as ProjectCategory
    if (counts[cat] !== undefined) {
      counts[cat]++
    }
  })

  return counts
}

export default CategoryFilter
