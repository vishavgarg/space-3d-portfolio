import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  position: [0, 18, 55],
  rotation: [0, Math.PI, 0],
  speed: 0,
  currentZone: 'contact',
  isDriving: false,
  isFlying: false,
  speedBoost: false,
  resetTrigger: 0, // Incremented whenever a reset is requested

  // Ship Customization State with localStorage persistence
  selectedShip: localStorage.getItem('vg_selected_ship') || 'scout',
  thrusterColor: localStorage.getItem('vg_thruster_color') || '#00f0ff',
  
  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setSpeed: (speed) => set({ speed }),
  setCurrentZone: (currentZone) => set({ currentZone }),
  setDriving: (isDriving) => set({ isDriving }),
  setFlying: (isFlying) => set({ isFlying }),
  setSpeedBoost: (speedBoost) => set({ speedBoost }),

  setShip: (shipId) => {
    localStorage.setItem('vg_selected_ship', shipId);
    set({ selectedShip: shipId });
  },

  setThrusterColor: (color) => {
    localStorage.setItem('vg_thruster_color', color);
    set({ thrusterColor: color });
  },
  
  resetToSpawn: () => set((state) => ({
    position: [0, 18, 55],
    rotation: [0, Math.PI, 0],
    speed: 0,
    currentZone: 'contact',
    resetTrigger: state.resetTrigger + 1
  }))
}));
