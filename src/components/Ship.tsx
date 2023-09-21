import { FC } from 'react';
import { ShipName } from '../models/ship.models';
import styles from '../styles/ship.module.css';
import { useGameStore } from '../store/gameStore';

type ShipProps = {
  isSelected?: boolean;
  name: ShipName;
  length: number;
};

export const Ship: FC<ShipProps> = ({ name, length }) => {
  const selectShip = useGameStore((state) => state.selectShip);
  return (
    <button
      // draggable="true"
      // style={{ width: 32 *  }}
      className={styles.ship}
      onClick={() => selectShip({ name: name, size: length, count: 1 })}
    >
      {name} | size: {length}
    </button>
  );
};
