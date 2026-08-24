import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../../store/gameStore';
import { useUIStore } from '../../../store/uiStore';
import { soundEngine } from '../../../utils/soundEngine';

const portfolioMilestones = [
  'Toyota TMNA Portal Architect',
  'Pampers Scalable Commerce Lead',
  'PC Builder 3D Customizer',
  'Diveroid IoT Dive Platform',
  'JigsawML AI Data Platform',
  'High-Performance WebGL Engine'
];

export const WarpGateRace = () => {
  const warpRaceActive = useGameStore((s) => s.warpRaceActive);
  const endWarpRace = useGameStore((s) => s.endWarpRace);
  const collectWarpGate = useGameStore((s) => s.collectWarpGate);
  const showToast = useUIStore((s) => s.showToast);

  const { camera } = useThree();
  const shipRef = useRef();
  const forwardZ = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  const [gates, setGates] = useState([]);
  const [speed, setSpeed] = useState(32);

  // Track Mouse & Touch movement for steering
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, [warpRaceActive]);

  // Generate Warp Gates Along Spline Corridor
  useEffect(() => {
    if (!warpRaceActive) return;

    forwardZ.current = 0;
    const initialGates = [];
    const colors = ['#00f0ff', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

    for (let i = 0; i < 24; i++) {
      const angle = (i * 0.4);
      initialGates.push({
        id: `gate-${i}`,
        x: Math.sin(angle) * 8,
        y: Math.cos(angle) * 5 + 3,
        z: -(i + 1) * 35,
        color: colors[i % colors.length],
        passed: false
      });
    }
    setGates(initialGates);
  }, [warpRaceActive]);

  useFrame((state, delta) => {
    if (!warpRaceActive) return;

    // Advance forward
    forwardZ.current -= speed * delta;

    // Steer ship
    if (shipRef.current) {
      const targetX = mousePos.current.x * 12;
      const targetY = mousePos.current.y * 7 + 3;
      const targetZ = forwardZ.current - 10;

      shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, targetX, delta * 8);
      shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, targetY, delta * 8);
      shipRef.current.position.z = targetZ;

      // Roll Banking
      shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, -mousePos.current.x * 0.8, delta * 6);

      // Camera Follow
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, shipRef.current.position.x * 0.5, delta * 6);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, shipRef.current.position.y * 0.5 + 2.8, delta * 6);
      camera.position.z = forwardZ.current;
    }

    // Gate collision checking
    setGates((prev) => {
      return prev.map((gate) => {
        if (gate.passed) return gate;

        const shipX = shipRef.current?.position.x || 0;
        const shipY = shipRef.current?.position.y || 0;
        const shipZ = shipRef.current?.position.z || 0;

        const dz = Math.abs(shipZ - gate.z);
        const dx = Math.abs(shipX - gate.x);
        const dy = Math.abs(shipY - gate.y);

        if (dz < 2.5 && dx < 3.5 && dy < 3.5) {
          // Gate passed!
          collectWarpGate(200);
          setSpeed((s) => Math.min(s + 2, 55)); // Accelerate!

          const milestone = portfolioMilestones[Math.floor(Math.random() * portfolioMilestones.length)];
          showToast('⚡ WARP GATE ACCELERATION! +200 PTS', `Discovered: ${milestone}`, 'success');

          return { ...gate, passed: true };
        }

        return gate;
      });
    });
  });

  if (!warpRaceActive) return null;

  return (
    <group>
      {/* Player Speed Racer Ship */}
      <group ref={shipRef} position={[0, 3, -10]}>
        <mesh castShadow>
          <coneGeometry args={[0.6, 2.4, 4]} />
          <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.1, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.08, 2.8, 0.6]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.8} />
        </mesh>
        {/* Neon Tail Exhaust */}
        <mesh position={[0, 0, 1.3]}>
          <cylinderGeometry args={[0.2, 0.3, 0.6, 12]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* Render Glowing Warp Gate Rings */}
      {gates.map((g) => (
        <group key={g.id} position={[g.x, g.y, g.z]}>
          {/* Main Torus Arch */}
          <mesh>
            <torusGeometry args={[3.2, 0.16, 16, 36]} />
            <meshStandardMaterial
              color={g.passed ? '#10b981' : g.color}
              emissive={g.passed ? '#10b981' : g.color}
              emissiveIntensity={g.passed ? 2.5 : 1.2}
            />
          </mesh>

          {/* Inner Shimmer Field */}
          <mesh>
            <circleGeometry args={[2.9, 24]} />
            <meshBasicMaterial
              color={g.color}
              transparent
              opacity={g.passed ? 0.05 : 0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
