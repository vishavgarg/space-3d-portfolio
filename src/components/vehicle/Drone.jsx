import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { ShipModel } from './ShipModel';

export const Drone = ({ isDriving = false, speedBoost = false }) => {
  const selectedShip = usePlayerStore((s) => s.selectedShip);
  const thrusterColor = usePlayerStore((s) => s.thrusterColor);

  return (
    <ShipModel
      shipId={selectedShip}
      thrusterColor={thrusterColor}
      isDriving={isDriving}
      speedBoost={speedBoost}
    />
  );
};
