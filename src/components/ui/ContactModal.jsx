import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { aboutData } from '../../data/aboutData';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github } from 'lucide-react';

export const ContactModal = () => {
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const showToast = useUIStore((s) => s.showToast);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (activeModal !== 'contact') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Message Sent!', 'Thank you! Vishav will get back to you shortly.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 pt-safe pb-safe">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-rose-500/40 rounded-3xl shadow-[0_0_60px_rgba(244,63,94,0.2)] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-2.5 sm:gap-3">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 shrink-0" />
              <span>Get in Touch & Hire</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              Have a role, project, or technical conversation in mind? Send a transmission directly.
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
        <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto touch-scroll space-y-5 sm:space-y-6">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <a
              href={`mailto:${aboutData.email}`}
              className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 flex items-center gap-3 text-slate-300 hover:text-rose-300 transition-all"
            >
              <Mail className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="truncate">{aboutData.email}</span>
            </a>

            <a
              href={`tel:${aboutData.phone.replace(/\s+/g, '')}`}
              className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-all"
            >
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{aboutData.phone}</span>
            </a>
          </div>

          {/* Contact Form */}
          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/40 text-center flex flex-col items-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
              <h3 className="text-lg font-bold text-white font-sans">Transmission Received!</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Thank you for reaching out. You can also connect immediately via LinkedIn or email directly at{' '}
                <strong className="text-cyan-400">{aboutData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-rose-500/60 text-white text-xs font-mono focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-rose-500/60 text-white text-xs font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Opportunity / Technical Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-rose-500/60 text-white text-xs font-mono focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Vishav, we love your 3D portfolio and would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-rose-500/60 text-white text-xs font-mono focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
