import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { flatSkillTargets } from '../../../data/skillsData';
import { useGameStore } from '../../../store/gameStore';
import { useUIStore } from '../../../store/uiStore';

// Global targets array for zero-overhead projectile collision checks
export const targetMeshes = [];

export const TargetRange = () => {
  const hitTarget = useGameStore((s) => s.hitTarget);
  const targetsHit = useGameStore((s) => s.targetsHit);
  const showToast = useUIStore((s) => s.showToast);
  const setActiveModal = useUIStore((s) => s.setActiveModal);

  // Define target positions in the Skills Arena (around [0, 0, -70])
  const [targets] = React.useState(() => {
    return flatSkillTargets.map((item, idx) => {
      const angle = (idx / flatSkillTargets.length) * Math.PI * 2;
      const radius = 6 + (idx % 3) * 3.5;
      const height = 2.5 + (idx % 4) * 1.6;
      return {
        ...item,
        basePos: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          -70 + Math.sin(angle) * radius
        ),
        orbitSpeed: 0.2 + (idx % 3) * 0.15,
        orbitRadius: radius,
        angle
      };
    });
  });

  const targetsRef = useRef([]);

  useEffect(() => {
    targetMeshes.length = 0;
    targets.forEach((t, i) => {
      targetMeshes.push({
        id: t.id,
        name: t.name,
        category: t.category,
        points: t.points,
        getMesh: () => targetsRef.current[i]
      });
    });
  }, [targets]);

  return (
    <group>
      {targets.map((target, idx) => (
        <SkillTargetItem
          key={target.id}
          target={target}
          isHit={targetsHit.includes(target.id)}
          ref={(el) => (targetsRef.current[idx] = el)}
          onClick={(e) => {
            e.stopPropagation();
            hitTarget(target.id, target.points);
            showToast(`Skill Info: ${target.name}`, `[Click] Opened full skills sheet`, 'info');
            setActiveModal('skills');
          }}
        />
      ))}
    </group>
  );
};

const SkillTargetItem = React.forwardRef(({ target, isHit, onClick }, ref) => {
  const meshGroup = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (!meshGroup.current) return;

    // Orbit & Bob animation
    const time = state.clock.elapsedTime * target.orbitSpeed;
    const currentAngle = target.angle + time * 0.4;
    const x = Math.cos(currentAngle) * target.orbitRadius;
    const z = -70 + Math.sin(currentAngle) * target.orbitRadius;
    const y = target.basePos.y + Math.sin(state.clock.elapsedTime * 2 + target.angle) * 0.4;

    meshGroup.current.position.set(x, y, z);

    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 1.5;
      innerRef.current.rotation.x += delta * 0.8;
    }

    if (ref) {
      if (typeof ref === 'function') ref(meshGroup.current);
      else ref.current = meshGroup.current;
    }
  });

  return (
    <group
      ref={meshGroup}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Target Mesh Cube / Gem */}
      <group ref={innerRef}>
        <mesh castShadow>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={target.color}
            emissive={target.color}
            emissiveIntensity={isHit ? 2.5 : 0.8}
            roughness={0.2}
            metalness={0.8}
            wireframe={isHit}
          />
        </mesh>

        {/* Orbiting Ring */}
        <mesh>
          <torusGeometry args={[1.0, 0.04, 8, 24]} />
          <meshBasicMaterial color={target.color} />
        </mesh>
      </group>

      {/* Floating Skill Label */}
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.35}
        color={isHit ? '#10b981' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#0a0d14"
      >
        {target.name}
      </Text>

      <Text
        position={[0, 1.05, 0]}
        fontSize={0.2}
        color={isHit ? '#6ee7b7' : target.color}
        anchorX="center"
        anchorY="middle"
      >
        {isHit ? '✓ UNLOCKED' : `+${target.points} PTS`}
      </Text>
    </group>
  );
});
