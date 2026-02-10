"use client";

import React from "react";

export function AmbientBg() {
  // Subtle “insane but tasteful” Aceternity-style vibe:
  // layered gradients + grid lines + soft vignette
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Spotlight blobs */}
      <div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, #60A5FA 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, #A78BFA 0%, transparent 70%)",
        }}
      />

      {/* Fine grid */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <svg
          className="h-full w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,hsl(var(--background))_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background))_100%)]" />
    </div>
  );
}
