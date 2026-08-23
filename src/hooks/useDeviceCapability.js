import { useState, useEffect } from 'react';

export const useDeviceCapability = () => {
  const [capability, setCapability] = useState({
    isMobile: false,
    isLowPower: false,
    qualityTier: 'high', // 'high' | 'medium' | 'low'
    prefersReducedMotion: false,
    pixelRatio: 1,
    hasWebGL: true
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    let hasWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    // Hardware concurrency & quality heuristic
    const cores = navigator.hardwareConcurrency || 4;
    const isLowPower = isMobile && cores <= 4;
    
    let qualityTier = 'high';
    if (isLowPower || prefersReducedMotion) {
      qualityTier = 'low';
    } else if (isMobile || cores <= 4) {
      qualityTier = 'medium';
    }

    setCapability({
      isMobile,
      isLowPower,
      qualityTier,
      prefersReducedMotion,
      pixelRatio,
      hasWebGL
    });
  }, []);

  return capability;
};
