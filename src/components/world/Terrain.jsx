import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useUIStore } from '../../store/uiStore';
import { useGameStore } from '../../store/gameStore';
import { projectsData } from '../../data/projectsData';
import { ExperienceRoad } from './ExperienceRoad';
import { NameSculpture3D } from './NameSculpture3D';

export const Terrain = () => {
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const openProjectModal = useUIStore((s) => s.openProjectModal);
  const showToast = useUIStore((s) => s.showToast);
  const startDogfight = useGameStore((s) => s.startDogfight);
  const startWarpRace = useGameStore((s) => s.startWarpRace);

  const headlineProjects = projectsData.filter((p) => p.isHeadline);

  return (
    <group>
      {/* ============================================================ */}
      {/* 1. SPAWN / HUB ISLAND (Center: [0, 0, 0], Radius ~18) */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Main Hexagonal Island Base - Sleek Minimalist Dark Finish */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[18, 14, 4, 6]} />
          <meshStandardMaterial
            color="#090e1a"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* Floating Under-Island Geode */}
        <mesh position={[0, -5.5, 0]}>
          <coneGeometry args={[13, 7, 6]} />
          <meshStandardMaterial
            color="#050912"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Central Platform Surface with Minimalist Dark Concrete/Metal Grid */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[17.5, 64]} />
          <meshStandardMaterial
            color="#0d1527"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Subtle Outer Glowing Ring */}
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[16.8, 17.0, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
        </mesh>

        {/* ============================================================ */}
        {/* MINIMALIST 3D SOLID NAME TYPOGRAPHY: "V I S H A V   G A R G" */}
        {/* ============================================================ */}
        <NameSculpture3D />

        {/* 3D High-Tech Resume Terminal Landmark */}
        <group
          position={[9, 0, 7]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModal('about');
            showToast('Resume Terminal', 'Opening bio & resume options', 'success');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* Terminal Pedestal Base */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[1.1, 1.3, 0.8, 8]} />
            <meshStandardMaterial color="#0c182d" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Console Pillar */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[1.2, 1.5, 0.8]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Luminous Display Screen */}
          <mesh position={[0, 1.55, 0.42]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          <Text
            position={[0, 2.7, 0]}
            fontSize={0.32}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#0a0d14"
          >
            📄 RESUME KIOSK
          </Text>
          <Text
            position={[0, 2.3, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click to Open Bio]
          </Text>
        </group>

        {/* Career Timeline Road on Hub Island */}
        <ExperienceRoad />

        {/* 🛸 3D Space Dogfight Launch Bay */}
        <group
          position={[11, 0, -11]}
          onClick={(e) => {
            e.stopPropagation();
            startDogfight();
            showToast('🚀 DOGFIGHT LAUNCHED', 'Engage hostile data drones! Move mouse to steer & aim, click to fire.', 'info');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[2.2, 2.6, 0.4, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.8} wireframe />
          </mesh>
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.36}
            color="#ff007f"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#0a0d14"
          >
            ⚔️ SPACE DOGFIGHT
          </Text>
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click to Launch Game]
          </Text>
        </group>

        {/* 🚀 3D Starfleet Ship Hangar Pad */}
        <group
          position={[-9, 0, -8]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModal('hangar');
            showToast('Starfleet Hangar', 'Opened Ship Customizer & Fleet Bay', 'info');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* Hexagonal Landing Pad Platform */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[2.4, 2.8, 0.4, 6]} />
            <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Luminous Chevron Perimeter Ring */}
          <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 2.1, 6]} />
            <meshBasicMaterial color="#00f0ff" wireframe />
          </mesh>
          {/* Floating Holographic Mini Ship Icon */}
          <mesh position={[0, 1.2, 0]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#00f0ff" emissiveIntensity={2.0} />
          </mesh>
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.36}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#0a0d14"
          >
            🚀 STARFLEET HANGAR
          </Text>
          <Text
            position={[0, 2.05, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click to Customize Ship]
          </Text>
        </group>

        {/* ⚡ 3D Warp Gate Race Launch Bay */}
        <group
          position={[-11, 0, 11]}
          onClick={(e) => {
            e.stopPropagation();
            startWarpRace();
            showToast('⚡ WARP RACE LAUNCHED', 'Steer through glowing speed rings to unlock achievements!', 'info');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[2.2, 2.6, 0.4, 8]} />
            <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.8, 0.08, 12, 24]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.8} />
          </mesh>
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.36}
            color="#c084fc"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#0a0d14"
          >
            ⚡ WARP GATE RACE
          </Text>
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click to Launch Game]
          </Text>
        </group>

        {/* 3D Minimalist Wayfinding Signposts */}
        <Signpost position={[13, 0, -8]} text="PROJECTS GALLERY ➔" color="#00f0ff" />
        <Signpost position={[-13, 0, -12]} text="⮜ ABOUT & BIO" color="#ec4899" />
        <Signpost position={[0, 0, -16]} text="▲ SKILLS ARENA" color="#10b981" />
        <Signpost position={[0, 0, 16]} text="▼ CONTACT TOWER" color="#ff007f" />
      </group>

      {/* ============================================================ */}
      {/* 2. ABOUT ME ISLAND (West: [-45, 0, -20], Radius ~14) */}
      {/* ============================================================ */}
      <group position={[-45, 0, -20]}>
        {/* Island Base */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[14, 10, 4, 6]} />
          <meshStandardMaterial color="#180e29" roughness={0.8} />
        </mesh>
        <mesh position={[0, -5, 0]}>
          <coneGeometry args={[10, 6, 6]} />
          <meshStandardMaterial color="#0e071a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[13.5, 32]} />
          <meshStandardMaterial color="#23153c" roughness={0.5} />
        </mesh>

        {/* About 3D Study / Sanctuary Structure */}
        <group
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModal('about');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* Main Crystal Pavilion Base */}
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[3, 4.5, 6, 6]} />
            <meshStandardMaterial color="#4a0e4e" metalness={0.6} roughness={0.2} transparent opacity={0.85} />
          </mesh>

          {/* Glowing Pavilion Dome */}
          <mesh position={[0, 6.5, 0]}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1.5} />
          </mesh>

          {/* Surrounding Energy Pillars */}
          {[-3.5, 3.5].map((x) =>
            [-3.5, 3.5].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 2, z]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.8} />
              </mesh>
            ))
          )}

          {/* Floating Text Title */}
          <Text
            position={[0, 8.8, 0]}
            fontSize={0.95}
            color="#f472b6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#0a0d14"
          >
            ABOUT VISHAV
          </Text>
          <Text
            position={[0, 7.8, 0]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click to View Background & Bio]
          </Text>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 3. PROJECTS ARCHIPELAGO (East: [45, 0, -25]) */}
      {/* ============================================================ */}
      <group position={[45, 0, -25]}>
        {/* Main Central Hub Base */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[16, 12, 4, 6]} />
          <meshStandardMaterial color="#0c1e3d" roughness={0.8} />
        </mesh>
        <mesh position={[0, -5, 0]}>
          <coneGeometry args={[12, 6, 6]} />
          <meshStandardMaterial color="#061226" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[15.5, 32]} />
          <meshStandardMaterial color="#102a54" roughness={0.5} />
        </mesh>

        <Text
          position={[0, 7.5, 0]}
          fontSize={1.1}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#0a0d14"
        >
          ENTERPRISE PROJECTS
        </Text>
        <Text
          position={[0, 6.4, 0]}
          fontSize={0.35}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          [Click any 3D Portal to View Case Study]
        </Text>

        {/* 5 Project Portals arranged in a semi-circle */}
        {headlineProjects.map((proj, idx) => {
          const angle = (idx / (headlineProjects.length - 1)) * Math.PI * 0.9 - Math.PI * 0.45;
          const radius = 9.5;
          const px = Math.sin(angle) * radius;
          const pz = Math.cos(angle) * radius - 2;

          return (
            <group
              key={proj.id}
              position={[px, 0, pz]}
              onClick={(e) => {
                e.stopPropagation();
                openProjectModal(proj);
                showToast(proj.title, 'Opened architecture case study', 'info');
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
              onPointerOut={() => { document.body.style.cursor = 'auto'; }}
            >
              {/* Stepped Pedestal Base */}
              <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[1.8, 2.2, 0.8, 8]} />
                <meshStandardMaterial color="#0a192f" metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Outer Portal Arch Ring */}
              <mesh position={[0, 2.8, 0]}>
                <torusGeometry args={[1.6, 0.16, 16, 32]} />
                <meshStandardMaterial
                  color={proj.color}
                  emissive={proj.color}
                  emissiveIntensity={1.4}
                  metalness={0.9}
                />
              </mesh>

              {/* Inner Counter-Rotating Ring */}
              <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[1.3, 0.08, 12, 24]} />
                <meshBasicMaterial color="#ffffff" wireframe />
              </mesh>

              {/* Inner Portal Shimmer */}
              <mesh position={[0, 2.8, 0]}>
                <circleGeometry args={[1.4, 32]} />
                <meshBasicMaterial
                  color={proj.color}
                  transparent
                  opacity={0.35}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Project Title Text */}
              <Text
                position={[0, 5.2, 0]}
                fontSize={0.42}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#0a0d14"
              >
                {proj.title}
              </Text>
              <Text
                position={[0, 4.65, 0]}
                fontSize={0.25}
                color={proj.color}
                anchorX="center"
                anchorY="middle"
              >
                {proj.badge}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 4. SKILLS ARENA ISLAND (North: [0, 0, -70], Radius ~18) */}
      {/* ============================================================ */}
      <group position={[0, 0, -70]}>
        {/* Arena Island Base */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[20, 16, 4, 8]} />
          <meshStandardMaterial color="#06241b" roughness={0.8} />
        </mesh>
        <mesh position={[0, -5.5, 0]}>
          <coneGeometry args={[16, 7, 8]} />
          <meshStandardMaterial color="#03140e" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[19.5, 32]} />
          <meshStandardMaterial color="#0f382a" roughness={0.5} />
        </mesh>

        {/* Glowing Target Ring Lines */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6, 6.2, 32]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[12, 12.2, 32]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Skills Arena Title in 3D Space */}
        <Text
          position={[0, 8.8, 0]}
          fontSize={1.2}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#0a0d14"
        >
          ★ SKILLS TARGET RANGE ★
        </Text>
        <Text
          position={[0, 7.6, 0]}
          fontSize={0.4}
          color="#a7f3d0"
          anchorX="center"
          anchorY="middle"
        >
          [Press [F] or Tap Shoot to Blast Tech Targets & Reveal Skills]
        </Text>
      </group>

      {/* ============================================================ */}
      {/* 5. CONTACT RADIO TOWER ISLAND (South: [0, 0, 50], Radius ~14) */}
      {/* ============================================================ */}
      <group position={[0, 0, 50]}>
        {/* Island Base */}
        <mesh position={[0, -2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[14, 10, 4, 6]} />
          <meshStandardMaterial color="#2d0a1e" roughness={0.8} />
        </mesh>
        <mesh position={[0, -5.5, 0]}>
          <coneGeometry args={[10, 6, 6]} />
          <meshStandardMaterial color="#17040e" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[13.5, 32]} />
          <meshStandardMaterial color="#3d0e29" roughness={0.5} />
        </mesh>

        {/* High-Tech Radio Transmission Tower */}
        <group
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModal('contact');
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          {/* Base Lattice Structure */}
          <mesh position={[0, 5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 2.5, 10, 4]} />
            <meshStandardMaterial color="#ff007f" wireframe />
          </mesh>

          {/* Top Spire Antenna */}
          <mesh position={[0, 11, 0]}>
            <cylinderGeometry args={[0.08, 0.3, 4, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Beacon Orb */}
          <mesh position={[0, 13.2, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial
              color="#ff007f"
              emissive="#ff007f"
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* Radio Waves Rings */}
          <mesh position={[0, 13.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.7, 32]} />
            <meshBasicMaterial color="#ff007f" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 13.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.7, 32]} />
            <meshBasicMaterial color="#ff007f" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>

          <Text
            position={[0, 15.5, 0]}
            fontSize={0.95}
            color="#ff007f"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#0a0d14"
          >
            CONTACT & HIRE
          </Text>
          <Text
            position={[0, 14.5, 0]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            [Click Tower to Send Message]
          </Text>
        </group>
      </group>
    </group>
  );
};

// Reusable 3D Directional Signpost
const Signpost = ({ position, text, color }) => (
  <group position={position}>
    <mesh position={[0, 1, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
      <meshStandardMaterial color="#334155" metalness={0.8} />
    </mesh>
    <mesh position={[0, 1.8, 0]}>
      <boxGeometry args={[3.2, 0.6, 0.1]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
    <Text
      position={[0, 1.8, 0.06]}
      fontSize={0.22}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  </group>
);
