"use client"

import React, { useMemo, useState, useEffect } from "react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { skills } from "@/data/constants"

// Hand-drawn squiggly arrow SVG (reused from hero)
const SquigglyArrow = () => (
  <svg
    width="50"
    height="20"
    viewBox="0 0 50 20"
    fill="none"
    className="text-primary"
  >
    <path
      d="M2 10 C7 6, 11 14, 16 10 C21 6, 25 14, 30 10 C35 6, 39 12, 44 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M40 5 L46 10 L40 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

type CategoryName = "All" | string

export default function SkillsPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<CategoryName>("All")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get all category names
  const categories = useMemo(() => {
    return ["All", ...skills.map((cat) => cat.title)]
  }, [])

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") {
      return skills.flatMap((category) => category.skills)
    }
    const category = skills.find((cat) => cat.title === activeCategory)
    return category?.skills || []
  }, [activeCategory])

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 md:py-28"
    >
      {/* Section Number Tag - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-20"
      >
        <div className="flex flex-col items-end gap-1">
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Section
          </span>
          <span className="font-bebas text-lg md:text-xl text-foreground tracking-wide">
            01
          </span>
          <div className="w-6 h-px bg-primary mt-1" />
          <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mt-1">
            Skills
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          {/* Main Heading - Centered on mobile, left on desktop */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-bebas text-[clamp(4rem,18vw,14rem)] leading-[0.85] tracking-tight text-center md:text-left"
          >
            Skills
          </motion.h2>

          {/* Subtitle with squiggly arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center md:justify-start gap-3 mt-4 md:mt-6"
          >
            <SquigglyArrow />
            <span className="font-plex-mono text-sm md:text-base text-muted-foreground">
              Technologies I have{" "}
              <span className="text-primary">mastered</span>
            </span>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-10 md:mt-14"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  font-plex-mono text-[10px] md:text-xs uppercase tracking-[0.15em]
                  px-4 py-2 border transition-all duration-300
                  ${
                    activeCategory === category
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-border/50 hover:text-foreground"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 mt-10 md:mt-14"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${activeCategory}-${skill.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group flex flex-col items-center justify-center gap-3 p-4 md:p-6
                           bg-card border border-border
                           hover:border-primary/50 hover:bg-background-elevated
                           transition-all duration-300 cursor-default"
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={
                      mounted
                        ? resolvedTheme === "dark"
                          ? skill.imageDark || skill.imageLight
                          : skill.imageLight
                        : skill.imageLight
                    }
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="font-plex-mono text-[10px] md:text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-primary via-border to-transparent mt-16 md:mt-20 origin-left"
          />
        </div>
      </div>

      {/* Fade gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
    </section>
  )
}
