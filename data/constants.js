export const Bio = {
  name: "Rishit Bafna",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Distributed Systems Builder",
    "Product-Minded Engineer",
  ],
  description:
    "I build distributed systems and ship production software. From Raft consensus algorithms to real-time web apps — I care about code that works under pressure and products that create real value.",
  email: "bafnarishit@gmail.com",
  github: "https://github.com/rbafna1978",
  resume: "/resume.pdf",
  linkedin: "https://www.linkedin.com/in/rishit-bafna",
  twitter: "https://x.com/rbafna1978",
  insta: "https://www.instagram.com/rishitbafna",
  facebook: "https://www.facebook.com/rishitbafna",
};

export const skills = [
  {
    title: "Languages",
    skills: [
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "FastAPI" },
      { name: "Tailwind CSS" },
      { name: "Three.js" },
    ],
  },
  {
    title: "Tools & Infra",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Git" },
      { name: "Redis" },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    role: "Software Engineering Intern",
    company: "J. Miller Custom Cues",
    date: "Aug 2025 - Dec 2025",
    desc: "Shipped a production 3D product configurator using Three.js and React, reducing customer design revision cycles by 35%. Built a PostgreSQL REST API with Stripe integration processing 100+ orders with transactional cart management and sub-200ms response times.",
    skills: ["React", "Three.js", "PostgreSQL", "Stripe", "TypeScript"],
  },
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "Winssoft Technologies India Pvt. Ltd.",
    date: "May 2025 - July 2025",
    desc: "Optimized SQL queries by implementing composite indexes and materialized views, reducing analytics dashboard load time from 8 seconds to under 2 seconds. Refactored payment microservice handling 5K+ daily transactions with idempotency guarantees, preventing duplicate charge errors in concurrent request scenarios.",
    skills: ["SQL", "PostgreSQL", "Node.js", "React", "Performance"],
  },
];

export const education = [
  {
    id: 0,
    school: "Arizona State University, Tempe",
    date: "Jan 2026 - May 2027",
    grade: "3.44 GPA",
    desc: "MS in Computer Science focused on distributed systems, operating systems, and scalable product engineering.",
    degree: "Master of Science in Computer Science",
  },
  {
    id: 1,
    school: "Arizona State University, Tempe",
    date: "Aug 2021 - Dec 2025",
    grade: "3.42 GPA",
    desc: "BS in Computer Science with software engineering concentration. Built strong foundations in data structures, algorithms, systems, and full-stack software development. Dean's List (multiple semesters); coursework in Operating Systems, Distributed Systems, Machine Learning, and Software Design.",
    degree: "Bachelor of Science in Computer Science",
  },
];

export const projects = [
  {
    id: 4,
    order: 1,
    title: "RiskStream",
    date: "2026",
    description:
      "End-to-end real-time fraud detection pipeline over 500K+ transactions. Point-in-time-correct features eliminate label leakage with training/serving parity verified by automated tests. Engineers 23 behavioral features and achieves 0.94 PR-AUC at 0.17% class imbalance across four simulated fraud attack patterns using XGBoost + Isolation Forest with Platt calibration, serving inference at p99 < 50ms with zero database reads on the hot path. PSI-based drift monitoring triggers automatic retraining and hot-swaps new model versions without service restart.",
    tags: ["Python", "XGBoost", "FastAPI", "PostgreSQL", "Redis", "MLflow", "Docker"],
    category: "Machine Learning",
    github: "https://github.com/rbafna1978/riskstream",
    liveUrl: "",
  },
  {
    id: 5,
    order: 3,
    title: "CyberSentient RAG Pipeline",
    date: "2026",
    description:
      "Hybrid retrieval pipeline over 100K+ CVE/CWE/CAPEC records combining dense vector search, BM25 sparse retrieval, and Reciprocal Rank Fusion. Cross-encoder reranking (Qwen3-Reranker-8B) disambiguates semantically similar threat queries to reduce false retrievals on ambiguous CVE lookups. Delivers 400ms end-to-end query latency for real-time cybersecurity threat intelligence across a 6-feed ingestion pipeline.",
    tags: ["Python", "Qwen3-Embedding-8B", "Qdrant", "BM25", "FastAPI", "RAG"],
    category: "Machine Learning",
    github: "",
    liveUrl: "",
  },
  {
    id: 0,
    order: 4,
    title: "Distributed Key-Value Store",
    date: "2025",
    description:
      "Fault-tolerant distributed database implementing Raft consensus with leader election, log replication, and chaos-tested failover behavior. 5-node Raft cluster with a gRPC SET/GET/DELETE API, correct leader redirection at sub-5ms latency, and zero data loss verified through simulated leader failures.",
    tags: ["Java", "Raft", "gRPC", "Protocol Buffers", "Distributed Systems"],
    category: "Systems",
    github: "https://github.com/rbafna1978/distributed-kv-store",
    liveUrl: "",
  },
  {
    id: 1,
    order: 5,
    title: "Multithreaded HTTP Server",
    date: "2024",
    description:
      "High-performance web server built from scratch in C++ using socket programming and a custom thread pool to handle concurrent client connections efficiently.",
    tags: ["C++", "Socket Programming", "Multithreading", "Systems"],
    category: "Systems",
    github: "https://github.com/rbafna1978/http-server",
    liveUrl: "",
  },
  {
    id: 2,
    order: 6,
    title: "GitHub Dependency Visualizer",
    date: "2025",
    description:
      "Analyzes repositories into interactive dependency graphs with vulnerability checks and circular dependency detection for large codebases.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Cytoscape"],
    category: "Web App",
    github: "https://github.com/rbafna1978/github-dependency-visualizer",
    liveUrl: "",
  },
  {
    id: 3,
    order: 7,
    title: "AI Interview Coach",
    date: "2026",
    description:
      "Interview practice platform using browser-native Web Speech API for live transcription, scoring answers on STAR structure, clarity, filler words, and pacing in real time. Supports behavioral, technical, and freestyle modes with session history to track improvement.",
    tags: ["React", "Web Speech API", "Node.js", "PostgreSQL"],
    category: "Web App",
    github: "https://github.com/rbafna1978/Interview_Helper",
    liveUrl: "https://interview-helper-three.vercel.app",
  },
  {
    id: 6,
    order: 2,
    title: "F1 Race Strategy RL",
    date: "2026 (Ongoing)",
    description:
      "Multi-agent PPO reinforcement learning environment built from scratch over 188K laps across 172 F1 races (2018-2025), backed by a reproducible lap-level feature store. Three physics sub-models for tire degradation, safety car prediction (0.81 AUC), and DNF risk, with a 142-dimension observation space and counterfactual reward shaping across all 20 cars per race.",
    tags: ["Python", "PyTorch", "PPO", "FastAPI", "React", "Reinforcement Learning"],
    category: "Machine Learning",
    github: "https://github.com/rbafna1978/f1_strategy",
    liveUrl: "",
  },
  {
    id: 7,
    order: 8,
    title: "easymon",
    date: "2026",
    description:
      "Terminal-based system monitor for macOS that translates raw performance metrics into plain-English explanations instead of dumping numbers. Focuses on macOS-specific signals like memory pressure and purgeable storage that traditional tools surface poorly, distributed via Homebrew, pip, and curl install.",
    tags: ["Python", "macOS", "CLI", "Homebrew"],
    category: "Systems",
    github: "https://github.com/rbafna1978/easymon",
    liveUrl: "",
  },
];
