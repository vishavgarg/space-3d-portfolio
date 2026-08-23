import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper component for an individual 3D Cyber Bridge between two 3D vectors
const CyberBridgeSegment = ({ start, end, color = '#00f0ff', width = 3.6 }) => {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const dist = p1.distanceTo(p2);

  // Compute rotation to align from p1 to p2
  const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
  const orientation = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  orientation.lookAt(p1, p2, up);

  const rotation = new THREE.Euler().setFromRotationMatrix(orientation);

  return (
    <group position={[mid.x, mid.y - 0.2, mid.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Translucent Glass Deck Plating */}
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.15, dist]} />
        <meshStandardMaterial
          color="#0b172a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Glowing Neon Energy Guide Rails (Left & Right) */}
      <mesh position={[-width / 2, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.4, dist]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[width / 2, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.4, dist]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Center Pathway Glow Line */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.04, dist]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Support Arch Ring / Gateway in Center of Bridge */}
      <group position={[0, 1.8, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[width * 0.7, 0.08, 8, 24, Math.PI]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
};

export const CyberBridges = () => {
  const bridgeData = [
    // 1. South Contact Island to Central Hub
    { start: [0, 0, 38], end: [0, 0, 17], color: '#ff007f' },

    // 2. Central Hub to Projects Archipelago (East)
    { start: [15, 0, -6], end: [33, 0, -20], color: '#38bdf8' },

    // 3. Projects Archipelago to Skills Arena (North)
    { start: [38, 0, -35], end: [12, 0, -58], color: '#10b981' },

    // 4. Skills Arena to About Sanctuary (West)
    { start: [-12, 0, -58], end: [-38, 0, -30], color: '#ec4899' },

    // 5. About Sanctuary to Central Hub
    { start: [-34, 0, -12], end: [-15, 0, -4], color: '#a855f7' }
  ];

  return (
    <group>
      {bridgeData.map((bridge, idx) => (
        <CyberBridgeSegment
          key={idx}
          start={bridge.start}
          end={bridge.end}
          color={bridge.color}
        />
      ))}
    </group>
  );
};
