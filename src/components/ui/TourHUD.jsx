import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Compass, ExternalLink, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { useTourStore, tourStops } from '../../store/tourStore';
import { useUIStore } from '../../store/uiStore';

export const TourHUD = () => {
  const isTourActive = useTourStore((s) => s.isTourActive);
  const currentStopIndex = useTourStore((s) => s.currentStopIndex);
  const isTransitioning = useTourStore((s) => s.isTransitioning);
  const nextStop = useTourStore((s) => s.nextStop);
  const prevStop = useTourStore((s) => s.prevStop);
  const goToStop = useTourStore((s) => s.goToStop);
  const exitTour = useTourStore((s) => s.exitTour);

  const activeModal = useUIStore((s) => s.activeModal);
  const setActiveModal = useUIStore((s) => s.setActiveModal);

  const [isMinimized, setIsMinimized] = useState(false);

  // If tour not active or a modal is currently open, hide tour HUD
  if (!isTourActive || activeModal !== null) return null;

  const currentStop = tourStops[currentStopIndex] || tourStops[0];
  const isFirst = currentStopIndex === 0;
  const isLast = currentStopIndex === tourStops.length - 1;

  const handleActionClick = () => {
    if (currentStop.actionModal) {
      setActiveModal(currentStop.actionModal);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none flex flex-col justify-between p-4 sm:p-6">
      {/* 1. Top Sleek Tour Progress Bar */}
      <div className="flex justify-center pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">AUTOPILOT TOUR:</span>
            <span>STOP {currentStopIndex + 1}/{tourStops.length}</span>
          </div>

          {/* Clickable Waypoint Dots */}
          <div className="flex items-center gap-1.5 ml-1">
            {tourStops.map((stop, idx) => {
              const isCurrent = idx === currentStopIndex;
              const isPast = idx < currentStopIndex;
              return (
                <button
                  key={stop.id}
                  onClick={() => goToStop(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                      : isPast
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={stop.title}
                />
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-800 ml-1" />

          {/* Exit / Free Roam Button */}
          <button
            onClick={exitTour}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </div>
      </div>

      {/* 2. Transitioning In-Flight Mini Banner (Non-intrusive) */}
      {isTransitioning && !isMinimized && (
        <div className="flex justify-center pointer-events-auto mb-6">
          <div className="px-5 py-2 rounded-full bg-slate-950/85 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2.5 text-xs font-mono text-cyan-300 animate-pulse">
            <span>✈️ Gliding along Cyber Bridge to</span>
            <strong className="text-white">{currentStop.title}</strong>
          </div>
        </div>
      )}

      {/* 3. Compact Floating Bottom-Right Tour Guide Card */}
      {!isTransitioning && (
        <div className="flex justify-end items-end pointer-events-auto">
          {isMinimized ? (
            /* Minimized Pill */
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-xs shadow-2xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{currentStop.title}</span>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>
          ) : (
            /* Expanded Compact Card (Right Corner, doesn't block center 3D scene) */
            <div className="relative w-full max-w-sm sm:max-w-md bg-slate-950/90 border border-cyan-500/40 rounded-3xl p-4 sm:p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in slide-in-from-right duration-250">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold mb-1">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    {currentStop.badge}
                  </span>
                  <h2 className="text-base font-bold text-white font-sans leading-tight">
                    {currentStop.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Minimize info card"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Narrative Text */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                {currentStop.description}
              </p>

              {/* Action & Navigation Stepper Bar */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                {/* Interactive Modal Action */}
                <button
                  onClick={handleActionClick}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate max-w-[150px]">{currentStop.actionLabel}</span>
                </button>

                {/* Next / Prev Stepper */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevStop}
                    disabled={isFirst}
                    className={`p-1.5 rounded-xl border text-xs font-mono transition-all ${
                      isFirst
                        ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white active:scale-95 cursor-pointer'
                    }`}
                    title="Previous Stop"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextStop}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-md"
                  >
                    <span>{isLast ? 'FINISH' : 'NEXT'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
