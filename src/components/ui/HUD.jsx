import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { useGameStore } from '../../store/gameStore';
import { useTourStore } from '../../store/tourStore';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
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
  Rocket,
  ChevronUp,
  X,
  Menu
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
  const { isMobile } = useDeviceCapability();

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  // Friendly human readable zone titles & badges
  const zoneInfo = {
    spawn: { name: 'Command Hub', full: 'Central Command Hub', tag: 'Core Terminal • 3D Typo', color: 'text-cyan-400', border: 'border-cyan-500/40' },
    about: { name: 'About Vishav', full: 'About Vishav (Sanctuary)', tag: 'Bio • 6+ Yrs Experience', color: 'text-pink-400', border: 'border-pink-500/40' },
    projects: { name: 'Projects', full: 'Enterprise Projects', tag: 'Toyota • Pampers • 3D Apps', color: 'text-blue-400', border: 'border-blue-500/40' },
    skills: { name: 'Skills Arena', full: 'Skills Target Arena', tag: 'Target Practice • Mini-Games', color: 'text-emerald-400', border: 'border-emerald-500/40' },
    contact: { name: 'Contact Tower', full: 'Contact & Hire Spire', tag: 'High Vista • Available', color: 'text-rose-400', border: 'border-rose-500/40' }
  };

  const currentZoneData = zoneInfo[currentZone] || zoneInfo.spawn;

  const handleNavSelect = (modalName) => {
    setIsNavDrawerOpen(false);
    if (modalName === 'tour') {
      startTour();
    } else if (modalName === 'classic') {
      setClassicMode(true);
    } else {
      setActiveModal(modalName);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 select-none pt-safe pb-safe">
      {/* 1. TOP HEADER BAR */}
      <div className="flex items-start justify-between w-full gap-2">
        {/* Left: Current Zone Radar Badge */}
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-950/85 border ${currentZoneData.border} backdrop-blur-md shadow-lg shadow-black/40`}>
            <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentZoneData.color} animate-spin`} style={{ animationDuration: '8s' }} />
            <div>
              <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-wide uppercase ${currentZoneData.color} block leading-tight`}>
                <span className="sm:hidden">{currentZoneData.name}</span>
                <span className="hidden sm:inline">{currentZoneData.full}</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono hidden xs:block leading-none mt-0.5">
                {currentZoneData.tag}
              </span>
            </div>
          </div>

          {/* Pilot Callout (Desktop only) */}
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/70 border border-slate-800 px-3 py-1 rounded-lg backdrop-blur-md">
            <span>PILOT: <strong className="text-white">VISHAV GARG</strong></span>
            <span>•</span>
            <span>SYSTEM: <strong className="text-emerald-400">ONLINE (60 FPS)</strong></span>
          </div>
        </div>

        {/* Right: Score Counter & Utility Quick-Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
          {/* Score Badge */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900/85 border border-amber-500/40 text-amber-300 backdrop-blur-md shadow-lg">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold font-mono">{score} <span className="hidden xs:inline">PTS</span></span>
            <span className="text-[9px] text-slate-400 hidden lg:inline">({targetsHit.length}/14 SKILLS)</span>
          </div>

          {/* Hangar Customizer */}
          <button
            onClick={() => setActiveModal('hangar')}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Starfleet Hangar & Ship Customizer"
            aria-label="Starfleet Hangar"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Audio"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Controls Help Modal */}
          <button
            onClick={() => setActiveModal('controls')}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Flight Controls & Keybindings"
            aria-label="Controls Help"
          >
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </button>

          {/* Classic Resume Mode Toggle (Desktop) */}
          <button
            onClick={() => setClassicMode(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer text-xs font-bold shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CLASSIC CV</span>
          </button>
        </div>
      </div>

      {/* 2. MOBILE TOP-CENTER FLOATING DESTINATIONS PILL (When drawer is closed) */}
      <div className="md:hidden flex justify-center pointer-events-auto mt-2">
        <button
          onClick={() => setIsNavDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
        >
          <Menu className="w-3.5 h-3.5 text-cyan-400" />
          <span>WARP DESTINATIONS</span>
          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* 3. MOBILE DESTINATIONS SLIDE-UP DRAWER */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200">
          <div className="relative w-full bg-[#0b1120] border-t-2 border-cyan-500/50 rounded-t-3xl p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto pb-safe">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-sans font-bold text-base">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Fast-Travel Archipelagos</span>
              </div>
              <button
                onClick={() => setIsNavDrawerOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Tour & Resume Hero Actions */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                onClick={() => handleNavSelect('tour')}
                className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>GUIDED TOUR</span>
              </button>

              <button
                onClick={() => handleNavSelect('classic')}
                className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/50 text-pink-300 font-mono font-bold text-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <FileText className="w-4 h-4 text-pink-400" />
                <span>CLASSIC CV</span>
              </button>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleNavSelect('about')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs font-mono">
                  <User className="w-4 h-4" />
                  <span>ABOUT ME</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Biography & Profile</span>
              </button>

              <button
                onClick={() => handleNavSelect('projects')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs font-mono">
                  <Briefcase className="w-4 h-4" />
                  <span>PROJECTS</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Toyota, Pampers, 3D Apps</span>
              </button>

              <button
                onClick={() => handleNavSelect('skills')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                  <Crosshair className="w-4 h-4" />
                  <span>SKILLS</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Target Range & Stacks</span>
              </button>

              <button
                onClick={() => handleNavSelect('experience')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>TIMELINE</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Career & Leadership</span>
              </button>

              <button
                onClick={() => handleNavSelect('contact')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono">
                  <Mail className="w-4 h-4" />
                  <span>CONTACT</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Email & Direct Message</span>
              </button>

              <button
                onClick={() => handleNavSelect('hangar')}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-left flex flex-col gap-1 active:scale-95"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                  <Rocket className="w-4 h-4" />
                  <span>HANGAR</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Customizer & Ships</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DESKTOP BOTTOM NAVIGATION BAR */}
      <div className="hidden md:flex items-center justify-between gap-3 w-full pointer-events-auto">
        {/* Quick Fast Travel Navigation Pills */}
        <div className="flex items-center flex-wrap gap-2 bg-slate-950/85 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
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

        {/* Key Legend on Desktop */}
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
