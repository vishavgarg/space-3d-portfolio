import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { Skybox } from './components/world/Skybox';
import { Planet } from './components/world/Planet';
import { Lighting } from './components/world/Lighting';
import { DataStreams } from './components/world/DataStreams';
import { Terrain } from './components/world/Terrain';
import { CyberBridges } from './components/world/CyberBridges';
import { DroneController } from './components/vehicle/DroneController';
import { DroneCamera } from './components/vehicle/DroneCamera';
import { TourFlightController } from './components/vehicle/TourFlightController';
import { MobileControls } from './components/vehicle/MobileControls';
import { TargetRange } from './components/games/target-range/TargetRange';
import { ProjectileManager } from './components/games/target-range/ProjectileManager';
import { Platformer } from './components/games/platformer/Platformer';
import { DogfightGame } from './components/games/dogfight/DogfightGame';
import { DogfightHUD } from './components/games/dogfight/DogfightHUD';
import { WarpGateRace } from './components/games/warp-race/WarpGateRace';
import { WarpRaceHUD } from './components/games/warp-race/WarpRaceHUD';

// UI Overlays
import { HUD } from './components/ui/HUD';
import { TourHUD } from './components/ui/TourHUD';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Toast } from './components/ui/Toast';
import { ClassicResume } from './components/ui/ClassicResume';
import { AboutModal } from './components/ui/AboutModal';
import { ProjectModal } from './components/ui/ProjectModal';
import { ProjectsGalleryModal } from './components/ui/ProjectsGalleryModal';
import { SkillsModal } from './components/ui/SkillsModal';
import { ExperienceModal } from './components/ui/ExperienceModal';
import { ContactModal } from './components/ui/ContactModal';
import { ControlsModal } from './components/ui/ControlsModal';
import { HangarModal } from './components/ui/HangarModal';

import { useUIStore } from './store/uiStore';
import { useGameStore } from './store/gameStore';
import { useTourStore } from './store/tourStore';
import { useDeviceCapability } from './hooks/useDeviceCapability';

export default function App() {
  const hasStartedExperience = useUIStore((s) => s.hasStartedExperience);
  const isClassicMode = useUIStore((s) => s.isClassicMode);
  const dogfightActive = useGameStore((s) => s.dogfightActive);
  const warpRaceActive = useGameStore((s) => s.warpRaceActive);
  const isTourActive = useTourStore((s) => s.isTourActive);
  const { pixelRatio, hasWebGL, qualityTier } = useDeviceCapability();

  // If user requested or device does not support WebGL, show accessible Classic Resume
  if (isClassicMode || !hasWebGL) {
    return <ClassicResume />;
  }

  const isArcadeActive = dogfightActive || warpRaceActive;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040711]">
      {/* 3D WebGL Canvas Layer */}
      <Canvas
        shadows
        dpr={pixelRatio}
        camera={{ position: [0, 18, 55], fov: 60, near: 0.5, far: 2000 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          <Skybox qualityTier={qualityTier} />
          {qualityTier !== 'low' && <Planet />}
          <Lighting />

          {/* Render Normal Free-Roam Archipelago when not in mini-game */}
          {!isArcadeActive && (
            <>
              <DataStreams />
              <Terrain />
              <CyberBridges />

              {/* Toggle between Autopilot Guided Tour and Free-Roam Flight */}
              {isTourActive ? (
                <TourFlightController />
              ) : (
                <>
                  <DroneController />
                  <DroneCamera />
                </>
              )}

              <TargetRange />
              <ProjectileManager />
              <Platformer />
            </>
          )}

          {/* Dedicated High-Octane Space Mini-Games */}
          {dogfightActive && <DogfightGame />}
          {warpRaceActive && <WarpGateRace />}

          {/* Cinematic Post-Processing Stack */}
          {qualityTier !== 'low' && (
            <EffectComposer disableNormalPass multisampling={qualityTier === 'high' ? 4 : 0}>
              <Bloom
                luminanceThreshold={0.45}
                luminanceSmoothing={0.85}
                intensity={qualityTier === 'high' ? 0.9 : 0.6}
                mipmapBlur
              />
              <Vignette
                offset={0.3}
                darkness={0.65}
              />
              {qualityTier === 'high' && (
                <ChromaticAberration
                  offset={[0.0006, 0.0006]}
                  radialModulation={false}
                  modulationOffset={0.15}
                />
              )}
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* HTML / CSS Interactive UI Overlay Layer */}
      {!hasStartedExperience ? (
        <LoadingScreen />
      ) : (
        <>
          {/* HUD Layer based on active mode */}
          {!isArcadeActive && !isTourActive && <HUD />}
          {isTourActive && <TourHUD />}
          {dogfightActive && <DogfightHUD />}
          {warpRaceActive && <WarpRaceHUD />}

          <Toast />
          {!isArcadeActive && !isTourActive && <MobileControls />}

          {/* Interactive Modals */}
          <AboutModal />
          <ProjectModal />
          <ProjectsGalleryModal />
          <SkillsModal />
          <ExperienceModal />
          <ContactModal />
          <ControlsModal />
          <HangarModal />
        </>
      )}
    </div>
  );
}
