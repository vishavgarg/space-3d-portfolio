import React, { useState, useCallback, useRef } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { useUIStore } from '../../store/uiStore';
import { 
  Crosshair, 
  Zap, 
  ChevronsUp,
  ChevronsDown,
  RotateCcw
} from 'lucide-react';

export const MobileControls = () => {
  const { isMobile } = useDeviceCapability();
  const hasStartedExperience = useUIStore((s) => s.hasStartedExperience);

  const [activeButtons, setActiveButtons] = useState({});

  // Joystick state
  const [joystickOffset, setJoystickOffset] = useState({ x: 0, y: 0 });
  const [isJoystickActive, setIsJoystickActive] = useState(false);
  const joystickRef = useRef(null);
  const activeDirectionsRef = useRef({ forward: false, backward: false, left: false, right: false });
  const joystickRadius = 52; // max travel distance in px
  const deadZone = 0.25; // ignore tiny movements (fraction of radius)

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

  // --- Joystick touch handlers ---
  const getTouchOffset = useCallback((touch) => {
    if (!joystickRef.current) return { x: 0, y: 0 };
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;

    // Clamp to radius
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > joystickRadius) {
      dx = (dx / dist) * joystickRadius;
      dy = (dy / dist) * joystickRadius;
    }
    return { x: dx, y: dy };
  }, []);

  const updateDirections = useCallback((dx, dy) => {
    const dist = Math.sqrt(dx * dx + dy * dy);
    const normalizedDist = dist / joystickRadius;

    const prev = activeDirectionsRef.current;
    let forward = false, backward = false, left = false, right = false;

    if (normalizedDist > deadZone) {
      // Use angle to determine which directions are active
      // Allow diagonals naturally by using thresholds
      const angle = Math.atan2(dy, dx); // radians, 0=right, PI/2=down

      // Forward = up = negative Y
      forward = dy < -joystickRadius * deadZone;
      backward = dy > joystickRadius * deadZone;
      left = dx < -joystickRadius * deadZone;
      right = dx > joystickRadius * deadZone;
    }

    // Only dispatch events when state changes
    if (forward !== prev.forward) setControlState('forward', 'KeyW', forward);
    if (backward !== prev.backward) setControlState('backward', 'KeyS', backward);
    if (left !== prev.left) setControlState('left', 'KeyA', left);
    if (right !== prev.right) setControlState('right', 'KeyD', right);

    activeDirectionsRef.current = { forward, backward, left, right };
  }, [setControlState]);

  const handleJoystickStart = useCallback((e) => {
    e.preventDefault();
    setIsJoystickActive(true);
    const touch = e.touches[0];
    const offset = getTouchOffset(touch);
    setJoystickOffset(offset);
    updateDirections(offset.x, offset.y);
    triggerVibrate();
  }, [getTouchOffset, updateDirections]);

  const handleJoystickMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const offset = getTouchOffset(touch);
    setJoystickOffset(offset);
    updateDirections(offset.x, offset.y);
  }, [getTouchOffset, updateDirections]);

  const handleJoystickEnd = useCallback((e) => {
    e.preventDefault();
    setIsJoystickActive(false);
    setJoystickOffset({ x: 0, y: 0 });
    // Release all directions
    const prev = activeDirectionsRef.current;
    if (prev.forward) setControlState('forward', 'KeyW', false);
    if (prev.backward) setControlState('backward', 'KeyS', false);
    if (prev.left) setControlState('left', 'KeyA', false);
    if (prev.right) setControlState('right', 'KeyD', false);
    activeDirectionsRef.current = { forward: false, backward: false, left: false, right: false };
  }, [setControlState]);

  if (!isMobile || !hasStartedExperience) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-40 px-3 sm:px-6 flex items-end justify-between pointer-events-none select-none">
      {/* LEFT: Action Cluster (Altitude, Nitro, Laser, Reset) */}
      <div className="flex items-end gap-2.5 sm:gap-3 pointer-events-auto touch-none">
        {/* Primary Combat & Speed Action Column */}
        <div className="flex flex-col gap-2.5 items-start">
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
      </div>

      {/* RIGHT: Round Virtual Joystick (Movement Steering) */}
      <div
        ref={joystickRef}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
        className="relative w-36 h-36 sm:w-40 sm:h-40 pointer-events-auto touch-none"
        style={{ WebkitTouchCallout: 'none' }}
      >
        {/* Outer ring (base) */}
        <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-150 ${
          isJoystickActive
            ? 'border-cyan-400/60 bg-slate-950/60 shadow-[0_0_30px_rgba(0,240,255,0.15)]'
            : 'border-slate-700/50 bg-slate-950/50'
        } backdrop-blur-xl`}>
          {/* Crosshair guides */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`absolute w-px h-8 top-3 transition-colors ${isJoystickActive ? 'bg-cyan-500/40' : 'bg-slate-700/30'}`} />
            <div className={`absolute w-px h-8 bottom-3 transition-colors ${isJoystickActive ? 'bg-cyan-500/40' : 'bg-slate-700/30'}`} />
            <div className={`absolute h-px w-8 left-3 transition-colors ${isJoystickActive ? 'bg-cyan-500/40' : 'bg-slate-700/30'}`} />
            <div className={`absolute h-px w-8 right-3 transition-colors ${isJoystickActive ? 'bg-cyan-500/40' : 'bg-slate-700/30'}`} />
          </div>
        </div>

        {/* Inner knob (thumb) */}
        <div
          className={`absolute rounded-full transition-shadow duration-100 flex items-center justify-center ${
            isJoystickActive
              ? 'bg-cyan-400/90 shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110'
              : 'bg-slate-700/80 border border-slate-600/60 shadow-lg'
          }`}
          style={{
            width: 48,
            height: 48,
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${joystickOffset.x}px), calc(-50% + ${joystickOffset.y}px))`,
            transition: isJoystickActive ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
            isJoystickActive ? 'bg-white' : 'bg-cyan-400/60'
          }`} />
        </div>
      </div>
    </div>
  );
};
