import { useState, useEffect } from 'react';

export const useDeviceCapability = () => {
  const [capability, setCapability] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isPortrait: false,
        hasTouch: false,
        isLowPower: false,
        qualityTier: 'high',
        prefersReducedMotion: false,
        pixelRatio: 1,
        hasWebGL: true,
        width: 1920,
        height: 1080
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobile = isMobileUA || width < 768 || (hasTouch && width < 1024);
    const isTablet = hasTouch && width >= 768 && width <= 1024;
    const isPortrait = height > width;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    let hasWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    const cores = navigator.hardwareConcurrency || 4;
    const isLowPower = (isMobile && cores <= 4) || prefersReducedMotion;

    let qualityTier = 'high';
    if (isLowPower || prefersReducedMotion) {
      qualityTier = 'low';
    } else if (isMobile || isTablet || cores <= 4) {
      qualityTier = 'medium';
    }

    return {
      isMobile,
      isTablet,
      isPortrait,
      hasTouch,
      isLowPower,
      qualityTier,
      prefersReducedMotion,
      pixelRatio,
      hasWebGL,
      width,
      height
    };
  });

  useEffect(() => {
    const evaluateCapability = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobile = isMobileUA || width < 768 || (hasTouch && width < 1024);
      const isTablet = hasTouch && width >= 768 && width <= 1024;
      const isPortrait = height > width;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      let hasWebGL = true;
      try {
        const canvas = document.createElement('canvas');
        hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        hasWebGL = false;
      }

      const cores = navigator.hardwareConcurrency || 4;
      const isLowPower = (isMobile && cores <= 4) || prefersReducedMotion;

      let qualityTier = 'high';
      if (isLowPower || prefersReducedMotion) {
        qualityTier = 'low';
      } else if (isMobile || isTablet || cores <= 4) {
        qualityTier = 'medium';
      }

      setCapability({
        isMobile,
        isTablet,
        isPortrait,
        hasTouch,
        isLowPower,
        qualityTier,
        prefersReducedMotion,
        pixelRatio,
        hasWebGL,
        width,
        height
      });
    };

    let timeoutId = null;
    const handleResizeOrRotate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(evaluateCapability, 100);
    };

    window.addEventListener('resize', handleResizeOrRotate);
    window.addEventListener('orientationchange', handleResizeOrRotate);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResizeOrRotate);
      window.removeEventListener('orientationchange', handleResizeOrRotate);
    };
  }, []);

  return capability;
};
