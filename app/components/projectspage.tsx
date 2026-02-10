"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/constants"
import {
  FeaturedCard,
  ProjectCard,
  CategoryFilter,
  ArchiveStats,
  getProjectCategories,
  getProjectCounts,
  calculateArchiveStats,
} from "./projects"
import type { ProjectCategory } from "./projects"

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

export default function ProjectsPage() {
  console.log("ProjectsPage rendered with:", projects?.length, "projects");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null)

  const handleToggleExpand = (id: number) => {
    setExpandedProjectId((prev) => (prev === id ? null : id))
  }

  // Get categories and counts
  const categories = useMemo(
    () => getProjectCategories(projects),
    []
  )

  const projectCounts = useMemo(
    () => getProjectCounts(projects),
    []
  )

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects
    return projects.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [activeCategory])

  // Featured project is the first one (most recent)
  const featuredProject = filteredProjects[0]
  const remainingProjects = filteredProjects.slice(1)

  // Force re-calculation if needed
  const archiveStats = useMemo(() => calculateArchiveStats(projects), [projects.length])

  return (
    <section
      id="projects"
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
            05
          </span>
          <div className="w-6 h-px bg-primary mt-1" />
          <span className="font-plex-mono text-[9px] uppercase tracking-[0.2em] text-text-tertiary mt-1">
            Projects
          </span>
        </div>
      </motion.div>

      {/* Archive Label - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 hidden md:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-primary" />
            <div className="w-1 h-3 bg-primary/60" />
            <div className="w-1 h-3 bg-primary/30" />
          </div>
          <span className="font-plex-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Project Archives // {projects.length} Entries
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-bebas text-[clamp(4rem,18vw,14rem)] leading-[0.85] tracking-tight text-center md:text-left"
          >
            Projects
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
              Digital{" "}
              <span className="text-primary">artifacts</span> &
              experiments
            </span>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14"
          >
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              projectCounts={projectCounts}
            />
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="mt-10 md:mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Featured Project - Large Card taking 2 columns on lg */}
                    {featuredProject && (
                      <div className="md:col-span-2 lg:col-span-2 min-h-[450px]">
                        <FeaturedCard
                          title={featuredProject.title}
                          description={featuredProject.description}
                          image={featuredProject.image}
                          category={featuredProject.category}
                          date={featuredProject.date}
                          tags={featuredProject.tags || []}
                          github={featuredProject.github}
                          webapp={featuredProject.webapp}
                        />
                      </div>
                    )}

                    {/* All remaining projects */}
                    {remainingProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        category={project.category}
                        date={project.date}
                        tags={project.tags || []}
                        github={project.github}
                        webapp={project.webapp}
                        index={index + 1}
                        isExpanded={expandedProjectId === project.id}
                        onToggleExpand={() => handleToggleExpand(project.id)}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 mb-4 border border-dashed border-border flex items-center justify-center">
                      <span className="font-bebas text-2xl text-text-tertiary">?</span>
                    </div>
                    <p className="font-plex-mono text-sm text-muted-foreground">
                      No projects found in this category
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Archive Stats */}
          <ArchiveStats stats={archiveStats} className="mt-16 md:mt-24" />

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

      {/* Dot matrix pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </section>
  )
}
