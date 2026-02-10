"use client"

import React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export interface TimelineItemProps {
  title: string
  subtitle?: string
  date: string
  logo?: string
  badge?: string
  description?: string
  children?: React.ReactNode
  index?: number
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  date,
  logo,
  badge,
  description,
  children,
  index = 0,
}) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative mb-16 last:mb-0"
    >
      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Logo - Centered ON the timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-white shadow-lg">
            {logo ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white">
                <Image
                  src={logo}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-primary" />
            )}
          </div>
        </div>

        {/* Date - Positioned next to logo based on card side */}
        <div className={cn(
          "absolute top-5 z-10",
          isEven
            ? "left-[calc(50%+3rem)]" // Right of logo for left cards
            : "right-[calc(50%+3rem)]" // Left of logo for right cards
        )}>
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {date}
          </p>
        </div>

        {/* Professional Card - Alternating left/right */}
        <div className={cn(
          "w-[calc(50%-5rem)]",
          isEven ? "ml-0" : "ml-auto",
          "pt-0"
        )}>
          <div className="rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 p-6 min-h-[320px] flex flex-col backdrop-blur-sm">
            {/* Header Section */}
            <div className="space-y-1.5 mb-4">
              <h3 className="text-xl font-semibold text-foreground leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Badge (GPA/Grade) */}
            {badge && (
              <>
                <Separator className="my-3" />
                <div className="flex items-center mb-3">
                  <span className="text-sm font-semibold text-foreground">
                    {badge}
                  </span>
                </div>
              </>
            )}

            {/* Description */}
            {description && (
              <>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {description}
                </p>
              </>
            )}

            {/* Additional Content */}
            {children && (
              <>
                <Separator className="my-3" />
                <div className="mt-auto">
                  {children}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-white shadow-md">
            {logo ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
                <Image
                  src={logo}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <div className="w-[2px] flex-1 bg-border mt-2" />
        </div>

        <div className="flex-1 pb-8">
          <p className="text-xs text-muted-foreground mb-2 font-medium">{date}</p>
          <div className="rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 p-4 backdrop-blur-sm">
            <div className="space-y-1 mb-3">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {badge && (
              <>
                <Separator className="my-2" />
                <span className="text-xs font-semibold text-foreground block mb-2">{badge}</span>
              </>
            )}

            {description && (
              <>
                <Separator className="my-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </>
            )}

            {children && (
              <>
                <Separator className="my-2" />
                <div className="mt-2">
                  {children}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn("relative", className)}>
      {/* Center Timeline Line - Desktop Only */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border" />

      {/* Timeline Items */}
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TimelineItemProps>(child)) {
          return React.cloneElement(child, { index })
        }
        return child
      })}
    </div>
  )
}