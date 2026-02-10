"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LaserFlowProps {
  density?: number;
  speed?: number;
  className?: string;
}

export function LaserFlow({
  density = 5,
  speed = 20,
  className = ""
}: LaserFlowProps) {
  const [mounted, setMounted] = useState(false);

  // Only render after client-side mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate laser paths
  const generateLaserPath = (index: number, total: number) => {
    const yStart = (100 / (total + 1)) * (index + 1);
    const yEnd = yStart + (Math.random() * 20 - 10);
    const curve1X = 25 + Math.random() * 10;
    const curve1Y = yStart + (Math.random() * 30 - 15);
    const curve2X = 75 + Math.random() * 10;
    const curve2Y = yEnd + (Math.random() * 30 - 15);

    return `M 0 ${yStart}
            C ${curve1X} ${curve1Y},
              ${curve2X} ${curve2Y},
              100 ${yEnd}`;
  };

  // Don't render anything until mounted on client to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const lasers = Array.from({ length: density }, (_, i) => ({
    id: i,
    path: generateLaserPath(i, density),
    delay: (i * speed) / density,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for laser glow */}
          <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="80%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for professional effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated laser lines */}
        {lasers.map((laser) => (
          <g key={laser.id}>
            {/* Main laser line */}
            <motion.path
              d={laser.path}
              stroke="url(#laserGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              opacity={laser.opacity + 0.4}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                pathOffset: [0, 0, 1, 1],
              }}
              transition={{
                duration: speed,
                delay: laser.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Glow trail */}
            <motion.path
              d={laser.path}
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              opacity={Math.min(1, laser.opacity * 1.2)}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.3, 0],
                pathOffset: [0, 0, 1, 1],
              }}
              transition={{
                duration: speed,
                delay: laser.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}

        {/* Particle effects at intersection points */}
        {lasers.slice(0, 3).map((laser, i) => (
          <motion.circle
            key={`particle-${laser.id}`}
            cx={25 + i * 25}
            cy={50 + (Math.random() * 20 - 10)}
            r="0.5"
            fill="var(--accent)"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1.5, 0],
            }}
            transition={{
              duration: speed / 2,
              delay: laser.delay + speed / 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>
  );
}
