import { FC } from 'react';
import { selectAvailableShips, useGameStore } from '../store/gameStore';
import { Ship } from './Ship';
import { ShipName } from '../models/ship.models';

export const ShipList: FC = () => {
  const ships = useGameStore(selectAvailableShips);
  console.log(ships);
  return (
    <ul>
      {Object.entries(ships).map(([name, _]) => (
        <Ship name={name as ShipName} />
      ))}
    </ul>
  );
};
