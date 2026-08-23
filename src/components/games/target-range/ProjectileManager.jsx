import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { targetMeshes } from './TargetRange';
import { useGameStore } from '../../../store/gameStore';
import { useUIStore } from '../../../store/uiStore';
import { usePlayerStore } from '../../../store/playerStore';

const MAX_PROJECTILES = 40;
const SPEED = 85;
const MAX_LIFETIME = 2.0;

// Export global fire function for Free-Roam Drone
export let fireDroneProjectile = () => {};

export const ProjectileManager = () => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const hitTarget = useGameStore((s) => s.hitTarget);
  const targetsHit = useGameStore((s) => s.targetsHit);
  const showToast = useUIStore((s) => s.showToast);

  // Pre-allocated flat buffers for zero GC / zero React re-render overhead
  const pool = useRef(
    Array.from({ length: MAX_PROJECTILES }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      dx: 0,
      dy: 0,
      dz: 0,
      life: 0
    }))
  );

  // Expose fire method
  fireDroneProjectile = (posX, posY, posZ, dirX, dirY, dirZ) => {
    const slot = pool.current.find((p) => !p.active);
    if (!slot) return;

    slot.active = true;
    slot.x = posX;
    slot.y = posY;
    slot.z = posZ;
    slot.dx = dirX * SPEED;
    slot.dy = dirY * SPEED;
    slot.dz = dirZ * SPEED;
    slot.life = MAX_LIFETIME;
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < MAX_PROJECTILES; i++) {
      const p = pool.current[i];
      if (p.active) {
        p.life -= delta;
        if (p.life <= 0) {
          p.active = false;
          dummy.position.set(0, -9999, 0);
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          p.x += p.dx * delta;
          p.y += p.dy * delta;
          p.z += p.dz * delta;

          dummy.position.set(p.x, p.y, p.z);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);

          // Fast Sphere Collision Check against targets
          if (targetMeshes.length > 0) {
            for (let tIdx = 0; tIdx < targetMeshes.length; tIdx++) {
              const target = targetMeshes[tIdx];
              if (targetsHit.includes(target.id)) continue;

              const targetMesh = target.getMesh();
              if (!targetMesh) continue;

              const tPos = targetMesh.position;
              const dx = p.x - tPos.x;
              const dy = p.y - tPos.y;
              const dz = p.z - tPos.z;
              const distSq = dx * dx + dy * dy + dz * dz;

              if (distSq < 2.56) {
                // Hit! (dist < 1.6)
                p.active = false;
                hitTarget(target.id, target.points);
                showToast(`+${target.points} PTS: ${target.name}`, `Discovered ${target.category.toUpperCase()} skill!`, 'success');
                break;
              }
            }
          }
        }
      } else {
        dummy.position.set(0, -9999, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const thrusterColor = usePlayerStore((s) => s.thrusterColor);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, MAX_PROJECTILES]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.22, 8, 8]} />
      <meshStandardMaterial
        color={thrusterColor}
        emissive={thrusterColor}
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={0.9}
      />
    </instancedMesh>
  );
};
