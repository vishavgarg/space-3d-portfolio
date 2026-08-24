import React from 'react';
import { Zap, Trophy, X } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';

export const WarpRaceHUD = () => {
  const warpRaceActive = useGameStore((s) => s.warpRaceActive);
  const endWarpRace = useGameStore((s) => s.endWarpRace);
  const warpRaceScore = useGameStore((s) => s.warpRaceScore);
  const warpRaceGatesPassed = useGameStore((s) => s.warpRaceGatesPassed);

  if (!warpRaceActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* Top Header Status Bar */}
      <div className="fixed top-3 sm:top-5 inset-x-0 flex justify-center items-center pointer-events-auto px-3 pt-safe">
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-purple-500/40 shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-1.5 sm:gap-2 text-purple-400 font-mono font-bold text-xs sm:text-sm">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 animate-pulse" />
            <span>GATES: {warpRaceGatesPassed} / 24</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5 sm:gap-2 text-white font-mono font-bold text-xs sm:text-base">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>{warpRaceScore.toLocaleString()} PTS</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <button
            onClick={endWarpRace}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>
      </div>

      {/* Helper prompt */}
      <div className="fixed bottom-12 inset-x-0 flex justify-center px-4">
        <div className="px-5 py-2 rounded-full bg-slate-900/95 border border-purple-500/40 text-purple-300 font-mono text-[11px] sm:text-sm shadow-xl shadow-purple-500/20 text-center">
          <span className="sm:hidden">👆 Touch & Drag to Steer Through Glowing Rings</span>
          <span className="hidden sm:inline">🚀 Move Mouse or Touch to Steer Through Glowing Rings</span>
        </div>
      </div>
    </div>
  );
};
