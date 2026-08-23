import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DataStreams = () => {
  const stream1 = useRef();
  const stream2 = useRef();
  const stream3 = useRef();
  const stream4 = useRef();

  // Create curved energy conduit paths
  const [bridges] = React.useState(() => {
    // Spawn (0, 0, 0) to About (-45, 0, -20)
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(-22, 2.5, -10),
      new THREE.Vector3(-45, 0.5, -20)
    ]);

    // Spawn (0, 0, 0) to Projects (45, 0, -25)
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(22, 3, -12),
      new THREE.Vector3(45, 0.5, -25)
    ]);

    // Spawn (0, 0, 0) to Skills (0, 0, -70)
    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(0, 4, -35),
      new THREE.Vector3(0, 0.5, -70)
    ]);

    // Spawn (0, 0, 0) to Contact (0, 0, 50)
    const curve4 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(0, 3, 25),
      new THREE.Vector3(0, 0.5, 50)
    ]);

    return [
      { curve: curve1, color: '#ec4899', ref: stream1 },
      { curve: curve2, color: '#00f0ff', ref: stream2 },
      { curve: curve3, color: '#10b981', ref: stream3 },
      { curve: curve4, color: '#ff007f', ref: stream4 }
    ];
  });

  useFrame((state, delta) => {
    bridges.forEach(({ ref }) => {
      if (ref.current && ref.current.material) {
        // Subtle pulse and texture scroll
        ref.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      }
    });
  });

  return (
    <group>
      {bridges.map((b, i) => (
        <group key={i}>
          {/* Main glowing tube */}
          <mesh ref={b.ref}>
            <tubeGeometry args={[b.curve, 40, 0.25, 8, false]} />
            <meshBasicMaterial
              color={b.color}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Outer wireframe glow */}
          <mesh>
            <tubeGeometry args={[b.curve, 40, 0.6, 6, false]} />
            <meshBasicMaterial
              color={b.color}
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
