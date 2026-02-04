import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    company: "J. Miller Custom Cues",
    role: "Software Engineering Intern",
    context: "Internship",
    scope: [
      "Collaborated with 3-person team to ship production 3D configurator using Three.js and React",
      "Built PostgreSQL REST API with Stripe payment integration processing live orders"
    ],
    tech: ["Three.js", "React", "PostgreSQL", "Stripe"],
    impact: [
      "Reduced customer revisions by 35% and achieved sub 200ms response times",
      "Eliminated checkout errors and simplified workflow steps"
    ]
  },
  {
    company: "Winssoft Technologies India Pvt. Ltd.",
    role: "Software Engineering Intern",
    context: "Internship",
    scope: [
      "Optimized production SQL queries processing 500K+ records with composite indexes",
      "Refactored payment microservice adding idempotency checks and database constraints"
    ],
    tech: ["SQL", "PostgreSQL", "React", "Node.js"],
    impact: [
      "Reduced dashboard page load time from 8 seconds to under 2 seconds",
      "Eliminated duplicate transaction bugs across 10K+ daily transactions"
    ]
  }
];