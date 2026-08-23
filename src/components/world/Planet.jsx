import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 100% NaN-Safe Fresnel Atmosphere Glow Shader
const AtmosphereShaderMaterial = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform float uIntensity;

    void main() {
      vec3 viewDir = normalize(-vPosition);
      vec3 norm = normalize(vNormal);
      float ndotv = clamp(dot(viewDir, norm), 0.0, 1.0);
      float fresnel = clamp(1.0 - ndotv, 0.0, 1.0);
      fresnel = pow(fresnel, 2.2);

      float alpha = clamp(fresnel * uIntensity, 0.0, 1.0);
      gl_FragColor = vec4(uColor, alpha);
    }
  `
};

// 100% NaN-Safe Gas Giant Planet Surface Shader
const PlanetSurfaceShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    float hash(float n) { return fract(sin(n) * 1e4); }
    float noise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i.x + i.y * 57.0);
      float b = hash(i.x + 1.0 + i.y * 57.0);
      float c = hash(i.x + (i.y + 1.0) * 57.0);
      float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      float lat = vPosition.y * 0.08 + uTime * 0.012;
      float band = clamp(sin(lat * 12.0) * 0.5 + 0.5, 0.0, 1.0);
      float rawNoise = noise(vec2(vPosition.x * 0.06, lat * 5.0));
      float detail = clamp(rawNoise, 0.0, 1.0);
      
      // Deep Space Gas Giant Color Palette
      vec3 colorA = vec3(0.06, 0.12, 0.30); // Deep Navy
      vec3 colorB = vec3(0.18, 0.40, 0.75); // Azure Cobalt
      vec3 colorC = vec3(0.00, 0.85, 0.95); // Luminous Cyan Stream
      vec3 colorD = vec3(0.50, 0.18, 0.70); // Violet Auroral Haze

      vec3 base = mix(colorA, colorB, band);
      base = mix(base, colorC, pow(detail, 2.0) * 0.4);
      base = mix(base, colorD, clamp(sin(lat * 3.0) * 0.3 + 0.3, 0.0, 1.0));

      // Light direction + Ambient space glow so planet is never pitch-black
      vec3 lightDir = normalize(vec3(0.8, 1.0, 0.5));
      vec3 norm = normalize(vNormal);
      float diff = clamp(dot(norm, lightDir), 0.0, 1.0) * 0.9;
      vec3 ambientSpace = vec3(0.14, 0.20, 0.35);

      vec3 finalRgb = clamp(base * (diff + 0.45) + ambientSpace * 0.35, 0.0, 1.0);
      gl_FragColor = vec4(finalRgb, 1.0);
    }
  `
};

export const Planet = ({ position = [135, 70, -185], radius = 42 }) => {
  const planetRef = useRef();
  const atmosphereRef = useRef();
  const ringsRef = useRef();

  const planetUniforms = useMemo(
    () => ({
      uTime: { value: 0 }
    }),
    []
  );

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#00f0ff') },
      uIntensity: { value: 1.4 }
    }),
    []
  );

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.02;
      planetUniforms.uTime.value = state.clock.elapsedTime * 0.4;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.006;
    }
  });

  return (
    <group position={position}>
      {/* 1. Core Gas Giant Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <shaderMaterial
          vertexShader={PlanetSurfaceShader.vertexShader}
          fragmentShader={PlanetSurfaceShader.fragmentShader}
          uniforms={planetUniforms}
        />
      </mesh>

      {/* 2. Atmospheric Fresnel Glow Halo (Outer Sphere) */}
      <mesh ref={atmosphereRef} scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[radius, 36, 36]} />
        <shaderMaterial
          vertexShader={AtmosphereShaderMaterial.vertexShader}
          fragmentShader={AtmosphereShaderMaterial.fragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Outer Planetary Ring System (Saturn style tilted disc) */}
      <group rotation={[Math.PI * 0.32, Math.PI * 0.18, 0]} ref={ringsRef}>
        {/* Main Inner Ring Band */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.35, radius * 1.85, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Outer Ring Accent Band */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.92, radius * 2.3, 48]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#7928ca"
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Glowing Edge Border Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 2.29, radius * 2.32, 48]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
