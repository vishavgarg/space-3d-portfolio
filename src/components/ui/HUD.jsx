import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { useGameStore } from '../../store/gameStore';
import { useTourStore } from '../../store/tourStore';
import { 
  Volume2, 
  VolumeX, 
  FileText, 
  Crosshair, 
  Briefcase, 
  User, 
  Mail, 
  HelpCircle, 
  Trophy, 
  Compass, 
  RotateCcw,
  Sparkles,
  Rocket
} from 'lucide-react';

export const HUD = () => {
  const currentZone = usePlayerStore((s) => s.currentZone);
  const resetToSpawn = usePlayerStore((s) => s.resetToSpawn);
  const isAudioMuted = useUIStore((s) => s.isAudioMuted);
  const toggleAudio = useUIStore((s) => s.toggleAudio);
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const startTour = useTourStore((s) => s.startTour);
  const setClassicMode = useUIStore((s) => s.setClassicMode);

  const score = useGameStore((s) => s.score);
  const targetsHit = useGameStore((s) => s.targetsHit);

  // Friendly human readable zone titles & badges
  const zoneInfo = {
    spawn: { name: 'Central Command Hub', tag: 'Core Terminal • 3D Typo', color: 'text-cyan-400', border: 'border-cyan-500/40' },
    about: { name: 'About Vishav (Sanctuary)', tag: 'Bio • 6+ Yrs Experience', color: 'text-pink-400', border: 'border-pink-500/40' },
    projects: { name: 'Enterprise Projects', tag: 'Toyota • Pampers • 3D Apps', color: 'text-blue-400', border: 'border-blue-500/40' },
    skills: { name: 'Skills Target Arena', tag: 'Target Practice • Mini-Games', color: 'text-emerald-400', border: 'border-emerald-500/40' },
    contact: { name: 'Contact & Hire Spire', tag: 'High Vista • Available', color: 'text-rose-400', border: 'border-rose-500/40' }
  };

  const currentZoneData = zoneInfo[currentZone] || zoneInfo.spawn;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <div className="flex items-start justify-between w-full">
        {/* Left: Zone Radar Badge & Pilot Callout */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Current Zone Tag */}
          <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-950/85 border ${currentZoneData.border} backdrop-blur-md shadow-lg shadow-black/40`}>
            <Compass className={`w-4 h-4 ${currentZoneData.color} animate-spin`} style={{ animationDuration: '8s' }} />
            <div>
              <span className={`text-xs font-mono font-bold tracking-wide uppercase ${currentZoneData.color} block`}>
                {currentZoneData.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                {currentZoneData.tag}
              </span>
            </div>
          </div>

          {/* Quick Pilot Callout */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <span>PILOT: <strong className="text-white">VISHAV GARG</strong></span>
            <span>•</span>
            <span>SYSTEM: <strong className="text-emerald-400">ONLINE (60 FPS)</strong></span>
          </div>
        </div>

        {/* Right: Score Counter & Quick Utility Buttons */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Score Pill */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/85 border border-amber-500/40 text-amber-300 backdrop-blur-md shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">{score} PTS</span>
            <span className="text-[10px] text-slate-400">({targetsHit.length}/14 SKILLS)</span>
          </div>

          {/* Hangar Customizer Button */}
          <button
            onClick={() => setActiveModal('hangar')}
            className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Starfleet Hangar & Ship Customizer"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Reset Position to Spawn */}
          <button
            onClick={resetToSpawn}
            className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Reset Drone to Vista (Key: R)"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
          </button>

          {/* Controls Help Modal Button */}
          <button
            onClick={() => setActiveModal('controls')}
            className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Flight Controls & Keybindings"
          >
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </button>

          {/* Classic Resume Mode Toggle */}
          <button
            onClick={() => setClassicMode(true)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer text-xs font-bold shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>CLASSIC CV</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar: Zone Fast-Travel Navigation Bar & Controls Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full pointer-events-auto">
        {/* Left: Quick Fast Travel Navigation Pills */}
        <div className="flex items-center flex-wrap gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
          <button
            onClick={startTour}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 text-cyan-300 hover:text-white text-xs transition-all active:scale-95 cursor-pointer font-bold shadow-md"
            title="Start Interactive Autopilot Walkthrough"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GUIDED TOUR</span>
          </button>

          <button
            onClick={() => setActiveModal('hangar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition-all active:scale-95 cursor-pointer font-bold"
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>HANGAR</span>
          </button>

          <button
            onClick={() => setActiveModal('about')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-pink-950/60 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-pink-400" />
            <span>ABOUT</span>
          </button>

          <button
            onClick={() => setActiveModal('projects')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>PROJECTS</span>
          </button>

          <button
            onClick={() => setActiveModal('skills')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
            <span>SKILLS</span>
          </button>

          <button
            onClick={() => setActiveModal('experience')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>TIMELINE</span>
          </button>

          <button
            onClick={() => setActiveModal('contact')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>CONTACT</span>
          </button>
        </div>

        {/* Right: Key Legend on Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 text-[11px] text-slate-400 bg-slate-950/70 border border-slate-800/80 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
          <span><kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">WASD</kbd> Steer</span>
          <span>•</span>
          <span><kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">Space</kbd>/<kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">Ctrl</kbd> Altitude</span>
          <span>•</span>
          <span><kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">F</kbd> Shoot</span>
          <span>•</span>
          <span><kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">Shift</kbd> Nitro</span>
        </div>
      </div>
    </div>
  );
};
