import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { 
  X, 
  HelpCircle, 
  Navigation, 
  Crosshair, 
  Zap, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Smartphone, 
  Keyboard 
} from 'lucide-react';

export const ControlsModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const { isMobile } = useDeviceCapability();

  const [activeTab, setActiveTab] = useState(isMobile ? 'touch' : 'keyboard');

  if (activeModal !== 'controls') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Flight & Interaction Controls</h2>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('touch')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'touch'
                ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>TOUCH / MOBILE</span>
          </button>

          <button
            onClick={() => setActiveTab('keyboard')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'keyboard'
                ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span>KEYBOARD & MOUSE</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-3 font-mono text-xs text-slate-300 overflow-y-auto touch-scroll">
          {activeTab === 'touch' ? (
            <>
              {/* Touch D-Pad */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 font-sans font-medium text-slate-200">
                  <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                  Left Thumb D-Pad
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                  Steer & Turn
                </span>
              </div>

              {/* Touch Altitude */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 font-sans font-medium text-slate-200">
                  <ArrowUp className="w-4 h-4 text-blue-400 shrink-0" />
                  UP / DOWN Buttons
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-blue-300">
                  Ascend / Descend
                </span>
              </div>

              {/* Touch Laser */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 font-sans font-medium text-slate-200">
                  <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
                  FIRE Button
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                  Shoot Laser Blasters
                </span>
              </div>

              {/* Touch Nitro */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 font-sans font-medium text-slate-200">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                  NITRO Button
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300">
                  2x Turbo Flight
                </span>
              </div>

              {/* Touch Warp Drawer */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 font-sans font-medium text-slate-200">
                  <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                  Warp Drawer & Reset
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300">
                  Instant Teleport
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Steer */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                  Steer / Move Drone
                </span>
                <div className="flex gap-1 flex-wrap justify-end">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">W</kbd>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">A</kbd>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">S</kbd>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">D</kbd>
                </div>
              </div>

              {/* Ascend / Fly Up */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-blue-400 shrink-0" />
                  Ascend / Fly Up
                </span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Space</kbd>
                  <span className="text-slate-500 self-center">/</span>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">E</kbd>
                </div>
              </div>

              {/* Descend / Fly Down */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4 text-indigo-400 shrink-0" />
                  Descend / Fly Down
                </span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Ctrl</kbd>
                  <span className="text-slate-500 self-center">/</span>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-cyan-300 font-bold">Q</kbd>
                </div>
              </div>

              {/* Shoot */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-emerald-400 shrink-0" />
                  Shoot Lasers
                </span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-300 font-bold">F</kbd>
                  <span className="text-slate-500 self-center">/</span>
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-300 font-bold">J</kbd>
                </div>
              </div>

              {/* Nitro */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                  Nitro Speed Boost
                </span>
                <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-purple-300 font-bold">Shift</kbd>
              </div>

              {/* Reset */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                  Reset to Vista
                </span>
                <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-amber-300 font-bold">R</kbd>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-slate-400 leading-relaxed font-sans text-xs">
            💡 <strong>Pro-Tip:</strong> Tap directly on 3D landmark portals and floating kiosks anywhere in the scene to open their details immediately!
          </div>
        </div>
      </div>
    </div>
  );
};
