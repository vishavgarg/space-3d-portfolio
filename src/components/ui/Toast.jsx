import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const activeToast = useUIStore((s) => s.activeToast);
  const hideToast = useUIStore((s) => s.hideToast);

  if (!activeToast) return null;

  const { title, message, type } = activeToast;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/50 bg-emerald-950/85 text-emerald-100',
    info: 'border-cyan-500/50 bg-cyan-950/85 text-cyan-100',
    warning: 'border-amber-500/50 bg-amber-950/85 text-amber-100'
  };

  return (
    <div className="fixed top-20 right-6 z-50 max-w-sm w-full animate-bounce pointer-events-auto">
      <div
        className={`p-4 rounded-2xl border backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-start gap-3 transition-all ${
          borderColors[type] || borderColors.info
        }`}
      >
        {iconMap[type] || <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />}

        <div className="flex-1 min-w-0 font-sans">
          <h4 className="text-sm font-bold tracking-tight text-white">{title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{message}</p>
        </div>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
