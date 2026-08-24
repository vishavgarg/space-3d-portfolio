import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../../store/gameStore';
import { useUIStore } from '../../../store/uiStore';
import { usePlayerStore } from '../../../store/playerStore';
import { soundEngine } from '../../../utils/soundEngine';

const droneSkillDrops = [
  { name: 'React 18 & Next.js 14', category: 'Frontend' },
  { name: 'Three.js & WebGL Shaders', category: '3D Graphics' },
  { name: 'TypeScript Architecture', category: 'Core Tech' },
  { name: 'State Management (Zustand & Redux)', category: 'Architecture' },
  { name: 'Performance & Bundle Optimization', category: 'Engineering' },
  { name: 'Tailwind CSS & Modern UI/UX', category: 'Styling' },
  { name: 'Cloud & Micro-frontends', category: 'Enterprise' },
  { name: 'Scalable REST & GraphQL APIs', category: 'Backend' }
];

const MAX_PLAYER_LASERS = 40;
const MAX_ENEMY_LASERS = 40;
const MAX_PARTICLES = 100;
const MAX_ENEMIES = 14;

// 🛸 Stylized 3D Player Fighter Ship
const PlayerFighterShip = ({ thrusterColor = '#00f0ff', isHit = false }) => {
  return (
    <group>
      {/* Central Fuselage & Nosecone */}
      <mesh position={[0, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.55, 2.4, 6]} />
        <meshStandardMaterial
          color={isHit ? '#ff3366' : '#0f172a'}
          metalness={0.9}
          roughness={0.2}
          emissive={isHit ? '#ff0044' : '#000000'}
          emissiveIntensity={isHit ? 2.0 : 0}
        />
      </mesh>

      {/* Sleek Cockpit Visor Canopy */}
      <mesh position={[0, 0.22, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial
          color={thrusterColor}
          emissive={thrusterColor}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Swept Forward Delta Wings */}
      <mesh position={[0, -0.05, 0.3]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.08, 1.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Wingtip Vertical Stabilizer Fins */}
      <mesh position={[-1.6, 0.25, 0.4]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.06, 0.5, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.6, 0.25, 0.4]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.06, 0.5, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Wingtip Weapon Cannons */}
      <mesh position={[-1.4, -0.02, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.4, -0.02, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Twin Engine Exhaust Nozzles */}
      <mesh position={[-0.4, 0, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.5, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.5, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Animated Afterburner Thruster Plumes */}
      <mesh position={[-0.4, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.16, 0.7, 12]} />
        <meshBasicMaterial color={thrusterColor} />
      </mesh>
      <mesh position={[0.4, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.16, 0.7, 12]} />
        <meshBasicMaterial color={thrusterColor} />
      </mesh>

      {/* Energy Shield Pulse Bubble on Hit */}
      {isHit && (
        <mesh>
          <sphereGeometry args={[1.9, 16, 16]} />
          <meshBasicMaterial color="#ff3366" wireframe transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};

// 🛸 Stylized 3D Enemy Spaceship Renderer with 5 Distinct Classes
const EnemySpaceshipMesh = ({ type, isHit, hp }) => {
  if (type === 'boss') {
    // Tier 5: Leviathan Dreadnought Flagship (Triple-hull battlecruiser)
    return (
      <group scale={[2.0, 2.0, 2.0]}>
        {/* Central Command Citadel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.0, 3.0, 6]} />
          <meshStandardMaterial
            color={isHit ? '#ffffff' : '#3b0764'}
            emissive={isHit ? '#ffffff' : '#7c3aed'}
            emissiveIntensity={1.4}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Heavy Armored Hull Sponsons */}
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[4.2, 0.25, 1.4]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Gold Trim Plating */}
        <mesh position={[0, 0.15, -0.4]}>
          <boxGeometry args={[2.0, 0.1, 0.8]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Quad Heavy Plasma Turrets */}
        {[-1.8, -0.9, 0.9, 1.8].map((tx, idx) => (
          <mesh key={idx} position={[tx, 0, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 1.5, 8]} />
            <meshBasicMaterial color="#ec4899" />
          </mesh>
        ))}
        {/* Command Bridge Visor */}
        <mesh position={[0, 0.45, -0.5]}>
          <boxGeometry args={[1.0, 0.3, 0.7]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        {/* Dual Heavy Plasma Engine Drives */}
        <mesh position={[-0.8, 0, 1.3]}>
          <cylinderGeometry args={[0.35, 0.4, 0.6, 12]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        <mesh position={[0.8, 0, 1.3]}>
          <cylinderGeometry args={[0.35, 0.4, 0.6, 12]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      </group>
    );
  }

  if (type === 'gunship') {
    // Tier 4: Cyber Gunship / Siege Destroyer (Hexagonal heavy armor)
    return (
      <group scale={[1.45, 1.45, 1.45]}>
        {/* Hexagonal Armor Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.9, 2.2, 6]} />
          <meshStandardMaterial
            color={isHit ? '#ffffff' : '#064e3b'}
            emissive={isHit ? '#ffffff' : '#10b981'}
            emissiveIntensity={1.3}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Dual Side Heavy Nacelles */}
        <mesh position={[-1.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.4, 1.6]} />
          <meshStandardMaterial color="#022c22" metalness={0.85} />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.4, 1.6]} />
          <meshStandardMaterial color="#022c22" metalness={0.85} />
        </mesh>
        {/* Forward Rotary Cannon Pods */}
        <mesh position={[-1.2, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[1.2, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.9, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.1, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        {/* Glowing Engine Core */}
        <mesh position={[0, 0, 1.1]}>
          <sphereGeometry args={[0.3, 10, 10]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    );
  }

  if (type === 'phantom') {
    // Tier 3: Stealth Phantom / Evasive Interceptor (Forward-swept razor wings)
    return (
      <group scale={[1.1, 1.1, 1.1]}>
        {/* Needle-Sharp Fuselage */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.45, 2.2, 4]} />
          <meshStandardMaterial
            color={isHit ? '#ffffff' : '#083344'}
            emissive={isHit ? '#ffffff' : '#06b6d4'}
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Forward-Swept Razor Wings */}
        <mesh position={[-0.9, 0, -0.3]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[1.6, 0.06, 0.7]} />
          <meshStandardMaterial color="#0e7490" metalness={0.9} />
        </mesh>
        <mesh position={[0.9, 0, -0.3]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[1.6, 0.06, 0.7]} />
          <meshStandardMaterial color="#0e7490" metalness={0.9} />
        </mesh>
        {/* Electric Cyan Wingtip Crystals */}
        <mesh position={[-1.7, 0, -0.6]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <mesh position={[1.7, 0, -0.6]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        {/* Ion Exhaust Plume */}
        <mesh position={[0, 0, 1.0]}>
          <coneGeometry args={[0.15, 0.5, 8]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
      </group>
    );
  }

  if (type === 'raider') {
    // Tier 2: Assault Raider (Twin-boom fighter)
    return (
      <group scale={[1.2, 1.2, 1.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.6, 2.0, 5]} />
          <meshStandardMaterial
            color={isHit ? '#ffffff' : '#7c2d12'}
            emissive={isHit ? '#ffffff' : '#ea580c'}
            emissiveIntensity={1.3}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[2.4, 0.12, 0.9]} />
          <meshStandardMaterial color="#431407" metalness={0.8} />
        </mesh>
        <mesh position={[-1.1, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 1.0, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        <mesh position={[1.1, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 1.0, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, 0, 0.9]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      </group>
    );
  }

  // Tier 1: Scout Interceptor (Sharp delta-wing drone)
  return (
    <group scale={[0.95, 0.95, 0.95]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.5, 1.8, 4]} />
        <meshStandardMaterial
          color={isHit ? '#ffffff' : '#881337'}
          emissive={isHit ? '#ffffff' : '#e11d48'}
          emissiveIntensity={1.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.7]} />
        <meshStandardMaterial color="#4c0519" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.15, -0.2]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>
      <mesh position={[0, 0, 0.8]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>
    </group>
  );
};

export const DogfightGame = () => {
  const dogfightActive = useGameStore((s) => s.dogfightActive);
  const dogfightGameOver = useGameStore((s) => s.dogfightGameOver);
  const dogfightWave = useGameStore((s) => s.dogfightWave);
  const dogfightKill = useGameStore((s) => s.dogfightKill);
  const takeDogfightDamage = useGameStore((s) => s.takeDogfightDamage);
  const triggerSectorTransition = useGameStore((s) => s.triggerSectorTransition);
  const dogfightIsWarping = useGameStore((s) => s.dogfightIsWarping);

  const thrusterColor = usePlayerStore((s) => s.thrusterColor || '#00f0ff');
  const showToast = useUIStore((s) => s.showToast);

  const { camera } = useThree();

  // Ship & Flight State
  const shipRef = useRef();
  const muzzleFlashRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const forwardZ = useRef(0);
  const currentFlightSpeed = useRef(18);
  const screenShake = useRef(0);
  const lastShotTime = useRef(0);
  const playerHitTime = useRef(0);
  const [playerIsHit, setPlayerIsHit] = useState(false);

  // Instanced Meshes & Dummies
  const playerLaserMeshRef = useRef();
  const enemyLaserMeshRef = useRef();
  const particleMeshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-allocated flat buffers for zero GC
  const playerLasers = useRef(
    Array.from({ length: MAX_PLAYER_LASERS }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      vz: -150
    }))
  );

  const enemyLasers = useRef(
    Array.from({ length: MAX_ENEMY_LASERS }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      vz: 65,
      vx: 0,
      color: '#ff007f'
    }))
  );

  const particles = useRef(
    Array.from({ length: MAX_PARTICLES }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0,
      maxLife: 0.6,
      color: '#ff007f'
    }))
  );

  // Active enemies list in plain JS state
  const enemies = useRef(
    Array.from({ length: MAX_ENEMIES }, () => ({
      active: false,
      id: '',
      type: 'scout', // 'scout' | 'raider' | 'phantom' | 'gunship' | 'boss'
      x: 0,
      y: 0,
      z: 0,
      baseX: 0,
      baseY: 3,
      hp: 1,
      maxHp: 1,
      hitTime: 0,
      lastFired: 0,
      fireRate: 4500,
      strafeSpeed: 1.2
    }))
  );

  // React state trigger for rendering enemy models
  const [enemyRenderList, setEnemyRenderList] = useState([]);
  const isHoldingFire = useRef(false);

  // Progressive multi-tier squadron generator across sectors
  const spawnWaveEnemies = (wave) => {
    // Reset all enemies
    enemies.current.forEach((e) => (e.active = false));

    // Determine squad archetype composition per sector
    const squadPlan = [];

    if (wave === 1) {
      // Sector 1: Recon Patrol (5x Scouts)
      for (let i = 0; i < 5; i++) squadPlan.push('scout');
    } else if (wave === 2) {
      // Sector 2: Raider Vanguard (3x Scouts + 3x Assault Raiders)
      squadPlan.push('raider', 'scout', 'raider', 'scout', 'raider', 'scout');
    } else if (wave === 3) {
      // Sector 3: Phantom Incursion (2x Scouts + 3x Raiders + 2x Stealth Phantoms)
      squadPlan.push('phantom', 'raider', 'phantom', 'raider', 'scout', 'raider', 'scout');
    } else if (wave === 4) {
      // Sector 4: Heavy Siege Fleet (2x Phantoms + 3x Raiders + 3x Cyber Gunships)
      squadPlan.push('gunship', 'phantom', 'gunship', 'raider', 'gunship', 'phantom', 'raider', 'raider');
    } else if (wave === 5) {
      // Sector 5: Armada Flagship Boss Encounter!
      squadPlan.push('boss', 'gunship', 'gunship', 'phantom', 'phantom', 'raider', 'raider', 'raider');
    } else {
      // Sector 6+: Elite Chaos Fleet
      squadPlan.push('boss', 'gunship', 'gunship', 'gunship', 'phantom', 'phantom', 'phantom', 'raider', 'raider', 'raider');
    }

    const count = Math.min(squadPlan.length, MAX_ENEMIES);

    for (let i = 0; i < count; i++) {
      const e = enemies.current[i];
      if (!e) break;
      e.active = true;
      e.id = `enemy-${wave}-${i}`;
      e.type = squadPlan[i] || 'scout';

      if (e.type === 'boss') {
        e.hp = 6;
        e.maxHp = 6;
        e.fireRate = 2200;
        e.strafeSpeed = 1.0;
      } else if (e.type === 'gunship') {
        e.hp = 4;
        e.maxHp = 4;
        e.fireRate = 2800;
        e.strafeSpeed = 1.3;
      } else if (e.type === 'phantom') {
        e.hp = 2;
        e.maxHp = 2;
        e.fireRate = 2400;
        e.strafeSpeed = 2.2;
      } else if (e.type === 'raider') {
        e.hp = 2;
        e.maxHp = 2;
        e.fireRate = 3400;
        e.strafeSpeed = 1.5;
      } else {
        // scout
        e.hp = 1;
        e.maxHp = 1;
        e.fireRate = 4600;
        e.strafeSpeed = 1.1;
      }

      e.x = (Math.random() - 0.5) * (e.type === 'boss' ? 6 : 18);
      e.baseX = e.x;
      e.baseY = (Math.random() - 0.5) * 5 + 3.2;
      e.y = e.baseY;
      // Spaced cleanly ahead: 100+ units away with 18 units staggered depth
      e.z = forwardZ.current - 100 - i * 18;
      e.hitTime = 0;
      e.lastFired = Date.now() + Math.random() * 2000 + 1500;
    }
  };

  // Fire Player Laser
  const fireLaser = () => {
    if (!shipRef.current || dogfightGameOver) return;
    const now = performance.now();
    if (now - lastShotTime.current < 130) return; // 130ms rapid-fire throttle
    lastShotTime.current = now;

    soundEngine.playShoot();

    if (muzzleFlashRef.current) {
      muzzleFlashRef.current.intensity = 2.8;
    }

    const shipX = shipRef.current.position.x;
    const shipY = shipRef.current.position.y;
    const shipZ = shipRef.current.position.z;

    // Dual wing plasma cannons
    const slotL = playerLasers.current.find((l) => !l.active);
    if (slotL) {
      slotL.active = true;
      slotL.x = shipX - 1.4;
      slotL.y = shipY - 0.02;
      slotL.z = shipZ - 0.5;
    }

    const slotR = playerLasers.current.find((l) => !l.active);
    if (slotR) {
      slotR.active = true;
      slotR.x = shipX + 1.4;
      slotR.y = shipY - 0.02;
      slotR.z = shipZ - 0.5;
    }
  };

  // Trigger Particle Explosion
  const triggerExplosion = (x, y, z, type = 'scout') => {
    soundEngine.playExplosion();
    screenShake.current = type === 'boss' ? 0.5 : type === 'gunship' ? 0.35 : type === 'phantom' ? 0.28 : 0.2;

    const count = type === 'boss' ? 36 : type === 'gunship' ? 24 : type === 'phantom' ? 18 : 12;
    for (let i = 0; i < count; i++) {
      const p = particles.current.find((part) => !part.active);
      if (!p) break;
      p.active = true;
      p.x = x;
      p.y = y;
      p.z = z;
      p.vx = (Math.random() - 0.5) * (type === 'boss' ? 22 : 15);
      p.vy = (Math.random() - 0.5) * (type === 'boss' ? 22 : 15);
      p.vz = (Math.random() - 0.5) * (type === 'boss' ? 22 : 15);
      p.life = 0.55;
      p.maxLife = 0.55;
      p.color =
        type === 'boss'
          ? '#a855f7'
          : type === 'gunship'
          ? '#10b981'
          : type === 'phantom'
          ? '#06b6d4'
          : type === 'raider'
          ? '#f97316'
          : '#ff007f';
    }
  };

  // Setup input listeners & FIX initial camera direction bug
  useEffect(() => {
    if (!dogfightActive) return;

    // Reset camera orientation and position looking down -Z
    camera.position.set(0, 3, 0);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(0, 2.5, -50);
    forwardZ.current = 0;

    spawnWaveEnemies(dogfightWave);

    const updatePointerPos = (clientX, clientY) => {
      mousePos.current.x = (clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.target.closest('button')) return;
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
      isHoldingFire.current = true;
      fireLaser();
    };

    const handleTouchEnd = () => {
      isHoldingFire.current = false;
    };

    const handlePointerDown = (e) => {
      if (e.target.closest('button')) return;
      updatePointerPos(e.clientX, e.clientY);
      isHoldingFire.current = true;
      fireLaser();
    };

    const handlePointerUp = () => {
      isHoldingFire.current = false;
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'KeyF') {
        isHoldingFire.current = true;
        fireLaser();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.code === 'KeyF') {
        isHoldingFire.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dogfightActive, dogfightWave, camera]);

  // Per-Frame Loop
  useFrame((state, delta) => {
    if (!dogfightActive || dogfightGameOver) return;

    // Smooth, cinematic flight speed (with hyperdrive boost during sector warp)
    const baseFlightSpeed = 16 + Math.min(dogfightWave * 1.5, 9);
    const targetFlightSpeed = dogfightIsWarping ? 48 : baseFlightSpeed;
    currentFlightSpeed.current = THREE.MathUtils.lerp(currentFlightSpeed.current, targetFlightSpeed, delta * 3.5);
    forwardZ.current -= currentFlightSpeed.current * delta;

    // Auto-fire while holding button (disabled during warp)
    if (isHoldingFire.current && !dogfightIsWarping) {
      fireLaser();
    }

    // 1. Player Ship Position & Agile Banking
    if (shipRef.current) {
      const targetX = mousePos.current.x * (dogfightIsWarping ? 6 : 13);
      const targetY = mousePos.current.y * (dogfightIsWarping ? 4 : 7.5) + 2.5;
      const targetZ = forwardZ.current - (dogfightIsWarping ? 14 : 12);

      shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, targetX, delta * 9);
      shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, targetY, delta * 9);
      shipRef.current.position.z = targetZ;

      const rollTarget = -mousePos.current.x * (dogfightIsWarping ? 0.3 : 0.75);
      const pitchTarget = mousePos.current.y * (dogfightIsWarping ? 0.15 : 0.38);
      shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, rollTarget, delta * 7);
      shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, pitchTarget, delta * 7);

      // Camera follow with warp pullback effect
      const targetCamZ = forwardZ.current + (dogfightIsWarping ? 2.5 : 0);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, shipRef.current.position.x * 0.45, delta * 5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, shipRef.current.position.y * 0.45 + (dogfightIsWarping ? 3.6 : 3.0), delta * 5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 4);

      if (screenShake.current > 0) {
        camera.position.x += (Math.random() - 0.5) * screenShake.current;
        camera.position.y += (Math.random() - 0.5) * screenShake.current;
        screenShake.current = Math.max(0, screenShake.current - delta * 1.6);
      }

      if (muzzleFlashRef.current && muzzleFlashRef.current.intensity > 0) {
        muzzleFlashRef.current.intensity = THREE.MathUtils.lerp(muzzleFlashRef.current.intensity, 0, delta * 18);
      }

      // Check hit flash duration
      if (playerHitTime.current > 0 && performance.now() - playerHitTime.current > 350) {
        playerHitTime.current = 0;
        setPlayerIsHit(false);
      }
    }

    // 2. Update Player Lasers (InstancedMesh)
    if (playerLaserMeshRef.current) {
      for (let i = 0; i < MAX_PLAYER_LASERS; i++) {
        const l = playerLasers.current[i];
        if (l.active) {
          l.z += l.vz * delta;

          if (l.z < forwardZ.current - 140) {
            l.active = false;
            dummy.position.set(0, -9999, 0);
            dummy.scale.set(0, 0, 0);
          } else {
            dummy.position.set(l.x, l.y, l.z);
            dummy.scale.set(1, 1, 1);
          }
        } else {
          dummy.position.set(0, -9999, 0);
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        playerLaserMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      playerLaserMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 3. Update Enemy Lasers & Check Player Collisions (InstancedMesh)
    const now = Date.now();
    const shipPos = shipRef.current ? shipRef.current.position : new THREE.Vector3(0, 2, forwardZ.current - 12);

    if (enemyLaserMeshRef.current) {
      for (let i = 0; i < MAX_ENEMY_LASERS; i++) {
        const el = enemyLasers.current[i];
        if (el.active) {
          // If warping, purge old enemy lasers
          if (dogfightIsWarping) {
            el.active = false;
            dummy.position.set(0, -9999, 0);
            dummy.scale.set(0, 0, 0);
          } else {
            el.z += el.vz * delta;
            if (el.vx) el.x += el.vx * delta;

            // Check if enemy laser hits the player ship
            const dx = el.x - shipPos.x;
            const dy = el.y - shipPos.y;
            const dz = el.z - shipPos.z;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 2.2) {
              // Player hit by enemy laser (tangible 18-25 HP damage)
              el.active = false;
              dummy.position.set(0, -9999, 0);
              dummy.scale.set(0, 0, 0);
              const laserDmg = 18;
              takeDogfightDamage(laserDmg);
              playerHitTime.current = performance.now();
              setPlayerIsHit(true);
              screenShake.current = 0.35;
            } else if (el.z > forwardZ.current + 10) {
              el.active = false;
              dummy.position.set(0, -9999, 0);
              dummy.scale.set(0, 0, 0);
            } else {
              dummy.position.set(el.x, el.y, el.z);
              dummy.scale.set(1, 1, 1);
            }
          }
        } else {
          dummy.position.set(0, -9999, 0);
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        enemyLaserMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      enemyLaserMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 4. Update Enemy Flight AI & Combat
    let activeEnemiesCount = 0;
    const activeList = [];

    // If not warping, update and process enemies
    if (!dogfightIsWarping) {
      for (let i = 0; i < MAX_ENEMIES; i++) {
        const e = enemies.current[i];
        if (e.active) {
          // Dynamic motion styles per enemy archetype
          if (e.type === 'phantom') {
            // Corkscrew evasive trajectory
            const corkPhase = state.clock.elapsedTime * e.strafeSpeed + i * 1.2;
            e.x = e.baseX + Math.sin(corkPhase) * 3.8;
            e.y = e.baseY + Math.cos(corkPhase * 1.5) * 2.2;
            e.z += (baseFlightSpeed * 0.22) * delta;
          } else if (e.type === 'gunship') {
            // Heavy steady sweeping advance
            const sweepPhase = state.clock.elapsedTime * e.strafeSpeed + i * 0.5;
            e.x = e.baseX + Math.sin(sweepPhase) * 2.2;
            e.y = e.baseY + Math.cos(state.clock.elapsedTime * 0.8 + i) * 0.8;
            e.z += (baseFlightSpeed * 0.14) * delta;
          } else if (e.type === 'boss') {
            // Command flagship presence
            const bossPhase = state.clock.elapsedTime * e.strafeSpeed;
            e.x = e.baseX + Math.sin(bossPhase) * 3.0;
            e.y = e.baseY + Math.cos(bossPhase * 0.6) * 1.2;
            e.z += (baseFlightSpeed * 0.12) * delta;
          } else {
            // Standard harmonic strafe for Scout / Raider
            const strafePhase = state.clock.elapsedTime * e.strafeSpeed + i * 0.8;
            e.x = e.baseX + Math.sin(strafePhase) * 2.8;
            e.y += Math.cos(state.clock.elapsedTime * 1.2 + i) * delta * 1.2;
            e.z += (baseFlightSpeed * 0.16) * delta;
          }

          // Enemy AI Fire by Class
          if (now - e.lastFired > e.fireRate && e.z < forwardZ.current - 22) {
            soundEngine.playEnemyFire();

            if (e.type === 'boss') {
              // Quad Heavy Spread Volley for Boss
              [-1.4, -0.5, 0.5, 1.4].forEach((spreadX) => {
                const elSlot = enemyLasers.current.find((laser) => !laser.active);
                if (elSlot) {
                  elSlot.active = true;
                  elSlot.x = e.x + spreadX;
                  elSlot.y = e.y;
                  elSlot.z = e.z + 1.4;
                  elSlot.vz = 36;
                  elSlot.vx = (spreadX / 6) * 5;
                }
              });
            } else if (e.type === 'gunship') {
              // Triple Heavy Spread for Gunship
              [-1.0, 0, 1.0].forEach((spreadX) => {
                const elSlot = enemyLasers.current.find((laser) => !laser.active);
                if (elSlot) {
                  elSlot.active = true;
                  elSlot.x = e.x + spreadX;
                  elSlot.y = e.y;
                  elSlot.z = e.z + 1.2;
                  elSlot.vz = 34;
                  elSlot.vx = (spreadX / 6) * 4;
                }
              });
            } else if (e.type === 'phantom') {
              // Rapid Twin Pulse for Stealth Phantom
              [-0.6, 0.6].forEach((spreadX) => {
                const elSlot = enemyLasers.current.find((laser) => !laser.active);
                if (elSlot) {
                  elSlot.active = true;
                  elSlot.x = e.x + spreadX;
                  elSlot.y = e.y;
                  elSlot.z = e.z + 1.0;
                  elSlot.vz = 40;
                  elSlot.vx = 0;
                }
              });
            } else if (e.type === 'raider') {
              // Twin Burst for Raider
              const elSlot = enemyLasers.current.find((laser) => !laser.active);
              if (elSlot) {
                elSlot.active = true;
                elSlot.x = e.x;
                elSlot.y = e.y;
                elSlot.z = e.z + 1.0;
                elSlot.vz = 32;
                elSlot.vx = 0;
              }
            } else {
              // Single gentle shot for Scout
              const elSlot = enemyLasers.current.find((laser) => !laser.active);
              if (elSlot) {
                elSlot.active = true;
                elSlot.x = e.x;
                elSlot.y = e.y;
                elSlot.z = e.z + 0.8;
                elSlot.vz = 30;
                elSlot.vx = 0;
              }
            }
            e.lastFired = now + Math.random() * 800;
          }

          // Check Player Laser Collisions against this enemy
          for (let pIdx = 0; pIdx < MAX_PLAYER_LASERS; pIdx++) {
            const pl = playerLasers.current[pIdx];
            if (!pl.active) continue;

            const dx = pl.x - e.x;
            const dy = pl.y - e.y;
            const dz = pl.z - e.z;
            const distSq = dx * dx + dy * dy + dz * dz;

            // Hit detection radius by archetype scale
            const hitRadius =
              e.type === 'boss'
                ? 9.0
                : e.type === 'gunship'
                ? 6.8
                : e.type === 'phantom'
                ? 4.8
                : e.type === 'raider'
                ? 5.2
                : 4.2;

            if (distSq < hitRadius) {
              pl.active = false;
              e.hp -= 1;
              e.hitTime = performance.now();

              if (e.hp <= 0) {
                e.active = false;
                triggerExplosion(e.x, e.y, e.z, e.type);

                const pts =
                  e.type === 'boss'
                    ? 1000
                    : e.type === 'gunship'
                    ? 500
                    : e.type === 'phantom'
                    ? 350
                    : e.type === 'raider'
                    ? 250
                    : 150;
                dogfightKill(pts);

                const drop = droneSkillDrops[Math.floor(Math.random() * droneSkillDrops.length)];
                showToast(`🎯 ${e.type.toUpperCase()} Defeated! +${pts} PTS`, `Unlocked Tech: ${drop.name}`, 'success');
                break;
              } else {
                soundEngine.playHit();
              }
            }
          }

          // Check Player-Enemy Collision (Ramming damage: 25-50 HP)
          const ramDx = e.x - shipPos.x;
          const ramDy = e.y - shipPos.y;
          const ramDz = e.z - shipPos.z;
          const ramDistSq = ramDx * ramDx + ramDy * ramDy + ramDz * ramDz;

          if (e.active && ramDistSq < 2.8) {
            e.active = false;
            triggerExplosion(e.x, e.y, e.z, e.type);
            const ramDmg = e.type === 'boss' ? 50 : e.type === 'gunship' ? 35 : 25;
            takeDogfightDamage(ramDmg);
            showToast(`💥 Direct Hull Collision!`, `-${ramDmg}% Shield from ${e.type.toUpperCase()}`, 'error');
            playerHitTime.current = performance.now();
            setPlayerIsHit(true);
            screenShake.current = 0.5;
          }

          // Slipped Past Perimeter (Escaped enemy penalty: 15-50 HP!)
          if (e.z > forwardZ.current + 6) {
            e.active = false;
            const breachDmg = e.type === 'boss' ? 50 : e.type === 'gunship' ? 30 : e.type === 'phantom' || e.type === 'raider' ? 20 : 15;
            takeDogfightDamage(breachDmg);
            showToast(`⚠️ Sector Defense Breached!`, `-${breachDmg}% Shield from escaped ${e.type.toUpperCase()}`, 'error');
          } else if (e.active) {
            activeEnemiesCount++;
            activeList.push({
              id: e.id,
              type: e.type,
              x: e.x,
              y: e.y,
              z: e.z,
              hp: e.hp,
              isHit: e.hitTime > 0 && performance.now() - e.hitTime < 180
            });
          }
        }
      }
    }

    setEnemyRenderList(activeList);

    // Wave cleared check -> initiate smooth hyperdrive tactical transition!
    if (activeEnemiesCount === 0 && !dogfightIsWarping) {
      triggerSectorTransition(dogfightWave + 1);
    }

    // 5. Update Explosion Particles
    if (particleMeshRef.current) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles.current[i];
        if (p.active) {
          p.life -= delta;
          if (p.life <= 0) {
            p.active = false;
            dummy.position.set(0, -9999, 0);
            dummy.scale.set(0, 0, 0);
          } else {
            p.x += p.vx * delta;
            p.y += p.vy * delta;
            p.z += p.vz * delta;

            const scale = (p.life / p.maxLife) * 0.32;
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(scale, scale, scale);
          }
        } else {
          dummy.position.set(0, -9999, 0);
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        particleMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      particleMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!dogfightActive) return null;

  return (
    <group>
      {/* 3D Player Fighter Ship */}
      <group ref={shipRef} position={[0, 2, -12]}>
        <PlayerFighterShip thrusterColor={thrusterColor} isHit={playerIsHit} />
        <pointLight
          ref={muzzleFlashRef}
          position={[0, 0, -1.8]}
          color={thrusterColor}
          intensity={0}
          distance={14}
        />
      </group>

      {/* 3D Enemy Spaceships */}
      {enemyRenderList.map((e) => (
        <group key={e.id} position={[e.x, e.y, e.z]}>
          <EnemySpaceshipMesh type={e.type} isHit={e.isHit} hp={e.hp} />
        </group>
      ))}

      {/* Instanced Player Lasers */}
      <instancedMesh
        ref={playerLaserMeshRef}
        args={[undefined, undefined, MAX_PLAYER_LASERS]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.08, 0.08, 2.6, 8]} />
        <meshBasicMaterial color={thrusterColor} />
      </instancedMesh>

      {/* Instanced Enemy Plasma Bolts (Red/Magenta) */}
      <instancedMesh
        ref={enemyLaserMeshRef}
        args={[undefined, undefined, MAX_ENEMY_LASERS]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#ff0055" />
      </instancedMesh>

      {/* Instanced Explosion Particles */}
      <instancedMesh
        ref={particleMeshRef}
        args={[undefined, undefined, MAX_PARTICLES]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#ff3366" transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
};
