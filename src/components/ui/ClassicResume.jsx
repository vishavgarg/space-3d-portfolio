import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { aboutData } from '../../data/aboutData';
import { projectsData } from '../../data/projectsData';
import { skillsData } from '../../data/skillsData';
import { experienceData } from '../../data/experienceData';
import { 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Printer
} from 'lucide-react';

export const ClassicResume = () => {
  const setClassicMode = useUIStore((s) => s.setClassicMode);

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-[#070a12] text-slate-100 p-3 sm:p-8 md:p-12 overflow-y-auto font-sans selection:bg-cyan-500 selection:text-black touch-scroll pt-safe pb-safe">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 bg-[#0f172a] p-4 sm:p-10 md:p-12 rounded-3xl border border-slate-800 shadow-2xl mb-24">
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-800 print:hidden">
          <button
            onClick={() => setClassicMode(false)}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>RETURN TO 3D WORLD</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <div className="space-y-2.5 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            {aboutData.name}
          </h1>
          <p className="text-xs sm:text-base font-mono text-cyan-400 font-semibold">
            {aboutData.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`mailto:${aboutData.email}`} className="hover:text-white transition-colors">{aboutData.email}</a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`tel:${aboutData.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{aboutData.phone}</a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              {aboutData.location}
            </span>
            <span>•</span>
            <a href={aboutData.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>linkedin.com/in/mrvishav</span>
            </a>
            <span>•</span>
            <a href={aboutData.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>github.com/vishavgarg</span>
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {aboutData.summary}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            Technical Skills & Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsData.categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                <h3 className="text-xs font-bold text-white font-sans">{cat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {cat.skills.map((s) => s.name).join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-mono text-cyan-400 font-semibold">{exp.company} — {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-1">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Headline Project Case Studies */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            Headline Project Portfolio
          </h2>
          <div className="space-y-6">
            {projectsData.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white font-sans">{proj.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {proj.badge}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Client: <strong className="text-slate-200">{proj.client}</strong> • Role: <strong className="text-slate-200">{proj.role}</strong> • Scale: <strong className="text-slate-200">{proj.scale}</strong>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.overview}</p>
                
                {/* Architecture Highlights */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono text-cyan-400 font-semibold mb-1">Architecture & Key Contributions:</p>
                  <ul className="space-y-1">
                    {proj.architecture.slice(0, 3).map((arch, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400">▹</span>
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Personal Projects */}
        <section className="space-y-4 pb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            Education & Background
          </h2>
          <div className="flex flex-wrap justify-between items-center text-xs">
            <div>
              <p className="font-bold text-white text-sm">{aboutData.education.degree}</p>
              <p className="text-slate-400 mt-0.5">{aboutData.education.institution}</p>
            </div>
            <span className="font-mono text-cyan-400 font-semibold">{aboutData.education.period}</span>
          </div>
        </section>
      </div>
    </div>
  );
};
