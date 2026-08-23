import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Drone } from './Drone';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { useGameStore } from '../../store/gameStore';
import { soundEngine } from '../../utils/soundEngine';
import { fireDroneProjectile } from '../games/target-range/ProjectileManager';
import { shipClasses } from '../../data/shipData';

export const DroneController = () => {
  const groupRef = useRef();
  const keys = useKeyboardControls();
  
  const setPlayerPosition = usePlayerStore((s) => s.setPosition);
  const setPlayerRotation = usePlayerStore((s) => s.setRotation);
  const setCurrentZone = usePlayerStore((s) => s.setCurrentZone);
  const resetTrigger = usePlayerStore((s) => s.resetTrigger);
  const selectedShip = usePlayerStore((s) => s.selectedShip);
  const showToast = useUIStore((s) => s.showToast);
  const discoverZone = useGameStore((s) => s.discoverZone);

  // Active Ship Class configuration
  const activeClass = shipClasses.find((c) => c.id === selectedShip) || shipClasses[0];
  const mult = activeClass.flightMultipliers;

  // Physics state - Spawn high above Contact & Hire Island overlooking the archipelago
  const pos = useRef(new THREE.Vector3(0, 18, 55));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const rotationY = useRef(Math.PI); // Facing forward across the map (-Z)
  const bankX = useRef(0); // pitch
  const bankZ = useRef(0); // roll
  const lastZone = useRef('contact');
  const lastShotTime = useRef(0);
  const lastResetCount = useRef(0);

  const [isMoving, setIsMoving] = useState(false);

  // Synchronize reset when store resetTrigger fires or KeyR is hit
  const handleReset = () => {
    pos.current.set(0, 18, 55);
    vel.current.set(0, 0, 0);
    rotationY.current = Math.PI;
    bankX.current = 0;
    bankZ.current = 0;
    if (groupRef.current) {
      groupRef.current.position.set(0, 18, 55);
      groupRef.current.rotation.set(0, Math.PI, 0);
    }
    setPlayerPosition([0, 18, 55]);
    setPlayerRotation([0, Math.PI, 0]);
    soundEngine.playZoneTransition();
    showToast('Reset to High Vista', 'Overlooking full archipelago from Contact Island', 'info');
  };

  useEffect(() => {
    if (resetTrigger > 0 && resetTrigger !== lastResetCount.current) {
      lastResetCount.current = resetTrigger;
      handleReset();
    }
  }, [resetTrigger]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Fast, Snappy Arcade Movement Dynamics with Ship Class Multipliers
    const maxSpeed = (keys.boost ? 80 : 42) * mult.maxSpeed;
    const accelRate = (keys.boost ? 120 : 75) * mult.accel;
    const turnSpeed = 4.6 * mult.turnRate;
    const friction = 4.5; // Frame-rate independent dampening

    // Turning (A/D or Left/Right)
    if (keys.left) rotationY.current += turnSpeed * delta;
    if (keys.right) rotationY.current -= turnSpeed * delta;

    // Desired forward/backward acceleration
    let throttle = 0;
    if (keys.forward) throttle += 1;
    if (keys.backward) throttle -= 0.65;

    // Desired vertical acceleration
    let verticalThrottle = 0;
    if (keys.up) verticalThrottle += 1;
    if (keys.down) verticalThrottle -= 1;

    // Forward direction vector
    const forwardX = Math.sin(rotationY.current);
    const forwardZ = Math.cos(rotationY.current);

    if (throttle !== 0) {
      vel.current.x += forwardX * throttle * accelRate * delta;
      vel.current.z += forwardZ * throttle * accelRate * delta;
    }

    if (verticalThrottle !== 0) {
      vel.current.y += verticalThrottle * (accelRate * 0.4) * delta;
    }

    // Apply frame-rate independent friction
    const damping = Math.exp(-friction * delta);
    vel.current.x *= damping;
    vel.current.z *= damping;
    vel.current.y *= damping;

    // Clamp speed
    const currentHorizSpeed = Math.sqrt(vel.current.x * vel.current.x + vel.current.z * vel.current.z);
    if (currentHorizSpeed > maxSpeed) {
      const scale = maxSpeed / currentHorizSpeed;
      vel.current.x *= scale;
      vel.current.z *= scale;
    }

    // Update position
    pos.current.x += vel.current.x * delta;
    pos.current.z += vel.current.z * delta;
    pos.current.y += vel.current.y * delta;

    // Natural Hover Bob
    const hoverBob = Math.sin(state.clock.elapsedTime * 4) * 0.12;

    // Bound altitude & world boundaries
    pos.current.y = THREE.MathUtils.clamp(pos.current.y, 1.2, 42);
    pos.current.x = THREE.MathUtils.clamp(pos.current.x, -95, 95);
    pos.current.z = THREE.MathUtils.clamp(pos.current.z, -120, 95);

    // Responsive Banking (roll on turn) & Pitch (on accelerate)
    const turnFactor = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
    const targetPitch = throttle * 0.35;
    const targetRoll = turnFactor * 0.55 * mult.banking;
    
    bankX.current = THREE.MathUtils.lerp(bankX.current, targetPitch, delta * 10);
    bankZ.current = THREE.MathUtils.lerp(bankZ.current, targetRoll, delta * 10);

    // Apply transforms to 3D Group
    groupRef.current.position.set(pos.current.x, pos.current.y + hoverBob, pos.current.z);
    groupRef.current.rotation.set(bankX.current, rotationY.current, bankZ.current);

    // Sync to store for HUD and camera
    setPlayerPosition([pos.current.x, pos.current.y, pos.current.z]);
    setPlayerRotation([bankX.current, rotationY.current, bankZ.current]);

    const moving = currentHorizSpeed > 0.5;
    if (moving !== isMoving) setIsMoving(moving);

    // Reset key (R)
    if (keys.reset) {
      handleReset();
    }

    // Shooting Lasers (F, J, or Space)
    if (keys.shoot && state.clock.elapsedTime - lastShotTime.current > 0.16) {
      lastShotTime.current = state.clock.elapsedTime;
      soundEngine.playShoot();

      const forwardVecX = Math.sin(rotationY.current);
      const forwardVecZ = Math.cos(rotationY.current);

      fireDroneProjectile(
        pos.current.x,
        pos.current.y + 0.1,
        pos.current.z,
        forwardVecX,
        0,
        forwardVecZ
      );
    }

    // Proximity Zone Detection
    let detectedZone = 'spawn';
    const distToSpawn = pos.current.distanceTo(new THREE.Vector3(0, 0, 0));
    const distToAbout = pos.current.distanceTo(new THREE.Vector3(-45, 0, -20));
    const distToProjects = pos.current.distanceTo(new THREE.Vector3(45, 0, -25));
    const distToSkills = pos.current.distanceTo(new THREE.Vector3(0, 0, -70));
    const distToContact = pos.current.distanceTo(new THREE.Vector3(0, 0, 50));

    if (distToAbout < 18) detectedZone = 'about';
    else if (distToProjects < 22) detectedZone = 'projects';
    else if (distToSkills < 24) detectedZone = 'skills';
    else if (distToContact < 18) detectedZone = 'contact';
    else if (distToSpawn < 20) detectedZone = 'spawn';

    if (detectedZone !== lastZone.current) {
      lastZone.current = detectedZone;
      setCurrentZone(detectedZone);
      discoverZone(detectedZone);
      soundEngine.playZoneTransition();

      const zoneNames = {
        spawn: 'Central Hub & Timeline',
        about: 'About Vishav (Sanctuary)',
        projects: 'Enterprise Projects Gallery',
        skills: 'Skills Target Range Arena',
        contact: 'Contact & Hire Tower'
      };
      showToast(zoneNames[detectedZone] || 'New Zone', 'Entered zone', 'info');
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.8, 0]}>
      <Drone isDriving={isMoving} speedBoost={keys.boost} />
    </group>
  );
};
