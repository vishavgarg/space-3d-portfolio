import { create } from 'zustand';
import { soundEngine } from '../utils/soundEngine';

export const tourStops = [
  {
    id: 'stop-vista',
    title: 'High-Altitude Vista & Contact Spire',
    badge: '1 / 5 • WELCOME',
    zone: 'contact',
    position: [0, 18, 55],
    lookAt: [0, 6, 0],
    description:
      "Welcome to Vishav Garg's 3D Space Portfolio! Vishav is a Senior Frontend & Full Stack Engineer with 6+ years of experience engineering high-performance web applications and enterprise architectures for global brands.",
    keyPoints: [
      '📍 Location: High-Altitude Overlook (South)',
      '📞 Features: Contact Tower, Direct Messaging, Social Channels',
      '⚡ Available for: Full-time Senior / Lead Frontend roles'
    ],
    actionLabel: 'Contact & Hire Vishav',
    actionModal: 'contact'
  },
  {
    id: 'stop-hub',
    title: 'Command Hub & Starfleet Hangar',
    badge: '2 / 5 • CENTRAL HUB',
    zone: 'spawn',
    position: [0, 5, 12],
    lookAt: [0, 2, -2],
    description:
      'The central landing platform features solid 3D typography, interactive career milestone roads, and the Starfleet Hangar where you can customize your ship chassis and thruster spectra.',
    keyPoints: [
      '🏛️ Features: 3D Minimalist Name Sculpture & Career Timeline',
      '🛸 Starfleet Hangar: Choose Scout, Interceptor, or Dreadnought',
      '📄 Resume Kiosk: Download PDF & view executive career summary'
    ],
    actionLabel: 'Open Starfleet Hangar',
    actionModal: 'hangar'
  },
  {
    id: 'stop-projects',
    title: 'Enterprise Projects Archipelago',
    badge: '3 / 5 • PORTFOLIO',
    zone: 'projects',
    position: [34, 6, -14],
    lookAt: [45, 2, -25],
    description:
      'Stargate portals leading to production-grade architecture case studies, including Toyota TMNA Fleet, Pampers Scalable Commerce (P&G), PC Builder 3D Customizer, Diveroid IoT, and JigsawML AI platform.',
    keyPoints: [
      '🚗 Toyota TMNA: Enterprise multi-brand portal architecture',
      '🛍️ Pampers (P&G): High-concurrency e-commerce & rewards ecosystem',
      '🖥️ PC Builder: Real-time 3D configuration & compatibility engine'
    ],
    actionLabel: 'Explore Projects Gallery',
    actionModal: 'projects'
  },
  {
    id: 'stop-skills',
    title: 'Skills Target Arena & Mini-Games',
    badge: '4 / 5 • TECH STACK',
    zone: 'skills',
    position: [0, 8, -48],
    lookAt: [0, 3, -70],
    description:
      'Interactive skill arena where you can blast orbital tech gems to reveal proficiencies in React 18, Next.js 14, WebGL / Three.js, TypeScript, Cloud Architecture, and State Management, or jump into the Space Dogfight rail shooter.',
    keyPoints: [
      '🎯 Skills Range: Blast 14 floating tech gems to unlock cards',
      '⚔️ Space Dogfight: Fast-paced rail shooter arcade with drone waves',
      '⚡ Warp Gate Race: High-speed steering race through glowing gates'
    ],
    actionLabel: 'View Full Skills Sheet',
    actionModal: 'skills'
  },
  {
    id: 'stop-about',
    title: 'Career Sanctuary & Bio',
    badge: '5 / 5 • BACKGROUND',
    zone: 'about',
    position: [-34, 6, -10],
    lookAt: [-45, 3, -20],
    description:
      'The crystal sanctuary contains Vishav’s complete engineering journey across Omnicom Media Group, Code Garage Tech, and Daryl Tech, highlighting technical leadership, mentoring, and full stack execution.',
    keyPoints: [
      '💼 Experience: 6+ Years at top agencies and enterprise scale',
      '🎓 Education: B.Tech in Computer Science Engineering',
      '🌟 Strengths: WebGL, Micro-frontends, Performance, Design Systems'
    ],
    actionLabel: 'Read Complete Bio',
    actionModal: 'about'
  }
];

export const useTourStore = create((set, get) => ({
  isTourActive: false,
  currentStopIndex: 0,
  isTransitioning: false,
  isPaused: false,

  startTour: () => {
    soundEngine.playWaveStart();
    set({
      isTourActive: true,
      currentStopIndex: 0,
      isTransitioning: true,
      isPaused: false
    });
  },

  nextStop: () => {
    const { currentStopIndex } = get();
    if (currentStopIndex < tourStops.length - 1) {
      soundEngine.playZoneTransition();
      set({
        currentStopIndex: currentStopIndex + 1,
        isTransitioning: true
      });
    } else {
      // Completed tour!
      get().exitTour();
    }
  },

  prevStop: () => {
    const { currentStopIndex } = get();
    if (currentStopIndex > 0) {
      soundEngine.playZoneTransition();
      set({
        currentStopIndex: currentStopIndex - 1,
        isTransitioning: true
      });
    }
  },

  goToStop: (index) => {
    if (index >= 0 && index < tourStops.length) {
      soundEngine.playZoneTransition();
      set({
        currentStopIndex: index,
        isTransitioning: true
      });
    }
  },

  setTransitioning: (isTransitioning) => set({ isTransitioning }),

  togglePause: () => {
    soundEngine.playClick();
    set((state) => ({ isPaused: !state.isPaused }));
  },

  exitTour: () => {
    soundEngine.playClick();
    set({
      isTourActive: false,
      currentStopIndex: 0,
      isTransitioning: false,
      isPaused: false
    });
  }
}));
