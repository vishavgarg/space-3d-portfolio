import React, { useState, useEffect } from 'react';
import { Crosshair, Trophy, Flame, Shield, Heart, X, RefreshCw, AlertTriangle, Zap, Sparkles, Navigation } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

export const DogfightHUD = () => {
  const dogfightActive = useGameStore((s) => s.dogfightActive);
  const dogfightGameOver = useGameStore((s) => s.dogfightGameOver);
  const endDogfight = useGameStore((s) => s.endDogfight);
  const startDogfight = useGameStore((s) => s.startDogfight);
  const dogfightScore = useGameStore((s) => s.dogfightScore);
  const dogfightWave = useGameStore((s) => s.dogfightWave);
  const dogfightKills = useGameStore((s) => s.dogfightKills);
  const dogfightHealth = useGameStore((s) => s.dogfightHealth ?? 100);
  const dogfightMaxHealth = useGameStore((s) => s.dogfightMaxHealth ?? 100);
  const dogfightLives = useGameStore((s) => s.dogfightLives ?? 3);
  const dogfightCombo = useGameStore((s) => s.dogfightCombo ?? 0);
  const dogfightDamageFlash = useGameStore((s) => s.dogfightDamageFlash ?? 0);
  const dogfightIsWarping = useGameStore((s) => s.dogfightIsWarping);
  const dogfightTransitionData = useGameStore((s) => s.dogfightTransitionData);
  const dogfightHighScore = useGameStore((s) => s.dogfightHighScore);

  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [showSectorBanner, setShowSectorBanner] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  // Mouse Crosshair tracking
  useEffect(() => {
    if (!dogfightActive) return;

    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);

    // Fade out helper prompt after 3.5 seconds
    const timer = setTimeout(() => setShowHelp(false), 3500);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(timer);
    };
  }, [dogfightActive]);

  // Sector Change Banner Trigger
  useEffect(() => {
    if (dogfightWave > 1) {
      setShowSectorBanner(true);
      const bannerTimer = setTimeout(() => setShowSectorBanner(false), 2600);
      return () => clearTimeout(bannerTimer);
    }
  }, [dogfightWave]);

  if (!dogfightActive) return null;

  const healthPercent = Math.max(0, Math.min(100, (dogfightHealth / dogfightMaxHealth) * 100));
  const isLowHealth = healthPercent <= 30;
  const isDamageFlashing = Date.now() - dogfightDamageFlash < 300;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* 1. Screen Damage Flash Overlay (Red Vignette) */}
      {isDamageFlashing && (
        <div className="absolute inset-0 bg-red-600/25 ring-8 ring-inset ring-red-500/80 animate-pulse pointer-events-none transition-opacity duration-150" />
      )}

      {/* 2. Sleek Sci-Fi Crosshair Following Mouse */}
      {!dogfightGameOver && (
        <div
          className="fixed w-12 h-12 -ml-6 -mt-6 flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          {/* Outer Crosshair Ring */}
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400/70 flex items-center justify-center animate-pulse shadow-[0_0_12px_#00f0ff]">
            {/* Crosshair Ticks */}
            <div className="absolute w-12 h-0.5 bg-cyan-400/40" />
            <div className="absolute h-12 w-0.5 bg-cyan-400/40" />
            {/* Center Red Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff]" />
          </div>
        </div>
      )}

      {/* 3. Top Header Status Bar */}
      <div className="fixed top-3 sm:top-5 inset-x-0 flex flex-col items-center gap-2 pointer-events-auto px-2 pt-safe">
        <div className="flex items-center gap-2.5 sm:gap-6 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 max-w-full overflow-x-auto no-scrollbar">
          {/* Sector Badge */}
          <div className="flex items-center gap-1 sm:gap-2 text-cyan-400 font-mono font-bold text-xs sm:text-sm shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 animate-bounce" />
            <span>SEC {dogfightWave}</span>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Shield Health Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLowHealth ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
            <div className="w-14 sm:w-28 h-2 sm:h-2.5 bg-slate-900 rounded-full border border-slate-700 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-150 ${
                  healthPercent > 50
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                    : healthPercent > 25
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse'
                }`}
                style={{ width: `${healthPercent}%` }}
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${isLowHealth ? 'text-rose-400' : 'text-slate-300'}`}>
              {Math.round(dogfightHealth)}%
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Lives Display */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {[1, 2, 3].map((life) => (
              <Heart
                key={life}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  life <= dogfightLives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Score Counter */}
          <div className="flex items-center gap-1 text-white font-mono font-bold text-xs sm:text-sm shrink-0">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{dogfightScore.toLocaleString()}</span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-800 shrink-0" />

          {/* Kills */}
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-mono text-xs shrink-0">
            <Crosshair className="w-3.5 h-3.5" />
            <span>{dogfightKills} KILLS</span>
          </div>

          {/* Exit Button */}
          <button
            onClick={endDogfight}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </div>

        {/* Dynamic Combo Streak Badge */}
        {dogfightCombo > 1 && (
          <div className="px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/30 to-pink-500/30 border border-amber-400/50 backdrop-blur-md text-amber-300 font-mono text-[11px] sm:text-xs font-bold animate-bounce shadow-lg shadow-amber-500/20 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>COMBO x{dogfightCombo}!</span>
          </div>
        )}
      </div>

      {/* 4. Cinematic Hyperspace Sector Warp Briefing (Tactical Pause) */}
      {dogfightIsWarping && dogfightTransitionData && (
        <div className="fixed inset-0 z-45 flex items-center justify-center pointer-events-none px-4 animate-in fade-in zoom-in duration-300">
          <div className="relative max-w-md w-full bg-slate-950/95 border-2 border-cyan-400/80 rounded-3xl p-6 sm:p-7 text-center shadow-[0_0_60px_rgba(0,240,255,0.4)] backdrop-blur-2xl">
            {/* Hyperspace Icon with animated glow */}
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/60 mx-auto flex items-center justify-center mb-3.5 text-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.5)] animate-pulse">
              <Navigation className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            <span className="text-[11px] font-mono text-cyan-400 tracking-widest block font-bold uppercase mb-1">
              ✨ SECTOR {dogfightTransitionData.prevWave} SECURED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-wide mb-3">
              WARPING TO SECTOR {dogfightTransitionData.nextWave}
            </h2>

            {/* Victory Rewards Pills */}
            <div className="flex items-center justify-center gap-2 mb-4 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                +{dogfightTransitionData.bonusPoints} PTS
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                +{dogfightTransitionData.actualRepaired} HP REPAIR
              </span>
            </div>

            {/* Intel Briefing */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-slate-300 text-left mb-2">
              <span className="text-cyan-400 font-bold block mb-0.5">📡 TACTICAL SENSOR INTEL:</span>
              <span>
                {dogfightTransitionData.nextWave === 2
                  ? 'Sector 2: Assault Raiders detected — Strike fighters with twin alternating plasma bursts (2 HP).'
                  : dogfightTransitionData.nextWave === 3
                  ? 'Sector 3: Stealth Phantoms detected — Evasive corkscrew interceptors with rapid pulse cannons (2 HP).'
                  : dogfightTransitionData.nextWave === 4
                  ? 'Sector 4: Cyber Gunships deployed — Heavy armored siege destroyers with 3-way spread plasma (4 HP).'
                  : dogfightTransitionData.nextWave === 5
                  ? 'Sector 5: Leviathan Flagship incoming — Dreadnought command titan with 4-way heavy spread barrages (6 HP)!'
                  : 'Sector ' + dogfightTransitionData.nextWave + ': Elite Chaos Armada — All enemy classes deployed with maximum aggression!'}
              </span>
            </div>

            <span className="text-[10px] font-mono text-slate-500 animate-pulse block">
              JUMPING HYPERSPACE IN 3... 2... 1...
            </span>
          </div>
        </div>
      )}

      {/* 5. Cinematic Sector Announcement Banner */}
      {showSectorBanner && !dogfightIsWarping && (
        <div className="fixed top-24 sm:top-28 inset-x-0 flex justify-center pointer-events-none px-4 animate-in fade-in zoom-in duration-300">
          <div className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-slate-950/95 border-2 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.4)] backdrop-blur-xl text-center max-w-sm sm:max-w-md">
            <span className="text-[10px] sm:text-[11px] font-mono text-pink-400 tracking-widest block font-bold">
              HOSTILE ARMADA ESCALATION
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white font-sans tracking-wide">
              ⚠️ SECTOR {dogfightWave} ENGAGED
            </h2>
            <span className="text-[11px] sm:text-xs font-mono text-slate-300 block mt-1">
              {dogfightWave === 2
                ? 'Assault Raiders in formation — Prepare for twin plasma fire!'
                : dogfightWave === 3
                ? 'Stealth Phantoms detected — Watch for evasive corkscrew attacks!'
                : dogfightWave === 4
                ? 'Cyber Siege Gunships inbound — Heavy 3-way plasma spread!'
                : dogfightWave === 5
                ? 'Leviathan Flagship Boss — Heavy armor & quad plasma cannons!'
                : 'Elite Armada — Maximum tactical focus required!'}
            </span>
          </div>
        </div>
      )}

      {/* 5. Instruction Prompt (Fades) */}
      {showHelp && !dogfightGameOver && (
        <div className="fixed bottom-12 inset-x-0 flex justify-center px-4 transition-opacity duration-700">
          <div className="px-5 py-2 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] sm:text-xs shadow-xl shadow-cyan-500/20 backdrop-blur-md text-center">
            <span className="sm:hidden">👆 Touch & Drag to Aim • Tap Screen to Fire!</span>
            <span className="hidden sm:inline">🖱️ Move Mouse to Aim • Click or [Space]/[F] to Fire • Dodge Enemy Lasers!</span>
          </div>
        </div>
      )}

      {/* 6. Game Over Modal Overlay */}
      {dogfightGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto">
          <div className="relative w-full max-w-md bg-slate-950 border-2 border-rose-500/60 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.3)] text-center my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 mx-auto flex items-center justify-center mb-3 sm:mb-4 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.4)]">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span className="text-[10px] sm:text-xs font-mono text-rose-400 tracking-widest block font-bold mb-1">
              SYSTEM CRITICAL
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans mb-2 sm:mb-4">
              MISSION FAILED
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mb-4 sm:mb-6">
              Your fighter vessel sustained critical hull damage and shields collapsed.
            </p>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6 font-mono text-xs">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">FINAL SCORE</span>
                <span className="text-base sm:text-lg font-bold text-white">{dogfightScore.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">HIGH SCORE</span>
                <span className="text-base sm:text-lg font-bold text-amber-400">{dogfightHighScore.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">SECTOR REACHED</span>
                <span className="text-base sm:text-lg font-bold text-cyan-400">SECTOR {dogfightWave}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">VESSELS DESTROYED</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400">{dogfightKills} KILLS</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={startDogfight}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETRY MISSION</span>
              </button>

              <button
                onClick={endDogfight}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <X className="w-3.5 h-3.5" />
                <span>RETURN TO SPACE HUB</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
