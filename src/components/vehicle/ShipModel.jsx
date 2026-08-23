import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ShipModel = ({ shipId = 'scout', thrusterColor = '#00f0ff', isDriving = false, speedBoost = false }) => {
  // Common refs for animated parts
  const rotor1 = useRef();
  const rotor2 = useRef();
  const rotor3 = useRef();
  const rotor4 = useRef();
  const engineGlowRef = useRef();

  useFrame((state, delta) => {
    const rotorSpeed = (isDriving || speedBoost ? 45 : 20) * delta;
    if (rotor1.current) rotor1.current.rotation.y += rotorSpeed;
    if (rotor2.current) rotor2.current.rotation.y -= rotorSpeed;
    if (rotor3.current) rotor3.current.rotation.y += rotorSpeed;
    if (rotor4.current) rotor4.current.rotation.y -= rotorSpeed;

    if (engineGlowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * (speedBoost ? 30 : 15)) * 0.25;
      engineGlowRef.current.scale.set(1, speedBoost ? 2.2 : pulse, 1);
    }
  });

  // 1. SPEED INTERCEPTOR (Delta-Wing Jet Fighter)
  if (shipId === 'interceptor') {
    return (
      <group castShadow receiveShadow>
        {/* Needle Fuselage */}
        <mesh castShadow position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 3.2, 5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Swept Delta Wings */}
        <mesh position={[0, -0.05, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.08, 3.6, 1.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Wingtip Stabilizer Fins */}
        <mesh position={[-1.75, 0.35, 0.6]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.06, 0.7, 0.8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        <mesh position={[1.75, 0.35, 0.6]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.06, 0.7, 0.8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>

        {/* Cockpit Canopy */}
        <mesh position={[0, 0.3, -0.3]} rotation={[-Math.PI / 8, 0, 0]}>
          <capsuleGeometry args={[0.22, 0.7, 8, 16]} />
          <meshStandardMaterial
            color={thrusterColor}
            emissive={thrusterColor}
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>

        {/* Dual Wingtip Laser Cannons */}
        <mesh position={[-1.6, -0.05, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[1.6, -0.05, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={1.2} />
        </mesh>

        {/* Twin Rear Afterburner Thrusters */}
        <group position={[0, 0, 1.2]} ref={engineGlowRef}>
          <mesh position={[-0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 0.6, 12]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
          <mesh position={[0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 0.6, 12]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
        </group>
      </group>
    );
  }

  // 2. TITAN DREADNOUGHT (Armored Heavy Gunship)
  if (shipId === 'dreadnought') {
    return (
      <group castShadow receiveShadow>
        {/* Main Hexagonal Armored Hull */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.7, 2.6]} />
          <meshStandardMaterial color="#0b1324" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Angled Armor Prow (Front Wedge) */}
        <mesh position={[0, 0, -1.5]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.5, 0.65, 1.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Bridge / Command Deck */}
        <mesh position={[0, 0.55, -0.2]}>
          <boxGeometry args={[0.9, 0.4, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.65, -0.7]}>
          <boxGeometry args={[0.8, 0.15, 0.2]} />
          <meshStandardMaterial
            color={thrusterColor}
            emissive={thrusterColor}
            emissiveIntensity={2.0}
          />
        </mesh>

        {/* Heavy Twin-Barrel Turrets */}
        <group position={[-1.25, 0.1, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.4, 0.5, 1.8]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
            <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={1.0} />
          </mesh>
        </group>
        <group position={[1.25, 0.1, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.4, 0.5, 1.8]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
            <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={1.0} />
          </mesh>
        </group>

        {/* Heavy Plasma Drive Manifolds (3 Exhaust Ports) */}
        <group position={[0, 0, 1.35]} ref={engineGlowRef}>
          {[-0.6, 0, 0.6].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.25, 0.5, 12]} />
              <meshBasicMaterial color={thrusterColor} />
            </mesh>
          ))}
        </group>
      </group>
    );
  }

  // 3. CYBER SCOUT (Default Agile Quad-Rotor Drone)
  return (
    <group castShadow receiveShadow>
      {/* Central Drone Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.4, 1.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit Visor Glow */}
      <mesh position={[0, 0.25, 0.2]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={thrusterColor}
          emissive={thrusterColor}
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Front Dual Laser Cannons */}
      <mesh position={[-0.45, -0.05, 0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.45, -0.05, 0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={thrusterColor} emissive={thrusterColor} emissiveIntensity={0.8} />
      </mesh>

      {/* 4 Carbon Arms extending to rotors */}
      <mesh position={[-0.9, 0.1, 0.9]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>
      <mesh position={[0.9, 0.1, 0.9]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>
      <mesh position={[-0.9, 0.1, -0.9]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>
      <mesh position={[0.9, 0.1, -0.9]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>

      {/* 4 Rotor Pods & Blades */}
      <group position={[-1.2, 0.2, 1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <group ref={rotor1}>
          <mesh>
            <boxGeometry args={[0.9, 0.02, 0.1]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
        </group>
      </group>

      <group position={[1.2, 0.2, 1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <group ref={rotor2}>
          <mesh>
            <boxGeometry args={[0.9, 0.02, 0.1]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
        </group>
      </group>

      <group position={[-1.2, 0.2, -1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <group ref={rotor3}>
          <mesh>
            <boxGeometry args={[0.9, 0.02, 0.1]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
        </group>
      </group>

      <group position={[1.2, 0.2, -1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <group ref={rotor4}>
          <mesh>
            <boxGeometry args={[0.9, 0.02, 0.1]} />
            <meshBasicMaterial color={thrusterColor} />
          </mesh>
        </group>
      </group>

      {/* Rear Ion Jet Core */}
      <group position={[0, 0, 0.75]} ref={engineGlowRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.22, 0.4, 12]} />
          <meshBasicMaterial color={thrusterColor} />
        </mesh>
      </group>
    </group>
  );
};
