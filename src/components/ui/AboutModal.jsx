import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { aboutData } from '../../data/aboutData';
import { 
  X, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Download,
  ExternalLink 
} from 'lucide-react';

export const AboutModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const showToast = useUIStore((s) => s.showToast);
  const setClassicMode = useUIStore((s) => s.setClassicMode);

  if (activeModal !== 'about') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-3xl bg-[#0f172a] border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center font-mono font-bold text-xl sm:text-2xl text-cyan-400">
                VG
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white font-sans">{aboutData.name}</h2>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 mt-0.5">{aboutData.title}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  {aboutData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {aboutData.experienceYears} Exp
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto touch-scroll space-y-5 sm:space-y-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Professional Summary
            </h3>
            <p className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 text-slate-200 text-sm leading-relaxed">
              {aboutData.summary}
            </p>
          </div>

          {/* Core Architectural Expertise */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
              Core Architectural Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {aboutData.coreExpertise.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Personal Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h3>
              <p className="font-semibold text-white text-sm">{aboutData.education.degree}</p>
              <p className="text-xs text-slate-400 mt-0.5">{aboutData.education.institution}</p>
              <p className="text-xs text-cyan-400 font-mono mt-1">{aboutData.education.period}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400 mb-2">
                Passions & Focus Areas
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {aboutData.interests.map((interest, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/40 text-blue-300 text-xs font-mono transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={aboutData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={() => {
                closeModal();
                setClassicMode(true);
                showToast('Executive CV Suite', 'Opening printable executive CV...', 'success');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>VIEW & DOWNLOAD CV (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
