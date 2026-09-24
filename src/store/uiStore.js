import { create } from 'zustand';
import { soundEngine } from '../utils/soundEngine';

export const useUIStore = create((set, get) => ({
  activeModal: null, // null | 'about' | 'project' | 'skills' | 'contact' | 'experience' | 'help' | 'controls'
  selectedProject: null, // Project object
  isClassicMode: false,
  isAudioMuted: false, // Sound effects (firing, hits, UI) active by default
  isMusicEnabled: false, // Continuous background music turned OFF by default
  hasStartedExperience: false,
  isHUDVisible: true,
  activeToast: null,
  mobileControlsEnabled: false,
  interactionPrompt: null, // string | null, e.g. "Press [E] to view Toyota TMNA case study"

  setActiveModal: (modal) => {
    soundEngine.playClick();
    set({ activeModal: modal });
  },
  
  closeModal: () => {
    soundEngine.playClick();
    set({ activeModal: null, selectedProject: null });
  },

  openProjectModal: (project) => {
    soundEngine.playClick();
    set({ activeModal: 'project', selectedProject: project });
  },

  setClassicMode: (isClassic) => {
    soundEngine.playClick();
    set({ isClassicMode: isClassic });
  },

  toggleAudio: () => {
    const isMuted = soundEngine.toggleMute();
    set({ isAudioMuted: isMuted });
  },

  toggleMusic: () => {
    const isMusic = soundEngine.toggleMusic();
    set({ isMusicEnabled: isMusic });
  },

  startExperience: () => {
    soundEngine.init();
    // Continuous ambient music is OFF by default. Only start if user enabled it.
    if (get().isMusicEnabled) {
      soundEngine.startAmbient();
    }
    soundEngine.playZoneTransition();
    set({ hasStartedExperience: true });
  },

  goHome: () => {
    soundEngine.stopAmbient();
    set({ hasStartedExperience: false, activeModal: null, selectedProject: null });
  },

  setInteractionPrompt: (prompt) => set({ interactionPrompt: prompt }),

  showToast: (title, message, type = 'info') => {
    const id = Date.now();
    set({ activeToast: { id, title, message, type } });
    setTimeout(() => {
      if (get().activeToast?.id === id) {
        set({ activeToast: null });
      }
    }, 4000);
  },

  hideToast: () => set({ activeToast: null }),
  setMobileControls: (enabled) => set({ mobileControlsEnabled: enabled })
}));
