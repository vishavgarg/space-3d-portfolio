import React, { useState, useCallback } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { useUIStore } from '../../store/uiStore';
import { 
  Crosshair, 
  Zap, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  ChevronsUp,
  ChevronsDown,
  RotateCcw
} from 'lucide-react';

export const MobileControls = () => {
  const { isMobile } = useDeviceCapability();
  const hasStartedExperience = useUIStore((s) => s.hasStartedExperience);

  const [activeButtons, setActiveButtons] = useState({});

  const triggerVibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  };

  const setControlState = useCallback((action, keyCode, active) => {
    setActiveButtons((prev) => ({ ...prev, [action]: active }));

    // Dispatch custom flight control event
    window.dispatchEvent(
      new CustomEvent('flight-control', {
        detail: { action, active }
      })
    );

    // Dispatch keyboard event for legacy listeners
    const eventType = active ? 'keydown' : 'keyup';
    window.dispatchEvent(new KeyboardEvent(eventType, { code: keyCode, key: keyCode }));

    if (active) triggerVibrate();
  }, []);

  if (!isMobile || !hasStartedExperience) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-40 px-3 sm:px-6 flex items-end justify-between pointer-events-none select-none pb-safe">
      {/* LEFT: 4-Way Steering D-Pad */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-slate-950/75 rounded-3xl border border-cyan-500/30 backdrop-blur-xl p-2 pointer-events-auto shadow-[0_0_30px_rgba(0,0,0,0.6)] flex items-center justify-center touch-none">
        {/* Center Indicator */}
        <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700/60 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400/60 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* FORWARD (W) */}
        <button
          onTouchStart={(e) => { e.preventDefault(); setControlState('forward', 'KeyW', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setControlState('forward', 'KeyW', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setControlState('forward', 'KeyW', false); }}
          onMouseDown={() => setControlState('forward', 'KeyW', true)}
          onMouseUp={() => setControlState('forward', 'KeyW', false)}
          onMouseLeave={() => setControlState('forward', 'KeyW', false)}
          className={`absolute top-2 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            activeButtons.forward
              ? 'bg-cyan-400 text-slate-950 scale-95 shadow-[0_0_15px_#00f0ff]'
              : 'bg-slate-900/90 border border-slate-700/80 text-slate-300'
          }`}
          aria-label="Forward"
        >
          <ArrowUp className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* BACKWARD (S) */}
        <button
          onTouchStart={(e) => { e.preventDefault(); setControlState('backward', 'KeyS', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setControlState('backward', 'KeyS', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setControlState('backward', 'KeyS', false); }}
          onMouseDown={() => setControlState('backward', 'KeyS', true)}
          onMouseUp={() => setControlState('backward', 'KeyS', false)}
          onMouseLeave={() => setControlState('backward', 'KeyS', false)}
          className={`absolute bottom-2 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            activeButtons.backward
              ? 'bg-cyan-400 text-slate-950 scale-95 shadow-[0_0_15px_#00f0ff]'
              : 'bg-slate-900/90 border border-slate-700/80 text-slate-300'
          }`}
          aria-label="Backward"
        >
          <ArrowDown className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* TURN LEFT (A) */}
        <button
          onTouchStart={(e) => { e.preventDefault(); setControlState('left', 'KeyA', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setControlState('left', 'KeyA', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setControlState('left', 'KeyA', false); }}
          onMouseDown={() => setControlState('left', 'KeyA', true)}
          onMouseUp={() => setControlState('left', 'KeyA', false)}
          onMouseLeave={() => setControlState('left', 'KeyA', false)}
          className={`absolute left-2 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            activeButtons.left
              ? 'bg-cyan-400 text-slate-950 scale-95 shadow-[0_0_15px_#00f0ff]'
              : 'bg-slate-900/90 border border-slate-700/80 text-slate-300'
          }`}
          aria-label="Turn Left"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* TURN RIGHT (D) */}
        <button
          onTouchStart={(e) => { e.preventDefault(); setControlState('right', 'KeyD', true); }}
          onTouchEnd={(e) => { e.preventDefault(); setControlState('right', 'KeyD', false); }}
          onTouchCancel={(e) => { e.preventDefault(); setControlState('right', 'KeyD', false); }}
          onMouseDown={() => setControlState('right', 'KeyD', true)}
          onMouseUp={() => setControlState('right', 'KeyD', false)}
          onMouseLeave={() => setControlState('right', 'KeyD', false)}
          className={`absolute right-2 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            activeButtons.right
              ? 'bg-cyan-400 text-slate-950 scale-95 shadow-[0_0_15px_#00f0ff]'
              : 'bg-slate-900/90 border border-slate-700/80 text-slate-300'
          }`}
          aria-label="Turn Right"
        >
          <ArrowRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* RIGHT: Action Cluster (Altitude, Nitro, Laser, Reset) */}
      <div className="flex items-end gap-2.5 sm:gap-3 pointer-events-auto touch-none">
        {/* Altitude Column (Ascend / Descend) */}
        <div className="flex flex-col gap-2">
          {/* Ascend / Fly Up (Space) */}
          <button
            onTouchStart={(e) => { e.preventDefault(); setControlState('up', 'Space', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControlState('up', 'Space', false); }}
            onTouchCancel={(e) => { e.preventDefault(); setControlState('up', 'Space', false); }}
            onMouseDown={() => setControlState('up', 'Space', true)}
            onMouseUp={() => setControlState('up', 'Space', false)}
            onMouseLeave={() => setControlState('up', 'Space', false)}
            className={`w-12 h-12 rounded-2xl border flex flex-col items-center justify-center transition-all ${
              activeButtons.up
                ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_20px_#3b82f6] scale-95'
                : 'bg-slate-950/80 border-blue-500/40 text-blue-300'
            }`}
            aria-label="Ascend"
            title="Fly Up (Space)"
          >
            <ChevronsUp className="w-5 h-5" />
            <span className="text-[9px] font-mono font-bold leading-none">UP</span>
          </button>

          {/* Descend / Fly Down (Ctrl / C) */}
          <button
            onTouchStart={(e) => { e.preventDefault(); setControlState('down', 'ControlLeft', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControlState('down', 'ControlLeft', false); }}
            onTouchCancel={(e) => { e.preventDefault(); setControlState('down', 'ControlLeft', false); }}
            onMouseDown={() => setControlState('down', 'ControlLeft', true)}
            onMouseUp={() => setControlState('down', 'ControlLeft', false)}
            onMouseLeave={() => setControlState('down', 'ControlLeft', false)}
            className={`w-12 h-12 rounded-2xl border flex flex-col items-center justify-center transition-all ${
              activeButtons.down
                ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_20px_#6366f1] scale-95'
                : 'bg-slate-950/80 border-indigo-500/40 text-indigo-300'
            }`}
            aria-label="Descend"
            title="Fly Down (Ctrl)"
          >
            <ChevronsDown className="w-5 h-5" />
            <span className="text-[9px] font-mono font-bold leading-none">DOWN</span>
          </button>
        </div>

        {/* Primary Combat & Speed Action Column */}
        <div className="flex flex-col gap-2.5 items-end">
          {/* Quick Reset to Vista */}
          <button
            onTouchStart={(e) => { e.preventDefault(); setControlState('reset', 'KeyR', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControlState('reset', 'KeyR', false); }}
            onTouchCancel={(e) => { e.preventDefault(); setControlState('reset', 'KeyR', false); }}
            onMouseDown={() => setControlState('reset', 'KeyR', true)}
            onMouseUp={() => setControlState('reset', 'KeyR', false)}
            onMouseLeave={() => setControlState('reset', 'KeyR', false)}
            className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-700/80 active:bg-amber-500/80 text-slate-400 active:text-black flex items-center justify-center transition-colors mb-1"
            title="Reset Drone (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Nitro Speed Boost (Shift) */}
          <button
            onTouchStart={(e) => { e.preventDefault(); setControlState('boost', 'ShiftLeft', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControlState('boost', 'ShiftLeft', false); }}
            onTouchCancel={(e) => { e.preventDefault(); setControlState('boost', 'ShiftLeft', false); }}
            onMouseDown={() => setControlState('boost', 'ShiftLeft', true)}
            onMouseUp={() => setControlState('boost', 'ShiftLeft', false)}
            onMouseLeave={() => setControlState('boost', 'ShiftLeft', false)}
            className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all ${
              activeButtons.boost
                ? 'bg-purple-500 border-purple-300 text-black shadow-[0_0_25px_#a855f7] scale-95'
                : 'bg-purple-950/80 border-purple-500/50 text-purple-300'
            }`}
            aria-label="Nitro Boost"
            title="Nitro Boost (Shift)"
          >
            <Zap className="w-6 h-6 fill-current" />
            <span className="text-[8px] font-mono font-bold leading-none mt-0.5">NITRO</span>
          </button>

          {/* Laser Cannon / Shoot (F) */}
          <button
            onTouchStart={(e) => { e.preventDefault(); setControlState('shoot', 'KeyF', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControlState('shoot', 'KeyF', false); }}
            onTouchCancel={(e) => { e.preventDefault(); setControlState('shoot', 'KeyF', false); }}
            onMouseDown={() => setControlState('shoot', 'KeyF', true)}
            onMouseUp={() => setControlState('shoot', 'KeyF', false)}
            onMouseLeave={() => setControlState('shoot', 'KeyF', false)}
            className={`w-16 h-16 rounded-3xl border-2 flex flex-col items-center justify-center transition-all ${
              activeButtons.shoot
                ? 'bg-cyan-400 border-white text-slate-950 shadow-[0_0_30px_#00f0ff] scale-95'
                : 'bg-cyan-950/85 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
            }`}
            aria-label="Laser Cannon"
            title="Shoot Laser (F)"
          >
            <Crosshair className="w-7 h-7 stroke-[2.5]" />
            <span className="text-[9px] font-mono font-black leading-none mt-0.5">FIRE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
