import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "distributed-kv-store",
    name: "Distributed Key-Value Store",
    summary: "Fault-tolerant distributed database implementing Raft consensus.",
    tech: ["Java", "Raft Consensus", "gRPC", "Protocol Buffers"],
    featured: true,
    link: "https://github.com/rbafna1978/distributed-kv-store",
    homeHighlights: [
      "Fault-tolerant distributed database with Raft consensus",
      "REST API supporting SET/GET/DELETE operations",
      "Verified through chaos testing with leader crashes"
    ],
    problem: [
      "Distributed systems require strong consistency guarantees during failures",
      "Manual failover is slow and error-prone"
    ],
    approach: [
      "Implemented Raft consensus algorithm for leader election and log replication",
      "Designed gRPC client-server protocol with redirection",
      "Verified consistency across node failures"
    ],
    architecture: [
      "distributed-kv-store/",
      "  raft/ (consensus logic)",
      "  storage/ (log & state machine)",
      "  grpc/ (client-server)",
      "  cluster/ (node management)"
    ],
    decisions: [
      "Used Raft for understandable consensus logic",
      "gRPC for efficient inter-node communication",
      "Protocol Buffers for compact serialization"
    ],
    improvements: [
      "Add snapshotting for faster recovery",
      "Support dynamic cluster membership changes"
    ]
  },
  {
    slug: "github-dependency-visualizer",
    name: "GitHub Dependency Visualizer",
    summary: "Full stack web application generating interactive dependency graphs.",
    tech: ["React", "TypeScript", "Node.js", "Cytoscape.js", "PostgreSQL"],
    featured: true,
    homeHighlights: [
      "Analyzes repositories to generate interactive graphs with 1000+ nodes",
      "Identifies circular dependencies and security vulnerabilities via OSV API",
      "Supports npm, PyPI, and Go modules"
    ],
    problem: [
      "Complex codebases make it difficult to visualize dependency depth and security risks",
      "Circular dependencies can lead to fragile build systems"
    ],
    approach: [
      "Built full-stack analyzer using OSV API for vulnerability detection",
      "Implemented force-directed graph visualization with real-time filtering",
      "Optimized analysis time from hours to seconds for large codebases"
    ],
    architecture: [
      "dependency-visualizer/",
      "  ui/ (React + Cytoscape)",
      "  analyzer/ (Node.js)",
      "  api/ (OSV Integration)",
      "  db/ (PostgreSQL)"
    ],
    decisions: [
      "Cytoscape.js for robust graph rendering",
      "Real-time filtering to handle high node density",
      "OSV API for standardized vulnerability data"
    ],
    improvements: [
      "Add support for more package managers",
      "Integrate with CI/CD for automated dependency audits"
    ]
  },
  {
    slug: "collaborative-editor",
    name: "Real-Time Collaborative Code Editor",
    summary: "Collaborative editing platform with CRDTs and WebSockets.",
    tech: ["React", "WebSockets", "CRDT", "Redis", "Docker"],
    featured: true,
    homeHighlights: [
      "Supports 50+ simultaneous users per document",
      "Conflict-free Replicated Data Types (CRDT)",
      "Redis pub/sub for horizontal scaling"
    ],
    problem: [
      "Real-time collaboration is difficult to synchronize without conflicts",
      "Standard locking mechanisms degrade user experience"
    ],
    approach: [
      "Used CRDTs for eventual consistency and operational transformation",
      "WebSocket server with Redis pub/sub",
      "Dockerized for easy deployment"
    ],
    architecture: [
      "collaborative-editor/",
      "  client/ (React)",
      "  server/ (WebSockets)",
      "  redis/ (Pub/Sub)",
      "  docker-compose.yml"
    ],
    decisions: [
      "CRDTs over OT for decentralized conflict resolution",
      "Redis for scalable message passing",
      "WebSockets for low-latency updates"
    ],
    improvements: [
      "Add voice/video chat support",
      "Implement version history and rollback"
    ]
  },
  {
    slug: "job-tracker",
    name: "Job Application Tracker",
    summary: "Chrome extension and dashboard for tracking job applications.",
    tech: ["JavaScript", "Chrome API", "React", "Node.js", "PostgreSQL"],
    featured: false,
    homeHighlights: [
      "Intelligent form detection for auto-filling applications",
      "Reduced application time by 60%",
      "Tracking 200+ applications with analytics"
    ],
    problem: [
      "Applying to jobs is repetitive and time-consuming",
      "Hard to keep track of application status across multiple sites"
    ],
    approach: [
      "Chrome extension for DOM parsing and field mapping",
      "Web dashboard for status updates and reminders",
      "Analytics to show response rates"
    ],
    architecture: [
      "job-tracker/",
      "  extension/ (Chrome API)",
      "  dashboard/ (React)",
      "  api/ (Node.js)",
      "  db/ (PostgreSQL)"
    ],
    decisions: [
      "Browser extension for seamless integration",
      "Automated field mapping to reduce manual entry",
      "Centralized dashboard for overview"
    ],
    improvements: [
      "Add AI-generated cover letters",
      "Integrate with email to auto-update status"
    ]
  }
];
