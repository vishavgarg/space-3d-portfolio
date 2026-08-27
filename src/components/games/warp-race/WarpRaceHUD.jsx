import React, { useState, useEffect } from 'react';
import { Zap, Trophy, X, Heart, Shield, AlertTriangle, RefreshCw, Navigation, Sparkles, Flame, Gauge } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

export const WarpRaceHUD = () => {
  const warpRaceActive = useGameStore((s) => s.warpRaceActive);
  const endWarpRace = useGameStore((s) => s.endWarpRace);
  const restartWarpRace = useGameStore((s) => s.restartWarpRace);
  const dismissWarpTransition = useGameStore((s) => s.dismissWarpTransition);
  const warpRaceScore = useGameStore((s) => s.warpRaceScore);
  const warpRaceGatesPassed = useGameStore((s) => s.warpRaceGatesPassed);
  const warpRaceTotalGatesPassed = useGameStore((s) => s.warpRaceTotalGatesPassed);
  const warpRaceGatesTotal = useGameStore((s) => s.warpRaceGatesTotal);
  const warpRaceLevel = useGameStore((s) => s.warpRaceLevel);
  const warpRaceLives = useGameStore((s) => s.warpRaceLives ?? 3);
  const warpRaceGameOver = useGameStore((s) => s.warpRaceGameOver);
  const warpRaceCombo = useGameStore((s) => s.warpRaceCombo ?? 0);
  const warpRaceDamageFlash = useGameStore((s) => s.warpRaceDamageFlash ?? 0);
  const warpRaceIsWarping = useGameStore((s) => s.warpRaceIsWarping);
  const warpRaceTransitionData = useGameStore((s) => s.warpRaceTransitionData);
  const warpRaceHighScore = useGameStore((s) => s.warpRaceHighScore);

  const [showHelp, setShowHelp] = useState(true);

  // Fade out helper prompt after 4 seconds
  useEffect(() => {
    if (!warpRaceActive) return;
    const timer = setTimeout(() => setShowHelp(false), 4000);
    return () => clearTimeout(timer);
  }, [warpRaceActive]);

  // Space/Enter to quickly skip warp briefing
  useEffect(() => {
    if (!warpRaceIsWarping) return;
    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        dismissWarpTransition();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [warpRaceIsWarping, dismissWarpTransition]);

  if (!warpRaceActive) return null;

  const isDamageFlashing = Date.now() - warpRaceDamageFlash < 350;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* 1. Screen Damage / Miss Flash Overlay (Red Vignette) */}
      {isDamageFlashing && (
        <div className="absolute inset-0 bg-red-600/30 ring-8 ring-inset ring-red-500/80 animate-pulse pointer-events-none transition-opacity duration-150" />
      )}

      {/* 2. Top Header Status Bar */}
      <div className="fixed top-3 sm:top-5 inset-x-0 flex flex-col items-center gap-2 pointer-events-auto px-2 pt-safe">
        <div className="flex items-center gap-2.5 sm:gap-6 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-purple-500/40 shadow-2xl shadow-purple-500/10 max-w-full overflow-x-auto no-scrollbar">
          {/* Level Badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-purple-400 font-mono font-bold text-xs sm:text-sm shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 animate-bounce" />
            <span>LVL {warpRaceLevel}</span>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Gates Passed / Total */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-300 font-mono font-bold text-xs sm:text-sm shrink-0">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-pulse" />
            <span>GATES: {warpRaceGatesPassed} / {warpRaceGatesTotal}</span>
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Hull / Lives Hearts */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {[1, 2, 3].map((life) => (
              <Heart
                key={life}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                  life <= warpRaceLives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 shrink-0" />

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 text-white font-mono font-bold text-xs sm:text-sm shrink-0">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>{warpRaceScore.toLocaleString()} PTS</span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-800 shrink-0" />

          {/* Exit Button */}
          <button
            onClick={endWarpRace}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </div>

        {/* Dynamic Combo Streak Badge */}
        {warpRaceCombo > 1 && (
          <div className="px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50 backdrop-blur-md text-cyan-300 font-mono text-[11px] sm:text-xs font-bold animate-bounce shadow-lg shadow-purple-500/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
            <span>WARP COMBO x{warpRaceCombo}! (+{((warpRaceCombo - 1) * 50)}% PTS)</span>
          </div>
        )}
      </div>

      {/* 3. Cinematic Hyperspace Level Transition Briefing */}
      {warpRaceIsWarping && warpRaceTransitionData && (
        <div className="fixed inset-0 z-45 flex items-center justify-center pointer-events-auto px-4 animate-in fade-in zoom-in duration-300">
          <div className="relative max-w-md w-full bg-slate-950/95 border-2 border-purple-400/80 rounded-3xl p-6 sm:p-7 text-center shadow-[0_0_60px_rgba(168,85,247,0.4)] backdrop-blur-2xl">
            {/* Hyperspace Icon with animated glow */}
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/60 mx-auto flex items-center justify-center mb-3.5 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-pulse">
              <Navigation className="w-7 h-7 animate-spin" style={{ animationDuration: '2.5s' }} />
            </div>

            <span className="text-[11px] font-mono text-purple-400 tracking-widest block font-bold uppercase mb-1">
              ✨ LEVEL {warpRaceTransitionData.prevLevel} COMPLETED!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-wide mb-3">
              WARPING TO LEVEL {warpRaceTransitionData.nextLevel}
            </h2>

            {/* Victory Rewards Pills */}
            <div className="flex items-center justify-center gap-2 mb-4 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                +{warpRaceTransitionData.bonusPoints} PTS
              </span>
              {warpRaceTransitionData.restoredLife && (
                <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 font-bold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  +1 HULL REPAIRED
                </span>
              )}
            </div>

            {/* Intel Briefing */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-slate-300 text-left mb-4">
              <span className="text-purple-400 font-bold block mb-0.5">📡 NAVIGATION INTEL:</span>
              <span>
                {warpRaceTransitionData.nextLevel === 2
                  ? 'Level 2: Asteroid clusters detected in flight path. Sub-light speed +15%!'
                  : warpRaceTransitionData.nextLevel === 3
                  ? 'Level 3: High-G corkscrew gate corridors ahead. High asteroid density!'
                  : warpRaceTransitionData.nextLevel === 4
                  ? 'Level 4: Hyper-velocity slipstream. Narrow gate alignments + rotating obstacles!'
                  : 'Level ' + warpRaceTransitionData.nextLevel + ': Extreme Sub-space Storm — Extreme speed & maximum evasive agility required!'}
              </span>
            </div>

            {/* Action button to engage jump immediately */}
            <button
              onClick={dismissWarpTransition}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer active:scale-95 mb-2"
            >
              <span>ENGAGE HYPERDRIVE (SPACE / TAP)</span>
              <Navigation className="w-3.5 h-3.5" />
            </button>

            <span className="text-[10px] font-mono text-slate-500 animate-pulse block">
              Auto-jumping in 2 seconds...
            </span>
          </div>
        </div>
      )}

      {/* 4. Instruction Prompt (Fades) */}
      {showHelp && !warpRaceGameOver && !warpRaceIsWarping && (
        <div className="fixed bottom-12 inset-x-0 flex justify-center px-4 transition-opacity duration-700">
          <div className="px-5 py-2.5 rounded-full bg-slate-950/90 border border-purple-500/40 text-purple-300 font-mono text-[11px] sm:text-xs shadow-xl shadow-purple-500/20 backdrop-blur-md text-center">
            <span className="sm:hidden">👆 Touch & Drag to Steer • Hit Glowing Gates • Dodge Asteroids!</span>
            <span className="hidden sm:inline">🚀 Move Mouse or [WASD]/[Arrows] to Steer • Fly Through Rings • Dodge Asteroids!</span>
          </div>
        </div>
      )}

      {/* 5. Game Over Modal Overlay */}
      {warpRaceGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 pointer-events-auto animate-in fade-in duration-300 overflow-y-auto">
          <div className="relative w-full max-w-md bg-slate-950 border-2 border-rose-500/60 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.3)] text-center my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 mx-auto flex items-center justify-center mb-3 sm:mb-4 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.4)]">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span className="text-[10px] sm:text-xs font-mono text-rose-400 tracking-widest block font-bold mb-1">
              WARP DRIVE COLLAPSE
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white font-sans mb-2 sm:mb-4">
              RACE TERMINATED
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mb-4 sm:mb-6">
              Your ship took too many hull impacts or missed critical warp alignment gates.
            </p>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6 font-mono text-xs">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">FINAL SCORE</span>
                <span className="text-base sm:text-lg font-bold text-white">{warpRaceScore.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">HIGH SCORE</span>
                <span className="text-base sm:text-lg font-bold text-amber-400">{warpRaceHighScore.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">LEVEL REACHED</span>
                <span className="text-base sm:text-lg font-bold text-purple-400">LEVEL {warpRaceLevel}</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">GATES PASSED</span>
                <span className="text-base sm:text-lg font-bold text-cyan-400">{warpRaceTotalGatesPassed} TOTAL</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={restartWarpRace}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-bold font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETRY WARP RUN</span>
              </button>

              <button
                onClick={endWarpRace}
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
