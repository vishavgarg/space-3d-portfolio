import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { X, HelpCircle, Navigation, Crosshair, Zap, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';

export const ControlsModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);

  if (activeModal !== 'controls') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white font-sans">Flight & Interaction Controls</h2>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3.5 font-mono text-xs text-slate-300">
          {/* Steer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              Steer / Move Drone
            </span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">W</kbd>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">A</kbd>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">S</kbd>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">D</kbd>
              <span className="text-slate-500 self-center">or</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">▲◀▼▶</kbd>
            </div>
          </div>

          {/* Ascend / Fly Up */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4 text-cyan-400" />
              Ascend / Fly Upwards
            </span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Space</kbd>
              <span className="text-slate-500 self-center">or</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">E</kbd>
            </div>
          </div>

          {/* Descend / Fly Down */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-cyan-400" />
              Descend / Fly Downwards
            </span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Ctrl</kbd>
              <span className="text-slate-500 self-center">or</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Q</kbd>
              <span className="text-slate-500 self-center">or</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">C</kbd>
            </div>
          </div>

          {/* Shoot */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              Shoot Laser Cannons
            </span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-300 font-bold">F</kbd>
              <span className="text-slate-500 self-center">or</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-300 font-bold">J</kbd>
            </div>
          </div>

          {/* Nitro */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Nitro Speed Boost
            </span>
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-purple-300 font-bold">Shift</kbd>
          </div>

          {/* Reset */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              Reset Position to Vista
            </span>
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-amber-300 font-bold">R</kbd>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-slate-400 leading-relaxed font-sans text-xs">
            💡 <strong>Pro-Tip:</strong> Click directly on 3D landmarks, portals, arcade launch bays, and kiosks in the scene to open their details instantly!
          </div>
        </div>
      </div>
    </div>
  );
};
