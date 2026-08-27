import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export const useGameStore = create((set, get) => ({
  score: 0,
  highScore: parseInt(localStorage.getItem('vg_high_score') || '0', 10),
  targetsHit: [],
  platformsVisited: [],
  discoveredZones: ['spawn'],
  activeMiniGame: null, // null | 'target-range' | 'platformer' | 'dogfight' | 'warp-race'
  isGameActive: false,
  gameTimeRemaining: 60,
  easterEggs: [],

  // Dogfight Flagship Game State
  dogfightActive: false,
  dogfightScore: 0,
  dogfightWave: 1,
  dogfightKills: 0,
  dogfightTimeRemaining: 60,
  dogfightHealth: 100,
  dogfightMaxHealth: 100,
  dogfightLives: 3,
  dogfightGameOver: false,
  dogfightCombo: 0,
  dogfightLastKillTime: 0,
  dogfightDamageFlash: 0,
  dogfightIsWarping: false,
  dogfightTransitionData: null,
  dogfightHighScore: parseInt(localStorage.getItem('vg_dogfight_high_score') || '0', 10),

  // Warp Gate Race State
  warpRaceActive: false,
  warpRaceScore: 0,
  warpRaceGatesPassed: 0,
  warpRaceTotalGatesPassed: 0,
  warpRaceGatesTotal: 12,
  warpRaceLevel: 1,
  warpRaceLives: 3,
  warpRaceMaxLives: 3,
  warpRaceGameOver: false,
  warpRaceCombo: 0,
  warpRaceLastGateTime: 0,
  warpRaceDamageFlash: 0,
  warpRaceIsWarping: false,
  warpRaceTransitionData: null,
  warpRaceHighScore: parseInt(localStorage.getItem('vg_warprace_high_score') || '0', 10),

  setMiniGame: (game) => set({ activeMiniGame: game, isGameActive: !!game }),

  // Dogfight Actions
  startDogfight: () => {
    soundEngine.playWaveStart();
    set({
      dogfightActive: true,
      activeMiniGame: 'dogfight',
      dogfightScore: 0,
      dogfightWave: 1,
      dogfightKills: 0,
      dogfightHealth: 100,
      dogfightMaxHealth: 100,
      dogfightLives: 3,
      dogfightGameOver: false,
      dogfightCombo: 0,
      dogfightDamageFlash: 0,
      dogfightIsWarping: false,
      dogfightTransitionData: null,
      dogfightTimeRemaining: 60
    });
  },

  endDogfight: () => {
    const { dogfightScore, dogfightHighScore } = get();
    const newHigh = Math.max(dogfightHighScore, dogfightScore);
    localStorage.setItem('vg_dogfight_high_score', newHigh.toString());

    if (dogfightScore > 0) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 }
      });
    }

    set({
      dogfightActive: false,
      activeMiniGame: null,
      dogfightGameOver: false,
      dogfightIsWarping: false,
      dogfightTransitionData: null,
      dogfightHighScore: newHigh
    });
  },

  takeDogfightDamage: (amount = 20) => {
    const { dogfightHealth, dogfightLives, dogfightGameOver, dogfightIsWarping } = get();
    if (dogfightGameOver || dogfightIsWarping) return;

    soundEngine.playPlayerDamage();
    const newHealth = Math.max(0, dogfightHealth - amount);

    if (newHealth <= 0) {
      const remainingLives = dogfightLives - 1;
      if (remainingLives <= 0) {
        soundEngine.playGameOver();
        set({
          dogfightHealth: 0,
          dogfightLives: 0,
          dogfightGameOver: true,
          dogfightDamageFlash: Date.now()
        });
      } else {
        // Lost 1 life, restore shields to 100
        set({
          dogfightHealth: 100,
          dogfightLives: remainingLives,
          dogfightDamageFlash: Date.now()
        });
      }
    } else {
      set({
        dogfightHealth: newHealth,
        dogfightDamageFlash: Date.now()
      });
    }
  },

  dogfightKill: (basePoints = 150) => {
    const { dogfightScore, dogfightKills, dogfightHighScore, dogfightCombo, dogfightLastKillTime } = get();
    const now = Date.now();
    
    // Combo multiplier if killed within 2.8 seconds of previous kill
    let newCombo = 1;
    if (now - dogfightLastKillTime < 2800) {
      newCombo = Math.min(dogfightCombo + 1, 5); // up to 5x combo!
    }

    const earnedPoints = Math.round(basePoints * (1 + (newCombo - 1) * 0.5));
    const newScore = dogfightScore + earnedPoints;
    const newKills = dogfightKills + 1;
    const newHigh = Math.max(dogfightHighScore, newScore);

    set({
      dogfightScore: newScore,
      dogfightKills: newKills,
      dogfightCombo: newCombo,
      dogfightLastKillTime: now,
      dogfightHighScore: newHigh
    });
  },

  triggerSectorTransition: (nextWave) => {
    const { dogfightScore, dogfightHealth, dogfightWave } = get();
    soundEngine.playWaveStart();

    const bonusPoints = 500;
    const repairedHealth = Math.min(100, dogfightHealth + 10);
    const actualRepaired = Math.round(repairedHealth - dogfightHealth);

    set({
      dogfightIsWarping: true,
      dogfightScore: dogfightScore + bonusPoints,
      dogfightHealth: repairedHealth,
      dogfightTransitionData: {
        prevWave: dogfightWave,
        nextWave,
        bonusPoints,
        actualRepaired
      }
    });

    setTimeout(() => {
      set({
        dogfightWave: nextWave,
        dogfightIsWarping: false,
        dogfightTransitionData: null
      });
    }, 2800);
  },

  setDogfightWave: (wave) => {
    soundEngine.playWaveStart();
    set({ dogfightWave: wave });
  },

  // Warp Race Actions
  startWarpRace: () => {
    soundEngine.playWaveStart();
    set({
      warpRaceActive: true,
      activeMiniGame: 'warp-race',
      warpRaceScore: 0,
      warpRaceGatesPassed: 0,
      warpRaceTotalGatesPassed: 0,
      warpRaceGatesTotal: 12,
      warpRaceLevel: 1,
      warpRaceLives: 3,
      warpRaceMaxLives: 3,
      warpRaceGameOver: false,
      warpRaceCombo: 0,
      warpRaceLastGateTime: 0,
      warpRaceDamageFlash: 0,
      warpRaceIsWarping: false,
      warpRaceTransitionData: null
    });
  },

  restartWarpRace: () => {
    soundEngine.playWaveStart();
    set({
      warpRaceActive: true,
      activeMiniGame: 'warp-race',
      warpRaceScore: 0,
      warpRaceGatesPassed: 0,
      warpRaceTotalGatesPassed: 0,
      warpRaceGatesTotal: 12,
      warpRaceLevel: 1,
      warpRaceLives: 3,
      warpRaceMaxLives: 3,
      warpRaceGameOver: false,
      warpRaceCombo: 0,
      warpRaceLastGateTime: 0,
      warpRaceDamageFlash: 0,
      warpRaceIsWarping: false,
      warpRaceTransitionData: null
    });
  },

  endWarpRace: () => {
    const { warpRaceScore, warpRaceHighScore } = get();
    const newHigh = Math.max(warpRaceHighScore, warpRaceScore);
    localStorage.setItem('vg_warprace_high_score', newHigh.toString());

    if (warpRaceScore > 0) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 }
      });
    }

    set({
      warpRaceActive: false,
      activeMiniGame: null,
      warpRaceGameOver: false,
      warpRaceIsWarping: false,
      warpRaceTransitionData: null,
      warpRaceHighScore: newHigh
    });
  },

  collectWarpGate: (basePoints = 200) => {
    const {
      warpRaceScore,
      warpRaceGatesPassed,
      warpRaceTotalGatesPassed,
      warpRaceHighScore,
      warpRaceCombo,
      warpRaceLastGateTime,
      warpRaceGameOver,
      warpRaceIsWarping
    } = get();

    if (warpRaceGameOver || warpRaceIsWarping) return;

    const now = Date.now();
    let newCombo = 1;
    if (now - warpRaceLastGateTime < 3200) {
      newCombo = Math.min(warpRaceCombo + 1, 5);
    }

    soundEngine.playWarpPass(newCombo);
    const earnedPoints = Math.round(basePoints * (1 + (newCombo - 1) * 0.5));
    const newScore = warpRaceScore + earnedPoints;
    const newGatesPassed = warpRaceGatesPassed + 1;
    const newTotalGates = warpRaceTotalGatesPassed + 1;
    const newHigh = Math.max(warpRaceHighScore, newScore);

    set({
      warpRaceScore: newScore,
      warpRaceGatesPassed: newGatesPassed,
      warpRaceTotalGatesPassed: newTotalGates,
      warpRaceCombo: newCombo,
      warpRaceLastGateTime: now,
      warpRaceHighScore: newHigh
    });
  },

  missWarpGate: () => {
    const { warpRaceLives, warpRaceGameOver, warpRaceIsWarping } = get();
    if (warpRaceGameOver || warpRaceIsWarping) return;

    soundEngine.playGateMiss();
    const remainingLives = warpRaceLives - 1;
    if (remainingLives <= 0) {
      soundEngine.playGameOver();
      set({
        warpRaceLives: 0,
        warpRaceGameOver: true,
        warpRaceDamageFlash: Date.now(),
        warpRaceCombo: 0
      });
    } else {
      set({
        warpRaceLives: remainingLives,
        warpRaceDamageFlash: Date.now(),
        warpRaceCombo: 0
      });
    }
  },

  hitWarpObstacle: () => {
    const { warpRaceLives, warpRaceGameOver, warpRaceIsWarping } = get();
    if (warpRaceGameOver || warpRaceIsWarping) return;

    soundEngine.playExplosion();
    soundEngine.playPlayerDamage();
    const remainingLives = warpRaceLives - 1;
    if (remainingLives <= 0) {
      soundEngine.playGameOver();
      set({
        warpRaceLives: 0,
        warpRaceGameOver: true,
        warpRaceDamageFlash: Date.now(),
        warpRaceCombo: 0
      });
    } else {
      set({
        warpRaceLives: remainingLives,
        warpRaceDamageFlash: Date.now(),
        warpRaceCombo: 0
      });
    }
  },

  advanceWarpRaceLevel: (nextLevel) => {
    const { warpRaceScore, warpRaceLevel, warpRaceLives, warpRaceMaxLives, warpRaceIsWarping } = get();
    if (warpRaceIsWarping) return; // Prevent duplicate trigger

    soundEngine.playWaveStart();

    const bonusPoints = 500 * warpRaceLevel;
    const repairedLives = Math.min(warpRaceMaxLives, warpRaceLives + 1);
    const restoredLife = repairedLives > warpRaceLives;
    const nextGatesCount = 10 + nextLevel * 2;

    set({
      warpRaceIsWarping: true,
      warpRaceScore: warpRaceScore + bonusPoints,
      warpRaceLives: repairedLives,
      warpRaceTransitionData: {
        prevLevel: warpRaceLevel,
        nextLevel,
        bonusPoints,
        restoredLife
      }
    });

    if (window._warpRaceTimer) {
      clearTimeout(window._warpRaceTimer);
    }
    window._warpRaceTimer = setTimeout(() => {
      set({
        warpRaceLevel: nextLevel,
        warpRaceGatesPassed: 0,
        warpRaceGatesTotal: nextGatesCount,
        warpRaceIsWarping: false,
        warpRaceTransitionData: null
      });
      window._warpRaceTimer = null;
    }, 2800);
  },

  dismissWarpTransition: () => {
    const { warpRaceTransitionData, warpRaceIsWarping, warpRaceLevel } = get();
    if (!warpRaceIsWarping) return;
    if (window._warpRaceTimer) {
      clearTimeout(window._warpRaceTimer);
      window._warpRaceTimer = null;
    }

    const nextLevel = warpRaceTransitionData?.nextLevel || warpRaceLevel + 1;
    const nextGatesCount = 10 + nextLevel * 2;

    set({
      warpRaceLevel: nextLevel,
      warpRaceGatesPassed: 0,
      warpRaceGatesTotal: nextGatesCount,
      warpRaceIsWarping: false,
      warpRaceTransitionData: null
    });
  },

  // Free-Roam Target Hit
  hitTarget: (targetId, points = 100) => {
    const { targetsHit, score, highScore } = get();
    if (targetsHit.includes(targetId)) return false;

    soundEngine.playHit();
    const newScore = score + points;
    const newTargetsHit = [...targetsHit, targetId];
    const newHighScore = Math.max(highScore, newScore);

    localStorage.setItem('vg_high_score', newHighScore.toString());

    set({
      targetsHit: newTargetsHit,
      score: newScore,
      highScore: newHighScore
    });

    if (newTargetsHit.length % 5 === 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }

    return true;
  },

  visitPlatform: (platformId) => {
    const { platformsVisited, score, highScore } = get();
    if (platformsVisited.includes(platformId)) return false;

    soundEngine.playJump();
    const newScore = score + 150;
    const newPlatformsVisited = [...platformsVisited, platformId];
    const newHighScore = Math.max(highScore, newScore);

    localStorage.setItem('vg_high_score', newHighScore.toString());

    set({
      platformsVisited: newPlatformsVisited,
      score: newScore,
      highScore: newHighScore
    });

    return true;
  },

  discoverZone: (zoneId) => {
    const { discoveredZones } = get();
    if (!discoveredZones.includes(zoneId)) {
      set({ discoveredZones: [...discoveredZones, zoneId] });
    }
  },

  discoverEasterEgg: (eggId) => {
    const { easterEggs, score } = get();
    if (easterEggs.includes(eggId)) return;

    soundEngine.playHit();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });

    set({
      easterEggs: [...easterEggs, eggId],
      score: score + 250
    });
  },

  resetGame: () => set({
    score: 0,
    targetsHit: [],
    platformsVisited: [],
    isGameActive: false,
    gameTimeRemaining: 60,
    dogfightActive: false,
    warpRaceActive: false
  })
}));
