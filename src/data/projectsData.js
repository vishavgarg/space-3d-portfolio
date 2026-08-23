export const projectsData = [
  {
    id: "toyota-tmna",
    title: "Toyota Motor North America (TMNA)",
    client: "Toyota Motor North America & Lexus",
    domain: "Automotive / Enterprise Marketing",
    role: "Full Stack Developer",
    badge: "Fortune 500 Enterprise Scale",
    isHeadline: true,
    scale: "~500 Dealerships across North America",
    technologies: ["React.js", "Next.js", "Redux Toolkit", "TypeScript", "Amazon Cognito", "JWT", "Azure DevOps", "Material UI", "Node.js"],
    overview: "Enterprise digital marketing orchestration platform enabling Toyota and Lexus dealerships to build, preview, schedule, and monitor multi-channel marketing campaigns through a single centralized, server-rendered web application at a scale of ~500 dealerships across North America.",
    problem: "Dealer-specific campaign configurations needed to be supported across ~500 dealerships without duplicating UI logic for each dealer, while keeping the platform performant, secure, and maintainable.",
    architecture: [
      "Designed a reusable React component architecture supporting campaign creation, dealer management, and approval workflows across the platform.",
      "Built SSR pages with Next.js for high performance and SEO, backed by Redux Toolkit for shared application state.",
      "Implemented secure authentication using Amazon Cognito with JWT access and refresh tokens across dealer and admin roles.",
      "Built REST API integrations connecting the frontend to multiple backend services.",
      "Developed analytics dashboards surfacing campaign performance and operational insights.",
      "Implemented code splitting, lazy loading, and memoization to keep the app performant at dealer scale.",
      "Managed Azure DevOps CI/CD pipelines for automated build, test, and deployment."
    ],
    features: [
      "Multi-Channel Campaign Builder",
      "Dealer Analytics Dashboard",
      "Real-time Campaign Preview",
      "Role-Based Cognito Authentication",
      "Automated Scheduling Engine",
      "Enterprise Approval Workflow"
    ],
    achievements: [
      "Delivered reusable UI patterns adopted across multiple enterprise application modules.",
      "Improved maintainability by consolidating common components into shared libraries.",
      "Significantly reduced frontend rendering overhead through memoization and optimized state management."
    ],
    color: "#00f0ff",
    themeClass: "from-cyan-500/20 to-blue-600/20 border-cyan-500/50 text-cyan-300"
  },
  {
    id: "pampers",
    title: "Pampers (Procter & Gamble)",
    client: "Procter & Gamble",
    domain: "Consumer E-commerce / Marketing",
    role: "Frontend Engineer / Architect",
    badge: "Fortune 500 Global Multi-Site",
    isHeadline: true,
    scale: "Multiple Regional International Websites",
    technologies: ["React.js", "Next.js", "Contentful", "Uniform CMS", "Azure", "SSR", "CDN", "TypeScript"],
    overview: "Multi-site platform for Procter & Gamble's flagship Pampers brand, delivering marketer-editable, personalized web experiences — including product catalogs, parenting toolkits, and diaper-size recommendation utilities — across multiple regional Pampers websites.",
    problem: "Marketing teams needed to independently publish and personalize dynamic content across several international Pampers websites without requiring separate frontend deployments or duplicating UI development effort.",
    architecture: [
      "Built reusable UI component libraries shared across multiple Pampers websites, published as internal npm packages for cross-project consumption.",
      "Integrated Uniform CMS and Contentful for dynamic, marketer-editable content orchestration.",
      "Developed personalized customer experiences driven by prior user interaction signals.",
      "Built interactive product catalog experiences, parenting toolkit applications, and diaper size recommendation utilities.",
      "Optimized SEO and load performance using Server Side Rendering (SSR) and CDN-delivered static assets."
    ],
    features: [
      "Dynamic Product Catalog with Filters",
      "Interactive Parenting Toolkit",
      "Diaper Size Recommendation Calculator",
      "Marketer-Editable Uniform & Contentful CMS Integration",
      "Personalized User Journeys"
    ],
    achievements: [
      "Standardized UI component architecture across multiple regional country sites.",
      "Empowered non-technical marketing teams to launch personalized campaigns without engineering bottlenecks.",
      "Maintained top-tier Core Web Vitals score across high-traffic consumer domains."
    ],
    color: "#ec4899",
    themeClass: "from-pink-500/20 to-rose-600/20 border-pink-500/50 text-pink-300"
  },
  {
    id: "pc-builder",
    title: "PC Builder",
    client: "Flagship Solo Project",
    domain: "Hardware Configurator / E-commerce",
    role: "Full Stack Engineer & System Designer (100% Solo Ownership)",
    badge: "Full Stack Solo Architecture",
    isHeadline: true,
    scale: "Thousands of Components & Complex Dependency Graph",
    technologies: ["Vue.js 3", "Nuxt 3", "Pinia", "Supabase", "PostgreSQL", "Complex SQL", "Tailwind CSS"],
    overview: "An advanced PC-building configurator that allows users to pick custom hardware components, validates electrical, mechanical, and architectural compatibility in real-time, and optimizes builds based on budget and workload.",
    problem: "Hardware compatibility has thousands of complex relational constraints (CPU/socket matches, RAM clearance, PSU power headroom, case dimensions) that are computationally expensive to evaluate across huge product catalogs.",
    architecture: [
      "Owned end-to-end architecture and delivery using Nuxt 3 and Pinia for reactive client state management.",
      "Designed the Supabase/PostgreSQL database schema, including complex recursive SQL queries and foreign keys for component data and multi-way relationships.",
      "Built custom real-time component compatibility evaluation engine (CPU socket, chipset, RAM speed, PSU wattage with safety margins, GPU PCIe clearance).",
      "Implemented high-performance server-side filtering and multi-attribute search across an extensive catalog."
    ],
    features: [
      "Real-time Hardware Compatibility Checker",
      "Dynamic Power & Clearance Calculator",
      "Instant Build Summary & Spec Exporter",
      "Budget Optimizer with Alternative Component Suggestions",
      "Multi-Facet Component Search & Filtering"
    ],
    achievements: [
      "Engineered 100% solo from database schema modeling to full reactive UI deployment.",
      "Optimized complex SQL join queries to execute in <15ms for multi-filter component queries.",
      "Achieved seamless sub-second reactivity during real-time component swaps."
    ],
    color: "#eab308",
    themeClass: "from-amber-500/20 to-yellow-600/20 border-amber-500/50 text-amber-300"
  },
  {
    id: "diveroid",
    title: "Diveroid IoT Platform",
    client: "Diveroid",
    domain: "IoT / Underwater Diving Devices",
    role: "Backend & Systems Engineer",
    badge: "High-Volume Telemetry & Cloud Storage",
    isHeadline: true,
    scale: "Thousands of Active Diving Devices Worldwide",
    technologies: ["Node.js", "Express.js", "Sequelize", "MySQL", "AWS EC2", "AWS RDS", "AWS S3", "JWT", "Cron Jobs"],
    overview: "Backend platform and API ecosystem supporting smart underwater IoT diving devices — handling device telemetry, media capture pipelines, dive profile analytics, and dive statistics at global scale.",
    problem: "Diving devices needed to reliably capture and upload high-resolution underwater images and sensor telemetry (depth, temperature, ascent rate), often over unstable cellular/Wi-Fi connections at remote dive sites.",
    architecture: [
      "Designed robust backend REST APIs supporting underwater IoT diving hardware and companion mobile apps.",
      "Built resilient media upload pipelines with direct AWS S3 presigned URLs, multi-part chunking, and automated retry mechanisms for unstable marine connections.",
      "Implemented secure device & user authentication using JWT and bcrypt token systems.",
      "Managed scheduled background jobs with Cron for telemetry aggregation, dive log cleanup, and housekeeping.",
      "Optimized MySQL indexes and queries for large, high-frequency depth/time telemetry datasets.",
      "Deployed and monitored scalable backend services on AWS EC2 with managed MySQL on RDS."
    ],
    features: [
      "High-Frequency Dive Telemetry Processing",
      "Resilient Underwater Media Upload Pipeline",
      "Automated Dive Statistics & Depth Profiler",
      "Scheduled Aggregation & Maintenance Jobs",
      "Secure Device Authentication & API Keys"
    ],
    achievements: [
      "Eliminated failed uploads over high-latency marine network connections using presigned direct S3 streams.",
      "Reduced telemetry query latency by over 60% through targeted composite indexing.",
      "Maintained 99.9% uptime during peak seasonal diving activity."
    ],
    color: "#06b6d4",
    themeClass: "from-cyan-500/20 to-teal-600/20 border-cyan-500/50 text-cyan-300"
  },
  {
    id: "jigsawml",
    title: "JigsawML",
    client: "Personal Project",
    domain: "AI / Machine Learning Tooling",
    role: "Full Stack Engineer & AI Integrator",
    badge: "AI Workflow Builder & Graph UI",
    isHeadline: true,
    scale: "Visual Node-Based Pipeline Execution",
    technologies: ["React", "React Flow", "Tailwind CSS", "OpenAI API", "Prompt Engineering", "TypeScript"],
    overview: "An interactive visual drag-and-drop workflow builder for machine learning pipeline creation, featuring a graph-based node UI, connection validation, and OpenAI-powered intelligent workflow suggestions.",
    problem: "Composing complex ML and data preprocessing pipelines often requires writing boilerplate Python scripts, slowing down rapid experimentation and visual architecture understanding.",
    architecture: [
      "Built an interactive drag-and-drop workflow canvas using React Flow for ML pipeline composition.",
      "Designed a modular graph-based UI with reusable, composable node components for data ingestion, cleaning, model training, and evaluation.",
      "Integrated OpenAI LLM APIs with structured prompt engineering to analyze graph topologies and provide contextual next-node suggestions.",
      "Implemented real-time edge connection validation to prevent invalid data type connections between pipeline steps."
    ],
    features: [
      "Drag-and-Drop Visual Graph Canvas",
      "Custom Composable ML Step Nodes",
      "AI-Powered Pipeline Recommendations",
      "Graph Topology Validation & Export",
      "Interactive Node Property Inspector"
    ],
    achievements: [
      "Built a seamless zero-lag canvas supporting 50+ connected nodes and custom edge routers.",
      "Engineered structured prompt chains generating actionable pipeline completions with OpenAI.",
      "Created an intuitive mental model for visual machine learning architecture."
    ],
    color: "#a855f7",
    themeClass: "from-purple-500/20 to-violet-600/20 border-purple-500/50 text-purple-300"
  },
  {
    id: "gainium",
    title: "Gainium Algorithmic Trading",
    client: "FinTech Client",
    domain: "Algorithmic Trading / FinTech",
    role: "Frontend Engineer",
    badge: "Real-time Trading & Order Books",
    isHeadline: false,
    scale: "High-Frequency Financial Visualizations",
    technologies: ["React", "Material UI", "TradingView", "React Charts", "Node.js", "WebSockets"],
    overview: "Financial dashboards visualizing real-time market activity and algorithmic trading bot performance, including order book depth charts, backtesting analytics, and a comprehensive strategy admin UI.",
    problem: "Rendering rapid WebSocket market updates and complex financial charts without degrading browser UI responsiveness.",
    architecture: [
      "Developed high-performance financial dashboards visualizing market depth and trade executions.",
      "Integrated TradingView charting widgets and custom React Charts for strategy backtesting analytics.",
      "Implemented throttled state buffers for high-frequency WebSocket streams."
    ],
    features: [
      "Live Order Book Visualizations",
      "TradingView Technical Analysis Charts",
      "Algorithmic Strategy Backtesting UI",
      "Bot Management & PnL Dashboards"
    ],
    achievements: ["Maintained smooth 60fps chart rendering during high volatility market spikes."],
    color: "#10b981",
    themeClass: "from-emerald-500/20 to-teal-600/20 border-emerald-500/50 text-emerald-300"
  },
  {
    id: "openpassai",
    title: "OpenpassAI",
    client: "EdTech AI Project",
    domain: "Education Technology / AI",
    role: "Full Stack Engineer",
    badge: "Adaptive LLM Assessment",
    isHeadline: false,
    scale: "Dynamic AI Quiz Generation",
    technologies: ["React.js", "Node.js", "PostgreSQL", "OpenAI APIs", "JWT", "bcrypt"],
    overview: "AI-powered adaptive quiz generation platform with dynamic automated evaluation via OpenAI APIs and personalized learning paths based on performance gaps.",
    problem: "Static multiple-choice tests fail to adapt to a learner's exact knowledge level or provide personalized conceptual feedback.",
    architecture: [
      "Developed AI adaptive quiz engine generating contextual questions on-the-fly.",
      "Designed PostgreSQL schema for question pools, user response tracking, and difficulty weighting.",
      "Implemented secure JWT authentication and personalized student dashboards."
    ],
    features: [
      "Dynamic Question Generation with LLMs",
      "Automated Concept Gap Analysis",
      "Adaptive Difficulty Scaling",
      "Personalized Learning Milestones"
    ],
    achievements: ["Integrated LLM evaluation pipelines with sub-2s response streaming."],
    color: "#3b82f6",
    themeClass: "from-blue-500/20 to-indigo-600/20 border-blue-500/50 text-blue-300"
  }
];
