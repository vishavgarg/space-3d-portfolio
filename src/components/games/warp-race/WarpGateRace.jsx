import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../../store/gameStore';
import { soundEngine } from '../../../utils/soundEngine';

const portfolioMilestones = [
  'Toyota TMNA Portal Architect',
  'Pampers Scalable Commerce Lead',
  'PC Builder 3D Customizer',
  'Diveroid IoT Dive Platform',
  'JigsawML AI Data Platform',
  'High-Performance WebGL Engine',
  'Enterprise Cloud Solutions',
  'Distributed Microservices'
];

// Level Palette Theme Presets
const LEVEL_THEMES = [
  { main: '#00f0ff', accent: '#a855f7', emissive: '#00f0ff', name: 'CYBER SLIPSTREAM' },
  { main: '#f59e0b', accent: '#fbbf24', emissive: '#f59e0b', name: 'SOLAR FLARE RUN' },
  { main: '#10b981', accent: '#06b6d4', emissive: '#10b981', name: 'EMERALD HYPERWAY' },
  { main: '#ec4899', accent: '#f43f5e', emissive: '#ec4899', name: 'CRIMSON OVERDRIVE' },
  { main: '#8b5cf6', accent: '#d946ef', emissive: '#8b5cf6', name: 'VOID RUNNER HORIZON' },
];

export const WarpGateRace = () => {
  const warpRaceActive = useGameStore((s) => s.warpRaceActive);
  const warpRaceLevel = useGameStore((s) => s.warpRaceLevel);
  const warpRaceGatesTotal = useGameStore((s) => s.warpRaceGatesTotal);
  const warpRaceGameOver = useGameStore((s) => s.warpRaceGameOver);
  const warpRaceIsWarping = useGameStore((s) => s.warpRaceIsWarping);
  const collectWarpGate = useGameStore((s) => s.collectWarpGate);
  const missWarpGate = useGameStore((s) => s.missWarpGate);
  const hitWarpObstacle = useGameStore((s) => s.hitWarpObstacle);
  const advanceWarpRaceLevel = useGameStore((s) => s.advanceWarpRaceLevel);

  const { camera } = useThree();
  const shipRef = useRef();
  const forwardZ = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const keyVelocity = useRef({ x: 0, y: 0 });
  const keysPressed = useRef({});
  const engineFlameLeft = useRef();
  const engineFlameRight = useRef();
  const warpTunnelRef = useRef();

  const [gates, setGates] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [speed, setSpeed] = useState(34);
  const levelAdvancingRef = useRef(false);

  const currentTheme = useMemo(() => {
    return LEVEL_THEMES[(warpRaceLevel - 1) % LEVEL_THEMES.length];
  }, [warpRaceLevel]);

  // Track Mouse, Touch & Keyboard Controls
  useEffect(() => {
    if (!warpRaceActive) return;

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

    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [warpRaceActive]);

  // Generate Gates and Asteroid Obstacles dynamically for each Level
  useEffect(() => {
    if (!warpRaceActive) return;

    levelAdvancingRef.current = false;
    forwardZ.current = 0;

    // Fast, thrilling yet responsive speed curve
    const targetSpeed = Math.min(22 + (warpRaceLevel - 1) * 4, 38);
    setSpeed(targetSpeed);

    const gateCount = warpRaceGatesTotal || 10 + warpRaceLevel * 2;
    const generatedGates = [];
    const generatedObstacles = [];

    // Curve parameterization based on level
    const curveFreq = 0.28 + (warpRaceLevel - 1) * 0.05;
    const curveAmpX = Math.min(6 + warpRaceLevel * 1.2, 12);
    const curveAmpY = Math.min(3 + warpRaceLevel * 0.8, 6.5);
    const gateInterval = 46; // perfect spacing for high-speed excitement with time to maneuver

    for (let i = 0; i < gateCount; i++) {
      const angle = i * curveFreq;
      const gateX = Math.sin(angle) * curveAmpX;
      const gateY = Math.cos(angle * 0.8) * curveAmpY + 4;
      const gateZ = -(i + 1) * gateInterval;

      generatedGates.push({
        id: `gate-${warpRaceLevel}-${i}`,
        index: i,
        x: gateX,
        y: gateY,
        z: gateZ,
        color: currentTheme.main,
        accent: currentTheme.accent,
        rotationZ: Math.sin(angle) * 0.25,
        passed: false,
        missed: false,
      });

      // Spawn Asteroid / Mine Obstacles between gates starting from gate 1
      if (i > 0 && Math.random() < Math.min(0.4 + warpRaceLevel * 0.1, 0.85)) {
        const obstacleZ = gateZ + gateInterval * 0.5;
        const prevGate = generatedGates[i - 1];
        const midX = (prevGate.x + gateX) / 2 + (Math.random() - 0.5) * 6;
        const midY = (prevGate.y + gateY) / 2 + (Math.random() - 0.5) * 4.5;

        generatedObstacles.push({
          id: `obstacle-${warpRaceLevel}-${i}`,
          x: midX,
          y: Math.max(1.5, midY),
          z: obstacleZ,
          radius: 0.9 + Math.random() * 0.6,
          rotSpeedX: (Math.random() - 0.5) * 1.5,
          rotSpeedY: (Math.random() - 0.5) * 1.5,
          rotSpeedZ: (Math.random() - 0.5) * 1.5,
          hit: false,
          isMine: i % 3 === 0
        });
      }
    }

    setGates(generatedGates);
    setObstacles(generatedObstacles);
  }, [warpRaceActive, warpRaceLevel, warpRaceGatesTotal, currentTheme]);

  // Hyperspace Speed Lines Starfield
  const starParticles = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r + 4;
      positions[i * 3 + 2] = -Math.random() * 400;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!warpRaceActive || warpRaceGameOver) return;

    // During Warp Jumps: smooth gliding transition and expanded FOV
    const currentSpeed = warpRaceIsWarping ? 10 : speed;
    forwardZ.current -= currentSpeed * delta;

    // Handle Keyboard controls integration
    const keys = keysPressed.current;
    let targetKeyX = 0;
    let targetKeyY = 0;
    if (keys['KeyA'] || keys['ArrowLeft']) targetKeyX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) targetKeyX += 1;
    if (keys['KeyW'] || keys['ArrowUp']) targetKeyY += 1;
    if (keys['KeyS'] || keys['ArrowDown']) targetKeyY -= 1;

    keyVelocity.current.x = THREE.MathUtils.lerp(keyVelocity.current.x, targetKeyX, delta * 10);
    keyVelocity.current.y = THREE.MathUtils.lerp(keyVelocity.current.y, targetKeyY, delta * 10);

    // Combine pointer and keyboard inputs
    const steerX = THREE.MathUtils.clamp(mousePos.current.x + keyVelocity.current.x, -1.2, 1.2);
    const steerY = THREE.MathUtils.clamp(mousePos.current.y + keyVelocity.current.y, -1.2, 1.2);

    // Ship position & attitude physics
    if (shipRef.current) {
      const targetX = steerX * 12;
      const targetY = steerY * 7.5 + 4;
      const targetZ = forwardZ.current - 10;

      shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, targetX, delta * 9);
      shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, targetY, delta * 9);
      shipRef.current.position.z = targetZ;

      // Realistic flight dynamics banking & pitch
      const roll = -steerX * 0.85;
      const pitch = -steerY * 0.3;
      const yaw = -steerX * 0.2;

      shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, roll, delta * 7);
      shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, pitch, delta * 7);
      shipRef.current.rotation.y = THREE.MathUtils.lerp(shipRef.current.rotation.y, yaw, delta * 7);

      // Camera dynamic chase follow with subtle speed lag
      const targetCamX = shipRef.current.position.x * 0.4;
      const targetCamY = shipRef.current.position.y * 0.4 + 3.0;
      const targetCamZ = forwardZ.current + (warpRaceIsWarping ? 2.5 : 0);

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, delta * 7);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 7);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 8);

      // Camera FOV dynamic warp expansion
      const targetFov = warpRaceIsWarping ? 82 : 65 + (speed - 16) * 0.5;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 5);
      camera.updateProjectionMatrix();

      // Pulsing thruster plasma flares
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.3 + (warpRaceIsWarping ? 1.2 : 0);
      if (engineFlameLeft.current) {
        engineFlameLeft.current.scale.set(1, 1, pulse * 1.6);
      }
      if (engineFlameRight.current) {
        engineFlameRight.current.scale.set(1, 1, pulse * 1.6);
      }
    }

    // If currently warping between levels, pause collision and miss checks
    if (warpRaceIsWarping) return;

    const shipX = shipRef.current?.position.x || 0;
    const shipY = shipRef.current?.position.y || 0;
    const shipZ = shipRef.current?.position.z || 0;

    // 1. Asteroid / Obstacle Collision Detection
    setObstacles((prev) => {
      let hitOccurred = false;
      const updated = prev.map((obs) => {
        if (obs.hit) return obs;

        const dz = Math.abs(shipZ - obs.z);
        const dx = Math.abs(shipX - obs.x);
        const dy = Math.abs(shipY - obs.y);
        const collisionDist = obs.radius + 1.0;

        if (dz < 1.8 && dx < collisionDist && dy < collisionDist) {
          hitOccurred = true;
          return { ...obs, hit: true };
        }
        return obs;
      });

      if (hitOccurred) {
        hitWarpObstacle();
      }

      return updated;
    });

    // 2. Gate Collision & Miss Detection
    setGates((prev) => {
      return prev.map((gate) => {
        if (gate.passed || gate.missed) {
          return gate;
        }

        const dz = shipZ - gate.z; // ship moves into negative z
        const dx = Math.abs(shipX - gate.x);
        const dy = Math.abs(shipY - gate.y);

        // Case A: Passed Through Gate Ring Aperture
        if (Math.abs(dz) < 3.2 && dx < 4.2 && dy < 4.2) {
          collectWarpGate(250);
          setSpeed((s) => Math.min(s + 0.25, 40));

          return { ...gate, passed: true };
        }

        // Case B: Flew Past Gate Without Passing Through (Missed Gate!)
        if (dz < -3.8) {
          missWarpGate();
          return { ...gate, missed: true };
        }

        return gate;
      });
    });

    // 3. Level Completion Checking
    const allGatesResolved = gates.length > 0 && gates.every((g) => g.passed || g.missed);
    if (allGatesResolved && !warpRaceIsWarping && !levelAdvancingRef.current) {
      levelAdvancingRef.current = true;
      setGates([]);
      setObstacles([]);
      advanceWarpRaceLevel(warpRaceLevel + 1);
    }
  });

  if (!warpRaceActive) return null;

  return (
    <group>
      {/* 1. HIGH-TECH REALISTIC RACER SPACESHIP */}
      <group ref={shipRef} position={[0, 4, -10]}>
        {/* Main Aerodynamic Cockpit & Needle Nose Fuselage */}
        <mesh castShadow position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 3.2, 8]} />
          <meshStandardMaterial color="#0b1120" metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Central Faceted Armor Body */}
        <mesh castShadow position={[0, 0, 0.4]}>
          <boxGeometry args={[1.1, 0.45, 2.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.88} roughness={0.25} />
        </mesh>

        {/* Glowing Crystalline Cockpit Canopy */}
        <mesh position={[0, 0.28, -0.2]} rotation={[-Math.PI / 10, 0, 0]}>
          <capsuleGeometry args={[0.24, 0.8, 8, 16]} />
          <meshStandardMaterial
            color={currentTheme.main}
            emissive={currentTheme.main}
            emissiveIntensity={2.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Swept Delta Wings with Forward Trim */}
        <mesh position={[0, -0.05, 0.5]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.08, 3.8, 1.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Wing Armor Insets with Neon Energy Stripes */}
        <mesh position={[-1.2, 0.02, 0.5]} rotation={[0, -Math.PI / 14, 0]}>
          <boxGeometry args={[1.2, 0.06, 0.9]} />
          <meshStandardMaterial
            color={currentTheme.accent}
            emissive={currentTheme.accent}
            emissiveIntensity={1.8}
          />
        </mesh>
        <mesh position={[1.2, 0.02, 0.5]} rotation={[0, Math.PI / 14, 0]}>
          <boxGeometry args={[1.2, 0.06, 0.9]} />
          <meshStandardMaterial
            color={currentTheme.accent}
            emissive={currentTheme.accent}
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Angled Wingtip Stabilizer Fins */}
        <mesh position={[-1.9, 0.35, 0.7]} rotation={[0, 0, -Math.PI / 5]}>
          <boxGeometry args={[0.06, 0.8, 1.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        <mesh position={[1.9, 0.35, 0.7]} rotation={[0, 0, Math.PI / 5]}>
          <boxGeometry args={[0.06, 0.8, 1.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Top Dorsal Stabilizer Fin */}
        <mesh position={[0, 0.45, 0.7]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[0.06, 0.7, 1.1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>

        {/* Twin Heavy Ion Plasma Engine Nacelles */}
        <group position={[-0.45, 0, 1.3]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.9, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.95} />
          </mesh>
          {/* Inner Plasma Exhaust Ring */}
          <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.04, 12, 24]} />
            <meshBasicMaterial color={currentTheme.main} />
          </mesh>
          {/* Animated Plasma Plume Cone */}
          <mesh ref={engineFlameLeft} position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.18, 1.2, 12]} />
            <meshBasicMaterial color={currentTheme.main} transparent opacity={0.85} />
          </mesh>
        </group>

        <group position={[0.45, 0, 1.3]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.9, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.95} />
          </mesh>
          {/* Inner Plasma Exhaust Ring */}
          <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.04, 12, 24]} />
            <meshBasicMaterial color={currentTheme.main} />
          </mesh>
          {/* Animated Plasma Plume Cone */}
          <mesh ref={engineFlameRight} position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.18, 1.2, 12]} />
            <meshBasicMaterial color={currentTheme.main} transparent opacity={0.85} />
          </mesh>
        </group>
      </group>

      {/* 2. GLOWING SCI-FI WARP GATE RINGS */}
      {gates.map((g) => (
        <group key={g.id} position={[g.x, g.y, g.z]} rotation={[0, 0, g.rotationZ]}>
          {/* Outer Octagonal Segment Ring */}
          <mesh>
            <torusGeometry args={[3.4, 0.22, 16, 48]} />
            <meshStandardMaterial
              color={g.passed ? '#10b981' : g.missed ? '#ef4444' : g.color}
              emissive={g.passed ? '#10b981' : g.missed ? '#ef4444' : g.color}
              emissiveIntensity={g.passed ? 3.0 : g.missed ? 0.6 : 1.8}
              metalness={0.8}
            />
          </mesh>

          {/* Inner Chevron Energy Ring */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[3.1, 0.08, 8, 32]} />
            <meshStandardMaterial
              color={g.passed ? '#34d399' : g.accent}
              emissive={g.passed ? '#34d399' : g.accent}
              emissiveIntensity={g.passed ? 2.5 : 1.5}
            />
          </mesh>

          {/* Alignment Power Nodes */}
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((ang, idx) => (
            <mesh key={idx} position={[Math.cos(ang) * 3.4, Math.sin(ang) * 3.4, 0]}>
              <boxGeometry args={[0.3, 0.3, 0.4]} />
              <meshStandardMaterial
                color={g.passed ? '#10b981' : '#ffffff'}
                emissive={g.passed ? '#10b981' : g.accent}
                emissiveIntensity={2.5}
              />
            </mesh>
          ))}

          {/* Inner Shimmer Energy Vortex Portal */}
          <mesh>
            <circleGeometry args={[2.95, 32]} />
            <meshBasicMaterial
              color={g.passed ? '#10b981' : g.missed ? '#7f1d1d' : g.color}
              transparent
              opacity={g.passed ? 0.04 : g.missed ? 0.02 : 0.28}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* 3. ASTEROID & SPACE MINE OBSTACLES */}
      {obstacles.map((obs) => {
        if (obs.hit) return null; // destroyed on impact

        return (
          <group
            key={obs.id}
            position={[obs.x, obs.y, obs.z]}
            rotation={[obs.rotSpeedX, obs.rotSpeedY, obs.rotSpeedZ]}
          >
            {obs.isMine ? (
              // Explosive Proximity Space Mine
              <group>
                <mesh castShadow>
                  <sphereGeometry args={[obs.radius * 0.7, 16, 16]} />
                  <meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Spikes */}
                {[0, 1, 2, 3, 4, 5].map((s) => (
                  <mesh
                    key={s}
                    rotation={[
                      (s % 2) * (Math.PI / 2),
                      (s % 3) * (Math.PI / 3),
                      (s % 4) * (Math.PI / 4)
                    ]}
                  >
                    <cylinderGeometry args={[0.06, 0.12, obs.radius * 1.6, 8]} />
                    <meshStandardMaterial color="#475569" metalness={0.8} />
                  </mesh>
                ))}
                {/* Center Warning Beacon */}
                <mesh>
                  <sphereGeometry args={[obs.radius * 0.35, 12, 12]} />
                  <meshBasicMaterial color="#ef4444" />
                </mesh>
              </group>
            ) : (
              // Rugged Asteroid
              <mesh castShadow receiveShadow>
                <dodecahedronGeometry args={[obs.radius, 1]} />
                <meshStandardMaterial
                  color="#334155"
                  roughness={0.9}
                  metalness={0.2}
                  flatShading
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* 4. SPEED LINES & STAR PARTICLES */}
      <points position={[0, 0, forwardZ.current]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starParticles, 3]}
            count={starParticles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={warpRaceIsWarping ? 0.6 : 0.25}
          color={currentTheme.main}
          transparent
          opacity={warpRaceIsWarping ? 0.9 : 0.6}
        />
      </points>
    </group>
  );
};

