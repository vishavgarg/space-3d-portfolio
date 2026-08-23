import React from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { useUIStore } from '../../store/uiStore';
import { Crosshair, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const MobileControls = ({ onMobileKey }) => {
  const { isMobile } = useDeviceCapability();
  const hasStartedExperience = useUIStore((s) => s.hasStartedExperience);

  if (!isMobile || !hasStartedExperience) return null;

  const handleTouchStart = (key) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: key }));
  };

  const handleTouchEnd = (key) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { code: key }));
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 px-6 flex items-end justify-between pointer-events-none select-none">
      {/* Left: D-Pad Directional Controls */}
      <div className="relative w-36 h-36 bg-slate-900/60 rounded-full border border-slate-800 backdrop-blur-md p-2 pointer-events-auto shadow-2xl flex items-center justify-center">
        {/* Up */}
        <button
          onTouchStart={() => handleTouchStart('KeyW')}
          onTouchEnd={() => handleTouchEnd('KeyW')}
          onMouseDown={() => handleTouchStart('KeyW')}
          onMouseUp={() => handleTouchEnd('KeyW')}
          className="absolute top-2 w-10 h-10 rounded-xl bg-slate-800/80 active:bg-cyan-500/80 flex items-center justify-center text-slate-300 active:text-black transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Down */}
        <button
          onTouchStart={() => handleTouchStart('KeyS')}
          onTouchEnd={() => handleTouchEnd('KeyS')}
          onMouseDown={() => handleTouchStart('KeyS')}
          onMouseUp={() => handleTouchEnd('KeyS')}
          className="absolute bottom-2 w-10 h-10 rounded-xl bg-slate-800/80 active:bg-cyan-500/80 flex items-center justify-center text-slate-300 active:text-black transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </button>

        {/* Left */}
        <button
          onTouchStart={() => handleTouchStart('KeyA')}
          onTouchEnd={() => handleTouchEnd('KeyA')}
          onMouseDown={() => handleTouchStart('KeyA')}
          onMouseUp={() => handleTouchEnd('KeyA')}
          className="absolute left-2 w-10 h-10 rounded-xl bg-slate-800/80 active:bg-cyan-500/80 flex items-center justify-center text-slate-300 active:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Right */}
        <button
          onTouchStart={() => handleTouchStart('KeyD')}
          onTouchEnd={() => handleTouchEnd('KeyD')}
          onMouseDown={() => handleTouchStart('KeyD')}
          onMouseUp={() => handleTouchEnd('KeyD')}
          className="absolute right-2 w-10 h-10 rounded-xl bg-slate-800/80 active:bg-cyan-500/80 flex items-center justify-center text-slate-300 active:text-black transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Shoot & Nitro Boost Action Buttons */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Boost Button */}
        <button
          onTouchStart={() => handleTouchStart('ShiftLeft')}
          onTouchEnd={() => handleTouchEnd('ShiftLeft')}
          onMouseDown={() => handleTouchStart('ShiftLeft')}
          onMouseUp={() => handleTouchEnd('ShiftLeft')}
          className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/50 active:bg-purple-500 flex items-center justify-center text-purple-300 active:text-black shadow-lg transition-colors"
        >
          <Zap className="w-6 h-6" />
        </button>

        {/* Shoot Button */}
        <button
          onTouchStart={() => handleTouchStart('KeyF')}
          onTouchEnd={() => handleTouchEnd('KeyF')}
          onMouseDown={() => handleTouchStart('KeyF')}
          onMouseUp={() => handleTouchEnd('KeyF')}
          className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 active:bg-cyan-500 flex items-center justify-center text-cyan-300 active:text-black shadow-lg transition-colors"
        >
          <Crosshair className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
