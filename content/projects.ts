import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "interview-ai-helper",
    name: "Interview AI Helper",
    summary: "Real-time interview prep with structured prompts and feedback loops.",
    tech: ["React", "TypeScript", "FastAPI", "AWS"],
    featured: true,
    homeHighlights: [
      "Typed API integration for interview sessions",
      "Prompt + response pipeline with predictable data flow",
      "Focused UX for fast iteration"
    ],
    problem: [
      "Interview prep tools feel scattered and unstructured",
      "Users need fast feedback without context switching"
    ],
    approach: [
      "Built a focused React UI with strict TypeScript contracts",
      "FastAPI backend for deterministic prompt/response flows",
      "AWS deployment for consistent performance"
    ],
    architecture: [
      "interview-ai-helper/",
      "  ui/ (React + TS)",
      "  api/ (FastAPI)",
      "  services/ (prompt + scoring)",
      "  infra/ (AWS deploy)"
    ],
    decisions: [
      "Kept the UI stateless where possible",
      "Explicit schemas for every request/response",
      "Thin backend endpoints to keep latency low"
    ],
    improvements: [
      "Add structured rubrics per role",
      "Persist session analytics for trend tracking"
    ]
  },
  {
    slug: "dropzone",
    name: "DropZone",
    summary: "iOS drop-off coordination with a clean SwiftUI flow.",
    tech: ["SwiftUI", "iOS"],
    featured: true,
    homeHighlights: [
      "Single-screen flows with UI state validation",
      "Consistent view models and bindings",
      "Optimized for one-hand use"
    ],
    problem: [
      "Drop-off coordination often requires too many steps",
      "Mobile UX should stay fast and single-tasked"
    ],
    approach: [
      "SwiftUI views with composable state",
      "Clear flow boundaries and predictable navigation",
      "Minimal surface area to reduce cognitive load"
    ],
    architecture: [
      "dropzone/",
      "  views/",
      "  view-models/",
      "  models/",
      "  services/"
    ],
    decisions: [
      "Kept navigation stack shallow",
      "Validated inputs before transitions",
      "Separated UI state from domain models"
    ],
    improvements: [
      "Add offline-safe caching",
      "Extend flow with pickup confirmation"
    ]
  },
  {
    slug: "ai-code-review",
    name: "AI Code Review Tool",
    summary: "Python tool for fast lint-like feedback on PRs.",
    tech: ["Python"],
    featured: true,
    homeHighlights: [
      "Automated diff parsing",
      "Rule-based checks for consistent reviews",
      "Readable output for fast scan"
    ],
    problem: [
      "Review bottlenecks slow down shipping",
      "Inconsistent review style creates noisy feedback"
    ],
    approach: [
      "Parsed diffs into structured chunks",
      "Applied deterministic rules before AI prompts",
      "Output grouped by severity"
    ],
    architecture: [
      "ai-code-review/",
      "  parser/",
      "  rules/",
      "  prompts/",
      "  reporter/"
    ],
    decisions: [
      "Deterministic checks first, AI second",
      "Clear severity buckets for findings",
      "Lightweight CLI footprint"
    ],
    improvements: [
      "Add repo-wide baselines",
      "Integrate with PR comments"
    ]
  }
];
