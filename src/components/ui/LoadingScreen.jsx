import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useTourStore } from '../../store/tourStore';
import { soundEngine } from '../../utils/soundEngine';
import { Play, Compass } from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  const startExperience = useUIStore((s) => s.startExperience);
  const startTour = useTourStore((s) => s.startTour);

  useEffect(() => {
    // Turn off music/ambient sounds while on landing screen
    soundEngine.stopAmbient();

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const isReady = progress >= 100;

  const handleStartTour = () => {
    soundEngine.playWaveStart();
    startExperience();
    startTour();
  };

  const handleFreeRoam = () => {
    soundEngine.playZoneTransition();
    startExperience();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050811]/92 text-slate-100 backdrop-blur-2xl select-none min-h-[100dvh]">
      {/* Ambient radial glow — very subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none mb-3">
          Vishav Garg
        </h1>

        {/* One-liner */}
        <p className="text-sm sm:text-base text-slate-400 font-mono tracking-wide mb-12">
          Senior Frontend Engineer · 3D &amp; WebGL
        </p>

        {/* Two buttons — side by side */}
        <div className="flex items-center gap-4">
          {/* Tour — primary solid white pill */}
          <button
            onClick={handleStartTour}
            disabled={!isReady}
            className="group flex items-center gap-3 pl-7 pr-4 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-semibold text-sm tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.12)] active:scale-[0.97] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Tour</span>
            <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <Play className="w-3 h-3 fill-white" />
            </div>
          </button>

          {/* Roam — ghost outline */}
          <button
            onClick={handleFreeRoam}
            disabled={!isReady}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-transparent hover:bg-white/[0.06] text-slate-300 hover:text-white border border-white/[0.15] hover:border-white/[0.3] font-semibold text-sm tracking-wide active:scale-[0.97] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Roam</span>
          </button>
        </div>
      </div>

      {/* Minimal loading bar — bottom edge */}
      {!isReady && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 z-10">
          <div className="w-full bg-white/[0.06] rounded-full h-[3px] overflow-hidden">
            <div
              className="bg-white/60 h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
