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
  ArrowUpRight,
  Radio,
  Sliders,
  Globe
} from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [activeRightView, setActiveRightView] = useState('gateways'); // 'gateways' | 'ship'

  // Global Stores
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
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const isReady = progress >= 100;

  // Sound Engine Handlers
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
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050811]/94 text-slate-100 overflow-y-auto overflow-x-hidden backdrop-blur-2xl transition-all select-none min-h-[100dvh]">
      {/* Subtle Starlight Depth & Radial Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,208,97,0.04),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,240,255,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_60%,transparent_100%)]" />
      </div>

      {/* 1. MINIMALIST PLATINUM FLOATING NAV */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 sm:pt-7 shrink-0">
        <div className="w-full rounded-2xl p-1 bg-white/[0.04] border border-white/[0.08] backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          <div className="w-full rounded-xl px-4 sm:px-6 py-3 bg-[#080d18]/90 flex flex-wrap items-center justify-between gap-3">
            {/* Identity & Status */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center font-mono font-bold text-xs text-white tracking-wider">
                VG
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-white font-sans">
                    VISHAV GARG
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    OPEN FOR SENIOR ROLES
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 tracking-tight">
                  SENIOR FRONTEND ARCHITECT • 3D WEBGL
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsRecruiterModalOpen(true);
                }}
                className="hidden xs:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-mono transition-all active:scale-[0.98] cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#e6c387]" />
                <span>30S BRIEF</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setClassicMode(true);
                  startExperience();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-mono transition-all active:scale-[0.98] cursor-pointer"
                title="Switch to Traditional Document Resume"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                <span>CLASSIC CV</span>
              </button>

              {/* Procedural Audio Engine Toggle */}
              <button
                onClick={() => {
                  toggleAudio();
                  if (isAudioMuted) soundEngine.playClick();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all active:scale-[0.98] cursor-pointer text-xs font-mono ${
                  !isAudioMuted
                    ? 'bg-amber-400/[0.08] border-amber-300/30 text-amber-200 shadow-[0_0_15px_rgba(245,208,97,0.1)]'
                    : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-slate-200'
                }`}
                title={isAudioMuted ? 'Turn Audio ON' : 'Mute Audio'}
              >
                {!isAudioMuted ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#f5d061]" />
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2 bg-[#f5d061] animate-pulse" />
                      <span className="w-0.5 h-3 bg-[#f5d061] animate-pulse delay-75" />
                      <span className="w-0.5 h-1.5 bg-[#f5d061] animate-pulse delay-150" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline text-[11px]">MUTED</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ASYMMETRIC DUAL-STAGE EDITORIAL VIEWPORT */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: EDITORIAL HERO & LAUNCH MATRIX (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs font-mono tracking-widest uppercase mb-4 w-max">
            <Sparkles className="w-3 h-3 text-[#f5d061]" />
            <span>Interactive 3D WebGL Portfolio</span>
          </div>

          {/* Majestic Wide Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white leading-[1.1] mb-4">
            Architecting enterprise platforms & immersive spatial web.
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl mb-6">
            Senior Frontend Engineer with 6+ years designing high-performance architectures, design systems, and WebGL visualizations for{' '}
            <strong className="text-white font-semibold">Toyota Motor North America</strong> and{' '}
            <strong className="text-white font-semibold">Procter & Gamble (Pampers)</strong>.
          </p>

          {/* Proven Credentials Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 max-w-xl">
            <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06] flex flex-col">
              <span className="text-sm font-bold font-mono text-white">6+ Years</span>
              <span className="text-[10px] text-slate-400 font-sans">Full Stack & Frontend</span>
            </div>
            <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06] flex flex-col">
              <span className="text-sm font-bold font-mono text-[#f5d061]">Fortune 500</span>
              <span className="text-[10px] text-slate-400 font-sans">Toyota & P&G</span>
            </div>
            <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06] flex flex-col">
              <span className="text-sm font-bold font-mono text-cyan-400">20+ Apps</span>
              <span className="text-[10px] text-slate-400 font-sans">Production Scale</span>
            </div>
            <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06] flex flex-col">
              <span className="text-sm font-bold font-mono text-emerald-400">100%</span>
              <span className="text-[10px] text-slate-400 font-sans">Performance Vitals</span>
            </div>
          </div>

          {/* Primary Action Button Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Primary Solid White Pill CTA */}
            <button
              onClick={handleStartTour}
              disabled={!isReady}
              className="group py-3.5 pl-6 pr-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center justify-between shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer disabled:opacity-50 transition-all"
            >
              <span>START GUIDED TOUR (5 STOPS)</span>
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform ml-4">
                <Play className="w-3.5 h-3.5 fill-white" />
              </div>
            </button>

            {/* Secondary Frosted Glass CTA */}
            <button
              onClick={handleFreeRoam}
              disabled={!isReady}
              className="group py-3.5 px-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.12] font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 transition-all"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>FREE ROAM 3D</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: STABLE LIVE FLIGHT DECK (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {/* Stage View Switcher - Warp Gateways First */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-full">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveRightView('gateways');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRightView === 'gateways'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>WARP GATEWAYS</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveRightView('ship');
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRightView === 'ship'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>STARFLEET CHASSIS</span>
            </button>
          </div>

          {/* STABLE-HEIGHT RIGHT CARD CONTAINER (PREVENTS VERTICAL LAYOUT SHIFTING) */}
          <div className="rounded-2xl p-1 bg-white/[0.04] border border-white/[0.08] shadow-2xl min-h-[385px] flex flex-col justify-between">
            <div className="rounded-xl p-5 bg-[#080d18]/90 min-h-[377px] flex flex-col justify-between">
              {/* VIEW 1: DIRECT WARP GATEWAYS (DEFAULT & FIRST) */}
              {activeRightView === 'gateways' && (
                <div className="flex flex-col justify-between h-full animate-in fade-in duration-200">
                  <div>
                    <div className="pb-3 mb-3 border-b border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        Direct Teleport Gateways
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">1-CLICK JUMP</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5">
                      <button
                        onClick={() => handleDirectWarp('projects')}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-cyan-400/40 text-left transition-all active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-cyan-400 text-xs font-mono font-bold mb-1">
                          <span>PROJECTS HUB</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          Toyota TMNA, P&G Pampers, PC Builder 3D
                        </p>
                      </button>

                      <button
                        onClick={() => handleDirectWarp('skills')}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-emerald-400/40 text-left transition-all active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-emerald-400 text-xs font-mono font-bold mb-1">
                          <span>SKILLS ARENA</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          React 19, Three.js, TypeScript, Cloud
                        </p>
                      </button>

                      <button
                        onClick={() => handleDirectWarp('experience')}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-[#f5d061]/40 text-left transition-all active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[#f5d061] text-xs font-mono font-bold mb-1">
                          <span>CAREER ROAD</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          6+ Years timeline across top agencies
                        </p>
                      </button>

                      <button
                        onClick={() => handleDirectWarp('contact')}
                        className="p-3 rounded-xl bg-black/30 border border-white/[0.06] hover:border-rose-400/40 text-left transition-all active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-rose-400 text-xs font-mono font-bold mb-1">
                          <span>CONTACT SPIRE</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          Direct messaging and hire inquiry
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Mini Arcade Launcher */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={handleStartDogfight}
                      disabled={!isReady}
                      className="py-2.5 px-3 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center justify-between active:scale-[0.98] cursor-pointer transition-all"
                    >
                      <span className="font-semibold">DOGFIGHT ARCADE</span>
                      <span className="text-[10px] text-purple-400">{dogfightHighScore} PTS</span>
                    </button>

                    <button
                      onClick={handleStartWarpRace}
                      disabled={!isReady}
                      className="py-2.5 px-3 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center justify-between active:scale-[0.98] cursor-pointer transition-all"
                    >
                      <span className="font-semibold">WARP GATE RACE</span>
                      <span className="text-[10px] text-amber-400">{warpRaceHighScore} PTS</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: STARFLEET FLIGHT CHASSIS & SPECTRAL TUNER */}
              {activeRightView === 'ship' && (
                <div className="flex flex-col justify-between h-full animate-in fade-in duration-200">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#f5d061]" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Flight Configurator
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {thrusterColorPresets.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => handleSelectThruster(preset.hex)}
                            className={`w-5 h-5 rounded-full transition-all cursor-pointer ${
                              thrusterColor === preset.hex
                                ? 'scale-125 ring-2 ring-white shadow-[0_0_8px_currentColor]'
                                : 'opacity-60 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: preset.hex, color: preset.hex }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Ship Chassis Selection Cards */}
                    <div className="space-y-2 mb-3">
                      {shipClasses.map((ship) => {
                        const isSelected = selectedShip === ship.id;
                        return (
                          <div
                            key={ship.id}
                            onClick={() => handleSelectShip(ship.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white/[0.06] border-white/20 shadow-md'
                                : 'bg-black/30 border-white/[0.04] hover:border-white/[0.1]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white font-sans">{ship.name}</span>
                                <span className="text-[10px] font-mono text-slate-400">{ship.tagline}</span>
                              </div>
                              {isSelected && (
                                <span className="px-2 py-0.5 rounded-full bg-white text-slate-950 text-[9px] font-mono font-bold">
                                  SELECTED
                                </span>
                              )}
                            </div>

                            {/* Telemetry Bars */}
                            <div className="grid grid-cols-3 gap-2 mt-1.5 pt-1.5 border-t border-white/[0.04] text-[9px] font-mono text-slate-400">
                              <div>
                                <span>Speed {ship.stats.speed}%</span>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-0.5 overflow-hidden">
                                  <div className="bg-white h-full" style={{ width: `${ship.stats.speed}%` }} />
                                </div>
                              </div>
                              <div>
                                <span>Agility {ship.stats.handling}%</span>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-0.5 overflow-hidden">
                                  <div className="bg-[#f5d061] h-full" style={{ width: `${ship.stats.handling}%` }} />
                                </div>
                              </div>
                              <div>
                                <span>Armor {ship.stats.shielding}%</span>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-0.5 overflow-hidden">
                                  <div className="bg-cyan-400 h-full" style={{ width: `${ship.stats.shielding}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Launch */}
                  <button
                    onClick={handleFreeRoam}
                    disabled={!isReady}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 transition-all pt-2"
                  >
                    <Rocket className="w-3.5 h-3.5 text-[#f5d061]" />
                    <span>LAUNCH WITH {activeShipData.name.toUpperCase()}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Engine Initialization Bar */}
          <div className="w-full">
            <div className="w-full bg-slate-900/90 rounded-full h-1.5 border border-white/[0.06] p-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-white via-[#f5d061] to-cyan-400 h-full rounded-full transition-all duration-200 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between w-full text-[10px] font-mono text-slate-400 mt-1">
              <span>{isReady ? '3D WebGL Engine Online // All Systems Nominal' : 'Loading Procedural Space Assets...'}</span>
              <span className="text-white font-bold">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </div>
      </main>

      {/* 3. MINIMALIST FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-5 sm:pb-7 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
        <div className="flex items-center flex-wrap gap-4">
          <a
            href={aboutData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={aboutData.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedEmail ? 'Copied!' : aboutData.email}</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
          <span>Flight Controls: <kbd className="px-1.5 py-0.5 bg-white/[0.06] text-white rounded border border-white/[0.1]">WASD</kbd> Steer</span>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 bg-white/[0.06] text-white rounded border border-white/[0.1]">Space</kbd>/<kbd className="px-1.5 py-0.5 bg-white/[0.06] text-white rounded border border-white/[0.1]">Ctrl</kbd> Altitude</span>
          <span>•</span>
          <span><kbd className="px-1.5 py-0.5 bg-white/[0.06] text-white rounded border border-white/[0.1]">F</kbd> Fire</span>
        </div>
      </footer>

      {/* 4. RECRUITER 30S OVERVIEW MODAL */}
      {isRecruiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl p-1 bg-white/[0.08] border border-white/[0.15] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="rounded-xl p-6 bg-[#080d18]/95">
              {/* Header */}
              <div className="flex items-start justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg font-bold font-sans text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#f5d061]" />
                    <span>Executive Recruiter Summary</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Vishav Garg • 6+ Years Experience • Bengaluru, India
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsRecruiterModalOpen(false);
                  }}
                  className="p-1.5 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bio Summary */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {aboutData.summary}
              </div>

              {/* Enterprise Highlights */}
              <div className="mb-4">
                <h4 className="text-xs font-mono font-bold text-white mb-2 uppercase tracking-wide">
                  Enterprise Production Impact
                </h4>
                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                    <strong className="text-white">Toyota Motor North America:</strong> Architected multi-brand frontend applications serving 50k+ daily users, improving page performance by 38%.
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                    <strong className="text-white">Procter & Gamble (Pampers):</strong> Built high-concurrency rewards and commerce ecosystem supporting 100k+ concurrent active sessions.
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                    <strong className="text-white">PC Builder 3D & IoT:</strong> Engineered WebGL Three.js interactive configurators and real-time Bluetooth IoT telemetry dashboards.
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-5">
                <h4 className="text-xs font-mono font-bold text-white mb-2 uppercase tracking-wide">
                  Core Technologies
                </h4>
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
                    'Zustand / Redux',
                    'Micro-Frontends',
                    'Azure DevOps / CI/CD',
                    'Performance (CWV)'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-200 border border-white/[0.08] text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                  </button>
                  <a
                    href={aboutData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-900/30 hover:bg-blue-800/40 border border-blue-400/30 text-blue-200 font-mono text-xs flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    setIsRecruiterModalOpen(false);
                    handleStartTour();
                  }}
                  className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>START GUIDED 3D TOUR</span>
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
