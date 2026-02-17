"use client"

import React from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { StatusIndicator } from "./status-indicator"
import { ImpactMetric, extractMetrics } from "./impact-metric"
import { SkillDeploy } from "./skill-deploy"
import { DocumentLink } from "./document-link"

interface MissionCardProps {
  role: string
  company: string
  date: string
  description: string
  logo: string
  logoWide?: boolean
  skills: string[]
  documentUrl?: string
  index: number
  isActive?: boolean
}

export const MissionCard: React.FC<MissionCardProps> = ({
  role,
  company,
  date,
  description,
  logo,
  logoWide = false,
  skills,
  documentUrl,
  index,
  isActive = false,
}) => {
  const metrics = extractMetrics(description)

  // Generate operation codename from role
  const getOperationCode = () => {
    const words = role.split(" ")
    const acronym = words
      .filter((w) => w.length > 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
    return acronym || role.substring(0, 3).toUpperCase()
  }

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Corner brackets - tactical styling */}
      <div className="relative">
        {/* Top-left bracket */}
        <motion.div
          className="absolute -top-2 -left-2 w-6 h-6 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-primary" />
          <div className="absolute top-0 left-0 w-0.5 h-full bg-primary" />
        </motion.div>

        {/* Top-right bracket */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.35, type: "spring" }}
        >
          <div className="absolute top-0 right-0 w-full h-0.5 bg-primary" />
          <div className="absolute top-0 right-0 w-0.5 h-full bg-primary" />
        </motion.div>

        {/* Bottom-left bracket */}
        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, type: "spring" }}
        >
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border" />
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-border" />
        </motion.div>

        {/* Bottom-right bracket */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-6 h-6 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.45, type: "spring" }}
        >
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-border" />
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-border" />
        </motion.div>

        {/* Main card body */}
        <motion.div
          className="relative bg-background-elevated border border-border p-6 md:p-8 group overflow-hidden"
          whileHover={{
            borderColor: "hsl(var(--border) / 0.5)",
            transition: { duration: 0.3 },
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            {/* Left: Logo + Info */}
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <motion.div
                className={`relative rounded-sm overflow-hidden bg-card border border-border flex-shrink-0 ${
                  logoWide ? "w-24 h-12 md:w-28 md:h-14" : "w-12 h-12 md:w-14 md:h-14"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                <Image
                  src={logo}
                  alt={company}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </motion.div>

              {/* Title Info */}
              <div className="flex flex-col gap-1">
                {/* Operation label */}
                <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary">
                  Operation: {getOperationCode()}
                </span>
                {/* Role as main title */}
                <h3 className="font-bebas text-xl md:text-2xl text-foreground tracking-wide leading-tight">
                  {role}
                </h3>
                {/* Company as location */}
                <span className="font-plex-mono text-xs text-muted-foreground">
                  @ {company}
                </span>
              </div>
            </div>

            {/* Right: Status + Date */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <StatusIndicator status={isActive ? "active" : "complete"} />
              <span className="font-plex-mono text-[10px] text-muted-foreground">
                {date}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-6" />

          {/* Impact Metrics */}
          {metrics.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-3 bg-primary" />
                <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Impact Metrics
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {metrics.map((metric, i) => (
                  <ImpactMetric
                    key={i}
                    value={metric.value}
                    label={metric.label}
                    isPercentage={metric.isPercentage}
                    suffix={metric.suffix}
                    delay={i * 150 + index * 100}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mission Brief */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-text-tertiary" />
              <span className="font-plex-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Mission Brief
              </span>
            </div>
            <p className="font-plex-mono text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Deployed Skills */}
          {skills && skills.length > 0 && (
            <SkillDeploy skills={skills} className="mb-6" />
          )}

          {/* Document Link */}
          {documentUrl && (
            <div className="pt-4 border-t border-border">
              <DocumentLink href={documentUrl} />
            </div>
          )}

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MissionCard
