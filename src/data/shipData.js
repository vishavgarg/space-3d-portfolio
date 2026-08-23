export const shipClasses = [
  {
    id: 'scout',
    name: 'Cyber Scout',
    tagline: 'Agile Quad-Rotor Recon Drone',
    description: 'Lightweight carbon-fiber chassis engineered for rapid directional response and nimble maneuvers through tight sectors.',
    stats: {
      speed: 75,
      acceleration: 85,
      handling: 95,
      shielding: 60
    },
    flightMultipliers: {
      maxSpeed: 1.0,
      accel: 1.0,
      turnRate: 1.0,
      banking: 1.0
    }
  },
  {
    id: 'interceptor',
    name: 'Speed Interceptor',
    tagline: 'High-Velocity Delta-Wing Fighter',
    description: 'Aerodynamic swept-wing space interceptor equipped with dual afterburner ramjets for extreme top speeds and deep space cruising.',
    stats: {
      speed: 98,
      acceleration: 92,
      handling: 75,
      shielding: 50
    },
    flightMultipliers: {
      maxSpeed: 1.28,
      accel: 1.2,
      turnRate: 0.88,
      banking: 1.35
    }
  },
  {
    id: 'dreadnought',
    name: 'Titan Dreadnought',
    tagline: 'Armored Heavy Gunship',
    description: 'Reinforced titanium-alloy armor plating and dual heavy plasma cannon batteries. Unyielding stability and unmatched stopping power.',
    stats: {
      speed: 62,
      acceleration: 68,
      handling: 65,
      shielding: 98
    },
    flightMultipliers: {
      maxSpeed: 0.85,
      accel: 0.85,
      turnRate: 0.78,
      banking: 0.7
    }
  }
];

export const thrusterColorPresets = [
  {
    id: 'cyan',
    name: 'Cyan Pulse',
    hex: '#00f0ff',
    glow: '#00f0ff',
    border: 'border-cyan-400'
  },
  {
    id: 'magenta',
    name: 'Neon Magenta',
    hex: '#ec4899',
    glow: '#ec4899',
    border: 'border-pink-500'
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    hex: '#10b981',
    glow: '#10b981',
    border: 'border-emerald-400'
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    hex: '#f59e0b',
    glow: '#f59e0b',
    border: 'border-amber-400'
  },
  {
    id: 'purple',
    name: 'Plasma Violet',
    hex: '#a855f7',
    glow: '#a855f7',
    border: 'border-purple-400'
  }
];
