export const Bio = {
  name: "Rishit Bafna",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Distributed Systems Builder",
    "Product-Minded Engineer",
  ],
  description:
    "I build reliable, high-performance products across web and backend systems. I care about thoughtful UX, clean architecture, and measurable engineering impact.",
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
    desc: "Optimized production SQL queries over 500K+ rows and refactored payment services with idempotency safeguards. Reduced dashboard load time from 8s to under 2s and eliminated duplicate transaction defects across 10K+ daily events.",
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
    grade: "3.4 GPA (Cum Laude)",
    desc: "BS in Computer Science with software engineering concentration. Built strong foundations in data structures, algorithms, systems, and full-stack software development.",
    degree: "Bachelor of Science in Computer Science",
  },
];

export const projects = [
  {
    id: 0,
    title: "Distributed Key-Value Store",
    date: "2025",
    description:
      "Fault-tolerant distributed database implementing Raft consensus with leader election, log replication, and chaos-tested failover behavior.",
    image: "https://placehold.co/1400x900/0b1220/5eead4?text=Distributed+KV+Store",
    tags: ["Java", "Raft", "gRPC", "Protocol Buffers", "Distributed Systems"],
    category: "Systems",
    github: "https://github.com/rbafna1978/distributed-kv-store",
    webapp: "",
  },
  {
    id: 1,
    title: "Multithreaded HTTP Server",
    date: "2024",
    description:
      "High-performance web server built from scratch in C++ using socket programming and a custom thread pool to handle concurrent client connections efficiently.",
    image: "https://placehold.co/1400x900/1e293b/f8fafc?text=HTTP+Server",
    tags: ["C++", "Socket Programming", "Multithreading", "Systems"],
    category: "Systems",
    github: "https://github.com/rbafna1978",
    webapp: "",
  },
  {
    id: 2,
    title: "GitHub Dependency Visualizer",
    date: "2025",
    description:
      "Analyzes repositories into interactive dependency graphs with vulnerability checks and circular dependency detection for large codebases.",
    image: "https://placehold.co/1400x900/111827/22d3ee?text=Dependency+Visualizer",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Cytoscape"],
    category: "Web App",
    github: "https://github.com/rbafna1978",
    webapp: "",
  },
  {
    id: 3,
    title: "Real-Time Collaborative Code Editor",
    date: "2024",
    description:
      "Multi-user editor using WebSockets and CRDT-based sync to support low-latency collaboration with horizontal scaling patterns.",
    image: "https://placehold.co/1400x900/0f172a/a3e635?text=Collaborative+Editor",
    tags: ["React", "WebSockets", "CRDT", "Redis", "Docker"],
    category: "Web App",
    github: "https://github.com/rbafna1978",
    webapp: "",
  },
  {
    id: 4,
    title: "AI Interview Helper",
    date: "2024",
    description:
      "Intelligent platform that provides real-time feedback and transcription during technical interviews, leveraging LLMs for behavioral and technical analysis.",
    image: "https://placehold.co/1400x900/020617/38bdf8?text=Interview+Helper",
    tags: ["Next.js", "OpenAI", "WebRTC", "PostgreSQL"],
    category: "Web App",
    github: "https://github.com/rbafna1978",
    webapp: "",
  },
  {
    id: 5,
    title: "Job Application Tracker",
    date: "2024",
    description:
      "Chrome extension plus dashboard for tracking applications, analytics, and automation to reduce repetitive workflow time.",
    image: "https://placehold.co/1400x900/101827/f59e0b?text=Job+Tracker",
    tags: ["JavaScript", "Chrome API", "React", "Node.js", "PostgreSQL"],
    category: "Tools",
    github: "https://github.com/rbafna1978",
    webapp: "",
  },
];
