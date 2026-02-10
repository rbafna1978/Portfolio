"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react"
import { Globe } from "@/components/ui/globe"
import { Bio } from "@/data/constants"

const SOCIAL_LINKS = [
  { icon: Github, href: Bio.github, label: "GitHub" },
  { icon: Linkedin, href: Bio.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${Bio.email}`, label: "Email" },
]

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <h2 className="font-bebas text-4xl md:text-5xl tracking-wide">{Bio.name}</h2>

            <div className="mt-3 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-success"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-plex-mono text-xs uppercase tracking-wider text-[var(--foreground)]/50">
                Available for work
              </span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--foreground)]/70">
              Systems-minded software engineer focused on clean architecture, product velocity, and resilient software.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <Link
                href={`mailto:${Bio.email}`}
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm
                  bg-[var(--accent)] text-[var(--accent-foreground)]
                  border border-[var(--accent)]/30
                  transition-all duration-300
                  hover:bg-[var(--accent)]/90 hover:scale-[1.02]"
              >
                <Mail className="size-4" />
                <span className="font-plex-mono">{Bio.email}</span>
                <ArrowUpRight className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex items-center gap-3"
            >
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-lg border border-[var(--border)]
                    text-[var(--foreground)]/50 hover:text-[var(--foreground)]
                    hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5
                    transition-all duration-300"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <div className="rounded-xl border border-[var(--border)]/70 p-4 bg-[var(--card)]/30">
                <div className="font-plex-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]/40">
                  Currently
                </div>
                <div className="mt-1.5 text-sm text-[var(--foreground)]/80">Building distributed and full-stack systems</div>
              </div>
              <div className="rounded-xl border border-[var(--border)]/70 p-4 bg-[var(--card)]/30">
                <div className="font-plex-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]/40">
                  Location
                </div>
                <div className="mt-1.5 text-sm text-[var(--foreground)]/80">Tempe, AZ • Open to remote</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex items-center justify-center md:justify-end"
          >
            <div
              className="relative h-[280px] w-[280px] md:h-[320px] md:w-[320px]
                [filter:drop-shadow(0_18px_60px_rgba(0,0,0,0.08))]
                dark:[filter:drop-shadow(0_18px_60px_rgba(0,0,0,0.35))]
                cursor-grab active:cursor-grabbing"
            >
              <Globe />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-6 border-t border-[var(--border)]"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="font-plex-mono text-xs text-[var(--foreground)]/50">© {year} {Bio.name}</div>

            <nav className="flex flex-wrap items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-plex-mono text-xs uppercase tracking-wider
                    text-[var(--foreground)]/50 hover:text-[var(--foreground)]
                    transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={Bio.resume}
                target="_blank"
                rel="noreferrer"
                className="font-plex-mono text-xs uppercase tracking-wider
                  text-[var(--accent)] hover:text-[var(--accent)]/80
                  transition-colors duration-200"
              >
                Resume
              </Link>
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
