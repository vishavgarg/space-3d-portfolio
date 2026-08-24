import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { projectsData } from '../../data/projectsData';
import { X, Briefcase, ChevronRight, Layers, Star } from 'lucide-react';

export const ProjectsGalleryModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const openProjectModal = useUIStore((s) => s.openProjectModal);

  const [filter, setFilter] = useState('all'); // 'all' | 'enterprise' | 'solo' | 'ai'

  if (activeModal !== 'projects') return null;

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'enterprise') return p.badge.includes('Fortune 500') || p.badge.includes('Telemetry');
    if (filter === 'solo') return p.badge.includes('Solo');
    if (filter === 'ai') return p.domain.includes('AI') || p.technologies.some((t) => t.includes('OpenAI'));
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-blue-500/40 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-2.5 sm:gap-3">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 shrink-0" />
              <span>Engineering Portfolio</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              Select any project to explore architectural breakdowns, problems solved, and tech stacks.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 sm:px-8 py-2.5 sm:py-3 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono touch-scroll">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ALL ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter('enterprise')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'enterprise' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ENTERPRISE
          </button>
          <button
            onClick={() => setFilter('solo')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'solo' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            SOLO BUILDS
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              filter === 'ai' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            AI SYSTEMS
          </button>
        </div>

        {/* Projects Grid */}
        <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto touch-scroll grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openProjectModal(proj)}
              className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group cursor-pointer flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-cyan-300">
                    {proj.domain}
                  </span>
                  {proj.isHeadline && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      HEADLINE
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {proj.overview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                  {proj.technologies.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-500 self-center">
                      +{proj.technologies.length - 3}
                    </span>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
