import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom Star Points Shader with soft circular point sprites and per-star twinkling
const StarShaderMaterial = {
  vertexShader: `
    attribute float aSize;
    attribute vec3 aColor;
    attribute float aTwinkleOffset;
    varying vec3 vColor;
    varying float vTwinkle;
    uniform float uTime;

    void main() {
      vColor = aColor;
      // Twinkle pulsation using sine wave
      float twinkle = sin(uTime * 2.5 + aTwinkleOffset) * 0.35 + 0.65;
      vTwinkle = twinkle;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (350.0 / -mvPosition.z) * twinkle;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      // Circular soft point shape
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;

      // Soft circular gradient falloff
      float alpha = smoothstep(0.5, 0.05, dist) * vTwinkle;
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};

export const Skybox = ({ qualityTier = 'high' }) => {
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const layer3Ref = useRef();

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  // Layer 1: Distant Background Stars (dense, small, cool & warm mix)
  const layer1Data = useMemo(() => {
    const count = qualityTier === 'low' ? 800 : qualityTier === 'medium' ? 1800 : 3200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#bae6fd'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#fef08a'), // warm yellow dwarf
      new THREE.Color('#fbcfe8')  // faint nebula pink
    ];

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 260 + Math.random() * 80;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) + 5;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 1.2 + Math.random() * 1.8;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, twinkleOffsets, count };
  }, [qualityTier]);

  // Layer 2: Mid-Depth Bright Stars (twinkling prominently)
  const layer2Data = useMemo(() => {
    const count = qualityTier === 'low' ? 300 : 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    const brightColors = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#7dd3fc'),
      new THREE.Color('#a78bfa')
    ];

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 180 + Math.random() * 60;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) + 8;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = brightColors[Math.floor(Math.random() * brightColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 2.4 + Math.random() * 2.6;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, twinkleOffsets, count };
  }, [qualityTier]);

  // Layer 3: Foreground Parallax Star Cluster / Cosmic Dust
  const layer3Data = useMemo(() => {
    const count = qualityTier === 'low' ? 80 : 220;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 90 + Math.random() * 60;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) + 4;
      positions[i * 3 + 2] = r * Math.cos(phi);

      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.94;
      colors[i * 3 + 2] = 1.0;

      sizes[i] = 3.0 + Math.random() * 3.2;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, twinkleOffsets, count };
  }, [qualityTier]);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (layer1Ref.current) layer1Ref.current.rotation.y += delta * 0.004;
    if (layer2Ref.current) layer2Ref.current.rotation.y += delta * 0.012;
    if (layer3Ref.current) {
      layer3Ref.current.rotation.y += delta * 0.024;
      layer3Ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <group>
      {/* 1. Deep Space Atmospheric Gradient Dome */}
      <mesh scale={[-700, -700, -700]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#040711"
          side={THREE.BackSide}
        />
      </mesh>

      {/* 2. Parallax Starfield Layer 1 (Distant) */}
      <points ref={layer1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={layer1Data.count}
            array={layer1Data.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={layer1Data.count}
            array={layer1Data.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={layer1Data.count}
            array={layer1Data.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aTwinkleOffset"
            count={layer1Data.count}
            array={layer1Data.twinkleOffsets}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={StarShaderMaterial.vertexShader}
          fragmentShader={StarShaderMaterial.fragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Parallax Starfield Layer 2 (Mid-ground Bright) */}
      <points ref={layer2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={layer2Data.count}
            array={layer2Data.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={layer2Data.count}
            array={layer2Data.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={layer2Data.count}
            array={layer2Data.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aTwinkleOffset"
            count={layer2Data.count}
            array={layer2Data.twinkleOffsets}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={StarShaderMaterial.vertexShader}
          fragmentShader={StarShaderMaterial.fragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Parallax Starfield Layer 3 (Foreground Fast Parallax) */}
      {qualityTier !== 'low' && (
        <points ref={layer3Ref}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={layer3Data.count}
              array={layer3Data.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aColor"
              count={layer3Data.count}
              array={layer3Data.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aSize"
              count={layer3Data.count}
              array={layer3Data.sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aTwinkleOffset"
              count={layer3Data.count}
              array={layer3Data.twinkleOffsets}
              itemSize={1}
            />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={StarShaderMaterial.vertexShader}
            fragmentShader={StarShaderMaterial.fragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}

      {/* 5. Horizon Cosmic Grid / Dust Nebula Halo */}
      <mesh position={[0, -18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[140, 320, 64]} />
        <meshBasicMaterial
          color="#021020"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
