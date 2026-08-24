import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { X, Shield, Gauge, Zap, Compass, Check, Rocket } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { shipClasses, thrusterColorPresets } from '../../data/shipData';
import { ShipModel } from '../vehicle/ShipModel';
import { soundEngine } from '../../utils/soundEngine';

// Rotating Turntable Preview inside Hangar Modal
const HangarTurntable = ({ shipId, thrusterColor }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.75;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Platform Glow Ring */}
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.0, 36]} />
        <meshBasicMaterial color={thrusterColor} />
      </mesh>
      <mesh position={[0, -1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 36]} />
        <meshStandardMaterial color="#0b1329" roughness={0.7} metalness={0.4} />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <ShipModel
          shipId={shipId}
          thrusterColor={thrusterColor}
          isDriving={true}
          speedBoost={false}
        />
      </Float>
    </group>
  );
};

export const HangarModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const showToast = useUIStore((s) => s.showToast);

  const selectedShip = usePlayerStore((s) => s.selectedShip);
  const thrusterColor = usePlayerStore((s) => s.thrusterColor);
  const setShip = usePlayerStore((s) => s.setShip);
  const setThrusterColor = usePlayerStore((s) => s.setThrusterColor);

  const [previewShip, setPreviewShip] = useState(selectedShip);
  const [previewColor, setPreviewColor] = useState(thrusterColor);

  if (activeModal !== 'hangar') return null;

  const currentClass = shipClasses.find((c) => c.id === previewShip) || shipClasses[0];

  const handleDeploy = () => {
    setShip(previewShip);
    setThrusterColor(previewColor);
    soundEngine.playWaveStart();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    showToast('🚀 Vessel Deployed!', `${currentClass.name} ready for flight.`, 'success');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                STARFLEET HANGAR
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono">
                Select ship chassis architecture & configure ion thrusters
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto touch-scroll">
          {/* Left Column: 3D Turntable Viewport (5 cols) */}
          <div className="lg:col-span-5 h-56 sm:h-72 lg:h-auto min-h-[220px] sm:min-h-[280px] bg-radial from-slate-900 to-[#060a14] relative border-b lg:border-b-0 lg:border-r border-slate-800 flex items-center justify-center">
            <Canvas
              camera={{ position: [0, 2.8, 5.2], fov: 45 }}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
              <pointLight position={[-10, -5, -5]} intensity={1.0} color={previewColor} />

              <Suspense fallback={null}>
                <HangarTurntable shipId={previewShip} thrusterColor={previewColor} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
              </Suspense>
            </Canvas>

            {/* 360° Drag Helper Tag */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] font-mono text-slate-400 backdrop-blur-md">
                🖱️ Drag to rotate 360°
              </span>
            </div>
          </div>

          {/* Right Column: Customization Controls & Specs (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Ship Class Selection Tabs */}
              <div>
                <label className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                  1. Select Ship Archetype
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {shipClasses.map((sClass) => {
                    const isSelected = previewShip === sClass.id;
                    return (
                      <button
                        key={sClass.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setPreviewShip(sClass.id);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold font-sans block">{sClass.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 block mt-1">
                          {sClass.id === 'scout' ? 'Agile Quad' : sClass.id === 'interceptor' ? 'High-Speed' : 'Heavy Armor'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ship Specs & Performance Bars */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white font-sans">{currentClass.name}</h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5 leading-relaxed">
                    {currentClass.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 font-mono text-xs">
                  {/* Top Speed */}
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-cyan-400" /> Top Speed</span>
                      <span className="text-cyan-300 font-bold">{currentClass.stats.speed}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: `${currentClass.stats.speed}%` }} />
                    </div>
                  </div>

                  {/* Acceleration */}
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Accel</span>
                      <span className="text-amber-300 font-bold">{currentClass.stats.acceleration}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full transition-all duration-300" style={{ width: `${currentClass.stats.acceleration}%` }} />
                    </div>
                  </div>

                  {/* Handling */}
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-emerald-400" /> Handling</span>
                      <span className="text-emerald-300 font-bold">{currentClass.stats.handling}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full transition-all duration-300" style={{ width: `${currentClass.stats.handling}%` }} />
                    </div>
                  </div>

                  {/* Armor */}
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-purple-400" /> Shielding</span>
                      <span className="text-purple-300 font-bold">{currentClass.stats.shielding}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full transition-all duration-300" style={{ width: `${currentClass.stats.shielding}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thruster Spectrum Palette */}
              <div>
                <label className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                  2. Ion Thruster & Laser Spectrum
                </label>
                <div className="flex items-center gap-3">
                  {thrusterColorPresets.map((preset) => {
                    const isSelected = previewColor === preset.hex;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setPreviewColor(preset.hex);
                        }}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                          isSelected ? `ring-2 ring-white scale-110 shadow-lg` : 'hover:scale-105 opacity-75 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: preset.hex, boxShadow: `0 0 15px ${preset.hex}40` }}
                        title={preset.name}
                      >
                        {isSelected && <Check className="w-5 h-5 text-black stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Deploy Button */}
            <div className="pt-3">
              <button
                onClick={handleDeploy}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-sans text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>DEPLOY VESSEL TO FLEET</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
