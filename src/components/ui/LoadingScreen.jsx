import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useTourStore } from '../../store/tourStore';
import { Compass, Sparkles, Zap, ArrowRight, Play, FileText } from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const startExperience = useUIStore((s) => s.startExperience);
  const setClassicMode = useUIStore((s) => s.setClassicMode);
  const startTour = useTourStore((s) => s.startTour);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const isReady = progress >= 100;

  const handleStartTour = () => {
    startExperience();
    startTour();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a12] text-white overflow-hidden p-6">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Glowing Drone Badge Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 border border-cyan-500/40 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(0,240,255,0.3)] animate-float">
          <Zap className="w-10 h-10 text-cyan-400" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white mb-2">
          VISHAV GARG
        </h1>
        <p className="text-sm sm:text-base font-mono text-cyan-400 mb-6 tracking-wide">
          SENIOR FRONTEND ENGINEER • 3D ARCHIPELAGO
        </p>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
            ★ 6+ Years Experience
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
            🏢 Toyota TMNA & Pampers (P&G)
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
            ⚡ React • Next.js • WebGL
          </span>
        </div>

        {/* Loading Bar */}
        <div className="w-full bg-slate-900/90 rounded-full h-3 border border-slate-800 p-0.5 mb-4 shadow-inner">
          <div
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(0,240,255,0.6)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-xs font-mono text-slate-400 mb-8">
          <span>{isReady ? 'SYSTEMS ONLINE' : 'INITIALIZING 3D ENGINE & SHADERS...'}</span>
          <span className="text-cyan-400">{Math.min(progress, 100)}%</span>
        </div>

        {/* Enter Experience Buttons */}
        {isReady ? (
          <div className="flex flex-col gap-3 w-full max-w-md">
            {/* Recommended: Guided Tour */}
            <button
              onClick={handleStartTour}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer text-sm"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>START GUIDED TOUR (RECOMMENDED)</span>
            </button>

            <div className="flex gap-2.5 w-full">
              {/* Free Roam */}
              <button
                onClick={startExperience}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>FREE ROAM FLIGHT</span>
              </button>

              {/* Classic CV */}
              <button
                onClick={() => {
                  setClassicMode(true);
                  startExperience();
                }}
                className="py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <FileText className="w-4 h-4 text-pink-400" />
                <span>CLASSIC CV</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Assembling interactive archipelago...</span>
          </div>
        )}

        <div className="mt-8 text-xs text-slate-500 font-sans">
          Tip: Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-cyan-300">WASD</kbd> to steer,
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-cyan-300">Space</kbd>/<kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-cyan-300">Ctrl</kbd> for altitude.
        </div>
      </div>
    </div>
  );
};
