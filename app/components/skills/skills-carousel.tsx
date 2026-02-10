"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import Image from "next/image";

interface Skill {
  name: string;
  imageLight: string;
  imageDark?: string;
  image?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsCarouselProps {
  categories: SkillCategory[];
}

export function SkillsCarousel({ categories }: SkillsCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [autoplayPlugin.current]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayPlugin.current;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Skill card animation variants
  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="flex-[0_0_100%] min-w-0 px-4"
            >
              {/* Category Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center"
              >
                {category.title}
              </motion.h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={skillItemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                      {/* Skill Icon */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                        <Image
                          src={skill.imageLight ?? skill.image ?? ""}
                          alt={skill.name}
                          width={56}
                          height={56}
                          className="object-contain transition-transform duration-300 group-hover:scale-110 dark:hidden"
                        />
                        <Image
                          src={skill.imageDark ?? skill.imageLight ?? skill.image ?? ""}
                          alt={skill.name}
                          width={56}
                          height={56}
                          className="hidden object-contain transition-transform duration-300 group-hover:scale-110 dark:block"
                        />
                      </div>

                      {/* Skill Name */}
                      <p className="text-sm sm:text-base font-medium text-center leading-tight">
                        {skill.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8 mt-12">
        {/* Previous Button */}
        <button
          onClick={scrollPrev}
          aria-label="Previous category"
          className="group p-3 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dot Indicators with Progress */}
        <div className="flex items-center gap-3">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${categories[index].title}`}
              className="relative group"
            >
              {/* Dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-border group-hover:bg-primary/50"
                }`}
              />

              {/* Progress Ring for Active Dot */}
              {index === selectedIndex && isPlaying && (
                <svg
                  className="absolute -inset-2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  viewBox="0 0 24 24"
                >
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={scrollNext}
          aria-label="Next category"
          className="group p-3 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
          className="group p-3 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
