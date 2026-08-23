import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore, tourStops } from '../../store/tourStore';
import { usePlayerStore } from '../../store/playerStore';
import { Drone } from './Drone';

export const TourFlightController = () => {
  const isTourActive = useTourStore((s) => s.isTourActive);
  const currentStopIndex = useTourStore((s) => s.currentStopIndex);
  const isPaused = useTourStore((s) => s.isPaused);
  const setTransitioning = useTourStore((s) => s.setTransitioning);

  const setPlayerPosition = usePlayerStore((s) => s.setPosition);
  const setCurrentZone = usePlayerStore((s) => s.setCurrentZone);

  const { camera } = useThree();
  const droneGroupRef = useRef();

  const currentPos = useRef(new THREE.Vector3(0, 18, 55));
  const currentLookAt = useRef(new THREE.Vector3(0, 6, 0));
  const currentRotationY = useRef(Math.PI);
  const bankZ = useRef(0);
  const bankX = useRef(0);

  const activeStop = tourStops[currentStopIndex] || tourStops[0];

  // Target vectors
  const targetPos = useRef(new THREE.Vector3(...activeStop.position));
  const targetLookAt = useRef(new THREE.Vector3(...activeStop.lookAt));

  useEffect(() => {
    if (!isTourActive) return;
    targetPos.current.set(...activeStop.position);
    targetLookAt.current.set(...activeStop.lookAt);
    setCurrentZone(activeStop.zone);
    setTransitioning(true);
  }, [isTourActive, currentStopIndex, activeStop, setCurrentZone, setTransitioning]);

  useFrame((state, delta) => {
    if (!isTourActive || !droneGroupRef.current) return;
    if (isPaused) return;

    // Flight Interpolation Speed
    const flightLerp = delta * 2.2;

    // Smoothly glide position toward target stop
    currentPos.current.lerp(targetPos.current, flightLerp);
    currentLookAt.current.lerp(targetLookAt.current, delta * 3.5);

    // Natural Hover Bob
    const hoverBob = Math.sin(state.clock.elapsedTime * 3) * 0.15;
    const renderY = currentPos.current.y + hoverBob;

    // Compute Direction & Heading to face movement or landmark
    const distToTarget = currentPos.current.distanceTo(targetPos.current);
    const isArrived = distToTarget < 0.6;

    if (isArrived) {
      setTransitioning(false);
      // Gentle orbital lookAt angle
      const angleToTarget = Math.atan2(
        targetLookAt.current.x - currentPos.current.x,
        targetLookAt.current.z - currentPos.current.z
      );
      currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, angleToTarget, delta * 3);
      bankZ.current = THREE.MathUtils.lerp(bankZ.current, 0, delta * 4);
      bankX.current = THREE.MathUtils.lerp(bankX.current, 0, delta * 4);
    } else {
      // Dynamic Banking while flying along bridges
      const moveDir = new THREE.Vector3().subVectors(targetPos.current, currentPos.current).normalize();
      const moveAngle = Math.atan2(moveDir.x, moveDir.z);
      currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, moveAngle, delta * 4);

      const turnDelta = THREE.MathUtils.euclideanModulo(moveAngle - currentRotationY.current + Math.PI, Math.PI * 2) - Math.PI;
      bankZ.current = THREE.MathUtils.lerp(bankZ.current, -turnDelta * 1.5, delta * 6);
      bankX.current = THREE.MathUtils.lerp(bankX.current, 0.2, delta * 4);
    }

    // Apply Transforms to 3D Drone Model
    droneGroupRef.current.position.set(currentPos.current.x, renderY, currentPos.current.z);
    droneGroupRef.current.rotation.set(bankX.current, currentRotationY.current, bankZ.current);

    setPlayerPosition([currentPos.current.x, renderY, currentPos.current.z]);

    // Cinematic Third-Person Camera Offset
    const camDistance = 11.0;
    const camHeight = 5.2;

    const desiredCamPos = new THREE.Vector3(
      currentPos.current.x - Math.sin(currentRotationY.current) * camDistance,
      renderY + camHeight,
      currentPos.current.z - Math.cos(currentRotationY.current) * camDistance
    );

    camera.position.lerp(desiredCamPos, delta * 4);
    camera.lookAt(currentLookAt.current);
  });

  if (!isTourActive) return null;

  return (
    <group ref={droneGroupRef} position={[0, 18, 55]}>
      <Drone isDriving={true} speedBoost={false} />
    </group>
  );
};
