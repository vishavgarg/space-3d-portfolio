import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { skillsData } from '../../data/skillsData';
import { X, Crosshair, CheckCircle, Code2, Cpu, Cloud, Sparkles } from 'lucide-react';

export const SkillsModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);

  if (activeModal !== 'skills') return null;

  const categoryIcons = {
    frontend: <Code2 className="w-5 h-5 text-cyan-400" />,
    architecture: <Cpu className="w-5 h-5 text-purple-400" />,
    'backend-cloud': <Cloud className="w-5 h-5 text-emerald-400" />,
    'ai-emerging': <Sparkles className="w-5 h-5 text-pink-400" />
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-emerald-500/40 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-3">
              <Crosshair className="w-7 h-7 text-emerald-400" />
              Technical Skill Architecture
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              Production-tested proficiencies, core competencies, and associated enterprise projects.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm font-sans">
          {skillsData.categories.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-800">
                {categoryIcons[cat.id]}
                <h3 className="text-base font-bold text-white font-sans">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white font-mono">{skill.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                          {skill.level} • {skill.exp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.desc}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500">Shipped in:</span>
                      {skill.projects.map((p, pIdx) => (
                        <span key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
