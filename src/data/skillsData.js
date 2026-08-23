export const skillsData = {
  categories: [
    {
      id: "frontend",
      title: "Frontend & Architecture",
      color: "#00f0ff",
      skills: [
        { name: "React.js", level: "Expert", exp: "6+ yrs", projects: ["Toyota TMNA", "Pampers", "JigsawML", "Gainium"], desc: "Hooks, Concurrent Mode, Profiling, Custom Hooks Architecture" },
        { name: "Next.js", level: "Expert", exp: "5+ yrs", projects: ["Toyota TMNA", "Pampers", "DTechtive"], desc: "App Router, SSR, SSG, ISR, API Routes, Edge Runtime" },
        { name: "Vue.js / Nuxt 3", level: "Advanced", exp: "3+ yrs", projects: ["PC Builder"], desc: "Composition API, Pinia, Nitro Engine, Server Engine" },
        { name: "TypeScript", level: "Advanced", exp: "5+ yrs", projects: ["Toyota TMNA", "JigsawML", "PC Builder"], desc: "Generics, Utility Types, Discriminated Unions, Strict Typings" },
        { name: "JavaScript (ES6+)", level: "Master", exp: "6+ yrs", projects: ["All Projects"], desc: "Async/Await, Event Loop, Closures, Performance Tuning" },
        { name: "Redux Toolkit / Pinia", level: "Expert", exp: "6+ yrs", projects: ["Toyota TMNA", "PC Builder"], desc: "Slices, RTK Query, Reactive Stores, Memoized Selectors" },
        { name: "Tailwind CSS / UI Kits", level: "Expert", exp: "5+ yrs", projects: ["Toyota TMNA", "JigsawML", "PC Builder"], desc: "Material UI, Styled Components, Design Systems, Tokenization" }
      ]
    },
    {
      id: "architecture",
      title: "Architecture & Performance",
      color: "#a855f7",
      skills: [
        { name: "Server-Side Rendering (SSR)", level: "Expert", exp: "5+ yrs", projects: ["Toyota TMNA", "Pampers"], desc: "Hydration optimization, SEO, TTFB reduction" },
        { name: "Reusable Component Libraries", level: "Expert", exp: "5+ yrs", projects: ["Toyota TMNA", "Pampers"], desc: "Internal npm packages, design token sync, Storybook" },
        { name: "Web Performance & Core Web Vitals", level: "Expert", exp: "6+ yrs", projects: ["Toyota TMNA", "Pampers"], desc: "Lighthouse 95+, code splitting, dynamic imports, bundle reduction" },
        { name: "Micro Frontends & Modular UI", level: "Advanced", exp: "3+ yrs", projects: ["Enterprise Platforms"], desc: "Module federation, decoupled deployment strategies" }
      ]
    },
    {
      id: "backend-cloud",
      title: "Backend, Database & Cloud",
      color: "#10b981",
      skills: [
        { name: "Node.js & Express", level: "Advanced", exp: "5+ yrs", projects: ["Diveroid", "OpenpassAI"], desc: "REST APIs, Streaming, Microservices, Middleware" },
        { name: "NestJS", level: "Advanced", exp: "2+ yrs", projects: ["Backend Services"], desc: "Dependency Injection, Modules, Controllers, Guards" },
        { name: "PostgreSQL & Supabase", level: "Advanced", exp: "4+ yrs", projects: ["PC Builder", "OpenpassAI"], desc: "Complex SQL, Relational Design, Row-Level Security, Realtime" },
        { name: "MySQL & Sequelize", level: "Advanced", exp: "5+ yrs", projects: ["Diveroid"], desc: "Query indexing, high-volume telemetry tables, migrations" },
        { name: "AWS (S3, EC2, RDS)", level: "Advanced", exp: "4+ yrs", projects: ["Diveroid"], desc: "Presigned direct uploads, EC2 hosting, RDS instances" },
        { name: "Azure DevOps & CI/CD", level: "Advanced", exp: "3+ yrs", projects: ["Toyota TMNA"], desc: "Multi-stage pipelines, automated build, release approvals" },
        { name: "Auth (Cognito, JWT, bcrypt)", level: "Expert", exp: "5+ yrs", projects: ["Toyota TMNA", "Diveroid"], desc: "OAuth, refresh tokens, role-based access control (RBAC)" }
      ]
    },
    {
      id: "ai-emerging",
      title: "AI Integration & Emerging Tech",
      color: "#ec4899",
      skills: [
        { name: "OpenAI & LLM Integration", level: "Advanced", exp: "2+ yrs", projects: ["JigsawML", "OpenpassAI", "Legal Assistant"], desc: "Structured outputs, streaming completions, prompt design" },
        { name: "React Flow (Graph UIs)", level: "Advanced", exp: "2+ yrs", projects: ["JigsawML"], desc: "Custom nodes, interactive edges, DAG validation" },
        { name: "Three.js / 3D Web", level: "Intermediate", exp: "2+ yrs", projects: ["3D Portfolio World"], desc: "R3F, Rapier physics, shaders, interactive 3D scenes" },
        { name: "Contentful & Uniform CMS", level: "Advanced", exp: "3+ yrs", projects: ["Pampers"], desc: "Headless CMS, personalization engines, component binding" }
      ]
    }
  ]
};

// Flattened list for mini-game targets
export const flatSkillTargets = [
  { id: "react", name: "React.js", category: "frontend", points: 100, color: "#00f0ff" },
  { id: "next", name: "Next.js", category: "frontend", points: 120, color: "#ffffff" },
  { id: "ts", name: "TypeScript", category: "frontend", points: 100, color: "#3178c6" },
  { id: "vue", name: "Vue 3", category: "frontend", points: 90, color: "#42b883" },
  { id: "nuxt", name: "Nuxt 3", category: "frontend", points: 90, color: "#00dc82" },
  { id: "node", name: "Node.js", category: "backend", points: 100, color: "#68a063" },
  { id: "postgres", name: "PostgreSQL", category: "backend", points: 110, color: "#336791" },
  { id: "supabase", name: "Supabase", category: "backend", points: 110, color: "#3ecf8e" },
  { id: "aws", name: "AWS S3/EC2", category: "cloud", points: 120, color: "#ff9900" },
  { id: "azure", name: "Azure DevOps", category: "cloud", points: 100, color: "#0078d4" },
  { id: "cognito", name: "Cognito Auth", category: "cloud", points: 110, color: "#e11d48" },
  { id: "openai", name: "OpenAI LLM", category: "ai", points: 150, color: "#10a37f" },
  { id: "reactflow", name: "React Flow", category: "ai", points: 110, color: "#ff007f" },
  { id: "threejs", name: "Three.js 3D", category: "graphics", points: 150, color: "#00ffff" }
];
