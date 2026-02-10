"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Dithering } from "@paper-design/shaders-react";

/* -------------------- theme + size helpers -------------------- */

function useDarkClass() {
  const [dark, setDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() =>
      setDark(html.classList.contains("dark"))
    );
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function useSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [box, setBox] = useState({ w: 1280, h: 720 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => {
      if (!e?.contentRect) return;
      const { width, height } = e.contentRect;
      setBox({
        w: Math.max(1, Math.round(width)),
        h: Math.max(1, Math.round(height)),
      });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, ...box };
}

/* -------------------- page -------------------- */

export default function ResumeSnapshot() {
  const isDark = useDarkClass();

  // Hard-coded, theme-aware shader colors
  const shaderBack = isDark ? "#000000" : "#ffffff";
  const dotsAccent = isDark ? "#f472d0" : "#4f8cff";

  // Shader sizing
  const right = useSize<HTMLDivElement>();

  // Share / Download (left card screenshot) — FIX for OKLCH via onclone
  const cardRef = useRef<HTMLDivElement>(null);
  const downloadPng = async () => {
    const target = cardRef.current;
    if (!target) return;

    // give the node an id (used inside the cloned document)
    target.id = "resumeCard";

    const canvas = await html2canvas(target, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      onclone: (doc) => {
        const el = doc.getElementById("resumeCard") as HTMLElement | null;
        if (!el) return;

        const props = [
          "color",
          "background-color",
          "border-color",
          "border-top-color",
          "border-right-color",
          "border-bottom-color",
          "border-left-color",
          "outline-color",
        ];

        const paint = (node: Element) => {
          const cs = (doc.defaultView || window).getComputedStyle(node);
          const style = (node as HTMLElement).style;
          for (const p of props) {
            const v = cs.getPropertyValue(p);
            if (v) style.setProperty(p, v); // forces rgb(a) values instead of oklch(...)
          }
        };

        const walk = (node: Element) => {
          paint(node);
          for (const child of Array.from(node.children)) walk(child);
        };
        walk(el);
      },
    });

    const a = document.createElement("a");
    a.download = "resume-snapshot.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Rishit — Resume Snapshot",
          text: "Quick resume snapshot.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      }
    } catch {}
  };

  /* ====== DATA (titles only) ====== */
  const EXP: ReadonlyArray<readonly [string, string, boolean?]> = [
    ["Jun 2025 – Present", "Midpoint — Software Engineering Intern"],
    ["Aug 2024 – May 2025", "ConvoCoach — Co-Founder"],
    [
      "Nov 2024 – May 2025",
      "Plus Credit Ltd (NAB Solutions) — Software Engineer Intern",
    ],
    [
      "Aug 2023 – Feb 2025",
      "Arizona State University — Undergraduate Teaching Assistant",
    ],
    ["Jan 2024 – Feb 2025", "UGTA · iOS App Development (CSE335)", true],
    ["Aug 2023 – Feb 2025", "UGTA · Intro to Engineering (FSE100)", true],
  ];
  const EDU = [
    "Aug 2021 – May 2026",
    "Arizona State University — B.S. + M.S. in Computer Science · GPA 3.86/4.0",
  ] as const;
  const SKILLS = [
    "C/C++",
    "Java",
    "Python",
    "C#",
    "JavaScript/TypeScript",
    "Swift/SwiftUI",
    "HTML",
    "CSS",
    "MATLAB",
    "SQL",
    "FastAPI",
    "React",
    "Next.js",
    ".NET",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Redis",
    "Celery",
    "Figma",
    "Git/GitHub",
  ];
  const EXTRA = [
    "Aug 2022 – Present",
    "ASU Cricket Club — Vice Captain",
  ] as const;

  return (
    <div className="bg-background text-foreground h-screen overflow-hidden pt-1">
      {/* Outer padding so controls aren’t at the edge */}
      <div className="h-full p-10 md:p-10 lg:p-16">
        {/* Rail controls */}
        <div className="flex justify-end gap-3 mb-5">
          <button
            onClick={shareLink}
            className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-foreground/5 transition"
          >
            Share
          </button>
          <button
            onClick={downloadPng}
            className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-foreground/5 transition"
          >
            Download
          </button>
        </div>

        {/* One-screen split */}
        <div className="grid h-[calc(100%-3.25rem)] grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT — shareable resume card (no shader) */}
          <div
            ref={cardRef}
            className="rounded-2xl border border-border bg-background/80 p-6 md:p-7 font-mono "
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[11px] tracking-wider mb-3 opacity-70">
                resume.snap
              </h1>
              <div className="space-y-0.5">
                <h2 className="text-[18px] leading-5">RISHIT BAFNA</h2>
                <h3 className="text-[18px] leading-5 opacity-80">
                  SOFTWARE ENGINEER
                </h3>
              </div>
            </div>

            {/* Content — clean two-column rows */}
            <div className="flex flex-col gap-5 text-[13px] leading-6">
              <SectionTitle label="Experience" />
              <div className="space-y-2">
                {EXP.map(([date, title, isSub]) => (
                  <div
                    key={`${date}-${title}`}
                    className={`grid grid-cols-[auto,1fr] gap-x-4 ${
                      isSub ? "pl-4" : ""
                    }`}
                  >
                    <div className="opacity-70">{date}</div>
                    <div className="whitespace-pre-wrap">{title}</div>
                  </div>
                ))}
              </div>

              <SectionTitle label="Education" />
              <div className="grid grid-cols-[auto,1fr] gap-x-4">
                <div className="opacity-70">{EDU[0]}</div>
                <div>{EDU[1]}</div>
              </div>

              <SectionTitle label="Skills" />
              <div className="flex flex-wrap gap-x-4 gap-y-[4px]">
                {SKILLS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>

              <SectionTitle label="Extracurriculars" />
              <div className="grid grid-cols-[auto,1fr] gap-x-4">
                <div className="opacity-70">{EXTRA[0]}</div>
                <div>{EXTRA[1]}</div>
              </div>
            </div>
          </div>

          {/* RIGHT — shader panel with pill switch */}
          <div
            ref={right.ref}
            className="relative rounded-2xl overflow-hidden border border-border h-full min-h-[520px]"
            style={{ background: isDark ? "#0b0b0b" : "#f7f7f9" }} // panel surface (not shader color)
          >
            {/* centered pill switcher */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20"></div>
            <Dithering
              key={`dots-${isDark}-${right.w}x${right.h}`}
              width={right.w}
              height={right.h}
              colorBack={shaderBack}
              colorFront={dotsAccent}
              shape="simplex"
              type="4x4"
              pxSize={isDark ? 2 : 1.5}
              speed={isDark ? 1 : 0.8}
              scale={isDark ? 0.6 : 0.7}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <hr className="flex-1 border-border" />
      <span className="text-[11px] tracking-wider opacity-70 whitespace-nowrap">
        {label.toUpperCase()}
      </span>
      <hr className="flex-1 border-border" />
    </div>
  );
}
