import { useEffect, useState } from 'react';

export const useKeyboardControls = () => {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    boost: false,
    shoot: false,
    interact: false,
    reset: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid capturing keys when typing in input fields
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys((k) => ({ ...k, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setKeys((k) => ({ ...k, backward: true }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setKeys((k) => ({ ...k, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setKeys((k) => ({ ...k, right: true }));
          break;
        case 'Space':
        case 'KeyE':
          setKeys((k) => ({ ...k, up: true }));
          break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'KeyQ':
        case 'KeyC':
          setKeys((k) => ({ ...k, down: true }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setKeys((k) => ({ ...k, boost: true }));
          break;
        case 'KeyF':
        case 'KeyJ':
          setKeys((k) => ({ ...k, shoot: true }));
          break;
        case 'Enter':
          setKeys((k) => ({ ...k, interact: true }));
          break;
        case 'KeyR':
          setKeys((k) => ({ ...k, reset: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys((k) => ({ ...k, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setKeys((k) => ({ ...k, backward: false }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setKeys((k) => ({ ...k, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setKeys((k) => ({ ...k, right: false }));
          break;
        case 'Space':
        case 'KeyE':
          setKeys((k) => ({ ...k, up: false }));
          break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'KeyQ':
        case 'KeyC':
          setKeys((k) => ({ ...k, down: false }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          setKeys((k) => ({ ...k, boost: false }));
          break;
        case 'KeyF':
        case 'KeyJ':
          setKeys((k) => ({ ...k, shoot: false }));
          break;
        case 'Enter':
          setKeys((k) => ({ ...k, interact: false }));
          break;
        case 'KeyR':
          setKeys((k) => ({ ...k, reset: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
