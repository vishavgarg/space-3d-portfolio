import React from 'react';

export const Lighting = () => {
  return (
    <group>
      {/* 1. Subtle High-Contrast Space Ambient Fill */}
      <ambientLight intensity={0.16} color="#38bdf8" />

      {/* 2. Soft Deep-Space Hemisphere Light */}
      <hemisphereLight
        skyColor="#0284c7"
        groundColor="#020617"
        intensity={0.25}
      />

      {/* 3. Main Directional Cosmic Sun (High Intensity, Crisp Shadows) */}
      <directionalLight
        position={[50, 70, 40]}
        intensity={2.6}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={260}
        shadow-camera-left={-75}
        shadow-camera-right={75}
        shadow-camera-top={75}
        shadow-camera-bottom={-75}
        shadow-bias={-0.0003}
      />

      {/* 4. Cyan Rim / Edge Backlight (The Classic Sci-Fi Vacuum Lighting Trick) */}
      <directionalLight
        position={[-60, 35, -60]}
        intensity={0.9}
        color="#00f0ff"
      />

      {/* 5. Violet Atmospheric Edge Accent */}
      <directionalLight
        position={[25, -20, -40]}
        intensity={0.4}
        color="#a855f7"
      />

      {/* 6. Dynamic Point Lights on Key Landmarks */}
      {/* Spawn Island */}
      <pointLight position={[0, 4, 0]} intensity={1.5} distance={22} color="#00f0ff" />

      {/* About Island */}
      <pointLight position={[-45, 7, -20]} intensity={1.8} distance={28} color="#ec4899" />

      {/* Projects Island */}
      <pointLight position={[45, 7, -25]} intensity={1.8} distance={32} color="#3b82f6" />

      {/* Skills Arena */}
      <pointLight position={[0, 7, -70]} intensity={2.2} distance={38} color="#10b981" />

      {/* Contact Radio Tower */}
      <pointLight position={[0, 18, 50]} intensity={2.8} distance={35} color="#ff007f" />
    </group>
  );
};
