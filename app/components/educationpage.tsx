"use client"

import React from "react"
import { motion } from "motion/react"
import { education } from "@/data/constants"
import { DossierCard, TimelineConnector } from "./education"

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

// Extract achievements from description
const extractAchievements = (desc: string): string[] => {
  const achievements: string[] = []
  const lowerDesc = desc.toLowerCase()

  if (lowerDesc.includes("dean's list")) achievements.push("Dean's List")
  if (lowerDesc.includes("minor")) {
    const minorMatch = desc.match(/minor in (\w+)/i)
    if (minorMatch) achievements.push(`Minor: ${minorMatch[1]}`)
  }
  if (lowerDesc.includes("club")) achievements.push("Extracurricular")
  if (lowerDesc.includes("data structures")) achievements.push("Core CS")
  if (lowerDesc.includes("algorithms")) achievements.push("Algorithms")

  return achievements
}

export default function EducationPage() {
  return (
    <section
      id="education"
      className="relative min-h-screen bg-background text-foreground overflow-hidden pt-20 pb-32 md:pt-28 md:pb-28"
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
            02
          </span>
          <div className="w-6 h-px bg-primary mt-1" />
          <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mt-1">
            Education
          </span>
        </div>
      </motion.div>

      {/* Dossier Classification Label - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
            Academic Dossier // Clearance Level: Public
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
            Education
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
              Academic{" "}
              <span className="text-primary">credentials</span> &
              qualifications
            </span>
          </motion.div>

          {/* Dossier Cards Container */}
          <div className="relative mt-16 md:mt-24">
            {/* Timeline Connector - Only on desktop */}
            <TimelineConnector
              nodeCount={education.length}
              className="z-0"
            />

            {/* Education Cards */}
            <div className="relative flex flex-col gap-8 md:gap-16">
              {education.map((edu, index) => (
                <DossierCard
                  key={edu.id}
                  school={edu.school}
                  degree={edu.degree}
                  date={edu.date}
                  grade={edu.grade}
                  description={edu.desc}
                  logo={edu.img}
                  index={index}
                  achievements={extractAchievements(edu.desc)}
                />
              ))}
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 mt-16 md:mt-24 pt-8 border-t border-border"
          >
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-foreground">
                {education.length}
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Institutions
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-foreground">
                19
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Years of Education
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-bebas text-3xl md:text-4xl text-primary">
                CS
              </span>
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
                Major Focus
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

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  )
}
