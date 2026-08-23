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
      <div className="fixed top-5 inset-x-0 flex justify-center items-center pointer-events-auto">
        <div className="flex items-center gap-6 px-6 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-purple-500/30 shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-sm">
            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>GATES: {warpRaceGatesPassed} / 24</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2 text-white font-mono font-bold text-base">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{warpRaceScore.toLocaleString()} PTS</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <button
            onClick={endWarpRace}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-mono transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>
      </div>

      {/* Helper prompt */}
      <div className="fixed bottom-12 inset-x-0 flex justify-center">
        <div className="px-6 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 font-mono text-sm shadow-xl shadow-purple-500/20">
          🚀 Move Mouse to Steer Through Glowing Rings
        </div>
      </div>
    </div>
  );
};
