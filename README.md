# 🛸 3D Cyber-Archipelago Portfolio & Space Flight Simulator

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.17-white?style=for-the-badge&logo=react&logoColor=black)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE)

<p align="center">
  <strong>An immersive, high-performance 3D interactive engineering portfolio and futuristic flight simulator built with Three.js, React Three Fiber, WebGL, and Tailwind CSS.</strong>
</p>

[✨ Live Features](#-key-features) •
[🎮 Controls](#-controls--navigation) •
[🛠️ Tech Stack](#️-tech-stack) •
[🚀 Quick Start](#-quick-start) •
[📁 Project Structure](#-project-structure) •
[🎨 Customization](#-customization-guide) •
[👤 Author](#-author--contact)

</div>

---

## 🌌 Overview

Welcome to the **3D Cyber-Archipelago Portfolio** — an interactive web experience crafted to present senior-level engineering work through an exploratory, gamified 3D universe. Instead of scrolling through a conventional flat page, visitors can pilot customizable sci-fi starships across floating cyber islands, trigger high-octane space arcade mini-games, engage with 3D project monoliths, and inspect production enterprise case studies.

Designed and engineered by **Vishav Garg** (Senior Frontend & Full Stack Engineer with 6+ years of enterprise experience across React, Next.js, Vue, Node.js, and Cloud architectures).

---

## ✨ Key Features

### 🛸 1. Free-Roam 6-DOF Flight Mechanics
* **Physics-Inspired Flight Model**: Smooth acceleration, banking, deceleration, momentum, vertical elevation control, and high-speed **Nitro Boost**.
* **Procedural Cyber Archipelago**: Floating islands, glowing neon cyber bridges, cascading data stream waterfalls, dynamic planetary lighting, and atmospheric starfield skybox.
* **3D Interactive Raycasting**: Click directly on project monoliths, teleportation portals, skill hubs, or arcade bays in the 3D scene to open their technical dossiers.

### 🚀 2. Starship Hangar & Customizer
Visit the in-world **Hangar Bay** to inspect, test-drive, and swap between 3 distinct ship classes with unique stats and flight physics multipliers:
* 🟢 **Cyber Scout**: Agile quad-rotor recon drone with nimble handling and rapid response.
* 🔵 **Speed Interceptor**: Aerodynamic swept-wing delta fighter engineered for blistering top speeds and wide cruising arcs.
* 🟣 **Titan Dreadnought**: Heavily armored gunship with reinforced plating, dual heavy cannons, and unwavering stability.
* **Custom Thruster Trails**: Choose from 5 neon plasma thruster colors (*Cyan Pulse, Neon Magenta, Emerald Matrix, Solar Amber, Plasma Violet*).

### 🎮 3. High-Octane Space Mini-Games
Seamlessly switch between open-world exploration and standalone arcade game modes:
* ⚔️ **Space Dogfight Arcade**: 3D starfighter dogfight with AI enemy combatants, crosshair reticle targeting, laser cannon fire, multi-wave spawns, shield HP mechanics, and dedicated combat HUD.
* ⚡ **Warp Gate Time-Trial Race**: High-speed racing course through luminous neon warp gates with start countdown, checkpoint splits, lap timer, and best-time tracking.
* 🎯 **Holographic Target Range**: Floating skill cube gallery where you fire dual laser blasters at tech badges with hit particle bursts, combo multipliers, sound effects, and celebratory confetti.
* 🏃 **Cyber Platformer**: Jump pad challenge across floating neon platforms.

### 🎬 4. Autopilot Cinematic Guided Tour
Prefer a hands-free executive overview? Activate the **Autopilot Cinematic Tour** mode. A smooth spline-based camera flight glides through all major project monoliths, architectural highlights, and skills zones accompanied by synchronized narration HUD captions.

### 💼 5. Enterprise Project Case Studies
In-depth technical architecture breakdowns of production systems and flagship platforms:
* **Toyota Motor North America (TMNA) & Lexus**: Enterprise digital marketing orchestration platform serving ~500 dealerships across North America (*React, Next.js, Redux Toolkit, Amazon Cognito, Azure DevOps*).
* **Pampers (Procter & Gamble)**: Global multi-site content personalization and e-commerce platform (*React, Next.js, Uniform CMS, Contentful, SSR*).
* **PC Builder**: 100% solo-architected hardware configurator with real-time electrical/mechanical compatibility calculation engine (*Vue 3, Nuxt 3, Pinia, Supabase, PostgreSQL*).
* **Diveroid IoT Platform**: High-frequency underwater telemetry, resilient marine media chunking pipeline, and cloud analytics (*Node.js, Express, MySQL, AWS S3/RDS/EC2*).
* **JigsawML**: Interactive visual drag-and-drop workflow graph builder for machine learning pipelines with OpenAI integration (*React, React Flow, TypeScript, Tailwind CSS*).
* **Gainium Algorithmic Trading**: High-frequency algorithmic trading dashboards, real-time WebSockets order books, and bot automation.

### ♿ 6. Adaptive Performance & Universal Accessibility
* **Device Tier Detection (`useDeviceCapability`)**: Dynamically benchmarks device capabilities and GPU profile to adjust Device Pixel Ratio (DPR), post-processing bloom, multi-sampling, and chromatic aberration.
* **2D Classic Resume Mode**: Instant toggle for a clean, semantic, accessible, screen-reader friendly 2D resume view for low-power devices, mobile, or quick hiring reviews.
* **Mobile Touch Controls**: Dual-stick on-screen virtual joystick and touch action buttons for complete mobile and tablet compatibility.

---

## 🎮 Controls & Navigation

### Desktop (Keyboard & Mouse)

| Action | Primary Key | Secondary Key |
| :--- | :---: | :---: |
| **Steer / Pitch / Yaw / Roll** | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | <kbd>▲</kbd> <kbd>◀</kbd> <kbd>▼</kbd> <kbd>▶</kbd> |
| **Ascend / Fly Up** | <kbd>Space</kbd> | <kbd>E</kbd> |
| **Descend / Fly Down** | <kbd>Ctrl</kbd> | <kbd>Q</kbd> / <kbd>C</kbd> |
| **Fire Lasers / Shoot** | <kbd>F</kbd> | <kbd>J</kbd> / Left Click |
| **Nitro Speed Boost** | <kbd>Shift</kbd> | — |
| **Reset Position / Respawn** | <kbd>R</kbd> | — |
| **Inspect 3D Objects** | **Left Click** on any 3D Monolith or Portal | — |

### Mobile & Tablet
* **Left Virtual Joystick**: Move forward, backward, strafe left, strafe right.
* **Right Virtual Joystick**: Rotate pitch and yaw.
* **Elevate / Descend Buttons**: Quick altitude adjustment.
* **Fire Button**: Blast active laser cannons.
* **Boost Button**: Engage afterburners.

---

## 🛠️ Tech Stack

```
threejs-portfolio/
 ├── 3D Engine & Graphics  ──>  Three.js (0.170), @react-three/fiber, @react-three/drei, @react-three/postprocessing
 ├── Physics & Effects     ──>  @react-three/rapier (Wasm Physics), Canvas Confetti, Howler.js Audio
 ├── Frontend Framework    ──>  React 18.3, Vite 6.0
 ├── Styling & UI          ──>  Tailwind CSS 3.4, Lucide React Icons, PostCSS, Autoprefixer
 ├── State Architecture    ──>  Zustand (Modular stores: UI, Game, Tour, Player)
 └── Tooling & Build       ──>  ESNext, PostCSS, Vite Chunk-Splitting
```

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (Version `18.0.0` or higher recommended)
* `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vishavgarg/threejs-portfolio.git
   cd threejs-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the 3D world!

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```bash
threejs-portfolio/
├── index.html                   # HTML entry point with meta tags & preloaded fonts
├── package.json                 # Project dependencies and build scripts
├── tailwind.config.js           # Tailwind styling configuration & custom theme
├── vite.config.js               # Vite build config & manual chunk splitting
├── src/
│   ├── App.jsx                  # Main 3D Canvas, post-processing stack & UI overlays
│   ├── main.jsx                 # React root DOM mounting point
│   ├── index.css                # Global CSS rules, custom scrollbars, animations
│   ├── components/
│   │   ├── games/               # Dedicated Arcade Mini-Games
│   │   │   ├── dogfight/        # Space Dogfight game engine & combat HUD
│   │   │   ├── platformer/      # Cyber island platformer jump course
│   │   │   ├── target-range/    # Target shooting gallery & laser projectile manager
│   │   │   └── warp-race/       # Warp Gate time-trial race engine & telemetry HUD
│   │   ├── ui/                  # Cyberpunk HUD & Interactive Modals
│   │   │   ├── AboutModal.jsx          # Developer bio, philosophy & technical highlights
│   │   │   ├── ClassicResume.jsx       # Semantic 2D accessible fallback resume
│   │   │   ├── ContactModal.jsx        # Direct contact form & communication channels
│   │   │   ├── ControlsModal.jsx       # Keybindings & flight controls reference
│   │   │   ├── ExperienceModal.jsx     # Career history & timeline details
│   │   │   ├── HangarModal.jsx         # Starship customizer & ship selector
│   │   │   ├── HUD.jsx                 # Open-world flight HUD, speedometer & compass
│   │   │   ├── LoadingScreen.jsx       # Interactive sci-fi loading overlay
│   │   │   ├── ProjectModal.jsx        # Deep-dive architectural project modal
│   │   │   ├── ProjectsGalleryModal.jsx# Complete portfolio index & filter grid
│   │   │   ├── SkillsModal.jsx         # Categorized skills matrix & mastery levels
│   │   │   ├── Toast.jsx               # Floating toast notifications
│   │   │   └── TourHUD.jsx             # Autopilot cinematic tour controller & captions
│   │   ├── vehicle/             # Flight Controller & Starship Models
│   │   │   ├── Drone.jsx               # Modular 3D ship mesh renderer
│   │   │   ├── DroneCamera.jsx         # Smooth trailing 3rd-person follow camera
│   │   │   ├── DroneController.jsx     # 6-DOF physics movement & input handler
│   │   │   ├── MobileControls.jsx      # On-screen dual virtual joysticks
│   │   │   ├── ShipModel.jsx           # Procedural starship geometry & thrusters
│   │   │   └── TourFlightController.jsx# Smooth spline interpolation autopilot
│   │   └── world/               # 3D Environment & World Assets
│   │       ├── CyberBridges.jsx        # Luminous neon architectural bridges
│   │       ├── DataStreams.jsx         # Cascading binary particle data waterfalls
│   │       ├── ExperienceRoad.jsx      # Chronological career roadmap path
│   │       ├── Lighting.jsx            # Dynamic sun, ambient & point lighting
│   │       ├── NameSculpture3D.jsx     # Holographic 3D developer name sculpture
│   │       ├── Planet.jsx              # Orbital sci-fi planet backdrop
│   │       ├── Skybox.jsx              # Procedural starfield & cosmic nebula
│   │       └── Terrain.jsx             # Procedural floating cyber archipelago
│   ├── data/                    # Dynamic Data Stores (Easily customizable)
│   │   ├── aboutData.js         # Developer biography, contact & education
│   │   ├── experienceData.js    # Work history, roles & career milestones
│   │   ├── projectsData.js      # Enterprise & solo project case studies
│   │   ├── shipData.js          # Starship classes, stats & thruster presets
│   │   └── skillsData.js        # Categorized technical competencies & ratings
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useDeviceCapability.js # Benchmark GPU profile & quality tier
│   │   └── useKeyboard.js       # Global keybinding listener & state map
│   └── store/                   # Zustand Global State Management
│       ├── gameStore.js         # Dogfight, race, targets & platformer state
│       ├── playerStore.js       # Active ship selection, thrusters, audio & stats
│       ├── tourStore.js         # Autopilot guided tour waypoints & playback
│       └── uiStore.js           # Modal visibility, HUD state, classic mode toggle
```

---

## 🎨 Customization Guide

This repository is built to be easily personalized for your own portfolio:

### 1. Update Personal & Contact Information
Edit [`src/data/aboutData.js`](./src/data/aboutData.js) to customize your name, title, summary, email, phone, location, and social profiles.

### 2. Add or Edit Projects
Edit [`src/data/projectsData.js`](./src/data/projectsData.js) to add your own projects. Each entry supports:
```javascript
{
  id: "your-project-id",
  title: "Project Name",
  client: "Client / Company",
  domain: "Industry Domain",
  role: "Your Role",
  badge: "Key Achievement Badge",
  scale: "Traffic / Scale Metrics",
  technologies: ["React", "TypeScript", "Node.js"],
  overview: "High-level summary...",
  problem: "The engineering challenge...",
  architecture: ["Key architectural decision 1", "Key architectural decision 2"],
  features: ["Feature 1", "Feature 2"],
  achievements: ["Metric 1", "Metric 2"],
  color: "#00f0ff"
}
```

### 3. Customize Skills & Experience
* Modify [`src/data/skillsData.js`](./src/data/skillsData.js) to adjust technical categories, skill levels, and icons.
* Modify [`src/data/experienceData.js`](./src/data/experienceData.js) to reflect your career timeline, companies, and accomplishments.

### 4. Configure Ships & Thrusters
Add or modify playable ships and color presets in [`src/data/shipData.js`](./src/data/shipData.js).

---

## ⚡ Performance Optimization

* **Smart Chunk Splitting**: Configured in `vite.config.js` to split `three`, `@react-three/fiber`, `@react-three/drei`, and `@react-three/rapier` into separate vendor bundles for fast initial load.
* **Selective Post-Processing**: Bloom mipmap blurring and chromatic aberration are dynamically enabled or disabled based on client hardware profiling (`useDeviceCapability`).
* **Instanced Geometry & Shared Materials**: Minimizes draw calls across islands, data streams, and target cubes.
* **Tone Mapping & Color Space**: Tuned ACES Filmic tone mapping for vibrant neon cyberpunk aesthetics without sacrificing 60+ FPS framerates.

---

## 📄 License

This project is open-source and available under the **[MIT License](./LICENSE)**.

---

## 👤 Author & Contact

**Vishav Garg**  
*Senior Frontend & Full Stack Engineer | Frontend Architect*

* 💼 **LinkedIn**: [linkedin.com/in/mrvishav](https://linkedin.com/in/mrvishav)
* 🐙 **GitHub**: [@vishavgarg](https://github.com/vishavgarg)
* 📧 **Email**: [vishavgarg96@gmail.com](mailto:vishavgarg96@gmail.com)
* 📍 **Location**: Bengaluru, India

---

<div align="center">
  <sub>Built with ❤️ and WebGL by Vishav Garg. Star ⭐ this repository if you find it inspiring!</sub>
</div>
