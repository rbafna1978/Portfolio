"use client"

import React from "react"
import { motion } from "motion/react"
import { experiences } from "@/data/constants"
import { MissionCard } from "./experience"
import { TimelineConnector } from "./education"

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

// Calculate total unique skills across all experiences
const getAllSkills = () => {
  const allSkills = new Set<string>()
  experiences.forEach((exp) => {
    exp.skills?.forEach((skill: string) => allSkills.add(skill))
  })
  return allSkills.size
}

// Calculate total years of experience
const getTotalYears = () => {
  // Simple calculation based on date ranges
  return "2+"
}

export default function ExperiencePage() {
  const totalSkills = getAllSkills()

  return (
    <section
      id="experience"
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
            04
          </span>
          <div className="w-6 h-px bg-primary mt-1" />
          <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mt-1">
            Experience
          </span>
        </div>
      </motion.div>

      {/* Operations Status Label - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3">
          {/* Pulsing status indicator */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-success/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="w-2 h-2 rounded-full bg-success" />
          </div>
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
            Operations Log // Clearance: Public
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-bebas text-[clamp(4rem,18vw,14rem)] leading-[0.85] tracking-tight text-center md:text-left"
          >
            Experience
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
              Professional{" "}
              <span className="text-primary">deployments</span> &
              operations
            </span>
          </motion.div>

          {/* Mission Cards Container */}
          <div className="relative mt-16 md:mt-24">
            {/* Timeline Connector - reuse from education */}
            <TimelineConnector
              nodeCount={experiences.length}
              className="z-0"
            />

            {/* Experience Cards */}
            <div className="relative flex flex-col gap-10 md:gap-16 max-w-4xl mx-auto">
              {experiences.map((exp, index) => (
                <MissionCard
                  key={exp.id}
                  role={exp.role}
                  company={exp.company}
                  date={exp.date}
                  description={exp.desc}
                  logo={exp.img}
                  logoWide={exp.logoWide}
                  skills={exp.skills || []}
                  documentUrl={exp.doc}
                  index={index}
                  isActive={index === 0} // Most recent is "active"
                />
              ))}
            </div>
          </div>

          {/* Bottom Career Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 mt-16 md:mt-24 pt-8 border-t border-border"
          >
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-foreground">
                {experiences.length}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Operations
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-foreground">
                {getTotalYears()}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Years Active
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-primary">
                {totalSkills}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Skills Deployed
              </span>
            </div>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-primary via-border to-transparent mt-8 origin-left"
          />
        </div>
      </div>

      {/* Fade gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      {/* Scan line effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground)) 2px,
            hsl(var(--foreground)) 4px
          )`,
        }}
      />
    </section>
  )
}
