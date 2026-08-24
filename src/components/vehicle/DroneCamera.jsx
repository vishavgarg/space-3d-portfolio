import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';

export const DroneCamera = () => {
  const playerPosition = usePlayerStore((s) => s.position);
  const playerRotation = usePlayerStore((s) => s.rotation);
  const resetTrigger = usePlayerStore((s) => s.resetTrigger);
  const hasStartedExperience = useUIStore((s) => s.hasStartedExperience);

  // Initial High-Altitude Vista camera above Contact Island
  const currentCamPos = useRef(new THREE.Vector3(0, 24, 68));
  const currentLookAt = useRef(new THREE.Vector3(0, 10, 0));
  const isIntroComplete = useRef(false);
  const introTime = useRef(0);

  // When reset trigger fires, snap camera smoothly behind high spawn point
  useEffect(() => {
    if (resetTrigger > 0) {
      currentCamPos.current.set(0, 24, 68);
      currentLookAt.current.set(0, 10, 0);
    }
  }, [resetTrigger]);

  useFrame((state, delta) => {
    // 1. Ambient Cinematic Orbit while visitor is on the Landing Command Deck
    if (!hasStartedExperience) {
      const angle = state.clock.elapsedTime * 0.12;
      const radius = 64;
      const camX = Math.sin(angle) * radius;
      const camZ = Math.cos(angle) * (radius * 0.85) + 12;
      const camY = 22 + Math.sin(angle * 0.6) * 5;

      currentCamPos.current.lerp(new THREE.Vector3(camX, camY, camZ), delta * 3);
      currentLookAt.current.lerp(new THREE.Vector3(0, 5, 0), delta * 3);

      state.camera.position.copy(currentCamPos.current);
      state.camera.lookAt(currentLookAt.current);
      return;
    }

    const [px, py, pz] = playerPosition;
    const [, ry] = playerRotation;

    // Cinematic Intro Fly-in for first 1.8 seconds after starting
    if (!isIntroComplete.current) {
      introTime.current += delta;
      const t = Math.min(introTime.current / 1.8, 1);
      
      const startPos = new THREE.Vector3(0, 32, 80);
      const targetFollowPos = new THREE.Vector3(
        px - Math.sin(ry) * 12,
        py + 5.8,
        pz - Math.cos(ry) * 12
      );

      currentCamPos.current.lerpVectors(startPos, targetFollowPos, THREE.MathUtils.smoothstep(t, 0, 1));
      currentLookAt.current.lerp(new THREE.Vector3(px, py + 1.2, pz - 10), delta * 5);

      state.camera.position.copy(currentCamPos.current);
      state.camera.lookAt(currentLookAt.current);

      if (t >= 1) {
        isIntroComplete.current = true;
      }
      return;
    }

    // Dynamic camera tracking based on position, yaw angle, and viewport aspect ratio
    const aspect = state.size.width / state.size.height;
    const isPortrait = aspect < 1.0;
    const distance = isPortrait ? 15.5 : 12.0;
    const height = isPortrait ? 7.0 : 5.8;

    const idealOffset = new THREE.Vector3(
      px - Math.sin(ry) * distance,
      py + height,
      pz - Math.cos(ry) * distance
    );

    const idealLookAt = new THREE.Vector3(
      px + Math.sin(ry) * (isPortrait ? 6 : 8),
      py + (isPortrait ? 1.5 : 1.2),
      pz + Math.cos(ry) * (isPortrait ? 6 : 8)
    );

    // Fast, responsive camera tracking
    currentCamPos.current.lerp(idealOffset, delta * 8);
    currentLookAt.current.lerp(idealLookAt, delta * 12);

    state.camera.position.copy(currentCamPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
};
