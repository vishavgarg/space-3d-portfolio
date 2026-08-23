import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../../store/gameStore';
import { usePlayerStore } from '../../../store/playerStore';
import { useUIStore } from '../../../store/uiStore';

export const Platformer = () => {
  const visitPlatform = useGameStore((s) => s.visitPlatform);
  const platformsVisited = useGameStore((s) => s.platformsVisited);
  const discoverEasterEgg = useGameStore((s) => s.discoverEasterEgg);
  const playerPosition = usePlayerStore((s) => s.position);
  const showToast = useUIStore((s) => s.showToast);

  // Floating bonus jump platforms between Hub and Projects
  const [platforms] = React.useState([
    { id: 'jump-1', name: 'Alpha Jump Pad', pos: [22, 3.2, -8], color: '#00f0ff' },
    { id: 'jump-2', name: 'Cloud Booster', pos: [28, 5.5, -16], color: '#7928ca' },
    { id: 'jump-3', name: 'Architecture Ascent', pos: [34, 7.8, -22], color: '#ff007f' },
    { id: 'secret-egg', name: 'Golden Trophy', pos: [0, 12, 0], color: '#ffb703', isEasterEgg: true }
  ]);

  useFrame(() => {
    const playerVec = new THREE.Vector3(...playerPosition);

    platforms.forEach((plat) => {
      const platVec = new THREE.Vector3(...plat.pos);
      if (playerVec.distanceTo(platVec) < 2.5) {
        if (plat.isEasterEgg) {
          discoverEasterEgg('sky-trophy');
          showToast('🏆 SECRET EASTER EGG FOUND!', '+250 PTS: Master Architect Trophy', 'success');
        } else {
          const isNew = visitPlatform(plat.id);
          if (isNew) {
            showToast(`+150 PTS: ${plat.name}`, 'Platformer jump challenge completed!', 'success');
          }
        }
      }
    });
  });

  return (
    <group>
      {platforms.map((plat) => (
        <PlatformItem
          key={plat.id}
          platform={plat}
          isVisited={platformsVisited.includes(plat.id)}
        />
      ))}
    </group>
  );
};

const PlatformItem = ({ platform, isVisited }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.015;
      groupRef.current.position.y = platform.pos[1] + Math.sin(state.clock.elapsedTime * 2 + platform.pos[0]) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={platform.pos}>
      {platform.isEasterEgg ? (
        // Easter Egg Golden Trophy
        <group>
          <mesh castShadow>
            <dodecahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color="#ffb703"
              emissive="#ffb703"
              emissiveIntensity={1.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <Text
            position={[0, 1.4, 0]}
            fontSize={0.35}
            color="#ffb703"
            anchorX="center"
            anchorY="middle"
          >
            🏆 SECRET TROPHY
          </Text>
        </group>
      ) : (
        // Floating Jump Platform Pad
        <group>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.8, 0.4, 6]} />
            <meshStandardMaterial
              color={platform.color}
              emissive={platform.color}
              emissiveIntensity={isVisited ? 0.3 : 1.0}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 1.3, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
          <Text
            position={[0, 1.0, 0]}
            fontSize={0.28}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {isVisited ? '✓ VISITED (+150)' : platform.name}
          </Text>
        </group>
      )}
    </group>
  );
};
