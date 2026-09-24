import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { useGameStore } from '../../store/gameStore';
import { useTourStore } from '../../store/tourStore';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { soundEngine } from '../../utils/soundEngine';
import { 
  Volume2, 
  VolumeX, 
  Music,
  FileText, 
  Crosshair, 
  Briefcase, 
  User, 
  Mail, 
  HelpCircle, 
  Trophy, 
  Compass, 
  Sparkles,
  Rocket,
  X,
  Menu,
  Home,
  ChevronRight
} from 'lucide-react';

export const HUD = () => {
  const currentZone = usePlayerStore((s) => s.currentZone);
  const resetToSpawn = usePlayerStore((s) => s.resetToSpawn);
  const isAudioMuted = useUIStore((s) => s.isAudioMuted);
  const toggleAudio = useUIStore((s) => s.toggleAudio);
  const isMusicEnabled = useUIStore((s) => s.isMusicEnabled);
  const toggleMusic = useUIStore((s) => s.toggleMusic);
  const showToast = useUIStore((s) => s.showToast);
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const goHome = useUIStore((s) => s.goHome);
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

  const handleGoHome = () => {
    soundEngine.stopAmbient();
    useTourStore.getState().exitTour();
    useGameStore.getState().resetGame();
    goHome();
  };

  const handleNavSelect = (modalName) => {
    setIsNavDrawerOpen(false);
    if (modalName === 'home') {
      handleGoHome();
    } else if (modalName === 'tour') {
      startTour();
    } else if (modalName === 'classic') {
      setClassicMode(true);
    } else {
      setActiveModal(modalName);
    }
  };

  const navItems = [
    {
      id: 'home',
      title: 'COMMAND HUB',
      desc: 'Central Core & 3D Typo',
      icon: <Home className="w-4 h-4 text-cyan-400" />,
      bg: 'bg-cyan-950/60',
      border: 'border-cyan-500/30',
      textColor: 'text-cyan-300'
    },
    {
      id: 'tour',
      title: 'GUIDED TOUR',
      desc: 'Cinematic Autopilot Flythrough',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      bg: 'bg-amber-950/60',
      border: 'border-amber-500/30',
      textColor: 'text-amber-300'
    },
    {
      id: 'about',
      title: 'ABOUT VISHAV',
      desc: 'Bio & 6+ Years Experience',
      icon: <User className="w-4 h-4 text-pink-400" />,
      bg: 'bg-pink-950/60',
      border: 'border-pink-500/30',
      textColor: 'text-pink-300'
    },
    {
      id: 'projects',
      title: 'PROJECTS GALLERY',
      desc: 'Toyota, Pampers & 3D Apps',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      bg: 'bg-blue-950/60',
      border: 'border-blue-500/30',
      textColor: 'text-blue-300'
    },
    {
      id: 'skills',
      title: 'SKILLS ARENA',
      desc: 'Target Practice Mini-Game',
      icon: <Crosshair className="w-4 h-4 text-emerald-400" />,
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-500/30',
      textColor: 'text-emerald-300'
    },
    {
      id: 'experience',
      title: 'CAREER TIMELINE',
      desc: 'Experience & Milestones',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      bg: 'bg-purple-950/60',
      border: 'border-purple-500/30',
      textColor: 'text-purple-300'
    },
    {
      id: 'hangar',
      title: 'STARFLEET HANGAR',
      desc: 'Ship Customizer & Thrusters',
      icon: <Rocket className="w-4 h-4 text-cyan-400" />,
      bg: 'bg-cyan-950/60',
      border: 'border-cyan-500/30',
      textColor: 'text-cyan-300'
    },
    {
      id: 'contact',
      title: 'CONTACT SPIRE',
      desc: 'Email & Direct Message',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      bg: 'bg-rose-950/60',
      border: 'border-rose-500/30',
      textColor: 'text-rose-300'
    },
    {
      id: 'classic',
      title: 'CLASSIC CV',
      desc: 'Printable HTML Resume',
      icon: <FileText className="w-4 h-4 text-slate-300" />,
      bg: 'bg-slate-800/60',
      border: 'border-slate-600/30',
      textColor: 'text-slate-200'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 pt-5 sm:p-4 sm:pt-3 md:px-6 md:pt-2.5 md:pb-5 select-none">
      {/* 1. TOP HEADER BAR */}
      <div className="flex items-center justify-between w-full gap-2 mt-1 sm:mt-0">
        {/* Left: 3-Line Menu Button on Mobile, Zone Radar Badge on Desktop */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* 3-Line Menu Button (Mobile Only, Aligned Left) */}
          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="md:hidden p-2 sm:p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md flex items-center justify-center"
            title="Warp Destinations Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Current Zone Radar Badge (Hidden on mobile, shown on desktop) */}
          <div className="hidden md:flex flex-col gap-1">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/85 border ${currentZoneData.border} backdrop-blur-md shadow-lg shadow-black/40`}>
              <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentZoneData.color} animate-spin`} style={{ animationDuration: '8s' }} />
              <div>
                <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-wide uppercase ${currentZoneData.color} block leading-tight`}>
                  <span>{currentZoneData.full}</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono hidden xs:block leading-none mt-0.5">
                  {currentZoneData.tag}
                </span>
              </div>
            </div>

            {/* Pilot Callout (Desktop only) */}
            <div className="flex items-center gap-2.5 text-[10px] text-slate-400 bg-slate-900/70 border border-slate-800 px-2.5 py-0.5 rounded-lg backdrop-blur-md">
              <span>PILOT: <strong className="text-white">VISHAV GARG</strong></span>
              <span>•</span>
              <span>SYSTEM: <strong className="text-emerald-400">ONLINE (60 FPS)</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Score Counter & Utility Quick-Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-1.5 pointer-events-auto">
          {/* Home — back to landing screen */}
          <button
            onClick={handleGoHome}
            className="p-2 md:p-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title="Back to Landing Screen"
            aria-label="Back to Landing Screen"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
          </button>

          {/* Score Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-2.5 md:py-1 rounded-xl bg-slate-900/85 border border-amber-500/40 text-amber-300 backdrop-blur-md shadow-lg">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold font-mono">{score} <span className="hidden xs:inline">PTS</span></span>
            <span className="text-[9px] text-slate-400 hidden lg:inline">({targetsHit.length}/14 SKILLS)</span>
          </div>

          {/* Hangar Customizer (hidden on mobile — accessible from drawer) */}
          <button
            onClick={() => setActiveModal('hangar')}
            className="hidden md:flex p-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md items-center justify-center"
            title="Starfleet Hangar & Ship Customizer"
            aria-label="Starfleet Hangar"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Continuous Ambient Music Toggle (Off by default) */}
          <button
            onClick={() => {
              toggleMusic();
              const willBeEnabled = !isMusicEnabled;
              showToast(
                'AUDIO SYSTEM',
                willBeEnabled ? 'Background ambient synth music enabled' : 'Background music disabled',
                'info'
              );
            }}
            className={`p-2 md:p-1.5 rounded-xl border backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md relative ${
              isMusicEnabled 
                ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-300 hover:text-white shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                : 'bg-slate-900/85 hover:bg-slate-800 border-slate-700/70 text-slate-400 hover:text-slate-200'
            }`}
            title={isMusicEnabled ? 'Background Music: ON (Click to turn off)' : 'Background Music: OFF (Click to turn on continuous music)'}
            aria-label="Toggle Background Music"
          >
            <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {!isMusicEnabled && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600" />
              </span>
            )}
          </button>

          {/* Sound Effects Toggle (Firing, impacts, UI - On by default) */}
          <button
            onClick={() => {
              toggleAudio();
              const willBeMuted = !isAudioMuted;
              showToast(
                'AUDIO SYSTEM',
                willBeMuted ? 'Sound effects (firing, impacts) muted' : 'Sound effects enabled',
                'info'
              );
            }}
            className="p-2 md:p-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            title={isAudioMuted ? 'Sound FX: MUTED (Click to enable laser firing & sound FX)' : 'Sound FX: ACTIVE (Laser firing & sounds on - Click to mute)'}
            aria-label="Toggle Sound Effects"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />}
          </button>

          {/* Controls Help Modal (hidden on mobile — on-screen touch controls are self-explanatory) */}
          <button
            onClick={() => setActiveModal('controls')}
            className="hidden md:flex p-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md items-center justify-center"
            title="Flight Controls & Keybindings"
            aria-label="Controls Help"
          >
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </button>

          {/* Classic Resume Mode Toggle (Desktop) */}
          <button
            onClick={() => setClassicMode(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 text-cyan-300 hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer text-xs font-bold shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CLASSIC CV</span>
          </button>
        </div>
      </div>

      {/* 2. MOBILE DESTINATIONS SLIDE-OUT DRAWER (FROM LEFT, PORTALED TO BODY AT z-[100]) */}
      {isNavDrawerOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex pointer-events-auto select-none">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsNavDrawerOpen(false)}
          />

          {/* Left slide-out sidebar */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#080d1a] border-r border-cyan-500/40 shadow-[15px_0_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between px-4 pt-12 pb-7 sm:px-5 sm:pt-14 sm:pb-8 overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
            {/* Header & List Items */}
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
                    <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
                  </div>
                  <div>
                    <h3 className="text-white font-sans font-bold text-sm tracking-wide">WARP DESTINATIONS</h3>
                    <p className="text-[10px] text-cyan-400 font-mono">Fast-Travel Archipelagos</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNavDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Current Zone indicator in drawer */}
              <div className="mb-3 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Current Location</span>
                <span className={`text-[11px] font-mono font-bold ${currentZoneData.color}`}>
                  {currentZoneData.full || currentZoneData.name}
                </span>
              </div>

              {/* Navigation Options in LIST VIEW */}
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isCurrent = currentZone === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavSelect(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all active:scale-[0.98] text-left border ${
                        isCurrent
                          ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'bg-slate-900/60 hover:bg-slate-800/70 active:bg-slate-800 border-slate-800/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${item.bg} border ${item.border}`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs font-mono font-bold truncate ${item.textColor}`}>
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate font-sans">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Audio Controls in Drawer */}
            <div className="pt-3 pb-1 mt-4 border-t border-slate-800/80 shrink-0 space-y-2">
              <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase px-1">Audio Settings</div>
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Sound FX (Firing)
                </span>
                <button
                  onClick={toggleAudio}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                    isAudioMuted 
                      ? 'border-rose-500/50 text-rose-400 bg-rose-950/40' 
                      : 'border-emerald-500/50 text-emerald-400 bg-emerald-950/40'
                  }`}
                >
                  {isAudioMuted ? 'MUTED' : 'ENABLED'}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-cyan-400" /> Ambient Music
                </span>
                <button
                  onClick={toggleMusic}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                    isMusicEnabled 
                      ? 'border-cyan-500/50 text-cyan-400 bg-cyan-950/40' 
                      : 'border-slate-700 text-slate-400 bg-slate-900/60'
                  }`}
                >
                  {isMusicEnabled ? 'PLAYING' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div className="pt-3 pb-2 mt-2 border-t border-slate-800/80 shrink-0">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
                <span>PILOT: <strong className="text-white">VISHAV GARG</strong></span>
                <span className="text-emerald-400">ONLINE (60 FPS)</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
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
