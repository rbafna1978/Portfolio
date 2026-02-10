"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Skill {
  name: string;
  imageLight: string;
  imageDark?: string;
  image?: string;
}

interface InfiniteScrollColumnProps {
  skills: Skill[];
  direction?: "up" | "down";
  speed?: number;
  opacity?: number;
}

export function InfiniteScrollColumn({
  skills,
  direction = "up",
  speed = 30,
  opacity = 0.6,
}: InfiniteScrollColumnProps) {
  // Duplicate skills array for seamless infinite loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        initial={{ y: direction === "up" ? "0%" : "-50%" }}
        animate={{ y: direction === "up" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm"
            style={{
              opacity: opacity,
              minWidth: "120px",
            }}
            whileHover={{
              scale: 1.05,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          >
            {/* Skill Icon */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image
                src={skill.imageLight ?? skill.image ?? ""}
                alt={skill.name}
                width={48}
                height={48}
                className="object-contain dark:hidden"
              />
              <Image
                src={skill.imageDark ?? skill.imageLight ?? skill.image ?? ""}
                alt={skill.name}
                width={48}
                height={48}
                className="hidden object-contain dark:block"
              />
            </div>

            {/* Skill Name */}
            <p className="text-sm font-medium text-center leading-tight">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
