import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useTourStore } from '../../store/tourStore';
import { useGameStore } from '../../store/gameStore';
import { usePlayerStore } from '../../store/playerStore';
import { shipClasses, thrusterColorPresets } from '../../data/shipData';
import { aboutData } from '../../data/aboutData';
import { soundEngine } from '../../utils/soundEngine';
import {
  Sparkles,
  Play,
  Compass,
  FileText,
  Volume2,
  VolumeX,
  Rocket,
  Shield,
  Zap,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  Cpu,
  Layers,
  Crosshair,
  Briefcase,
  User,
  Mail,
  X,
  Gauge,
  Activity,
  ChevronDown
} from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'hangar' | 'portals'

  // Stores
  const startExperience = useUIStore((s) => s.startExperience);
  const setClassicMode = useUIStore((s) => s.setClassicMode);
  const setActiveModal = useUIStore((s) => s.setActiveModal);
  const isAudioMuted = useUIStore((s) => s.isAudioMuted);
  const toggleAudio = useUIStore((s) => s.toggleAudio);
  const showToast = useUIStore((s) => s.showToast);

  const startTour = useTourStore((s) => s.startTour);
  const startDogfight = useGameStore((s) => s.startDogfight);
  const startWarpRace = useGameStore((s) => s.startWarpRace);
  const dogfightHighScore = useGameStore((s) => s.dogfightHighScore);
  const warpRaceHighScore = useGameStore((s) => s.warpRaceHighScore);

  const selectedShip = usePlayerStore((s) => s.selectedShip);
  const thrusterColor = usePlayerStore((s) => s.thrusterColor);
  const setShip = usePlayerStore((s) => s.setShip);
  const setThrusterColor = usePlayerStore((s) => s.setThrusterColor);

  const activeShipData = shipClasses.find((s) => s.id === selectedShip) || shipClasses[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 22) + 12;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const isReady = progress >= 100;

  // Sound + Action Handlers
  const handleStartTour = () => {
    soundEngine.playWaveStart();
    startExperience();
    startTour();
  };

  const handleFreeRoam = () => {
    soundEngine.playZoneTransition();
    startExperience();
  };

  const handleStartDogfight = () => {
    soundEngine.playShoot();
    startExperience();
    startDogfight();
  };

  const handleStartWarpRace = () => {
    soundEngine.playZoneTransition();
    startExperience();
    startWarpRace();
  };

  const handleDirectWarp = (modalName) => {
    soundEngine.playZoneTransition();
    startExperience();
    setActiveModal(modalName);
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    soundEngine.playClick();
    navigator.clipboard.writeText(aboutData.email);
    setCopiedEmail(true);
    showToast('Email Copied', aboutData.email, 'info');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSelectShip = (shipId) => {
    soundEngine.playClick();
    setShip(shipId);
  };

  const handleSelectThruster = (hex) => {
    soundEngine.playClick();
    setThrusterColor(hex);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#040711]/90 text-white overflow-y-auto overflow-x-hidden backdrop-blur-md transition-all select-none">
      {/* Dynamic Cyber Ambient Background Grid & Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* 1. TOP COMMAND STATUS BAR */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Pilot ID & Availability Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-cyan-400">
                VG
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow-[0_0_8px_#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-wider font-sans text-white">
                VISHAV GARG
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                OPEN FOR SENIOR / STAFF ROLES
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400/90 tracking-tight">
              SENIOR FRONTEND ARCHITECT • 3D WEBGL
            </span>
          </div>
        </div>

        {/* Action Controls & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Recruiter Summary Modal Trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsRecruiterModalOpen(true);
            }}
            className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 text-purple-300 hover:text-purple-200 text-[11px] sm:text-xs font-mono transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>RECRUITER 30s READ</span>
          </button>

          {/* ATS Classic CV Switch */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setClassicMode(true);
              startExperience();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-pink-500/50 text-slate-300 hover:text-pink-300 text-[11px] sm:text-xs font-mono transition-all active:scale-95 cursor-pointer"
            title="Switch to Traditional ATS Resume"
          >
            <FileText className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">CLASSIC CV</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Procedural Audio Engine Toggle */}
          <button
            onClick={() => {
              toggleAudio();
              if (isAudioMuted) {
                soundEngine.playClick();
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all active:scale-95 cursor-pointer text-[11px] font-mono ${
              !isAudioMuted
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isAudioMuted ? 'Turn Sound ON' : 'Mute Sound'}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline text-slate-400">MUTED</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN HERO & INTERACTIVE LAUNCH DECK */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center my-auto">
        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider mb-3 sm:mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>INTERACTIVE 3D WEBGL PORTFOLIO & ARCADE</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-sky-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)] mb-2 sm:mb-3">
            VISHAV GARG
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Engineering scalable enterprise frontend architectures, reusable design systems, and
            cutting-edge 3D graphics for Fortune 500 organizations including{' '}
            <strong className="text-cyan-300 font-semibold">Toyota Motor North America</strong> and{' '}
            <strong className="text-pink-300 font-semibold">Procter & Gamble (Pampers)</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6 max-w-2xl mx-auto">
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-col items-center">
              <span className="text-base sm:text-lg font-black font-mono text-cyan-400">6+ Years</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-sans">Full Stack & Frontend</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-col items-center">
              <span className="text-base sm:text-lg font-black font-mono text-pink-400">Fortune 500</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-sans">Toyota & P&G (Pampers)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-col items-center">
              <span className="text-base sm:text-lg font-black font-mono text-amber-400">20+ Apps</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-sans">Production Scale</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-col items-center">
              <span className="text-base sm:text-lg font-black font-mono text-emerald-400">100%</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-sans">Performance Vitals</span>
            </div>
          </div>
        </div>

        {/* Navigation Selector Tabs: Missions | Starfleet Hangar | Direct Portals */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/90 border border-slate-800/90 mb-5 sm:mb-6 max-w-md w-full backdrop-blur-xl">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('missions');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'missions'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>MISSIONS</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('hangar');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'hangar'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>STARFLEET ({activeShipData.name.split(' ')[1]})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('portals');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'portals'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>WARP PORTALS</span>
          </button>
        </div>

        {/* 3. TAB PANELS */}
        <div className="w-full max-w-4xl">
          {/* A. MISSIONS TAB */}
          {activeTab === 'missions' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 animate-in fade-in duration-200">
              {/* Mission 1: Guided Autopilot Tour (FEATURED) */}
              <div className="relative group md:col-span-1 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900/80 to-slate-950/90 border-2 border-cyan-500/60 p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all">
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  RECOMMENDED
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-3.5 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <Play className="w-6 h-6 fill-cyan-400" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold font-sans text-white mb-1.5">
                    Cinematic Autopilot Tour
                  </h2>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Sit back and enjoy an automated 5-stop aerial flyover with interactive commentary through Toyota & Pampers case studies, skills arena, and bio.
                  </p>
                </div>

                <button
                  onClick={handleStartTour}
                  disabled={!isReady}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>START GUIDED TOUR</span>
                </button>
              </div>

              {/* Mission 2: Free Roam 3D Flight */}
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-3.5 text-cyan-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold font-sans text-white mb-1.5">
                    Free-Flight 3D World
                  </h2>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Take full manual 6-DOF controls! Fly freely across floating archipelagos, crystal spires, cyber bridges, and shoot skill gems with laser cannons.
                  </p>
                </div>

                <button
                  onClick={handleFreeRoam}
                  disabled={!isReady}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>ENTER FREE ROAM</span>
                </button>
              </div>

              {/* Mission 3: Space Arcade Battles */}
              <div className="rounded-2xl bg-gradient-to-b from-purple-950/30 via-slate-900/80 to-slate-950/90 border border-purple-500/40 hover:border-purple-500/70 p-5 flex flex-col justify-between shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center mb-3.5 text-purple-400">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-base sm:text-lg font-bold font-sans text-white">
                      Space Mini-Games
                    </h2>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
                      ARCADE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Fast-paced space action! Test your reflexes in the Dogfight rail shooter or clock record times in the Warp Gate Race.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleStartDogfight}
                    disabled={!isReady}
                    className="w-full py-2.5 px-3 rounded-xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 border border-purple-500/50 font-mono font-bold text-xs flex items-center justify-between active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-purple-400" />
                      SPACE DOGFIGHT
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">
                      HI: {dogfightHighScore} PTS
                    </span>
                  </button>

                  <button
                    onClick={handleStartWarpRace}
                    disabled={!isReady}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-500/50 font-mono font-bold text-xs flex items-center justify-between active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      WARP GATE RACE
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      HI: {warpRaceHighScore} PTS
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. STARFLEET HANGAR TAB */}
          {activeTab === 'hangar' && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold font-sans text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                    Starfleet Pre-Flight Configurator
                  </h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Choose your flight chassis and tune thruster plasma emissions before launching.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Plasma Spectra:</span>
                  <div className="flex items-center gap-1.5">
                    {thrusterColorPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectThruster(preset.hex)}
                        className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                          thrusterColor === preset.hex
                            ? 'scale-125 ring-2 ring-white shadow-[0_0_10px_currentColor]'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: preset.hex, color: preset.hex }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Ship Class Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
                {shipClasses.map((ship) => {
                  const isSelected = selectedShip === ship.id;
                  return (
                    <div
                      key={ship.id}
                      onClick={() => handleSelectShip(ship.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm font-sans text-white">{ship.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-cyan-400 block mb-2">{ship.tagline}</span>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3">
                          {ship.description}
                        </p>
                      </div>

                      {/* Stat Bars */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Speed</span>
                          <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-400 h-full" style={{ width: `${ship.stats.speed}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Handling</span>
                          <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-400 h-full" style={{ width: `${ship.stats.handling}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Shields</span>
                          <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full" style={{ width: `${ship.stats.shielding}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ready to Fly Button */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleFreeRoam}
                  disabled={!isReady}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 shadow-md active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Rocket className="w-4 h-4" />
                  <span>LAUNCH WITH {activeShipData.name.toUpperCase()}</span>
                </button>
              </div>
            </div>
          )}

          {/* C. WARP PORTALS TAB */}
          {activeTab === 'portals' && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl animate-in fade-in duration-200">
              <div className="pb-3 mb-4 border-b border-slate-800">
                <h2 className="text-lg font-bold font-sans text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Direct Warp Gateways
                </h2>
                <p className="text-xs text-slate-400 font-sans">
                  Instant fast-travel directly to specific archipelago case studies or credentials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => handleDirectWarp('projects')}
                  className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/40 hover:border-blue-400 text-left flex flex-col justify-between group transition-all active:scale-95 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-xs mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>PROJECTS HUB</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mb-3">
                      Toyota TMNA, P&G Pampers, PC Builder 3D, and Diveroid case studies.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    WARP NOW <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => handleDirectWarp('skills')}
                  className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 hover:border-emerald-400 text-left flex flex-col justify-between group transition-all active:scale-95 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs mb-1">
                      <Crosshair className="w-4 h-4" />
                      <span>SKILLS ARENA</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mb-3">
                      Interactive target range for React 19, Three.js, TypeScript, and cloud stacks.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    WARP NOW <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => handleDirectWarp('experience')}
                  className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/40 hover:border-purple-400 text-left flex flex-col justify-between group transition-all active:scale-95 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-purple-400 font-bold font-mono text-xs mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>CAREER ROAD</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mb-3">
                      6+ years timeline across Omnicom Media Group, Code Garage, and Daryl Tech.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    WARP NOW <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => handleDirectWarp('contact')}
                  className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/40 hover:border-rose-400 text-left flex flex-col justify-between group transition-all active:scale-95 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs mb-1">
                      <Mail className="w-4 h-4" />
                      <span>CONTACT SPIRE</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mb-3">
                      Direct messaging portal, email, social channels, and scheduling.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    WARP NOW <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading / Ready Progress Bar */}
        <div className="w-full max-w-md mt-6">
          <div className="w-full bg-slate-900/90 rounded-full h-2 border border-slate-800 p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(0,240,255,0.6)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[10px] font-mono text-slate-400 mt-1.5">
            <span>{isReady ? '3D ENGINE READY // ALL SYSTEMS NOMINAL' : 'INITIALIZING PROCEDURAL SPACE ENGINE...'}</span>
            <span className="text-cyan-400 font-bold">{Math.min(progress, 100)}%</span>
          </div>
        </div>
      </main>

      {/* 4. FOOTER WITH QUICK SOCIAL & CONTACT CHANNELS */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
          <a
            href={aboutData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={aboutData.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedEmail ? 'Copied!' : aboutData.email}</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500">
          <span>Steer: <kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">WASD</kbd></span>
          <span>•</span>
          <span>Altitude: <kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">Space</kbd>/<kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">Ctrl</kbd></span>
          <span>•</span>
          <span>Lasers: <kbd className="px-1 bg-slate-800 text-cyan-300 rounded border border-slate-700">F</kbd></span>
        </div>
      </footer>

      {/* 5. RECRUITER "AT-A-GLANCE" MODAL */}
      {isRecruiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090e1a] border border-cyan-500/50 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 mb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-white font-bold font-sans text-lg">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Executive Recruiter Summary</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  Vishav Garg • 6+ Years Experience • Bengaluru, India
                </span>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsRecruiterModalOpen(false);
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Value Statement */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {aboutData.summary}
            </div>

            {/* Key Accomplishments */}
            <div className="mb-4">
              <h3 className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wide">
                Key Enterprise Highlights
              </h3>
              <div className="space-y-2 text-xs text-slate-300 font-sans">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong className="text-white">Toyota Motor North America:</strong> Architected multi-brand frontend applications serving 50k+ daily users, improving page speeds by 38%.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong className="text-white">Procter & Gamble (Pampers):</strong> Built high-concurrency rewards and e-commerce portal handling 100k+ concurrent active sessions.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong className="text-white">PC Builder 3D & IoT:</strong> Engineered WebGL Three.js interactive configurators and real-time Bluetooth IoT telemetry dashboards.
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="mb-5">
              <h3 className="text-xs font-mono font-bold text-cyan-400 mb-2 uppercase tracking-wide">
                Core Competencies & Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'React 19 / 18',
                  'Next.js 15 / 14',
                  'TypeScript',
                  'Three.js / WebGL',
                  'Vue.js / Nuxt 3',
                  'Node.js / NestJS',
                  'GraphQL / REST',
                  'Tailwind CSS',
                  'State (Zustand/Redux)',
                  'Micro-Frontends',
                  'Azure DevOps / CI/CD',
                  'Performance (CWV)'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/40 text-blue-300 font-mono text-xs flex items-center gap-1.5"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => {
                  setIsRecruiterModalOpen(false);
                  handleStartTour();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>START GUIDED 3D TOUR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
