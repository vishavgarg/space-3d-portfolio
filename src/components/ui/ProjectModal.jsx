import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Cpu, 
  Briefcase, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export const ProjectModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const selectedProject = useUIStore((s) => s.selectedProject);
  const closeModal = useUIStore((s) => s.closeModal);

  if (activeModal !== 'project' || !selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/50 text-cyan-300">
                {selectedProject.domain}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 border border-purple-500/50 text-purple-300">
                {selectedProject.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              {selectedProject.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-slate-400">
              <span>Client / Organization: <strong className="text-slate-200">{selectedProject.client}</strong></span>
              <span>•</span>
              <span>Role: <strong className="text-cyan-400">{selectedProject.role}</strong></span>
              <span>•</span>
              <span>Scale: <strong className="text-slate-200">{selectedProject.scale}</strong></span>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Executive Overview
            </h3>
            <p className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-200 leading-relaxed">
              {selectedProject.overview}
            </p>
          </div>

          {/* Business / Technical Problem Solved */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              The Engineering Challenge Solved
            </h3>
            <p className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-100/90 leading-relaxed text-xs sm:text-sm">
              {selectedProject.problem}
            </p>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Architecture & System Design Highlights
            </h3>
            <div className="space-y-2.5">
              {selectedProject.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features & Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Features */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Key Product Capabilities
              </h3>
              <ul className="space-y-2">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Measurable Impact & Outcomes
              </h3>
              <ul className="space-y-2">
                {selectedProject.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
