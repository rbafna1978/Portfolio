"use client"

import React from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { SplitFlapStats } from "./split-flap-stats"
import { AcademicStamp } from "./academic-stamp"

interface DossierCardProps {
  school: string
  degree: string
  date: string
  grade: string
  description: string
  logo: string
  index: number
  achievements?: string[]
}

export const DossierCard: React.FC<DossierCardProps> = ({
  school,
  degree,
  date,
  grade,
  description,
  logo,
  index,
  achievements = [],
}) => {
  const isEven = index % 2 === 0

  // Determine stamp type based on content
  const getStampVariant = () => {
    if (description.toLowerCase().includes("dean's list")) return "deans-list"
    if (index === 0) return "verified"
    return "completed"
  }

  // Extract degree abbreviation
  const getDegreeAbbrev = () => {
    if (degree.includes("BSc") || degree.includes("Bachelor")) return "BSc"
    if (degree.includes("XII") || degree.includes("HSC")) return "XII"
    if (degree.includes("X") || degree.includes("ICSE")) return "X"
    return "EDU"
  }

  return (
    <motion.div
      className={`relative w-full md:w-[calc(50%-2rem)] ${
        isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
      }`}
      initial={{ opacity: 0, x: isEven ? -60 : 60, rotate: isEven ? -2 : 2 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* File Tab Header */}
      <div className="relative">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-b-0 border-border rounded-t-sm"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          {/* Logo in tab */}
          <div className="relative w-5 h-5 rounded-sm overflow-hidden bg-background-elevated">
            <Image
              src={logo}
              alt={school}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {school.split(",")[0]}
          </span>
        </motion.div>

        {/* Degree abbreviation corner fold */}
        <motion.div
          className="absolute -top-1 -right-1 w-10 h-10 overflow-hidden"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, type: "spring", stiffness: 200 }}
        >
          <div
            className="absolute top-0 right-0 w-14 h-14 bg-primary rotate-45 translate-x-7 -translate-y-7"
          />
          <span className="absolute top-1 right-1 font-bebas text-[10px] text-background">
            {getDegreeAbbrev()}
          </span>
        </motion.div>
      </div>

      {/* Main Card Body */}
      <motion.div
        className="relative bg-card border border-border p-6 md:p-8 group"
        whileHover={{
          borderColor: "hsl(var(--primary) / 0.3)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Stamp - positioned top right */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <AcademicStamp variant={getStampVariant()} delay={index * 150 + 500} />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h3 className="font-bebas text-2xl md:text-3xl text-foreground tracking-wide mb-1 pr-24">
            {degree}
          </h3>
          <p className="font-plex-mono text-xs text-muted-foreground uppercase tracking-[0.1em]">
            {school}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 md:gap-10 mb-6 pb-6 border-b border-border">
          <SplitFlapStats value={grade} label="Grade" />
          <div className="flex flex-col gap-1">
            <span className="font-plex-mono text-sm text-foreground">
              {date}
            </span>
            <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
              Duration
            </span>
          </div>
        </div>

        {/* Description - Redacted style */}
        <div className="mb-6">
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 block">
            Academic Record
          </span>
          <p className="font-plex-mono text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Achievement Tags */}
        {achievements.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.6 }}
          >
            {achievements.map((achievement, i) => (
              <motion.span
                key={i}
                className="px-2 py-1 border border-border font-plex-mono text-[10px] uppercase tracking-wider text-muted-foreground
                           hover:border-primary hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15 + 0.7 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {achievement}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}

export default DossierCard
