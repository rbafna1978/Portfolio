"use client"

import React from "react"
import { motion } from "motion/react"
import { SplitFlapDisplay } from "./hero/split-flap-display"
import { NoiseCanvas } from "./hero/noise-canvas"
import { ScrambleButton } from "./hero/scramble-button"
import { TypewriterRoles } from "./typewriter-roles"
import { Bio } from "@/data/constants"

// Hand-drawn squiggly arrow SVG
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

const HeroPage = () => {
  // Split name into first and last
  const nameParts = Bio.name.trim().split(/\s+/)
  const firstName = nameParts[0] ?? "RISHIT"
  const lastName = nameParts.slice(1).join(" ") || "BAFNA"

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* Animated Noise Overlay */}
      <NoiseCanvas opacity={0.3} />

      {/* Vertical Side Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <span
          className="font-plex-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary block"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Signal
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:pl-28 lg:pr-16 py-20">
        {/* Name Display */}
        <div className="relative">
          {/* Name Row - RISHIT + BAFNA - Centered on mobile, left on desktop */}
          <div className="flex flex-col md:flex-row flex-wrap items-center md:items-end justify-center md:justify-start gap-x-6 gap-y-0">
            {/* RISHIT - Filled */}
            <SplitFlapDisplay
              text={firstName}
              className="text-[clamp(5rem,22vw,20rem)] leading-[0.82] tracking-tighter"
            />

            {/* BAFNA - Highlighted */}
            <SplitFlapDisplay
              text={lastName}
              highlight
              className="text-[clamp(5rem,22vw,20rem)] leading-[0.82] tracking-tighter md:-ml-2"
            />
          </div>

          {/* TypewriterRoles - Centered on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center md:justify-start gap-3 mt-6 md:mt-8"
          >
            {/* Hand-drawn arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <SquigglyArrow />
            </motion.div>

            {/* TypewriterRoles - bigger text */}
            <TypewriterRoles
              withLine={false}
              className="text-sm md:text-base"
            />
          </motion.div>
        </div>

        {/* Content below - Centered on mobile */}
        <div className="max-w-xl mt-10 md:mt-14 mx-auto md:mx-0 text-center md:text-left">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="font-plex-mono text-sm text-muted-foreground leading-relaxed"
          >
            {Bio.description}
          </motion.p>

          {/* CTA Buttons - Centered on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 mt-10"
          >
            <ScrambleButton href="#projects" variant="primary">
              View Projects
            </ScrambleButton>
            <ScrambleButton href={Bio.resume} variant="secondary" external>
              Resume
            </ScrambleButton>
          </motion.div>
        </div>
      </div>

      {/* Available for Work Tag - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"
      >
        <div className="border border-border px-3 py-1.5 md:px-4 md:py-2">
          <span className="font-plex-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Available for Work
          </span>
        </div>
      </motion.div>

    </section>
  )
}

export default HeroPage
