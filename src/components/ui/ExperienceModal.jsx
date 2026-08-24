import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { experienceData } from '../../data/experienceData';
import { X, Sparkles, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);

  if (activeModal !== 'experience') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-2.5 sm:gap-3">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 shrink-0" />
              <span>Career Timeline</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              6+ years driving enterprise frontend architecture, code quality, and engineering teams.
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto touch-scroll space-y-6 sm:space-y-8">
          {experienceData.map((exp, idx) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-3">
              {/* Timeline Marker Node */}
              <div
                className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 shadow-md"
                style={{ backgroundColor: exp.badgeColor }}
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">{exp.role}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-0.5">
                    <span className="flex items-center gap-1 text-slate-200 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-2 pt-2">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-800/80 text-[11px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
