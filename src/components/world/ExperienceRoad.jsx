import React from 'react';
import { Text } from '@react-three/drei';
import { experienceData } from '../../data/experienceData';
import { useUIStore } from '../../store/uiStore';

export const ExperienceRoad = () => {
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const showToast = useUIStore((s) => s.showToast);

  const markers = [
    { pos: [-12, 0, 8], data: experienceData[2] }, // Daryl (2020)
    { pos: [-12, 0, 0], data: experienceData[1] }, // Code Garage (2022)
    { pos: [-12, 0, -8], data: experienceData[0] } // Omnicom (2023-Present)
  ];

  return (
    <group>
      {/* Experience Path Guideway */}
      <mesh position={[-12, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 24]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Path glowing border lines */}
      <mesh position={[-13.5, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 24]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[-10.5, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 24]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Milestone Pillars */}
      {markers.map((m, idx) => (
        <group
          key={m.data.id}
          position={m.pos}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModal('experience');
            showToast('Career Milestone', `${m.data.role} at ${m.data.company}`, 'info');
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Base Pedestal */}
          <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 1, 1.2, 8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Glowing Crystal */}
          <mesh position={[0, 1.8, 0]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={m.data.badgeColor}
              emissive={m.data.badgeColor}
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          </mesh>

          {/* Pillar Ring */}
          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[0.65, 0.04, 8, 24]} />
            <meshBasicMaterial color={m.data.badgeColor} />
          </mesh>

          {/* Floating Year / Company Text */}
          <Text
            position={[0, 2.7, 0]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#0a0d14"
          >
            {m.data.company}
          </Text>
          <Text
            position={[0, 2.35, 0]}
            fontSize={0.24}
            color={m.data.badgeColor}
            anchorX="center"
            anchorY="middle"
          >
            {m.data.period}
          </Text>
        </group>
      ))}

      {/* Road Title in 3D Space */}
      <Text
        position={[-12, 0.1, 13]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
      >
        ★ CAREER TIMELINE WAY ★
      </Text>
    </group>
  );
};
