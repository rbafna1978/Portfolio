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
      {
        name: "Java",
        imageLight: "https://skillicons.dev/icons?i=java",
        imageDark: "https://skillicons.dev/icons?i=java",
      },
      {
        name: "Python",
        imageLight: "https://skillicons.dev/icons?i=py",
        imageDark: "https://skillicons.dev/icons?i=py",
      },
      {
        name: "JavaScript",
        imageLight: "https://skillicons.dev/icons?i=js",
        imageDark: "https://skillicons.dev/icons?i=js",
      },
      {
        name: "TypeScript",
        imageLight: "https://skillicons.dev/icons?i=ts",
        imageDark: "https://skillicons.dev/icons?i=ts",
      },
      {
        name: "SQL",
        imageLight: "https://skillicons.dev/icons?i=postgres",
        imageDark: "https://skillicons.dev/icons?i=postgres",
      },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      {
        name: "React",
        imageLight: "https://skillicons.dev/icons?i=react",
        imageDark: "https://skillicons.dev/icons?i=react",
      },
      {
        name: "Next.js",
        imageLight: "https://skillicons.dev/icons?i=nextjs",
        imageDark: "https://skillicons.dev/icons?i=nextjs",
      },
      {
        name: "Node.js",
        imageLight: "https://skillicons.dev/icons?i=nodejs",
        imageDark: "https://skillicons.dev/icons?i=nodejs",
      },
      {
        name: "Express",
        imageLight: "https://skillicons.dev/icons?i=express",
        imageDark: "https://skillicons.dev/icons?i=express",
      },
      {
        name: "Three.js",
        imageLight: "https://skillicons.dev/icons?i=threejs",
        imageDark: "https://skillicons.dev/icons?i=threejs",
      },
    ],
  },
  {
    title: "Tools & Infra",
    skills: [
      {
        name: "PostgreSQL",
        imageLight: "https://skillicons.dev/icons?i=postgres",
        imageDark: "https://skillicons.dev/icons?i=postgres",
      },
      {
        name: "Docker",
        imageLight: "https://skillicons.dev/icons?i=docker",
        imageDark: "https://skillicons.dev/icons?i=docker",
      },
      {
        name: "AWS",
        imageLight: "https://skillicons.dev/icons?i=aws",
        imageDark: "https://skillicons.dev/icons?i=aws",
      },
      {
        name: "Git",
        imageLight: "https://skillicons.dev/icons?i=git",
        imageDark: "https://skillicons.dev/icons?i=git",
      },
      {
        name: "Redis",
        imageLight: "https://skillicons.dev/icons?i=redis",
        imageDark: "https://skillicons.dev/icons?i=redis",
      },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: "https://placehold.co/240x120/111827/ffffff?text=JMC",
    logoWide: true,
    role: "Software Engineering Intern",
    company: "J. Miller Custom Cues",
    date: "Aug 2025 - Dec 2025",
    desc: "Collaborated in a 3-person team to ship a production 3D configurator using Three.js and React. Built PostgreSQL-backed APIs with Stripe integration and reduced customer revisions by 35% while sustaining sub-200ms API response times.",
    skills: ["React", "Three.js", "PostgreSQL", "Stripe", "TypeScript"],
    doc: "",
  },
  {
    id: 1,
    img: "https://placehold.co/240x120/0f172a/ffffff?text=WINSOFT",
    logoWide: true,
    role: "Software Engineering Intern",
    company: "Winssoft Technologies India Pvt. Ltd.",
    date: "May 2025 - July 2025",
    desc: "Optimized SQL queries by implementing composite indexes and materialized views, reducing analytics dashboard load time from 8 seconds to under 2 seconds. Refactored payment microservice handling 5K+ daily transactions, adding idempotency checks and database constraints to eliminate duplicate transaction bugs.",
    skills: ["SQL", "PostgreSQL", "Node.js", "React", "Performance"],
    doc: "",
  },
];

export const education = [
  {
    id: 0,
    img: "https://placehold.co/120x120/8b1f24/ffffff?text=ASU",
    school: "Arizona State University, Tempe",
    date: "Jan 2026 - May 2027",
    grade: "In Progress",
    desc: "MS in Computer Science focused on distributed systems, operating systems, and scalable product engineering.",
    degree: "Master of Science in Computer Science",
  },
  {
    id: 1,
    img: "https://placehold.co/120x120/8b1f24/ffffff?text=ASU",
    school: "Arizona State University, Tempe",
    date: "Aug 2021 - Dec 2025",
    grade: "3.42 GPA",
    desc: "BS in Computer Science with software engineering concentration. Built strong foundations in data structures, algorithms, systems, and full-stack software development.",
    degree: "Bachelor of Science in Computer Science",
  },
];

export const projects = [
  {
    id: 4,
    order: 2,
    title: "RiskStream",
    date: "2026",
    description:
      "End-to-end real-time fraud detection pipeline over 500K+ transactions. Point-in-time-correct features eliminate label leakage with training/serving parity verified by automated tests. Achieves 0.96 PR-AUC on 0.17% class imbalance using XGBoost + Isolation Forest with Platt calibration, serving inference at p99 < 50ms with zero database reads on the hot path. PSI-based drift monitoring triggers automatic retraining and hot-swaps new model versions without service restart.",
    image: "https://placehold.co/1400x900/0b1220/f97316?text=RiskStream",
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
    image: "https://placehold.co/1400x900/020617/a78bfa?text=CyberSentient+RAG",
    tags: ["Python", "Qwen3-Embedding-8B", "Qdrant", "BM25", "FastAPI", "RAG"],
    category: "Machine Learning",
    github: "https://github.com/rbafna1978/cybersentient-rag",
    liveUrl: "",
  },
  {
    id: 0,
    order: 1,
    title: "Distributed Key-Value Store",
    date: "2025",
    description:
      "Fault-tolerant distributed database implementing Raft consensus with leader election, log replication, and chaos-tested failover behavior.",
    image: "https://placehold.co/1400x900/0b1220/5eead4?text=Distributed+KV+Store",
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
    image: "https://placehold.co/1400x900/1e293b/f8fafc?text=HTTP+Server",
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
    image: "https://placehold.co/1400x900/111827/22d3ee?text=Dependency+Visualizer",
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
    image: "https://placehold.co/1400x900/020617/38bdf8?text=Interview+Helper",
    tags: ["React", "Web Speech API", "Node.js", "PostgreSQL"],
    category: "Web App",
    github: "https://github.com/rbafna1978/Interview_Helper",
    liveUrl: "https://interview-helper-three.vercel.app",
  },
  {
    id: 6,
    order: 4,
    title: "F1 Strategy RL Pipeline",
    date: "2026",
    description:
      "Reproducible data pipeline assembling a lap-level feature store across 2018-2025 F1 seasons, unifying FastF1, Ergast/Jolpica, and Open-Meteo data through an 18-step cached, resumable workflow. Feeds four downstream models — tire degradation, safety-car prediction, DNF risk, and a reinforcement-learning strategy agent — with three frozen neural sub-models acting as physics components inside the RL environment.",
    image: "https://placehold.co/1400x900/111827/ef4444?text=F1+Strategy+RL",
    tags: ["Python", "PyTorch", "FastF1", "pandas", "scikit-learn", "Reinforcement Learning"],
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
    image: "https://placehold.co/1400x900/0f172a/34d399?text=easymon",
    tags: ["Python", "macOS", "CLI", "Homebrew"],
    category: "Systems",
    github: "https://github.com/rbafna1978/easymon",
    liveUrl: "",
  },
];
