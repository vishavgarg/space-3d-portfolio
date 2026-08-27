import React, { useState, useEffect } from 'react';
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
  Printer,
  Copy,
  Check,
  FileText,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Award,
  Briefcase,
  Cpu,
  GraduationCap,
  Globe
} from 'lucide-react';

export const ClassicResume = () => {
  const setClassicMode = useUIStore((s) => s.setClassicMode);
  const showToast = useUIStore((s) => s.showToast);

  const [activeTab, setActiveTab] = useState('executive'); // 'executive' | 'dossier' | 'ats'
  const [themeMode, setThemeMode] = useState('paper'); // 'paper' | 'cyber'
  const [copiedAts, setCopiedAts] = useState(false);

  // Enable document scrolling and text selection while in Classic Resume mode
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlHeight = document.documentElement.style.height;
    const originalUserSelect = document.body.style.userSelect;

    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.userSelect = 'text';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.height = originalBodyHeight;
      document.documentElement.style.height = originalHtmlHeight;
      document.body.style.userSelect = originalUserSelect;
    };
  }, []);

  // Generate clean ATS plain-text / markdown
  const generateAtsText = () => {
    return `${aboutData.name.toUpperCase()}
${aboutData.title}
${aboutData.email} | ${aboutData.phone} | ${aboutData.location}
LinkedIn: ${aboutData.linkedin} | GitHub: ${aboutData.github}

============================================================
PROFESSIONAL SUMMARY
============================================================
${aboutData.summary}

============================================================
CORE TECHNICAL COMPETENCIES
============================================================
* Frontend & Architecture: React.js, Next.js, TypeScript, Vue.js, Nuxt 3, Redux Toolkit, Pinia, Tailwind CSS
* Backend, Database & Cloud: Node.js, NestJS, Express.js, PostgreSQL, Supabase, MySQL, AWS (S3, EC2, RDS), Azure DevOps CI/CD
* Systems & Performance: Server-Side Rendering (SSR), Component Libraries, Design Systems, Core Web Vitals, Cognito, JWT, Micro Frontends
* AI & Emerging Tech: OpenAI LLM Integration, Prompt Engineering, React Flow (Graph UIs), Three.js (WebGL), Contentful, Uniform CMS

============================================================
PROFESSIONAL EXPERIENCE
============================================================
${experienceData.map(exp => `
${exp.role.toUpperCase()} — ${exp.company}
${exp.period} | ${exp.location} | ${exp.highlight}
${exp.responsibilities.map(r => `• ${r}`).join('\n')}
Tech Stack: ${exp.tech.join(', ')}
`).join('\n')}

============================================================
SELECTED FLAGSHIP PROJECTS
============================================================
${projectsData.map(proj => `
${proj.title.toUpperCase()} (${proj.client})
Role: ${proj.role} | Scale: ${proj.scale}
Overview: ${proj.overview}
Architecture Highlights:
${proj.architecture.map(a => `• ${a}`).join('\n')}
Technologies: ${proj.technologies.join(', ')}
`).join('\n')}

============================================================
EDUCATION
============================================================
${aboutData.education.degree}
${aboutData.education.institution} (${aboutData.education.period})
`;
  };

  const handleCopyAts = () => {
    const text = generateAtsText();
    navigator.clipboard.writeText(text);
    setCopiedAts(true);
    showToast('ATS Text Copied', 'Plaintext resume copied to clipboard for job applications!', 'success');
    setTimeout(() => setCopiedAts(false), 2500);
  };

  const handlePrint = () => {
    showToast('PDF Export', 'Opening print dialog. Select "Save as PDF" for an executive document.', 'info');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const isPaper = themeMode === 'paper';

  return (
    <div className={`printable-resume-root relative min-h-screen w-full font-sans selection:bg-cyan-500 selection:text-black touch-scroll pt-safe pb-safe transition-colors duration-300 print:min-h-0 print:p-0 print:m-0 print:static print:overflow-visible print:bg-white print:text-slate-950 ${
      isPaper ? 'bg-slate-100 text-slate-900' : 'bg-[#050811] text-slate-100'
    }`}>
      
      {/* Top Floating Control Bar (Print Hidden) */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 print:hidden ${
        isPaper ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-[#0b1329]/90 border-slate-800/80 shadow-2xl'
      }`}>
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Back to 3D */}
          <button
            onClick={() => setClassicMode(false)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">RETURN TO 3D WORLD</span>
            <span className="sm:hidden">3D WORLD</span>
          </button>

          {/* View Switcher Tabs */}
          <div className={`flex items-center p-1 rounded-xl border text-xs font-mono transition-colors ${
            isPaper ? 'bg-slate-200/70 border-slate-300 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-300'
          }`}>
            <button
              onClick={() => setActiveTab('executive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'executive'
                  ? isPaper ? 'bg-white text-slate-950 font-bold shadow-sm' : 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Executive CV</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'dossier'
                  ? isPaper ? 'bg-white text-slate-950 font-bold shadow-sm' : 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Technical Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab('ats')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'ats'
                  ? isPaper ? 'bg-white text-slate-950 font-bold shadow-sm' : 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ATS Plaintext</span>
              <span className="md:hidden">ATS</span>
            </button>
          </div>

          {/* Actions: Theme Toggle, Copy ATS, Print PDF */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setThemeMode(isPaper ? 'cyber' : 'paper')}
              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                isPaper 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-400'
              }`}
              title={isPaper ? 'Switch to Cyber OLED Dark Theme' : 'Switch to Executive Paper Light Theme'}
            >
              {isPaper ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Copy ATS Text */}
            <button
              onClick={handleCopyAts}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                isPaper
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Copy plain-text resume for ATS job portals"
            >
              {copiedAts ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedAts ? 'COPIED!' : 'COPY ATS'}</span>
            </button>

            {/* Print / Download PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-mono font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Resume Document Area */}
      <div className="printable-resume-container max-w-4xl mx-auto p-4 sm:p-8 md:p-12 mb-20 print:p-0 print:m-0 print:max-w-full print:mb-0">
        
        {/* ATS PLAIN-TEXT VIEW (On-screen when ATS tab is selected) */}
        {activeTab === 'ats' && (
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl print:hidden ${
            isPaper ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0f172a] border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <h2 className="text-lg font-bold">ATS-Optimized Plaintext Resume</h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Pre-formatted plain text ready for automated applicant tracking systems (Workday, Greenhouse, Lever).
                </p>
              </div>
              <button
                onClick={handleCopyAts}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow transition-all cursor-pointer"
              >
                {copiedAts ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAts ? 'COPIED TO CLIPBOARD' : 'COPY ALL TEXT'}</span>
              </button>
            </div>

            <pre className={`p-4 sm:p-6 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto select-all border ${
              isPaper ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              {generateAtsText()}
            </pre>
          </div>
        )}

        {/* EXECUTIVE OR DOSSIER VIEW (Rendered on screen when selected, and always rendered for print) */}
        <div className={`printable-resume-card p-6 sm:p-10 md:p-12 rounded-3xl border transition-colors duration-300 print:p-0 print:m-0 print:border-none print:shadow-none print:bg-transparent ${
          activeTab === 'ats' ? 'hidden print:block' : 'block'
        } ${
          isPaper 
            ? 'bg-white border-slate-200 shadow-xl text-slate-900' 
            : 'bg-[#0d1424] border-slate-800/90 shadow-2xl text-slate-100'
        }`}>
          
          {/* ============================================================ */}
          {/* 1. EXECUTIVE RESUME HEADER                                   */}
          {/* ============================================================ */}
            <header className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800 print:pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-950 dark:text-white print:text-2xl">
                    {aboutData.name}
                  </h1>
                  <p className="text-sm sm:text-base font-mono font-bold text-cyan-600 dark:text-cyan-400 print:text-cyan-800 mt-1">
                    {aboutData.title}
                  </p>
                </div>

                {/* Key Metrics Pill Strip */}
                <div className="flex flex-wrap gap-2 print:hidden">
                  <span className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                    isPaper ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-cyan-300'
                  }`}>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>6+ Yrs Exp</span>
                  </span>
                  <span className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-semibold flex items-center gap-1.5 ${
                    isPaper ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-cyan-300'
                  }`}>
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    <span>Fortune 500 Architect</span>
                  </span>
                </div>
              </div>

              {/* Contact Information Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-600 dark:text-slate-400 print:text-slate-700">
                <a href={`mailto:${aboutData.email}`} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{aboutData.email}</span>
                </a>
                <span>•</span>
                <a href={`tel:${aboutData.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{aboutData.phone}</span>
                </a>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>{aboutData.location}</span>
                </span>
                <span>•</span>
                <a href={aboutData.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>linkedin.com/in/mrvishav</span>
                </a>
                <span>•</span>
                <a href={aboutData.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <Github className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 shrink-0" />
                  <span>github.com/vishavgarg</span>
                </a>
              </div>
            </header>

            {/* ============================================================ */}
            {/* 2. EXECUTIVE SUMMARY                                         */}
            {/* ============================================================ */}
            <section className="mt-6 print:mt-4 print-avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 print:text-slate-900 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Summary</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-slate-800">
                {aboutData.summary}
              </p>
            </section>

            {/* ============================================================ */}
            {/* 3. CORE TECHNICAL COMPETENCIES                               */}
            {/* ============================================================ */}
            <section className="mt-6 print:mt-4 print-avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 print:text-slate-900 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Core Technical Competencies</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skillsData.categories.map((cat) => (
                  <div 
                    key={cat.id} 
                    className={`printable-resume-card p-3.5 rounded-xl border print-avoid-break ${
                      isPaper 
                        ? 'bg-slate-50 border-slate-200/80 text-slate-800' 
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-200'
                    }`}
                  >
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white font-sans mb-1.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, sIdx) => (
                        <span 
                          key={sIdx} 
                          className={`printable-tag text-[10.5px] px-2 py-0.5 rounded font-mono ${
                            isPaper
                              ? 'bg-white border border-slate-200 text-slate-700'
                              : 'bg-slate-950 border border-slate-800 text-slate-300'
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* 4. PROFESSIONAL WORK EXPERIENCE                             */}
            {/* ============================================================ */}
            <section className="mt-7 print:mt-5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 print:text-slate-900 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Experience</span>
              </h2>

              <div className="space-y-6 print:space-y-4">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="space-y-2 print-avoid-break">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 print:text-slate-700 font-semibold">
                          {exp.company} — <span className="font-normal">{exp.location}</span>
                        </p>
                      </div>
                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border w-max ${
                        isPaper ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 italic">
                      Key Milestone: {exp.highlight}
                    </p>

                    <ul className="space-y-1.5 pt-1">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="text-cyan-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pill List */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t, tIdx) => (
                        <span key={tIdx} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isPaper ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* 5. FLAGSHIP ENGINEERING PROJECTS                            */}
            {/* ============================================================ */}
            <section className="mt-8 print:mt-5">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 print:text-slate-900 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Flagship Engineering Projects & Architectures</span>
                </span>
                <span className="text-[10px] font-normal text-slate-500 font-mono print:hidden">
                  {activeTab === 'dossier' ? 'Showing All Projects' : 'Showing Top Highlights'}
                </span>
              </h2>

              <div className="space-y-5 print:space-y-4">
                {(activeTab === 'dossier' ? projectsData : projectsData.slice(0, 3)).map((proj) => (
                  <div 
                    key={proj.id} 
                    className={`printable-resume-card p-4 sm:p-5 rounded-2xl border print-avoid-break space-y-2.5 ${
                      isPaper 
                        ? 'bg-slate-50/80 border-slate-200 text-slate-800' 
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white font-sans">
                        {proj.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                        isPaper 
                          ? 'bg-cyan-50 border-cyan-200 text-cyan-800' 
                          : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                      }`}>
                        {proj.badge}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Client: <strong className="text-slate-800 dark:text-slate-200">{proj.client}</strong> • Role: <strong className="text-slate-800 dark:text-slate-200">{proj.role}</strong> • Scale: <strong className="text-slate-800 dark:text-slate-200">{proj.scale}</strong>
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {proj.overview}
                    </p>

                    {/* Architecture highlights */}
                    <div className="pt-1">
                      <p className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400 print:text-slate-800 mb-1">
                        Architecture Highlights:
                      </p>
                      <ul className="space-y-1">
                        {proj.architecture.slice(0, activeTab === 'dossier' ? 6 : 3).map((arch, aIdx) => (
                          <li key={aIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-cyan-500 shrink-0">▹</span>
                            <span>{arch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          isPaper ? 'bg-white border border-slate-200 text-slate-700' : 'bg-slate-800 border border-slate-700 text-slate-300'
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* 6. EDUCATION & BACKGROUND                                    */}
            {/* ============================================================ */}
            <section className="mt-8 print:mt-5 print-avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 print:text-slate-900 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-3 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education & Credentials</span>
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <p className="font-bold text-slate-950 dark:text-white text-sm">
                    {aboutData.education.degree}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {aboutData.education.institution}
                  </p>
                </div>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 print:text-slate-700 font-semibold">
                  {aboutData.education.period}
                </span>
              </div>
            </section>

          </div>
      </div>

    </div>
  );
};

