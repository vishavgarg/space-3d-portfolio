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

// 🛸 Stylized 3D Enemy Spaceship Renderer
const EnemySpaceshipMesh = ({ type, isHit, hp }) => {
  if (type === 'boss') {
    // Tier 3: Dreadnought Flagship
    return (
      <group scale={[1.7, 1.7, 1.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.9, 2.6, 6]} />
          <meshStandardMaterial
            color={isHit ? '#ffffff' : '#4c1d95'}
            emissive={isHit ? '#ffffff' : '#7c3aed'}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Armored Outrigger Wings */}
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[3.6, 0.2, 1.2]} />
          <meshStandardMaterial color="#2e1065" metalness={0.8} />
        </mesh>
        {/* Quad Heavy Laser Cannons */}
        <mesh position={[-1.6, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.4, 8]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        <mesh position={[1.6, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.4, 8]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        {/* Glowing Command Visor */}
        <mesh position={[0, 0.4, -0.4]}>
          <boxGeometry args={[0.8, 0.25, 0.6]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
        {/* Engine Glow Core */}
        <mesh position={[0, 0, 1.1]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshBasicMaterial color="#ec4899" />
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
  const setDogfightWave = useGameStore((s) => s.setDogfightWave);

  const thrusterColor = usePlayerStore((s) => s.thrusterColor || '#00f0ff');
  const showToast = useUIStore((s) => s.showToast);

  const { camera } = useThree();

  // Ship & Flight State
  const shipRef = useRef();
  const muzzleFlashRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const forwardZ = useRef(0);
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
      type: 'scout', // 'scout' | 'raider' | 'boss'
      x: 0,
      y: 0,
      z: 0,
      baseX: 0,
      hp: 1,
      maxHp: 1,
      hitTime: 0,
      lastFired: 0,
      fireRate: 3000,
      strafeSpeed: 2.5
    }))
  );

  // React state trigger for rendering enemy models
  const [enemyRenderList, setEnemyRenderList] = useState([]);

  // Spawn Enemies when wave changes
  const spawnWaveEnemies = (wave) => {
    // Reset all enemies
    enemies.current.forEach((e) => (e.active = false));

    // Sector difficulty scaling
    let count = 4;
    if (wave === 2) count = 6;
    else if (wave === 3) count = 8;
    else if (wave >= 4) count = Math.min(10 + (wave - 4), MAX_ENEMIES);

    for (let i = 0; i < count; i++) {
      const e = enemies.current[i];
      if (!e) break;
      e.active = true;
      e.id = `enemy-${wave}-${i}`;

      // Progressive Tier Archetypes
      if (wave >= 3 && i === 0) {
        e.type = 'boss';
        e.hp = 6;
        e.maxHp = 6;
        e.fireRate = 1600;
        e.strafeSpeed = 1.8;
      } else if (wave >= 2 && i % 2 === 1) {
        e.type = 'raider';
        e.hp = 2;
        e.maxHp = 2;
        e.fireRate = 2200;
        e.strafeSpeed = 3.2;
      } else {
        e.type = 'scout';
        e.hp = 1;
        e.maxHp = 1;
        e.fireRate = 3200;
        e.strafeSpeed = 2.4;
      }

      e.x = (Math.random() - 0.5) * 20;
      e.baseX = e.x;
      e.y = (Math.random() - 0.5) * 8 + 3;
      e.z = forwardZ.current - 65 - i * 14;
      e.hitTime = 0;
      e.lastFired = Date.now() + Math.random() * 2000 + 1000;
    }
  };

  // Fire Player Laser
  const fireLaser = () => {
    if (!shipRef.current || dogfightGameOver) return;
    const now = performance.now();
    if (now - lastShotTime.current < 110) return; // Fast responsive throttle
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
    screenShake.current = type === 'boss' ? 0.5 : type === 'raider' ? 0.35 : 0.25;

    const count = type === 'boss' ? 30 : type === 'raider' ? 18 : 12;
    for (let i = 0; i < count; i++) {
      const p = particles.current.find((part) => !part.active);
      if (!p) break;
      p.active = true;
      p.x = x;
      p.y = y;
      p.z = z;
      p.vx = (Math.random() - 0.5) * (type === 'boss' ? 22 : 16);
      p.vy = (Math.random() - 0.5) * (type === 'boss' ? 22 : 16);
      p.vz = (Math.random() - 0.5) * (type === 'boss' ? 22 : 16);
      p.life = 0.55;
      p.maxLife = 0.55;
      p.color = type === 'boss' ? '#a855f7' : type === 'raider' ? '#f97316' : '#ff007f';
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
      fireLaser();
    };

    const handlePointerDown = (e) => {
      if (e.target.closest('button')) return;
      updatePointerPos(e.clientX, e.clientY);
      fireLaser();
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'KeyF') {
        fireLaser();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dogfightActive, dogfightWave, camera]);

  // Per-Frame Loop
  useFrame((state, delta) => {
    if (!dogfightActive || dogfightGameOver) return;

    const baseFlightSpeed = 28 + Math.min(dogfightWave * 2, 14);
    forwardZ.current -= baseFlightSpeed * delta;

    // 1. Player Ship Position & Agile Banking
    if (shipRef.current) {
      const targetX = mousePos.current.x * 13;
      const targetY = mousePos.current.y * 7.5 + 2.5;
      const targetZ = forwardZ.current - 12;

      shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, targetX, delta * 9);
      shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, targetY, delta * 9);
      shipRef.current.position.z = targetZ;

      const rollTarget = -mousePos.current.x * 0.75;
      const pitchTarget = mousePos.current.y * 0.38;
      shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, rollTarget, delta * 7);
      shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, pitchTarget, delta * 7);

      // Camera follow with screen shake
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, shipRef.current.position.x * 0.45, delta * 5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, shipRef.current.position.y * 0.45 + 3.0, delta * 5);
      camera.position.z = forwardZ.current;

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

          if (l.z < forwardZ.current - 120) {
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
          el.z += el.vz * delta;
          if (el.vx) el.x += el.vx * delta;

          // Check if enemy laser hits the player ship
          const dx = el.x - shipPos.x;
          const dy = el.y - shipPos.y;
          const dz = el.z - shipPos.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 2.4) {
            // Player hit by enemy laser!
            el.active = false;
            dummy.position.set(0, -9999, 0);
            dummy.scale.set(0, 0, 0);
            takeDogfightDamage(15);
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

    for (let i = 0; i < MAX_ENEMIES; i++) {
      const e = enemies.current[i];
      if (e.active) {
        // Evasive harmonic flight patterns
        const strafePhase = state.clock.elapsedTime * e.strafeSpeed + i;
        e.x = e.baseX + Math.sin(strafePhase) * 4.5;
        e.y += Math.cos(state.clock.elapsedTime * 1.8 + i) * delta * 2;
        e.z += (baseFlightSpeed * 0.38) * delta;

        // Enemy AI Fire toward player position
        if (now - e.lastFired > e.fireRate && e.z < forwardZ.current - 16) {
          soundEngine.playEnemyFire();

          if (e.type === 'boss') {
            // Triple Spread Volley for Boss
            [-1.2, 0, 1.2].forEach((spreadX) => {
              const elSlot = enemyLasers.current.find((laser) => !laser.active);
              if (elSlot) {
                elSlot.active = true;
                elSlot.x = e.x + spreadX;
                elSlot.y = e.y;
                elSlot.z = e.z + 1.2;
                elSlot.vx = (spreadX / 10) * 8;
              }
            });
          } else if (e.type === 'raider') {
            // Twin burst for Raider
            [-0.8, 0.8].forEach((spreadX) => {
              const elSlot = enemyLasers.current.find((laser) => !laser.active);
              if (elSlot) {
                elSlot.active = true;
                elSlot.x = e.x + spreadX;
                elSlot.y = e.y;
                elSlot.z = e.z + 1.0;
                elSlot.vx = 0;
              }
            });
          } else {
            // Single shot for Scout
            const elSlot = enemyLasers.current.find((laser) => !laser.active);
            if (elSlot) {
              elSlot.active = true;
              elSlot.x = e.x;
              elSlot.y = e.y;
              elSlot.z = e.z + 0.8;
              elSlot.vx = 0;
            }
          }
          e.lastFired = now + Math.random() * 500;
        }

        // Check Player Laser Collisions against this enemy
        for (let pIdx = 0; pIdx < MAX_PLAYER_LASERS; pIdx++) {
          const pl = playerLasers.current[pIdx];
          if (!pl.active) continue;

          const dx = pl.x - e.x;
          const dy = pl.y - e.y;
          const dz = pl.z - e.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          const hitRadius = e.type === 'boss' ? 6.0 : e.type === 'raider' ? 4.0 : 3.0;

          if (distSq < hitRadius) {
            pl.active = false;
            e.hp -= 1;
            e.hitTime = performance.now();

            if (e.hp <= 0) {
              e.active = false;
              triggerExplosion(e.x, e.y, e.z, e.type);

              const pts = e.type === 'boss' ? 750 : e.type === 'raider' ? 300 : 150;
              dogfightKill(pts);

              const drop = droneSkillDrops[Math.floor(Math.random() * droneSkillDrops.length)];
              showToast(`🎯 Enemy Vessel Destroyed! +${pts} PTS`, `Unlocked Tech: ${drop.name}`, 'success');
              break;
            } else {
              soundEngine.playHit();
            }
          }
        }

        // Check Player-Enemy Collision (Ramming damage)
        const ramDx = e.x - shipPos.x;
        const ramDy = e.y - shipPos.y;
        const ramDz = e.z - shipPos.z;
        const ramDistSq = ramDx * ramDx + ramDy * ramDy + ramDz * ramDz;

        if (e.active && ramDistSq < 3.2) {
          e.active = false;
          triggerExplosion(e.x, e.y, e.z, e.type);
          takeDogfightDamage(25);
          playerHitTime.current = performance.now();
          setPlayerIsHit(true);
          screenShake.current = 0.5;
        }

        // Slipped Past Perimeter
        if (e.z > forwardZ.current + 6) {
          e.active = false;
          takeDogfightDamage(10);
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

    setEnemyRenderList(activeList);

    // Wave cleared check
    if (activeEnemiesCount === 0) {
      const nextWave = dogfightWave + 1;
      setDogfightWave(nextWave);
      spawnWaveEnemies(nextWave);
      showToast(`🚀 SECTOR ${nextWave} ACCESSED`, 'Hostile reinforcements engaging!', 'info');
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
