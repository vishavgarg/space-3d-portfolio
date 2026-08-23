import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useUIStore } from '../../store/uiStore';

// Helper to generate 2D vector Shape for letters
function createLetterShape(char) {
  const shape = new THREE.Shape();

  switch (char) {
    case 'V':
      shape.moveTo(0, 2.0);
      shape.lineTo(0.38, 2.0);
      shape.lineTo(0.7, 0.45);
      shape.lineTo(1.02, 2.0);
      shape.lineTo(1.4, 2.0);
      shape.lineTo(0.88, 0);
      shape.lineTo(0.52, 0);
      shape.closePath();
      break;

    case 'I':
      shape.moveTo(0.1, 0);
      shape.lineTo(0.55, 0);
      shape.lineTo(0.55, 2.0);
      shape.lineTo(0.1, 2.0);
      shape.closePath();
      break;

    case 'S':
      shape.moveTo(0.05, 0.4);
      shape.lineTo(0.4, 0.4);
      shape.lineTo(0.4, 0.35);
      shape.lineTo(1.0, 0.35);
      shape.lineTo(1.0, 0.85);
      shape.lineTo(0.2, 1.05);
      shape.lineTo(0.05, 1.2);
      shape.lineTo(0.05, 2.0);
      shape.lineTo(1.35, 2.0);
      shape.lineTo(1.35, 1.6);
      shape.lineTo(0.42, 1.6);
      shape.lineTo(0.42, 1.35);
      shape.lineTo(1.15, 1.15);
      shape.lineTo(1.35, 0.95);
      shape.lineTo(1.35, 0);
      shape.lineTo(0.05, 0);
      shape.closePath();
      break;

    case 'H':
      shape.moveTo(0, 0);
      shape.lineTo(0.36, 0);
      shape.lineTo(0.36, 0.82);
      shape.lineTo(0.94, 0.82);
      shape.lineTo(0.94, 0);
      shape.lineTo(1.3, 0);
      shape.lineTo(1.3, 2.0);
      shape.lineTo(0.94, 2.0);
      shape.lineTo(0.94, 1.18);
      shape.lineTo(0.36, 1.18);
      shape.lineTo(0.36, 2.0);
      shape.lineTo(0, 2.0);
      shape.closePath();
      break;

    case 'A': {
      shape.moveTo(0, 0);
      shape.lineTo(0.38, 0);
      shape.lineTo(0.52, 0.7);
      shape.lineTo(0.88, 0.7);
      shape.lineTo(1.02, 0);
      shape.lineTo(1.4, 0);
      shape.lineTo(0.88, 2.0);
      shape.lineTo(0.52, 2.0);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.58, 1.02);
      hole.lineTo(0.82, 1.02);
      hole.lineTo(0.7, 1.55);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }

    case 'G':
      shape.moveTo(0.2, 0);
      shape.lineTo(1.3, 0);
      shape.lineTo(1.3, 1.0);
      shape.lineTo(0.75, 1.0);
      shape.lineTo(0.75, 0.65);
      shape.lineTo(0.94, 0.65);
      shape.lineTo(0.94, 0.35);
      shape.lineTo(0.36, 0.35);
      shape.lineTo(0.36, 1.65);
      shape.lineTo(0.94, 1.65);
      shape.lineTo(0.94, 1.35);
      shape.lineTo(1.3, 1.35);
      shape.lineTo(1.3, 2.0);
      shape.lineTo(0.2, 2.0);
      shape.lineTo(0, 1.7);
      shape.lineTo(0, 0.3);
      shape.closePath();
      break;

    case 'R': {
      shape.moveTo(0, 0);
      shape.lineTo(0.36, 0);
      shape.lineTo(0.36, 0.78);
      shape.lineTo(0.78, 0.78);
      shape.lineTo(1.05, 0);
      shape.lineTo(1.4, 0);
      shape.lineTo(1.05, 0.92);
      shape.lineTo(1.35, 1.25);
      shape.lineTo(1.35, 2.0);
      shape.lineTo(0, 2.0);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.36, 1.15);
      hole.lineTo(0.96, 1.15);
      hole.lineTo(0.96, 1.65);
      hole.lineTo(0.36, 1.65);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }

    default:
      shape.moveTo(0, 0);
      shape.lineTo(1, 0);
      shape.lineTo(1, 2);
      shape.lineTo(0, 2);
      shape.closePath();
      break;
  }

  return shape;
}

// Extruded 3D Letter Component
const Letter3D = ({ char, position, color = '#00f0ff', emissive = '#00f0ff', isHovered, onHover, onUnhover, onClick }) => {
  const meshRef = useRef();

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.05
    }),
    []
  );

  const geometry = useMemo(() => {
    const shape = createLetterShape(char);
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [char, extrudeSettings]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetY = isHovered ? position[1] + 0.3 : position[1];
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 8);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      castShadow
      receiveShadow
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        onUnhover();
      }}
    >
      <meshStandardMaterial
        color={isHovered ? '#ffffff' : color}
        emissive={emissive}
        emissiveIntensity={isHovered ? 1.4 : 0.4}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

export const NameSculpture3D = () => {
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const showToast = useUIStore((s) => s.showToast);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const firstName = ['V', 'I', 'S', 'H', 'A', 'V'];
  const lastName = ['G', 'A', 'R', 'G'];

  // Letter spacing and layout
  const firstLetterSpacing = 1.6;
  const firstStartX = -((firstName.length - 1) * firstLetterSpacing) / 2 - 0.4;

  const lastLetterSpacing = 1.6;
  const lastStartX = -((lastName.length - 1) * lastLetterSpacing) / 2 - 0.4;

  const handleClick = () => {
    setActiveModal('about');
    showToast('Vishav Garg', 'Senior Frontend Engineer • Clicked 3D Name', 'info');
  };

  return (
    <group position={[0, 0, -2]}>
      {/* Sleek Minimalist Circular Ground Halo */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[6.5, 6.6, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6.5, 64]} />
        <meshStandardMaterial color="#0c1322" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Row 1: V I S H A V (Standing in 3D) */}
      <group position={[0, 0.05, -1.2]}>
        {firstName.map((char, idx) => (
          <Letter3D
            key={`first-${idx}`}
            char={char}
            position={[firstStartX + idx * firstLetterSpacing, 0, 0]}
            color="#e2e8f0"
            emissive="#00f0ff"
            isHovered={hoveredIndex === idx}
            onHover={() => setHoveredIndex(idx)}
            onUnhover={() => setHoveredIndex(null)}
            onClick={handleClick}
          />
        ))}
      </group>

      {/* Row 2: G A R G (Standing in 3D) */}
      <group position={[0, 0.05, 1.2]}>
        {lastName.map((char, idx) => (
          <Letter3D
            key={`last-${idx}`}
            char={char}
            position={[lastStartX + idx * lastLetterSpacing, 0, 0]}
            color="#00f0ff"
            emissive="#00f0ff"
            isHovered={hoveredIndex === idx + 10}
            onHover={() => setHoveredIndex(idx + 10)}
            onUnhover={() => setHoveredIndex(null)}
            onClick={handleClick}
          />
        ))}
      </group>

      {/* Minimalist Sleek Subtitle Bar */}
      <group position={[0, 0.1, 3.2]}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9, 0.5]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <Text
          position={[0, 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.24}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          SENIOR FRONTEND & FULL STACK ARCHITECT
        </Text>
      </group>

      {/* Subtle Minimalist Interaction Prompt */}
      <Text
        position={[0, 0.08, 4.0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.16}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        [ CLICK 3D NAME TO VIEW BIO ]
      </Text>
    </group>
  );
};
